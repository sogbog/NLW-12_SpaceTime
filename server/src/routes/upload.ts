import { randomUUID } from "node:crypto";
import { extname, resolve } from "node:path";
import { FastifyInstance } from "fastify";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance){
    app.post("/upload", async (request, response) =>{
        const upload = await request.file({
            limits:{
                fileSize: 5242880
            }
        })

        if(!upload){
            return response.status(400).send()
        }

        const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
        const isFileValid = mimeTypeRegex.test(upload.mimetype)

        if (!isFileValid) {
            return response.status(400).send()
        }

        const fileId = randomUUID()
        const extension = extname(upload.filename)

        const filename = fileId + extension

        const writeStream = createWriteStream(
            resolve(__dirname, "../../uploads/", filename)
        )

        await pump(upload.file, writeStream)

        const APIurl = request.protocol + "://" + request.hostname
        const fileURL = new URL(`/uploads/${filename}`, APIurl).href

        return {fileURL}
    })
}