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
}
`
  },
  {
    "ID": 2,
    "ApplicationName": "ListBugs",
    "ApplicationRoute": "General/BugTracker",
    "ApplicationDescription": "Esta funcionalidad permite visualizar todos los errores registrados en el sistema. Ofrece opciones de filtrado por fecha, severidad y estado, facilitando así la gestión y seguimiento de los problemas reportados.",
    "ApplicationImage": "../assets/images/Aplicaciones/Add.png"
  },
  {
    "ID": 3,
    "ApplicationName": "UserManagement",
    "ApplicationRoute": "Admin/Users",
    "ApplicationDescription": "Módulo que gestiona la creación, edición y eliminación de usuarios en el sistema. Permite asignar roles y permisos específicos, además de generar reportes de actividad por usuario.",
    "ApplicationImage": "../assets/images/Aplicaciones/Add.png"
  },
  {
    "ID": 4,
    "ApplicationName": "DataExport",
    "ApplicationRoute": "Reports/Export",
    "ApplicationDescription": "Herramienta que facilita la exportación de datos del sistema en diversos formatos (CSV, PDF, Excel). Incluye opciones para personalizar los campos a exportar y aplicar filtros específicos.",
    "ApplicationImage": "../assets/images/Aplicaciones/Add.png"
  },
  {
    "ID": 5,
    "ApplicationName": "NotificationCenter",
    "ApplicationRoute": "Communication/Notifications",
    "ApplicationDescription": "Sistema centralizado para el envío y gestión de notificaciones. Soporta múltiples canales (email, SMS, notificaciones push) y permite programar envíos automáticos basados en eventos del sistema.",
    "ApplicationImage": "../assets/images/Aplicaciones/Add.png"
  },
  {
    "ID": 6,
    "ApplicationName": "APIGateway",
    "ApplicationRoute": "Integration/Gateway",
    "ApplicationDescription": "Componente que actúa como punto de entrada unificado para todas las solicitudes API. Gestiona la autenticación, balanceo de carga y enrutamiento hacia los servicios internos correspondientes.",
    "ApplicationImage": "../assets/images/Aplicaciones/Add.png"
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
                        <div class="app-route"><i class="fa-solid fa-link"></i> Ruta: ${app.ApplicationRoute}</div>
                        <div class="app-meta">
                            <span class="app-meta-item"><i class="fa-solid fa-hashtag"></i> ID: ${app.ID}</span>
                            <span class="app-meta-item"><i class="fa-solid fa-code-branch"></i> Versión: 1.0</span>
                            <span class="app-meta-item"><i class="fa-solid fa-calendar-check"></i> Última actualización: 2024-04-20</span>
                        </div>
                    </div>
                    <div class="code-container">
                        <div class="code-header">
                            <span class="code-title">${app.ApplicationName}.cs</span>
                            <button class="code-copy" onclick="copyCode(this)">
                                <i class="fa-regular fa-copy"></i> Copiar
                            </button>
                        </div>
                        <pre class="code-content">${app.Code}</pre>
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

// Función para Copiar código
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