export default function chuyenDinhDangTien(value) {
  if (value === null || value === undefined || value === "") return "";

  // Chuyển sang string để xử lý
  let str = value.toString();

  // Kiểm tra xem số âm không
  const isNegative = str.startsWith("-");

  // Bỏ tất cả ký tự không phải số
  let numberString = str.replace(/\D/g, "");

  if (!numberString) return isNegative ? "-0" : "0";

  // Format dấu chấm
  let formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Thêm lại dấu âm nếu có
  return isNegative ? `-${formatted}` : formatted;
}
