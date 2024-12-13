import cookieParser from "cookie-parser";
import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.use(cookieParser());              

router.get('/', (req, res) => {
    if (req.cookies.user && req.cookies.user.role === 'admin') {
            res.render('admin');
    } else {
        res.redirect('/');
    }
});

module.exports = router;