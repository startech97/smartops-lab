const sequelize = require('../connection')
const { QueryTypes } = require('sequelize')
exports.getTestPage = async(req,res) => {
    const data = await sequelize.query("select * from [dbo].[Questions]" ,{
        type: QueryTypes.SELECT,
        logging: false
    });
    const name = await sequelize.query("select * from [dbo].[Employees] where id = :id" ,{
        replacements: { id:req.params.user_id,},
        type: QueryTypes.SELECT,
        logging: false
    });
    res.render('admin/user-test',{
        layout: 'user-test',
        data,
        name: name[0],
        test_id: data[0].code
    })
}

exports.recordTest = async(req,res) => {
    const date = new Date(Date.now())
    for(let key in req.body) {
        await sequelize.query(`insert into [dbo].[Answers] (code_employee, code_test,code_question, value, date)
                                values (:code_employee, :code_test , :code_question, :value, :date)` ,{
        replacements: { 
            code_employee: req.params.user_id,
            code_test: req.params.test_id,
            code_question: key,
            value: req.body[key],
            date
        },
        type: QueryTypes.POST,
        logging: false
    });
    }
    res.send('{вы прошли тест. Спасибо}')

}