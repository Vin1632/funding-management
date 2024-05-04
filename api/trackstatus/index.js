module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const Email = req.body.Email;

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

    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('Email', sql.VarChar, Email)
            .query(`SELECT A.*, U.Name AS ApplicantName, Ad.Title AS AdTitle
                     FROM dbo.Applications A
                     JOIN dbo.[User] U ON A.ApplicantsID = U.ID
                     JOIN dbo.Adverts Ad ON A.AdvertsID = Ad.AdID
                     WHERE U.Email = @Email`);

        context.res = {
            body: res.recordset
        };
    } catch (error) {
        console.log(error);
        context.res = {
            body: error.message
        };
    }
}
