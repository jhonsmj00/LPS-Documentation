const data = [
  {
    "ID": 1,
    "ServicesName": "AuthorizedContent",
    "ServicesRoute": "Components/Components/AuthorizedContent",
    "ServicesDescription":"",
    "Code": `
    @if (pass)
    {
        @ChildContent
    }

    @code {
        [Parameter] public RenderFragment ChildContent { get; set; }

        [Parameter]
        public List&lt;string&gt; Roles { get; set; } = null;

        [Parameter]
        public string Permissions { get; set; } = null;

        bool pass = false;

        protected override void OnInitialized()
        {
            _main.LoginReloadAction += () =&gt; InvokeAsync(StateHasChanged);

            if (_user.Roles != null &amp;&amp; _user.Permissions != null)
            {
                CanPass();
            }
        }

        protected override void OnAfterRender(bool firstRender)
        {
            if (_user.Roles != null &amp;&amp; _user.Permissions != null)
            {
                CanPass();
            }
        }

        void CanPass()
        {
            //Esta parte hace que el rol admin tenga acceso a todo
            if (_user.Roles.Contains(&quot;Admin&quot;))
            {
                pass = true;
                return;
            }

            if (Roles != null &amp;&amp; _user.Roles != null)
            {
                foreach (var v in Roles)
                {
                    if (_user.Roles.Contains(v))
                    {
                        pass = true;
                        return;
                    }
                }

                pass = false;
                return;
            }
            else if (Permissions != null &amp;&amp; _user.Permissions != null)
            {
                if (_user.Permissions.Contains(Permissions))
                {
                    pass = true;
                    return;
                }

                pass = false;
                return;
            }
            else
            {
                if (string.IsNullOrEmpty(_main.Token))
                {
                    pass = false;
                    return;
                }
            }

            pass = true;
        }

    }
    `
  },
  {
    "ID": 2,
    "ServicesName": "AuthorizePage",
    "ServicesRoute": "Components/Components/AuthorizePage",
    "ServicesDescription":"",
    "Code": `
    @code {
        [Parameter]
        public List&lt;string&gt; Roles { get; set; } = null;

        [Parameter]
        public string Permissions { get; set; } = null;

        protected override void OnAfterRender(bool firstCheck)
        {
            if (firstCheck)
            {
                _main.LoginReloadAction += () =&gt; InvokeAsync(StateHasChanged);
            }

            if (_user.Roles != null &amp;&amp; _user.Permissions != null)
            {
                CanPass();
            }
        }

        void CanPass()
        {
            if (_user.Roles.Contains(&quot;Admin&quot;))
            {
                return;
            }

            if (Roles != null &amp;&amp; _user.Roles != null)
            {
                foreach (var v in Roles)
                {
                    if (_user.Roles.Contains(v))
                    {
                        return;
                    }
                }

                _nav.NavigateTo(&quot;/NonAuthorized&quot;);
                return;
            }
            else if (Permissions != null &amp;&amp; _user.Permissions != null)
            {
                if (_user.Permissions.Contains(Permissions))
                {
                    return;
                }

                _nav.NavigateTo(&quot;/NonAuthorized&quot;);
                return;
            }
            else
            {
                if (string.IsNullOrEmpty(_main.Token))
                {
                    _nav.NavigateTo(&quot;/NonAuthorized&quot;);
                    return;
                }
            }
        }

    }
    `
  },
  {
    "ID": 3,
    "ServicesName": "Autocomplete",
    "ServicesRoute": "Components/Components/Autocomplete",
    "ServicesDescription":"",
    "Code": `
    @using System.Linq.Expressions;
    @typeparam T where T : AuditableEntity&lt;string&gt;

    &lt;div class=&quot;relative w-full @(MaxWidth != 0 ? $&quot;max-w-[{MaxWidth}px]&quot; : &quot;&quot;) h-fit&quot;&gt;
        @if (selectedOne == null)
        {
            &lt;input type=&quot;search&quot; placeholder=&quot;@Placeholder&quot; class=&quot;w-full shadow-md p-2 border-slate-300/50 @(dataServer.Count &gt; 0 ? &quot;rounded-t border-t&quot; : &quot;rounded border&quot;)&quot;
                @oninput=&quot;@((e)=&gt; {if(e.Value != null) {Search =  string.IsNullOrEmpty(e.Value.ToString()) ? &quot;&quot; : e.Value.ToString();}})&quot; /&gt;

            &lt;div class=&quot;absolute flex flex-col w-full max-h-[400px] border-slate-300/50 overflow-y-auto top-[100%] rounded-b bg-slate-50
    @(dataServer.Count &gt; 0 ? &quot;h-fit border-x border-b&quot; : &quot;h-0&quot;) z-[10000000000000]&quot;&gt;

                @foreach (var item in dataServer.AsQueryable&lt;T&gt;().Select(ToString).ToList())
                {
                    &lt;div class=&quot;w-full p-2 border-y border-slate-300/50 text-blue-400 cursor-pointer&quot;
                        @onclick=&quot;@(()=&gt; {if(!Ignore){selectedOne = dataServer[dataServer.AsQueryable&lt;T&gt;().Select(ToString).ToList().IndexOf(item)];TextSelectedOne = item;
                        SelectOne.InvokeAsync(selectedOne); InvokeAsync(StateHasChanged);}
                        else{SelectOne.InvokeAsync(dataServer[dataServer.AsQueryable&lt;T&gt;().Select(ToString).ToList().IndexOf(item)]);
                            Search=&quot;&quot;; InvokeAsync(StateHasChanged);}})&quot;&gt;
                        @item
                    &lt;/div&gt;
                }
            &lt;/div&gt;
        }
        else
        {
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border-slate-300/50 rounded border
            @(MaxWidth != 0 ? $&quot;max-w-[{MaxWidth}px]&quot; : &quot;&quot;)&quot; @bind-value=&quot;TextSelectedOne&quot; readonly /&gt;

            &lt;button type=&quot;button&quot; class=&quot;p-2 absolute right-[2%] top-0 h-full flex flex-wrap justify-center items-center&quot; @onclick=&quot;@(()=&gt;{selectedOne = default; TextSelectedOne=&quot;&quot;;
                SelectOne.InvokeAsync(null);dataServer = new(); Search = &quot;&quot;; InvokeAsync(StateHasChanged);})&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined text-red-600&quot;&gt;
                    close
                &lt;/span&gt;
            &lt;/button&gt;
        }
    &lt;/div&gt;
    @code {
        /// &lt;summary&gt;
        /// Evento que se invoca fuera del componente y que transporta el objeto seleccionado de la lista
        /// &lt;/summary&gt;
        [Parameter] public EventCallback&lt;T&gt; SelectOne { get; set; }
        /// &lt;summary&gt;
        /// Expresi&oacute;n lambda para desplegar en pantalla el texto referente a las propiedades de T
        /// &lt;/summary&gt;
        [Parameter] public Expression&lt;Func&lt;T, string&gt;&gt; ToString { get; set; }

        [Parameter] public Func&lt;string, MongoDB.Driver.FilterDefinition&lt;T&gt;&gt; FilterMongo { get; set; }
        [Parameter] public string Database { get; set; }
        /// &lt;summary&gt;
        /// Nombre &uacute;nico para cada autocomplete en una p&aacute;gina, de esta forma SignalR reconoce a qui&eacute;n enviar la respuesta
        /// &lt;/summary&gt;
        [Parameter] public string Identifier { get; set; }
        /// &lt;summary&gt;
        /// Si en la primera carga del componente hay un valor asignado, este es el texto que se renderiza en el inicio
        /// &lt;/summary&gt;
        [Parameter] public string InitialTextValue { get; set; }
        /// &lt;summary&gt;
        /// Variable inicial del componente
        /// &lt;/summary&gt;
        [Parameter] public T InitialValue { get; set; }

        [Parameter] public int MaxWidth { get; set; } = 0;
        [Parameter] public string Placeholder { get; set; }
        [Parameter]
        public bool Ignore { get; set; } = false;

        T selectedOne = null;
        string TextSelectedOne = &quot;&quot;;
        string getSearch { get; set; }



        string Search
        {
            get
            {
                return getSearch;
            }
            set
            {
                getSearch = value.ToLower();
                SearchDataInApi();
            }
        }

        protected override async Task OnParametersSetAsync()
        {
            if (InitialValue != null &amp;&amp; !string.IsNullOrEmpty(InitialTextValue))
            {
                selectedOne = InitialValue;
                TextSelectedOne = InitialTextValue;
            }

            await InvokeAsync(StateHasChanged);
        }

        List&lt;T&gt; dataServer = new();

        async Task SearchDataInApi()
        {
            try
            {
                if (Search.Length &lt; 3)
                        {
                            dataServer.Clear();
                            return;
                        }

                        getSearch = getSearch.Replace(&quot;a&quot;, &quot;[a&aacute;]&quot;).Replace(&quot;e&quot;, &quot;[e&eacute;]&quot;).Replace(&quot;i&quot;, &quot;[i&iacute;]&quot;).Replace(&quot;o&quot;, &quot;[o&oacute;]&quot;).Replace(&quot;u&quot;, &quot;[u&uacute;]&quot;);

                        dataServer = _mongoContext.Data&lt;T&gt;(Database).Find(FilterMongo(Search),
                        new FindOptions() { Collation = new Collation(&quot;es&quot;, strength: CollationStrength.Primary, caseLevel: true) }).ToList();

                        await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Autocomplete&quot;, &quot;SearchDataInApi&quot;, DateTime.UtcNow);

                throw;
            }
            
        }
    }
    `
  },
  {
    "ID": 4,
    "ServicesName": "BaseModal",
    "ServicesRoute": "Components/Components/BaseModal",
    "ServicesDescription":"",
    "Code": `
    &lt;div class=&quot;fixed w-full h-full top-0 left-0 @(IsOpen ? &quot;ShowModal&quot; : &quot;opacity-0 pointer-events-none&quot;) flex justify-center items-center
        bg-black/50 transition-all duration-300&quot;
        style=&quot;z-index: @(ZIndex)&quot;&gt;
        &lt;!-- Fondo clicable transparente --&gt;
        &lt;div class=&quot;absolute w-full h-full bg-transparent top-0 left-0&quot; style=&quot;z-index: @(ZIndex+1)&quot;&gt;
        &lt;/div&gt;

        &lt;!-- Contenedor del modal --&gt;
        &lt;div class=&quot;@(FixedWidth == -100 ? $&quot;max-w-[{Width}%] w-fit&quot; : $&quot;w-[{FixedWidth}%]&quot;) relative h-fit max-h-[@(MaxHeight)%]
        bg-white shadow-md border border-slate-300/50 overflow-auto rounded-xl transition-transform duration-300 transform @(IsOpen ? &quot;scale-100&quot; : &quot;scale-95&quot;)&quot;
            style=&quot;z-index: @(ZIndex+2)&quot;&gt;
            &lt;!-- Bot&oacute;n de cierre --&gt;
            @if (CanClose)
            {
                &lt;div class=&quot;absolute top-[15px] right-[15px] p-2 flex items-center justify-center text-blue-400 cursor-pointer hover:text-blue-600&quot;
                    style=&quot;z-index: @(ZIndex+3)&quot; @onclick=&quot;()=&gt;{if(CanClose) {Close(false);}}&quot;&gt;
                    &lt;span class=&quot;text-lg font-bold&quot;&gt;X&lt;/span&gt;

                &lt;/div&gt;
            }
            &lt;!-- Contenido del modal --&gt;
            &lt;div class=&quot;flex flex-wrap h-fit max-h-full w-full p-6 gap-3&quot;&gt;
                @ChildContent
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;


    @code {
        [Parameter] public bool IsOpen { get; set; }
        [Parameter] public bool CanClose { get; set; }
        [Parameter] public RenderFragment ChildContent { get; set; }
        [Parameter] public int Width { get; set; }
        [Parameter] public int FixedWidth { get; set; } = -100;
        [Parameter] public int MaxHeight { get; set; }
        [Parameter] public long ZIndex { get; set; } = 10;
        [Parameter] public Action&lt;bool&gt; Close { get; set; }
    }

    `
  },
  {
    "ID": 5,
    "ServicesName": "Body",
    "ServicesRoute": "Components/Components/Body",
    "ServicesDescription":"",
    "Code": `
    &lt;div id=&quot;page&quot; class=&quot;mt-[55px] w-full @(!_main.Expanded ? &quot;&quot; : &quot;sm:ml-[20%] xl:ml-[15%] sm:w-[75%] xl:w-[85%]&quot;)&quot;&gt;
        @ChildContent
    &lt;/div&gt;

    @code {
        [Parameter] public RenderFragment ChildContent { get; set; }

        protected override async Task OnInitializedAsync()
        {
            _main.ExpandedChanged += () =&gt; InvokeAsync(StateHasChanged);
        }
    }
    `
  },
  {
    "ID": 6,
    "ServicesName": "Breadcrumb",
    "ServicesRoute": "Components/Components/Breadcrumb",
    "ServicesDescription":"",
    "Code": `
    @inherits LayoutComponentBase
    @inject NavigationManager NavigationManager

    @* &lt;div class=&quot;flex items-center space-x-2 text-sm text-gray-600 bg-blue-400/50 rounded-md border-2 border-white shadow-inner shadow-black px-6 py-2&quot;&gt;*@
        &lt;a href=&quot;/&quot; class=&quot;text-white hover:text-blue-600&quot;&gt;Inicio&lt;/a&gt;

        @foreach (var item in BreadcrumbHistory)
        {
            &lt;span&gt;/&lt;/span&gt;
            @if (item.Url == CurrentUrl)
            {
                &lt;span class=&quot;text-white text-blue-600&quot;&gt;@item.Label&lt;/span&gt;
            }
            else
            {
                &lt;a href=&quot;@item.Url&quot; class=&quot;text-white hover:text-blue-600&quot;&gt;@item.Label&lt;/a&gt;
            }
        }
    @* &lt;/div&gt;*@

    @code {
        private string CurrentUrl =&gt; NavigationManager.Uri.Replace(NavigationManager.BaseUri, &quot;&quot;);
        private List&lt;BreadcrumbItem&gt; BreadcrumbHistory = new();

        protected override void OnInitialized()
        {
            NavigationManager.LocationChanged += (sender, args) =&gt; UpdateBreadcrumb();
            UpdateBreadcrumb();
        }

        private void UpdateBreadcrumb()
        {
            BreadcrumbHistory.Clear();

            // Obtener la ruta actual y validar si tiene @page
            var currentRoute = GetCurrentPageRoute();
            if (string.IsNullOrEmpty(currentRoute)) return; // No actualizar si no hay ruta

            var segments = currentRoute.Split('/', StringSplitOptions.RemoveEmptyEntries);

            var accumulatedPath = &quot;&quot;;
            foreach (var segment in segments)
            {
                accumulatedPath += $&quot;/{segment}&quot;;
                var title = FormatLabel(segment);

                if (!BreadcrumbHistory.Any(b =&gt; b.Url == accumulatedPath))
                {
                    BreadcrumbHistory.Add(new BreadcrumbItem
                        {
                            Label = title,
                            Url = accumulatedPath
                        });
                }
            }

            StateHasChanged();
        }

        private string? GetCurrentPageRoute()
        {
            // Buscar el componente que coincida con la URL actual
            var pageType = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(a =&gt; a.GetTypes())
                .FirstOrDefault(t =&gt; t.GetCustomAttributes(typeof(RouteAttribute), false)
                    .Any(attr =&gt; NavigationManager.Uri.EndsWith(((RouteAttribute)attr).Template, StringComparison.OrdinalIgnoreCase)));

            // Retornar la ruta si existe
            return pageType?.GetCustomAttributes(typeof(RouteAttribute), false)
                .Cast&lt;RouteAttribute&gt;()
                .FirstOrDefault()?.Template;
        }

        private string FormatLabel(string segment)
        {
            // Convierte 'red-fija' en 'Red Fija'
            return string.Join(&quot; &quot;, segment.Split('-').Select(s =&gt; char.ToUpper(s[0]) + s[1..]));
        }

        public class BreadcrumbItem
        {
            public string Label { get; set; } = &quot;&quot;;
            public string Url { get; set; } = &quot;&quot;;
        }
    }

    `
  },
  {
    "ID": 7,
    "ServicesName": "Checkbox",
    "ServicesRoute": "Components/Components/Checkbox",
    "ServicesDescription":"",
    "Code": `
    &lt;div class=&quot;p-3 flex items-center w-fit h-fit gap-3 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md shadow-sm&quot;
        @onclick=&quot;()=&gt;{ChangeCheck(); InvokeAsync(StateHasChanged);}&quot;&gt;
        @if (Checked)
        {
            &lt;span class=&quot;material-symbols-outlined text-teal-500 unselectable @(FontSize)&quot;&gt;
                check_circle
            &lt;/span&gt;
        }
        else
        {
            &lt;span class=&quot;material-symbols-outlined text-red-500 unselectable @(FontSize)&quot;&gt;
                cancel
            &lt;/span&gt;
        }

        &lt;span class=&quot;unselectable text-gray-700 font-medium @(FontSize)&quot;&gt;@((MarkupString)Message)&lt;/span&gt;
    &lt;/div&gt;


    @code {
        [Parameter] public bool Checked { get; set; }
        [Parameter] public string FontSize { get; set; }
        [Parameter] public string Message { get; set; }
        [Parameter] public Action ChangeCheck { get; set; }

    }
    `
  },
  {
    "ID": 8,
    "ServicesName": "ConfirmationModal",
    "ServicesRoute": "Components/Components/ConfirmationModal",
    "ServicesDescription":"",
    "Code": `
    &lt;span class=&quot;w-full text-xl font-bold text-blue-400&quot;&gt;@Title&lt;/span&gt;
    &lt;span&gt;@Message&lt;/span&gt;
    &lt;div class=&quot;w-full flex justify-end gap-x-3&quot;&gt;
        &lt;button class=&quot;rounded py-2 px-4 bg-red-600 text-white&quot; @onclick=&quot;()=&gt; Close(false)&quot;&gt;Cancelar&lt;/button&gt;
        &lt;button class=&quot;rounded py-2 px-4 bg-blue-400 text-white&quot; @onclick=&quot;()=&gt; Close(true)&quot;&gt;Confirmar&lt;/button&gt;
    &lt;/div&gt;


    @code {
        [Parameter]
        public string Title { get; set; }

        [Parameter]
        public string Message { get; set; }

        [CascadingParameter]
        public Action&lt;bool&gt; Close { get; set; }
    }
    `
  },
  {
    "ID": 9,
    "ServicesName": "HeaderLG",
    "ServicesRoute": "Components/Components/HeaderLG",
    "ServicesDescription":"",
    "Code": `
    &lt;header class=&quot;fixed w-full h-[55px] top-0 py-[10px] px-[20px] @(PublicSites.IsMainHeader(_nav.Uri.Split('/')) ? &quot;bg-transparent&quot; : &quot;bg-blue-400&quot;) opacity-100 flex flex-wrap justify-between&quot; style=&quot;z-index: 10000000000000000;&quot;&gt;
        &lt;div class=&quot;flex flex-wrap items-center h-full gap-5&quot;&gt;
            &lt;img src=&quot;./Images/Base/logoBlanco.png&quot; class=&quot;h-full w-auto cursor-pointer&quot; @onclick=&quot;@(()=&gt; _nav.NavigateTo(&quot;/&quot;))&quot; /&gt;
            &lt;span class=&quot;material-symbols-outlined cursor-pointer text-white hover:text-slate-200&quot; @onclick=&quot;()=&gt; NavBarJS()&quot;&gt;
                menu
            &lt;/span&gt;
        &lt;/div&gt;
        &lt;div class=&quot;flex flex-wrap items-center h-full gap-5&quot;&gt; 
            &lt;Breadcrumb /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;flex flex-wrap items-center h-full gap-[15px]&quot;&gt;

            @if (string.IsNullOrEmpty(_user.id))
            {
                &lt;a href=&quot;/login&quot; class=&quot;text-base text-slate-50 hover:text-slate-300 cursor-pointer&quot;&gt;Iniciar sesi&oacute;n&lt;/a&gt;
            @*    &lt;a href=&quot;/register&quot; class=&quot;text-base text-slate-50 hover:text-slate-300 cursor-pointer&quot;&gt;Registro&lt;/a&gt; *@
            }
            else
            {
                &lt;a class=&quot;text-base text-slate-50 hover:text-slate-300 cursor-pointer&quot; @onclick=&quot;CloseSession&quot;&gt;Cerrar sesi&oacute;n&lt;/a&gt;

                @if (!string.IsNullOrEmpty(_user.profilePic))
                {
                    &lt;a href=&quot;/account&quot; class=&quot;rounded-full h-full aspect-square cursor-pointer&quot;
                    style=&quot;background-image: url(@(_user.profilePic)); background-size: cover;&quot; /&gt;
                }
            }
        &lt;/div&gt;
    &lt;/header&gt;

    @if (PublicSites.IsMainLinks(_nav.Uri.Split('/')))
    {
        &lt;div class=&quot;fixed w-full h-[75px] top-[55px] py-[10px] px-[20px] grid lg:grid-cols-12 xl:grid-cols-8 z-10&quot;&gt;

            @if (!string.IsNullOrEmpty(_user.id))
            {
                &lt;div class=&quot;col-span-1 h-full&quot;&gt;&lt;/div&gt;

                &lt;div class=&quot;relative lg:col-span-10 xl:col-span-6 grid grid-cols-6 text-white lg:text-base xl:text-xl&quot;&gt;
                    &lt;hr class=&quot;absolute top-[-2px] left-0 w-full h-[2px] bg-white&quot; /&gt;
                    &lt;a href=&quot;/rrhh&quot; class=&quot;col-span-1 h-full flex flex-wrap items-center justify-center&quot;&gt;
                        Recursos humanos
                    &lt;/a&gt;

                    &lt;a href=&quot;/administracion&quot; class=&quot;col-span-1 h-full flex flex-wrap items-center justify-center&quot;&gt;
                        Administraci&oacute;n
                    &lt;/a&gt;

                    &lt;a href=&quot;/movil&quot; class=&quot;col-span-1 h-full flex flex-wrap items-center justify-center&quot;&gt;
                        M&oacute;vil
                    &lt;/a&gt;

                    &lt;a href=&quot;/redfija&quot; class=&quot;col-span-1 h-full flex flex-wrap items-center justify-center&quot;&gt;
                        Red fija
                    &lt;/a&gt;

                    &lt;a href=&quot;/soporte&quot; class=&quot;col-span-1 h-full flex flex-wrap items-center justify-center&quot;&gt;
                        Soporte
                    &lt;/a&gt;

                    &lt;a href=&quot;/account&quot; class=&quot;col-span-1 h-full flex flex-wrap items-center justify-center gap-3&quot;&gt;
                        @if (!string.IsNullOrEmpty(_user.profilePic))
                        {
                            &lt;div class=&quot;rounded-full h-[75%] aspect-square cursor-pointer p-3&quot;
                                style=&quot;background-image: url(@(_user.profilePic)); background-size: cover;&quot; /&gt;
                        }
                    &lt;/a&gt;
                &lt;/div&gt;

                &lt;div class=&quot;col-span-1 h-full&quot;&gt;&lt;/div&gt;
            }
        &lt;/div&gt;
    }

    &lt;div id=&quot;navbar&quot; class=&quot;fixed h-[calc(100dvh_-_55px)] top-[55px] sm:w-[20%] xl:w-[15%] @(_main.Expanded ? &quot;OpenNavbar&quot; : &quot;CloseNavbar&quot;) shadow-xl bg-slate-50 z-[10000]&quot;&gt;
        &lt;NavBar&gt;&lt;/NavBar&gt;
    &lt;/div&gt;


    @code {
        [Parameter] public RenderFragment ChildContent { get; set; }
        protected override async Task OnInitializedAsync()
        {
            _main.LoginReloadAction += () =&gt; InvokeAsync(StateHasChanged);
            _nav.LocationChanged += (e, d) =&gt; InvokeAsync(StateHasChanged);
        }
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (!firstRender) return;

            await Task.Delay(500);

            await NavBarJS();

        await InvokeAsync(StateHasChanged);
        }

        async Task NavBarJS()
        {
            _main.Expanded = !_main.Expanded;
        }

        async Task CloseSession()
        {
            if (await _localStorage.ContainKeyAsync(&quot;refreshToken&quot;))
                await _localStorage.RemoveItemAsync(&quot;refreshToken&quot;);

            _user.email = &quot;&quot;;
            _user.id = &quot;&quot;;
            _user.name = &quot;&quot;;
            _user.surname = &quot;&quot;;

            _main.LoginReloadAction();

            _nav.NavigateTo(&quot;/identity&quot;);
        }
    }
    `
  },
  {
    "ID": 10,
    "ServicesName": "HeaderSM",
    "ServicesRoute": "Components/Components/HeaderSM",
    "ServicesDescription":"",
    "Code": `
    &lt;header class=&quot;fixed w-full h-[55px] top-0 py-[10px] px-[20px]  @(PublicSites.IsMainHeader(_nav.Uri.Split('/')) ? &quot;bg-transparent&quot; : &quot;bg-blue-400&quot;) opacity-100 flex flex-wrap justify-between text-[clamp(8px,_1.5vw,_16px)&quot;
            style=&quot;z-index: 10000000000000000;&quot;&gt;
        &lt;div class=&quot;flex flex-wrap items-center h-full gap-5&quot;&gt;
            &lt;img src=&quot;./Images/Base/logoBlanco.png&quot; class=&quot;h-full w-auto cursor-pointer&quot; @onclick=&quot;@(()=&gt; _nav.NavigateTo(&quot;/&quot;))&quot; /&gt;
            &lt;span class=&quot;material-symbols-outlined cursor-pointer text-white hover:text-slate-200&quot; @onclick=&quot;()=&gt; NavBarJS()&quot;&gt;
                menu
            &lt;/span&gt;
        &lt;/div&gt;

        &lt;div class=&quot;flex flex-wrap items-center h-full gap-[15px] text-[clamp(8px,_1.5vw,_16px)]&quot;&gt;

            @if (string.IsNullOrEmpty(_user.id))
            {
                &lt;span class=&quot;flex flex-wrap items-center justify-center cursor-pointer text-white&quot; @onclick=&quot;@(()=&gt; _nav.NavigateTo(&quot;/login&quot;))&quot;&gt;
                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                        login
                    &lt;/span&gt;
                &lt;/span&gt;

                &lt;span class=&quot;flex flex-wrap items-center justify-center cursor-pointer text-white&quot; @onclick=&quot;@(()=&gt; _nav.NavigateTo(&quot;/register&quot;))&quot;&gt;
                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                        app_registration
                    &lt;/span&gt;
                &lt;/span&gt;
            }
            else
            {
                &lt;span class=&quot;flex flex-wrap items-center justify-center cursor-pointer text-white&quot; @onclick=&quot;CloseSession&quot;&gt;
                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                        logout
                    &lt;/span&gt;
                &lt;/span&gt;

                @if (!string.IsNullOrEmpty(_user.profilePic))
                {
                    &lt;a href=&quot;/account&quot; class=&quot;rounded-full h-full aspect-square cursor-pointer&quot;
                    style=&quot;background-image: url(@(_user.profilePic)); background-size: cover;&quot; /&gt;
                }
            }
        &lt;/div&gt;
    &lt;/header&gt;

    @if (PublicSites.IsMainLinks(_nav.Uri.Split('/')))
    {
        &lt;div class=&quot;fixed w-full h-[75px] top-[55px] py-[10px] px-[20px] grid grid-cols-12 z-10&quot;&gt;

            @if (!string.IsNullOrEmpty(_user.id))
            {
                &lt;div class=&quot;col-span-1 h-full&quot;&gt;&lt;/div&gt;

                &lt;div class=&quot;relative col-span-10 grid grid-cols-6 text-white text-base&quot;&gt;
                    &lt;hr class=&quot;absolute top-[-2px] left-0 w-full h-[2px] bg-white&quot; /&gt;
                    &lt;a href=&quot;/rrhh&quot; class=&quot;col-span-1 h-full flex flex-wrap items-center justify-center&quot;&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            manage_accounts
                        &lt;/span&gt;
                    &lt;/a&gt;

                    &lt;a href=&quot;/administracion&quot; class=&quot;col-span-1 h-full flex flex-wrap items-center justify-center&quot;&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            admin_panel_settings
                        &lt;/span&gt;
                    &lt;/a&gt;

                    &lt;a href=&quot;/movil&quot; class=&quot;col-span-1 h-full flex flex-wrap items-center justify-center&quot;&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            smartphone
                        &lt;/span&gt;
                    &lt;/a&gt;

                    &lt;a href=&quot;/redfija&quot; class=&quot;col-span-1 h-full flex flex-wrap items-center justify-center&quot;&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            settings_ethernet
                        &lt;/span&gt;
                    &lt;/a&gt;

                    &lt;a href=&quot;/soporte&quot; class=&quot;col-span-1 h-full flex flex-wrap items-center justify-center&quot;&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            build_circle
                        &lt;/span&gt;
                    &lt;/a&gt;

                    &lt;a href=&quot;/account&quot; class=&quot;col-span-1 h-full flex flex-wrap items-center justify-center gap-3&quot;&gt;
                        @if (!string.IsNullOrEmpty(_user.profilePic))
                        {
                            &lt;div class=&quot;rounded-full h-[50%] aspect-square cursor-pointer p-3&quot;
                                style=&quot;background-image: url(@(_user.profilePic)); background-size: cover;&quot; /&gt;
                        }
                    &lt;/a&gt;
                &lt;/div&gt;

                &lt;div class=&quot;col-span-1 h-full&quot;&gt;&lt;/div&gt;
            }
        &lt;/div&gt;
    }

    &lt;div id=&quot;navbar&quot; class=&quot;fixed h-[calc(100dvh_-_55px)] top-[55px] w-[40%] @(_main.Expanded ? &quot;OpenNavbar&quot; : &quot;CloseNavbar&quot;) shadow-xl bg-slate-50 z-[10000]&quot;&gt;
        &lt;NavBar&gt;&lt;/NavBar&gt;
    &lt;/div&gt;


    @code {
        [Parameter] public RenderFragment ChildContent { get; set; }
        protected override async Task OnInitializedAsync()
        {
            _main.LoginReloadAction += () =&gt; InvokeAsync(StateHasChanged);
            _nav.LocationChanged += (e, d) =&gt; InvokeAsync(StateHasChanged);
        }
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (!firstRender) return;

            await NavBarJS();
        await InvokeAsync(StateHasChanged);
        }

        async Task NavBarJS()
        {
            _main.Expanded = !_main.Expanded;
        }

        async Task CloseSession()
        {
            if (await _localStorage.ContainKeyAsync(&quot;refreshToken&quot;))
                await _localStorage.RemoveItemAsync(&quot;refreshToken&quot;);
            _user.email = &quot;&quot;;
            _user.id = &quot;&quot;;
            _user.name = &quot;&quot;;
            _user.surname = &quot;&quot;;
            _main.LoginReloadAction();
            _nav.NavigateTo(&quot;/identity&quot;);
        }
    }
    `
  },
  {
    "ID": 11,
    "ServicesName": "Loader",
    "ServicesRoute": "Components/Components/Loader",
    "ServicesDescription":"",
    "Code": `
    &lt;div class=&quot;fixed w-full h-full left-0 top-0 bg-slate-400/25 @(_main.IsLoading ? &quot;&quot; : &quot;opacity-0 pointer-events-none&quot;)&quot;&gt;
        &lt;img class=&quot;absolute bottom-12 right-12 w-12 aspect-square animate-spin&quot; src=&quot;../Images/Base/loading.png&quot;&gt;
    &lt;/div&gt;

    @code {
        protected override async Task OnInitializedAsync()
        {
            _main.LoadingAction += () =&gt; InvokeAsync(StateHasChanged);
        }
    }
    `
  },
  {
    "ID": 12,
    "ServicesName": "ModalProvider",
    "ServicesRoute": "Components/Components/ModalProvider",
    "ServicesDescription":"",
    "Code": `
    @{
        int Count = 0;
    }
    @foreach (var v in Modals)
    {
        &lt;BaseModal FixedWidth=&quot;v.Key.FixedWidth&quot; MaxHeight=&quot;v.Key.MaxHeight&quot; ZIndex=&quot;@(10000000 + Count)&quot; IsOpen=v.Key.IsOpen Width=&quot;v.Key.MaxWidth&quot;
                Close=&quot;v.Value&quot; CanClose=&quot;v.Key.CanClose&quot;&gt;
            &lt;CascadingValue TValue=&quot;Action&lt;bool&gt;&quot; Value=&quot;v.Value&quot;&gt;
                &lt;DynamicComponent Type=&quot;v.Key.Component&quot; Parameters=&quot;v.Key.Parameters&quot; @ref=&quot;v.Key.DynamicComponent&quot;&gt;&lt;/DynamicComponent&gt;
            &lt;/CascadingValue&gt;
        &lt;/BaseModal&gt;
        Count++;
    }

    @code {
        public Dictionary&lt;ModalData, Action&lt;bool&gt;&gt; Modals = new();

        protected override async Task OnInitializedAsync()
        {
            _modal.AddModal += (d) =&gt;
            {
                if (Modals.Count(c =&gt; c.Key.Component == d.Component) == 0)
                {
                    Modals.Add(d, async (c) =&gt;
                    {
                        d.IsOpen = false;
                        Modals.Remove(d);
                        await InvokeAsync(StateHasChanged);
                        _disconnection.SaveStatus = null;
                        d.OnCloseModal(c);
                        await InvokeAsync(StateHasChanged);
                    });
                }

                InvokeAsync(StateHasChanged);
            };
        }
    }
    `
  },
  {
    "ID": 13,
    "ServicesName": "MultiSelect",
    "ServicesRoute": "Components/Components/MultiSelect",
    "ServicesDescription":"",
    "Code": `
    @using System.Text.Json
    @typeparam T

    &lt;div class=&quot;bg-transparent @($&quot;z-[{ZIndex -1}]&quot;) fixed w-full h-full left-0 top-0 @(OpenedList ? &quot;&quot; : &quot;pointer-events-none&quot;)&quot; @onclick=&quot;() =&gt; OpenedList = !OpenedList&quot;&gt;
    &lt;/div&gt;

    &lt;div class=&quot;relative @(WidthClass) bg-slate-100 p-2 border border-slate-300 rounded shadow-md flex flex-wrap items-center  @($&quot;z-[{ZIndex}]&quot;)&quot;&gt;
        &lt;button type=&quot;button&quot; class=&quot;absolute @(OpenedList ? &quot;rounded-t&quot; : &quot;rounded&quot;) w-full h-full flex flex-wrap justify-end top-0 right-0&quot;
                @onclick=&quot;() =&gt; OpenedList = !OpenedList&quot;&gt;
            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                expand_more
            &lt;/span&gt;
        &lt;/button&gt;
        @if ( SelectedValues.Count == Values.Count)
        {
            &lt;span class=&quot;opacity-90 text-slate-600 font-italic pointer-events-none p-1&quot;&gt;@Placeholder&lt;/span&gt;
        }
        else if (!string.IsNullOrEmpty(ToString(SelectedValues)))
        {
            &lt;span class=&quot;w-full text-xl text-slate-950 w-full p-1&quot; style=&quot;white-space: nowrap; overflow: hidden ;&quot;&gt;@ToString(SelectedValues)&lt;/span&gt;
        }
        else if (string.IsNullOrEmpty(Placeholder))
        {
            &lt;span class=&quot;opacity-0 p-1&quot;&gt;.&lt;/span&gt;
        }
        else
        {
            &lt;span class=&quot;opacity-90 text-slate-600 font-italic pointer-events-none p-1&quot;&gt;@Placeholder&lt;/span&gt;
        }


        &lt;div class=&quot;absolute bg-slate-100 w-full h-fit max-h-[500px] overflow-y-auto top-[100%] left-0 rounded-b bg-slate-50
    @(OpenedList ? &quot;opacity-100&quot; : &quot;opacity-0 pointer-events-none&quot;) flex flex-col&quot;&gt;
            &lt;div class=&quot;w-full bg-slate-100 border border-slate-300/50 flex flex-wrap items-center cursor-pointer&quot;
                @onclick=&quot;()=&gt; SelectAll()&quot;&gt;
                &lt;div class=&quot;w-full flex flex-wrap justify-start items-center&quot;&gt;
                    &lt;Checkbox Checked=&quot;SelectedValues.Count != 0&quot;
                            ChangeCheck=&quot;()=&gt; {}&quot; Message=&quot;@(SelectedValues.Count == 0 ? &quot;Seleccionar todo&quot; : &quot;Deseleccionar todo&quot;)&quot;&gt;&lt;/Checkbox&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            @foreach (var v in Values)
            {
                &lt;div class=&quot;w-full bg-slate-100 border border-slate-300/50 flex flex-wrap items-center cursor-pointer&quot;
                    @onclick=&quot;()=&gt; SelectOne(v)&quot;&gt;
                    &lt;div class=&quot;w-full flex flex-wrap justify-start items-center&quot;&gt;
                        &lt;Checkbox Checked=&quot;SelectedValues.Select(x=&gt; JsonSerializer.Serialize(x)).Contains(JsonSerializer.Serialize(v))&quot;
                                ChangeCheck=&quot;()=&gt; {}&quot; Message=&quot;@(OptionValue(v))&quot;&gt;&lt;/Checkbox&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            }
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        [Parameter] public string WidthClass { get; set; }
        [Parameter] public List&lt;T&gt; Values { get; set; }
        [Parameter] public Func&lt;List&lt;T&gt;, string&gt; ToString { get; set; }
        [Parameter] public Func&lt;T, string&gt; OptionValue { get; set; }
        [Parameter] public EventCallback&lt;List&lt;T&gt;&gt; SelectValues { get; set; }
        [Parameter] public List&lt;T&gt; InitialValues { get; set; } = new();
        [Parameter] public string Placeholder { get; set; }
        [Parameter] public int ZIndex { get; set; }

        List&lt;T&gt; GetSelectedValues { get; set; } = new();

        public List&lt;T&gt; SelectedValues
        {
            get
            {
                return GetSelectedValues;
            }
            set
            {
                GetSelectedValues = value;
            }
        }

        bool OpenedList = false;

        protected override async Task OnInitializedAsync()
        {
            if (InitialValues != null)
            {
                if (InitialValues.Count &gt; 0)
                {
                    SelectedValues = InitialValues;
                }
            }
        }

        void SelectAll()
        {
            if (SelectedValues.Count == 0)
            {
                var jsonData = JsonSerializer.Serialize(Values);

                SelectedValues = JsonSerializer.Deserialize&lt;List&lt;T&gt;&gt;(jsonData);
            }
            else
            {
                SelectedValues.Clear();
            }
            SelectValues.InvokeAsync(SelectedValues);
            InvokeAsync(StateHasChanged);
        }

        void SelectOne(T data)
        {
            if (SelectedValues.Select(x =&gt; JsonSerializer.Serialize(x)).Contains(JsonSerializer.Serialize(data)))
            {
                var v = SelectedValues.First(x =&gt; JsonSerializer.Serialize(x) == JsonSerializer.Serialize(data));
                SelectedValues.Remove(v);
            }
            else
            {
                SelectedValues.Add(data);
            }
            SelectValues.InvokeAsync(SelectedValues);
            InvokeAsync(StateHasChanged);
        }
    }
    `
  },
  {
    "ID": 14,
    "ServicesName": "NavBar",
    "ServicesRoute": "Components/Components/NavBar",
    "ServicesDescription":"",
    "Code": `
        <div class="w-full p-4 flex flex-wrap gap-8 max-h-full h-fit">
            @if (!string.IsNullOrEmpty(_main.Token))
            {
                @if (_nav.Uri.ToLower().Contains("soporte"))
                {
                    <div class="w-full flex flex-col">
                        <a href="/soporte" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                        <span class="material-symbols-outlined">
                            home
                        </span> Incidencias
                    </a>
                    </div>
        
                @* <AuthorizedContent Roles="@(new(){"SoporteSupervisor", "SoporteInterno"})"> *@ 
                    <div class="w-full flex flex-col">
                            <a href="/soporte/dashboard" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                            <span class="material-symbols-outlined">
                                dashboard
                            </span> Dashboard
                        </a>
                        </div>
                @*  </AuthorizedContent> *@ 
                }
                else if (_nav.Uri.ToLower().Contains("visitasmovil"))
                {<div class="w-full flex flex-col">
                        <a href="/visitasmovil" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                        <span class="material-symbols-outlined">
                            home
                        </span> Inicio
                    </a>
                    </div>
                    <div class="w-full flex flex-col">
                            <a href="/visitasmovil/visitas" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                        <span class="material-symbols-outlined">
                            public
                        </span> Visitas
                    </a>
                        </div>
                    <div class="w-full flex flex-col">
                                <a href="/visitasmovil/emplazamientos" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                        <span class="material-symbols-outlined">
                            map
                        </span> Emplazamientos
                    </a>
                            </div>
                    <div class="w-full flex flex-col">
                                    <a href="/visitasmovil/calendario" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                        <span class="material-symbols-outlined">
                            calendar_month
                        </span> Calendario
                    </a>
                                </div>
                }
                else if (_nav.Uri.ToLower().Contains("logistica"))
                {
                
                        <!-- Sección: Almacenes -->
                        <div class="w-full flex flex-col">
                            <a href="/logistica" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                                <span class="material-symbols-outlined">warehouse</span>
                                Almacenes
                            </a>
                        
                        </div>

                    <!-- Sección: Solicitudes -->
                    <div class="w-full flex flex-col">
                        
                            <!-- Botón principal de Solicitudes -->
                            <button onclick="toggleSubmenu('solicitudesSubmenu')" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                        <span class="material-symbols-outlined">combine_columns</span>
                                Solicitudes
                        <span class="material-symbols-outlined ml-auto">expand_more</span>
                            </button>
                            <!-- Submenú anidado -->
                            <div id="solicitudesSubmenu" class="ml-6 mt-2 hidden">
                                <a href="/logistica/solicitudes" class="w-full flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                                    <span class="material-symbols-outlined">add_shopping_cart</span>
                                    Crear Solicitud
                                </a>

                                <a href="/logistica/solicitudes-ver" class="w-full flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                                        <span class="material-symbols-outlined">manage_search</span>
                                    Gestionar solicitudes
                                </a>
                            </div>
                    </div>

                        <!-- Sección: Compras -->
                        <div class="w-full flex flex-col">
                            <a href="/logistica/compras" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                                <span class="material-symbols-outlined">shopping_bag</span>
                                Compras
                            </a>
                        
                        </div>
        
                        <!-- Sección: Productos -->
                        <div class="w-full flex flex-col">
                            <!-- Botón principal de Productos -->
                            <button onclick="toggleSubmenu('productosSubmenu')" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                                <span class="material-symbols-outlined">category</span>
                                Productos
                                <span class="material-symbols-outlined ml-auto">expand_more</span>
                            </button>
                        
        
                            <!-- Submenú anidado -->
                            <div id="productosSubmenu" class="ml-6 mt-2 hidden">
                                <a href="/logistica/stockproductos" class="w-full flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                                    <span class="material-symbols-outlined">dataset</span>
                                    Stock Productos
                                </a>
                            
                                <a href="/logistica/productos" class="w-full flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                                    <span class="material-symbols-outlined">add</span>
                                    Añadir Productos
                                </a>
                            </div>
                        </div>
        
                        <!-- Sección: Proveedores -->
                        <div class="w-full flex flex-col">
                            <a href="/logistica/proveedores" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                                <span class="material-symbols-outlined">token</span>
                                Proveedores
                            </a>
                        
                        </div>
                        <!-- Sección: Aprobadores -->
                        <div class="w-full flex flex-col">
                            <a href="/logistica/gestoraprobadores" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                                <span class="material-symbols-outlined">group</span>
                                Gestión Aprobadores
                            </a>
        
                        </div>
            
                }
                else if (_nav.Uri.ToLower().Contains("procesoseleccion") || _nav.Uri.ToLower().Contains("aprobaciones"))
                {
            
                @* <AuthorizedContent Roles="@(new(){"RRHH.Supervisor", "RRHH.Tecnico"})"> *@ 
                        <div class="w-full flex flex-col">
                            <a href="/procesoseleccion" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                            <span class="material-symbols-outlined">
                                manage_accounts
                            </span> Procesos de selección
                        </a>
                        </div>
        
                        <div class="w-full flex flex-col">
                            <a href="/procesoseleccion/usuarios" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                            <span class="material-symbols-outlined">
                                manage_accounts
                            </span> Candidatos
                        </a>
                        </div>
                @*  </AuthorizedContent> *@
        
                @*  <AuthorizedContent Roles="@(new(){"RRHH.Supervisor", "RRHH.Tecnico", "RRHH.Aprobador"})"> *@
                        <div class="w-full flex flex-col">
                            <a href="/aprobaciones" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                            <span class="material-symbols-outlined">
                                group_add
                            </span> Aprobaciones
                        </a>
                        </div>
                @*   </AuthorizedContent> *@
        
                @*   <AuthorizedContent Roles="@(new(){"RRHH.Supervisor"})"> *@
                    <div class="w-full flex flex-col">
                            <a href="/procesoseleccion/dashboard" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                            <span class="material-symbols-outlined">
                                dashboard
                            </span> Dashboard
                        </a>
                        </div>
                @*   </AuthorizedContent> *@
                
                @*    <AuthorizedContent Roles="@(["Admin", "RRHH.Supervisor"])">*@
                        <div class="w-full flex flex-col">
                            <a href="/procesoseleccion/dashboardsemanal" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                            <span class="material-symbols-outlined">
                                dashboard
                            </span> Dashboard semanal
                        </a>
                        </div>
                @*   </AuthorizedContent>*@
        
                
                }
        
                else if (_nav.Uri.ToLower().Contains("gestioncoches"))
                {
                    <div class="w-full flex flex-col">
                    <a href="/gestioncoches" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                        <span class="material-symbols-outlined">
                            Directions_car
                        </span> Gestión de coches
                    </a>
                            </div>
        
                @* <AuthorizedContent Roles="@(["Coches.Supervisor"])">*@
                        <div class="w-full flex flex-col">
                        <a href="/gestioncoches/stockcoches" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500">
                            <span class="material-symbols-outlined">
                                Directions_car
                            </span> Flota
                        </a>
                                </div>
                @*  </AuthorizedContent>*@
                }
                else
                {
                    <div class="w-full flex flex-col">
                    <a href="/" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500 text-[clamp(12px,_1.5vw,_18px)]">
                        <span class="material-symbols-outlined text-[clamp(20px,_2vw,_25px)]">
                            home
                        </span> Inicio
                    </a>
                            </div>
                }
            }
            else
            {
                <div class="w-full flex flex-col">
                <a href="/login" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500 text-[clamp(12px,_1.5vw,_18px)]">
                    <span class="material-symbols-outlined text-[clamp(20px,_2vw,_25px)]">
                        login
                    </span> Iniciar sesión
                </a>
                </div>
                    <div class="w-full flex flex-col">
            @*  <a href="/register" class="w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500 text-[clamp(12px,_1.5vw,_18px)]">
                    <span class="material-symbols-outlined text-[clamp(20px,_2vw,_25px)]">
                        app_registration
                    </span> Registro
                </a> *@
                </div>
            }
        </div>

    @code {
    
        protected override async Task OnInitializedAsync()
        {
            _main.LoginReloadAction += () => InvokeAsync(StateHasChanged);
            _nav.LocationChanged += async (e, d) =>
            {
                await Task.Delay(100);
            await InvokeAsync(StateHasChanged);
            };
        }
    }
    `
  },
  {
    "ID": 15,
    "ServicesName": "Paginator",
    "ServicesRoute": "Components/Components/Paginator",
    "ServicesDescription":"",
    "Code": `
    &lt;div class=&quot;w-full flex flex-wrap justify-between&quot;&gt;
        &lt;div class=&quot;p-2 flex flex-wrap items-center rounded border border-slate-300/50 bg-slate-50 shadow-md gap-[25px]&quot;&gt;
            @if ((filters.PageNumber * filters.PageSize) &lt;= countAllDocuments)
            {
                &lt;span class=&quot;text-base text-black&quot;&gt;@($&quot;Mostrando {filters.DataPageNumber * filters.PageSize} - {filters.DataPageNumber * filters.PageSize + filters.PageSize} registros de {countAllDocuments} totales&quot;)&lt;/span&gt;
            }
            else
            {
                &lt;span class=&quot;text-base text-black&quot;&gt;@($&quot;Mostrando {filters.DataPageNumber * filters.PageSize} - {countAllDocuments} registros de {countAllDocuments} totales&quot;)&lt;/span&gt;
            }

            &lt;select @onchange=&quot;SetPageSize&quot; class=&quot;p-2 rounded border border-slate-300/50 cursor-pointer&quot;&gt;
                &lt;option value=&quot;10&quot;&gt;
                    10
                &lt;/option&gt;

                &lt;option value=&quot;25&quot;&gt;
                    25
                &lt;/option&gt;

                &lt;option value=&quot;50&quot;&gt;
                    50
                &lt;/option&gt;

                &lt;option value=&quot;100&quot;&gt;
                    100
                &lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;

        &lt;div class=&quot;p-2 flex flex-wrap items-center gap-[10px]&quot;&gt;
            &lt;span class=&quot;p-1 flex flex-wrap items-center justify-center rounded bg-slate-50 border border-slate-300/50 w-[35px] h-[35px] @(filters.PageNumber == 1 ? &quot;pointer-events-none&quot; : &quot;cursor-pointer&quot;)&quot; @onclick=&quot;()=&gt; SetPageNumber(1)&quot;&gt;
                &amp;#60;&amp;#60;
            &lt;/span&gt;

            &lt;span class=&quot;p-1 flex flex-wrap items-center justify-center rounded bg-slate-50 border border-slate-300/50 w-[35px] h-[35px] @(filters.PageNumber == 1 ? &quot;pointer-events-none&quot; : &quot;cursor-pointer&quot;)&quot; @onclick=&quot;()=&gt; SetPageNumber(filters.PageNumber-1)&quot;&gt;
                &amp;#60;
            &lt;/span&gt;

            @foreach (var v in paginator)
            {
                &lt;span class=&quot;p-1 flex flex-wrap items-center justify-center rounded bg-slate-50 border border-slate-300/50 w-[35px] h-[35px] @(filters.PageNumber == v.Page ? &quot;text-blue-400 pointer-events-none&quot; : &quot;cursor-pointer&quot;)&quot; @onclick=&quot;()=&gt; SetPageNumber(v.Page)&quot;&gt;
                    @v.Page
                &lt;/span&gt;
            }

            &lt;span class=&quot;p-1 flex flex-wrap items-center justify-center rounded bg-slate-50 border border-slate-300/50 w-[35px] h-[35px] @(filters.PageNumber == countPages ? &quot;pointer-events-none&quot; : &quot;cursor-pointer&quot;)&quot; @onclick=&quot;()=&gt; SetPageNumber(filters.PageNumber+1)&quot;&gt;
                &amp;#62;
            &lt;/span&gt;

            &lt;span class=&quot;p-1 flex flex-wrap items-center justify-center rounded bg-slate-50 border border-slate-300/50 w-[35px] h-[35px] @(filters.PageNumber == countPages ? &quot;pointer-events-none&quot; : &quot;cursor-pointer&quot;)&quot; @onclick=&quot;()=&gt; SetPageNumber(countPages)&quot;&gt;
                &amp;#62;&amp;#62;
            &lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        [Parameter] public FiltersBase filters { get; set; }
        [Parameter] public int countAllDocuments { get; set; }
        [Parameter] public int countPages { get; set; }
        [Parameter] public bool ChangeURL { get; set; } = true;
        [Parameter] public Action ReloadData { get; set; }

        public List&lt;PaginatorData&gt; paginator { get; set; } = new();

        protected override void OnParametersSet()
        {
            LoadPaginator();
        }

        async Task SetPageNumber(int pageNumber)
        {
            filters.PageNumber = pageNumber;
            if (ChangeURL)
                _nav.NavigateTo($&quot;{_nav.Uri.Split('?')[0]}?pageNumber={filters.PageNumber}&amp;pageSize={filters.PageSize}&quot;);

            await Task.Delay(100);

            ReloadData();
        }

        async Task SetPageSize(ChangeEventArgs e)
        {
            filters.PageSize = Int32.Parse(e.Value.ToString());
            filters.PageNumber = 1;

            if (ChangeURL)
                _nav.NavigateTo($&quot;{_nav.Uri.Split('?')[0]}?pageNumber={filters.PageNumber}&amp;pageSize={filters.PageSize}&quot;);

            await Task.Delay(100);

            ReloadData();
        }

        private void LoadPaginator()
        {
            var minPage = filters.PageNumber - 3;

            if (minPage &lt; 1) minPage = 1;

            var maxPage = filters.PageNumber + 3;

            if (maxPage &gt; countPages) maxPage = countPages;

            paginator.Clear();

            for (var i = minPage; i &lt;= maxPage; i++)
            {
                paginator.Add(new PaginatorData { Page = i });
            }

            InvokeAsync(StateHasChanged);
        }
    }
    `
  },
  {
    "ID": 16,
    "ServicesName": "SnackbarComponent",
    "ServicesRoute": "Components/Components/SnackbarComponent",
    "ServicesDescription":"",
    "Code": `
    &lt;div class=&quot;fixed top-0 left-0 w-full h-full flex flex-wrap justify-end pointer-events-none&quot; style=&quot;z-index: 10000000000;&quot;&gt;
        &lt;div id=&quot;parentSnackbar&quot; class=&quot;w-[350px] h-full pointer-events-none flex flex-col-reverse p-3 gap-6&quot;&gt;
            @foreach (var snackbar in _snackbar.Snackbars)
            {
                &lt;div class=&quot;w-full h-fit rounded pointer-events-none p-1 grid grid-cols-12 items-center @(snackbar.color) @($&quot;opacity-[{snackbar.Opacity}%]&quot;)&quot;&gt;
                    &lt;span class=&quot;material-symbols-outlined @(snackbar.textcolor) col-span-2 p-2&quot;&gt;
                        @snackbar.icon
                    &lt;/span&gt;

                    &lt;span class=&quot;col-span-10 p-2 @(snackbar.textcolor) text-sm&quot;&gt;
                        @snackbar.message
                    &lt;/span&gt;
                &lt;/div&gt;
            }
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            _snackbar.ModifiedSnackbars += () =&gt; InvokeAsync(StateHasChanged);
        }
    }
    `
  },
  {
    "ID": 17,
    "ServicesName": "MainLayout",
    "ServicesRoute": "Components/Layout/MainLayout",
    "ServicesDescription":"",
    "Code": `
    @using LPSGrupo.Components.Pages.Modals
    @inherits LayoutComponentBase

    &lt;ErrorBoundary&gt;
        &lt;ChildContent&gt;
            @if (_main.FirstCheck)
            {
                &lt;div class=&quot;hidden sm:flex&quot;&gt;
                    &lt;HeaderLG&gt;

                    &lt;/HeaderLG&gt;
                &lt;/div&gt;

                &lt;div class=&quot;flex sm:hidden&quot;&gt;
                    &lt;HeaderSM&gt;

                    &lt;/HeaderSM&gt;
                &lt;/div&gt;

                &lt;Body&gt;
                    @Body
                &lt;/Body&gt;


                if (_user.id != null)
                {
                    CheckVersioning();
                }
            }

            &lt;SnackbarComponent&gt;&lt;/SnackbarComponent&gt;

            &lt;ModalProvider&gt;&lt;/ModalProvider&gt;

            &lt;MudThemeProvider /&gt;
            &lt;MudDialogProvider /&gt;
            &lt;MudSnackbarProvider /&gt;
        &lt;/ChildContent&gt;
        &lt;ErrorContent&gt;
            &lt;LPSGrupo.Components.Pages.Error&gt;&lt;/LPSGrupo.Components.Pages.Error&gt;
        &lt;/ErrorContent&gt;
    &lt;/ErrorBoundary&gt;

    &lt;LPSGrupo.Components.Areas.GeneralF.Main.BackgroundImage&gt;&lt;/LPSGrupo.Components.Areas.GeneralF.Main.BackgroundImage&gt;
    @code {

        protected override async Task OnInitializedAsync()
        {
            _main.LoginReloadAction += () =&gt; InvokeAsync(StateHasChanged);
        }

        async Task CheckVersioning()
        {
            if (string.IsNullOrEmpty(_user.id))
            {
                return;
            }

            bool HasVersionSaved = await _localStorage.ContainKeyAsync(&quot;LPSVersion&quot;);

            if (!HasVersionSaved)
            {
                await _localStorage.SetItemAsStringAsync(&quot;LPSVersion&quot;, LPSVersion.ActualVersion.VersionIdentifier);

                var modal = _modal.ShowModal(typeof(Versions), new Dictionary&lt;string, object&gt;(), FixedWidth: 80);
                modal.OnCloseModal += (d) =&gt; { };
            }
            else if (await _localStorage.GetItemAsStringAsync(&quot;LPSVersion&quot;) != LPSVersion.ActualVersion.VersionIdentifier)
            {
                await _localStorage.SetItemAsStringAsync(&quot;LPSVersion&quot;, LPSVersion.ActualVersion.VersionIdentifier);

                var modal = _modal.ShowModal(typeof(Versions), new Dictionary&lt;string, object&gt;(), FixedWidth: 80);
                modal.OnCloseModal += (d) =&gt; { };
            }
        }
    }
    `
  },
  {
    "ID": 18,
    "ServicesName": "Versions",
    "ServicesRoute": "Components/Pages/Modals/Versions",
    "ServicesDescription":"",
    "Code": `
    &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3 p-2&quot;&gt;
        @foreach (var v in LPSVersion.Versions.OrderByDescending(c =&gt; c.VersionNumber))
        {
            &lt;h1 class=&quot;text-slate-400/80 text-2xl w-full text-start font-bold&quot;&gt;
                Versi&oacute;n @v.VersionIdentifier
            &lt;/h1&gt;

            &lt;hr class=&quot;w-full h-[1px]&quot; /&gt;
            if (v.DataVersion.Count(x =&gt; x.VersionType == VersionType.NewTool) &gt; 0)
            {
                &lt;h2 class=&quot;text-emerald-400/80 text-xl w-full text-start&quot;&gt;
                    Nuevas herramientas
                &lt;/h2&gt;

                &lt;ul class=&quot;w-full text-base text-slate-600/90&quot; style=&quot;list-style-type:disc&quot;&gt;
                    @foreach (var vv in v.DataVersion.Where(x =&gt; x.VersionType == VersionType.NewTool))
                    {
                        &lt;li&gt;
                            @((MarkupString)vv.MessageVersion)
                        &lt;/li&gt;
                    }
                &lt;/ul&gt;
            }

            if (v.DataVersion.Count(x =&gt; x.VersionType == VersionType.AddedFeatures) &gt; 0)
            {
                &lt;h2 class=&quot;text-blue-400/80 text-xl w-full text-start&quot;&gt;
                    Nuevas funciones
                &lt;/h2&gt;

                &lt;ul class=&quot;w-full text-base text-slate-600/90&quot; style=&quot;list-style-type:disc&quot;&gt;
                    @foreach (var vv in v.DataVersion.Where(x =&gt; x.VersionType == VersionType.AddedFeatures))
                    {
                        &lt;li&gt;
                            @((MarkupString)vv.MessageVersion)
                        &lt;/li&gt;
                    }
                &lt;/ul&gt;
            }

            if (v.DataVersion.Count(x =&gt; x.VersionType == VersionType.CriticalFixes) &gt; 0)
            {
                &lt;h2 class=&quot;text-red-400/80 text-xl w-full text-start&quot;&gt;
                    Errores cr&iacute;ticos
                &lt;/h2&gt;

                &lt;ul class=&quot;w-full text-base text-slate-600/90&quot; style=&quot;list-style-type:disc&quot;&gt;
                    @foreach (var vv in v.DataVersion.Where(x =&gt; x.VersionType == VersionType.CriticalFixes))
                    {
                        &lt;li&gt;
                            @((MarkupString)vv.MessageVersion)
                        &lt;/li&gt;
                    }
                &lt;/ul&gt;
            }

            if (v.DataVersion.Count(x =&gt; x.VersionType == VersionType.MajorFixes) &gt; 0)
            {
                &lt;h2 class=&quot;text-orange-400/80 text-xl w-full text-start&quot;&gt;
                    Errores mayores
                &lt;/h2&gt;

                &lt;ul class=&quot;w-full text-base text-slate-600/90&quot; style=&quot;list-style-type:disc&quot;&gt;
                    @foreach (var vv in v.DataVersion.Where(x =&gt; x.VersionType == VersionType.MajorFixes))
                    {
                        &lt;li&gt;
                            @((MarkupString)vv.MessageVersion)
                        &lt;/li&gt;
                    }
                &lt;/ul&gt;
            }

            if (v.DataVersion.Count(x =&gt; x.VersionType == VersionType.MinorFixes) &gt; 0)
            {
                &lt;h2 class=&quot;text-yellow-400/80 text-xl w-full text-start&quot;&gt;
                    Errores menores
                &lt;/h2&gt;

                &lt;ul class=&quot;w-full text-base text-slate-600/90&quot; style=&quot;list-style-type:disc&quot;&gt;
                    @foreach (var vv in v.DataVersion.Where(x =&gt; x.VersionType == VersionType.MinorFixes))
                    {
                        &lt;li&gt;
                            @((MarkupString)vv.MessageVersion)
                        &lt;/li&gt;
                    }
                &lt;/ul&gt;

            }
        }
    &lt;/div&gt;
    `
  },
  {
    "ID": 19,
    "ServicesName": "Error",
    "ServicesRoute": "Components/Pages/Error",
    "ServicesDescription":"",
    "Code": `
    @page &quot;/Error&quot;
    @using System.Diagnostics

    &lt;div class=&quot;w-[60%] m-auto h-[calc(100dvh_-_55px)] flex flex-wrap justify-center items-center&quot;&gt;
        &lt;div class=&quot;w-full h-fit flex flex-wrap justify-center gap-6 p-6 bg-slate-50/70&quot;&gt;
            &lt;h1 class=&quot;text-red-600 text-center font-bold w-full text-3xl&quot;&gt;
                HA OCURRIDO UN ERROR CON LA APLICACI&Oacute;N
            &lt;/h1&gt;

            &lt;span class=&quot;text-red-600 w-full  text-center text-xl&quot;&gt;
                Parece que has encontrado un error en la aplicaci&oacute;n. Por favor, reportalo en Bug Tracker para llevar a cabo su arreglo
            &lt;/span&gt;

            &lt;a @onclick=&quot;ReportBug&quot; class=&quot;w-fit h-fit py-4 px-8 bg-blue-400 text-white text-xl flex flex-wrap justify-center items-center
    rounded shadow-md cursor-pointer&quot;&gt;
                Reportar en &lt;span class=&quot;material-symbols-outlined ml-2&quot;&gt;
                    bug_report
                &lt;/span&gt; Bug Tracker
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;../Images/Error.jpg&quot;;
            _main.IsLoading = false;
        }

        async Task ReportBug()
        {
            await Task.Delay(500);

            _nav.NavigateTo(&quot;/BugTracker?reportbug=true&quot;, true);
        }

        async Task ReturnHome()
        {
            await Task.Delay(500);

            _nav.Refresh(true);
        }
    }
    `
  },
  {
    "ID": 20,
    "ServicesName": "Home",
    "ServicesRoute": "Components/Pages/Home",
    "ServicesDescription":"",
    "Code": `
    @page &quot;/&quot;
    &lt;div class=&quot;w-full min-h-[calc(100dvh_-_55px)] h-fit p-12 flex flex-wrap justify-center items-center space-x-16&quot;&gt;
        &lt;div class=&quot;flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/movil&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square rounded&quot; style=&quot;background-image: url(../Images/Base/Htas.jpg); background-size: cover; background-position: center;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;Herramientas&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class=&quot;flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/soporte&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square rounded&quot; style=&quot;background-image: url(../Images/Base/Soporte.jpg); background-size: cover; background-position: center;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;Soporte&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            _main.BackgroundImage = &quot;../Images/Identity/Fondo.jpg&quot;;
        }
    }
    `
  },
  {
    "ID": 21,
    "ServicesName": "NonAuthorized",
    "ServicesRoute": "Components/Pages/NonAuthorized",
    "ServicesDescription":"",
    "Code": `
    @page &quot;/NonAuthorized&quot;
    &lt;div class=&quot;w-[50%] m-auto h-[calc(100dvh_-_55px)] flex flex-wrap justify-center items-center&quot;&gt;
        &lt;div class=&quot;w-full h-fit flex flex-wrap justify-center gap-6 p-6 bg-slate-50/70&quot;&gt;
            &lt;h1 class=&quot;text-red-600 text-center font-bold w-full text-3xl&quot;&gt;
                NO EST&Aacute;S AUTORIZADO PARA VER ESTE RECURSO
            &lt;/h1&gt;
            &lt;span class=&quot;text-red-600 w-full  text-center text-xl&quot;&gt;
                El recurso al que has intentado acceder est&aacute; protegido. Si crees que es un error, contacta con los administradores para que te otorguen
                los permisos necesarios
            &lt;/span&gt;
            &lt;a href=&quot;/&quot; class=&quot;w-fit h-fit py-4 px-8 bg-blue-400 text-white text-xl rounded shadow-md&quot;&gt;Ir a inicio&lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    @code {
        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;../Images/NonAuthorized.jpg&quot;;
        }
    }
    `
  },
  {
    "ID": 22,
    "ServicesName": "NotFound",
    "ServicesRoute": "Components/Pages/NotFound",
    "ServicesDescription":"",
    "Code": `
    @page &quot;/StatusCode/404&quot;
    &lt;div class=&quot;fixed w-full h-full top-0 left 0 z-[-2]&quot; style=&quot;background-image: url(@(&quot;../Images/NotFound.jpg&quot;)); background-size: cover;&quot;&gt;
    &lt;/div&gt;

    &lt;div class=&quot;fixed w-full h-full top-0 left 0 z-[-1]&quot;
        style=&quot;background: linear-gradient(180deg, @(&quot;rgba(97,212,255,0.95) 35%&quot;), rgba(0,212,255,0.1) 100%);&quot;&gt;
    &lt;/div&gt;


    &lt;div class=&quot;w-[60%] m-auto h-[calc(100dvh_-_55px)] flex flex-wrap justify-center items-center&quot;&gt;
        &lt;div class=&quot;w-full h-fit flex flex-wrap justify-center gap-6 p-6 bg-slate-50/70&quot;&gt;
            &lt;h1 class=&quot;text-red-600 text-center font-bold w-full text-3xl&quot;&gt;
                ESTA P&Aacute;GINA NO EXISTE
            &lt;/h1&gt;

            &lt;span class=&quot;text-red-600 w-full  text-center text-xl&quot;&gt;
                El recurso al que has intentado acceder no existe. Revisa la URL o contacta con
                &lt;a href=&quot;mailto:daniel.martinez@lpsgrupo.com&quot; class=&quot;underline hover:font-bold&quot;&gt;el equipo de desarrollo&lt;/a&gt; para que lo revisen
            &lt;/span&gt;

            &lt;a @onclick=&quot;ReturnHome&quot; class=&quot;w-fit h-fit py-4 px-8 bg-blue-400 text-white text-xl rounded shadow-md cursor-pointer&quot;&gt;Ir a inicio&lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        protected override async Task OnInitializedAsync()
        {
            //_main.BackgroundChanged += () =&gt; InvokeAsync(StateHasChanged);
            //_main.BackgroundImage = &quot;../Images/NotFound.jpg&quot;;
        }

        async Task ReturnHome()
        {
            await Task.Delay(500);

            _nav.NavigateTo(&quot;&quot;, true);
        }
    }
    `
  },
  {
    "ID": 23,
    "ServicesName": "_Imports",
    "ServicesRoute": "Components/_Imports",
    "ServicesDescription":"",
    "Code": `
    @using System.Net.Http
    @using System.Net.Http.Json
    @using Blazored.LocalStorage
    @using Database.Configuration
    @using Database.Interfaces
    @using Microsoft.AspNetCore.Components.Authorization
    @using Microsoft.AspNetCore.Components.Forms
    @using Microsoft.AspNetCore.Components.Routing
    @using Microsoft.AspNetCore.Components.Web
    @using static Microsoft.AspNetCore.Components.Web.RenderMode
    @using Microsoft.AspNetCore.Components.Web.Virtualization
    @using Microsoft.AspNetCore.Identity
    @using Microsoft.Extensions.Options
    @using Microsoft.JSInterop
    @using LPSGrupo
    @using LPSGrupo.Components
    @using LPSGrupo.Components.Components
    @using Microsoft.AspNetCore.SignalR.Client
    @using System.Net.Http.Headers
    @using MudBlazor
    @using MongoDB.Driver
    @using SeguimientoMovilLogic.Extra.DataSeguimiento
    @using MongoDB.Bson
    @using Blazored.TextEditor
    @using LogisticaData.Logic.GestorAprobaciones
    @using SeguimientoFibraLogic.Extra.DataSeguimiento.DataStockSubProyecto;


    @inject MainService _main
    @inject UserService _user
    @inject SnackbarSystem _snackbar

    @inject HttpClient _http
    @inject NavigationManager _nav
    @inject ILocalStorageService _localStorage
    @inject IJSRuntime _js

    @inject IOptions&lt;MailConfiguration&gt; _mail
    @inject UserMongoContext _mongoUsers
    @inject IMongoContext _mongoContext

    @inject DisconnectionService _disconnection
    @inject ModalServices _modal
    `
  },
  {
    "ID": 24,
    "ServicesName": "App",
    "ServicesRoute": "Components/App",
    "ServicesDescription":"",
    "Code": `
    &lt;!DOCTYPE html&gt;
    &lt;html lang=&quot;es&quot;&gt;

    &lt;head&gt;
        &lt;meta charset=&quot;utf-16&quot; /&gt;
        &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;
        &lt;base href=&quot;/&quot; /&gt;
        &lt;title&gt;LPS Grupo&lt;/title&gt;
        &lt;link rel=&quot;stylesheet&quot; href=&quot;app.css&quot; /&gt;
        &lt;link rel=&quot;stylesheet&quot; href=&quot;/sass/forms.min.css&quot; /&gt;
        &lt;link rel=&quot;stylesheet&quot; href=&quot;https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&quot; /&gt;
        &lt;link rel=&quot;icon&quot; href=&quot;Images/Base/logoMulticolor.png&quot; /&gt;
        &lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/leaflet@1.9.4/dist/leaflet.css&quot; /&gt;
        &lt;script type=&quot;text/javascript&quot; src=&quot;https://unpkg.com/leaflet@1.9.4/dist/leaflet.js&quot;&gt;&lt;/script&gt;
        &lt;style&gt;
            .material-symbols-outlined {
                font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24
            }
        &lt;/style&gt;
        &lt;script type=&quot;text/javascript&quot; src=&quot;https://www.gstatic.com/charts/loader.js&quot;&gt;&lt;/script&gt;

        &lt;link href=&quot;https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap&quot; rel=&quot;stylesheet&quot; /&gt;
        &lt;link href=&quot;_content/MudBlazor/MudBlazor.min.css&quot; rel=&quot;stylesheet&quot; /&gt;
        &lt;link href=&quot;//cdn.quilljs.com/1.3.6/quill.snow.css&quot; rel=&quot;stylesheet&quot;&gt;
        &lt;link href=&quot;//cdn.quilljs.com/1.3.6/quill.bubble.css&quot; rel=&quot;stylesheet&quot;&gt;
        &lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/leaflet@1.9.4/dist/leaflet.css&quot;
            integrity=&quot;sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=&quot;
            crossorigin=&quot;&quot; /&gt;
        &lt;HeadOutlet @rendermode=&quot;InteractiveServer&quot; /&gt;
    &lt;/head&gt;

    &lt;body&gt;
        &lt;Routes @rendermode=&quot;InteractiveServer&quot; /&gt;
        &lt;script src=&quot;_framework/blazor.web.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;_content/MudBlazor/MudBlazor.min.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;js/Tailwind.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;js/NavBar.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;js/file.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;js/DashboardSoporte_V1.1.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;js/DashboardProcesoSeleccion_V1.1.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;js/logistica_v2.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;https://cdn.quilljs.com/1.3.6/quill.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;_content/Blazored.TextEditor/quill-blot-formatter.min.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;_content/Blazored.TextEditor/Blazored-BlazorQuill.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;js/Map.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;js/Accordion.js&quot;&gt;&lt;/script&gt;

        &lt;script src=&quot;js/pdf-export.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js&quot;&gt;&lt;/script&gt;
        &lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js&quot;&gt;&lt;/script&gt;

    

        @* &lt;script src=&quot;js/Graficos.js&quot;&gt;&lt;/script&gt; *@


        
        &lt;script&gt;
            function blazorGetTimezoneOffset() {
                return new Date().getTimezoneOffset();
            }

            function PlaceMessageOnConsole(message) {
                console.log(message);
            }

            function CreateSnackbarElement(snackbarData, guid) {
                var parentNode = document.getElementById(&quot;parentSnackbar&quot;);

                let frag = document.createRange().createContextualFragment(snackbarData);
                var elementTop = frag.getElementById(&quot;topSnackbar&quot; + guid)
                parentNode.append(elementTop);
            }

            function ChangeInnerHTML(id, message) {
                document.getElementById(id).innerHTML = message;
            }

            function ChangeOpacitySnackbar(id, opacity) {
                document.getElementById(id).style.opacity = opacity;
            }

            function RemoveElement(id) {
                document.getElementById(id).remove();
            }

            function SubmitForm(id) {
                var element = document.getElementById(id);

                element.click();
            }
        &lt;/script&gt;
    
    &lt;/body&gt;

    &lt;/html&gt;
    `
  },
  {
    "ID": 25,
    "ServicesName": "Routes",
    "ServicesRoute": "Components/Routes",
    "ServicesDescription":"",
    "Code": `
    @using System.Net.Http.Headers
    &lt;Router AppAssembly=&quot;typeof(Program).Assembly&quot;&gt;
        &lt;Found Context=&quot;routeData&quot;&gt;
            @{
                found = true;
            }
            &lt;RouteView RouteData=&quot;routeData&quot; DefaultLayout=&quot;typeof(Layout.MainLayout)&quot; /&gt;
        &lt;/Found&gt;
        &lt;NotFound&gt;
            @{
                found = false;
            }
            &lt;LayoutView&gt;
                &lt;LPSGrupo.Components.Pages.NotFound&gt;&lt;/LPSGrupo.Components.Pages.NotFound&gt;
            &lt;/LayoutView&gt;
        &lt;/NotFound&gt;
    &lt;/Router&gt;

    &lt;Loader&gt;&lt;/Loader&gt;

    @code {
        bool found = true;

        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;

            Task.Run(async () =&gt;
            {
                for (; ; )
                {
                    if (_disconnection.SaveStatus != null)
                    {
                        _disconnection.SaveStatus();
                    }

                    await Task.Delay(1000);

                }
            });

            _main.BackgroundChanged += () =&gt; InvokeAsync(StateHasChanged);
            _main.LoginReloadAction += () =&gt; InvokeAsync(StateHasChanged);

            _nav.LocationChanged += (sender, args) =&gt;
            {
                var redirection = _main.QueryParameters(_nav)[&quot;redirection&quot;];

                if (!string.IsNullOrEmpty(redirection) &amp;&amp; !string.IsNullOrEmpty(_main.Token) &amp;&amp; !string.IsNullOrEmpty(_main.RefreshToken))
                {
                    _nav.NavigateTo($&quot;{redirection}?token={_main.Token}&amp;refreshToken={_main.RefreshToken}&quot;);
                }

                if (string.IsNullOrEmpty(_user.id) &amp;&amp; !args.Location.Split('/').IsPublic())
                {
                    _nav.NavigateTo(&quot;/identity&quot;);
                    _main.LoginReloadAction();
                    return;
                }

                if (_user.Roles != null &amp;&amp; _main.FirstCheck)
                {
                    if (_user.Roles.Contains(&quot;SoporteExterno&quot;))
                    {
                        _nav.NavigateTo(&quot;/soporte&quot;);

                        _main.LoginReloadAction();
                        return;
                    }
                }
            };

            _main.LoginReloadAction += () =&gt;
            {
                Task.Run(async () =&gt;
                {
                    await Task.Delay(100);

                    if (!string.IsNullOrEmpty(_main.RedirectURL) &amp;&amp; !string.IsNullOrEmpty(_user.id))
                    {
                        _nav.NavigateTo(_main.RedirectURL);
                        _main.RedirectURL = &quot;&quot;;
                    }
                });
            };

            await Task.Delay(500);

            if (!found)
            {
                return;
            }

            _main.IsLoading = true;

            var token = _main.QueryParameters(_nav)[&quot;token&quot;];
            var refreshToken = _main.QueryParameters(_nav)[&quot;refreshToken&quot;];

        checkApi:

            if (!string.IsNullOrEmpty(token) &amp;&amp; !string.IsNullOrEmpty(refreshToken))
            {
                if (!_user.CheckTokenIsValid(token))
                {
                    token = null;
                    refreshToken = null;
                    goto checkApi;
                }

                await _localStorage.SetItemAsStringAsync(&quot;refreshToken&quot;, refreshToken);
                _main.Token = token;
                _main.RefreshToken = refreshToken;

                _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(&quot;Bearer&quot;, token);
                _main.FirstCheck = true;
            }
            else if (await _localStorage.ContainKeyAsync(&quot;refreshToken&quot;))
            {
                try
                {
                    var response = await _http.GetToken(await _localStorage.GetItemAsStringAsync(&quot;refreshToken&quot;));

                    _main.Token = response.Value;
                    _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(&quot;Bearer&quot;, response.Value);

                    var refreshTokenSaved = await _localStorage.GetItemAsStringAsync(&quot;refreshToken&quot;);
                    _main.RefreshToken = refreshTokenSaved;

                    var redirection = _main.QueryParameters(_nav)[&quot;redirection&quot;];

                    if (!string.IsNullOrEmpty(redirection))
                    {
                        _nav.NavigateTo($&quot;{redirection}?token={_main.Token}&amp;refreshToken={refreshTokenSaved}&quot;);
                    }
                }
                catch (Exception ex)
                {
                    _main.RedirectURL = _nav.Uri;
                    _nav.NavigateTo(&quot;/identity&quot;);
                    _main.IsLoading = false;
                    _main.FirstCheck = true;
                    return;
                }
            }
            else
            {
                if (_nav.Uri.Split('/').IsPublic())
                {
                    _main.IsLoading = false;
                    _main.FirstCheck = true;
                    return;
                }

                _main.RedirectURL = _nav.Uri;
                _nav.NavigateTo(&quot;/identity&quot;);
                _main.IsLoading = false;
                _main.FirstCheck = true;
                return;
            }

            try
            {
                if (!string.IsNullOrEmpty(_main.Token))
                {
                    _user.ReadJWTProperties(_main.Token);
                }
            }
            catch (Exception)
            {
                if (_nav.Uri.Split('/').IsPublic())
                {
                    _main.IsLoading = false;
                    _main.FirstCheck = true;
                    return;
                }

                _main.RedirectURL = _nav.Uri;
                _nav.NavigateTo(&quot;/identity&quot;);
                _main.IsLoading = false;
                _main.FirstCheck = true;
                return;
            }

            if (_user.Roles != null &amp;&amp; _main.FirstCheck)
            {
                if (_user.Roles.Contains(&quot;SoporteExterno&quot;))
                {
                    _nav.NavigateTo(&quot;/soporte&quot;);

                    _main.LoginReloadAction();
                }
            }

            if (string.IsNullOrEmpty(_user.id) &amp;&amp; !_nav.Uri.Split('/').IsPublic())
            {
                if (_nav.Uri.Split('/').IsPublic())
                {
                    _main.IsLoading = false;
                    _main.FirstCheck = true;
                    return;
                }

                _nav.NavigateTo(&quot;/identity&quot;);
                _main.LoginReloadAction();
                return;
            }

            _main.LoginReloadAction();
            _main.IsLoading = false;

            await Task.Delay(300);

            _main.OffsetHoursTime = await _js.InvokeAsync&lt;int&gt;(&quot;blazorGetTimezoneOffset&quot;);

            _main.FirstCheck = true;
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