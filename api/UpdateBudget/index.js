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

        // Retrieve existing notes
        let notesRes = await pool.request()
            .input('UserID', sql.Int, userId)
            .query('SELECT EducationNotes, BusinessNotes, EventsNotes FROM [dbo].[Budgets] WHERE UserID = @UserID');

        let existingEducationNotes = notesRes.recordset[0].EducationNotes;
        let existingBusinessNotes = notesRes.recordset[0].BusinessNotes;
        let existingEventsNotes = notesRes.recordset[0].EventsNotes;

        // Append new data to existing notes
        let newEducationNotes = JSON.parse(existingEducationNotes || '[]');
        newEducationNotes.push({ timestamp: new Date(), amount: EducationAmounts });

        let newBusinessNotes = JSON.parse(existingBusinessNotes || '[]');
        newBusinessNotes.push({ timestamp: new Date(), amount: BusinessAmounts });

        let newEventsNotes = JSON.parse(existingEventsNotes || '[]');
        newEventsNotes.push({ timestamp: new Date(), amount: EventsAmounts });

        // Update the database with new notes
        let result = await pool.request()
            .input('EducationAmount', sql.Decimal(18, 2), EducationAmounts)
            .input('EventsAmount', sql.Decimal(18, 2), EventsAmounts)
            .input('BusinessAmount', sql.Decimal(18, 2), BusinessAmounts)
            .input('UserID', sql.Int, userId)
            .input('EducationNotes', sql.NVarChar(sql.MAX), JSON.stringify(newEducationNotes))
            .input('BusinessNotes', sql.NVarChar(sql.MAX), JSON.stringify(newBusinessNotes))
            .input('EventsNotes', sql.NVarChar(sql.MAX), JSON.stringify(newEventsNotes))
            .query('UPDATE [dbo].[Budgets] SET EducationAmount = @EducationAmount,  BusinessAmount = @BusinessAmount , EventsAmount = @EventsAmount, EducationNotes = @EducationNotes, BusinessNotes = @BusinessNotes, EventsNotes = @EventsNotes WHERE UserID =  @UserID');

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
