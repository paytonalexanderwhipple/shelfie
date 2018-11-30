module.exports = {
    read: (req, res) => {
        let dbInstance = req.app.get('db');
        dbInstance.get_inventory()
            .then(inventory => {
                res.status(200).send(inventory)
            }).catch(error => {
                console.log(`(controller.read) ${error}`)
            })
    },
    readById: (req, res) => {
        let dbInstance = req.app.get('db')
        dbInstance.get_product(req.params.id)
            .then(product => {
                res.status(200).send(product)
            }).catch(error => {
                console.log(`(controller.readById ${error})`)
            })
    },
    create: (req, res) => {
        let dbInstance = req.app.get('db')
        let {name, price, image_url} = req.body
        dbInstance.create_product([name, price, image_url])
            .then(inventory => {
                res.sendStatus(201)
            }).catch(error => {
                console.log(`(controller.create) ${error}`)
            })
    },
    delete: (req, res) => {
        let dbInstance = req.app.get("db")
        dbInstance.delete_product(req.params.product_id)
            .then(() => {
                res.sendStatus(200)
            }).catch(error => {
                console.log(`(controller.delete)${error}`)
            })
    },
    update: (req, res) => {
        let dbInstance = req.app.get('db')
        let {name, price, image_url, product_id} = req.body
        dbInstance.update_product([name, price, image_url, product_id])
            .then(() => {
                res.sendStatus(200)
            }).catch(error => {
                console.log(`(controller.update)${error}`)
            })
    },
}