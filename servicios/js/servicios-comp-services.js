const data = [
  {
    "ID": 1,
    "ServicesName": "DisconnectionService",
    "ServicesRoute": "Services/ImportsServices/DisconnectionService",
    "ServicesDescription":"",
    "Code": `
    using Blazored.LocalStorage;
    public class DisconnectionService
    {
        public Action SaveStatus { get; set; }
    }
    `
  },
    {
    "ID": 2,
    "ServicesName": "MainService",
    "ServicesRoute": "Services/ImportsServices/MainService",
    "ServicesDescription":"",
    "Code": `
    using Microsoft.AspNetCore.Components;
    using System.Collections.Specialized;
    using System.Web;

    public class MainService
    {
        public int OffsetHoursTime { get; set; }

        private bool loading { get; set; }

        public bool IsLoading
        {
            get { return loading; }
            set
            {
                loading = value;
                LoadingAction();
            }
        }

        string backgroundImage { get; set; }
        public string BackgroundImage
        {
            get { return backgroundImage; }
            set
            {
                backgroundImage = value;
                BackgroundChanged();
            }
        }
        public Action BackgroundChanged { get; set; }

        bool expanded { get; set; }
        public bool Expanded
        {
            get { return expanded; }
            set
            {
                expanded = value;
                ExpandedChanged();
            }
        }
        public Action ExpandedChanged { get; set; }

        public string RedirectURL { get; set; } = &quot;&quot;;
        bool firstCheck { get; set; }
        public bool FirstCheck
        {
            get { return firstCheck; }
            set
            {
                firstCheck = value;
                LoginReloadAction();
            }
        }
        public Action LoginReloadAction { get; set; }


        public Action LoadingAction;

        public string Token { get; set; }
        public string RefreshToken { get; set; }

        public NameValueCollection QueryParameters(NavigationManager _nav)
        {
            return HttpUtility.ParseQueryString(new Uri(_nav.Uri).Query);
        }

        public string IconsMap(int indexStatus) =&gt; indexStatus switch
        {
            1 =&gt; &quot;pin_question.png&quot;,
            2 =&gt; &quot;pin_question.png&quot;,
            3 =&gt; &quot;pin_question.png&quot;,
            4 =&gt; &quot;pin_question.png&quot;,
            5 =&gt; &quot;pin.png&quot;,
            6 =&gt; &quot;pin_working.png&quot;,
            7 =&gt; &quot;pin_stop.png&quot;,
            8 =&gt; &quot;pin_cancel.png&quot;,
            9 =&gt; &quot;pin_check.png&quot;,
            10 =&gt; &quot;pin_access.png&quot;,
            11 =&gt; &quot;pin_access.png&quot;,
        };
    }
    `
  },
    {
    "ID": 3,
    "ServicesName": "ModalServices",
    "ServicesRoute": "Services/ImportsServices/ModalServices",
    "ServicesDescription":"",
    "Code": `
    using Microsoft.AspNetCore.Components;
    using MongoDB.Driver;

    public class ModalServices
    {
        public Action&lt;ModalData&gt; AddModal { get; set; }
        public ModalData ShowModal(Type componentType, IDictionary&lt;string, object&gt; parameters, int MaxWidth = 0, int FixedWidth = -100, int MaxHeight= 80, bool CanClose = true)
        {
            ModalData data = new(componentType, parameters, MaxWidth, FixedWidth, MaxHeight, CanClose);

            AddModal(data);

            return data;
        }
    }

    public class ModalData
    {
        public string Id { get; private set; }
        public Type Component { get; set; }
        public IDictionary&lt;string, object&gt; Parameters { get; set; }
        public DynamicComponent DynamicComponent { get; set; }
        public bool IsOpen { get; set; } = true;
        public bool CanClose { get; set; } = true;
        public int MaxWidth { get; set; }
        public int FixedWidth { get; set; }
        public int MaxHeight { get; set; }
        public Action&lt;bool&gt; OnCloseModal { get; set; }
        public ModalData(Type t, IDictionary&lt;string, object&gt; p, int maxWidth, int fixedWidth, int maxHeight, bool canClose)
        {
            Id = Guid.NewGuid().ToString();
            Component = t;
            Parameters = p;
            MaxWidth = maxWidth;
            FixedWidth = fixedWidth;
            MaxHeight = maxHeight;
            CanClose = canClose;
        }
    }
    `
  },
    {
    "ID": 4,
    "ServicesName": "RealtimeUpdate",
    "ServicesRoute": "Services/ImportsServices/RealtimeUpdate",
    "ServicesDescription":"",
    "Code": `
    using Microsoft.AspNetCore.Components;
    public class RealtimeUpdate
    {
    }
    `
  },
    {
    "ID": 5,
    "ServicesName": "HttpService",
    "ServicesRoute": "Services/HttpService",
    "ServicesDescription":"",
    "Code": `
    using System.Net.Http.Headers;
    public static class HttpService
    {
        public const string BaseUrlUsers = &quot;https://main.lpsgrupo.dev/api&quot;;

        public static async Task&lt;Result&lt;string&gt;&gt; GetToken(this HttpClient client, string refreshToken)
        {
            var response = await client.GetAsync($&quot;{BaseUrlUsers}/User/gettokenrefreshed?code={refreshToken}&quot;);

            return await response.Content.ReadFromJsonAsync&lt;Result&lt;string&gt;&gt;();
        }

        public static async Task&lt;PaginatedResult&lt;EditUserDTORequest&gt;&gt; GetUsers(this HttpClient client, string token)
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(&quot;Bearer&quot;, token);
            var response = await client.PostAsJsonAsync($&quot;{BaseUrlUsers}/User/getpaginated&quot;, new GetPaginatedUserDTORequest()
            {
                PageNumber = 1,
                PageSize = 1000000,
                Search = &quot;&quot;,
                Roles = new()
            });

            return await response.Content.ReadFromJsonAsync&lt;PaginatedResult&lt;EditUserDTORequest&gt;&gt;();
        }

        public static async Task&lt;PaginatedResult&lt;VisitasLogic.EditUserDTORequest&gt;&gt; GetUsersVisitas(this HttpClient client, string token)
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(&quot;Bearer&quot;, token);
            var response = await client.PostAsJsonAsync($&quot;{BaseUrlUsers}/User/getpaginated&quot;, new GetPaginatedUserDTORequest()
            {
                PageNumber = 1,
                PageSize = 1000000,
                Search = &quot;&quot;,
                Roles = new()
            });

            return await response.Content.ReadFromJsonAsync&lt;PaginatedResult&lt;VisitasLogic.EditUserDTORequest&gt;&gt;();
        }
    }
    `
  },
    {
    "ID": 6,
    "ServicesName": "LoadServices",
    "ServicesRoute": "Services/LoadServices",
    "ServicesDescription":"",
    "Code": `
    using Blazored.LocalStorage;
    public static class LoadServices
    {
        public static IServiceCollection loadServices(this IServiceCollection services)
        {
            services.AddScoped&lt;MainService&gt;();
            services.AddScoped&lt;SnackbarSystem&gt;();
            services.AddBlazoredLocalStorage();
            services.AddScoped&lt;HttpClient&gt;();
            services.AddScoped&lt;ModalServices&gt;();
            services.AddScoped&lt;DisconnectionService&gt;();

            return services;
        }
    }
    `
  },
    {
    "ID": 7,
    "ServicesName": "SnackbarSystem",
    "ServicesRoute": "Services/SnackbarSystem",
    "ServicesDescription":"",
    "Code": `
    using Microsoft.JSInterop;
    public class SnackbarSystem
    {
        public SnackbarSystem(IJSRuntime js)
        {
            _js = js;
        }
        public IJSRuntime _js { get; set; }
        public List&lt;Snackbar&gt; Snackbars { get; set; } = new();

        public void ModifySnackbarMessage(string id, string newMessage)
        {
            Snackbars.First(x =&gt; x.IdSnackbar == id).message = newMessage;
            _js.InvokeAsync&lt;string&gt;(&quot;ChangeInnerHTML&quot;, $&quot;snackbar{id}&quot;, newMessage);
        }

        public async Task CloseSnackbar(string guid)
        {
            Snackbars.First(x =&gt; x.IdSnackbar == guid).Opacity = 0;
            _js.InvokeAsync&lt;string&gt;(&quot;ChangeOpacitySnackbar&quot;, $&quot;topSnackbar{guid}&quot;, 0);
            await Task.Delay(4000);

            Snackbars.Remove(Snackbars.First(x =&gt; x.IdSnackbar == guid));

            _js.InvokeAsync&lt;string&gt;(&quot;RemoveElement&quot;, $&quot;topSnackbar{guid}&quot;);
        }

        public async Task&lt;string&gt; InsertSnackbar(Snackbar snackbar)
        {
            _js.InvokeAsync&lt;string&gt;(&quot;PlaceMessageOnConsole&quot;, &quot;Entro&quot;);
            Snackbars.Add(snackbar);

            string snackbarTemplate = $@&quot;        &lt;div id=&quot;&quot;topSnackbar{snackbar.IdSnackbar}&quot;&quot; class=&quot;&quot;w-full h-fit rounded pointer-events-none p-1 grid grid-cols-12 items-center {snackbar.color}&quot;&quot; style=&quot;&quot;opacity: {snackbar.Opacity}&quot;&quot;&gt;
                &lt;span class=&quot;&quot;material-symbols-outlined {snackbar.textcolor} col-span-2 p-2&quot;&quot;&gt;
                {snackbar.icon}
                &lt;/span&gt;

                &lt;span id=&quot;&quot;snackbar{snackbar.IdSnackbar}&quot;&quot; class=&quot;&quot;col-span-10 p-2 {snackbar.textcolor} text-sm&quot;&quot;&gt;
                {snackbar.message}
                &lt;/span&gt;
                &lt;/div&gt;&quot;;

            _js.InvokeAsync&lt;string&gt;(&quot;CreateSnackbarElement&quot;, snackbarTemplate, snackbar.IdSnackbar);

            TrackSnackBar(snackbar.IdSnackbar);

            return snackbar.IdSnackbar;
        }


        async Task TrackSnackBar(string guid)
        {
            await Task.Delay(Snackbars.First(x =&gt; x.IdSnackbar == guid).duration);
            if (!Snackbars.Any(x =&gt; x.IdSnackbar == guid)) return;

            Snackbars.First(x =&gt; x.IdSnackbar == guid).Opacity = 0;
            _js.InvokeAsync&lt;string&gt;(&quot;ChangeOpacitySnackbar&quot;, $&quot;topSnackbar{guid}&quot;, 0);

            await Task.Delay(4000);
            if (!Snackbars.Any(x =&gt; x.IdSnackbar == guid)) return;

            Snackbars.Remove(Snackbars.First(x =&gt; x.IdSnackbar == guid));
            _js.InvokeAsync&lt;string&gt;(&quot;RemoveElement&quot;, $&quot;topSnackbar{guid}&quot;);
        }
        
        public Action ModifiedSnackbars;
    }
    `
  },
]


// Variables para la paginación
let currentPage = 1;
const itemsPerPage = 4;
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