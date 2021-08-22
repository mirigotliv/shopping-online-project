const Product = require('../models/product-model'),
const ProdCategory = require('../models/prodCategory-model');


//קבלת כל הקטגוריות שהמוצרים
function getAllCategories() {
    return new Promise((resolve, reject) => {
        ProdCategory.find({}, (err, prodCategories) => {
            if (err) {
                return reject(err);
            }
            resolve(prodCategories);
        });
    });
}


//הוספת קטגוריה
function addCategory(prodCategory) {
    return new Promise((resolve, reject) => {
        const categoryToAdd = new category(prodCategory);
        categoryToAdd.save((err, info) => {
            if (err) return reject(err);
            resolve(info);
        });
    });
}


//קבלת כל המוצרים
function getAllProducts() {
    return new Promise((resolve, reject) => {
        Product.find({}, (err, products) => {
            if (err) return reject(err);
            resolve(products);
        });
    });
}


//קבלת מוצרים ע''י קטגוריה שלהם
function getProductsByCategory(prodCategory) {
    return new Promise((resolve, reject) => {
        Product.find({ prodCategory }, (err, products) => {
            if (err) return reject(err);
            resolve(products);
        });
    });
}


//קבלת מוצר אחד
function getOneProduct(_id) {
    return new Promise((resolve, reject) => {
        Product.findOne({ _id }, (err, product) => {
            if (err) return reject(err);
            resolve(product);
        });
    });
}


//חיפוש מוצרים
function getSearchResults(val) {
    return new Promise(async (resolve) => {
        const products = await getAllProducts();
        const foundProducts = await products.filter(p => {
            if (p.name.indexOf(val) >= 0) return p;
        });
        resolve(foundProducts);
    });
}


//הוספת מוצר
function addProduct(product) {
    return new Promise((resolve, reject) => {
        const productToAdd = new Product(product);
        productToAdd.save((err, info) => {
            if (err) return reject(err);
            resolve(info);
        });
    });
}


//עדכון מוצר
function updateProduct(product) {
    return new Promise((resolve, reject) => {
        const productToUpdate = new Product(product);
        Product.findOneAndUpdate({ _id: productToUpdate._id }, productToUpdate, (err, info) => {
            if (err) return reject(err);
            resolve(info);
        });
    });
}


//מחיקת מוצר
function deleteProduct(_id) {
    return new Promise((resolve, reject) => {
        Product.deleteOne({ _id }, (err, info) => {
            if (err) return reject(err);
            resolve(info);
        });
    });
}


module.exports = {
    productLogic: {
        getAllProducts,
        getProductsByCategory,
        getOneProduct,
        getSearchResults,
        addProduct,
        updateProduct,
        deleteProduct
    },
    prodCategoriesLogic: {
        getAllCategories,
        addCategory
    }
}