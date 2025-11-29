import classNames from "classnames/bind";
import style from "./NganSach.module.scss"

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress, faMoneyBill1Wave, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

//import component
import { DinhMucTable } from "../../itemContent";
import { ThanhCong } from "../../alert";

//import API_BASE_URL
import { API_ENDPOINTS } from "../../config";

//import axios
import axios from "axios";

//import sendAPI
import postDinhMuc from "../../sendApi/postDinhMuc";

// import Hook
import { useState, useEffect } from "react";

//import ho tro
import { chuyenDinhDangTien, chuyenNgay } from "../../ho_tro";

const cx = classNames.bind(style)
function NganSach() {

    //lay id nguoi dung
    const UserId = localStorage.getItem('id')

    //state lay thong tin
    const [tongNgay, setTongNgay] = useState('')
    const [tongTien, setTongTien] = useState('')

    //state lay thong tin post
    const [ngay, setNgay] = useState('')
    const [tien, setTien] = useState('')

    //state check post
    const [isPost, setIsPost] = useState(false)

    //cehck reload
    const [reload, setReload] = useState(false);

    const handleReload = () => setReload(prev => !prev);


    //handle xu li post
    const handleChangeTien = (e) => {
        const value = e.target.value
        setTien(value)
    }

    const handleChangeNgay = (e) => {
        const value = e.target.value
        setNgay(value)
    }

    //handle submit
    const handleSubmit = () => {
        const soTienChuaDinhDang = tien.replace(/\./g, '')
        const dataPost = {
            soNgay: ngay,
            soTienDinhMuc: soTienChuaDinhDang,
        }

        if (tien < 0 || tien === '') return
        if (ngay < 0 || ngay === '') return

        postDinhMuc(dataPost, UserId)
        setIsPost(true)
        setNgay('')
        setTien('')
        setTimeout(() => {
            setIsPost(false)
        }, 1000)

    }

    const GetData = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const dataDinhMuc = res.data.dinh_muc_chi_tieu
            const listTien = dataDinhMuc.map(item => Number(item.soTienDinhMuc))
            const listNgay = dataDinhMuc.map(item => Number(item.soNgay))

            const tongTienDinhMuc = listTien.reduce((a, b) => a + b, 0)
            const tongSoNgay = listNgay.reduce((a, b) => a + b, 0)

            setTongTien(tongTienDinhMuc)
            setTongNgay(tongSoNgay)

        } catch (err) {
            console.error(err)
        }
    }

    //lay data
    useEffect(() => {
        GetData()
    }, [isPost, reload])

    return (
        <div className={cx('wrapper')}>
            {/* thanh cong */}
            {isPost && <ThanhCong />}
            <div className={cx("logo-wrapper")}>
                <FontAwesomeIcon className={cx('icon')} icon={faBarsProgress} />
                <span>Cài đặt định mức chi tiêu hiện tại</span>
                <div>Quản lý và theo dõi chi tiêu một cách hiệu quả</div>
            </div>
            <div className={cx('input-wrapper')}>
                <div className={cx('input-submit')}>
                    <h1>Thêm định mức mới</h1>
                    <div>
                        <div>
                            <label> Số tiền <FontAwesomeIcon icon={faMoneyBill1Wave} /> </label>
                            <input
                                placeholder="   0.000 VNĐ"
                                value={chuyenDinhDangTien(tien)}
                                onChange={(e) => { handleChangeTien(e) }}
                            ></input>
                        </div>
                        <div>
                            <label> Số ngày thực hiện <FontAwesomeIcon icon={faCalendarCheck} /></label>
                            <input
                                value={ngay}
                                onChange={(e) => { handleChangeNgay(e) }}></input>
                        </div>
                        <div>
                            <button onClick={() => { handleSubmit() }}>Thêm định mức</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('table-wrapper')}>
                <DinhMucTable
                    OnReload={handleReload}
                    UserId={UserId}
                    isPost={isPost}
                />
            </div>
            <div className={cx("total-day-and-money")}>
                <div>
                    <span>Tổng số tiền định mức: <span>{chuyenDinhDangTien(tongTien)} VNĐ</span></span>
                    <span>Tổng số ngày thực hiện: <span>{tongNgay} ngày</span></span>
                </div>
            </div>
        </div>
    );
}

export default NganSach;