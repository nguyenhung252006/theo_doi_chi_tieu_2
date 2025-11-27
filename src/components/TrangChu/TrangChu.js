import classNames from "classnames/bind";
import style from './TrangChu.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus } from "@fortawesome/free-solid-svg-icons";

//import ho tro 
import { chuyenDinhDangTien, chuyenNgay, chuyenLoaiChiTieu } from "../../ho_tro";

//import commponent
import { HistoryTableHome } from "../../itemContent";

//import bieu do 
import { BieuDoTron } from '../../bieuDo';

//import API_BASE_URL
import { API_BASE_URL, API_ENDPOINTS } from "../../config";

// import axios
import axios from "axios";

//import link
import { Link } from "react-router-dom";

// import Hook React
import { useState, useEffect } from "react";

const cx = classNames.bind(style)
function TrangChu() {

    //lay id cua nguoi dung
    const UserId = localStorage.getItem('id')

    const [profile, setProfile] = useState(null)
    const [soDu, setSoDu] = useState('')
    const [daSuDung, setDaSuDung] = useState('')
    const [conLai, setConLai] = useState('')

    //lay data
    const GetData = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const chiTieuData = res.data.chi_tieu
            const chiTieu = chiTieuData.map(item => Number(item.soTien));
            const chiTieuKhac = res.data.chi_tieu_khac.map(item => Number(item.soTien));
            const tongDaSuDung = [...chiTieu, ...chiTieuKhac].reduce((a, b) => a + b, 0);

            const soDu = res.data.dinh_muc_chi_tieu.map(item => Number(item.soTienDinhMuc));
            const tongSoDu = soDu.reduce((a, b) => a + b, 0);

            setDaSuDung(tongDaSuDung)
            setSoDu(tongSoDu)
            setProfile(res.data.nguoi_dung);

        } catch (err) {
            console.error(err)
        }
    }

    //lay data
    useEffect(() => {
        GetData()
    }, [])

    //tinh con lai
    useEffect(() => {
        setConLai((Number(soDu) - Number(daSuDung)))
    }, [soDu, daSuDung])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('main-content-wrapper')}>
                <div className={cx('logo')}>
                    <div>
                        <FontAwesomeIcon className={cx('icon')} icon={faHouse} />
                        <span>Trang chủ</span>
                        <div>Chào mừng bạn đến với Piggy Bank</div>
                    </div>
                    <div>
                        <div className={cx('add-chi-tieu')}>
                            <Link to={'/Them-chi-tieu'}>
                                <button>
                                    <FontAwesomeIcon className={cx('icon')} icon={faPlus} />
                                    <span>Thêm chi tiêu</span>
                                </button>
                            </Link>
                        </div>
                        <div className={cx('add-dinh-muc')}>
                            <Link to={'/Ngan-sach'}>
                                <button>
                                    <FontAwesomeIcon className={cx('icon')} icon={faPlus} />
                                    <span>Thêm định mức</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx('thong-tin-so-du')}>
                    <div className={cx('text')}>
                        <h1>Tổng quan</h1>
                    </div>
                    <div className={cx('card')}>
                        <div className={cx('tong-tien')}>
                            <div className={cx('title')}>Định mức</div>
                            <div className={cx('value')}>{chuyenDinhDangTien(soDu)} VNĐ</div>
                        </div>
                        <div className={cx('da-dung')}>
                            <div className={cx('title')}>Tổng chi</div>
                            <div className={cx('value')}>{chuyenDinhDangTien(daSuDung)} VNĐ</div>
                        </div>
                        <div className={cx('con-lai')}>
                            <div className={cx('title')}>Còn lại</div>
                            <div className={cx('value')}>{chuyenDinhDangTien(conLai)} VNĐ</div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
                <div className={cx('history')}>
                    <HistoryTableHome />
                </div>
            </div>
            <div className={cx('info-wrapper')}>
                <div>
                    <h1>{profile?.hoTen}</h1>
                    <div className={cx('thong-tin')}>
                        <span>ID: {profile?.id}</span>
                        <span>Tên người dùng: {profile?.taiKhoan}</span>
                        <span>Số điện thoại: {profile?.soDienThoai}</span>
                        <span>Email: {profile?.email}</span>
                    </div>
                    <div>
                        {conLai > 0 && (<BieuDoTron
                            dataCompare={[
                                { name: 'Chi tiêu', value1: daSuDung, value2: (conLai) }
                            ]}
                        />)}
                        {conLai < 0 && (<BieuDoTron
                            dataCompare={[
                                { name: 'Chi tiêu', value1: daSuDung, value2: (conLai) }
                            ]}
                        />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrangChu;