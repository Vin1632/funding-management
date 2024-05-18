module.exports = async function (context, req) {
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
    const Email = req.query.email;

    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Email', sql.VarChar, Email)
            .query(`
                SELECT 
                    [AdID],
                    [Email],
                    [Title],
                    [UserID],
                    [Description],
                    [Deadline],
                    [Requirements],
                    [Events],
                    [Education],
                    [Business],
                    [Amount]
                FROM 
                    [dbo].[Adverts]
                WHERE 
                    [Email] = @Email
            `);

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
};
