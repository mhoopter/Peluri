importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDaoTx3CTUCpcPCp4KFKxjUgf0yiAObgnk",
  authDomain: "peluri-e6e7c.firebaseapp.com",
  projectId: "peluri-e6e7c",
  storageBucket: "peluri-e6e7c.firebasestorage.app",
  messagingSenderId: "1033286913949",
  appId: "1:1033286913949:web:62208000104d82a1a16974"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || 'Peluri Tipsklub';
  const body  = payload.notification?.body  || 'Ny besked fra Peluri';
  self.registration.showNotification(title, {
    body,
    icon:    '/logo.jpg',
    badge:   '/logo.jpg',
    vibrate: [200, 100, 200],
    data:    { url: '/report.html' }
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (const c of list) {
        if (c.url.includes('/report.html') && 'focus' in c) return c.focus();
      }
      return clients.openWindow('/report.html');
    })
  );
});
