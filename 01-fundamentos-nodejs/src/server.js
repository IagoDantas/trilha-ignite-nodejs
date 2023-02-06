// No node a gente não tem o ducument.querySelector pois é do proprio browser
//const http = require('http') //Padrão de importação chamado de COMMONJS (require)
// APLICAÇÃO HTTP => API 
//Padrão de importação chamado de ESMODULES6 (import), o import é mais moderno e mais usado, essa    alteração é feita no package.json alterando o type para module.    
import http from 'node:http'// o node pede para colocar um prefixo node: para identificar que é um modulo do node

const server = http.createServer((req,res)=>{//cria um servidor http e essa função recebe 2 parâmetros, request e response
    return res.end('Aula do ignite') //retorna uma resposta para o browser com o conteudo Hello World
})

server.listen(3333)
//usando o --watch no terminal para ficar observando as alterações no arquivo e atualizar o servidor automaticamente sem a necessidade de reiniciar o servidor ou usar o nodemon