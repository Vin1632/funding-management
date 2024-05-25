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
/*
CREATE TABLE dbo.Budgets (
    BudgetID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    EducationAmount DECIMAL(18, 2) DEFAULT 0,
    BusinessAmount DECIMAL(18, 2) DEFAULT 0,
    EventsAmount DECIMAL(18, 2) DEFAULT 0,
    EducationNotes NVARCHAR(MAX),
    BusinessNotes NVARCHAR(MAX),
    EventsNotes NVARCHAR(MAX),
    FOREIGN KEY (UserID) REFERENCES dbo.[User](ID)
);

CREATE TABLE dbo.Adverts (
    AdID INT PRIMARY KEY,
    Email NVARCHAR(255) NOT NULL,
    Title NVARCHAR(MAX),
    UserID INT FOREIGN KEY REFERENCES dbo.[User](ID),
    Description NVARCHAR(MAX),
    Deadline DATE,
    Requirements NVARCHAR(MAX),
    Events BIT,
    Education BIT,
    Business BIT,
    Amount DECIMAL(18, 2);
);

CREATE TABLE dbo.Applications (
    Application_ID INT PRIMARY KEY IDENTITY(1,1),
    ApplicantsID INT NOT NULL,
    AdvertsID INT NOT NULL,
    AcceptedOrRejected BIT,
    FOREIGN KEY (ApplicantsID) REFERENCES dbo.[User](ID),
    FOREIGN KEY (AdvertsID) REFERENCES dbo.[Adverts](AdID)
);

CREATE TABLE dbo.[User] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    role VARCHAR(255),
    Name VARCHAR(255),
    Surname VARCHAR(255),
    DateOfBirth DATE,
    CompanyName VARCHAR(255),
    Email NVARCHAR(255),
    Education BIT,
    Business BIT,
    Events BIT,
    Blocked BIT
);

*/