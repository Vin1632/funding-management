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
async function getMain(){
    try{
        let pool = await sql.connect(config);
        // let result = await pool.request().query("UPDATE  [dbo].[User] SET Blocked = 1 WHERE role = 'Admin'");
        let users = await pool.request().query("SELECT * from [dbo].[User]");
        console.log(users.recordset);
        return users.recordset;
    }
    catch(error){
        console.log(error);
    }
}

getMain();