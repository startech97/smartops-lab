const sequelize = require('../connection')
const { QueryTypes } = require('sequelize')

module.exports = async function(req,res,next) {
    try {
     const data = await sequelize.query("select started from [dbo].[Users] where id = :owner" ,{
          replacements: { owner:req.session.userId,},
          type: QueryTypes.SELECT,
          logging: false
     })
     console.log(data)
     if(!data[0].started) {
          return res.redirect(`/admin/start/${req.session.user.id}`)
     }
         next()
    }catch(e) {
         console.log(e)
    }
    
}