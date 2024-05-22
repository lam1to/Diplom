import formidable from "formidable";
import { NextApiHandler, NextApiRequest } from "next";
import path from "path";
import fs from 'fs/promises'

export const config = {
    api: {
        bodyParser: false
    }
}

const readFile = (req: NextApiRequest, saveLocally: boolean): Promise<{ fields: formidable.Fields; files: formidable.Files, name: string }> => {
    const options: formidable.Options = {}
    let nameFileG = ''
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), '/public/images')
        options.filename = (name, ext, path, form) => {
            const nameFile = Date.now().toString() + '_' + path.originalFilename
            console.log('nameFile', nameFile)
            nameFileG = nameFile
            return nameFile
        }
    }
    const form = formidable(options)
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err)
            resolve({ fields, files, name: nameFileG })
        })

    })
}

const handler: NextApiHandler = async (req, res) => {
    try {
        await fs.readdir(path.join(process.cwd() + '/public', "/images"))
    }
    catch (error) {
        await fs.mkdir(path.join(process.cwd() + '/public', "/images"))
    }
    const response = await readFile(req, true);
    console.log('response = ', response)
    res.json({ done: 'ok', name: response.name })
}
export default handler