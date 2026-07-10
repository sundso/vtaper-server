// V-Taper Log service worker.
// - Caches the app shell so it opens offline / installs to the home screen.
// - Relays a message from the page to show the "rest over" notification via
//   registration.showNotification (more reliable on Android than new Notification).
const CACHE = "vtaper-v3";
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon-180.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  // Only handle same-origin GETs. The backend API and CDN scripts pass straight
  // through to the network so we never serve a stale API response.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(req).then((cached) => cached || fetch(req)));
});

// The rest timer posts here when a rest finishes.
self.addEventListener("message", (e) => {
  const data = e.data || {};
  if (data.type === "notify") {
    self.registration.showNotification(data.title || "Rest over", {
      body: data.body || "Time for your next set.",
      tag: "rest-timer",
      renotify: true,
      vibrate: [300, 120, 300],
      icon: "./icons/icon-192.png",
      badge: "./icons/icon-192.png",
    });
  }
});

// Focus the app if the user taps the notification.
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) if ("focus" in c) return c.focus();
      if (self.clients.openWindow) return self.clients.openWindow("./");
    })
  );
});
