const filesForCaching = [
  "/",
  "manifest.json",
  "index.html",
  "offline.html",
  "error404.html",
  "assets/main.css",
];
const staticCache = "web2-lab5-cache";

self.addEventListener("install", (event) => {
  console.log("Service worker is being installed...");
  event.waitUntil(
    caches.open(staticCache).then((cache) => {
      return cache.addAll(filesForCaching);
    })
  );
});
self.addEventListener("activate", (event) => {
  console.log("Service worker is being activated...");
  event.waitUntil(
    caches.keys().then((cNames) => {
      return Promise.all(
        cNames.map((cName) => {
          if ([staticCache].indexOf(cName) === -1) {
            return caches.delete(cName);
          }
        })
      );
    })
  );
});
self.addEventListener("fetch", (event) => {
  if (!(event.request.url.indexOf("http") === 0)) return;
  event.respondWith(
    caches
      .match(event.request)
      .then((res) => {
        if (res !== undefined) {
          return res;
        }
        return fetch(event.request).then((res) => {
          if (res.status === 404) {
            return caches.match("error404.html");
          }
          return caches.open(staticCache).then((cache) => {
            cache.put(event.request.url, res.clone());
            return res;
          });
        });
      })
      .catch((e) => {
        return caches.match("offline.html");
      })
  );
});
