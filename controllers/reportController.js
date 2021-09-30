
exports.getReportPage = async(req,res) => {

    res.render('report/report', {
        isReport: true,
        
    })
}

exports.getDepartmentPage = async(req,res) => {

    res.render('report/selectDepartment', {
        isReport: true,
        
    })
}