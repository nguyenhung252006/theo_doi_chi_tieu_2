import { ThemChiTieu, TongQuan, BaoCao, NganSach, TrangChu } from "../components";

const PublicRoutes = [
    { path: '/Them-chi-tieu', component: ThemChiTieu },
    { path: '/Tong-quan', component: TongQuan },
    { path: '/Bao-cao', component: BaoCao },
    { path: '/Ngan-sach', component: NganSach },
    { path: '/', component: TrangChu },
]

export { PublicRoutes }