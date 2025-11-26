// import scss
import classNames from "classnames/bind";
import style from './Create.module.scss'

// import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

//import hook
import { useState, useEffect } from "react";

//import API
import { API_BASE_URL, API_ENDPOINTS } from "../../config";

//import axios
import axios from "axios";

//import component
import Thanh_cong from "../../alert/ThanhCong/ThanhCong";

//import navigate
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style)
function Create() {

    const navigate = useNavigate()

    // check tao thanh cong hay khong
    const [ok, setOk] = useState(false)

    //state luu tru tai khoan lay tu data 
    const [taiKhoanData, setTaiKhoanData] = useState([])

    //state luu tru Gmail
    const [emaiData, setEmailData] = useState([])

    //state check de next sang phan setMatKhau
    const [isNext, setIsNext] = useState(false)

    //state kiem tra 
    const [isRight, setIsRight] = useState(false)

    //state luu thong tin tao tai khoan
    const [taiKhoan, setTaiKhoan] = useState('')
    const [matKhau, setMatKhau] = useState('')
    const [checkMatKhau, setCheckMatKhau] = useState('')

    //state luu thong tin nguoi dung
    const [hoTen, setHoTen] = useState('')
    const [ngayThangNamSinh, setNgayThangNamSinh] = useState('')
    const [sdt, setSdt] = useState('')
    const [email, setEmail] = useState('')

    //laydata nguoi dung check
    const GetDataUser = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.ALLUSER}/`, { withCredentials: true })
            console.log(res.data)
            // lay thong tin tai khoan cua nguoi dung
            const dataTaiKhoan = res.data.map(item => item.taiKhoan)
            setTaiKhoanData(dataTaiKhoan)
            // lay thong tin email cua nguoi dung
            const dataEmail = res.data.map(item => item.email)
            setEmailData(dataEmail)


        } catch (err) {
            console.error(err)
        }
    }

    // bien check xem co tai khoan khong 
    const checkTaiKhoan = taiKhoanData.some(item => item === taiKhoan)

    // bien check xem co gmail ton tai roi khong
    const checkEmail = emaiData.some(item => item === email)

    //handle post
    const PostData = async (dataPost) => {
        try {
            await axios.post(`${API_ENDPOINTS.USERS}/`, dataPost, { withCredentials: true })
        } catch (err) {
            console.error(err)
        }
    }

    //handle submit
    const handleSubmit = () => {
        const regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const dataPost = {
            taiKhoan: taiKhoan,
            matKhau: matKhau,
            hoTen: hoTen,
            ngaySinh: ngayThangNamSinh,
            soDienThoai: sdt,
            email: email,
        }

        if (checkEmail || checkTaiKhoan || hoTen === "" || !(regexDate.test(ngayThangNamSinh)) || sdt.length !== 10 || !(regexEmail.test(email)) || email === "" || sdt === "" || ngayThangNamSinh === "") {
            setIsRight(true)
            return
        }
        PostData(dataPost)
        setOk(true)
        setTimeout(() => {
            navigate("/login")
        }, 3000)
    }

    //lay data
    useEffect(() => {
        GetDataUser()
    }, [])

    //function check isNext
    const handleIsNext = () => {
        if (checkTaiKhoan || !(matKhau === checkMatKhau) || taiKhoan === "" || matKhau === "" || matKhau.length < 6) {
            setIsRight(true)
            return
        }
        setIsNext(true)
        setIsRight(false)
    }

    //function set gia tri value input

    //tai khoan
    const handleTaiKhoan = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9]*$/

        if (regex.test(value)) {
            setTaiKhoan(value)
        } else {
            return
        }
    }
    //mat khau
    const handleMatKhau = (e) => {
        const value = e.target.value
        setMatKhau(value)
    }

    const handleCheckMatKhau = (e) => {
        const value = e.target.value
        setCheckMatKhau(value)
    }

    // hoten
    const handleHoTen = (e) => {
        const value = e.target.value
        setHoTen(value)
    }

    //ngay thang className
    const handleNgayThangNamSinh = (e) => {
        const value = e.target.value
        setNgayThangNamSinh(value)
    }

    //so dien thoai
    const handleSoDienThoai = (e) => {
        const value = e.target.value
        if (!(/^\d*$/.test(value))) {
            return
        }
        setSdt(value)
    }

    //email
    const handleEmail = (e) => {
        const value = e.target.value
        setEmail(value)
    }

    //handle quay lai dang nhap
    const handleDangNhap = () => {
        navigate("/login")
    }

    return (
        <>
            {ok && <Thanh_cong />}
            <div>
                <div className={cx('wrapper')}>
                    <div className={cx('background')}></div> {/* Ảnh nền */}
                    {!isNext && <div className={cx('content')}>

                        <h1>CREATE ACCOUNT</h1>
                        <div className={cx('input-wrapper')}>
                            <label>Tên Đăng Nhập (Tài Khoản): </label>
                            <input
                                onChange={(e) => { handleTaiKhoan(e) }}
                                value={taiKhoan}
                            ></input>
                            {isRight && (<div>*chú ý: không được bỏ trống</div>)}
                            {checkTaiKhoan && (<div>*chú ý: tài khoản đã tồn tại</div>)}
                            <label>Mật Khẩu Đăng Nhập</label>
                            <input
                                onChange={(e) => { handleMatKhau(e) }}
                                type="password"></input>
                            {isRight && (<div>*chú ý: tối thiểu có 6 ký tự</div>)}
                            <label>Nhập Lại Mật Khẩu</label>
                            <input
                                className={isRight ? cx('is-right') : ''}
                                onChange={(e) => { handleCheckMatKhau(e) }}
                                type="password"></input>
                            {isRight && (<div>*chú ý: kiểm tra mật khẩu nhập lại</div>)}
                            <span onClick={() => { handleDangNhap() }}>Đăng Nhập</span>
                            <button onClick={handleIsNext} className={cx('button-submit')}>Tiếp <FontAwesomeIcon icon={faArrowRight} /></button>
                        </div>
                    </div>}
                    {isNext && !ok && (<div className={cx('content')}>
                        <h1>CREATE ACCOUNT</h1>
                        <div className={cx('input-wrapper')}>
                            <label>Họ và Tên: </label>
                            <input className={isRight ? cx('is-right') : ''}
                                onChange={(e) => { handleHoTen(e) }}
                                value={hoTen}
                            ></input>
                            {isRight && (<div>*chú ý: không bỏ trống</div>)}
                            <label>Năm-Tháng-Ngày sinh: </label>
                            <input className={isRight ? cx('is-right') : ''} type="date"
                                value={ngayThangNamSinh}
                                onChange={(e) => { handleNgayThangNamSinh(e) }}>
                            </input>
                            {isRight && (<div>*chú ý: định dạng yyyy/mm/dd </div>)}
                            <label>Số Điện Thoại</label>
                            <input className={isRight ? cx('is-right') : ''}
                                value={sdt}
                                onChange={(e) => { handleSoDienThoai(e) }}
                            ></input>
                            {isRight && (<div>*chú ý: 10 số</div>)}
                            <label>Gmail</label>
                            <input className={isRight ? cx('is-right') : ''}
                                onChange={(e) => { handleEmail(e) }}
                                value={email}
                                type='email'></input>
                            {isRight && (<div>*chú ý: nguyenvana@example.com</div>)}
                            {checkEmail && (<div>*Gmail đã được sử dụng</div>)}
                            <span onClick={() => { handleDangNhap() }}>Đăng Nhập</span>
                            <button onClick={() => { handleSubmit() }} className={cx('button-submit')}>Xác Nhận Tạo <FontAwesomeIcon icon={faArrowRight} /></button>
                        </div>
                    </div>)}
                </div>
            </div>
        </>
    );
}

export default Create;