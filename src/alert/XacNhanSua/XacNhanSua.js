import classNames from "classnames/bind";
import style from './XacNhanSua.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faCheck } from "@fortawesome/free-solid-svg-icons";

//import ho tro 
import { chuyenDinhDangTien, chuyenNgay } from "../../ho_tro";

//import hook
import { useState, useEffect } from "react";

//import put data
import { putChiTieu, putChiTieuKhac, putDinhMuc } from "../../sendApi";



const cx = classNames.bind(style)
function XacNhanSua({ isDinhMuc, onSubmitSuccess, id, isSubmited, isCancel, tien, ngay, moTa, loai, soTien, soNgay }) {

    //state luu data put
    const [dataPut, setDataPut] = useState({})
    const [dataPutDinhMuc, setDataPutDinhMuc] = useState({})

    //state set Thanh_cong
    const [isThanhCong, setIsThanhCong] = useState(false)

    const chuyenLoaiChiTieu = (a) => {
        switch (a) {
            case 'Mua sắm':
                return 'MUA_SAM'
                break
            case 'Giải trí':
                return 'GIAI_TRI'
                break
            case 'Ăn uống':
                return 'AN_UONG'
                break
            default:
                return a
                break
        }
    }

    useEffect(() => {

        const soTienPut = tien?.toString().replace(/\./g, '') || 0;

        const soTienPutDinhMuc = soTien?.toString().replace(/\./g, '') || 0;

        const loaiLower = loai?.toLowerCase() || "";

        if (isDinhMuc) {
            setDataPutDinhMuc({
                soTienDinhMuc: Number(soTienPutDinhMuc),
                soNgay: soNgay || 0,
            });
        } else if (loaiLower && loaiLower !== "khác") {
            setDataPut({
                loaiChiTieu: chuyenLoaiChiTieu(loai),
                soTien: Number(soTienPut),
                ghiChu: moTa,
                ngayTao: chuyenNgay(ngay)
            });
        } else {
            setDataPut({
                soTien: Number(soTienPut),
                tenKhoan: moTa,
                ngayTao: chuyenNgay(ngay)
            });
        }
    }, [loai, tien, moTa, ngay, soNgay, soTien, isDinhMuc]);


    //handle submit
    const handleSubmit = async () => {
        try {
            if (isDinhMuc) {
                await putDinhMuc(dataPutDinhMuc, id)
            }
            else if (loai !== 'Khác') {
                await putChiTieu(dataPut, id)
            }
            else {
                await putChiTieuKhac(dataPut, id)
            }
            setIsThanhCong(true)


            setTimeout(() => {
                isSubmited()
                setIsThanhCong(false)
                if (onSubmitSuccess) onSubmitSuccess();
            }, 2000)
        } catch (error) {
            console.log("Lỗi khi lưu dữ liệu:", error)
        }
    }


    return (
        <>
            <div className={cx('wrapper')}>
                {!isDinhMuc && <div>
                    <div className={cx("icon-wrapper")} >
                        {!isThanhCong && <FontAwesomeIcon className={cx("icon")} icon={faCircleQuestion} />}
                        {isThanhCong && <FontAwesomeIcon className={cx('check')} icon={faCheck} />}
                        <span>Lưu chỉnh sửa</span>
                    </div>
                    <div>
                        <div className={cx('thong-tin')}>
                            <div>
                                <h3>Số tiền: <span>{chuyenDinhDangTien(tien)} VNĐ</span></h3>
                            </div>
                            <div>
                                <h3>Ngày sử dụng: <span>{ngay}</span></h3>
                            </div>
                            <div>
                                <h3>Mô tả: <span>{moTa}</span></h3>
                            </div>
                        </div>
                    </div>
                    <div className={cx('button')}>
                        <button onClick={handleSubmit} className={cx('ok')}>Xác nhận</button>
                        <button onClick={isCancel} className={cx('no')}>Hủy bỏ</button>
                    </div>
                </div>}
                {/* dinh muc */}
                {isDinhMuc && <div>
                    <div className={cx("icon-wrapper")} >
                        {!isThanhCong && <FontAwesomeIcon className={cx("icon")} icon={faCircleQuestion} />}
                        {isThanhCong && <FontAwesomeIcon className={cx('check')} icon={faCheck} />}
                        <span>Lưu chỉnh sửa</span>
                    </div>
                    <div>
                        <div className={cx('thong-tin')}>
                            <div>
                                <h3>Số tiền: <span>{chuyenDinhDangTien(soTien)} VNĐ</span></h3>
                            </div>
                            <div>
                                <h3>Ngày thực hiện: <span>{soNgay}</span></h3>
                            </div>
                        </div>
                    </div>
                    <div className={cx('button')}>
                        <button onClick={handleSubmit} className={cx('ok')}>Xác nhận</button>
                        <button onClick={isCancel} className={cx('no')}>Hủy bỏ</button>
                    </div>
                </div>}
            </div>
        </>
    );
}

export default XacNhanSua;