// import axios
import axios from "axios"

//import API
import { API_ENDPOINTS } from "../config";


function putChiTieuKhac(dataPut, id) {
    const Put = async () => {
        try {
            await axios.put(`${API_ENDPOINTS.CHITIEUKHAC}/${id}`, dataPut, { withCredentials: true })
        } catch (err) {
            console.error(err)
        }
    }

    Put(dataPut)

}

export default putChiTieuKhac;