
const sequelize = require('../connection')
const { QueryTypes } = require('sequelize')
exports.getLoginPage = async (req,res) => {
     res.render('auth/login', {
        title:'Авторизация',
        isLogin: true,
        error: req.flash('error')
    })
}

exports.logout = async (req,res) => {
     req.session.destroy(() => {
        res.redirect('/auth/login')
    })
}

exports.login = async (req,res) => {
    try {
        const {login,password} = req.body
        const data = await  sequelize.query("select * from [dbo].[Users] where login = :login", {
            replacements: {login: req.body.login},
            type: QueryTypes.SELECT,
            logging: false
        })
        
        const candidate = data[0]
        if(candidate) {
            const areSame = await password === candidate.password
            if(areSame) {
                console.log(candidate)
                req.session.user = candidate
                req.session.userId = candidate.id
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if(err) {
                        throw err
                    }
                    return res.redirect('/admin')
                })
            }else {
                req.flash('error', 'Неверный пароль')
                return res.redirect('/auth/login')
            }
        }else {
            req.flash('error', 'Такой учетной записи нет')
            return res.redirect('/auth/login')
        }
    } catch(e) {
        console.log(e)
    }
}