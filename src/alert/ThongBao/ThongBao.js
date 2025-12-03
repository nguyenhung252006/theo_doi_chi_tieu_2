import classNames from "classnames/bind";
import style from './ThongBao.module.scss'

//import icon 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

//import ho tro
import { chuyenDinhDangTien } from "../../ho_tro";

const cx = classNames.bind(style)
function ThongBao({ dangerous = false, soTien }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo-wrapper')}>
                <FontAwesomeIcon className={cx('icon', { green: !dangerous })} icon={faBell} />
                <span>Thông báo</span>
            </div>
            <div className={cx('thong-bao-wrapper')}>
                <div className={cx("thong-bao-text")}>
                    {!dangerous && <h3>Bạn còn dư: <span>{chuyenDinhDangTien(soTien)} VNĐ</span></h3>}
                    {dangerous && <h3>Bạn đã tiêu vượt định mức: <span>{chuyenDinhDangTien(soTien)} VNĐ</span></h3>}
                </div>
            </div>
        </div>
    );
}

export default ThongBao;