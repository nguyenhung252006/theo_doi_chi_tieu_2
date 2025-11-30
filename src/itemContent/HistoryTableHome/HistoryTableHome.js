import classNames from "classnames/bind";
import style from './HistoryTableHome.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

//import ho tro 
import { chuyenDinhDangTien, chuyenNgay, chuyenLoaiChiTieu } from "../../ho_tro";

//import hookc
import { useState, useEffect } from "react";

//import API 
import { API_ENDPOINTS } from "../../config";

//import axios
import axios from "axios";


const cx = classNames.bind(style)
function HistoryTableHome({ className, isPost }) {

    //lay id nguoi dung
    const UserId = localStorage.getItem('id')

    //state lich su
    const [chiTieu, setChiTieu] = useState([])
    const [chiTieuKhac, setChiTieuKhac] = useState([])




    //lay du lieu nguoi dung
    const GetData = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const data = res.data
            const dataChiTieu = data.chi_tieu
            const dataChiTieuKhac = data.chi_tieu_khac

            // thiet lap lich su
            const lichSuChiTieu = dataChiTieu.map(item => ({
                ngay: chuyenNgay(item.ngayTao),
                mota: item.ghiChu,
                danhmuc: chuyenLoaiChiTieu(item.loaiChiTieu),
                tien: chuyenDinhDangTien(item.soTien)
            }))

            const lichSuChiTieuKhac = dataChiTieuKhac.map(item => ({
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
    }, [isPost])


    return (
        <div className={className}>
            <div className={cx('table-container')}>
                <table>
                    <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Mô Tả</th>
                            <th>Danh Mục</th>
                            <th>Số tiền</th>
                        </tr>
                    </thead>
                    {(chiTieu.length === 0 && chiTieuKhac.length === 0) && <tbody>
                        <tr>
                            <td>--------</td>
                            <td>--------</td>
                            <td><span>null</span></td>
                            <td>--------</td>
                        </tr>
                    </tbody>}
                    {chiTieu.length > 0 &&
                        (chiTieu.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{item.ngay}</td>
                                    <td>{item.mota}</td>
                                    <td><span
                                        className={cx({green : item.danhmuc === "Giải trí"},
                                            {yellow : item.danhmuc === "Mua sắm"},
                                            {blue : item.danhmuc === "Ăn uống"}
                                        )}
                                    >{item.danhmuc}</span></td>
                                    <td>-{item.tien}  VNĐ</td>
    
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
                                        className={cx({purple : item.danhmuc === "Khác"})}
                                    >{item.danhmuc}</span></td>
                                    <td>-{item.tien} VNĐ</td>
    
                                </tr>
                            </tbody>
                        )))}
                </table>
            </div>
        </div>
    );
}

export default HistoryTableHome;