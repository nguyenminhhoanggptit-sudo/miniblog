# MiniBlog

Ứng dụng blog xây dựng bằng **React + TypeScript (Vite)**, **React Router** và **Tailwind CSS**, giao diện theo phong cách "Biển cả". Dữ liệu lấy từ [JSONPlaceholder](https://jsonplaceholder.typicode.com) bằng `fetch`.

## Chức năng

- Trang chủ: danh sách bài viết, tìm kiếm theo tiêu đề
- Trang chi tiết bài viết kèm danh sách bình luận
- Trạng thái đang tải (spinner) và thông báo lỗi (toast) khi gọi API thất bại
- Đăng nhập / đăng xuất, Private Route cho trang "Viết bài"
- Form viết bài có validation, bài mới lưu vào `localStorage` và hiển thị cùng danh sách từ API
- Trang 404 tùy chỉnh

## Chạy dự án

```bash
npm install
npm run dev
```

Tài khoản đăng nhập: `admin` / `123456`

## Build

```bash
npm run build
npm run preview
```
