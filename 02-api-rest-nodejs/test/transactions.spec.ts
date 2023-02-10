import { it, beforeAll, afterAll,describe, expect } from 'vitest'
import { app } from '../src/app';
import request from 'supertest'

describe('Transactions Routes', ()=>{
    beforeAll(async () => {
        await app.ready()
    })
    
    afterAll(async () => { 
        await app.close()
    })
    
    it.only('should be able to create a new transaction', async ()=>{
        
        await request(app.server)
        .post('/transactions')
        .send({
            title: 'New transaction',
            amount:1999,
            type: 'credit',
        })
        .expect(201)
    })

    it.todo('should be able to list all transactions', async ()=>{
        const createTransactionsResponse = await request(app.server)
        .post('/transactions')
        .send({
            title: 'New transaction',
            amount:1999,
            type: 'credit',
        })
        
        const cookies = createTransactionsResponse.headers['Set-Cookie']

        const listTransactionsResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie',cookies)
        .expect(200)

        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New transaction',
                amount:1999,
            })
        ])

    })   
})

    

