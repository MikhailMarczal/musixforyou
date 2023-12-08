const { createClient } = require("redis")

const client = createClient()

async function connectDb(){

    if (client.isOpen == false) {
        await client.connect()
    }
    
    client.on("error",  (error) => {
        console.log("Error encontrado:", error);
    })

}

connectDb()

module.exports = client