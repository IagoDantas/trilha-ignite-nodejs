// No node a gente não tem o ducument.querySelector pois é do proprio browser
//const http = require('http') //Padrão de importação chamado de COMMONJS (require)
// APLICAÇÃO HTTP => API 
//Padrão de importação chamado de ESMODULES6 (import), o import é mais moderno e mais usado, essa    alteração é feita no package.json alterando o type para module.    

//usando o --watch no terminal para ficar observando as alterações no arquivo e atualizar o servidor automaticamente sem a necessidade de reiniciar o servidor ou usar o nodemon



// ROUTES

// - CRIAR USUARIO
// - LISTAR TODOS OS USUARIOS
// - ALTERAR DADOS DO USUARIO
// - DELETAR USUARIO

// - HTTP 
//  - MÉTODO HTTP
//  - URL

// - GET => BUSCAR RECURSO DO BACK-END
// - POST => INSERIR RECURSO NO BACK-END
// - PUT => ATUALIZAR ALGUM RECURSO, POR EXEMPLO SE FOR ATUALIZAR VARIAS INFORMAÇÕES POR COMPLETO DO USUARIO(EMAIL, NOME, SENHA, ETC) 
// - PATCH => ATUALIZAR UMA INFORMAÇÃO ESPECIFICA DE UM RECURSO NO BACK-END 
// - DELETE => DELETAR UM RECURSO DO BACK-END


//stateful => a aplicação depende da informação que é salva em memoria pra funcionar
//stateless => não salva nada em memoria, salva em dispositivos externos, como banco de dados, por exemplo

import http from 'node:http'// o node pede para colocar um prefixo node: para identificar que é um modulo do node
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'
// Cabeçalhos (Requisição/Resposta) => Metadados 

// HTTP status code => 200, 201, 400, 404, 500

//  Query Params => http://localhost:3333/users?name=Diego&idade=25 URL STATEFUL => Filtros, paginação, não obrigatórios
//  Route Params => http://localhost:3333/users/1  (Identificar um recurso) => URL STATEFUL
//  Request Body => Enviar dados para criação ou atualização de um registro => URL STATELESS (HTTPs) 


// Edição e remoção de usuário
const server = http.createServer( async (req,res)=>{//cria um servidor http e essa função recebe 2 parâmetros, request e response
    
    const { method,url } = req
    
    await json(req,res)

    const route = routes.find(route=>{
        return route.method === method && route.path.test(url)
    })

    if(route){
        const routeParams = req.url.match(route.path)

        const { query,...params} = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req,res)
    }
   
    return res.writeHead(404).end() 
})

server.listen(3333)