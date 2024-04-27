module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const sql = require("mssql");

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };


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

    try{
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT * from [dbo].[User] where role = 'User'");
        console.log(users.recordset);
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