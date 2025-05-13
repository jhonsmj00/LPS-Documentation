const data = [
  {
    "ID": 1,
    "ServicesName": "AddEditBugReport",
    "ServicesRoute": "Components/Areas/GeneralF/BugTracker/Modals/AddEditBugReport",
    "ServicesDescription":`
    
    `,
    "Code": `
    &lt;form class=&quot;w-full flex flex-wrap gap-3&quot; @onsubmit=&quot;SaveAsync&quot;&gt;
        &lt;h2 class=&quot;text-xl text-slate-950/80 w-full font-bold&quot;&gt;Enviar reporte de error&lt;/h2&gt;
        &lt;div class=&quot;w-full flex flex-wrap&quot;&gt;
            &lt;div class=&quot;w-full flex flex-wrap justify-between items-center gap-3&quot;&gt;
                &lt;div class=&quot;w-fit flex flex-wrap items-center gap-2&quot;&gt;
                    &lt;input class=&quot;text-xl font-bold text-blue-400 rounded border border-slate-300/50 shadow-md p-2&quot; @bind=&quot;Request.Title&quot;
                        placeholder=&quot;Titulo...&quot; maxlength=&quot;30&quot; /&gt;
                &lt;/div&gt;

                &lt;div class=&quot;w-fit flex flex-wrap items-center gap-2&quot;&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;

    &lt;textarea @bind=&quot;Request.Bug&quot; class=&quot;w-full h-[150px] rounded border border-slate-300/50 shadow-md p-2&quot;
            placeholder=&quot;Comenta el error que has visto y en qu&eacute; herramienta...&quot; maxlength=&quot;500&quot;&gt;&lt;/textarea&gt;

        &lt;div class=&quot;w-full flex flex-wrap items-center justify-end gap-3&quot;&gt;
            &lt;button type=&quot;button&quot; class=&quot;rounded bg-red-600 text-white shadow-md flex flex-wrap items-center justify-center  p-2&quot; @onclick=&quot;()=&gt;Close(false)&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                    cancel
                &lt;/span&gt;
                Cancelar
            &lt;/button&gt;
            &lt;button type=&quot;submit&quot; class=&quot;rounded bg-blue-400 text-white shadow-md flex flex-wrap items-center justify-center p-2&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                    save
                &lt;/span&gt;
                Guardar
            &lt;/button&gt;
        &lt;/div&gt;
    &lt;/form&gt;

    @code {
        [CascadingParameter] public Action<bool> Close { get; set; }
        public E_BugRequest Request { get; set; }

        protected override async Task OnInitializedAsync()
        {
            Request = new()
                {
                    ProfilePic = _user.profilePic,
                    EmailSender = _user.email,
                    Solved = BugStatus.Stand_by
                };
        }

        async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.AddBug(Request, _mail);

            Close(true);

            _main.IsLoading = false;
        }
    }

    `
  },
  {
    "ID": 2,
    "ServicesName": "FinishedBugComment",
    "ServicesRoute": "Components/Areas/GeneralF/BugTracker/Modals/FinishedBugComment",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;div class=&quot;w-full h-fit flex flex-wrap p-2 gap-3&quot;&gt;
    &lt;span class=&quot;text-xl font-bold text-black&quot;&gt;Cerrar reporte&lt;/span&gt;

    &lt;textarea class=&quot;w-full rounded p-2 shadow-md border border-slate-300/50&quot; @bind=&quot;AddEdit.FinishedComment&quot;&gt;&lt;/textarea&gt;

    &lt;div class=&quot;w-full flex flex-wrap items-center justify-end gap-3&quot;&gt;
        &lt;button type=&quot;button&quot; class=&quot;rounded bg-red-600 text-white shadow-md flex flex-wrap items-center justify-center p-2&quot; @onclick=&quot;()=&gt;Close(false)&quot;&gt;
            &lt;span class=&quot;material-symbols-outlined&quot;&gt;cancel&lt;/span&gt;
            Cancelar
        &lt;/button&gt;
        &lt;button type=&quot;submit&quot; class=&quot;rounded bg-blue-400 text-white shadow-md flex flex-wrap items-center justify-center p-2&quot; @onclick=&quot;()=&gt;Close(true)&quot;&gt;
            &lt;span class=&quot;material-symbols-outlined&quot;&gt;save&lt;/span&gt;
            Guardar
        &lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        [CascadingParameter] public Action<bool> Close { get; set; }
        [Parameter] public E_BugRequest AddEdit { get; set; }
    }
    `
  },
  {
    "ID": 3,
    "ServicesName": "BugTracker",
    "ServicesRoute": "Components/Areas/GeneralF/BugTracker/BugTracker",
    "ServicesDescription":`
    `,
    "Code": `
    @page "/BugTracker"
    @using LPSGrupo.Components.Areas.GeneralF.BugTracker.Modals

    &lt;AuthorizePage&gt;&lt;/AuthorizePage&gt;

    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        &lt;h1 class=&quot; w-full text-3xl text-blue-400&quot; tabindex=&quot;none&quot;&gt;Bug Tracker&lt;/h1&gt;
        &lt;h2 class=&quot;w-full text-xl text-slate-950&quot;&gt;Gesti&oacute;n de reportes de errores en herramientas de LPS Grupo&lt;/h2&gt;

        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;button class=&quot;rounded bg-red-400 text-white sahdow-md flex flex-wrap items-center justify-center p-2&quot; @onclick=&quot;OpenModalBugReport&quot;&gt;
                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                        bug_report
                    &lt;/span&gt;
                    Reportar error
                &lt;/button&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;MultiSelect T=&quot;BugStatus&quot; OptionValue=&quot;@((d)=&gt; d.ToString().Replace(&quot;_&quot;, &quot; &quot;))&quot; Placeholder=&quot;Bug status...&quot;
                            Values=&quot;@(new List&lt;BugStatus&gt;(){BugStatus.Solved,BugStatus.Stand_by,BugStatus.Cancelled})&quot;
                            SelectValues=&quot;(d)=&gt; {get.Status = d; LoadApi();}&quot;
                            WidthClass=&quot;w-[300px]&quot; ToString=&quot;@((d) =&gt; string.Join(&quot;, &quot;, d.Select(x=&gt; x.ToString().Replace(&quot;_&quot;, &quot; &quot;))))&quot;&gt;

                &lt;/MultiSelect&gt;

                &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-3 text-sm rounded border border-slate-300 shadow-md&quot; @bind-value=&quot;searchSet&quot;&gt;&lt;/input&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;
            @if (data.Documents != null)
            {

                @foreach (var v in data.Documents)
                {
                    &lt;div class=&quot;w-full flex flex-wrap rounded bg-slate-100 shadow-md p-2&quot;&gt;
                        &lt;div class=&quot;w-fit flex flex-wrap items-center p-2 gap-2&quot;&gt;
                            &lt;div class=&quot;h-[50px] aspect-square rounded-full&quot;
                                style=&quot;background-image: url(@(v.ProfilePic)); background-size: cover; background-position: center;&quot;&gt;
                            &lt;/div&gt;
                            &lt;h1 class=&quot;text-lg font-bold text-blue-400&quot;&gt;@(v.CreatedByName)&lt;/h1&gt;
                        &lt;/div&gt;

                        &lt;hr class=&quot;w-full h-[1px] text-black bg-black&quot; /&gt;

                        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center gap-3&quot;&gt;
                            &lt;div class=&quot;w-fit flex flex-wrap items-center p-2 gap-2&quot;&gt;

                                &lt;h1 class=&quot;text-2xl font-bold text-blue-400&quot;&gt;@(v.Title)&lt;/h1&gt;
                            &lt;/div&gt;

                            &lt;div class=&quot;w-fit flex flex-wrap items-center p-4 gap-2&quot;&gt;
                                &lt;AuthorizedContent Roles=&quot;@(new(){&quot;Admin&quot;})&quot;&gt;
                                    @if (v.Solved == BugStatus.Stand_by)
                                    {
                                        &lt;button class=&quot;rounded bg-emerald-400 text-white sahdow-md flex flex-wrap items-center justify-center p-2&quot;
                                                @onclick=&quot;()=&gt;ChangeStatus(v, BugStatus.Solved)&quot;&gt;
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                check_circle
                                            &lt;/span&gt;
                                        &lt;/button&gt;
                                        &lt;button class=&quot;rounded bg-red-400 text-white sahdow-md flex flex-wrap items-center justify-center p-2&quot;
                                                @onclick=&quot;()=&gt;ChangeStatus(v, BugStatus.Cancelled)&quot;&gt;
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                cancel
                                            &lt;/span&gt;
                                        &lt;/button&gt;
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;text-lg text-blue-400&quot;&gt;@(v.GetBugStatus)&lt;/span&gt;
                                    }
                                &lt;/AuthorizedContent&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;

                        &lt;textarea readonly @bind=&quot;v.Bug&quot; class=&quot;w-full h-[150px] rounded border border-slate-300/50 shadow-md p-2&quot;&gt;&lt;/textarea&gt;
                        
                        @if(!string.IsNullOrEmpty(v.FinishedComment))
                        {
                            &lt;span class=&quot;w-full @(v.Solved == BugStatus.Solved ? &quot;text-emerald-400&quot; : &quot;text-red-600&quot;) text-lg mt-4&quot;&gt;
                                Comentario del desarrollador
                            &lt;/span&gt;

                            &lt;textarea readonly @bind=&quot;v.FinishedComment&quot; class=&quot;w-full h-[100px] rounded border border-slate-300/50 shadow-md p-2&quot;&gt;&lt;/textarea&gt;
                        }
                    
                    &lt;/div&gt;
                }

                &lt;Paginator countAllDocuments=&quot;(int)data.CountAllDocuments&quot; countPages=&quot;data.PageCount&quot; filters=&quot;get&quot; ReloadData=&quot;()=&gt;LoadApi()&quot;&gt;

                &lt;/Paginator&gt;
            }
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
    public PaginatedResult<E_BugRequest> data { get; set; } = new();

    public FilteredBugRequest get { get; set; } = new()
        {
            Search = "",
            PageNumber = 1,
            PageSize = 10
        };

    string searchSet
    {
        get
        {
            return get.Search;
        }
        set
        {
            get.Search = value;

            LoadApi();
        }
    }

    protected override async Task OnInitializedAsync()
    {
        _main.BackgroundImage = "";
        await LoadApi();

        if (!string.IsNullOrEmpty(_main.QueryParameters(_nav)["reportbug"]))
        {
            OpenModalBugReport();
        }
    }

    async Task LoadApi()
    {
        try
        {
            _main.IsLoading = true;
            data = await _mongoContext.GetPaginatedBugRequest(get);
            InvokeAsync(StateHasChanged);
            _main.IsLoading = false;
        }
        catch (Exception e)
        {
            
            await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "BugTracker", "LoadApi", DateTime.UtcNow);
            _main.IsLoading = false;
            throw;
        }

        
    }

    async Task ChangeStatus(E_BugRequest entity, BugStatus status)
    {
        var modal = _modal.ShowModal(typeof(FinishedBugComment), new Dictionary<string, object>
        {
            {nameof(FinishedBugComment.AddEdit), entity}
        }, FixedWidth: 80);

        modal.OnCloseModal += async (b) =>
        {
            if (b)
            {
                try
                {
                    entity.Solved = status;
                    await _mongoContext.EditBug(entity, _mail);
                    await LoadApi();
                }
                catch (Exception e)
                {
                    
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "BugTracker", "ChangeStatus", DateTime.UtcNow);
                   
                    throw;
                }
         
            }
        };
    }

    void OpenModalBugReport()
    {
        var modal = _modal.ShowModal(typeof(AddEditBugReport), default, FixedWidth: 80);

        modal.OnCloseModal += (b) =>
        {
            LoadApi();
        };
    }
}
    `
  },
  {
    "ID": 4,
    "ServicesName": "AddEditCoche",
    "ServicesRoute": "Components/Areas/GeneralF/GestionCoches/Modals/AddEditCoche",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;form class=&quot;w-full grid grid-cols-12&quot; @onsubmit=&quot;() =&gt; SaveAsync()&quot;&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Empresa&lt;/span&gt;
            &lt;input class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.Empresa&quot; required&gt; &lt;/input&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Fecha de inicio&lt;/span&gt;
            &lt;input type=&quot;date&quot; class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind-value=&quot;AddEdit1.FechaInicioContrato&quot; required&gt; &lt;/input&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Fecha fin contrato&lt;/span&gt;
            &lt;input type=&quot;date&quot; class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.FechaFinContrato&quot; required&gt; &lt;/input&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Duraci&oacute;n contrato&lt;/span&gt;
            &lt;input class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.DuracionContrato&quot; required&gt; &lt;/input&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Tipo alquiler&lt;/span&gt;
            &lt;input class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.TipoAlquiler&quot; required&gt; &lt;/input&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Conductores&lt;/span&gt;
            &lt;input class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.Conductores&quot; required&gt; &lt;/input&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Modelo&lt;/span&gt;
            &lt;input class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.Modelo&quot; required&gt; &lt;/input&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Matr&iacute;cula&lt;/span&gt;
            &lt;input class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.MatriculaFlota&quot; required&gt; &lt;/input&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Oficina&lt;/span&gt;
            &lt;input class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.Oficina&quot;&gt; &lt;/input&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Kms contratados&lt;/span&gt;
            &lt;input class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.KmsContratados&quot;&gt; &lt;/input&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Kilometraje&lt;/span&gt;
            &lt;input class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.Kilometraje&quot; required&gt; &lt;/input&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;div class=&quot;col-span-4 flex flex-wrap justify-center p-2 gap-3&quot;&gt;
                &lt;span class=&quot;text-blue-400 w-full opacity-0&quot;&gt;.&lt;/span&gt;
                &lt;Checkbox Checked=&quot;AddEdit1.SOLRED&quot;
                        ChangeCheck=&quot;@(()=&gt; {AddEdit1.SOLRED= !AddEdit1.SOLRED; InvokeAsync(StateHasChanged);})&quot;
                        Message=&quot;&iquest;SOLRED?&quot;&gt;
                &lt;/Checkbox&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3 flex justify-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Estado&lt;/span&gt;
            &lt;select @bind=&quot;AddEdit1.Estado&quot; class=&quot;w-full p-2 rounded border border-slate-300/50&quot;&gt;
                &lt;option value=&quot;&quot;&gt;Selecciona el estado&lt;/option&gt;
                &lt;option value=&quot;Disponible&quot;&gt; Disponible &lt;/option&gt;
                &lt;option value=&quot;No disponible&quot;&gt; No disponible &lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Delegaci&oacute;n&lt;/span&gt;
            &lt;select class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.Delegacion.Nombre&quot;&gt;
                &lt;option value=&quot;&quot;&gt;Selecciona la delegacci&oacute;n&lt;/option&gt;
                @foreach (var delegacion in Delegaciones)
                {
                    &lt;option value=&quot;@delegacion.Nombre&quot;&gt;@delegacion.Nombre&lt;/option&gt;
                }
            &lt;/select&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Revisiones&lt;/span&gt;
            &lt;input class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.Revisiones&quot;&gt; &lt;/input&gt;

        &lt;/div&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Pr&oacute;xima revisi&oacute;n&lt;/span&gt;
            &lt;input class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.ProximaRevision&quot;&gt; &lt;/input&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Cambios&lt;/span&gt;
            &lt;input class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit1.Cambios&quot;&gt; &lt;/input&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;div class=&quot;w-full flex flex-wrap items-center&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot; p-2 rounded bg-blue-400 text-white&quot;
                        @onclick=&quot;@(()=&gt;{ AddEdit1.Comentarios.Add(new() {Id = _user.id, Comentario=&quot;&quot;, Fecha=DateTime.Now,Name= $&quot;{_user.name} {_user.surname}&quot;, ProfilePic = _user.profilePic}); InvokeAsync(StateHasChanged);})&quot;&gt;
                    A&ntilde;adir comentario
                &lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-span-12 flex flex-wrap gap-3 py-3&quot;&gt;
            @foreach (var vv in AddEdit1.Comentarios)
            {
                &lt;div class=&quot;w-full flex flex-wrap gap-2&quot;&gt;
                    @if (!string.IsNullOrEmpty(vv.Id) != null)
                    {
                        if (!string.IsNullOrEmpty(vv.Id))
                        {
                            &lt;span class=&quot;w-full text-blue-400 text-sm flex flex-wrap justify-between items-center gap-3&quot;&gt;
                                &lt;div class=&quot;w-fit text-sm flex flex-wrap items-center gap-3&quot;&gt;
                                    &lt;div class=&quot;h-[40px] aspect-square rounded-full&quot; style=&quot;background-image: url(@(vv.ProfilePic)); background-size: cover;&quot;&gt;
                                    &lt;/div&gt;

                                    @(vv.Name)
                                &lt;/div&gt;

                                &lt;button type=&quot;button&quot; class=&quot;rounded bg-red-600 text-white py-0 px-1 w-fit h-fit&quot; @onclick=&quot;()=&gt; AddEdit1.Comentarios.Remove(vv)&quot;&gt;
                                    &lt;span class=&quot;material-symbols-outlined text-lg w-fit h-fit&quot;&gt;
                                        delete
                                    &lt;/span&gt;
                                &lt;/button&gt;
                            &lt;/span&gt;
                        }
                        else
                        {
                            &lt;div class=&quot;w-fit text-sm flex flex-wrap items-center gap-3&quot;&gt;
                                &lt;div class=&quot;h-[40px] aspect-square rounded-full&quot; style=&quot;background-image: url(@(vv.ProfilePic)); background-size: cover;&quot;&gt;
                                &lt;/div&gt;

                                @(vv.Name)
                            &lt;/div&gt;
                        }
                        &lt;InputTextArea class=&quot;w-full h-[100px] border border-slate-300/50 rounded p-2&quot; @bind-Value=&quot;vv.Comentario&quot; readonly=&quot;@(vv.Id != _user.id)&quot;&gt;&lt;/InputTextArea&gt;
                    }
                    else
                    {
                        &lt;div class=&quot;w-fit text-sm flex flex-wrap items-center gap-3&quot;&gt;
                            @($&quot;&quot;)
                        &lt;/div&gt;
                        &lt;InputTextArea class=&quot;w-full h-[100px] border border-slate-300/50 rounded p-2&quot; @bind-Value=&quot;vv.Comentario&quot; readonly&gt;&lt;/InputTextArea&gt;
                    }

                &lt;/div&gt;
            }
        &lt;/div&gt;

        &lt;!-- Archivos --&gt;
        &lt;div class=&quot;col-span-12 bg-white p-4 rounded shadow-sm&quot;&gt;
            &lt;h2 class=&quot;text-lg font-bold text-blue-500 mb-4&quot;&gt;Archivos&lt;/h2&gt;
            @if ((Files.Count + internalCoche.Archivos.Count) &lt; (IsEdit ? 8 : 4))
            {
                &lt;label for=&quot;archivos&quot; class=&quot;inline-block p-2 bg-blue-400 text-white rounded cursor-pointer&quot;&gt;Subir archivos&lt;/label&gt;
                &lt;InputFile id=&quot;archivos&quot; hidden multiple OnChange=&quot;LoadFiles&quot; accept=&quot;image/*&quot; /&gt;
            }
            &lt;div class=&quot;grid grid-cols-2 md:grid-cols-4 gap-4 mt-4&quot;&gt;
                @foreach (var v in internalCoche.Archivos)
                {
                    &lt;div class=&quot;col-span-3 aspect-video cursor-pointer&quot; @onclick=&quot;@(()=&gt; OpenModalImage($&quot;https://lpsgrupolatam.s3.sa-east-1.amazonaws.com/ImagenesCoche/{internalCoche.Index}_{internalCoche.Archivos.IndexOf(v)};{Path.GetExtension(v.Nombre)}&quot;))&quot;
                        style=&quot;background-image: url('@($&quot;https://lpsgrupolatam.s3.sa-east-1.amazonaws.com/ImagenesCoche/{internalCoche.Index}_{internalCoche.Archivos.IndexOf(v)};{Path.GetExtension(v.Nombre)}&quot;)');&quot;&gt;
                    &lt;/div&gt;
                }
                @foreach (var v in Files)
                {
                    &lt;div class=&quot;aspect-video bg-cover bg-center rounded&quot; style=&quot;background-image: url('data:@($&quot;{v.contentType};base64,{v.base64data}&quot;)');&quot;&gt;
                    &lt;/div&gt;
                }
            &lt;/div&gt;
        &lt;/div&gt;

        @if (IsEdit)
        {
            &lt;div class=&quot;col-span-12 p-4&quot;&gt;
                &lt;h3 class=&quot;text-lg font-bold text-blue-400&quot;&gt;&Uacute;ltimas asignaciones (&uacute;ltimos 10 d&iacute;as)&lt;/h3&gt;
                @if (UltimasAsignaciones.Any())
                {
                    &lt;table class=&quot;table-auto w-full text-sm border-collapse border border-gray-300&quot;&gt;
                        &lt;thead&gt;
                            &lt;tr class=&quot;bg-gray-100&quot;&gt;
                                &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;Fecha Inicio&lt;/th&gt;
                                &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;Fecha Fin&lt;/th&gt;
                                &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;Conductor&lt;/th&gt;
                                &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;Estado&lt;/th&gt;
                            &lt;/tr&gt;
                        &lt;/thead&gt;
                        &lt;tbody&gt;
                            @foreach (var asignacion in UltimasAsignaciones)
                            {
                                &lt;tr&gt;
                                    &lt;td class=&quot;border border-gray-300 p-2&quot;&gt;@asignacion.FechaInicio?.ToShortDateString()&lt;/td&gt;
                                    &lt;td class=&quot;border border-gray-300 p-2&quot;&gt;@asignacion.FechaDevolucionAproximada?.ToShortDateString()&lt;/td&gt;
                                    &lt;td class=&quot;border border-gray-300 p-2&quot;&gt;@asignacion.Conductor?.Name @asignacion.Conductor?.LastName&lt;/td&gt;
                                    &lt;td class=&quot;border border-gray-300 p-2&quot;&gt;@asignacion.EstadoSolicitud&lt;/td&gt;
                                &lt;/tr&gt;
                            }
                        &lt;/tbody&gt;
                    &lt;/table&gt;
                }
                else
                {
                    &lt;p class=&quot;text-gray-500&quot;&gt;No hay asignaciones recientes para este coche.&lt;/p&gt;
                }
            &lt;/div&gt;
        }
        
        &lt;div class=&quot;col-span-12 flex flex-wrap justify-end items-end p-2 gap-3&quot;&gt;
            &lt;button type=&quot;button&quot; class=&quot;col-span-1 w-fit h-fit p-2 bg-red-600 text-white rounded flex flex-wrap gap-3&quot;
                    @onclick=&quot;@(() =&gt; {getSelectedProject=&quot;&quot;; Close(false);})&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                    cancel
                &lt;/span&gt;
                Cancelar
            &lt;/button&gt;

            &lt;button id=&quot;&quot; type=&quot;submit&quot; class=&quot;bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                    save
                &lt;/span&gt;
                Guardar
            &lt;/button&gt;

        &lt;/div&gt;
    &lt;/form&gt;

    @code {
        private bool OpenedState { get; set; }
        [Parameter] public bool Saved { get; set; }
        [CascadingParameter] public Action<bool> Close { get; set; }
        [Parameter] public E_Coches AddEdit1 { get; set; }
        [Parameter] public List<E_Delegacion> Delegaciones { get; set; } = new();
        List<(string base64data, string contentType, string Name)> Files = new();
        E_Coches internalCoche = new E_Coches();

        bool IsEdit => !string.IsNullOrEmpty(AddEdit1.Id);

        string getSelectedProject { get; set; } = "";

        public List<E_SolicitudCoche> UltimasAsignaciones { get; set; } = new();

        protected override async Task OnInitializedAsync()
        {
            Delegaciones = await LoadDelegacionesFromDatabase();

            if (IsEdit)
            {
                // Cargar asignaciones recientes si se está editando
                await CargarUltimasAsignaciones();
            }

            StateHasChanged();
        }

        protected override async Task OnParametersSetAsync()
        {
            if (AddEdit1 != null)
            {
                if (!IsEdit && !Saved)
                {
                    AddEdit1 = new E_Coches()
                        {
                            Archivos = new(),
                        };
                }
                else
                {
                    internalCoche = AddEdit1;
                }
            }

            await InvokeAsync(StateHasChanged);
        }

        private async Task CargarUltimasAsignaciones()
        {
            try
            {
                var solicitudesCollection = _mongoContext.GenericData<E_SolicitudCoche>(DatabaseIdentifiers.Coche, "SolicitudCoche");
                var todasSolicitudes = await solicitudesCollection.Find(_ => true).ToListAsync();
            
                var solicitudes = await solicitudesCollection.Find(s =>
                    s.CocheAsignado != null &&
                    s.CocheAsignado.MatriculaFlota == AddEdit1.MatriculaFlota &&
                    s.FechaInicio >= DateTime.UtcNow.AddDays(-10))
                    .ToListAsync();

                UltimasAsignaciones = solicitudes;
            }
            catch (Exception ex)
            {
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, "AddEditCoche", "CargarUltimasAsignaciones", DateTime.UtcNow);
                UltimasAsignaciones = new List<E_SolicitudCoche>();  
                throw;
            }
        }

        private async Task<List<E_Delegacion>> LoadDelegacionesFromDatabase()
        {
            try
            {
                var collection = _mongoContext.GenericData<E_Delegacion>(DatabaseIdentifiers.Coche, "Delegacion");
                var delegaciones = await collection.Find(_ => true).ToListAsync();
                return delegaciones.Where(d => !string.IsNullOrEmpty(d.Nombre)).ToList();
            }
            catch (Exception ex)
            {
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, "AddEditCoche", "LoadDelegacionesFromDatabase", DateTime.UtcNow);
                return new List<E_Delegacion>(); 
                throw;
            }
        }

        GetPaginatedCoche FiltersStock = new()
            {
                Search = "",
                PageNumber = 1,
                PageSize = 10
            };


        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;

            _disconnection.SaveStatus += (async () =>
            {
                try
                {
                    if (AddEdit1 != null)
                    {
                        await _localStorage.SetItemAsync("gestioncochesadd", AddEdit1);
                    }
                    else
                    {
                        await _localStorage.RemoveItemAsync("gestioncochesadd");
                    }
                }
                catch (Exception)
                { }
            });

            StateHasChanged();
        }

        async Task SaveAsync()
        {
            _main.IsLoading = true;

            if (AddEdit1.MatriculaFlota == null)
            {
                _snackbar.InsertSnackbar(new("¡Es obligatorio poner una matrícula!", "cancel", 10000, "bg-red-600", "text-white"));
                _main.IsLoading = false;
                return;
            }

            if (IsEdit)
            {
                try
                {
                    await _mongoContext.EditCoche(AddEdit1);
                }
                catch (Exception e)
                {
                    
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "AddEditCoche", "SaveAsync > EditCoche", DateTime.UtcNow);
                    throw;
                }
            }
            else
            {
                try
                {
                    await _mongoContext.AddCoche(AddEdit1);
                }
                catch (Exception e)
                {
                    
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "AddEditCoche", "SaveAsync > AddCoche", DateTime.UtcNow);
                    throw;
                }
                
            }
            Close(true);

            foreach (var v in Files)
            {
                internalCoche.Archivos.Add(new()
                    {
                        Base64Data = v.base64data,
                        Nombre = v.Name /* Solicitud.Index.ToString()+"_"+ contador + ";.png" */
                    });
                // contador++;
            }

            Files.Clear();
            _main.IsLoading = false;
            StateHasChanged();
        }

        //imagenes de los coches

        async Task LoadFiles(InputFileChangeEventArgs e)
        {
            try
            {
                if ((e.GetMultipleFiles(10000).Count + Files.Count + internalCoche.Archivos.Count) > (IsEdit ? 8 : 4))
                        {
                            _snackbar.InsertSnackbar(new($"Demasiados archivos escogidos. Solo puedes escoger {(IsEdit ? 8 : 4) - Files.Count + internalCoche.Archivos.Count} archivos", "cancel", 10000,
                            "bg-amber-600", "text-white"));
                            return;
                        }

                        int contador = 0;
                        foreach (var v in e.GetMultipleFiles(100000))
                        {
                            if (v.Size <= 1024000)
                            {
                                var ms = new MemoryStream();
                                await v.OpenReadStream(1024000).CopyToAsync(ms);
                                Files.Add((Convert.ToBase64String(ms.ToArray()), v.ContentType, v.Name));
                            }
                            else
                            {
                                _snackbar.InsertSnackbar(new($"El archivo {v.Name} pesa demasiado. El peso máximo de la imagen debe ser de 1Mb", "cancel", 10000,
                                "bg-amber-600", "text-white"));
                            }
                        }
            }
            catch (Exception ex)
            {
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, "AddEditCoche", "LoadFiles", DateTime.UtcNow);
                throw;
            }
            await InvokeAsync(StateHasChanged);
        }

        // Modal See Maximized Image
        string ImageRender = "";
        void OpenModalImage(string image)
        {
            ImageRender = image;
            var modal = _modal.ShowModal(typeof(MaximiziedImage), new Dictionary<string, object>
            {
                {nameof(SeeMaximizedImage.Image), ImageRender},
            }, FixedWidth: 80);

            modal.OnCloseModal += CloseModalImage;
        }

        void CloseModalImage(bool success)
        {
            ImageRender = "";
            InvokeAsync(StateHasChanged);
        }
    }
    `
  },  
  {
    "ID": 5,
    "ServicesName": "AddEditSolicitud",
    "ServicesRoute": "Components/Areas/GeneralF/GestionCoches/Modals/AddEditSolicitud",
    "ServicesDescription":`
    
    `,
    "Code": `
    &lt;form class=&quot;w-full grid grid-cols-12&quot; @onsubmit=&quot;() =&gt; SaveAsync()&quot;&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Delegaci&oacute;n&lt;/span&gt;
            &lt;select class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;AddEdit.Delegacion.Nombre&quot; required&gt;
                &lt;option value=&quot;&quot;disabled selected&gt;Selecciona una delegaci&oacute;n&lt;/option&gt;
                @foreach (var delegacion in Delegaciones)
                {
                    &lt;option value=&quot;@delegacion.Nombre&quot;&gt;@delegacion.Nombre&lt;/option&gt;
                }
            &lt;/select&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Conductor&lt;/span&gt;
            @if (AddEdit.Conductor != null)
            {
                &lt;Autocomplete T=&quot;E_User&quot;
                            SelectOne=&quot;@((e)=&gt; AddEdit.Conductor = e)&quot;
                            Database=&quot;@DatabaseIdentifiers.Main&quot;
                            FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                            ToString=&quot;@(x=&gt; $&quot;{x.Name} {x.LastName}&quot;)&quot;
                            InitialTextValue=&quot;@(string.IsNullOrEmpty(AddEdit.Conductor.Name) ? &quot;&quot; :
                    $&quot;{AddEdit.Conductor.Name} {AddEdit.Conductor.LastName}&quot;)&quot;
                            InitialValue=&quot;string.IsNullOrEmpty(AddEdit.Conductor.Name) ? null :
                                AddEdit.Conductor&quot;&gt;
                &lt;/Autocomplete&gt;
            }
            else
            {
                &lt;Autocomplete T=&quot;E_User&quot;
                            SelectOne=&quot;@((e)=&gt; AddEdit.Conductor = e)&quot;
                            Database=&quot;@DatabaseIdentifiers.Main&quot;
                            FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                            ToString=&quot;@(x=&gt; $&quot;{x.Name} {x.LastName}&quot;)&quot;&gt;
                &lt;/Autocomplete&gt;
            }

        &lt;/div&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Kilometraje de itinerario aproximado&lt;/span&gt;
            &lt;input class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind-value=&quot;AddEdit.KilometrosAprox&quot; required /&gt;
        &lt;/div&gt;

        @if (IsEdit)
        {
            &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
                &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Coche asignado&lt;/span&gt;
                @if (AddEdit.CocheAsignado != null)
                {
                    &lt;Autocomplete T=&quot;E_Coches&quot;
                                SelectOne=&quot;@((e)=&gt; AddEdit.CocheAsignado = e)&quot;
                                Database=&quot;@DatabaseIdentifiers.Coche&quot;
                                FilterMongo=&quot;@((s)=&gt; Builders&lt;E_Coches&gt;.Filter.Regex(x=&gt; x.Modelo, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                                ToString=&quot;@(x=&gt; $&quot;{x.Modelo} {x.MatriculaFlota}&quot;)&quot;
                                InitialTextValue=&quot;@(string.IsNullOrEmpty(AddEdit.CocheAsignado.Modelo) ? &quot;&quot; :
                    $&quot;{AddEdit.CocheAsignado.Modelo} {AddEdit.CocheAsignado.MatriculaFlota}&quot;)&quot;
                                InitialValue=&quot;string.IsNullOrEmpty(AddEdit.CocheAsignado.Modelo) ? null :
                                AddEdit.CocheAsignado&quot;&gt;
                    &lt;/Autocomplete&gt;
                }
                else
                {
                    &lt;Autocomplete T=&quot;E_Coches&quot;
                                SelectOne=&quot;@((e)=&gt; AddEdit.CocheAsignado = e)&quot;
                                Database=&quot;@DatabaseIdentifiers.Coche&quot;
                                FilterMongo=&quot;@((s)=&gt; Builders&lt;E_Coches&gt;.Filter.Regex(x=&gt; x.Modelo, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                                ToString=&quot;@(x=&gt; $&quot;{x.Modelo}&quot;)&quot;&gt;
                    &lt;/Autocomplete&gt;
                }
            &lt;/div&gt;
        }


        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Fecha y hora de inicio&lt;/span&gt;
            &lt;input type=&quot;datetime-local&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind-value=&quot;AddEdit.FechaInicio&quot; required /&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Fecha y hora de entrega aproximada&lt;/span&gt;
            &lt;input type=&quot;datetime-local&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind-value=&quot;AddEdit.FechaDevolucionAproximada&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;div class=&quot;w-full flex flex-wrap items-center&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot; p-2 rounded bg-blue-400 text-white&quot;
                        @onclick=&quot;@(()=&gt;{ AddEdit.Comentarios.Add(new() {Id = _user.id, Comentario=&quot;&quot;, Fecha=DateTime.Now,Name= $&quot;{_user.name} {_user.surname}&quot;, ProfilePic = _user.profilePic}); InvokeAsync(StateHasChanged);})&quot;&gt;
                    A&ntilde;adir comentario
                &lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-span-12 flex flex-wrap gap-3 py-3&quot;&gt;
            @foreach (var vv in AddEdit.Comentarios)
            {
                &lt;div class=&quot;w-full flex flex-wrap gap-2&quot;&gt;
                    @if (!string.IsNullOrEmpty(vv.Id) != null)
                    {
                        if (!string.IsNullOrEmpty(vv.Id))
                        {
                            &lt;span class=&quot;w-full text-blue-400 text-sm flex flex-wrap justify-between items-center gap-3&quot;&gt;
                                &lt;div class=&quot;w-fit text-sm flex flex-wrap items-center gap-3&quot;&gt;
                                    &lt;div class=&quot;h-[40px] aspect-square rounded-full&quot; style=&quot;background-image: url(@(vv.ProfilePic)); background-size: cover;&quot;&gt;
                                    &lt;/div&gt;

                                    @(vv.Name)
                                &lt;/div&gt;

                                &lt;button type=&quot;button&quot; class=&quot;rounded bg-red-600 text-white py-0 px-1 w-fit h-fit&quot; @onclick=&quot;()=&gt; AddEdit.Comentarios.Remove(vv)&quot;&gt;
                                    &lt;span class=&quot;material-symbols-outlined text-lg w-fit h-fit&quot;&gt;
                                        delete
                                    &lt;/span&gt;
                                &lt;/button&gt;
                            &lt;/span&gt;
                        }
                        else
                        {
                            &lt;div class=&quot;w-fit text-sm flex flex-wrap items-center gap-3&quot;&gt;
                                &lt;div class=&quot;h-[40px] aspect-square rounded-full&quot; style=&quot;background-image: url(@(vv.ProfilePic)); background-size: cover;&quot;&gt;
                                &lt;/div&gt;

                                @(vv.Name)
                            &lt;/div&gt;
                        }
                        &lt;InputTextArea class=&quot;w-full h-[100px] border border-slate-300/50 rounded p-2&quot; @bind-Value=&quot;vv.Comentario&quot; readonly=&quot;@(vv.Id != _user.id)&quot;&gt;&lt;/InputTextArea&gt;
                    }
                    else
                    {
                        &lt;div class=&quot;w-fit text-sm flex flex-wrap items-center gap-3&quot;&gt;
                            @($&quot;&quot;)
                        &lt;/div&gt;
                        &lt;InputTextArea class=&quot;w-full h-[100px] border border-slate-300/50 rounded p-2&quot; @bind-Value=&quot;vv.Comentario&quot; readonly&gt;&lt;/InputTextArea&gt;
                    }
                &lt;/div&gt;
            }
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 flex flex-wrap justify-end items-end p-2 gap-3&quot;&gt;
            &lt;button type=&quot;button&quot; class=&quot;col-span-1 w-fit h-fit p-2 bg-red-600 text-white rounded flex flex-wrap gap-3&quot;
                    @onclick=&quot;@(() =&gt; {getSelectedProject=&quot;&quot;; Close(false);})&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                    cancel
                &lt;/span&gt;
                Cancelar
            &lt;/button&gt;
            &lt;button id=&quot;&quot; type=&quot;submit&quot; class=&quot;bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                    save
                &lt;/span&gt;
                Guardar
            &lt;/button&gt;
        &lt;/div&gt;
    &lt;/form&gt;

    @code {
        private bool OpenedState { get; set; }
        [Parameter] public bool Saved { get; set; }
        [CascadingParameter] public Action<bool> Close { get; set; }
        [Parameter] public E_SolicitudCoche AddEdit { get; set; }
        [Parameter] public E_Coches AddEditStock { get; set; }
        List<E_User> Usuarios = new();
        PaginatedResult<E_SolicitudCoche> Coches = new();
        [Parameter] public List<E_Delegacion> Delegaciones { get; set; } = new();
        bool IsEdit => !string.IsNullOrEmpty(AddEdit.Id);

        public List<E_SolicitudCoche> Documents { get; set; } = new List<E_SolicitudCoche>();
        [Parameter] public string id { get; set; }
        string getSelectedProject { get; set; } = "";

        GetPaginatedCoche filtersCoche = new()
        {
            Search = "",
            PageNumber = 1,
            PageSize = 10
        };

        protected override async Task OnInitializedAsync()
        {
            Delegaciones = await LoadDelegacionesFromDatabase();
        }

        private async Task<List<E_Delegacion>> LoadDelegacionesFromDatabase()
        {
            try
            {
                var collection = _mongoContext.GenericData<E_Delegacion>(DatabaseIdentifiers.Coche, "Delegacion");
                var delegaciones = await collection.Find(_ => true).ToListAsync();
                return delegaciones.Where(d => !string.IsNullOrEmpty(d.Nombre)).ToList();
            }
            catch (Exception ex)
            {
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, "AddEditSolicitud", "LoadDelegacionesFromDatabase", DateTime.UtcNow);
            
                return new List<E_Delegacion>();
            }
        }
        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;

            _disconnection.SaveStatus += (async () =>
            {
                try
                {
                    if (AddEdit != null)
                    {
                    await _localStorage.SetItemAsync("gestioncochesadd", AddEdit);
                    }
                    else
                    {
                        await _localStorage.RemoveItemAsync("gestioncochesadd");
                    }
                }
                catch (Exception)
                { }
            });
        }

        void AddCoche(DataCoche Coche, E_User e)
        {
            Coche.Conductor.Add(e);
            InvokeAsync(StateHasChanged);
        }

        async Task SaveAsync()
        {
            _main.IsLoading = true;
            filtersCoche.MyId = _user.id;

            var pageSize = _main.QueryParameters(_nav)["pageSize"];
            var pageNumber = _main.QueryParameters(_nav)["pageNumber"];

            if (!string.IsNullOrEmpty(pageSize) && !string.IsNullOrEmpty(pageNumber))
            {
                filtersCoche.PageNumber = int.Parse(pageNumber);
                filtersCoche.PageSize = int.Parse(pageSize);
            }

            if (AddEdit.Delegacion == null)
            {
                _snackbar.InsertSnackbar(new("¡Es obligatorio poner la delegación!", "cancel", 10000, "bg-red-600", "text-white"));
                _main.IsLoading = false;
                return;
            }

            try
            {
                var coches = await _mongoContext.GenericData<E_Coches>(DatabaseIdentifiers.Coche, "Coches").Find(_ => true).ToListAsync();
                var solicitudes = await _mongoContext.GenericData<E_SolicitudCoche>(DatabaseIdentifiers.Coche, "SolicitudCoche").Find(_ => true).ToListAsync();

                if (IsEdit)
                {
                    var cocheAsignado = cocheService.AsignarCoche(coches, solicitudes, AddEdit);
                    if (cocheAsignado != null)
                    {
                        AddEdit.CocheAsignado = cocheAsignado;
                        await _mongoContext.EditCoche(cocheAsignado);
                        Console.WriteLine($"Coche asignado: {cocheAsignado.Modelo} ({cocheAsignado.MatriculaFlota})");
                    }
                    await _mongoContext.EditSolicitudCoche(AddEdit);
                }
                else
                {
                    
                    
                        var cocheAsignado = cocheService.AsignarCoche(coches, solicitudes, AddEdit);
                        if (cocheAsignado != null)
                        {
                            AddEdit.CocheAsignado = cocheAsignado;
                            await _mongoContext.EditCoche(cocheAsignado);
                            Console.WriteLine($"Coche asignado: {cocheAsignado.Modelo} ({cocheAsignado.MatriculaFlota})");
                        }
                        else
                        {
                            _snackbar.InsertSnackbar(new("No se pudo asignar un coche.", "cancel", 10000, "bg-red-600", "text-white"));
                            _main.IsLoading = false;
                            return;
                        }

                        // Verificar si el documento ya existe antes de agregar
                        var existingCoche = await _mongoContext.GenericData<E_SolicitudCoche>(DatabaseIdentifiers.Coche, "SolicitudCoche").Find(c => c.Id == AddEdit.Id).FirstOrDefaultAsync();
                        if (existingCoche == null)
                        {
                            AddEdit.Id = ObjectId.GenerateNewId().ToString();
                            await _mongoContext.AddSolictudCoche(AddEdit);
                        }
                        else
                        {
                            _snackbar.InsertSnackbar(new("El coche ya existe en la base de datos.", "cancel", 10000, "bg-red-600", "text-white"));
                            _main.IsLoading = false;
                            return;
                        }
                }
            }     
            catch (Exception ex)
            {
                _snackbar.InsertSnackbar(new($"Error al asignar coche: {ex.Message}", "cancel", 10000, "bg-red-600", "text-white"));
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, "AddEditCoche", "SaveAsync", DateTime.UtcNow);
            
                _main.IsLoading = false;
                return;
            }
            Close(true);
            _main.IsLoading = false;
        }
    }

    `
  },
  {
    "ID": 6,
    "ServicesName": "CerrarSolicitudModal",
    "ServicesRoute": "Components/Areas/GeneralF/GestionCoches/Modals/CerrarSolicitudModal",
    "ServicesDescription":`
    
    `,
    "Code": `
    &lt;form class=&quot;w-full grid grid-cols-12 gap-6 p-4 bg-gray-50 rounded-lg shadow-md&quot;&gt;
        &lt;!-- Informaci&oacute;n general --&gt;
        &lt;div class=&quot;col-span-12 lg:col-span-6 bg-white p-4 rounded shadow-sm&quot;&gt;
            &lt;h2 class=&quot;text-lg font-bold text-blue-500 mb-4&quot;&gt;Detalles de la solicitud&lt;/h2&gt;
            &lt;div class=&quot;space-y-2&quot;&gt;
                &lt;p&gt;&lt;strong&gt;Delegaci&oacute;n:&lt;/strong&gt; @Solicitud.Delegacion.Nombre&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;Conductor:&lt;/strong&gt; @(Solicitud.Conductor != null ? $&quot;{Solicitud.Conductor.Name} {Solicitud.Conductor.LastName}&quot; : &quot;No asignado&quot;)&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;Coche asignado:&lt;/strong&gt; @(Solicitud.CocheAsignado != null ? $&quot;{Solicitud.CocheAsignado.Modelo} ({Solicitud.CocheAsignado.MatriculaFlota})&quot; : &quot;No asignado&quot;)&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;Fecha inicio:&lt;/strong&gt; @(Solicitud.FechaInicio != null ? $&quot;{Solicitud.FechaInicio.Value.ToLocalTime():dd 'de' MMMM 'de' yyyy}&quot; : &quot;No hay fecha de inicio indicada&quot;)&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;Hora inicio:&lt;/strong&gt; @(Solicitud.FechaInicio != null ? $&quot;{Solicitud.FechaInicio.Value.ToLocalTime():HH:mm}&quot; : &quot;No hay hora de inicio indicada&quot;)&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;Kilometraje aproximado:&lt;/strong&gt; @Solicitud.KilometrosAprox&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;!-- Entradas --&gt;
        &lt;div class=&quot;col-span-12 lg:col-span-6 bg-white p-4 rounded shadow-sm&quot;&gt;
            &lt;h2 class=&quot;text-lg font-bold text-blue-500 mb-4&quot;&gt;Cierre de solicitud&lt;/h2&gt;
            &lt;div class=&quot;space-y-4&quot;&gt;
                &lt;div&gt;
                    &lt;label for=&quot;kms-finales&quot; class=&quot;text-blue-400&quot;&gt;Kms finales&lt;/label&gt;
                    &lt;input id=&quot;kms-finales&quot; class=&quot;w-full p-2 border border-gray-300 rounded&quot; @bind-value=&quot;Solicitud.KmFinales&quot; required /&gt;
                &lt;/div&gt;
                &lt;div&gt;
                    &lt;label for=&quot;estacionamiento&quot; class=&quot;text-blue-400&quot;&gt;Estacionamiento&lt;/label&gt;
                    &lt;input id=&quot;estacionamiento&quot; class=&quot;w-full p-2 border border-gray-300 rounded&quot; @bind-value=&quot;Solicitud.Estacionamiento&quot; required /&gt;
                &lt;/div&gt;
                &lt;div&gt;
                    &lt;label for=&quot;fecha-devolucion&quot; class=&quot;text-blue-400&quot;&gt;Fecha y hora de devoluci&oacute;n&lt;/label&gt;
                    &lt;input id=&quot;fecha-devolucion&quot; type=&quot;datetime-local&quot; class=&quot;w-full p-2 border border-gray-300 rounded&quot; @bind-value=&quot;Solicitud.FechaDevolucion&quot; required /&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;!-- Comentarios --&gt;
        &lt;div class=&quot;col-span-12 bg-white p-4 rounded shadow-sm&quot;&gt;
            &lt;h2 class=&quot;text-lg font-bold text-blue-500 mb-4&quot;&gt;Comentarios&lt;/h2&gt;
            &lt;div class=&quot;space-y-4&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot;p-2 bg-blue-400 text-white rounded&quot; 
                    @onclick=&quot;@(()=&gt;{ Solicitud.Comentarios.Add(new() {Id = _user.id, Comentario = &quot;&quot;, Fecha = DateTime.Now, Name = $&quot;{_user.name} {_user.surname}&quot;, ProfilePic = _user.profilePic}); InvokeAsync(StateHasChanged);})&quot;&gt;
                    A&ntilde;adir comentario
                &lt;/button&gt;
                &lt;div class=&quot;space-y-4&quot;&gt;
                    @foreach (var vv in Solicitud.Comentarios)
                    {
                        &lt;div class=&quot;flex items-start space-x-3&quot;&gt;
                            &lt;div class=&quot;h-10 w-10 rounded-full bg-cover bg-center&quot; style=&quot;background-image: url(@(vv.ProfilePic));&quot;&gt;&lt;/div&gt;
                            &lt;div class=&quot;flex-1&quot;&gt;
                                &lt;p class=&quot;text-blue-500 font-bold&quot;&gt;@vv.Name&lt;/p&gt;
                                &lt;textarea class=&quot;w-full p-2 border border-gray-300 rounded&quot; @bind=&quot;vv.Comentario&quot; readonly=&quot;@(vv.Id != _user.id)&quot;&gt;&lt;/textarea&gt;
                            &lt;/div&gt;
                            &lt;button type=&quot;button&quot; class=&quot;text-red-600&quot; @onclick=&quot;()=&gt; Solicitud.Comentarios.Remove(vv)&quot;&gt;
                                &lt;span class=&quot;material-symbols-outlined&quot;&gt;delete&lt;/span&gt;
                            &lt;/button&gt;
                        &lt;/div&gt;
                    }
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;!-- Archivos --&gt;
        &lt;div class=&quot;col-span-12 bg-white p-4 rounded shadow-sm&quot;&gt;
            &lt;h2 class=&quot;text-lg font-bold text-blue-500 mb-4&quot;&gt;Archivos&lt;/h2&gt;
            @if ((Files.Count + internalCoche.Archivos.Count) &lt; (IsEdit ? 8 : 4))
            {
                &lt;label for=&quot;archivos&quot; class=&quot;inline-block p-2 bg-blue-400 text-white rounded cursor-pointer&quot;&gt;Subir archivos&lt;/label&gt;
                &lt;InputFile id=&quot;archivos&quot; hidden multiple OnChange=&quot;LoadFiles&quot; accept=&quot;image/*&quot; /&gt;
            }
            &lt;div class=&quot;grid grid-cols-2 md:grid-cols-4 gap-4 mt-4&quot;&gt;
                @foreach (var v in internalCoche.Archivos)
                {
                    &lt;div class=&quot;col-span-3 aspect-video cursor-pointer&quot; @onclick=&quot;@(()=&gt; OpenModalImage($&quot;https://lpsgrupolatam.s3.sa-east-1.amazonaws.com/ImagenesCoche/{internalCoche.Index}_{internalCoche.Archivos.IndexOf(v)};{Path.GetExtension(v.Nombre)}&quot;))&quot;
                        style=&quot;background-image: url('@($&quot;https://lpsgrupolatam.s3.sa-east-1.amazonaws.com/ImagenesCoche/{internalCoche.Index}_{internalCoche.Archivos.IndexOf(v)};{Path.GetExtension(v.Nombre)}&quot;)');&quot;&gt;
                    &lt;/div&gt;
                }
                @foreach (var v in Files)
                {
                    &lt;div class=&quot;aspect-video bg-cover bg-center rounded&quot; style=&quot;background-image: url('data:@($&quot;{v.contentType};base64,{v.base64data}&quot;)');&quot;&gt;
                    &lt;/div&gt;
                }
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;!-- Bot&oacute;n de cerrar solicitud --&gt;
        &lt;div class=&quot;col-span-12 flex justify-end&quot;&gt;
            &lt;button class=&quot;px-4 py-2 bg-red-600 text-white rounded&quot; @onclick=&quot;CerrarSolicitud&quot;&gt;Cerrar solicitud&lt;/button&gt;
        &lt;/div&gt;
    &lt;/form&gt;

    @code {
        [Parameter] public E_SolicitudCoche Solicitud { get; set; }
        [Parameter] public bool Saved { get; set; }
        [Parameter] public EventCallback<bool> OnCloseModal { get; set; }
        [CascadingParameter] public Action<bool> CloseModal { get; set; }

        List<(string base64data, string contentType, string Name)> Files = new();
        E_SolicitudCoche internalCoche = new E_SolicitudCoche();
        bool IsEdit => !string.IsNullOrEmpty(Solicitud.Id);
        // MemoryStream kmImageStream = null;
        string kmImageExtension = "";

        protected override async Task OnParametersSetAsync()
        {
            if (Solicitud != null)
            {
                if (!IsEdit && !Saved)
                {
                    internalCoche = new E_SolicitudCoche()
                        {
                            Archivos = new(),
                        };
                }
                else
                {
                    internalCoche = Solicitud;
                }
            }
            await InvokeAsync(StateHasChanged);
        }

        async Task LoadFiles(InputFileChangeEventArgs e)
        {
            try
            {
                if ((e.GetMultipleFiles(10000).Count + Files.Count + internalCoche.Archivos.Count) > (IsEdit ? 8 : 4))
                {
                    _snackbar.InsertSnackbar(new($"Demasiados archivos escogidos. Solo puedes escoger {(IsEdit ? 8 : 4) - Files.Count + internalCoche.Archivos.Count} archivos", "cancel", 10000,
                    "bg-amber-600", "text-white"));
                    return;
                }

                int contador = 0;
                foreach (var v in e.GetMultipleFiles(100000))
                {
                    if (v.Size <= 1024000)
                    {
                        var ms = new MemoryStream();
                        await v.OpenReadStream(1024000).CopyToAsync(ms);
                        Files.Add((Convert.ToBase64String(ms.ToArray()), v.ContentType, v.Name));
                    }
                    else
                    {
                        _snackbar.InsertSnackbar(new($"El archivo {v.Name} pesa demasiado. El peso máximo de la imagen debe ser de 1Mb", "cancel", 10000,
                        "bg-amber-600", "text-white"));
                    }
                }
            }
            catch (Exception ex)
            {
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, "CerrarSolicitudModal", "LoadFiles", DateTime.UtcNow);
                throw;
            }
            await InvokeAsync(StateHasChanged);
        }


        private async Task CerrarSolicitud()
        {
            // int contador = 0;

            if (Files.Count + internalCoche.Archivos.Count == 0)
            {
                _snackbar.InsertSnackbar(new("Es obligatorio subir al menos una imagen del kilometraje para cerrar la solicitud.", "cancel", 10000, "bg-red-600", "text-white"));
                return;
            }
            else
            {
                foreach (var v in Files)
                {
                    internalCoche.Archivos.Add(new()
                        {
                            Base64Data = v.base64data,
                            Nombre = v.Name /* Solicitud.Index.ToString()+"_"+ contador + ";.png" */
                        });
                    // contador++;
                }
                Files.Clear();
            }
        
        
            // Cambiar el estado de la solicitud a NoActiva y guardar los cambios en la base de datos
            var result = await CocheService.CerrarSolicitudAsync(Solicitud);

            if (result.IsSuccess)
            {
                Solicitud.EstadoSolicitud = EstadoSolicitud.Cerrada;
                Solicitud.CocheAsignado.Estado = "Disponible";
                // Utilizar el método EditSolicitudCoche para actualizar el estado del coche
                try
                {
                var updateResult = await _mongoContext.EditCoche(Solicitud.CocheAsignado);
                            if (updateResult.IsSuccess)
                            {
                                // Llamar al callback para cerrar el modal y recargar los datos si es necesario
                                CloseModal(true);
                            }
                }
                catch (Exception e)
                {
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "CerrarSolicitudModal", "CerrarSolicitud", DateTime.UtcNow);
                    throw;
                }
            
            }
            await InvokeAsync(StateHasChanged);
        }



        // Modal See Maximized Image
        string ImageRender = "";
        void OpenModalImage(string image)
        {
            ImageRender = image;
            var modal = _modal.ShowModal(typeof(MaximiziedImage), new Dictionary<string, object>
            {
                {nameof(SeeMaximizedImage.Image), ImageRender},
            }, FixedWidth: 80);
            modal.OnCloseModal += CloseModalImage;
        }

        void CloseModalImage(bool success)
        {
            ImageRender = "";
            InvokeAsync(StateHasChanged);
        }
    }
    `
  },  
  {
    "ID": 7,
    "ServicesName": "FileUpload",
    "ServicesRoute": "Components/Areas/GeneralF/GestionCoches/Modals/FileUpload",
    "ServicesDescription":`
    `,
    "Code": `
    //No cuenta con contenido
    `
  },  
  {
    "ID": 8,
    "ServicesName": "MaximizedImage",
    "ServicesRoute": "Components/Areas/GeneralF/GestionCoches/Modals/MaximizedImage",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;div class=&quot;w-full h-[100dvh] relative&quot;&gt;
        &lt;button @onclick=&quot;()=&gt; {Close(false);}&quot;
                class=&quot;absolute top-[30px] right-[30px] p-2 text-xl flex flex-wrap items-center justify-center rounded-full bg-white&quot;&gt;
            &lt;span class=&quot;material-symbols-outlined text-red-600&quot;&gt;
                close
            &lt;/span&gt;
        &lt;/button&gt;

        @if (!string.IsNullOrEmpty(Image))
        {
            &lt;img src=&quot;@(Image)&quot; class=&quot;w-full h-full aspect-auto max-w-full max-h-full rounded&quot; /&gt;
        }
    &lt;/div&gt;

    @code {
        [Parameter] public string Image { get; set; }
        [CascadingParameter] public Action<bool> Close { get; set; }
    }
    `
  },  
  {
    "ID": 9,
    "ServicesName": "OpenImage",
    "ServicesRoute": "Components/Areas/GeneralF/GestionCoches/Modals/OpenImage",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;div class=&quot;w-full h-[100dvh] relative&quot;&gt;
        &lt;button @onclick=&quot;()=&gt; {Close(false);}&quot;
                class=&quot;absolute top-[30px] right-[30px] p-2 text-xl flex flex-wrap items-center justify-center rounded-full bg-white&quot;&gt;
            &lt;span class=&quot;material-symbols-outlined text-red-600&quot;&gt;
                close
            &lt;/span&gt;
        &lt;/button&gt;

        @if (!string.IsNullOrEmpty(Image))
        {
            &lt;img src=&quot;@(Image)&quot; class=&quot;w-full h-full aspect-auto max-w-full max-h-full rounded&quot; /&gt;
        }
    &lt;/div&gt;

    @code {
        [Parameter] public string Image { get; set; }
        [CascadingParameter] public Action<bool> Close { get; set; }
    }
    `
  },  
  {
    "ID": 10,
    "ServicesName": "Index",
    "ServicesRoute": "Components/Areas/GeneralF/GestionCoches/Index",
    "ServicesDescription":`
    `,
    "Code": `
    @page "/gestioncoches"
    @using GestionCochesLogic
    @using LPSGrupo.Components.Areas.GeneralF.GestionCoches.Modals

    &lt;AuthorizePage Permissions=&quot;@(Security.Permisos.PermissionConstantsAdministracion.AdministracionGestionCoches)&quot;&gt;&lt;/AuthorizePage&gt;
    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        &lt;h1 class=&quot; w-full text-3xl text-blue-400&quot; tabindex=&quot;none&quot;&gt;Solicitudes&lt;/h1&gt;
        &lt;h2 class=&quot;w-full text-xl text-slate-950&quot;&gt;Aqu&iacute; se pueden ver las solicitudes de los veh&iacute;culos activas&lt;/h2&gt;

        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsAdministracion.AdministracionAddSolicitud)&quot;&gt;
                    &lt;button class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3&quot;
                            @onclick='()=&gt;{IsSaved=false; OpenModalGestionCoches();}'&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            Directions_car
                        &lt;/span&gt;
                        Solicitud de veh&iacute;culo
                    &lt;/button&gt;
                &lt;/AuthorizedContent&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;



                &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-3 text-sm rounded border border-slate-300&quot; @bind-value=&quot;searchSet&quot;&gt;&lt;/input&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;
            @if (Coches.Documents != null)
            {
                &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Acciones
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Delegaci&oacute;n
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Conductor
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Coche asignado
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[200px]&quot;&gt;
                                Fecha inicio
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Hora inicio
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[200px] &quot;&gt;
                                Kilometraje de itinerario aproximado
                            &lt;/th&gt;

                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var v in Coches.Documents)
                        {
                            &lt;tr&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    &lt;div class=&quot;w-full h-fit flex flex-col gap-3&quot;&gt;
                                        @if (v.EstadoSolicitud == EstadoSolicitud.Cerrada)
                                        {
                                            &lt;p class=&quot;text-black-600&quot;&gt;Solicitud cerrada&lt;/p&gt;
                                            &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsAdministracion.AdministracionVerSolicitud)&quot;&gt;
                                                @*&lt;AuthorizedContent Roles=&quot;@([&quot;Coches.Supervisor&quot;])&quot;&gt;*@
                                                &lt;button class=&quot;w-fit h-fit p-2 rounded bg-gray-400 text-white&quot;
                                                        @onclick=&quot;@(() =&gt; ModalCerrarSolicitud(v.Id))&quot;&gt;
                                                    Ver solicitud
                                                &lt;/button&gt;
                                            &lt;/AuthorizedContent&gt;
                                        }
                                        else
                                        {
                                            &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsAdministracion.AdministracionCerrarSolicitud)&quot;&gt;
                                            
                                            &lt;button class=&quot;w-fit h-fit p-2 rounded bg-red-600 text-white&quot;
                                                    @onclick=&quot;@(() =&gt; ModalCerrarSolicitud(v.Id))&quot;&gt;
                                                Cerrar solicitud
                                            &lt;/button&gt;
                                            &lt;/AuthorizedContent&gt;
                                        }


                                    &lt;/div&gt;
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    &lt;span class=&quot;text-blue-600 hover:underline cursor-pointer&quot; @onclick=&quot;()=&gt; OpenModalGestionCoches(v)&quot;&gt;@v.Delegacion.Nombre&lt;/span&gt;
                                &lt;/td&gt;
                                @if (v.Conductor != null)
                                {
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                        @($&quot;{v.Conductor.Name} {v.Conductor.LastName}&quot;)
                                    &lt;/td&gt;
                                }
                                else
                                {
                                    &lt;span&gt;No asignado&lt;/span&gt;
                                }

                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.CocheAsignado != null ? $&quot;{v.CocheAsignado.Modelo} ({v.CocheAsignado.MatriculaFlota})&quot; : &quot;No asignado&quot;)
                                &lt;/td&gt;

                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                    @(v.FechaInicio != null ? $&quot;{v.FechaInicio.Value.ToLocalTime().Day} de {v.FechaInicio.Value.ToLocalTime().ToString(&quot;MMMM&quot;)} de {v.FechaInicio.Value.ToLocalTime().Year}&quot; : $&quot;No hay fecha de inicio indicada&quot;)
                                &lt;/td&gt;

                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                    @(v.FechaInicio != null ? $&quot;{v.FechaInicio.Value.ToLocalTime().ToString(&quot;HH:mm&quot;)}&quot; : $&quot;No hay hora de inicio indicada&quot;)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                    @(v.KilometrosAprox)
                                &lt;/td&gt;


                            &lt;/tr&gt;
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;


                &lt;Paginator countAllDocuments=&quot;(int)Coches.CountAllDocuments&quot; countPages=&quot;Coches.PageCount&quot; filters=&quot;filtersCoche&quot; ReloadData=&quot;()=&gt;LoadDataApi()&quot;&gt;

                &lt;/Paginator&gt;
            }
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        private string cocheId;
        PaginatedResult<E_SolicitudCoche> Coches = new();
        List<E_User> Conductores = new();
        List<E_SolicitudCoche> Coche = new();
        GetPaginatedCoche filtersCoche = new()
            {
                Search = "",
                PageNumber = 1,
                PageSize = 10,
            };

        string searchSet
        {
            get
            {
                return filtersCoche.Search;
            }
            set
            {
                filtersCoche.Search = value;
                LoadDataApi();
            }
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                _main.BackgroundImage = "";
                await LoadDataApi();
                if (await _localStorage.ContainKeyAsync("cocheadd"))
                {
                    addeditModal = await _localStorage.GetItemAsync<E_SolicitudCoche>("cocheadd");
                    await _localStorage.RemoveItemAsync("cocheadd");
                    IsSaved = true;
                    OpenModalGestionCoches(addeditModal);
                }
                await InvokeAsync(StateHasChanged);
            }
        }

        async Task LoadDataApi()
        {
            try
            {
                _main.IsLoading = true;
                filtersCoche.MyId = _user.id;
                Coches = await _mongoContext.GetPaginatedSolicitudCoche(_mongoUsers, filtersCoche);
                
                await InvokeAsync(StateHasChanged);
                _main.IsLoading = false;
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "AddEditCoche", "CargarUltimasAsignaciones", DateTime.UtcNow);
                throw;
            }
        }

        // Modal cerrar solicitud
        void ModalCerrarSolicitud(E_SolicitudCoche solicitud)
        {
            var modal = _modal.ShowModal(typeof(CerrarSolicitudModal), new Dictionary<string, object>
        {
            {nameof(CerrarSolicitudModal.Solicitud), solicitud}
        }, FixedWidth: 50);

        modal.OnCloseModal += async (bool reload) =>
            {
                if (reload)
                {
                    await LoadDataApi();
                }
            };
            InvokeAsync(StateHasChanged);
        }

        public void ModalCerrarSolicitud(string id)
        {
            var solicitud = Coches.Documents.FirstOrDefault(c => c.Id == id);
            if (solicitud != null)
            {
                ModalCerrarSolicitud(solicitud);
            }
        }


        // Modal Addedit
        public E_SolicitudCoche addeditModal = new E_SolicitudCoche();
        public bool IsSaved = false;
        void OpenModalGestionCoches(E_SolicitudCoche edit = null)
        {
            if (edit != null)
            {
                addeditModal = edit;
            }
            else
            {
                addeditModal = new E_SolicitudCoche();
            }
            var modal = _modal.ShowModal(typeof(AddEditSolicitud), new Dictionary<string, object>
        {
            {nameof(AddEditSolicitud.AddEdit), addeditModal},
            {nameof(AddEditSolicitud.Saved), IsSaved}
        }, FixedWidth: 80);
            modal.OnCloseModal += async (bool reload) =>
            {
                if (reload)
                {
                    await LoadDataApi();
                }
                await InvokeAsync(StateHasChanged);
            };
        }

        async void OpenModalGestionCoches(bool reload)
        {
            addeditModal = new E_SolicitudCoche();
            if (reload)
            {
                await LoadDataApi();
            }
            await Task.Delay(100);
            await _localStorage.RemoveItemAsync("cocheadd");
        }
    }
    `
  },  
  {
    "ID": 11,
    "ServicesName": "StockCoches",
    "ServicesRoute": "Components/Areas/GeneralF/GestionCoches/StockCoches",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        &lt;h1 class=&quot; w-full text-3xl text-blue-400&quot; tabindex=&quot;none&quot;&gt;Flota de coches&lt;/h1&gt;
        &lt;h2 class=&quot;w-full text-xl text-slate-950&quot;&gt;Aqu&iacute; se pueden ver todos los coches de la empresa&lt;/h2&gt;

        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;AuthorizedContent&gt;
                    &lt;button type=&quot;button&quot; class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3&quot; @onclick=&quot;() =&gt; {IsSaved=false; OpenModalStock();}&quot;&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            Directions_car
                        &lt;/span&gt;
                        A&ntilde;adir coche
                    &lt;/button&gt;
                &lt;/AuthorizedContent&gt;
            &lt;/div&gt;
            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-3 text-sm rounded border border-slate-300&quot; @bind=&quot;searchSet&quot;&gt;&lt;/input&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;
            @if (Stock.Documents != null)
            {
                &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Modelo
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Matr&iacute;cula
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Empresa
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Tipo alquiler
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha inicio de contrato
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha fin de contrato
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Duraci&oacute;n de contrato
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Kms actuales
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Kms contratados
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Conductores
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Oficina
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Delegaci&oacute;n
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                SOLRED
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Revisiones
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Cambios
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Pr&oacute;xima revisi&oacute;n
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var v in Stock.Documents)
                        {
                            &lt;tr&gt;

                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    &lt;span class=&quot;text-blue-600 hover:underline cursor-pointer&quot; @onclick=&quot;()=&gt; OpenModalStock(v)&quot;&gt;@v.Modelo&lt;/span&gt;
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.MatriculaFlota)
                                &lt;/td&gt;
                                
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.Empresa)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.TipoAlquiler)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.FechaInicioContrato)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.FechaFinContrato)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.DuracionContrato)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.Kilometraje)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.KmsContratados)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.Conductores)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.Oficina)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.Delegacion?.Nombre ?? &quot;No asignado&quot;)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.SOLRED)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.Revisiones)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.Cambios)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.ProximaRevision)
                                &lt;/td&gt;
                            &lt;/tr&gt;
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;
                &lt;Paginator countAllDocuments=&quot;(int)Stock.CountAllDocuments&quot; countPages=&quot;Stock.PageCount&quot; filters=&quot;filtersStockCoche&quot; ReloadData=&quot;()=&gt;LoadDataApi()&quot;&gt;
                &lt;/Paginator&gt;
            }
        &lt;/div&gt;
    &lt;/div&gt;
    `
  },  
  {
    "ID": 12,
    "ServicesName": "AddRoleModal",
    "ServicesRoute": "Components/Areas/GeneralF/Main/AdminPanel/AddRoleModal",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;div class=&quot;w-full p-2 flex flex-wrap gap-3&quot;&gt;
        &lt;div class=&quot;col-span-12 text-blue-400 font-bold p-2&quot;&gt;
            @(!string.IsNullOrEmpty(add.Id) ? $&quot;Editar perfil&quot; : &quot;A&ntilde;adir perfil&quot;)
        &lt;/div&gt;

        &lt;input type=&quot;text&quot;
            class=&quot;w-full rounded-md border border-slate-300 p-2 text-base shadow-sm&quot;
            @bind-value=&quot;add.Name&quot;
            placeholder=&quot;Nombre del perfil&quot; /&gt;

        @foreach (var key in Permissions.Keys)
        {
            var accordionId = $&quot;accordion_{key}&quot;;

            &lt;div class=&quot;w-full&quot;&gt;
                &lt;button class=&quot;w-full text-center text-lg px-4 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none rounded-md border border-slate-300 shadow-sm transition&quot;
                        type=&quot;button&quot;
                        onclick=@($&quot;toggleAccordion('{accordionId}')&quot;)&gt;
                    @key
                &lt;/button&gt;

                &lt;div id=&quot;@accordionId&quot; class=&quot;hidden border border-t-0 border-slate-400 rounded-b-md shadow-inner px-4 py-2&quot;&gt;
                    &lt;div class=&quot;w-full h-fit flex flex-wrap items-start gap-3 p-2&quot;&gt;
                        @foreach (var permiso in Permissions[key])
                        {
                            &lt;label class=&quot;flex items-center gap-2 w-full&quot;&gt;
                                &lt;input type=&quot;checkbox&quot;
                                    class=&quot;accent-blue-600&quot;
                                    @bind=&quot;VerPermissions[permiso]&quot; /&gt;
                                &lt;span class=&quot;text-base&quot;&gt;@permiso&lt;/span&gt;
                            &lt;/label&gt;
                        }
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        }

        &lt;div class=&quot;w-full flex flex-wrap justify-end&quot;&gt;
            &lt;button class=&quot;rounded bg-blue-500 hover:bg-blue-600 text-white text-base px-4 py-2 shadow-md transition&quot;
                    @onclick=&quot;Save&quot;&gt;
                Guardar
            &lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;script&gt;
        function toggleAccordion(id) {
            const element = document.getElementById(id);
            if (element) {
                element.classList.toggle(&quot;hidden&quot;);
            }
        }
    &lt;/script&gt;

    @code {
        [CascadingParameter] public Action<bool> Close { get; set; }

        [Parameter] public bool Saved { get; set; }
        [Parameter] public E_Role Perfil { get; set; }


        AddRoleDTORequest add = new();
        EditRoleDTORequest role = null;
        bool IsEdit => !string.IsNullOrEmpty(add.Id);


        protected override async Task OnParametersSetAsync()
        {
            if (Perfil != null && !string.IsNullOrEmpty(Perfil.Id))
            {
                // ✅ Obtener directamente desde MongoDB
                var result = await _mongoContext.GetOneRoles(Perfil.Id);

                if (result != null && result.IsSuccess && result.Value != null)
                {
                    var fullRole = result.Value;
                    add.Id = fullRole.Id;
                    add.Name = fullRole.Name;
                    add.Claims = fullRole.Claims;

                    foreach (var permiso in add.Claims)
                        VerPermissions[permiso] = true;

                }
                else
                {
                    _snackbar.InsertSnackbar(new("No se pudo cargar el perfil", "error", 6000, "bg-red-500", "text-white"));
                }
            }
            else
            {
                add = new(); // Modo crear
            }
        }



        List<Type> PermissionsClasses = new()
        {
            

            typeof(PermissionConstantsAdministracion),
            typeof(PermissionConstantsLogistica),
            typeof(PermissionConstantsMovil),
            typeof(PermissionConstantsRRHH),
            typeof(PermissionConstantsSoporte)

        };

        protected override async Task OnInitializedAsync()
        {
            foreach (var permClass in PermissionsClasses)
            {
                var permisos = permClass
                    .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static)
                    .Select(f => f.GetValue(null)?.ToString())
                    .Where(p => !string.IsNullOrWhiteSpace(p))
                    .ToList();

                var key = permClass.Name.Replace("PermissionConstants", "");
                Permissions[key] = permisos;

                foreach (var permiso in permisos)
                {
                    VerPermissions[permiso] = false;
                }
            }
        }


        Dictionary<string, List<string>> Permissions = new();
        Dictionary<string, bool> VerPermissions = new();

        async Task Save()
        {
            try
            {
                add.Claims = VerPermissions
                    .Where(p => p.Value)
                    .Select(p => p.Key)
                    .ToList();

                HttpResponseMessage response;

                if (!string.IsNullOrEmpty(add.Id))
                {
                    // Editar
                    response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_RoleAPIRoutes.EditE_Role}", add);
                }
                else
                {
                    // Crear
                    response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_RoleAPIRoutes.AddE_Role}", add);
                }

                var data = await response.Content.ReadFromJsonAsync<Result<string>>();

                if (data.IsSuccess)
                {
                    _snackbar.InsertSnackbar(new(
                        add.Id != null ? "Rol editado" : "Rol añadido",
                        "check", 5000, "bg-teal-400", "text-white"
                    ));

                    Close(true);
                }
                else
                {
                    _snackbar.InsertSnackbar(new(
                        data.Errors.Count > 0 ? data.Errors[0] : "Algo ha ocurrido",
                        "cancel", 10000, "bg-red-600", "text-white"
                    ));
                }
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "AddRoleModal", "Save", DateTime.UtcNow);
                throw;
            }
        }

    }
    `
  },  
  {
    "ID": 13,
    "ServicesName": "AssignClaimsToRole",
    "ServicesRoute": "Components/Areas/GeneralF/Main/AdminPanel/AssignClaimsToRole",
    "ServicesDescription":`
    `,
    "Code": `
    @if (role != null)
    {
        &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
            &lt;h1 class=&quot; w-full text-3xl text-white font-bold&quot; tabindex=&quot;none&quot;&gt;Rol @(role.Name)&lt;/h1&gt;

            &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
                &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;/div&gt;

            &lt;/div&gt;

            &lt;div class=&quot;w-full overflow-x-auto flex flex-wrap justify-between items-center&quot;&gt;
                &lt;table class=&quot;overflow-x-auto w-full table-auto border border-collapse border-slate-300/50&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot; p-2 border border-slate-300/50 bg-slate-50&quot;&gt;
                                Nombre
                            &lt;/th&gt;

                            &lt;th class=&quot; p-2 border border-slate-300/50 bg-slate-50&quot;&gt;
                                En uso
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var v in Permissions)
                        {
                            &lt;tr&gt;
                                &lt;td class=&quot; p-2 bg-white border border-slate-300/50&quot;&gt;
                                    @(v.Key)
                                &lt;/td&gt;

                                &lt;td class=&quot; p-2 bg-white border border-slate-300/50&quot;&gt;
                                    &lt;Checkbox Checked=@(VerPermissions[v.Key]) Message=&quot;@($&quot;Ver permisos de {v.Key}&quot;)&quot; FontSize=&quot;text-base&quot;
                                    ChangeCheck=&quot;@(()=&gt;{
                                                VerPermissions[v.Key] = !VerPermissions[v.Key];
                                                InvokeAsync(StateHasChanged);
                                        })&quot;&gt;&lt;/Checkbox&gt;
                                &lt;/td&gt;
                            &lt;/tr&gt;
                            if (VerPermissions[v.Key])
                            {
                                foreach (var z in v.Value)
                                {
                                    &lt;tr&gt;
                                        &lt;td class=&quot; p-2 border border-slate-300/50 bg-white&quot;&gt;
                                            @(z)
                                        &lt;/td&gt;

                                        &lt;td class=&quot; p-2 border border-slate-300/50 bg-white&quot;&gt;
                                            &lt;Checkbox Checked=@(role.Claims.Contains(z)) Message=&quot;En uso&quot; FontSize=&quot;text-base&quot;
                                            ChangeCheck=&quot;@(()=&gt;{
                                                if(role.Claims.Contains(z))
                                                {
                                                    role.Claims.Remove(role.Claims.First(x=&gt; x== z));
                                                }
                                                else{
                                                    role.Claims.Add(z);
                                                }
                                                InvokeAsync(StateHasChanged);
                                        })&quot;&gt;&lt;/Checkbox&gt;
                                        &lt;/td&gt;
                                    &lt;/tr&gt;
                                }
                            }
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;
            &lt;div class=&quot;w-full flex flex-wrap justify-end items-center&quot;&gt;
                &lt;button class=&quot;rounded bg-blue-400 text-white w-fit text-xl h-fit p-2&quot; @onclick=&quot;Save&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    }

    @code {
        [Parameter] public string id { get; set; }

        EditRoleDTORequest role = null;

        List<Type> PermissionsClasses = new()
        {
            typeof(PermissionConstantsAlmacen), typeof(PermissionConstantsCompras), typeof(PermissionConstantsListaMateriales),
            typeof(PermissionConstantsProductos), typeof(PermissionConstantsProveedor)
            , typeof(PermissionConstantsPeruConstruccion), typeof(PermissionConstantsPeruDigitalizacion), typeof(PermissionConstantsPeruIngenieria)
            , typeof(PermissionConstantsPeruPlanos), typeof(PermissionConstantsPeruSegmentacion),
            typeof(PermissionConstantsVisitas),typeof(PermissionConstantsFestivos),typeof(PermissionConstantsEmplazamientos)
            ,typeof(PermissionConstantsSeguimiento),typeof(PermissionConstantsProyecto)
            ,typeof(PermissionConstantsSeguimientoPlanoPeru),typeof(PermissionConstantsSeguimientoIngenieriaPeru)
            ,typeof(PermissionConstantsIncidencia),
            typeof(PermissionConstantsAprobaciones), typeof(PermissionConstantsProcesoSeleccion),
            typeof(PermissionConstantsSeguimientoE2E),
            typeof(PermissionConstantsSavedForms), typeof(PermissionConstantsForm),
            typeof(PermissionConstantsProyectoRadio),typeof(PermissionConstantsTecnologiasRadio),typeof(PermissionConstantsTrabajoRadio),
            typeof(PermissionConstantsSolicitud),
            typeof(PermissionsConstantsSolicitudDiseñoF),
            typeof(PermissionConstantsVisitasFibra),
            typeof(PermissionConstantsAdministracion),
            typeof(PermissionConstantsLogistica),
            typeof(PermissionConstantsMovil),
            typeof(PermissionConstantsRRHH),
            typeof(PermissionConstantsSoporte)
        };

        Dictionary<string, List<string>> Permissions = new();
        Dictionary<string, bool> VerPermissions = new();

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = "../Images/Identity/BackAdmin.jpg";
            _main.IsLoading = true;
            await LoadRoles();
            await LoadClaims();
            _main.IsLoading = false;
        }

        async Task LoadRoles()
        {
            try
            {
                var response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_RoleAPIRoutes.GetOneE_Role}", new GetOneUserDTORequest() { Id = id });
                var data = await response.Content.ReadFromJsonAsync<Result<EditRoleDTORequest>>();
                role = data.Value;
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "AssignClaimsToRole", "LoadRoles", DateTime.UtcNow);
                throw;
            }
        }

        async Task LoadClaims()
        {
            List<string> allClaims = new();
            List<string> ParsedTools = new();
            foreach (var v in PermissionsClasses)
            {
                foreach (var x in v.GetFields(BindingFlags.Public | BindingFlags.Static))
                {
                    allClaims.Add(x.GetValue(null).ToString());
                }
            }

            foreach (var v in allClaims)
            {
                var splitted = v.Split('.')[0];
                if (!ParsedTools.Contains(splitted))
                {
                    ParsedTools.Add(splitted);
                }
            }

            foreach (var v in ParsedTools)
            {
                Permissions.Add(v, allClaims.Where(x => x.Split('.')[0] == v).ToList());
            }

            foreach (var v in Permissions)
            {
                VerPermissions.Add(v.Key, false);
            }
        }

        async Task Save()
        {
            try
            {
                _main.IsLoading = true;
                await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_RoleAPIRoutes.EditE_Role}", role);
                _main.IsLoading = false;
                _nav.NavigateTo("/roles");
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "AssignClaimsToRole", "Save", DateTime.UtcNow);
                throw;
            }
        }
    }
    `
  },  
  {
    "ID": 14,
    "ServicesName": "AssignRolesToUser",
    "ServicesRoute": "Components/Areas/GeneralF/Main/AdminPanel/AssignRolesToUser",
    "ServicesDescription":`
    `,
    "Code": `
    @if (user != null &amp;&amp; roles.Documents != null)
    {
        &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
            &lt;h1 class=&quot; w-full text-3xl text-white font-bold&quot; tabindex=&quot;none&quot;&gt;Usuario @(user.Email)&lt;/h1&gt;

            &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
                &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;/div&gt;

            &lt;/div&gt;

            &lt;div class=&quot;w-full overflow-x-auto flex flex-wrap justify-between items-center&quot;&gt;
                &lt;table class=&quot;overflow-x-auto w-full table-auto border border-collapse border-slate-300/50&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot; p-2 border border-slate-300/50 bg-slate-50&quot;&gt;
                                Nombre
                            &lt;/th&gt;

                            &lt;th class=&quot; p-2 border border-slate-300/50 bg-slate-50&quot;&gt;
                                En uso
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var v in roles.Documents)
                        {
                            &lt;tr&gt;
                                &lt;td class=&quot; p-2 border border-slate-300/50 bg-white&quot;&gt;
                                    @(v.Name)
                                &lt;/td&gt;

                                &lt;td class=&quot; p-2 border border-slate-300/50 bg-white&quot;&gt;
                                    &lt;Checkbox Checked=@(user.Roles.Select(c=&gt;c.Name).Contains(v.Name)) Message=&quot;En uso&quot; FontSize=&quot;text-base&quot;
                                            ChangeCheck=&quot;@(()=&gt;{
                                                if(user.Roles.Select(c=&gt;c.Name).Contains(v.Name))
                                                {
                                                    user.Roles.Remove(user.Roles.First(x=&gt; x.Name == v.Name));
                                                }
                                                else{
                                                    user.Roles.Add(v);
                                                }
                                                InvokeAsync(StateHasChanged);
                                        })&quot;&gt;&lt;/Checkbox&gt;
                                &lt;/td&gt;
                            &lt;/tr&gt;
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;
            &lt;Paginator countAllDocuments=&quot;(int)roles.CountAllDocuments&quot; countPages=&quot;roles.PageCount&quot; filters=&quot;get&quot; ReloadData=&quot;()=&gt;LoadRoles()&quot;&gt;&lt;/Paginator&gt;
            &lt;div class=&quot;w-full flex flex-wrap justify-end items-center&quot;&gt;
                &lt;button class=&quot;rounded bg-blue-400 text-white w-fit text-xl h-fit p-2&quot; @onclick=&quot;Save&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    }

    @code {
        [Parameter] public string id { get; set; }
        EditUserDTORequest user = null;
        PaginatedResult<EditRoleDTORequest> roles = new();

        GetPaginatedRoleDTORequest get = new()
        {
            PageNumber = 1,
            PageSize = 10,
            Search = ""
        };

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = "../Images/Identity/BackAdmin.jpg";
            await LoadUsers();
            await LoadRoles();
        }

        async Task LoadUsers()
        {
            try
            {
                var response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_UserAPIRoutes.GetOneE_User}", new GetOneUserDTORequest() { Id = id });
                var data = await response.Content.ReadFromJsonAsync<Result<EditUserDTORequest>>();
                user = data.Value;
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "AssignRolesToUser", "LoadUsers", DateTime.UtcNow);
                throw;
            }
        }

        async Task LoadRoles()
        {
            try
            {
                var response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_RoleAPIRoutes.GetPaginatedE_Role}", get);
                roles = await response.Content.ReadFromJsonAsync<PaginatedResult<EditRoleDTORequest>>();
                await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "AssignRolesToUser", "LoadRoles", DateTime.UtcNow);
                throw;
            }
        }

        async Task Save()
        {
            try
            {
                _main.IsLoading = true;
                await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_UserAPIRoutes.EditE_User}", user);
                _main.IsLoading = false;
                _nav.NavigateTo("/users");
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "AssignRolesToUser", "Save", DateTime.UtcNow);
                throw;
            }
        }
    }
    `
  },  
  {
    "ID": 15,
    "ServicesName": "Roles",
    "ServicesRoute": "Components/Areas/GeneralF/Main/AdminPanel/Roles",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;AuthorizePage Roles=&quot;@(new(){&quot;Admin&quot;})&quot;&gt;&lt;/AuthorizePage&gt;
    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        &lt;h1 class=&quot; w-full text-3xl text-white font-bold&quot; tabindex=&quot;none&quot;&gt;Roles&lt;/h1&gt;
        &lt;h2 class=&quot;w-full text-xl text-slate-950&quot;&gt;Aqu&iacute; se pueden ver todos los roles registrados&lt;/h2&gt;

        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;button class=&quot;rounded bg-blue-400 text-white w-fit text-xl h-fit p-2&quot; @onclick=&quot;OpenModalRole&quot;&gt;A&ntilde;adir rol&lt;/button&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;input type=&quot;search&quot; class=&quot;p-2 border border-slate-300/50&quot; placeholder=&quot;Buscar...&quot; @bind-value=&quot;ChangeSearch&quot; /&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-full overflow-x-auto flex flex-wrap justify-between items-center&quot;&gt;
            @if (data != null)
            {
                &lt;table class=&quot;overflow-x-auto w-full table-auto border border-collapse border-slate-300/50&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot; p-2 border border-slate-300/50 bg-slate-50&quot;&gt;
                                Acciones
                            &lt;/th&gt;

                            &lt;th class=&quot; p-2 border border-slate-300/50 bg-slate-50&quot;&gt;
                                Nombre
                            &lt;/th&gt;

                            &lt;th class=&quot; p-2 border border-slate-300/50 bg-slate-50&quot;&gt;
                                N&ordm; de permisos
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var v in data.Documents)
                        {
                            &lt;tr&gt;
                                &lt;td class=&quot; p-2 border border-slate-300/50 bg-white&quot;&gt;
                                    &lt;div class=&quot;w-fit flex flex-wrap gap-2&quot;&gt;
                                        &lt;button class=&quot;rounded p-2 bg-blue-400 text-white shadow-md flex flex-wrap items-center&quot; @onclick=&quot;@(()=&gt; _nav.NavigateTo($&quot;/roles/{v.Id}&quot;))&quot;&gt;
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                edit
                                            &lt;/span&gt;
                                        &lt;/button&gt;
                                    &lt;/div&gt;
                                &lt;/td&gt;

                                &lt;td class=&quot; p-2 border border-slate-300/50 bg-white&quot;&gt;
                                    @(v.Name)
                                &lt;/td&gt;

                                &lt;td class=&quot; p-2 border border-slate-300/50 bg-white&quot;&gt;
                                    @(v.Claims.Count)
                                &lt;/td&gt;
                            &lt;/tr&gt;
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;
            }
        &lt;/div&gt;

        @if (data != null)
        {
            &lt;Paginator countAllDocuments=&quot;(int)data.CountAllDocuments&quot; countPages=&quot;data.PageCount&quot; filters=&quot;get&quot; ReloadData=&quot;()=&gt;LoadAPI()&quot;&gt;&lt;/Paginator&gt;
        }
    &lt;/div&gt;

    @code {
        public GetPaginatedRoleDTORequest get { get; set; } = new()
        {
            PageNumber = 1,
            PageSize = 10,
            Search = ""
        };

        string ChangeSearch
        {
            get
            {
                return get.Search;
            }
            set
            {
                get.Search = value;
                LoadAPI();
            }
        }

        PaginatedResult<EditRoleDTORequest> data { get; set; } = null;

        void OpenModalRole()
        {
            var modal = _modal.ShowModal(typeof(AddRoleModal), default, FixedWidth: 60);
            modal.OnCloseModal += (b) => CloseModalRole(b);
        }

        void CloseModalRole(bool success)
        {
            if (success)
            {
                LoadAPI();
                InvokeAsync(StateHasChanged);
            }
        }

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = "../Images/Identity/BackAdmin.jpg";
            await LoadAPI();
        }

        public async Task LoadAPI()
        {
            try
            {
                _main.IsLoading = true;
                var response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_RoleAPIRoutes.GetPaginatedE_Role}", get);
                data = await response.Content.ReadFromJsonAsync<PaginatedResult<EditRoleDTORequest>>();
                await InvokeAsync(StateHasChanged);
                _main.IsLoading = false;
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "Roles", "LoadAPI", DateTime.UtcNow);
                throw;
            }
        }
    }
    `
  },  
  {
    "ID": 16,
    "ServicesName": "Users",
    "ServicesRoute": "Components/Areas/GeneralF/Main/AdminPanel/Users",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;AuthorizePage Permissions=&quot;@(Security.Permisos.PermissionConstantsAdministracion.AdministracionVerUsuarios)&quot;&gt;&lt;/AuthorizePage&gt;
    &lt;div class=&quot;w-full flex p-6 gap-3&quot;&gt;
        &lt;!-- Secci&oacute;n de Usuarios (70%) --&gt;
        &lt;div class=&quot;w-[65%] flex flex-col gap-3&quot;&gt;
            &lt;h1 class=&quot;text-3xl text-white font-bold&quot;&gt;Usuarios&lt;/h1&gt;

            &lt;div class=&quot;flex justify-between items-center&quot;&gt;
                &lt;!-- Botones --&gt;
                &lt;div class=&quot;flex gap-3&quot;&gt;
                    &lt;button class=&quot;rounded bg-blue-400 text-white text-xl p-2&quot; @onclick=&quot;@(() =&gt; _nav.NavigateTo(&quot;/register&quot;))&quot;&gt;
                        A&ntilde;adir usuario
                    &lt;/button&gt;
                &lt;/div&gt;
                &lt;div&gt;
                    &lt;input type=&quot;search&quot; class=&quot;p-2 border border-slate-300/50 rounded-md&quot; placeholder=&quot;Buscar usuario...&quot; @bind-value=&quot;ChangeSearch&quot; /&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;!-- Tabla de Usuarios --&gt;
            &lt;div class=&quot;overflow-x-auto mt-4&quot;&gt;
                @if (data != null)
                {
                    &lt;table class=&quot;w-full table-auto border-collapse rounded-lg shadow-md overflow-hidden bg-white&quot;&gt;
                        &lt;thead class=&quot;bg-slate-100 text-slate-700 text-left&quot;&gt;
                            &lt;tr&gt;
                                &lt;th class=&quot;p-3 border-b border-slate-300 font-semibold&quot;&gt;Acciones&lt;/th&gt;
                                &lt;th class=&quot;p-3 border-b border-slate-300 font-semibold&quot;&gt;Nombre&lt;/th&gt;
                                &lt;th class=&quot;p-3 border-b border-slate-300 font-semibold&quot;&gt;Apellidos&lt;/th&gt;
                                &lt;th class=&quot;p-3 border-b border-slate-300 font-semibold&quot;&gt;Correo electr&oacute;nico&lt;/th&gt;
                                &lt;th class=&quot;p-3 border-b border-slate-300 font-semibold&quot;&gt;Tel&eacute;fono&lt;/th&gt;
                            &lt;/tr&gt;
                        &lt;/thead&gt;
                        &lt;tbody&gt;
                            @foreach (var v in data.Documents)
                            {
                                &lt;tr class=&quot;hover:bg-slate-50 transition-colors duration-200&quot;&gt;
                                    &lt;td class=&quot;p-3 border-b border-slate-200&quot;&gt;
                                        &lt;div class=&quot;flex gap-2&quot;&gt;
                                            @*
                                            &lt;button class=&quot;rounded bg-blue-400 text-white p-2 shadow hover:bg-blue-500 transition-colors&quot; @onclick=&quot;@(() =&gt; _nav.NavigateTo($&quot;/register/{v.Id}&quot;))&quot;&gt;
                                                &lt;span class=&quot;material-symbols-outlined&quot;&gt;edit&lt;/span&gt;
                                            &lt;/button&gt;*@
                                            &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsAdministracion.AdministracionCrearEliminarEditarPerfil)&quot;&gt;
                                                &lt;button class=&quot;rounded bg-blue-400 text-white p-2 shadow hover:bg-blue-500 transition-colors&quot; @onclick=&quot;@(() =&gt; _nav.NavigateTo($&quot;/register/{v.Id}&quot;))&quot;&gt;
                                                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;edit&lt;/span&gt;
                                                &lt;/button&gt;
                                            &lt;/AuthorizedContent&gt;
                                            &lt;button class=&quot;p-2 rounded bg-red-600 text-white&quot; @onclick=&quot;()=&gt;{IdBorrarUsuario = v.Id; OpenModalConfirmationUsuario();}&quot;&gt;
                                                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                    delete
                                                &lt;/span&gt;
                                            &lt;/button&gt;
                                            &lt;button class=&quot;@($&quot;px-3 py-1 rounded-full text-sm font-medium transition-colors {(v.Confirmed ? &quot;bg-green-100 text-green-700&quot; : &quot;bg-red-100 text-red-700&quot;)}&quot;)&quot;
                                            @onclick=&quot;() =&gt; ToggleConfirmed(v)&quot;&gt;
                                                @(v.Confirmed ? &quot;S&iacute;&quot; : &quot;No&quot;)
                                            &lt;/button&gt;
                                        &lt;/div&gt;
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-3 border-b border-slate-200&quot;&gt;@v.Name&lt;/td&gt;
                                    &lt;td class=&quot;p-3 border-b border-slate-200&quot;&gt;@v.LastName&lt;/td&gt;
                                    &lt;td class=&quot;p-3 border-b border-slate-200&quot;&gt;@v.Email&lt;/td&gt;
                                    &lt;td class=&quot;p-3 border-b border-slate-200&quot;&gt;@v.Tel&lt;/td&gt;
                                    &lt;td class=&quot;p-3 border-b border-slate-200&quot;&gt;
                                    &lt;/td&gt;
                                &lt;/tr&gt;
                            }
                        &lt;/tbody&gt;
                    &lt;/table&gt;
                }
            &lt;/div&gt;

            &lt;!-- Paginador --&gt;
            @if (data != null)
            {
                &lt;Paginator countAllDocuments=&quot;(int)data.CountAllDocuments&quot; countPages=&quot;data.PageCount&quot; filters=&quot;get&quot; ReloadData=&quot;()=&gt;LoadAPI()&quot;&gt;&lt;/Paginator&gt;
            }
        &lt;/div&gt;

        &lt;!-- Secci&oacute;n de Roles (30%) --&gt;
        &lt;div class=&quot;w-[35%] flex flex-col gap-3&quot;&gt;
            &lt;h1 class=&quot;text-3xl text-white font-bold&quot;&gt;Perfiles&lt;/h1&gt;

            &lt;div class=&quot;flex justify-between items-center&quot;&gt;

                &lt;div class=&quot;flex gap-3&quot;&gt;
                    &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsAdministracion.AdministracionCrearEliminarEditarPerfil)&quot;&gt;

                        &lt;button class=&quot;rounded bg-blue-400 text-white text-xl p-2&quot; @onclick='()=&gt; OpenModalRole()'&gt;
                            Crear perfil
                        &lt;/button&gt;
                    &lt;/AuthorizedContent&gt;
                &lt;/div&gt;
                &lt;!-- Buscador --&gt;
                &lt;div&gt;
                    &lt;input type=&quot;search&quot; class=&quot;p-2 border border-slate-300/50 rounded-md&quot; placeholder=&quot;Buscar perfil...&quot; @bind-value=&quot;ChangeSearchPerfiles&quot; /&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;div class=&quot;overflow-x-auto mt-4&quot;&gt;
                @if (rolesData != null)
                {
                    &lt;table class=&quot;w-full table-auto border-collapse rounded-lg shadow-md overflow-hidden bg-white&quot;&gt;
                        &lt;thead class=&quot;bg-slate-100 text-slate-700 text-left&quot;&gt;
                            &lt;tr&gt;
                                &lt;th class=&quot;p-3 border-b border-slate-300 font-semibold&quot;&gt;Acciones&lt;/th&gt;
                                &lt;th class=&quot;p-3 border-b border-slate-300 font-semibold&quot;&gt;Perfiles&lt;/th&gt;
                            &lt;/tr&gt;
                        &lt;/thead&gt;
                        &lt;tbody&gt;
                            @foreach (var role in rolesData.Documents)
                            {
                                &lt;tr class=&quot;hover:bg-slate-50 transition-colors duration-200&quot;&gt;
                                    &lt;td class=&quot;p-3 border-b border-slate-200&quot;&gt;
                                        &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsAdministracion.AdministracionCrearEliminarEditarPerfil)&quot;&gt;

                                            &lt;button class=&quot;rounded bg-blue-400 text-white p-2 shadow hover:bg-blue-500 transition-colors&quot;
                                            @onclick='()=&gt; OpenModalRole(new EditRoleDTORequest { Id = role.Id })'&gt;
                                                &lt;span class=&quot;material-symbols-outlined&quot;&gt;edit&lt;/span&gt;
                                            &lt;/button&gt;

                                            &lt;button class=&quot;p-2 rounded bg-red-600 text-white&quot; @onclick=&quot;()=&gt;{IdBorrarPerfil = role.Id; OpenModalConfirmation();}&quot;&gt;
                                                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                    delete
                                                &lt;/span&gt;
                                            &lt;/button&gt;

                                        &lt;/AuthorizedContent&gt;
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-3 border-b border-slate-200&quot;&gt;@role.Name&lt;/td&gt;
                                &lt;/tr&gt;
                            }
                        &lt;/tbody&gt;
                    &lt;/table&gt;
                }
            &lt;/div&gt;

            &lt;!-- Paginador de Roles --&gt;
            @if (rolesData != null)
            {
                &lt;Paginator countAllDocuments=&quot;(int)rolesData.CountAllDocuments&quot; countPages=&quot;rolesData.PageCount&quot; filters=&quot;perfilesGet&quot; ReloadData=&quot;()=&gt;LoadRolesAPI()&quot;&gt;&lt;/Paginator&gt;
            }
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        // Perfil = role
        public GetPaginatedUserDTORequest get { get; set; } = new() { PageNumber = 1, PageSize = 10, Search = "" };
        public GetPaginatedRoleDTORequest perfilesGet { get; set; } = new() { PageNumber = 1, PageSize = 10, Search = "" };

        string ChangeSearch
        {
            get { return get.Search; }
            set
            {
                get.Search = value;
                LoadAPI();
            }
        }

        string ChangeSearchPerfiles
        {
            get { return perfilesGet.Search; }
            set
            {
                perfilesGet.Search = value;
                LoadRolesAPI();
            }
        }

        // Modal borrar Perfil
        public string IdBorrarPerfil = "";
        void OpenModalConfirmation()
        {
            var modal = _modal.ShowModal(typeof(ConfirmationModal), default, FixedWidth: 60);

            modal.OnCloseModal += DeletePerfil;
        }

        async void DeletePerfil(bool success)
        {
            if (success)
            {
                Console.WriteLine($"Intentando borrar perfil con ID: {IdBorrarPerfil}");

                _main.IsLoading = true;
                try
                {
                    await _mongoContext.DeletePerfil(IdBorrarPerfil);
                    Console.WriteLine("Borrado completado.");
                    await LoadRolesAPI(); // Asegúrate de recargar los roles
                }
                catch (Exception e)
                {
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "UsersPage", "DeletePerfil", DateTime.UtcNow);
                    Console.WriteLine($"Error al borrar: {e.Message}");
                    throw;
                }
                finally
                {
                    _main.IsLoading = false; // <-- IMPORTANTE
                    StateHasChanged();       // <-- Forzamos el refresco si es necesario
                }
            }
        }

        private async Task ToggleConfirmed(EditUserDTORequest user)
        {
            try
            {
                var newStatus = !user.Confirmed;
                var result = await _mongoContext.ToggleUserConfirmed(user.Id, newStatus);
                if (result.IsSuccess)
                {
                    user.Confirmed = newStatus;
                    await InvokeAsync(StateHasChanged);
                }
                else
                {
                    // Puedes mostrar un mensaje de error si quieres
                    Console.WriteLine("No se pudo actualizar el estado del usuario.");
                }
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "Users", "ToggleConfirmed", DateTime.UtcNow);
            }
        }


        // Modal borrar Usuario
        public string IdBorrarUsuario = "";
        void OpenModalConfirmationUsuario()
        {
            var modal = _modal.ShowModal(typeof(ConfirmationModal), default, FixedWidth: 60);
            modal.OnCloseModal += DeleteUsuario;
        }

        async void DeleteUsuario(bool success)
        {
            if (success)
            {
                Console.WriteLine($"Intentando borrar perfil con ID: {IdBorrarUsuario}");
                _main.IsLoading = true;
                try
                {
                    await _mongoContext.DeleteUser(IdBorrarUsuario);
                    Console.WriteLine("Borrado completado.");
                    await LoadAPI(); // Recarga la tabla de usuarios
                }
                catch (Exception e)
                {
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "UsersPage", "DeleteUsuario", DateTime.UtcNow);
                    Console.WriteLine($"Error al borrar: {e.Message}");
                    throw;
                }
                finally
                {
                    _main.IsLoading = false; // <-- IMPORTANTE
                    StateHasChanged();       // <-- Forzamos el refresco si es necesario
                }
            }
        }

        PaginatedResult<EditUserDTORequest> data { get; set; } = null;
        PaginatedResult<EditRoleDTORequest> rolesData { get; set; } = null;
        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = "../Images/Identity/BackAdmin.jpg";
            await LoadAPI();
            await LoadRolesAPI();
        }

        public EditUserDTORequest _Perfil = new EditUserDTORequest();
        async Task OpenModalRole(EditRoleDTORequest roleDTO = null)
        {
            E_Role perfilCompleto;
            if (roleDTO != null && !string.IsNullOrEmpty(roleDTO.Id))
            {
                var result = await _mongoContext.GetOneRoles(roleDTO.Id);
                if (result.IsSuccess && result.Value != null)
                {
                    perfilCompleto = result.Value;
                }
                else
                {
                    // Manejo de error si no se encuentra o falla
                    perfilCompleto = new E_Role(); // O muestra una alerta si prefieres
                }
            }
            else
            {
                perfilCompleto = new E_Role();
            }
            var modal = _modal.ShowModal(typeof(AddRoleModal), new Dictionary<string, object>
        {
            { "Perfil", perfilCompleto }
        }, FixedWidth: 60);
            modal.OnCloseModal += (b) => CloseModalRole(b);
        }

        void CloseModalRole(bool success)
        {
            if (success)
            {
                LoadRolesAPI();
                InvokeAsync(StateHasChanged);
            }
        }

        public async Task LoadAPI()
        {
            try
            {
                _main.IsLoading = true;
                // var response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_UserAPIRoutes.GetPaginatedE_User}", get);
                // data = await response.Content.ReadFromJsonAsync<PaginatedResult<EditUserDTORequest>>();
                var result = await _mongoContext.GetPaginatedUsers(get);
                data = result;
                await InvokeAsync(StateHasChanged);
                _main.IsLoading = false;
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "Users", "LoadAPI", DateTime.UtcNow);
                throw;
            }
        }

        public async Task LoadRolesAPI()
        {
            try
            {
                // var response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_RoleAPIRoutes.GetPaginatedE_Role}", perfilesGet);
                // rolesData = await response.Content.ReadFromJsonAsync<PaginatedResult<EditRoleDTORequest>>();
                var result =  await _mongoContext.GetPaginatedRoles(perfilesGet);
                rolesData = result;

                await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "Roles", "LoadRolesAPI", DateTime.UtcNow);
                throw;
            }
        }
    }
    `
  },  
  {
    "ID": 17,
    "ServicesName": "Account",
    "ServicesRoute": "Components/Areas/GeneralF/Main/Identity/Account",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;div class=&quot;fixed w-full h-full grid grid-cols-12 grid-rows-6 top-0 left-0 z-[9] pt-[24px]&quot;&gt;
        &lt;div class=&quot;col-span-12 row-span-2 flex flex-wrap justify-center items-center text-center text-white font-bold text-[35px] sm:text-[40px] xl:text-[60px] z-[13]&quot;&gt;
            Innovation Obsessed
        &lt;/div&gt;

        @if (editUser != null)
        {
            &lt;div class=&quot;p-6 col-span-12 row-span-4 flex flex-wrap items-start justify-center text-white font-bold text-3xl z-[13]&quot;&gt;
                &lt;form @onsubmit=&quot;Edit&quot; class=&quot;formHolder&quot;&gt;
                    &lt;div class=&quot;inputHolderLogin&quot; style=&quot;margin: 0 auto;&quot;&gt;
                        &lt;label for=&quot;profile&quot; class=&quot;rounded-full h-[100px] aspect-square cursor-pointer p-3&quot;
                            style=&quot;margin: 0 auto; background-image: url(@(ms == null ? _user.profilePic : $&quot;data:{extension};base64,{Convert.ToBase64String(ms.ToArray())}&quot;)); background-size: cover;&quot;&gt;&lt;/label&gt;
                        &lt;InputFile id=&quot;profile&quot; hidden accept=&quot;image/*&quot; OnChange=&quot;EditProfilePic&quot;&gt;&lt;/InputFile&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;inputHolderLogin&quot;&gt;
                        &lt;input type=&quot;text&quot; @bind-value=&quot;editUser.Name&quot; placeholder=&quot;Nombre&quot; required&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;inputHolderLogin&quot;&gt;
                        &lt;input type=&quot;text&quot; @bind-value=&quot;editUser.LastName&quot; placeholder=&quot;Apellidos&quot; required&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;inputHolderLogin&quot;&gt;
                        &lt;input type=&quot;text&quot; @bind-value=&quot;editUser.Username&quot; placeholder=&quot;Nombre de usuario&quot; required&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;inputHolderLogin&quot;&gt;
                        &lt;input type=&quot;tel&quot; @bind-value=&quot;editUser.Tel&quot; placeholder=&quot;N&ordm; de tel&eacute;fono&quot; required&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;inputHolderLogin&quot;&gt;
                        &lt;input type=&quot;email&quot; @bind-value=&quot;editUser.Email&quot; placeholder=&quot;Email&quot; required readonly&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;inputHolderLogin&quot;&gt;
                        &lt;select @bind=&quot;editUser.Pais&quot; required&gt;
                            &lt;option value=&quot;&quot;&gt;
                                Selecciona tu pa&iacute;s
                            &lt;/option&gt;
                    @*       &lt;option value=&quot;Espa&ntilde;a&quot;&gt;
                                Espa&ntilde;a
                            &lt;/option&gt; *@

                            &lt;option value=&quot;Per&uacute;&quot;&gt;
                                Per&uacute;
                            &lt;/option&gt;

                            &lt;option value=&quot;Rep&uacute;blica dominicana&quot;&gt;
                                Rep&uacute;blica dominicana
                            &lt;/option&gt;
                        &lt;/select&gt;
                    &lt;/div&gt;

                    &lt;div class=&quot;inputHolderLogin&quot;&gt;
                        &lt;select @bind=&quot;editUser.Departamento&quot; required&gt;
                            &lt;option value=&quot;&quot;&gt;
                                Selecciona tu departamento
                            &lt;/option&gt;
                            &lt;optgroup label=&quot;Per&uacute;&quot;&gt;
                                &lt;option value=&quot;Per&uacute; - Dpto Legal&quot;&gt;
                                    Dpto Legal
                                &lt;/option&gt;
                                &lt;option value=&quot;Per&uacute; - Administraci&oacute;n y finanzas&quot;&gt;
                                    Administraci&oacute;n y finanzas
                                &lt;/option&gt;

                                &lt;option value=&quot;Per&uacute; - Dise&ntilde;o y construcci&oacute;n&quot;&gt;
                                    Dise&ntilde;o y construcci&oacute;n
                                &lt;/option&gt;
                                &lt;option value=&quot;Per&uacute; - Permisos&quot;&gt;
                                    Permisos
                                &lt;/option&gt;

                                &lt;option value=&quot;Per&uacute; - Cierre de proyectos&quot;&gt;
                                    Cierre de proyectos
                                &lt;/option&gt;

                                &lt;option value=&quot;Per&uacute; - Log&iacute;stica&quot;&gt;
                                    Log&iacute;stica
                                &lt;/option&gt;

                                &lt;option value=&quot;Per&uacute; - Operaciones&quot;&gt;
                                    Operaciones
                                &lt;/option&gt;

                                &lt;option value=&quot;Per&uacute; - SAQ Adquisiciones&quot;&gt;
                                    SAQ Adquisiciones
                                &lt;/option&gt;

                                &lt;option value=&quot;Per&uacute; - BTS&quot;&gt;
                                    BTS
                                &lt;/option&gt;

                            &lt;/optgroup&gt;

                            &lt;optgroup label=&quot;Rep&uacute;blica dominicana&quot;&gt;
                                &lt;option value=&quot;RD - FTTH&quot;&gt;
                                    FTTH
                                &lt;/option&gt;
                                &lt;option value=&quot;RD - BTS&quot;&gt;
                                    BTS
                                &lt;/option&gt;
                            &lt;/optgroup&gt;

                        @*  &lt;optgroup label=&quot;Espa&ntilde;a&quot;&gt;
                                &lt;option value=&quot;Espa&ntilde;a - BTS&quot;&gt;
                                    BTS
                                &lt;/option&gt;
                                &lt;option value=&quot;Espa&ntilde;a - Radio&quot;&gt;
                                    Radio
                                &lt;/option&gt;
                                &lt;option value=&quot;Espa&ntilde;a - FTTH&quot;&gt;
                                    FTTH
                                &lt;/option&gt;
                                &lt;option value=&quot;Espa&ntilde;a - Interconexiones&quot;&gt;
                                    Interconexiones
                                &lt;/option&gt;
                                &lt;option value=&quot;Espa&ntilde;a - Departamento comercial&quot;&gt;
                                    Departamento comercial
                                &lt;/option&gt;
                                &lt;option value=&quot;Espa&ntilde;a - Marketing y comunicaci&oacute;n&quot;&gt;
                                    Marketing y comunicaci&oacute;n
                                &lt;/option&gt;
                                &lt;option value=&quot;Espa&ntilde;a - Recursos humanos&quot;&gt;
                                    Recursos humanos
                                &lt;/option&gt;
                                &lt;option value=&quot;Espa&ntilde;a - Administraci&oacute;n y finanzas&quot;&gt;
                                    Administraci&oacute;n y finanzas
                                &lt;/option&gt;
                                &lt;option value=&quot;Espa&ntilde;a - PRL&quot;&gt;
                                    PRL
                                &lt;/option&gt;
                                &lt;option value=&quot;Espa&ntilde;a - Oficina central de proyectos&quot;&gt;
                                    Oficina central de proyectos
                                &lt;/option&gt;
                                &lt;option value=&quot;Espa&ntilde;a - Sistemas y Tecnolog&iacute;a&quot;&gt;
                                    Sistemas y Tecnolog&iacute;a
                                &lt;/option&gt;
                            &lt;/optgroup&gt; *@
                        &lt;/select&gt;
                    &lt;/div&gt;

                    &lt;div class=&quot;inputHolderLogin&quot;&gt;
                        &lt;button type=&quot;submit&quot;&gt;Editar&lt;/button&gt;
                    &lt;/div&gt;
                &lt;/form&gt;
            &lt;/div&gt;
        }
    &lt;/div&gt;

    @code {
        EditUserDTORequest editUser = null;
        // [Parameter] public string id { get; set; }
        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = "../Images/Identity/BackRegister.jpg";
            await LoadUser();
        }

        MemoryStream ms = null;
        string extension = "";
        async Task LoadUser()
        {
            try
            {
                var response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_UserAPIRoutes.GetOneE_User}", new GetOneUserDTORequest() { Id = _user.id });
                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadFromJsonAsync<Result<EditUserDTORequest>>();
                    if (!data.IsSuccess)
                    {
                        _snackbar.InsertSnackbar(new("No tienes permiso para hacer eso", "cancel", 5000, "bg-red-600", "text-white"));
                    }
                    else
                    {
                        editUser = data.Value;
                    }
                }
                else
                {
                    _snackbar.InsertSnackbar(new("Error al consultar el usuario", "cancel", 5000, "bg-red-600", "text-white"));
                }
                await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "Account", "LoadUser", DateTime.UtcNow);
                throw;
            }
        }


        async Task EditProfilePic(InputFileChangeEventArgs e)
        {
            try
            {
                _main.IsLoading = true;
                ms = new();
                await e.File.OpenReadStream(e.File.Size).CopyToAsync(ms);
                extension = e.File.ContentType;
                editUser.NamePic = e.File.Name;
                _main.IsLoading = false;
            }
            catch (Exception ex)
            {
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, "Account", "EditProfilePic", DateTime.UtcNow);
                throw;
            }
        
        }

        async Task Edit()
        {
            try
            {
                if (ms != null)
                        {
                            editUser.profilePicData = ms.ToArray();
                        }

                        var response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_UserAPIRoutes.EditE_User}", editUser);
                        var data = await response.Content.ReadFromJsonAsync<Result<LoginResult>>();

                        if (data.IsSuccess)
                        {
                            _main.Token = data.Value.Token;
                            _main.RefreshToken = data.Value.RefreshToken;
                            await _localStorage.SetItemAsync("refreshToken", data.Value.RefreshToken);
                            _snackbar.InsertSnackbar(new("Usuario editado", "check", 5000, "bg-teal-400", "text-white"));
                            _nav.NavigateTo("/");
                        }
                        else
                        {
                                _snackbar.InsertSnackbar(new("Algo ha ocurrido al intentar editar el usuario", "cancel", 10000, "bg-red-600", "text-white"));
                        }    
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "Account", "Edit", DateTime.UtcNow);
                throw;
            }
        }
    }
    `
  },  
  {
    "ID": 18,
    "ServicesName": "Component",
    "ServicesRoute": "Components/Areas/GeneralF/Main/Identity/Component",
    "ServicesDescription":`
    `,
    "Code": `
    //No contiene contenido
    `
  },  
  {
    "ID": 19,
    "ServicesName": "Component1",
    "ServicesRoute": "Components/Areas/GeneralF/Main/Identity/Component1",
    "ServicesDescription":`
    `,
    "Code": `
    //No contiene contenido
    `
  },  
  {
    "ID": 20,
    "ServicesName": "ForgotPassword",
    "ServicesRoute": "Components/Areas/GeneralF/Main/Identity/ForgotPassword",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;div class=&quot;fixed w-full h-full grid grid-cols-12 grid-rows-6 top-0 left-0 z-[9]&quot;&gt;
        &lt;div class=&quot;col-span-12 row-span-2 text-white font-bold text-3xl z-[13]&quot;&gt;&lt;/div&gt;
        &lt;div class=&quot;col-span-12 row-span-1 flex flex-wrap justify-center items-center text-center text-white font-bold text-[60px] z-[13]&quot;&gt;
            Innovation Obsessed
        &lt;/div&gt;
        &lt;div class=&quot;p-6 col-span-12 row-span-3 flex flex-wrap items-start justify-center text-white font-bold text-3xl z-[13]&quot;&gt;
            &lt;div class=&quot;formHolder&quot;&gt;
                &lt;img src=&quot;../Images/Base/logoMulticolor.png&quot; /&gt;
                &lt;div class=&quot;inputHolderLogin&quot;&gt;
                    &lt;span class=&quot;w-full text-center text-blue-400 font-bold text-xl&quot;&gt;
                        Introduce tu correo electr&oacute;nico para recuperar tu contrase&ntilde;a
                    &lt;/span&gt;
                &lt;/div&gt;
                &lt;div class=&quot;inputHolderLogin&quot;&gt;
                    &lt;input type=&quot;email&quot; @bind-value=&quot;forgotPassword.email&quot; placeholder=&quot;Correo electr&oacute;nico&quot;&gt;
                &lt;/div&gt;
                &lt;div class=&quot;inputHolderLogin&quot;&gt;
                    &lt;button  @onclick=&quot;LoginApp&quot;&gt;Enviar petici&oacute;n&lt;/button&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        ForgotPasswordCommand forgotPassword = new();
        protected override void OnInitialized()
        {
            _main.BackgroundImage = "../Images/Identity/BackForgotPassword.jpg";
        }

        async Task LoginApp()
        {
            try
            {
                var response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_UserAPIRoutes.ForgotPassword}", forgotPassword);
                var data = await response.Content.ReadFromJsonAsync<Result<string>>();
                
                if (data.IsSuccess)
                {
                    _snackbar.InsertSnackbar(new("En breve recibirás un correo con información para restaurar tu contraseña", "check", 5000, "bg-teal-400", "text-white"));
                    _nav.NavigateTo("/");
                }
                else
                {
                    _snackbar.InsertSnackbar(new(data.Errors.Count > 0 ? data.Errors[0] : "Algo ha ocurrido al intentar iniciar sesión", "cancel", 5000, "bg-red-600", "text-white"));
                }
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "ForgotPassword", "LoginApp", DateTime.UtcNow);
                throw;
            }
        }
    }
    `
  },  
  {
    "ID": 21,
    "ServicesName": "Identity",
    "ServicesRoute": "Components/Areas/GeneralF/Main/Identity/Identity",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;div class=&quot;fixed w-full h-full grid grid-cols-12 grid-rows-6 top-0 left-0 z-[9]&quot;&gt;
        &lt;div class=&quot;col-span-12 row-span-0 sm:row-span-2 text-white font-bold text-3xl z-[13]&quot;&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 row-span-1 flex flex-wrap justify-center items-center text-center text-white font-bold text-[35px] sm:text-[40px] xl:text-[60px] z-[13]&quot;&gt;
            Innovation Obsessed
        &lt;/div&gt;

        &lt;div class=&quot;p-6 col-span-12 row-span-3 flex flex-wrap items-start justify-center text-white font-bold text-3xl z-[13]&quot;&gt;
            &lt;div class=&quot;formHolder&quot;&gt;
                &lt;img src=&quot;../Images/Base/logoMulticolor.png&quot; class=&quot;w-auto h-[50px] mb-6&quot; /&gt;
                &lt;div class=&quot;inputHolderLogin&quot;&gt;
                    &lt;button type=&quot;button&quot; @onclick=&quot;@(()=&gt;_nav.NavigateTo(&quot;/login&quot;))&quot;&gt;Iniciar sesi&oacute;n&lt;/button&gt;
                &lt;/div&gt;
        @*      &lt;div class=&quot;inputHolderLogin&quot;&gt;
                    &lt;button @onclick=&quot;@(()=&gt;_nav.NavigateTo(&quot;/register&quot;))&quot;&gt;Registro&lt;/button&gt;
                &lt;/div&gt; *@
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    
    @code{
        protected override void OnInitialized()
        {
            _main.BackgroundImage = "../Images/Identity/BackIdentity.jpg";
        }
    }
    `
  },  
  {
    "ID": 22,
    "ServicesName": "Login",
    "ServicesRoute": "Components/Areas/GeneralF/Main/Identity/Login",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;div class=&quot;fixed w-full h-full grid grid-cols-12 grid-rows-6 top-0 left-0 z-[9]&quot;&gt;
        &lt;div class=&quot;col-span-12 row-span-0 sm:row-span-2 text-white font-bold text-3xl z-[13]&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-span-12 row-span-1 flex flex-wrap justify-center items-center text-center text-white font-bold text-[35px] sm:text-[40px] xl:text-[60px] z-[13]&quot;&gt;
            Innovation Obsessed
        &lt;/div&gt;
        &lt;div class=&quot;p-6 col-span-12 row-span-5 sm:row-span-3 flex flex-wrap items-start justify-center text-white font-bold text-3xl z-[13]&quot;&gt;
            &lt;form @onsubmit=&quot;LoginApp&quot; class=&quot;formHolder&quot;&gt;
                &lt;img src=&quot;../Images/Base/logoMulticolor.png&quot; /&gt;
                &lt;div class=&quot;inputHolderLogin&quot;&gt;
                    &lt;input type=&quot;email&quot; @bind-value=&quot;login.email&quot; placeholder=&quot;Correo electr&oacute;nico&quot; required&gt;
                &lt;/div&gt;
                &lt;div class=&quot;inputHolderLogin&quot;&gt;
                    &lt;input type=&quot;password&quot; @bind-value=&quot;login.password&quot; placeholder=&quot;Contrase&ntilde;a&quot; required&gt;
                &lt;/div&gt;
                &lt;div class=&quot;inputHolderLogin&quot;&gt;
                    &lt;a href=&quot;/forgotpassword&quot;&gt;He olvidado mi contrase&ntilde;a&lt;/a&gt;
                &lt;/div&gt;
                &lt;div class=&quot;inputHolderLogin&quot;&gt;
                    &lt;button type=&quot;submit&quot;&gt;Iniciar sesi&oacute;n&lt;/button&gt;
                &lt;/div&gt;
            &lt;/form&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        LoginCommand login = new();
        private string returnUrl; // Esta variable esta pensada para usar en accesos directos a modales o componentes similares, y en el caso de que la uri no lleve parametros externos, se iguala a "/"
        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = "../Images/Identity/BackLogin.jpg";
            _main.LoginReloadAction += () => InvokeAsync(StateHasChanged);

            // Nuevo aporte para la redirección
            var uri = new Uri(_nav.Uri);
            var queryParams = System.Web.HttpUtility.ParseQueryString(uri.Query);
            returnUrl = queryParams["returnUrl"] ?? "/"; 

        }

        async Task LoginApp()
        {
            try
            {
                var response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_UserAPIRoutes.Login}", login);
                var data = await response.Content.ReadFromJsonAsync<Result<LoginResult>>();

                if (data.IsSuccess)
                {
                    _main.Token = data.Value.Token;
                    _main.RefreshToken = data.Value.RefreshToken;
                    await _localStorage.SetItemAsync("refreshToken", data.Value.RefreshToken);
                    _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _main.Token);

                    if (!string.IsNullOrEmpty(_main.Token))
                    {
                        _user.ReadJWTProperties(_main.Token);
                    }

                    if (_user.Roles.Contains("SoporteExterno"))
                    {
                        _nav.NavigateTo($"/soporte");
                    }

                    _snackbar.InsertSnackbar(new($"Bienvenido {_user.name}", "check", 5000, "bg-teal-400", "text-white"));
                    _main.LoginReloadAction();

                    // Redirigir a la página original o al inicio por defecto
                    _nav.NavigateTo(returnUrl);
                    // _nav.NavigateTo("/");
                }
                else
                {
                    _snackbar.InsertSnackbar(new(data.Errors.Count > 0 ? data.Errors[0] : "Algo ha ocurrido al intentar iniciar sesión", "cancel", 5000, "bg-red-600", "text-white"));
                }
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "Login", "LoginApp", DateTime.UtcNow);
                throw;
            }
        }
    }
    `
  },
  {
    "ID": 23,
    "ServicesName": "NewPassword",
    "ServicesRoute": "Components/Areas/GeneralF/Main/Identity/NewPassword",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;div class=&quot;fixed w-full h-full grid grid-cols-12 grid-rows-6 top-0 left-0 z-[9]&quot;&gt;
        &lt;div class=&quot;col-span-12 row-span-2 text-white font-bold text-3xl z-[13]&quot;&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 row-span-1 flex flex-wrap justify-center items-center text-center text-white font-bold text-[60px] z-[13]&quot;&gt;
            Innovation Obsessed
        &lt;/div&gt;

        &lt;div class=&quot;p-6 col-span-12 row-span-3 flex flex-wrap items-start justify-center text-white font-bold text-3xl z-[13]&quot;&gt;
            &lt;form @onsubmit=&quot;NewPassSend&quot; class=&quot;formHolder&quot;&gt;
                &lt;img src=&quot;../Images/Base/logoMulticolor.png&quot; /&gt;

                &lt;div class=&quot;inputHolderLogin&quot;&gt;
                    &lt;span class=&quot;w-full text-center text-blue-400 font-bold text-xl&quot;&gt;
                        Introduce tu nueva contrase&ntilde;a
                    &lt;/span&gt;
                &lt;/div&gt;

                &lt;div class=&quot;inputHolderLogin&quot;&gt;
                    &lt;input type=&quot;password&quot; @bind-value=&quot;newPassword.newPassword&quot; placeholder=&quot;Nueva contrase&ntilde;a&quot;&gt;
                &lt;/div&gt;

                &lt;div class=&quot;inputHolderLogin&quot;&gt;
                    &lt;input type=&quot;password&quot; @bind-value=&quot;repeatPassword&quot; placeholder=&quot;Repetir nueva contrase&ntilde;a&quot;&gt;
                &lt;/div&gt;

                &lt;div class=&quot;inputHolderLogin&quot;&gt;
                    &lt;button type=&quot;submit&quot; &gt;Enviar nueva contrase&ntilde;a&lt;/button&gt;
                &lt;/div&gt;
            &lt;/form&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        [Parameter] public string code { get; set; }
        NewPasswordCommand newPassword = new();
        string repeatPassword = "";

        protected override void OnInitialized()
        {
            _main.BackgroundImage = "../Images/Identity/BackNewPassword.jpg";
        }

        async Task NewPassSend()
        {
            if(string.IsNullOrEmpty(code))
            {
                _snackbar.InsertSnackbar(new("Registra tu correo para recibir una contraseña nueva primero", "cancel", 5000, "bg-red-600", "text-white"));
                _nav.NavigateTo("/forgotpassword");
                return;
            }

            if (newPassword.newPassword != repeatPassword)
            {
                _snackbar.InsertSnackbar(new("Las contraseñas no coinciden", "cancel", 5000, "bg-red-600", "text-white"));
                return;
            }

            try
            {
                newPassword.codigoNuevaPassword = code;
                var response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_UserAPIRoutes.NewPassword}", newPassword);
                var data = await response.Content.ReadFromJsonAsync<Result<string>>();

                if (data.IsSuccess)
                {
                    _snackbar.InsertSnackbar(new("Tu contraseña ha sido cambiada correctamente", "check", 5000, "bg-teal-400", "text-white"));
                    _nav.NavigateTo("/");
                }
                else
                {
                    _snackbar.InsertSnackbar(new(data.Errors.Count > 0 ? data.Errors[0] : "Algo ha ocurrido al intentar iniciar sesión", "cancel", 5000, "bg-red-600", "text-white"));
                }
            }
            catch (Exception e )
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "NewPassword", "NewPassSend", DateTime.UtcNow);
                throw;
            }
        }
    }
    `
  },  
  {
    "ID": 24,
    "ServicesName": "Register",
    "ServicesRoute": "Components/Areas/GeneralF/Main/Identity/Register",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;div class=&quot;fixed w-full h-full grid grid-cols-12 grid-rows-6 top-0 left-0 z-[9]&quot;&gt;
        &lt;!-- T&iacute;tulo --&gt;
        &lt;div class=&quot;col-span-12 row-span-1 flex justify-center items-end text-gray-600 font-bold text-[32px] sm:text-[40px] l:text-[48px] z-[13] tracking-wide&quot;&gt;
            @(IsEditing ? &quot;Editar usuario&quot; : &quot;A&ntilde;adir usuario&quot;)
        &lt;/div&gt;

        &lt;!-- Formulario --&gt;
        &lt;div class=&quot;p-6 col-span-12 row-span-5 flex justify-center items-start z-[13]&quot;&gt;
            &lt;form @onsubmit=&quot;RegisterApp&quot; class=&quot;formHolder bg-white rounded-xl p-6 w-full max-w-[500px] shadow-xl space-y-4 text-gray-800&quot;&gt;

                @if(IsEditing)
                {
                    &lt;!-- Nombre --&gt;
                    &lt;input type=&quot;text&quot; @bind-value=&quot;editUser.Name&quot; placeholder=&quot;Nombre&quot; required
                    class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;
                    &lt;!-- Apellidos --&gt;
                    &lt;input type=&quot;text&quot; @bind-value=&quot;editUser.LastName&quot; placeholder=&quot;Apellidos&quot; required
                    class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;
                    &lt;!-- Usuario --&gt;
                    &lt;input type=&quot;text&quot; @bind-value=&quot;editUser.Username&quot; placeholder=&quot;Nombre de usuario&quot; required
                    class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;
                    &lt;!-- Tel&eacute;fono --&gt;
                    &lt;input type=&quot;tel&quot; @bind-value=&quot;editUser.Tel&quot; placeholder=&quot;N&ordm; de tel&eacute;fono&quot; required
                    class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;
                    &lt;!-- Email --&gt;
                    &lt;input type=&quot;email&quot; @bind-value=&quot;editUser.Email&quot; placeholder=&quot;Email&quot; required
                    class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;

                    @if (!IsEditing)
                    {
                        &lt;!-- Contrase&ntilde;a --&gt;
                        &lt;input type=&quot;password&quot; @bind-value=&quot;register.Password&quot; placeholder=&quot;Contrase&ntilde;a&quot; required
                        class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;
                        &lt;!-- Repetir contrase&ntilde;a --&gt;
                        &lt;input type=&quot;password&quot; @bind-value=&quot;repeatPassword&quot; placeholder=&quot;Repetir contrase&ntilde;a&quot; required
                        class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;
                    }


                    &lt;!-- Pa&iacute;s --&gt;
                    &lt;select @bind=&quot;editUser.Pais&quot; required
                    class=&quot;w-full p-3 rounded-md border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800&quot;&gt;
                        &lt;option value=&quot;&quot;&gt;Selecciona el pa&iacute;s&lt;/option&gt;
                        @* 	&lt;option value=&quot;Espa&ntilde;a&quot;&gt;Espa&ntilde;a&lt;/option&gt; *@
                        &lt;option value=&quot;Per&uacute;&quot;&gt;Per&uacute;&lt;/option&gt;
                        &lt;option value=&quot;Rep&uacute;blica dominicana&quot;&gt;Rep&uacute;blica dominicana&lt;/option&gt;
                        &lt;option value=&quot;Colombia&quot;&gt;Colombia&lt;/option&gt;
                    &lt;/select&gt;

                    @if (Perfiles != null)
                    {
                        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
                            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Perfiles&lt;/span&gt;
                            @foreach (var perfil in Perfiles)
                            {
                                &lt;div class=&quot;flex items-center gap-2&quot;&gt;
                                    &lt;!-- Checkbox que maneja la selecci&oacute;n de perfiles --&gt;
                                    &lt;input type=&quot;checkbox&quot; id=&quot;@perfil.Name&quot; checked=&quot;@selectedRoles.Contains(perfil.Name)&quot; @onchange=&quot;() =&gt; OnPerfilSelected(perfil)&quot; /&gt;
                                    &lt;label for=&quot;@perfil.Name&quot;&gt;@perfil.Name&lt;/label&gt;
                                &lt;/div&gt;
                            }
                        &lt;/div&gt;
                    }

                    &lt;!-- Departamento --&gt;
                    &lt;select @bind=&quot;editUser.Departamento&quot; required
                    class=&quot;w-full p-3 rounded-md border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800&quot;&gt;
                        &lt;option value=&quot;&quot;&gt;Selecciona el departamento&lt;/option&gt;
                        &lt;optgroup label=&quot;Per&uacute;&quot;&gt;
                            &lt;option value=&quot;Per&uacute; - Dpto Legal&quot;&gt;Dpto Legal&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Administraci&oacute;n y finanzas&quot;&gt;Administraci&oacute;n y finanzas&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Dise&ntilde;o y construcci&oacute;n&quot;&gt;Dise&ntilde;o y construcci&oacute;n&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Permisos&quot;&gt;Permisos&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Cierre de proyectos&quot;&gt;Cierre de proyectos&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Log&iacute;stica&quot;&gt;Log&iacute;stica&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Operaciones&quot;&gt;Operaciones&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - SAQ Adquisiciones&quot;&gt;SAQ Adquisiciones&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - BTS&quot;&gt;BTS&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Sistemas y Tecnolog&iacute;a&quot;&gt;Sistemas y Tecnolog&iacute;a&lt;/option&gt;
                        &lt;/optgroup&gt;
                        &lt;optgroup label=&quot;Rep&uacute;blica dominicana&quot;&gt;
                            &lt;option value=&quot;RD - FTTH&quot;&gt;FTTH&lt;/option&gt;
                            &lt;option value=&quot;RD - BTS&quot;&gt;BTS&lt;/option&gt;
                        &lt;/optgroup&gt;
                        &lt;optgroup label=&quot;Colombia&quot;&gt;
                            &lt;option value=&quot;Colombia - FTTH&quot;&gt;FTTH&lt;/option&gt;
                            &lt;option value=&quot;Colombia - BTS&quot;&gt;BTS&lt;/option&gt;
                        &lt;/optgroup&gt;
                        @* 
                    &lt;optgroup label=&quot;Espa&ntilde;a&quot;&gt;
                        &lt;option value=&quot;Espa&ntilde;a - BTS&quot;&gt;BTS&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Radio&quot;&gt;Radio&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - FTTH&quot;&gt;FTTH&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Interconexiones&quot;&gt;Interconexiones&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Departamento comercial&quot;&gt;Departamento comercial&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Marketing y comunicaci&oacute;n&quot;&gt;Marketing y comunicaci&oacute;n&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Recursos humanos&quot;&gt;Recursos humanos&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Administraci&oacute;n y finanzas&quot;&gt;Administraci&oacute;n y finanzas&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - PRL&quot;&gt;PRL&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Oficina central de proyectos&quot;&gt;Oficina central de proyectos&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Sistemas y Tecnolog&iacute;a&quot;&gt;Sistemas y Tecnolog&iacute;a&lt;/option&gt;
                    &lt;/optgroup&gt; *@
                    &lt;/select&gt;
                    &lt;!-- Bot&oacute;n --&gt;
                    &lt;div class=&quot;inputHolderLogin&quot;&gt;
                        &lt;button type=&quot;submit&quot;&gt;@((IsEditing ? &quot;Guardar&quot; : &quot;A&ntilde;adir&quot;))&lt;/button&gt;
                    &lt;/div&gt;
                }
                else
                {
                    &lt;!-- Nombre --&gt;
                    &lt;input type=&quot;text&quot; @bind-value=&quot;register.Name&quot; placeholder=&quot;Nombre&quot; required
                        class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;
                    &lt;!-- Apellidos --&gt;
                    &lt;input type=&quot;text&quot; @bind-value=&quot;register.LastName&quot; placeholder=&quot;Apellidos&quot; required
                        class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;
                    &lt;!-- Usuario --&gt;
                    &lt;input type=&quot;text&quot; @bind-value=&quot;register.Username&quot; placeholder=&quot;Nombre de usuario&quot; required
                        class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;
                    &lt;!-- Tel&eacute;fono --&gt;
                    &lt;input type=&quot;tel&quot; @bind-value=&quot;register.Tel&quot; placeholder=&quot;N&ordm; de tel&eacute;fono&quot; required
                        class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;
                    &lt;!-- Email --&gt;
                    &lt;input type=&quot;email&quot; @bind-value=&quot;register.Email&quot; placeholder=&quot;Email&quot; required
                        class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;

                    @if (!IsEditing)
                    {
                        &lt;!-- Contrase&ntilde;a --&gt;
                        &lt;input type=&quot;password&quot; @bind-value=&quot;register.Password&quot; placeholder=&quot;Contrase&ntilde;a&quot; required
                            class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;
                        &lt;!-- Repetir contrase&ntilde;a --&gt;
                        &lt;input type=&quot;password&quot; @bind-value=&quot;repeatPassword&quot; placeholder=&quot;Repetir contrase&ntilde;a&quot; required
                            class=&quot;w-full p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500&quot;&gt;
                    }

                    &lt;!-- Pa&iacute;s --&gt;
                    &lt;select @bind=&quot;register.Pais&quot; required
                            class=&quot;w-full p-3 rounded-md border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800&quot;&gt;
                        &lt;option value=&quot;&quot;&gt;Selecciona el pa&iacute;s&lt;/option&gt;
                        @* 	&lt;option value=&quot;Espa&ntilde;a&quot;&gt;Espa&ntilde;a&lt;/option&gt; *@
                        &lt;option value=&quot;Per&uacute;&quot;&gt;Per&uacute;&lt;/option&gt;
                        &lt;option value=&quot;Rep&uacute;blica dominicana&quot;&gt;Rep&uacute;blica dominicana&lt;/option&gt;
                        &lt;option value=&quot;Colombia&quot;&gt;Colombia&lt;/option&gt;
                    &lt;/select&gt;

                    @if (Perfiles != null)
                    {
                        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
                            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Perfiles&lt;/span&gt;

                            @foreach (var perfil in Perfiles)
                            {
                                &lt;div class=&quot;flex items-center gap-2&quot;&gt;
                                    &lt;!-- Checkbox que maneja la selecci&oacute;n de perfiles --&gt;
                                    &lt;input type=&quot;checkbox&quot; id=&quot;@perfil.Name&quot; checked=&quot;@selectedRoles.Contains(perfil.Name)&quot; @onchange=&quot;() =&gt; OnPerfilSelected(perfil)&quot; /&gt;
                                    &lt;label for=&quot;@perfil.Name&quot;&gt;@perfil.Name&lt;/label&gt;
                                &lt;/div&gt;
                            }
                        &lt;/div&gt;
                    }

                    &lt;!-- Departamento --&gt;
                    &lt;select @bind=&quot;register.Departamento&quot; required
                            class=&quot;w-full p-3 rounded-md border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800&quot;&gt;
                        &lt;option value=&quot;&quot;&gt;Selecciona el departamento&lt;/option&gt;
                        &lt;optgroup label=&quot;Per&uacute;&quot;&gt;
                            &lt;option value=&quot;Per&uacute; - Dpto Legal&quot;&gt;Dpto Legal&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Administraci&oacute;n y finanzas&quot;&gt;Administraci&oacute;n y finanzas&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Dise&ntilde;o y construcci&oacute;n&quot;&gt;Dise&ntilde;o y construcci&oacute;n&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Permisos&quot;&gt;Permisos&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Cierre de proyectos&quot;&gt;Cierre de proyectos&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Log&iacute;stica&quot;&gt;Log&iacute;stica&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Operaciones&quot;&gt;Operaciones&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - SAQ Adquisiciones&quot;&gt;SAQ Adquisiciones&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - BTS&quot;&gt;BTS&lt;/option&gt;
                            &lt;option value=&quot;Per&uacute; - Sistemas y Tecnolog&iacute;a&quot;&gt;Sistemas y Tecnolog&iacute;a&lt;/option&gt;
                        &lt;/optgroup&gt;
                        &lt;optgroup label=&quot;Rep&uacute;blica dominicana&quot;&gt;
                            &lt;option value=&quot;RD - FTTH&quot;&gt;FTTH&lt;/option&gt;
                            &lt;option value=&quot;RD - BTS&quot;&gt;BTS&lt;/option&gt;
                        &lt;/optgroup&gt;
                        &lt;optgroup label=&quot;Colombia&quot;&gt;
                            &lt;option value=&quot;Colombia - FTTH&quot;&gt;FTTH&lt;/option&gt;
                            &lt;option value=&quot;Colombia - BTS&quot;&gt;BTS&lt;/option&gt;
                        &lt;/optgroup&gt;
                        @* 
                    &lt;optgroup label=&quot;Espa&ntilde;a&quot;&gt;
                        &lt;option value=&quot;Espa&ntilde;a - BTS&quot;&gt;BTS&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Radio&quot;&gt;Radio&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - FTTH&quot;&gt;FTTH&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Interconexiones&quot;&gt;Interconexiones&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Departamento comercial&quot;&gt;Departamento comercial&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Marketing y comunicaci&oacute;n&quot;&gt;Marketing y comunicaci&oacute;n&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Recursos humanos&quot;&gt;Recursos humanos&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Administraci&oacute;n y finanzas&quot;&gt;Administraci&oacute;n y finanzas&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - PRL&quot;&gt;PRL&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Oficina central de proyectos&quot;&gt;Oficina central de proyectos&lt;/option&gt;
                        &lt;option value=&quot;Espa&ntilde;a - Sistemas y Tecnolog&iacute;a&quot;&gt;Sistemas y Tecnolog&iacute;a&lt;/option&gt;
                    &lt;/optgroup&gt; *@
                    &lt;/select&gt;
                    &lt;!-- Bot&oacute;n --&gt;
                    &lt;div class=&quot;inputHolderLogin&quot;&gt;
                        &lt;button type=&quot;submit&quot;&gt;@((IsEditing ? &quot;Guardar&quot; : &quot;A&ntilde;adir&quot;))&lt;/button&gt;
                    &lt;/div&gt;
                }
            &lt;/form&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        MemoryStream ms = null;
        AddUserDTORequest register = new();
        private HashSet<string> selectedRoles = new(); // Usamos un HashSet para gestionar las selecciones.
        [Parameter] public string id { get; set; }
        bool IsEditing => !string.IsNullOrEmpty(id);
        EditUserDTORequest editUser = new();
        [Parameter] public List<E_Role> Perfiles { get; set; }

        string repeatPassword = "";
        string extension = "";

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = "../Images/Identity/BackRegister.jpg";

            // Cargar perfiles
            var result = await _mongoContext.GetAllRoles();
            if (result.IsSuccess)
            {
                Perfiles = result.Value;
            }
            else
            {
                _snackbar.InsertSnackbar(new("No se pudieron cargar los perfiles", "cancel", 5000, "bg-red-600", "text-white"));
            }

            // async Task EditProfilePic(InputFileChangeEventArgs e)
            // {
            // 	try
            // 	{
            // 		_main.IsLoading = true;
            // 		ms = new MemoryStream();
            // 		await e.File.OpenReadStream(e.File.Size).CopyToAsync(ms);
            // 		editUser.ProfilePic = ms.ToArray(); // Aquí SÍ asignas porque el usuario ha subido una nueva.
            // 		extension = e.File.ContentType;
            // 		editUser.NamePic = e.File.Name;
            // 		_main.IsLoading = false;
            // 	}
            // 	catch (Exception ex)
            // 	{
            // 		await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, "Account", "EditProfilePic", DateTime.UtcNow);
            // 		throw;
            // 	}
            // }


            // Si hay un id, cargar datos del usuario para editar
            if (!string.IsNullOrEmpty(id)) // Está editando
            {

                // if (ms != null)
                // {
                // 	editUser.profilePicData = ms.ToArray();
                // }

                var resultUser = await _mongoContext.GetOneUsers(id);
                if (resultUser.IsSuccess && resultUser.Value != null)
                {
                    // editUser.Confirmed = resultUser.Value.Confirmed;
                    // editUser.ProfilePic = resultUser.Value.ProfilePic;
                    // editUser.NamePic = resultUser.Value.NamePic;
                    editUser = new EditUserDTORequest
                        {
                            Id = id,
                            Name = resultUser.Value.Name,
                            LastName = resultUser.Value.LastName,
                            Username = resultUser.Value.Username,
                            Tel = resultUser.Value.Tel,
                            Email = resultUser.Value.Email,
                            Pais = resultUser.Value.Pais,
                            Departamento = resultUser.Value.Departamento,
                            ProfilePic = resultUser.Value.ProfilePic,
                            Confirmed = resultUser.Value.Confirmed,
                            Roles = resultUser.Value.Roles?.Select(r => new EditRoleDTORequest
                            {
                                Id = r.Id,
                                Name = r.Name,
                                Claims = r.Claims ?? new(),
                                CreatedBy = r.CreatedBy,
                                CreatedByName = r.CreatedByName,
                                CreatedOn = r.CreatedOn,
                                ModifiedBy = r.ModifiedBy,
                                ModifiedByName = r.ModifiedByName,
                                ModifiedOn = r.ModifiedOn
                            }).ToList()
                        };
                    selectedRoles = editUser.Roles.Select(r => r.Name).ToHashSet();
                }
            }
            else // Está registrando
            {
                register = new AddUserDTORequest(); // opcional, ya lo tienes inicializado
            }

        }


        // Método para manejar la selección de perfiles
        void OnPerfilSelected(E_Role perfil)
        {
            if (selectedRoles.Contains(perfil.Name))
            {
                selectedRoles.Remove(perfil.Name);
            }
            else
            {
                selectedRoles.Add(perfil.Name);
            }
            var rolesSeleccionados = selectedRoles
        .Select(roleName =>
        {
            var p = Perfiles.FirstOrDefault(x => x.Name == roleName);
            return p != null ? new EditRoleDTORequest
                {
                    Id = p.Id,
                    Name = p.Name,
                    Claims = p.Claims ?? new(),
                    CreatedBy = p.CreatedBy,
                    CreatedByName = p.CreatedByName,
                    CreatedOn = p.CreatedOn,
                    ModifiedBy = p.ModifiedBy,
                    ModifiedByName = p.ModifiedByName,
                    ModifiedOn = p.ModifiedOn
                } : null;
        })
        .Where(r => r != null)
        .ToList();

            if (IsEditing)
                editUser.Roles = rolesSeleccionados;
            else
                register.Roles = rolesSeleccionados;

        }

        async Task RegisterApp()
        {
            try
            {
                if (IsEditing)
                {
                    var response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_UserAPIRoutes.EditE_User}", editUser);
                    var data = await response.Content.ReadFromJsonAsync<Result<LoginResult>>();

                    if (data is not null && data.IsSuccess)
                    {
                        _snackbar.InsertSnackbar(new("Usuario editado correctamente", "check", 5000, "bg-teal-400", "text-white"));
                        _nav.NavigateTo("/users");
                    }
                    else
                    {
                        _snackbar.InsertSnackbar(new(data?.Errors?.FirstOrDefault() ?? "Ocurrió un error al editar el usuario", "cancel", 10000, "bg-red-600", "text-white"));
                    }
                }
                else
                {
                    if (register.Password != repeatPassword)
                    {
                        _snackbar.InsertSnackbar(new("Las contraseñas no coinciden", "cancel", 5000, "bg-red-600", "text-white"));
                        return;
                    }

                    var response = await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_UserAPIRoutes.AddE_User}", register);
                    var data = await response.Content.ReadFromJsonAsync<Result<string>>();

                    if (data.IsSuccess)
                    {
                        _snackbar.InsertSnackbar(new("Registro completado. Verifica tu correo para poder acceder", "check", 5000, "bg-teal-400", "text-white"));
                        _nav.NavigateTo("/users");
                    }
                    else
                    {
                        _snackbar.InsertSnackbar(new(data.Errors.Count > 0 ? data.Errors[0] : "Algo ha ocurrido al intentar registrarse", "cancel", 10000, "bg-red-600", "text-white"));
                    }
                }

                // var responseContent = await response.Content.ReadAsStringAsync();
                // Console.WriteLine($"Response Content: '{responseContent}'");
                // if (string.IsNullOrWhiteSpace(responseContent))
                // {
                // 	Console.WriteLine("La respuesta de la API está vacía.");
                // 	_snackbar.InsertSnackbar(new("Operación completada.", "cancel", 10000, "bg-teal-400", "text-white"));
                // 	return;
                // }
                // // var data = JsonSerializer.Deserialize<Result<string>>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                // if (data is not null && data.IsSuccess)
                // {
                // 	_snackbar.InsertSnackbar(new($"{(IsEditing ? "Usuario editado correctamente." : "Registro completado. Verifica tu correo para poder acceder")}", "check", 5000, "bg-teal-400", "text-white"));
                // 	_nav.NavigateTo("/");
                // }
                // else
                // {
                // 	_snackbar.InsertSnackbar(new(data?.Errors?.Count > 0 ? data.Errors[0] : "Algo ha ocurrido", "cancel", 10000, "bg-red-600", "text-white"));
                // }
            }
            catch (JsonException ex)
            {
                _snackbar.InsertSnackbar(new("Error al procesar la respuesta del servidor", "cancel", 10000, "bg-red-600", "text-white"));
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, "Register", "RegisterApp > JsonException", DateTime.UtcNow);
                _nav.NavigateTo("/users");
                throw;
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "Register", "RegisterApp > Exception", DateTime.UtcNow);
                throw;
            }
        }
    }
    `
  },  
  {
    "ID": 25,
    "ServicesName": "ValidateEmail",
    "ServicesRoute": "Components/Areas/GeneralF/Main/Identity/ValidateEmail",
    "ServicesDescription":`
    `,
    "Code": `
    @code {
        protected override async Task OnInitializedAsync()
        {
            try
            {
                var codeQuery = _main.QueryParameters(_nav)["code"];
                if(codeQuery != null)
                {
                    await _http.PostAsJsonAsync($"{RouteServerMain.ServerRoute}{E_UserAPIRoutes.ValidateEmail}", new ValidateEmailCommand() { code = codeQuery });
                    _nav.NavigateTo("/identity");
                }
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "ValidateEmail", "OnInitializedAsync", DateTime.UtcNow);
                throw;
            }
        }
    }
    `
  },
  {
    "ID": 27,
    "ServicesName": "Administracion",
    "ServicesRoute": "Components/Areas/GeneralF/Main/Sites/Administracion",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;AuthorizePage Permissions=&quot;@(Security.Permisos.PermissionConstantsAdministracion.Administracion)&quot;&gt;&lt;/AuthorizePage&gt;
    &lt;div class=&quot;w-full h-fit mt-[100px] flex flex-wrap p-6 justify-center items-center text-center text-white font-bold text-[35px] sm:text-[40px] xl:text-[60px]&quot;&gt;
        Innovation Obsessed
    &lt;/div&gt;

    &lt;div class=&quot;w-full h-fit p-12 grid grid-cols-12 gap-4&quot;&gt;
        &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsAdministracion.AdministracionVerUsuarios)&quot;&gt;
            @*&lt;AuthorizedContent Roles=&quot;@(new(){&quot;Admin&quot;})&quot;&gt;*@
            &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
                &lt;a href=&quot;/users&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                    &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/Admin/user.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                    &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;Usuarios&lt;/span&gt;
                &lt;/a&gt;
            &lt;/div&gt;
            &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
                &lt;a href=&quot;/automatismos&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                    &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/Admin/extra.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                    &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;Utilidades&lt;/span&gt;
                &lt;/a&gt;
            &lt;/div&gt;

        @*   &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
                &lt;a href=&quot;/roles&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                    &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/Admin/user-management.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                    &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;Roles&lt;/span&gt;
                &lt;/a&gt;
            &lt;/div&gt; *@
        &lt;/AuthorizedContent&gt;
        &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsAdministracion.AdministracionGestionCoches)&quot;&gt;
            @*&lt;AuthorizedContent Roles=&quot;@(new(){&quot;Coches.Supervisor&quot;, &quot;Coches.Conductor&quot;})&quot;&gt;*@
            &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
                &lt;a href=&quot;/GestionCoches&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                    &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/Admin/coche.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                    &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;
                        Gesti&oacute;n coches
                    &lt;/span&gt;
                &lt;/a&gt;
            &lt;/div&gt;
        &lt;/AuthorizedContent&gt;
        &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/BugTracker&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/Admin/bug.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;
                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                        bug_report 
                    &lt;/span&gt;
                    Bug Tracker
                &lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            _main.BackgroundImage = "../Images/Identity/BackAdmin.jpg";
        }
    }
    `
  },  
  {
    "ID": 28,
    "ServicesName": "Movil",
    "ServicesRoute": "Components/Areas/GeneralF/Main/Sites/Movil",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;AuthorizePage Permissions=&quot;@(Security.Permisos.PermissionConstantsMovil.Movil)&quot;&gt;&lt;/AuthorizePage&gt;
    &lt;div class=&quot;w-full h-fit mt-[100px] flex flex-wrap p-6 justify-center items-center text-center text-white font-bold text-[35px] sm:text-[40px] xl:text-[60px]&quot;&gt;
        Innovation Obsessed
    &lt;/div&gt;

    &lt;div class=&quot;w-full h-fit p-12 grid grid-cols-12 items-center gap-4&quot;&gt;
        &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/delineacion&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/Movil/delineacion.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;Delineaci&oacute;n&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/radioelectrico&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/Movil/radioelectrico.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;Radiol&eacute;ctrico&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/visitasmovil&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/Movil/visitas.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;Visitas&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/seguimientomovil&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/Movil/movil.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-center text-xl&quot;&gt;Proyectos&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            _main.BackgroundImage = "../Images/Identity/BackMovil.jpg";
        }
    }
    `
  },
  {
    "ID": 29,
    "ServicesName": "RedFija",
    "ServicesRoute": "Components/Areas/GeneralF/Main/Sites/RedFija",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;AuthorizePage Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFija)&quot;&gt;&lt;/AuthorizePage&gt;
    &lt;div class=&quot;w-full h-fit mt-[100px] flex flex-wrap p-6 justify-center items-center text-center text-white font-bold text-[35px] sm:text-[40px] xl:text-[60px]&quot;&gt;
        Innovation Obsessed
    &lt;/div&gt;
    &lt;div class=&quot;w-full h-fit p-12 grid grid-cols-12 gap-4 items-center&quot;&gt;
        &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/logistica&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/RedFija/logistica.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;Log&iacute;stica&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/seguimientoredfija&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/RedFija/seguimientoconstruccion.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-center text-white text-xl&quot;&gt;Seguimiento obras&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/visitasfibra/&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/Movil/visitas.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;Visitas&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/dise&ntilde;ofija&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/Movil/delineacion.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-center text-white text-xl&quot;&gt;Dise&ntilde;o&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            _main.BackgroundImage = "../Images/Identity/BackRedFija.jpg";
        }
    }
    `
  },  
  {
    "ID": 30,
    "ServicesName": "RRHH",
    "ServicesRoute": "Components/Areas/GeneralF/Main/Sites/RRHH",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;AuthorizePage Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHH)&quot;&gt;&lt;/AuthorizePage&gt;
    &lt;div class=&quot;w-full h-fit mt-[100px] flex flex-wrap p-6 justify-center items-center text-center text-white font-bold text-[35px] sm:text-[40px] xl:text-[60px]&quot;&gt;
        Innovation Obsessed
    &lt;/div&gt;
    &lt;div class=&quot;w-full h-fit p-12 grid grid-cols-12 gap-4&quot;&gt;
        &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/procesoseleccion&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/RRHH/hr.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;Procesos de selecci&oacute;n&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/aprobaciones&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/RRHH/hr.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl&quot;&gt;Aprobaciones&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-start-3 lg:col-start-auto col-span-8 lg:col-span-6 xl:col-span-3 flex flex-wrap justify-center items-center&quot;&gt;
            &lt;a href=&quot;/EvaluacionDesempeno&quot; class=&quot;w-[250px] h-fit flex flex-wrap justify-center gap-8 p-4 rounded bg-slate-600/50 shadow-md&quot;&gt;
                &lt;div class=&quot;w-[70%] aspect-square&quot; style=&quot;background-image: url(../Images/RRHH/form.png); background-size: cover;&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-[100%] flex flex-wrap justify-center items-end text-white text-xl text-center&quot;&gt;Evaluaci&oacute;n de desempe&ntilde;o&lt;/span&gt;
            &lt;/a&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            _main.BackgroundImage = "../Images/Identity/BackRRHH.jpg";
        }
    }
    `
  },  
  {
    "ID": 31,
    "ServicesName": "BackgroundImage",
    "ServicesRoute": "Components/Areas/GeneralF/Main/BackgroundImage",
    "ServicesDescription":`
    `,
    "Code": `
    @if(!string.IsNullOrEmpty(_main.BackgroundImage))
    {
        &lt;div class=&quot;fixed w-full h-full top-0 left 0 z-[-2]&quot; style=&quot;background-image: url(@(_main.BackgroundImage)); background-size: cover;&quot;&gt;
        &lt;/div&gt;

        &lt;div class=&quot;fixed w-full h-full top-0 left 0 z-[-1]&quot;
            style=&quot;background: linear-gradient(180deg, @(!string.IsNullOrEmpty(_main.Token) ? &quot;rgba(97,212,255,0.95) 35%&quot; : &quot;rgba(97,212,255,0.5) 35%&quot;), rgba(0,212,255,0.1) 100%);&quot;&gt;
        &lt;/div&gt;
    }
    
    @code {
        protected override async Task OnInitializedAsync()
        {
            _main.LoginReloadAction += () => InvokeAsync(StateHasChanged);
            _main.BackgroundChanged += () => InvokeAsync(StateHasChanged);
        }
    }
    `
  },
  {
    "ID": 32,
    "ServicesName": "AddEditIncidencia",
    "ServicesRoute": "Components/Areas/GeneralF/Soporte/Modals/AddEditIncidencia",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;form class=&quot;w-full grid grid-cols-12&quot; @onsubmit=&quot;() =&gt; SaveAsync()&quot;&gt;
        @if (internalData.User != null)
        {
            &lt;div class=&quot;col-span-6 h-fit p-2 flex flex-wrap&quot;&gt;
                &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Nombre y apellidos&lt;/span&gt;
                &lt;span class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot;&gt;@($&quot;{internalData.User.Name} {internalData.User.LastName}&quot;)&lt;/span&gt;
            &lt;/div&gt;

            &lt;div class=&quot;col-span-6 h-fit p-2 flex flex-wrap&quot;&gt;
                &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Tel&eacute;fono&lt;/span&gt;
                &lt;span class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot;&gt;@(internalData.User.Tel)&lt;/span&gt;
            &lt;/div&gt;

            &lt;div class=&quot;col-span-6 h-fit p-2 flex flex-wrap&quot;&gt;
                &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Correo electr&oacute;nico&lt;/span&gt;
                &lt;span class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot;&gt;@(internalData.User.Email.ToLower())&lt;/span&gt;
            &lt;/div&gt;

            &lt;div class=&quot;col-span-6 h-fit p-2 flex flex-wrap&quot;&gt;
                &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Pa&iacute;s&lt;/span&gt;
                &lt;select required  class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;        internalData.Pais&quot;&gt;
                
                @* &lt;select required readonly=&quot;@(IsEdit &amp;&amp; !_user.Permissions.Contains(Security.Permisos.PermissionConstantsSoporte.SoporteEditSoliciIncidencia))&quot; class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;        internalData.Pais&quot;&gt;
                *@	&lt;option value=&quot;&quot;&gt;Selecciona el pa&iacute;s...&lt;/option&gt;
                @* 	&lt;option value=&quot;Espa&ntilde;a&quot;&gt;Espa&ntilde;a&lt;/option&gt; *@
                    &lt;option value=&quot;Per&uacute;&quot;&gt;Per&uacute;&lt;/option&gt;
                    &lt;option value=&quot;Rep&uacute;blica Dominicana&quot;&gt;Rep&uacute;blica Dominicana&lt;/option&gt;
                    &lt;option value=&quot;Colombia&quot;&gt;Colombia&lt;/option&gt;
                &lt;/select&gt;
            &lt;/div&gt;

            &lt;div class=&quot;col-span-6 h-fit p-2 flex flex-wrap&quot;&gt;
                &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Tipo de solicitud&lt;/span&gt;
                &lt;select required class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;        internalData.Tipo&quot;&gt;
                @* &lt;select required readonly=&quot;@(IsEdit &amp;&amp; !_user.Permissions.Contains(Security.Permisos.PermissionConstantsSoporte.SoporteEditSoliciIncidencia))&quot; class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;        internalData.Tipo&quot;&gt;
                *@	&lt;option value=&quot;&quot;&gt;Selecciona el tipo de incidencia...&lt;/option&gt;
                    &lt;option value=&quot;Hardware&quot;&gt;Hardware&lt;/option&gt;
                    &lt;option value=&quot;Configuraci&oacute;n de Software&quot;&gt;Configuraci&oacute;n de Software&lt;/option&gt;
                    &lt;option value=&quot;Alta de Usuario&quot;&gt;Alta de Usuario&lt;/option&gt;
                    &lt;option value=&quot;Red&quot;&gt;Red&lt;/option&gt;
                    &lt;option value=&quot;Correo electr&oacute;nico&quot;&gt;Correo electr&oacute;nico&lt;/option&gt;
                    &lt;option value=&quot;Otro&quot;&gt;Otro&lt;/option&gt;
                &lt;/select&gt;
            &lt;/div&gt;
            &lt;div class=&quot;col-span-6 h-fit p-2 flex flex-wrap&quot;&gt;
                &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Asunto&lt;/span&gt;
                &lt;input type=&quot;text&quot; required  class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;@(                                                                                                                                                                                                        internalData.Asunto)&quot; /&gt;
                @* &lt;input type=&quot;text&quot; required readonly=&quot;@(IsEdit &amp;&amp; !_user.Permissions.Contains(Security.Permisos.PermissionConstantsSoporte.SoporteEditSoliciIncidencia))&quot; class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;@(                                                                                                                                                                                                        internalData.Asunto)&quot; /&gt;
    *@
            &lt;/div&gt;
            @if (!initialEscaladaState &amp;&amp; internalData.Tipo == &quot;Correo electr&oacute;nico&quot; || internalData.Tipo == &quot;Alta de Usuario&quot; || internalData.Tipo == &quot;Red&quot;)
            {
                @* &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsSoporte.SoporteGestor)&quot;&gt; *@

                @* &lt;AuthorizedContent Roles=&quot;@(new(){&quot;Admin&quot;, &quot;SoporteSupervisor&quot;, &quot;SoporteInterno&quot;})&quot;&gt; *@

                    &lt;div class=&quot;col-span-6 h-fit p-2 flex flex-wrap&quot;&gt;
                        &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Escalada&lt;/span&gt;
                        &lt;span class=&quot;rounded w-full border border-slate-300/50 shadow-md&quot;&gt;
                            &lt;Checkbox ChangeCheck=&quot;() =&gt; {internalData.Escalada = !internalData.Escalada; InvokeAsync(StateHasChanged);}&quot; Checked=internalData.Escalada
                            Message=&quot;&iquest;Escalar solicitud?&quot;&gt;
                            &lt;/Checkbox&gt;
                        &lt;/span&gt;

                    &lt;/div&gt;

                @* &lt;/AuthorizedContent&gt; *@
            }
            @*        &lt;AuthorizedContent Roles=&quot;@(new(){&quot;Admin&quot;, &quot;SoporteInterno&quot;})&quot;&gt;
                @if (IsEdit &amp;&amp; !autorizacionEscaladaState)
                {
                    &lt;div class=&quot;col-span-6 h-fit p-2 flex flex-wrap&quot;&gt;
                        &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Solicitud para escalar&lt;/span&gt;
                        &lt;span class=&quot;rounded w-full border border-slate-300/50 shadow-md&quot;&gt;
                            &lt;Checkbox ChangeCheck=&quot;() =&gt; {internalData.AutorizacionEscalada = !internalData.AutorizacionEscalada; InvokeAsync(StateHasChanged);}&quot; Checked=internalData.AutorizacionEscalada
                                    Message=&quot;&iquest;Solicitud para escalar el ticket?&quot;&gt;
                            &lt;/Checkbox&gt;
                        &lt;/span&gt;

                    &lt;/div&gt;
                }
            &lt;/AuthorizedContent&gt; *@

            @* &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsSoporte.SoporteEditSoliciIncidencia)&quot;&gt; *@
                &lt;div class=&quot;col-span-6 h-fit p-2 flex flex-wrap&quot;&gt;
                    &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Gravedad&lt;/span&gt;
                    &lt;select class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;            internalData.Gravedad&quot;&gt;
                    
                    @* &lt;select readonly=&quot;@(IsEdit &amp;&amp; !_user.Permissions.Contains(PermissionConstantsIncidencia.EditIncidencia))&quot; class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;            internalData.Gravedad&quot;&gt;
                    *@	&lt;option value=&quot;&quot;&gt;Selecciona la gravedad de la solicitud (Indicar antes de cerrar una solicitud)&lt;/option&gt;
                        &lt;option value=&quot;Leve&quot;&gt;Leve&lt;/option&gt;
                        &lt;option value=&quot;Grave&quot;&gt;Grave&lt;/option&gt;
                        &lt;option value=&quot;Cr&iacute;tica&quot;&gt;Cr&iacute;tica&lt;/option&gt;
                    &lt;/select&gt;
                &lt;/div&gt;
            @* &lt;/AuthorizedContent&gt; *@

            @* &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsSoporte.SoporteGestor)&quot;&gt; *@
                @*&lt;AuthorizedContent Roles=&quot;@(new(){&quot;SoporteInterno&quot;, &quot;SoporteSupervisor&quot;, &quot;SoporteExterno&quot;})&quot;&gt;*@
                &lt;div class=&quot;col-span-6 h-fit p-2 flex flex-wrap&quot;&gt;
                    &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Tipo de incidencia (Sistemas o microinform&aacute;tica)&lt;/span&gt;
                    &lt;select  class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;            internalData.TipoIncidencia&quot;&gt;
                    @* &lt;select readonly=&quot;@(IsEdit &amp;&amp; !_user.Permissions.Contains(PermissionConstantsIncidencia.EditIncidencia))&quot; class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;            internalData.TipoIncidencia&quot;&gt;
    *@
                        &lt;option value=&quot;&quot;&gt;Selecciona el tipo&lt;/option&gt;
                        &lt;option value=&quot;Sistemas&quot;&gt;Sistemas&lt;/option&gt;
                        &lt;option value=&quot;Microinform&aacute;tica&quot;&gt;Microinform&aacute;tica&lt;/option&gt;
                    &lt;/select&gt;
                &lt;/div&gt;
            @* &lt;/AuthorizedContent&gt; *@

            &lt;div class=&quot;col-span-6 h-fit p-2 flex flex-wrap&quot;&gt;
                &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Id Team Viewer&lt;/span&gt;
                &lt;input type=&quot;text&quot; required  class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;@(                                                                                                                                                                                                        internalData.IdTeamViewer)&quot; /&gt;
        @* 		&lt;input type=&quot;text&quot; required readonly=&quot;@(IsEdit &amp;&amp; !_user.Permissions.Contains(Security.Permisos.PermissionConstantsSoporte.SoporteEditSoliciIncidencia))&quot; class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;@(                                                                                                                                                                                                        internalData.IdTeamViewer)&quot; /&gt;
    *@
            &lt;/div&gt;

            &lt;div class=&quot;col-span-6 h-fit p-2 flex flex-wrap&quot;&gt;
                &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Contrase&ntilde;a Team Viewer&lt;/span&gt;
                &lt;input type=&quot;text&quot; required  class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;@(                                                                                                                                                                                                        internalData.PassTeamViewer)&quot; /&gt;
                @* &lt;input type=&quot;text&quot; required readonly=&quot;@(IsEdit &amp;&amp; !_user.Permissions.Contains(Security.Permisos.PermissionConstantsSoporte.SoporteEditSoliciIncidencia))&quot; class=&quot;rounded p-2 w-full border border-slate-300/50 shadow-md&quot; @bind=&quot;@(                                                                                                                                                                                                        internalData.PassTeamViewer)&quot; /&gt;
    *@
            &lt;/div&gt;

            &lt;div class=&quot;col-span-12 h-fit p-2 flex flex-wrap&quot;&gt;
                &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Descripci&oacute;n&lt;/span&gt;
                &lt;textarea required  class=&quot;rounded p-2 w-full min-h-[150px] border border-slate-300/50 shadow-md&quot; @bind=&quot;@(                                                                                                                                                                                                                      internalData.Descripci&oacute;n)&quot;&gt;&lt;/textarea&gt;
            @* 	&lt;textarea required readonly=&quot;@(IsEdit &amp;&amp; !_user.Permissions.Contains(Security.Permisos.PermissionConstantsSoporte.SoporteEditSoliciIncidencia))&quot; class=&quot;rounded p-2 w-full min-h-[150px] border border-slate-300/50 shadow-md&quot; @bind=&quot;@(                                                                                                                                                                                                                      internalData.Descripci&oacute;n)&quot;&gt;&lt;/textarea&gt;
    *@
            &lt;/div&gt;

            &lt;div class=&quot;col-span-12 h-fit p-2 flex flex-wrap gap-3&quot;&gt;
                @if ((Files.Count + internalData.Archivos.Count) &lt; (IsEdit ? 8 : 4) &amp;&amp; (!IsEdit || (IsEdit &amp;&amp; (!initialEscaladaState &amp;&amp; internalData.Escalada))))
                {
                    &lt;div class=&quot;text-blue-400 w-full flex flex-wrap items-center gap-3&quot;&gt;
                        &lt;InputFile id=&quot;archivos&quot; hidden multiple OnChange=&quot;LoadFiles&quot; accept=&quot;image/*&quot;&gt;&lt;/InputFile&gt;
                        &lt;label for=&quot;archivos&quot; class=&quot;w-fit p-2 bg-blue-400 rounded text-white shadow-md cursor-pointer&quot;&gt;Subir archivos&lt;/label&gt;
                    &lt;/div&gt;
                }
                &lt;div class=&quot;w-full grid grid-cols-12 gap-3&quot;&gt;
                    @foreach (var v in internalData.Archivos)
                    {
                        string urlsss = $&quot;https://lpsgrupolatam.s3.sa-east-1.amazonaws.com/Soporte/{internalData.Index}_{internalData.Archivos.IndexOf(v)};{Path.GetExtension(v.Nombre)}&quot;;
                        &lt;div class=&quot;col-span-3 aspect-video cursor-pointer&quot; @onclick=&quot;@(()=&gt; OpenModalImage($&quot;https://lpsgrupolatam.s3.sa-east-1.amazonaws.com/Soporte/{internalData.Index}_{internalData.Archivos.IndexOf(v)};{Path.GetExtension(v.Nombre)}&quot;))&quot;
                            style=&quot;background-image: url('@($&quot;https://lpsgrupolatam.s3.sa-east-1.amazonaws.com/Soporte/{internalData.Index}_{internalData.Archivos.IndexOf(v)};{Path.GetExtension(v.Nombre)}&quot;)');
                            background-size: cover;&quot;&gt;
                        &lt;/div&gt;
                    }
                    @foreach (var v in Files)
                    {
                        &lt;div class=&quot;col-span-3 aspect-video&quot; style=&quot;background-image: url('data:@($&quot;{v.contentType};base64,{v.base64data}&quot;)'); background-size: cover;&quot;&gt;
                        &lt;/div&gt;
                    }
                &lt;/div&gt;
            &lt;/div&gt;

        @* 	&lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsSoporte.SoporteGestor)&quot;&gt; *@
            @* &lt;AuthorizedContent Roles=&quot;@(new List&lt;string&gt;{&quot;SoporteSupervisor&quot;})&quot;&gt; *@
                &lt;div class=&quot;col-span-12 rounded border border-slate-300/50 shadow-md grid grid-cols-12 gap-3&quot;&gt;
                    &lt;div class=&quot;col-span-12 h-auto p-2 flex flex-wrap&quot;&gt;
                        Historial de estados
                    &lt;/div&gt;
                    @foreach (var v in internalData.Estados)
                    {
                        &lt;div class=&quot;col-span-4 h-auto p-2 flex flex-wrap items-center justify-center text-blue-400&quot;&gt;
                            &lt;span class=&quot;rounded p-2 @(ColorEstados(v.Estado)) text-white&quot;&gt;@v.Estado&lt;/span&gt;
                        &lt;/div&gt;
                        &lt;div class=&quot;col-span-4 h-auto p-2 flex flex-wrap items-center justify-center&quot;&gt;
                            @(v.UserAsignado != null ? $&quot;{v.UserAsignado.Name} {v.UserAsignado.LastName}&quot; : &quot;Sin asignaci&oacute;n&quot;)
                        &lt;/div&gt;
                        &lt;div class=&quot;col-span-4 h-auto p-2 flex flex-wrap items-center justify-center&quot;&gt;
                            @($&quot;{v.Fecha.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd&quot;)} de {v.Fecha.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;MMMM&quot;)} de {v.Fecha.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;yyyy&quot;)}, {v.Fecha.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;HH:mm:ss&quot;)}&quot;)
                        &lt;/div&gt;
                    }
                &lt;/div&gt;
            @* &lt;/AuthorizedContent&gt; *@

            @if (IsEdit)
            {
                &lt;div class=&quot;col-span-12 h-fit p-2 flex flex-wrap&quot;&gt;

                    &lt;div class=&quot;text-blue-400 w-full flex flex-wrap items-center gap-3&quot;&gt;
                        &lt;button type=&quot;button&quot; class=&quot;w-fit p-2 bg-blue-400 text-white shadow-md rounded&quot; @onclick=&quot;@(() =&gt; internalData.Comentarios.Add(new(){Name = $&quot;{_user.name} {_user.surname}&quot;, Comentario = &quot;&quot;, ProfilePic = _user.profilePic, Id = _user.id, Fecha = DateTime.Now}))&quot;&gt;A&ntilde;adir comentario&lt;/button&gt;
                    &lt;/div&gt;

                    &lt;div class=&quot;w-full flex flex-col&quot;&gt;
                        @foreach (var v in internalData.Comentarios)
                        {
                            &lt;div class=&quot;w-full flex flex-wrap p-2&quot;&gt;
                                &lt;div class=&quot;w-full h-[75px] flex flex-wrap justify-between&quot;&gt;
                                    &lt;div class=&quot;w-fit flex flex-wrap items-center h-[75%] gap-2&quot;&gt;
                                        &lt;div class=&quot;h-[80%] aspect-square rounded-full&quot;
                                        style=&quot;background-image: url(@(v.ProfilePic)); background-size: cover; background-position: center;&quot;&gt;
                                        &lt;/div&gt;
                                        &lt;span&gt; @(v.Name)&lt;/span&gt;
                                        &lt;span&gt;|&lt;/span&gt;
                                        &lt;span&gt; @($&quot;{v.Fecha.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd&quot;)} de {v.Fecha.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;MMMM&quot;)} de {v.Fecha.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;yyyy&quot;)}, {v.Fecha.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;HH:mm:ss&quot;)}&quot;)&lt;/span&gt;
                                    &lt;/div&gt;
                                    &lt;div&gt;
                                        @if (v.Id == _user.id)
                                        {
                                            &lt;button type=&quot;button&quot; @onclick=&quot;() =&gt; internalData.Comentarios.Remove(v)&quot; class=&quot;w-fit p-2 bg-red-600 text-white shadow-md flex flex-wrap place-items-center rounded&quot;&gt;
                                                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                    delete
                                                &lt;/span&gt;
                                            &lt;/button&gt;
                                        }
                                    &lt;/div&gt;
                                &lt;/div&gt;
                                &lt;textarea class=&quot;w-full p-2 border border-slate-300/50 rounded h-40&quot; @bind=&quot;                        v.Comentario&quot; readonly=&quot;@(v.Id != _user.id)&quot;&gt;&lt;/textarea&gt;
                            &lt;/div&gt;
                        }
                    &lt;/div&gt;
                &lt;/div&gt;
            @* 	&lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsSoporte.SoporteEditSoliciIncidencia)&quot;&gt; *@
                    @*&lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsIncidencia.EditIncidencia)&quot;&gt;*@
                    &lt;div id=&quot;test&quot; class=&quot;col-span-12 h-fit p-2 flex flex-wrap justify-end gap-3&quot;&gt;
                        @if ((internalData.Escalada &amp;&amp; _user.Roles.Contains(&quot;SoporteExterno&quot;)) || (!internalData.Escalada &amp;&amp; _user.Roles.Contains(&quot;SoporteInterno&quot;)))
                        {
                            if (internalData.Estados.Last().Estado == &quot;Pendiente de inicio&quot;)
                            {
                                &lt;button type=&quot;button&quot; class=&quot;w-fit p-2 rounded bg-blue-600 text-white&quot; @onclick=&quot;@(() =&gt; {internalData.AsignadoA = new() {Id = _user.id, Email = _user.email, Name = _user.name, LastName = _user.surname, ProfilePic = _user.profilePic, Tel = _user.tel }; AddEstado(&quot;Iniciado&quot;); })&quot;&gt;
                                    Iniciar
                                &lt;/button&gt;
                                &lt;button type=&quot;button&quot; class=&quot;w-fit p-2 rounded bg-slate-950 text-white&quot; @onclick=&quot;@(() =&gt; AddEstado(&quot;Cancelado&quot;))&quot;&gt;Cancelar&lt;/button&gt;
                            }
                        }

                        @if (initialEscaladaState &amp;&amp; internalData.Escalada &amp;&amp; internalData.Estados.Last().Estado == &quot;Pendiente de inicio&quot; &amp;&amp; _user.Roles.Contains(&quot;SoporteInterno&quot;))
                        {
                            &lt;button type=&quot;button&quot; class=&quot;w-fit p-2 rounded bg-emerald-600 text-white&quot; @onclick=&quot;@(() =&gt; {internalData.AsignadoA = new() {Id = _user.id, Email = _user.email, Name = _user.name, LastName = _user.surname, ProfilePic = _user.profilePic, Tel = _user.tel }; internalData.Escalada = false; AddEstado(&quot;Pendiente de inicio&quot;); })&quot;&gt;
                                Recuperar incidencia
                            &lt;/button&gt;
                        }

                        @if (internalData.AsignadoA != null)
                        {
                            @if ((internalData.Escalada &amp;&amp; _user.email.ToLower() == internalData.AsignadoA.Email.ToLower()) ||
                                                        (!internalData.Escalada &amp;&amp; _user.email.ToLower() == internalData.AsignadoA.Email.ToLower()))
                            {

                                @if (internalData.Estados.Last().Estado == &quot;Iniciado&quot;)
                                {
                                    &lt;button type=&quot;button&quot; class=&quot;w-fit p-2 rounded bg-amber-400 text-white&quot; @onclick=&quot;@(() =&gt; AddEstado(&quot;Detenido&quot;))&quot;&gt;Detener&lt;/button&gt;
                                    &lt;button type=&quot;button&quot; class=&quot;w-fit p-2 rounded bg-teal-400 text-white&quot; @onclick=&quot;@(() =&gt; AddEstado(&quot;Cerrado&quot;))&quot;&gt;Cerrar&lt;/button&gt;
                                    &lt;button type=&quot;button&quot; class=&quot;w-fit p-2 rounded bg-slate-950 text-white&quot; @onclick=&quot;@(() =&gt; AddEstado(&quot;Cancelado&quot;))&quot;&gt;Cancelar&lt;/button&gt;
                                }
                                @if (internalData.Estados.Last().Estado == &quot;Detenido&quot;)
                                {
                                    &lt;button type=&quot;button&quot; class=&quot;w-fit p-2 rounded bg-blue-600 text-white&quot; @onclick=&quot;@(() =&gt; AddEstado(&quot;Iniciado&quot;))&quot;&gt;Reanudar&lt;/button&gt;
                                    &lt;button type=&quot;button&quot; class=&quot;w-fit p-2 rounded bg-slate-950 text-white&quot; @onclick=&quot;@(() =&gt; AddEstado(&quot;Cancelado&quot;))&quot;&gt;Cancelar&lt;/button&gt;
                                }
                            }
                        }
                    &lt;/div&gt;
                @* &lt;/AuthorizedContent&gt; *@
            }

            &lt;div class=&quot;col-span-12 h-fit p-2 flex flex-wrap justify-end gap-3&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot;w-fit p-2 rounded bg-red-600 text-white&quot; @onclick=&quot;@(() =&gt; Close(false))&quot;&gt;Salir sin guardar&lt;/button&gt;
                @* &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsSoporte.SoporteEditSoliciIncidencia)&quot;&gt; *@
                
                &lt;button id=&quot;submit&quot; type=&quot;submit&quot; class=&quot;w-fit p-2 rounded bg-blue-400 text-white&quot;&gt;@(IsEdit ? &quot;Guardar&quot; : &quot;Crear solicitud&quot;)&lt;/button&gt;
                @* &lt;/AuthorizedContent&gt; *@
            &lt;/div&gt;
        }
    &lt;/form&gt;

    @code {
        private bool OpenedState { get; set; }
        [Parameter] public bool Saved { get; set; }
        [CascadingParameter] public Action<bool> Close { get; set; }
        [Parameter] public E_Incidencia add { get; set; }

        private E_Incidencia internalData = new E_Incidencia();
        List<(string base64data, string contentType, string Name)> Files = new();
        bool initialEscaladaState = false;
        bool autorizacionEscaladaState = false;
        bool IsEdit => !string.IsNullOrEmpty(add.Id);
        SoporteLogic.E_Estado SaveWith = null;
        
        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;
            _disconnection.SaveStatus += (async () =>
            {
                try
                {
                    if (add != null)
                    {
                        await _localStorage.SetItemAsync("incidenciaadd", internalData);
                    }
                    else
                    {
                        await _localStorage.RemoveItemAsync("incidenciaadd");
                    }
                }
                catch (Exception e)
                {
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "AddEditIncidencia", "OnAfterRenderAsync", DateTime.UtcNow);
                    throw;
                }
            });
        }

        protected override async Task OnParametersSetAsync()
        {
            if (add != null)
            {
                if (!IsEdit && !Saved)
                {
                    internalData = new E_Incidencia()
                    {
                        Archivos = new(),
                        AsignadoA = null,
                        Escalada = false,
                        Descripción = "",
                        Estados = new()
                        {
                            new()
                            {
                                Estado = "Pendiente de inicio",
                                Fecha = DateTime.Now,
                                UserAsignado = null
                            }
                        },
                            User = new()
                            {
                                Email = _user.email,
                                Name = _user.name,
                                LastName = _user.surname,
                                ProfilePic = _user.profilePic,
                                Tel = _user.tel
                            }
                        };
                    }
                    else
                    {
                        internalData = add;
                        initialEscaladaState = internalData.Escalada;
                    }
                }
                await InvokeAsync(StateHasChanged);
            }

            async Task LoadFiles(InputFileChangeEventArgs e)
            {
                try
                {
                    if ((e.GetMultipleFiles(10000).Count + Files.Count + internalData.Archivos.Count) > (IsEdit ? 8 : 4))
                    {
                        _snackbar.InsertSnackbar(new($"Demasiados archivos escogidos. Solo puedes escoger {(IsEdit ? 8 : 4) - Files.Count + internalData.Archivos.Count} archivos", "cancel", 10000,"bg-amber-600", "text-white"));
                        return;
                    }

                    foreach (var v in e.GetMultipleFiles(100000))
                    {
                        if (v.Size <= 1024000)
                        {
                            var ms = new MemoryStream();
                            await v.OpenReadStream(1024000).CopyToAsync(ms);
                            Files.Add((Convert.ToBase64String(ms.ToArray()), v.ContentType, v.Name));
                        }
                        else
                        {
                            _snackbar.InsertSnackbar(new($"El archivo {v.Name} pesa demasiado. El peso máximo de la imagen debe ser de 1Mb", "cancel", 10000,"bg-amber-600", "text-white"));
                        }
                    }
                    await InvokeAsync(StateHasChanged);
                }
                catch (Exception ex)
                {
                    await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, "AddEditIncidencia", "LoadFiles", DateTime.UtcNow);
                    throw;
                }
            }

            async Task AddEstado(string estado)
            {
                if ((estado == "Cancelado" || estado == "Cerrado") && string.IsNullOrEmpty(internalData.Gravedad))
                {
                    _snackbar.InsertSnackbar(new($"Estás intentando cerrar un ticket sin indicar su gravedad", "cancel", 10000,
                    "bg-red-600", "text-white"));
                    return;
                }

                if ((estado == "Cancelado" || estado == "Cerrado") && string.IsNullOrEmpty(internalData.TipoIncidencia))
                {
                    _snackbar.InsertSnackbar(new($"Estás intentando cerrar un ticket sin indicar su tipo de incidencia", "cancel", 10000,
                    "bg-red-600", "text-white"));
                    return;
                }

                SaveWith = new SoporteLogic.E_Estado()
                {
                    Estado = estado,
                    Fecha = DateTime.Now,
                    UserAsignado = internalData.AsignadoA,
                };

                await _js.InvokeAsync<string>("submitForm");
            }

            async Task SaveAsync(bool CloseModal = true)
            {
                _main.IsLoading = true;
                foreach (var v in Files)
                {
                    internalData.Archivos.Add(new()
                    {
                        Base64Data = v.base64data,
                        Nombre = v.Name
                    });
                }

                Files.Clear();

                if (SaveWith != null)
                {
                    internalData.Estados.Add(SaveWith);
                    SaveWith = null;
                }

                if (!IsEdit)
                {
                    try
                    {
                        var response = await _mongoContext.AddSoporte(internalData, _mail);
                        if (response.IsSuccess && CloseModal)
                        {
                            Close(true);
                        }
                    }
                    catch (Exception e)
                    {
                        await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "AddEditIncidencia", "SaveAsync > AddSoporte", DateTime.UtcNow);
                        throw;
                    }
                }
                else
                {
                    try
                    {
                        var response = await _mongoContext.EditSoporte(_mongoUsers, internalData, _mail);
                        if (response.IsSuccess && CloseModal)
                        {
                            Close(true);
                        }
                    }
                    catch (Exception e)
                    {
                        await _mongoContext.RegistroError(e.Message, _user.name, _user.id, "AddEditIncidencia", "SaveAsync > EditSoporte", DateTime.UtcNow);
                        throw;
                    }
                }
                _main.IsLoading = false;
            }

            // Modal See Maximized Image
            string ImageRender = "";

            void OpenModalImage(string image)
            {
                ImageRender = image;
                var modal = _modal.ShowModal(typeof(SeeMaximizedImage), new Dictionary<string, object>
            {
                {nameof(SeeMaximizedImage.Image), ImageRender},
            }, FixedWidth: 80);
                modal.OnCloseModal += CloseModalImage;
            }

            void CloseModalImage(bool success)
            {
                ImageRender = "";
                InvokeAsync(StateHasChanged);
            }

            public string ColorEstados(string estado) => estado switch
            {
                "Pendiente de inicio" => "bg-slate-400",
                "Iniciado" => "bg-blue-400",
                "Cerrado" => "bg-teal-400",
                "Detenido" => "bg-red-600",
                "Cancelado" => "bg-slate-950",
            };
    }
    `
  },  
  {
    "ID": 33,
    "ServicesName": "SeeMaximizedIamge",
    "ServicesRoute": "Components/Areas/GeneralF/Soporte/Modals/SeeMaximizedIamge",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;div class=&quot;w-full h-[100dvh] relative&quot;&gt;
        &lt;button @onclick=&quot;()=&gt; {Close(false);}&quot;
                class=&quot;absolute top-[30px] right-[30px] p-2 text-xl flex flex-wrap items-center justify-center rounded-full bg-white&quot;&gt;
            &lt;span class=&quot;material-symbols-outlined text-red-600&quot;&gt;
                close
            &lt;/span&gt;
        &lt;/button&gt;
        @if (!string.IsNullOrEmpty(Image))
        {
            &lt;img src=&quot;@(Image)&quot; class=&quot;w-full h-full aspect-auto max-w-full max-h-full rounded&quot; /&gt;
        }
    &lt;/div&gt;

    @code {
        [Parameter] public string Image { get; set; }
        [CascadingParameter] public Action<bool> Close { get; set; }
    }
    `
  },
  {
    "ID": 34,
    "ServicesName": "Dashboard",
    "ServicesRoute": "Components/Areas/GeneralF/Soporte/Dashboard",
    "ServicesDescription":`
    `,
    "Code": `
    @if (data.Value != null)
    {
        &lt;div class=&quot;w-full h-fit grid grid-cols-12 p-6 gap-3&quot;&gt;
            &lt;div class=&quot;rounded col-span-4 bg-emerald-400 text-white flex flex-wrap p-2 gap-3&quot;&gt;
                &lt;span class=&quot;text-2xl&quot;&gt;Mes seleccionado&lt;/span&gt;
                &lt;div class=&quot;bg-white rounded text-black&quot;&gt;
                    &lt;Checkbox Checked=DataByMonth ChangeCheck=&quot;()=&gt; {DataByMonth = !DataByMonth; LoadApi();}&quot; Message=&quot;Ver datos mensuales&quot;&gt;&lt;/Checkbox&gt;
                &lt;/div&gt;
                &lt;select class=&quot;w-full text-black p-2 rounded border border-slate-300/50&quot; @bind=&quot;SetMonth&quot;&gt;
                    &lt;option value=&quot;1&quot;&gt;Enero&lt;/option&gt;
                    &lt;option value=&quot;2&quot;&gt;Febrero&lt;/option&gt;
                    &lt;option value=&quot;3&quot;&gt;Marzo&lt;/option&gt;
                    &lt;option value=&quot;4&quot;&gt;Abril&lt;/option&gt;
                    &lt;option value=&quot;5&quot;&gt;Mayo&lt;/option&gt;
                    &lt;option value=&quot;6&quot;&gt;Junio&lt;/option&gt;
                    &lt;option value=&quot;7&quot;&gt;Julio&lt;/option&gt;
                    &lt;option value=&quot;8&quot;&gt;Agosto&lt;/option&gt;
                    &lt;option value=&quot;9&quot;&gt;Septiembre&lt;/option&gt;
                    &lt;option value=&quot;10&quot;&gt;Octubre&lt;/option&gt;
                    &lt;option value=&quot;11&quot;&gt;Noviembre&lt;/option&gt;
                    &lt;option value=&quot;12&quot;&gt;Diciembre&lt;/option&gt;
                &lt;/select&gt;
            &lt;/div&gt;

            &lt;div class=&quot;rounded col-span-2 bg-blue-400 text-white flex flex-wrap p-2 gap-3&quot;&gt;
                &lt;span class=&quot;text-2xl&quot;&gt;A&ntilde;o seleccionado&lt;/span&gt;
                &lt;input type=&quot;number&quot; class=&quot;w-full text-black p-2 rounded border border-slate-300/50&quot; @bind-value=&quot;SetYear&quot; /&gt;
            &lt;/div&gt;
            &lt;div class=&quot;rounded col-span-3 bg-amber-400 text-white flex flex-wrap p-2 gap-3&quot;&gt;
                &lt;span class=&quot;text-2xl&quot;&gt;N&uacute;mero de solicitudes&lt;/span&gt;
                &lt;span class=&quot;text-base&quot;&gt;N&uacute;mero de solicitudes en @(DataByMonth ? IntToMonth() : SetYear): @(data.Value.NumberSolicitudes)&lt;/span&gt;
            &lt;/div&gt;
            &lt;div class=&quot;rounded col-span-3 bg-green-400 text-white flex flex-wrap p-2 gap-3&quot;&gt;
                &lt;span class=&quot;text-2xl&quot;&gt;N&uacute;mero de solicitudes escaladas&lt;/span&gt;
                &lt;span class=&quot;text-base&quot;&gt;N&uacute;mero de solicitudes escaladas en @(DataByMonth ? IntToMonth() : SetYear): @(data.Value.Escaladas)&lt;/span&gt;
            &lt;/div&gt;
            &lt;div class=&quot;col-span-4 h-[fit] flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Gravedad de las solicitudes&lt;/span&gt;
                &lt;div id=&quot;pieChart&quot; class=&quot;w-full h-fit&quot;&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;col-span-4 h-[fit] flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Tipos de las solicitudes&lt;/span&gt;
                &lt;div id=&quot;pieChartTipo&quot; class=&quot;w-full h-fit&quot;&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;col-span-4 h-[fit] flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;N&uacute;mero de solicitudes por usuario&lt;/span&gt;
                &lt;div id=&quot;barChart&quot; class=&quot;w-full h-fit&quot;&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;col-span-12 h-[fit] flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Horas atendiendo incidencias en el a&ntilde;o&lt;/span&gt;
                &lt;div id=&quot;lineChart2&quot; class=&quot;w-full h-fit&quot;&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;col-span-6 h-[fit] flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;N&uacute;mero de solicitudes por tipo&lt;/span&gt;
                &lt;div id=&quot;columnChart&quot; class=&quot;w-full h-fit&quot;&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;col-span-6 h-[fit] flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Horas con incidencias detenidas en el a&ntilde;o&lt;/span&gt;
                &lt;div id=&quot;lineChart&quot; class=&quot;w-full h-fit&quot;&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    }

    @code {
        public int MonthSelected { get; set; } = DateTime.Now.Month;
        public int YearSelected { get; set; } = DateTime.Now.Year;
        public bool DataByMonth { get; set; } = true;

        public int SetMonth
        {
            get
            {
                return MonthSelected;
            }
            set
            {
                MonthSelected = value;
                LoadApi();
            }
        }

        public int SetYear
        {
            get
            {
                return YearSelected;
            }
            set
            {
                YearSelected = value;
                LoadApi();
            }
        }

        Result&lt;DashboardData&gt; data = new();

        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;

            _main.BackgroundImage = &quot;&quot;;

            if (!_user.Roles.Contains(&quot;SoporteSupervisor&quot;) &amp;&amp; !_user.Roles.Contains(&quot;SoporteInterno&quot;) &amp;&amp; !_user.Roles.Contains(&quot;Admin&quot;))
            {
                _nav.NavigateTo(&quot;/&quot;);
            }

            await LoadApi();
        }

        async Task LoadApi()
        {
            try
            {
                _main.IsLoading = true;
                data = await _mongoContext.DashboardSoporte(new() { YearSearch = YearSelected, MonthSearch = MonthSelected }, _mongoUsers);
                await InvokeAsync(StateHasChanged);

                await Task.Delay(200);

                List&lt;object[]&gt; dataColumns = new();
                List&lt;object&gt; initialData = new();
                initialData.Add(&quot;Mes&quot;);

                var Users = data.Value.DataUserGet.Select(x =&gt; x.User).ToList();
                var listCleanUsers = new List&lt;EditUserDTORequest&gt;();

                foreach (var user in Users)
                {
                    if (listCleanUsers.Select(x =&gt; x.Email.ToLower()).Contains(user.Email.ToLower()))
                    {
                        continue;
                    }
                    else
                    {
                        listCleanUsers.Add(user);
                    }
                }

                foreach (var v in listCleanUsers)
                {
                    initialData.Add($&quot;{v.Name} {v.LastName}&quot;);
                }

                dataColumns.Add(initialData.ToArray());

                for (int i = 1; i &lt;= 12; i++)
                {
                    List&lt;object&gt; addData = new();

                    addData.Add(SelectMonth(i));

                    foreach (var v in listCleanUsers)
                    {
                        addData.Add(data.Value.DataUserGet.First(x =&gt; x.User.Email.ToLower() == v.Email.ToLower() &amp;&amp; x.Month == i).TiempoAtendiendo);
                    }

                    dataColumns.Add(addData.ToArray());
                }

                await _js.InvokeAsync&lt;string&gt;(&quot;loadLineChart2&quot;, JsonSerializer.Serialize(dataColumns));

                initialData.Clear();
                dataColumns.Clear();
                initialData.Add(&quot;Mes&quot;);
                foreach (var v in listCleanUsers)
                {
                    initialData.Add($&quot;{v.Name} {v.LastName}&quot;);
                }

                dataColumns.Add(initialData.ToArray());

                for (int i = 1; i &lt;= 12; i++)
                {
                    List&lt;object&gt; addData = new();

                    addData.Add(SelectMonth(i));

                    foreach (var v in listCleanUsers)
                    {
                        addData.Add(data.Value.DataUserGet.First(x =&gt; x.User.Email.ToLower() == v.Email.ToLower() &amp;&amp; x.Month == i).TiempoDetenido);
                    }

                    dataColumns.Add(addData.ToArray());
                }

                await _js.InvokeAsync&lt;string&gt;(&quot;loadLineChart&quot;, JsonSerializer.Serialize(dataColumns));
                await _js.InvokeAsync&lt;string&gt;(&quot;drawPieChart&quot;, data.Value.SolicitudesLeves, data.Value.SolicitudesGraves, data.Value.SolicitudesCriticas);
                await _js.InvokeAsync&lt;string&gt;(&quot;drawPieChartTipo&quot;, data.Value.NumberSolicitudesSistemas, data.Value.NumberSolicitudesMicroinform&aacute;tica,
                data.Value.NumberSolicitudesSistemasEscaladas, data.Value.NumberSolicitudesMicroinform&aacute;ticaEscaladas);
                await _js.InvokeAsync&lt;string&gt;(&quot;drawColumnChart&quot;, data.Value.SolicitudesHardware, data.Value.SolicitudesSoftware, data.Value.SolicitudesAltaUsuario,
                data.Value.SolicitudesRed, data.Value.SolicitudesCorreo, data.Value.SolicitudesOtro);

                List&lt;List&lt;object&gt;&gt; dataBarChart = new();

                List&lt;object&gt; initialDataBarChart = new()
                    {
                        &quot;Usuario&quot;, &quot;Solicitudes&quot;
                    };

                dataBarChart.Add(initialDataBarChart);

                foreach (var v in data.Value.SolicitudesUsuario)
                {
                    List&lt;object&gt; addData = new();
                    addData.Add(v.Key);
                    addData.Add(v.Value);

                    dataBarChart.Add(addData);
                }

                await _js.InvokeAsync&lt;string&gt;(&quot;drawBarChart&quot;, JsonSerializer.Serialize(dataBarChart));

                await InvokeAsync(StateHasChanged);

                _main.IsLoading = false;
            }
            catch (JsonException ex)
            {
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, &quot;Dashboard&quot;, &quot;LoadApi &gt; JsonException&quot;, DateTime.UtcNow);
                throw;
            }
            catch (Exception e)
            {

                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Dashboard&quot;, &quot;LoadApi &gt; Exception&quot;, DateTime.UtcNow);
                throw;
            }

        }

        string IntToMonth() =&gt; MonthSelected switch
        {
            1 =&gt; &quot;Enero&quot;,
            2 =&gt; &quot;Febrero&quot;,
            3 =&gt; &quot;Marzo&quot;,
            4 =&gt; &quot;Abril&quot;,
            5 =&gt; &quot;Mayo&quot;,
            6 =&gt; &quot;Junio&quot;,
            7 =&gt; &quot;Julio&quot;,
            8 =&gt; &quot;Agosto&quot;,
            9 =&gt; &quot;Septiembre&quot;,
            10 =&gt; &quot;Octubre&quot;,
            11 =&gt; &quot;Noviembre&quot;,
            12 =&gt; &quot;Diciembre&quot;,
        };

        string SelectMonth(int month) =&gt; month switch
        {
            1 =&gt; &quot;Enero&quot;,
            2 =&gt; &quot;Febrero&quot;,
            3 =&gt; &quot;Marzo&quot;,
            4 =&gt; &quot;Abril&quot;,
            5 =&gt; &quot;Mayo&quot;,
            6 =&gt; &quot;Junio&quot;,
            7 =&gt; &quot;Julio&quot;,
            8 =&gt; &quot;Agosto&quot;,
            9 =&gt; &quot;Septiembre&quot;,
            10 =&gt; &quot;Octubre&quot;,
            11 =&gt; &quot;Noviembre&quot;,
            12 =&gt; &quot;Diciembre&quot;,
        };
    }
    `
  },  
  {
    "ID": 35,
    "ServicesName": "Index",
    "ServicesRoute": "Components/Areas/GeneralF/Soporte/Index",
    "ServicesDescription":`
    `,
    "Code": `
    @*&lt;AuthorizePage Roles=&quot;@(new(){&quot;RRHH.Supervisor&quot;, &quot;RRHH.Tecnico&quot;})&quot;&gt;&lt;/AuthorizePage&gt;*@
    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        &lt;h1 class=&quot; w-full text-3xl text-blue-400&quot; tabindex=&quot;none&quot;&gt;Incidencias&lt;/h1&gt;
        &lt;h2 class=&quot;w-full text-xl text-slate-950&quot;&gt;Aqu&iacute; se pueden ver todas las incidencias creadas&lt;/h2&gt;
    
            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
        @*     &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsSoporte.SoporteAddSoliciIncidencia)&quot;&gt; *@
                    &lt;button class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3 mr-2&quot;
                            @onclick='()=&gt;{IsSaved=false; OpenModalincidencia();}'&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            warning
                        &lt;/span&gt;
                        Crear solicitud de incidencia
                    &lt;/button&gt;
            @*     &lt;/AuthorizedContent&gt; *@
                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsSoporte.SoporteExportarIncidencia)&quot;&gt;
                        &lt;button class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3 mr-2&quot;
                                @onclick='()=&gt;{DownlaodIncidencias();}'&gt;
                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                download_for_offline
                            &lt;/span&gt;
                            Exportar incidencias
                        &lt;/button&gt;
                &lt;/AuthorizedContent&gt;
            
            &lt;/div&gt;
            &lt;div class=&quot;w-full flex flex-wrap justify-between items-center mb-4 mr-2&quot;&gt;
            &lt;div class=&quot;w-full flex flex-wrap justify-between items-center mr-2&quot;&gt;
                &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                    &lt;AuthorizedContent Roles=&quot;@(new(){&quot;SoporteInterno&quot;, &quot;SoporteSupervisor&quot;})&quot;&gt;
                        &lt;Checkbox ChangeCheck=&quot;()=&gt;{get.Escaladas = !get.Escaladas; LoadDataApi();}&quot; Checked=get.Escaladas Message=&quot;Ver escaladas&quot;&gt;&lt;/Checkbox&gt;
                    &lt;/AuthorizedContent&gt;

                    &lt;select class=&quot;p-3 text-sm rounded border border-slate-300 mr-2&quot; @bind=&quot;estadosSearchSet&quot;&gt;
                        &lt;option value=&quot;&quot;&gt;Todos los estados&lt;/option&gt;
                        &lt;option value=&quot;Pendiente de inicio&quot;&gt;Pendiente de inicio&lt;/option&gt;
                        &lt;option value=&quot;Iniciado&quot;&gt;Iniciado&lt;/option&gt;
                        &lt;option value=&quot;Cerrado&quot;&gt;Cerrado&lt;/option&gt;
                        &lt;option value=&quot;Detenido&quot;&gt;Detenido&lt;/option&gt;
                        &lt;option value=&quot;Cancelado&quot;&gt;Cancelado&lt;/option&gt;
                    &lt;/select&gt;

                    &lt;input type=&quot;number&quot; placeholder=&quot;N&ordm; de incidencia...&quot; class=&quot;placeholder-black p-3 text-sm rounded border border-slate-300&quot;
                        @onchange=&quot;async (ChangeEventArgs e) =&gt; { await FiltrarPorNumeroIncidencia(e.Value.ToString()); }&quot; /&gt;
                    &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsSoporte.SoporteVerIncidencia)&quot;&gt;
                        @*&lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsIncidencia.EditIncidencia)&quot;&gt;*@
                        &lt;MultiSelect T=&quot;string&quot; OptionValue=&quot;(c)=&gt; c&quot; Placeholder=&quot;Paises...&quot; ToString=&quot;@((c)=&gt; string.Join(&quot;, &quot;, c))&quot;
                                    WidthClass=&quot;min-w-[250px]&quot; ZIndex=&quot;25&quot; Values=&quot;@([&quot;Espa&ntilde;a&quot;, &quot;Per&uacute;&quot;, &quot;Rep&uacute;blica Dominica&quot;, &quot;Colombia&quot;])&quot;
                                    SelectValues=&quot;@((c)=&gt; {get.Paises = c; InvokeAsync(StateHasChanged); LoadDataApi();})&quot;&gt;&lt;/MultiSelect&gt;

                        &lt;select class=&quot;p-3 text-sm rounded border border-slate-300&quot; @bind=&quot;gravedadSearchSet&quot;&gt;
                            &lt;option value=&quot;&quot;&gt;Buscar por gravedad...&lt;/option&gt;
                            &lt;option value=&quot;Leve&quot;&gt;Leve&lt;/option&gt;
                            &lt;option value=&quot;Grave&quot;&gt;Grave&lt;/option&gt;
                            &lt;option value=&quot;Cr&iacute;tica&quot;&gt;Cr&iacute;tica&lt;/option&gt;
                        &lt;/select&gt;
                    &lt;/AuthorizedContent&gt;

                    &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-3 text-sm rounded border border-slate-300&quot;
                        @bind-value=&quot;searchSet&quot; /&gt;
                &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
    

        &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;
            @if (Incidencias.Documents != null)
            {
                &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                N&ordm; de incidencia
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Usuario
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                &iquest;Requiere conexi&oacute;n remota?
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px] max-w-[300px]&quot;&gt;
                                Descripci&oacute;n
                            &lt;/th&gt;
                            &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsSoporte.SoporteVerIncidencia)&quot;&gt;
                                @*&lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsIncidencia.EditIncidencia)&quot;&gt;*@
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Asignado a
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Escalada
                                &lt;/th&gt;
                            &lt;/AuthorizedContent&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Estado
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha de solicitud
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var v in Incidencias.Documents)
                        {
                            &lt;tr&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    &lt;span class=&quot;text-blue-600 hover:underline cursor-pointer&quot; @onclick=&quot;()=&gt; OpenModalincidencia(v)&quot;&gt;Incidencia #@v.Index&lt;/span&gt;
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @($&quot;{v.User.Name} {v.User.LastName}&quot;)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(!string.IsNullOrEmpty(v.IdTeamViewer) &amp;&amp; !string.IsNullOrEmpty(v.PassTeamViewer) ? &quot;Requiere conexi&oacute;n remota&quot; : &quot;No requiere conexi&oacute;n remota&quot;)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50 max-w-[300px]&quot;&gt;
                                    @(v.Descripci&oacute;n)
                                &lt;/td&gt;
                                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsSoporte.SoporteVerIncidencia)&quot;&gt;
                                    @*&lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsIncidencia.EditIncidencia)&quot;&gt;*@
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                        @(v.AsignadoA != null ? $&quot;{v.AsignadoA.Name} {v.AsignadoA.LastName}&quot; : &quot;Sin asignaci&oacute;n&quot;)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                        @(v.Escalada ? &quot;Si&quot; : &quot;No&quot;)
                                    &lt;/td&gt;
                                &lt;/AuthorizedContent&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    &lt;span class=&quot;whitespace-nowrap rounded p-2 @(ColorEstados(v.Estados.Last().Estado)) text-white&quot;&gt;@v.Estados.Last().Estado&lt;/span&gt;
                                    @if (v.Estados.Last().Estado == &quot;Cerrado&quot;)
                                    {
                                        &lt;span class=&quot;p-2 text-sm border border-slate-300/50&quot; style=&quot;display: block; margin-top: 10px&quot;&gt;@(v.TipoIncidencia)&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @($&quot;{v.CreatedOn.ToRealLocalTime(_main.OffsetHoursTime).Day} de {v.CreatedOn.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;MMMM&quot;)} de {v.CreatedOn.ToRealLocalTime(_main.OffsetHoursTime).Year}, {v.CreatedOn.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;T&quot;)}&quot;)
                                &lt;/td&gt;
                            &lt;/tr&gt;
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;
                &lt;Paginator countAllDocuments=&quot;(int)Incidencias.CountAllDocuments&quot; countPages=&quot;Incidencias.PageCount&quot; filters=&quot;get&quot; ReloadData=&quot;()=&gt;LoadDataApi()&quot;&gt;

                &lt;/Paginator&gt;
            }
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        PaginatedResult&lt;E_Incidencia&gt; Incidencias = new();
        E_Incidencia internalData = new E_Incidencia();
        string id = &quot;&quot;;

        GetPaginatedIncidenciaDTORequest get = new()
            {
                Search = &quot;&quot;,
                PageNumber = 1,
                PageSize = 10,
                Escaladas = false,
                EstadosSearch = &quot;&quot;,
                Gravedad = &quot;&quot;,
            };


        public async Task FiltrarPorNumeroIncidencia(string numeroIncidencia)
        {
            if (int.TryParse(numeroIncidencia, out int index))
            {
                // Actualiza el valor de Index en el objeto de solicitud de paginaci&oacute;n
                get.Index = index;
                // Llama a la API o m&eacute;todo que carga los datos con el nuevo filtro aplicado
                await LoadDataApi();
            }
        }
        string estadosSearchSet
        {
            get
            {
                return get.EstadosSearch;
            }
            set
            {
                get.EstadosSearch = value;
                LoadDataApi();
            }
        }
        string gravedadSearchSet
        {
            get
            {
                return get.Gravedad;
            }
            set
            {
                get.Gravedad = value;
                LoadDataApi();
            }
        }
        string searchSet
        {
            get
            {
                return get.Search;
            }
            set
            {
                get.Search = value;
                LoadDataApi();
            }
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (!firstRender) return;
            _main.BackgroundImage = &quot;&quot;;
            await LoadDataApi();

            if (await _localStorage.ContainKeyAsync(&quot;incidenciaadd&quot;))
            {
                addeditModal = await _localStorage.GetItemAsync&lt;E_Incidencia&gt;(&quot;incidenciaadd&quot;);
                await _localStorage.RemoveItemAsync(&quot;incidenciaadd&quot;);
                IsSaved = true;
                OpenModalincidencia(addeditModal);
                await InvokeAsync(StateHasChanged);
                return;
            };

            var incidenciaId = _main.QueryParameters(_nav)[&quot;Id&quot;];
            if (!string.IsNullOrEmpty(incidenciaId))
            {
                id = incidenciaId;
                var incidencia = await _mongoContext.GetOneSoporte(id);
                if (incidencia != null &amp;&amp; incidencia.Value != null)
                {
                    OpenModalincidencia(incidencia.Value);
                }
            }
            await InvokeAsync(StateHasChanged);
        }

        async Task LoadDataApi()
        {
            try
            {
                _main.IsLoading = true;
                var pageSize = _main.QueryParameters(_nav)[&quot;pageSize&quot;];
                var pageNumber = _main.QueryParameters(_nav)[&quot;pageNumber&quot;];

                if (!string.IsNullOrEmpty(pageSize) &amp;&amp; !string.IsNullOrEmpty(pageNumber))
                {
                    get.PageNumber = int.Parse(pageNumber);
                    get.PageSize = int.Parse(pageSize);
                }

                Incidencias = await _mongoContext.GetPaginatedSoporte(get);
                await InvokeAsync(StateHasChanged);
                _main.IsLoading = false;
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Carpeta Soporte &gt; Index &quot;, &quot;LoadDataApi&quot;, DateTime.UtcNow);
                throw;
            }
        }

        protected override async Task OnInitializedAsync()
        {
            try
            {
                _main.BackgroundImage = &quot;&quot;;
                
                if (!_user.CheckTokenIsValid(_main.Token))
                {
                    // Redirigir a la p&aacute;gina de inicio de sesi&oacute;n o mostrar modal de inicio de sesi&oacute;n  en caso no estar logueado
                    Navigation.NavigateTo($&quot;login?returnUrl={Uri.EscapeDataString(Navigation.Uri)}&quot;);
                    return;
                }

                // Verifica si existe un par&aacute;metro &quot;Id&quot; en la URL
                var incidenciaId = _main.QueryParameters(_nav)[&quot;incidenciaId&quot;];
                if (!string.IsNullOrEmpty(incidenciaId))
                {
                    id = incidenciaId;
                    // Busca la incidencia por ID
                    var incidencia = await _mongoContext.GetOneSoporte(id);
                    if (incidencia != null &amp;&amp; incidencia.Value != null)
                    {
                        // Abre el modal de la incidencia
                        OpenModalincidencia(incidencia.Value);
                    }
                }
                // Carga los datos iniciales
                await LoadDataApi();
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Carpeta Soporte &gt; Index&quot;, &quot;OnInitializedAsync&quot;, DateTime.UtcNow);
                throw;
            }
        }


        async Task AccesoIncidencia(string id)
        {
            var data = await _mongoContext.GetOneSoporte(id);
            OpenModalincidencia(data.Value);
        }

        async Task DownlaodIncidencias()
        {
            _nav.NavigateTo(&quot;/api/Soporte/Export?Password=LPSExportSoporte&quot;, true, true);
            await _snackbar.InsertSnackbar(new($&quot;Cargando...&quot;, &quot;pending&quot;, 1500, &quot;bg-blue-400&quot;, &quot;text-white&quot;));
        }

        //Addedit
        public E_Incidencia addeditModal = new E_Incidencia();
        public bool IsSaved = false;
        void OpenModalincidencia(E_Incidencia edit = null) /* Abre un modal con un formulario para el guardado de incidencias. */
        {
            if (edit != null)
            {
                addeditModal = edit;
            }

            var modal = _modal.ShowModal(typeof(AddEditIncidencia), new Dictionary&lt;string, object&gt;
            {
                {nameof(AddEditIncidencia.add), addeditModal},
                {nameof(AddEditIncidencia.Saved), IsSaved}
            }, FixedWidth: 80);

            modal.OnCloseModal += CloseModalIncidencia;
        }

        async void CloseModalIncidencia(bool reload)
        {
            addeditModal = new E_Incidencia();

            if (reload)
            {
                await LoadDataApi();
            }

            await Task.Delay(100);
            await _localStorage.RemoveItemAsync(&quot;incidenciaadd&quot;);
            await InvokeAsync(StateHasChanged);
        }


        public string ColorEstados(string estado) =&gt; estado switch
        {
            &quot;Pendiente de inicio&quot; =&gt; &quot;bg-slate-400&quot;,
            &quot;Iniciado&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cerrado&quot; =&gt; &quot;bg-teal-400&quot;,
            &quot;Detenido&quot; =&gt; &quot;bg-red-600&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-slate-950&quot;,
        };
    }
    `
  }
];

// Variables para la paginación
let currentPage = 1;
const itemsPerPage = 7;
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