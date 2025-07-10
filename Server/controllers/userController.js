const JWT = require('jsonwebtoken');
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
var { expressjwt: jwt } = require("express-jwt");

//middleware
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET, algorithms: ["HS256"],
})

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name) {
            return res
                .status(400)
                .send({ success: false, message: "Name is required" });
        }
        if (!email) {
            return res
                .status(400)
                .send({ success: false, message: "Email is required" });
        }
        if (!password || password.length < 6) {
            return res
                .status(400)
                .send({ success: false, message: "Password is required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res
                .status(500)
                .send({ success: false, message: "user Already register  user" });
        }

        //hashed password
        const hashedPassword = await hashPassword(password);

        //save user
        const user = await userModel({
            name,
            email,
            password: hashedPassword,
        }).save();

        return res.status(201).send({
            success: true,
            message: "User register successfully",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Register Api",
            error,
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) throw new Error("Email is required");
        if (!password) throw new Error("Password is required");

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid Password oe userName",
            })

        }

        //jst token
        const token = await JWT.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        //undefined password
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: "User login successfully",
            user, token

        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error in user controller or login api"
        })
    }
};

//update user
const updateUserController = async (req, res) => {
    try {
        const { name, password, email } = req.body
        //user find
        console.log("before finding user")
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        //password validate
        if (password && password.length < 6) {
            return res.status(400).send({
                success: false,
                message: 'Password is required and should be 6 character and more'
            });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;

        //update USer
        const updatedUser = await userModel.findOneAndUpdate({ email }, {
            name: name || user.name,
            password: hashedPassword || user.password
        }, { new: true });

        //  await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: 'User updated successfully please Login',
            updatedUser: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error in User Update api",
            error

        })

    }
}

module.exports = { requireSignIn,registerController, loginController, updateUserController };
