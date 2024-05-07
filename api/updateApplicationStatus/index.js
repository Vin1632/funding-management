module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const sql = require("mssql");

    const status = req.body.status;
    const id = req.body.id;

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
            .input('status', sql.Bit, status)
            .input('applicationId', sql.Int, id)
            .query('UPDATE [dbo].[Applications] \
            SET [AcceptedOrRejected] = @status WHERE Application_ID = @applicationId');
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