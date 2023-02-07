import { Readable } from 'node:stream';

class OneToHundredStream extends Readable{
    
    index = 1;
    
    _read(){
        const i = this.index++

        setTimeout(()=>{
            if(i > 5){
                this.push(null)//push null para dizer que acabou
            }
            else{
                const buf = Buffer.from(i.toString())
    
                this.push(buf);
            }
        },1000)
    }
}

fetch('http://localhost:3334',{
    method: 'POST',
    body: new OneToHundredStream(),// É POSSIVEL PASSAR NO BODY DA MINHA REQUISIÇÃO UM STREAM
    duplex:'half'
}).then(response=>{
    return response.text()
}).then(data =>{
    console.log(data)
})