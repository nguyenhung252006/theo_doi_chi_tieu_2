import classNames from "classnames/bind";
import style from './SuaThongTin.module.scss'

//import axios
import axios from "axios";

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

//import component
import XacNhanSua from "../XacNhanSua/XacNhanSua";

//import hook
import { useState, useEffect } from "react";

const cx = classNames.bind(style)
function SuaThongTin({ id, loai, moTa, tien, ngay }) {

    //state luu thay doi 
    const [moTaNew, setMotaNew] = useState(moTa)
    const [tienNew, setTienNew] = useState(tien)
    const [ngayNew, setNgayNew] = useState(ngay)

    //check xac XacNhanSua
    const [isSubmit, setIsSubmit] = useState(false)
    const [isClose, setIsClose] = useState(false)

    const handleSubmit = () => {
        setIsSubmit(true)
        setIsClose(true)
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

    return (

        <>
            {isSubmit && <XacNhanSua isClose={isClose}/>
            }
            {!isSubmit && <div className={cx('wrapper')}>
                <h1><FontAwesomeIcon icon={faScrewdriverWrench} />Chỉnh sửa chi tiêu</h1>

                <div>
                    <label>Số tiền</label>
                    <input></input>
                    <label>Mô tả</label>
                    <input></input>
                    <label>Ngày sử dụng</label>
                    <input type="date"></input>
                    <button className={cx('button-sua-thong-tin')} onClick={handleSubmit}>Lưu chỉnh sửa</button>
                </div>
            </div>}
        </>
    );
}

export default SuaThongTin;