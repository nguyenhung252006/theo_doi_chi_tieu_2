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

    //state check login
    const [isLogin, setIsLogin] = useState(false)

    //handle Login
    const handleLogin = () => {
        localStorage.removeItem('id')
        navigate('/login')
    }

    //handle check isLogin
    const handleIsLogin = () => {
        setIsLogin(prev => !prev)
    }

    //luu tru cac muc lua chon
    const listSelect = [
        { selectName: "Trang Chủ", path: "/", icon: faHouse },
        { selectName: "Tổng Quan", path: "/Tong-quan", icon: faList },
        { selectName: "Ngân Sách", path: "/Ngan-sach", icon: faSackDollar },
        { selectName: "Thêm Chi Tiêu", path: "/Them-chi-tieu", icon: faMoneyBillTransfer },
        { selectName: "Báo Cáo", path: "/Bao-cao", icon: faBell },
    ]

    //lay thong tin nguoi dung
    const GetDataUser = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const dataUser = res.data.nguoi_dung
            setUserName(dataUser.hoTen)
            setUserEmail(dataUser.email)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        GetDataUser()
    }, [userName, userEmail])

    //check dang o trang nao
    const location = useLocation()

    return (
        <div className={cx('sidebar-wrapper')}>
            <div className={cx('logo-wrapper')}>
                <div>
                    <FontAwesomeIcon className={cx('logo')} icon={faPiggyBank} />
                    <span>Piggy Bank</span>
                </div>
            </div>
            <div className={cx('profile-wrapper')}>
                <div className={cx('icon')}><FontAwesomeIcon icon={faCircleUser} /></div>
                <div onClick={() => { handleIsLogin() }} className={cx('profile')}>
                    <span>{userName}</span>
                    <div>{userEmail}</div>
                </div>
                {isLogin && <div className={cx('login')}>
                    <div>
                        <FontAwesomeIcon className={cx('icon-login')} icon={faRightFromBracket} />
                        <span onClick={() => { handleLogin() }}>Đăng xuất</span>
                    </div>
                </div>}
            </div>
            <div className={cx('select-wrapper')}>
                {listSelect.map((item, index) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link key={index} to={item.path}>
                            <button >
                                <FontAwesomeIcon className={cx('icon')} icon={item.icon} />
                                <span className={cx(isActive && "active")}>{item.selectName}</span>
                            </button>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default SideBar;