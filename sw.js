const CACHE_NAME='tree-survey-check-v5';
const FILES=['./','./index.html','./species.json','./manifest.json','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const url=new URL(e.request.url);
 if(url.pathname.endsWith('/species.json')){
  e.respondWith(fetch(e.request).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy));}return resp;}).catch(()=>caches.match(e.request)));
  return;
 }
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy));return resp;})));
});
