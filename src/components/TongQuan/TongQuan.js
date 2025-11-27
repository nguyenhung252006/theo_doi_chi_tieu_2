import classNames from "classnames/bind";
import style from './TongQuan.module.scss'


//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";

//import component
import { TongQuanTable } from "../../itemContent";

//import hook
import { useState } from "react";


const cx = classNames.bind(style)
function TongQuan() {

    //lay id nguoi dung
    const UserId = localStorage.getItem('id')

    //state loai chi tieu
    const [loaiChiTieu, setLoaiChiTieu] = useState('')
    const [ghiChu, setGhiChu] = useState('')
    const [ngay, setNgay] = useState('')

    //handle xu li state
    const handleChangeLoaiChiTieu = (e) => {
        const value = e.target.value
        setLoaiChiTieu(value)
    }

    const handleChangeGhiChu = (e) => {
        const value = e.target.value
        setGhiChu(value)
    }

    const handleChangeNgay = (e) => {
        const value = e.target.value
        setNgay(value)
    }

    const handleReset = () => {
        setGhiChu('')
        setNgay('')
        setLoaiChiTieu('')
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo-wrapper')}>
                <FontAwesomeIcon className={cx('icon')} icon={faHandHoldingDollar} />
                <span>Theo dõi chi tiêu</span>
                <div>Xem lại tất cả giao dịch của bạn</div>
            </div>
            <div className={cx('input-filter-wrapper')}>
                <div className={cx('input-wrapper')}>
                    <div>
                        <input
                            onChange={(e) => { handleChangeGhiChu(e) }}
                            value={ghiChu}
                            placeholder="Tìm kiếm theo ghi chú"></input>
                    </div>
                    <div>
                        <label></label>
                        <input
                            onChange={(e) => { handleChangeNgay(e) }}
                            value={ngay}
                            type="date"></input>
                    </div>
                </div>
                <div className={cx('cac-muc-chi-tieu')}>
                    <button className={cx({ active: loaiChiTieu === '' })} onClick={(e) => { handleChangeLoaiChiTieu(e) }} value={''}>Tất cả</button>
                    <button className={cx({ active: loaiChiTieu === 'AN_UONG' })} onClick={(e) => { handleChangeLoaiChiTieu(e) }} value={'AN_UONG'}>Ăn uống</button>
                    <button className={cx({ active: loaiChiTieu === 'MUA_SAM' })} onClick={(e) => { handleChangeLoaiChiTieu(e) }} value={'MUA_SAM'}>Mua sắm</button>
                    <button className={cx({ active: loaiChiTieu === 'GIAI_TRI' })} onClick={(e) => { handleChangeLoaiChiTieu(e) }} value={'GIAI_TRI'}>Giải trí</button>
                    <button className={cx({ active: loaiChiTieu === 'KHAC' })} onClick={(e) => { handleChangeLoaiChiTieu(e) }} value={'KHAC'}>Khác</button>
                    <button onClick={handleReset}>đặt lại</button>
                </div>
            </div>
            <div className={cx('table-history-wrapper')}>
                <TongQuanTable
                    ngay={ngay}
                    ghiChu={ghiChu}
                    loaiChiTieu={loaiChiTieu}
                    UserId={UserId} />
            </div>
        </div>
    );
}

export default TongQuan;