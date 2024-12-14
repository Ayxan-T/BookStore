import cookieParser from "cookie-parser";
import express from "express";
import { deleteSql } from "../database/sql";

const router = express.Router();

router.use(cookieParser());

router.post('/book', async (req, res) => {
    if (req.cookies.user) {
        await deleteSql.deleteBookByIsbn(req.body.isbn);
        res.redirect('/');
    }
})
router.post('/author', async (req, res) => {
    if (req.cookies.user) {
        await deleteSql.deleteAuthorByName(req.body.name);
        res.redirect('/');
    }
})
router.post('/award', async (req, res) => {
    if (req.cookies.user) {
        await deleteSql.deleteAwardById(req.body.id);
        res.redirect('/');
    }
})
router.post('/warehouse', async (req, res) => {
    if (req.cookies.user) {
        await deleteSql.deleteWarehouseByCode(req.body.code);
        res.redirect('/');
    }
})
router.post('/inventory', async (req, res) => {
    if (req.cookies.user) {
        await deleteSql.deleteInventoryByBookIsbn(req.body.book_isbn);
        res.redirect('/');
    }
})
router.post('/contains', async (req, res) => {
    if (req.cookies.user) {
        await deleteSql.deleteContainsByBookIsbn(req.body.book_isbn);
        res.redirect('/');
    }
})
module.exports = router;