const router = require('express').Router();
const cryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const md5 = require("md5");

dotenv.config();

const Exam = require('../models/Exam');
const { verifyTokenAndAuthorization } = require('./verifyToken');

// Get all exams
router.get('/all', async(req, res, next) => {
    try {
        const exam = await Exam.find()
        res.status(200).json(exam);
    } catch (error) {
        next(error)
    }
})

// Add exam
router.post('/:userId', verifyTokenAndAuthorization, async(req, res, next) => {
    try {

        const newExam = new Exam({
            courseName: req.body.courseName,
            examTitle: req.body.examTitle,
            questions: req.body.questions,
        })

        const savedExam = await newExam.save();
        res.status(201).json(savedExam)
    } catch (error) {

    }
})


module.exports = router;