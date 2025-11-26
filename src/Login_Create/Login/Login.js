//import route
import { Link, useNavigate } from 'react-router-dom'

//import API
import { API_BASE_URL, API_ENDPOINTS } from '../../config';

//import css module
import classNames from "classnames/bind";
import style from './Login.module.scss'

//import hook
import { useState, useEffect } from 'react';


//import axios
import axios from 'axios';

const cx = classNames.bind(style)


function Login() {

    // chuyen huong
    const navigate = useNavigate()

    //check tai khoan mat khau co dung khong
    const [isPassWord, setIsPassWord] = useState(true)

    //state luu tai khoan va mat khau
    const [taiKhoan, setTaiKhoan] = useState('')
    const [matKhau, setMatKhau] = useState('')

    // state data
    const [data, setData] = useState([])

    //set id nguoi dung
    const [idUser, setIdUser] = useState('')

    // lay ra tat ca user
    const GetAllUser = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.ALLUSER}/`, { withCredentials: true })
            setData(res.data)

        } catch (err) {
            console.error(err)
        }
    }

    //lay data
    useEffect(() => {
        GetAllUser()
    }, [])

    //handle function set Tai khoan va mat khau

    const handleTaiKhoan = (e) => {
        const value = e.target.value
        setTaiKhoan(value)
    }

    const handleMatKhau = (e) => {
        const value = e.target.value
        setMatKhau(value)
    }

    //handle lay thong tin tu tai khoan va mat khau
    const handleGetUser = () => {
        const user = data.find(item => item.taiKhoan === taiKhoan && item.matKhau === matKhau)
        if (!user) {
            setIsPassWord(false)
            return
        }
        localStorage.setItem("id", JSON.stringify(user.id))
        setIsPassWord(true)
        setIdUser(localStorage.getItem('id'))
        navigate('/')
    }


    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}></div> {/* Ảnh nền */}
            <div className={cx('content')}>
                <h1>LOGIN</h1>
                <div className={cx('input-wrapper')}>
                    {/* phần để điền thông tin đăng nhập */}
                    <label>Tài Khoản</label>
                    <input className={!isPassWord ? cx('not-is-pass-word') : ''}
                        value={taiKhoan}
                        onChange={(e) => { handleTaiKhoan(e) }}
                    ></input>
                    <label>Mật Khẩu</label>
                    <input className={!isPassWord ? cx('not-is-pass-word') : ''}
                        type='password'
                        value={matKhau}
                        onChange={(e) => { handleMatKhau(e) }}
                    ></input>
                </div>
                <div className={cx('create-account')}>
                    <Link to={"/create"}>Tạo tài khoản</Link>
                    {!isPassWord && <span>Thông tin đăng nhập sai</span>}
                </div>
                <div>
                    <button
                        onClick={() => { handleGetUser() }}
                        className={cx('button-submit')}>Đăng Nhập</button>
                </div>
            </div>
        </div>
    );
}

export default Login;