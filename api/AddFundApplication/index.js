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

    const Email = req.body.Email;

try {
    let pool = await sql.connect(config);
    let res = await pool.request()
        .input('Email', sql.VarChar, Email)
        .query(`SELECT ID FROM [dbo].[User] WHERE Email = @Email`);

    let EmailValue = res.recordset[0].ID; // Assuming ID is the correct column name

    let query = `
        INSERT INTO [dbo].[Applications] (ApplicantsID, AdvertsID)
        VALUES (@EmailValue, 1)
    `;
    
    let result = await pool.request()
        .input('EmailValue', sql.Int, EmailValue)
        .query(query);

    context.res = {
        body: result.recordset
    };
} catch (error) {
    console.log(error);
    context.res = {
        body: error.message // Returning only the error message for simplicity
    };
}

}