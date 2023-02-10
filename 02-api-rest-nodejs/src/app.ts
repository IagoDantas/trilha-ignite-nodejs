
import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify()
app.register(cookie)

// testes unitarios : unidade da sua aplicação
// testes de integração: comunicação entre duas ou mais unidades
// testes end to end  : simulam o comportamento do usuário na aplicação

// front-end: abre a página de login, digite o texto diego@rocketseat.com  e clique no botao de login
// back-end: chamadas http, websockets,

// Pirâmide de testes: E2E não dependem de nenhuma tecnologia, não depende de arquitetura, não depende de banco de dados, não depende de nada, MAS ISSO
// 

app.addHook('preHandler',async (request,reply) => {
  console.log(`[${request.method}] ${request.url}`)
})

app.register(transactionsRoutes, {
  prefix: '/transactions'
})
