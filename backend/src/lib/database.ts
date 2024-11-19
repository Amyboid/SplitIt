
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
}
const db = new DatabaseOrm()
export { db };

