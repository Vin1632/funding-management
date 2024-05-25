module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

    const config = {
        user: "Amaan",
        password: "P0p0p0p0p",
        server: "fundingmanagement.database.windows.net",
        database: "FundingManager",
        options: {
            encrypt: true,
        },
        port: 1433
    }
    const sql = require("mssql");

    const Email = req.query.email;
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('Email', sql.VarChar, Email)
            .query(`SELECT ID FROM [dbo].[User] WHERE Email = @Email`);

        if (res.recordset.length === 0) {
            throw new Error("User not found");
        }

        let userId = res.recordset[0].ID;
        let currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

        let result = await pool.request()
            .input('UserID', sql.Int, userId)
            .query(`SELECT EducationAmount, BusinessAmount, EventsAmount FROM [dbo].[Budgets] WHERE UserID = @UserID`);

        if (result.recordset.length === 0) {
            // No budget found, create a new one with zero values
            await pool.request()
                .input('UserID', sql.Int, userId)
                .input('EducationAmount', sql.Decimal(18, 2), 0)
                .input('BusinessAmount', sql.Decimal(18, 2), 0)
                .input('EventsAmount', sql.Decimal(18, 2), 0)
                .input('EducationNotes', sql.NVarChar, currentDate)
                .input('BusinessNotes', sql.NVarChar, currentDate)
                .input('EventsNotes', sql.NVarChar, currentDate)
                .query(`INSERT INTO [dbo].[Budgets] (UserID, EducationAmount, BusinessAmount, EventsAmount, EducationNotes, BusinessNotes, EventsNotes) VALUES (@UserID, @EducationAmount, @BusinessAmount, @EventsAmount, @EducationNotes, @BusinessNotes, @EventsNotes)`);

            // Query again to return the newly created budget
            result = await pool.request()
                .input('UserID', sql.Int, userId)
                .query(`SELECT EducationAmount, BusinessAmount, EventsAmount FROM [dbo].[Budgets] WHERE UserID = @UserID`);
        }

        context.res = {
            body: result.recordset
        };
    } catch (error) {
        console.log(error);
        context.res = {
            status: 500,
            body: error.message
        };
    }
}
