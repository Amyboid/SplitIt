
import { Database } from "bun:sqlite";

class DatabaseOrm {
    #database;
    constructor() {
        this.#database = new Database("./database.sqlite");
    }
    getNewUser() {
        return this.#database.query(`SELECT * FROM NewUsers;`).values();
    }
    deleteNewUser(UserId: string) {
        return this.#database.query(`DELETE FROM NewUsers WHERE UserId=?;`).run(UserId);
    }

    setNewUser(UserId: string) {
        return this.#database.query(`INSERT INTO NewUsers (UserId) VALUES (?);`).run(UserId);
    }

    setUser(Username: string, UserId: string) {
        return this.#database.query(`INSERT INTO Users (Username, UserId) VALUES (?, ?);`).run(Username, UserId);
    }

    getUserById(UserId: string) {
        return this.#database.query(`SELECT * FROM NewUsers WHERE UserId=?;`).values(UserId);
    }
    setNewGroup(GroupName: string, Description: string) {
        return this.#database.query(`
            INSERT INTO Groups (GroupName, Description) 
            VALUES (?, ?)
        `).run(GroupName, Description);
    }
    getGroupByUsername(Username: string) {
        return this.#database.query(`SELECT * FROM UserGroups WHERE Username=?;`).values(Username);
    }
    getMembersByGroupId(GroupId: number | bigint) {
        return this.#database.query(`SELECT Username FROM UserGroups WHERE GroupId=?;`).values(GroupId).flat();
    }
    getGroupById(GroupId: number | bigint) {
        return this.#database.query(`SELECT * FROM Groups WHERE GroupId=?;`).all(GroupId);
    }
    addUserToGroup(GroupId: number | bigint, Usernames: string[]) {
        for (const name of Usernames) {
            this.#database.query(`
                INSERT INTO UserGroups (Username, GroupId)
                VALUES (?, ?)
            `).run(name, GroupId);
        }
    }
    addExpense(data: any) {
        const { GroupId, ExpenseTitle, Date, Category, Purpose, Amount, DivisionType } = data

        this.#database.query(`
            INSERT INTO Expenses (GroupId, ExpenseTitle, Date, Category, Purpose, Amount, DivisionType)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run(GroupId, ExpenseTitle, Date, Category, Purpose, Amount, DivisionType);
    }
    addExpenseDivision(ed: any) {
        console.log(ed);
        const {ExpenseId, Username, Percentage} = ed

        // console.log(ExpenseId, Username, Percentage);
        
        this.#database.query(`
            INSERT INTO ExpenseDivisions (ExpenseId, Username, Percentage)
            VALUES (?, ?, ?)
        `).run(ExpenseId, Username, Percentage);
    }
}
const db = new DatabaseOrm()
export { db };

