module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const sql = require("mssql");

    const BusinessAmounts = req.body.Business;
    const EventsAmounts = req.body.Events;
    const EducationAmounts = req.body.Education;
    const Email = req.body.Email;

    const config = {
        user: "Amaan",
        password: "P0p0p0p0p",
        server: "fundingmanagement.database.windows.net",
        database: "FundingManager",
        options: {
            encrypt: true,
        },
        port: 1433
    };

    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('Email', sql.VarChar, Email)
            .query(`SELECT ID FROM [dbo].[User] WHERE Email = @Email`);

        if (res.recordset.length === 0) {
            context.res = {
                status: 404,
                body: { message: "User not found" }
            };
            return;
        }

        let userId = res.recordset[0].ID;

        let result = await pool.request()
            .input('EducationAmount', sql.Int, EducationAmounts)
            .input('EventsAmount', sql.Int, EventsAmounts)
            .input('BusinessAmount', sql.Int, BusinessAmounts)
            .input('UserID', sql.Int, userId)
            .query('UPDATE [dbo].[Budgets] SET EducationAmount = @EducationAmount,  BusinessAmount = @BusinessAmount , EventsAmount = @EventsAmount WHERE UserID =  @UserID');

        context.res = {
            status: 200,
            body: { message: "Budget updated successfully" }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { message: `Error updating budget: ${error.message}` }
        };
    }
};
