
import { useEffect, useState } from "react"
import "./main-page.css"
import { filesUpload } from "../../action/filesAction"

import image from "../../assets/images2.webp"

const API_URL = "http://localhost:5000/"


const MainPage = () => {
    const [drag, setDrag] = useState(false)
    const [zipImage, setZipImage] = useState([])
    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }

    async function onDropHandler(e) {
        e.preventDefault();
        const files = [...e.dataTransfer.files]; // Преобразовать FileList в массив
        
        await filesUpload(files).then(response => setZipImage(response.data))
        console.log(zipImage)
        setDrag(false);
    }
    

    return (
        <div className="main-block">
            <div  onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e)} className="main-block__form">
                        <img src={image} alt="image" />
            </div>

            


        </div>
        
    )
}

export default MainPage