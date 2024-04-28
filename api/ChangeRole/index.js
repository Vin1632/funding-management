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

    const userId = req.body.userId;
        const action = req.body.action; 
        
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

            if (action === 'toUser') {
                await pool.request()
                    .input('userId', sql.Int, userId)
                    .query("UPDATE [dbo].[User] SET role = 'User' WHERE ID = @userId");
                    
            } else if (action === 'toManager') {
                await pool.request()
                    .input('userId', sql.Int, userId)
                    .query("UPDATE [dbo].[User] SET role = 'Manager' WHERE ID = @userId");
            } else {
                throw new Error('Invalid action. Valid actions are: block, unblock');
            }
        } catch (error) {
            context.res = {
                status: 500,
                body: { message: `Error updating user status: ${error.message}` }
            };
        }
}