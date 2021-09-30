import Product from "./products.js";
import Review from "./reviews.js";
import User from "./user.js";
import Category from "./category.js";
import categoryProduct from "./categoryProduct.js"

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

Category.belongsToMany(Product, { through: "categoryProduct" });
Product.belongsToMany(Category, { through: "categoryProduct" });

export default { Product, Review, User, Category, categoryProduct };