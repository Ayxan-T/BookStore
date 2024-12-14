import cookieParser from "cookie-parser";
import express from "express";
import { deleteSql } from "../database/sql";

const router = express.Router();

router.use(cookieParser());

router.post('/book', async (req, res) => {
    if (req.cookies.user) {
        await deleteSql.deleteAwardedto(req.body.code);
        await deleteSql.deleteWrittenby(req.body.code);
        await deleteSql.deleteBookByIsbn(req.body.code);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})
router.post('/author', async (req, res) => {
    if (req.cookies.user) {
        await deleteSql.deleteReceivedby(req.body.code);
        await deleteSql.deleteWrittenby(req.body.code);
        await deleteSql.deleteAuthorByName(req.body.code);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})
router.post('/award', async (req, res) => {
    if (req.cookies.user) {
        await deleteSql.deleteReceivedby(req.body.code);
        await deleteSql.deleteAwardedto(req.body.code);
        await deleteSql.deleteAwardById(req.body.code);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})
router.post('/warehouse', async (req, res) => {
    if (req.cookies.user) {
        await deleteSql.deleteInventory(req.body.code);
        await deleteSql.deleteWarehouseByCode(req.body.code);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})
router.post('/inventory', async (req, res) => {
    if (req.cookies.user) {
        await deleteSql.deleteInventory(req.body.code);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})
router.post('/contains', async (req, res) => {
    if (req.cookies.user) {
        await deleteSql.deleteContains(req.body.code);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
})
module.exports = router;