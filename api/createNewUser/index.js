module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
        const sql = require('mssql');


        const name = req.body.name;
        const role = req.body.role;
        const surname = req.body.surname;

        var parts = req.body.dob.split('-');
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


            var users;




            if (req.body.dob) {
                var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                const dob = mydate; 
        
                console.log("date here : " + dob);

                users = await pool.request()
                .input('name', sql.VarChar(255), name)
                .input('surname', sql.VarChar(255), surname)
                .input('dob', sql.Date, dob)
                .input('company', sql.VarChar(255), company)
                .input('email', sql.VarChar(255), email)
                .input('edu', sql.Bit, edu)
                .input('bus', sql.Bit, bus)
                .input('events', sql.Bit, events)
                .input('blocked', sql.Bit, blocked)
                .query("UPDATE [dbo].[User] SET [Name] = @name, [Surname] = @surname, [DateOfBirth] = @dob, [CompanyName] = @company,\
                 [Education] = @edu, [Business] = @bus, [Events] = @events, [Blocked] = @blocked WHERE [Email] = @email");
                
            }
            else {
                users = await pool.request()
                .input('name', sql.VarChar(255), name)
                .input('surname', sql.VarChar(255), surname)
                .input('company', sql.VarChar(255), company)
                .input('email', sql.VarChar(255), email)
                .input('edu', sql.Bit, edu)
                .input('bus', sql.Bit, bus)
                .input('events', sql.Bit, events)
                .input('blocked', sql.Bit, blocked)
                .query("UPDATE [dbo].[User] SET [Name] = @name, [Surname] = @surname, [CompanyName] = @company,\
                 [Education] = @edu, [Business] = @bus, [Events] = @events, [Blocked] = @blocked WHERE [Email] = @email");
            }


            console.log(users.recordset);
            context.res = {
                // status: 200, /* Defaults to 200 * /
                body: users.recordset
            };
        
            console.log(req.body);
        }
        catch(error){
            console.log(error);
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: error
            };
            
        }
}