import axios from "axios"

const API_URL = "http://localhost:5000/api/images/"

export const filesUpload = async (files) =>  {
    try {
    
        const formData = new FormData();


        if(Object.keys(files).length > 1) {
            files.forEach(file=> formData.append("file", file))
        } else {
            formData.append("file", files[0])
        }

        const response = await axios.post(`${API_URL}image`, formData)
        
        return response
    } catch {
        console.log("Error")
    }
}


export const downloadFile = async (zipName) => {
    try {

        console.log(zipName)
        const response = await fetch(`${API_URL}get/${zipName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            
        });

        if(response.status === 200) {
            const blob = await response.blob()
            console.log(blob)

            const downloadUrl = window.URL.createObjectURL(blob);


            const link = document.createElement("a");
            link.href = downloadUrl;

            link.download = zipName;

            document.body.appendChild(link);
            link.click();
            link.remove();
        }

    } catch{

    }
}