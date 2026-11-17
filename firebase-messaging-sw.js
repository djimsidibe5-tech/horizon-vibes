// Service worker de Horizon VIBES : notifications push + chargement rapide / hors connexion
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
// Mêmes valeurs que firebaseConfig dans index.html
firebase.initializeApp({apiKey:"AIzaSyAVf4AMYS7UndWcE8FfvrHJDIDb5quMKKY",authDomain:"horizon-vibes.firebaseapp.com",projectId:"horizon-vibes",messagingSenderId:"104450953401",appId:"1:104450953401:web:d4fd62890ed18dca1acb68"});
firebase.messaging();

const SHELL = "hv-shell-v2";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("hv-shell-") && k !== SHELL).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Pages : réseau d'abord (toujours la dernière version), cache en secours hors connexion.
// Images, icônes et manifeste du site : cache d'abord, mis à jour en arrière-plan.
// Tout le reste (Firebase, vidéos, images externes) n'est pas touché.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin || req.headers.has("range")) return;
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(SHELL).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match("./")))
    );
    return;
  }
  if (/\.(png|jpe?g|webp|svg|json)$/i.test(url.pathname)) {
    e.respondWith(
      caches.open(SHELL).then((c) =>
        c.match(req).then((hit) => {
          const net = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
          return hit || net;
        })
      )
    );
  }
});
