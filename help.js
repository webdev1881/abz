// firebase.client.ts
// import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics"

// export default defineNuxtPlugin(nuxtApp => {
//     const config = useRuntimeConfig()

//     const firebaseConfig = {
//         apiKey: "AIzaSyCDjUcFCIfe_GJEUaclJW9-tIUnlfOYxz4",
//         authDomain: "abz-nuxt.firebaseapp.com",
//         projectId: "abz-nuxt",
//         storageBucket: "abz-nuxt.appspot.com",
//         messagingSenderId: "112481621859",
//         appId: "1:112481621859:web:d6b136eb348d8cdfc12556",
//         measurementId: "G-C9516GCCRS"
//     }

//     const app = initializeApp(firebaseConfig)
//     console.log(app);
// })

// nitro: {
//     preset: 'firebase',
//     firebase: {
//       gen: 2
//     }
//   }

//   "deploy-fb": "cd .output/server && rd /s /q node_modules && npm i && cd.. && firebase deploy",