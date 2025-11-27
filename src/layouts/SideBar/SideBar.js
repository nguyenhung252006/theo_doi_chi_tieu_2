import classNames from "classnames/bind";
import style from './SideBar.module.scss'


//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPiggyBank, faHouse, faList, faSackDollar, faMoneyBillTransfer, faBell, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

//import router
import { Link, useLocation, useNavigate } from "react-router-dom";

//import hook
import { useState, useEffect } from "react";

//import axios
import axios from "axios";

//import API
import { API_ENDPOINTS } from "../../config";

const cx = classNames.bind(style)
function SideBar() {

    const navigate = useNavigate()

    //lay id nguoi dung
    const UserId = localStorage.getItem('id')

    //state luu thong tin
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')

    //handle Login
    const handleLogin = () => {
        localStorage.removeItem('id')
        navigate('/login')
    }

    //luu tru cac muc lua chon
    const listSelect = [
        { selectName: "Trang Chủ", path: "/", icon: faHouse },
        { selectName: "Tổng Quan", path: "/Tong-quan", icon: faList },
        { selectName: "Ngân Sách", path: "/Ngan-sach", icon: faSackDollar },
        { selectName: "Thêm Chi Tiêu", path: "/Them-chi-tieu", icon: faMoneyBillTransfer },
        { selectName: "Báo Cáo", path: "/Bao-cao", icon: faBell },
        { selectName: "Đăng Xuất", path: "/login", icon: faRightFromBracket },
    ]

    //lay thong tin nguoi dung
    const GetDataUser = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const dataUser = res.data.nguoi_dung
            setUserName(dataUser.hoTen)
            setUserEmail(dataUser.email)
        } catch (err) {
            console.err(err)
        }
    }

    useEffect(() => {
        GetDataUser()
    }, [userName, userEmail])

    //check dang o trang nao
    const location = useLocation()

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo-wrapper')}>
                <div>
                    <FontAwesomeIcon className={cx('logo')} icon={faPiggyBank} />
                    <span>Piggy Bank</span>
                </div>
            </div>
            <div className={cx('profile-wrapper')}>
                <div className={cx('icon')}><FontAwesomeIcon icon={faCircleUser} /></div>
                <div className={cx('profile')}>
                    <span>{userName}</span>
                    <div>{userEmail}</div>
                </div>
            </div>
            <div className={cx('select-wrapper')}>
                {listSelect.map((item, index) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link key={index} to={item.path}>
                            <button onClick={item.path === "/login" ? () => { handleLogin() } : () => { }} className={cx(isActive && "active")}>
                                <FontAwesomeIcon className={cx('icon')} icon={item.icon} />
                                <span>{item.selectName}</span>
                            </button>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default SideBar;