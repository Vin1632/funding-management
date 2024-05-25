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
        // let res1 = await pool.request()
        //     .input('email', sql.VarChar, email) // Bind the value of 'email' to the query
        //     .query("INSERT INTO [dbo].[Adverts] (Email) VALUES (@email)");
        
        // let res1 = await pool.request().query(`update [dbo].[User] set role = 'Admin' where Email = '123@gmail.com'`);
        // let res = await pool.request().query(`select  from [dbo].[User] where Email = 'up@gmail.com'`);
        // let res1 = await pool.request().query(`ALTER TABLE [dbo].[Applications] ADD Filename varchar(MAX)`);
        // let res = await pool.request().query(`update [dbo].[User] set role = 'Admin' where ID = 4`);
        let res = await pool.request().query(`select * from [dbo].[User]`);
        console.log(res.recordset);
         return res.recordset;
    } catch (error) {
        console.error('Error retrieving notes:', error.message);
    } finally {
        // Close the database connection
        await sql.close();
    }
}

// Execute the function
retrieveNotes();
