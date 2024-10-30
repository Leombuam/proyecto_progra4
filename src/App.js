import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserView from './Components/UserView';
import Login from './Components/Login';
import Home from './Components/Home';
import app from "./firebaseconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";  
import AulaMagnaUCR from './Components/Auditoriums/AulaMagnaUCR';
import CentroArtesTEC from './Components/Auditoriums/CentroArtesTEC';
import CentroArtesUNA from './Components/Auditoriums/CentroArtesUNA';
import TeatroMelicoSalazar from './Components/Auditoriums/TeatroMelicoSalazar';
import TeatroNacional from './Components/Auditoriums/TeatroNacional';

const Auth = getAuth(app);  
const db = getDatabase(app); 

function App() {
  const [user, setUser] = React.useState(null);

  async function getRol(uid) {
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

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (userFirebase) => {
      if (userFirebase) {
        getRol(userFirebase.uid).then((rol) => {
          if (rol) {
            const userData = {
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
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home user={user} /> : <Login />} />
        <Route path="/UserView" element={<UserView />} />
        <Route path="/aula-magna-ucr" element={<AulaMagnaUCR />} />
        <Route path="/centro-artes-tec" element={<CentroArtesTEC />} />
        <Route path="/centro-artes-una" element={<CentroArtesUNA />} />
        <Route path="/teatro-melico-salazar" element={<TeatroMelicoSalazar />} />
        <Route path="/teatro-nacional" element={<TeatroNacional />} />
      </Routes>
    </Router>
  );
}

export default App;


