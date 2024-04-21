import axios from "axios"

const API_URL = "http://localhost:5000/api/images/image"

export const filesUpload = async (files) =>  {
    try {
    
        const formData = new FormData();

        files.forEach(file => {
            formData.append("file", file)
        })

        const response = await axios.post(`${API_URL}`, formData)
        console.log(response)
        return response
    } catch {
        console.log("Error")
    }
}