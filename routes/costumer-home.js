import cookieParser from "cookie-parser";
import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.use(cookieParser());

router.get('/', async (req, res) => {
    if (req.cookies.user && req.cookies.user.role === 'costumer') {
        const BooksAuthors = await selectSql.getBooksAndAuthors();
        res.render('costumer-home', {
            books: BooksAuthors,
            userRole: req.cookies.user.role,
            userId: req.cookies.user.id
        });
    } else {
        res.redirect('/');
    }
});

router.post('/search', async (req, res) => {
    if (req.cookies.user && req.cookies.user.role === 'costumer') {
        console.log(req.body.search);
        if (req.body.search) {
            const BooksAuthors = await selectSql.getBooksAndAuthorsAndAwardByName(req.body.search);
            res.render('costumer-home', {
                books: BooksAuthors,
                userRole: req.cookies.user.role,
                userId: req.cookies.user.id
            });
        } else {
            res.redirect('/costumer/home');
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;