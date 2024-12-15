import cookieParser from "cookie-parser";
import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.use(cookieParser());              // Helps us read cookies attached in incoming requests
router.get('/', (req, res) => {
    if (req.cookies.user) {
        if (req.cookies.user.role === 'admin')
            res.redirect('/admin');
        else if (req.cookies.user.role === 'costumer')
            res.redirect('/costumer/home');
    } else
    res.render('login');
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const admin = await selectSql.getAdminByIdAndPassword(vars.id, vars.password);
    const costumer = await selectSql.getCostumerByEmailAndPhone(vars.id, vars.password);

    let checkLogin = false;
    let userRole = '';
    let whoAmI = '';

    if (admin.length > 0) {
        console.log('admin is logging in');
        checkLogin = true;
        userRole = 'admin';
        whoAmI = admin[0].id;
        req.session.user = { id: whoAmI, password: admin[0].password, checkLogin: true };
    } else if (costumer.length > 0) {
        console.log('costumer is logging in')
        checkLogin = true;
        userRole = 'costumer';
        whoAmI = costumer[0].email;
        req.session.user = { id: whoAmI, password: costumer[0].phone, checkLogin: true };
    }

    if (checkLogin) {
        res.cookie('user', {
            id: whoAmI,
            role: userRole
        }, {
            expires: new Date(Date.now() + 120000), // 2 minutes
            httpOnly: true
        });
            res.redirect('/');
    } else {
        res.send('<script>alert("Login failed!"); location.href="/";</script>');
    }
});


module.exports = router;