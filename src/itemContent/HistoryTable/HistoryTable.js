import classNames from "classnames/bind";
import style from './HistoryTable.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

//import ho tro 
import { chuyenDinhDangTien, chuyenNgay, chuyenLoaiChiTieu } from "../../ho_tro";

//import hook
import { useState, useEffect } from "react";

//import API 
import { API_ENDPOINTS } from "../../config";

//import axios
import axios from "axios";

//import component
import { SuaThongTin, Delete } from "../../alert";

const cx = classNames.bind(style)
function HistoryTable({ className, isPost }) {

    //lay id nguoi dung
    const UserId = localStorage.getItem('id')

    //state lich su
    const [chiTieu, setChiTieu] = useState([])
    const [chiTieuKhac, setChiTieuKhac] = useState([])

    //state lay id
    const [id, setId] = useState('')

    //state lay danh muc
    const [danhMuc, setDanhMuc] = useState('')

    //state lay data
    const [tienData, setTienData] = useState('')
    const [ngayData, setNgayData] = useState('')
    const [moTaData, setMoTaData] = useState('')

    //state reload
    const [reload, setReload] = useState(false);

    //state check is Delete
    const [isDelete, setIsDelete] = useState(false)

    //handle reload
    const handleReload = () => {
        setReload(prev => !prev);
    };

    //state check chinh sua
    const [isChinhSua, setIsChinhSua] = useState(false)

    //handle dong chinh sua
    const closeSuaThongTin = () => {
        setIsChinhSua(false);
    };


    //handle lay id
    const handleOnChangeData = (id, danhMuc, moTa, ngay, tien) => {
        setNgayData(ngay)
        setTienData(tien)
        setMoTaData(moTa)
        setId(id)
        setDanhMuc(danhMuc)
        setIsChinhSua(true)
    }

    const handleDelete = (id, danhMuc) => {
        setId(id)
        setDanhMuc(danhMuc)
        setIsDelete(true)
    }



    //lay du lieu nguoi dung
    const GetData = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const data = res.data
            const dataChiTieu = data.chi_tieu
            const dataChiTieuKhac = data.chi_tieu_khac

            // thiet lap lich su
            const lichSuChiTieu = dataChiTieu.map(item => ({
                id: item.id,
                ngay: chuyenNgay(item.ngayTao),
                mota: item.ghiChu,
                danhmuc: chuyenLoaiChiTieu(item.loaiChiTieu),
                tien: chuyenDinhDangTien(item.soTien)
            }))

            const lichSuChiTieuKhac = dataChiTieuKhac.map(item => ({
                id: item.id,
                ngay: chuyenNgay(item.ngayTao),
                mota: item.tenKhoan,
                danhmuc: "Khác",
                tien: chuyenDinhDangTien(item.soTien)
            }))

            setChiTieu(lichSuChiTieu)
            setChiTieuKhac(lichSuChiTieuKhac)
        } catch (err) {
            console.error(err)
        }
    }


    //lay data
    useEffect(() => {
        GetData()
    }, [isPost, reload])

    console.log(id)

    return (
        <div className={className}>
            <div className={cx('table-container')}>
                {isDelete && <Delete
                    onSubmitSuccess={handleReload}
                    id={id}
                    loai={danhMuc}
                    isClose={() => { setIsDelete(false) }}
                    isCancel={() => { setIsDelete(false) }}
                />}
                {isChinhSua && <SuaThongTin
                    onSubmitSuccess={handleReload}
                    isClose={closeSuaThongTin} id={id} loai={danhMuc} ngay={ngayData} tien={tienData} moTa={moTaData}
                />}
                <table>
                    <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Mô Tả</th>
                            <th>Danh Mục</th>
                            <th>Số tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    {(chiTieu.length === 0 && chiTieuKhac.length === 0) && <tbody>
                        <tr>
                            <td>--------</td>
                            <td>--------</td>
                            <td><span>null</span></td>
                            <td>--------</td>
                            <td><FontAwesomeIcon className={cx('pen')} icon={faPenToSquare} /><FontAwesomeIcon className={cx('trash')} icon={faTrash} /></td>
                        </tr>
                    </tbody>}
                    {chiTieu.length > 0 &&
                        (chiTieu.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{item.ngay}</td>
                                    <td>{item.mota}</td>
                                    <td><span
                                        className={cx({ green: item.danhmuc === "Giải trí" },
                                            { yellow: item.danhmuc === "Mua sắm" },
                                            { blue: item.danhmuc === "Ăn uống" }
                                        )}
                                    >{item.danhmuc}</span></td>
                                    <td>-{item.tien}  VNĐ</td>
                                    <td><FontAwesomeIcon onClick={() => { handleOnChangeData(item.id, item.danhmuc, item.mota, item.ngay, item.tien) }} className={cx('pen')} icon={faPenToSquare} /><FontAwesomeIcon onClick={() => { handleDelete(item.id, item.danhmuc) }} className={cx('trash')} icon={faTrash} /></td>
                                </tr>
                            </tbody>
                        )))}
                    {chiTieuKhac.length > 0 &&
                        (chiTieuKhac.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{item.ngay}</td>
                                    <td>{item.mota}</td>
                                    <td><span
                                        className={cx({ purple: item.danhmuc === "Khác" })}
                                    >{item.danhmuc}</span></td>
                                    <td>-{item.tien} VNĐ</td>
                                    <td><FontAwesomeIcon onClick={() => { handleOnChangeData(item.id, item.danhmuc, item.mota, item.ngay, item.tien) }} className={cx('pen')} icon={faPenToSquare} /><FontAwesomeIcon onClick={() => { handleDelete(item.id, item.danhmuc) }} className={cx('trash')} icon={faTrash} /></td>
                                </tr>
                            </tbody>
                        )))}
                </table>
            </div>
        </div>
    );
}

export default HistoryTable;