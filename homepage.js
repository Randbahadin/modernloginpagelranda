import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

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

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.name;
                document.getElementById('loggedUserEmail').innerText=userData.email;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const signoutButton=document.getElementById('signout');

  signoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })

  const randaBtn = document.getElementById("randaBtn");
  randaBtn.addEventListener("click", function(){
    window.location.href = "https://linktr.ee/Randbahadin";
  });


  const refresh = document.getElementById('refresh');
  let intervalId;

  refresh.addEventListener('click', () => {
    const refreshRate = 500; 

    intervalId = setInterval(() => {
      location.reload();
    }, refreshRate);
  });

  // To stop the refresh:
  refreshButton.addEventListener('click', () => {
    clearInterval(intervalId);
  });

