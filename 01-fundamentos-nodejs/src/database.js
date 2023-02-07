// para trabalhar com arquivos internos dentro do node a gente usa o modulo interno do node fs => filesystem
import fs from 'node:fs/promises' // no promises não tem stream, ele é mais simples
// usando o type module o dirname e o filename nao funcionam mais no node, por isso tem que usar o import.meta.url

const databasePath =  new URL('../db.json',import.meta.url)

export class Database{
    #database = {}//quando eu designo uma variavel com # eu estou dizendo que ela é privada


    constructor(){
        fs.readFile(databasePath,'utf-8')
        .then(data=>{
            this.#database = JSON.parse(data)
        }).catch(()=>{
            this.#persist()
        })
    }

    #persist(){ 
        fs.writeFile(databasePath, JSON.stringify(this.#database))// o write file so aceita string, por isso o stringify
    }

    select(table,search){
        let data = this.#database[table] ?? []

        if(search){
            data = data.filter(row=> {
                return Object.entries(search).some(([key,value])=>{
                    return row[key].includes(value)
                })
            })
        }

        return data
    }

    insert(table,data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }

    delete(table,id){
        const rowIndex = this.#database[table].findIndex(row=>row.id === id)

        if(rowIndex > -1){
            this.#database[table].splice(rowIndex,1)
            this.#persist()
        }
    }
    update(table,id,data){
        const rowIndex = this.#database[table].findIndex(row=>row.id === id)

        if(rowIndex > -1){
            this.#database[table][rowIndex] = {id,...data}
            this.#persist()
        }
    }
}