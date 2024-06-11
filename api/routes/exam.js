const router = require('express').Router();
const cryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const md5 = require("md5");

dotenv.config();

const Exam = require('../models/Exam');

// Get all exams
router.get('/all', async(req, res, next) => {
    try {
        const exam = await Exam.find()
        res.status(200).json(exam);
    } catch (error) {

    }
})


module.exports = router;