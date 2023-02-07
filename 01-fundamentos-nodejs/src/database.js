//{"users":[...]}

export class Database{
    #database = {}//quando eu designo uma variavel com # eu estou dizendo que ela é privada

    select(table){
        const data = this.#database[table] ?? []

        return data
    }

    insert(table,data){
        if(Array.isArray(this.#database[table])){
            this.database[table].push(data)
        } else {
            this.database[table] = [data]
        }
        return data
    }
}