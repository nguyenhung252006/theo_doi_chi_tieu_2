import classNames from "classnames/bind";
import style from './ThemChiTieu.module.scss'

//import commponent item
import { HistoryTable } from "../../itemContent";
import Thanh_cong from "../../alert/ThanhCong/ThanhCong";

//import sendApi
import { postChiTieu, postChiTieuKhac } from "../../sendApi";

//import hook
import { useState, useEffect } from "react";

//import ho tro 
import { chuyenDinhDangTien, chuyenNgay } from "../../ho_tro";

const cx = classNames.bind(style)
function ThemChiTieu() {

    const UserId = localStorage.getItem('id')

    //state quan ly thong tin post
    const [soTien, setSoTien] = useState('')
    const [ngay, setNgay] = useState('')
    const [danhMuc, setDanhMuc] = useState('')
    const [moTa, setMoTa] = useState('')

    //check post
    const [isPost, setIsPost] = useState(false)
    //handle xu li post
    function handleChangeSoTien(e) {
        const inputValue = e.target.value

        const soTienChuaDinhDang = inputValue.replace(/\./g, '')
        if (isNaN(soTienChuaDinhDang)) {
            setSoTien('')
            return
        }
        setSoTien(chuyenDinhDangTien(soTienChuaDinhDang))
    }

    function handleChangeDanhMuc(e) {
        setDanhMuc(e.target.value)
    }

    function handleChangeMoTa(e) {
        const value = e.target.value
        setMoTa(value)
    }

    function handleChangeNgay(e) {
        setNgay(e.target.value)
    }

    // handle submit
    const handleSubmit = () => {
        const soTienPost = soTien.replace(/\./g, '')

        if (soTien === "" || ngay === "" || danhMuc === "") return

        if (danhMuc === 'AN_UONG' || danhMuc === 'MUA_SAM' || danhMuc === 'GIAI_TRI') {
            const dataPost = {
                loaiChiTieu: danhMuc,
                soTien: Number(soTienPost),
                ghiChu: moTa ? moTa : 'Không có ghi chú',
                ngayTao: ngay
            }
            postChiTieu(dataPost, UserId)
            setIsPost(true)
            setSoTien('')
            setMoTa('')
            setNgay('')
            setTimeout(() => {
                setIsPost(false)
            }, 1000)
        }
        else if (danhMuc === "KHAC") {
            const dataPost = {
                soTien: Number(soTienPost),
                tenKhoan: moTa ? moTa : 'Chưa rõ',
                ngayTao: ngay
            }
            postChiTieuKhac(dataPost, UserId)
            setIsPost(true)
            setSoTien('')
            setMoTa('')
            setNgay('')
            setTimeout(() => {
                setIsPost(false)
            }, 1000)
        }

    }

    return (
        <>
            <>
                {isPost && <Thanh_cong />}
            </>
            <div className={cx('wrapper')}>
                <div>
                    <h1>Thêm chi tiêu mới</h1>
                    <span>Ghi lại các khoản chi tiêu hàng ngày của bạn để quản lí tài chính tốt hơn</span>
                </div>
                <div className={cx('giao-dich-va-lich-su')}>
                    <div className={cx('them-chi-tieu')}>
                        <label htmlFor="so-tien">Số tiền</label>
                        <input
                            onChange={(e) => { handleChangeSoTien(e) }}
                            value={chuyenDinhDangTien(soTien)}
                            id="so-tien"
                            placeholder="0.000 VNĐ">
                        </input>
                        <label htmlFor="ngay">Ngày</label>
                        <input id="ngay" type="date"
                            value={chuyenNgay(ngay)}
                            onChange={(e) => { handleChangeNgay(e) }}
                        ></input>
                        <label htmlFor="danh-muc">Danh mục</label>
                        <select value={danhMuc} onChange={(e) => { handleChangeDanhMuc(e) }} id="danh-muc" defaultValue="Ăn uống">
                            <option value={'AN_UONG'}>Ăn uống</option>
                            <option value={'MUA_SAM'}>Mua Sắm</option>
                            <option value={'GIAI_TRI'}>Giải trí</option>
                            <option value={'KHAC'}>Khác</option>
                        </select>

                        <label htmlFor="mo-ta">Mô tả (tùy chọn)</label>
                        <input onChange={(e) => { handleChangeMoTa(e) }} value={moTa} id="mo-ta" placeholder="Mô tả nếu có..."></input>
                        <button onClick={() => { handleSubmit() }}>Lưu giao dịch</button>
                    </div>

                    <div className={cx('lich-su')}>
                        <div>
                            <h1>Các giao dịch gần đây</h1>
                            <div>
                                <HistoryTable isPost={isPost} className={cx('history-table')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ThemChiTieu;