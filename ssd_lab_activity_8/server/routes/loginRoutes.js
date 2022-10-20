const Users = require('../models/User')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()


router.post('/register', async (req, res) => {
    let { rollno, password, role } = req.body

    if (!rollno || !password || !role)
        return res.status(400).json({ msg: 'Password and Roll are required' })

    const user = await Users.findOne({ rollno }) // finding user in db
    if (user) return res.status(400).json({ msg: 'User already exists' })

    const newUser = new Users({ rollno, password, role })
    // hasing the password
    bcrypt.hash(password, 7, async (err, hash) => {
        if (err)
            return res.status(400).json({ msg: 'error while saving the password' })

        newUser.password = hash
        const savedUserRes = await newUser.save()

        if (savedUserRes){
            console.log("User saved")
            return res.status(200).json({ msg: 'user is successfully saved' })
        }
    })
})


router.post(`/login`, async (req, res) => {
    const { rollno, password, role } = req.body

    if (!rollno || !password || !role) {
        res.status(400).json({ msg: 'Something missing' })
    }

    const user = await Users.findOne({ rollno: rollno, role: role }) // finding user in db
    if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' })
    }

    // comparing the password with the saved hash-password
    const matchPassword = await bcrypt.compare(password, user.password)
    if (matchPassword) {
        const userSession = { rollno: user.rollno } // creating user session to keep user loggedin also on refresh
        req.session.user = userSession // attach user session to session object from express-session
        req.session.save();
        return res
            .status(200)
            .json({ msg: 'You have logged in successfully', userSession }) // attach user session id to the response. It will be transfer in the cookies
    } else {
        return res.status(400).json({ msg: 'Invalid credential' })
    }
})


router.get('/logout', async (req, res) => {
    if(req.session.user){
        req.session.destroy(err => {
            if(err)
                return res.status(500).send("Unable to Logout!");
            else
                return res.status(200).json({"msg": "Logout Successfull..."});
        })
    }
})


router.get('/isAuth', async (req, res) => {
    if (req.session.user) {
        return res.json(req.session.user)
    } else {
        return res.status(401).json('unauthorize')
    }
})

router.get('/', async (req, res) => {
    const tas = await Users.find({ role: "TA" })
    res.status(200).json({ data: tas })
})

module.exports = router
