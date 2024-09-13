import jsonServer from 'json-server';
import multer from 'multer';
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/cardimage')
    },
    filename: function (req, file, cb) {
        let date = new Date()
        let image = date.getTime() + '_' + file.originalname
        req.body.image = image
        cb(null, image)
    }
})

const bodyParser = multer({ storage: storage }).any()
server.use(bodyParser)
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})