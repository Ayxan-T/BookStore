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
        console.log(result);
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
    },

    getBooksAndAuthors: async () => {
        const sql = `
        SELECT book.*, 
            author.name AS author_name, 
            author.url AS author_url, 
            award.name AS award_name, 
            award.year AS award_year
        FROM book
        LEFT JOIN written_by ON book.isbn = written_by.book_isbn
        LEFT JOIN author ON written_by.author_name = author.name
        LEFT JOIN awarded_to ON book.isbn = awarded_to.book_isbn
        LEFT JOIN award ON awarded_to.award_id = award.id;

        `;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getBooksAndAuthorsAndAwardByName: async (name) => {
        const sql = `SELECT book.*, author.name AS author_name, author.url AS author_url, award.name AS award_name, award.year AS award_year
            FROM book
            JOIN written_by ON book.isbn = written_by.book_isbn
            JOIN author ON written_by.author_name = author.name
            LEFT JOIN awarded_to ON book.isbn = awarded_to.book_isbn
            LEFT JOIN award ON awarded_to.award_id = award.id
            WHERE book.title LIKE CONCAT('%', ?, '%') OR author.name LIKE CONCAT('%', ?, '%')  OR award.name LIKE CONCAT('%', ?, '%') ;
        `;
        const [result] = await promisePool.query(sql, [name, name, name]);
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
        let sql;
        if (typeof code === 'string')
            sql = `delete from received_by where author_name = ?`;
        else 
            sql = `delete from received_by where award_id = ?`;
        await promisePool.query(sql, [code]);
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

export const insertSql = {
    insertBook: async (isbn, title, year, price_dollars, category) => {
        const sql = `INSERT INTO book VALUES(?, ?, ?, ?, ?)`;
        await promisePool.query(sql, [isbn, title, year, price_dollars, category]);
        console.log('book inserted');
    },
    insertAuthor: async (name, address, url) => {
        const sql = `INSERT INTO author VALUES(?, ?, ?)`;
        await promisePool.query(sql, [name, address, url]);
        console.log('author inserted');
    },
    insertAward: async (id, name, year) => {
        const sql = `INSERT INTO award VALUES(?, ?, ?)`;
        await promisePool.query(sql, [id, name, year]);
        console.log('award inserted');
    },
    insertWarehouse: async (code, phone, address) => {
        const sql = `INSERT INTO warehouse VALUES(?, ?, ?)`;
        await promisePool.query(sql, [code, phone, address]);
        console.log('warehouse inserted');
    },
    insertInventory: async (book_isbn, warehouse_code, number) => {
        const sql = `INSERT INTO inventory VALUES(?, ?, ?)`;
        await promisePool.query(sql, [book_isbn, warehouse_code, number]);
        console.log('inventory inserted');
    },
    insertContains: async (book_isbn, shopping_basket_basket_id, number) => {
        const sql = `INSERT INTO contains VALUES(?, ?, ?)`;
        await promisePool.query(sql, [book_isbn, shopping_basket_basket_id, number]);
        console.log('contains inserted');
    },    
}

export const updateSql = {
    updateBook: async (isbn, title, year, price_dollars, category) => {
        const sql = `
            UPDATE book
            SET isbn = ?, title = ?, year = ?, price_dollars = ?, category = ?
            WHERE isbn = ? 
        `
        await promisePool.query(sql, [isbn, title, year, price_dollars, category, isbn]);
        console.log('book updated')
    }, 

    updateAuthor: async (Name, address, url) => {
        const sql = `
            UPDATE author
            SET name = ?, address = ?, url = ?
            WHERE name = ? 
        `
        await promisePool.query(sql, [Name, address, url, Name]);
        console.log('author updated');
    },

    updateWarehouse: async (code, phone, address) => {
        const sql = `
            UPDATE warehouse
            SET code = ?, phone = ?, address = ?
            WHERE code = ? 
        `;
        await promisePool.query(sql, [code, phone, address, code]);
        console.log('warehouse updated');
    }
}