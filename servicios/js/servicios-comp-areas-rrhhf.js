const data = [
  {
    "ID": 1,
    "ServicesName": "AddEditAprobaciones",
    "ServicesRoute": "Components/RRHHF/Contrataciones/Modals/AddEditAprobaciones",
    "ServicesDescription":`
    `,
    "Code": `
    &lt;form class=&quot;w-full grid grid-cols-12 h-fit p-2 gap-3&quot; @onsubmit=&quot;SaveAsync&quot;&gt;
        @{
            if (!string.IsNullOrEmpty(Puesto))
            {
                addeditAprobaciones.Puesto = Puesto;
            }

            if (!string.IsNullOrEmpty(Nombre))
            {
                addeditAprobaciones.Nombre = Nombre;
            }

            if (!string.IsNullOrEmpty(Apellidos))
            {
                addeditAprobaciones.Apellidos = Apellidos;
            }

            if (!string.IsNullOrEmpty(EntrevistaId))
            {
                addeditAprobaciones.EntrevistaId = EntrevistaId;
            }

            if (!string.IsNullOrEmpty(IdProcesoSeleccion))
            {
                addeditAprobaciones.ProcesoSeleccionId = IdProcesoSeleccion;
            }
        }

        &lt;div class=&quot;col-span-12 text-blue-400 font-bold p-2&quot;&gt;
            @(IsEdit ? $&quot;Editar aprobaci&oacute;n para el puesto {addeditAprobaciones.Puesto}&quot; : &quot;A&ntilde;adir aprobaci&oacute;n&quot;)
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Nombre&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.Nombre&quot; required readonly /&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Apellidos&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.Apellidos&quot; required readonly /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Puesto&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.Puesto&quot; required readonly /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Departamento&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.Departamento&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-2 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Tipo de documento&lt;/span&gt;
            &lt;select class=&quot;w-full p-2 rounded border border-slate-300/50&quot;
            @bind=&quot;            addeditAprobaciones.TipoDocumentoIdentidad&quot; required&gt;
                &lt;option value=&quot;&quot;&gt;Selecciona el tipo&lt;/option&gt;
                &lt;option value=&quot;DNI&quot;&gt;DNI&lt;/option&gt;
                &lt;option value=&quot;NIE&quot;&gt;NIE&lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-4 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Documento&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.DocumentoIdentidad&quot; /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-4 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Reporta a&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.ReportaA&quot; /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-2 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Personal a cargo&lt;/span&gt;
            &lt;input type=&quot;number&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.PersonalACargo&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Tipo de contrato&lt;/span&gt;
            &lt;select class=&quot;w-full p-2 rounded border border-slate-300/50&quot;
            @bind=&quot;            addeditAprobaciones.TipoContrato&quot; required&gt;
                &lt;option value=&quot;&quot;&gt;Selecciona el tipo&lt;/option&gt;
                &lt;option value=&quot;Beca&quot;&gt;Beca&lt;/option&gt;
                &lt;option value=&quot;Practicas&quot;&gt;Pr&aacute;cticas&lt;/option&gt;
                &lt;option value=&quot;Indefinido&quot;&gt;Indefinido&lt;/option&gt;
                &lt;option value=&quot;Temporal3Meses&quot;&gt;Temporal - 3 meses&lt;/option&gt;
                &lt;option value=&quot;Temporal6Meses&quot;&gt;Temporal - 6 meses&lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Tipo de jornada&lt;/span&gt;
            &lt;select class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;            addeditAprobaciones.Jornada&quot;
            required&gt;
                &lt;option value=&quot;&quot;&gt;Selecciona el tipo&lt;/option&gt;
                &lt;option value=&quot;Completa&quot;&gt;Completa&lt;/option&gt;
                &lt;option value=&quot;Parcial&quot;&gt;Parcial&lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Horario&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.Horario&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Fecha de incorporaci&oacute;n&lt;/span&gt;
            &lt;input type=&quot;date&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.Incorporacion&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Salario&lt;/span&gt;
            &lt;input type=&quot;number&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.Salario&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Lugar de trabajo&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.LugarDeTrabajo&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;Checkbox Checked=addeditAprobaciones.NuevaIncorporacion
            ChangeCheck=&quot;@(() =&gt; {addeditAprobaciones.NuevaIncorporacion = !addeditAprobaciones.NuevaIncorporacion; InvokeAsync(StateHasChanged);})&quot;
            Message=&quot;&iquest;Es una nueva incorporaci&oacute;n?&quot;&gt;
            &lt;/Checkbox&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Sustituye a&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.SustituyeA&quot; /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Salario del anterior trabajador/a&lt;/span&gt;
            &lt;input type=&quot;number&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.SalarioSustitucion&quot; /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;Checkbox Checked=addeditAprobaciones.CondicionesEspeciales
            ChangeCheck=&quot;@(() =&gt; {addeditAprobaciones.CondicionesEspeciales = !addeditAprobaciones.CondicionesEspeciales; InvokeAsync(StateHasChanged);})&quot;
            Message=&quot;&iquest;Tiene condiciones especiales?&quot;&gt;
            &lt;/Checkbox&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Comentario sobre las condiciones especiales&lt;/span&gt;
            &lt;textarea class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.ComentarioCondicionesEspeciales&quot;&gt;&lt;/textarea&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;Checkbox Checked=addeditAprobaciones.RetribucionVariable
            ChangeCheck=&quot;@(() =&gt; {addeditAprobaciones.RetribucionVariable = !addeditAprobaciones.RetribucionVariable; InvokeAsync(StateHasChanged);})&quot;
            Message=&quot;&iquest;Tiene retribuci&oacute;n variable?&quot;&gt;
            &lt;/Checkbox&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Comentario sobre la retribuci&oacute;n variable&lt;/span&gt;
            &lt;textarea class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot;
            @bind=&quot;            addeditAprobaciones.ComentarioRetribucionVariable&quot;&gt;&lt;/textarea&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;div class=&quot;w-full flex flex-wrap items-center gap-3&quot;&gt;
                &lt;span class=&quot;text-blue-400&quot;&gt;A&ntilde;adir aprobador: &lt;/span&gt;

                &lt;Autocomplete T=&quot;E_User&quot; Database=&quot;@(DatabaseIdentifiers.Main)&quot;
                FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                ToString=&quot;@((e) =&gt; $&quot;{(!string.IsNullOrEmpty(e.Name) ? e.Name : &quot;&quot;)} {(!string.IsNullOrEmpty(e.LastName) ? e.LastName : &quot;&quot;)}&quot;)&quot;
                SelectOne=&quot;@((e) =&gt; {addeditAprobaciones.Aprobaciones.Add(new(){AprobacionInstantanea = false,Aprobador = e,Comentario = &quot;&quot;,Estado = &quot;&quot;}); InvokeAsync(StateHasChanged);})&quot;
                Ignore&gt;
                &lt;/Autocomplete&gt;

            &lt;/div&gt;

            &lt;table class=&quot;w-full table-auto border border-collapse border-slate-300/50&quot;&gt;
                &lt;thead&gt;
                    &lt;tr&gt;
                        &lt;th class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;
                            Aprobador
                        &lt;/th&gt;
                    @*   &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsAprobaciones.EditAprobaciones)&quot;&gt; *@
                        &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHAprobacionesEdit)&quot;&gt;
                            &lt;th class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;
                                Aprobaci&oacute;n instant&aacute;nea
                            &lt;/th&gt;
                        &lt;/AuthorizedContent&gt;
                        &lt;th class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;
                            Estado aprobaci&oacute;n
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;
                            Acciones
                        &lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    @foreach (var v in addeditAprobaciones.Aprobaciones)
                    {
                        &lt;tr&gt;
                            &lt;td class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;
                                @($&quot;{v.Aprobador.Name} {v.Aprobador.LastName}&quot;)
                            &lt;/td&gt;
                        @*  &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsAprobaciones.EditAprobaciones)&quot;&gt; *@
                            &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHAprobacionesEdit)&quot;&gt;
                                &lt;td class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;
                                    &lt;Checkbox
                                    ChangeCheck=&quot;() =&gt; {v.AprobacionInstantanea = !v.AprobacionInstantanea; InvokeAsync(StateHasChanged);}&quot;
                                    Checked=v.AprobacionInstantanea
                                    Message=&quot;@($&quot;&iquest;Puede aprobar instant&aacute;neamente {v.Aprobador.Name} {v.Aprobador.LastName}?&quot;)&quot;&gt;
                                    &lt;/Checkbox&gt;
                                &lt;/td&gt;
                            &lt;/AuthorizedContent&gt;
                        @*     &lt;/AuthorizedContent&gt; *@
                            &lt;td class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;
                                &lt;select class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;                v.Estado&quot;
                                disabled=&quot;@(v.Aprobador.Email.ToLower() != _user.email.ToLower())&quot;&gt;

                                    &lt;option value=&quot;&quot;&gt;----&lt;/option&gt;
                                    &lt;option value=&quot;Aprobado&quot;&gt;Aprobado&lt;/option&gt;
                                    &lt;option value=&quot;Rechazado&quot;&gt;Rechazado&lt;/option&gt;
                                &lt;/select&gt;
                            &lt;/td&gt;
                            &lt;td class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;
                                &lt;div class=&quot;flex flex-wrap gap-3 w-full&quot;&gt;
                                    &lt;button class=&quot;rounded p-2 flex flex-wrap items-center w-fit h-fit bg-red-600 text-white&quot;
                                    @onclick=&quot;() =&gt; addeditAprobaciones.Aprobaciones.Remove(v)&quot;&gt;
                                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                            delete
                                        &lt;/span&gt; Borrar aprobador
                                    &lt;/button&gt;
                                &lt;/div&gt;
                            &lt;/td&gt;
                        &lt;/tr&gt;
                    }
                &lt;/tbody&gt;
            &lt;/table&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;div class=&quot;w-full flex flex-wrap items-center&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot; p-2 rounded bg-blue-400 text-white&quot;
                @onclick=&quot;@(() =&gt; addeditAprobaciones.Comentarios.Add(new(){ Comentario = &quot;&quot;, Fecha=DateTime.Now, Id = _user.id, Name = $&quot;{_user.name} {_user.surname}&quot;, ProfilePic=_user.profilePic }))&quot;&gt;
                    A&ntilde;adir comentario
                &lt;/button&gt;
            &lt;/div&gt;

            &lt;div class=&quot;w-full flex flex-wrap gap-3 py-3&quot;&gt;
                @foreach (var vv in addeditAprobaciones.Comentarios)
                {
                    &lt;div class=&quot;w-full flex flex-wrap gap-2&quot;&gt;
                        @if (vv.Id == _user.id)
                        {
                            &lt;span class=&quot;w-full text-blue-400 text-sm flex flex-wrap justify-between items-center gap-3&quot;&gt;
                                &lt;div class=&quot;w-fit text-sm flex flex-wrap items-center gap-3&quot;&gt;
                                    &lt;div class=&quot;h-[40px] aspect-square rounded-full&quot;
                                    style=&quot;background-image: url(@(vv.ProfilePic)); background-size: cover;&quot;&gt;
                                    &lt;/div&gt;

                                    @($&quot;{vv.Name}&quot;)
                                &lt;/div&gt;

                                &lt;button type=&quot;button&quot; class=&quot;rounded bg-red-600 text-white py-0 px-1 w-fit h-fit&quot;
                                @onclick=&quot;() =&gt; addeditAprobaciones.Comentarios.Remove(vv)&quot;&gt;
                                    &lt;span class=&quot;material-symbols-outlined text-lg w-fit h-fit&quot;&gt;
                                        delete
                                    &lt;/span&gt;
                                &lt;/button&gt;
                            &lt;/span&gt;
                        }
                        else
                        {
                            &lt;div class=&quot;w-fit text-sm flex flex-wrap items-center gap-3&quot;&gt;
                                &lt;div class=&quot;h-[40px] aspect-square rounded-full&quot;
                                style=&quot;background-image: url(@(vv.ProfilePic)); background-size: cover;&quot;&gt;
                                &lt;/div&gt;

                                @($&quot;{vv.Name}&quot;)
                            &lt;/div&gt;
                        }

                        &lt;InputTextArea class=&quot;w-full border border-slate-300/50 rounded p-2&quot; @bind-Value=&quot;vv.Comentario&quot;
                        readonly=&quot;@(vv.Id != _user.id)&quot;&gt;&lt;/InputTextArea&gt;
                    &lt;/div&gt;
                }
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 flex flex-wrap justify-end items-end p-2 gap-3&quot;&gt;
            &lt;button type=&quot;button&quot; class=&quot;col-span-1 w-fit h-fit p-2 bg-red-600 text-white rounded flex flex-wrap gap-3&quot;
            @onclick=&quot;@(() =&gt; Close(false))&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                    cancel
                &lt;/span&gt;
                Cancelar
            &lt;/button&gt;
        @*  &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsAprobaciones.EditAprobaciones)&quot;&gt; *@
                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHAprobacionesEdit)&quot;&gt;
                &lt;button type=&quot;submit&quot;
                class=&quot;col-span-1 w-fit h-fit p-2 bg-teal-600 text-white rounded flex flex-wrap gap-3&quot;&gt;
                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                        save
                    &lt;/span&gt;
                    Guardar
                &lt;/button&gt;
            &lt;/AuthorizedContent&gt;
        &lt;/div&gt;
    &lt;/form&gt;

    @code {

        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        [Parameter] public E_Aprobaciones addeditAprobaciones { get; set; } = new();
        [Parameter] public bool Saved { get; set; }

        [Parameter] public string Puesto { get; set; }
        [Parameter] public string Nombre { get; set; }
        [Parameter] public string Apellidos { get; set; }
        [Parameter] public string EntrevistaId { get; set; }
        [Parameter] public string IdProcesoSeleccion { get; set; }

        bool IsEdit =&gt; !string.IsNullOrEmpty(addeditAprobaciones.Id);

        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;

            _disconnection.SaveStatus += (async () =&gt;
            {
                try
                {
                    if (addeditAprobaciones != null)
                    {
                        await _localStorage.SetItemAsync(&quot;aprobacionesadd&quot;, addeditAprobaciones);

                    }
                    else
                    {
                        await _localStorage.RemoveItemAsync(&quot;aprobacionesadd&quot;);
                    }
                }
                catch (Exception e)
                {
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;AddEditAprobaciones&quot;, &quot;OnAfterRenderAsync&quot;, DateTime.UtcNow);

                    throw;
                }
            });
        }
        protected override async Task OnParametersSetAsync()
        {
            if (!IsEdit &amp;&amp; !Saved)
            {
                addeditAprobaciones = new E_Aprobaciones()
                    {
                        Comentarios = new(),
                        Horario = &quot;Lunes a jueves 09:00 a 18:00; viernes 08:00 a 15:00&quot;,
                        Incorporacion = DateTime.Now,
                        Aprobaciones = new(),
                    };
            }

            await InvokeAsync(StateHasChanged);
        }

        async Task SaveAsync()
        {
            try
            {
                _main.IsLoading = true;

                if (!Validate())
                {
                    _main.IsLoading = false;
                    return;
                }

                if (IsEdit)
                {
                    await _mongoContext.EditAprobaciones(addeditAprobaciones);
                }
                else
                {
                    await _mongoContext.AddAprobaciones(addeditAprobaciones, IdProcesoSeleccion, _mail);
                }
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;AddEditAprobaciones&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false; 
                    Close(true);
            }
    
        }

        bool Validate()
        {
            if (addeditAprobaciones.Aprobaciones.Count == 0)
            {
                _snackbar.InsertSnackbar(new(&quot;Hace falta al menos un aprobador&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                return false;
            }

            return true;
        }
    }
    `
  },  
  {
    "ID": 2,
    "ServicesName": "AddEditProcesoSeleccion",
    "ServicesRoute": "Components/RRHHF/Contrataciones/Modals/AddEditProcesoSeleccion",
    "ServicesDescription":`
    `,
    "Code": `
    @using System.Threading.Channels
    &lt;form class=&quot;w-full grid grid-cols-12 h-fit p-2 gap-3&quot; @onsubmit=&quot;SaveAsync&quot;&gt;
        &lt;div class=&quot;col-span-12 text-blue-400 font-bold p-2&quot;&gt;
            @(IsEdit ? $&quot;Editar proceso de selecci&oacute;n para el puesto {addedit.Puesto}&quot; : &quot;A&ntilde;adir proceso de selecci&oacute;n&quot;)
        &lt;/div&gt;

    @*  &lt;AuthorizedContent Roles=&quot;@([&quot;RRHH.Supervisor&quot;])&quot;&gt; *@
        &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHProcesosSeleccionEditProcesoSeleccion)&quot;&gt;
            &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
                &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Responsable del proceso&lt;/span&gt;
                @if (addedit.ResponsableProceso != null)
                {
                    &lt;Autocomplete T=&quot;E_User&quot;
                                Database=&quot;@(DatabaseIdentifiers.Main)&quot;
                                FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                                ToString=&quot;@((e) =&gt; $&quot;{(!string.IsNullOrEmpty(e.Name) ? e.Name : &quot;&quot;)} {(!string.IsNullOrEmpty(e.LastName) ? e.LastName : &quot;&quot;)}&quot;)&quot;
                                SelectOne=&quot;@((e) =&gt; {addedit.ResponsableProceso = e; InvokeAsync(StateHasChanged);})&quot;
                                Placeholder=&quot;Responsable del proceso&quot;&gt;
                    &lt;/Autocomplete&gt;
                }
                else
                {
                    &lt;Autocomplete T=&quot;E_User&quot;
                                Database=&quot;@(DatabaseIdentifiers.Main)&quot;
                                FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                                ToString=&quot;@((e) =&gt; $&quot;{(!string.IsNullOrEmpty(e.Name) ? e.Name : &quot;&quot;)} {(!string.IsNullOrEmpty(e.LastName) ? e.LastName : &quot;&quot;)}&quot;)&quot;
                                SelectOne=&quot;@((e) =&gt; {addedit.ResponsableProceso = e; InvokeAsync(StateHasChanged);})&quot;
                                InitialTextValue=&quot;@($&quot;{(addedit.ResponsableProceso?.Name )} {(addedit.ResponsableProceso?.LastName)}&quot;)&quot;
                                InitialValue=&quot;addedit.ResponsableProceso&quot;
                                Placeholder=&quot;Responsable del proceso&quot;&gt;
                    &lt;/Autocomplete&gt;
                }

            &lt;/div&gt;
        &lt;/AuthorizedContent&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Solicitante del proceso&lt;/span&gt;

            @if (addedit.SolicitanteProceso == null)
            {
                &lt;Autocomplete T=&quot;E_User&quot;
                            Database=&quot;@(DatabaseIdentifiers.Main)&quot;
                            FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                            ToString=&quot;@((e) =&gt; $&quot;{(!string.IsNullOrEmpty(e.Name) ? e.Name : &quot;&quot;)} {(!string.IsNullOrEmpty(e.LastName) ? e.LastName : &quot;&quot;)}&quot;)&quot;
                            SelectOne=&quot;@((e) =&gt; {addedit.SolicitanteProceso = e; InvokeAsync(StateHasChanged);})&quot;
                            Placeholder=&quot;Solicitante del proceso&quot;&gt;
                &lt;/Autocomplete&gt;
            }
            else
            {
                &lt;Autocomplete T=&quot;E_User&quot;
                            Database=&quot;@(DatabaseIdentifiers.Main)&quot;
                            FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                            ToString=&quot;@((e) =&gt; $&quot;{(!string.IsNullOrEmpty(e.Name) ? e.Name : &quot;&quot;)} {(!string.IsNullOrEmpty(e.LastName) ? e.LastName : &quot;&quot;)}&quot;)&quot;
                            SelectOne=&quot;@((e) =&gt; {addedit.SolicitanteProceso = e; InvokeAsync(StateHasChanged);})&quot;
                            InitialTextValue=&quot;@($&quot;{(addedit.SolicitanteProceso.Name)} {(addedit.SolicitanteProceso.LastName)}&quot;)&quot;
                            InitialValue=&quot;addedit.SolicitanteProceso&quot;
                            Placeholder=&quot;Solicitante del proceso&quot;&gt;
                &lt;/Autocomplete&gt;
            }
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Departamento&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.Departamento&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Puesto&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.Puesto&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Prioridad&lt;/span&gt;
            &lt;select class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;            addedit.Prioridad&quot;&gt;
                &lt;option value=&quot;&quot;&gt;Selecciona la prioridad&lt;/option&gt;
                &lt;option value=&quot;1&quot;&gt;1&lt;/option&gt;
                &lt;option value=&quot;2&quot;&gt;2&lt;/option&gt;
                &lt;option value=&quot;3&quot;&gt;3&lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Pa&iacute;s&lt;/span&gt;
            &lt;select class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;            addedit.Pais&quot; required&gt;
                &lt;option value=&quot;&quot;&gt;Selecciona el pa&iacute;s&lt;/option&gt;
            @*  &lt;option value=&quot;Espa&ntilde;a&quot;&gt;Espa&ntilde;a&lt;/option&gt; *@
                &lt;option value=&quot;Peru&quot;&gt;Per&uacute;&lt;/option&gt;
                &lt;option value=&quot;Republica Dominicana&quot;&gt;Republica Dominicana&lt;/option&gt;
                &lt;option value=&quot;Colombia&quot;&gt;Colombia&lt;/option&gt;
                @* &lt;option value=&quot;Alemania&quot;&gt;Alemania&lt;/option&gt; *@
            @*  &lt;option value=&quot;Marruecos&quot;&gt;Marruecos&lt;/option&gt;
                &lt;option value=&quot;Mauritania&quot;&gt;Mauritania&lt;/option&gt; *@
            &lt;/select&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Provincia&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.Provincia&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;N&ordm; de vacantes&lt;/span&gt;
            &lt;input type=&quot;number&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.Vacantes&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Vacantes cubiertas&lt;/span&gt;
            &lt;input type=&quot;number&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.VacantesCubiertasCount&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Fecha de inicio del proceso&lt;/span&gt;
            &lt;input type=&quot;date&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.FechaInicio&quot; /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Fecha fin del proceso&lt;/span&gt;
            &lt;input type=&quot;date&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.FechaFin&quot; /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Estado&lt;/span&gt;
            &lt;select class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;            Estado&quot; required&gt;
                &lt;option value=&quot;Pendiente de inicio&quot;&gt;Pendiente de inicio&lt;/option&gt;
                &lt;option value=&quot;Fase CV&quot;&gt;Fase CV&lt;/option&gt;
                &lt;option value=&quot;Fase entrevistas&quot;&gt;Fase entrevistas&lt;/option&gt;
                &lt;option value=&quot;Fase negociaci&oacute;n&quot;&gt;Fase negociaci&oacute;n&lt;/option&gt;
                &lt;option value=&quot;Stand by&quot;&gt;Stand by&lt;/option&gt;
                &lt;option value=&quot;Finalizado&quot;&gt;Finalizado&lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Motivo de reclutamiento&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.MotivoReclutamiento&quot; /&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Persona que reemplaza (si es reemplazo)&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.PersonaQueReeemplaza&quot; /&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Jefe inmediato&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.JefeInmediato&quot; /&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Categor&iacute;a&lt;/span&gt;
            &lt;select class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;            addedit.Categoria&quot;&gt;
                &lt;option value=&quot;&quot;&gt;Selecciona la categor&iacute;a&lt;/option&gt;
                &lt;option value=&quot;T&eacute;cnico&quot;&gt;T&eacute;cnico&lt;/option&gt;
                &lt;option value=&quot;Coordinador&quot;&gt;Coordinador&lt;/option&gt;
                &lt;option value=&quot;Project manager&quot;&gt;Project manager&lt;/option&gt;
                &lt;option value=&quot;Gerente&quot;&gt;Gerente&lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Fecha de llegada&lt;/span&gt;
            &lt;input type=&quot;date&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.FechaLlegada&quot; /&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Fecha de reclutamiento&lt;/span&gt;
            &lt;input type=&quot;date&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.FechaReclutamiento&quot; /&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Mes llegada de requerimiento&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.MesLlegadaRequerimiento&quot; /&gt;
        &lt;/div&gt;



        &lt;div class=&quot;col-span-12 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;div class=&quot;w-full flex flex-wrap items-center gap-3&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot; p-2 rounded bg-blue-400 text-white&quot;
                        @onclick=&quot;() =&gt; {addedit.Entrevistas.Add(new(){EntrevistaId = Guid.NewGuid().ToString(), ComentariosEntrevista = new(), Entrevistas = new()}); ResetExpanded();}&quot;&gt;
                    A&ntilde;adir entrevistado/a
                &lt;/button&gt;

                @foreach (var v in addedit.Entrevistas)
                {
                    &lt;div class=&quot;relative w-full flex flex-wrap gap-3 p-2 items-center rounded bg-slate-50 shadow-md&quot;&gt;
                        &lt;button type=&quot;button&quot; class=&quot;absolute top-[15px] right-[15px] w-fit h-fit flex flex-wrap items-center&quot;
                                @onclick=&quot;() =&gt; {Expanded[addedit.Entrevistas.IndexOf(v)] = !Expanded[addedit.Entrevistas.IndexOf(v)];}&quot;&gt;
                            @if (Expanded[addedit.Entrevistas.IndexOf(v)])
                            {
                                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                    expand_less
                                &lt;/span&gt;
                            }
                            else
                            {
                                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                    expand_more
                                &lt;/span&gt;
                            }
                        &lt;/button&gt;

                        &lt;Autocomplete T=&quot;E_UsuariosRRHH&quot; SelectOne=&quot;(e)=&gt; {v.UserEntrevista= e; InvokeAsync(StateHasChanged);}&quot;
                                    ToString=&quot;@((e)=&gt; $&quot;{e.NombreEntrevistado} {e.ApellidoEntrevistado}&quot;)&quot;
                                    Database=&quot;@DatabaseIdentifiers.Contrataciones&quot;
                                    FilterMongo=&quot;@((s)=&gt; Builders&lt;E_UsuariosRRHH&gt;.Filter.Regex(x=&gt; x.NombreEntrevistado, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                                    Ignore
                                    MaxWidth=&quot;300&quot; Placeholder=&quot;Introduce el usuario...&quot;&gt;&lt;/Autocomplete&gt;

                        @if (v.UserEntrevista != null)
                        {
                            &lt;input type=&quot;text&quot; @bind=&quot;                v.UserEntrevista.NombreEntrevistado&quot; placeholder=&quot;Nombre...&quot; class=&quot;rounded border border-slate-300/50 p-2 shadow-md&quot; readonly /&gt;
                            &lt;input type=&quot;text&quot; @bind=&quot;                v.UserEntrevista.ApellidoEntrevistado&quot; placeholder=&quot;Apellidos...&quot; class=&quot;rounded border border-slate-300/50 p-2 shadow-md&quot; readonly /&gt;
                            &lt;input type=&quot;text&quot; @bind=&quot;                v.UserEntrevista.TelefonoEntrevistado&quot; placeholder=&quot;Tel&eacute;fono...&quot; class=&quot;rounded border border-slate-300/50 p-2 shadow-md&quot; readonly /&gt;
                        }
                        else
                        {
                            &lt;a href=&quot;/procesoseleccion/usuarios?add=true&quot; class=&quot;rounded bg-blue-400 p-2 text-white flex flex-wrap items-center
    justify-center&quot; target=&quot;_blank&quot;&gt;
                                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                    add
                                &lt;/span&gt;
                            &lt;/a&gt;
                        }
                        @if (v.UserEntrevista != null)
                        {
                            @if (!string.IsNullOrEmpty(v.UserEntrevista.IdentifierCV))
                            {
                                &lt;a target=&quot;_blank&quot; download href=&quot;@($&quot;https://uf.lpsgrupo.dev/api/CV/{v.UserEntrevista.IdentifierCV}&quot;)&quot;
                                class=&quot;p-2 w-fit h-fit flex flex-wrap items-center gap-3 bg-blue-400 text-white rounded&quot;&gt;
                                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                        download
                                    &lt;/span&gt;
                                    Descargar CV
                                &lt;/a&gt;
                            }
                        }


                        &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 bg-blue-400 text-white rounded shadow-md&quot;
                                @onclick=&quot;@(() =&gt; v.Entrevistas.Add(new(){Entrevistador = new(), Tipo = &quot;&quot;, FechaEntrevista = DateTime.Now}))&quot;&gt;
                            A&ntilde;adir entrevista
                        &lt;/button&gt;



                        &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 bg-red-600 text-white rounded shadow-md&quot;
                                @onclick=&quot;@(() =&gt; OpenModalDeleteEntrevistado(v))&quot;&gt;
                            Borrar entrevistad@(&quot;@&quot;)
                        &lt;/button&gt;

                        @if (Expanded[addedit.Entrevistas.IndexOf(v)])
                        {
                            &lt;table class=&quot;max-w-full w-full overflow-x-auto table-auto border border-collapse border-slate-300/50 rounded&quot;&gt;
                                &lt;thead&gt;
                                    &lt;tr&gt;
                                        &lt;th class=&quot;p-2&quot;&gt;Fecha de entrevista&lt;/th&gt;
                                        &lt;th class=&quot;p-2&quot;&gt;Tipo&lt;/th&gt;
                                        &lt;th class=&quot;p-2&quot;&gt;Entrevistadores&lt;/th&gt;
                                        &lt;th class=&quot;p-2&quot;&gt;Acciones&lt;/th&gt;
                                    &lt;/tr&gt;
                                &lt;/thead&gt;
                                &lt;tbody&gt;
                                    @foreach (var entrevista in v.Entrevistas)
                                    {
                                        &lt;tr&gt;
                                            &lt;td class=&quot;p-2&quot;&gt;
                                                &lt;input type=&quot;date&quot; @bind=&quot;                                entrevista.FechaEntrevista&quot;
                                                    class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot; /&gt;
                                            &lt;/td&gt;
                                            &lt;td class=&quot;p-2&quot;&gt;
                                                &lt;div class=&quot;w-full flex flex-col gap-3&quot;&gt;
                                                    &lt;select class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot; @bind=&quot;                                entrevista.Tipo&quot;&gt;
                                                        &lt;option value=&quot;&quot;&gt;----&lt;/option&gt;
                                                        &lt;option value=&quot;Telefonica&quot;&gt;Telef&oacute;nica&lt;/option&gt;
                                                        &lt;option value=&quot;RRHH&quot;&gt;RRHH&lt;/option&gt;
                                                        &lt;option value=&quot;Tecnica&quot;&gt;T&eacute;cnica&lt;/option&gt;
                                                    &lt;/select&gt;

                                                    @if (entrevista.Tipo == &quot;Tecnica&quot;)
                                                    {
                                                        &lt;Checkbox Message=&quot;&iquest;Apto?&quot; ChangeCheck=&quot;() =&gt; entrevista.Apto = !entrevista.Apto&quot;
                                                                Checked=&quot;entrevista.Apto&quot;&gt;
                                                        &lt;/Checkbox&gt;
                                                    }
                                                &lt;/div&gt;
                                            &lt;/td&gt;
                                            &lt;td class=&quot;p-2&quot;&gt;
                                                &lt;div class=&quot;w-full flex flex-col gap-3&quot;&gt;
                                                    &lt;div class=&quot;w-full&quot;&gt;
                                                        &lt;Autocomplete T=&quot;E_User&quot;
                                                                    Database=&quot;@(DatabaseIdentifiers.Main)&quot;
                                                                    FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                                                                    ToString=&quot;@((e) =&gt; $&quot;{(!string.IsNullOrEmpty(e.Name) ? e.Name : &quot;&quot;)} {(!string.IsNullOrEmpty(e.LastName) ? e.LastName : &quot;&quot;)}&quot;)&quot;
                                                                    SelectOne=&quot;@((e) =&gt; AddEntrevistador(entrevista, e))&quot;
                                                                    Ignore=true&gt;
                                                        &lt;/Autocomplete&gt;
                                                    &lt;/div&gt;

                                                    @foreach (var d in entrevista.Entrevistador)
                                                    {
                                                        &lt;div class=&quot;w-full grid grid-cols-12 items-center&quot;&gt;
                                                            &lt;input type=&quot;text&quot; value=&quot;@($&quot;{d.Name} {d.LastName}&quot;)&quot; readonly
                                                                class=&quot;col-span-10 p-2 rounded border border-slate-300/50 shadow-md&quot; /&gt;
                                                            &lt;div class=&quot;col-span-2 flex flex-wrap items-center justify-center&quot;&gt;
                                                                &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 bg-red-600 text-white flex flex-wrap items-center justify-center&quot; @onclick=&quot;@(() =&gt; entrevista.Entrevistador.Remove(d))&quot;&gt;
                                                                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                                        delete
                                                                    &lt;/span&gt;
                                                                &lt;/button&gt;
                                                            &lt;/div&gt;
                                                        &lt;/div&gt;
                                                    }
                                                &lt;/div&gt;
                                            &lt;/td&gt;
                                            &lt;td class=&quot;p-2&quot;&gt;
                                                &lt;div class=&quot;w-full flex flex-wrap justify-center gap-3&quot;&gt;
                                                    &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsAprobaciones.EditAprobaciones)&quot;&gt;
                                                        @if (v.UserEntrevista != null)
                                                        {
                                                            &lt;button type=&quot;button&quot; class=&quot;p-2 h-fit rounded bg-emerald-400 text-white flex flex-wrap items-center justify-center&quot;
                                                                    @onclick=&quot;() =&gt; OpenModalAprobacion(v.UserEntrevista.NombreEntrevistado,
                                                                v.UserEntrevista.ApellidoEntrevistado, addedit.Puesto, v.EntrevistaId)&quot;&gt;
                                                                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                                    check
                                                                &lt;/span&gt; Pasar candidato a aprobaci&oacute;n
                                                            &lt;/button&gt;
                                                        }

                                                    &lt;/AuthorizedContent&gt;

                                                @*  &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsProcesoSeleccion.EditProcesoSeleccion)&quot;&gt; *@
                                                    &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHProcesosSeleccionEditProcesoSeleccion)&quot;&gt;
                                                        &lt;button type=&quot;button&quot; class=&quot;p-2 h-fit rounded bg-red-600 text-white flex flex-wrap items-center justify-center&quot; @onclick=&quot;() =&gt; v.Entrevistas.Remove(entrevista)&quot;&gt;
                                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                                delete
                                                            &lt;/span&gt; Borrar entrevista
                                                        &lt;/button&gt;
                                                    &lt;/AuthorizedContent&gt;
                                                &lt;/div&gt;
                                            &lt;/td&gt;
                                        &lt;/tr&gt;
                                    }
                                &lt;/tbody&gt;
                            &lt;/table&gt;

                            &lt;div class=&quot;w-full p-2 flex flex-wrap gap-3&quot;&gt;
                                &lt;div class=&quot;w-full flex flex-wrap items-center&quot;&gt;
                                    &lt;button type=&quot;button&quot; class=&quot; p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;@(() =&gt; v.ComentariosEntrevista.Add(new() { Comentario = &quot;&quot;, Fecha=DateTime.Now, Id = _user.id, Name = $&quot;{_user.name} {_user.surname}&quot;, ProfilePic=_user.profilePic }))&quot;&gt;
                                        A&ntilde;adir comentario
                                    &lt;/button&gt;
                                &lt;/div&gt;

                                &lt;div class=&quot;w-full flex flex-wrap gap-3 py-3&quot;&gt;
                                    @foreach (var vv in v.ComentariosEntrevista)
                                    {
                                        &lt;div class=&quot;w-full flex flex-wrap gap-2&quot;&gt;
                                            @if (vv.Id == _user.id)
                                            {
                                                &lt;span class=&quot;w-full text-blue-400 text-sm flex flex-wrap justify-between items-center gap-3&quot;&gt;
                                                    &lt;div class=&quot;w-fit text-sm flex flex-wrap items-center gap-3&quot;&gt;
                                                        &lt;div class=&quot;h-[40px] aspect-square rounded-full&quot; style=&quot;background-image: url(@(vv.ProfilePic)); background-size: cover;&quot;&gt;
                                                        &lt;/div&gt;

                                                        @($&quot;{vv.Name}&quot;)
                                                    &lt;/div&gt;

                                                    &lt;button type=&quot;button&quot; class=&quot;rounded bg-red-600 text-white py-0 px-1 w-fit h-fit&quot; @onclick=&quot;() =&gt; v.ComentariosEntrevista.Remove(vv)&quot;&gt;
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

                                                    @($&quot;{vv.Name}&quot;)
                                                &lt;/div&gt;
                                            }

                                            &lt;textarea class=&quot;w-full border border-slate-300/50 rounded p-2&quot; @bind=&quot;                                    vv.Comentario&quot;
                                                    readonly=&quot;@(vv.Id != _user.id)&quot;&gt;&lt;/textarea&gt;
                                        &lt;/div&gt;
                                    }
                                &lt;/div&gt;
                            &lt;/div&gt;
                        }
                    &lt;/div&gt;
                }
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;InputTextArea class=&quot;col-span-12 min-h-[100px] rounded border border-slate-300/50 p-2&quot; placeholder=&quot;Comentario...&quot; @bind-Value=&quot;addedit.ComentarioExtra&quot;&gt;&lt;/InputTextArea&gt;


        &lt;div class=&quot;col-span-12 flex flex-wrap justify-end items-end p-2 gap-3&quot;&gt;
            &lt;button type=&quot;button&quot; class=&quot;col-span-1 w-fit h-fit p-2 bg-red-600 text-white rounded flex flex-wrap gap-3&quot;
                    @onclick=&quot;@(() =&gt; Close(false))&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                    cancel
                &lt;/span&gt;
                Cancelar
            &lt;/button&gt;
            &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsProcesoSeleccion.EditProcesoSeleccion)&quot;&gt;
                &lt;button type=&quot;submit&quot; class=&quot;col-span-1 w-fit h-fit p-2 bg-teal-600 text-white rounded flex flex-wrap gap-3&quot;&gt;
                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                        save
                    &lt;/span&gt;
                    Guardar
                &lt;/button&gt;
            &lt;/AuthorizedContent&gt;
        &lt;/div&gt;
    &lt;/form&gt;

    @code {

        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        [Parameter] public E_ProcesoSeleccion addedit { get; set; } = new();
        bool IsEdit =&gt; !string.IsNullOrEmpty(addedit.Id);

        List&lt;bool&gt; Expanded = new();

        public string Estado
        {
            get
            {
                return addedit.Estados.Last();
            }
            set
            {
                addedit.Estados.Add(value);
            }
        }
        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;
        }
        protected override async Task OnParametersSetAsync()
        {
            if (!IsEdit)
            {
                addedit = new E_ProcesoSeleccion()
                    {
                        Comentarios = new(),
                        Entrevistas = new(),
                        VacantesCubiertas = new()
                    };
            }
            ResetExpanded();
        }

        void ResetExpanded()
        {
            Expanded.Clear();
            foreach (var v in addedit.Entrevistas)
            {
                Expanded.Add(false);

                if (v.ComentariosEntrevista == null) v.ComentariosEntrevista = new();
                if (v.Entrevistas == null) v.Entrevistas = new();
            }
        }

        void AddEntrevistador(DataEntrevistas entrevista, E_User e)
        {
            entrevista.Entrevistador.Add(e);
            InvokeAsync(StateHasChanged);
        }

        async Task SaveAsync()
        {
            _main.IsLoading = true;

            if (!Validate())
            {
                _main.IsLoading = false;
                return;
            }

            if (addedit.Entrevistas.Any(c =&gt; c.Entrevistas.Any(b =&gt; b.Entrevistador.Count == 0)))
            {
                _snackbar.InsertSnackbar(new(&quot;&iexcl;No puede haber entrevistas sin entrevistadores!&quot;, &quot;cancel&quot;, 10000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                _main.IsLoading = false;
                return;
            }

            try
            {
                if (IsEdit)
                    {
                        if (addedit.ResponsableProceso == null)
                        {
                            var user = await _mongoUsers.Users.Find(x =&gt; x.Email.ToLower() == _user.email.ToLower()).FirstAsync();

                            addedit.ResponsableProceso = user;
                        }

                        await _mongoContext.EditProcesoSeleccion(addedit);
                    }
                    else
                    {
                        await _mongoContext.AddProcesoSeleccion(addedit);
                    }
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;AddEditProcesoSeleccion&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
                Close(true);
            }
    
        }

        bool Validate()
        {
            if (addedit.Estados.Last() == &quot;Finalizado&quot; &amp;&amp; (addedit.FechaFin == null || addedit.FechaInicio == null))
            {
                _snackbar.InsertSnackbar(new(&quot;El estado Finalizado requiere de una fecha de inicio y una fecha de fin&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
            }

            if (addedit.FechaFin != null &amp;&amp; addedit.FechaInicio != null)
            {
                if (addedit.FechaFin &lt;= addedit.FechaInicio)
                {
                    _snackbar.InsertSnackbar(new(&quot;La fecha de fin no puede ser anterior a la fecha de inicio&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                }
            }

            return true;
        }

        //ModalAprobacion

        void OpenModalAprobacion(string nombre, string apellidos, string puesto, string entrevistaId)
        {
            if (IsEdit)
            {
                var parameters = new Dictionary&lt;string, object&gt;()
                {
                    {nameof(AddEditAprobaciones.Nombre), nombre},
                    {nameof(AddEditAprobaciones.Apellidos), apellidos},
                    {nameof(AddEditAprobaciones.Puesto), puesto},
                    {nameof(AddEditAprobaciones.EntrevistaId), entrevistaId},
                    {nameof(AddEditAprobaciones.IdProcesoSeleccion), addedit.Id},
                };

                var modal = _modal.ShowModal(typeof(AddEditAprobaciones), parameters, 80);

                modal.OnCloseModal += (b) =&gt; { };
            }
        }

        // Modal delete entrevistad@

        void OpenModalDeleteEntrevistado(E_Entrevistas entity)
        {
            var modal = _modal.ShowModal(typeof(ConfirmationModal), new Dictionary&lt;string, object&gt;
            {
                {nameof(ConfirmationModal.Message), &quot;&iquest;Eliminar entrevistad@?&quot;},
                {nameof(ConfirmationModal.Title), &quot;Eliminar&quot;},
            }, FixedWidth: 60);

            modal.OnCloseModal += (b) =&gt;
            {
                if (b)
                {
                    addedit.Entrevistas.Remove(entity);
                    InvokeAsync(StateHasChanged);
                }
            };
        }
    }
    `
  },
  {
    "ID": 3,
    "ServicesName": "AddEditUsuariosRRHH",
    "ServicesRoute": "Components/RRHHF/Contrataciones/Modals/AddEditUsuariosRRHH",
    "ServicesDescription":`
    `,
    "Code": `
    @using System.Threading.Channels
    &lt;form class=&quot;relative w-full grid grid-cols-12 h-fit p-2 gap-3&quot; @onsubmit=&quot;SaveAsync&quot;&gt;
        &lt;div class=&quot;col-span-12 text-blue-400 font-bold p-2&quot;&gt;
            @(IsEdit ? $&quot;Editar candidato {addedit.NombreEntrevistado} {addedit.ApellidoEntrevistado}&quot; : &quot;A&ntilde;adir candidato&quot;)
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Nombre&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.NombreEntrevistado&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Apellidos&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.ApellidoEntrevistado&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Pa&iacute;s&lt;/span&gt;
            &lt;select class=&quot;w-full p-2 rounded border border-slate-300/50&quot; @bind=&quot;            addedit.Pais&quot; required&gt;
                &lt;option value=&quot;&quot;&gt;Selecciona el pa&iacute;s&lt;/option&gt;
            @*  &lt;option value=&quot;Espa&ntilde;a&quot;&gt;Espa&ntilde;a&lt;/option&gt; *@
                &lt;option value=&quot;Peru&quot;&gt;Per&uacute;&lt;/option&gt;
                &lt;option value=&quot;RD&quot;&gt;Rep&uacute;blica dominicana&lt;/option&gt;
                &lt;option value=&quot;Colombia&quot;&gt;Colombia&lt;/option&gt;
            @*     &lt;option value=&quot;Alemania&quot;&gt;Alemania&lt;/option&gt;
                &lt;option value=&quot;Marruecos&quot;&gt;Marruecos&lt;/option&gt;
                &lt;option value=&quot;Mauritania&quot;&gt;Mauritania&lt;/option&gt; *@
            &lt;/select&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Localidad&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.Localidad&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Telefono&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.TelefonoEntrevistado&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Puesto al que aspira&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.PuestoAlQueAspira&quot; readonly /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Puesto preferente&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            addedit.PuestoPreferente&quot;/&gt;
        &lt;/div&gt;



        &lt;div class=&quot;col-span-12 flex flex-wrap justify-end items-end p-2 gap-3&quot;&gt;
            @if (!string.IsNullOrEmpty(addedit.IdentifierCV))
            {
                &lt;a target=&quot;_blank&quot; download href=&quot;@($&quot;https://uf.lpsgrupo.dev/api/CV/{addedit.IdentifierCV}&quot;)&quot; class=&quot;p-2 w-fit h-fit flex flex-wrap items-center&quot;&gt;
                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                        download
                    &lt;/span&gt;
                &lt;/a&gt;
            }

            &lt;label for=&quot;@($&quot;cv{addedit.Id}&quot;)&quot; class=&quot;p-2 w-fit h-fit flex flex-wrap items-center cursor-pointer&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                    @(!string.IsNullOrEmpty(addedit.IdentifierCV) ? &quot;sync&quot; : &quot;picture_as_pdf&quot;)
                &lt;/span&gt;
            &lt;/label&gt;

            &lt;InputFile hidden id=&quot;@($&quot;cv{addedit.Id}&quot;)&quot; OnChange=&quot;@(e =&gt; SelectCV(e))&quot; accept=&quot;pdf&quot;&gt;&lt;/InputFile&gt;

            &lt;button type=&quot;button&quot; class=&quot;col-span-1 w-fit h-fit p-2 bg-red-600 text-white rounded flex flex-wrap gap-3&quot;
            @onclick=&quot;@(() =&gt; Close(false))&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                    cancel
                &lt;/span&gt;
                Cancelar
            &lt;/button&gt;
    @*        &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsProcesoSeleccion.EditProcesoSeleccion)&quot;&gt; *@
            &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHProcesosSeleccionEditProcesoSeleccion)&quot;&gt;
                &lt;button type=&quot;submit&quot; class=&quot;col-span-1 w-fit h-fit p-2 bg-teal-600 text-white rounded flex flex-wrap gap-3&quot;&gt;
                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                        save
                    &lt;/span&gt;
                    Guardar
                &lt;/button&gt;
            &lt;/AuthorizedContent&gt;
        &lt;/div&gt;
    &lt;/form&gt;

    @code {

        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        [Parameter] public E_UsuariosRRHH addedit { get; set; } = new();
        [Parameter] public bool Saved { get; set; }

        bool IsEdit =&gt; !string.IsNullOrEmpty(addedit.Id);

        List&lt;bool&gt; Expanded = new();
        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;

            _disconnection.SaveStatus += (async () =&gt;
            {
                try
                {
                    if (addedit != null)
                    {
                        await _localStorage.SetItemAsync(&quot;usuariosRRHHadd&quot;, addedit);
                    }
                    else
                    {
                        await _localStorage.RemoveItemAsync(&quot;usuariosRRHHadd&quot;);
                    }
                }
                catch (Exception e)
                {
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;AddEditUsuariosRRHH&quot;, &quot;OnAfterRenderAsync&quot;, DateTime.UtcNow);

                    throw;
                }
            });
        }
        protected override async Task OnParametersSetAsync()
        {
            if (!IsEdit &amp;&amp; !Saved)
            {
                addedit = new E_UsuariosRRHH()
                { };
            }
        }

        async Task SaveAsync()
        {
            try
            {
                _main.IsLoading = true;

                if (IsEdit)
                {
                    await _mongoContext.EditUsuariosRRHH(addedit);
                }
                else
                {
                    await _mongoContext.AddUsuariosRRHH(addedit);
                }
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;AddEditUsuariosRRHH&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
                Close(true);
            }
        
        }

        async Task SelectCV(InputFileChangeEventArgs e)
        {
            if (Path.GetExtension(e.File.Name).ToLower() != &quot;.pdf&quot;)
            {
                _snackbar.InsertSnackbar(new(&quot;El archivo debe estar en formato PDF&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                return;
            }

            _main.IsLoading = true;

            if (string.IsNullOrEmpty(addedit.IdentifierCV))
                addedit.IdentifierCV = Guid.NewGuid().ToString();

            var idSnackbar = await _snackbar.InsertSnackbar(new($&quot;Subiendo {Path.GetFileName(e.File.Name)}: 0%&quot;, &quot;upload&quot;, int.MaxValue, &quot;bg-blue-400&quot;, &quot;text-white&quot;));

            var buffer = new byte[8112];
            int bytesRead;
            long allBytesRead = 0;

            int offset = 0;

            _main.IsLoading = false;

            if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), &quot;CV&quot;)))
            {
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), &quot;CV&quot;));
            }

            var Data = e.File.OpenReadStream(e.File.Size);

            var fs = File.Create(Path.Combine(Directory.GetCurrentDirectory(), &quot;CV&quot;, $&quot;{addedit.IdentifierCV}{Path.GetExtension(e.File.Name)}&quot;));

            while ((bytesRead = await Data.ReadAsync(buffer, 0, buffer.Length)) &gt; 0)
            {
                await fs.WriteAsync(buffer, 0, bytesRead);

                offset++;
                allBytesRead += bytesRead;

                if (offset % 20 == 0)
                {
                    _snackbar.ModifySnackbarMessage(idSnackbar, $&quot;Subiendo {Path.GetFileName(e.File.Name)}: {(allBytesRead * 100d / e.File.Size).ToString(&quot;F2&quot;)}%&quot;);
                }
            }

            fs.Close();

            _snackbar.ModifySnackbarMessage(idSnackbar, $&quot;Subiendo {Path.GetFileName(e.File.Name)}: 100%&quot;);
            await Task.Delay(2000);
            _snackbar.CloseSnackbar(idSnackbar);
        }
    }
    `
  },  
  {
    "ID": 4,
    "ServicesName": "Dashboard",
    "ServicesRoute": "Components/RRHHF/Contrataciones/Dashboard",
    "ServicesDescription":`
    `,
    "Code": `
    @page &quot;/procesoseleccion/dashboard&quot;
    &lt;AuthorizePage Roles=&quot;@(new(){&quot;RRHH.Supervisor&quot;})&quot;&gt;&lt;/AuthorizePage&gt;
    @if (dashboardData != null)
    {
        &lt;div class=&quot;w-full h-fit grid grid-cols-12 p-6 gap-3&quot;&gt;

            &lt;div class=&quot;rounded col-span-4 bg-blue-400 text-white flex flex-wrap p-2 gap-3&quot;&gt;
                &lt;span class=&quot;text-2xl&quot;&gt;Fecha inicio&lt;/span&gt;
                &lt;InputDate TValue=&quot;DateTime?&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md text-black&quot;
                        @bind-Value=&quot;SetDate1&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;rounded col-span-4 bg-emerald-400 text-white flex flex-wrap p-2 gap-3&quot;&gt;
                &lt;span class=&quot;text-2xl&quot;&gt;Fecha fin&lt;/span&gt;
                &lt;InputDate TValue=&quot;DateTime?&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md text-black&quot;
                        @bind-Value=&quot;SetDate2&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;col-span-6 flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Procesos de seleccion&lt;/span&gt;
                &lt;div id=&quot;barChartProceso&quot; class=&quot;w-full h-fit&quot;&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;div class=&quot;col-span-6 flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Procesos de selecci&oacute;n&lt;/span&gt;
                &lt;table class=&quot;w-full table-auto border border-collapse border-slate-300/50&quot;&gt;
                    &lt;tbody&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Procesos activos
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.ProcesosActivos
                            &lt;/td&gt;
                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Procesos pendientes de inicio
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.ProcesosPendienteInicio
                            &lt;/td&gt;
                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Procesos Stand by
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.ProcesosStandBy
                            &lt;/td&gt;
                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Procesos finalizados
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.ProcesosFinalizados
                            &lt;/td&gt;
                        &lt;/tr&gt;
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;

            &lt;div class=&quot;col-span-6 flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Datos en procesos de selecci&oacute;n&lt;/span&gt;
                &lt;div id=&quot;barChartEntrevistas&quot; class=&quot;w-full h-fit&quot;&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;div class=&quot;col-span-6 flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Datos en procesos de selecci&oacute;n&lt;/span&gt;
                &lt;table class=&quot;w-full table-auto border border-collapse border-slate-300/50&quot;&gt;
                    &lt;tbody&gt;

                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Llamadas realizadas
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.NumeroLlamadasTelefonicas
                            &lt;/td&gt;
                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Entrevistas realizadas
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.NumeroEntrevistas
                            &lt;/td&gt;
                        &lt;/tr&gt;
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;


            &lt;div class=&quot;col-span-6 flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Procesos en fase entrevistas&lt;/span&gt;
                &lt;table class=&quot;w-full table-auto border border-collapse border-slate-300/50&quot;&gt;
                    &lt;tbody&gt;

                    @*     &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Espa&ntilde;a
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.Espa&ntilde;a
                            &lt;/td&gt;
                        &lt;/tr&gt; *@
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Per&uacute;
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.Peru
                            &lt;/td&gt;

                        &lt;/tr&gt;
            @*             &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Marruecos
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.Marruecos
                            &lt;/td&gt;

                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Mauritania
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.Mauritania
                            &lt;/td&gt;

                        &lt;/tr&gt; *@
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Colombia
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.Colombia
                            &lt;/td&gt;

                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Rep&uacute;blica Dominicana
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.RD
                            &lt;/td&gt;

                        &lt;/tr&gt;
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;

            &lt;div class=&quot;col-span-6 flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Procesos en fase CV&lt;/span&gt;
                &lt;table class=&quot;w-full table-auto border border-collapse border-slate-300/50&quot;&gt;
                    &lt;tbody&gt;

                        &lt;tr&gt;
                        @*    &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Espa&ntilde;a
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.Espa&ntilde;aFCV
                            &lt;/td&gt; *@
                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Per&uacute;
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.PeruFCV
                            &lt;/td&gt;

                        &lt;/tr&gt;
                @*       &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Marruecos
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.MarruecosFCV
                            &lt;/td&gt;

                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Mauritania
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.MauritaniaFCV
                            &lt;/td&gt;

                        &lt;/tr&gt; *@
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Colombia
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.ColombiaFCV
                            &lt;/td&gt;

                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Rep&uacute;blica Dominicana
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.RDFCV
                            &lt;/td&gt;

                        &lt;/tr&gt;
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;
            &lt;div class=&quot;col-span-6 flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Procesos en fase negociaci&oacute;n&lt;/span&gt;
                &lt;table class=&quot;w-full table-auto border border-collapse border-slate-300/50&quot;&gt;
                    &lt;tbody&gt;

                    @*     &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Espa&ntilde;a
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.Espa&ntilde;aFNegociacion
                            &lt;/td&gt;
                        &lt;/tr&gt; *@
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Per&uacute;
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.PeruFNegociacion
                            &lt;/td&gt;

                        &lt;/tr&gt;
                @*        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Marruecos
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.MarruecosFNegociacion
                            &lt;/td&gt;

                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Mauritania
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.MauritaniaFNegociacion
                            &lt;/td&gt;

                        &lt;/tr&gt; *@
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Colombia
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.ColombiaFNegociacion
                            &lt;/td&gt;

                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Rep&uacute;blica Dominicana
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.RDFNegociacion
                            &lt;/td&gt;

                        &lt;/tr&gt;
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;
            &lt;div class=&quot;col-span-6 flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Procesos en Stand by&lt;/span&gt;
                &lt;table class=&quot;w-full table-auto border border-collapse border-slate-300/50&quot;&gt;
                    &lt;tbody&gt;

                    @*  &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Espa&ntilde;a
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.Espa&ntilde;aStandBy
                            &lt;/td&gt;
                        &lt;/tr&gt; *@
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Per&uacute;
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.PeruStandBy
                            &lt;/td&gt;

                        &lt;/tr&gt;
            @*           &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Marruecos
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.MarruecosStandBy
                            &lt;/td&gt;

                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Mauritania
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.MauritaniaStandBy
                            &lt;/td&gt;

                        &lt;/tr&gt; *@
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Colombia
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.ColombiaStandBy
                            &lt;/td&gt;

                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Rep&uacute;blica Dominicana
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.RDStandBy
                            &lt;/td&gt;

                        &lt;/tr&gt;
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;
            &lt;div class=&quot;col-span-6 flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Procesos pendientes de inicio&lt;/span&gt;
                &lt;table class=&quot;w-full table-auto border border-collapse border-slate-300/50&quot;&gt;
                    &lt;tbody&gt;

                    @*     &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Espa&ntilde;a
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.Espa&ntilde;aPInicio
                            &lt;/td&gt;
                        &lt;/tr&gt; *@
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Per&uacute;
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.PeruPInicio
                            &lt;/td&gt;

                        &lt;/tr&gt;
                @*       &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Marruecos
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.MarruecosPInicio
                            &lt;/td&gt;

                        &lt;/tr&gt; *@
                @*        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Mauritania
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.MauritaniaPInicio
                            &lt;/td&gt;

                        &lt;/tr&gt; *@
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Colombia
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.ColombiaPInicio
                            &lt;/td&gt;

                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Rep&uacute;blica Dominicana
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.RDPInicio
                            &lt;/td&gt;

                        &lt;/tr&gt;
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;

            &lt;div class=&quot;col-span-6 flex flex-wrap bg-slate-800 rounded text-white p-2&quot;&gt;
                &lt;span class=&quot;h-[50px] w-full&quot;&gt;Procesos finalizados&lt;/span&gt;
                &lt;table class=&quot;w-full table-auto border border-collapse border-slate-300/50&quot;&gt;
                    &lt;tbody&gt;

                @*       &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Espa&ntilde;a
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.Espa&ntilde;aFinalizado
                            &lt;/td&gt;
                        &lt;/tr&gt; *@
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Per&uacute;
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.PeruPFinalizado
                            &lt;/td&gt;

                        &lt;/tr&gt;
                @*        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Marruecos
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.MarruecosFinalizado
                            &lt;/td&gt;

                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Mauritania
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.MauritaniaFinalizado
                            &lt;/td&gt;

                        &lt;/tr&gt; *@
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Colombia
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.ColombiaFinalizado
                            &lt;/td&gt;

                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                Rep&uacute;blica Dominicana
                            &lt;/td&gt;
                            &lt;td class=&quot;border border-slate-300/50 p-2&quot;&gt;
                                @dashboardData.RDFinalizado
                            &lt;/td&gt;

                        &lt;/tr&gt;
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    }

    @code {
        public DashboardDTO dashboardData = new();

        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;

            await LoadDataDashboard();
        }

        DateTime? SetDate1
        {
            get
            {
                return filters.DateRangeSearch.Key;
            }
            set
            {
                filters.DateRangeSearch = new(value, filters.DateRangeSearch.Value);
            LoadDataDashboard();
            }
        }

        DateTime? SetDate2
        {
            get
            {
                return filters.DateRangeSearch.Value;
            }
            set
            {
                filters.DateRangeSearch = new(filters.DateRangeSearch.Key, value);
                LoadDataDashboard();
            }
        }

        public GetDashboardData filters = new()
            {
                DateRangeSearch = new(DateTime.Now.AddDays(-365), DateTime.Now),
                Search = &quot;&quot;,
            };

        async Task LoadDataDashboard()
        {
            try
            {
                _main.IsLoading = true;
                        var response = await _mongoContext.DashboardProcesoSeleccion(new GetDashboardData()
                            {
                                DateRangeSearch = new(filters.DateRangeSearch.Key, filters.DateRangeSearch.Value),
                                Search = &quot;&quot;
                            });

                        dashboardData = response.Value;

                        await InvokeAsync(StateHasChanged);

                        await LoadCharts();
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Dashboard&quot;, &quot;LoadDataDashboard&quot;, DateTime.UtcNow);

                throw;
            }
            
        }

        async Task LoadCharts()
        {
            await _js.InvokeAsync&lt;string&gt;(&quot;drawBarChartProcesos&quot;, dashboardData.ProcesosActivos, dashboardData.ProcesosStandBy,
            dashboardData.ProcesosFinalizados, dashboardData.ProcesosPendienteInicio);
            await _js.InvokeAsync&lt;string&gt;(&quot;drawBarChartEntrevistas&quot;, dashboardData.NumeroCandidatos,
            dashboardData.NumeroLlamadasTelefonicas,
            dashboardData.NumeroEntrevistas);
            _main.IsLoading = false;
        }
    }
    `
  },
  {
    "ID": 5,
    "ServicesName": "Index",
    "ServicesRoute": "Components/RRHHF/Contrataciones/Index",
    "ServicesDescription":`
    `,
    "Code": `
    @page &quot;/procesoseleccion&quot;
    @using LPSGrupo.Components.Areas.RRHHF.Contrataciones.Modals
    @using MongoDB.Driver.Linq
    @*&lt;AuthorizePage Roles=&quot;@(new(){&quot;RRHH.ProcesosSeleccion&quot;})&quot;&gt;&lt;/AuthorizePage&gt;*@
    &lt;AuthorizePage Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHH)&quot;&gt;&lt;/AuthorizePage&gt;


    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        &lt;h1 class=&quot; w-full text-3xl text-blue-400&quot; tabindex=&quot;none&quot;&gt;Procesos de selecci&oacute;n&lt;/h1&gt;
        &lt;h2 class=&quot;w-full text-xl text-slate-950&quot;&gt;Aqu&iacute; se pueden ver todos los procesos de selecci&oacute;n&lt;/h2&gt;

        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                @*&lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsProcesoSeleccion.AddProcesoSeleccion)&quot;&gt;*@
                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHProcesosSeleccionCrearProcesoSeleccion)&quot;&gt;
                    &lt;button type=&quot;button&quot; class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3&quot; @onclick=&quot;() =&gt; {OpenModalAddEdit();}&quot;&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            manage_accounts
                        &lt;/span&gt;
                        Crear proceso de selecci&oacute;n
                    &lt;/button&gt;
                &lt;/AuthorizedContent&gt;

                @*&lt;AuthorizedContent Roles=&quot;@(new(){&quot;RRHH.Supervisor&quot;})&quot;&gt;*@
                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHProcesosSeleccionExportarProcesosSeleccion)&quot;&gt;
                    &lt;button class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3&quot;
                            @onclick='()=&gt;{DownlaodIncidencias();}'&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            download_for_offline
                        &lt;/span&gt;
                        Exportar
                    &lt;/button&gt;
                    @if (SavedProcesos.Count &gt; 0)
                    {
                        &lt;select class=&quot;w-fit p-2 rounded border border-slate-300/50&quot; @bind=&quot;SelectedWeekDescarga&quot;&gt;
                            &lt;option value=&quot;&quot;&gt;Selecciona la semana para descargar&lt;/option&gt;
                            @foreach (var v in SavedProcesos)
                            {
                                &lt;option value=&quot;@($&quot;{(v.DayOfYear -1)/7}&amp;Year={v.Year}&quot;)&quot;&gt;
                                    Semana @((v.DayOfYear - 1) / 7) de @(v.Year)
                                &lt;/option&gt;
                            }
                        &lt;/select&gt;

                        @if (!string.IsNullOrEmpty(SelectedWeekDescarga))
                        {
                            &lt;a href=&quot;@($&quot;/api/ProcesoSeleccion/ExportSaved?Password=LPSProcesoSeleccion2024&amp;week={SelectedWeekDescarga}&quot;)&quot; target=&quot;_blank&quot;
                            class=&quot;w-fit p-2 h-fit bg-blue-400 text-white&quot;&gt;
                                Descargar
                            &lt;/a&gt;
                        }
                    }
                &lt;/AuthorizedContent&gt;

            @* &lt;AuthorizedContent Roles=&quot;@(new(){&quot;Admin&quot;})&quot;&gt;
                
                    @if (SavedProcesos.Count &gt; 0)
                    {
                        &lt;select class=&quot;w-fit p-2 rounded border border-slate-300/50&quot; @bind=&quot;SelectedWeekDescarga&quot;&gt;
                            &lt;option value=&quot;&quot;&gt;Selecciona la semana para descargar&lt;/option&gt;
                            @foreach (var v in SavedProcesos)
                            {
                                &lt;option value=&quot;@($&quot;{(v.DayOfYear -1)/7}&amp;Year={v.Year}&quot;)&quot;&gt;
                                    Semana @((v.DayOfYear - 1) / 7) de @(v.Year)
                                &lt;/option&gt;
                            }
                        &lt;/select&gt;

                        @if (!string.IsNullOrEmpty(SelectedWeekDescarga))
                        {
                            &lt;a href=&quot;@($&quot;/api/ProcesoSeleccion/ExportSaved?Password=LPSProcesoSeleccion2024&amp;week={SelectedWeekDescarga}&quot;)&quot; target=&quot;_blank&quot;
                            class=&quot;w-fit p-2 h-fit bg-blue-400 text-white&quot;&gt;
                                Descargar
                            &lt;/a&gt;
                        }
                    }
                &lt;/AuthorizedContent&gt;*@
            &lt;/div&gt;
        &lt;/div&gt;
            &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
                &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                    &lt;Checkbox Checked=GetProcesosSeleccion.MisProcesos
                            ChangeCheck=&quot;@(()=&gt; {GetProcesosSeleccion.MisProcesos = !GetProcesosSeleccion.MisProcesos; LoadApi(true);})&quot;
                            Message=&quot;Mis procesos&quot;&gt;&lt;/Checkbox&gt;

                    &lt;MultiSelect T=&quot;string&quot; ZIndex=&quot;25&quot; Placeholder=&quot;Filtrar estados...&quot; Values=&quot;@([&quot;Pendiente de inicio&quot;,&quot;Fase CV&quot;,&quot;Fase entrevistas&quot;,
                &quot;Fase negociaci&oacute;n&quot;,&quot;Stand by&quot;,&quot;Finalizado&quot;])&quot; OptionValue=&quot;@((x)=&gt; x)&quot; ToString=&quot;@((x)=&gt;string.Join(&quot;, &quot;, x))&quot;
                                SelectValues=&quot;@((x)=&gt; {GetProcesosSeleccion.Estado = x; LoadApi(true);} )&quot;
                                WidthClass=&quot;w-[300px]&quot;&gt;&lt;/MultiSelect&gt;

                    &lt;MultiSelect T=&quot;string&quot; ZIndex=&quot;24&quot; Placeholder=&quot;Filtrar pa&iacute;ses...&quot; Values=&quot;@([&quot;Espa&ntilde;a&quot;, &quot;Peru&quot;, &quot;Republica Dominicana&quot;, &quot;Colombia&quot;, &quot;Alemania&quot;, &quot;Marruecos&quot;, &quot;Mauritania&quot;])&quot;
                                OptionValue=&quot;@((x)=&gt; x)&quot; ToString=&quot;@((x)=&gt;string.Join(&quot;, &quot;, x))&quot;
                                SelectValues=&quot;@((x)=&gt; {GetProcesosSeleccion.Pais = x; LoadApi(true);} )&quot;
                                WidthClass=&quot;w-[300px]&quot;&gt;&lt;/MultiSelect&gt;

                &lt;MultiSelect T=&quot;string&quot; ZIndex=&quot;24&quot; Placeholder=&quot;Filtrar categor&iacute;a...&quot; Values=&quot;@([&quot;T&eacute;cnico&quot;, &quot;Coordinador&quot;, &quot;Project manager&quot;, &quot;Gerente&quot;])&quot;
                            OptionValue=&quot;@((x)=&gt; x)&quot; ToString=&quot;@((x)=&gt;string.Join(&quot;, &quot;, x))&quot;
                            SelectValues=&quot;@((x)=&gt; {GetProcesosSeleccion.Categoria = x; LoadApi(true);} )&quot;
                            WidthClass=&quot;w-[300px]&quot;&gt;&lt;/MultiSelect&gt;

                &lt;MultiSelect T=&quot;E_User&quot; ZIndex=&quot;20&quot; Values=&quot;Usuarios.OrderBy(x=&gt; x.Name).ToList()&quot;
                            OptionValue=&quot;@((e)=&gt; $&quot;{e.Name} {e.LastName}&quot;)&quot;
                            InitialValues=&quot;Usuarios.OrderBy(x=&gt; x.Name).ToList()&quot;
                            SelectValues=&quot;@((e)=&gt;{GetProcesosSeleccion.ResponsableProceso = e.Select(c=&gt; c.Id).ToList(); LoadApi();})&quot;
                            WidthClass=&quot;w-[15.5vw]&quot;
                            ToString=&quot;@((e)=&gt; e.Count &gt; 0 ? string.Join(&quot;, &quot;, e.Select(c=&gt; $&quot;{c.Name} {c.LastName}&quot;)) : &quot;&quot;)&quot; Placeholder=&quot;Responsable del proceso...&quot;&gt;&lt;/MultiSelect&gt;

        

                    &lt;MultiSelect T=&quot;string&quot; ZIndex=&quot;24&quot; Placeholder=&quot;Filtrar departamento...&quot; Values=&quot;@([&quot;FTTH&quot;, &quot;Red movil&quot;, &quot;FFTH&quot;, &quot;Automatizaci&oacute;n&quot;, &quot;Logistica&quot;,
                &quot;Red fija&quot;, &quot;BTS&quot;, &quot;ICX&quot;, &quot;Marketing&quot;, &quot;Administraci&oacute;n de Operaciones&quot;,
                &quot;Operaciones&quot;, &quot;Administracion y Finanzas&quot;, &quot;Radio&quot;])&quot;
                                OptionValue=&quot;@((x)=&gt; x)&quot; ToString=&quot;@((x)=&gt;string.Join(&quot;, &quot;, x))&quot;
                                SelectValues=&quot;@((x)=&gt; {GetProcesosSeleccion.Departamento = x; LoadApi(true);} )&quot;
                                WidthClass=&quot;w-[300px]&quot;&gt;&lt;/MultiSelect&gt;

                    &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-3 text-sm rounded border border-slate-300&quot; @bind=&quot;        searchSet&quot;&gt;&lt;/input&gt;
                &lt;/div&gt;
            &lt;/div&gt;
    
        &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;

            @if (DataEditProcesos.Documents != null)
            {
                &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Puesto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Pa&iacute;s
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Provincia
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Vacantes
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Vacantes cubiertas
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Solicitante del proceso
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Departamento del proceso
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Responsable del proceso
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Prioridad
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Creado por
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[250px]&quot;&gt;
                                Estado
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha de inicio
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha de fin
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Mes llegada de requerimiento
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Categor&iacute;a
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Jefe inmediato
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Motivo reclutamiento
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Persona a la que reemplaza
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha de llegada
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha de reclutamiento
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[300px]&quot;&gt;
                                Comentario
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var v in DataEditProcesos.Documents)
                        {
                            &lt;tr&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    &lt;span class=&quot;text-blue-600 hover:underline cursor-pointer&quot; @onclick=&quot;() =&gt; OpenModalAddEdit(v)&quot;&gt;@v.Puesto&lt;/span&gt;
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.Pais)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.Provincia)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.Vacantes)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                @(v.VacantesCubiertasCount)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.SolicitanteProceso != null ? $&quot;{v.SolicitanteProceso.Name} {v.SolicitanteProceso.LastName}&quot; : &quot;Por definir&quot;)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.Departamento)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.ResponsableProceso != null ? $&quot;{v.ResponsableProceso.Name} {v.ResponsableProceso.LastName}&quot; : &quot;Por definir&quot;)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.Prioridad)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.CreatedByName)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    &lt;span class=&quot;p-2 rounded @(ColorEstados(v.Estados.Last())) text-white&quot;&gt;@(v.Estados.Last())&lt;/span&gt;
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.FechaInicio != null ? $&quot;{v.FechaInicio.Value.ToLocalTime().Day} de {v.FechaInicio.Value.ToLocalTime().ToString(&quot;MMMM&quot;)} de {v.FechaInicio.Value.ToLocalTime().Year}&quot; : $&quot;No hay fecha de inicio indicada&quot;)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.FechaFin != null ? $&quot;{v.FechaFin.Value.ToLocalTime().Day} de {v.FechaFin.Value.ToLocalTime().ToString(&quot;MMMM&quot;)} de {v.FechaFin.Value.ToLocalTime().Year}&quot; : $&quot;No hay fecha de fin indicada&quot;)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.MesLlegadaRequerimiento)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.Categoria)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.JefeInmediato)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.MotivoReclutamiento)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.PersonaQueReeemplaza)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.FechaLlegada != null ? $&quot;{v.FechaLlegada.Value.ToLocalTime().Day} de {v.FechaLlegada.Value.ToLocalTime().ToString(&quot;MMMM&quot;)} de {v.FechaLlegada.Value.ToLocalTime().Year}&quot; : $&quot;No hay fecha de fin indicada&quot;)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.FechaReclutamiento != null ? $&quot;{v.FechaReclutamiento.Value.ToLocalTime().Day} de {v.FechaReclutamiento.Value.ToLocalTime().ToString(&quot;MMMM&quot;)} de {v.FechaReclutamiento.Value.ToLocalTime().Year}&quot; : $&quot;No hay fecha de fin indicada&quot;)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.ComentarioExtra)
                                &lt;/td&gt;
                            &lt;/tr&gt;
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;
                &lt;Paginator countAllDocuments=&quot;(int)DataEditProcesos.CountAllDocuments&quot; countPages=&quot;DataEditProcesos.PageCount&quot; filters=&quot;GetProcesosSeleccion&quot; ReloadData=&quot;() =&gt; LoadApi()&quot;&gt;

                &lt;/Paginator&gt;
            }
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        PaginatedResult&lt;E_ProcesoSeleccion&gt; DataEditProcesos = new();
        List&lt;DateTime&gt; SavedProcesos = new();
        List&lt;E_User&gt; Usuarios = new();

        public string SelectedWeekDescarga = &quot;&quot;;
        public int YearSelected { get; set; }
        public int WeekSelected { get; set; }

        async Task DownlaodIncidencias()
        {
            _nav.NavigateTo(&quot;api/ProcesoSeleccion/Export?Password=LPSProcesoSeleccion2024&quot;, true, true);
        }

        public GetPaginatedProcesoSeleccion GetProcesosSeleccion = new()
            {
                PageNumber = 1,
                PageSize = 10,
                Search = &quot;&quot;
            };

        public string ColorEstados(string estado) =&gt; estado switch
        {
            &quot;Pendiente de inicio&quot; =&gt; &quot;bg-slate-500&quot;,
            &quot;Fase CV&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Fase entrevistas&quot; =&gt; &quot;bg-amber-500&quot;,
            &quot;Fase negociaci&oacute;n&quot; =&gt; &quot;bg-blue-700&quot;,
            &quot;Stand by&quot; =&gt; &quot;bg-slate-300&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-emerald-400&quot;,
            _ =&gt; &quot;bg-red-600&quot;
        };

        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;
        }

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;&quot;;
            try
            {
            SavedProcesos = await _mongoContext.LoadSavedListProcesosSaved();

                Usuarios = await _mongoContext.Data&lt;E_User&gt;(DatabaseIdentifiers.Main).Find(x =&gt; x.Roles.Any(c =&gt; c.Name == &quot;Recursos Humanos&quot; )).ToListAsync();

                //
                //  Usuarios = await _mongoContext.Data&lt;E_User&gt;(DatabaseIdentifiers.Main).Find(x =&gt; x.Roles.Any(c =&gt; c.Name == &quot;RRHH.Supervisor&quot; ||
                // c.Name == &quot;RRHH.Tecnico&quot;)).ToListAsync();
                    await LoadApi();
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;RRHH &gt; Contrataciones &gt; Index&quot;, &quot;OnInitializedAsync&quot;, DateTime.UtcNow);

                throw;
            }
        
        }

        string searchSet
        {
            get
            {
                return GetProcesosSeleccion.Search;
            }
            set
            {
                GetProcesosSeleccion.Search = value;

                LoadApi();
            }
        }

        async Task LoadApi(bool overridePage = false)
        {
            try
            {
            _main.IsLoading = true;

                    if (overridePage)
                    {
                        _nav.NavigateTo($&quot;{_nav.Uri.Split('?')[0]}?pageNumber=1&amp;pageSize={GetProcesosSeleccion.PageSize}&quot;);
                        GetProcesosSeleccion.PageNumber = 1;
                    }
                    else
                    {
                        var pageSize = _main.QueryParameters(_nav)[&quot;pageSize&quot;];
                        var pageNumber = _main.QueryParameters(_nav)[&quot;pageNumber&quot;];

                        if (!string.IsNullOrEmpty(pageSize) &amp;&amp; !string.IsNullOrEmpty(pageNumber))
                        {
                            GetProcesosSeleccion.PageNumber = int.Parse(pageNumber);
                            GetProcesosSeleccion.PageSize = int.Parse(pageSize);
                        }
                    }

                    DataEditProcesos = await _mongoContext.GetPaginatedProcesoSeleccion(_mongoUsers, GetProcesosSeleccion);

                    await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;RRHH &gt; Contrataciones &gt; Index&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
            }
        

        }

        // Modal AddEdit

        bool IsSaved = false;

        public E_ProcesoSeleccion addedit = new E_ProcesoSeleccion()
            {
                Comentarios = new(),
                Entrevistas = new(),
                VacantesCubiertas = new()
            };

        async Task OpenModalAddEdit(E_ProcesoSeleccion edit = null)
        {
            if (edit != null)
            {
                addedit = edit;
            }
            else
            {
                addedit = new();
            }


            var modal = _modal.ShowModal(typeof(AddEditProcesoSeleccion), new Dictionary&lt;string, object&gt;(){
                {nameof(AddEditProcesoSeleccion.addedit), addedit},
            }, FixedWidth: 80);

            modal.OnCloseModal += ResponseModalAddEdit;
        }

        async void ResponseModalAddEdit(bool success)
        {
            await LoadApi();

            addedit = new E_ProcesoSeleccion()
                {
                    Comentarios = new(),
                    Entrevistas = new(),
                    VacantesCubiertas = new()
                };
            await _localStorage.RemoveItemAsync(&quot;procesoseleccionadd&quot;);
            IsSaved = false;
        }

    }
    `
  },  
  {
    "ID": 6,
    "ServicesName": "IndexAprobaciones",
    "ServicesRoute": "Components/RRHHF/Contrataciones/IndexAprobaciones",
    "ServicesDescription":`
    `,
    "Code": `
    @page &quot;/aprobaciones&quot;
    @using LPSGrupo.Components.Areas.RRHHF.Contrataciones.Modals

    &lt;AuthorizePage Roles=&quot;@(new(){&quot;RRHH.Supervisor&quot;, &quot;RRHH.Tecnico&quot;, &quot;RRHH.Aprobador&quot;})&quot;&gt;&lt;/AuthorizePage&gt;

    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        &lt;h1 class=&quot; w-full text-3xl text-blue-400&quot; tabindex=&quot;none&quot;&gt;Aprobaciones&lt;/h1&gt;
        &lt;h2 class=&quot;w-full text-xl text-slate-950&quot;&gt;Aqu&iacute; se pueden ver todos los entrevistados que han pasado a la fase de aprobaci&oacute;n&lt;/h2&gt;

        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-3 text-sm rounded border border-slate-300&quot; @bind=&quot;searchSet&quot;&gt;&lt;/input&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;
            @if (DataAprobaciones.Documents != null)
            {
                &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Puesto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Nombre
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Apellidos
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Salario
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Estado
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Acciones
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var v in DataAprobaciones.Documents)
                        {
                            &lt;tr&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    &lt;span class=&quot;text-blue-600 hover:underline cursor-pointer&quot; @onclick=&quot;()=&gt; OpenModalAddEdit(v)&quot;&gt;@v.Puesto&lt;/span&gt;
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.Nombre)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.Apellidos)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.Salario)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.Aprobaciones.Any(c =&gt; c.AprobacionInstantanea &amp;&amp; c.Estado == &quot;Aprobado&quot;) || !v.Aprobaciones.Any(c =&gt; c.Estado != &quot;Aprobado&quot;))
                                    {
                                        &lt;span class=&quot;p-2 rounded bg-emerald-400 text-white&quot;&gt;Contratado&lt;/span&gt;
                                    }
                                    else if (v.Aprobaciones.Any(c =&gt; c.AprobacionInstantanea &amp;&amp; c.Estado == &quot;Rechazado&quot;) || !v.Aprobaciones.Any(c =&gt; c.Estado != &quot;Rechazado&quot;))
                                    {
                                        &lt;span class=&quot;p-2 rounded bg-slate-950 text-white&quot;&gt;Finalizado&lt;/span&gt;
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;p-2 rounded bg-amber-400 text-white&quot;&gt;Pendiente de aprobar&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @*&lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsProcesoSeleccion.EditProcesoSeleccion)&quot;&gt;*@
                                    &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHAprobacionesEliminarAprobacion)&quot;&gt;

                                        &lt;button type=&quot;button&quot; class=&quot;p-2 rounded bg-red-600 text-white flex flex-wrap items-center gap-3&quot; @onclick=&quot;() =&gt; DeleteAprobacion(v.Id)&quot;&gt;
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                delete
                                            &lt;/span&gt;
                                        &lt;/button&gt;
                                    &lt;/AuthorizedContent&gt;
                                &lt;/td&gt;
                            &lt;/tr&gt;
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;
                &lt;Paginator countAllDocuments=&quot;(int)DataAprobaciones.CountAllDocuments&quot; countPages=&quot;DataAprobaciones.PageCount&quot; filters=&quot;GetAprobaciones&quot; ReloadData=&quot;()=&gt;LoadApi()&quot;&gt;

                &lt;/Paginator&gt;
            }
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        public PaginatedResult&lt;E_Aprobaciones&gt; DataAprobaciones = new();

        public GetPaginatedAprobacionesDTORequest GetAprobaciones = new()
            {
                PageNumber = 1,
                PageSize = 10,
                Search = &quot;&quot;
            };

        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;

            if (await _localStorage.ContainKeyAsync(&quot;aprobacionesadd&quot;))
            {
                addeditAprobaciones = await _localStorage.GetItemAsync&lt;E_Aprobaciones&gt;(&quot;aprobacionesadd&quot;);
                await _localStorage.RemoveItemAsync(&quot;aprobacionesadd&quot;);
                IsSaved = true;
                await OpenModalAddEdit(addeditAprobaciones);
                await InvokeAsync(StateHasChanged);
                return;
            };
        }

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;&quot;;
            await LoadApi();
        }

        string searchSet
        {
            get
            {
                return GetAprobaciones.Search;
            }
            set
            {
                GetAprobaciones.Search = value;

                LoadApi();
            }
        }

        async Task LoadApi()
        {
            try
            {
                _main.IsLoading = true;

                var pageSize = _main.QueryParameters(_nav)[&quot;pageSize&quot;];
                var pageNumber = _main.QueryParameters(_nav)[&quot;pageNumber&quot;];

                if (!string.IsNullOrEmpty(pageSize) &amp;&amp; !string.IsNullOrEmpty(pageNumber))
                {
                    GetAprobaciones.PageNumber = int.Parse(pageNumber);
                    GetAprobaciones.PageSize = int.Parse(pageSize);
                }

                DataAprobaciones = await _mongoContext.GetPaginatedAprobaciones(GetAprobaciones);
                await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {

                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;IndexAprobaciones&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
            }

        }

        async Task DeleteAprobacion(string id)
        {
            try
            {
                await _mongoContext.Data&lt;E_Aprobaciones&gt;(DatabaseIdentifiers.Contrataciones).DeleteOneAsync(Builders&lt;E_Aprobaciones&gt;.Filter.Where(x =&gt; x.Id == id));
                await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {

                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;IndexAprobaciones&quot;, &quot;DeleteAprobacion&quot;, DateTime.UtcNow);

                throw;
            }

        }

        // Modal AddEdit

        bool IsSaved = false;

        public E_Aprobaciones addeditAprobaciones = new E_Aprobaciones()
            {
                Comentarios = new(),
                Horario = &quot;Lunes a jueves 09:00 a 18:00; viernes 08:00 a 15:00&quot;,
                Incorporacion = DateTime.Now,
                Aprobaciones = new(),
            };


        async Task OpenModalAddEdit(E_Aprobaciones edit)
        {
            //En caso de error de permisos eliminar este if 
            if (_user.Permissions.Contains(Security.Permisos.PermissionConstantsRRHH.RRHHAprobacionesVerAprobacion))
            {

                if (edit != null)
                {
                    addeditAprobaciones = edit;
                }
                await _localStorage.RemoveItemAsync(&quot;aprobacionesadd&quot;);
                var modal = _modal.ShowModal(typeof(AddEditAprobaciones), new Dictionary&lt;string, object&gt;
                {
                    {nameof(AddEditAprobaciones.addeditAprobaciones), addeditAprobaciones},
                    {nameof(AddEditAprobaciones.Saved), false},
                }, FixedWidth: 80);

                modal.OnCloseModal += ResponseModalAddEdit;
            }
            else
            {
                _snackbar.InsertSnackbar(new(&quot;No estas autorizado&quot;, &quot;cancel&quot;, 6000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                return;
            }
        }

        async void ResponseModalAddEdit(bool success)
        {
            if (success)
            {
            await LoadApi();
            }

            addeditAprobaciones = new E_Aprobaciones()
                {
                    Comentarios = new(),
                    Horario = &quot;Lunes a jueves 09:00 a 18:00; viernes 08:00 a 15:00&quot;,
                    Incorporacion = DateTime.Now,
                    Aprobaciones = new(),
                };
            await _localStorage.RemoveItemAsync(&quot;aprobacionesadd&quot;);
            IsSaved = false;
        }
    }
    `
  },
  {
    "ID": 7,
    "ServicesName": "IndexUsuariosRRHH",
    "ServicesRoute": "Components/RRHHF/Contrataciones/IndexUsuariosRRHH",
    "ServicesDescription":`
    `,
    "Code": `
    @page &quot;/procesoseleccion/usuarios&quot;
    @using LPSGrupo.Components.Areas.RRHHF.Contrataciones.Modals


    &lt;AuthorizePage Roles=&quot;@(new(){&quot;RRHH.Supervisor&quot;, &quot;RRHH.Tecnico&quot;})&quot;&gt;&lt;/AuthorizePage&gt;

    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        &lt;h1 class=&quot; w-full text-3xl text-blue-400&quot; tabindex=&quot;none&quot;&gt;Candidatos&lt;/h1&gt;
        &lt;h2 class=&quot;w-full text-xl text-slate-950&quot;&gt;Aqu&iacute; se pueden ver todos los candidatos registrados para usar en los procesos de selecci&oacute;n&lt;/h2&gt;

        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsProcesoSeleccion.AddProcesoSeleccion)&quot;&gt;
                    &lt;button type=&quot;button&quot; class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3&quot; @onclick=&quot;() =&gt; {IsSaved=false; OpenModalAddEdit();}&quot;&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            manage_accounts
                        &lt;/span&gt;
                        A&ntilde;adir candidato
                    &lt;/button&gt;
                &lt;/AuthorizedContent&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;MultiSelect T=&quot;string&quot; ZIndex=&quot;25&quot; Values=&quot;filterPuestos.OrderBy(x=&gt; x).ToList()&quot; OptionValue=&quot;@((x)=&gt; x)&quot; Placeholder=&quot;Filtrar puestos&quot;
                            ToString=&quot;@((x)=&gt; string.Join(&quot;, &quot;, x))&quot; WidthClass=&quot;w-[350px]&quot; SelectValues=&quot;@((x)=&gt; {SelectedPuestos = x;
                            UsersTable = DataEditUsers.Documents.Where(c=&gt; SelectedPuestos.Count &gt; 0 ? SelectedPuestos.Contains(c.PuestoPreferente) : true).ToList();})&quot;&gt;
                &lt;/MultiSelect&gt;

                &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-3 text-sm rounded border border-slate-300&quot; @bind=&quot;        searchSet&quot;&gt;&lt;/input&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;
            @if (DataEditUsers.Documents != null)
            {
                &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Nombre
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Pa&iacute;s
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Localidad
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Puesto al que aspira
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Puesto preferente
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Tel&eacute;fono
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Acciones
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        &lt;Virtualize Context=&quot;v&quot; Items=&quot;UsersTable&quot;&gt;
                            &lt;tr&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    &lt;span class=&quot;text-blue-600 hover:underline cursor-pointer&quot;
                                        @onclick=&quot;() =&gt; OpenModalAddEdit(v)&quot;&gt;@($&quot;{v.NombreEntrevistado} {v.ApellidoEntrevistado}&quot;)&lt;/span&gt;
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.Pais)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.Localidad)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.PuestoAlQueAspira)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.PuestoPreferente)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.TelefonoEntrevistado)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-3 text-sm border border-slate-300/50&quot;&gt;
                                    &lt;span class=&quot;rounded p-2 bg-red-600 text-white cursor-pointer&quot; @onclick=&quot;()=&gt;OpenModalConfirmacion(v.Id)&quot;&gt;Eliminar usuario&lt;/span&gt;
                                &lt;/td&gt;
                            &lt;/tr&gt;
                        &lt;/Virtualize&gt;
                    &lt;/tbody&gt;
                &lt;/table&gt;

                &lt;Paginator countAllDocuments=&quot;(int)DataEditUsers.CountAllDocuments&quot; countPages=&quot;DataEditUsers.PageCount&quot; filters=&quot;GetUsers&quot; ReloadData=&quot;()=&gt;LoadApi()&quot;&gt;&lt;/Paginator&gt;
            }
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;style&gt;
        * {
            transition: none;
        }
    &lt;/style&gt;

    @code {


        PaginatedResult&lt;E_UsuariosRRHH&gt; DataEditUsers = new();

        List&lt;E_UsuariosRRHH&gt; UsersTable = new();
        List&lt;string&gt; SelectedPuestos = new();

        List&lt;string&gt; filterPuestos { get; set; } = new();

        public FiltersBase GetUsers = new()
            {
                PageNumber = 1,
                PageSize = 10,
                Search = &quot;&quot;
            };

        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;

            if (await _localStorage.ContainKeyAsync(&quot;usuariosRRHHadd&quot;))
            {
                addedit = await _localStorage.GetItemAsync&lt;E_UsuariosRRHH&gt;(&quot;usuariosRRHHadd&quot;);
                await _localStorage.RemoveItemAsync(&quot;usuariosRRHHadd&quot;);
                IsSaved = true;
                OpenModalAddEdit(addedit);
                await InvokeAsync(StateHasChanged);
                return;
            };
        }

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;&quot;;
            await LoadApi();

            if (!string.IsNullOrEmpty(_main.QueryParameters(_nav)[&quot;add&quot;]))
            {
                if (_main.QueryParameters(_nav)[&quot;add&quot;] == &quot;true&quot;)
                {
                    OpenModalAddEdit();
                };
            }
        }

        string searchSet
        {
            get
            {
                return GetUsers.Search;
            }
            set
            {
                GetUsers.Search = value;

                LoadApi();
            }
        }

        async Task LoadApi()
        {
            try
            {
                _main.IsLoading = true;
                        var pageSize = _main.QueryParameters(_nav)[&quot;pageSize&quot;];
                        var pageNumber = _main.QueryParameters(_nav)[&quot;pageNumber&quot;];

                        if (!string.IsNullOrEmpty(pageSize) &amp;&amp; !string.IsNullOrEmpty(pageNumber))
                        {
                            GetUsers.PageNumber = int.Parse(pageNumber);
                            GetUsers.PageSize = int.Parse(pageSize);
                        }

                        DataEditUsers = await _mongoContext.GetPaginatedUsuariosRRHH(GetUsers);

                        filterPuestos = DataEditUsers.Documents.GroupBy(x =&gt; x.PuestoPreferente).Select(x =&gt; x.Key).ToList();

                        UsersTable = DataEditUsers.Documents;

            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;IndexUsuariosRRHH&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                await InvokeAsync(StateHasChanged);
                _main.IsLoading = false;
            }
            
            
        }

        // Modal Confirmacion

        string idDelete = &quot;&quot;;

        async Task OpenModalConfirmacion(string id)
        {
            idDelete = id;
            await _localStorage.RemoveItemAsync(&quot;usuariosRRHHadd&quot;);
            var modal = _modal.ShowModal(typeof(ConfirmationModal), new Dictionary&lt;string, object&gt;()
            {
                {nameof(ConfirmationModal.Message), &quot;&iquest;Eliminar este usuario?&quot;},
                {nameof(ConfirmationModal.Title), &quot;Eliminar usuario&quot;},
            }, FixedWidth: 50);

            modal.OnCloseModal += HandleModalConfirmation;
        }

        async void HandleModalConfirmation(bool success)
        {
            try
            {
                _main.IsLoading = true;

                        if (success)
                        {
                            await _mongoContext.Data&lt;E_UsuariosRRHH&gt;(DatabaseIdentifiers.Contrataciones)
                            .DeleteOneAsync(Builders&lt;E_UsuariosRRHH&gt;.Filter.Where(x =&gt; x.Id == idDelete));
                        }

                        await LoadApi();
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;IndexUsuariosRRHH&quot;, &quot;HandleModalConfirmation&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {	
                _main.IsLoading = false;
            }
            

        
        }

        // Modal AddEdit
        bool IsSaved = false;
        public E_UsuariosRRHH addedit = new E_UsuariosRRHH()
        {

        };


        void OpenModalAddEdit(E_UsuariosRRHH edit = null)
        {
            if (edit != null)
            {
                addedit = edit;
            }

            var modal = _modal.ShowModal(typeof(AddEditUsuariosRRHH), new Dictionary&lt;string, object&gt;
            {
                {nameof(AddEditUsuariosRRHH.addedit), addedit},
                {nameof(AddEditUsuariosRRHH.Saved), IsSaved},
            }, FixedWidth: 80);

            modal.OnCloseModal += ResponseModalAddEdit;
        }

        async void ResponseModalAddEdit(bool success)
        {
            if (success)
            {
                await LoadApi();
            }

            addedit = new E_UsuariosRRHH()
            {
            };
            await _localStorage.RemoveItemAsync(&quot;usuariosRRHHadd&quot;);
            IsSaved = false;
        }
    }
    `
  },
  {
    "ID": 8,
    "ServicesName": "P_DashboardSemanal",
    "ServicesRoute": "Components/RRHHF/Contrataciones/P_DashboardSemanal",
    "ServicesDescription":`
    `,
    "Code": `
    @page &quot;/procesoseleccion/dashboardsemanal&quot;
    &lt;div class=&quot;w-full h-fit flex flex-wrap items-center gap-3 p-4&quot;&gt;
        &lt;span class=&quot;text-blue-400 text-2xl font-bold w-full&quot;&gt;Dashboard de datos semanales&lt;/span&gt;

        &lt;MultiSelect T=&quot;string&quot; ZIndex=&quot;25&quot; Placeholder=&quot;Pa&iacute;ses&quot; WidthClass=&quot;w-[300px]&quot;
        Values=&quot;@([&quot;Espa&ntilde;a&quot;, &quot;Peru&quot;, &quot;RD&quot;, &quot;Colombia&quot;, &quot;Alemania&quot;, &quot;Marruecos&quot;, &quot;Mauritania&quot;])&quot;
        InitialValues=&quot;Paises&quot;
        ToString=&quot;@((c)=&gt; string.Join(&quot;, &quot;, c))&quot; OptionValue=&quot;@((c)=&gt; c)&quot;
        SelectValues=&quot;@((c)=&gt; {Paises = c; InvokeAsync(StateHasChanged); LoadApi();})&quot;&gt;

        &lt;/MultiSelect&gt;

        &lt;label class=&quot;ml-6&quot;&gt;Semana:&lt;/label&gt;
        &lt;InputNumber @bind-Value=&quot;week&quot; class=&quot;w-fit h-fit p-2 rounded border border-slate-300/50&quot; placeholder=&quot;Semana...&quot; min=&quot;1&quot;&gt;&lt;/InputNumber&gt;
        &lt;label class=&quot;ml-6&quot;&gt;A&ntilde;o:&lt;/label&gt;
        &lt;InputNumber @bind-Value=&quot;year&quot; class=&quot;w-fit h-fit p-2 rounded border border-slate-300/50&quot; placeholder=&quot;A&ntilde;o...&quot; min=&quot;2024&quot;&gt;&lt;/InputNumber&gt;

    &lt;/div&gt;

    &lt;div class=&quot;w-fit h-fit flex flex-row overflow-x-auto p-4 gap-12&quot;&gt;
        @if (Data != null)
        {
            @foreach (var v in Data.Where(x =&gt; x.Procesos.Count &gt; 0))
            {
                &lt;div class=&quot;w-[50dvw] h-fit flex flex-wrap&quot;&gt;
                    &lt;span class=&quot;w-full text-blue-400 text-lg font-bold&quot;&gt;@($&quot;{v.RRHHUser.Name} {v.RRHHUser.LastName}&quot;)&lt;/span&gt;

                    &lt;table class=&quot;w-full h-fit table-auto border border-collapse border-slate-300/50&quot;&gt;
                        &lt;thead&gt;
                            &lt;tr&gt;
                                &lt;th class=&quot;p-2 min-w-[150px] border border-slate-300/50&quot;&gt;
                                    Estado
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 min-w-[150px] border border-slate-300/50&quot;&gt;
                                    Vacantes
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 min-w-[150px] border border-slate-300/50&quot;&gt;
                                    Vacantes cubiertas
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 min-w-[150px] border border-slate-300/50&quot;&gt;
                                    Suma de tiempo
                                &lt;/th&gt;
                            &lt;/tr&gt;
                        &lt;/thead&gt;
                        &lt;tbody&gt;
                            @{
                                var estados = v.Procesos.GroupBy(x =&gt; x.Proceso.Estados.Last()).Select(x =&gt; x.Key).ToList();
                            }

                            @foreach (var z in estados.OrderBy(x =&gt; x))
                            {
                                &lt;tr class=&quot;bg-purple-400&quot;&gt;
                                    &lt;td class=&quot;p-2 text-white border border-slate-300/50&quot;&gt;@(z)&lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-white border border-slate-300/50&quot;&gt;@(v.Procesos.Where(x =&gt; x.Proceso.Estados.Last() == z).Sum(x =&gt; x.Proceso.Vacantes))&lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-white border border-slate-300/50&quot;&gt;@(v.Procesos.Where(x =&gt; x.Proceso.Estados.Last() == z).Sum(x =&gt; x.Proceso.VacantesCubiertas.Count(c =&gt; c.Value == &quot;Contratado&quot;)))&lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-white border border-slate-300/50&quot;&gt;
                                        @(v.Procesos.Where(x =&gt; x.Proceso.Estados.Last() == z &amp;&amp; x.Proceso.FechaFin != null &amp;&amp; x.Proceso.FechaInicio != null)
                                                    .Sum(c =&gt; (c.Proceso.FechaFin - c.Proceso.FechaInicio).Value.TotalDays))
                                    &lt;/td&gt;
                                &lt;/tr&gt;

                                @foreach (var y in v.Procesos.Where(c =&gt; c.Proceso.Estados.Last() == z))
                                {
                                    &lt;tr class=&quot;&quot;&gt;
                                        &lt;td class=&quot;p-2 border border-slate-300/50&quot;&gt;@(y.Proceso.Puesto)&lt;/td&gt;
                                        &lt;td class=&quot;p-2 border border-slate-300/50&quot;&gt;@(y.Proceso.Vacantes)&lt;/td&gt;
                                        &lt;td class=&quot;p-2 border border-slate-300/50&quot;&gt;@(y.Proceso.VacantesCubiertas.Count(c =&gt; c.Value == &quot;Contratado&quot;))&lt;/td&gt;
                                        &lt;td class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                            @if (y.Proceso.FechaFin != null &amp;&amp; y.Proceso.FechaInicio != null)
                                            {
                                                @((y.Proceso.FechaFin - y.Proceso.FechaInicio).Value.TotalDays)
                                            }
                                            else
                                            {
                                                &lt;span&gt;Falta alguna fecha&lt;/span&gt;
                                            }
                                        &lt;/td&gt;
                                    &lt;/tr&gt;
                                }
                            }
                        &lt;/tbody&gt;
                    &lt;/table&gt;
                &lt;/div&gt;
            }
        }
    &lt;/div&gt;

    @code {
        private int getweek { get; set; } = ((DateTime.Now.AddDays(-7).DayOfYear) - 1) / 7;

        public int week
        {
            get
            {
                return getweek;
            }
            set
            {
                getweek = value;
                LoadApi();
            }
        }

        private int getyear { get; set; } = DateTime.Now.Year;
        public int year
        {
            get
            {
                return getyear;
            }
            set
            {
                getyear = value;
                LoadApi();
            }
        }

        public List&lt;string&gt; Paises = [&quot;Espa&ntilde;a&quot;, &quot;Peru&quot;, &quot;RD&quot;, &quot;Colombia&quot;, &quot;Alemania&quot;, &quot;Marruecos&quot;, &quot;Mauritania&quot;];

        public List&lt;DashboardSemanal&gt; Data = null;

        protected override async Task OnInitializedAsync()
        {
            await LoadApi();
        }

        public async Task LoadApi()
        {
            try
            {
                _main.IsLoading = true;
                await Task.Delay(100);
                Data = await _mongoContext.GetDashboardSemanal(_mongoUsers, week, year, Paises);
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;P_DashboardSemanal&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);
                throw;
            }
            finally
            {
                await  InvokeAsync(StateHasChanged);
                _main.IsLoading = false;
            }
        }
    }
    `
  },
  {
    "ID": 10,
    "ServicesName":"AddEvaluacion",
    "ServicesRoute": "Components/RRHHF/EvaluacionesDesempeno/Modals/AddEvaluacion",
    "ServicesDescription":"",
    "Code": `
    &lt;form class=&quot;relative w-full grid grid-cols-12 h-fit p-2 gap-3&quot; @onsubmit=&quot;SaveAsync&quot;&gt;
        &lt;div class=&quot;col-span-12 text-blue-400 font-bold p-2&quot;&gt;
            @(&quot;A&ntilde;adir evaluaci&oacute;n&quot;)
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Nombre trabajador&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot;
                @bind=&quot;            data.NombreTrabajador&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Email trabajador&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;data.EmailTrabajador&quot;
                required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Puesto de trabajo&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot;
                @bind=&quot;            data.PuestoTrabajo&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Nombre evaluador&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            data.Evaluador&quot;
                required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Email evaluador&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot;
                @bind=&quot;            data.EmailEvaluador&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Departamento&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 border border-slate-300/50 shadow-md&quot; @bind=&quot;            data.Departamento&quot;
                required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 flex flex-wrap justify-end items-end p-2 gap-3&quot;&gt;
            &lt;button type=&quot;button&quot; class=&quot;col-span-1 w-fit h-fit p-2 bg-red-600 text-white rounded flex flex-wrap gap-3&quot;
                @onclick=&quot;@(() =&gt; Close(false))&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                    cancel
                &lt;/span&gt;
                Cancelar
            &lt;/button&gt;
            &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsProcesoSeleccion.EditProcesoSeleccion)&quot;&gt;
                &lt;button type=&quot;submit&quot;
                    class=&quot;col-span-1 w-fit h-fit p-2 bg-teal-600 text-white rounded flex flex-wrap gap-3&quot;&gt;
                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                        save
                    &lt;/span&gt;
                    Guardar
                &lt;/button&gt;
            &lt;/AuthorizedContent&gt;
        &lt;/div&gt;
    &lt;/form&gt;

    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }

        E_DatosEvaluacion data = new();

        async Task SaveAsync()
        {
            try
            {
            _main.IsLoading = true;
                    E_EvaluacionDesempeno dataAdd = new();

                    dataAdd.DatosEvaluacion = data;

                    await _mongoContext.AddEvaluacionDesemepeno(dataAdd);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;AddEvaluacion&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

                throw; 
            }
            finally
            {
                _main.IsLoading = false;
                Close(true);
            }
        }
    }
    `
  },
    {
    "ID": 11,
    "ServicesName":"Formulary",
    "ServicesRoute": "Components/RRHHF/EvaluacionesDesempeno/Formulary",
    "ServicesDescription":"",
    "Code": `
    @page &quot;/Evaluacion/{id}&quot;
    &lt;AuthorizePage&gt;&lt;/AuthorizePage&gt;

    &lt;div
    class=&quot;fixed z-[1000000000000000] top-0 right-0 w-full h-full overflow-y-auto flex flex-wrap justify-center bg-white&quot;&gt;
        &lt;form class=&quot;w-[60%] h-fit mt-6 p-4 gap-3 flex flex-col rounded shadow-md&quot; @onsubmit=&quot;SendAsync&quot;&gt;
            @if (data != null)
            {
                &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
                    &lt;img class=&quot;w-[100px] ml-4&quot; src=&quot;../Images/Base/logoMulticolorAjustado.png&quot; /&gt;

                    &lt;div class=&quot;text-xl mr-4&quot;&gt;Evaluaci&oacute;n de desempe&ntilde;o&lt;/div&gt;
                &lt;/div&gt;

                &lt;div class=&quot;w-full flex flex-col mt-12 gap-3&quot;&gt;
                    &lt;div class=&quot;w-full flex flex-wrap items-center gap-3&quot;&gt;
                        &lt;label class=&quot;text-xl&quot;&gt;Nombre trabajador: &lt;/label&gt; &lt;input type=&quot;text&quot;
                        class=&quot;p-2 w-[300px] rounded border border-slate-300/50&quot;
                        @bind-value=&quot;data.DatosEvaluacion.NombreTrabajador&quot; required readonly /&gt;
                    &lt;/div&gt;

                    &lt;div class=&quot;w-full flex flex-wrap items-center gap-3&quot;&gt;
                        &lt;label class=&quot;text-xl&quot;&gt;Nombre trabajador: &lt;/label&gt; &lt;input type=&quot;email&quot;
                        class=&quot;p-2 w-[300px] rounded border border-slate-300/50&quot;
                        @bind-value=&quot;data.DatosEvaluacion.EmailTrabajador&quot; required readonly /&gt;
                    &lt;/div&gt;

                    &lt;div class=&quot;w-full flex flex-wrap items-center gap-3&quot;&gt;
                        &lt;label class=&quot;text-xl&quot;&gt;Puesto de trabajo: &lt;/label&gt; &lt;input type=&quot;text&quot;
                        class=&quot;p-2 w-[300px] rounded border border-slate-300/50&quot;
                        @bind-value=&quot;data.DatosEvaluacion.PuestoTrabajo&quot; required /&gt;
                    &lt;/div&gt;

                    &lt;div class=&quot;w-full flex flex-wrap items-center gap-3&quot;&gt;
                        &lt;label class=&quot;text-xl&quot;&gt;Evaluador: &lt;/label&gt; &lt;input type=&quot;text&quot;
                        class=&quot;p-2 w-[300px] rounded border border-slate-300/50&quot; readonly
                        @bind-value=&quot;data.DatosEvaluacion.Evaluador&quot; required /&gt;
                    &lt;/div&gt;

                    &lt;div class=&quot;w-full flex flex-wrap items-center gap-3&quot;&gt;
                        &lt;label class=&quot;text-xl&quot;&gt;Departamento: &lt;/label&gt; &lt;input type=&quot;text&quot;
                        class=&quot;p-2 w-[300px] rounded border border-slate-300/50&quot;
                        @bind-value=&quot;data.DatosEvaluacion.Departamento&quot; required readonly /&gt;
                    &lt;/div&gt;
                &lt;/div&gt;

                &lt;div class=&quot;w-full text-2xl font-bold mt-12 mb-2&quot;&gt;
                    Instrucciones
                &lt;/div&gt;

                &lt;div class=&quot;w-full text-lg&quot;&gt;
                    La serie de preguntas que se realizan a continuaci&oacute;n presentan una escala del 1 al 5, de acuerdo al grado de
                    aprobaci&oacute;n o desaprobaci&oacute;n de cada afirmaci&oacute;n
                &lt;/div&gt;

                &lt;div class=&quot;w-full text-lg mt-6&quot;&gt;
                    NA. No aplica en su puesto
                    &lt;br /&gt;
                    1. Nunca
                    &lt;br /&gt;
                    2. No, casi nunca
                    &lt;br /&gt;
                    3. En algunas ocasiones
                    &lt;br /&gt;
                    4. Si, normalmente
                    &lt;br /&gt;
                    5. Si, siempre
                &lt;/div&gt;

                @foreach (var category in data.Preguntas.GroupBy(x =&gt; x.Categoria))
                {
                    &lt;div class=&quot;w-full text-2xl font-bold mt-12 mb-6&quot;&gt;
                        @category.Key
                    &lt;/div&gt;

                    @foreach (var v in data.Preguntas.Where(x =&gt; x.Categoria == category.Key).OrderBy(x =&gt; x.Index))
                    {
                        &lt;div class=&quot;w-full h-fit flex flex-col&quot;&gt;
                            &lt;div class=&quot;w-full text-base font-bold&quot;&gt;@(v.Index). @(v.Pregunta)&lt;/div&gt;


                            &lt;div class=&quot;w-full flex flex-wrap gap-3&quot;&gt;
                                &lt;div class=&quot;w-fit h-fit p-2 gap-1 flex flex-col justify-center cursor-pointer&quot;
                                @onclick=&quot;()=&gt;v.Value = -1&quot;&gt;
                                    &lt;div class=&quot;&quot;&gt;
                                        @if (v.Value == -1)
                                        {
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                radio_button_checked
                                            &lt;/span&gt;
                                        }
                                        else
                                        {
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                radio_button_unchecked
                                            &lt;/span&gt;
                                        }
                                    &lt;/div&gt;
                                    &lt;div class=&quot;text-center&quot;&gt;
                                        NA
                                    &lt;/div&gt;
                                &lt;/div&gt;

                                &lt;div class=&quot;w-fit h-fit p-2 gap-1 flex flex-col justify-center cursor-pointer&quot;
                                @onclick=&quot;()=&gt;v.Value = 1&quot;&gt;
                                    &lt;div class=&quot;&quot;&gt;
                                        @if (v.Value == 1)
                                        {
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                radio_button_checked
                                            &lt;/span&gt;
                                        }
                                        else
                                        {
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                radio_button_unchecked
                                            &lt;/span&gt;
                                        }
                                    &lt;/div&gt;
                                    &lt;div class=&quot;text-center&quot;&gt;
                                        1
                                    &lt;/div&gt;
                                &lt;/div&gt;

                                &lt;div class=&quot;w-fit h-fit p-2 gap-1 flex flex-col justify-center cursor-pointer&quot;
                                @onclick=&quot;()=&gt;v.Value = 2&quot;&gt;
                                    &lt;div class=&quot;&quot;&gt;
                                        @if (v.Value == 2)
                                        {
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                radio_button_checked
                                            &lt;/span&gt;
                                        }
                                        else
                                        {
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                radio_button_unchecked
                                            &lt;/span&gt;
                                        }
                                    &lt;/div&gt;
                                    &lt;div class=&quot;text-center&quot;&gt;
                                        2
                                    &lt;/div&gt;
                                &lt;/div&gt;

                                &lt;div class=&quot;w-fit h-fit p-2 gap-1 flex flex-col justify-center cursor-pointer&quot;
                                @onclick=&quot;()=&gt;v.Value = 3&quot;&gt;
                                    &lt;div class=&quot;&quot;&gt;
                                        @if (v.Value == 3)
                                        {
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                radio_button_checked
                                            &lt;/span&gt;
                                        }
                                        else
                                        {
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                radio_button_unchecked
                                            &lt;/span&gt;
                                        }
                                    &lt;/div&gt;
                                    &lt;div class=&quot;text-center&quot;&gt;
                                        3
                                    &lt;/div&gt;
                                &lt;/div&gt;

                                &lt;div class=&quot;w-fit h-fit p-2 gap-1 flex flex-col justify-center cursor-pointer&quot;
                                @onclick=&quot;()=&gt;v.Value = 4&quot;&gt;
                                    &lt;div class=&quot;&quot;&gt;
                                        @if (v.Value == 4)
                                        {
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                radio_button_checked
                                            &lt;/span&gt;
                                        }
                                        else
                                        {
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                radio_button_unchecked
                                            &lt;/span&gt;
                                        }
                                    &lt;/div&gt;
                                    &lt;div class=&quot;text-center&quot;&gt;
                                        4
                                    &lt;/div&gt;
                                &lt;/div&gt;

                                &lt;div class=&quot;w-fit h-fit p-2 gap-1 flex flex-col justify-center cursor-pointer&quot;
                                @onclick=&quot;()=&gt;v.Value = 5&quot;&gt;
                                    &lt;div class=&quot;&quot;&gt;
                                        @if (v.Value == 5)
                                        {
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                radio_button_checked
                                            &lt;/span&gt;
                                        }
                                        else
                                        {
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                radio_button_unchecked
                                            &lt;/span&gt;
                                        }
                                    &lt;/div&gt;
                                    &lt;div class=&quot;text-center&quot;&gt;
                                        5
                                    &lt;/div&gt;
                                &lt;/div&gt;

                            &lt;/div&gt;
                        &lt;/div&gt;
                    }
                }

                &lt;div class=&quot;w-full text-2xl font-bold mt-12 mb-6&quot;&gt;
                    Evaluaci&oacute;n final
                &lt;/div&gt;

                &lt;div class=&quot;w-full flex flex-col font-bold text-lg my-4 gap-3&quot;&gt;
                    Aspectos destacables

                    &lt;textarea class=&quot;w-full min-h-[150px] rounded border border-slate-300/50&quot; @bind=&quot;data.AspectosDestacables&quot;
                    required&gt;&lt;/textarea&gt;
                &lt;/div&gt;

                &lt;div class=&quot;w-full flex flex-col font-bold text-lg my-4 gap-3&quot;&gt;
                    Puntos de mejora

                    &lt;textarea class=&quot;w-full min-h-[150px] rounded border border-slate-300/50&quot; @bind=&quot;data.PuntosDeMejora&quot;
                    required&gt;&lt;/textarea&gt;
                &lt;/div&gt;

                &lt;div class=&quot;w-full flex flex-col font-bold text-lg my-4 gap-3&quot;&gt;
                    Evoluci&oacute;n en el &uacute;ltimo a&ntilde;o

                    &lt;textarea class=&quot;w-full min-h-[150px] rounded border border-slate-300/50&quot; @bind=&quot;data.EvolucionUltimoA&ntilde;o&quot;
                    required&gt;&lt;/textarea&gt;
                &lt;/div&gt;

                &lt;div class=&quot;w-full text-2xl font-bold mt-12 mb-6&quot;&gt;
                    Propuesta de cambio de puesto
                &lt;/div&gt;

                &lt;div class=&quot;w-full flex flex-col font-bold text-lg my-4 gap-3&quot;&gt;
                    &iquest;Se propone cambiar de puesto?

                    &lt;select class=&quot;w-full h-fit p-2 rounded border border-slate-300/50&quot; @bind=&quot;data.CambiarPuesto&quot; required&gt;
                        &lt;option value=&quot;&quot;&gt;Selecciona una respuesta&lt;/option&gt;
                        &lt;option value=&quot;Si&quot;&gt;Si&lt;/option&gt;
                        &lt;option value=&quot;No&quot;&gt;No&lt;/option&gt;
                    &lt;/select&gt;
                &lt;/div&gt;

                @if (data.CambiarPuesto == &quot;Si&quot;)
                {
                    &lt;div class=&quot;w-full flex flex-col font-bold text-lg my-4 gap-3&quot;&gt;
                        &iquest;Cu&aacute;l ser&iacute;a el nuevo puesto?

                        &lt;textarea class=&quot;w-full min-h-[150px] rounded border border-slate-300/50&quot; @bind=&quot;data.NuevoPuesto&quot;
                        required&gt;&lt;/textarea&gt;
                    &lt;/div&gt;
                }


                &lt;div class=&quot;w-full mt-12 flex flex-wrap justify-end&quot;&gt;
                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 bg-red-600 text-white rounded&quot; @onclick=&quot;@(()=&gt; _nav.NavigateTo(&quot;/EvaluacionDesempeno&quot;))&quot;&gt;Salir sin guardar&lt;/button&gt;
                    @if(_user.email.ToLower() == data.DatosEvaluacion.EmailEvaluador.ToLower())
                    {
                        &lt;button type=&quot;submit&quot; class=&quot;w-fit h-fit p-2 bg-blue-400 text-white rounded&quot;&gt;Enviar&lt;/button&gt;
                    }
                &lt;/div&gt;
            }
        &lt;/form&gt;
    &lt;/div&gt;

    @code {
        E_EvaluacionDesempeno data = null;

        [Parameter] public string id { get; set; }

        protected override async Task OnInitializedAsync()
        {
            await LoadApi();
        }

        async Task LoadApi()
        {
            try
            {
                _main.IsLoading = true;
                var result = await _mongoContext.GetOneEvaluacionDesempeno(id);
                data = result.Value;
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Formulary&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);
                throw;
            }
            finally
            {     
                await InvokeAsync(StateHasChanged);
                _main.IsLoading = false;
            }
        }

        async Task SendAsync()
        {
            try
            {
                _main.IsLoading = true;
                data.DateCompleted = DateTime.Now;
                await _mongoContext.EditEvaluacionDesemepeno(data);
                _snackbar.InsertSnackbar(new(&quot;Formulario enviado correctamente&quot;, &quot;check&quot;, 5000, &quot;bg-teal-400&quot;, &quot;text-white&quot;));
                _nav.NavigateTo(&quot;/EvaluacionDesempeno&quot;);
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Formulary&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);
                throw;
            }
            finally
            {
                _main.IsLoading = false;
            } 
        }
    }
    `
  },
    {
    "ID": 12,
    "ServicesName":"Index",
    "ServicesRoute": "Components/RRHHF/EvaluacionesDesempeno/Index",
    "ServicesDescription":"",
    "Code": `
    @page &quot;/EvaluacionDesempeno&quot;
    @using LPSGrupo.Components.Areas.RRHHF.EvaluacionDesempeno.Modals
    @*&lt;AuthorizePage Roles=&quot;@(new(){&quot;RRHH.Supervisor&quot;, &quot;RRHH.Tecnico&quot;})&quot;&gt;&lt;/AuthorizePage&gt;*@
    &lt;AuthorizePage Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHH)&quot;&gt;&lt;/AuthorizePage&gt;
    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        &lt;h1 class=&quot; w-full text-3xl text-blue-400&quot; tabindex=&quot;none&quot;&gt;Evaluaci&oacute;n de desempe&ntilde;o&lt;/h1&gt;
        &lt;h2 class=&quot;w-full text-xl text-slate-950&quot;&gt;Aqu&iacute; se pueden ver todos las evaluaciones de desempe&ntilde;o&lt;/h2&gt;

        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHEvalDesempe&ntilde;oAddEval)&quot;&gt;
                    &lt;button class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3&quot;
                            @onclick='()=&gt;{OpenModalAdd();}'&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            add
                        &lt;/span&gt;
                        A&ntilde;adir evaluaci&oacute;n
                    &lt;/button&gt;
                &lt;/AuthorizedContent&gt;
                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHEvalDesempe&ntilde;oImportEval)&quot;&gt;
                        &lt;label for=&quot;import&quot; class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3&quot;&gt;
                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                upload
                            &lt;/span&gt;
                            Importar
                        &lt;/label&gt;

                    &lt;InputFile id=&quot;import&quot; hidden OnChange=&quot;Import&quot;&gt;&lt;/InputFile&gt;
                    &lt;/AuthorizedContent&gt;
                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHEvalDesempe&ntilde;oExportEval)&quot;&gt;
                            &lt;button class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3&quot;
                                    @onclick='()=&gt;{DownlaodIncidencias();}'&gt;
                                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                    download_for_offline
                                &lt;/span&gt;
                                Exportar
                            &lt;/button&gt;
                &lt;/AuthorizedContent&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-3 text-sm rounded border border-slate-300&quot;
                    @bind=&quot;        searchSet&quot;&gt;&lt;/input&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;

            @if (Data.Documents != null)
            {
                &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Nombre evaluado
                            &lt;/th&gt;

                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Completado
                            &lt;/th&gt;

                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Email evaluado
                            &lt;/th&gt;

                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Puesto de trabajo
                            &lt;/th&gt;

                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Departamento
                            &lt;/th&gt;

                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Puntuaci&oacute;n media
                            &lt;/th&gt;

                            &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHEvalDesempe&ntilde;oAddEval)&quot;&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Evaluador
                                &lt;/th&gt;
                            &lt;/AuthorizedContent&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var v in Data.Documents)
                        {
                            &lt;tr&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    &lt;a href=&quot;/Evaluacion/@(v.Id)&quot;
                                    class=&quot;text-blue-600 hover:underline cursor-pointer
    @(!PermittedRoles.Any(c=&gt; _user.Roles.Contains(c)) &amp;&amp; v.DatosEvaluacion.EmailEvaluador.ToLower() != _user.email.ToLower() ? &quot;pointer-events-none&quot; :&quot;&quot;)&quot;&gt;
                                        @v.DatosEvaluacion.NombreTrabajador
                                    &lt;/a&gt;
                                &lt;/td&gt;

                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.DateCompleted != null ? &quot;Si&quot; : &quot;No&quot;)
                                &lt;/td&gt;

                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @v.DatosEvaluacion.EmailTrabajador
                                &lt;/td&gt;

                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @v.DatosEvaluacion.PuestoTrabajo
                                &lt;/td&gt;

                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @v.DatosEvaluacion.Departamento
                                &lt;/td&gt;

                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.DateCompleted != null ?
                                        $&quot;{ExtensionsEvaluacionDesempeno.CalculateAverage(v.Preguntas).ToString(&quot;F2&quot;)}&quot; : &quot;Sin completar a&uacute;n&quot;)
                                &lt;/td&gt;

                                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsRRHH.RRHHEvalDesempe&ntilde;oAddEval)&quot;&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                        @v.DatosEvaluacion.Evaluador
                                    &lt;/td&gt;
                                &lt;/AuthorizedContent&gt;
                            &lt;/tr&gt;
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;
                &lt;Paginator countAllDocuments=&quot;(int)Data.CountAllDocuments&quot; countPages=&quot;Data.PageCount&quot; filters=&quot;get&quot;
                        ReloadData=&quot;() =&gt; LoadApi()&quot;&gt;

                &lt;/Paginator&gt;
            }
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        FiltersBase get = new()
            {
                PageNumber = 1,
                PageSize = 10,
                Search = &quot;&quot;
            };

        PaginatedResult&lt;E_EvaluacionDesempeno&gt; Data { get; set; } = new();

        List&lt;string&gt; PermittedRoles = [&quot;Admin&quot;, &quot;EvaluacionDesempe&ntilde;o.Super&quot;];

        string searchSet
        {
            get
            {
                return get.Search;
            }
            set
            {
                get.Search = value;
                get.PageNumber = 1; 

                LoadApi();
            }
        }

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;&quot;;
            await LoadApi();
        }

        async Task Import(InputFileChangeEventArgs e)
        {
            try
            {
            _main.IsLoading = true;
                MemoryStream ms = new();
                await e.File.OpenReadStream(e.File.Size).CopyToAsync(ms);
                await _mongoContext.ImportEvaluaciones(ms);
            }
            catch (Exception ex)
            {
                
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, &quot;Carpeta Evaluaci&oacute;n &gt; Index&quot;, &quot;Import&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {   
                _main.IsLoading = false;
                
            }
        
        }

        async Task DownlaodIncidencias()
        {
            _nav.NavigateTo(&quot;api/EvaluacionDesempeno/Export?Password=LPSEvaluacionDesempeno2024&quot;, true, true);
        }

        async Task LoadApi()
        {
            _main.IsLoading = true;
            var pageSize = _main.QueryParameters(_nav)[&quot;pageSize&quot;];
            var pageNumber = _main.QueryParameters(_nav)[&quot;pageNumber&quot;];

            if (!string.IsNullOrEmpty(pageSize) &amp;&amp; !string.IsNullOrEmpty(pageNumber))
            {
                get.PageNumber = int.Parse(pageNumber);
                get.PageSize = int.Parse(pageSize);
            }
            try
            {
            Data = await _mongoContext.GetPaginatedEvaluacionDesempeno(get);
                await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Carpeta Evaluaci&oacute;n &gt; Index&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
            }
        
        
        }

        void OpenModalAdd()
        {
            var modal = _modal.ShowModal(typeof(AddEvaluacion), new Dictionary&lt;string, object&gt;(), MaxWidth: 80);

            modal.OnCloseModal += (b) =&gt;
            {
                LoadApi();
            };
        }
    }
    `
  },
    {
    "ID": 13,
    "ServicesName":"AddEditSavedForm",
    "ServicesRoute": "Components/RRHHF/Forms/Modal/AddEditSavedForm",
    "ServicesDescription":"",
    "Code": `
    @using System.Runtime.InteropServices.ComTypes
    @if (AddEditSavedForms != null)
    {
        &lt;form class=&quot;w-full h-fit flex flex-wrap justify-between gap-3&quot; onkeydown=&quot;return event.key != 'Enter';&quot;
        @onsubmit=&quot;SaveAsync&quot;&gt;
            &lt;div class=&quot;w-[47%] h-fit flex flex-wrap gap-3&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400 text-sm&quot;&gt;Imagen del formulario (opcional)&lt;/span&gt;
                &lt;label for=&quot;imageLogo&quot; class=&quot;rounded w-full border border-slate-300/50 p-2 shadow-md cursor-pointer&quot;&gt;
                    @(&quot;Selecciona una imagen...&quot;)
                &lt;/label&gt;

                &lt;InputFile id=&quot;imageLogo&quot; hidden OnChange=&quot;SelectImageForm&quot;&gt;&lt;/InputFile&gt;
            &lt;/div&gt;

            &lt;div class=&quot;w-[47%] h-fit flex flex-wrap gap-3&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400 text-sm&quot;&gt;T&iacute;tulo&lt;/span&gt;
                &lt;input type=&quot;text&quot; @bind=&quot;            AddEditSavedForms.Title&quot; class=&quot;rounded w-full border border-slate-300/50 p-2 shadow-md&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400 text-sm&quot;&gt;Descripci&oacute;n del formulario&lt;/span&gt;
                &lt;textarea @bind=&quot;            AddEditSavedForms.Description&quot; class=&quot;rounded w-full border border-slate-300/50 p-2 shadow-md&quot;&gt;&lt;/textarea&gt;
            &lt;/div&gt;

            &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400 text-sm&quot;&gt;Pie del formulario&lt;/span&gt;
                &lt;textarea @bind=&quot;            AddEditSavedForms.FooterForm&quot; class=&quot;rounded w-full border border-slate-300/50 p-2 shadow-md&quot;&gt;&lt;/textarea&gt;
            &lt;/div&gt;

            &lt;div class=&quot;w-[47%] h-fit flex flex-wrap gap-3&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400 text-sm&quot;&gt;Valor m&iacute;nimo de la respuesta&lt;/span&gt;
                &lt;input type=&quot;number&quot; step=&quot;1&quot; min=&quot;1&quot; @bind=&quot;            MinValue&quot; class=&quot;rounded w-full border border-slate-300/50 p-2 shadow-md&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;w-[47%] h-fit flex flex-wrap gap-3&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400 text-sm&quot;&gt;Valor m&aacute;ximo de la respuesta&lt;/span&gt;
                &lt;input type=&quot;number&quot; step=&quot;1&quot; min=&quot;@(MinValue + 1)&quot; @bind=&quot;            MaxValue&quot; class=&quot;rounded w-full border border-slate-300/50 p-2 shadow-md&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400 text-sm&quot;&gt;Valor de las respuestas&lt;/span&gt;

                &lt;table class=&quot;w-full h-fit table-auto rounded border border-collapse border-slate-300/50&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr class=&quot;border border-slate-300/50&quot;&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                Valor
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                Texto asociado al valor
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @if (AddEditSavedForms.TextValues.Count == MaxValue)
                        {
                            foreach (var v in AddEditSavedForms.TextValues)
                            {
                                &lt;tr&gt;
                                    &lt;td class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                        @(v.Key)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                        &lt;input type=&quot;text&quot; @bind=&quot;                                AddEditSavedForms.TextValues[v.Key]&quot; class=&quot;rounded w-full border border-slate-300/50 p-2 shadow-md&quot; /&gt;
                                    &lt;/td&gt;
                                &lt;/tr&gt;
                            }
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;

            &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400 text-sm&quot;&gt;Preguntas&lt;/span&gt;
                &lt;button type=&quot;button&quot; class=&quot;rounded p-2 bg-blue-400 text-white shadow-md&quot;
                @onclick=&quot;@(() =&gt; AddEditSavedForms.Questions.Add(new(){Guid = Guid.NewGuid().ToString()}))&quot;&gt;
                    A&ntilde;adir pregunta
                &lt;/button&gt;

                &lt;table class=&quot;w-full h-fit table-auto rounded border border-collapse border-slate-300/50&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr class=&quot;border border-slate-300/50&quot;&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                N&ordm; de pregunta
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                Pregunta
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                Acciones
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @if (AddEditSavedForms.TextValues.Count == MaxValue)
                        {
                            foreach (var v in AddEditSavedForms.Questions)
                            {
                                &lt;tr&gt;
                                    &lt;td class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
                                            &lt;span&gt;
                                                @(AddEditSavedForms.Questions.IndexOf(v))
                                            &lt;/span&gt;

                                            &lt;div class=&quot;flex flex-wrap gap-3&quot;&gt;
                                                &lt;button type=&quot;button&quot; disabled=&quot;@(AddEditSavedForms.Questions.IndexOf(v) == 0)&quot;
                                                class=&quot;rounded p-2 bg-slate-600 text-white shadow-md flex flex-wrap justify-center items-center&quot;
                                                @onclick=&quot;() =&gt; ChangeOrderQuestionUp(AddEditSavedForms.Questions.IndexOf(v))&quot;&gt;
                                                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                        arrow_upward
                                                    &lt;/span&gt;
                                                &lt;/button&gt;

                                                &lt;button type=&quot;button&quot; disabled=&quot;@(AddEditSavedForms.Questions.IndexOf(v) == AddEditSavedForms.Questions.Count - 1)&quot;
                                                class=&quot;rounded p-2 bg-slate-600 text-white shadow-md flex flex-wrap justify-center items-center&quot;
                                                @onclick=&quot;() =&gt; ChangeOrderQuestionDown(AddEditSavedForms.Questions.IndexOf(v))&quot;&gt;
                                                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                        arrow_downward
                                                    &lt;/span&gt;
                                                &lt;/button&gt;
                                            &lt;/div&gt;
                                        &lt;/div&gt;
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                        &lt;input type=&quot;text&quot; @bind=&quot;                                AddEditSavedForms.Questions[AddEditSavedForms.Questions.IndexOf(v)].Value&quot; class=&quot;rounded w-full border border-slate-300/50 p-2 shadow-md&quot; /&gt;
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                        &lt;button type=&quot;button&quot;
                                        class=&quot;rounded p-2 bg-red-600 text-white shadow-md flex flex-wrap justify-center items-center&quot;
                                        @onclick=&quot;() =&gt; { AddEditSavedForms.Questions.Remove(v); ReorderQuestions();}&quot;&gt;
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                                delete
                                            &lt;/span&gt;
                                        &lt;/button&gt;
                                    &lt;/td&gt;
                                &lt;/tr&gt;
                            }
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;

            &lt;div class=&quot;w-full h-fit flex flex-wrap justify-end gap-3&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-red-600 text-white shadow-md&quot; @onclick=&quot;() =&gt; Close(false)&quot;&gt;
                    Cancelar
                &lt;/button&gt;
                &lt;button type=&quot;submit&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white shadow-md&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;
        &lt;/form&gt;
    }

    @code {
        [Parameter] public E_SavedForms AddEditSavedForms { get; set; }
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        [Parameter] public bool Saved { get; set; }

        int MinValue
        {
            get
            {
                return AddEditSavedForms.MinValue;
            }
            set
            {
                AddEditSavedForms.MinValue = value;
                AdjustTextValues();
                StateHasChanged();
            }
        }

        int MaxValue
        {
            get
            {
                return AddEditSavedForms.MaxValue;
            }
            set
            {
                if (value &lt;= MinValue)
                {
                    AddEditSavedForms.MaxValue = MinValue + 1;
                }
                else
                {
                    AddEditSavedForms.MaxValue = value;
                }

                AdjustTextValues();
                StateHasChanged();
            }
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (!firstRender) return;

            _disconnection.SaveStatus += (async () =&gt;
        {
            try
            {
                if (AddEditSavedForms != null)
                {
                    await _localStorage.SetItemAsync(&quot;savedformsadd&quot;, AddEditSavedForms);
                }
                else
                {
                    await _localStorage.RemoveItemAsync(&quot;savedformsadd&quot;);
                }
            }
            catch (Exception)
            { }
        });
        }

        void AdjustTextValues()
        {
            if (AddEditSavedForms.TextValues.Count &gt; MaxValue)
            {
                for (int i = AddEditSavedForms.TextValues.Count - 1; i &gt;= 0; i--)
                {
                    AddEditSavedForms.TextValues.Remove(AddEditSavedForms.TextValues.ElementAt(i).Key);

                    if (AddEditSavedForms.TextValues.Count == MaxValue) break;
                }
            }
            else if (AddEditSavedForms.TextValues.Count &lt; MaxValue)
            {
                for (int i = AddEditSavedForms.TextValues.Count - 1; i &lt;= MaxValue - 1; i++)
                {
                    AddEditSavedForms.TextValues.Add($&quot;{i + 2}&quot;, &quot;&quot;);

                    if (AddEditSavedForms.TextValues.Count == MaxValue) break;
                }
            }
        }

        void ChangeOrderQuestionUp(int indexElement)
        {
            List&lt;DataQuestion&gt; newList = new();

            for (int i = 0; i &lt;= AddEditSavedForms.Questions.Count - 1; i++)
            {
                if (i == indexElement - 1)
                {
                    newList.Add(AddEditSavedForms.Questions[indexElement]);
                }
                else if (i == indexElement)
                {
                    newList.Add(AddEditSavedForms.Questions[indexElement - 1]);
                }
                else
                {
                    newList.Add(AddEditSavedForms.Questions[i]);
                }
            }
            AddEditSavedForms.Questions = newList;
        }

        void ChangeOrderQuestionDown(int indexElement)
        {
            List&lt;DataQuestion&gt; newList = new();

            for (int i = 0; i &lt;= AddEditSavedForms.Questions.Count - 1; i++)
            {
                if (i == indexElement + 1)
                {
                    newList.Add(AddEditSavedForms.Questions[indexElement]);
                }
                else if (i == indexElement)
                {
                    newList.Add(AddEditSavedForms.Questions[indexElement + 1]);
                }
                else
                {
                    newList.Add(AddEditSavedForms.Questions[i]);
                }
            }
            AddEditSavedForms.Questions = newList;
        }

        void ReorderQuestions()
        {
            List&lt;DataQuestion&gt; data = new();

            for (int i = 0; i &lt;= AddEditSavedForms.Questions.Count - 1; i++)
            {
                data.Add(AddEditSavedForms.Questions[i]);
            }

            AddEditSavedForms.Questions = data;
        }

        protected override async Task OnParametersSetAsync()
        {
            if (string.IsNullOrEmpty(AddEditSavedForms.Id) &amp;&amp; !Saved)
            {
                AddEditSavedForms = new E_SavedForms()
                    {
                        Questions = new()
                    };
            }
        }

        async Task SelectImageForm(InputFileChangeEventArgs e)
        {
            try
            {
                if (e.File.Size &gt; 1000000)
                {
                    _snackbar.InsertSnackbar(new(&quot;La imagen del formulario debe pesar menos de 1MB&quot;, &quot;photo_size_select_small&quot;, 10000,
                    &quot;bg-red-600&quot;, &quot;text-white&quot;));
                    return;
                }

                if (e.File != null)
                {
                    var ms = new MemoryStream();

                    await e.File.OpenReadStream(e.File.Size).CopyToAsync(ms);

                    AddEditSavedForms.ImageFormBase64 = $&quot;data:{e.File.ContentType};base64,{Convert.ToBase64String(ms.ToArray())}&quot;;
                }
            }
            catch (Exception ex)
            {

                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, &quot;AddEditSavedForm&quot;, &quot;SelectImageForm&quot;, DateTime.UtcNow);

                throw;
            }

        }

        async Task SaveAsync()
        {
            try
            {
                _main.IsLoading = true;

                if (string.IsNullOrEmpty(AddEditSavedForms.Id))
                {
                    await _mongoContext.AddSavedForms(AddEditSavedForms);
                }
                else
                {
                    await _mongoContext.EditSavedForms(AddEditSavedForms);
                }
            
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;AddEditSavedForm&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);
                throw;
            }
            finally
            {
                _main.IsLoading = false;  
                Close(true);
            }
        }
    }
    `
  },
    {
    "ID": 14,
    "ServicesName":"LegendForm",
    "ServicesRoute": "Components/RRHHF/Forms/Modal/LegendForm",
    "ServicesDescription":"",
    "Code": `
    &lt;BaseModal Width=&quot;50&quot; MaxHeight=&quot;80&quot; IsOpen=&quot;IsOpen&quot; ZIndex=&quot;10000000000&quot;&gt;
        &lt;div class=&quot;relative w-full h-fit flex flex-wrap gap-3&quot;&gt;
            &lt;button class=&quot;absolute w-fit h-fit top-0 right-0 p-2 flex flex-wrap items-center justify-center&quot;
                    @onclick=&quot;() =&gt; {Close();}&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined text-red-600&quot;&gt;
                    cancel
                &lt;/span&gt;
            &lt;/button&gt;
            @foreach (var v in Values)
            {
                &lt;div class=&quot;w-fit flex flex-wrap items-center&quot;&gt;
                    @($&quot;{v.Key}. {v.Value}&quot;)
                &lt;/div&gt;
            }
        &lt;/div&gt;
    &lt;/BaseModal&gt;

    @code {
        [Parameter] public bool IsOpen { get; set; }
        [Parameter] public Action Close { get; set; }
        [Parameter] public Dictionary&lt;int, string&gt; Values { get; set; }
    }
    `
  },
    {
    "ID": 15,
    "ServicesName":"Form",
    "ServicesRoute": "Components/RRHHF/Forms/Form",
    "ServicesDescription":"",
    "Code": `
    @page &quot;/Forms/DocForm/{id}&quot;
    &lt;div class=&quot;fixed w-full bg-white h-[100dvh] overflow-y-auto top-0 left-0 z-[1000000] flex flex-wrap justify-center&quot;&gt;
        @if (AddEditForm != null)
        {
            if (AddEditForm.Form != null)
            {
                &lt;div class=&quot;absolute w-fit top-[15px] right-[15px] h-fit flex flex-col gap-3 @(IsOpenModalLegend ? &quot;opacity-100&quot; : &quot;opacity-0&quot;)&quot;&gt;
                    @foreach (var v in Values)
                    {
                        &lt;div class=&quot;w-full flex flex-wrap items-center&quot;&gt;
                            @($&quot;{v.Key}. {v.Value}&quot;)
                        &lt;/div&gt;
                    }
                &lt;/div&gt;

                &lt;div class=&quot;relative h-fit w-[60%] mt-12 p-4 flex flex-col gap-6 bg-slate-50 shadow-md rounded&quot;&gt;
                    &lt;img src=&quot;@(string.IsNullOrEmpty(AddEditForm.Form.ImageFormBase64) ? &quot;../Images/Base/logoMulticolorAjustado.png&quot; : AddEditForm.Form.ImageFormBase64)&quot;
                    class=&quot;absolute w-[10%] aspect-auto top-[5px] left-[5px] rounded&quot; /&gt;

                    &lt;button class=&quot;absolute w-fit h-fit p-2 top-[5px] right-[5px] flex flex-wrap items-center justify-center&quot;
                    @onclick=&quot;() =&gt; {IsOpenModalLegend = !IsOpenModalLegend;}&quot;&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            help
                        &lt;/span&gt;
                    &lt;/button&gt;

                    &lt;div class=&quot;w-full mt-12 text-center text-slate-900 text-3xl font-bold&quot;&gt;
                        @AddEditForm.Form.Title
                    &lt;/div&gt;

                    &lt;div class=&quot;w-full text-center text-slate-900 text-base mb-8&quot;&gt;
                        @AddEditForm.Form.Description
                    &lt;/div&gt;

                    @foreach (var v in AddEditForm.Responses)
                    {
                        &lt;div class=&quot;w-full flex flex-wrap gap-3&quot;&gt;
                            &lt;div class=&quot;w-full text-slate-900 text-center font-bold text-xl&quot;&gt;
                                @v.Question
                            &lt;/div&gt;

                            &lt;div class=&quot;w-full flex flex-wrap justify-center gap-2&quot;&gt;
                                @foreach (var z in helperValues)
                                {
                                    &lt;span class=&quot;material-symbols-outlined cursor-pointer hover:scale-105&quot; @onclick=&quot;() =&gt; v.Value = helperValues.IndexOf(z) + 1&quot;&gt;
                                        @($&quot;{(helperValues.IndexOf(z) &gt; v.Value - 1 ? &quot;radio_button_unchecked&quot; : &quot;radio_button_checked&quot;)}&quot;)
                                    &lt;/span&gt;
                                }
                            &lt;/div&gt;
                        &lt;/div&gt;
                    }

                    &lt;div class=&quot;w-full mt-12 text-center text-slate-900 text-xl&quot;&gt;
                        @AddEditForm.Form.FooterForm
                    &lt;/div&gt;

                    &lt;div class=&quot;w-full&quot;&gt;
                        &lt;textarea @bind=&quot;            AddEditForm.Footer&quot; class=&quot;rounded p-2 w-full h-[150px] border border-slate-300/50&quot;&gt;&lt;/textarea&gt;
                    &lt;/div&gt;

                    &lt;div class=&quot;w-full flex flex-wrap justify-center&quot;&gt;
                        &lt;button class=&quot;rounded py-2 px-4 bg-blue-400 text-white text-xl&quot; @onclick=&quot;SaveAsync&quot;&gt;Enviar&lt;/button&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            }
        }
    &lt;/div&gt;

    @code {
        [Parameter] public string id { get; set; }

        List&lt;string&gt; helperValues = new();

        Dictionary&lt;int, string&gt; Values = new();

        public E_Form AddEditForm = new();

        bool Sent = false;

        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;

            if (string.IsNullOrEmpty(id))
            {
                _nav.NavigateTo(&quot;/&quot;);
            }

            await LoadApi();

            _disconnection.SaveStatus +=(async () =&gt;
            {
                try{
                    if ( AddEditForm!= null)
                    {
                        await _localStorage.SetItemAsync(&quot;formsadd&quot;, AddEditForm);
                    }
                    else
                    {
                        await _localStorage.RemoveItemAsync(&quot;formsadd&quot;);
                    }
                }
                catch (Exception e)
                {
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Form&quot;, &quot;OnAfterRenderAsync&quot;, DateTime.UtcNow);

                    throw;
                }
            });

            if (await _localStorage.ContainKeyAsync(&quot;formsadd&quot;))
            {
                AddEditForm = await _localStorage.GetItemAsync&lt;E_Form&gt;(&quot;formsadd&quot;);
                await _localStorage.RemoveItemAsync(&quot;formsadd&quot;);
            await InvokeAsync(StateHasChanged);
                return;
            };
        await InvokeAsync(StateHasChanged);
        }

        async Task LoadApi()
        {
            try
            {
                _main.IsLoading = true;
                        var data = await _mongoContext.GetOneSavedForms(id);

                        AddEditForm = new()
                            {
                                Form = data.Value,
                                Responses = new()
                            };

                        foreach (var v in data.Value.Questions)
                        {
                            AddEditForm.Responses.Add(new()
                                {
                                    Question = v.Value,
                                    Value = 1
                                });
                        }

                        for (int i = 1; i &lt;= AddEditForm.Form.MaxValue; i++)
                        {
                            helperValues.Add(Guid.NewGuid().ToString());
                            Values.Add(i, AddEditForm.Form.TextValues.ElementAt(i - 1).Value);
                        }
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Form&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
            }
        
        }

        bool IsOpenModalLegend = false;

        void Close()
        {
            IsOpenModalLegend = false;
            StateHasChanged();
        }

        async Task SaveAsync()
        {
            try
            {
                if (Sent) return;

                        Sent = true;

                        _main.IsLoading = true;
                        await _mongoContext.AddForms(AddEditForm);

                        _snackbar.InsertSnackbar(new(&quot;Tu respuesta se ha enviado. &iexcl;Gracias!&quot;, &quot;check&quot;, 10000, &quot;bg-emerald-600&quot;, &quot;text-white&quot;));

            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Form&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
            
                _main.IsLoading = false;
            }      
        }
    }
    `
  },  {
    "ID": 16,
    "ServicesName":"Index",
    "ServicesRoute": "Components/RRHHF/Forms/Index",
    "ServicesDescription":"",
    "Code": `
    @page &quot;/Forms&quot;
    @using LPSGrupo.Components.Areas.RRHHF.Forms.Modal

    &lt;AuthorizePage Roles=&quot;@(new(){&quot;Forms.Supervisor&quot;})&quot;&gt;&lt;/AuthorizePage&gt;

    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        &lt;h1 class=&quot; w-full text-3xl text-blue-400&quot; tabindex=&quot;none&quot;&gt;Formularios&lt;/h1&gt;
        &lt;h2 class=&quot;w-full text-xl text-slate-950&quot;&gt;Aqu&iacute; se pueden ver todos los formularios&lt;/h2&gt;

        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsSavedForms.Add)&quot;&gt;
                    &lt;button type=&quot;button&quot; class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3&quot;
                            @onclick=&quot;() =&gt; {IsSaved=false; OpenModalAddEdit();}&quot;&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            manage_accounts
                        &lt;/span&gt;
                        Crear formulario
                    &lt;/button&gt;
                &lt;/AuthorizedContent&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-3 text-sm rounded border border-slate-300&quot; @bind=&quot;        searchSet&quot;&gt;&lt;/input&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;
            @if (PaginatedSavedForms.Documents != null)
            {
                foreach (var v in PaginatedSavedForms.Documents)
                {
                    &lt;div class=&quot;relative w-[450px] h-[200px] py-2 px-6 rounded border border-slate-300/50 bg-slate-50 shadow-md grid grid-cols-12 cursor-pointer&quot;
                        @onclick=&quot;() =&gt; OpenModalAddEdit(v)&quot;&gt;
                        &lt;button class=&quot;absolute top-[5px] right-[5px] p-1 rounded bg-blue-400 text-white flex flex-wrap justify-center items-center&quot;
                                @onclick=&quot;@(() =&gt; _nav.NavigateTo($&quot;/Forms/DocForm/{v.Id}&quot;))&quot;&gt;
                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                link
                            &lt;/span&gt;
                        &lt;/button&gt;
                        &lt;div class=&quot;col-span-3 h-[75px] rounded&quot; style=&quot;background-size: cover; background-position: center;
                        background-image: url(@(string.IsNullOrEmpty(v.ImageFormBase64) ? &quot;../Images/Base/logoMulticolor.png&quot; : v.ImageFormBase64));&quot;&gt;
                        &lt;/div&gt;
                        &lt;div class=&quot;col-span-9 h-[75px] text-[15px] text-blue-400 font-bold flex flex-wrap justify-center items-center&quot;&gt;
                            @v.Title
                        &lt;/div&gt;

                        &lt;div class=&quot;col-span-12 text-blue-700 text-justify&quot;&gt;
                            @(v.Description.Length &gt; 175 ? $&quot;{new string(v.Description.Take(172).ToArray())}...&quot; : v.Description)
                        &lt;/div&gt;
                    &lt;/div&gt;
                }
                &lt;Paginator countPages=&quot;PaginatedSavedForms.PageCount&quot; countAllDocuments=&quot;(int)PaginatedSavedForms.CountAllDocuments&quot;
                        filters=&quot;filtersSavedForms&quot; ReloadData=&quot;()=&gt; LoadApi()&quot;&gt;
                &lt;/Paginator&gt;
            }
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        public FiltersBase filtersSavedForms = new()
            {
                Search = &quot;&quot;,
                PageNumber = 1,
                PageSize = 10
            };

        public PaginatedResult&lt;E_SavedForms&gt; PaginatedSavedForms { get; set; } = new();

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (await _localStorage.ContainKeyAsync(&quot;savedformsadd&quot;))
            {
                AddEditSavedForms = await _localStorage.GetItemAsync&lt;E_SavedForms&gt;(&quot;savedformsadd&quot;);
                await _localStorage.RemoveItemAsync(&quot;savedformsadd&quot;);
                IsSaved = true;
                OpenModalAddEdit(AddEditSavedForms);
                await InvokeAsync(StateHasChanged);
                return;
            };
        }

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;&quot;;
            await LoadApi();



            await InvokeAsync(StateHasChanged);
        }

        string searchSet
        {
            get
            {
                return filtersSavedForms.Search;
            }
            set
            {
                filtersSavedForms.Search = value;

                LoadApi();
            }
        }

        async Task LoadApi()
        {
            _main.IsLoading = true;
            try
            {
                PaginatedSavedForms = await _mongoContext.GetPaginatedSavedForms(filtersSavedForms);

            }
            catch (Exception e)
            {

                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Carpeta Form &gt; Index&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;

            }
        
        }

        // Modal AddEdit

        public E_SavedForms AddEditSavedForms = new();
        bool IsSaved = false;
        public void OpenModalAddEdit(E_SavedForms edit = null)
        {

            if (edit != null)
            {
                AddEditSavedForms = edit;
            }

            var modal = _modal.ShowModal(typeof(AddEditSavedForm), new Dictionary&lt;string, object&gt;
            {
                {nameof(AddEditSavedForm.AddEditSavedForms), AddEditSavedForms},
                {nameof(AddEditSavedForm.Saved), IsSaved},
            }, FixedWidth: 80);

            modal.OnCloseModal += CloseModalAddEdit;
        }

        public async  void CloseModalAddEdit(bool success)
        {

            if (success)
            {
                await LoadApi();
            }
            await _localStorage.RemoveItemAsync(&quot;savedformsadd&quot;);
            IsSaved = false;
        }
    }
    `
  }
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