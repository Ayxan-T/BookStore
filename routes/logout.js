import cookieParser from "cookie-parser";
import express from "express";
//

const router = express.Router();

router.use(cookieParser());

router.get('/', (req, res) => {
    if (req.cookies.user) {
        res.clearCookie('user');
        res.redirect("/");
    } else {
        res.redirect("/");
    }
})

module.exports = router;