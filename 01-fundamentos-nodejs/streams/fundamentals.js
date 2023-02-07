// Importação de clientes via CSV (EXCEL)

// Readable Stream => Stream de leitura
// Writable Stream => Stream de escrita
// Duplex Stream => Stream de leitura e escrita
// No node toda entrada de porta e saida é automaticamente uma stream
//req / res são streams

// streams de transformação => transforma os dados de uma forma em outra

//process.stdin// é um readable stream que é recebe oq o usuario digita no terminal
//.pipe(process.stdout)// o pipe encaminha oq o usuario digita no terminal para o stdout que é oq o usuario vê no terminal
// pra trabalhar com streams a gente nunca pode estar usando um tipo primitivo, tem que ser buffer 
import {Readable,Writable,Transform} from 'node:stream'


class OneToHundredStream extends Readable{
    
    index = 1;
    
    _read(){
        const i = this.index++//

        setTimeout(()=>{
            if(i > 100){
                this.push(null)//push null para dizer que acabou
            }
            else{
                const buf = Buffer.from(i.toString())
    
                this.push(buf);
            }
        },1000)
    }
}

class InverseNumberStream extends Transform{
    _transform(chunk,encoding,callback){
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed)))

    }
}


class MultiplyByTenStream extends Writable{
    _write(chunk,encoding,callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}


new OneToHundredStream()
    .pipe(new InverseNumberStream())    
    .pipe(new MultiplyByTenStream())