// import axios
import axios from "axios"

//import API
import { API_ENDPOINTS } from "../config";


function putDinhMuc(dataPut, id) {
    const Put = async () => {
        try {
            await axios.put(`${API_ENDPOINTS.DINHMUC}/${id}`, dataPut, { withCredentials: true })
        } catch (err) {
            console.error(err)
        }
    }
    
    Put(dataPut)

}

export default putDinhMuc;