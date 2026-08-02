// Service Worker cơ bản cho Hệ Thống Quản Lý Địa Bàn CSKV
// Mục tiêu: sau khi mở phần mềm thành công 1 lần có mạng, các lần mở sau (kể cả mất mạng tạm thời tại hiện
// trường) vẫn tải được GIAO DIỆN chính (không đảm bảo dữ liệu mới nhất — dữ liệu thật cần có Internet để
// đồng bộ với Firestore). Đây là bước offline cơ bản (cache app-shell), có thể nâng cấp sâu hơn sau.

const TEN_CACHE = "quanlydiaban-cache-v1";
const FILE_CAN_CACHE = [
  "./QuanLyDiaBan_TanAn.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(TEN_CACHE).then((cache) => cache.addAll(FILE_CAN_CACHE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((danhSach) =>
      Promise.all(danhSach.filter((ten) => ten !== TEN_CACHE).map((ten) => caches.delete(ten)))
    )
  );
  self.clients.claim();
});

// Chiến lược: ưu tiên mạng thật trước (để luôn có bản mới nhất khi có Internet), nếu lỗi/mất mạng thì
// mới lấy từ cache đã lưu trước đó (Network-first, fallback Cache).
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const resSao = res.clone();
        caches.open(TEN_CACHE).then((cache) => cache.put(event.request, resSao)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
