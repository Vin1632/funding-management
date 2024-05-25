module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const sql = require("mssql");

    const userId = req.body.userId

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
            .input('userId', sql.VarChar(255), userId)
            .query('SELECT * \
            FROM [dbo].[Applications] as app \
            LEFT JOIN [dbo].Adverts as ads \
            ON app.AdvertsID = ads.AdID \
            Where ads.UserID = (SELECT ID FROM [dbo].[User] WhERE Email = @userId )');
            context.res = {
                status: 200,
                body: result.recordset
            };
    } catch (error) {
        context.res = {
            status: 500,
            body: { message: `Error deleting user: ${error.message}` }
        };
    }
}