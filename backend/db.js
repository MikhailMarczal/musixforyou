const redis = require("redis")
const client = redis.createClient()

async function connectDb(){

    if (!client.isOpen) {
        await client.connect()
    }
    
    client.on("error",  (error) => {
        console.log("Error encontrado:", error);
    })
    
    console.log("ready", (err) => console.log("deu boa"));

}

connectDb()

module.exports = client