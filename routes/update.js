import cookieParser from "cookie-parser";
import express from "express";
import { updateSql } from "../database/sql";

const router = express.Router();

router.use(cookieParser());

router.post('/book', async (req, res) => {
    if (req.cookies.user) {
        await updateSql.updateBook(req.body.isbn, req.body.title, req.body.year, req.body.price_dollars, req.body.category);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})

router.post('/author', async (req, res) => {
    if (req.cookies.user) {
        await updateSql.updateAuthor(req.body.name, req.body.address, req.body.url);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})

router.post('/warehouse', async (req, res) => {
    if (req.cookies.user) {
        await updateSql.updateWarehouse(req.body.code, req.body.phone, req.body.address);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})

module.exports = router;