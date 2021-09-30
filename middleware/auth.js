module.exports = async function(req,res,next) {
    try {
         if(!req.session.isAuthenticated) {
              return res.redirect('/auth/login')
         }
         next()
    }catch(e) {
         console.log(e)
    }
    
}