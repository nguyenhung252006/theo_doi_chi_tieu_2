// import axios
import axios from "axios"

//import API
import { API_ENDPOINTS } from "../config";

function postChiTieu(dataToPost, UserId) {

    // Post du lieu 
    const Post = async (dataToPost) => {
        try {
            await axios.post(`${API_ENDPOINTS.CHITIEU}/${UserId}`, dataToPost, { withCredentials: true })


        } catch (error) { console.error('Post Error' + error) }
    }
    Post(dataToPost)
}


export default postChiTieu;

