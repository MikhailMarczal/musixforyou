const { Schema, Repository } = require("redis-om")
const client = require("./db")

const schema = new Schema("music", {
    nome: { type: "text" },
    cantor: { type: "text" },
    link: { type: "string" },
    id: { type: "string" },
    musicAsAudio: { type: "string" },
    capa: { type: "string" },
    favorito: { type: "boolean"},
}, {
    dataStructure: "JSON"
})

const repository = new Repository(schema, client)

module.exports = repository