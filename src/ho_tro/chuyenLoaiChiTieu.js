const chuyenLoaiChiTieu = (a) =>{
    switch(a) {
        case 'MUA_SAM':
            return 'Mua Sắm'
            break
        case 'GIAI_TRI':
            return 'Giải trí'
            break
        case 'AN_UONG':
            return 'Ăn Uống'
            break
        default:
            return a
            break
    }
}

export default chuyenLoaiChiTieu