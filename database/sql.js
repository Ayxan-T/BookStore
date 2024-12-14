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
    },
    getAuthors: async () => {
        const sql = `select * from author`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getAwards: async () => {
        const sql = `select * from award`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getWarehouses: async () => {
        const sql = `select * from warehouse`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getInventory: async () => {
        const sql = `select * from inventory`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getContains: async () => {
        const sql = `select * from contains`;
        const [result] = await promisePool.query(sql);
        return result;
    }
}

export const deleteSql = {
    deleteBookByIsbn: async (code) => {
        const sql = `delete from book where isbn = ?`;
        await promisePool.query(sql, [code]);
        console.log("deleted");
    },
    deleteAuthorByName: async (code) => {
        const sql = `delete from author where name = ?`;
        await promisePool.query(sql, [code]);
        console.log("deleted");
    },
    deleteAwardById: async (code) => {
        const sql = `delete from award where id = ?`;
        await promisePool.query(sql, [code]);
        console.log("deleted");
    },
    deleteWarehouseByCode: async (code) => {
        const sql = `delete from warehouse where code = ?`;
        await promisePool.query(sql, [code]);
        console.log("deleted");
    },
    deleteAwardedto: async (code) => {
        const sql = `delete from awarded_to where book_isbn = ? or award_id = ?`;
        await promisePool.query(sql, [code, code]);
        console.log('awarded to deleted');
    },
    deleteReceivedby: async (code) => {
        const sql = `delete from received_by where author_name = ? or award_id = ?`;
        await promisePool.query(sql, [code, code]);
        console.log('receivedby deleted.')
    },
    deleteWrittenby: async (code) => {
        const sql = `delete from written_by where author_name = ? or book_isbn = ?`;
        await promisePool.query(sql, [code, code]);
        console.log('written to deleted');
    },
    deleteInventory: async (code) => {
        const sql = `delete from inventory where book_isbn = ? or warehouse_code = ?`;
        await promisePool.query(sql, [code, code]);
        console.log('inventory deleted')
    },
    deleteContains: async (code) => {
        // delete from the baskets that has not been ordered yet (We don't need to delete from past ordered baskets)
        const sql = `
            DELETE FROM contains
            WHERE (book_isbn = ? OR shopping_basket_basket_id = ?) AND shopping_basket_basket_id IN (
                SELECT basket_id
                FROM basket
                WHERE order_date IS NOT NULL
            );
        `;
        await promisePool.query(sql, [code, code]);
        console.log('contains deleted')
    }
}