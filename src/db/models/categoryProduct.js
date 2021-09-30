import sequelize from "../index.js";

import s from "sequelize";
const { DataTypes } = s;

const CategoryProduct = sequelize.define("categoryProduct", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

export default CategoryProduct;