const data = [
  {
    "ID": 1,
    "ApplicationName": "Bug/Add",
    "ApplicationRoute": "General/BugTracker/Bug/Add",
    "ApplicationDescription": "El método AddBug es una funcionalidad que permite registrar errores en el sistema de manera automatizada. Cuando se detecta un error, el método lo guarda en la base de datos MongoDB y simultáneamente envía una notificación por correo electrónico a los administradores del sistema (María De Posa y Cristian Báez).",
    "Code": `
    public static partial class Add
    {
            public static async Task<Result<string>> AddBug(this IMongoContext mongoContext, E_BugRequest dataAdd, IOptions<MailConfiguration> _configMail)
            {
                await mongoContext.InsertOneAuditableAsync(dataAdd, DatabaseIdentifiers.RegistroErrores);

                    var email = new MimeMessage();
                    email.From.Add(new MailboxAddress(_configMail.Value.DisplayName, _configMail.Value.From));
                    email.Sender = (new MailboxAddress(_configMail.Value.DisplayName, _configMail.Value.From));
            
                    // email.To.Add(new MailboxAddress("Daniel Martínez", "daniel.martinez@lpsgrupo.com"));
                    email.To.Add(new MailboxAddress("María De Posa", "maria.deposa@lpsgrupo.com"));
                    email.To.Add(new MailboxAddress("Cristian Báez", "cristian.baez@lpsgrupo.com"));
                    email.Subject = $"Reporte de error en Bug Tracker de LPS Grupo";

                    email.Body = new BodyBuilder()
                    {
                        HtmlBody = @$"Alguien ha añadido una solicitud de error nueva"
                    }.ToMessageBody();

                    SmtpClient smtp = new SmtpClient();
                    await smtp.ConnectAsync(_configMail.Value.Host, _configMail.Value.Port, SecureSocketOptions.Auto);
                await smtp.AuthenticateAsync(_configMail.Value.UserName, _configMail.Value.Password);
                await smtp.SendAsync(email);
                    await smtp.DisconnectAsync(true);

                return Result<string>.Success();
            }
    }`
  },
  {
    "ID": 2,
    "ApplicationName": "Bug/Edit",
    "ApplicationRoute": "General/BugTracker/Bug/Edit",
    "ApplicationDescription": "El método EditBug permite actualizar el estado y los detalles de un error registrado. Cuando se finaliza un error (se añade un comentario de finalización), el sistema envía automáticamente una notificación por correo al usuario que reportó el error, informándole sobre la actualización.",
    "Code": `
    public static partial class Edit
    {
        public static async Task<Result<string>> EditBug(this IMongoContext mongoContext, E_BugRequest dataAdd, IOptions<MailConfiguration> _configMail)
        {
            var dataInDb = await mongoContext.Data<E_BugRequest>(DatabaseIdentifiers.RegistroErrores)
                .Find(x => x.Id == dataAdd.Id).FirstOrDefaultAsync();

            bool SendEmail = (string.IsNullOrEmpty(dataInDb.FinishedComment) && !string.IsNullOrEmpty(dataAdd.FinishedComment));

            await mongoContext.ReplaceOneAuditableAsync(dataAdd, DatabaseIdentifiers.RegistroErrores);

            if(SendEmail)
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress(_configMail.Value.DisplayName, _configMail.Value.From));
                email.Sender = (new MailboxAddress(_configMail.Value.DisplayName, _configMail.Value.From));

                email.To.Add(new MailboxAddress(dataAdd.CreatedByName, dataAdd.EmailSender));
                email.Subject = $"Reporte de error en Bug Tracker de LPS Grupo";

                email.Body = new BodyBuilder()
                {
                    HtmlBody = @$"Tu solicitud de error con título ""{dataAdd.Title}"" se ha finalizado <br/>
        Accede a <a href=""https://uf.lpsgrupo.dev/BugTracker"">Bug Tracker</a> para ver el comentario del desarrollador sobre la solicitud"
                }.ToMessageBody();

                SmtpClient smtp = new SmtpClient();
                await smtp.ConnectAsync(_configMail.Value.Host, _configMail.Value.Port, SecureSocketOptions.Auto);
                await smtp.AuthenticateAsync(_configMail.Value.UserName, _configMail.Value.Password);
                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);
            }

            return Result<string>.Success();
        }
    }`
  },
  {
    "ID": 3,
    "ApplicationName": "Bug/GetOne",
    "ApplicationRoute": "General/BugTracker/Bug/GetOne",
    "ApplicationDescription": "El método GetOneBug permite obtener los detalles de un error específico a partir de su ID. Este método es utilizado para mostrar la información detallada de un error en la interfaz de usuario.",
    "Code": `
    public static partial class GetOne
    {
        public static async Task<Result<E_BugRequest>> GetOneBug(this IMongoContext mongoContext, string id)
        {
            var data = await mongoContext.Data<E_BugRequest>(DatabaseIdentifiers.RegistroErrores)
                .Find(x => x.Id == id).FirstOrDefaultAsync();

            return Result<E_BugRequest>.Success(data);
        }
    }`
  },
  {
    "ID": 4,
    "ApplicationName": "Bug/GetPaginated",
    "ApplicationRoute": "General/BugTracker/Bug/GetPaginated",
    "ApplicationDescription": "El método GetPaginatedBugRequest permite obtener una lista paginada de errores registrados. Incluye funcionalidades de búsqueda por título, filtrado por estado y restricción de acceso según el rol del usuario (los usuarios no administradores solo ven sus propios errores).",
    "Code": `
    public static partial class GetPaginated
    {
        public static async Task<PaginatedResult<E_BugRequest>> GetPaginatedBugRequest(this IMongoContext mongoContext, FilteredBugRequest request)
        {
            request.Search = request.Search.ToLower();

            var builder = Builders<E_BugRequest>.Filter;

            var filter = builder.Empty;

            if (!string.IsNullOrEmpty(request.Search))
            {
                filter &= builder.Where(x => x.Title.ToLower().Contains(request.Search));
            }

            if (request.Status.Count > 0)
            {
                filter &= builder.Where(x => request.Status.Contains(x.Solved));
            }

            if (!mongoContext.CurrentUser().Roles.Contains("Admin"))
            {
                filter &= builder.Where(x => x.CreatedBy == mongoContext.CurrentUser().id);
            }

            var data = await mongoContext.Data<E_BugRequest>(DatabaseIdentifiers.RegistroErrores).Find(filter)
                            .SortByDescending(x => x.CreatedOn)
                            .Skip(request.DataPageNumber * request.PageSize)
                .Limit(request.PageSize)
                .ToListAsync();

            var count = await mongoContext.Data<E_BugRequest>(DatabaseIdentifiers.RegistroErrores).Find(filter).CountDocumentsAsync();

            return PaginatedResult<E_BugRequest>.Success(data, countDocs: count, pageSize: request.PageSize, actualPage: request.PageNumber);
        }
    }`
  },
  {
    "ID": 5,
    "ApplicationName": "Coches/AddCoche",
    "ApplicationRoute": "General/GestionCoches/Logic/Coches/AddCoche",
    "ApplicationDescription": "El método AddCoche permite registrar un nuevo vehículo en el sistema. Almacena la información del vehículo en la base de datos MongoDB, incluyendo sus características y detalles técnicos.",
    "Code": `
    public static partial class Add
    {
        public static async Task<Result<string>> AddCoche(this IMongoContext mongoContext, E_Coches dataAdd)
        {
            await mongoContext.InsertOneAuditableAsync<E_Coches>(dataAdd, DatabaseIdentifiers.Coche);
            return Result<string>.Success();
        }
    }`
  },
  {
    "ID": 6,
    "ApplicationName": "Coches/EditCoche",
    "ApplicationRoute": "General/GestionCoches/Logic/Coches/EditCoche",
    "ApplicationDescription": "El método EditCoche permite actualizar la información de un vehículo existente. Modifica los datos del vehículo en la base de datos MongoDB, manteniendo un registro de las modificaciones realizadas.",
    "Code": `
    public static partial class Edit
    {
        public static async Task<Result<string>> EditCoche(this IMongoContext mongoContext, E_Coches data)
        {
            await mongoContext.ReplaceOneAuditableAsync<E_Coches>(data, DatabaseIdentifiers.Coche);
            return Result<string>.Success();
        }
    }`
  },
  {
    "ID": 7,
    "ApplicationName": "Coches/GetOneCoche",
    "ApplicationRoute": "General/GestionCoches/Logic/Coches/GetOneCoche",
    "ApplicationDescription": "El método GetOneCoche permite obtener los detalles de un vehículo específico a partir de su ID. Este método es utilizado para mostrar la información detallada de un vehículo en la interfaz de usuario.",
    "Code": `
    public static partial class GetOne
    {
        public static async Task<Result<E_Coches>> GetOneCoche(this IMongoContext mongoContext, string id)
        {
            var data = await mongoContext.Data<E_Coches>(DatabaseIdentifiers.Coche).Find(x => x.Id == id).FirstOrDefaultAsync();

            return Result<E_Coches>.Success(data);
        }
    }`
  },
  {
    "ID": 8,
    "ApplicationName": "Coches/GetPaginatedCoche",
    "ApplicationRoute": "General/GestionCoches/Logic/Coches/GetPaginatedCoche",
    "ApplicationDescription": "El método GetPaginatedCoche permite obtener una lista paginada de vehículos registrados. Incluye funcionalidades de búsqueda y filtrado para facilitar la gestión de la flota de vehículos.",
    "Code": `
    public static partial class GetPaginated
    {
        public static async Task<PaginatedResult<E_Coches>> GetPaginatedCoche(this IMongoContext mongoContext, FilteredCochesRequest request)
        {
            request.Search = request.Search.ToLower();

            var builder = Builders<E_Coches>.Filter;

            var filter = builder.Empty;

            if (!string.IsNullOrEmpty(request.Search))
            {
                filter &= builder.Where(x => x.Matricula.ToLower().Contains(request.Search) || 
                                           x.Marca.ToLower().Contains(request.Search) || 
                                           x.Modelo.ToLower().Contains(request.Search));
            }

            var data = await mongoContext.Data<E_Coches>(DatabaseIdentifiers.Coche).Find(filter)
                            .SortByDescending(x => x.CreatedOn)
                            .Skip(request.DataPageNumber * request.PageSize)
                .Limit(request.PageSize)
                .ToListAsync();

            var count = await mongoContext.Data<E_Coches>(DatabaseIdentifiers.Coche).Find(filter).CountDocumentsAsync();

            return PaginatedResult<E_Coches>.Success(data, countDocs: count, pageSize: request.PageSize, actualPage: request.PageNumber);
        }
    }`
  },
  {
    "ID": 9,
    "ApplicationName": "GestionCoches/Logic/SolicitudCoche/Add",
    "ApplicationRoute": "General/GestionCoches/Logic/SolicitudCoche/Add",
    "ApplicationDescription": "El método AddSolicitudCoche permite registrar una nueva solicitud de vehículo. Almacena la información de la solicitud en la base de datos MongoDB y gestiona la subida de archivos adjuntos (como imágenes) a un servicio de almacenamiento en la nube.",
    "Code": `
    public static partial class Add
    { 
        public static async Task<Result<string>> AddSolicitudCoche(this IMongoContext mongoContext, E_SolicitudCoche dataAdd)
        {
            var count = await mongoContext.Data<E_SolicitudCoche>(DatabaseIdentifiers.Coche).Find(x => true).CountDocumentsAsync();

            dataAdd.Index = (int)count;
            dataAdd.Index++;

            // Configuración del cliente AWS (usar variables de entorno o configuración segura)
            AWSCredentials credentials = new BasicAWSCredentials(
                Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID"),
                Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY")
            );
            AmazonS3Client client = new AmazonS3Client(credentials, RegionEndpoint.SAEast1);

            foreach (var v in dataAdd.Archivos)
            {
                var ms = new MemoryStream(Convert.FromBase64String(v.Base64Data));

                try
                {
                    await client.DeleteObjectAsync(new()
                    {
                        BucketName = "lpsgrupolatam",
                        Key = $"ImagenesCoche/{dataAdd.Index}_{dataAdd.Archivos.IndexOf(v)};{Path.GetExtension(v.Nombre)}"
                    });
                }
                catch { }

                await client.PutObjectAsync(new()
                {
                    BucketName = "lpsgrupolatam",
                    InputStream = ms,
                    Key = $"ImagenesCoche/{dataAdd.Index}_{dataAdd.Archivos.IndexOf(v)};{Path.GetExtension(v.Nombre)}"
                });
            }
            await mongoContext.InsertOneAuditableAsync<E_SolicitudCoche>(dataAdd, DatabaseIdentifiers.Coche);
            return Result<string>.Success();
        }
    }`
  },
  {
    "ID": 10,
    "ApplicationName": "GestionCoches/Logic/SolicitudCoche/Edit",
    "ApplicationRoute": "General/GestionCoches/Logic/SolicitudCoche/Edit",
    "ApplicationDescription": "El método EditSolicitudCoche permite actualizar una solicitud de vehículo existente. Modifica los datos de la solicitud en la base de datos MongoDB y gestiona la actualización de archivos adjuntos en el servicio de almacenamiento en la nube.",
    "Code": `
    public static partial class Edit
    {
        public static async Task<Result<string>> EditSolicitudCoche(this IMongoContext mongoContext, E_SolicitudCoche dataAdd)
        {
            var dataInDb = await mongoContext.Data<E_SolicitudCoche>(DatabaseIdentifiers.Coche).Find(x => x.Id == dataAdd.Id).FirstAsync();
            await mongoContext.ReplaceOneAuditableAsync<E_SolicitudCoche>(dataAdd, DatabaseIdentifiers.Coche);

            // Configuración del cliente AWS (usar variables de entorno o configuración segura)
            AWSCredentials credentials = new BasicAWSCredentials(
                Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID"),
                Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY")
            );
            AmazonS3Client client = new AmazonS3Client(credentials, RegionEndpoint.SAEast1);

            foreach (var v in dataAdd.Archivos.Where(x => !string.IsNullOrEmpty(x.Base64Data)))
            {
                var ms = new MemoryStream(Convert.FromBase64String(v.Base64Data));

                try
                {
                    await client.DeleteObjectAsync(new()
                    {
                        BucketName = "lpsgrupolatam",
                        Key = $"ImagenesCoche/{dataAdd.Index}_{dataAdd.Archivos.IndexOf(v)};{Path.GetExtension(v.Nombre)}"
                    });
                }
                catch { }

                await client.PutObjectAsync(new()
                {
                    BucketName = "lpsgrupolatam",
                    InputStream = ms,
                    Key = $"ImagenesCoche/{dataAdd.Index}_{dataAdd.Archivos.IndexOf(v)};{Path.GetExtension(v.Nombre)}"
                });
            }

            return Result<string>.Success();
        }
    }`
  }, 
  {
    "ID": 11,
    "ApplicationName": "GestionCoches/Logic/SolicitudCoche/GetOne",
    "ApplicationRoute": "General/GestionCoches/Logic/SolicitudCoche/GetOne",
    "ApplicationDescription": "El método GetOneSolicitudCoche permite obtener los detalles de una solicitud de vehículo específica a partir de su ID. Este método es utilizado para mostrar la información detallada de una solicitud en la interfaz de usuario.",
    "Code": `
    public static partial class GetOne
    {
        public static async Task<Result<E_SolicitudCoche>> GetOneSolicitudCoche(this IMongoContext mongoContext, string id)
        {
            var data = await mongoContext.Data<E_SolicitudCoche>(DatabaseIdentifiers.Coche).Find(x => x.Id == id).FirstOrDefaultAsync();

            return Result<E_SolicitudCoche>.Success(data);
        }
    }`
  }
];

// Variables para la paginación
let currentPage = 1;
const itemsPerPage = 20;
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
                        <h2 class="app-title"><i class="fa-solid fa-cube"></i> ${app.ApplicationName}</h2>
                        <p class="app-description">${app.ApplicationDescription}</p>
                      
                    </div>
                    <div class="code-container">
                        <div class="code-header">
                            <span class="code-title">${app.ApplicationName}.cs</span>
                            <button class="code-copy" onclick="copyCode(this)">
                                <i class="fa-regular fa-copy"></i> Copiar
                            </button>
                        </div>
                        <pre class="code-content"><code class="language-csharp">${app.Code}</code></pre>
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
window.onload = function() {
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