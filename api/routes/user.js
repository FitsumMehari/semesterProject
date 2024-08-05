const router = require("express").Router();
const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");

const User = require("../models/User");

// Get Materials
router.get("/:id", verifyToken, async(req, res, next) => {

    let id = req.params.id.split(":")[1];
    // let matches = id.match(/\d+/g);
    if (id != "all") {
        try {
            const user = await User.find({ _id: id });

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    } else if (id == "all") {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
});

// Edit Material
router.put("/:userId", verifyToken, async(req, res, next) => {
    try {
        const material = await Material.findByIdAndUpdate(req.body._id, {
            fieldofstudy: req.body.fieldofstudy,
            materialURL: req.body.materialURL,
            title: req.body.title,
        });
        res.status(200).json(material);
    } catch (error) {
        next(error);
    }
});

// Add Material
router.post("/:userId", verifyToken, async(req, res, next) => {
    try {
        const newMaterial = new Material({
            fieldofstudy: req.body.fieldofstudy,
            materialURL: req.body.materialURL,
            title: req.body.title,
        });

        const savedMaterial = await newMaterial.save();
        res.status(201).json(savedMaterial);
    } catch (error) {
        next(error);
    }
});

// Delete Material
router.delete("/:id", verifyToken, async(req, res, next) => {
    _id = req.params.id.split(":")[1];
    try {
        await Material.findByIdAndDelete(_id);
        res.status(200).json({ message: "deleted" });
    } catch (error) {
        next(error);
    }
});
module.exports = router;