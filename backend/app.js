const express = require("express")
const app = express()

require("dotenv").config()
require("./db")

const port = process.env.PORT || 3000

const musicRouter = require("./routes/music")

app.use("/music", musicRouter)

app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`server rodando na porta ${port}`);
})