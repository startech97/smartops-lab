module.exports =  async function(req,res,next) {
    try{
        res.locals.isAuth = req.session.isAuthenticated
        next()
    }catch(e) {
        console.log(e)
    }
}