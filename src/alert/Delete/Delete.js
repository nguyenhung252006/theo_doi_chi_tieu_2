import classNames from "classnames/bind";
import style from './Delete.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheck } from "@fortawesome/free-solid-svg-icons";

//import hook
import { useState, useRef } from "react";

//import out 
import { useOutWrapper } from "../../hook";

//import api 
import { deleteChiTieu, deleteChiTieuKhac, deleteDinhMuc } from "../../sendApi";

const cx = classNames.bind(style)
function Delete({ isDinhMuc, isClose, isCancel, id, loai, onSubmitSuccess }) {

    //xu ly out side
    const outRef = useRef()
    useOutWrapper(outRef, isClose)

    //state check deleted 
    const [deleted, setDeleted] = useState(false)

    const handleSubmit = () => {
        if (isDinhMuc) {
            deleteDinhMuc(id)
        }
        else if (loai === "Khác") {
            deleteChiTieuKhac(id)
        }
        else {
            deleteChiTieu(id)
        }

        setDeleted(true)

        setTimeout(() => {
            setDeleted(false)
            isClose()
            onSubmitSuccess()
        }, 1000)
    }

    return (
        <div className={cx('wrapper')} ref={outRef}>
            <div className={cx('icon-wrapper')}>
                {!deleted && <FontAwesomeIcon icon={faTrashCan} className={cx('trash-icon')} />}
                {/* icon ok */}
                {deleted && <FontAwesomeIcon className={cx('check')} icon={faCheck} />}
                <span>Bạn có chắc chắn xóa mục này không?</span>
            </div>
            <div className={cx('button-wrapper')}>
                <button onClick={handleSubmit} className={cx('ok')}>Xác nhận</button>
                <button onClick={isCancel} className={cx('no')}>Hủy bỏ</button>
            </div>
        </div>
    );
}

export default Delete;