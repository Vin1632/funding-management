const sql = require("mssql");

const config = {
    user: "dbadmin",
    password: "docker1010@#",
    server: "fund-management.database.windows.net",
    database: "fund-management",
    options:{
        encrypt: true,
        
    },
    port: 1433
}
async function getMain(){
    try{
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT * from dbo.Users");
        console.log(users.recordset);
        return users.recordset;

    }
    catch(error){
        console.log(error);
    }
}

getMain();