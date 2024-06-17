const db = require("../config/db");
// const { use } = require("../routes/adminRoutes");


class Admin{
    static async checkIfUserExist(username){
        // console.log("hhhi")
        // console.log(username)
        let sql = `SELECT * FROM admins WHERE username = '${username}';`
        return db.execute(sql);
    }

    static async checkEmailMathches(username){
        let sql = `SELECT adminPass FROM admins WHERE username = '${username}';`
        return db.execute(sql);
    }
}   


module.exports = Admin;