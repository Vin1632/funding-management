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
        let users = await pool.request().query("insert into [dbo].[User](ID, role, Name, Surname, DateOfBirth, CompanyName, Email, Education, Business, Events, Blocked) values (777,'Manager', 'BG', 'polar', '2010-08-08', 'abc ltd', 'eaxe_@gmail.com' , 1, 1, 0, 0)");
        console.log(users.recordset);
        return users.recordset;

    }
    catch(error){
        console.log(error);
    }
}

getMain();