const express = require('express')
const Category = require('../models/category')
const Recipe= require('../models/recipe')
const router = express.Router()

//home page 

router.get('/', async(req,res)=>{
    limitNumber = 8
   try {
    const categories = await Category.find({})
    const recipes = await Recipe.find({}).limit(limitNumber)
 
    res.render('index', {title: 'Tasty Cuisine', categories, recipes})
   } catch (error) {
    console.log(error)
    
   }
    
})

//explore recipes by categoryid

router.get('/category/:id', async(req,res)=>{
    try {
        let categoryid = req.params.id;
        const category = await Category.findById(categoryid)
        const recipes = await Recipe.find({category: category.title})
        console.log(recipes)
        if(recipes == ''){
            res.status(400).send('recipes not found')
            
        }else {
            res.render('allrecipes', { recipes, category})
        }
      
        
       
    } catch (error) {
        console.log(error)
      
       
        
    }
})

router.get('/recipe/:id', async(req,res)=>{
    try {
        let recipeId = req.params.id
        const recipe = await Recipe.findById(recipeId)
        console.log(recipe)
        res.render('post',{ recipe })

    } catch (error) {
        console.log(error)
        
    }
})


//add new category
router.get('/newcategory', (req,res)=>{
    res.render('new_category')
})

router.post('/addcategory', (req,res)=>{
    Category.create(req.body, (error, post) => {
        console.log(post)
        res.redirect('/')
    })
 

})




 





module.exports= router