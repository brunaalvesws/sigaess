import { LoginService } from './login.service';
import { getAuth, signInWithCustomToken, signOut} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCnbHVORHVXbB6jwlzFdOYoYcZxBKMoNOs",
    authDomain: "siga-ess.firebaseapp.com",
    projectId: "siga-ess",
    storageBucket: "siga-ess.appspot.com",
    messagingSenderId: "472548883315",
    appId: "1:472548883315:web:e2ffddf7d16d9ab72c2306",
    measurementId: "G-8WY0WPWXYD"
};
var app = initializeApp(firebaseConfig);
var admin = require("firebase-admin");
const serviceAccount = require("./cert.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


export class FBAuth {

    criarToken(cpf: string): any {
        admin.auth().createCustomToken(cpf).then( token => {
            return token;
        })
        .catch(e) {
            return e.message;
        });
    };

    authLogin(token: string): void {
        const auth = getAuth();
        signInWithCustomToken(auth, token)
        .then((userCredential) => {
        const user = userCredential.user;
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        });
    };

    authLogout(): void {
        const auth = getAuth();
        auth.signOut();
    }
};
