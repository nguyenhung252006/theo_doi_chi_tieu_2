const chuyenLoaiChiTieu = (a) =>{
    switch(a) {
        case 'MUA_SAM':
            return 'Mua sắm'
            break
        case 'GIAI_TRI':
            return 'Giải trí'
            break
        case 'AN_UONG':
            return 'Ăn uống'
            break
        default:
            return a
            break
    }
}

export default chuyenLoaiChiTieu