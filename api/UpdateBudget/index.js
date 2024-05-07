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

    const sql = require("mssql");
    
    const BusinessAmounts = req.body.Business;
    const EventsAmounts = req.body.Events;
    const EducationAmounts = req.body.Education;

    const config = {
        user: "Amaan",
        password: "P0p0p0p0p",
        server: "fundingmanagement.database.windows.net",
        database: "FundingManager",
        options: {
            encrypt: true,
        },
        port: 1433
    }

    try {
        let pool = await sql.connect(config);
        let result = await pool.request()

            .input('EducationAmount', sql.Int, EducationAmounts)
            .input('EventsAmount', sql.Int, EventsAmounts)
            .input('BusinessAmount', sql.Int, BusinessAmounts)
            .query('UPDATE [dbo].[Budgets] SET (EducationAmount = @EducationAmount,  BusinessAmount = @BusinessAmount , EventsAmount = @EventsAmount) WWERE UserID =  ');

            context.res = {
                status: 200,
                body: { message: result }
            };
    } catch (error) {
        context.res = {
            status: 500,
            body: { message: `Error updating user: ${error.message}` }
        };
    }
}