
exports.getHomePage = async(req,res) => {
    res.render('home/home', {
        isHome: true,

    })
}