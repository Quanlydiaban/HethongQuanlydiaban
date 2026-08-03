// Service Worker xử lý Thông báo đẩy (Push Notifications) khi trình duyệt đang chạy nền/đã đóng tab.
// File này BẮT BUỘC phải nằm CÙNG THƯ MỤC với file HTML chính trên GitHub Pages, và giữ ĐÚNG TÊN
// "firebase-messaging-sw.js" (Firebase SDK tự tìm đúng tên này, không đổi tên được).

importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

// Cấu hình PHẢI giống hệt FIREBASE_CONFIG trong file QuanLyDiaBan_TanAn.html
firebase.initializeApp({
  apiKey: "AIzaSyAD0-yw8LzTFUzBTWYC5vFtaDmvQjT1S9I",
  authDomain: "quanlydiaban-tanan.firebaseapp.com",
  projectId: "quanlydiaban-tanan",
  storageBucket: "quanlydiaban-tanan.firebasestorage.app",
  messagingSenderId: "608583673796",
  appId: "1:608583673796:web:dccae62f3f1d36f86fa691"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const tieuDe = payload.notification?.title || "Hệ Thống Quản Lý Địa Bàn";
  const tuyChon = {
    body: payload.notification?.body || "",
    icon: "./icon-192.png"
  };
  self.registration.showNotification(tieuDe, tuyChon);
});
