const sequelize = require('./connection')
const app = require('./app')
require('dotenv').config()
async function start() {
    try {
        await sequelize.sync()
        app.listen(
            process.env.SERVER_PORT,
            process.env.HOST_IP,
            () => {
            console.log(`Server is running on PORT: ${process.env.SERVER_PORT}\n`)
            console.log("      Press CTRL-C to stop\n");
        })
    } catch(e) {
        console.log(e)
    }
}
start()