import lowdb from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";

export default class DbService {
    private db: lowdb.LowdbAsync<any> | undefined;

    constructor() {
        this.initDatabase();
    }

    private async initDatabase() {
        const adapter = await new FileAsync("db.json");
        this.db = await lowdb(adapter);
        await this.db.defaults({ posts: [], user: {}, count: 0 }).write();
        await this.db.set("user.sex", "male").write();

    }

    async SetSomeonesName(fullname: string): Promise<any> {
        console.log(this.db);
        await this.db?.set("user.fullname", fullname).write();
    }
}