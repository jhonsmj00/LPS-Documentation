const data = [
  {
    "ID": 1,
    "ServicesName": "DateTimeExtension",
    "ServicesRoute": "Data/Helpers/DateTimeExtension",
    "ServicesDescription":"",
    "Code": `
    using Microsoft.JSInterop;

    public static class DateTimeExtension
    {
        public static DateTime ToRealLocalTime(this DateTime date, int offsetInMinutes)
        {
            var userOffset = TimeSpan.FromMinutes(-offsetInMinutes);

            DateTimeOffset offset = new(date);

            return offset.ToOffset(userOffset).DateTime;
        }
    }
    `
  },
  {
    "ID": 2,
    "ServicesName": "StringExtensions",
    "ServicesRoute": "Data/Helpers/StringExtensions",
    "ServicesDescription":"",
    "Code": `
    public static class StringExtensions
    {
        public static string NormalizeText(this string input)
        {
            return input.ToUpper().Replace('Á', 'A').Replace('É', 'E').Replace('Í', 'I').Replace('Ó', 'O').Replace('Ú', 'U');
        }
    }
    `
  },
  {
    "ID": 3,
    "ServicesName": "E_RoleAPIRoutes",
    "ServicesRoute": "Data/Main/E_RoleAPIRoutes",
    "ServicesDescription":"",
    "Code": `
    public static class E_RoleAPIRoutes
    {
        public const string AddE_Role = &quot;/api/Role/add&quot;;
        public const string EditE_Role = &quot;/api/Role/edit&quot;;
        public const string GetOneE_Role = &quot;/api/Role/getone&quot;;
        public const string GetPaginatedE_Role = &quot;/api/Role/getpaginated&quot;;
    }
    `
  },
  {
    "ID": 4,
    "ServicesName": "E_UserAPIRoutes",
    "ServicesRoute": "Data/Main/E_UserAPIRoutes",
    "ServicesDescription":"",
    "Code": `
    public static class E_UserAPIRoutes
    {
        public const string AddE_User = &quot;/api/User/add&quot;;
        public const string EditE_User = &quot;/api/User/edit&quot;;
        public const string GetOneE_User = &quot;/api/User/getone&quot;;
        public const string GetPaginatedE_User = &quot;/api/User/getpaginated&quot;;

        public const string ForgotPassword = &quot;/api/User/forgotpassword&quot;;
        public const string GetTokenRefreshed = &quot;/api/User/gettokenrefreshed&quot;;
        public const string Login = &quot;/api/User/login&quot;;
        public const string NewPassword = &quot;/api/User/newpassword&quot;;
        public const string ValidateEmail = &quot;/api/User/validateemail&quot;;
    }
    `
  },
  {
    "ID": 5,
    "ServicesName": "GetPaginated",
    "ServicesRoute": "Data/Main/GetPaginated",
    "ServicesDescription":"",
    "Code": `
    using Database.Interfaces;
    using MongoDB.Bson;
    using MongoDB.Driver;
    public static partial class GetPaginated
    {
        public static async Task&lt;PaginatedResult&lt;EditUserDTORequest&gt;&gt; GetPaginatedUsers(this IMongoContext mongoContext, FiltersBase request)
        {
            var collection = mongoContext.Data&lt;E_User&gt;(DatabaseIdentifiers.Main);

            // Build filter based on search criteria  
            var filterBuilder = Builders&lt;E_User&gt;.Filter;
            var filter = filterBuilder.Empty;

            if (!string.IsNullOrEmpty(request.Search))
            {
                filter &amp;= filterBuilder.Or(
                    filterBuilder.Regex(u =&gt; u.Username, new BsonRegularExpression(request.Search, &quot;i&quot;)),
                    filterBuilder.Regex(u =&gt; u.Name, new BsonRegularExpression(request.Search, &quot;i&quot;)),
                    filterBuilder.Regex(u =&gt; u.LastName, new BsonRegularExpression(request.Search, &quot;i&quot;)),
                    filterBuilder.Regex(u =&gt; u.Email, new BsonRegularExpression(request.Search, &quot;i&quot;))
                );
            }

            if (request.DateSearch.HasValue)
            {
                filter &amp;= filterBuilder.Gte(u =&gt; u.CreatedOn, request.DateSearch.Value.Date) &amp;
                        filterBuilder.Lt(u =&gt; u.CreatedOn, request.DateSearch.Value.Date.AddDays(1));
            }

            if (request.DateRangeSearch.Key.HasValue &amp;&amp; request.DateRangeSearch.Value.HasValue)
            {
                filter &amp;= filterBuilder.Gte(u =&gt; u.CreatedOn, request.DateRangeSearch.Key.Value) &amp;
                        filterBuilder.Lte(u =&gt; u.CreatedOn, request.DateRangeSearch.Value.Value);
            }

            // Count total documents  
            var totalDocuments = await collection.CountDocumentsAsync(filter);

            // Calculate pagination  
            var skip = (request.PageNumber - 1) * request.PageSize;
            var users = await collection.Find(filter)
                                        .Skip(skip)
                                        .Limit(request.PageSize)
                                        .ToListAsync();

            // Map E_User to EditUserDTORequest  
            var userDtos = users.Select(u =&gt; new EditUserDTORequest
            {
                Id = u.Id,
                Username = u.Username,
                Name = u.Name,
                LastName = u.LastName,
                Email = u.Email,
                Tel = u.Tel,
                ProfilePic = u.ProfilePic,
                Confirmed = u.Confirmed,
                Roles = u.Roles.Select(r =&gt; new EditRoleDTORequest // Changed RoleDTO to EditRoleDTORequest  
                {
                    Id = r.Id,
                    Name = r.Name,
                
                }).ToList()
            }).ToList();

            // Return paginated result  
            return PaginatedResult&lt;EditUserDTORequest&gt;.Success(
                data: userDtos,
                countDocs: totalDocuments,
                actualPage: request.PageNumber,
                pageSize: request.PageSize
            );
        }
        public static async Task&lt;PaginatedResult&lt;EditRoleDTORequest&gt;&gt; GetPaginatedRoles(this IMongoContext mongoContext, FiltersBase request)
        {
            var collection = mongoContext.Data&lt;E_Role&gt;(DatabaseIdentifiers.Main);

            // Build filter based on search criteria  
            var filterBuilder = Builders&lt;E_Role&gt;.Filter;
            var filter = filterBuilder.Empty;

            if (!string.IsNullOrEmpty(request.Search))
            {
                filter &amp;= filterBuilder.Or(
                    filterBuilder.Regex(r =&gt; r.Name, new BsonRegularExpression(request.Search, &quot;i&quot;))
                );
            }

            if (request.DateSearch.HasValue)
            {
                filter &amp;= filterBuilder.Gte(r =&gt; r.CreatedOn, request.DateSearch.Value.Date) &amp;
                        filterBuilder.Lt(r =&gt; r.CreatedOn, request.DateSearch.Value.Date.AddDays(1));
            }

            if (request.DateRangeSearch.Key.HasValue &amp;&amp; request.DateRangeSearch.Value.HasValue)
            {
                filter &amp;= filterBuilder.Gte(r =&gt; r.CreatedOn, request.DateRangeSearch.Key.Value) &amp;
                        filterBuilder.Lte(r =&gt; r.CreatedOn, request.DateRangeSearch.Value.Value);
            }

            // Count total documents  
            var totalDocuments = await collection.CountDocumentsAsync(filter);

            // Calculate pagination  
            var skip = (request.PageNumber - 1) * request.PageSize;
            var roles = await collection.Find(filter)
                                        .Skip(skip)
                                        .Limit(request.PageSize)
                                        .ToListAsync();

            // Map E_Role to EditRoleDTORequest  
            var roleDtos = roles.Select(r =&gt; new EditRoleDTORequest
            {
                Id = r.Id,
                Name = r.Name
            }).ToList();

            // Return paginated result  
            return PaginatedResult&lt;EditRoleDTORequest&gt;.Success(
                data: roleDtos,
                countDocs: totalDocuments,
                actualPage: request.PageNumber,
                pageSize: request.PageSize
            );
        }
    }
    `
  },
  {
    "ID": 6,
    "ServicesName": "RouteServerMain",
    "ServicesRoute": "Data/Main/RouteServerMain",
    "ServicesDescription":"",
    "Code": `
    public class RouteServerMain
    {
        public const string ServerRoute = "YOUR-URL-MAIN";
    }
    `
  },
  {
    "ID": 7,
    "ServicesName": "VersionsData",
    "ServicesRoute": "Data/Versioning/VersionsData",
    "ServicesDescription":"",
    "Code": `
    public enum VersionType { MinorFixes, MajorFixes, CriticalFixes, AddedFeatures, NewTool }

    public class VersionsData
    {
        public VersionType VersionType { get; set; }
        public string MessageVersion { get; set; }
    }

    public class LPSVersion
    {
        public int VersionNumber { get; set; }
        public string VersionIdentifier { get; set; }

        public List&lt;VersionsData&gt; DataVersion { get; set; }

        public static LPSVersion ActualVersion =&gt; Versions.First();

        public static List&lt;LPSVersion&gt; Versions = new()
        {
            new()
            {
                VersionNumber=30,
                VersionIdentifier= &quot;4.1.1&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Delineaci&oacute;n m&oacute;vil: &lt;/strong&gt; Se han a&ntilde;adido modificaciones a las solicitudes&quot;
                    }
                }
            }
            ,new()
            {
                VersionNumber=29,
                VersionIdentifier= &quot;4.1.0&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Seguimiento E2E: &lt;/strong&gt; Se han a&ntilde;adido versiones a los trabajos&quot;
                    }
                }
            }
            ,new()
            {
                VersionNumber=28,
                VersionIdentifier= &quot;4.0.0&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Global: &lt;/strong&gt; Se ha mejorado la navegaci&oacute;n entre p&aacute;ginas en las tablas. Ahora, al volver atr&aacute;s en el 
    navegador, vuelve a la p&aacute;gina que estaba cargada y, al modificar el tama&ntilde;o a mostrar, volver&aacute; a la primera p&aacute;gina.&quot;
                    },
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Global: &lt;/strong&gt; Ahora se pueden cerrar los multiseleccionables pulsando fuera del mismo&quot;
                    },
                    new()
                    {
                        VersionType = VersionType.MajorFixes,
                        MessageVersion = @&quot;&lt;strong&gt;Visitas m&oacute;vil: &lt;/strong&gt; Se ha solucionado el error que no mostraba todos los usuarios asignados a una 
    visita al modificar el seleccionable&quot;
                    }
                }
            }
            ,new()
            {
                VersionNumber=27,
                VersionIdentifier= &quot;3.2.0&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Global: &lt;/strong&gt; Se ha a&ntilde;adido un bot&oacute;n para seleccionar y deseleccionar todo en los multi-seleccionables&quot;
                    },
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Solicitud de incidencias: &lt;/strong&gt; A partir de ahora se ber&aacute; indicar siempre los datos de Team Viewer parqa crear una solicitud&quot;
                    }
                }
            }
            ,new()
            {
                VersionNumber=26,
                VersionIdentifier= &quot;3.1.8&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Procesos de selecci&oacute;n: &lt;/strong&gt; Se han solucionado los problemas que hac&iacute;an que el dashboard desplegara mal los datos&quot;
                    }
                }
            }
            ,new()
            {
                VersionNumber=25,
                VersionIdentifier= &quot;3.1.7&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Visitas: &lt;/strong&gt; Ahora aparece en la tabla la provincia de la solicitud. A su vez, en la ventana de edici&oacute;n de visitas se puede ver 
                        la provincia y la localidad&quot;
                    }
                }
            }
            ,new()
            {
                VersionNumber=24,
                VersionIdentifier= &quot;3.1.6&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Radioel&eacute;ctricos: &lt;/strong&gt; Ahora los supervisores pueden borrar trabajos&quot;
                    }
                }
            }
            ,new()
            {
                VersionNumber=23,
                VersionIdentifier= &quot;3.1.5&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.MajorFixes,
                        MessageVersion = @&quot;&lt;strong&gt;Seguimiento m&oacute;vil: &lt;/strong&gt; Se ha solucionado el error que no dejaba modificar algunos proyectos&quot;
                    },
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Procesos de selecci&oacute;n: &lt;/strong&gt; Ahora se puede descargar un exportable de los procesos de selecci&oacute;n&quot;
                    }
                }
            }
            ,new()
            {
                VersionNumber=22,
                VersionIdentifier= &quot;3.1.4&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Seguimiento E2E: &lt;/strong&gt; Ahora la fecha objetivo de SLA se calcula autom&aacute;ticamente. Tambi&eacute;n, se ha a&ntilde;adido un desplegable 
    con todos los SLA disponibles&quot;
                    }
                }
            }
            ,new()
            {
                VersionNumber=21,
                VersionIdentifier= &quot;3.1.3&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Seguimiento E2E: &lt;/strong&gt; Se ha a&ntilde;adido un desplegable de estados a la edici&oacute;n de obras. A su vez, se ha eliminado los botones de 
    estado por tarjeta.&quot;
                    }
                }
            }
            ,new()
            {
                VersionNumber=20,
                VersionIdentifier= &quot;3.1.2&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Delineaci&oacute;n: &lt;/strong&gt; Se ha limitado el peso y el n&uacute;mero de caracteres de los archivos que se sub&iacute;an en 
    el bot&oacute;n de checklist&quot;
                    }
                }
            }
            ,new()
            {
                VersionNumber=19,
                VersionIdentifier= &quot;3.1.1&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.AddedFeatures,
                        MessageVersion = @&quot;&lt;strong&gt;Delineaci&oacute;n: &lt;/strong&gt; Se ha activado el env&iacute;o de correos al pasar a estado &quot;&quot;Pre finalizado&quot;&quot; en una 
    solicitud&quot;
                    }
                }
            }
            ,new()
            {
                VersionNumber=18,
                VersionIdentifier= &quot;3.1.0&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.MajorFixes,
                        MessageVersion = @&quot;&lt;strong&gt;General: &lt;/strong&gt; Se ha reajustado las b&uacute;squedas en las ventanas emergentes para que ignore 
    may&uacute;sculas, min&uacute;sculas y tildes. En caso de encontrar alguno no arreglado o que funciona mla, reportarlo.&quot;
                    },
                    new()
                    {
                        VersionType = VersionType.MinorFixes,
                        MessageVersion = @&quot;&lt;strong&gt;Delineaci&oacute;n: &lt;/strong&gt; Se ha reajustado la asignaci&oacute;n autom&aacute;tica&quot;
                    }
                }
            }
            ,new()
            {
                VersionNumber=17,
                VersionIdentifier= &quot;3.0.3&quot;,
                DataVersion = new()
                {
                    new()
                    {
                        VersionType = VersionType.MinorFixes,
                        MessageVersion = @&quot;&lt;strong&gt;Delineaci&oacute;n: &lt;/strong&gt; Se ha reajustado la asignaci&oacute;n autom&aacute;tica&quot;
                    },
                    new()
                    {
                        VersionType = VersionType.MajorFixes,
                        MessageVersion = @&quot;&lt;strong&gt;Seguimiento E2E: &lt;/strong&gt; Se ha a&ntilde;adido la opci&oacute;n de editar el estado de un proyecto&quot;
                    }
                }
            }
        };
    }
    `
  },
  {
    "ID": 8,
    "ServicesName": "PaginatorData",
    "ServicesRoute": "Data/PaginatorData",
    "ServicesDescription":"",
    "Code": `
    public class PaginatorData
    {
        public int Page { get; set; }
    }
    `
  },
  {
    "ID": 9,
    "ServicesName": "PublicSites",
    "ServicesRoute": "Data/PublicSites",
    "ServicesDescription":"",
    "Code": `
    public static class PublicSites
    {
        public static bool IsPublic(this string[] value)
        {
            List&lt;string&gt; PermittedSites = new() { &quot;register&quot;, &quot;login&quot;, &quot;validateemail&quot;, &quot;newpassword&quot;, &quot;identity&quot;, &quot;forgotpassword&quot;, &quot;StatusCode&quot;, &quot;DocForm&quot; };

            if (PermittedSites.Select(x=&gt; x.Split('?')[0]).Intersect(value).Any())
            {
                return true;
            }

            return false;
        }

        public static bool IsMainHeader(this string[] value)
        {
            List&lt;string&gt; PermittedSites = new() { &quot;register&quot;, &quot;login&quot;, &quot;validateemail&quot;, &quot;newpassword&quot;, &quot;identity&quot;, &quot;forgotpassword&quot;, &quot;rrhh&quot;, &quot;administracion&quot;
                ,&quot;movil&quot;, &quot;redfija&quot; };

            if (PermittedSites.Select(x =&gt; x.Split('?')[0]).Intersect(value).Any())
            {
                return true;
            }

            return false;
        }

        public static bool IsMainLinks(this string[] value)
        {
            List&lt;string&gt; PermittedSites = new() { &quot;rrhh&quot;, &quot;administracion&quot;, &quot;movil&quot;, &quot;redfija&quot; };

            if (PermittedSites.Select(x =&gt; x.Split('?')[0]).Intersect(value).Any())
            {
                return true;
            }

            return false;
        }
    }
    `
  },
  {
    "ID": 10,
    "ServicesName": "Snackbar",
    "ServicesRoute": "Data/Snackbar",
    "ServicesDescription":"",
    "Code": `
    public class Snackbar
    {
        public string IdSnackbar { get; set; }
        public string message { get; set; }
        public string icon { get; set; }
        public int duration { get; set; }
        public string color { get; set; }
        public string textcolor { get; set; }
        public float Opacity { get; set; }
        public Snackbar(string message, string icon, int duration, string color, string textcolor, string guid = &quot;&quot;)
        {
            if (string.IsNullOrEmpty(guid))
            {
                IdSnackbar = Guid.NewGuid().ToString();
            }

            this.message = message;
            this.icon = icon;
            this.duration = duration;
            this.color = color;
            this.textcolor = textcolor;

            Opacity = 100;
        }
    }
    `
  }  
]

