import React, { useState, useEffect } from 'react';
import Home from './Components/Home';
import Login from './Components/Login';  
import app from "./firebaseconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";  

const Auth = getAuth(app);  
const db = getDatabase(app); 

function App() {
  const [user, setUser] = useState(null);

  async function getRol(uid)  {
    const userRef = ref(db, `users/${uid}`); 
    const snapshot = await get(userRef); 
    if (snapshot.exists()) {
      const userData = snapshot.val(); 
      return userData.rol; 
    } else {
      console.error("No se encontraron datos del usuario");
      return null;
    }
  }
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (userFirebase) => {
      if (userFirebase) {
        getRol(userFirebase.uid).then((rol) => {
          if (rol) {
            const userData  = {
              uid: userFirebase.uid,
              email: userFirebase.email,
              rol: rol,  
            };
            setUser(userData);  
          }
        });
      } else {
        setUser(null);  
      }
    });

    return () => unsubscribe();
  }, []); 

  return (
    <>
      {user ? <Home user={user} /> : <Login />} {/* Pasa el usuario a Home */}
    </>
  );
}

export default App;


