import formidable from "formidable";
import { NextApiHandler, NextApiRequest } from "next";
import path from "path";
import fs from "fs/promises"

export const config = {
    api: {
        bodyParser: false
    }
}

const readFile = (req: NextApiRequest, saveLocally?: boolean): Promise<{fields: formidable.Fields, files:formidable.Files}> => {
    const options: formidable.Options = {}
    console.log("READ FILE AQ");
    
    if(saveLocally){
        options.uploadDir = path.join(process.cwd(), "/public/images")
        options.filename = (name, ext, path, form) => {
            return Date.now().toString() + "_" + path.originalFilename
        }
    }


    const form = formidable(options)
    return new Promise((resolve ,reject) => {
        console.log("FOIRMIDABLE");
        
        form.parse(req, (err, fields, files) => {
            if(err) {
                console.log("ERRO");
                
                reject(err)
            }
            resolve({fields, files})
        })
    }) 
}

const handler: NextApiHandler = async (req, res) => {
    console.log("CAIU AQ");
    
    try {
        console.log("try")
        await fs.readdir(path.join(process.cwd() + "/public", "/images"))
    } catch(error){
        console.log("catch")

        await fs.mkdir(path.join(process.cwd() + "/public", "/images"))
    }
    await readFile(req, true);
    res.json({done: "ok"})
}

export default handler