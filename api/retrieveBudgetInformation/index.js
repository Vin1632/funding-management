const sql = require('mssql');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const config = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: process.env.DB_DATABASE,
        options: {
            encrypt: true, // Use this if you're on Azure
        },
        port: 1433 // Default port for SQL Server
    };

    const Email = req.query.email; // Ensure this matches the query parameter

    if (!Email) {
        context.res = {
            status: 400,
            body: { message: "Email query parameter is required" }
        };
        return;
    }

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
            EducationNotes: budgetRes.recordset[0].EducationNotes,
            BusinessNotes: budgetRes.recordset[0].BusinessNotes,
            EventsNotes: budgetRes.recordset[0].EventsNotes
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
    } finally {
        sql.close();
    }
};
