const data = [
    {
        "ID": 1,
        "EntityName": "E_BugRequest",
        "EntityRoute": "General/BugTracker",
        "EntityDescription": "Entidad que representa una peticion de registro de Bug. Es utilizado en diferentes funciones, las cuales son:  Add/AddBug, Edit/EditBug,  GetPaginated/GetPaginatedBug. Asimismo, se encuentra en vistas Razor como BugTracker/BugTracker.",
        "EntityImage": `
        public enum BugStatus
        {
            Solved, Stand_by, Cancelled
        }

        [BsonIgnoreExtraElements]
        public class E_BugRequest:AuditableEntity<string>
        {
            public string Title { get; set; }
            public string Bug { get; set; }
            public string FinishedComment { get; set; }
            public string ProfilePic { get; set; }
            public string EmailSender { get; set; }
            public BugStatus Solved { get; set; }

            public string GetBugStatus => Solved.ToString().Replace("_", " ");
        }

        public class FilteredBugRequest:FiltersBase
        {
            public List<BugStatus> Status { get; set; } = new List<BugStatus>();
        }
        `
    },
    {
        "ID": 2,
        "EntityName": "E_ArchivoCoche",
        "EntityRoute": "General/GestionCoches",
        "EntityDescription": "Entidad que representa peticion de guardado de archivos adjuntos de registro de un coche. Es utilizado como un List(List<E_ArchivoCoche>) en entidades como GestionCoches/E_Coches, GestionCoches/E_SolicitudCoche.",
        "EntityImage": `
        namespace GestionCoches.Entities {
            public class E_ArchivoCoche

            {
                [BsonIgnore]
                public string Base64Data { get; set; }
                public string Nombre { get; set; }
            }
        }
        ` 
    },
    {
        "ID": 3,
        "EntityName": "E_Coches",
        "EntityRoute": "General/GestionCoches",
        "EntityDescription": "Entidad que representa atributos de un coche. Es utilizado en funciones como: HelpersCoche/AsignarCoche, Add/AddCoche, Edit/EditCoche, GetOne/GetOneCoche, GetPaginated/GetPaginatedCoche. Asimismo es usado en vistas Razor como Modals/AddEditCoche, Modals/AddEditSolicitud, StockCoches/StockCoches.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        [TypeConverter(typeof(E_CochesConverter))]

        public class E_Coches : AuditableEntity<string>
        {
            public string Marca { get; set; }
            public string Modelo { get; set; }
            public E_Delegacion Delegacion { get; set; } = new();
            public string Oficina { get; set; }
            public bool SOLRED { get; set; }
            public int Kilometraje { get; set; }
            public string KmsContratados { get; set; }
            public string Conductores { get; set; }
            public string MatriculaFlota { get; set; }
            public string Empresa { get; set; }
            public DateTime? FechaInicioContrato { get; set; }
            public DateTime? FechaFinContrato { get; set; }
            public List<E_Comentarios> Comentarios { get; set; } = new();
            public string Estado { get; set; }
            public string TipoAlquiler { get; set; }
            public string Revisiones { get; set; }
            public string Cambios { get; set; }
            public string ProximaRevision { get; set; }
            public string DuracionContrato { get; set; }
            public List<E_ArchivoCoche> Archivos { get; set; } = new();
            public int Index { get; set; }

        }
        `
    },
    {
        "ID": 4,
        "EntityName": "E_Delegacion",
        "EntityRoute": "General/GestionCoches",
        "EntityDescription": "Representa una coleccion de datos tipo Dictionary el cual esta definido por una key y su nombre. Es utilizado en funciones como Add/AddDelegaciones. Asimismo, es utilizado en vistas como Modals/AddEditCoche, Modals/AddEditSolicitud.",
        "EntityImage": `
        namespace GestionCoches.Entities;
        [BsonIgnoreExtraElements]

        [TypeConverter(typeof(E_DelegacionConverter))]
        public class E_Delegacion : AuditableEntity<string>
        {
            public int Index { get; set; }
            public string Nombre { get; set; }
        }
        `
    },
    {
        "ID": 5,
        "EntityName": "E_SolicitudCoche",
        "EntityRoute": "General/GestionCoches",
        "EntityDescription": "Entidad que representa una solicitud de coche. Es utilizado en funciones como: HelpersCoche/CerrarSolicitudAsync, Add/AddSolicitudCoche, Edit/EditSolicitudCoche, GetOne/GetOneSolicitudCoche, GetPaginated/GetPaginatedSolicitudCoche. Asimismo es utilizado en vistas Razor como index (principalmente objetos usados en funciones modales), Modals/AddEditCoche, Modals/AddEditSolicitud, Modals/CerrarSolicitud. ",
        "EntityImage": `
        namespace GestionCochesLogic;
        [BsonIgnoreExtraElements]

        public class E_SolicitudCoche : AuditableEntity<string>
        {
            public int Index { get; set; }
            public E_Coches Coche { get; set; } = new();
            public E_Delegacion Delegacion { get; set; } = new();
            public E_User Conductor { get; set; }
            public List<E_ArchivoCoche> Archivos { get; set; } = new();
            public DateTime? FechaInicio { get; set; }
            public DateTime? FechaDevolucionAproximada { get; set; }
            public DateTime? FechaDevolucion { get; set; }
            public int? KmIniciales { get; set; }
            public int? KilometrosAprox {  get; set; }
            public int? KmFinales { get; set; }
            public string Estacionamiento { get; set; }
            public string Itinerario { get; set;}
            public List<E_Comentarios> Comentarios { get; set; } = new();
            public E_Coches CocheAsignado { get; set; } = new();
            public EstadoSolicitud EstadoSolicitud { get; set; }
            public byte[] KmImage { get; set; }
        }

        public class DataCoche
        {
            public List<E_User> Conductor { get; set; } = new();
        }
        public enum EstadoSolicitud
        {
            Activa,
            Cerrada
        }
        `
    },
    {
        "ID": 6,
        "EntityName": "E_ArchivoIncidencia",
        "EntityRoute": "General/SoporteLogic",
        "EntityDescription": "Entidad que representa el guardado de archivos adjuntos de una incidencia. Es utilizado como un List(List<E_ArchivoIncidencia>) en entidades como E_Incidencia.",
        "EntityImage": `
        public class E_ArchivoIncidencia
        {
            [BsonIgnore]
            public string Base64Data { get; set; }
            public string Nombre { get; set; }
        }
        `
    },
    {
        "ID": 7,
        "EntityName": "E_Estado",
        "EntityRoute": "General/SoporteLogic",
        "EntityDescription": "Entidad que define una serie de atributos para realizar una auditoria del usuario y el estado de una incidencia. Es utilizado como un List(List<E_Estado>) para el manejo de estados. Es usado tambien en funciones como: Export/CalcularTiempoTotal, Export/ObtenerHoraPrimeraVezIniciado, Export/CalcularTiempoEnEstadoInicial. Asimismo es usado en vistas Razor como: Soporte/Modals/AddEditIncidencia.",
        "EntityImage": `
        namespace SoporteLogic
        {
            public class E_Estado
            {
                public DateTime Fecha { get; set; }
                public EditUserDTORequest? UserAsignado { get; set; }
                public string Estado { get; set; }
                public DateTime? FechaFin { get; set; }
            
            }
        }
        `
    },
    {
        "ID": 8,
        "EntityName": "E_Incidencia",
        "EntityRoute": "General/SoporteLogic",
        "EntityDescription": "Entidad que representa las caracteristicas de una incidencia. Es utilizado en funciones como Add/AddSoporte, Dashboard/DashboardSoporte, Dashboard/TimeAtendiendo, Dashboard/TimeDetenido, Dashboard/TimeHastaInicio, Edit/EditSoporte, Export/ExportSoporte, GetOne/GetOneSoporte, GetPaginated/GetPaginatedSoporte. Asimismo, es manejado para instanciar objetos en vistas razor como: Index, Modals/AddEditIncidencia.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Incidencia : AuditableEntity<string>
        {

            public EditUserDTORequest User { get; set; }
            public EditUserDTORequest? AsignadoA { get; set; }
            public bool Escalada { get; set; }
            public bool AutorizacionEscalada { get; set; }
            public List<E_ArchivoIncidencia> Archivos { get; set; } = new();
            public string Tipo { get; set; }
            public string Asunto { get; set; }
            public string Pais { get; set; }
            public string IdTeamViewer { get; set; }
            public string PassTeamViewer { get; set; }
            public string Descripción { get; set; }
            public string Gravedad { get; set; }
            public string TipoIncidencia { get; set; } // Sistemas o microinformatica
            public int Index { get; set; }
            public List<E_Estado> Estados { get; set; } = new();
            public List<E_Comentarios> Comentarios { get; set; } = new();
        }
        `
    },
    {
        "ID": 9,
        "EntityName": "E_SolicitudDelineacion",
        "EntityRoute": "Movil/DelineacionLogic",
        "EntityDescription": "Entidad que define atributos de una solicitud de delineacion (delimitacion de terreno).Es utilizado como un List(List<E_SolicitudDelineacion>) en otras entidades (E_Seguimiento). Es utilizado en funciones como: Helpers/AsignarSolicitud, Migrate/MigrateData, Solicitud/Add/AddSolicitudDelineacion, Solicitud/Edit/EditSolicitudDelineacion, Solicitud/Delete/DeleteSolicitudDelineacion,  Export/ExportDelineacionMovil, FinJornada/SetFinJornadaDelineacion, GetOne/GetOneSolicitudDelineacion, GetPaginated/GetPaginatedSolicitudDelineacion, GetOne/GetOneSeguimientoMovil, GetPaginated/GetPaginatedSeguimientoMovil. Asimismo, es manejado en vistas razor como: Modals/AddEditSolicitudModal, Modals/AddModificacionDelineacion, Delineacion/TableSolicitud, SeguimientoMovil/HitoFotomontaje, SeguimientoMovil/HitoPlanoAsBuilt, SeguimientoMovil/HitoPlanoCosntructivo, SeguimientoMovil/HitoPlanoM2CAP, SeguimientoMovil/HitoPlanoPLL, SeguimientoMovil/Modals/AddEditProyecto. ",
        "EntityImage": `
        namespace DelineacionLogic;
        [BsonIgnoreExtraElements]
        public class E_SolicitudDelineacion : AuditableEntity<string>
        {
            public string IdSeguimientoMovil { get; set; }
            public string IdParentSolicitud { get; set; }
            public E_Proyecto? Proyecto { get; set; }
            public string Subproyecto { get; set; }
            public string TipoTrabajo { get; set; }
            public string Nombre { get; set; }
            public E_User IngenieroAsignado { get; set; } = new();
            public E_User DelineanteAsignado { get; set; }
            public string Propietario { get; set; }
            public bool PerteneceARepDominicana { get; set; }
            public bool PerteneceAPeru { get; set; }
            public string Codigo1 { get; set; }
            public string Codigo2 { get; set; }
            public DateTime? FechaObjetivo { get; set; }
            public string RutaArchivos { get; set; }
            public string RutaFinalizado { get; set; }
            public List<E_Estado> Estados { get; set; } = new()
            {
                new()
                {
                    Estado="Sin asignación",
                    Fecha=DateTime.Now,
                    UsuarioAsignado= null
                }
            };
            public List<E_Comentarios> Comentarios { get; set; } = new();

            //Only for migration purposes, don´t use it in new versions
            public Dictionary<string, string> Modificaciones { get; set; } = new();

            // propiedades nuevas para la bidirecccionalidad con segumiento

            public string DelineanteExt { get; set; }
            public DateTime? FechaPlanificacion { get; set; }
            public DateTime? FechaHito { get; set; }
            public DateTime? FechaAprobacion { get; set; }
            public DateTime? FechaRechazo { get; set; }
            public bool Facturable { get; set; } = false;
            public bool SubirDocs { get; set; }
            public DateTime? FechaSubidaDocs { get; set; }
        }
        `
    },
    {
        "ID": 10,
        "EntityName": "E_Localidades",
        "EntityRoute": "Movil/MovilData",
        "EntityDescription": "Entidad que establece atributos de medicion y ubicacion de una localidad. Es utilizado como un tipo de atributo (public E_Localidades Localidad) en entidades como E_Seguimiento, E_Emplazamientos. Asimismo es utilizado en funciones como GetPaginated/GetPaginatedLocalidades.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Localidades : AuditableEntity<string>
        {

            public string CAutonoma { get; set; }
            public string Provincia { get; set; }
            public string Localidad { get; set; }
            public string Zona { get; set; }
            public double Latitud { get; set; }
            public double Longitud { get; set; }

        }
        `
    },
    {
        "ID": 11,
        "EntityName": "E_Modulo",
        "EntityRoute": "Movil/MovilData",
        "EntityDescription": "Entidad que representa una coleccion de datos tipo Dictionary el cual esta definido por una key y su nombre. Es utilizado como un tipo de dato(public E_Modulo Modulo) en entidades como E_Visitas.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Modulo : AuditableEntity<string>
        {
            public int Index { get; set; }
            public string Nombre { get; set; }
        }
        `
    },
    {
        "ID": 12,
        "EntityName": "E_Operador",
        "EntityRoute": "Movil/MovilData",
        "EntityDescription": "Entidad que representa una coleccion de datos tipo Dictionary el cual esta definido por una key y su nombre. Es utilizado como un tipo de dato(public E_Operador operador) en entidades como E_OperadorEmplazamiento, E_Visitas. Tambien es definido como List(List<E_Operador) en la entidad BaseDataDTO. Es utilizado en funciones como: BaseData/BaseDataVisitas.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Operador : AuditableEntity<string>
        {
            public int Index { get; set; }
            public string Nombre { get; set; }
        }
        `
    },
    {
        "ID": 13,
        "EntityName": "E_OperadorEmplazamiento",
        "EntityRoute": "Movil/MovilData",
        "EntityDescription": "Entidad que representa relación entre operador y emplazamiento (caracteristica de un proyecto de construccion). Es utilizado como List(List<E_OperadorEmplazamiento>). Asimismo es usado como objeto en vistas razor como Emplazamientos/AddEmplazamientos.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_OperadorEmplazamiento : AuditableEntity<string>
        {

            public string Codigo { get; set; }
            public E_Operador Operador { get; set; }

        }
        `
    },
    {
        "ID": 14,
        "EntityName": "E_Propietarios",
        "EntityRoute": "Movil/MovilData",
        "EntityDescription": "Entidad que representa una coleccion de datos tipo Dictionary el cual esta definido por una key y su nombre. Es utilizado como un tipo de dato(public E_Propietarios) en entidades como E_Emplazamientos, E_Visitas y listas (List<E_Propietarios>) con entidades como BaseDataDTO. Es utilizada en funciones como BaseData/BaseDataVisitas, MassiveUpload/MassiveUploadEmplazamientos. Asimismo se encuentra en vistas razor como Visitas/AddVisitasPage.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Propietarios : AuditableEntity<string>
        {
            public int Index { get; set; }
            public string Nombre { get; set; }
        }
        `
    },
    {
        "ID": 15,
        "EntityName": "E_Proyecto",
        "EntityRoute": "Movil/MovilData",
        "EntityDescription": "Entidad que representa las caracteristicas de un proyecto. Es utilizado tipo de datos(public E_Proyecto) por entidades como: E_SolicitudDelineacion, E_Trabajo, E_Seguimiento, E_Visitas y lista(List<E_Proyecto>) en entidades como BaseDataDTO. Esta presente como objeto en funciones como MigrateData/Migrate, ImportDataFromExcel/Import, GetOne/GetOneSeguimientoMovil, BaseData/BaseDataVisitas. Es utilizado como objeto en vistas razor como Modals/AddEditSolicitudModal, Modals/TableSolicitud, RadioElectrico/Modals/AddEditTrabajoModal, RadioElectrico/TableTrabajo, SeguimientoMovil/HitoCalculoPLL, SeguimientoMovil/HitoFotomontaje, SeguimientoMovil/HitoMemRadioElectrico, SeguimientoMovil/HitoPlanoAsBuilt, SeguimientoMovil/HitoPlanoCosntructivo, SeguimientoMovil/HitoPlanoM2CAP,  SeguimientoMovil/HitoPLL, SeguimientoMovil/HitoPuestaServicio, SeguimientoMovil/Index, SeguimientoMovil/InfoHito, Modals/AddEditProyecto, Modals/AddObra, Modals/ModifyViewProyecto, SeguimientoMovil/SeguimientoProyecto, SeguimientoMovil/SeguimientoProyecto2.0. ",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Proyecto : AuditableEntity<string>
        {

            public int index { get; set; }
            public string cliente { get; set; }
            public string nombre { get; set; }
            public List<string> subproyectos { get; set; }
            public List<string> HitosProyecto { get; set; }
        }
        `
    },
    {
        "ID": 16,
        "EntityName": "E_Estado",
        "EntityRoute": "Movil/RadioElectrico",
        "EntityDescription": "Representa un estado, usuario y fecha. Es utilizado en tipo de datos (public List<E_Estado>) en entidades como E_Trabajo.",
        "EntityImage": `
        namespace RadioelectricoLogic;
        public class E_Estado
        {
            public DateTime Fecha { get; set; }
            public E_User UsuarioAsignado { get; set; } = new();
            public string Estado { get; set; }

        }
        `
    },
    {
        "ID": 17,
        "EntityName": "E_Tecnologias",
        "EntityRoute": "Movil/RadioElectrico",
        "EntityDescription": "Entidad que representa atributos de tecnologia, abreviaturas, codigo de operadores. Es utilizado como List(List<>) en entidades como: trabajo. Asimismo en usado en funciones como ImportDataFromExcel/Import. Asimismo es usado para instanciar objetos en vistas razor como: Modals/AddEditTrabajoModal, Modals/TableTrabajo. ",
        "EntityImage": `
        public class E_Tecnologias : AuditableEntity<string>
        {
            public string Nombre { get; set; }
            public string CodigoOperador1 { get; set; }
            public string CodigoOperador2 { get; set; }
            public string Abreviatura1 { get; set; }
            public string Abreviatura2 { get; set; }
            public int Index { get; set; }
        }
        `
    },
    {
        "ID": 18,
        "EntityName": "E_Trabajo",
        "EntityRoute": "Movil/RadioElectrico",
        "EntityDescription": "Entidad que representa atributos de un trabajo a realizar, nombre del proyecto, tipo de trabajo, planos. Es utilizado como List(List<E_Trabajo>). Es usado en funciones como: Logic/Add/AddTrabajoRadio, Logic/Delete/DeleteRadioElectrico, Logic/Edit/EditTrabajo, Logic/Export/ExportRadioElectrico, Logic/GetOne/GetOneTrabajoRadio, Logic/GetPaginated/GetPaginatedTrabajaRadio, Logic/ImportDataFromExcel/Import, Logic/GetOne/GetOneSeguimientoMovil, Logic/GetPaginated/GetPaginatedSeguimientoMovil. Es instanciado como objeto para el manejo de informacion en vistas razor como: RadioElectrico/Modals/AddEditTrabajoModal, RadioElectrico/TableTrabajo, SeguimientoMovil/HitoCalculoPLL, SeguimientoMovil/HitoMemRadioElectrico, SeguimientoMovil/HitoPuestaServicio, SeguimientoMovil/Modals/AddEditProyecto.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Trabajo : AuditableEntity<string>
        {
            public string IdSeguimientoMovil { get; set; }
            public E_Proyecto Proyecto { get; set; }
            public string Subproyecto { get; set; }
            public string TipoTrabajo { get; set; }
            public List<E_Tecnologias> Tecnologias1 { get; set; } = new();
            public List<E_Tecnologias> Tecnologias2 { get; set; } = new();
            public E_User IngenieroAsignado { get; set; }
            public bool VisitaRealizada { get; set; }
            public string UsuarioVisita { get; set; }
            public DateTime? FechaVisita { get; set; }
            public bool PlanoRealizado { get; set; }
            public string UsuarioPlano { get; set; }
            public DateTime? FechaPlano { get; set; }
            public string Codigo1Operador1 { get; set; }
            public string Codigo2Operador1 { get; set; }
            public string Codigo1Operador2 { get; set; }
            public string Codigo2Operador2 { get; set; }
            public DateTime FechaObjetivo { get; set; }
            public string RutaArchivos { get; set; }
            public List<E_Estado> Estados { get; set; } = new()
            {
                new()
                {
                    Fecha=DateTime.Now,
                    UsuarioAsignado=new(),
                    Estado = "Sin asignación"
                }
            };
            public List<E_Comentarios> Comentarios { get; set; } = new();

            // propiedades nuevas para la bidirecccionalidad con segumiento

            public string IngenieroteExt { get; set; }
            public DateTime? FechaPlanificacion { get; set; }
            public DateTime? FechaHito { get; set; }
            public DateTime? FechaAprobacion { get; set; }
            public DateTime? FechaRechazo { get; set; }
            public bool Facturable { get; set; } = false;
            public bool SubirDocs { get; set; }
            public DateTime? FechaSubidaDocs { get; set; }
        }
        `
    },
    {
        "ID": 19,
        "EntityName": "E_Coordinacion",
        "EntityRoute": "Movil/SeguimientoMovilLogic",
        "EntityDescription": "Entidad que representa atributos de coordinación de un proyecto. Es utilizado como tipo de dato (public E_Coordinacion) en la entidad E_Seguimiento.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Coordinacion
        {
        public E_User Coordinador { get; set; }

            public E_User CoordinadorSuplente { get; set; }
            public string EstadoTelxius { get; set; }
            public DateTime? FechaEnvioNombramiento { get; set; }
            public DateTime? FechaRecepcionNombramiento { get; set; }
            //columnas moradas en el excel
            public DateTime? FechaREcepcionPSS { get; set; }
            //columnas amarillas en el excel (repetibles)
            public DateTime? Fecha1RevPrincipal { get; set; }
            public DateTime? FechaEnviadasCorrecionesPSS { get; set; }

            public DateTime? FechaRecibidasCorrecionesPSS { get; set; }
            public DateTime? FechaAprobacionPSS { get; set; }
            //columna naranja
            public DateTime? FechaComunicacionAperturaCentroTrabajo { get; set; }
            public DateTime? FechahabilitadoLibroSub {  get; set; }
            public DateTime? FechasActasAdhesionPSS { get; set; }
            public DateTime? FechaListadoTrabajadores {  get; set; } //duda de si el dato debe ser string o fecha
            public DateTime? FechaNombramientoRecursoPreventivo {  get; set; }
            //fin de columnas moradas
            public DateTime FechaVisadoDocumentacion {  get; set; }
            public DateTime? FechaInicioTrabajoCSS { get; set; }
            public DateTime? FechaInicioObra {  get; set; }
            public DateTime? FechaVisitaCSS1 { get; set; }
            public string ClasificacionVisita1CSS { get; set; }
            public DateTime? FechaVisitaCSS2 { get; set; } //AF del excel

            // Booleanos para los checkbox
            public bool InfoGeneral { get; set; }
        }
        `
    },
    {
        "ID": 20,
        "EntityName": "E_EstadoSegui",
        "EntityRoute": "Movil/SeguimientoMovilLogic",
        "EntityDescription": "Representa el estado de seguimiento. Es utilizado como tipo de dato (public E_EstadoSegui) en la entidad E_Seguimiento.",
        "EntityImage": `
        public class E_EstadoSegui
        {
            public DateTime Fecha { get; set; }
            public E_User UsuarioAsignado { get; set; } = new();
            public string Estado { get; set; }
        }
        `
    },
    {
        "ID": 21,
        "EntityName": "E_Seguimiento",
        "EntityRoute": "Movil/SeguimientoMovilLogic",
        "EntityDescription": "Representa conglomerado de atributos que permiten el seguimiento de proyectos, planos, coordinaciones. Esta entidad es usada en diferentes funciones como: SeguimientoMovilLogic/Logic/Add/AddSeguimientoMovil, SeguimientoMovilLogic/Logic/Add/NormalizeData, SeguimientoMovilLogic/Logic/Edit/EditSeguimientoMovil, SeguimientoMovilLogic/Logic/Export/ExportSeguimientoObras, SeguimientoMovilLogic/Logic/GetOne/GetOneSeguimientoMovil, SeguimientoMovilLogic/Logic/GetOne/GetOneSeguimientoByCodigo1, SeguimientoMovilLogic/Logic/GetOne/GetSeguimientoByProyectoId, SeguimientoMovilLogic/Logic/GetPaginated/GetPaginatedSeguimientoMovil, SeguimientoMovilLogic/Logic/PredicateFindAllExcel/Filter, SeguimientoMovilLogic/Logic/PredicateFindAllExcel/PredicateFilterBoolean. De igual manera estos son consumidos en vistas razor: Delineacion/Modals/AddEditSolicitudModal, RadioElectrico/Modals/AddEditTrabajoModal, SeguimientoMovil/EditObra, SeguimientoMovil/Helpers/TarjetaInformacion, SeguimientoMovil/HitoActaRecepcionObra, SeguimientoMovil/HitoActaReplanteo, SeguimientoMovil/HitoAYTO, SeguimientoMovil/HitoBoletinElectrico, SeguimientoMovil/HitoCalculoPLL, SeguimientoMovil/HitoCertTratamientoResiduos, SeguimientoMovil/HitoCFO, SeguimientoMovil/HitoCoordinacion, SeguimientoMovil/HitoCVE, SeguimientoMovil/HitoCVETorre, SeguimientoMovil/HitoDF, SeguimientoMovil/HitoDocsCoordinacion, SeguimientoMovil/HitoFotomontaje, SeguimientoMovil/HitoFotoTexto, SeguimientoMovil/HitoInformeAsBuilt, SeguimientoMovil/HitoMemRadioElectrico, SeguimientoMovil/HitoPlanoAsBuilt, SeguimientoMovil/HitoCosntructivo, SeguimientoMovil/HitoPlanoM2CAP, SeguimientoMovil/HitoPlanoPLL, SeguimientoMovil/HitoPPI, SeguimientoMovil/HitoProyecto, SeguimientoMovil/HitoPTP, SeguimientoMovil/HitoPuestaServicio, SeguimientoMovil/HitoReplanteoLOS, SeguimientoMovil/InfoHito, SeguimientoMovil/Modals/AddEditActaRecepcion, SeguimientoMovil/Modals/AddEditActaReplanteo, SeguimientoMovil/Modals/AddEditAYTO, SeguimientoMovil/Modals/AddEditBoletin, SeguimientoMovil/Modals/AddEditCalculo, SeguimientoMovil/Modals/AddEditCertResiduos, SeguimientoMovil/Modals/AddEditCFO, SeguimientoMovil/Modals/AddEditCoordinacion, SeguimientoMovil/Modals/AddEditCVE, SeguimientoMovil/Modals/AddEditCVETorre, SeguimientoMovil/Modals/AddEditDF, SeguimientoMovil/Modals/AddEditDocCoordinacion, SeguimientoMovil/Modals/AddEditFoto, SeguimientoMovil/Modals/AddEditInfo, SeguimientoMovil/Modals/AddEditInformeAsBuilt",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Seguimiento : AuditableEntity<string>
        {
            public string Ceco { get; set; }

            public E_User Creador { get; set; } 
            public E_Proyecto Proyecto { get; set; }
            public string Codigo1 { get; set; }
            public string Codigo2 { get; set; }
            public string CodigoOtros { get; set; }
            public string Nombre { get; set; }
            public E_Localidades Municipio { get; set; }
            public string Subproyecto { get; set; }
            public string CodigoLPS { get; set; }
            public string Contrata { get; set; }
            public string Zona { get; set; }
            public string Propietario { get; set; }
            public DateTime FechaAsignacionCliente { get; set; }
            public string TecnicoCliente { get; set; }
            public List<DataActaReplanteo> DataActaReplanteos { get; set; } = new ();
            public List<DataPlano> DataPlanos { get; set; } = new();
            public List<DataCVE> DataCVEs { get; set; } = new();
            public List<DataCalculoPLL> DataCalculoPLLs { get; set; } = new();
            public List<DataPlanoPLL> DataPlanoPLLs { get; set; } = new();
            public List<DataMemoriaRadioelectrico> DataMemoriaRadioelectricos { get; set; } = new();
            public List<DataFotomontaje> DataFotomontajes { get; set; } = new();
            public List<DataProyecto> DataProyectos { get; set; } = new();
            public List<DataPlanoConstructivo> DataPlanoConstructivos { get; set; } = new();
            public List<DataCoordinacion> DataCoordinacions { get; set; } = new();
            public List<DataLegalizacionAYTO> DataLegalizacionAYTOs { get; set; } = new();
            public List<DataDF> DataDFs { get; set; } = new();
            public List<DataPuestaEnServicio> DataPuestaEnServicios { get; set; } = new();
            public List<DataCFO> DataCFOs { get; set; } = new();
            public List<DataASBuilt> DataASBuilts { get; set; } = new();
            public List<DataPlanoASBuilt> DataPlanoASBuilts { get; set; } = new();
            public DataPedido DataPedido { get; set; } = new();
            public List<DataPlanoM2CAP> DataPlanoM2CAPs { get; set; } = new();

            public List<DataCVETorre> DataCVEsTorre { get; set; } = new();
            public List<DataFotoTexto> DataFotosTexto { get; set; } = new();
            public List<DataInformeAsBuilt> DataInformesAsBuilt { get; set; } = new();
            public List<DataPPI> DataPPIs { get; set; } = new();
            public List<DataActaRecepcionObra> DataRecepcionObras { get; set; } = new();
            public List<DataPTP> DataPTPs { get; set; } = new();
            public List<DataBoletinElectrico> DataBoletinElectricos { get; set; } = new();
            public List<DataReplanteoLOS> DataReplanteosLOS { get; set; } = new();
            public List<DataCertResiduos> DataCertsResiduos { get; set; } = new();
            public List<DataDocCoordinacion> DataDoscsCoordinacion { get; set; } = new();
            
            public E_Coordinacion Coordinacion { get; set; } = new();

            public List<E_Comentarios> Comentarios { get; set; } = new();
            public List<E_EstadoSegui> Estado { get; set; } = new()
            {
                new()
                {
                    Estado="Sin estado",
                    Fecha=DateTime.Now,
                    UsuarioAsignado= null
                }
            };
            public string EstadoSeleccionado { get; set; }  // Esta propiedad almacenará el valor del estado seleccionado

            [BsonIgnore]
            public List<E_Visitas> Visitas { get; set; } = new();
            public List<E_SolicitudDelineacion> SolicitudPlanos { get; set; } = new();
            public List<E_Trabajo> SolicitudRadio {  get; set; } = new();


            //public List<> Radioelectricos { get; set; } = new();
            public bool AplicaActaReplanteo { get; set; } = true;
            public bool AplicaCalculoPLL { get; set; } = true;
            public bool AplicaCFO { get; set; } = true;
            public bool AplicaCoordinacion { get; set; } = true;
            public bool AplicaCVE { get; set; } = true;
            public bool AplicaDF { get; set; } = true;
            public bool AplicaFotomontaje { get; set; } = true;
            public bool AplicaLegalizacionAYTO { get; set; } = true;
            public bool AplicaMemoriaRadioelectrico { get; set; } = true;
            public bool AplicaPlanoASBuilt { get; set; } = true;
            public bool AplicaPlanoConstructivo { get; set; } = true;
            public bool AplicaPlanoM2CAP { get; set; } = true;
            public bool AplicaPlanoPLL { get; set; } = true;
            public bool AplicaProyecto { get; set; } = true;
            public bool AplicaPuestaEnServicio { get; set; } = true;


            // aplicas de visitas e hitos nuevos
            public bool AplicaVisitaReplanteo { get; set; } = true;
            public bool AplicaVisitaMastil { get; set; } = true;
            public bool AplicaVisitaTorre { get; set; } = true;
            public bool AplicaCVETorre { get; set; } = true;
            public bool AplicaVisitaDF { get; set; } = true;
            public bool AplicaFotoTexto { get; set; } = true;
            public bool AplicaVisitaEMF { get; set; } = true;
            public bool AplicaVisitaPS { get; set; } = true;
            public bool AplicaVisitaAsbuilt { get; set; } = true;
            public bool AplicaInformeAsBuilt { get; set; } = true;
            public bool AplicaPPI { get; set; } = true;
            public bool AplicaRecepcionObra { get; set; } = true;
            public bool AplicaPTP { get; set; } = true;
            public bool AplicaBoletinElectrico { get; set; } = true;
            public bool AplicaVisitaCSS { get; set; } = true;
            public bool AplicaDocCoordinacion { get; set; } = true;
            public bool AplicaReplanteoLOS { get; set; } = true;
            public bool AplicaVisitaLOS { get; set; } = true;
            public bool AplicaCertResiduos { get; set; } = true;
        }
        `
    },
    {
        "ID": 22,
        "EntityName": "E_AccesoDocumentacion",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Entidad que representa el acceso a documentacion, requiere datos como solicitud de acceso, fecha solicitud, autoridad. Esta entidad es usada como un tipo de dato (public E_AccesoDocumentacion) por la entidad E_Visitas",
        "EntityImage": `
        public class E_AccesoDocumentacion
        {
            public bool SolicitarAcceso { get; set; }
            public DateTime? FechaSolicitado { get; set; }
            public string Autorizado { get; set; }
            public string ResponsableCliente { get; set; }
            public string CodigoJIRA { get; set; }
            public string Contratista { get; set; }
            public DateTime? FechaReclamado { get; set; }
            public DateTime? FechaInicioAutorizado { get; set; }
            public DateTime? FechaFinAutorizado { get; set; }
            public List<E_Comentarios> Comentarios { get; set; } = new();

        }
        `
    },
    {
        "ID": 23,
        "EntityName": "E_Emplazamiento",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Entidad que representar la ubicacion y caracteristicas de un proyecto constructivo.  Es utilizado como tipo de dato(public E_Emplazamiento) por E_Visitas, tambien es usado como List (List<E_Emplazamiento>). Asimismo es utilizado en funciones como: VisitasLogic/Logic/Add/AddEmplazamientos, VisitasLogic/Logic/Edit/EditEmplazamientos, VisitasLogic/Logic/GetOne/GetOneEmplazamientos, VisitasLogic/Logic/GetPaginated/GetPaginatedEmplazamientos, VisitasLogic/Logic/MassiveUpload/MassiveUploadEmplazamientos. Es usado en vistas razor como: Emplazamientos/AddEmplazamientosPage, Emplazamientos/Emplazamientos, Visitas/AddVisitasPage, Visitas/PersonalVisitasPage, Visitas/VisitasPage.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Emplazamientos : AuditableEntity<string>
        {

            public string Codigo { get; set; }
            public string Nombre { get; set; }
            public double Latitud { get; set; } = (double)BsonType.Double;
            public double Longitud { get; set; } = (double)BsonType.Double;
            public string PropietarioId { get; set; }
            public E_Localidades Localidad { get; set; }
            public List<E_OperadorEmplazamiento> Operadores { get; set; } = new();
            public E_Propietarios Propietario { get; set; }

        }
        `
    },
    {
        "ID": 24,
        "EntityName": "E_Estado",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Representa una coleccion de datos tipo Dictionary el cual esta definido por una key y su nombre",
        "EntityImage": `
        namespace VisitasLogic;
        [BsonIgnoreExtraElements]
        public class E_Estado : AuditableEntity<string>
        {

            public int Index { get; set; }
            public string Nombre { get; set; }

        }
        `
    },
    {
        "ID": 25,
        "EntityName": "E_Festivos",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Entidad que representa atributos de una fecha festiva en el calendario.",
        "EntityImage": `
        public enum TiposAusenciaFestivos
        {
            Festivo, Vacaciones, Cursos, ReconocimientoMedico, Otros
        }
        [BsonIgnoreExtraElements]
        public class E_Festivos : AuditableEntity<string>
        {

            public DateTime DiaFestivo { get; set; }
            public string UserEmail { get; set; }
            public TiposAusenciaFestivos AusenciaFestivos { get; set; }
        }
        `
    },
    {
        "ID": 26,
        "EntityName": "E_Rutas",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Entidad que establece atributos que tiene una ruta. ",
        "EntityImage": `
        namespace VisitasLogic.Entities
        {
            [BsonIgnoreExtraElements]
            public class E_Rutas : AuditableEntity<string>
            {
                public string PropietarioRuta { get; set; }
                public List<E_Emplazamientos> Emplazamientos { get; set; }

                public string NombreRuta { get; set; }

            }
        }
        `
    },
    {
        "ID": 27,
        "EntityName": "E_TiposDeAusencia",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Representa una coleccion de datos tipo Dictionary el cual esta definido por una key y su nombre",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_TiposDeAusencia : AuditableEntity<string>
        {

            public int Index { get; set; }
            public string Nombre { get; set; }

        }
        `
    },
    {
        "ID": 28,
        "EntityName": "E_Visitas",
        "EntityRoute": "Movil/VisitasLogic",
        "EntityDescription": "Entidad que representa atributos de visita a proyectos u obras.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Visitas : AuditableEntity<string>
        {
            public static List<string> TiposVisita() => new()
            {
                "Replanteo", "Medidas EMF", "Medidas PS", "Subida Torre", "Visita CSS", "Visita DF", "Visita Asbuilt", "Visita Mastil", "Visita LOS"
                
            };
            public string? IdSeguimiento { get; set; }
            public string Codigo1 { get; set; }
            public string Codigo2 { get; set; }
            public string NombreSite { get; set; }
            public int Semana { get; set; }
            public List<VisitasLogic.EditUserDTORequest> AsignadoA { get; set; } = new();
            public E_Modulo Modulo { get; set; }
            public E_Proyecto Proyecto { get; set; }
            public E_Operador Operador { get; set; }
            public E_Emplazamientos? Emplazamiento { get; set; }
            public E_Propietarios Cliente { get; set; }
            public DateTime? FechaEstimadaVisita { get; set; }
            public DateTime? FechaRealVisita { get; set; }
            public List<string> TiposDeVisita { get; set; } = new();
            public List<VisitasLogic.E_Estado> Estados { get; set; } = new();
            public List<E_Comentarios> Comentarios { get; set; } = new();
            public E_AccesoDocumentacion? AccesoDocumentacion { get; set; }
            public bool AsignacionExterna { get; set; }
            public string AsigExterna { get; set; }
            public bool Facturable { get; set; } = true;
        }
        `
    },
    {
        "ID": 29,
        "EntityName": "E_Albaran",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que representa atributos de albaran(acreditacion de recepcion de un pedido). ",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Albaran
        {
            #region ----Parte Albaran----
            public string Tipo { get; set; } //de tipo Entrada de material o Salida de material
            public string FechaAlbaranAnadido { get; set; }
            public string CodigoAlbaranEntrega { get; set; }
            public bool SenderLPS { get; set; }
            public bool DestinatarioLPS { get; set; }
            public string CodigoAlbaran { get; set; }
            public string IdAlmacen { get; set; }
            public string IdObraE2E { get; set; }
            public string IdProyecto { get; set; }
            public string HTMLData { get; set; }
            public List<E_ProductoAlbaran> ListadoProductosAlbaran {get; set;}

            #endregion

            #region ----Parte Clase Productos Albaran----
            public class E_ProductoAlbaran
            {
                public E_Producto Producto { get; set; }
                public E_Proveedor Proveedor { get; set; }
                public string CodigoProducto { get; set; }
                public string Concepto { get; set; }
                public float Precio { get; set; }
                public int Unidades { get; set; }
                public string NumSerieUnidad { get; set; }
            }
            #endregion
        }
        `
    },
    {
        "ID": 30,
        "EntityName": "E_Almacen",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que representa atributos de un almacén.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Almacen : AuditableEntity<string>
        {
            [Required(ErrorMessage = "Se requiere este campo")]
            public string Nombre { get; set; }
            [Required(ErrorMessage = "Se requiere este campo")]
            public string Direccion { get; set; }
            [Required(ErrorMessage = "Se requiere este campo")]
            public float Tamano { get; set; }

            [Required(ErrorMessage = "Se requiere este campo")]
            public string NombreApellidos { get; set; }
            [Required(ErrorMessage = "Se requiere este campo")]
            [EmailAddress(ErrorMessage = "EL formato del Email no es correcto")]
            public string Email { get; set; }
            [Required(ErrorMessage = "Se requiere este campo")]
            [Phone(ErrorMessage = "El formato del teléfono no es correcto")]
            public string Telefono { get; set; }
            [Required(ErrorMessage = "Se requiere este campo")]
            public string IdBizneo { get; set; }

            public List<AlbaranDatos> Albaranes { get; set; } = new();
        }
        `
    },
    {
        "ID": 31,
        "EntityName": "E_AprobacionesCompra",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Representa aprobaciones de una compra, la cual establece un estado y el usuario que aprueba la compra.",
        "EntityImage": `
        namespace LogisticaData.Entities
        {
            public class E_AprobacionesCompra : AuditableEntity<string>
            {
                public E_Aprobador Aprobador {get; set;} = new();

                public bool Aprobado { get; set; }

            }
        }

        `
    },
    {
        "ID": 32,
        "EntityName": "E_Aprobador",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que representa atributos de un usuario que aprueba una compra.",
        "EntityImage": `
        namespace LogisticaData.Entities
        {
            public class E_Aprobador : AuditableEntity<string>
            {
                public string IdUsuarioAprobador { get; set; }
                public string ImagenPerfil { get; set; }
                public string EmailAprobador { get; set; }
                public List<string> ListaCriteriosAprobacion { get; set; }
                public int Prioridad { get; set; }
                public bool Pausa { get; set; }
            }
        }
        `
    },
    {
        "ID": 33,
        "EntityName": "E_Compras",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que representa atributos de una compra (proveedor, almacen, aldebaran).",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Compras : AuditableEntity<string>
        {
            public string CodigoCompra { get; set; }
            public string NombreComercialProveedor { get; set; }
            public string IdProveedor { get; set; } 
            public string IdAlmacen { get; set; }

            public string IdObraE2E { get; set; }
            public string IdProyecto { get; set; }
            public string DireccionEntrega { get; set; }
            public string CodigoAlbaranEntrada { get; set; }
            public List<E_AprobacionesCompra> AprobacionesCompras { get; set; } = new();
            

            public List<E_ProductoAlmacen> Productos { get; set; } = new();
            public List<bool> Validated { get; set; } = new();
            public List<E_Albaran> Albaranes { get; set; } = new();
            public List<E_ComentariosFibra> Comentarios { get; set; } = new();

            public List<E_EstadoFibra> Estados { get; set; } = new()
            {
                new()
                {
                    Estado = "Compra en curso",
                    Fecha = DateTime.Now,
                    UsuarioEstado = null
                }
            };

            public bool EnRecalculo {get; set;} 
        }
        `
    },
    {
        "ID": 34,
        "EntityName": "E_Producto",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que representa atributos de un producto (nombre, descripcion, unidad).",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Producto : AuditableEntity<string>
        {
            [Required(ErrorMessage = "Se requiere este campo")]
            public string Nombre { get; set; }

            [Required(ErrorMessage = "Se requiere este campo")]
            [StringLength(500, ErrorMessage = "La descripción debe contener hasta 500 caracteres")]
            public string Descripcion { get; set; }

            public string? CodigoProducto { get; set; }

            [Required(ErrorMessage = "Se requiere este campo")]
            public string FamiliaProducto { get; set; }

            [Required(ErrorMessage = "Se requiere este campo")]
            public string Unidades { get; set; }
            public List<Medida>? ListaMedidas { get; set; }
            public bool EsBobina { get; set; } = false;
            public bool CheckSeriable { get; set; } = false;
            public List<string> ListaNumSeries { get; set; } = new List<string>();
            public List<ProveedorProducto> Proveedores { get; set; } = new();

            public string? NameFile { get; set; }
            [BsonIgnore]
            public byte[]? Image { get; set; }
        }

        public class ProveedorProducto
        {
            [Required(ErrorMessage = "Se requiere este campo")]
            public string CodigoProveedor { get; set; }

            [Required(ErrorMessage = "Se requiere este campo")]
            public E_Proveedor Proveedor { get; set; }

            [Range(0, float.MaxValue, ErrorMessage = "Introduce un valor válido")]
            public float Valor { get; set; } = 0f;
        }

        public class Medida 
        {
            public enum UnidadMedida
            {
                CM,
                DM,
                M
            }

            public string NumSerie { get; set; }
            public float ValorMedida { get; set; }
            public UnidadMedida TipoUnidad { get; set; }
        }
        `
    },
    {
        "ID": 35,
        "EntityName": "E_ProductoAlmacen",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que define atributos de relacion de un producto que se encuentra en un almacen.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_ProductoAlmacen : AuditableEntity<string>
        {
            public E_Producto Producto { get; set; }
            
            public string IdProveedor { get; set; }
            public string NombreProveedor { get; set; }
            public string IdAlmacen { get; set; }
            public string IdNodo { get; set; } //GSER
            public string Serialnumber { get; set; }
            
            public string Proyecto { get; set; }
            public string SubProyecto { get; set; }

            public int CantidadSolicitada { get; set; }
            public int CantidadPendiente { get; set; }
            public int CantidadDisponible { get; set; }
            public int CantidadRecibida { get; set; }

            public int CantidadReservada { get; set; }

            public float Precio { get; set; }
        }
        `
    },
    {
        "ID": 36,
        "EntityName": "E_ProductoAlmacenGrouped",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que define atributos de productos agrupados en almacenes.",
        "EntityImage": `
        namespace LogisticaData.Entities
        {
            [BsonIgnoreExtraElements]
            public class E_ProductoAlmacenGrouped
            {
                public string NombreProducto { get; set; }
                public string IdProducto { get; set; }
                public string CodigoProducto { get; set; }
                public string IdAlmacen { get; set; }
                public string NombreAlmacen { get; set; }
                public string IdProyecto { get; set; }
                public string NombreProyecto { get; set; }
                public int TotalCantidad { get; set; }
                public int TotalReservado { get; set; }
                public int TotalPedido { get; set; } 
                public bool CheckSeriable { get; set; }
                public List<E_ProductosStock> ProductosStock{ get; set; }
            }
        }
        `
    },
    {
        "ID": 37,
        "EntityName": "E_ProductoNodo",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que define un nodo logistico, punto de almacenamineto o distribucion de productos.",
        "EntityImage": `
        public class E_ProductoNodo : AuditableEntity<string>
        {
            public E_Producto Producto { get; set; }
            public string Proveedor { get; set; }
            public string NombreProveedor { get; set; }
            public string IdNodo { get; set; }
            public string Serialnumber { get; set; }
            [Required(ErrorMessage = "Indica el proyecto")] public string Proyecto { get; set; }
            public string SubProyecto { get; set; }
            [Range(0, int.MaxValue, ErrorMessage = "No se pueden tener menos de 0 artículos")]
            public int Cantidad { get; set; }
            public int CantidadRecibida { get; set; }
            [Range(0, int.MaxValue, ErrorMessage = "El precio no puede ser negativo")]
            public float Precio { get; set; }
        }
        `
    },
    {
        "ID": 38,
        "EntityName": "E_ProductosStock",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que define atributos de un producto, acerca de stock disponible, informacion de almacen y proveedores",
        "EntityImage": `
        namespace LogisticaData.Entities
        {
            [BsonIgnoreExtraElements]
            public class E_ProductosStock : AuditableEntity<string>
            {
                

                public string IdCompra { get; set; }
                public string IdProductoAlmacen { get; set; }
                public string IdProyecto { get; set; }
                public string NombreProyecto { get; set; }
                public string IdSubProyecto { get; set; }
                public string NombreSubProyecto { get; set; }
                public string IdAlmacen { get; set; }
                public string NombreAlmacen { get; set; }

                public string IdProveedor { get; set; }
                public string NombreProveedor { get; set; }
                public E_Producto ProductoEnStock { get; set; }
                public int CantidadDisponible { get; set; }
                public float PrecioFinal { get; set; }
                public int TotalPedido { get; set; }
            }
        }
        `
    },
    {
        "ID": 39,
        "EntityName": "E_Proveedor",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que representa atributos de un proveedor (suministro de productos).",
        "EntityImage": `
        public class E_Proveedor : AuditableEntity<string>
        {
            [Required(ErrorMessage = "Se requiere el campo Denominación fiscal")]
            public string DenominacionFiscal { get; set; }

            [Required(ErrorMessage = "Se requiere el campo Nombre comercial")]
            public string NombreComercial { get; set; }

            [Required(ErrorMessage = "Se requiere el campo Tipo de proveedor")]
            public string TipoDeProveedor { get; set; }

            public string TipoDeServicio { get; set; } = "";

            [Required(ErrorMessage = "Se requiere el campo NIF/CIF")]
            public string NifCif { get; set; }

            [Required(ErrorMessage = "Se requiere el campo Dirección")]
            public string Direccion { get; set; }

            [Required(ErrorMessage = "Se requiere el campo Población")]
            public string Poblacion { get; set; }

            [Required(ErrorMessage = "Se requiere el campo Código postal")]
            public string CodigoPostal { get; set; }

            [Required(ErrorMessage = "Se requiere el campo Provincia")]
            public string Provincia { get; set; }

            [Required(ErrorMessage = "Se requiere el campo País")]
            public string Pais { get; set; }

            [Required(ErrorMessage = "Se requiere el campo Email")]
            [EmailAddress(ErrorMessage = "El formato del email no es correcto")]
            public string Email { get; set; }

            [Required(ErrorMessage = "Se requiere el campo Teléfono")]
            [Phone(ErrorMessage = "El formato del teléfono no es correcto")]
            public string Telefono { get; set; }

            [Required(ErrorMessage = "Se requiere el campo Web")]
            [Url(ErrorMessage = "El formato de la URL web no es correcto")]
            public string Web { get; set; }

            [Required(ErrorMessage = "Se requiere el campo Moneda")]
            public string Moneda { get; set; }

            [Required(ErrorMessage = "Se requiere el campo Forma y condiciones de pago")]
            public string FormayCondicionesDePago { get; set; }

            [Range(0, float.MaxValue, ErrorMessage = "Introduce un valor válido en el campo Impuestos")]
            public float Impuesto { get; set; }
        }
        `
    },
    {
        "ID": 40,
        "EntityName": "E_SolicitudCompra",
        "EntityRoute": "RedFija/LogisticaData",
        "EntityDescription": "Entidad que establece atributos para realizar una solicitud de compra.",
        "EntityImage": `
        namespace LogisticaData.Entities
        {
            [BsonIgnoreExtraElements]
            public class E_SolicitudCompra : AuditableEntity<string>
            {
                public string EstadoSolicitudCompra { get; set; } = "Pendiente";
                public string IdUsuarioSolicitud { get; set; }
                public string UsuarioSolicitud { get; set; }
                public string NecesidadObra { get; set; }


                public string IdProyecto { get; set; }
                public string NombreProyecto { get; set; }
                public string IdObra { get; set; }
                public string NombreObra { get; set; }
                public string IdAlmacen { get; set; }
                public string NombreAlmacen { get; set; }
                public List<SeleccionCompra> SeleccionCompra { get; set; }

            

            }

            public class SeleccionCompra 
            {
            
                public int Cantidad { get; set; }

                public E_Producto Producto { get; set; }

            }
        }
        `
    },
    {
        "ID": 41,
        "EntityName": "E_ComentariosFibra",
        "EntityRoute": "RedFija/RedFijaData",
        "EntityDescription": "Entidad que establece atributos de un comentario(perfil, comentario, fecha).",
        "EntityImage": `
        public class E_ComentariosFibra
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string ProfilePic { get; set; }
            public string Comentario { get; set; }
            public DateTime Fecha { get; set; }
        }
        `
    },
    {
        "ID": 42,
        "EntityName": "E_EstadoFibra",
        "EntityRoute": "RedFija/RedFijaData",
        "EntityDescription": "Entidad que establece atributos del estado de fibra(fecha, usuario, estado). ",
        "EntityImage": `
        public class E_EstadoFibra
        {
            public DateTime Fecha { get; set; }
            public E_User? UsuarioEstado { get; set; }
            public string Estado { get; set; }
        }
        `
    },
    {
        "ID": 43,
        "EntityName": "E_Localidades",
        "EntityRoute": "RedFija/RedFijaData",
        "EntityDescription": "Entidad que establece atributos de una localidad(provincia, zona).",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Localidades : AuditableEntity<string>
        {

            public string CAutonoma { get; set; }
            public string Provincia { get; set; }
            public string Localidad { get; set; }
            public string Zona { get; set; }
            public double Latitud { get; set; }
            public double Longitud { get; set; }

        }
        `
    },
    {
        "ID": 44,
        "EntityName": "E_ProyectosRedFija",
        "EntityRoute": "RedFija/SeguimientoFibraLogic",
        "EntityDescription": "Entidad que establece atributos de entidades implicadas en el proyecto(proyecto, cliente)",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_ProyectosRedFija : AuditableEntity<string>
        {

            public string NombreProyecto { get; set; }
            public string NombreCliente { get; set; }
        }
        `
    },
    {
        "ID": 45,
        "EntityName": "E_SeguimientoE2E",
        "EntityRoute": "RedFija/SeguimientoFibraLogic",
        "EntityDescription": "Entidad que establece atributos de un seguimiento (objetivos, fechas, instalaciones, licencias).",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_SeguimientoE2E : AuditableEntity<string>
        {
            public string IdProyecto { get; set; }
            public string CodigoGSER { get; set; }
            public string Titulo { get; set; }
            public string PgMLN { get; set; }
            public E_User PMLPS { get; set; }
            public string TipoProyectoPGM { get; set; }
            public string Subproyecto { get; set; }
            public string TipoProyectoSLA { get; set; }
            public string MPLSDWDM { get; set; }
            public DateTime FechaAsignacion { get; set; }
            public E_Localidades Localidad { get; set; }
            public string EstadoProyecto { get; set; } 
            public DateTime FechaObjetivoSLA { get; set; }
            public DateTime FechaObjetivoLyntia { get; set; }
            public DateTime FechaEstimadaEntregaLPS { get; set; }

            public List<E_AlbaranStockObra> Albaranes { get; set; } = new();

            public DataBloqueos DataBloqueos { get; set; } = new DataBloqueos();
            public DataBQA DataBQA { get; set; } = new DataBQA();
            public DataCertificacionLyntia DataCertificacionLyntia { get; set; } = new DataCertificacionLyntia();
            public DataDOAs DataDOAs { get; set; } = new DataDOAs();
            public DataIngenieria DataIngenieria { get; set; } = new DataIngenieria();
            public DataInstalacion DataInstalacion { get; set; } = new DataInstalacion();
            public DataLicencias DataLicencias { get; set; } = new DataLicencias();
            public DataObraCivil DataObraCivil { get; set; } = new DataObraCivil();
            public DataUtilities DataUtilities { get; set; } = new DataUtilities();
            public DataStockSubproyecto DatosStockProductos { get; set; } = new DataStockSubproyecto();

            public List<DataIngenieria> DataIngenierias { get; set; } = new();
            public List<DataUtilities> DataUtilitiess { get; set; } = new();
            public List<DataObraCivil> DataObraCivils { get; set; } = new();
            public List<DataLicencias> DataLicenciass { get; set; } = new();
            public List<DataInstalacion> DataInstalacions { get; set; } = new();
            public List<DataDOAs> DataDOASs { get; set; } = new();
            public List<DataBQA> DataBQAs { get; set; } = new();
            public List<DataCertificacionLyntia> DataCertificacionLyntias { get; set; } = new();
            public List<DataBloqueos> DataBloqueoss { get; set; } = new();
        }
        `
    },
    {
        "ID": 46,
        "EntityName": "E_SolicitudDiseñoF",
        "EntityRoute": "RedFija/SolicitudesDiseñoFibra",
        "EntityDescription": "Entidad que establece atributos de una solicitud de diseño(diseñador, tipotrabajo).",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_SolicitudDiseñoF : AuditableEntity<string>
        {
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Gser { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Titulo { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Proyecto { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Localidad { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Provincia { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public E_User PMLPS { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string TipoTrabajo { get; set; }

            public E_User? Diseñador { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public DateTime FechaObjetivo { get; set; } = DateTime.Now.AddDays(7);
            [Required(ErrorMessage = "Se requiere este dato")]
            public string RutaArchivos { get; set; }
            public DateTime? FechaEntrega { get; set; }
            [StringLength(500, ErrorMessage = "No se permiten más de 500 caracteres")]
            public string Descripcion { get; set; }

            public List<E_EstadoFibra> Estados { get; set; } = new()
            {
                new()
                {
                    Estado = "Sin asignación",
                    Fecha = DateTime.Now,
                    UsuarioEstado = null
                }
            };
            public List<E_ComentariosFibra> Comentarios { get; set; } = new();

            public string? IdParent { get; set; }
        }
        `
    },
    {
        "ID": 47,
        "EntityName": "E_AccesosFibra",
        "EntityRoute": "RedFija/VisitasFibra",
        "EntityDescription": "Entidad que representa un acceso de fibra (programacion, fecha  planificada).",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_AccesosFibra : AuditableEntity<string>
        {
            [Required(ErrorMessage = "Se requiere este dato")]
            public string GSER { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public E_EmplazamientosFibra Mnemonico { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Centro { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Nombre { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Direccion { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Provincia { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public DateTime FechaPlanifGprog { get; set; } = DateTime.Now.AddDays(7);
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Hora {  get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Semana { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string GProg { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Gprl { get; set; }

            public DateTime? FechaOkGprl { get; set; } = null;

            public DateTime? FechaSolicitudAccesos { get; set; } = null; // estado pendiente de solicitud acceso
            
            public DateTime? AccesosOK { get; set; } = null; // estado autorizado
            public List<E_EstadoFibra> Estados { get; set; } = new()
            {
                new()
                {
                    Estado = "Pendiente de inicio",
                    Fecha = DateTime.Now,
                    UsuarioEstado = null
                }
            };
            public List<E_ComentariosFibra> Comentarios { get; set; } = new();
        }
        `
    },
    {
        "ID": 48,
        "EntityName": "E_EmplazamientosFibra",
        "EntityRoute": "RedFija/VisitasFibra",
        "EntityDescription": "Entidad que representa una visita (ubicacion, latitudes, codigo postal.",
        "EntityImage": `
        namespace VisitasFibraLogicEmplazamientos;
        [BsonIgnoreExtraElements]
        public class E_EmplazamientosFibra : AuditableEntity<string>
        {
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Mnemonico { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Calle { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string CodigoPostal { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Municipio { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Provincia { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Pais { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            [Range(-100, 100, ErrorMessage = "El valor debe estar entre -100 y 100")]
            public double Latitud { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            [Range(-100, 100, ErrorMessage = "El valor debe estar entre -100 y 100")]
            public double Longitud { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Propietario { get; set; }
            [Required(ErrorMessage = "Se requiere este dato")]
            public string Descripcion { get; set; }
        }
        `
    },
    {
        "ID": 49,
        "EntityName": "E_Aprobaciones",
        "EntityRoute": "RRHH/Contrataciones",
        "EntityDescription": "Entidad que establece atributos de una aprobacion de contratacion (retribucion, periodo prueba, incorporacion).",
        "EntityImage": `
        public class E_Aprobaciones : AuditableEntity<string>
        {
            public string ProcesoSeleccionId { get; set; }
            public string EntrevistaId { get; set; }
            public string Nombre { get; set; }
            public string Apellidos { get; set; }
            public string TipoDocumentoIdentidad { get; set; }
            public string DocumentoIdentidad { get; set; }
            public string Departamento { get; set; }
            public string Puesto { get; set; }
            public string ReportaA { get; set; }
            public int PersonalACargo { get; set; }
            public string TipoContrato { get; set; }
            public string PeriodoPrueba { get; set; }
            public string Jornada { get; set; }
            public string Horario { get; set; }
            public bool CondicionesEspeciales { get; set; }
            public bool RetribucionVariable { get; set; }
            public DateTime Incorporacion { get; set; }
            public int Salario { get; set; }
            public string LugarDeTrabajo { get; set; }
            public bool NuevaIncorporacion { get; set; }
            public string SustituyeA { get; set; }
            public int SalarioSustitucion { get; set; }
            public string ComentarioCondicionesEspeciales { get; set; }
            public string ComentarioRetribucionVariable { get; set; }
            public List<E_DatosAprobacion> Aprobaciones { get; set; } = new();
            public List<E_Comentarios> Comentarios { get; set; } = new();
        }
        `
    },
    {
        "ID": 50,
        "EntityName": "E_DatosAprobacion",
        "EntityRoute": "RRHH/Contrataciones",
        "EntityDescription": "Entidad que establece atributos que permiten aprobar una contratacion (usuario aprobador, comentarios).",
        "EntityImage": `
        public class E_DatosAprobacion
        {

            public E_User Aprobador { get; set; }
            public string Estado { get; set; }
            public string Comentario { get; set; }
            public bool AprobacionInstantanea { get; set; }
        }
        `
    },
    {
        "ID": 51,
        "EntityName": "E_Entrevistas",
        "EntityRoute": "RRHH/Contrataciones",
        "EntityDescription": "Entidad que establece atributos de una entrevista (entrevistado, entrevistador, comentarios).",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Entrevistas
        {
            public string EntrevistaId { get; set; }
            public string NombreEntrevistado { get; set; }
            public string TelefonoEntrevistado { get; set; }
            public string ApellidoEntrevistado { get; set; }
            public E_UsuariosRRHH UserEntrevista { get; set; }
            public bool CV { get; set; }
            public List<DataEntrevistas> Entrevistas { get; set; } = new();
            public List<E_Comentarios> ComentariosEntrevista { get; set; } = new();
        }

        public class DataEntrevistas
        {
            public DateTime FechaEntrevista { get; set; }
            public string Tipo { get; set; }
            public bool Apto { get; set; }
            public List<E_User> Entrevistador { get; set; } = new();
        }
        `
    },
    {
        "ID": 52,
        "EntityName": "E_ProcesoSeleccion",
        "EntityRoute": "RRHH/Contrataciones",
        "EntityDescription": "Entidad que establece atributos de un proceso de seleccion (responsable del proceso, solicitante del puesto). Es utilizado en funciones como: Contrataciones/Logic/Aprobaciones/Add/AddAprobaciones, Contrataciones/Logic/Aprobaciones/Edit/EditAprobaciones, Contrataciones/Logic/DashBoard/DashboardProcesoSeleccion,  Contrataciones/Logic/ProcesoSeleccion/Add/AddProcesoSeleccion, Contrataciones/Logic/ProcesoSeleccion/Edit/EditProcesoSeleccion, Contrataciones/Logic/ProcesoSeleccion/ExportExcel/ExportProcesoSeleccion, Contrataciones/Logic/ProcesoSeleccion/GetOne/GetOneProcesoSeleccion, Contrataciones/Logic/ProcesoSeleccion/GetPaginated/GetPaginatedProcesoSeleccion, Contrataciones/Logic/ProcesoSeleccion/SaveWeeklyData/SaveWeeklyProcesoSeleccion, Contrataciones/Logic/UsuariosRRHH/Edit/EditUsuariosRRHH, Contrataciones/Logic/UsuariosRRHH/GetOne/GetOneUsuariosRRHH, Contrataciones/Logic/UsuariosRRHH/GetPaginated/GetPaginatedUsuariosRRHH. Asimismo, es utilizada a traves de instancias de objetos para el correcto funcionamiento de las funciones, las cuales son las siguientes: Contrataciones/Index, Contrataciones/Modals/AddEditProcesoSeleccion.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_ProcesoSeleccion : AuditableEntity<string>
        {
            public E_User ResponsableProceso { get; set; } = new();
            public E_User SolicitanteProceso { get; set; }
            public string Departamento { get; set; }
            public string Puesto { get; set; }
            public string Pais { get; set; }
            public string Provincia { get; set; }
            public DateTime? FechaInicio { get; set; }
            public DateTime? FechaFin { get; set; }
            public List<E_Entrevistas> Entrevistas { get; set; } = new();
            public List<E_Comentarios> Comentarios { get; set; } = new();
            public string ComentarioExtra { get; set; }
            public List<string> Estados { get; set; } = new()
            {
                "Pendiente de inicio"
            };
            public int Vacantes { get; set; }

            public string Estado { get; set; }
            public Dictionary<string, string> VacantesCubiertas { get; set; } = new();
            public int VacantesCubiertasCount { get; set; } = 0;

            public int Prioridad { get; set; }
            public DateTime? FechaLlegada { get; set; }
            public DateTime? FechaReclutamiento { get; set; }
            public string MesLlegadaRequerimiento { get; set; }
            public string Categoria { get; set; }
            public string JefeInmediato { get; set; }
            public string MotivoReclutamiento { get; set; }
            public string PersonaQueReeemplaza { get; set; }
        }
        `
    },
    {
        "ID": 53,
        "EntityName": "E_UsuariosRRHH",
        "EntityRoute": "RRHH/Contrataciones",
        "EntityDescription": "Entidad que define datos del entrevistado (nombre, telefono, apellido, dni). Esta entidad es utilizada como tipo de dato por las siguientes entidades: E_Entrevistas. Es utilizado en funciones como: Contrataciones/IndexUsuariosRRHH, Contrataciones/Modals/AddEditProcesoSeleccion, Contrataciones/Modals/AddEditUsuariosRRHH.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_UsuariosRRHH : AuditableEntity<string>
        {
            public string NombreEntrevistado { get; set; }
            public string TelefonoEntrevistado { get; set; }
            public string ApellidoEntrevistado { get; set; }
            public string Localidad { get; set; }
            public string Pais { get; set; }
            public string DNINIE { get; set; }
            public bool Vetado { get; set; }
            public string IdentifierCV { get; set; }
            [BsonIgnore]
            public string PuestoAlQueAspira { get; set; }
            public string PuestoPreferente { get; set; }
        }
        `
    },
    {
        "ID": 54,
        "EntityName": "E_DatosEvaluacion",
        "EntityRoute": "RRHH/EvaluacionDesempeno",
        "EntityDescription": "Entidad que define datos del trabajador (nombre, email, puesto, evaluador, email evaluador). Es utilizado como tipo de dato en otras entidades como: E_EvaluacionDesempeno. Forma parte de funciones como: EvaluacionDesempeno/Logic/Import/ImportEvaluaciones. Tiene vistas razor las cuales son: EvaluacionDesempeno/Modals/AddEvaluacion.",
        "EntityImage": `
        public class E_DatosEvaluacion
        {
            public string NombreTrabajador { get; set; }
            public string EmailTrabajador { get; set; }
            public string PuestoTrabajo { get; set; }
            public string Evaluador { get; set; }
            public string EmailEvaluador { get; set; }
            public string Departamento { get; set; }
        }
        `
    },
    {
        "ID": 55,
        "EntityName": "E_EvaluacionDesempeno",
        "EntityRoute": "RRHH/EvaluacionDesempeno",
        "EntityDescription": "Entidad que define una evaluacion de desempeño que contiene (preguntas, aspectos destacables, puntos de mejora). Esta entidad contiene las siguientes funciones: EvaluacionDesempeno/Logic/Add/AddEvaluacionDesemepeno, EvaluacionDesempeno/Logic/Edit/EditEvaluacionDesemepeno, EvaluacionDesempeno/Logic/Export/ExportEvaluacionDesempeno, EvaluacionDesempeno/Logic/GetOne/GetOneEvaluacionDesempeno, EvaluacionDesempeno/Logic/GetPaginated/GetPaginatedEvaluacionDesempeno, EvaluacionDesempeno/Logic/Import/ImportEvaluaciones.",
        "EntityImage": `
        public class E_EvaluacionDesempeno : AuditableEntity<string>
        {

            public E_DatosEvaluacion DatosEvaluacion { get; set; } = new();

            public List<PreguntasEvaluacionDesempeno> Preguntas { get; set; } = new()
            {
                new("Se compromete y muestra interés por lograr los objetivos de trabajo propuestos.", "ORIENTACIÓN AL LOGRO", -1, 1),
                new("Presenta iniciativa, autonomía. Busca diferentes alternativas para solucionar un inconveniente hasta concluir la tarea satisfactoriamente.", "ORIENTACIÓN AL LOGRO", -1, 2),
                new("Muestra perseverancia en la consecución de sus metas o tareas. Termina las tareas que comienza, aunque surjan dificultades. Completa su trabajo sin dejar tareas a medias.", "ORIENTACIÓN AL LOGRO", -1, 3),
                new("Cumple sistemáticamente sus plazos y da prioridad al trabajo de mayor valor.", "ORIENTACIÓN AL LOGRO", -1, 4),
                new("Tiene la capacidad de comunicarse de forma fluida", "COMUNICACIÓN", -1, 5),
                new("Transmite las ideas y la información de manera eficaz asegurándose de que los demás entendieron", "COMUNICACIÓN", -1, 6),
                new("Escucha a sus compañeros y responsables, estableciendo un diálogo respetuoso.", "COMUNICACIÓN", -1, 7),
                new("Es estructurado/a y eficiente en la comunicación escrita.", "COMUNICACIÓN", -1,8),
                new("Muestra buena disposición cuando se requiere tiempo extra para acabar un trabajo o solucionar un problema.", "COMPROMISO", -1, 9),
                new("Cumple con el horario de trabajo establecido", "COMPROMISO", -1, 10),
                new("Cumple con las normas establecidas en la empresa (solicitud de vacaciones en fecha, registro horario, justificación de ausencias, etc)", "COMPROMISO", -1, 11),
                new("Hace lo posible por integrarse en el grupo de trabajo. Ajusta su comportamiento y forma de trabajo al grupo.", "TRABAJO DE EQUIPO", -1, 12),
                new("Muestra buena disposición a la hora de trabajar en equipo.", "TRABAJO DE EQUIPO", -1, 13),
                new("Se involucra con los objetivos del equipo y los reconoce como propios. Trabaja para cumplir las metas como si fueran suyas propias.", "TRABAJO DE EQUIPO", -1, 14),
                new("Facilita el trabajo en equipo. Ayuda a sus compañeros cuando estos lo requieren.", "TRABAJO DE EQUIPO", -1, 15),
                new("Muestra buena disposición para relacionarse con los demás. Su actitud favorable la integración.", "RELACIONES INTERPERSONALES", -1, 16),
                new("Su vocabulario, modales y hábitos son adecuados.", "RELACIONES INTERPERSONALES", -1, 17),
                new("Logra relaciones cordiales y respetuosas con las compañeros/as. Su interacción con los demás es amable.", "RELACIONES INTERPERSONALES", -1, 18),
                new("Reacciona equilibradamente ante situaciones conflictivas, desacuerdos y/o sugerencias de mejora.", "RELACIONES INTERPERSONALES", -1, 19),
                new("Es proactivo, identifica retos y oportunidades.", "COMPROMISO CON LA EMPRESA", -1, 20),
                new("Se implica en las tareas tomando parte activa.", "COMPROMISO CON LA EMPRESA", -1, 21),
                new("Propone mejoras en la ejecución del trabajo buscando la calidad y posibles mejoras en los procesos.", "COMPROMISO CON LA EMPRESA", -1, 22),
                new("Muestra disposición de ejercer un esfuerzo en beneficio de la organización y preocupación por los problemas de la empresa.", "COMPROMISO CON LA EMPRESA", -1, 23),
                new("Guía al equipo para mejorar o desarrollar sus habilidades individuales", "LIDERAZGO", -1, 24),
                new("Tiene capacidad para asignar trabajo a los compañeros/as de equipo y los motiva / ayuda para que consigan los objetivos", "LIDERAZGO", -1, 25),
                new("Participa de forma activa en la toma de decisiones del equipo de trabajo", "LIDERAZGO", -1, 26),
                new("Conoce a cada cliente. Adapta su atención y el servicio personalizándolo a cada cliente y generándole un valor añadido diferencial.", "ORIENTACIÓN AL CLIENTE", -1, 27),
                new("Anticipa las necesidades del cliente y le asesora sobre necesidades potenciales.", "ORIENTACIÓN AL CLIENTE", -1, 28),
                new("Anticipa posibles problemas para evitar quejas y reclamaciones. Pone en marcha soluciones preventivas adecuadas.", "ORIENTACIÓN AL CLIENTE", -1, 29),
                new("Realiza esfuerzos extras para satisfacer las necesidades del cliente.", "ORIENTACIÓN AL CLIENTE", -1, 30),
            };

            public Dictionary<string, int> Values = new()
            {
                {"No aplica en su puesto", -1 },
                {"Nunca", 1 },
                {"No, casi nunca", 2 },
                {"Lo normal", 3 },
                {"Si, normalmente", 4 },
                {"Si, siempre", 5 },
            };

            public string AspectosDestacables { get; set; }
            public string PuntosDeMejora { get; set; }
            public string EvolucionUltimoAño { get; set; }
            public string CambiarPuesto { get; set; }
            public string NuevoPuesto { get; set; }
            public string AumentoSalarial { get; set; }


            public DateTime? DateCompleted { get; set; }
        }

        public class PreguntasEvaluacionDesempeno
        {
            public PreguntasEvaluacionDesempeno(string pregunta, string categoria, int value, int index)
            {
                Pregunta = pregunta;
                Categoria = categoria;
                Value = value;
                Index = index;
            }
            public int Index { get; set; }
            public string Pregunta { get; set; }
            public string Categoria { get; set; }
            public int Value { get; set; }
        }
        `
    },
    {
        "ID": 56,
        "EntityName": "E_Form",
        "EntityRoute": "RRHH/Forms",
        "EntityDescription": "Entidad que representa atributos de un form. (formulario, pie de pagina, respuesta). Es usada en funciones como: Forms/Logic/SavedForms/Add/AddForms, Forms/Logic/SavedForms/Edit/EditForms, Forms/Logic/SavedForms/GetOne/GetOneForms, Forms/Logic/SavedForms/GetPaginated/GetPaginatedForms. Por otro lado, es usado como objeto en vistas razor como: Forms",
        "EntityImage": `
        public class E_Form : AuditableEntity<string>
        {
            public E_SavedForms Form { get; set; }
            public string Footer { get; set; }
            public List<E_ResponsesForm> Responses { get; set; } = new();

        }
        `
    },
    {
        "ID": 57,
        "EntityName": "E_ResponsesForm",
        "EntityRoute": "RRHH/Forms",
        "EntityDescription": "Entidad que representa atributos de un response. (respuestas - preguntas y valores correctos). Dicha entidad es usado como tipo de dato(public List<E_SavedForms>). ",
        "EntityImage": `
        public class E_ResponsesForm 
        {
            public string Question { get; set; } 
            public int Value { get; set; } 
        }
        `
    },
    {
        "ID": 58,
        "EntityName": "E_SavedForms",
        "EntityRoute": "RRHH/Forms",
        "EntityDescription": "Entidad que representa atributos de savedForms(formulario guardado - preguntas, valores, min - max). Dicha entidad es usada como tipo de dato(public E_SavedForms) por entidades como: E_Form. Es utilizado en distintas funciones como: Forms/Logic/Add/AddSavedForms, Forms/Logic/Edit/EditSavedForms, Forms/Logic/GetOne/GetOneSavedForms, Forms/Logic/GetPaginated/GetPaginatedSavedForms. Es utilizado como objeto instanciado por vistas razor como: Forms/Index, Forms/Modal/AddEditSavedForm.",
        "EntityImage": `
        public class E_SavedForms : AuditableEntity<string> 
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public List<DataQuestion> Questions { get; set; } = new();
            public Dictionary<string, string> TextValues { get; set; } = new();
            public int MinValue { get; set; }
            public int MaxValue { get; set; }
            public string FooterForm { get; set; }
            public string ImageFormBase64 { get; set; }
        }
        `
    },
    {
        "ID": 59,
        "EntityName": "E_Comentarios",
        "EntityRoute": "BaseData/Request",
        "EntityDescription": "Entidad que representa atributos de un comentario. (id, nombre, perfil). Esta entidad es usada como tipo de dato(public E_Comentarios) por entidades como: Contrataciones/E_Aprobaciones, Contrataciones/E_Entrevistas, Contrataciones/E_ProcesoSeleccion, Delineacion/E_SolicitudDelineacion, GestionCoches/E_Coches, GestionCoches/SolicitudCoche, RadioElectrico/E_Trabajo, SeguimientoFibra/E_MantCorrectivo, SeguimientoFibra/E_MantPreventivo, SeguimientoFibra/Palencia, SeguimientoMovilLogic/E_Seguimiento, SoporteLogic/E_Incidencia, VisitasLogic/E_AccesoDocumentacion, VisitasLogic/Visitas. Es utilizado en vistas como: MovilF/SeguimientoMovil/InfoHito, MovilF/SeguimientoMovil/NewEditObra2.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Comentarios
        {

            public string Id { get; set; }
            public string Name { get; set; }
            public string ProfilePic { get; set; }
            public string Comentario { get; set; }
            public DateTime Fecha { get; set; }
        }
        `
    },
    {
        "ID": 60,
        "EntityName": "E_ErrorServices",
        "EntityRoute": "RRHH/Forms",
        "EntityDescription": "Entidad que representa un error. Este permite mostrar informacion del error como: mensaje, usuario, idusuario, accion ejecutada. Esta entidad declara sobre la misma clase atributos y funciones para el registro de informacion como la funcion Add/RegistroError.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class  E_ErrorServices : AuditableEntity<string>
        {
            public string MessageError { get; set; }
            public string UsuarioConectado { get; set; }
            public string IdUsuarioConectado { get; set; }
            public string ComnponenteAfectado { get; set; }
            public string AccionEjecutada { get; set; }
            public DateTime MomentoSuceso { get; set; }
        }

        public static partial class Add 
        {
            public static async Task RegistroError(this IMongoContext mongoContext, string messageError, string usuarioConectado, string idUsuarioConectado, string componenteAfectado, string accionEjecutada, DateTime momentoSuceso)
            {
                await mongoContext.InsertOneAuditableAsync<E_ErrorServices>(new E_ErrorServices()
                {
                    MessageError = messageError,
                    UsuarioConectado = usuarioConectado,
                    ComnponenteAfectado = componenteAfectado,
                    AccionEjecutada = accionEjecutada,
                    MomentoSuceso = DateTime.UtcNow,
                    IdUsuarioConectado = idUsuarioConectado
                }, DatabaseIdentifiers.RegistroErrores);
            }
        }
        `
    },
    {
        "ID": 61,
        "EntityName": "E_Role",
        "EntityRoute": "RRHH/Forms",
        "EntityDescription": "Entidad que representa atributos de un rol. (nombre, seleccionado, claims). Esta entidad es usada como tipo de dato (List<E_Role>), por E_User. Es usada para funciones como: Helpers/DeleteRole/DeletePerfil, Helpers/GetOneRole/GetOneRoles, Helpers/GetOneRole/GetAllRoles, Data/Main/GetPaginated/GetPaginatedRoles. Es utilizado como objeto de instancia en vistas razor como: AdminPanel/AddRoleModal, AdminPanel/AssignClaimsToRole, AdminPanel/AssignRolesToUser, AdminPanel/Roles, AdminPanel/User.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_Role : AuditableEntity<string>
        {
            public string Name { get; set; }
            public List<string> Claims { get; set; }
            public bool Selected { get; set; } = false;
        }
        `
    },
    {
        "ID": 62,
        "EntityName": "E_User",
        "EntityRoute": "RRHH/Forms",
        "EntityDescription": "Representa atributos de un usuario, como por ejemplo nombre, usuario, telefono, email, pais. Es utilizado como un atributo para entidades como: Contrataciones/E_DatosAprobacion, Contrataciones/E_Entrevistas, Contrataciones/E_ProcesoSeleccion, DelineacionLogic/E_SolicitudDelineacion, DelineacionLogic/Estado, GestionCoches/E_SolicitudCoche, RadioElectrico/E_Estado, RadioElectrico/E_Trabajo, RedFijaData/E_EstadoFibra, SeguimientoFibra/E_SeguimientoE2E, SeguimientoMovilLogic/E_Coordinacion, SeguimientoMovilLogic/E_EstadoSegui, SeguimientoMovilLogic/E_Seguimiento, SeguimientoMovilLogic/E_SolicitudDiseñoF. Esta entidad tambien es usada como atributo para clases como: BaseDataSeguimiento, DataCoordinacion, DataPlano, DataPlanoAsBuilt, DataPlanoConstructivo, DataPlanoM2CAP, DataPlanoPPL. Asimismo se ha utilizado esta entidad en las siguiente funciones y metodos: Database/Context/UserMongoContext/Users, Database/Context/Helpers/DeleteUsuario/DeleteUser, Database/Context/Helpers/DeleteUsuario/ToggleUserConfirmed, Database/Context/Helpers/GetOneUser/GetOneUsers, DelineacionLogic/Helpers/AsignarSolicitud, DelineacionLogic/Logic/Add/AddSolicitudDelineacion, DelineacionLogic/Logic/Edit/EditSolicitudDelineacion, DelineacionLogic/SolicitudesDiseñoFibra/AutoAsignacion/AutoAsignarSolicitudDiseñoF. Esta entidad es usada en la mayor parte del proyecto, a continuacion se especifica las vistas razor en las que es utilizada; GestionCoches/Index, GestionCoches/Modals/AddEditSolicitud, GestionCoches/StockCoches, AdminPanel/AssignRolesToUser, AdminPanel/User, Identity/Account, Identity/ForgotPassword, Identity/Login, Identity/NewPassword, Identity/Register, Identity/ValidateEmail, Delineacion/Modals/AddEditSolicitudModal, Delineacion/TableSolicitud, RadioElectrico/AddEditTrabajoModal, SeguimientoMovil/EditObra, SeguimientoMovil/Helpers/TarjetaActaReplanteo, SeguimientoMovil/Helpers/TarjetaBaseData, SeguimientoMovil/Helpers/TarjetaCoordinacion, SeguimientoMovil/HitoActaRecepcionObra, SeguimientoMovil/HitoActaReplanteo, SeguimientoMovil/HitoAYTO, SeguimientoMovil/HitoBoletinElectrico, SeguimientoMovil/HitoCalculoPLL, SeguimientoMovil/HitoCertTratamientoResiduos, SeguimientoMovil/HitoCFO, SeguimientoMovil/HitoCoordinacion, SeguimientoMovil/HitoCVE, SeguimientoMovil/HitoCVETorre, SeguimientoMovil/HitoDF, SeguimientoMovil/HitoDocsCoordinacion, SeguimientoMovil/HitoFotomontaje, SeguimientoMovil/HitoFotoTexto, SeguimientoMovil/HitoInformeAsBuilt.",
        "EntityImage": `
        [BsonIgnoreExtraElements]
        public class E_User : AuditableEntity<string>
        {
            public string Username { get; set; }
            public string Name { get; set; }
            public string LastName { get; set; }
            public string Tel { get; set; }
            public string Email { get; set; }
            public string Pais { get; set; }
            public string Departamento { get; set; }
            public string ProfilePic { get; set; }
            public List<E_Role> Roles { get; set; }
            public bool Confirmed { get; set; } = true;
        }
        `
    }
];

// Variables para la paginación
let currentPage = 1;
const itemsPerPage = 10;
let filteredData = [...data];

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
                    <div class="app-content">
                        <h2 class="app-title"><i class="fa-solid fa-cube"></i> ${app.ID + `.  ` + app.EntityName}</h2>
                        <p class="app-description">${app.EntityDescription}</p>
                      
                    </div>
                    <div class="code-container">
                        <div class="code-header">
                            <span class="code-title">${app.EntityName}.cs</span>
                            <button class="code-copy" onclick="copyCode(this)">
                                <i class="fa-regular fa-copy"></i> Copiar
                            </button>
                        </div>
                        <pre class="code-content"><code class="language-csharp">${app.EntityImage}</code></pre>
                    </div>
                </div>
            `;
        });
    }

    document.getElementById('app-container').innerHTML = cards;
    Prism.highlightAll();

    // Actualizar paginación
    updatePagination();
}

// Función para actualizar los botones de paginación
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    let paginationHTML = '';

    if (totalPages > 1) {
        // Botón anterior
        paginationHTML += `<button class="pagination-button" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})"><i class="fa-solid fa-chevron-left"></i></button>`;

        // Números de página
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<button class="pagination-button ${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        }

        // Botón siguiente
        paginationHTML += `<button class="pagination-button" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})"><i class="fa-solid fa-chevron-right"></i></button>`;
    }

    document.getElementById('pagination').innerHTML = paginationHTML;
}

// Función para cambiar de página
function changePage(page) {
    if (page < 1 || page > Math.ceil(filteredData.length / itemsPerPage)) return;

    currentPage = page;
    displayApps(currentPage);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Función para buscar aplicaciones
function searchApps() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();

    filteredData = data.filter(app =>
        app.ApplicationName.toLowerCase().includes(searchTerm) ||
        app.ApplicationDescription.toLowerCase().includes(searchTerm) ||
        app.ApplicationRoute.toLowerCase().includes(searchTerm)
    );

    currentPage = 1;
    displayApps();
}

function copyCode(button) {
    const codeContent = button.parentElement.nextElementSibling.textContent;
    navigator.clipboard.writeText(codeContent).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    });
}

// Inicializar la página
window.onload = function () {
    displayApps();
};

// Funciones para el menú lateral
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}