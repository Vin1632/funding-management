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
    };
    const sql = require("mssql");

    const Title = req.body.Title;
    const Description = req.body.Description;
    const Email = req.body.Email;
    const Deadline = req.body.Deadline;
    const Requirements = req.body.Requirements;
    const Amount = req.body.Amount; // Include the Amount field
    const Events = req.body.Events;
    const Education = req.body.Education;
    const Business = req.body.Business;

    try {
        let pool = await sql.connect(config);
        let query = `
            INSERT INTO [dbo].[Adverts] (Title,UserID, Description, Email, Deadline, Requirements, Amount, Events, Education, Business)
            VALUES (@Title,(SELECT TOP(1) [ID]
            FROM [dbo].[User]
            WHERE Email = @Email), @Description, @Email, @Deadline, @Requirements, @Amount, @Events, @Education, @Business)
        `;
        let result = await pool.request()
            .input('Title', sql.VarChar, Title)
            .input('Email', sql.VarChar, Email)
            .input('Description', sql.VarChar, Description)
            .input('Deadline', sql.VarChar, Deadline)
            .input('Requirements', sql.VarChar, Requirements)
            .input('Amount', sql.Decimal, Amount) // Use sql.Decimal for currency values
            .input('Events', sql.Bit, Events)
            .input('Education', sql.Bit, Education)
            .input('Business', sql.Bit, Business)
            .query(query);

        context.res = {
            body: result.recordset
        };
    } catch(error) {
        console.log(error);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: error
        };
    }
};
