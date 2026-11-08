importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
// Mêmes valeurs que firebaseConfig dans index.html
firebase.initializeApp({apiKey:"AIzaSyAVf4AMYS7UndWcE8FfvrHJDIDb5quMKKY",authDomain:"horizon-vibes.firebaseapp.com",projectId:"horizon-vibes",messagingSenderId:"104450953401",appId:"1:104450953401:web:d4fd62890ed18dca1acb68"});
firebase.messaging();

// Nécessaire pour que le site soit installable comme une application
self.addEventListener("fetch",()=>{});
