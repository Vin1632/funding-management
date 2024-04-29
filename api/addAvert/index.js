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

    const Title = req.body.Title;
    const Description = req.body.Description;
    const Email = req.body.Email;
    const Deadline = req.body.Deadline;
    const Requirements = req.body.Requirements;
    const Events = req.body.Events;
    const Education = req.body.Education;
    const Business = req.body.Business;


    try{
        let pool = await sql.connect(config);
        let query = `
            INSERT INTO [dbo].[Adverts] (Title, Description, Email, Deadline, Requirements, Events, Education, Business)
            VALUES (@Title, @Description, @Email, @Deadline, @Requirements, @Events, @Education, @Business)
        `;
        let result = await pool.request()
            .input('Title', sql.VarChar, Title)
            .input('Description', sql.VarChar, Description)
            .input('Email', sql.VarChar, Email)
            .input('Deadline', sql.VarChar, Deadline)
            .input('Requirements', sql.VarChar, Requirements)
            .input('Events', sql.Bit, Events)
            .input('Education', sql.Bit, Education)
            .input('Business', sql.Bit, Business)
            .query(query);

        context.res = {
            body: result.recordset
        };
        
    }
    catch(error){
        console.log(error);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: error
        };
        
    }

    // try {
    //     let pool = await sql.connect(config);
    
    //     const keys = Object.keys(req.body);
    //     const inputParams = {};
    //     const inputValues = keys.map((key, index) => {
    //         const paramName = `param${index}`;
    //         inputParams[paramName] = req.body[key];
    //         return `@${paramName}`;
    //     });
    
    //     const queryString = `INSERT INTO [dbo].[Adverts] (${keys.join(', ')}) VALUES (${inputValues.join(', ')})`;
    
    //     let users = await pool.request()
    //         .input(inputParams)
    //         .query(queryString);
    
    //     context.res = {
    //         body: users.recordset
    //     };
    // } catch (error) {
    //     console.log(error);
    // }

    
    
}