const User = require("../models/UserModel")
const bcrypt = require('bcrypt')

const { generalAccessToken, generalRefreshToken } = require("./JwtService")

const createUser = (newUser) => {
    return new Promise(async (reslove, reject) => {
        const { name, email, password,  phone, address,avatar } = newUser
        try {
            const checkUser = await User.findOne({
                email
            })
            if (checkUser != null) {
                reslove({
                    status: 'Err',
                    message: 'Email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            console.log(hash)
            const createUser = await User.create({
                name,
                email,
                password: hash,
                phone,
                address,
                avatar,
            })
            if (createUser) {
                reslove({
                    status: 'ok',
                    message: 'success',
                    data: createUser
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}
const loginUser = (userLogin) => {
    return new Promise(async (reslove, reject) => {
        const { email, password} = userLogin

        try {
            const checkUser = await User.findOne({
                email
            })
            if (checkUser === null) {
                reslove({
                    status: 'Err',
                    message: 'User is not defined'
                })
            }

            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                reslove({
                    status: 'Err',
                    message: 'The password or user is incorrect'
                })
            }
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
          
            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })


            reslove({
                status: 'ok',
                message: 'success',
                data: checkUser,
                access_token,
                refresh_token

            })
        }
        catch (error) {
            console.log(error);
        }
    })
}
const updateUser = (id, data) => {
    return new Promise(async (reslove, reject) => {

        try {
            const checkUser = await User.findOne({ _id: id })

            if (!checkUser === null) {
                reslove({
                    status: 'Err',
                    message: 'the user is not defined',
                })
            }
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true })
            reslove({
                status: 'ok',
                message: 'success',
                data: updateUser
            })

        }
        catch (error) {
            console.log(error);
        }
    })
}
const deleteUser = (id) => {
    return new Promise(async (reslove, reject) => {

        try {
            const checkUser = await User.findOne({ _id: id })

            if (!checkUser === null) {
                reslove({
                    status: 'Err',
                    message: 'the user is not defined',
                })
            }
            await User.findByIdAndDelete(id)
            reslove({
                status: 'ok',
                message: 'detele usersuccess',

            })

        }
        catch (error) {
            console.log(error);
        }
    })
}
const getAllUsers = () => {
    return new Promise(async (reslove, reject) => {

        try {
            const getAllUsers = await User.find()
            reslove({
                status: 'ok',
                message: 'success',
                data: getAllUsers
            })
          
        }
        catch (error) {
            console.log(error);
        }
    })
}
const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'Err',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'ok',
                message: 'SUCESS',
                data: user
            })
            console.log('user',user)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getDetailsUser,
   


}

