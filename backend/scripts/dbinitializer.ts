import { exit } from "process";
import { Database } from "bun:sqlite";


const helpText = `
Usage: bun dbinit [command] [options]

This utility allows you to bootstrap a SQLite database with required tables for development.

Commands:
  help                      Display this help text.
  table <tableName>         Create the specified table if it does not exist.
  all                       Create all tables.
  drop  <tableName | all>   Delete the specified table if exists. 
                            To delete all tables, specify 'all' and include
                            the '--i-am-sure' flag to confirm the irreversible action.

Options:
  <tableName>               The name of the table to create (only applicable with the 'table' command).
                            Available tables: NewUsers, Users, Groups, UserGroups,
                            Notifications, Expenses, ExpenseDivisions.

Example:
  bun dbinit all               # Creates all tables
  bun dbinit table Users       # Creates the Users table

Notes:
- Ensure that you have the necessary permissions to create a database file in the current directory.
- The database will be created with the name 'database.sqlite'.
- If the database or a table already exists, it will not be recreated.

Error Codes:
  1 - Invalid command or missing arguments.
  2 - Table name not found or invalid.
`;


const DB_NAME = "database.sqlite";


function runQuery(dbName: string, sqlQueries: string[]) {
    const db = new Database(dbName);
    for (const sqlQuery of sqlQueries) {
        const q = db.query(sqlQuery);
        q.run();
        q.finalize();
    }
    db.close();
}



const tables = {
    newusers: `
        CREATE TABLE IF NOT EXISTS NewUsers (
            Id INTEGER PRIMARY KEY,
            UserId TEXT UNIQUE
        );
    `,
    users: `
        CREATE TABLE IF NOT EXISTS Users (
            Username TEXT PRIMARY KEY,
            UserId TEXT UNIQUE NOT NULL,
            TotalDebt REAL,
            TotalCredit REAL
        );
    `,
    groups: `
        CREATE TABLE IF NOT EXISTS Groups (
            GroupId INTEGER PRIMARY KEY,
            GroupName TEXT NOT NULL,
            Description TEXT,
            CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `,
    usergroups: `
        CREATE TABLE IF NOT EXISTS UserGroups (
            Username TEXT,
            GroupId INTEGER,
            FOREIGN KEY (Username) REFERENCES Users(Username),
            FOREIGN KEY (GroupId) REFERENCES Groups(GroupId),
            PRIMARY KEY (Username, GroupId)
        );
    `,
    notifications: `
        CREATE TABLE IF NOT EXISTS Notifications (
            NotificationId INTEGER PRIMARY KEY,
            Username TEXT,
            Title TEXT NOT NULL,
            Type TEXT NOT NULL,
            PushedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (Username) REFERENCES Users(Username)
        );
    `,
    expenses: `
        CREATE TABLE IF NOT EXISTS Expenses (
            ExpenseId INTEGER PRIMARY KEY,
            GroupId INTEGER,
            ExpenseTitle TEXT NOT NULL,
            Date DATETIME NOT NULL,
            Category TEXT NOT NULL,
            Purpose TEXT,
            Amount REAL NOT NULL,
            DivisionType TEXT NOT NULL,
            FOREIGN KEY (GroupId) REFERENCES Groups(GroupId)
        );
    `,
    expensedivisions: `
        CREATE TABLE IF NOT EXISTS ExpenseDivisions (
            ExpenseId INTEGER,
            Username TEXT,
            Percentage REAL NOT NULL,
            FOREIGN KEY (ExpenseId) REFERENCES Expenses(ExpenseId),
            FOREIGN KEY (Username) REFERENCES Users(Username),
            PRIMARY KEY (ExpenseId, Username)
        );
    `
};



if (Bun.argv[2] === "help") {
    console.log(helpText);
    exit(0);
}

if (Bun.argv[2] === "table") {
    const tableName = Object.keys(tables).filter((v) => v === Bun.argv[3]);
    if (!tableName.length) {
        console.log(helpText);
        exit(2);
    }
    runQuery(DB_NAME, [tables[tableName[0] as keyof typeof tables]]);
    exit(0);
}

if (Bun.argv[2] === "drop") {
    const db = new Database(DB_NAME);
    const q = db.query("DROP TABLE IF EXISTS NewUsers").run();
    exit(0);
}

if (Bun.argv[2] === "all") {
    runQuery(DB_NAME, Object.values(tables));
    exit(0);
}

console.log(helpText);
exit(1);


