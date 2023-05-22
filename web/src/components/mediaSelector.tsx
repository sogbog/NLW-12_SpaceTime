import { ChangeEvent, useState } from "react"

export function MediaSelector(){

    const [preview, setPreview] = useState<string | null>(null)

    function onFileSelected(event: ChangeEvent<HTMLInputElement>){
        const { files } = event.target

        if(!files){
            return
        }

        const previewURL = URL.createObjectURL(files[0])

        setPreview(previewURL)
    }

    return(
        <>
            <input onChange={onFileSelected} type="file" id="media" name="media" accept="image/*" className="invisible w-0 h-0"/>

            {preview && <img src={preview} alt="" className="w-full aspect-video rounded-lg object-cover" /> }
        </>
    )
}