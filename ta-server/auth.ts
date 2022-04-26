import { LoginService } from '../common/services/login.service';
import { getAuth, signInWithCustomToken } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCnbHVORHVXbB6jwlzFdOYoYcZxBKMoNOs",
    authDomain: "siga-ess.firebaseapp.com",
    projectId: "siga-ess",
    storageBucket: "siga-ess.appspot.com",
    messagingSenderId: "472548883315",
    appId: "1:472548883315:web:e2ffddf7d16d9ab72c2306",
    measurementId: "G-8WY0WPWXYD"
  };

var firebaseAdmin = require('firebase-admin');

firebaseAdmin.initializeApp({
credential: firebaseAdmin.credential.cert('cert.json'),
databaseURL: 'https://siga-ess.firebaseio.com'
});

var firebaseAdmin = require('firebase-admin');
var authenticate = new LoginService();

@Injectable()
export class Auth {

    criarToken(cpf: string): string {
        firebaseAdmin.auth().createCustomToken(cpf).then((token) => {
            return token;
        })
        .catch(error) {
            return error.message;
        });
    }

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
}
module.exports = router;