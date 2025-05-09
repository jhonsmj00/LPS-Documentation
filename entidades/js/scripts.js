const jsonData = [
    {
        "ID": 1,
        "EntityName": "E_BugRequest",
        "EntityRoute": "General/BugTracker",
        "EntityDescription": "Entidad que representa una peticion de registro de Bug.",
        "EntityImage": "E_BugRequest"
    },
    {
        "ID": 2,
        "EntityName": "E_ArchivoCoche",
        "EntityRoute": "General/GestionCoches",
        "EntityDescription": "Entidad que representa peticion de guardado de archivos adjuntos de registro de un coche.",
        "EntityImage": "E_ArchivoCoche" 
    },
    {
        "ID": 3,
        "EntityName": "E_Coches",
        "EntityRoute": "General/GestionCoches",
        "EntityDescription": "Entidad que representa atributos de un coche.",
        "EntityImage": "E_Coches"
    },
    {
        "ID": 4,
        "EntityName": "E_Delegacion",
        "EntityRoute": "General/GestionCoches",
        "EntityDescription": "Representa una coleccion de datos tipo Dictionary el cual esta definido por una key y su nombre",
        "EntityImage": "E_Delegacion"
    },
    {
        "ID": 5,
        "EntityName": "E_SolicitudCoche",
        "EntityRoute": "General/GestionCoches",
        "EntityDescription": "Entidad que representa una solicitud de coche.",
        "EntityImage": "E_SolicitudCoche"
    },
    {
        "ID": 6,
        "EntityName": "E_ArchivoIncidencia",
        "EntityRoute": "General/SoporteLogic",
        "EntityDescription": "Entidad que representa el guardado de archivos adjuntos de una incidencia.",
        "EntityImage": "E_ArchivoIncidencia"
    },
    {
        "ID": 7,
        "EntityName": "E_Estado",
        "EntityRoute": "General/SoporteLogic",
        "EntityDescription": "Entidad que define una serie de atributos para realizar una auditoria del usuario y el estado de una incidencia",
        "EntityImage": "E_Estado"
    },
    {
        "ID": 8,
        "EntityName": "E_Incidencia",
        "EntityRoute": "General/SoporteLogic",
        "EntityDescription": "Entidad que representa las caracteristicas de una incidencia.",
        "EntityImage": "E_Incidencia"
    },
    {
        "ID": 9,
        "EntityName": "E_SolicitudDelineacion",
        "EntityRoute": "Movil/DelineacionLogic",
        "EntityDescription": "Entidad que define atributos de una solicitud de delineacion (delimitacion de terreno).",
        "EntityImage": "E_SolicitudDelineacion"
    },
    {
        "ID": 10,
        "EntityName": "E_Localidades",
        "EntityRoute": "Movil/MovilData",
        "EntityDescription": "Entidad que establece atributos de medicion y ubicacion de una localidad.",
        "EntityImage": "E_Localidades"
    },
    {
        "ID": 11,
        "EntityName": "E_Modulo",
        "EntityRoute": "Movil/MovilData",
        "EntityDescription": "Entidad que representa una coleccion de datos tipo Dictionary el cual esta definido por una key y su nombre",
        "EntityImage": "E_Modulo"
    },
    {
        "ID": 12,
        "EntityName": "E_Operador",
        "EntityRoute": "Movil/MovilData",
        "EntityDescription": "Entidad que representa una coleccion de datos tipo Dictionary el cual esta definido por una key y su nombre",
        "EntityImage": "E_Operador"
    },
    {
        "ID": 13,
        "EntityName": "E_OperadorEmplazamiento",
        "EntityRoute": "Movil/MovilData",
        "EntityDescription": "Entidad que representa relación entre operador y emplazamiento (caracteristica de un proyecto de construccion). ",
        "EntityImage": "E_OperadorEmplazamiento"
    },
    {
        "ID": 14,
        "EntityName": "E_Propietarios",
        "EntityRoute": "Movil/MovilData",
        "EntityDescription": "Entidad que representa una coleccion de datos tipo Dictionary el cual esta definido por una key y su nombre",
        "EntityImage": "E_Propietarios"
    },
    {
        "ID": 15,
        "EntityName": "E_Proyecto",
        "EntityRoute": "Movil/MovilData",
        "EntityDescription": "Entidad que representa las caracteristicas de un proyecto.",
        "EntityImage": "E_Proyecto"
    },
    {
        "ID": 16,
        "EntityName": "E_Estado",
        "EntityRoute": "Movil/RadioElectrico",
        "EntityDescription": "Representa un estado, usuario y fecha.",
        "EntityImage": "E_Estado"
    },
    {
        "ID": 17,
        "EntityName": "E_Tecnologias",
        "EntityRoute": "Movil/RadioElectrico",
        "EntityDescription": "Entidad que representa atributos de tecnologia, abreviaturas, codigo de operadores.",
        "EntityImage": "E_Tecnologias"
    },
    {
        "ID": 16,
        "EntityName": "E_Trabajo",
        "EntityRoute": "Movil/RadioElectrico",
        "EntityDescription": "Entidad que representa atributos de un trabajo a realizar, nombre del proyecto, tipo de trabajo, planos.",
        "EntityImage": "E_Trabajo"
    },
    {
        "ID": 17,
        "EntityName": "E_Coordinacion",
        "EntityRoute": "Movil/SeguimientoMovilLogic",
        "EntityDescription": "Entidad que representa atributos de coordinación de un proyecto.",
        "EntityImage": "E_Coordinacion"
    },
    {
        "ID": 18,
        "EntityName": "E_EstadoSegui",
        "EntityRoute": "Movil/SeguimientoMovilLogic",
        "EntityDescription": "Representa el estado de seguimiento.",
        "EntityImage": "E_EstadoSegui"
    },
    {
        "ID": 19,
        "EntityName": "E_Seguimiento",
        "EntityRoute": "Movil/SeguimientoMovilLogic",
        "EntityDescription": "Representa conglomerado de atributos que permiten el seguimiento de proyectos, planos, coordinaciones.",
        "EntityImage": "E_Seguimiento"
    },
    {
        "ID": 20,
        "EntityName": "E_AccesoDocumentacion",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Entidad que representa el acceso a documentacion, requiere datos como solicitud de acceso, fecha solicitud, autoridad",
        "EntityImage": "E_AccesoDocumentacion"
    },
    {
        "ID": 21,
        "EntityName": "E_Emplazamiento",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Entidad que representar la ubicacion y caracteristicas de un proyecto constructivo. ",
        "EntityImage": "E_Emplazamiento"
    },
    {
        "ID": 22,
        "EntityName": "E_Estado",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Representa una coleccion de datos tipo Dictionary el cual esta definido por una key y su nombre",
        "EntityImage": "E_Estado"
    },
    {
        "ID": 23,
        "EntityName": "E_Festivos",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Entidad que representa atributos de una fecha festiva en el calendario.",
        "EntityImage": "E_Festivos"
    },
    {
        "ID": 24,
        "EntityName": "E_Rutas",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Entidad que establece atributos que tiene una ruta. ",
        "EntityImage": "E_Rutas"
    },
    {
        "ID": 25,
        "EntityName": "E_TiposDeAusencia",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Representa una coleccion de datos tipo Dictionary el cual esta definido por una key y su nombre",
        "EntityImage": "E_TiposDeAusencia"
    },
    {
        "ID": 26,
        "EntityName": "E_Visitas",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Entidad que representa atributos de visita a proyectos u obras.",
        "EntityImage": "E_Visitas"
    },
    {
        "ID": 27,
        "EntityName": "E_Albaran",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que representa atributos de albaran(acreditacion de recepcion de un pedido). ",
        "EntityImage": "E_Albaran"
    },
    {
        "ID": 28,
        "EntityName": "E_Almacen",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que representa atributos de un almacén.",
        "EntityImage": "E_Almacen"
    },
    {
        "ID": 29,
        "EntityName": "E_AprobacionesCompra",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Representa aprobaciones de una compra, la cual establece un estado y el usuario que aprueba la compra.",
        "EntityImage": "E_AprobacionesCompra"
    },
    {
        "ID": 30,
        "EntityName": "E_Aprobador",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que representa atributos de un usuario que aprueba una compra.",
        "EntityImage": "E_Aprobador"
    },
    {
        "ID": 31,
        "EntityName": "E_Compras",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que representa atributos de una compra (proveedor, almacen, aldebaran).",
        "EntityImage": "E_Compras"
    },
    {
        "ID": 32,
        "EntityName": "E_Producto",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que representa atributos de un producto (nombre, descripcion, unidad).",
        "EntityImage": "E_Producto"
    },
    {
        "ID": 33,
        "EntityName": "E_ProductoAlmacen",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que define atributos de relacion de un producto que se encuentra en un almacen.",
        "EntityImage": "E_ProductoAlmacen"
    },
    {
        "ID": 34,
        "EntityName": "E_ProductoAlmacenGrouped",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que define atributos de productos agrupados en almacenes.",
        "EntityImage": "E_ProductoAlmacenGrouped"
    },
    {
        "ID": 35,
        "EntityName": "E_ProductoNodo",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que define un nodo logistico, punto de almacenamineto o distribucion de productos.",
        "EntityImage": "E_ProductoNodo"
    },
    {
        "ID": 36,
        "EntityName": "E_ProductoStock",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que define atributos de un producto, acerca de stock disponible, informacion de almacen y proveedores",
        "EntityImage": ""
    },
    {
        "ID": 37,
        "EntityName": "E_Proveedor",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que representa atributos de un proveedor (suministro de productos).",
        "EntityImage": ""
    },
    {
        "ID": 38,
        "EntityName": "E_SolicitudCompra",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que establece atributos para realizar una solicitud de compra.",
        "EntityImage": ""
    },
    {
        "ID": 39,
        "EntityName": "E_ComentariosFibra",
        "EntityRoute": "RedFija/RedFijaData",
        "EntityDescription": "Entidad que establece atributos de un comentario(perfil, comentario, fecha).",
        "EntityImage": ""
    },
    {
        "ID": 40,
        "EntityName": "E_EstadoFibra",
        "EntityRoute": "RedFija/RedFijaData",
        "EntityDescription": "Entidad que establece atributos del estado de fibra(fecha, usuario, estado). ",
        "EntityImage": ""
    },
    {
        "ID": 41,
        "EntityName": "E_Localidades",
        "EntityRoute": "RedFija/RedFijaData",
        "EntityDescription": "Entidad que establece atributos de una localidad(provincia, zona).",
        "EntityImage": ""
    },
    {
        "ID": 42,
        "EntityName": "E_ProyectosRedFija",
        "EntityRoute": "RedFija/SeguimientoFibraLogic",
        "EntityDescription": "Entidad que establece atributos de entidades implicadas en el proyecto(proyecto, cliente)",
        "EntityImage": ""
    },
    {
        "ID": 43,
        "EntityName": "E_SeguimientoE2E",
        "EntityRoute": "RedFija/SeguimientoFibraLogic",
        "EntityDescription": "Entidad que establece atributos de un seguimiento (objetivos, fechas, instalaciones, licencias).",
        "EntityImage": ""
    },
    {
        "ID": 44,
        "EntityName": "E_SolicitudDiseñoF",
        "EntityRoute": "RedFija/SolicitudesDiseñoFibra",
        "EntityDescription": "Entidad que establece atributos de una solicitud de diseño(diseñador, tipotrabajo).",
        "EntityImage": ""
    },
    {
        "ID": 45,
        "EntityName": "E_AccesosFibra",
        "EntityRoute": "RedFija/VisitasFibra",
        "EntityDescription": "Entidad que representa un acceso de fibra (programacion, fecha  planificada).",
        "EntityImage": ""
    },
    {
        "ID": 46,
        "EntityName": "E_EmplazamientoFibra",
        "EntityRoute": "RedFija/VisitasFibra",
        "EntityDescription": "Entidad que representa una visita (ubicacion, latitudes, codigo postal.",
        "EntityImage": ""
    },
    {
        "ID": 47,
        "EntityName": "E_Aprobaciones",
        "EntityRoute": "RRHH/Contrataciones",
        "EntityDescription": "Entidad que establece atributos de una aprobacion de contratacion (retribucion, periodo prueba, incorporacion).",
        "EntityImage": ""
    },
    {
        "ID": 48,
        "EntityName": "E_DatosAprobacion",
        "EntityRoute": "RRHH/Contrataciones",
        "EntityDescription": "Entidad que establece atributos que permiten aprobar una contratacion (usuario aprobador, comentarios).",
        "EntityImage": ""
    },
    {
        "ID": 49,
        "EntityName": "E_Entrevistas",
        "EntityRoute": "RRHH/Contrataciones",
        "EntityDescription": "Entidad que establece atributos de una entrevista (entrevistado, entrevistador, comentarios).",
        "EntityImage": ""
    },
    {
        "ID": 50,
        "EntityName": "E_ProcesoSeleccion",
        "EntityRoute": "RRHH/Contrataciones",
        "EntityDescription": "Entidad que establece atributos de un proceso de seleccion (responsable del proceso, solicitante del puesto).",
        "EntityImage": ""
    },
    {
        "ID": 51,
        "EntityName": "E_UsuariosRRHH",
        "EntityRoute": "RRHH/Contrataciones",
        "EntityDescription": "Entidad que define datos del entrevistado (nombre, telefono, apellido, dni).",
        "EntityImage": ""
    },
    {
        "ID": 52,
        "EntityName": "E_DatosEvaluacion",
        "EntityRoute": "RRHH/EvaluacionDesempeno",
        "EntityDescription": "Entidad que define datos del trabajador (nombre, email, puesto, evaluador, email evaluador).",
        "EntityImage": ""
    },
    {
        "ID": 53,
        "EntityName": "E_EvaluacionDesempeno",
        "EntityRoute": "RRHH/EvaluacionDesempeno",
        "EntityDescription": "Entidad que define una evaluacion de desempeño que contiene (preguntas, aspectos destacables, puntos de mejora)",
        "EntityImage": ""
    },
    {
        "ID": 54,
        "EntityName": "E_Form",
        "EntityRoute": "RRHH/Forms",
        "EntityDescription": "Entidad que representa atributos de un form. (formulario, pie de pagina, respuesta)",
        "EntityImage": ""
    },
    {
        "ID": 55,
        "EntityName": "E_ResponsesForm",
        "EntityRoute": "RRHH/Forms",
        "EntityDescription": "Entidad que representa atributos de un response. (respuestas - preguntas y valores correctos).",
        "EntityImage": ""
    },
    {
        "ID": 56,
        "EntityName": "E_SavedForms",
        "EntityRoute": "RRHH/Forms",
        "EntityDescription": "Entidad que representa atributos de savedForms(formulario guardado - preguntas, valores, min - max).",
        "EntityImage": ""
    },

    {
        "ID": 57,
        "EntityName": "E_Comentarios",
        "EntityRoute": "BaseData/Request",
        "EntityDescription": "Entidad que representa atributos de un comentario. (id, nombre, perfil)",
        "EntityImage": ""
    },
    {
        "ID": 58,
        "EntityName": "E_ErrorServices",
        "EntityRoute": "RRHH/Forms",
        "EntityDescription": "Entidad que representa un error. Este permite mostrar informacion del error como: mensaje, usuario, idusuario, accion ejecutada.",
        "EntityImage": ""
    },
    {
        "ID": 59,
        "EntityName": "E_Role",
        "EntityRoute": "RRHH/Forms",
        "EntityDescription": "Entidad que representa atributos de un rol. (nombre, seleccionado, claims)",
        "EntityImage": ""
    },
    {
        "ID": 60,
        "EntityName": "E_User",
        "EntityRoute": "RRHH/Forms",
        "EntityDescription": "Representa atributos de un usuario, como por ejemplo nombre, usuario, telefono, email, pais. ",
        "EntityImage": ""
    }
]

