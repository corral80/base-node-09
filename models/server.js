
const express = require('express')
const cors = require('cors')
const router = require('../routes/usuarios.routes')
const { dbConnection } = require('../database/config.db')



class Server {


    constructor(){

        this.app = express()
        this.port = process.env.PORT || 3000
        this.usuariosPath = '/api/usuarios'

        //Conexión base de datos
        this.conexionDB()
        //Middlewares
        this.middlewares()

        //Rutas de la app
        this.routes()
    }

    async conexionDB(){

        await dbConnection()
    }
    

    middlewares(){

        //CORS
        this.app.use( cors() )
        //Lectura parseo del body
        this.app.use ( express.json() )
        //Carpeta publica
        this.app.use(express.static('public'))

    }

    routes(){

        this.app.use(this.usuariosPath,router)

    }

    listen(){

        this.app.listen(this.port,()=>{
            console.log('run en puerto '+this.port)
        })
    }
}




module.exports = Server