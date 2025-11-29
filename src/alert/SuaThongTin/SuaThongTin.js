import classNames from "classnames/bind";
import style from './SuaThongTin.module.scss'


//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

//import component
import XacNhanSua from "../XacNhanSua/XacNhanSua";

//import hook
import { useState, useRef } from "react";

//import my hook 
import { useOutWrapper } from "../../hook";

//import ho_tro
import { chuyenDinhDangTien } from "../../ho_tro";

const cx = classNames.bind(style)
function SuaThongTin({ soTien, soNgay, onSubmitSuccess, id, loai, moTa, tien, ngay, isClose, isDinhMuc }) {

    //ref
    const outRef = useRef()

    //state luu thay doi 
    const [moTaNew, setMotaNew] = useState(moTa)
    const [tienNew, setTienNew] = useState(tien)
    const [ngayNew, setNgayNew] = useState(ngay)
    const [soTienNew, setSoTienNew] = useState(soTien)
    const [soNgayNew, setSoNgayNew] = useState(soNgay)

    //check xac XacNhanSua
    const [isSubmit, setIsSubmit] = useState(false)

    useOutWrapper(outRef, isClose);

    const handleSubmit = () => {
        setIsSubmit(true)
    }
    const handleCloseAll = () => {
        setIsSubmit(false)
        isClose()
    }

    const handleCancel = () => {
        setIsSubmit(false)
    }

    //handle xu ly 
    const HandleChangeMoTa = (e) => {
        const value = e.target.value
        setMotaNew(value)
    }

    const HandleChangeTien = (e) => {
        const value = e.target.value
        setTienNew(value)
    }

    const HandleChangeNgay = (e) => {
        const value = e.target.value
        setNgayNew(value)
    }

    // handle dinh muc

    const HandleChangeSoTien = (e) => {
        const value = e.target.value
        setSoTienNew(value)
    }

    const HandleChangeSoNgay = (e) => {
        const value = e.target.value
        setSoNgayNew(value)
    }

    return (

        <div ref={outRef}>
            {isSubmit && <XacNhanSua
                onSubmitSuccess={onSubmitSuccess}
                isSubmited={handleCloseAll}
                loai={loai} id={id} tien={tienNew} ngay={ngayNew} moTa={moTaNew} isCancel={handleCancel} />
            }
            {!isSubmit && !isDinhMuc && <div className={cx('wrapper')}>
                <h1><FontAwesomeIcon icon={faScrewdriverWrench} />Chỉnh sửa chi tiêu</h1>

                <div>
                    <label>Số tiền</label>
                    <input
                        value={chuyenDinhDangTien(tienNew)}
                        onChange={(e) => { HandleChangeTien(e) }}
                    ></input>
                    <label>Mô tả</label>
                    <input
                        value={moTaNew}
                        onChange={(e) => { HandleChangeMoTa(e) }}
                    ></input>
                    <label>Ngày sử dụng</label>
                    <input
                        value={ngayNew}
                        onChange={(e) => { HandleChangeNgay(e) }}
                        type="date"></input>
                    <button className={cx('button-sua-thong-tin')} onClick={handleSubmit}>Lưu chỉnh sửa</button>
                </div>
            </div>}
            {/* dinh muc */}
            {isSubmit && isDinhMuc && <XacNhanSua
                isDinhMuc={isDinhMuc}
                onSubmitSuccess={onSubmitSuccess}
                isSubmited={handleCloseAll}
                id={id} soTien={soTienNew} soNgay={soNgayNew} isCancel={handleCancel} />
            }
            {!isSubmit && isDinhMuc && <div className={cx('wrapper')}>
                <h1><FontAwesomeIcon icon={faScrewdriverWrench} />Chỉnh sửa định mức</h1>

                <div>
                    <label>Số tiền</label>
                    <input
                        value={chuyenDinhDangTien(soTienNew)}
                        onChange={(e) => { HandleChangeSoTien(e) }}
                    ></input>
                    <label>Ngày thực hiện</label>
                    <input
                        value={soNgayNew}
                        onChange={(e) => { HandleChangeSoNgay(e) }}
                    ></input>
                    <button className={cx('button-sua-thong-tin')} onClick={handleSubmit}>Lưu chỉnh sửa</button>
                </div>
            </div>}

        </div>
    );
}

export default SuaThongTin;