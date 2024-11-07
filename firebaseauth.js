// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyANH2exPgfU8hxWIjsZA8QQ5YI6w2ENUWs",
    authDomain: "login-method-83aa9.firebaseapp.com",
    projectId: "login-method-83aa9",
    storageBucket: "login-method-83aa9.appspot.com",
    messagingSenderId: "984965072383",
    appId: "1:984965072383:web:834d49b465bbfe064213ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const fullName = document.getElementById('fName').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                name: fullName
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error("error writing document", error);

                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists!', 'signUpMessage');
            }
            else {
                showMessage('Unable To Create User!', 'signUpMessage');
            }
        })
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('Login Is Successful!', 'signInMessage');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'homepage.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email Or Password!', 'signInMessage');
            }
            else {
                showMessage('Account Does Not Exist!', 'signInMessage');
            }
        })
});

const resetPasswordLink = document.getElementById('resetPassword');

resetPasswordLink.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
        .then(() => {
            showMessage('Password Reset Email Sent!', 'signInMessage');
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-email') {
                showMessage('Invalid Email Address!', 'signInMessage');
            } else {
                showMessage('Error Sending Password Reset!', 'signInMessage');
            }
        });
});

document.getElementById('googleSignInA').addEventListener('click', () => {
  firebase.auth().signInWithPopup(googleProvider)
    .then((result) => {
      // Handle successful sign-in
    })
    .catch((error) => {
      // Handle errors
    });
});
