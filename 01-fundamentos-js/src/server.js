import http from 'node:http'
import { json } from '../middlewares/json.js'
import { ROUTES } from '../routes/route.js'



const server = http.createServer(async (req, res) => {
    const { method, url } = req
    await json(req, res)

    const route = ROUTES.find((route) => route.method === method && route.path.test(url))

    if (route) {
        const routeParams = req.url.match(route.path)
        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)
