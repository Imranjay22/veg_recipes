const User = require('../models/user')

module.exports = (req, res, next) => {
    User.findById(req.session.userid, (error, user) => {
        if (error || !user) {
            return res.redirect('/')
        }
        req.user = req.session.userid

        console.log(req.user)
    })
}