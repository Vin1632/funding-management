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

let email = "mom@gmail.com";
async function getMain() {
    try {
        let pool = await sql.connect(config);
        // let res1 = await pool.request()
        //     .input('email', sql.VarChar, email) // Bind the value of 'email' to the query
        //     .query("INSERT INTO [dbo].[Adverts] (Email) VALUES (@email)");
        
        let res = await pool.request().query("SELECT * FROM [dbo].[Adverts]");
        console.log(res.recordset);
         return res.recordset;
    } catch (error) {
        console.log(error);
    }
}


// Object to String
// const myObject = { name: "John", age: 30, city: "New York" };
// const jsonString = JSON.stringify(myObject);
// console.log(jsonString); // Output: {"name":"John","age":30,"city":"New York"}

// String to Object
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject); // Output: { name: "John", age: 30, city: "New York" }

getMain();