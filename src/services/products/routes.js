
import express from "express";
import db from "../../db/models/index.js";
const router = express.Router();
const { Product, Review, Category, categoryProduct } = db;
import s from "sequelize";
const { Op } = s;

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const data = await Product.findAll({
                include: [Review, { model: Category, through: { attributes: [] } }],

                where: req.query.search
                    ? {
                        [Op.or]: [
                            { name: { [Op.iLike]: `%${req.query.search}%` } },
                            { category: { [Op.iLike]: `%${req.query.search}%` } },
                            { price: { [Op.eq]: `${req.query.search}` } }
                        ],
                    }
                    : {},

                // where: req.query.price
                //     ?
                //     { price: { [Op.eq]: `${req.query.price}` } }
                //     : {},
            });
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

    .post(async (req, res, next) => {
        try {
            const data = await Product.create(req.body);
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
            const data = await Product.findByPk(req.params.id);
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

    .put(async (req, res, next) => {
        try {
            const data = await Product.update(req.body, {
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
            const rows = await Product.destroy({ where: { id: req.params.id } });
            if (rows > 0) {
                res.send("ok");
            } else {
                res.status(404).send("Not found");
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

    .post(async (req, res, next) => {
        try {
            const body = { categoryId: req.body.categoryId, productId: req.params.id }
            const data = await categoryProduct.create(body);
            res.send(data);
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    });


export default router;