import classNames from "classnames/bind";
import style from './TongQuanTable.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

//import ho tro 
import { chuyenDinhDangTien, chuyenNgay, chuyenLoaiChiTieu } from "../../ho_tro";

//import API
import { API_ENDPOINTS } from "../../config";

//import hook
import { useState, useEffect } from "react";

//import axios
import axios from "axios";

//import component
import { SuaThongTin, Delete } from "../../alert";

const cx = classNames.bind(style)
function TongQuanTable({ className, loaiChiTieu, UserId, ngay, ghiChu }) {


    //state lay thong tin 
    const [chiTieu, setChiTieu] = useState([])
    const [chiTieuTatCa, setChiTieuTatCa] = useState([])
    const [chiTieuKhac, setChiTieuKhac] = useState([])

    //state lay id
    const [id, setId] = useState('')

    //state lay danh muc
    const [danhMuc, setDanhMuc] = useState('')

    //state lay data
    const [tienData, setTienData] = useState('')
    const [ngayData, setNgayData] = useState('')
    const [moTaData, setMoTaData] = useState('')

    //state check is Delete
    const [isDelete, setIsDelete] = useState(false)

    //state reload
    const [reload, setReload] = useState(false);

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


    //call API
    const GetDataChiTieu = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.USERS}/${UserId}`, { withCredentials: true })
            const data = res.data.chi_tieu
            const dataKhac = res.data.chi_tieu_khac
            const dataChiTieu = data.filter(item => item.loaiChiTieu === loaiChiTieu)
            const listChiTieu = dataChiTieu.map(item => ({
                id: item.id,
                ngay: chuyenNgay(item.ngayTao),
                mota: item.ghiChu,
                danhmuc: chuyenLoaiChiTieu(item.loaiChiTieu),
                tien: chuyenDinhDangTien(item.soTien),
                thoiGianNhap: item.thoiGianNhap
            }))
            setChiTieu(listChiTieu)
            // chi tieu khac
            if (loaiChiTieu === "KHAC" && !ghiChu) {
                const listChiTieuKhac = dataKhac.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.tenKhoan,
                    danhmuc: "Khác",
                    tien: chuyenDinhDangTien(item.soTien)
                }))
                setChiTieuKhac(listChiTieuKhac)
            }

            //check loai chi tieu khac va ghi chu
            if (loaiChiTieu === "KHAC" && ghiChu) {
                const listChiTieuKhac = dataKhac.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.tenKhoan,
                    danhmuc: "Khác",
                    tien: chuyenDinhDangTien(item.soTien)
                }))
                const list = listChiTieuKhac.filter(item => (item.mota || "").toLowerCase() === (ghiChu || "").toLowerCase()

                )
                setChiTieuKhac(list)
            }

            //check loai chi tieu khac va ngay
            if (loaiChiTieu === "KHAC" && ngay) {
                const listChiTieuKhac = dataKhac.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.tenKhoan,
                    danhmuc: "Khác",
                    tien: chuyenDinhDangTien(item.soTien)
                }))
                const list = listChiTieuKhac.filter(item => item.ngay === chuyenNgay(ngay))
                setChiTieuKhac(list)
            }

            //check loai chi tieu khac va ngay va ghi chu
            if (loaiChiTieu === "KHAC" && ngay && ghiChu) {
                const listChiTieuKhac = dataKhac.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.tenKhoan,
                    danhmuc: "Khác",
                    tien: chuyenDinhDangTien(item.soTien)
                }))
                const list = listChiTieuKhac.filter(item => item.ngay === ngay && (item.mota || "").toLowerCase() === (ghiChu || "").toLowerCase()

                )
                setChiTieuKhac(list)
            }

            // check ghi chu va loai chi tieu
            if (ghiChu && (loaiChiTieu)) {
                const listChiTieu = dataChiTieu.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.ghiChu,
                    danhmuc: chuyenLoaiChiTieu(item.loaiChiTieu),
                    tien: chuyenDinhDangTien(item.soTien),
                    thoiGianNhap: item.thoiGianNhap
                }))

                const list = listChiTieu.filter(item => (item.mota || "").toLowerCase() === (ghiChu || "").toLowerCase()

                )
                setChiTieu(list)
            }

            // ngay chu va loai chi tieu
            if (ngay && (loaiChiTieu)) {
                const listChiTieu = dataChiTieu.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.ghiChu,
                    danhmuc: chuyenLoaiChiTieu(item.loaiChiTieu),
                    tien: chuyenDinhDangTien(item.soTien),
                    thoiGianNhap: item.thoiGianNhap
                }))

                const list = listChiTieu.filter(item => item.ngay === chuyenNgay(ngay))
                setChiTieu(list)
            }

            // ngay chu va loai chi tieu va ngay
            if (ngay && (loaiChiTieu) && ghiChu) {
                const listChiTieu = dataChiTieu.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.ghiChu,
                    danhmuc: chuyenLoaiChiTieu(item.loaiChiTieu),
                    tien: chuyenDinhDangTien(item.soTien),
                    thoiGianNhap: item.thoiGianNhap
                }))

                const list = listChiTieu.filter(item => item.ngay === chuyenNgay(ngay) && (item.mota || "").toLowerCase() === (ghiChu || "").toLowerCase()

                )
                setChiTieu(list)
            }



            //tat ca
            if (loaiChiTieu === "") {
                const listChiTieu = data.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.ghiChu,
                    danhmuc: chuyenLoaiChiTieu(item.loaiChiTieu),
                    tien: chuyenDinhDangTien(item.soTien),
                    thoiGianNhap: item.thoiGianNhap
                }))
                const listChiTieuKhac = dataKhac.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.tenKhoan,
                    danhmuc: "Khác",
                    tien: chuyenDinhDangTien(item.soTien)
                }))
                setChiTieuTatCa([...listChiTieu, ...listChiTieuKhac])
            }

            //loc tat ca va ngay
            if (loaiChiTieu === "" && ngay) {
                const listChiTieu = data.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.ghiChu,
                    danhmuc: chuyenLoaiChiTieu(item.loaiChiTieu),
                    tien: chuyenDinhDangTien(item.soTien),
                    thoiGianNhap: item.thoiGianNhap
                }))
                const listChiTieuKhac = dataKhac.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.tenKhoan,
                    danhmuc: "Khác",
                    tien: chuyenDinhDangTien(item.soTien)
                }))
                const listAll = [...listChiTieu, ...listChiTieuKhac]
                const list = listAll.filter(item => item.ngay === chuyenNgay(ngay))
                setChiTieuTatCa(list)
            }

            //loc tat ca va ghi chu
            if (loaiChiTieu === "" && ghiChu) {
                const listChiTieu = data.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.ghiChu,
                    danhmuc: chuyenLoaiChiTieu(item.loaiChiTieu),
                    tien: chuyenDinhDangTien(item.soTien),
                    thoiGianNhap: item.thoiGianNhap
                }))
                const listChiTieuKhac = dataKhac.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.tenKhoan,
                    danhmuc: "Khác",
                    tien: chuyenDinhDangTien(item.soTien)
                }))
                const listAll = [...listChiTieu, ...listChiTieuKhac]
                const list = listAll.filter(item => (item.mota || "").toLowerCase() === (ghiChu || "").toLowerCase()

                )
                setChiTieuTatCa(list)
            }

            //loc tat ca va ghi chu va ngay
            if (loaiChiTieu === "" && ghiChu && ngay) {
                const listChiTieu = data.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.ghiChu,
                    danhmuc: chuyenLoaiChiTieu(item.loaiChiTieu),
                    tien: chuyenDinhDangTien(item.soTien),
                    thoiGianNhap: item.thoiGianNhap
                }))
                const listChiTieuKhac = dataKhac.map(item => ({
                    id: item.id,
                    ngay: chuyenNgay(item.ngayTao),
                    mota: item.tenKhoan,
                    danhmuc: "Khác",
                    tien: chuyenDinhDangTien(item.soTien)
                }))
                const listAll = [...listChiTieu, ...listChiTieuKhac]
                const list = listAll.filter(item => (item.mota || "").toLowerCase() === (ghiChu || "").toLowerCase()

                    && item.ngay === chuyenNgay(ngay))
                setChiTieuTatCa(list)
            }

        } catch (err) {
            console.error(err)
        }
    }

    //lay data
    useEffect(() => {
        GetDataChiTieu()
    }, [loaiChiTieu, ghiChu, ngay, reload])

    return (
        <>
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
                        {(chiTieu.length === 0 && chiTieuKhac.length === 0 && chiTieuTatCa.length === 0) && <tbody>
                            <tr>
                                <td>-----</td>
                                <td>-----</td>
                                <td>-----</td>
                                <td>-----</td>
                                <td><FontAwesomeIcon className={cx('pen')} icon={faPenToSquare} /><FontAwesomeIcon className={cx('trash')} icon={faTrash} /></td>
                            </tr>
                        </tbody>}
                        {chiTieu.length > 0 && loaiChiTieu !== "KHAC" &&
                            (chiTieu.map((item, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{item.ngay}</td>
                                        <td>{item.mota}</td>
                                        <td><span
                                            className={cx({ green: item.danhmuc === "Giải trí" },
                                                { yellow: item.danhmuc === "Mua sắm" },
                                                { blue: item.danhmuc === "Ăn uống" },
                                                { purple: item.danhmuc === "Khác" }
                                            )}
                                        >{item.danhmuc}</span></td>
                                        <td>-{item.tien}  VNĐ</td>
                                        <td><FontAwesomeIcon onClick={() => { handleOnChangeData(item.id, item.danhmuc, item.mota, item.ngay, item.tien) }} className={cx('pen')} icon={faPenToSquare} /><FontAwesomeIcon onClick={() => { handleDelete(item.id, item.danhmuc) }} className={cx('trash')} icon={faTrash} /></td>
                                    </tr>
                                </tbody>
                            )))}

                        {chiTieuTatCa.length > 0 && loaiChiTieu !== "KHAC" && loaiChiTieu === "" &&
                            (chiTieuTatCa.map((item, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{item.ngay}</td>
                                        <td>{item.mota}</td>
                                        <td><span
                                            className={cx({ green: item.danhmuc === "Giải trí" },
                                                { yellow: item.danhmuc === "Mua sắm" },
                                                { blue: item.danhmuc === "Ăn uống" },
                                                { purple: item.danhmuc === "Khác" }
                                            )}
                                        >{item.danhmuc}</span></td>
                                        <td>-{item.tien}  VNĐ</td>
                                        <td><FontAwesomeIcon onClick={() => { handleOnChangeData(item.id, item.danhmuc, item.mota, item.ngay, item.tien) }} className={cx('pen')} icon={faPenToSquare} /><FontAwesomeIcon onClick={() => { handleDelete(item.id, item.danhmuc) }} className={cx('trash')} icon={faTrash} /></td>
                                    </tr>
                                </tbody>
                            )))}
                        {chiTieuKhac.length > 0 && loaiChiTieu === "KHAC" &&
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
        </>
    );
}

export default TongQuanTable;