const prodCategoryLogic = require('../business-logic-layer/products-logic').prodCategoriesLogic,
const productLogic = require('../business-logic-layer/products-logic').productLogic,
const router = require('express').Router();


//קבלת קטגוריות של מוצרים
router.get('/categories', async (request, response) => {
    try {
        const categories = await prodCategoryLogic.getAllCategories();
        return response.status(200).json(categories);
    }
    catch (err) {
        return response.status(500).send(err.message)
    }
})


//קבלת מוצר ע''י הקטגוריה שלו
router.post('/categories', async (request, response) => {
    try {
        const newCategory = request.body;
        const addedCategory = await prodCategoryLogic.addCategory(newCategory);
        return response.status(200).json(addedCategory);
    }
    catch (err) {
        return response.status(500).send(err.message)
    }
})


// קבלת כל המוצרים
router.get('/products', async (request, response) => {
    try {
        const products = await productLogic.getAllProducts();
        return response.status(200).json(products);
    }
    catch (err) {
        return response.status(500).send(err.message)
    }
});


//קבלת מוצרים ע''י הקטגוריה שלהם
router.get('/categories/:category', async (request, response) => {
    try {
        const category = request.params.category;
        const products = await productLogic.getProductsByCategory(category);
        return response.status(200).json(products);
    }
    catch (err) {
        return response.status(500).send(err.message)
    }
});


//קבלת מוצר אחד
router.get('/products/:_id', async (request, response) => {
    try {
        const _id = request.params._id;
        const product = await productLogic.getOneProduct(_id);
        return response.status(200).json(product);
    }
    catch (err) {
        return response.status(500).send(err.message)
    }
});


//חיפוש מוצרים
router.get('/products/search/:val', async (request, response) => {
    try {
        const val = request.params.val;
        const products = await productLogic.getSearchResults(val);
        return response.status(200).json(products);
    }
    catch (err) {
        return response.status(500).send(err.message)
    }
});


//הוספת מוצר
router.post('/products', async (request, response) => {
    try {
        const newProduct = request.body;
        const addedProduct = await productLogic.addProduct(newProduct);
        return res.status(200).json(addedProduct);
    }
    catch (err) {
        return response.status(500).send(err.message)
    }
})


//עדכון מוצר
router.put('/products/:_id', async (request, response) => {
    try {
        const product = request.body;
        const updatedProduct = await productLogic.updateProduct(product);
        return response.status(200).json(updatedProduct);
    }
    catch (err) {
        return response.status(500).send(err.message)
    }
})


//מחיקת מוצר
router.delete('/products/:_id', async (request, response) => {
    try {
        const _id = request.params._id;
        await productLogic.deleteProduct(_id);
        return response.status(200);
    }
    catch (err) {
        return response.status(500).send(err.message)
    }
})


module.exports = router;