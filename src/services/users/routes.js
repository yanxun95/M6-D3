
import express from "express";
import db from "../../db/models/index.js";
const router = express.Router();
const { User, Review } = db;

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const data = await User.findAll({
                include: Review,
            });
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

    .post(async (req, res, next) => {
        try {
            console.log(req.body)
            const data = await User.create(req.body);
            res.send(data);
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    });

router
    .route("/:id")
    .get(async (req, res, next) => {
        try {
            const data = await User.findByPk(req.params.id);
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

    .put(async (req, res, next) => {
        try {
            const data = await User.update(req.body, {
                where: {
                    id: req.params.id,
                },
                returning: true,
            });
            res.send(data[1][0]);
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

    .delete(async (req, res, next) => {
        try {
            const rows = await User.destroy({ where: { id: req.params.id } });
            if (rows > 0) {
                res.send("ok");
            } else {
                res.status(404).send("Not found");
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    });



export default router;