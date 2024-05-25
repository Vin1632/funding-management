const sql = require("mssql");

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

async function updateBudget(context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const BusinessAmounts = req.body.Business;
    const EventsAmounts = req.body.Events;
    const EducationAmounts = req.body.Education;
    const Email = req.body.Email;

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

        // Retrieve the existing notes
        let notesRes = await pool.request()
            .input('UserID', sql.Int, userId)
            .query('SELECT EducationNotes, BusinessNotes, EventsNotes FROM [dbo].[Budgets] WHERE UserID = @UserID');

        if (notesRes.recordset.length === 0) {
            context.res = {
                status: 404,
                body: { message: "Budget not found for the user" }
            };
            return;
        }

        let notes = notesRes.recordset[0];

        // Append the new amounts to the existing notes
        let newEducationNotes = notes.EducationNotes ? notes.EducationNotes + ', ' + EducationAmounts : EducationAmounts;
        let newBusinessNotes = notes.BusinessNotes ? notes.BusinessNotes + ', ' + BusinessAmounts : BusinessAmounts;
        let newEventsNotes = notes.EventsNotes ? notes.EventsNotes + ', ' + EventsAmounts : EventsAmounts;

        // Update the budget amounts and notes
        await pool.request()
            .input('EducationAmount', sql.Decimal(18, 2), EducationAmounts)
            .input('EventsAmount', sql.Decimal(18, 2), EventsAmounts)
            .input('BusinessAmount', sql.Decimal(18, 2), BusinessAmounts)
            .input('EducationNotes', sql.NVarChar(sql.MAX), newEducationNotes)
            .input('BusinessNotes', sql.NVarChar(sql.MAX), newBusinessNotes)
            .input('EventsNotes', sql.NVarChar(sql.MAX), newEventsNotes)
            .input('UserID', sql.Int, userId)
            .query(`
                UPDATE [dbo].[Budgets]
                SET EducationAmount = @EducationAmount,
                    BusinessAmount = @BusinessAmount,
                    EventsAmount = @EventsAmount,
                    EducationNotes = @EducationNotes,
                    BusinessNotes = @BusinessNotes,
                    EventsNotes = @EventsNotes
                WHERE UserID = @UserID
            `);

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
}

module.exports = updateBudget;
