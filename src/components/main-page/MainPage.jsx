
import { useState } from "react"
import "./main-page.css"
import { filesUpload , downloadFile} from "../../action/filesAction"

import image from "../../assets/images2.webp"
import loadingImage from "../../assets/loading.gif"

const MainPage = () => {
    const [drag, setDrag] = useState(false)
    const [zipImage, setZipImage] = useState("")
    const [loading, setLoading] = useState(false)
    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }

    async function onDropHandler(e) {
        setLoading(true)
        e.preventDefault();

        const files = [...e.dataTransfer.files]; 

        await filesUpload(files)
            .then(res => setZipImage(res.data.nameZip))
            .finally(() => {
                setLoading(false)
            })
        setDrag(false);
    }


    async function downloadFiles(e, path) {
        e.stopPropagation()
        await downloadFile(path)
        setZipImage("")
    }



    return (
        <div className="main-block">
            {
                zipImage !== "" ?  
                <div className="main-block__form ">"Скачайте файл"</div>
                
                : <div className={loading ? "main-block__form loading" : "main-block__form"}
                onDragStart={e => dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragOver={e => dragStartHandler(e)}
                        onDrop={e => onDropHandler(e)} >
                        <div className="block-center">
                            <div>{drag ? "Отпустите, чтобы добавить файлы"  : "Перетащите, чтобы добавить файлы"}</div>
                            <img className={loading ? "block-center-loading" : "block-center-image"} src={loading ? loadingImage : image} alt="image" />
                        </div>       
                </div>
    
            }
            


            <div className="button-body">
                {!loading && zipImage !== ""  ?  <button className="button" onClick={(e) => downloadFiles(e, zipImage)}> Download</button> : null}  
            </div>

        </div>
        
    )
}

export default MainPage