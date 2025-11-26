import classNames from "classnames/bind";
import style from './DefaultLayout.module.scss'

//import component
import SideBar from "../SideBar/SideBar";


const cx = classNames.bind(style)
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('side-bar')}>
                <SideBar />
            </div>
            <div className={cx('content')}>
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;