# Reserva de Eventos de Teatro

ReservApp es una aplicación web diseñada para gestionar la reserva de auditorios en diferentes ubicaciones dentro de la zona central de Costa Rica, creada para el curso de "Progra 4". La aplicación permite a los usuarios hacer reservas de asientos para eventos, con diferentes niveles de acceso dependiendo del tipo de usuario.

## Tecnologías Utilizadas

-React JS: Framework utilizado para construir la interfaz de usuario.

-Firebase: Utilizado como backend para autenticación, base de datos en tiempo real y almacenamiento de reservas.

-GIT: Control de versiones desde el día 1 para un desarrollo colaborativo.

-Trello: Gestión del proyecto y seguimiento de tareas.

### Descripción del Proyecto

En Costa Rica se celebran múltiples festivales en auditorios, y ReservApp permite a los usuarios reservar asientos en 5 auditorios diferentes:

Aula Magna UCR

Centro para las Artes UNA

Centro de las Artes TEC

Teatro Melico Salazar

Teatro Nacional


### Tipos de Usuarios

Usuario Básico: Puede reservar hasta 5 asientos en cualquier auditorio.

Usuario VIP: Tiene acceso a reservar un día antes y puede seleccionar asientos exclusivos para VIP con un 20% de descuento.

Administrador: Administra un auditorio específico (5 administradores en total), regula los asientos y puede crear eventos.

Recepcionista: Encargado de verificar entradas y cambiar el estado de los asientos a "asistido".

### Funcionalidades Principales

-Reservas en Tiempo Real: Las reservas se actualizan en tiempo real, lo que permite a los usuarios ver los asientos disponibles y seleccionarlos.

-Gestión de Eventos: Los administradores pueden crear eventos con fotos, descripciones, fechas y horas. No se pueden crear eventos simultáneos en el mismo auditorio.

-Sistema de Tickets: Los usuarios reciben un correo electrónico con un código QR tras confirmar una reserva, el cual puede ser escaneado por el recepcionista al ingresar.

-Asientos Asistidos: Los asientos reservados se marcan como "asistido" al presentarse en el evento, o se liberan si no se presentan en un periodo de gracia de 10 minutos.

-Notificaciones por Correo: El sistema envía notificaciones con recordatorios de asistencia y liberación de asientos.

### ¿Qué se puede hacer en la página?

-Crear una cuenta de usuario.

-Buscar eventos y espectáculos en auditorios.

-Reservar hasta 5 asientos por evento (según la disponibilidad y tipo de usuario).

-Administrar asientos para los administradores.

-Gestionar el estado de los asientos para los recepcionistas.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
