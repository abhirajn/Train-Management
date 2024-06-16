const db = require("../config/db")

class User{
    constructor(username , name , phone , password ){
        this.username = username;
        this.name = name;
        this.phone = phone;
        this.password = password;
    }

    async save(){
        let sql = `INSERT INTO Users(username , name , phone , password)
        VALUES(
            '${this.username}',
            '${this.name}',
            '${this.phone}',
            '${this.password}'
        );`

        const res = await db.execute(sql);
       
        return res;
    }

    static async checkIfUserExist(username){
        let sql = `SELECT * FROM Users WHERE username = '${username}';`
        return db.execute(sql);
    }

    static async checkEmailMathches(username){
        let sql = `SELECT password FROM Users WHERE username = '${username}';`
        return db.execute(sql);
    }

    static async getPhonebyEmail(username){
        let sql = `SELECT phone FROM Users WHERE username = '${username}';`
        return db.execute(sql);
    }
    

}

module.exports = User;