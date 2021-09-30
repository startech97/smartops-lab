exports.getDownloadPage = async (req,res) => {
    res.render('analytic/download', {
       title:'Загрузка',

   })
}

let name = ''
exports.uploadFile = (req,res) => {
    try {
        let filedata = req.file;
        name = req.file.originalname
        if(!filedata)
            res.send("Ошибка при загрузке файла");
        else
        console.log('yes')
            res.redirect('/report');
    }catch(e) {
        console.log(e)
    }
}

exports.fetchDataChart = async(req,res) => {
    try {
        const { spawn } = require('child_process');
        const py = spawn('python', ["python\\python.py",`${name}`]);
        py.stdout.on('data', (data) => {
            res.json(data.toString())
        });
        py.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        });
        py.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        });
    }catch(e) {
        console.log(e)
    }
}