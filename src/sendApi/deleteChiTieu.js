// import axios
import axios from "axios"

//import API
import { API_ENDPOINTS } from "../config";


function deleteChiTieu(id) {
    const Delete = async () => {
        try {
            await axios.delete(`${API_ENDPOINTS.CHITIEU}/${id}`, { withCredentials: true })
        } catch (err) {
            console.error(err)
        }
    }

    Delete()

}

export default deleteChiTieu;