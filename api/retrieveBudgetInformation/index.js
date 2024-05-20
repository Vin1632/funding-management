module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const sql = require("mssql");

    const Email = req.query.Email; // Assuming Email is used to identify the user

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

        let budgetRes = await pool.request()
            .input('UserID', sql.Int, userId)
            .query('SELECT EducationNotes, BusinessNotes, EventsNotes FROM [dbo].[Budgets] WHERE UserID = @UserID');

        if (budgetRes.recordset.length === 0) {
            context.res = {
                status: 404,
                body: { message: "Budget not found for this user" }
            };
            return;
        }

        let notes = {
            EducationNotes: JSON.parse(budgetRes.recordset[0].EducationNotes || '[]'),
            BusinessNotes: JSON.parse(budgetRes.recordset[0].BusinessNotes || '[]'),
            EventsNotes: JSON.parse(budgetRes.recordset[0].EventsNotes || '[]')
        };

        context.res = {
            status: 200,
            body: notes
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { message: `Error retrieving notes: ${error.message}` }
        };
    }
};
