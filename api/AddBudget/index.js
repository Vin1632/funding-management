module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

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
    const sql = require("mssql");

    const Email = req.query.email;
try {
    let pool = await sql.connect(config);
    let res = await pool.request()
        .input('Email', sql.VarChar, Email)
        .query(`SELECT ID FROM [dbo].[User] WHERE Email = @Email`);

    let userId = res.recordset[0].ID;

    let result = await pool.request()
        .input('UserID', sql.Int, userId)
        .query(`SELECT EducationAmount, BusinessAmount, EventsAmount FROM [dbo].[Budgets] WHERE UserID = @UserID`);

    context.res = {
        body: result.recordset
    };
} catch (error) {
    console.log(error);
    context.res = {
        status: 500,
        body: error.message
    };
}



}