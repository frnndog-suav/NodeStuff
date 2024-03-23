import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunck, enconding, callback) {
        const transformed = Number(chunck.toString()) * -1
        console.log("transformed", transformed)
        callback(null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer((req, res) => {
    return req.pipe(new InverseNumberStream()).pipe(res)
})

server.listen(3334)