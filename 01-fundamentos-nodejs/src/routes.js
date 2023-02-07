import { Database } from './database.js'
import { randomUUID } from 'node:crypto'//gera um id aleatorio unico universal para cada usuario
const database = new Database()

export const routes = [
    {
        method:'GET',
        path:'/users',
        handler: (req,res)=>{
            const users = database.select('users')

            return res//seta o cabeçalho da resposta
            .end(JSON.stringify(users))
        }
    },
    {
        method:'POST',
        path:'/users',
        handler: (req,res)=>{
            const {name,email} = req.body

            const user = ({
                id: randomUUID(),
                name,
                email,
            })

            database.insert('users',user)

            return res.writeHead(201).end()
        }
    },
    {
        method:'DELETE',
        path:'/users/:id',
        handler: (req,res)=>{
            
        }
    }
]