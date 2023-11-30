const Product = require("../models/ProductModel")
const bcrypt = require('bcrypt')



const createProduct = (newProduct) => {
    return new Promise(async (reslove, reject) => {
        try {
            const { name, image, type, price, countInStock, rating, description, discount } = newProduct
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct != null) {
                reslove({
                    status: 'ok',
                    message: ' the name  of Product is already'
                })
            }

            const createProduct = await Product.create({
                name, image, type, price,
                countInStock,
                rating,
                description,
                discount
            })
            if (createProduct) {
                reslove({
                    status: 'ok',
                    message: 'success',
                    data: createProduct
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}
const updateProduct = (id, data) => {
    return new Promise(async (reslove, reject) => {

        try {
            const checkProduct = await Product.findOne({ _id: id })

            if (!checkProduct === null) {
                reslove({
                    status: 'ok',
                    message: 'the user is not defined',
                })
            }
            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            reslove({
                status: 'ok',
                message: 'success',
                data: updateProduct
            })

        }
        catch (error) {
            console.log(error);
        }
    })
}
const deleteProduct = (id) => {
    return new Promise(async (reslove, reject) => {

        try {
            const checkProduct = await Product.findOne({ _id: id })

            if (!checkProduct === null) {
                reslove({
                    status: 'ok',
                    message: 'the product is not defined',
                })
            }
            await Product.findByIdAndDelete(id)
            reslove({
                status: 'ok',
                message: 'detele product success',

            })

        }
        catch (error) {
            console.log(error);
        }
    })
}
const getAllProducts = (limit, page, sort, filter) => {

    return new Promise(async (reslove, reject) => {

        try {
            const totalProduct = await Product.countDocuments()
            let allProducts = []
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
                reslove({
                    status: 'ok',
                    message: 'success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPages: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                reslove({
                    status: 'ok',
                    message: 'success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPages: Math.ceil(totalProduct / limit)
                })
            }
            if (!limit) {
                allProducts = await Product.find()
            } else {
                allProducts = await Product.find().limit(limit).skip(page * limit)

            }
            reslove({
                status: 'ok',
                message: 'success',
                data: allProducts,
                total: totalProduct,
                pageCurrent: page + 1,
                totalPages: Math.ceil(totalProduct / limit)
            })
        }
        catch (error) {
            console.log(error);
        }
    })
}
const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }
            resolve({
                status: 'ok',
                message: 'SUCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'ok',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProducts,
    getAllType






}

