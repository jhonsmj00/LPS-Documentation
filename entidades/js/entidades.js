const data = [
    {
        "ID": 1,
        "EntityName": "E_BugRequest",
        "EntityRoute": "General/BugTracker",
        "EntityDescription": "Entidad que representa una peticion de registro de Bug.",
        "EntityImage": `public enum BugStatus
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
    }`
    },
    {
        "ID": 2,
        "EntityName": "E_ArchivoCoche",
        "EntityRoute": "General/GestionCoches",
        "EntityDescription": "Entidad que representa peticion de guardado de archivos adjuntos de registro de un coche.",
        "EntityImage": `public enum BugStatus
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
    }`
    },
    {
        "ID": 3,
        "EntityName": "E_Coches",
        "EntityRoute": "General/GestionCoches",
        "EntityDescription": "Entidad que representa atributos de un coche.",
        "EntityImage": `public enum BugStatus
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
    }`
    },
    {
        "ID": 4,
        "EntityName": "E_Delegacion",
        "EntityRoute": "General/GestionCoches",
        "EntityDescription": "Representa una coleccion de datos tipo Dictionary el cual esta definido por una key y su nombre",
        "EntityImage": `public enum BugStatus
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
    }`
    },
    {
        "ID": 5,
        "EntityName": "E_SolicitudCoche",
        "EntityRoute": "General/GestionCoches",
        "EntityDescription": "Entidad que representa una solicitud de coche.",
        "EntityImage": `public enum BugStatus
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
    }`
    },
    {
        "ID": 6,
        "EntityName": "E_ArchivoIncidencia",
        "EntityRoute": "General/SoporteLogic",
        "EntityDescription": "Entidad que representa el guardado de archivos adjuntos de una incidencia.",
        "EntityImage": `public enum BugStatus
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
    }`
    },
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
                        <h2 class="app-title"><i class="fa-solid fa-cube"></i> ${app.EntityName}</h2>
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