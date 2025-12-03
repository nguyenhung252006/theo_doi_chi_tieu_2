import classNames from "classnames/bind";
import style from './ThemChiTieu.module.scss'

//import commponent item
import { HistoryTable } from "../../itemContent";
import { ThanhCong, ThongBao } from "../../alert";

//import sendApi
import { API_ENDPOINTS } from "../../config";
import { postChiTieu, postChiTieuKhac } from "../../sendApi";

//import hook
import { useState, useEffect } from "react";

//import ho tro 
import { chuyenDinhDangTien, chuyenNgay } from "../../ho_tro";

//import axios
import axios from "axios";

const cx = classNames.bind(style)
function ThemChiTieu() {

    const UserId = localStorage.getItem('id')

    //state quan ly thong tin post
    const [soTien, setSoTien] = useState('')
    const [ngay, setNgay] = useState('')
    const [danhMuc, setDanhMuc] = useState('')
    const [moTa, setMoTa] = useState('')

    //state luu so du 
    const [daDung, setDaDung] = useState('')
    const [soDu, setSoDu] = useState('')
    const [conLai, setConLai] = useState('')

    //check post
    const [isPost, setIsPost] = useState(false)

    //bat thong bao
    const [thongBao, setThongBao] = useState(false)
    const [dangerous, setDangerous] = useState(false)

    //lay data
    const GetData = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const data = res.data
            const dataChiTieu = data.chi_tieu
            const dataChiTieuKhac = data.chi_tieu_khac
            const dataDinhMuc = data.dinh_muc_chi_tieu

            const tienChiTieu = dataChiTieu.map(item => item.soTien)
            const tienChiTieuKhac = dataChiTieuKhac.map(item => item.soTien)
            const ListChiTieu = [...tienChiTieu, ...tienChiTieuKhac]
            const tienDinhMuc = dataDinhMuc.map(item => item.soTienDinhMuc)

            const tongTienChiTieu = ListChiTieu.reduce((a, b) => a + b, 0)
            const tongTienDinhMuc = tienDinhMuc.reduce((a, b) => a + b, 0)

            setDaDung(tongTienChiTieu)
            setSoDu(tongTienDinhMuc)

        } catch (err) { console.error(err) }
    }


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
    const handleSubmit = async () => {
        const soTienPost = soTien.replace(/\./g, '')

        if (soTien === "" || ngay === "" || danhMuc === "") return

        if (danhMuc === 'AN_UONG' || danhMuc === 'MUA_SAM' || danhMuc === 'GIAI_TRI') {
            const dataPost = {
                loaiChiTieu: danhMuc,
                soTien: Number(soTienPost),
                ghiChu: moTa ? moTa : 'Không có ghi chú',
                ngayTao: ngay
            }
            await postChiTieu(dataPost, UserId)
            setIsPost(true)
            await GetData()
            setSoTien('')
            setMoTa('')
            setNgay('')
            setTimeout(() => {
                setIsPost(false)
                setTimeout(() => {
                    setThongBao(true)
                }, 1000)
                setTimeout(() => {
                    setThongBao(false)
                }, 6000)
            }, 1000)
        }
        else if (danhMuc === "KHAC") {
            const dataPost = {
                soTien: Number(soTienPost),
                tenKhoan: moTa ? moTa : 'Chưa rõ',
                ngayTao: ngay
            }
            await postChiTieuKhac(dataPost, UserId)
            setIsPost(true)
            await GetData()
            setSoTien('')
            setMoTa('')
            setNgay('')
            setTimeout(() => {
                setIsPost(false)
                setTimeout(() => {
                    setThongBao(true)
                }, 1000)
                setTimeout(() => {
                    setThongBao(false)
                }, 6000)
            }, 1000)
        }

    }

    //lay data 
    useEffect(() => {
        GetData()
    }, [isPost])

    //tinh conLai
    useEffect(() => {
        const newConLai = Number(soDu) - Number(daDung);
        setConLai(newConLai);

        setDangerous(newConLai <= 0);
    }, [soDu, daDung]);

    return (
        <>
            <>
                {thongBao && <ThongBao
                    dangerous={dangerous}
                    soTien={conLai}
                />}
            </>
            <>
                {isPost && <ThanhCong />}
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