// Variables para la paginación
let currentPage = 1;
const itemsPerPage = 5;
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
                        <h2 class="app-title"><i class="fa-solid fa-cube"></i> ${app.ServicesName}</h2>
                        <p class="app-description">${app.ServicesDescription}</p>
                        <div class="app-route"><i class="fa-solid fa-link"></i> Ruta: ${app.ServicesRoute}</div>
                        <div class="app-meta">
                            <span class="app-meta-item"><i class="fa-solid fa-hashtag"></i> ID: ${app.ID}</span>
                            <span class="app-meta-item"><i class="fa-solid fa-code-branch"></i> Versión: 1.0</span>
                            <span class="app-meta-item"><i class="fa-solid fa-calendar-check"></i> Última actualización: 2025-05-13</span>
                        </div>
                    </div>
                    <div class="code-container">
                        <div class="code-header">
                            <span class="code-title">${app.ServicesName}.cs</span>
                            <button class="code-copy" onclick="copyCode(this)">
                                <i class="fa-regular fa-copy"></i> Copiar
                            </button>
                        </div>
                        <pre class="code-content"><code class="lang-csharp">${app.Code}</code></pre>
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
        app.ServicesName.toLowerCase().includes(searchTerm) || 
        app.ServicesDescription.toLowerCase().includes(searchTerm) ||
        app.ServicesRoute.toLowerCase().includes(searchTerm)
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