
import { useState } from "react"
import "./main-page.css"
import { filesUpload , downloadFile} from "../../action/filesAction"

import image from "../../assets/images2.webp"
import loadingImage from "../../assets/loading.gif"

const MainPage = () => {
    const [drag, setDrag] = useState(false)
    const [zipImage, setZipImage] = useState("")
    const [range, setRange] = useState(100)
    
    const [loading, setLoading] = useState(false)

    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }

    function changeInputValue(e) {
        setRange(e.target.value)
    }


    async function onDropHandler(e, number) {
        setLoading(true)
        e.preventDefault();

        const files = [...e.dataTransfer.files]; 

        await filesUpload(files, number)
            .then(res => setZipImage(res.data.nameZip))
            .finally(() => {
                setLoading(false)
            })
        setDrag(false);
    }


    async function downloadFiles(e, path) {
        e.stopPropagation()
        await downloadFile(path);
        setZipImage("")
    }





    return (
        <div className="main-block">

            <div className="range">
                <h1>Укажите степень сжатия </h1>
                <div className="range">
                    <input value={range} onChange={e => changeInputValue(e)} type="range" min={0} max={100} />
                    <span>{range}</span>
                </div>
            </div>

            <div className="range">
                <h2>100 - максимальное сохранение качества</h2>
                <h2>0 - максимальная степень сжатия</h2>
            </div>


            {
                zipImage !== "" ?  
                <div className="main-block__form ">"Скачайте файл"</div>
                
                : <div className={loading ? "main-block__form loading" : "main-block__form"}
                onDragStart={e => dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragOver={e => dragStartHandler(e)}
                        onDrop={e => onDropHandler(e, range)} >
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