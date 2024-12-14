import cookieParser from "cookie-parser";
import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.use(cookieParser());              

router.get('/',async (req, res) => {
    if (req.cookies.user && req.cookies.user.role === 'admin') {
        const Books = await selectSql.getBooks();
        const Authors = await selectSql.getAuthors();
        const Awards = await selectSql.getAwards();
        const Warehouses = await selectSql.getWarehouses();
        const Inventory = await selectSql.getInventory();
        const Contains = await selectSql.getContains();
            res.render('admin', {
                'books': Books,
                'authors': Authors,
                'awards': Awards,
                'warehouses': Warehouses,
                'inventory': Inventory,
                'contains': Contains,
                'userRole': req.cookies.user.role,
                'userId': req.cookies.user.id,
            });
    } else {
        res.redirect('/');
    }
});

module.exports = router;