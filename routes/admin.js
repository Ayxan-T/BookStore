import cookieParser from "cookie-parser";
import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.use(cookieParser());              

router.get('/',async (req, res) => {
    if (req.cookies.user && req.cookies.user.role === 'admin') {
        const Books = await selectSql.getBooks();
            res.render('admin', {
                'books': Books,
                'userRole': req.cookies.user.role,
                'userId': req.cookies.user.id,
            });
    } else {
        res.redirect('/');
    }
});

module.exports = router;