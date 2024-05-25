const sql = require('mssql');

const config = {
    user: 'Amaan',
    password: 'P0p0p0p0p',
    server: 'fundingmanagement.database.windows.net',
    database: 'FundingManager',
    options: {
        encrypt: true, // Use this if you're on Azure
    },
    port: 1433 // Default port for SQL Server
};

async function retrieveNotes() {
    try {
        // Connect to the database
        let pool = await sql.connect(config);

        // User ID to retrieve notes for
        const userId = 9;

        // Retrieve the notes
        let notesRes = await pool.request()
            .input('UserID', sql.Int, userId)
            .query('SELECT EducationNotes, BusinessNotes, EventsNotes FROM [dbo].[Budgets] WHERE UserID = @UserID');

        if (notesRes.recordset.length === 0) {
            console.log('Budget not found for the user');
            return;
        }

        let notes = notesRes.recordset[0];
        console.log('Education Notes:', notes.EducationNotes);
        console.log('Business Notes:', notes.BusinessNotes);
        console.log('Events Notes:', notes.EventsNotes);

    } catch (error) {
        console.error('Error retrieving notes:', error.message);
    } finally {
        // Close the database connection
        await sql.close();
    }
}

// Execute the function
retrieveNotes();
