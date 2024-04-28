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
        // let res = await pool.request().query("insert into [dbo].[User](ID, role, Name, Surname, DateOfBirth, CompanyName, Email, Education, Business, Events, Blocked) values (2,'Manager', 'AKRT', 'polar', '2010-08-08', 'abc ltd', 'polar@gmail.com' , 1, 1, 0, 0)");
        // let res1 = await pool.request().query("insert into [dbo].[User](ID, role, Name, Surname, DateOfBirth, CompanyName, Email, Education, Business, Events, Blocked) values (3,'Manager', 'who', 'bear', '2010-08-08', 'abc ltd', 'bear@gmail.com' , 1, 1, 0, 0)");
        // let res2 = await pool.request().query("insert into [dbo].[User](ID, role, Name, Surname, DateOfBirth, CompanyName, Email, Education, Business, Events, Blocked) values (5,'Manager', 'is ', 'eats', '2010-08-08', 'abc ltd', 'ea563e_@gmail.com' , 1, 1, 0, 0)");
        // let res3 = await pool.request().query("insert into [dbo].[User](ID, role, Name, Surname, DateOfBirth, CompanyName, Email, Education, Business, Events, Blocked) values (7,'User', 'this', 'people', '2010-08-08', 'abc ltd', 'white@gmail.com' , 1, 1, 0, 0)");
        // let res4 = await pool.request().query("insert into [dbo].[User](ID, role, Name, Surname, DateOfBirth, CompanyName, Email, Education, Business, Events, Blocked) values (9,'User', 'ugly', 'at', '2010-08-08', 'abc ltd', 'bonnat@gmail.com' , 1, 1, 0, 0)");
        // let res5 = await pool.request().query("insert into [dbo].[User](ID, role, Name, Surname, DateOfBirth, CompanyName, Email, Education, Business, Events, Blocked) values (11,'User', 'beauty', 'night', '2010-08-08', 'abc ltd', 'kauo@gmail.com' , 1, 1, 0, 0)");
        // let res6 = await pool.request().query("insert into [dbo].[User](ID, role, Name, Surname, DateOfBirth, CompanyName, Email, Education, Business, Events, Blocked) values (12,'User', 'guy', 'roll', '2010-08-08', 'abc ltd', 'me_nfu@gmail.com' , 1, 1, 0, 0)");

        // let sqldata = await pool.request().query("ALTER TABLE [dbo].[User] ALTER COLUMN ID INT IDENTITY(1,1)");
        let users = await pool.request().query("SELECT * from [dbo].[User]");
        console.log(users.recordset);
        return users.recordset;
    }
    catch(error){
        console.log(error);
    }
}

getMain();