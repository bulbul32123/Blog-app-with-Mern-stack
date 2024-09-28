const { Router } = require("express");
const path = require('path');
const multer = require('multer');
const { User } = require("../models/user");

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/profiles`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})
const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
    return res.render('profile', {
        user: req.user,
    })
})
router.post('/updated', upload.single('profilePic'), async (req, res) => {
    const { fullName, email } = req.body
    await User.findOneAndUpdate({ email: email }, { fullName: fullName, profileImageURL: `/uploads/profiles/${req?.file?.filename}` }, { new: true })
    return res.redirect('/')
})


module.exports = router