const express  = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')
const Auth = require('../middleware/auth')
const router = express.Router()



router.get('/signup', async(req,res)=>{
    try {
        res.render('signup')
    } catch (error) {
        console.log(error)
        
    }
})


router.post('/register', async(req,res)=>{
    try {
        const user_data = {
          
        }
        User.create(req.body, (error, user) => {
            if (error) {
                const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

                req.flash('registrationErrors', registrationErrors)
                res.send(registrationErrors)
            }
            console.log(user)
            res.redirect('/')
        })
    } catch (error) {
        console.log(error)
        
    }
})

router.get('/login', async(req,res)=>{
    session=req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.render('login')
})


router.post('/auth/login', async(req,res)=>{

    try {

        const {
            email,
            password
        } = req.body;
        // try to find the user
        User.findOne({
            email
        }, (error, user) => {
            if (user) {
                // compare passwords.
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {
                        // store user session.
                        session=req.session;
                        session.userid=user._id;
                       
                        res.send(`Hey there, welcome <a href=\'/user/logout'>click to logout</a>`);
                    
                        console.log('password is matched')

                    } else {
                        console.log('password does not matched')
                        res.send('password does not matched')
                    }
                })
            } else {
                console.log('user not found')
            }
        })
        
    } catch (error) {
        console.log(error)
    }
})


router.get('/logout', (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})


router.get('/found', async(req,res)=>{
    try {
        const user = await User.find({})
        console.log(user)
        res.send(user)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router