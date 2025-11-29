// import axios
import axios from "axios"

//import API
import { API_ENDPOINTS } from "../config";


function putChiTieu(dataPut, id) {
    const Put = async () => {
        try {
            await axios.put(`${API_ENDPOINTS.CHITIEU}/${id}`, dataPut, { withCredentials: true })
        } catch (err) {
            console.error(err)
        }
    }
    
    Put(dataPut)

}

export default putChiTieu;