import classNames from "classnames/bind";
import style from './XacNhanSua.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style)
function XacNhanSua({isClose}) {
    return (
        <div className={cx('wrapper')}>
            <div>
                <div>
                    <FontAwesomeIcon className={cx("icon")} icon={faCircleQuestion} /><span>Lưu chỉnh sửa</span>
                </div>
                <div>
                    <button className={cx('ok')}>Xác nhận</button>
                    <button className={cx('no')}>Hủy bỏ</button>
                </div>
            </div>
        </div>
    );
}

export default XacNhanSua;