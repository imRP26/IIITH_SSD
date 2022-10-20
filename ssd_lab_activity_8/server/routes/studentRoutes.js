const Query = require('../models/Query')
const express = require('express')
const router = express.Router()

const isAlive = (req, res, next) => {
    if(req.session.user){
        next()
        return
    }
    return res.status(401).send("Unauthorized...");
}


// router.use(isAlive)

router.get('/', async (req, res) => {
    try {
        const roll = req.query.roll
        const type = req.query.type
        let queries
        if (type=="ta")
            queries = await Query.find({ ta_roll: roll}).sort({IsActive:-1,updatedAt:-1});
        else
            queries = await Query.find({ std_roll: roll }).sort({updatedAt:-1});

        if(!queries.length){
            return res.status(204).json({ msg: "No queries exist..." })
        }

        return res.status(200).json({ "data": queries })
    } catch (err) {
        console.log(err)
        return res.status(500).send("Something went wrong!")
    }
})


router.post('/', async (req, res) => {
    console.log(req.body)
    let { exam_name, course_name, question_number, ta_roll, comments } = req.body;

    if (!exam_name || !course_name || !question_number || !ta_roll) {
        return res.status(400).send("Required fields missing");
    }

    // const existRoll = await Student.findOne({ roll });
    // if (existRoll) {
    //     return res.status(200).json({ msg: "User already exists..." });
    // }

    if (!comments)
        comments = "";

    let std_roll = req.session.user.rollno
    const newStd = new Query({ exam_name, course_name, question_number, ta_roll, std_roll, ta_comment:"", std_comment:comments, IsActive:true });
    const savedStd = await newStd.save();

    if (savedStd) {
        return res.status(200).json({ data: newStd })
        // res.render('success', {roll:savedStd._id});
    }
    else {
        return res.status(500).json({ msg: "Couldn't save query details" })
    }
})


router.put('/:id', async (req, res) => {
    const { ta_comment } = req.body;

    console.log(ta_comment)
    const existStd = await Query.findOne({ _id:req.params.id });
    if (!existStd) {
        return res.status(500).json({ msg: "Query doesn't exist..." });
    }

    const std = await Query.findByIdAndUpdate(existStd.id, { ta_comment, IsActive: false })

    if (std) {
        return res.status(200).json({ data: "Posted successfully" })
    }
    else {
        return res.status(500).json({ msg: "Couldn't update query" })
    }
})


module.exports = router