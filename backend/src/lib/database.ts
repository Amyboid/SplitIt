
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
    setNewGroup(GroupName: string, Description: string, CreatorName: string) {
        return this.#database.query(`
            INSERT INTO Groups (GroupName, Description, CreatorName) 
            VALUES (?, ?, ?)
        `).run(GroupName, Description, CreatorName);
    }
    getGroupByUsername(Username: string) {
        return this.#database.query(`SELECT * FROM UserGroups WHERE Username=?;`).values(Username);
    }
    getMembersByGroupId(GroupId: number | bigint | string) {
        return this.#database.query(`SELECT Username FROM UserGroups WHERE GroupId=?;`).values(GroupId).flat();
    }
    getGroupById(GroupId: number | bigint) {
        return this.#database.query(`SELECT * FROM Groups WHERE GroupId=?;`).all(GroupId);
    }
    addUserToGroup(GroupId: number | bigint, Username: string) {
        this.#database.query(`
                INSERT INTO UserGroups (Username, GroupId)
                VALUES (?, ?)
            `).run(Username, GroupId);
    }
    addUserToGroupInvitations(InvitationId: string, Username: string, GroupId: number | bigint | string, NotificationId: number | bigint) {
        this.#database.query(`
                INSERT INTO GroupInvitations (InvitationId, Username, GroupId,NotificationId)
                VALUES (?, ?, ?, ?)
            `).run(InvitationId, Username, GroupId, NotificationId);

    }
    getGroupInfoByInvitationId(InvitationId: string) {
        console.log("InvitationId", InvitationId);
        return this.#database.query(`
            SELECT * FROM GroupInvitations WHERE InvitationId=?;
            `).all(InvitationId)
    }
    updateGroupById(GroupName: string, Description: string, GroupId: number | bigint | string,) {
        return this.#database.query(`
        UPDATE Groups SET GroupName=?, Description=? WHERE GroupId=?;
         `).run(GroupName, Description, GroupId)
    }
    deleteUserFromGroupByUsername(Username: string) {
        return this.#database.query(`
            DELETE FROM UserGroups WHERE Username=?;
            `).run(Username)
    }
    deleteInvitationByInvitationId(InvitationId: string) {
        return this.#database.query(`DELETE FROM GroupInvitations WHERE InvitationId=?;`).run(InvitationId);
    }
    addNotifications(Username: string, Title: string, Type: string) {
        return this.#database.query(`
                INSERT INTO Notifications (Username, Title, Type)
                VALUES (?, ?, ?)
                `).run(Username, Title, Type)
    }
    deleteNotificationByNotificationId(NotificationId: string) {
        return this.#database.query(`DELETE FROM Notifications WHERE NotificationId=?;`).run(NotificationId);
    }
    getNotificationsByUsername(Username: string) {
        return this.#database.query(`SELECT * FROM Notifications WHERE Username=?;`).all(Username);
    }
    addExpense(data: any) {
        const { GroupId, ExpenseTitle, Date, Category, Purpose, Amount, DivisionType } = data

        return (this.#database.query(`
            INSERT INTO Expenses (GroupId, ExpenseTitle, Date, Category, Purpose, Amount, DivisionType)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run(GroupId, ExpenseTitle, Date, Category, Purpose, Amount, DivisionType)).lastInsertRowid;
    }
    addExpenseDivision(ed: any) {
        // console.log("ghh: ",ed);
        let { ExpenseId, Username, Percentage } = ed
        // Percentage = "nj"
        // console.log("nmm",typeof(Percentage));

        // console.log(ExpenseId, Username, Percentage);

        this.#database.query(`
            INSERT INTO ExpenseDivisions (ExpenseId, Username, Percentage)
            VALUES (?, ?, ?)
        `).run(ExpenseId, Username, Percentage);
    }
    getExpenseByGroupId(GroupId: string): any {
        return this.#database.query(`SELECT * FROM Expenses WHERE GroupId=?;`).all(GroupId);
    }
    getExpenseByUserName(GroupId: string, Username: string): any {
        return this.#database.query(`SELECT Amount, Percentage FROM ExpenseDivisions
            INNER JOIN Expenses ON ExpenseDivisions.ExpenseId = Expenses.ExpenseId
            WHERE ExpenseDivisions.Username=? AND Expenses.GroupId=?;`).values(Username, GroupId);
    }
    deleteGroupRecordsByGroupId(GroupId: string) {
        this.#database.query(`DELETE FROM Groups WHERE GroupId=?;`).run(GroupId);
        this.#database.query(`DELETE FROM UserGroups WHERE GroupId=?;`).run(GroupId);
        this.#database.query(`DELETE FROM ExpenseDivisions
                                WHERE ExpenseId IN (
                                SELECT ExpenseId
                                FROM Expenses
                                WHERE GroupId=?);`).run(GroupId);
        this.#database.query(`DELETE FROM Expenses WHERE GroupId=?;`).run(GroupId);
    }
}
const db = new DatabaseOrm()
export { db };

