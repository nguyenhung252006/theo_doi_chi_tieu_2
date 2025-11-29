// import axios
import axios from "axios"

//import API
import { API_ENDPOINTS } from "../config";


function deleteChiTieuKhac(id) {
    const Delete = async () => {
        try {
            await axios.delete(`${API_ENDPOINTS.CHITIEUKHAC}/${id}`, { withCredentials: true })
        } catch (err) {
            console.error(err)
        }
    }

    Delete()

}

export default deleteChiTieuKhac;