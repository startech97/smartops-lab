const sequelize = require('../connection')
const { QueryTypes } = require('sequelize')
exports.getAdminPage = async (req,res) => {
    const data = await sequelize.query("select * from [dbo].[Employees] where owner = :owner" ,{
        replacements: { owner: req.session.userId },
        type: QueryTypes.SELECT,
        logging: false
    });
    const departments = await sequelize.query("select distinct [department] from [dbo].[Employees] where owner = :owner" ,{
        replacements: { owner: req.session.userId },
        type: QueryTypes.SELECT,
        logging: false
    });
    departments.forEach(item => {
        const a = []
        data.forEach(user => {
            if(item.department == user.department){
                a.push(user)
            }
        })
        item.user = a
    })
    res.render('admin/admin', {
        isAdmin: true,
       title:'Личный кабинет',
       data: departments

   })
}
exports.getStartPage = async(req,res) => {
    res.render('admin/admin-start',{
        isAdminStart: true
    })
}

exports.fetchDepartments = async(req,res) => {
   const data = req.body
   let id
   let department
   data.forEach((item,i) => {
       if(i == 0) id = item.id
       if(item.name == 'department') {
        department = item.value
        id = item.id
       }
       if(item.name !== 'department' && item.id == id) {
           item.department = department
       }
   });
   const names = data.filter(i => i.name !== 'department')
   const a = []
    names.forEach(item =>{
        if(item.name == 'surname') item.surname = item.value
        if(item.name == 'name') item.name = item.value
        delete item.value
            a.push(item)
        
    })
   const result = []
   for(let i=0; i< a.length-1;i=i+2){
    result.push({
        name: a[i+1].name,
        surname: a[i].surname,
        department:a[i+1].department,
        owner: req.session.userId
    })
   }
   const record = async () => {
    result.forEach((i)=> {
        sequelize.query("insert into [dbo].[Employees](name,surname,owner,department) values ( :name,:surname,:owner,:department)" ,{
            replacements: {name: i.name,surname: i.surname, owner:i.owner, department: i.department},
            type: QueryTypes.SELECT,
            logging: false
        });
       })
      await sequelize.query("update [dbo].[Users] set started = 1 where id = :owner" ,{
        replacements: { owner:req.session.userId,},
        type: QueryTypes.SELECT,
        logging: false
    });
   }

   record()
}

exports.getEmployeesPage = async (req,res) => {
    const data = await sequelize.query("select * from [dbo].[Employees] where id = :id" ,{
        replacements: { id:req.params.id,},
        type: QueryTypes.SELECT,
        logging: false
    });
    res.render('admin/employee',{
        data: data[0]
    })
}
exports.getTestsPage = async (req,res) => {
    const data = await sequelize.query("select distinct [name], [code] from [dbo].[Questions]" ,{
        type: QueryTypes.SELECT,
        logging: false
    });
    res.render('admin/tests',{
        isTests: true,
        data
    })
}
exports.getTestPage = async (req,res) => {
    const data = await sequelize.query("select * from [dbo].[Questions]" ,{
        type: QueryTypes.SELECT,
        logging: false
    });
    res.render('admin/test',{
        isTests: true,
        owner: req.session.userId,
        code: req.params.code,
        data
    })
}