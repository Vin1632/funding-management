const sql = require("mssql");
const multipart = require('parse-multipart');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    // Debugging headers
    context.log('Headers:', req.headers);
    
    const config = {
        user: "Amaan",
        password: "P0p0p0p0p",
        server: "fundingmanagement.database.windows.net",
        database: "FundingManager",
        options: {
            encrypt: true,
        },
        port: 1433
    };

    // Ensure content-type header is multipart/form-data
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.startsWith('multipart/form-data')) {
        context.res = {
            status: 400,
            body: "Content-Type must be multipart/form-data"
        };
        return;
    }

    // Retrieve the boundary for multipart form data
    let boundary;
    try {
        boundary = multipart.getBoundary(contentType);
    } catch (error) {
        context.res = {
            status: 400,
            body: "Invalid Content-Type header"
        };
        return;
    }

    // Parse the body as a buffer
    let bodyBuffer;
    try {
        bodyBuffer = Buffer.from(req.body);
    } catch (error) {
        context.res = {
            status: 400,
            body: "Error parsing request body"
        };
        return;
    }

    // Parse multipart form data
    let parts;
    try {
        parts = multipart.Parse(bodyBuffer, boundary);
    } catch (error) {
        context.res = {
            status: 400,
            body: "Error parsing multipart form data"
        };
        return;
    }

    // Extract parts by name
    const emailPart = parts.find(part => part.name === 'email');
    const filePart = parts.find(part => part.name === 'document');

    const email = emailPart ? emailPart.data.toString() : null;
    const file = filePart ? filePart.data : null;

    if (!email || !file) {
        context.res = {
            status: 400,
            body: "Email or document missing"
        };
        return;
    }

    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('Email', sql.VarChar, email)
            .query(`SELECT ID FROM [dbo].[User] WHERE Email = @Email`);

        let userId = res.recordset[0].ID;

        console.log(email);
        console.log(userId);

        let result = await pool.request()
            .input('UserID', sql.Int, userId)
            .input('pdf', sql.VarBinary, file)
            .query(`UPDATE [dbo].[Applications] SET pdfColumn = @pdf WHERE ApplicantsID = @UserID`);

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
