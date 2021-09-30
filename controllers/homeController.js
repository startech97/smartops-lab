const data = require('../data/data')
exports.getHomePage = async(req,res) => {
    console.log(Object.keys(data.auth))
    res.render('home/home', {
        isHome: true,
        layout: 'empty'

    })
}