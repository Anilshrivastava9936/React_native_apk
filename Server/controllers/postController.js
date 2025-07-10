
// import postModel from '../models/postModel';
const postModel = require('../models/postModel')


//post create
const createPostController = async (req, res) => {

    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(500).json({ message: 'Please fill in all fields' })
        }
        const post = await postModel({ title, description, postedBy: req.auth._id })
        await post.save();
        res.status(201).send({
            success: true,
            message: 'Post Created SuccessFully',
            post
        })
        console.log(req);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: 'Error in Create Post Api',
            error
        })
    }

}

//get all post
const getAllPostsController = async (req, res) => {
    try {
        const posts = await postModel.find().populate('postedBy', "_id name").sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: "All Post Data",
            posts,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error Get in All Post",
            error
        })
    }
}


//get user posts
const getUserPostsController = async (req, res) => {
    try {
        // console.log("req.auth:", req.auth);

        if (!req.auth || !req.auth._id) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized: No user ID in token."
            });
        }

        const userPosts = await postModel.find({ postedBy: req.auth._id })
        res.status(200).send({
            success: "true",
            message: "user posts",
            userPosts
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: "false",
            message: "Error in User Post api",
            error
        })
    }
}

//delete post
const deletePostController = async (req, res) => {
    try {
        const { id } = req.params;
        await postModel.findByIdAndDelete({ _id: id })
        res.status(200).send({
            success: true,
            message: "post deleted success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in post delete",
            error
        })
    }
}

//UPDATE Post Controller
const updatePostController = async (req, res) => {
    try {
        const { title, description } = req.body;
        //post find by id
        const post = await postModel.findById({ _id: req.params.id });

        //validation
        if (!title || !description) {
            return res.status(500).send({
                success: false,
                message: "please Provide post title and description",

            });
        };

        const updatePost = await postModel.findByIdAndUpdate({ _id: req.params.id },
            {
                title: title || post?.title,
                description: description || post?.description
            }, { new: true });

        res.status(200).send({
            success: true,
            message: "Post updated Successfully",
            updatePost,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Update Routes",
            error,
        });
    }
}

module.exports = { createPostController, getAllPostsController, getUserPostsController, deletePostController, updatePostController }