const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const stream = require('stream');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const sql = require("mssql");
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
    const email = req.body.email;
    
    // Check for content type
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.startsWith('multipart/form-data')) {
        context.res = {
            status: 400,
            body: "Content-Type must be multipart/form-data"
        };
        return;
    }

    const form = new formidable.IncomingForm({
        uploadDir: path.join(__dirname, 'uploads'), // Specify the upload directory
        keepExtensions: true // Keep file extensions
    });

    // Ensure the upload directory exists
    if (!fs.existsSync(form.uploadDir)) {
        fs.mkdirSync(form.uploadDir, { recursive: true });
    }

    // Convert req.body to a Buffer if it is not already
    let bodyBuffer;
    if (Buffer.isBuffer(req.body)) {
        bodyBuffer = req.body;
    } else {
        bodyBuffer = Buffer.from(req.body);
    }

    // Create a mock IncomingMessage to use with formidable
    const mockReq = new stream.PassThrough();
    mockReq.end(bodyBuffer);
    mockReq.headers = req.headers;

    
    let pool = await sql.connect(config);
    // Parse the mock request containing the form data
    form.parse (mockReq, async (err, fields, files) => {
        if (err) {
            context.log('Error parsing the form:', err);
            context.res = {
                status: 400,
                body: "Error parsing the form"
            };
            return;
        }

        // Log the received files and fields
        context.log('Fields:', fields);
        context.log('Files:', files);

        console.log(fields.email[0]);
        console.log("-----thank you -----");

        const uploadedFile = files.document; // assuming the field name is 'document'
        // console.log(files.document[0]);

        // const filesUP = files.document[0];
        // let newObj = {
        //     filesUP
        // };

        // console.log(newObj.PersistentFile);
        
        if (!uploadedFile) {
            context.res = {
                status: 400,
                body: "No file uploaded"
            };
            return;
        }

        // Read the uploaded file as binary data
        // const filePath = uploadedFile.path;
        // let fileBuffer;
        // try {
        //     fileBuffer = fs.readFileSync(filePath);
        // } catch (fileReadError) {
        //     context.log('File read error:', fileReadError);
        //     context.res = {
        //         status: 500,
        //         body: "Error reading the uploaded file"
        //     };
        //     return;
        // }

        console.log(".......thank you .....");
        console.log(fields.email[0]);
        console.log("...found the email.....");

        // try {
        //     console.log("------we are in -------");
        //     console.log(files.document[0].PersistentFile.newFilename);
        //     console.log("------we are still in -------");
        //     let res2 = await  pool.request()
        //         .input('UserID', sql.Int, userId)
        //         .input('pdf', sql.VarBinary, files.document[0].PersistentFile.newFilename)
        //         .query(`UPDATE [dbo].[Applications] SET Filename = @pdf WHERE Application_ID = 12`);

        //     if (res2.recordset.length === 0) {
        //         context.res = {
        //             status: 404,
        //             body: "User not found"
        //         };
        //         return;
        //     }
        //     else{
                // console.log("------we are inside else-------");
                // context.res = {
                //     status: 200,
                //     body: {
                //         message: "File uploaded successfully",
                //         fileName: uploadedFile.name,
                //         filePath: uploadedFile.path
                //     }
        //         };

        //     }

           
        // } catch (error) {
        //     context.log('SQL error:', error);
        //     context.res = {
        //         status: 500,
        //         body: error.message
        //     };
        // }

        console.log("------we are inside else-------");
            context.res = {
                status: 200,
                body: {
                    message: "File uploaded successfully",
                    fileName: uploadedFile.name,
                    filePath: uploadedFile.path
                }
            }
    });
};
