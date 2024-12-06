ReservApp - Sistema de Reserva de Auditorios en Costa Rica

ReservApp es una aplicación web diseñada para la gestión de reservas de asientos en eventos y auditorios ubicados en la zona central de Costa Rica. Desarrollada como parte del curso de Progra 4, esta plataforma ofrece funcionalidades avanzadas para diferentes tipos de usuarios, garantizando una experiencia interactiva, eficiente y en tiempo real.

Tecnologías Utilizadas

React JS: Framework para la construcción de una interfaz de usuario dinámica e interactiva.

Firebase: Backend como servicio para:

Autenticación de usuarios.

Base de datos en tiempo real para reservas y gestión de eventos.

Almacenamiento de imágenes de eventos.

GIT: Control de versiones desde el inicio para un desarrollo colaborativo.

Trello: Herramienta de gestión de tareas y planificación del proyecto.

Funcionalidades Principales

Reservas en Tiempo Real

Los usuarios pueden seleccionar y reservar asientos directamente desde un mapa interactivo del auditorio, con actualizaciones inmediatas de disponibilidad.

Gestión de Usuarios

Usuario Básico: Puede reservar hasta 5 asientos en cualquier auditorio.

Usuario VIP:

Acceso exclusivo para reservar un día antes.

Descuento del 20% en teatros con zonas VIP.

Asientos especiales reservados solo para VIP.

Administrador:

Administra un auditorio específico (uno por cada auditorio).

Crea y gestiona eventos (fotos, descripción, horarios, precios).

Monitorea y regula los asientos.

Recepcionista:

Escanea códigos QR para validar entradas.

Cambia el estado de los asientos a "asistido".

Gestión de Eventos

Los administradores pueden crear eventos con:

Foto del espectáculo.

Descripción detallada.

Fecha y hora del evento (sin conflictos horarios en el mismo auditorio).

Diferentes precios por zona (en Teatro Nacional y Teatro Melico Salazar).

Sistema de Tickets Electrónicos


Los usuarios reciben un correo de confirmación al finalizar la reserva.

Incluye un código QR con detalles del evento, que será escaneado por el recepcionista.

Notificación con recordatorio de llegada 30 minutos antes del evento.

Aviso de liberación automática de asientos 10 minutos después del inicio del evento.

Asientos Asistidos y Liberación Automática

Los asientos marcados como "asistido" se confirman al presentarse en el evento.

Los asientos no utilizados se liberan automáticamente para otros usuarios.

Interfaz Intuitiva y Cascada de Opciones

Menú dinámico con opciones como perfil, notificaciones y lista de auditorios.

Selección progresiva: al hacer clic en un auditorio, se despliegan los eventos disponibles.

Auditorios Disponibles

Aula Magna UCR

Centro para las Artes UNA

Centro de las Artes TEC

Teatro Melico Salazar

Teatro Nacional

Flujo de Trabajo del Usuario

Inicio de Sesión: Los usuarios deben loguearse en la página web.

Selección del Auditorio: Navegan entre los auditorios y eventos disponibles.

Reserva de Asientos:

Eligen asientos desde un mapa interactivo.

Realizan una compra simulada (con los descuentos aplicables).

Recepción del Ticket:

Reciben un correo con los detalles de la reserva y el código QR.

Avisos importantes sobre la llegada anticipada y liberación de entradas.

Ingreso al Evento:

El recepcionista valida la entrada mediante el código QR.

Cambia el estado del asiento a "asistido".

