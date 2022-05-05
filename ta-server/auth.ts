import { LoginService } from './login.service';
import { getAuth, signInWithCustomToken, signOut} from "firebase/auth";
import { initializeApp } from "firebase/app";

export class FBAuth implements OnInit{
    var admin;
    var firebaseConfig;
    var app;
    var serviceAccount;

    criarToken(cpf: string): string {
        admin.auth().createCustomToken(cpf).then((token) => {
            return token;
        })
        .catch(error) {
            return error.message;
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

      

    OnInit {
        this.firebaseConfig = {
            apiKey: "AIzaSyCnbHVORHVXbB6jwlzFdOYoYcZxBKMoNOs",
            authDomain: "siga-ess.firebaseapp.com",
            projectId: "siga-ess",
            storageBucket: "siga-ess.appspot.com",
            messagingSenderId: "472548883315",
            appId: "1:472548883315:web:e2ffddf7d16d9ab72c2306",
            measurementId: "G-8WY0WPWXYD"
        };
        this.app = initializeApp(this.firebaseConfig);
        this.admin = require("firebase-admin");
        this.serviceAccount = require("./cert.json");
        this.admin.initializeApp({
            credential: this.admin.credential.cert(this.serviceAccount)
        });
    }
};
