module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const sql = require("mssql");

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

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

    const email = req.body.email;

    try{
        let pool = await sql.connect(config);
        let users = await pool.request()
            .input('email', sql.VarChar, email) // Bind the value of 'email' to the query
            .query("IF NOT EXISTS (SELECT * FROM [dbo].[User] WHERE [Email] = @email) INSERT INTO [dbo].[User] (Email,role) VALUES (@email,'User')");
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: users.recordset
        };
    
    }
    catch(error){
        console.log(error);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: error
        };
        
    }




}