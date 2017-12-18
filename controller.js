
module.exports = {
    create: (req, res) => {
        // Allows us to connect to the db through the request object and getting the db by the name we gave it when we set it on the app object. req.app.get('db')
        const dbInstance = req.app.get('db');

        //req.body contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as body-parser. If you ever are sending data back on the body and req.body is undefined check to make sure you are using body-parser.
        const {name, description, price, imageurl} = req.body;
        
        dbInstance.create_product([name, description, price,imageurl]).then( () => {
            res.status(200).send();
        })

    }, 
    getOne: (req, res) => {
        const dbInstance = req.app.get('db');

        //req.params
        //This property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /user/:name, then the “name” property is available as req.params.name. 
        const {params} = req;
        
        dbInstance.read_product([params.id]).then( product => {
            res.status(200).send(product);
        })

    },
    getAll: (req, res) => {
        const dbInstance = req.app.get('db');
        
        dbInstance.read_products().then( products => {
            res.status(200).send(products);
        })
        
    }, 
    update: (req, res) => {
        const dbInstance = req.app.get('db');

        //req.query
        // This property is an object containing a property for each query string parameter in the route. If there is no query string, it is the empty object, {}.
        const { params, query } = req; 
        
        dbInstance.update_product([params.id, query.desc]).then( product => {
            res.status(200).send();
        })

    },
    delete: (req, res) => {
        const dbInstance = req.app.get('db');
        const { params } = req;
        

        dbInstance.delete_product([params.id]).then( product => {
            res.status(200).send();
        })

    }
}