//Variables para la paginación
let currentPage = 1;
const itemsPerPage = 10;
let filteredData = [...jsonData];

// Función para mostrar las aplicaciones con paginación
function displayApps(page = 1) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    let cards = '';

    if (paginatedData.length === 0) {
        cards = `
                <div class="no-results">
                    <i class="fa-solid fa-search"></i>
                    <p>No se encontraron aplicaciones que coincidan con la búsqueda.</p>
                    <p>Intenta con otros términos o revisa la ortografía.</p>
                </div>
            `;
    } else {
        paginatedData.forEach(app => {
            cards += `
                    <div class="app-card">
                        <div class="app-image-container">
                            <img src="${app.EntityImage}" alt="${app.EntityName}" class="app-image">
                        </div>
                        <div class="app-content">
                            <h2 class="app-title"><i class="fa-solid fa-cube"></i> ${app.EntityName}</h2>
                            <p class="app-description">${app.EntityDescription}</p>
                            <div class="app-route"><i class="fa-solid fa-link"></i> Ruta: ${app.EntityRoute}</div>
                            <div class="app-meta">
                                <span class="app-meta-item"><i class="fa-solid fa-hashtag"></i> ID: ${app.ID}</span>
                                <span class="app-meta-item"><i class="fa-solid fa-code-branch"></i> Versión: 1.0</span>
                                <span class="app-meta-item"><i class="fa-solid fa-calendar-check"></i> Última actualización: 2025-04-20</span>
                            </div>
                        </div>
                    </div>
                `;
        });
    }

    document.getElementById('app-container').innerHTML = cards;

    // Actualizar paginación
    updatePagination();
}

// Función para actualizar los botones de paginación
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    let paginationHTML = '';

    if (totalPages > 1) {
        paginationHTML += `<button class="pagination-button" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})"><i class="fa-solid fa-chevron-left"></i></button>`;

        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<button class="pagination-button ${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        }

        paginationHTML += `<button class="pagination-button" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})"><i class="fa-solid fa-chevron-right"></i></button>`;
    }

    document.getElementById('pagination').innerHTML = paginationHTML;
}

function changePage(page) {
    if (page < 1 || page > Math.ceil(filteredData.length / itemsPerPage)) return;

    currentPage = page;
    displayApps(currentPage);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ✅ Función de búsqueda usando propiedades correctas
function searchApps() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();

    filteredData = data.filter(app =>
        app.EntityName.toLowerCase().includes(searchTerm) ||
        app.EntityDescription.toLowerCase().includes(searchTerm) ||
        app.EntityRoute.toLowerCase().includes(searchTerm)
    );

    currentPage = 1;
    displayApps();
}

// Inicializar
window.onload = function () {
    displayApps();
};

// Menú lateral
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}