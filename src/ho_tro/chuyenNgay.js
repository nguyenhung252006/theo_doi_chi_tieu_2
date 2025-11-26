function chuyenNgay(dateString) {
    if (!dateString) return '';

    // Kiểm tra nếu đã ở dạng yyyy-mm-dd
    const yyyyMmDdRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (yyyyMmDdRegex.test(dateString)) {
        return dateString; // giữ nguyên
    }

    // Nếu là ISO string hoặc định dạng khác, chuyển về yyyy-mm-dd
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        console.error('Ngày không hợp lệ:', dateString);
        return '';
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export default chuyenNgay