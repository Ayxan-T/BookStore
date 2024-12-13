import mysql from 'mysql2';

require("dotenv").config();

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'a1y2x3a4n5',
    database: 'bookstore',
});

const promisePool = pool.promise();

export const selectSql = {
    getAdminByIdAndPassword: async (id, password) => {
        const sql = `select * from admins where id = ? and password = ?`;
        const [result] = await promisePool.query(sql, [id, password]); 
        return result;
    },
    getCostumerByEmailAndPhone: async (email, phone) => {
        const sql = `select * from costumer where email = ? and phone = ?`;
        const [result] = await promisePool.query(sql, [email, phone]);
        return result;
    },
    getBooks: async () => {
        const sql = `select * from book`;
        const [result] = await promisePool.query(sql);
        return result;
    }
}