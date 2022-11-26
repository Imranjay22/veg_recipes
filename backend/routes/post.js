const express = require('express')
const Recipe = require('../models/recipe')
const router = express.Router()

router.get('/newpost', async (req,res)=>{
    res.render('new_post')
   
})
router.get('/allpost', async(req,res)=>{
    const allposts = await Post.find({})
        .populate('category')
    console.log(allposts.category)
})


router.post('/create', async(req,res)=>{
   
    Recipe.create(req.body, (error, post) => {
        res.redirect('/')
    })
   

})




module.exports = router