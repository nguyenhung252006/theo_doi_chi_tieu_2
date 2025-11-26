import classNames from "classnames/bind";
import style from './ThanhCong.module.scss'

//import icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style)
function Thanh_cong() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('icon-wrapper')}>
                <FontAwesomeIcon icon={faCircleCheck} className={cx('icon')}/>
                <h1>successfully!</h1>
            </div>
        </div>
     );
}

export default Thanh_cong;