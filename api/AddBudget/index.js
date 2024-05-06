const sql = require("mssql");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const { email } = req.body;

    // Database configuration
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

    try {
        // Connect to the SQL Server database
        await sql.connect(config);

        // Check if the user exists in the User table
        const userQuery = `SELECT ID FROM dbo.[User] WHERE Email = @Email`;
        const userResult = await sql.query(userQuery, { Email: email });

        let userID;

        if (userResult.recordset.length > 0) {
            userID = userResult.recordset[0].ID;
        } else {
            // If the user doesn't exist, create a new user
            const createUserQuery = `INSERT INTO dbo.[User] (Email) VALUES (@Email);
                                     SELECT SCOPE_IDENTITY() AS UserID;`;
            const createUserResult = await sql.query(createUserQuery, { Email: email });

            userID = createUserResult.recordset[0].UserID;
        }

        // Retrieve budget information for the user
        const budgetQuery = `SELECT EducationAmount, BusinessAmount, EventsAmount 
                             FROM dbo.Budgets 
                             WHERE UserID = @UserID`;
        const budgetResult = await sql.query(budgetQuery, { UserID: userID });

        const budgetData = budgetResult.recordset[0];

        // Send response with budget data
        context.res = {
            status: 200,
            body: budgetData
        };
    } catch (error) {
        context.log.error('Error:', error);
        context.res = {
            status: 500,
            body: "Internal server error occurred."
        };
    } finally {
        // Close the database connection
        await sql.close();
    }
};
