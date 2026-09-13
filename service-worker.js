// Nombre del cache — si cambias tu app cambia este nombre
const CACHE_NAME = "currency-converter-v2";

// Lista de archivos que se guardan en el celular
const FILES_TO_CACHE = [
    "/src/pages/index.html",
    "/src/pages/register.html",
    "/src/pages/login.html",
    "/src/pages/converter.html",
    "/src/pages/rates.html",
    "/src/logo/android-chrome-192x192.png",
    "/src/logo/android-chrome-512x512.png",
    "/manifest.json"
];

// EVENTO INSTALL - Se ejecuta cuando la app se instala
// Guarda todos los archivos en el cache del celular
self.addEventListener("install", event => {
    console.log("Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Caching app files...");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// EVENTO ACTIVATE - Se ejecuta cuando el service worker se activa
// Borra caches viejos si cambiaste el CACHE_NAME
self.addEventListener("activate", event => {
    console.log("Service Worker activating...");
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log("Removing old cache:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// EVENTO FETCH - Se ejecuta cada vez que la app pide un archivo
// Primero busca en el cache, si no está lo pide al servidor
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Si está en cache lo devuelve del cache (sin internet)
            if (response) {
                return response;
            }
            // Si no está en cache lo pide al servidor normalmente
            return fetch(event.request);
        })
    );
});