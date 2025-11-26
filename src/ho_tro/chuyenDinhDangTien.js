export default function chuyenDinhDangTien(value) {
  if (!value) return '';

  // Bỏ ký tự không phải số (kể cả dấu chấm cũ)
  let numberString = value.toString().replace(/\D/g, '');

  // Nếu trống, trả về rỗng
  if (!numberString) return '';

  // Thêm dấu chấm mỗi 3 số từ phải sang trái
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
