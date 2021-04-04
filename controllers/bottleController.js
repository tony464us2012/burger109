import asyncHandler from 'express-async-handler'
import BottlePost from '../models/postModel.js'

const getBottles = asyncHandler( async(req, res) => {
    try{
        const allPost = await BottlePost.find({name: /\w/g })
            res.json(allPost)}
            catch (err) {
                res.json(err)
            }
    })

const postBottles = asyncHandler ( async(req, res) => {
   
    const bottle_post = new BottlePost({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price
    });

    try{
        const repeatedBottle = await BottlePost.find({ name: req.body.name })
        if(repeatedBottle) { await BottlePost.deleteOne({ name: req.body.Name })}
        await bottle_post.save()
        const allPost = await BottlePost.find({ name: /\w/g })
        res.json(allPost)
    }  catch (err) {
        res.json(err)
    };
})

const deleteBottle = asyncHandler( async(req, res) => {
   
    try {
        const id = req.body.userid
    await BottlePost.deleteOne({_id: id })
    }catch (err) {
        res.json(err)
    }
})

    export {
        getBottles,
        postBottles,
        deleteBottle
    }
