const sequelize = require('../connection')
const { QueryTypes } = require('sequelize')

module.exports = async function(req,res,next) {
    try {
     const data = await sequelize.query("select [id] from [dbo].[Employees] where owner = :owner and id = :id" ,{
          replacements: { owner:req.params.owner, id: req.params.user_id},
          type: QueryTypes.SELECT,
          logging: false
     })
     if(!data.length) {
         return res.send('{error: Ссылка не активна}')
     }
         next()
    }catch(e) {
         console.log(e)
    }
    
}