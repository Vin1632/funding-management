const sql = require("mssql");

const config = {
    user: "Amaan",
    password: "P0p0p0p0p",
    server: "fundingmanagement.database.windows.net",
    database: "FundingManager",
    options:{
        encrypt: true,
        
    },
    port: 1433
}

let email = "vin1632@gmail.com";
async function getMain() {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('email', sql.VarChar, email) // Bind the value of 'email' to the query
            .query("INSERT INTO [dbo].[User] (Email) VALUES (@email)");
        
        let users = await pool.request().query("SELECT * FROM [dbo].[User]");
        console.log(users.recordset);
        return users.recordset;
    } catch (error) {
        console.log(error);
    }
}

getMain();