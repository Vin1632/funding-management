module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
        const sql = require('mssql');


        const name = req.body.name;
        const role = req.body.role;
        const surname = req.body.surname;
        const dob = req.body.dob;
        const company = req.body.company;
        const email = req.body.email;
        const edu = req.body.edu;
        const bus = req.body.bus;
        const events = req.body.events;
        const blocked = req.body.blocked;

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
    

        try{
            let pool = await sql.connect(config);
            let users = await pool.request()
            .input('name', sql.VarChar(255), name)
            .input('role', sql.VarChar(255), role)
            .input('surname', sql.VarChar(255), surname)
            .input('dob', sql.Date, dob)
            .input('company', sql.VarChar(255), company)
            .input('email', sql.VarChar(255), email)
            .input('edu', sql.Bit, edu)
            .input('bus', sql.Bit, bus)
            .input('events', sql.Bit, events)
            .input('blocked', sql.Bit, blocked)
            .query("INSERT INTO [dbo].[User] ([ID],[role],[Name],[Surname],[DateOfBirth],[CompanyName],[Email],[Education],[Business],[Events],[Blocked]) \
            VALUES ('100',@role,@name,@surname,@dob,@company,@email,@edu,@bus,@events,@blocked)");
            console.log(users.recordset);
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: users.recordset
            };
        
    
        }
        catch(error){
            console.log(error);
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: error
            };
            
        }
}