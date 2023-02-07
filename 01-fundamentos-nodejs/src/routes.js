import { Database } from './database.js'
import { randomUUID } from 'node:crypto'//gera um id aleatorio unico universal para cada usuario
import { buildRoutePath } from './utils/build-route-path.js'
const database = new Database()

export const routes = [
    {
        method:'GET',
        path:buildRoutePath('/users'),
        handler: (req,res)=>{
            const {search} = req.query
            const users = database.select('users',{
                name:search,
                email:search
            })

            return res//seta o cabeçalho da resposta
            .end(JSON.stringify(users))
        }
    },
    {
        method:'POST',
        path:buildRoutePath('/users'),
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
        method:'PUT',
        path:buildRoutePath('/users/:id'),
        handler: (req,res)=>{
            const {id} = req.params
            const {name,email} = req.body


            database.update('users',id,{
                name,
                email
            })
            
            res.writeHead(204).end()
        }
    },
    {
        method:'DELETE',
        path:buildRoutePath('/users/:id'),
        handler: (req,res)=>{
            const {id} = req.params

            database.delete('users',id)
            res.writeHead(204).end()
        }
    }
    
]