import classNames from "classnames/bind";
import style from './BaoCao.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faListUl,
    faUtensils,
    faCartShopping,
    faGamepad,
    faStore,
    faChartColumn

} from "@fortawesome/free-solid-svg-icons";

//import hook
import { useState, useEffect } from "react";

//import ho tro 
import { chuyenDinhDangTien } from "../../ho_tro";

//import axios
import axios from "axios";

//import api
import { API_ENDPOINTS } from "../../config";

//import bieu do
import { BieuDoDong, BieuDoCot } from "../../bieuDo";


const cx = classNames.bind(style)
function BaoCao() {

    const UserId = localStorage.getItem('id')

    //state so tien
    const [muaSam, setMuaSam] = useState('')
    const [anUong, setAnUong] = useState('')
    const [giaiTri, setGiaiTri] = useState('')
    const [khac, setKhac] = useState('')
    const [dinhMuc, setDinhMuc] = useState('')
    const [tongTienDaDung, setTongTienDaDung] = useState('')
    const [tienConLai, setTienConLai] = useState('')

    //state check trang thai
    const [check, setCheck] = useState(false)

    //lay data
    const GetData = async () => {
        const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
        const data = res.data
        const dataChiTieu = data.chi_tieu
        const dataChiTieuKhac = data.chi_tieu_khac
        const dataDinhMuc = data.dinh_muc_chi_tieu

        //set tien mua muaSam
        const listMuaSam = dataChiTieu.filter(item => item.loaiChiTieu === "MUA_SAM")
        const tienMuaSam = listMuaSam.map(item => item.soTien)
        const tongTienMuaSam = tienMuaSam.reduce((a, b) => a + b, 0)
        setMuaSam(tongTienMuaSam)

        //set tien mua anUong
        const listAnUong = dataChiTieu.filter(item => item.loaiChiTieu === "AN_UONG")
        const tienAnUong = listAnUong.map(item => item.soTien)
        const tongTienAnUong = tienAnUong.reduce((a, b) => a + b, 0)
        setAnUong(tongTienAnUong)

        //set tien mua GiaiTri
        const listGiaiTri = dataChiTieu.filter(item => item.loaiChiTieu === "GIAI_TRI")
        const tienGiaiTri = listGiaiTri.map(item => item.soTien)
        const tongTienGiaiTri = tienGiaiTri.reduce((a, b) => a + b, 0)
        setGiaiTri(tongTienGiaiTri)

        //set tien khac
        const listKhac = dataChiTieuKhac.map(item => item.soTien)
        const tongTienKhac = listKhac.reduce((a, b) => a + b, 0)
        setKhac(tongTienKhac)

        //set tien dinh muc 
        const listDinhMuc = dataDinhMuc.map(item => item.soTienDinhMuc)
        const tongTienDinhMuc = listDinhMuc.reduce((a, b) => a + b, 0)
        setDinhMuc(tongTienDinhMuc)

    }

    //laydata
    useEffect(() => {
        GetData()
    }, [])

    //tinh tong tien da tongTienDaDung
    useEffect(() => {
        setTongTienDaDung((Number(muaSam) + Number(anUong) + Number(giaiTri) + Number(khac)))
    }, [muaSam, giaiTri, khac, anUong])

    //tinh tien con lai 
    useEffect(() => {
        setTienConLai(Number(dinhMuc) - Number(tongTienDaDung))
    }, [dinhMuc, tongTienDaDung])

    //check
    useEffect(() => {
        if (tienConLai < 0) {
            setCheck(true)
        }
        else {
            setCheck(false)
        }
    }, [tienConLai])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo-wrapper')}>
                <FontAwesomeIcon className={cx('icon')} icon={faListUl} />
                <span>Báo cáo chi tiêu</span>
                <div>Xem lại tổng quát chi tiêu của bạn</div>
                <h4>Tổng ngân sách</h4>
            </div>
            <div className={cx('total-wrapper')}>
                <div className={cx('tieu-de')}>
                    <h5>Đã chi / Tổng định mức</h5>
                </div>
                <div className={cx('so-tien')}>
                    <div><h3><span>{chuyenDinhDangTien(tongTienDaDung)}</span> / <span>{chuyenDinhDangTien(dinhMuc)} VNĐ</span></h3></div>
                    <div><h4>Còn lại: <span className={cx(check ? 'nho' : 'lon')}>{chuyenDinhDangTien(tienConLai)} VNĐ</span></h4></div>
                </div>
                <div className={cx('bieu-do')}>
                    <BieuDoDong value={'1000'} max={'100000'} />
                </div>
            </div>
            <div className={cx('danh-muc-wrapper')}>
                <div className={cx('card-wrapper')}>
                    <div className={cx('card')}>
                        <div className={cx('logo-danh-muc')}>
                            <FontAwesomeIcon className={cx('icon-danh-muc-1')} icon={faUtensils} />
                            <span className={cx('ten-danh-muc')}>Ăn uống</span>
                        </div>
                        <div>Đã sử dụng: <span>{chuyenDinhDangTien(anUong)} VNĐ</span></div>
                        <BieuDoDong isDanhMuc value={`${anUong}`} max={`${dinhMuc}`} />
                    </div>
                    <div className={cx('card')}>
                        <div className={cx('logo-danh-muc')}>
                            <FontAwesomeIcon className={cx('icon-danh-muc-2')} icon={faCartShopping} />
                            <span className={cx('ten-danh-muc')}>Mua sắm</span>
                        </div>
                        <div>Đã sử dụng: <span>{chuyenDinhDangTien(muaSam)} VNĐ</span></div>
                        <BieuDoDong isDanhMuc value={`${muaSam}`} max={`${dinhMuc}`} />
                    </div>
                </div>
                <div className={cx('card-wrapper')}>
                    <div className={cx('card')}>
                        <div className={cx('logo-danh-muc')}>
                            <FontAwesomeIcon className={cx('icon-danh-muc-3')} icon={faGamepad} />
                            <span className={cx('ten-danh-muc')}>Giải trí</span>
                        </div>
                        <div>Đã sử dụng: <span>{chuyenDinhDangTien(giaiTri)} VNĐ</span></div>
                        <BieuDoDong isDanhMuc value={`${giaiTri}`} max={`${dinhMuc}`} />
                    </div>
                    <div className={cx('card')}>
                        <div className={cx('logo-danh-muc')}>
                            <FontAwesomeIcon className={cx('icon-danh-muc-4')} icon={faStore} />
                            <span className={cx('ten-danh-muc')}>Mục khác</span>
                        </div>
                        <div>Đã sử dụng: <span>{chuyenDinhDangTien(khac)} VNĐ</span></div>
                        <BieuDoDong isDanhMuc value={`${khac}`} max={`${dinhMuc}`} />
                    </div>
                </div>

            </div>
            {!check && tienConLai !== 0 && <div className={cx('bieu-do-wrapper')}>
                <h1> <span><FontAwesomeIcon icon={faChartColumn} /></span>Biểu Đồ</h1>
                <BieuDoCot className={cx('bieu-do-cot')}
                    anUong={anUong}
                    muaSam={muaSam}
                    giaiTri={giaiTri}
                    khac={khac}
                    dinhMuc={dinhMuc} />
            </div>}
        </div>
    );
}

export default BaoCao;