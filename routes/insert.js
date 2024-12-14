import cookieParser from "cookie-parser";
import express from "express";
import { insertSql } from "../database/sql";

const router = express.Router();

router.use(cookieParser());

router.post('/book', async (req, res) => {
    if (req.cookies.user) {
        console.log(req.body)
        await insertSql.insertBook(req.body.isbn, req.body.title, req.body.year, req.body.price_dollars, req.body.category);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})
router.post('/author', async (req, res) => {
    if (req.cookies.user) {
        console.log(req.body)
        await insertSql.insertBook(req.body.name, req.body.address, req.body.url);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})
router.post('/award', async (req, res) => {
    if (req.cookies.user) {
        console.log(req.body)
        await insertSql.insertBook(req.body.id, req.body.name, req.body.year);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})
router.post('/warehouse', async (req, res) => {
    if (req.cookies.user) {
        console.log(req.body)
        await insertSql.insertWarehouse(req.body.code, req.body.phone, req.body.address);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})
router.post('/inventory', async (req, res) => {
    if (req.cookies.user) {
        console.log(req.body)
        await insertSql.insertInventory(req.body.book_isbn, req.body.warehouse_code, req.body.number);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})
router.post('/contains', async (req, res) => {
    if (req.cookies.user) {
        console.log(req.body)
        await insertSql.insertContains(req.body.book_isbn, req.body.shopping_basket_basket_id, req.body.number);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})

module.exports = router;