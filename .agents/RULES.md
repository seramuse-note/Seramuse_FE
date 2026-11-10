# Quy Chuẩn Phát Triển Mã Nguồn (Seramuse FE Development Rules)

Tài liệu này định nghĩa các quy tắc cốt lõi về phong cách lập trình, kiến trúc thành phần (Component Architecture), hiệu năng, ngữ nghĩa HTML và quy trình kiểm thử bắt buộc phải tuân thủ trong dự án **Seramuse FE**.

---

## 1. Chuẩn React 19 & TypeScript Type Imports

### 1.1. Cấm truy xuất kiểu qua namespace `React.*`

- **KHÔNG sử dụng**: `React.FC`, `React.MouseEvent`, `React.ReactNode`, `React.ChangeEvent`, `React.KeyboardEvent`,...
- **BẮT BUỘC sử dụng named type imports trực tiếp từ `'react'`**:
  ```ts
  // ❌ SAI
  export const MyComponent: React.FC<Props> = ({ onClick }: { onClick: (e: React.MouseEvent) => void }) => { ... };

  // ✅ ĐÚNG
  import type { FC, MouseEvent, ReactNode, ChangeEvent } from 'react';

  export const MyComponent: FC<Props> = ({ onClick }: { onClick: (e: MouseEvent) => void }) => { ... };
  ```

### 1.2. Không import `React` thừa

- Dự án sử dụng React 19 với JSX Transform mới, không cần viết `import React from 'react';` chỉ để render JSX.

### 1.3. Tránh xung đột tên với DOM types

- Khi component sử dụng đồng thời event native của browser (ví dụ `document.addEventListener('mousedown')`) và event của React, sử dụng alias rõ ràng:
  ```ts
  import { type MouseEvent as ReactMouseEvent } from 'react';

  // Native DOM event listener:
  const handleNativeClick = (e: MouseEvent) => { ... };

  // React synthetic event:
  const handleReactClick = (e: ReactMouseEvent) => { ... };
  ```

---

## 2. Kiến trúc Thành Phần & Điều Phối Dữ Liệu (Coordinator Pattern)

### 2.1. Chống "God Component"

- Không dồn toàn bộ API queries, mutations, local state và hàng trăm dòng JSX vào một component duy nhất.
- Bóc tách toàn bộ Business Logic và data pipeline phức tạp ra các custom hook riêng biệt (ví dụ `useNoteSidebar`).

### 2.2. Áp dụng Mô hình Điều Phối Viên (Coordinator Pattern)

- **Component cha làm Điều phối viên (Coordinator / Orchestrator)**:
  - Chỉ tập trung quản lý các tham số truy vấn dữ liệu cốt lõi (`searchQuery`, `filter`, `tab`, `page`).
  - Thực thi query dữ liệu chính (RTK Query) và phân phối dữ liệu sạch xuống các sub-components.
- **Component con phải Tự trị (Autonomous)**:
  - Mọi trạng thái và hành vi mang tính chất nội bộ phải do chính component đó quản lý:
    - State mở/đóng popover, dropdown thuộc về chính component đó (ví dụ `isOpenFilter` trong ô tìm kiếm).
    - Modal xác nhận xóa, mutation xóa, toast notification thuộc về component danh sách (ví dụ `NoteSidebarList`).
    - Các action như toggle like, select note card thuộc về list/card.
- **Triệt tiêu Prop Drilling**:
  - Không truyền các state/handler nội bộ qua nhiều tầng component trung gian khi component con có thể tự xử lý.

### 2.3. Không lạm dụng Context và Redux cho State tạm

- Không tạo React Context hoặc đẩy các state UI tạm bợ (search query, filter tạm, trang hiện tại) vào Redux global store khi mô hình Coordinator với các props tinh gọn đã giải quyết trọn vẹn và an toàn.

---

## 3. Hiệu Năng & Trải Nghiệm Người Dùng (Performance & UX)

### 3.1. Debounce ô tìm kiếm gọi API

- Mọi input tìm kiếm gọi API bắt buộc phải sử dụng `useDebounce` (từ `@/hooks/useDebounce`, độ trễ 300ms - 500ms) trước khi truyền vào query params.
- Tuyệt đối không gửi request API trên từng ký tự người dùng gõ phím.

### 3.2. Tự động reset về Trang 1

- Khi người dùng thay đổi từ khóa tìm kiếm, đổi tab hoặc cập nhật bộ lọc, `currentPage` phải tự động reset về `1`.

### 3.3. Quy tắc State React 19 (Tránh Cascading Renders)

- Bắt buộc reset trang ngay bên trong hàm xử lý sự kiện (ví dụ `handleSearchChange`, `handleTabChange`), **tuyệt đối không dùng `useEffect` để gọi `setState` đồng bộ**:
  ```ts
  // ❌ SAI (Gây lỗi lint react-hooks/set-state-in-effect và render lặp)
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  // ✅ ĐÚNG
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  ```

### 3.4. Phân định rõ ràng các trạng thái rỗng (Empty States)

- Phân biệt rõ các kịch bản không có dữ liệu:
  1. Chưa có dữ liệu trên toàn hệ thống -> Hiển thị lời mời tạo mới.
  2. Tìm kiếm / lọc không có kết quả -> Hiển thị "Không tìm thấy kết quả".
  3. Tab lọc rỗng (ví dụ Favorites) -> Hiển thị "Chưa có ghi chú yêu thích".
- Không viết điều kiện lồng nhau khiến nhánh sau bị nhánh trước che mất (như lỗi `displayNotes.length == 0` che mất nhánh `activeTab === 'favorite'`).

---

## 4. Chuẩn Ngữ Nghĩa HTML & Trợ Năng (HTML Semantics & A11y)

### 4.1. Cấm lồng Interactive Elements sai chuẩn

- Tuyệt đối không đặt phần tử có sự kiện click (như `<div onClick>`) bên trong thẻ `<button>`:
  ```html
  <!-- ❌ SAI -->
  <button><div onClick="{...}">Click me</div></button>

  <!-- ✅ ĐÚNG -->
  <button type="button" onClick="{...}">Click me</button>
  ```

### 4.2. Thẻ Button chuẩn hóa

- Luôn khai báo rõ `type="button"` trên các nút bấm để tránh vô tình kích hoạt submit form.
- Nút chỉ chứa icon bắt buộc phải có thuộc tính `title` hoặc `aria-label` mô tả hành động.

### 4.3. Không tạo phần tử tương tác "ma"

- Mọi phần tử có kiểu dáng con trỏ bấm (`cursor-pointer`, hiệu ứng hover) bắt buộc phải được gắn handler `onClick` tương ứng.

---

## 5. Quy Trình Kiểm Tra & Đảm Bảo Chất Lượng Mã Nguồn

Mọi thay đổi trước khi hoàn thành hoặc commit đều phải vượt qua các lệnh kiểm tra trong `package.json`:

1. **Kiểm tra kiểu dữ liệu (TypeScript)**:
   ```powershell
   npx tsc -b
   ```
2. **Kiểm tra và sửa lỗi Linter**:
   ```powershell
   npm run lint
   ```
3. **Định dạng đồng bộ mã nguồn (Prettier)**:
   ```powershell
   npm run format
   ```
