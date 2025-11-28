//import API_BASE_URL
import { API_ENDPOINTS } from "../config";

//import axios
import axios from "axios";

function postDinhMuc(dataPost, UserId) {

    const Post = async () => {
        try {
            axios.post(`${API_ENDPOINTS.DINHMUC}/${UserId}`, dataPost, { withCredentials: true })

        } catch (err) {
            console.error('Error: ' + err)
        }
    }

    Post(dataPost)
}


export default postDinhMuc;