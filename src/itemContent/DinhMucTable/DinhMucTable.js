import classNames from "classnames/bind";
import style from './DinhMucTable.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

//import API_BASE_URL
import { API_BASE_URL, API_ENDPOINTS } from "../../config";

//import axios
import axios from "axios";

//import Hook
import { useState, useEffect } from "react";

//import ho tro 
import { chuyenDinhDangTien, chuyenNgay, chuyenLoaiChiTieu } from "../../ho_tro";

//import component
import SuaThongTin from "../../alert/SuaThongTin/SuaThongTin";


const cx = classNames.bind(style)
function DinhMucTable({ className, UserId, isPost }) {

    //state lay thong tin
    const [thongTin, setThongTin] = useState([])

    //state lay id
    const [id, setId] = useState('')

    //state lay data
    const [soTienData, setSoTienData] = useState('')
    const [soNgayData, setSoNgayData] = useState('')

    //state reload
    const [reload, setReload] = useState(false);

    //handle reload
    const handleReload = () => {
        setReload(prev => !prev);
    };

    //handle lay id
    const handleOnChangeData = (id, ngay, tien) => {
        setSoNgayData(ngay)
        setSoTienData(tien)

        setId(id)
        setIsChinhSua(true)
    }

    //handle dong chinh sua
    const closeSuaThongTin = () => {
        setIsChinhSua(false);
    };

    //state check chinh sua
    const [isChinhSua, setIsChinhSua] = useState(false)

    //call api
    const GetData = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const dataDinhMuc = res.data.dinh_muc_chi_tieu
            const listThongTin = dataDinhMuc.map(item => ({
                id: item.id,
                tien: item.soTienDinhMuc,
                ngay: item.soNgay,
            }))

            setThongTin(listThongTin)
        } catch (err) {
            console.error(err)
        }
    }

    //lay data
    useEffect(() => {
        GetData()
    }, [isPost, reload])


    return (
        <div className={className}>
            <div className={cx('table-container')}>
                {isChinhSua && <SuaThongTin
                    isDinhMuc
                    onSubmitSuccess={handleReload}
                    isClose={closeSuaThongTin} id={id} soNgay={soNgayData} soTien={soTienData}
                />}
                <table>
                    <thead>
                        <tr>
                            <th>Số Ngày Thực Hiện</th>
                            <th>Số tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    {thongTin.length === 0 && <tbody>
                        <tr>
                            <td>-----</td>
                            <td>-----</td>
                            <td><FontAwesomeIcon className={cx('pen')} icon={faPenToSquare} /><FontAwesomeIcon className={cx('trash')} icon={faTrash} /></td>
                        </tr>
                    </tbody>}
                    {thongTin.length > 0 && thongTin.map((item, index) => (
                        <tbody key={index}>
                            <tr>
                                <td>{item.ngay}</td>
                                <td style={{ color: 'green' }}>{chuyenDinhDangTien(item.tien)} VNĐ</td>
                                <td><FontAwesomeIcon onClick={() => { handleOnChangeData(item.id, item.ngay, item.tien) }} className={cx('pen')} icon={faPenToSquare} /><FontAwesomeIcon className={cx('trash')} icon={faTrash} /></td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
}

export default DinhMucTable;