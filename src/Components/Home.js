import React, { useEffect, useState } from 'react';
import app from '../firebaseconfig';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, get } from "firebase/database";
import AdminView from './AdminView';
import UserView from './UserView';
import VIPUserView from './VIPUserView';
import RecepcionistView from './RecepcionistView';
import AdminAulaMagnaUCRView from './AdminAulaMagnaUCRView';
import AdminCentroArtesTECView from './AdminCentroArtesTECView';
import AdminCentroArtesUNAView from './AdminCentroArtesUNAView';
import AdminTeatroMelicoSalazarView from './AdminTeatroMelicoSalazarView';
import AdminTeatroNacionalView from './AdminTeatroNacionalView';
import RecepcionistAulaMagnaUCR from './RecepcionistAulaMagnaUCR';
import RecepcionistCentroArtesTEC from './RecepcionistCentroArtesTEC';
import RecepcionistCentroArtesUNA from './RecepcionistCentroArtesUNA';
import RecepcionistTeatroMelicoSalazar from './RecepcionistTeatroMelicoSalazar';
import RecepcionistTeatroNacional from './RecepcionistTeatroNacional';


const auth = getAuth(app);
const db = getDatabase(app);

function Home({ user }) {
    const [userRole, setUserRole] = useState('');
    const [userAuditorium, setUserAuditorium] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userRef = ref(db, `users/${user.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUserRole(data.rol);
                    setUserAuditorium(data.auditorio);
                }
            }
        };
        fetchUserData();
    }, [user]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Sesión cerrada");
        } catch (error) {
            console.error("Error cerrando sesión:", error.message);
        }
    };

    const renderViewBasedOnRoleAndAuditorium = () => {
        if (userRole === 'admin') {
            switch (userAuditorium) {
                case 'Aula Magna UCR':
                    return <AdminAulaMagnaUCRView />;
                case 'Centro para las Artes UNA':
                    return <AdminCentroArtesUNAView />;
                case 'Centro para las Artes TEC':
                    return <AdminCentroArtesTECView />;
                case 'Teatro Melico Salazar':
                    return <AdminTeatroMelicoSalazarView />;
                case 'Teatro Nacional':
                    return <AdminTeatroNacionalView />;
                default:
                    return <p>Auditorio no reconocido.</p>;
            }
        } else if (userRole === 'recepcionist') {
            switch (userAuditorium) {
                case 'Aula Magna UCR':
                    return <RecepcionistAulaMagnaUCR />;
                case 'Centro para las Artes UNA':
                    return <RecepcionistCentroArtesUNA />;
                case 'Centro para las Artes TEC':
                    return <RecepcionistCentroArtesTEC />;
                case 'Teatro Melico Salazar':
                    return <RecepcionistTeatroMelicoSalazar />;
                case 'Teatro Nacional':
                    return <RecepcionistTeatroNacional />;
                default:
                    return <p>Auditorio no reconocido.</p>;
            }
        } else if (userRole === 'vipuser') {
            return <VIPUserView />;
        } else if (userRole === 'user') {
            return <UserView />;
        } else {
            return <p>Rol no reconocido o no autorizado.</p>;
        }
    };

    return (
        <div>
            <button onClick={handleSignOut}>Cerrar sesión</button>
            {renderViewBasedOnRoleAndAuditorium()}
        </div>
    );
}

export default Home;

