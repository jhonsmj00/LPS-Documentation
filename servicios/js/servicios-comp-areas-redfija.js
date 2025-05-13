const data = [
  {
    "ID": 1,
    "ServicesName": "Home",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Almacen/Home",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/logistica&quot;
    @*&lt;AuthorizePage Roles=&quot;@(new(){&quot;RRHH.Supervisor&quot;, &quot;RRHH.Tecnico&quot;})&quot;&gt;&lt;/AuthorizePage&gt;*@
    &lt;AuthorizePage Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogistica)&quot;&gt;&lt;/AuthorizePage&gt;

    &lt;div class=&quot;w-full h-fit flex flex-wrap p-4 gap-3&quot;&gt;
        &lt;h1 class=&quot;w-full flex flex-wrap items-center text-2xl text-blue-400 font-bold&quot;&gt;Almacenes - @(Proveedores.CountAllDocuments) registros&lt;/h1&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap justify-between items-center&quot;&gt;
            &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaAlmacenesAddAlmacen)&quot;&gt;

                &lt;div class=&quot;w-fit flex flex-wrap items-center&quot;&gt;
                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;()=&gt;OpenModalAddEdit()&quot;&gt;A&ntilde;adir almac&eacute;n&lt;/button&gt;
                &lt;/div&gt;
            &lt;/AuthorizedContent&gt;
            &lt;div class=&quot;w-fit flex flex-wrap items-center&quot;&gt;
                &lt;InputText class=&quot;w-full p-2 border border-slate-300/50&quot;
                ValueExpression=&quot;() =&gt; filters.Search&quot; ValueChanged=&quot;(c)=&gt; {filters.Search = c; LoadAPI();}&quot; placeholder=&quot;Buscar...&quot;&gt;&lt;/InputText&gt;
            &lt;/div&gt;

        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-col gap-3&quot;&gt;

            &lt;table class=&quot;min-w-full h-fit table-auto border-collapse border border-slate-300/50&quot;&gt;
                &lt;thead&gt;
                    &lt;tr&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Nombre
                        &lt;/th&gt;

                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Direcci&oacute;n
                        &lt;/th&gt;

                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Tama&ntilde;o
                        &lt;/th&gt;

                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Nombre responsable
                        &lt;/th&gt;

                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Email responsable
                        &lt;/th&gt;

                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Tel&eacute;fono responsable
                        &lt;/th&gt;

                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            ID Bizneo
                        &lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    @if (Proveedores.Documents != null)
                    {
                        @foreach (var v in Proveedores.Documents)
                        {
                            &lt;tr&gt;
                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;span class=&quot;w-fit text-blue-400 font-bold text-xl cursor-pointer&quot; @onclick=&quot;()=&gt; OpenModalAddEdit(v)&quot;&gt;@(v.Nombre)&lt;/span&gt;
                                &lt;/th&gt;

                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;span&gt;@v.Direccion&lt;/span&gt;
                                &lt;/th&gt;

                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;span&gt;@v.Tamano&lt;/span&gt;
                                &lt;/th&gt;

                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;span&gt;@v.NombreApellidos&lt;/span&gt;
                                &lt;/th&gt;

                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;a href=&quot;mailto:@(v.Email)&quot; class=&quot;text-blue-600 underline&quot;&gt;@v.Email&lt;/a&gt;
                                &lt;/th&gt;

                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;a href=&quot;tel:@(v.Telefono)&quot; class=&quot;text-blue-600 underline&quot;&gt;@v.Telefono&lt;/a&gt;
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;span&gt;@v.IdBizneo&lt;/span&gt;
                                &lt;/th&gt;
                            &lt;/tr&gt;
                        }
                    }
                &lt;/tbody&gt;
            &lt;/table&gt;
        &lt;/div&gt;

        &lt;Paginator countAllDocuments=&quot;(int)Proveedores.CountAllDocuments&quot; countPages=&quot;Proveedores.PageCount&quot; filters=&quot;filters&quot; ReloadData=&quot;()=&gt;LoadAPI()&quot;&gt;&lt;/Paginator&gt;
    &lt;/div&gt;

    @code {
        public PaginatedResult&lt;E_Almacen&gt; Proveedores { get; set; } = new();
        public FiltersBase filters = new()
            {
                PageNumber = 1,
                PageSize = 10,
                Search = &quot;&quot;
            };

        public BaseDataProveedores baseData = new();

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;&quot;;
            await LoadAPI();
        }

        async Task LoadAPI()
        {
            _main.IsLoading = true;

            var pageSize = _main.QueryParameters(_nav)[&quot;pageSize&quot;];
            var pageNumber = _main.QueryParameters(_nav)[&quot;pageNumber&quot;];

            if (!string.IsNullOrEmpty(pageSize) &amp;&amp; !string.IsNullOrEmpty(pageNumber))
            {
                filters.PageNumber = int.Parse(pageNumber);
                filters.PageSize = int.Parse(pageSize);
            }

            try
            {
                Proveedores = await _mongoContext.GetPaginatedAlmacen(filters);

                baseData = await _mongoContext.BaseDataProveedor();
            }
            catch (Exception e)
            {

                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Carpeta RedFijaF &gt; Logistica &gt; Almacen &gt; Home&quot;, &quot;LoadAPI&quot;, DateTime.UtcNow);

                throw;
            }


            await InvokeAsync(StateHasChanged);

            _main.IsLoading = false;
        }

        async Task OpenModalAddEdit(E_Almacen edit = null)
        {
            //En caso de error de permisos eliminar este if
            if (_user.Permissions.Contains(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaAlmacenesVerEditarAlmacen))
            {
                var modal = _modal.ShowModal(typeof(M_AddEditAlmacen), new Dictionary&lt;string, object&gt;
                {
                    {nameof(M_AddEditAlmacen.AddEdit), edit},
                }, FixedWidth: 80, MaxHeight: 80);

                modal.OnCloseModal += (b) =&gt;
                {
                    
                };
                await LoadAPI();
            
            }
            else
            {
                _snackbar.InsertSnackbar(new(&quot;No estas autorizado&quot;, &quot;cancel&quot;, 6000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                return;
            }
        }
    }
    `
  },
  {
    "ID": 2,
    "ServicesName": "M_AddEditAlmacen",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Almacen/M_AddEditAlmacen",
    "ServicesDescription": "",
    "Code": `
        &lt;EditForm class=&quot;w-full h-fit flex flex-wrap gap-3 justify-between p-2&quot; Model=&quot;AddEdit&quot; OnValidSubmit=&quot;SendAsync&quot;&gt;
        &lt;DataAnnotationsValidator&gt;&lt;/DataAnnotationsValidator&gt;
        &lt;span class=&quot;w-full text-blue-400 text-xl&quot;&gt;@(IsEdit ? $&quot;Editar proveedor {AddEdit.Nombre}&quot; : &quot;A&ntilde;adir proveedor&quot;)&lt;/span&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Nombre&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Nombre&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Nombre&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Direcci&oacute;n&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Direccion&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Direccion&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Tama&ntilde;o&lt;/span&gt;

            &lt;InputNumber class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Tamano&quot;&gt;&lt;/InputNumber&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Tamano&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Nombre y apellidos del responsable&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.NombreApellidos&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.NombreApellidos&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Email del responsable&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Email&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Email&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Tel&eacute;fono del responsable&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Telefono&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Telefono&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Id Bizneo del responsable&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.IdBizneo&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.IdBizneo&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap items-center justify-end gap-3&quot;&gt;
            &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-red-600 text-white&quot; @onclick=&quot;()=&gt; Close(false)&quot;&gt;Salir sin guardar&lt;/button&gt;
            &lt;button type=&quot;submit&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot;&gt;Guardar&lt;/button&gt;
        &lt;/div&gt;

        @if (Productos.Documents != null)
        {
            &lt;div class=&quot;w-full h-fit flex flex-wrap items-center gap-3&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;()=&gt; OpenModalMoveProductsToNode()&quot;&gt;Mover productos a nodo&lt;/button&gt;
                &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;()=&gt; OpenModalMoveProductsToAlmacen()&quot;&gt;Mover productos a otro almac&eacute;n&lt;/button&gt;

                &lt;select class=&quot;w-[300px] h-fit p-2 rounded border border-slate-300/50&quot; @onchange=&quot;OpenModalInforme&quot;&gt;
                    &lt;option value=&quot;&quot;&gt;Selecciona un informe para mostrar&lt;/option&gt;

                    @foreach(var v in AddEdit.Albaranes)
                    {
                        &lt;option value=&quot;@v.Codigo&quot;&gt;@v.Codigo&lt;/option&gt;
                    }
                &lt;/select&gt;
            &lt;/div&gt;
            &lt;table class=&quot;w-full h-fit table-auto rounded border border-slate-300/50 border-collapse&quot;&gt;
                &lt;thead&gt;
                    &lt;tr&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Nombre producto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                            C&oacute;digo producto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Proveedor
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Precio
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Cantidad
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Proyecto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Subproyecto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                            N&uacute;mero de serie
                        &lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    @foreach (var v in Productos.Documents)
                    {
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                                @v.Producto.Nombre
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                                @v.Producto.CodigoProducto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                                @v.NombreProveedor
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                                @v.Precio
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                                @v.CantidadSolicitada
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                                @v.Proyecto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                                @v.SubProyecto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                                @v.Serialnumber
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    }
                &lt;/tbody&gt;
            &lt;/table&gt;
            &lt;Paginator ChangeURL=false countAllDocuments=&quot;(int)Productos.CountAllDocuments&quot; countPages=&quot;Productos.PageCount&quot; filters=&quot;filtersProductos&quot;
                    ReloadData=&quot;()=&gt;LoadProducts()&quot;&gt;&lt;/Paginator&gt;
        }
    &lt;/EditForm&gt;

    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }

        [Parameter] public E_Almacen AddEdit { get; set; }

        public FiltersBase filtersProductos = new()
            {
                PageNumber = 1,
                PageSize = 10,
                Search = &quot;&quot;
            };

        public PaginatedResult&lt;E_ProductoAlmacen&gt; Productos = new();

        bool IsEdit =&gt; !string.IsNullOrEmpty(AddEdit.Id);

        bool Sending = false;

        protected override async Task OnInitializedAsync()
        {
            if (AddEdit == null)
            {
                AddEdit = new();
            }

        await   LoadProducts();
        }

        async Task LoadProducts()
        {
            if (!string.IsNullOrEmpty(AddEdit.Id))
            {
                try
                {
                    Productos = await _mongoContext.GetPaginatedProductosAlmacen(filtersProductos, AddEdit.Id);
                }
                catch (Exception e)
                {
                    
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_AddEditAlmacen&quot;, &quot;LoadProducts&quot;, DateTime.UtcNow);

                    throw;
                }
            
                await InvokeAsync(StateHasChanged);
            }
        }

        public async Task OpenModalMoveProductsToNode()
        {
            var modal = _modal.ShowModal(typeof(M_SendProducts), new Dictionary&lt;string, object&gt;
            {
                {nameof(M_SendProducts.IdAlmacen), AddEdit.Id}
            }, FixedWidth: 90, MaxHeight: 85);

            modal.OnCloseModal += async (b) =&gt;
            {
                await LoadProducts();
            };
        }
        public async Task OpenModalMoveProductsToAlmacen()
        {
            var modal = _modal.ShowModal(typeof(M_SendProductsAlmacen), new Dictionary&lt;string, object&gt;
            {
                {nameof(M_SendProductsAlmacen.IdAlmacen), AddEdit.Id}
            }, FixedWidth: 90, MaxHeight: 85);

            modal.OnCloseModal += async (b) =&gt;
            {
                await LoadProducts();
            };
        }

        public async Task OpenModalInforme(ChangeEventArgs e)
        {
            if (e.Value == null) return;
            if (string.IsNullOrEmpty(e.Value.ToString())) return;

            var modal = _modal.ShowModal(typeof(M_Informe), new Dictionary&lt;string, object&gt;
            {
                {nameof(M_Informe.Albaran), AddEdit.Albaranes.First(x=&gt; x.Codigo == e.Value.ToString())}
            }, FixedWidth: 90, MaxHeight: 80);

            modal.OnCloseModal += async (b) =&gt;
            {
                
            };
        }

        public async Task SendAsync()
        {
            _main.IsLoading = true;

            if (Sending)
            {
                return;
            }

            Sending = true;

            try
            {
                if (IsEdit)
                        {
                            await _mongoContext.EditAlmacen(AddEdit);
                        }
                        else
                        {
                            await _mongoContext.AddAlmacen(AddEdit);
                        }
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_AddEditAlmacen&quot;, &quot;SendAsync&quot;, DateTime.UtcNow);

                throw;
            }
            

            Close(true);

            Sending = false;

            _main.IsLoading = false;
        }
    }
    `
  },
  {
    "ID": 3,
    "ServicesName": "M_CodigoAlbaran",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Almacen/M_CodigoAlbaran",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;w-full h-fit flex flex-wrap items-center p-2 gap-3&quot;&gt;
        &lt;input type=&quot;text&quot; class=&quot;w-full h-fit p-2 rounded border border-salte-300/50&quot; placeholder=&quot;Introduce el c&oacute;digo del albar&aacute;n&quot; @bind-value=&quot;CodigoAlbaran&quot; /&gt;

        @if (!DestinatarioAlmacen)
        {
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Datos del destinatario&lt;/span&gt;
            &lt;BlazoredTextEditor ToolbarCSSClass=&quot;w-full&quot; EditorCssClass=&quot;w-full&quot; @ref=&quot;@QuillHtml&quot;&gt;
                &lt;ToolbarContent&gt;
                    &lt;select class=&quot;ql-header&quot;&gt;
                        &lt;option selected=&quot;&quot;&gt;&lt;/option&gt;
                        &lt;option value=&quot;1&quot;&gt;&lt;/option&gt;
                        &lt;option value=&quot;2&quot;&gt;&lt;/option&gt;
                        &lt;option value=&quot;3&quot;&gt;&lt;/option&gt;
                        &lt;option value=&quot;4&quot;&gt;&lt;/option&gt;
                        &lt;option value=&quot;5&quot;&gt;&lt;/option&gt;
                    &lt;/select&gt;
                    &lt;span class=&quot;ql-formats&quot;&gt;
                        &lt;button class=&quot;ql-bold&quot;&gt;&lt;/button&gt;
                        &lt;button class=&quot;ql-italic&quot;&gt;&lt;/button&gt;
                        &lt;button class=&quot;ql-underline&quot;&gt;&lt;/button&gt;
                        &lt;button class=&quot;ql-strike&quot;&gt;&lt;/button&gt;
                    &lt;/span&gt;
                    &lt;span class=&quot;ql-formats&quot;&gt;
                        &lt;select class=&quot;ql-color&quot;&gt;&lt;/select&gt;
                        &lt;select class=&quot;ql-background&quot;&gt;&lt;/select&gt;
                    &lt;/span&gt;
                    &lt;span class=&quot;ql-formats&quot;&gt;
                        &lt;button class=&quot;ql-list&quot; value=&quot;ordered&quot;&gt;&lt;/button&gt;
                        &lt;button class=&quot;ql-list&quot; value=&quot;bullet&quot;&gt;&lt;/button&gt;
                    &lt;/span&gt;
                    &lt;span class=&quot;ql-formats&quot;&gt;
                        &lt;button class=&quot;ql-link&quot;&gt;&lt;/button&gt;
                    &lt;/span&gt;
                &lt;/ToolbarContent&gt;
                &lt;EditorContent&gt;
                &lt;/EditorContent&gt;
            &lt;/BlazoredTextEditor&gt;
        }
    &lt;/div&gt;

    &lt;div class=&quot;w-full h-fit flex flex-wrap items-center justify-end p-2&quot;&gt;

        @if (!string.IsNullOrEmpty(CodigoAlbaran))
        {
            &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;CloseWithAlbaran&quot;&gt;Guardar&lt;/button&gt;
        }
    &lt;/div&gt;

    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        [Parameter] public List&lt;E_ProductoAlmacen&gt; Productos { get; set; }
        [Parameter] public string IdAlmacen { get; set; }
        [Parameter] public bool DestinatarioAlmacen { get; set; }
        BlazoredTextEditor QuillHtml;

        public string CodigoAlbaran = &quot;&quot;;
        public string HTMLData = &quot;&quot;;

        async Task CloseWithAlbaran()
        {
            try
            {
            var almacen = await _mongoContext.GetOneAlmacen(IdAlmacen);
                    if (!DestinatarioAlmacen)
                    {
                        HTMLData = await QuillHtml.GetHTML();
                    }
                    almacen.Value.Albaranes.Add(new()
                        {
                            Codigo = CodigoAlbaran,
                            Fecha = DateTime.Now,
                            Productos = Productos,
                            DestinatarioLPS = DestinatarioAlmacen,
                            SenderLPS = true,
                            HTMLData = HTMLData
                        });
                    await _mongoContext.EditAlmacen(almacen.Value);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_CodigoAlbaran&quot;, &quot;CloseWithAlbaran&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                Close(true);
            }
        
    
        }
    }
    `
  },
  {
    "ID": 4,
    "ServicesName": "M_Informe",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Almacen/M_Informe",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;w-full h-fit flex flex-wrap items-center&quot;&gt;
        &lt;img src=&quot;../Images/Base/logoMulticolorAjustado.png&quot; class=&quot;w-[150px] h-auto&quot; /&gt;
    &lt;/div&gt;

    &lt;div class=&quot;w-full h-fit mt-6 grid grid-cols-12&quot;&gt;

        &lt;div class=&quot;col-span-6 h-fit flex flex-wrap&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400 font-bold&quot;&gt;
                LPS Facilities S.L.
            &lt;/div&gt;

            &lt;div class=&quot;w-full&quot;&gt;
                B72680077
            &lt;/div&gt;
            &lt;div class=&quot;w-full&quot;&gt;
                CL del Haya 4
            &lt;/div&gt;
            &lt;div class=&quot;w-full&quot;&gt;
                3&ordm; 1
            &lt;/div&gt;
            &lt;div class=&quot;w-full&quot;&gt;
                28054 MADRID
            &lt;/div&gt;
            &lt;div class=&quot;w-full&quot;&gt;
                645400662
            &lt;/div&gt;
            &lt;div class=&quot;w-full&quot;&gt;
                juanantonio.garcia@lpsgrupo.com
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 h-auto flex flex-wrap items-end justify-end&quot;&gt;
            &lt;div class=&quot;w-full h-fit text-end&quot;&gt;
                @if(!string.IsNullOrEmpty(Albaran.HTMLData))
                {
                    @((MarkupString)Albaran.HTMLData)
                }
            &lt;/div&gt;
        &lt;/div&gt;

    &lt;/div&gt;

    &lt;table class=&quot;w-full h-fit mt-12 table-auto&quot;&gt;
        &lt;thead&gt;
            &lt;tr class=&quot;bg-purple-500 text-white&quot;&gt;
                &lt;th class=&quot;p-2&quot;&gt;
                    C&oacute;digo
                &lt;/th&gt;

                &lt;th class=&quot;p-2&quot;&gt;
                    Concepto
                &lt;/th&gt;

                &lt;th class=&quot;p-2&quot;&gt;
                    Precio
                &lt;/th&gt;

                &lt;th class=&quot;p-2&quot;&gt;
                    Cantidad
                &lt;/th&gt;

                &lt;th class=&quot;p-2&quot;&gt;
                    Total
                &lt;/th&gt;
            &lt;/tr&gt;
        &lt;/thead&gt;

        &lt;tbody&gt;
            @foreach (var v in Albaran.ListadoProductosAlbaran)
            {
                &lt;tr&gt;
                    &lt;th class=&quot;p-2&quot;&gt;
                        @v.Producto.CodigoProducto
                    &lt;/th&gt;

                    &lt;th class=&quot;p-2&quot;&gt;
                        @v.Producto.Descripcion
                    &lt;/th&gt;

                    &lt;th class=&quot;p-2&quot;&gt;
                        @v.Precio &euro;
                    &lt;/th&gt;

                    &lt;th class=&quot;p-2&quot;&gt;
                        @v.Unidades
                    &lt;/th&gt;

                    &lt;th class=&quot;p-2&quot;&gt;
                        @(v.Precio * v.Unidades) &euro;
                    &lt;/th&gt;
                &lt;/tr&gt;
            }
        &lt;/tbody&gt;
    &lt;/table&gt;

    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        //[Parameter] public AlbaranDatos Albaran { get; set; }
        [Parameter] public E_Albaran Albaran { get; set; }
        protected override async Task OnInitializedAsync()
        {
            
        }
    }
    `
  },
  {
    "ID": 5,
    "ServicesName": "M_SendProducts",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Almacen/M_SendProducts",
    "ServicesDescription": "",
    "Code": `
    @using System.Text.Json
    &lt;form class=&quot;w-full h-fit grid grid-cols-12 gap-3&quot; @onsubmit=&quot;SaveAsync&quot;&gt;
        &lt;div class=&quot;col-span-12 h-fit p-2 flex flex-wrap&quot;&gt;
            &lt;InputText class=&quot;w-[300px] h-fit p-2 rounded border border-slate-300/50&quot; @bind-Value=&quot;IdDestinatario&quot; placeholder=&quot;Nodo...&quot;&gt;&lt;/InputText&gt;
        &lt;/div&gt;

        @if (!string.IsNullOrEmpty(IdDestinatario))
        {
            &lt;table class=&quot;col-span-6 table-auto rounded border border-collapse border-slate-300/50&quot;&gt;
                &lt;thead&gt;
                    &lt;tr&gt;
                        &lt;th colspan=&quot;7&quot; class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Productos en almac&eacute;n
                        &lt;/th&gt;
                    &lt;/tr&gt;
                    &lt;tr&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Nombre producto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Cantidad
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Proyecto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Subproyecto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            N&uacute;mero de serie
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Cantidad a mover
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Acciones
                        &lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    @foreach (var v in ProductosDB)
                    {
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.Producto.Nombre
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.CantidadSolicitada
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.Proyecto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.SubProyecto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.Serialnumber
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                &lt;InputNumber class=&quot;w-[100px] h-fit p-2 rounded border border-slate-300/50&quot; min=&quot;0&quot; max=&quot;@v.Key.CantidadSolicitada&quot; @bind-Value=&quot;v.Value&quot;&gt;&lt;/InputNumber&gt;
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @if (v.Value &gt; 0)
                                {
                                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;()=&gt; MoveTo(v.Key.Id, v.Value)&quot;&gt;
                                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                            arrow_forward
                                        &lt;/span&gt;
                                    &lt;/button&gt;
                                }
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    }
                &lt;/tbody&gt;
            &lt;/table&gt;

            &lt;table class=&quot;col-span-6 table-auto rounded border border-collapse border-slate-300/50&quot;&gt;
                &lt;thead&gt;
                    &lt;tr&gt;
                        &lt;th colspan=&quot;7&quot; class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Productos a mover
                        &lt;/th&gt;
                    &lt;/tr&gt;
                    &lt;tr&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Nombre producto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Cantidad
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Proyecto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Subproyecto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            N&uacute;mero de serie
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Cantidad a mover
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Acciones
                        &lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    @foreach (var v in EditProductos)
                    {
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.Producto.Nombre
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.CantidadSolicitada
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.Proyecto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.SubProyecto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.Serialnumber
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                &lt;InputNumber class=&quot;w-[100px] h-fit p-2 rounded border border-slate-300/50&quot; min=&quot;0&quot; max=&quot;@v.Key.CantidadSolicitada&quot; @bind-Value=&quot;v.Value&quot;&gt;&lt;/InputNumber&gt;
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @if (v.Value &gt; 0)
                                {
                                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;()=&gt; MoveToAlmacen(v.Key.Id, v.Value)&quot;&gt;
                                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                            arrow_back
                                        &lt;/span&gt;
                                    &lt;/button&gt;
                                }
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    }
                &lt;/tbody&gt;
            &lt;/table&gt;

            &lt;div class=&quot;col-span-12 h-fit flex flex-wrap items-center justify-end gap-3&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-red-600 text-white&quot; @onclick=&quot;()=&gt; Close(false)&quot;&gt;Salir sin guardar&lt;/button&gt;
                &lt;button type=&quot;submit&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;
        }
    &lt;/form&gt;



    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        public string IdDestinatario { get; set; }
        [Parameter] public string IdAlmacen { get; set; }

        PaginatedResult&lt;E_ProductoAlmacen&gt; Productos { get; set; } = new();

        public List&lt;ProductoAlmacenHelper&gt; ProductosDB { get; set; } = new();
        public List&lt;ProductoAlmacenHelper&gt; EditProductos { get; set; } = new();

        public FiltersBase get { get; set; } = new()
            {
                PageNumber = 1,
                PageSize = 1000000,
                Search = &quot;&quot;
            };

        protected override async Task OnInitializedAsync()
        {
            await LoadApi();
        }

        public async Task LoadApi()
        {
            try
            {
            _main.IsLoading = true;

                    Productos = await _mongoContext.GetPaginatedProductosAlmacen(get, IdAlmacen);

                    foreach (var v in Productos.Documents)
                    {
                        ProductosDB.Add(new()
                            {
                                Key = v,
                                Value = 0
                            });
                    }

                    _main.IsLoading = false;
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_SendProducts&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);

                throw;
            }

        
        }

        public void MoveTo(string idProd, int cantidad)
        {
            if (cantidad &gt; ProductosDB.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada)
            {
                _snackbar.InsertSnackbar(new(&quot;La cantidad es superior a la que hay en el almac&eacute;n&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));

                return;
            }

            if (EditProductos.Count(x =&gt; x.Key.Id == idProd) &gt; 0)
            {
                EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada += cantidad;
            }
            else
            {
                var serializedProduct = JsonSerializer.Serialize(ProductosDB.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key);

                EditProductos.Add(new() { Key = JsonSerializer.Deserialize&lt;E_ProductoAlmacen&gt;(serializedProduct), Value = 0 });
                EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada = cantidad;
                EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.IdAlmacen = &quot;&quot;;
                EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.IdNodo = IdDestinatario;
            }

            ProductosDB.FirstOrDefault(x =&gt; x.Key.Id == idProd).Value = 0;

            ProductosDB.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada -= cantidad;
            InvokeAsync(StateHasChanged);
        }

        public void MoveToAlmacen(string idProd, int cantidad)
        {
            if (cantidad &gt; EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada)
            {
                _snackbar.InsertSnackbar(new(&quot;La cantidad es superior a la que hay movida&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));

                return;
            }

            EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada -= cantidad;
            EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Value = 0;

            if (EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada &lt;= 0)
            {
                EditProductos.Remove(EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd));
            }

            ProductosDB.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada += cantidad;
            InvokeAsync(StateHasChanged);
        }

        public async Task SaveAsync()
        {
            try
            {
                _main.IsLoading = true;

                        foreach (var v in EditProductos)
                        {
                            v.Key.Id = &quot;&quot;;
                            await _mongoContext.AddProductoAlmacen(v.Key);
                        }

                        foreach (var v in ProductosDB)
                        {
                            if (v.Key.CantidadSolicitada &gt; 0)
                                await _mongoContext.EditProductoAlmacen(v.Key);
                            else
                                await _mongoContext.DeleteOneProductoAlmacen(v.Key.Id);
                        }
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_SendProducts&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                
                _main.IsLoading = false;
            }
            

        //  var modal = _modal.ShowModal(typeof(M_CodigoAlbaran), new Dictionary&lt;string, object&gt;
        //      {
        //          { nameof(M_CodigoAlbaran.Productos), EditProductos.Select(x=&gt; x.Key).ToList()},
        //          { nameof(M_CodigoAlbaran.IdAlmacen), IdAlmacen},
        //          { nameof(M_CodigoAlbaran.DestinatarioAlmacen), false},
        //      }, FixedWidth: 60, CanClose: false);
        //
        //  modal.OnCloseModal += async (b) =&gt;
        //  {
        //      Close(true);
        //      _main.IsLoading = false;
        //  };
        }

        public class ProductoAlmacenHelper
        {
            public E_ProductoAlmacen Key { get; set; }
            public int Value { get; set; }
        }
    }
    `
  },
  {
    "ID": 6,
    "ServicesName": "M_SendProductsAlmacen",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Almacen/M_SendProductsAlmacen",
    "ServicesDescription": "",
    "Code": `
    @using System.Text.Json
    &lt;form class=&quot;w-full h-fit grid grid-cols-12 gap-3&quot; @onsubmit=&quot;SaveAsync&quot;&gt;
        &lt;div class=&quot;col-span-12 h-fit p-2 flex flex-wrap&quot;&gt;
            &lt;InputSelect class=&quot;w-[300px] h-fit p-2 rounded border border-slate-300/50&quot; @bind-Value=&quot;IdDestinatario&quot; placeholder=&quot;Almac&eacute;n destino...&quot;&gt;
                &lt;option value=&quot;&quot;&gt;Selecciona el almac&eacute;n&lt;/option&gt;

                @foreach (var v in Almacenes)
                {
                    &lt;option value=&quot;@v.Id&quot;&gt;@v.Nombre&lt;/option&gt;
                }
            &lt;/InputSelect&gt;
        &lt;/div&gt;

        @if (!string.IsNullOrEmpty(IdDestinatario))
        {
            &lt;table class=&quot;col-span-6 table-auto rounded border border-collapse border-slate-300/50&quot;&gt;
                &lt;thead&gt;
                    &lt;tr&gt;
                        &lt;th colspan=&quot;7&quot; class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Productos en almac&eacute;n
                        &lt;/th&gt;
                    &lt;/tr&gt;
                    &lt;tr&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Nombre producto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Cantidad
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Proyecto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Subproyecto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            N&uacute;mero de serie
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Cantidad a mover
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Acciones
                        &lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    @foreach (var v in ProductosDB)
                    {
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.Producto.Nombre
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.CantidadSolicitada
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.Proyecto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.SubProyecto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.Serialnumber
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                &lt;InputNumber class=&quot;w-[100px] h-fit p-2 rounded border border-slate-300/50&quot; min=&quot;0&quot; max=&quot;@v.Key.CantidadSolicitada&quot; @bind-Value=&quot;v.Value&quot;&gt;&lt;/InputNumber&gt;
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @if (v.Value &gt; 0)
                                {
                                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;()=&gt; MoveTo(v.Key.Id, v.Value)&quot;&gt;
                                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                            arrow_forward
                                        &lt;/span&gt;
                                    &lt;/button&gt;
                                }
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    }
                &lt;/tbody&gt;
            &lt;/table&gt;

            &lt;table class=&quot;col-span-6 table-auto rounded border border-collapse border-slate-300/50&quot;&gt;
                &lt;thead&gt;
                    &lt;tr&gt;
                        &lt;th colspan=&quot;7&quot; class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Productos a mover
                        &lt;/th&gt;
                    &lt;/tr&gt;
                    &lt;tr&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Nombre producto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Cantidad
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Proyecto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Subproyecto
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            N&uacute;mero de serie
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Cantidad a mover
                        &lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                            Acciones
                        &lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    @foreach (var v in EditProductos)
                    {
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.Producto.Nombre
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.CantidadSolicitada
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.Proyecto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.SubProyecto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @v.Key.Serialnumber
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                &lt;InputNumber class=&quot;w-[100px] h-fit p-2 rounded border border-slate-300/50&quot; min=&quot;0&quot; max=&quot;@v.Key.CantidadSolicitada&quot; @bind-Value=&quot;v.Value&quot;&gt;&lt;/InputNumber&gt;
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-slate-300/50 &quot;&gt;
                                @if (v.Value &gt; 0)
                                {
                                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;()=&gt; MoveToAlmacen(v.Key.Id, v.Value)&quot;&gt;
                                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                                            arrow_back
                                        &lt;/span&gt;
                                    &lt;/button&gt;
                                }
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    }
                &lt;/tbody&gt;
            &lt;/table&gt;

            &lt;div class=&quot;col-span-12 h-fit flex flex-wrap items-center justify-end gap-3&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-red-600 text-white&quot; @onclick=&quot;()=&gt; Close(false)&quot;&gt;Salir sin guardar&lt;/button&gt;
                &lt;button type=&quot;submit&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;
        }
    &lt;/form&gt;



    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        public string IdDestinatario { get; set; }
        [Parameter] public string IdAlmacen { get; set; }

        public List&lt;E_Almacen&gt; Almacenes { get; set; } = new();

        PaginatedResult&lt;E_ProductoAlmacen&gt; Productos { get; set; } = new();

        public List&lt;ProductoAlmacenHelper&gt; ProductosDB { get; set; } = new();
        public List&lt;ProductoAlmacenHelper&gt; EditProductos { get; set; } = new();

        public FiltersBase get { get; set; } = new()
            {
                PageNumber = 1,
                PageSize = 1000000,
                Search = &quot;&quot;
            };

        protected override async Task OnInitializedAsync()
        {
            await LoadApi();
        }

        public async Task LoadApi()
        {
            try
            {
                _main.IsLoading = true;

                        var almacenes = await _mongoContext.GetPaginatedAlmacen(new()
                            {
                                PageNumber = 1,
                                PageSize = 10000,
                                Search = &quot;&quot;
                            });

                        Almacenes = almacenes.Documents;

                        Productos = await _mongoContext.GetPaginatedProductosAlmacen(get, IdAlmacen);

                        foreach (var v in Productos.Documents)
                        {
                            ProductosDB.Add(new()
                                {
                                    Key = v,
                                    Value = 0
                                });
                        }
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_SendProductsAlmacen&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
            }
            

        
        }

        public void MoveTo(string idProd, int cantidad)
        {
            if (cantidad &gt; ProductosDB.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada)
            {
                _snackbar.InsertSnackbar(new(&quot;La cantidad es superior a la que hay en el almac&eacute;n&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));

                return;
            }

            if (EditProductos.Count(x =&gt; x.Key.Id == idProd) &gt; 0)
            {
                EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada += cantidad;
            }
            else
            {
                var serializedProduct = JsonSerializer.Serialize(ProductosDB.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key);

                EditProductos.Add(new() { Key = JsonSerializer.Deserialize&lt;E_ProductoAlmacen&gt;(serializedProduct), Value = 0 });
                EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada = cantidad;
                EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.IdAlmacen = IdDestinatario;
            }

            ProductosDB.FirstOrDefault(x =&gt; x.Key.Id == idProd).Value = 0;

            ProductosDB.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada -= cantidad;
            InvokeAsync(StateHasChanged);
        }

        public void MoveToAlmacen(string idProd, int cantidad)
        {
            if (cantidad &gt; EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada)
            {
                _snackbar.InsertSnackbar(new(&quot;La cantidad es superior a la que hay movida&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));

                return;
            }

            EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada -= cantidad;
            EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Value = 0;

            if (EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada &lt;= 0)
            {
                EditProductos.Remove(EditProductos.FirstOrDefault(x =&gt; x.Key.Id == idProd));
            }

            ProductosDB.FirstOrDefault(x =&gt; x.Key.Id == idProd).Key.CantidadSolicitada += cantidad;
            InvokeAsync(StateHasChanged);
        }

        public async Task SaveAsync()
        {
            try
            {
                _main.IsLoading = true;

                        foreach (var v in EditProductos)
                        {
                            v.Key.Id = &quot;&quot;;
                            await _mongoContext.AddProductoAlmacen(v.Key);
                        }

                        foreach (var v in ProductosDB)
                        {
                            if (v.Key.CantidadSolicitada &gt; 0)
                                await _mongoContext.EditProductoAlmacen(v.Key);
                            else
                                await _mongoContext.DeleteOneProductoAlmacen(v.Key.Id);
                        }
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_SendProductsAlmacen&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                
                _main.IsLoading = false;
            }
            

        //  var modal = _modal.ShowModal(typeof(M_CodigoAlbaran), new Dictionary&lt;string, object&gt;
        //      {
        //          { nameof(M_CodigoAlbaran.Productos), EditProductos.Select(x=&gt; x.Key).ToList()},
        //          { nameof(M_CodigoAlbaran.IdAlmacen), IdAlmacen},
        //          { nameof(M_CodigoAlbaran.DestinatarioAlmacen), true},
        //      }, FixedWidth: 60, CanClose: false);
        //
        //  modal.OnCloseModal += async (b) =&gt;
        //  {
        //      Close(true);
        //      _main.IsLoading = false;
        //  };
        }

        public class ProductoAlmacenHelper
        {
            public E_ProductoAlmacen Key { get; set; }
            public int Value { get; set; }
        }
    }
    `
  },
  {
    "ID": 7,
    "ServicesName": "M_CodigoAlbaran",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Compras/Modals/M_CodigoAlbaran",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;w-full h-fit flex flex-wrap items-center p-2&quot;&gt;
        &lt;p&gt;Se van a validar &lt;/p&gt;
        &lt;table&gt;
            &lt;thead&gt;
                &lt;tr&gt;
                    &lt;th&gt;
                        Producto
                    &lt;/th&gt;
                    &lt;th&gt;
                        Cantidad Recibida
                    &lt;/th&gt;
                &lt;/tr&gt;
            &lt;/thead&gt;
            &lt;tbody&gt;
                &lt;tr&gt;
                    @foreach (var pro in Compra.Productos)
                    {
                        &lt;td&gt;
                            @pro.Producto.Nombre
                        &lt;/td&gt;
                        &lt;td&gt;
                            @pro.CantidadRecibida
                        &lt;/td&gt;
                    }
                
                &lt;/tr&gt;
            
            &lt;/tbody&gt;
        
    &lt;/table&gt;
    &lt;/div&gt;
    &lt;div class=&quot;w-full h-fit flex flex-wrap items-center p-2&quot;&gt;
        &lt;input type=&quot;text&quot; class=&quot;w-full h-fit p-2 rounded border border-salte-300/50&quot; placeholder=&quot;Introduce el c&oacute;digo del albar&aacute;n&quot; @bind-value=&quot;CodigoAlbaran&quot; /&gt;
    &lt;/div&gt;

    &lt;div class=&quot;w-full h-fit flex flex-wrap items-center justify-end p-2&quot;&gt;

        @if (!string.IsNullOrEmpty(CodigoAlbaran))
        {
            &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;CloseWithAlbaran&quot;&gt;Guardar&lt;/button&gt;
        }
    &lt;/div&gt;

    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        [Parameter] public List&lt;E_ProductoAlmacen&gt; Productos { get; set; }
        [Parameter] public E_Compras Compra { get; set; }

        public string CodigoAlbaran = &quot;&quot;;

        void CloseWithAlbaran()
        { //
        // Compra.Albaranes.Add(new()
        //     {
        //         CodigoAlbaran = CodigoAlbaran,
        //         FechaAlbaranAnadido = DateTime.Now.ToString(&quot;dd-MM-yyyy HH:mm&quot;),
        //         ListadoProductosAlbaran = Productos
        //     });

            Close(true);
        }
    }
    `
  },
  {
    "ID": 8,
    "ServicesName": "M_ConfirmacionCompra",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Compras/Modals/M_ConfirmacionCompra",
    "ServicesDescription": "",
    "Code": `
    &lt;!-- Modal de confirmaci&oacute;n --&gt;

    @if (Motivo == &quot;ConfComp&quot;)
    {

        &lt;div class=&quot;bg-white p-6   w-100&quot;&gt;
            &lt;h3 class=&quot;text-xl font-semibold&quot;&gt;Confirmar acci&oacute;n&lt;/h3&gt;
            &lt;hr /&gt;
            @if (ValorComprobado)
            {
                &lt;p class=&quot;mt-4&quot;&gt; &lt;b&gt;*  @(char.ToUpper(Email[0]) + Email.Substring(1, Email.IndexOf('.') - 1).ToLower())&lt;/b&gt;, ya habias aprobado el gasto por: &lt;b&gt;@Total &euro;&lt;/b&gt;&lt;/p&gt;
                &lt;p class=&quot;mt-4&quot;&gt;&iquest;Confirmas el rechazo de la compra por tu parte?&lt;/p&gt;

            }
            else
            {
                &lt;p class=&quot;mt-4&quot;&gt; &lt;b&gt;*  @(char.ToUpper(Email[0]) + Email.Substring(1, Email.IndexOf('.') - 1).ToLower())&lt;/b&gt;, el total de la compra es: &lt;b&gt;@Total &euro;&lt;/b&gt;&lt;/p&gt;
                &lt;p class=&quot;mt-4&quot;&gt;&iquest;Confirmas la compra por tu parte?&lt;/p&gt;

            }
            &lt;div class=&quot;mt-6 flex justify-between&quot;&gt;
                &lt;button class=&quot;px-4 py-2 bg-green-500 text-white shadow-xl rounded&quot; @onclick=&quot;@(() =&gt; Confirmar(true))&quot;&gt;S&iacute;&lt;/button&gt;
                &lt;button class=&quot;px-4 py-2 bg-red-500 text-white shadow-xl rounded&quot; @onclick=&quot;@(() =&gt; Cancelar(false))&quot;&gt;No&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;


    }

    @if (Motivo == &quot;Aprobadores&quot;)
    {
        &lt;div class=&quot;bg-white p-6   w-100&quot;&gt;
            &lt;h3 class=&quot;text-xl font-semibold&quot;&gt;Confirmar acci&oacute;n&lt;/h3&gt;
            &lt;hr /&gt;
            @if (ValorComprobado)
            {
                &lt;p class=&quot;mt-4&quot;&gt;Solicitud de compra est&aacute; en &lt;b&gt;espera de aprobaci&oacute;n &lt;/b&gt;&lt;/p&gt;
                &lt;p class=&quot;mt-4&quot;&gt;&iquest;Confirmas devolver la compra a su &lt;b&gt;fase de edici&oacute;n&lt;/b&gt;?&lt;/p&gt;
                &lt;div class=&quot;mt-6 flex justify-between&quot;&gt;
                    &lt;button class=&quot;px-4 py-2 bg-green-500 text-white shadow-xl rounded&quot; @onclick=&quot;@(() =&gt; Confirmar(false))&quot;&gt;S&iacute;&lt;/button&gt;
                    &lt;button class=&quot;px-4 py-2 bg-red-500 text-white shadow-xl rounded&quot; @onclick=&quot;@(() =&gt; Cancelar(true))&quot;&gt;No&lt;/button&gt;
                &lt;/div&gt;

            }
            else
            {
                &lt;p class=&quot;mt-4&quot;&gt; &lt;b&gt;Esta compra requiere aprobaciones&lt;/b&gt;&lt;/p&gt;
                &lt;p class=&quot;mt-4&quot;&gt;&iquest;Confirmas que se solicite aprobaci&oacute;n?&lt;/p&gt;
                &lt;div class=&quot;mt-6 flex justify-between&quot;&gt;
                    &lt;button class=&quot;px-4 py-2 bg-green-500 text-white shadow-xl rounded&quot; @onclick=&quot;@(() =&gt; Confirmar(true))&quot;&gt;S&iacute;&lt;/button&gt;
                    &lt;button class=&quot;px-4 py-2 bg-red-500 text-white shadow-xl rounded&quot; @onclick=&quot;@(() =&gt; Cancelar(false))&quot;&gt;No&lt;/button&gt;
                &lt;/div&gt;

            }
        
        &lt;/div&gt;


    }

    @code {
        [Parameter] public EventCallback&lt;bool&gt; OnConfirm { get; set; }
        [CascadingParameter] private Action&lt;bool&gt; Close { get; set; }
        [Parameter]
        public string Motivo { get; set;  }
        [Parameter]
        public string Total { get; set; }
        [Parameter]
        public string Email { get; set; }
        [Parameter]
        public bool ValorComprobado { get; set; }

        protected override async Task OnInitializedAsync()
        {
        }

        public async Task Confirmar(bool confirmacion)
        {
            // Emitir el resultado de confirmaci&oacute;n
            await OnConfirm.InvokeAsync(confirmacion);
            Close(true);
        }

        public async Task Cancelar(bool confir)
        {
            await OnConfirm.InvokeAsync(confir);
            Close(true);
        }
    }
    `
  },
  {
    "ID": 9,
    "ServicesName": "M_ConfirmacionRecepcion",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Compras/Modals/M_ConfirmacionRecepcion",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;bg-white p-6 w-full&quot;&gt;
        &lt;h3 class=&quot;text-xl font-semibold&quot;&gt;Confirmar acci&oacute;n&lt;/h3&gt;
        &lt;hr class=&quot;my-2&quot; /&gt;

        &lt;p class=&quot;mt-4&quot;&gt;&lt;b&gt;*&lt;/b&gt; Se van a validar los siguientes elementos:&lt;/p&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap items-center p-2&quot;&gt;
            &lt;p class=&quot;mb-4&quot;&gt;C&oacute;digo Albar&aacute;n: | &lt;b&gt;@CodigoAlbaran&lt;/b&gt; |&lt;/p&gt;

            &lt;!-- Tabla --&gt;
            &lt;table class=&quot;table-auto w-full border border-gray-300&quot;&gt;
                &lt;thead&gt;
                    &lt;tr class=&quot;bg-gray-100 text-left&quot;&gt;
                        &lt;th class=&quot;border px-4 py-2&quot;&gt;Producto&lt;/th&gt;
                        &lt;th class=&quot;border px-4 py-2&quot;&gt;Cantidad Recibida&lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    @foreach (var pro in Compra.Productos)
                    {
                        &lt;tr class=&quot;hover:bg-gray-50&quot;&gt;
                            &lt;td class=&quot;border px-4 py-2&quot;&gt;@pro.Producto.Nombre&lt;/td&gt;
                            &lt;td class=&quot;border px-4 py-2&quot;&gt;@pro.CantidadRecibida&lt;/td&gt;
                        &lt;/tr&gt;
                    }
                &lt;/tbody&gt;
            &lt;/table&gt;
        &lt;/div&gt;

        &lt;div class=&quot;mt-6 flex justify-between&quot;&gt;
            &lt;button class=&quot;px-4 py-2 bg-green-500 text-white shadow-xl rounded hover:bg-green-600&quot;
                    @onclick=&quot;@(() =&gt; Confirmar(true))&quot;&gt;
                S&iacute;
            &lt;/button&gt;
            &lt;button class=&quot;px-4 py-2 bg-red-500 text-white shadow-xl rounded hover:bg-red-600&quot;
                    @onclick=&quot;@(() =&gt; Confirmar(false))&quot;&gt;
                No
            &lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;



    @code {
        [Parameter] public string CodigoAlbaran { get; set; }
        [Parameter] public EventCallback&lt;bool&gt; OnConfirm { get; set; }
        [CascadingParameter] private Action&lt;bool&gt; Close { get; set; }

        [Parameter]
        public E_Compras Compra { get; set; }
        


        public async Task Confirmar(bool confirmacion)
        {

            // Emitir el resultado de confirmaci&oacute;n
            await OnConfirm.InvokeAsync(confirmacion);
            Close(true);
        }
    }
    `
  },
  {
    "ID": 10,
    "ServicesName": "M_InformacionCompra",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Compras/Modals/M_InformacionCompra",
    "ServicesDescription": "",
    "Code": `
    @using static LPSGrupo.Components.Areas.RedFijaF.Logistica.Compras.Modals.M_ModifyCompra
    &lt;table class=&quot;w-full h-fit mt-8 table-auto rounded border border-slate-300/50 border-collapse&quot;&gt;
        &lt;thead&gt;
            &lt;tr&gt;
                &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                    Nombre producto
                &lt;/th&gt;
                &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                    C&oacute;digo producto
                &lt;/th&gt;
                &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                    Proveedor
                &lt;/th&gt;
                &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                    Precio
                &lt;/th&gt;
                &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                    Cantidad
                &lt;/th&gt;
            &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;
            @foreach (var v in ProductosCompra)
            {
                &lt;tr&gt;
                    &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                        &lt;span class=&quot;w-full h-fit&quot;&gt;
                            @v.Producto.Nombre
                        &lt;/span&gt;
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                        @v.Producto.CodigoProducto
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                        @v.NombreProveedor
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                        @v.Precio
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                        @v.CantidadSolicitada
                    &lt;/th&gt;
                &lt;/tr&gt;
            }
            &lt;tr&gt;
                &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                &lt;/th&gt;
                &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                &lt;/th&gt;
                &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                &lt;/th&gt;
                &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                    Total: @ProductosCompra.Sum(c =&gt; (c.Precio * c.CantidadSolicitada))
                &lt;/th&gt;
                &lt;th class=&quot;p-2 border border-slate-300/50 min-w-[150px]&quot;&gt;
                    Total: @ProductosCompra.Sum(c =&gt; c.CantidadSolicitada)
                &lt;/th&gt;
            &lt;/tr&gt;
        &lt;/tbody&gt;
    &lt;/table&gt;

    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }

        [Parameter] public List&lt;E_ProductoAlmacen&gt; ProductosCompra { get; set; }
    }
    `
  },
  {
    "ID": 11,
    "ServicesName": "M_Informe",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Compras/Modals/M_Informe",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;w-full h-fit flex flex-wrap items-center&quot;&gt;
        &lt;img src=&quot;../Images/Base/logoMulticolorAjustado.png&quot; class=&quot;w-[150px] h-auto&quot; /&gt;
    &lt;/div&gt;

    &lt;div class=&quot;w-full h-fit mt-6 grid grid-cols-12&quot;&gt;

        &lt;div class=&quot;col-span-6 h-fit flex flex-wrap&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400 font-bold&quot;&gt;
                @proveedor.NombreComercial
            &lt;/div&gt;

            &lt;div class=&quot;w-full&quot;&gt;
                @proveedor.NifCif
            &lt;/div&gt;
            &lt;div class=&quot;w-full&quot;&gt;
                @proveedor.Direccion
            &lt;/div&gt;
            &lt;div class=&quot;w-full&quot;&gt;
                @proveedor.Provincia
            &lt;/div&gt;
            &lt;div class=&quot;w-full&quot;&gt;
                @proveedor.Pais
            &lt;/div&gt;
            &lt;div class=&quot;w-full&quot;&gt;
                @proveedor.Telefono
            &lt;/div&gt;
            &lt;div class=&quot;w-full&quot;&gt;
                @proveedor.Email
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 h-fit flex flex-wrap justify-end&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400 font-bold text-end&quot;&gt;
                LPS Facilities S.L.
            &lt;/div&gt;

            &lt;div class=&quot;w-full text-end&quot;&gt;
                B72680077
            &lt;/div&gt;
            &lt;div class=&quot;w-full text-end&quot;&gt;
                CL del Haya 4
            &lt;/div&gt;
            &lt;div class=&quot;w-full text-end&quot;&gt;
                3&ordm; 1
            &lt;/div&gt;
            &lt;div class=&quot;w-full text-end&quot;&gt;
                28054 MADRID
            &lt;/div&gt;
            &lt;div class=&quot;w-full text-end&quot;&gt;
                645400662
            &lt;/div&gt;
            &lt;div class=&quot;w-full text-end&quot;&gt;
                juanantonio.garcia@lpsgrupo.com
            &lt;/div&gt;
        &lt;/div&gt;

    &lt;/div&gt;

    &lt;table class=&quot;w-full h-fit mt-12 table-auto&quot;&gt;
        &lt;thead&gt;
            &lt;tr class=&quot;bg-purple-500 text-white&quot;&gt;
                &lt;th class=&quot;p-2&quot;&gt;
                    C&oacute;digo
                &lt;/th&gt;

                &lt;th class=&quot;p-2&quot;&gt;
                    Concepto
                &lt;/th&gt;

                &lt;th class=&quot;p-2&quot;&gt;
                    Precio
                &lt;/th&gt;

                &lt;th class=&quot;p-2&quot;&gt;
                    Cantidad
                &lt;/th&gt;

                &lt;th class=&quot;p-2&quot;&gt;
                    Total
                &lt;/th&gt;
            &lt;/tr&gt;
        &lt;/thead&gt;

        &lt;tbody&gt;
            @foreach (var v in Albaran.ListadoProductosAlbaran)
            {
                &lt;tr&gt;
                    &lt;th class=&quot;p-2&quot;&gt;
                        @v.Producto.CodigoProducto
                    &lt;/th&gt;

                    &lt;th class=&quot;p-2&quot;&gt;
                        @v.Producto.Descripcion
                    &lt;/th&gt;

                    &lt;th class=&quot;p-2&quot;&gt;
                        @v.Precio &euro;
                    &lt;/th&gt;

                    &lt;th class=&quot;p-2&quot;&gt;
                        @v.Precio @v.Producto.Unidades
                    &lt;/th&gt;

                    &lt;th class=&quot;p-2&quot;&gt;
                        @(v.Precio* v.Unidades) &euro;
                    &lt;/th&gt;
                &lt;/tr&gt;
            }
        &lt;/tbody&gt;
    &lt;/table&gt;

    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        [Parameter] public string IdProveedor { get; set; }
        [Parameter] public List&lt;E_ProductoAlmacen&gt; Productos { get; set; }
        [Parameter] public E_Albaran Albaran { get; set; }
        E_Proveedor proveedor = new();

        protected override async Task OnInitializedAsync()
        {
            await LoadProveedor();
        }

        async Task LoadProveedor()
        {   try
            {
                    _main.IsLoading = true;
                    var resultProveedor = await _mongoContext.GetOneProveedor(IdProveedor);
                    proveedor = resultProveedor.Value;
            }
            catch (Exception e)
            {


                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_Informe&quot;, &quot;LoadProveedor&quot;, DateTime.UtcNow);

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
    "ServicesName": "M_ModifyCompra",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Compras/Modals/M_ModifyCompra",
    "ServicesDescription": "",
    "Code": `
    @using System.ComponentModel.DataAnnotations
    @using LogisticaData.Entities

    &lt;style&gt;
        .progress-container {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .progress-step {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 15px; /* Espaciado entre los pasos */
        }

        .rectangle {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f0f0f0;
            padding: 10px 20px; /* Espacio alrededor del texto */
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            color: #333;
            cursor: pointer;
            border-radius: 8px; /* Bordes redondeados para el rect&aacute;ngulo */
            transition: background-color 0.3s ease;
            white-space: nowrap; /* Evita el salto de l&iacute;nea en el texto */
            max-width: 200px; /* Limita el ancho m&aacute;ximo del rect&aacute;ngulo */
            overflow: hidden; /* Oculta el desbordamiento si el texto es muy largo */
            text-overflow: ellipsis; /* Muestra &quot;...&quot; si el texto es demasiado largo */
        }

            /* Rect&aacute;ngulo con estado completado */
            .rectangle.completed {
                background-color: #4CAF50; /* Verde para completado */
                color: white;
            }

        .progress-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
        }

        .progress-icon {
            width: 20px;
            height: 20px;
        }

        /* Asegurar que el nombre se ajuste dentro del rect&aacute;ngulo */
        .rectangle span {
            display: block;
            text-align: center;
        }

        /* Estilos de la flecha */
        .progress-arrow img {
            border-radius:50%;
            width: 20px;
            height: 20px;
            transition: filter 0.3s;
        }

        .progress-icon.green {
            filter: none;
        }

        .progress-icon.grey {
            filter: none;
        }

        .rectangle.paused {
            background-color: orange;
            cursor: not-allowed;
            opacity: 0.6;
            pointer-events: none; /* Evita cualquier interacci&oacute;n del usuario */
        }

            .rectangle.paused:hover {
                opacity: 1;
            }
    &lt;/style&gt;
    &lt;div class=&quot;authorization-container&quot;&gt;
        &lt;!-- T&iacute;tulo encima de los c&iacute;rculos --&gt;
        &lt;h2 class=&quot;authorization-title text-xl&quot;&gt;&lt;b&gt;Autorizaciones&lt;/b&gt;&lt;/h2&gt;
        &lt;hr style=&quot;margin-top:10px; margin-bottom:10px;&quot; /&gt;

        &lt;div class=&quot;progress-container&quot;&gt;

            @if (Compra.AprobacionesCompras.Any())
            {
                @foreach (var etapa in Compra.AprobacionesCompras)
                {
                
                    &lt;div class=&quot;progress-step&quot;&gt;
                        &lt;!-- Rect&aacute;ngulo con el nombre --&gt;
                        &lt;div class=&quot;rectangle @(etapa.Aprobador.Pausa ? &quot;paused&quot; : etapa.Aprobado ? &quot;completed&quot; : &quot;&quot;)&quot;
                            @onclick=&quot;@(etapa.Aprobador.Pausa ? null : () =&gt;  ConfirmarCompra(etapa.Aprobador.EmailAprobador, etapa.Aprobado))&quot;&gt;
                            &lt;!-- Nombre del aprobador --&gt;
                            @(char.ToUpper(etapa.Aprobador.EmailAprobador[0]) + etapa.Aprobador.EmailAprobador.Substring(1, etapa.Aprobador.EmailAprobador.IndexOf('.') - 1).ToLower())
                        &lt;/div&gt;
                    &lt;/div&gt;
                    @if (etapa.Aprobador.Pausa)
                    {

                        &lt;h3 style=&quot;color:coral&quot;&gt;&lt;b&gt;*  @(char.ToUpper(etapa.Aprobador.EmailAprobador[0]) + etapa.Aprobador.EmailAprobador.Substring(1, etapa.Aprobador.EmailAprobador.IndexOf('.') - 1).ToLower()) se encuentra de vacaciones&lt;/b&gt;&lt;/h3&gt;
                    }

                    &lt;!-- Flecha de progreso (icono) entre los rect&aacute;ngulos --&gt;
                    @if (!etapa.Equals(Compra.AprobacionesCompras.Last()))
                    {
                        &lt;div class=&quot;progress-arrow&quot;&gt;
                            &lt;img src=&quot;/Images/RedFija/arrow_right_alt.svg&quot; alt=&quot;Arrow&quot; class=&quot;progress-icon @(etapa.Aprobado ? &quot;green&quot; : &quot;grey&quot;)&quot;&gt;
                        &lt;/div&gt;
                    }
                }
            }
            else
            {
                &lt;div class=&quot;progress-step&quot;&gt;
                    &lt;div class=&quot;label&quot;&gt;No requiere autorizaci&oacute;n&lt;/div&gt;
                &lt;/div&gt;
            }
        &lt;/div&gt;


    &lt;/div&gt;

    &lt;hr /&gt;

    &lt;EditForm onmousemove=&quot;MoveImage(event)&quot; id=&quot;formCompra&quot; Model=&quot;Compra&quot; class=&quot;w-full h-fit min-h-[500px] mt-10 flex flex-wrap items-start gap-2&quot; OnValidSubmit=&quot;SaveAsync&quot; @ref=&quot;form&quot;&gt;
        &lt;div class=&quot;w-full h-fit flex flex-wrap items-start gap-3&quot;&gt;

            &lt;DataAnnotationsValidator /&gt;
            &lt;ValidationSummary class=&quot;text-red-600 text-sm&quot; /&gt;
        

            @if (Validator.TryValidateObject(Compra, new ValidationContext(Compra), new List&lt;ValidationResult&gt;()))
            {

                &lt;div class=&quot;w-full h-fit flex items-center justify-between gap-4&quot;&gt;

                    &lt;!-- Secci&oacute;n de botones y validaciones --&gt;
                    &lt;div class=&quot;flex items-center justify-between gap-2&quot;&gt;
                    
                        @if (Validator.TryValidateObject(Compra, new ValidationContext(Compra), new List&lt;ValidationResult&gt;()))
                        {
                            &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;FinalizarCompra&quot;&gt;
                                Finalizar compra
                            &lt;/button&gt;
                        }


                        @if (Compra.AprobacionesCompras.Any())
                        {


                            @if (Compra.Estados.Last().Estado != &quot;Esperando aprobadores&quot;)
                            {
                                &lt;button type=&quot;submit&quot; class=&quot;w-fit h-fit rounded p-2 bg-blue-400 text-white&quot;&gt;
                                    Guardar borrador
                                &lt;/button&gt;

                                &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;ModEstadoCompra&quot;&gt;
                                    Solicitar aprobaci&oacute;n
                                &lt;/button&gt;

                            }
                            else
                            {
                                &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit rounded p-2 bg-blue-600 text-white&quot; disable&gt;
                                    Guardar borrador
                                &lt;/button&gt;

                                &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;ModEstadoCompra&quot;&gt;
                                    Cancelar aprobaci&oacute;n
                                &lt;/button&gt;
                            }

                        }
                        else
                        {

                            &lt;button type=&quot;submit&quot; class=&quot;w-fit h-fit rounded p-2 bg-blue-400 text-white&quot;&gt;
                                Guardar borrador
                            &lt;/button&gt;
                        
                        }




                    


                

                        &lt;ValidationMessage For=&quot;()=&gt; Compra.IdAlmacen&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
                        &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;OpenModalInformacion&quot;&gt;
                            Ver datos de compra
                        &lt;/button&gt;
                    &lt;/div&gt;
            
                        &lt;div class=&quot;flex flex-col  text-xl text-gray-700&quot;&gt;
                            &lt;h2&gt;&lt;b&gt;@Almacen.Nombre&lt;/b&gt;&lt;/h2&gt;
                            &lt;hr /&gt;
                            &lt;span&gt;@Almacen.Direccion&lt;/span&gt;
                        &lt;/div&gt;
                
                    &lt;!-- Secci&oacute;n de informaci&oacute;n del proveedor --&gt;
                    &lt;div class=&quot;flex flex-col text-xl  &quot;&gt;
                        &lt;h2&gt;&lt;b&gt;Proveedor&lt;/b&gt;&lt;/h2&gt;
                        &lt;hr /&gt;
                        &lt;span&gt;@Compra.NombreComercialProveedor&lt;/span&gt;
                    &lt;/div&gt;

                    &lt;!-- Secci&oacute;n de autocompletar productos --&gt;
                    &lt;div class=&quot;flex flex-col items-start gap-2&quot;&gt;
                        &lt;Autocomplete T=&quot;E_Producto&quot;
                                    Database=&quot;@DatabaseIdentifiers.RedFija&quot;
                                    FilterMongo=&quot;@((s) =&gt; {
                                var builder = Builders&lt;E_Producto&gt;.Filter;
                                MongoDB.Driver.FilterDefinition&lt;E_Producto&gt; filter = null;

                                foreach (var v in s.Split('*').Where(x =&gt; !string.IsNullOrEmpty(x)))
                                {
                                    if (filter == null)
                                    {
                                        filter = builder.Regex(x =&gt; x.Nombre, new BsonRegularExpression(v, &quot;i&quot;));
                                    }
                                    else
                                    {
                                        filter |= builder.Regex(x =&gt; x.Nombre, new BsonRegularExpression(v, &quot;i&quot;));
                                    }
                                }
                                    // Filtro adicional para el proveedor
                                    var proveedorFilter = builder.ElemMatch(x =&gt; x.Proveedores,
                                        p =&gt; p.Proveedor.Id == Compra.IdProveedor);

                                    // Combinar filtros con &quot;AND&quot;
                                    filter = filter == null ? proveedorFilter : builder.And(filter, proveedorFilter);

                                    return filter;
                            })&quot;
                                    Placeholder=&quot;Buscar producto...&quot;
                                    ToString=&quot;@((x) =&gt; x.Nombre)&quot;
                                    Ignore MaxWidth=&quot;250&quot;
                                    SelectOne=&quot;@((x) =&gt; {
                                Compra.Productos.Add(new E_ProductoAlmacen
                                {
                                    Producto = x,
                                    IdProveedor = Compra.IdProveedor,
                                    IdAlmacen = Compra.IdAlmacen,             
                                    IdNodo = Compra.Productos.Select(x =&gt; x.IdNodo).FirstOrDefault(),
                                    Serialnumber = &quot;&quot;,
                                    Proyecto = Compra.Productos.Select(x =&gt; x.Proyecto).FirstOrDefault(),
                                    SubProyecto = Compra.Productos.Select(x =&gt; x.SubProyecto).FirstOrDefault(),
                                    CantidadSolicitada = 0,
                                    CantidadPendiente = 0,
                                    CantidadDisponible = 0,
                                    CantidadRecibida = 0,
                                    Precio = x.Proveedores.Where(h =&gt; h.Proveedor.Id == Compra.IdProveedor).Select( j =&gt; j.Valor).FirstOrDefault()
                                    
                                });
                                InvokeAsync(StateHasChanged);
                            })&quot;&gt;
                        &lt;/Autocomplete&gt;
                    &lt;/div&gt;

                &lt;/div&gt;
            

                &lt;table class=&quot;w-full table-auto rounded border border-gray-300 overflow-hidden&quot;&gt;
                    &lt;thead class=&quot;bg-gray-800 text-white&quot;&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Imagen Producto&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Nombre producto&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;C&oacute;digo producto&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Proyecto&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Subproyecto&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Precio&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Cantidad&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Total&lt;/th&gt;
                        
                            
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Acciones&lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var v in Compra.Productos)
                        {
                        
                            &lt;tr class=&quot;hover:bg-gray-100 odd:bg-gray-50 even:bg-white&quot;&gt;
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;
                                    &lt;img src=&quot;@($&quot;https://lpsgrupolatam.s3.sa-east-1.amazonaws.com/ImagenesProducto/{v.Producto.NameFile}&quot;)&quot;
                                        alt=&quot;@v.Producto.Nombre&quot;
                                        class=&quot;w-[250px] h-auto rounded&quot;&gt;
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;
                            
                                        @v.Producto.Nombre
                                
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;
                                    @v.Producto.CodigoProducto
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;
                                    @v.Proyecto
                                    &lt;!-- &lt;InputText class=&quot;w-full p-2 rounded border border-gray-300&quot; @bind-Value=&quot;v.Proyecto&quot;&gt;
                                    &lt;/InputText&gt;--&gt;
                                    &lt;ValidationMessage For=&quot;()=&gt; v.Proyecto&quot; class=&quot;text-red-600 text-sm&quot;&gt;&lt;/ValidationMessage&gt;
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;
                                    @v.IdNodo
                                    &lt;!-- &lt;InputText class=&quot;w-full p-2 rounded border border-gray-300&quot; @bind-Value=&quot;v.IdNodo&quot;&gt;
                                    &lt;/InputText&gt;--&gt;
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;

                                    &lt;InputNumber step=&quot;0.01&quot; class=&quot;w-full p-2 rounded border border-gray-300&quot;
                                                @bind-Value=&quot;v.Precio&quot;&gt;
                                    &lt;/InputNumber&gt;
                                
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;
                                
                                    &lt;InputNumber step=&quot;1&quot; class=&quot;w-full p-2 rounded border border-gray-300&quot; @bind-Value=&quot;v.CantidadSolicitada&quot;&gt;
                                    &lt;/InputNumber&gt;
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;
                                    @(v.CantidadSolicitada * v.Precio) &euro;
                                &lt;/td&gt;
                            
                            
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;
                                    @if (!string.IsNullOrEmpty(v.IdProveedor))
                                    {
                                        &lt;button type=&quot;button&quot;
                                                class=&quot;px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition&quot;
                                                @onclick=&quot;()=&gt;{Compra.Productos.Remove(v); InvokeAsync(StateHasChanged);}&quot;&gt;
                                            Eliminar
                                        &lt;/button&gt;
                                    }
                                &lt;/td&gt;
                            &lt;/tr&gt;
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;

            }

        &lt;/div&gt;

        &lt;div class=&quot;w-full p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;div class=&quot;w-full flex flex-wrap items-center&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot; p-2 rounded bg-blue-400 text-white&quot;
                        @onclick=&quot;@(() =&gt; Compra.Comentarios.Add(new() { Comentario = &quot;&quot;, Fecha=DateTime.Now, Id = _user.id, Name = $&quot;{_user.name} {_user.surname}&quot;, ProfilePic=_user.profilePic }))&quot;&gt;
                    A&ntilde;adir comentario
                &lt;/button&gt;
            &lt;/div&gt;

            &lt;div class=&quot;w-full flex flex-wrap gap-3 py-3&quot;&gt;
                @foreach (var vv in Compra.Comentarios)
                {
                    &lt;div class=&quot;w-full flex flex-wrap gap-2&quot;&gt;
                        @if (vv.Id == _user.id)
                        {
                            &lt;span class=&quot;w-full text-blue-400 text-sm flex flex-wrap justify-between items-center gap-3&quot;&gt;
                                &lt;div class=&quot;w-fit text-sm flex flex-wrap items-center gap-3&quot;&gt;
                                    &lt;div class=&quot;h-[40px] aspect-square rounded-full&quot; style=&quot;background-image: url(@(vv.ProfilePic)); background-size: cover;&quot;&gt;
                                    &lt;/div&gt;

                                    @($&quot;{vv.Name} - {vv.Fecha.ToRealLocalTime(_main.OffsetHoursTime):dd/MM/yyyy HH:mm:ss}&quot;)
                                &lt;/div&gt;

                                &lt;button type=&quot;button&quot; class=&quot;rounded bg-red-600 text-white py-0 px-1 w-fit h-fit&quot; @onclick=&quot;() =&gt; Compra.Comentarios.Remove(vv)&quot;&gt;
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

                                @($&quot;{vv.Name} - {vv.Fecha.ToRealLocalTime(_main.OffsetHoursTime):dd/MM/yyyy HH:mm:ss}&quot;)
                            &lt;/div&gt;
                        }

                        &lt;textarea class=&quot;w-full border border-slate-300/50 rounded p-2&quot; @bind=&quot;                vv.Comentario&quot;
                                readonly=&quot;@(vv.Id != _user.id)&quot;&gt;&lt;/textarea&gt;
                    &lt;/div&gt;
                }
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/EditForm&gt;



    @code {
        [Parameter]
        public EventCallback&lt;bool&gt; OnComplete { get; set; }

        private float? valorProveedor;
        private float totalCompra;

        private string emailAprobador;

        private int pasoActual = 0;

        private int[] CriteriosPredefinidos = {1000, 3000, 10000 };// Introducir de menor a mayor n&uacute;mero

        protected class ProductoCompra
        {
            public E_Producto Producto { get; set; }
            public string Proveedor { get; set; }
            public string NombreProveedor { get; set; }
            public float Precio { get; set; }
            public int Cantidad { get; set; }
        }

        private EditForm form { get; set; }

        [CascadingParameter] 
        public Action&lt;bool&gt; Close { get; set; }


        [Parameter]
        public E_Compras Compra { get; set; }

        private List&lt;ProductoCompra&gt; ProductosCompra { get; set; } = new();

        private E_Almacen Almacen { get; set; } = new();
        private E_ProyectosRedFija ProyectosRedFija { get; set; } = new();
        private E_SeguimientoE2E SubProyecto { get; set; } = new();

        private List&lt;E_Aprobador&gt; ListaAprobadores { get; set; } = new();
        private PaginatedResult&lt;E_Producto&gt; Productos { get; set; } = new();
        private FiltersBase filtersProductos { get; set; } = new()
        {
            PageNumber = 1,
            PageSize = 10,
            Search = &quot;&quot;
        };

        private FiltersBase filters { get; set; } = new()
        {
            PageNumber = 1,
            PageSize = 1000,
            Search = &quot;&quot;
        };

        string searchSet
        {
            get
            {
                return filtersProductos.Search;
            }
            set
            {
                filtersProductos.Search = value;

                LoadApi();
            }
        }


        protected override async Task OnInitializedAsync()
        {
            await LoadApi(); 
        }


        protected async Task ModEstadoCompra()
        {
            if (!Compra.AprobacionesCompras.All(x =&gt; x.Aprobador.Pausa == true))
            {


                // Cambia el estado de la compra para que puedan empezar las aprobaciones y envia el correo de aprobaci&oacute;n al primer aprobador.
                var modal = _modal.ShowModal(typeof(M_ConfirmacionCompra), new Dictionary&lt;string, object&gt;
            {
                {nameof(M_ConfirmacionCompra.Total), Compra.Productos.Sum(x =&gt; x.CantidadSolicitada * x.Producto.Proveedores.Where(d =&gt; d.Proveedor.Id == x.IdProveedor).Select( c =&gt; c.Valor).FirstOrDefault()).ToString()},
                {nameof(M_ConfirmacionCompra.ValorComprobado), Compra.Estados.Last().Estado == &quot;Esperando aprobadores&quot; ? true : false },
                {nameof(M_ConfirmacionCompra.Motivo), &quot;Aprobadores&quot; },
                { nameof(M_ConfirmacionCompra.OnConfirm),  EventCallback.Factory.Create&lt;bool&gt;(this,
                confirmacion =&gt; EnvioSolicitudAprobacion(confirmacion)) }
            }, FixedWidth: 20, MaxHeight: 50);

                modal.OnCloseModal += async (b) =&gt;
                {



                };
            }
            else
            {
                _snackbar.InsertSnackbar(new($&quot;Los aprobadores correspondientes, no se encuentran disponible en este momento&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                return;
            }

        }

        protected async Task EnvioSolicitudAprobacion(bool confirmacion)
        {
            var email = Compra.AprobacionesCompras
                .Where(x =&gt; !x.Aprobado &amp;&amp; !x.Aprobador.Pausa) // Filtrar los elementos donde Aprobado es false
                .Select(x =&gt; x.Aprobador.EmailAprobador) // Seleccionar solo el Email del Aprobador
                .FirstOrDefault();

            if (Compra.Estados.Last().Estado == &quot;Esperando aprobadores&quot; &amp;&amp; !confirmacion)
            {

                Compra.AprobacionesCompras.ForEach(x =&gt; x.Aprobado = false);
                Compra.Estados.Add(new()
                    {
                        Estado = &quot;Compra en curso&quot;,
                        Fecha = DateTime.Now,
                        UsuarioEstado = null
                    });

                await _mongoContext.EditCompras(Compra);
                await LoadApi();
                _snackbar.InsertSnackbar(new($&quot;Esta compra se encuentra de nuevo en curso&quot;, &quot;check&quot;, 5000, &quot;bg-teal-400&quot;, &quot;text-white&quot;));

                return;

            }


            if (Compra.AprobacionesCompras.Count &gt; 1 &amp;&amp; Compra.AprobacionesCompras.Where(x =&gt; x.Aprobador.Pausa == false ).FirstOrDefault().Aprobador.EmailAprobador != email &amp;&amp; Compra.Estados.Last().Estado == &quot;Esperando aprobadores&quot;  &amp;&amp; confirmacion)
            {

                await _mongoContext.EditCompras(Compra);

                await LoadApi();

                var link = $&quot;https://localhost:7138/logistica/compras?idCompra={Compra.Id}&amp;action=approve&quot;;

                var resultado = await SendMailAprobador.EnvioSolicitudAprobacion(email, link, Compra, _mail);

                if (resultado == &quot;0&quot;)
                {
                    _snackbar.InsertSnackbar(new($&quot;Enviado correo al aprobador {email}&quot;, &quot;check&quot;, 5000, &quot;bg-teal-400&quot;, &quot;text-white&quot;));

                }
                else
                {
                    _snackbar.InsertSnackbar(new($&quot;Error al enviar correo al aprobador: {resultado}&quot;, &quot;cancel&quot;, 5000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));

                }

                return;

            }



            if (Compra.Estados.Last().Estado != &quot;Esperando aprobadores&quot;  &amp;&amp; confirmacion == true)
            {


                Compra.Estados.Add(new()
                {
                    Estado = &quot;Esperando aprobadores&quot;,
                    Fecha = DateTime.Now,
                    UsuarioEstado = null
                });

                await _mongoContext.EditCompras(Compra);

                await LoadApi();
                // var link = $&quot;https://uf.lpsgrupo.dev/logistica/compras?idCompra={Compra.Id}&amp;action=approve&quot;;

                var link = $&quot;https://localhost:7138/logistica/compras?idCompra={Compra.Id}&amp;action=approve&quot;;

                var resultado = await SendMailAprobador.EnvioSolicitudAprobacion(&quot;cristian.baez@lpsgrupo.com&quot;, link, Compra, _mail);

                if (resultado == &quot;0&quot;)
                {
                    _snackbar.InsertSnackbar(new($&quot;Enviado correo al aprobador {email}&quot;, &quot;check&quot;, 5000, &quot;bg-teal-400&quot;, &quot;text-white&quot;));

                }
                else
                {
                    _snackbar.InsertSnackbar(new($&quot;Error al enviar correo al aprobador: {resultado}&quot;, &quot;cancel&quot;, 5000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));

                }

                return;

            }



        }

        private async Task ConfirmarCompra(string emailAprobador, bool aprobado)
        {

            if (Compra.Estados.Last().Estado == &quot;Esperando aprobadores&quot;)
            {
                if (_user.email == emailAprobador) {

                    totalCompra = Compra.Productos.Sum(x =&gt; x.CantidadSolicitada * x.Producto.Proveedores.Where(d =&gt; d.Proveedor.Id == x.IdProveedor).Select(c =&gt; c.Valor).FirstOrDefault());
                    var modal = _modal.ShowModal(typeof(M_ConfirmacionCompra), new Dictionary&lt;string, object&gt;
                    {
                        {nameof(M_ConfirmacionCompra.Total), totalCompra.ToString() },
                        {nameof(M_ConfirmacionCompra.Email), emailAprobador },
                        {nameof(M_ConfirmacionCompra.ValorComprobado), aprobado },
                        {nameof(M_ConfirmacionCompra.Motivo), &quot;ConfComp&quot; },
                        {nameof(M_ConfirmacionCompra.OnConfirm),  EventCallback.Factory.Create&lt;bool&gt;(this,
                        confirmacion =&gt; HandleConfirmacion(confirmacion, emailAprobador)) }
                    }, FixedWidth: 25, MaxHeight: 50);

                    modal.OnCloseModal += async (b) =&gt;
                    {


                    };
                    return;
                }
                else
                {
                    _snackbar.InsertSnackbar(new($&quot;Este punto de aprobaci&oacute;n, debe ser aprobado por {emailAprobador.ToUpper()}&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                    return;

                }

            }
            else
            {
                _snackbar.InsertSnackbar(new($&quot;Se requiere que se solicite la aprobaci&oacute;n de la compra para poder confirmar&quot;, &quot;cancel&quot;, 5000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                return;

            }

        }

        private async Task HandleConfirmacion(bool confirmacion, string emailAprobador)
        {
            if (confirmacion)
            {
                // Llamar al m&eacute;todo MarcarSiguientePaso si el usuario confirma
                await MarcarSiguientePaso(emailAprobador);


                await EnvioSolicitudAprobacion(confirmacion);

            }
        }

        private async Task MarcarSiguientePaso(string emailAprobador)
        {
            // Buscar la etapa correspondiente al email del aprobador
            var etapaActual = Compra.AprobacionesCompras.FirstOrDefault(e =&gt; e.Aprobador.EmailAprobador == emailAprobador);

            if (etapaActual != null)
            {
                // Obtener el &iacute;ndice de la etapa actual
                var indexActual = Compra.AprobacionesCompras.IndexOf(etapaActual);

                // Si intentamos aprobar (cambiar de false a true)
                if (!etapaActual.Aprobado)
                {
                    // Validar las etapas anteriores, excluyendo las que est&aacute;n en pausa
                    var etapasAnteriores = Compra.AprobacionesCompras
                        .Take(indexActual) // Considerar solo las etapas anteriores
                        .Where(e =&gt; !e.Aprobador.Pausa) // Ignorar las etapas en pausa
                        .ToList();

                    // Si existe alguna etapa anterior sin aprobar, mostrar error
                    if (etapasAnteriores.Any() &amp;&amp; etapasAnteriores.Any(e =&gt; !e.Aprobado))
                    {
                        _snackbar.InsertSnackbar(new($&quot;{emailAprobador} no puede aprobar hasta que las etapas anteriores est&eacute;n aprobadas&quot;, &quot;cancel&quot;, 5000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                        return;
                    }
                }

                // Alternar el valor de Aprobado
                etapaActual.Aprobado = !etapaActual.Aprobado;

                // Guardar el cambio en la base de datos
                var resultado = await _mongoContext.EditCompras(Compra);
                if (resultado.IsSuccess)
                {
                    var accion = etapaActual.Aprobado ? &quot;realizada con &eacute;xito&quot; : &quot;desaprobada con &eacute;xito&quot;;
                    _snackbar.InsertSnackbar(new($&quot;Aprobaci&oacute;n de {emailAprobador} {accion}&quot;, &quot;check&quot;, 5000, &quot;bg-teal-400&quot;, &quot;text-white&quot;));

                    // Obtener la compra actualizada
                    var result = await _mongoContext.GetOneCompra(Compra.Id);
                    Compra = result.Value;

                    // Actualizar la interfaz de usuario
                    StateHasChanged();
                }
                else
                {
                    _snackbar.InsertSnackbar(new(&quot;Algo sali&oacute; mal al procesar la aprobaci&oacute;n&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                }
            }
            else
            {
                _snackbar.InsertSnackbar(new($&quot;No se encontr&oacute; al aprobador con email {emailAprobador}&quot;, &quot;cancel&quot;, 5000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
            }
        }

        public async Task VolcarProductosStock(E_Compras compra)
        {


            foreach (var item in compra.Productos)
            {
                item.Producto.ListaNumSeries = new List&lt;string&gt;();
                E_ProductosStock productoStock = new()
                {   
                    IdCompra = compra.Id,
                    IdProductoAlmacen = item.Id,
                    IdProyecto = item.Proyecto,
                    NombreProyecto = ProyectosRedFija.NombreProyecto,
                    IdSubProyecto = item.SubProyecto,
                    NombreSubProyecto = SubProyecto.Titulo,
                    IdAlmacen = item.IdAlmacen,
                    NombreAlmacen = Almacen.Nombre,
                    IdProveedor = item.IdProveedor,
                    NombreProveedor = item.Producto.Proveedores.Where(f =&gt; f.Proveedor.Id == item.IdProveedor).Select( h =&gt; h.Proveedor.NombreComercial).FirstOrDefault(),
                    ProductoEnStock = item.Producto,
                    CantidadDisponible = 0,
                    PrecioFinal = item.Precio
                    

                };

                try
                {
                    await _mongoContext.AddProductoStock(productoStock);
                }
                catch (Exception e)
                {
                    
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_ModifyCompra&quot;, &quot;VolcarProductosStock&quot;, DateTime.UtcNow);

                    throw;
                }
            

            }


        }

        public async Task LoadApi()
        {   
            
            try
            {
                _main.IsLoading = true;

                        if (!string.IsNullOrEmpty(this.Compra.IdAlmacen))
                        {

                            var almacen = await _mongoContext.GetOneAlmacen(Compra.IdAlmacen);

                            Almacen = almacen.Value;

                            var proyect = await _mongoContext.GetOneProyectosRedFija(Compra.IdProyecto);

                            ProyectosRedFija = proyect.Value;

                            var subPro = await _mongoContext.GetOneSeguimientoFibra(Compra.IdObraE2E);

                            SubProyecto = subPro.Value;




                            foreach (var aprobacionCompra in Compra.AprobacionesCompras)
                            {
                                // Buscar el aprobador correspondiente en la base de datos
                                var aprobadorDbResult = await _mongoContext.GetOneAprobador(aprobacionCompra.Aprobador.Id);

                                if (aprobadorDbResult.IsSuccess)
                                {
                                    // Igualar el E_Aprobador de la base de datos al actual
                                    aprobacionCompra.Aprobador = aprobadorDbResult.Value;
                                }
                            }
                            Compra.AprobacionesCompras = Compra.AprobacionesCompras.OrderBy(x =&gt; x.Aprobador.Prioridad).ToList();

                        }

                        await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {


                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_ModifyCompra&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
            }
            

            
        }


        protected async Task ChangeProveedor(ChangeEventArgs e, ProductoCompra productoAdd)
        {
            if (e.Value == null) { productoAdd.Precio = 0; productoAdd.Proveedor = &quot;&quot;; return; }
            if (string.IsNullOrEmpty(e.Value.ToString())) { productoAdd.Precio = 0; productoAdd.Proveedor = &quot;&quot;; return; }

            await Task.Delay(100);

            var proveedor = Productos.Documents.First(x =&gt; x.Id == productoAdd.Producto.Id).Proveedores.First(c =&gt; c.Proveedor.Id == e.Value.ToString());

            productoAdd.NombreProveedor = proveedor.Proveedor.NombreComercial;
            productoAdd.Precio = proveedor.Valor;

            await InvokeAsync(StateHasChanged);
        }

        //protected void A&ntilde;adirACompra(ProductoCompra productoAdd)
        //{
        //    Compra.Productos.Add(new E_ProductoAlmacen
        //        {
        //            CantidadSolicitada = productoAdd.Cantidad,
        //            Precio = productoAdd.Precio,
        //            Producto = productoAdd.Producto,
        //            IdProveedor = productoAdd.Proveedor,
        //            NombreProveedor = productoAdd.NombreProveedor
        //        });
        //
        //    productoAdd.Cantidad = 0;
        //    productoAdd.Precio = 0;
        //    productoAdd.Proveedor = &quot;&quot;;
        //
        //    InvokeAsync(StateHasChanged);
        //}

        public async Task FinalizarCompra()
        {
            if (Validator.TryValidateObject(Compra, new ValidationContext(Compra), new List&lt;ValidationResult&gt;()))
            {
                if (Compra.AprobacionesCompras.All(x =&gt; x.Aprobador.Pausa != true &amp;&amp; x.Aprobado == true)) 
                {

                    Compra.Estados.Add(new()
                        {
                            Estado = &quot;En espera de material&quot;,
                            Fecha = DateTime.Now,
                            UsuarioEstado = null
                        });

                    Compra.Validated = new();
                    foreach (var v in Compra.Productos)
                    {
                        Compra.Validated.Add(false);
                    }

                    await VolcarProductosStock(Compra);
                    await form.OnValidSubmit.InvokeAsync();
                } 
                else
                {
                    _snackbar.InsertSnackbar(new($&quot;Faltan aprobadores por confirmar&quot;, &quot;cancel&quot;, 5000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                }
            }
        }

        public void OpenModalInformacion()
        {
            var modal = _modal.ShowModal(typeof(M_InformacionCompra), new Dictionary&lt;string, object&gt;
            {
            {nameof(M_InformacionCompra.ProductosCompra), Compra.Productos}
            }, FixedWidth: 60);

            modal.OnCloseModal += (b) =&gt;
            {

            };
        }

        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            foreach (var v in Compra.Productos)
            {
                var results = new List&lt;ValidationResult&gt;();
                if (!Validator.TryValidateObject(v, new ValidationContext(v), results))
                {
                    foreach(var vv in results)
                    {
                        _snackbar.InsertSnackbar(new($&quot;{vv.ErrorMessage} en el producto {v.Producto.Nombre}&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                    }
                    return;
                }
            }
            Compra.EnRecalculo = true;
            try
            {
            await _mongoContext.EditCompras(Compra);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_ModifyCompra&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                await CerrarModal();
                _main.IsLoading = false;
            }
        
        }
        public async Task CerrarModal()
        {
            await OnComplete.InvokeAsync(true);
            await Task.Delay(1000);
            Close(true);

        }
    }
    `
  },
  {
    "ID": 13,
    "ServicesName": "M_NuevaCompra",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Compras/Modals/M_NuevaCompra",
    "ServicesDescription": "",
    "Code": `
    @using System.Text.RegularExpressions
    @using LogisticaData.Entities

    &lt;div class=&quot;bg-white w-full max-w-4xl p-6&quot;&gt;
        &lt;!-- T&iacute;tulo del Modal --&gt;
        &lt;div class=&quot;flex justify-between items-center border-none pb-3 mb-4&quot;&gt;
            &lt;h2 class=&quot;text-xl font-semibold text-gray-700&quot;&gt;Registrar nueva compra para &lt;b&gt;E2E&lt;/b&gt;&lt;/h2&gt;
        &lt;/div&gt;

        &lt;!-- Grid para a&ntilde;adir compra --&gt;
        &lt;div class=&quot;grid grid-cols-5 gap-4&quot;&gt;
            &lt;div&gt;
                &lt;label class=&quot;block text-sm font-medium text-gray-700&quot;&gt;Proyectos&lt;/label&gt;
                &lt;select class=&quot;w-full p-2 border border-gray-300 rounded bg-white&quot; @bind=&quot;IdProyecto&quot; disabled=&quot;@EsProyectoBloqueado&quot;&gt;
                    &lt;option value=&quot;&quot; disabled selected&gt;Proyectos&lt;/option&gt;
                    @if (ListadoProyectosRedFija.Any())
                    {
                        foreach (var item in ListadoProyectosRedFija)
                        {
                            &lt;option value=&quot;@item.Id&quot;&gt;@item.NombreProyecto&lt;/option&gt;
                        }
                    }
                &lt;/select&gt;
            &lt;/div&gt;
            &lt;div&gt;
                &lt;label class=&quot;block text-sm font-medium text-gray-700&quot;&gt;Obras E2E&lt;/label&gt;
                &lt;select class=&quot;w-full p-2 border border-gray-300 rounded bg-white&quot; @bind=&quot;IdObraE2E&quot; disabled=&quot;@EsObraBloqueada&quot;&gt;
                    &lt;option value=&quot;&quot; disabled selected&gt;Obras E2E&lt;/option&gt;
                    @if (ListadoObrasE2E.Any())
                    {
                        foreach (var item in ListadoObrasE2E)
                        {
                            &lt;option value=&quot;@item.Id&quot;&gt;@item.CodigoGSER &lt;b&gt;|-|&lt;/b&gt; @item.Titulo&lt;/option&gt;
                        }
                    }
                &lt;/select&gt;
            &lt;/div&gt;
            @*---------------------------------------------------------------------------------------------*@
            &lt;div&gt;
                &lt;label class=&quot;block text-sm font-medium text-gray-700&quot;&gt;Almacen&lt;/label&gt;
                &lt;select class=&quot;w-full p-2 border border-gray-300 rounded bg-white&quot; @bind=&quot;IdAlmacen&quot; disabled=&quot;@EsAlmacenBloqueado&quot;&gt;
                    &lt;option value=&quot;&quot; disabled selected&gt;Almacenes&lt;/option&gt;
                    @if (ListadoAlmacenes.Any())
                    {
                        foreach (var item in ListadoAlmacenes)
                        {
                            &lt;option value=&quot;@item.Id&quot;&gt;@item.Nombre&lt;/option&gt;
                        }
                    }
                &lt;/select&gt;
            &lt;/div&gt;
            &lt;div&gt;
                &lt;label class=&quot;block text-sm font-medium text-gray-700&quot;&gt;Proveedor&lt;/label&gt;
                &lt;select class=&quot;w-full p-2 border border-gray-300 rounded bg-white&quot; @onchange=&quot;@((e) =&gt; FiltrarProductos(e.Value.ToString()))&quot; disabled=&quot;@EsProveedorBloqueada&quot;&gt;
                    &lt;option value=&quot;&quot; disabled selected&gt;Proveedores&lt;/option&gt;
                    @if (ListadoProveedores.Any())
                    {
                        foreach (var item in ListadoProveedores)
                        {
                            &lt;option value=&quot;@item.Id&quot;&gt;@item.NombreComercial&lt;/option&gt;
                        }
                    }
                &lt;/select&gt;
            &lt;/div&gt;
            &lt;div&gt;
                &lt;label class=&quot;block text-sm font-medium text-gray-700&quot;&gt;Producto&lt;/label&gt;
                &lt;select class=&quot;w-full p-2 border border-gray-300 rounded bg-white&quot; @bind=&quot;IdProducto&quot;&gt;
                    &lt;option value=&quot;&quot; disabled selected&gt;Productos&lt;/option&gt;
                    @if (ListadoProductos.Any())
                    {
                        foreach (var item in ListadoProductos)
                        {
                            &lt;option value=&quot;@item.Id&quot;&gt;@item.Nombre&lt;/option&gt;
                        }
                    }
                &lt;/select&gt;
            &lt;/div&gt;



            &lt;div&gt;
                &lt;label class=&quot;block text-sm font-medium text-gray-700&quot;&gt;Cantidad&lt;/label&gt;
                &lt;input type=&quot;number&quot; class=&quot;w-full p-2 border border-gray-300 rounded&quot; placeholder=&quot;Cantidad&quot; @bind=&quot;CantidadProducto&quot;&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;!-- Bot&oacute;n para a&ntilde;adir --&gt;
        &lt;div class=&quot;flex justify-end mt-4&quot;&gt;
            &lt;button class=&quot;px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600&quot; @onclick=&quot;AgregarCompra&quot;&gt;A&ntilde;adir&lt;/button&gt;
        &lt;/div&gt;

        &lt;!-- Listado de compras --&gt;
        &lt;div class=&quot;mt-6&quot;&gt;
            &lt;h3 class=&quot;text-lg font-semibold text-gray-700 mb-3&quot;&gt;Listado de Compras&lt;/h3&gt;
            &lt;table class=&quot;w-full border-collapse border border-gray-300&quot;&gt;
                &lt;thead&gt;
                    &lt;tr class=&quot;bg-gray-200&quot;&gt;

                        &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;Proveedor&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;Producto&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;Cod.Producto&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;Cantidad&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;Total&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;Acciones&lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    @foreach (var compra in CompraARegistrar.Productos)
                    {
                        &lt;tr&gt;

                            &lt;td class=&quot;border border-gray-300 p-2&quot;&gt;@ListadoProveedores.Where(l =&gt; l.Id == compra.IdProveedor).Select(ll =&gt; ll.NombreComercial).FirstOrDefault()&lt;/td&gt;
                            &lt;td class=&quot;border border-gray-300 p-2&quot;&gt;@compra.Producto.Nombre&lt;/td&gt;
                            &lt;td class=&quot;border border-gray-300 p-2&quot;&gt;@compra.Producto.CodigoProducto&lt;/td&gt;
                            &lt;td class=&quot;border border-gray-300 p-2&quot;&gt;@compra.CantidadSolicitada&lt;/td&gt;
                            &lt;td class=&quot;border border-gray-300 p-2&quot;&gt;@(compra.CantidadSolicitada * compra.Producto.Proveedores.Where(p =&gt; p.Proveedor.Id == compra.IdProveedor).Select( v =&gt; v.Valor).FirstOrDefault())&lt;/td&gt;
                            &lt;td class=&quot;border border-gray-300 p-2&quot;&gt;
                                &lt;button class=&quot;px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600&quot; @onclick=&quot;() =&gt; EliminarCompra(compra)&quot;&gt;Eliminar&lt;/button&gt;
                            &lt;/td&gt;
                        &lt;/tr&gt;
                    }
                &lt;/tbody&gt;
            &lt;/table&gt;
        &lt;/div&gt;

        &lt;!-- Botones --&gt;
        &lt;div class=&quot;flex justify-end mt-6 space-x-4&quot;&gt;
            &lt;button class=&quot;px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400&quot; @onclick=&quot;CerrarModal&quot;&gt;Cancelar&lt;/button&gt;
            &lt;button class=&quot;px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600&quot; @onclick=&quot;GuardarCompras&quot;&gt;Guardar&lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;style&gt;


        select:disabled {
        background-color: #d3d3d3; /* Color de fondo para campos deshabilitados */
        cursor: not-allowed; /* Cambia el cursor para mostrar que est&aacute; deshabilitado */
        }
    &lt;/style&gt;


    @code {

        private bool EsObraBloqueada { get; set; } = false;
        private bool EsProveedorBloqueada { get; set; } = false;
        private bool EsProyectoBloqueado { get; set; } = false;
        private bool EsAlmacenBloqueado { get; set; } = false;

        private string IdAlmacen { get; set;  }
        private string IdObraE2E { get; set; }
        private string IdProveedorSeleccionado { get; set; }
        private string IdProyecto { get; set; }
        private string IdProducto { get; set; }

        [Parameter]
        public string IdAlmacenCompraSolicitada { get; set; }
        [Parameter]
        public string IdObraE2ECompraSolicitada { get; set; }
        [Parameter]
        public string IdProyectoCompraSolicitada { get; set; }


        private int CantidadProducto { get; set; }
        private string CodigoProductoSeleccionado { get; set; }
        private E_Compras CompraARegistrar { get; set; } = new();
        private E_ProductoAlmacen ProductoCompra { get; set;} 

        [CascadingParameter] private Action&lt;bool&gt; Close { get; set; }

        [Parameter]
        public EventCallback&lt;bool&gt; OnComplete { get; set; }
        private List&lt;E_Proveedor&gt; ListadoProveedores { get; set; } = new();
        private List&lt;E_Producto&gt; ListadoProductos { get; set; } = new();
        private List&lt;E_Almacen&gt; ListadoAlmacenes { get; set; } = new();
        private List&lt;E_SeguimientoE2E&gt; ListadoObrasE2E { get; set; } = new();
        private List&lt;E_ProductoAlmacen&gt; ListadoProductoAlmacen { get; set; } = new();
        private List&lt;E_ProyectosRedFija&gt; ListadoProyectosRedFija { get; set; } = new();

        // private List&lt;E_Aprobador&gt; ListaAprobadores { get; set; } = new();


        private PaginatedResult&lt;E_Almacen&gt; Almacenes { get; set; } = new();
        private PaginatedResult&lt;E_Producto&gt; Productos { get; set; } = new();
        private PaginatedResult&lt;E_Proveedor&gt; Proveedores { get; set; } = new();
        private PaginatedResult&lt;E_SeguimientoE2E&gt; Obras { get; set; } = new();
        private PaginatedResult&lt;E_ProyectosRedFija&gt; Proyectos { get; set; } = new();


        private FiltersBase filters = new()
            {
                PageNumber = 1,
                PageSize = 10000,
                Search = &quot;&quot;
            };

        private GetPaginatedSeguimientoE2EDTORequest filtroSeguimientoE2E = new()
        {
                Search = &quot;&quot;,
                PageNumber = 1,
                PageSize = 1000000


        };





        private void FiltrarProductos(string proveedorId)
        {
            IdProveedorSeleccionado = proveedorId;

            if (!string.IsNullOrWhiteSpace(IdProveedorSeleccionado))
            {
                // Filtrar productos por el proveedor seleccionado
                ListadoProductos = Productos.Documents
                    .Where(producto =&gt; producto.Proveedores != null &amp;&amp; producto.Proveedores.Any(p =&gt; p.Proveedor != null &amp;&amp; p.Proveedor.Id == IdProveedorSeleccionado))
                    .ToList();
            }
            else
            {
                ListadoProductos = Productos.Documents;
            }
        }

        protected override async Task OnInitializedAsync()
        {


            if(IdObraE2ECompraSolicitada != null)
            {
                IdObraE2E = IdObraE2ECompraSolicitada;
                EsObraBloqueada = true;
            }

            if(IdProyectoCompraSolicitada != null)
            {
                IdProyecto = IdProyectoCompraSolicitada;
                EsProyectoBloqueado = true;
            }


            await LoadAPI();

        }

        public async Task GenerarAlbaranPedidoCompra()
        {


            var nuevoAlbaran = new E_Albaran
                {
                    CodigoAlbaran = await GenerarCodigoAlbaran(),
                    FechaAlbaranAnadido = DateTime.Now.ToString(&quot;dd-MM-yyyy HH:mm&quot;),
                    IdAlmacen = CompraARegistrar.IdAlmacen,
                    IdObraE2E = CompraARegistrar.IdObraE2E,
                    IdProyecto = CompraARegistrar.IdProyecto,
                    Tipo = &quot;Compra&quot;,
                    CodigoAlbaranEntrega = CompraARegistrar.CodigoAlbaranEntrada ?? &quot;&quot;,
                    ListadoProductosAlbaran = new List&lt;E_Albaran.E_ProductoAlbaran&gt;() // Inicializa la lista
                };


            // Rellena la lista de productos en el albar&aacute;n
            foreach (var producto in CompraARegistrar.Productos)
            {
                var productoAlbaran = new E_Albaran.E_ProductoAlbaran
                    {
                        Producto = producto.Producto,
                        Proveedor = CompraARegistrar.Productos
                        .SelectMany(ff =&gt; ff.Producto.Proveedores) // Aplanamos la lista de proveedores
                        .Where(aa =&gt; aa.Proveedor.Id == CompraARegistrar.IdProveedor) // Filtramos por el proveedor correcto
                        .Select(zz =&gt; zz.Proveedor) // Seleccionamos el proveedor
                        .FirstOrDefault(),// Tomamos el primero si existe
                        CodigoProducto = producto.Producto.CodigoProducto,
                        Concepto = &quot;&quot;,
                        Precio = producto.Precio,
                        Unidades = producto.CantidadSolicitada

                    };

                nuevoAlbaran.ListadoProductosAlbaran.Add(productoAlbaran);

            }

            CompraARegistrar.Albaranes.Add(nuevoAlbaran);

        }

        public async Task&lt;string&gt; GenerarCodigoAlbaran()
        {   
            
            try
            {
            // Obtener el n&uacute;mero m&aacute;s alto encontrado en la colecci&oacute;n
                    var resultado = await _mongoContext.GetMaxNumeroEnCodigoAlbaranCompra(&quot;Compra&quot;);

                    int nuevoNumero = resultado.IsSuccess ? resultado.Value + 1 : 1; // Si no hay registros, empezamos en 1

                    // Obtener el a&ntilde;o y mes actual
                    string anio = DateTime.UtcNow.ToString(&quot;yy&quot;);  // A&ntilde;o en formato &quot;aa&quot;
                    string mes = DateTime.UtcNow.ToString(&quot;MM&quot;);   // Mes en formato &quot;mm&quot;

                    // Construir el c&oacute;digo con el formato &quot;ALB-aa-mm-xxx&quot;
                    string nuevoCodigo = $&quot;PC-{anio}-{mes}-{nuevoNumero:D4}&quot;; //:D4 asegura que el n&uacute;mero siempre tenga 4 digitos

                    return nuevoCodigo;
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_NuevaCompra&quot;, &quot;GenerarCodigoAlbaran&quot;, DateTime.UtcNow);

                throw;
            }
        
        }

        private void AgregarCompra()
        {

            if (string.IsNullOrEmpty(IdProyecto) &amp;&amp; !EsProyectoBloqueado)
            {
                _snackbar.InsertSnackbar(new(&quot;Se tiene que seleccionar el proyecto correspondiente para la compra&quot;, &quot;cancel&quot;, 7000, &quot;bg-red-600&quot;, &quot;text-white&quot;));

                return;
            }

            if (string.IsNullOrEmpty(IdObraE2E) &amp;&amp; !EsObraBloqueada)
            {
                _snackbar.InsertSnackbar(new(&quot;Se tiene que seleccionar una Obra/Subproyecto&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));

                return;
            }



            if (string.IsNullOrEmpty(IdProveedorSeleccionado) &amp;&amp; !EsProveedorBloqueada)
            {
                _snackbar.InsertSnackbar(new(&quot;Se tiene que seleccionar un proveedor&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));

                return;
            }

            if (string.IsNullOrEmpty(IdProducto))
            {
                _snackbar.InsertSnackbar(new(&quot;Se tiene que seleccionar un producto&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));

                return;
            }

            if (string.IsNullOrEmpty(IdAlmacen))
            {
                _snackbar.InsertSnackbar(new(&quot;Se tiene que seleccionar un almacen&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));

                return;
            }

            if (CantidadProducto &lt;= 0)
            {
                _snackbar.InsertSnackbar(new(&quot;Se tiene que indicar una cantidad&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));

                return;
            }


            //Esto es para mantener el Proveedor y la Obra fijada una vez seleccionada en la primera linea de compra
            EsObraBloqueada = true;
            EsProveedorBloqueada = true;
            EsProyectoBloqueado = true;
            EsAlmacenBloqueado = true;

            // Verificar si el producto ya existe en la lista
            var productoExistente = CompraARegistrar.Productos
                .FirstOrDefault(p =&gt; p.Producto.Id == IdProducto &amp;&amp; p.IdAlmacen == IdAlmacen);


            if (productoExistente != null)
            {
                // Si el producto ya existe, aumenta la cantidad
                productoExistente.CantidadSolicitada += CantidadProducto;
                _snackbar.InsertSnackbar(new(&quot;Se ha actualizado la cantidad del producto existente&quot;, &quot;info&quot;, 5000, &quot;bg-green-600&quot;, &quot;text-white&quot;));
            }
            else
            {

                E_ProductoAlmacen productoCompra = new()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Producto = ListadoProductos.FirstOrDefault(p =&gt; p.Id == IdProducto), // Obt&eacute;n un &uacute;nico producto
                    IdProveedor = IdProveedorSeleccionado,
                    NombreProveedor = ListadoProveedores.Where(c =&gt; c.Id == IdProveedorSeleccionado).Select( f =&gt; f.NombreComercial).FirstOrDefault(),
                    IdAlmacen = IdAlmacen,
                    Serialnumber = string.Empty,
                    Proyecto = IdProyecto,
                    SubProyecto = IdObraE2E,
                    CantidadSolicitada = CantidadProducto,
                    CantidadRecibida = 0,
                    CantidadReservada = 0,
                    CantidadPendiente = 0,
                    CantidadDisponible = 0,
                    Precio = ListadoProductos.Where(dd =&gt; dd.Id == IdProducto).SelectMany(tt =&gt; tt.Proveedores).Where(c =&gt; c.Proveedor.Id == IdProveedorSeleccionado).Select(f =&gt; f.Valor).FirstOrDefault()
                };


                CompraARegistrar.Productos.Add(productoCompra);

            }
        }


        private void EliminarCompra(E_ProductoAlmacen compra)
        {
            CompraARegistrar.Productos.Remove(compra);
            if (!CompraARegistrar.Productos.Any())
            {
                EsObraBloqueada = false; // Desbloquea la selecci&oacute;n de obras
                EsProveedorBloqueada = false;
                EsProyectoBloqueado = false;
                EsAlmacenBloqueado = false;
            }
        }

        private async Task GuardarCompras()
        {


            CompraARegistrar.IdAlmacen = IdAlmacen;
            CompraARegistrar.IdObraE2E = IdObraE2E;
            CompraARegistrar.IdProyecto = IdProyecto;
            CompraARegistrar.IdProveedor = IdProveedorSeleccionado;
            CompraARegistrar.NombreComercialProveedor = ListadoProveedores.Where(x =&gt; x.Id == IdProveedorSeleccionado).Select(l =&gt; l.NombreComercial).FirstOrDefault();
            CompraARegistrar.DireccionEntrega = ListadoAlmacenes.Where(la =&gt; la.Id == IdAlmacen).Select(aa =&gt; aa.Direccion).FirstOrDefault();
            CompraARegistrar.EnRecalculo = true; // Variable de comprobaci&oacute;n para el trigger en Mongo

            await GenerarAlbaranPedidoCompra();
            try
            {
            var resultado = await _mongoContext.AddCompra(CompraARegistrar);
                if (resultado.IsSuccess)
                {

                    _snackbar.InsertSnackbar(new(&quot;Compra preparada con exito&quot;, &quot;check&quot;, 5000, &quot;bg-teal-400&quot;, &quot;text-white&quot;));
                    // Cierra el modal al finalizar
                await CerrarModal();

                }
                else
                {
                    _snackbar.InsertSnackbar(new(&quot;Algo fue mal al realizar la compra&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));

                }
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_NuevaCompra&quot;, &quot;GuardarCompras&quot;, DateTime.UtcNow);

                throw;
            }
    



        }

    

        private async Task LoadAPI()
        {
            try
            { 
            _main.IsLoading = true;

            var pageSize = _main.QueryParameters(_nav)[&quot;pageSize&quot;];
            var pageNumber = _main.QueryParameters(_nav)[&quot;pageNumber&quot;];

            if (!string.IsNullOrEmpty(pageSize) &amp;&amp; !string.IsNullOrEmpty(pageNumber))
            {
                filters.PageNumber = int.Parse(pageNumber);
                filters.PageSize = int.Parse(pageSize);
            }

            // var aprobadores = await _mongoContext.GetPaginatedAprobadores(filters);
            // ListaAprobadores = aprobadores.Documents.OrderByDescending( x =&gt; x.Prioridad).ToList();

            Productos = await _mongoContext.GetPaginatedProductos(filters);
            ListadoProductos = Productos.Documents;

            Proveedores = await _mongoContext.GetPaginatedProveedores(filters);
            ListadoProveedores = Proveedores.Documents;

            Almacenes = await _mongoContext.GetPaginatedAlmacen(filters);
            ListadoAlmacenes = Almacenes.Documents;

            Obras = await _mongoContext.GetPaginatedSeguimientoFibra(filtroSeguimientoE2E);
            ListadoObrasE2E = Obras.Documents;

            Proyectos = await _mongoContext.GetPaginatedProyectosRedFija(filters);
            ListadoProyectosRedFija = Proyectos.Documents;

            ListadoObrasE2E.OrderBy(o =&gt;
            {
                // Extraer la parte num&eacute;rica de CodigoGser
                var match = Regex.Match(o.CodigoGSER, @&quot;\d+&quot;);
                return match.Success ? int.Parse(match.Value) : int.MaxValue;
            })
            .ToList();

            await  InvokeAsync(StateHasChanged);

            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_NuevaCompra&quot;, &quot;GuardarCompras&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
            }
        
        }

        public async Task  CerrarModal()
        {
            await OnComplete.InvokeAsync(true);
            await Task.Delay(1000);
            Close(true);

        }

    }
    `
  },
  {
    "ID": 14,
    "ServicesName": "M_ValidateCompra",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Compras/Modals/M_ValidateCompra",
    "ServicesDescription": "",
    "Code": `
    &lt;style&gt;
        .progress-container {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .progress-step {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 15px; /* Espaciado entre los pasos */
        }

        .rectangle {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f0f0f0;
            padding: 10px 20px; /* Espacio alrededor del texto */
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            color: #333;
            cursor: pointer;
            border-radius: 8px; /* Bordes redondeados para el rect&aacute;ngulo */
            transition: background-color 0.3s ease;
            white-space: nowrap; /* Evita el salto de l&iacute;nea en el texto */
            max-width: 200px; /* Limita el ancho m&aacute;ximo del rect&aacute;ngulo */
            overflow: hidden; /* Oculta el desbordamiento si el texto es muy largo */
            text-overflow: ellipsis; /* Muestra &quot;...&quot; si el texto es demasiado largo */
        }

            /* Rect&aacute;ngulo con estado completado */
            .rectangle.completed {
                background-color: #4CAF50; /* Verde para completado */
                color: white;
            }

        .progress-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
        }

        .progress-icon {
            width: 20px;
            height: 20px;
        }

        /* Asegurar que el nombre se ajuste dentro del rect&aacute;ngulo */
        .rectangle span {
            display: block;
            text-align: center;
        }

        /* Estilos de la flecha */
        .progress-arrow img {
            border-radius: 50%;
            width: 20px;
            height: 20px;
            transition: filter 0.3s;
        }

        .progress-icon.green {
            filter: none;
        }

        .progress-icon.grey {
            filter: none;
        }

        .rectangle.paused {
            background-color: orange;
            cursor: not-allowed;
            opacity: 0.6;
            pointer-events: none; /* Evita cualquier interacci&oacute;n del usuario */
        }

            .rectangle.paused:hover {
                opacity: 1;
            }
    &lt;/style&gt;
    
    &lt;div class=&quot;progress-container flex flex-wrap items-start gap-3 justify-start w-full&quot;&gt;
        &lt;div class=&quot;w-full&quot;&gt;
            &lt;h2 class=&quot;text-lg font-bold&quot;&gt;Usuarios que aprobaron la compra&lt;/h2&gt;
        
        &lt;/div&gt;
        @if (Compra.AprobacionesCompras.Any())
        {
            @foreach (var etapa in Compra.AprobacionesCompras)
            {
                &lt;div class=&quot;progress-step&quot;&gt;
                    &lt;!-- Rect&aacute;ngulo con el nombre --&gt;
                    &lt;div class=&quot;rectangle @(etapa.Aprobador.Pausa ? &quot;paused&quot; : etapa.Aprobado ? &quot;completed&quot; : &quot;&quot;)&quot;&gt;
                        &lt;!-- Nombre del aprobador --&gt;
                        @(char.ToUpper(etapa.Aprobador.EmailAprobador[0]) + etapa.Aprobador.EmailAprobador.Substring(1, etapa.Aprobador.EmailAprobador.IndexOf('.') - 1).ToLower())
                    &lt;/div&gt;
                &lt;/div&gt;
                @if (etapa.Aprobador.Pausa)
                {
                    &lt;div class=&quot;w-full text-coral text-sm&quot;&gt;
                        &lt;h3&gt;&lt;b&gt;* @(char.ToUpper(etapa.Aprobador.EmailAprobador[0]) + etapa.Aprobador.EmailAprobador.Substring(1, etapa.Aprobador.EmailAprobador.IndexOf('.') - 1).ToLower()) se encuentra de vacaciones&lt;/b&gt;&lt;/h3&gt;
                    &lt;/div&gt;
                }

                @if (!etapa.Equals(Compra.AprobacionesCompras.Last()))
                {
                    &lt;div class=&quot;progress-arrow&quot;&gt;
                        &lt;img src=&quot;/Images/RedFija/arrow_right_alt.svg&quot; alt=&quot;Arrow&quot; class=&quot;progress-icon @(etapa.Aprobado ? &quot;green&quot; : &quot;grey&quot;)&quot;&gt;
                    &lt;/div&gt;
                }
            }
        }
        else
        {
            &lt;div class=&quot;progress-step&quot;&gt;
                &lt;div class=&quot;label text-gray-600&quot;&gt;No requiere autorizaci&oacute;n&lt;/div&gt;
            &lt;/div&gt;
        }
    &lt;/div&gt;


    &lt;h2 class=&quot;text-lg font-bold&quot;&gt;Detalles compra:&lt;/h2&gt;
    @*&lt;EditForm class=&quot;w-full h-fit flex flex-wrap gap-3 mt-8&quot; Model=&quot;Compra&quot; OnSubmit=&quot;SaveAsync&quot;&gt;
        *@
        &lt;table class=&quot;w-full border-collapse border border-gray-300&quot;&gt;
            &lt;thead class=&quot;bg-gray-800 text-white&quot;&gt;
                &lt;tr&gt;
                    &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;
                        Nombre producto
                    &lt;/th&gt;
                    &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;
                        C&oacute;digo producto
                    &lt;/th&gt;
                    &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;
                        Precio
                    &lt;/th&gt;
                    &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;
                        Cantidad
                    &lt;/th&gt;
                    &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;
                        Cantidad Pendiente
                    &lt;/th&gt;
                    &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;
                        Cantidad recibida
                    &lt;/th&gt;
                
                @*   &lt;th class=&quot;border border-gray-300 p-2&quot;&gt;
                        N&uacute;mero de serie
                    &lt;/th&gt; *@
                
                &lt;/tr&gt;
            &lt;/thead&gt;
            &lt;tbody&gt;
            @foreach (var v in Compra.Productos)
                {
                    &lt;tr&gt;
                        &lt;td class=&quot;p-2 border border-gray-300&quot;&gt;
                            &lt;span class=&quot;w-full h-fit&quot;&gt;
                                @v.Producto.Nombre
                            &lt;/span&gt;
                        &lt;/td&gt;
                        &lt;td class=&quot;p-2 border border-gray-300&quot;&gt;
                                @v.Producto.CodigoProducto
                            &lt;/td&gt;
                        &lt;td class=&quot;p-2 border border-gray-300&quot;&gt;
                                @v.Precio
                            &lt;/td&gt;
                        &lt;td class=&quot;p-2 border border-gray-300]&quot;&gt;
                                @v.CantidadSolicitada
                            &lt;/td&gt;
                        &lt;td class=&quot;p-2 border border-gray-300&quot;&gt;
                                @( v.CantidadSolicitada - v.CantidadPendiente) @*Cantidad Pendiente*@
                            &lt;/td&gt;

                        &lt;td class=&quot;p-2 border border-gray-300&quot;&gt;
                
                            &lt;input type=&quot;text&quot; class=&quot;p-2 border border-gray-300 rounded&quot; placeholder=&quot;N. Recibido&quot;  @bind-value=&quot;@v.CantidadRecibida&quot; /&gt;
                            &lt;/td&gt;            
                    
                    &lt;/tr&gt;
                }
                &lt;tr&gt;
                &lt;td class=&quot;p-2 border border-gray-300&quot;&gt;
                    &lt;/td&gt;
                &lt;td class=&quot;p-2 border border-gray-300&quot;&gt;
                    &lt;/td&gt;
                    &lt;td class=&quot;p-2 border border-gray-300&quot;&gt;
                        
                    Total: @Compra.Productos.Sum(c =&gt; (c.Precio * c.CantidadSolicitada))
                    &lt;/td&gt;
                    &lt;td class=&quot;p-2 border border-gray-300&quot;&gt;

                    Total: @Compra.Productos.Sum(c =&gt; c.CantidadSolicitada)
                    &lt;/td&gt;
                    &lt;td class=&quot;p-2 border border-gray-300&quot;&gt;
                    &lt;/td&gt;
                &lt;/tr&gt;
            &lt;/tbody&gt;
        &lt;/table&gt;

        &lt;div class=&quot;w-full p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;div class=&quot;w-full flex flex-wrap items-center&quot;&gt;
                
                &lt;button type=&quot;button&quot; class=&quot; p-2 rounded bg-blue-400 text-white&quot;
                        @onclick=&quot;@(() =&gt; Compra.Comentarios.Add(new() { Comentario = &quot;&quot;, Fecha=DateTime.Now, Id = _user.id, Name = $&quot;{_user.name} {_user.surname}&quot;, ProfilePic=_user.profilePic }))&quot;&gt;
                    A&ntilde;adir comentario
            &lt;/button&gt;
            &lt;/div&gt;

            &lt;div class=&quot;w-full flex flex-wrap gap-3 py-3&quot;&gt;
                @foreach (var vv in Compra.Comentarios)
                {
                    &lt;div class=&quot;w-full flex flex-wrap gap-2&quot;&gt;
                        @if (vv.Id == _user.id)
                        {
                            &lt;span class=&quot;w-full text-blue-400 text-sm flex flex-wrap justify-between items-center gap-3&quot;&gt;
                                &lt;div class=&quot;w-fit text-sm flex flex-wrap items-center gap-3&quot;&gt;
                                    &lt;div class=&quot;h-[40px] aspect-square rounded-full&quot; style=&quot;background-image: url(@(vv.ProfilePic)); background-size: cover;&quot;&gt;
                                    &lt;/div&gt;

                                    @($&quot;{vv.Name} - {vv.Fecha.ToRealLocalTime(_main.OffsetHoursTime):dd/MM/yyyy HH:mm:ss}&quot;)
                                &lt;/div&gt;

                                &lt;button type=&quot;button&quot; class=&quot;rounded bg-red-600 text-white py-0 px-1 w-fit h-fit&quot; @onclick=&quot;() =&gt; Compra.Comentarios.Remove(vv)&quot;&gt;
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

                                @($&quot;{vv.Name} - {vv.Fecha.ToRealLocalTime(_main.OffsetHoursTime):dd/MM/yyyy HH:mm:ss}&quot;)
                            &lt;/div&gt;
                        }

                        &lt;textarea class=&quot;w-full border border-slate-300/50 rounded p-2&quot; @bind=&quot;                vv.Comentario&quot;
                                readonly=&quot;@(vv.Id != _user.id)&quot;&gt;&lt;/textarea&gt;
                    &lt;/div&gt;
                }
            &lt;/div&gt;
        &lt;/div&gt;
    
        &lt;div class=&quot;w-full p-2 flex flex-wrap gap-2&quot; style=&quot;margin-left:15vw; margin-right:15vw&quot;&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full h-fit p-2 rounded border border-salte-300/50&quot; placeholder=&quot;Introduce el c&oacute;digo del albar&aacute;n para poder validar la compra&quot; @bind-value=&quot;CodigoAlbaran&quot; /&gt;
        &lt;/div&gt;

    &lt;div class=&quot;w-full h-fit flex flex-wrap items-center justify-end gap-3&quot;&gt;
        &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-green-500 text-white&quot;
                @onclick=&quot;()=&gt;{IniciarConfirmacion();}&quot;&gt;
                Validar llegada
        &lt;/button&gt;
        &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit rounded p-2 bg-red-600 text-white&quot; @onclick=&quot;()=&gt; Close(false)&quot;&gt;Salir sin guardar&lt;/button&gt;
            
        &lt;/div&gt;
    &lt;hr class=&quot;my-2&quot; /&gt;

    @if (HayProductosSeriables)
    {
        &lt;div&gt;
            &lt;h2 class=&quot;text-xl font-bold mb-4&quot;&gt;Ingrese los c&oacute;digos de serie&lt;/h2&gt;
            @foreach (var producto in Compra.Productos)
            {
                if (producto.Producto.CheckSeriable)
                {
                    &lt;div class=&quot;mb-6 p-4 border rounded&quot;&gt;
                        &lt;h3 class=&quot;text-lg font-semibold mb-2&quot;&gt;@producto.Producto.Nombre | @producto.Producto.CodigoProducto&lt;/h3&gt;
                        @if (!ProductoListadoNumSeries.ContainsKey(producto.Producto.Id))
                        {
                            ProductoListadoNumSeries[producto.Producto.Id] = new List&lt;string&gt;();
                            if (producto.Producto.EsBobina &amp;&amp; !ProductoListadoMedidas.ContainsKey(producto.Producto.Id))
                            {
                                ProductoListadoMedidas[producto.Producto.Id] = new List&lt;Medida&gt;();
                            }
                        }
                        &lt;ul class=&quot;list-disc pl-5 space-y-2&quot;&gt;
                            @foreach (var (serie, index) in ProductoListadoNumSeries[producto.Producto.Id].Select((s, i) =&gt; (s, i)))
                            {
                                &lt;li class=&quot;flex items-center space-x-2&quot;&gt;
                                    &lt;input type=&quot;text&quot; class=&quot;border p-1 w-full&quot; @bind=&quot;ProductoListadoNumSeries[producto.Producto.Id][index]&quot; placeholder=&quot;Introduce c&oacute;digo de serie&quot; /&gt;

                                    @if (producto.Producto.EsBobina)
                                    {
                                        &lt;div class=&quot;flex items-center space-x-2 ml-2&quot;&gt;
                                        
                                            &lt;input type=&quot;number&quot; step=&quot;0.01&quot; class=&quot;border p-1 w-24&quot;
                                                @bind=&quot;ProductoListadoMedidas[producto.Producto.Id][index].ValorMedida&quot;
                                                placeholder=&quot;Valor&quot; /&gt;
                                            &lt;select class=&quot;border p-1&quot;
                                                    @bind=&quot;ProductoListadoMedidas[producto.Producto.Id][index].TipoUnidad&quot;&gt;
                                                &lt;option value=&quot;@Medida.UnidadMedida.CM&quot;&gt;CM&lt;/option&gt;
                                                &lt;option value=&quot;@Medida.UnidadMedida.DM&quot;&gt;DM&lt;/option&gt;
                                                &lt;option value=&quot;@Medida.UnidadMedida.M&quot;&gt;M&lt;/option&gt;
                                            &lt;/select&gt;
                                        &lt;/div&gt;
                                    }

                                    &lt;button type=&quot;button&quot; class=&quot;bg-red-500 text-white px-2 py-1 rounded transition duration-200 hover:bg-transparent hover:text-red-500 border border-red-500&quot;
                                            @onclick=&quot;() =&gt; EliminarSerie(producto.Producto.Id, index)&quot;&gt;
                                        ❌
                                    &lt;/button&gt;
                                &lt;/li&gt;
                            }
                        &lt;/ul&gt;
                        &lt;button type=&quot;button&quot; class=&quot;mt-2 bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed&quot;
                                @onclick=&quot;() =&gt; AgregarSerie(producto.Producto.Id)&quot;
                                disabled=&quot;@(producto.CantidadRecibida &lt;= ProductoListadoNumSeries[producto.Producto.Id].Count)&quot;&gt;
                            ➕ Agregar N&uacute;mero de Serie
                        &lt;/button&gt;
                        &lt;span&gt;Se requieren &lt;b&gt;@producto.CantidadRecibida&lt;/b&gt; N.Serie, llevas @ProductoListadoNumSeries[producto.Producto.Id].Count / @producto.CantidadRecibida &lt;/span&gt;
                    &lt;/div&gt;
                }
            }
        &lt;/div&gt;
    }

    &lt;hr class=&quot;my-2&quot; /&gt;

    @if (MostrarConfirmacion)
    {
        &lt;!-- Secci&oacute;n de Confirmaci&oacute;n dentro del Modal Padre --&gt;
        &lt;div class=&quot;bg-white p-6 w-full&quot;&gt;
        
            &lt;hr class=&quot;my-2&quot; /&gt;

            &lt;p class=&quot;mt-4&quot;&gt;&lt;b&gt;*&lt;/b&gt; Se van a validar los siguientes elementos:&lt;/p&gt;

            &lt;div class=&quot;w-full h-fit flex flex-wrap items-center p-2&quot;&gt;
                &lt;p class=&quot;mb-4&quot;&gt;C&oacute;digo Albar&aacute;n: | &lt;b&gt;@CodigoAlbaran&lt;/b&gt; |&lt;/p&gt;

                &lt;!-- Tabla de Productos --&gt;
                &lt;table class=&quot;table-auto w-full border border-gray-300&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr class=&quot;bg-gray-100 text-left&quot;&gt;
                            &lt;th class=&quot;border px-4 py-2&quot;&gt;Producto&lt;/th&gt;
                            &lt;th class=&quot;border px-4 py-2&quot;&gt;Cantidad Recibida&lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var pro in Compra.Productos)
                        {
                            &lt;tr class=&quot;hover:bg-gray-50&quot;&gt;
                                &lt;td class=&quot;border px-4 py-2&quot;&gt;@pro.Producto.Nombre&lt;/td&gt;
                                &lt;td class=&quot;border px-4 py-2&quot;&gt;@pro.CantidadRecibida&lt;/td&gt;
                            &lt;/tr&gt;
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;
            &lt;/div&gt;

            &lt;!-- Botones de Confirmaci&oacute;n --&gt;
            &lt;div class=&quot;mt-6 flex justify-between&quot;&gt;
                &lt;button class=&quot;px-4 py-2 bg-green-500 text-white shadow-xl rounded hover:bg-green-600&quot;
                        @onclick=&quot;@(() =&gt; Confirmar(true))&quot;&gt;
                    S&iacute;
                &lt;/button&gt;
                &lt;button class=&quot;px-4 py-2 bg-red-500 text-white shadow-xl rounded hover:bg-red-600&quot;
                        @onclick=&quot;@(() =&gt; Confirmar(false))&quot;&gt;
                    No
                &lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    }

    @*&lt;/EditForm&gt;*@

    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        [Parameter] public E_Compras Compra { get; set; } 
        private string CodigoAlbaran = &quot;&quot;;
        //Dictionary&lt;int, E_ProductoAlmacen&gt; ProductosCompra = new();
        private bool MostrarConfirmacion { get; set; } = false;
        private bool HayProductosSeriables { get; set; } = false;
        private Dictionary&lt;string, List&lt;Medida&gt;&gt; ProductoListadoMedidas { get; set; } = new Dictionary&lt;string, List&lt;Medida&gt;&gt;();
        private Dictionary&lt;string, List&lt;string&gt;&gt; ProductoListadoNumSeries = new Dictionary&lt;string, List&lt;string&gt;&gt;();



        protected override async Task OnInitializedAsync()
        {
            Compra.Productos.ForEach(x =&gt; x.CantidadRecibida = 0);
            ProductoListadoNumSeries.Clear();
        }





        private void AgregarSerie(string idProducto)
        {
            if (!ProductoListadoNumSeries.ContainsKey(idProducto))
            {
                ProductoListadoNumSeries[idProducto] = new List&lt;string&gt;();
            }
            ProductoListadoNumSeries[idProducto].Add(&quot;&quot;);

            // Si es bobina, agregar una medida correspondiente
            var producto = Compra.Productos.FirstOrDefault(p =&gt; p.Producto.Id == idProducto);
            if (producto?.Producto.EsBobina == true)
            {
                if (!ProductoListadoMedidas.ContainsKey(idProducto))
                {
                    ProductoListadoMedidas[idProducto] = new List&lt;Medida&gt;();
                }
                ProductoListadoMedidas[idProducto].Add(new Medida { ValorMedida = 0, TipoUnidad = Medida.UnidadMedida.M });
            }
        }

        private void EliminarSerie(string idProducto, int index)
        {
            if (ProductoListadoNumSeries.TryGetValue(idProducto, out var lista) &amp;&amp; lista.Count &gt; index)
            {
                lista.RemoveAt(index);

                // Si es bobina, eliminar tambi&eacute;n la medida
                var producto = Compra.Productos.FirstOrDefault(p =&gt; p.Producto.Id == idProducto);
                if (producto?.Producto.EsBobina == true &amp;&amp;
                    ProductoListadoMedidas.TryGetValue(idProducto, out var listaMedidas) &amp;&amp;
                    listaMedidas.Count &gt; index)
                {
                    listaMedidas.RemoveAt(index);
                }
            }
        }






        private void IniciarConfirmacion()
        {
            if (string.IsNullOrEmpty(CodigoAlbaran))
            {
                if (string.IsNullOrEmpty(CodigoAlbaran))
                {

                    _snackbar.InsertSnackbar(new($&quot;Es necesario incluir un n&uacute;mero de albaran&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                    _main.IsLoading = false;
                    return;

                }
            }

            if (Compra.Productos.Any(x =&gt; x.Producto.CheckSeriable == true))
            {
                ProductoListadoNumSeries.Clear();

                ProductoListadoNumSeries = Compra.Productos
                .Where(x =&gt; x.Producto.CheckSeriable)
                .ToDictionary(x =&gt; x.Producto.Id, x =&gt; new List&lt;string&gt;());

                HayProductosSeriables = true;


            }

            MostrarConfirmacion = true;
        }

        private async Task Confirmar(bool confirmacion)
        {
            if (confirmacion)
            {
                bool result = await ValidarLlegadas();
                if (result)
                {

                    await VolcarLLegadas(confirmacion);
                    ProductoListadoNumSeries.Clear();
                }
                else
                {

                    _main.IsLoading = false;
                    return;
                }


            }

            //Ocultar las tablas
            HayProductosSeriables = false;

            // Ocultar la confirmaci&oacute;n despu&eacute;s de procesarla
            MostrarConfirmacion = false;
        }

        bool NecesitaNumeroSerie(string tipo)
        {
            if (tipo == &quot;Activos FO&quot; || tipo == &quot;Cables FO&quot; || tipo == &quot;Cables el&eacute;ctricos&quot;)
            {
                return true;
            }

            return false;
        }

        // public async Task SaveAsync()
        // {
        //     _main.IsLoading = true;
        //
        //     foreach(var v in Compra.Productos)
        //     {
        //         if(NecesitaNumeroSerie(v.Producto.FamiliaProducto) &amp;&amp; string.IsNullOrEmpty(v.Serialnumber))
        //         {
        //             _snackbar.InsertSnackbar(new(&quot;Hay alg&uacute;n producto sin n&uacute;mero de serie&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
        //
        //             return;
        //         }
        //     }
        //
        //     if (!Compra.Validated.Any(x =&gt; x == false))
        //     {
        //         Compra.Estados.Add(new()
        //             {
        //                 Estado = &quot;Compra validada&quot;,
        //                 Fecha = DateTime.Now,
        //                 UsuarioEstado = null
        //             });
        //     }
        //
        //     var returnedData = await AddProductsAlmacen();
        //
        //     if (returnedData.Count &gt; 0)
        //     {
        //         var modal = _modal.ShowModal(typeof(M_CodigoAlbaran), new Dictionary&lt;string, object&gt;
        //         {
        //             { nameof(M_CodigoAlbaran.Productos), returnedData},
        //             { nameof(M_CodigoAlbaran.Compra), Compra},
        //         }, FixedWidth: 60, CanClose: false);
        //
        //         modal.OnCloseModal += async (b) =&gt;
        //         {
        //             await _mongoContext.EditCompras(Compra);
        //             Close(true);
        //             _main.IsLoading = false;
        //         };
        //     }
        //     else
        //     {
        //         await _mongoContext.EditCompras(Compra);
        //         Close(true);
        //         _main.IsLoading = false;
        //     }
        // }

        //  async Task&lt;List&lt;E_ProductoAlmacen&gt;&gt; AddProductsAlmacen()
        //  {
        //      var compraDB = await _mongoContext.GetOneCompra(Compra.Id);
        //
        //      int count = 0;
        //
        //      List&lt;E_ProductoAlmacen&gt; AddToAlbaran = new();
        //
        //      foreach (var v in Compra.Productos)
        //      {
        //          if (compraDB.Value.Productos[count].CantidadRecibida &lt; v.CantidadRecibida)
        //          {
        //              await _mongoContext.AddProductoAlmacen(new()
        //                  {
        //                      Cantidad = v.CantidadRecibida - compraDB.Value.Productos[count].CantidadRecibida,
        //                      IdAlmacen = Compra.IdAlmacen,
        //                      Precio = v.Precio,
        //                      Producto = v.Producto,
        //                      Proveedor = Compra.Proveedor.Id,
        //                      NombreProveedor = Compra.Proveedor.NombreComercial,
        //                      Proyecto = v.Proyecto,
        //                      SubProyecto = v.SubProyecto,
        //                      Serialnumber = v.Serialnumber
        //                  });
        //
        //              AddToAlbaran.Add(new()
        //                  {
        //                      Cantidad = v.CantidadRecibida - compraDB.Value.Productos[count].CantidadRecibida,
        //                      CantidadRecibida = 0,
        //                      IdAlmacen = v.IdAlmacen,
        //                      NombreProveedor = v.NombreProveedor,
        //                      Precio = v.Precio,
        //                      Producto = v.Producto,
        //                      Proveedor = v.Proveedor,
        //                      Proyecto = v.Proyecto,
        //                      Serialnumber = v.Serialnumber,
        //                      SubProyecto = v.SubProyecto,
        //                  });
        //          }
        //
        //          count++;
        //      }
        //
        //      return AddToAlbaran;
        //  }


        // Opci&oacute;n 1: Si Producto tiene una propiedad Medida &uacute;nica
        public void AgregarMedidas()
        {
            int aux = 0;
            foreach (var item in ProductoListadoMedidas)
            {

                item.Value.ForEach(x =&gt; x.NumSerie = ProductoListadoNumSeries[item.Key].ElementAt(aux++));
                
            }

            foreach (var producto in Compra.Productos)
            {


                if (producto.Producto.EsBobina &amp;&amp;
                    ProductoListadoMedidas.ContainsKey(producto.Producto.Id))
                {

                    producto.Producto.ListaMedidas = ProductoListadoMedidas[producto.Producto.Id];
                }
            }
        }


        public async Task AgregarNumSerieAProducto()
        {
            Compra.Productos.ForEach(x =&gt;
            {
                if (ProductoListadoNumSeries.ContainsKey(x.Producto.Id))
                {
                    if (x.Producto.ListaNumSeries == null)
                    {
                        x.Producto.ListaNumSeries = new List&lt;string&gt;();
                    }
                    x.Producto.ListaNumSeries.AddRange(ProductoListadoNumSeries[x.Producto.Id]);
                }
            }
            );


            Console.WriteLine(&quot;NumSerie agregados a sus productos.&quot;);

        }

        public async Task&lt;bool&gt; ComprobarNumerosSerie()
        {
            //Limpiar las listas del diccionario de nulos y vacios
            if (ProductoListadoNumSeries.Count &gt; 0)
            {

                foreach (var item in Compra.Productos.Where(p =&gt; p.Producto.CheckSeriable))
                {

                    var listaNumSerie = ProductoListadoNumSeries[item.Producto.Id];

                    // Comprobar si la cantidad recibida coincide con la lista filtrada
                    if (item.CantidadRecibida != listaNumSerie.Count(s =&gt; !string.IsNullOrWhiteSpace(s)))
                    {

                        _snackbar.InsertSnackbar(new($&quot;Faltan n&uacute;meros de serie por agregar&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                        _main.IsLoading = false;
                        return false;
                    }

                    // Comprobar si hay elementos duplicados
                    if (listaNumSerie.Distinct().Count() != listaNumSerie.Count)
                    {
                        _snackbar.InsertSnackbar(new($&quot;Hay n&uacute;meros de serie repetidos&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                        _main.IsLoading = false;
                        return false;
                    }
                }

            }
            else
            {
                return false;    
            }

            return true;
        }




        public async Task&lt;bool&gt; ValidarLlegadas()
        {
            _main.IsLoading = true;


            if (Compra.Productos.All(x =&gt; x.CantidadRecibida == 0))
            {

                _snackbar.InsertSnackbar(new($&quot;Es necesario incluir cantidades recibidas para poder validar los datos&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                _main.IsLoading = false;
                return false;

            }


            if (Compra.Productos.All(x =&gt; (x.CantidadPendiente + x.CantidadRecibida) &lt;= x.CantidadSolicitada))
            {
                foreach (var item in Compra.Productos)
                {

                    if ((item.CantidadPendiente + item.CantidadRecibida) &lt;= item.CantidadSolicitada)
                    {

                        item.CantidadPendiente += item.CantidadRecibida;
                        item.CantidadDisponible += item.CantidadRecibida;

                    }


                }

            }
            else
            {
                _snackbar.InsertSnackbar(new($&quot;Alg&uacute;n producto se excede en cantidad recibida respecto a la pendiente&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                _main.IsLoading = false;
                return false;

            }


            if (Compra.Productos.Any(p =&gt; p.Producto.CheckSeriable))
            {
                bool resultCheckSeriables = await ComprobarNumerosSerie();

                if (resultCheckSeriables)
                {
                    await AgregarNumSerieAProducto();


                }
                else
                {

                    return false;
                }

            }

            if (Compra.Productos.Any(l =&gt; l.Producto.EsBobina))
            {
                AgregarMedidas();
            }


            if (Compra.Productos.All(x =&gt; x.CantidadSolicitada - x.CantidadPendiente == 0))
            {

                Compra.Estados.Add(new()
                    {
                        Estado = &quot;Compra validada&quot;,
                        Fecha = DateTime.Now,
                        UsuarioEstado = null
                    });

            }
            _main.IsLoading = false;
            return true;
        }


        public async Task&lt;bool&gt; CargarProductosStock(E_Compras compra)
        {

            try
            {
            foreach (var item in compra.Productos)
                    {
                        if (item.CantidadRecibida &gt; 0)
                        {

                            var respu = await _mongoContext.UppUpdateModifyCompra(compra, item);
                            if (!respu.IsSuccess)
                            {
                                _snackbar.InsertSnackbar(new($&quot;Ocurrio un error al actualizar los Productos en stock&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                                return false;
                            }

                        }

                    }       
                    return true;
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_ValidateCompra&quot;, &quot;CargarProductosStock&quot;, DateTime.UtcNow);

                return false;
            }
        


        }

        public async Task&lt;string&gt; GenerarCodigoAlbaran()
        {
            try
            {
            // Obtener el n&uacute;mero m&aacute;s alto encontrado en la colecci&oacute;n
                    var resultado = await _mongoContext.GetMaxNumeroEnCodigoAlbaranCompra(&quot;Entrada&quot;);

                    int nuevoNumero = resultado.IsSuccess ? resultado.Value + 1 : 1; // Si no hay registros, empezamos en 1

                    // Obtener el a&ntilde;o y mes actual
                    string anio = DateTime.UtcNow.ToString(&quot;yy&quot;);  // A&ntilde;o en formato &quot;aa&quot;
                    string mes = DateTime.UtcNow.ToString(&quot;MM&quot;);   // Mes en formato &quot;mm&quot;

                    // Construir el c&oacute;digo con el formato &quot;ALB-aa-mm-xxx&quot;
                    string nuevoCodigo = $&quot;ALB-{anio}-{mes}-{nuevoNumero:D4}&quot;; //:D4 asegura que el n&uacute;mero siempre tenga 4 digitos

                    return nuevoCodigo;
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_ValidateCompra&quot;, &quot;GenerarCodigoAlbaran&quot;, DateTime.UtcNow);

                throw;
            }
        
        }
    

        public async Task VolcarLLegadas(bool confirmacion)
        {

            if(confirmacion)
            {
            

                var nuevoAlbaran = new E_Albaran
                {
                    CodigoAlbaran = await GenerarCodigoAlbaran(),
                    FechaAlbaranAnadido = DateTime.Now.ToString(&quot;dd-MM-yyyy HH:mm&quot;),
                    IdAlmacen = Compra.IdAlmacen,
                    IdObraE2E = Compra.IdObraE2E,
                    IdProyecto = Compra.IdProyecto,
                    Tipo = &quot;Entrada&quot;,
                    CodigoAlbaranEntrega = Compra.CodigoAlbaranEntrada ?? &quot;&quot;,
                    ListadoProductosAlbaran = new List&lt;E_Albaran.E_ProductoAlbaran&gt;() // Inicializa la lista
                };


                // Rellena la lista de productos en el albar&aacute;n
                foreach (var producto in Compra.Productos)
                {
                    if (producto.Producto.CheckSeriable)
                    {
                        foreach (var item in ProductoListadoNumSeries[producto.Producto.Id])
                        {
                            var productoAlbaran = new E_Albaran.E_ProductoAlbaran
                            {
                                Producto = producto.Producto,
                                Proveedor = Compra.Productos
                                .SelectMany(ff =&gt; ff.Producto.Proveedores) // Aplanamos la lista de proveedores
                                .Where(aa =&gt; aa.Proveedor.Id == Compra.IdProveedor) // Filtramos por el proveedor correcto
                                .Select(zz =&gt; zz.Proveedor) // Seleccionamos el proveedor
                                .FirstOrDefault(),// Tomamos el primero si existe
                                CodigoProducto = producto.Producto.CodigoProducto,
                                Concepto = &quot;&quot;,
                                Precio = producto.Precio,
                                Unidades = 1,
                                NumSerieUnidad = item

                            };

                            nuevoAlbaran.ListadoProductosAlbaran.Add(productoAlbaran);
                        }



                    }
                    else
                    {
                        var productoAlbaran = new E_Albaran.E_ProductoAlbaran
                        {
                            Producto = producto.Producto,
                            Proveedor = Compra.Productos
                            .SelectMany(ff =&gt; ff.Producto.Proveedores) // Aplanamos la lista de proveedores
                            .Where(aa =&gt; aa.Proveedor.Id == Compra.IdProveedor) // Filtramos por el proveedor correcto
                            .Select(zz =&gt; zz.Proveedor) // Seleccionamos el proveedor
                            .FirstOrDefault(),// Tomamos el primero si existe
                            CodigoProducto = producto.Producto.CodigoProducto,
                            Concepto = &quot;&quot;,
                            Precio = producto.Precio,
                            Unidades = producto.CantidadRecibida

                        };

                        nuevoAlbaran.ListadoProductosAlbaran.Add(productoAlbaran);
                    }


                }


                Compra.Albaranes.Add(nuevoAlbaran);


                bool result = await CargarProductosStock(Compra);



                if (result)
                {
                    Compra.Productos.Where(x =&gt; x.Producto.CheckSeriable).ToList().ForEach( c =&gt; c.Producto.ListaNumSeries.Clear());
                    try
                    {
                    var resCom = await _mongoContext.EditCompras(Compra);

                                    if (resCom.IsSuccess)
                                    {
                                        _snackbar.InsertSnackbar(new($&quot;Datos de la compra actualizados&quot;, &quot;check&quot;, 6000, &quot;bg-teal-400&quot;, &quot;text-white&quot;));

                                        Close(true); // Cerrar Modal

                                    }
                                    else
                                    {
                                        _snackbar.InsertSnackbar(new($&quot;Ocurrio un error al actualizar los detalles de la compra&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                                        return;
                                    }

                    }
                    catch (Exception e)
                    {
                        
                        await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_ValidateCompra&quot;, &quot;VolcarLLegadas&quot;, DateTime.UtcNow);

                        return;
                    }
                
            
            
                }
                else
                {
                    _snackbar.InsertSnackbar(new($&quot;Ocurrio un error al actualizar el stock general&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                    return;
                }
            }
            CodigoAlbaran = &quot;&quot;;
        }
    }
    `
  },
  {
    "ID": 15,
    "ServicesName": "M_VistaAlbaranes",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Compras/Modals/M_VistaAlbaranes",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;bg-white p-4 w-full&quot;&gt;
        &lt;p&gt;Listado Albaranes sobre la orden de compra : &lt;b&gt;@CodigoCompra&lt;/b&gt;&lt;/p&gt;
        &lt;hr /&gt;
        &lt;br /&gt;
        @foreach (var item in ListadoAlbaranes)
        {
            &lt;div class=&quot;border border-gray-400 rounded-md shadow-custom mb-4&quot;&gt;
                &lt;div class=&quot;flex justify-center items-center bg-gray-100 hover:bg-gray-200 p-2 rounded-t-md &quot;&gt;
                    &lt;!-- T&iacute;tulo del acorde&oacute;n --&gt;
                    &lt;button class=&quot;text-left text-lg focus:outline-none w-full&quot;
                            onclick=&quot;toggleAccordion('@item.CodigoAlbaran')&quot; &gt;
                        &lt;table class=&quot;w-full border-collapse&quot;&gt;
                            &lt;thead&gt;
                                &lt;tr class=&quot;border-b&quot;&gt;
                                    &lt;th class=&quot;text-left w-1/2 p-2&quot;&gt;Proveedor&lt;/th&gt;
                                    
                                    @if (item.Tipo == &quot;Compra&quot;)
                                    {
                                        &lt;th class=&quot;text-left w-1/2 p-2&quot;&gt;Pedido&lt;/th&gt;

                                        &lt;th class=&quot;text-left w-1/2 p-2&quot;&gt;Movimiento&lt;/th&gt;
                                    }
                                    else
                                    {
                                        &lt;th class=&quot;text-left w-1/2 p-2&quot;&gt;Entrega&lt;/th&gt;
                                        &lt;th class=&quot;text-left w-1/2 p-2&quot;&gt;Movimiento&lt;/th&gt;
                                    }
                                &lt;/tr&gt;
                            &lt;/thead&gt;
                            &lt;tbody&gt;
                                &lt;tr&gt;
                                    &lt;td class=&quot;text-left p-2&quot;&gt;@item.CodigoAlbaran&lt;/td&gt;
                                    &lt;td class=&quot;text-left p-2&quot;&gt;@item.CodigoAlbaranEntrega&lt;/td&gt;


                                    &lt;td class=&quot;text-left p-2   @(item.Tipo == &quot;Compra&quot; ? &quot;text-green-600&quot; : &quot;text-rose-400&quot;)&quot;&gt;@item.Tipo&lt;/td&gt;
                                    
                            
                                &lt;/tr&gt;
                            &lt;/tbody&gt;
                        &lt;/table&gt;
                    &lt;/button&gt;
                    &lt;!-- Bot&oacute;n Exportar a PDF --&gt;
                    &lt;button class=&quot;bg-blue-500 hover:bg-blue-600 text-white rounded p-2 flex items-center&quot;
                            @onclick=&quot;@(()=&gt; ExportPDF(item.CodigoAlbaran))&quot;&gt;
                        &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; fill=&quot;none&quot; viewBox=&quot;0 0 24 24&quot; stroke=&quot;currentColor&quot; class=&quot;w-5 h-5 mr-2&quot;&gt;
                            &lt;path stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; stroke-width=&quot;2&quot; d=&quot;M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8m-6-6l6 6m-6-6v6h6&quot;&gt;&lt;/path&gt;
                        &lt;/svg&gt;
                        Exportar PDF
                    &lt;/button&gt;
                &lt;/div&gt;

                &lt;div id=&quot;@item.CodigoAlbaran&quot; class=&quot;hidden px-4 py-2&quot;&gt;
                    &lt;!-- Contenido del acorde&oacute;n --&gt;
                    &lt;div class=&quot;w-full h-fit flex flex-wrap items-center&quot;&gt;
                        &lt;img src=&quot;../Images/Base/logoMulticolorAjustado.png&quot; class=&quot;w-[150px] h-auto&quot; /&gt;
                    &lt;/div&gt;

                    &lt;div class=&quot;w-full h-fit mt-6 grid grid-cols-3 gap-4&quot;&gt;
                        &lt;!-- Informaci&oacute;n del proveedor --&gt;
                        &lt;div class=&quot;h-fit flex flex-col gap-2&quot;&gt;
                            &lt;div class=&quot;text-blue-400 font-bold&quot;&gt;
                                @item.ListadoProductosAlbaran.Select(x =&gt; x.Proveedor.NombreComercial).FirstOrDefault()
                            &lt;/div&gt;
                            &lt;div&gt;@item.ListadoProductosAlbaran.Select(x =&gt; x.Proveedor.NifCif).FirstOrDefault()&lt;/div&gt;
                            &lt;div&gt;@item.ListadoProductosAlbaran.Select(x =&gt; x.Proveedor.Direccion).FirstOrDefault()&lt;/div&gt;
                            &lt;div&gt;@item.ListadoProductosAlbaran.Select(x =&gt; x.Proveedor.Provincia).FirstOrDefault()&lt;/div&gt;
                            &lt;div&gt;@item.ListadoProductosAlbaran.Select(x =&gt; x.Proveedor.Pais).FirstOrDefault()&lt;/div&gt;
                            &lt;div&gt;@item.ListadoProductosAlbaran.Select(x =&gt; x.Proveedor.Telefono).FirstOrDefault()&lt;/div&gt;
                            &lt;div&gt;@item.ListadoProductosAlbaran.Select(x =&gt; x.Proveedor.Email).FirstOrDefault()&lt;/div&gt;
                        &lt;/div&gt;

                        &lt;!-- Informaci&oacute;n central (solo si item.Tipo == &quot;Compra&quot;) --&gt;
                        @if (item.Tipo == &quot;Compra&quot;)
                        {
                            &lt;div class=&quot;h-fit flex flex-col items-center gap-2&quot;&gt;
                                &lt;div class=&quot;text-blue-400 font-bold&quot;&gt;Pedido Compra&lt;/div&gt;
                                &lt;div&gt;@(item.CodigoAlbaran ?? &quot;&quot;) &lt;/div&gt;
                            &lt;/div&gt;
                        }
                        else
                        {
                            &lt;!-- Entrada de material --&gt;
                            &lt;div class=&quot;h-fit flex flex-col items-center gap-2&quot;&gt;
                                &lt;div class=&quot;text-blue-400 font-bold&quot;&gt;Albar&aacute;n Entrada Material&lt;/div&gt;
                                &lt;div&gt;@(item.CodigoAlbaran ?? &quot;&quot;) &lt;/div&gt;
                            &lt;/div&gt;
                        }

                        &lt;!-- Informaci&oacute;n de la empresa --&gt;
                        &lt;div class=&quot;h-fit flex flex-col gap-2 text-end&quot;&gt;
                            &lt;div class=&quot;text-blue-400 font-bold&quot;&gt;LPS Facilities S.L.&lt;/div&gt;
                            &lt;div&gt;B72680077&lt;/div&gt;
                            &lt;div&gt;CL del Haya 4&lt;/div&gt;
                            &lt;div&gt;3&ordm; 1&lt;/div&gt;
                            &lt;div&gt;28054 MADRID&lt;/div&gt;
                            &lt;div&gt;645400662&lt;/div&gt;
                            &lt;div&gt;juanantonio.garcia@lpsgrupo.com&lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;




                    &lt;table class=&quot;w-full h-fit mt-12 table-auto&quot;&gt;
                        &lt;thead&gt;
                            &lt;tr class=&quot;bg-purple-500 text-white&quot;&gt;
                                &lt;th class=&quot;p-2&quot;&gt;C&oacute;digo&lt;/th&gt;
                                &lt;th class=&quot;p-2&quot;&gt;Concepto&lt;/th&gt;
                                &lt;th class=&quot;p-2&quot;&gt;Precio&lt;/th&gt;
                                &lt;th class=&quot;p-2&quot;&gt;Cantidad&lt;/th&gt;
                                &lt;th class=&quot;p-2&quot;&gt;Total&lt;/th&gt;
                            &lt;/tr&gt;
                        &lt;/thead&gt;
                        &lt;tbody&gt;
                            @foreach (var v in item.ListadoProductosAlbaran)
                            {
                                if (v.Unidades &gt; 0)
                                {
                                    &lt;tr&gt;
                                        @if (!string.IsNullOrEmpty(v.NumSerieUnidad))
                                        {

                                            &lt;td class=&quot;p-2&quot;&gt;
                                                &lt;tr class=&quot;text-xs&quot;&gt;
                                                &lt;b&gt;Cod Produc:&lt;/b&gt; @v.Producto.CodigoProducto
                                                &lt;/tr&gt;
                                                &lt;tr class=&quot;text-xs&quot;&gt;
                                                &lt;b&gt;Num Serie:&lt;/b&gt; @v.NumSerieUnidad
                                                &lt;/tr&gt;                                          
                                            &lt;/td&gt;
                                        }
                                        else
                                        {
                                            &lt;td class=&quot;p-2&quot;&gt;@v.Producto.CodigoProducto &lt;/td&gt;

                                        }
                                        
                                        &lt;td class=&quot;p-2&quot;&gt;@v.Producto.Descripcion&lt;/td&gt;
                                        &lt;td class=&quot;p-2&quot;&gt;@v.Precio &euro;&lt;/td&gt;
                                        &lt;td class=&quot;p-2&quot;&gt;@v.Unidades&lt;/td&gt;
                                        &lt;td class=&quot;p-2&quot;&gt;@(v.Precio * v.Unidades) &euro;&lt;/td&gt;
                                    &lt;/tr&gt;
                                }
                            }
                        &lt;/tbody&gt;
                    &lt;/table&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        }
    &lt;/div&gt;


    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }

        [Parameter] public string CodigoCompra {get; set; }
        [Parameter] public List&lt;E_Albaran&gt; ListadoAlbaranes { get; set; }

        [JSInvokable]
        private async Task ExportPDF(string idAcord)
        {
            await _js.InvokeVoidAsync(&quot;exportToPDF&quot;, idAcord);
        }
    }
    `
  },
  {
    "ID": 16,
    "ServicesName": "P_Compras",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Compras/P_Compras",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/logistica/compras&quot;
    @using LPSGrupo.Components.Areas.RedFijaF.Logistica.Compras.Modals
    @inject NavigationManager Navigation
    @*&lt;AuthorizePage Roles=&quot;@(new(){&quot;RedFija.Logistica.Compras&quot;})&quot;&gt;&lt;/AuthorizePage&gt;*@
    &lt;style&gt;
        .common-cell {
        p-2 text-sm border border-slate-300/50 truncate;
    }
    &lt;/style&gt;
    &lt;h1 class=&quot;w-full flex flex-wrap items-center text-2xl text-blue-400 font-bold p-4&quot;&gt;Compras - @(Compras.CountAllDocuments) registros&lt;/h1&gt;

    &lt;div class=&quot;w-full h-fit flex flex-wrap items-center justify-between gap-3 px-4 py-2&quot;&gt;

        &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaComprasAddCompra)&quot;&gt;
            &lt;div class=&quot;w-fit h-fit flex flex-wrap items-center gap-3&quot;&gt;
            &lt;button class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;AddCompra&quot;&gt;A&ntilde;adir compra&lt;/button&gt;
            &lt;/div&gt;
        &lt;/AuthorizedContent&gt;
        &lt;div class=&quot;w-fit h-fit flex flex-wrap items-center gap-3&quot;&gt;
            &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-2 text-sm rounded border border-slate-300&quot; @bind-value=&quot;searchSet&quot; /&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;div class=&quot;w-full h-fit flex flex-wrap px-4 py-2 gap-3&quot;&gt;
        &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-gray-300/50 shadow-md&quot;&gt;
            &lt;thead class=&quot;bg-gray-800 text-white&quot;&gt;
                &lt;tr &gt;
                    &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[100px] max-w-[150px] text-left&quot;&gt;
                        C&oacute;digo compra
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[200px] text-left&quot;&gt;
                        Albaranes
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[100px] max-w-[150px] text-left&quot;&gt;
                        Estado
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[200px] text-left&quot;&gt;
                        Proveedor
                    &lt;/th&gt;
                &lt;/tr&gt;
            &lt;/thead&gt;
            &lt;tbody&gt;
        @if (Compras.Documents != null)
        {
            &lt;Virtualize Items=&quot;@Compras.Documents&quot; Context=&quot;v&quot; ItemSize=&quot;50&quot;&gt;
                &lt;tr class=&quot;hover:bg-gray-100&quot;&gt;
                    &lt;td class=&quot; p-2 text-sm border border-slate-300/50 truncate&quot;&gt;
                    &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaComprasVerEditarCompra)&quot;&gt;
        
                        &lt;div class=&quot;w-full h-fit flex flex-col gap-3&quot;&gt;
                            &lt;span class=&quot;w-full text-blue-600 hover:underline cursor-pointer&quot; @onclick=&quot;()=&gt; OpenModalAddEdit(v)&quot;&gt;
                                @v?.CodigoCompra
                            &lt;/span&gt;
                        &lt;/div&gt;
                    &lt;/AuthorizedContent&gt;
                    &lt;/td&gt;
                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 truncate&quot;&gt;
                        &lt;div class=&quot;w-full h-fit flex flex-col gap-3&quot;&gt;
                            @if (v.Albaranes.Count &gt; 0)
                            {
                                &lt;span class=&quot;w-full text-blue-600 hover:underline cursor-pointer&quot; @onclick=&quot;()=&gt; OpenModalAlbaranes(v)&quot;&gt;
                                    ver albaranes disponibles
                                &lt;/span&gt;
                            }
                            else
                            {
                                &lt;span class=&quot;text-gray-500 italic&quot;&gt;No hay albaranes registrados a&uacute;n&lt;/span&gt;
                            }
                        &lt;/div&gt;
                    &lt;/td&gt;
                        &lt;td class=&quot;p-2 text-sm border border-slate-300/50 truncate &quot;&gt;
                                &lt;div class=&quot;rounded py-1 px-2 text-white text-center font-semibold 
                            @(GetEstadoColor(GetEstadoCompra(v.Estados.Last().Estado)))&quot;&gt;
                                    @(v.Estados.Last().Estado)
                        &lt;/div&gt;
                    &lt;/td&gt;
                            &lt;td class=&quot;p-2 text-sm border border-slate-300/50 truncate &quot;&gt;
                            @v.NombreComercialProveedor
                        &lt;/td&gt;
                &lt;/tr&gt;
            &lt;/Virtualize&gt;
        }
    &lt;/tbody&gt;
        &lt;/table&gt;
    &lt;/div&gt;


    &lt;!-- Ajuste del contenedor del Paginator --&gt;
    &lt;div class=&quot;w-full h-fit flex flex-wrap px-4 py-2 gap-3&quot;&gt;
        @if (Compras.Documents != null)
        {
            &lt;Paginator countAllDocuments=&quot;(int)Compras.CountAllDocuments&quot; countPages=&quot;Compras.PageCount&quot; filters=&quot;filters&quot; ReloadData=&quot;()=&gt;LoadApi()&quot;&gt;
            &lt;/Paginator&gt;
        }
    &lt;/div&gt;

    @code {


        [Parameter]
        public string? IdCompra { get; set; }

        [Parameter]
        public string? Action { get; set; }

        string selectHelper = &quot;&quot;;

        public enum EstadoCompra
        {
            EnEsperaMaterial, 
            EsperandoAprobadores,
            CompraEnCurso,
            Otro
        }

        public FiltersBase filters { get; set; } = new()
            {
                PageNumber = 1,
                PageSize = 10,
                Search = &quot;&quot;
            };

        public E_Compras? Compra { get; set; }

        public PaginatedResult&lt;E_Compras&gt; Compras { get; set; } = new();

        string searchSet
        {
            get
            {
                return filters.Search;
            }
            set
            {
                filters.Search = value;

                LoadApi();
            }
        }




        protected override async Task OnInitializedAsync()
        {
            var (idCompra, action) = ParseUrlParameters();
            IdCompra = idCompra;
            Action = action;

            if (Action == &quot;approve&quot; &amp;&amp; !string.IsNullOrEmpty(IdCompra))
            {
                try
                {
                var resultado = await _mongoContext.GetOneCompra(IdCompra);
                            Compra = resultado.Value;

                            await OpenModalAddEdit(Compra);
                }
                catch (Exception e)
                {
                    
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;P_Compras&quot;, &quot;OnInitializedAsync&quot;, DateTime.UtcNow);

                    return;
                }
            
            }
            else
            {
                await LoadApi();
            }
        }

        private (string? idCompra, string? action) ParseUrlParameters()
        {
            var uri = new Uri(Navigation.Uri);
            var queryParams = System.Web.HttpUtility.ParseQueryString(uri.Query);
            return (queryParams[&quot;idCompra&quot;], queryParams[&quot;action&quot;]);
        }


        private async Task ExecuteWithLoading(Func&lt;Task&gt; action)
        {
            try
            {
                _main.IsLoading = true;
                await action();
            }
            finally
            {
                _main.IsLoading = false;
            }
        }

        private async Task ShowModal(Type modalType, Dictionary&lt;string, object&gt; parameters, int fixedWidth = 90, int maxHeight = 80)
        {
            var modal = _modal.ShowModal(modalType, parameters, FixedWidth: fixedWidth, MaxHeight: maxHeight);
            modal.OnCloseModal += async (result) =&gt; await LoadApi();
        }

        public async Task AddCompra()
        {
            try
            {
                _main.IsLoading = true;
        
                // Configurar los par&aacute;metros para el modal
                var parameters = new Dictionary&lt;string, object&gt;
                {
                    { nameof(M_NuevaCompra.OnComplete), EventCallback.Factory.Create&lt;bool&gt;(this, OnCompraAdded) }
                };
        
                // Llamar al m&eacute;todo centralizado para mostrar el modal
                await ShowModal(typeof(M_NuevaCompra), parameters, fixedWidth: 60);
            }
            catch (Exception ex)
            {
                Console.WriteLine($&quot;Error en AddCompra: {ex.Message}&quot;);
            }
            finally
            {
                _main.IsLoading = false;
            }
        }
        
        private EstadoCompra GetEstadoCompra(string estado)
        {
            return estado switch
            {
                &quot;En espera de material&quot; =&gt; EstadoCompra.EnEsperaMaterial,
                &quot;Esperando aprobadores&quot; =&gt; EstadoCompra.EsperandoAprobadores,
                &quot;Compra en curso&quot; =&gt; EstadoCompra.CompraEnCurso,
                _ =&gt; EstadoCompra.Otro
            };
        }

        private string GetEstadoColor(EstadoCompra estado)
        {
            return estado switch
            {
                EstadoCompra.EnEsperaMaterial =&gt; &quot;bg-blue-500&quot;,
                EstadoCompra.EsperandoAprobadores =&gt; &quot;bg-orange-500&quot;,
                EstadoCompra.CompraEnCurso =&gt; &quot;bg-green-500&quot;,
                _ =&gt; &quot;bg-gray-300&quot;
            };
        }
        private async Task OnCompraAdded(bool confirmacion)
        {
            if (confirmacion)
            {
                Console.WriteLine(&quot;Compra a&ntilde;adida correctamente. Recargando datos...&quot;);
                await LoadApi();
            }
        }


        public async Task LoadApi()
        {
            try
            {

                await ExecuteWithLoading(async () =&gt;
                {
                    await Task.Delay(500);
                    var pageSize = _main.QueryParameters(_nav)[&quot;pageSize&quot;];
                    var pageNumber = _main.QueryParameters(_nav)[&quot;pageNumber&quot;];

                    if (!string.IsNullOrEmpty(pageSize) &amp;&amp; !string.IsNullOrEmpty(pageNumber))
                    {
                        filters.PageNumber = int.Parse(pageNumber);
                        filters.PageSize = int.Parse(pageSize);
                    }

                    Compras = await _mongoContext.GetPaginatedCompras(filters);

                    await InvokeAsync(StateHasChanged);

                });
            }
            catch (Exception ex)
            {
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, &quot;P_Compras&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);

                throw;
            }
        }

    public async Task OpenModalAlbaranes(E_Compras compra)
        {
            try
            {
                // Configurar los par&aacute;metros para el modal
                var parameters = new Dictionary&lt;string, object&gt;
                {
                    { nameof(M_VistaAlbaranes.ListadoAlbaranes), compra.Albaranes },
                    { nameof(M_VistaAlbaranes.CodigoCompra), compra.CodigoCompra }
                };
        
                // Llamar al m&eacute;todo centralizado para mostrar el modal
                await ShowModal(typeof(M_VistaAlbaranes), parameters, fixedWidth: 60, maxHeight: 80);
            }
            catch (Exception ex)
            {
                Console.WriteLine($&quot;Error en OpenModalAlbaranes: {ex.Message}&quot;);
            }
            finally
            {
                // Realizar la acci&oacute;n posterior al cierre del modal (opcional)
                await LoadApi();
            }
        }



    

        public async Task OpenModalAddEdit(E_Compras compra)
        {
            if (compra.Estados.Last().Estado == &quot;Compra en curso&quot; || compra.Estados.Last().Estado == &quot;Esperando aprobadores&quot; )
            {
                await ShowModal(typeof(M_ModifyCompra), new Dictionary&lt;string, object&gt;
                {
                    { nameof(M_ModifyCompra.Compra), compra }
                });
                
                
            
            }
            else if (compra.Estados.Last().Estado == &quot;En espera de material&quot;)
            {
                await ShowModal(typeof(M_ValidateCompra), new Dictionary&lt;string, object&gt;
                {
                    { nameof(M_ValidateCompra.Compra), compra }
                });
            }
        }
    }
    `
  },
  {
    "ID": 17,
    "ServicesName": "P_GestorAprobadores",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/GestionAprobaciones/P_GestorAprobadores",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/logistica/gestoraprobadores&quot;
    @using System.Text.Json
    @using LogisticaData.Entities
    @using MongoDB.Bson.IO
    @using Newtonsoft.Json
    @using System.Web;

    @*&lt;AuthorizePage Roles=&quot;@(new(){&quot;Logistica.ModProductos&quot;})&quot;&gt;&lt;/AuthorizePage&gt;*@

    &lt;div class=&quot;flex w-full h-screen&quot;&gt;
        &lt;!-- Columna izquierda: 70% --&gt;
        &lt;div class=&quot;w-full p-4 border-r border-gray-200&quot;&gt;
            &lt;h2 class=&quot;text-xl font-bold mb-4&quot;&gt;Gesti&oacute;n de Aprobadores&lt;/h2&gt;
            &lt;div class=&quot;flex flex-col items-start gap-2&quot;&gt;
                &lt;div&gt;
                    &lt;label class=&quot;block text-sm font-medium text-gray-700&quot;&gt;Posibles aprobadores&lt;/label&gt;
                    &lt;select class=&quot;w-full p-2 border border-gray-300 rounded bg-white&quot;&gt;
                        &lt;option value=&quot;&quot; disabled selected&gt;Selecciona aprobador&lt;/option&gt;
                        @if (Usuarios.Any())
                        {
                            foreach (var item in Usuarios)
                            {
                                &lt;option value=&quot;@item.Id&quot; @onclick=&quot;@(()=&gt;AgregarAprobador(item))&quot;&gt;@item.Name @item.LastName&lt;/option&gt;
                            }
                        }
                    &lt;/select&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;div id=&quot;approver-list&quot; class=&quot;grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4&quot;&gt;
                @if (Aprobadores.Documents != null)
                {
                foreach (var item in Aprobadores.Documents)
                    {
                        &lt;!--CARD Aprobador--&gt;
                        &lt;div class=&quot;max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl&quot;&gt;
                            &lt;div class=&quot;p-4&quot;&gt;
                                &lt;div class=&quot;text-center&quot;&gt;
                                    &lt;!-- Imagen o icono centrada --&gt;
                                    &lt;img class=&quot;w-16 h-16 mx-auto rounded-full border-2 border-blue-500&quot; src=&quot;@item.ImagenPerfil&quot; alt=&quot;Aprobador&quot; /&gt;

                                    &lt;!-- Texto debajo de la imagen --&gt;
                                    &lt;div class=&quot;mt-2&quot;&gt;
                                        &lt;h2 class=&quot;text-base font-semibold text-gray-900&quot;&gt;@item.EmailAprobador.ToLower()&lt;/h2&gt;
                                        &lt;p class=&quot;text-sm text-gray-600&quot;&gt;Rol: Aprobador&lt;/p&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;
                                &lt;hr class=&quot;my-4&quot;&gt;
                                &lt;!-- Criterios --&gt;
                                &lt;div&gt;
                                    &lt;h5 class=&quot;text-sm font-bold text-gray-700 mb-2&quot;&gt;Criterios:&lt;/h5&gt;
                                    &lt;div class=&quot;flex flex-wrap gap-2&quot;&gt;
                                        @foreach (var criterio in CriteriosDisponibles)
                                        {
                                            &lt;button class=&quot;px-4 py-2 rounded-lg shadow text-sm font-medium transition
        @(item.ListaCriteriosAprobacion.Contains(criterio) &amp;&amp;
            !PrioridadesDisponibles.Contains(item.ListaCriteriosAprobacion.LastOrDefault())
            ? &quot;bg-blue-500 text-white hover:bg-blue-600&quot;
            : &quot;bg-gray-200 text-gray-700 hover:bg-gray-300&quot;)&quot;
                                                    @onclick=&quot;() =&gt; ToggleCriterio(item, criterio)&quot;&gt;
                                                @criterio
                                            &lt;/button&gt;
                                        }

                                        &lt;hr class=&quot;my-2 w-full border-gray-300&quot; /&gt;
                                        &lt;h6 class=&quot;text-xs font-bold text-gray-600 w-full&quot;&gt;Prioridad&lt;/h6&gt;
                                        @foreach (var prioridad in PrioridadesDisponibles)
                                        {
                                            &lt;button class=&quot;px-4 py-2 rounded-lg shadow text-sm font-medium transition
                                            @(item.Prioridad == int.Parse(prioridad)
                                            ? &quot;bg-green-500 text-white hover:bg-green-600&quot;
                                            : &quot;bg-gray-200 text-gray-700 hover:bg-gray-300&quot;)&quot;
                                                    @onclick=&quot;() =&gt; TogglePrioridad(item, prioridad)&quot;&gt;
                                                @prioridad
                                            &lt;/button&gt;
                                        }
                                    &lt;/div&gt;
                                &lt;/div&gt;
                                &lt;div class=&quot;mt-4 flex justify-between items-center&quot;&gt;
                                    &lt;button class=&quot;bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600&quot; @onclick=&quot;()=&gt;GuardarAprobador(item)&quot;&gt;
                                        Guardar
                                    &lt;/button&gt;
                                    &lt;button class=&quot;px-4 py-2 rounded-lg shadow text-sm font-medium transition
                                @(item.Pausa ? &quot;bg-yellow-500 text-white hover:bg-yellow-600&quot; : &quot;bg-gray-200 text-gray-700 hover:bg-gray-300&quot;)&quot;
                                            @onclick=&quot;() =&gt; TogglePausa(item)&quot;&gt;
                                        @(item.Pausa ? &quot;Pausa Activa&quot; : &quot;Activar Pausa&quot;)
                                    &lt;/button&gt;
                                    &lt;button class=&quot;bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600&quot; @onclick=&quot;()=&gt;EliminarAprobador(item)&quot;&gt;
                                        Eliminar
                                    &lt;/button&gt;
                                &lt;/div&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    }
                }
            
            &lt;/div&gt;

        &lt;/div&gt;
    &lt;/div&gt;

    @code {

        private List&lt;string&gt; CriteriosDisponibles = new List&lt;string&gt; { &quot;&gt;1000&quot;, &quot;&gt;3000&quot;, &quot;&gt;10000&quot; };
        private List&lt;string&gt; PrioridadesDisponibles = new List&lt;string&gt; { &quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot; };

        private List&lt;E_User&gt; Usuarios { get; set; } = new();

        private PaginatedResult&lt;E_Aprobador&gt; Aprobadores { get; set; } = new();

        private FiltersBase filters = new()
            {
                PageNumber = 1,
                PageSize = 10000,
                Search = &quot;&quot;
            };

        protected override async Task OnInitializedAsync()
        {
            await LoadAPI();
        }

        async Task LoadAPI()
        {
            try
            {
            _main.IsLoading = true;

                var pageSize = _main.QueryParameters(_nav)[&quot;pageSize&quot;];
                var pageNumber = _main.QueryParameters(_nav)[&quot;pageNumber&quot;];

                if (!string.IsNullOrEmpty(pageSize) &amp;&amp; !string.IsNullOrEmpty(pageNumber))
                {
                    filters.PageNumber = int.Parse(pageNumber);
                    filters.PageSize = int.Parse(pageSize);
                }

                Usuarios = await _mongoContext.Data&lt;E_User&gt;(DatabaseIdentifiers.Main).Find(x =&gt; x.Roles.Any(c =&gt; c.Name == &quot;Logistica.Aprobador&quot;)).ToListAsync();
                Aprobadores = await _mongoContext.GetPaginatedAprobadores(filters);

                await InvokeAsync(StateHasChanged);
                _main.IsLoading = false;
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;P_GestorAprobadores&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);

                throw;
            }
    
        }

        private void ToggleCriterio(E_Aprobador item, string criterio)
        {

            if (PrioridadesDisponibles.Contains(criterio)) return;

            if (item.ListaCriteriosAprobacion.Contains(criterio))
                item.ListaCriteriosAprobacion.Remove(criterio);
            else
                item.ListaCriteriosAprobacion.Add(criterio);

            StateHasChanged();
        }

        private void TogglePrioridad(E_Aprobador item, string prioridad)
        {
            int prioridadSeleccionada = int.Parse(prioridad);

            if (item.Prioridad == prioridadSeleccionada)
                item.Prioridad = 0;
            else
                item.Prioridad = prioridadSeleccionada;

            StateHasChanged();
        }

        private void TogglePausa(E_Aprobador item)
        {
            item.Pausa = !item.Pausa;
            StateHasChanged();
        }

        public async void AgregarAprobador(E_User usuariosArpobadores)
        {
            if (Aprobadores.Documents.Any(a =&gt; a.IdUsuarioAprobador == usuariosArpobadores.Id))
            {
                _snackbar.InsertSnackbar(new(&quot;El aprobador ya est&aacute; en la lista&quot;, &quot;info&quot;, 5000, &quot;bg-yellow-400&quot;, &quot;text-white&quot;));
                return;
            }

            var nuevoAprobador = new E_Aprobador
                {
                    IdUsuarioAprobador = usuariosArpobadores.Id,
                    EmailAprobador = usuariosArpobadores.Email,
                    ImagenPerfil = usuariosArpobadores.ProfilePic,
                    Pausa = false,
                    Prioridad = 0,
                    ListaCriteriosAprobacion = new List&lt;string&gt;()
                };

            // Agregar a la lista local
            Aprobadores.Documents.Add(nuevoAprobador);

            try
            {
            // Guardar en la base de datos
                    var resultado = await _mongoContext.AddAprobador(nuevoAprobador);
                    if (resultado.IsSuccess)
                    {
                        _snackbar.InsertSnackbar(new(&quot;Aprobador a&ntilde;adido con &eacute;xito&quot;, &quot;check&quot;, 5000, &quot;bg-teal-400&quot;, &quot;text-white&quot;));
                    }
                    else
                    {
                        _snackbar.InsertSnackbar(new(&quot;Algo fue mal al agregar el aprobador&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                        // Eliminar de la lista local si hubo un error en la base de datos
                        Aprobadores.Documents.Remove(nuevoAprobador);
                    }

            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;P_GestorAprobadores&quot;, &quot;AgregarAprobador&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                await InvokeAsync(StateHasChanged);
            }
    
        }


        public async void EliminarAprobador(E_Aprobador idAprobador)
        {
            Console.WriteLine($&quot;Intentando eliminar el aprobador con ID: {idAprobador}&quot;);

            try
            {
            var resultado = await _mongoContext.DeleteOneAprobador(idAprobador.Id);
                    if (resultado.IsSuccess)
                    {
                        _snackbar.InsertSnackbar(new(&quot;Aprobador eliminado con &eacute;xito&quot;, &quot;check&quot;, 5000, &quot;bg-teal-400&quot;, &quot;text-white&quot;));
                    }
                    else
                    {
                        _snackbar.InsertSnackbar(new(&quot;Algo fue mal al eliminar el aprobador\n\r&quot; + resultado.Errors, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                        return;
                    }

                    Aprobadores.Documents.Remove(idAprobador);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;P_GestorAprobadores&quot;, &quot;EliminarAprobador&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                await InvokeAsync(StateHasChanged);
            }
            
        
        }

        public async void GuardarAprobador(E_Aprobador aprobador)
        {
            if (aprobador.Prioridad == 0 || aprobador.Prioridad == null)
            {
                _snackbar.InsertSnackbar(new(&quot;Se requiere seleccionar una prioridad&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                return;
            }

            if (!aprobador.ListaCriteriosAprobacion.Any())
            {
                _snackbar.InsertSnackbar(new(&quot;Se requiere seleccionar al menos un criterio&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                return;
            }

            // Verificar si el aprobador ya existe en la lista
            var aprobadorExistente = Aprobadores.Documents.FirstOrDefault(a =&gt; a.IdUsuarioAprobador == aprobador.IdUsuarioAprobador);

            if (aprobadorExistente != null)
            {
                // Si el aprobador ya existe, actualiza sus valores
                aprobadorExistente.Prioridad = aprobador.Prioridad;
                aprobadorExistente.Pausa = aprobador.Pausa; // Incluye el estado actualizado de Pausa
                aprobadorExistente.ListaCriteriosAprobacion = new List&lt;string&gt;(aprobador.ListaCriteriosAprobacion);

                try
                {
                var resultado = await _mongoContext.EditAprobador(aprobadorExistente);
                            if (resultado.IsSuccess)
                            {
                                _snackbar.InsertSnackbar(new($&quot;Aprobador actualizado con &eacute;xito&quot;, &quot;check&quot;, 5000, &quot;bg-teal-400&quot;, &quot;text-white&quot;));
                
                            }
                            else
                            {
                                _snackbar.InsertSnackbar(new(&quot;Algo fue mal al actualizar el aprobador\n\r&quot; + resultado.Errors, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                                return;
                            }
                }
                catch (Exception e)
                {
                    
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;P_GestorAprobadores&quot;, &quot;GuardarAprobador &gt; EditAprobador&quot;, DateTime.UtcNow);

                    throw;
                }
            
            }
            else
            {
                try
                {
                // Si es un aprobador nuevo, intenta guardarlo en la base de datos
                            var resultado = await _mongoContext.AddAprobador(aprobador);
                            if (resultado.IsSuccess)
                            {
                
                                _snackbar.InsertSnackbar(new($&quot;Aprobador guardado con &eacute;xito&quot;, &quot;check&quot;, 5000, &quot;bg-teal-400&quot;, &quot;text-white&quot;));
                
                            }
                            else
                            {
                                _snackbar.InsertSnackbar(new(&quot;Algo fue mal al guardar el aprobador\n\r&quot; + resultado.Errors, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                                return;
                            }
                }
                catch (Exception e)
                {
                    
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;P_GestorAprobadores&quot;, &quot;GuardarAprobador &gt; AddAprobador&quot;, DateTime.UtcNow);

                    throw;
                }
            
            }

            // Recargar la lista completa desde la base de datos
            await LoadAPI();
        }

    }
    `
  },
  {
    "ID": 18,
    "ServicesName": "M_AddEditProducto",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Productos/M_AddEditProducto",
    "ServicesDescription": "",
    "Code": `
    &lt;EditForm class=&quot;w-full h-fit flex flex-wrap gap-3 justify-between p-2&quot; Model=&quot;AddEdit&quot; OnValidSubmit=&quot;SendAsync&quot;&gt;
        &lt;DataAnnotationsValidator&gt;&lt;/DataAnnotationsValidator&gt;
        &lt;span class=&quot;w-full text-blue-400 text-xl&quot;&gt;@(IsEdit ? $&quot;Editar producto {AddEdit.CodigoProducto}&quot; : &quot;A&ntilde;adir producto&quot;)&lt;/span&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Nombre&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Nombre&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Nombre&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Imagen del producto&lt;/span&gt;

            @if (string.IsNullOrEmpty(AddEdit.NameFile))
            {
                &lt;InputFile id=&quot;image&quot; hidden OnChange=&quot;UploadImage&quot;&gt;&lt;/InputFile&gt;
                &lt;label for=&quot;image&quot; class=&quot;w-fit rounded p-2 bg-blue-400 text-white&quot;&gt;Seleccionar imagen del producto&lt;/label&gt;
            }
            else
            {
                &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.NameFile&quot; readonly&gt;&lt;/InputText&gt;

                &lt;button class=&quot;w-fit h-fit p-2 bg-red-600 text-white&quot; @onclick=&quot;@(()=&gt; AddEdit.NameFile = &quot;&quot;)&quot;&gt;Borrar imagen&lt;/button&gt;
            }
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Familia del producto&lt;/span&gt;

            &lt;InputSelect class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.FamiliaProducto&quot;&gt;
                &lt;option value=&quot;&quot;&gt;Selecciona una familia&lt;/option&gt;
                &lt;option value=&quot;Adaptadores&quot;&gt;Adaptadores&lt;/option&gt;
                &lt;option value=&quot;Activos FO&quot;&gt;Activos FO&lt;/option&gt;
                &lt;option value=&quot;Arquetas y tapas&quot;&gt;Arquetas y tapas&lt;/option&gt;
                &lt;option value=&quot;Armarios, repartidores, bandejas de empalme y parcheo&quot;&gt;Armarios, repartidores, bandejas de empalme y parcheo&lt;/option&gt;
                &lt;option value=&quot;Cajas y torpedos de empalme y segregaci&oacute;n&quot;&gt;Cajas y torpedos de empalme y segregaci&oacute;n&lt;/option&gt;
                &lt;option value=&quot;Cables FO&quot;&gt;Cables FO&lt;/option&gt;
                &lt;option value=&quot;Cables el&eacute;ctricos&quot;&gt;Cables el&eacute;ctricos&lt;/option&gt;
                &lt;option value=&quot;Conectores&quot;&gt;Conectores&lt;/option&gt;
                &lt;option value=&quot;CTO exterior&quot;&gt;CTO exterior&lt;/option&gt;
                &lt;option value=&quot;CTO interior&quot;&gt;CTO interior&lt;/option&gt;
                &lt;option value=&quot;EPIs&quot;&gt;EPIs&lt;/option&gt;
                &lt;option value=&quot;Etiquetado y sujecci&oacute;n&quot;&gt;Etiquetado y sujecci&oacute;n&lt;/option&gt;
                &lt;option value=&quot;Herramientas y accesorios&quot;&gt;Herramientas y accesorios&lt;/option&gt;
                &lt;option value=&quot;Latiguillos&quot;&gt;Latiguillos&lt;/option&gt;
                &lt;option value=&quot;Obturadores&quot;&gt;Obturadores&lt;/option&gt;
                &lt;option value=&quot;Obra civil&quot;&gt;Obra civil&lt;/option&gt;
                &lt;option value=&quot;Pigtail&quot;&gt;Pigtail&lt;/option&gt;
                &lt;option value=&quot;Rosetas&quot;&gt;Rosetas&lt;/option&gt;
                &lt;option value=&quot;Soporte, fijaci&oacute;n y torniller&iacute;a&quot;&gt;Soporte, fijaci&oacute;n y torniller&iacute;a&lt;/option&gt;
                &lt;option value=&quot;Splitter&quot;&gt;Splitter&lt;/option&gt;
                &lt;option value=&quot;Subconductos y accesorios&quot;&gt;Subconductos y accesorios&lt;/option&gt;
                &lt;option value=&quot;Consumibles&quot;&gt;Consumibles&lt;/option&gt;

            &lt;/InputSelect&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.FamiliaProducto&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Unidades&lt;/span&gt;

            &lt;InputSelect class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Unidades&quot;&gt;

                &lt;option value=&quot;&quot;&gt;Selecciona la unidad de medida&lt;/option&gt;
                &lt;option value=&quot;Unidades&quot;&gt;Unidades&lt;/option&gt;
                &lt;option value=&quot;Metros&quot;&gt;Metros&lt;/option&gt;
                &lt;option value=&quot;KG&quot;&gt;KG&lt;/option&gt;

            &lt;/InputSelect&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Unidades&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Descripci&oacute;n&lt;/span&gt;

            &lt;InputTextArea class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Descripcion&quot;&gt;&lt;/InputTextArea&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Descripcion&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;
        &lt;div class=&quot;w-full h-fit flex flex-col gap-1&quot;&gt;

            &lt;div class=&quot;flex items-center gap-2&quot;&gt;
                &lt;span class=&quot;text-blue-400&quot;&gt;Tipo Producto&lt;/span&gt;
                &lt;span class=&quot;text-grey-400&quot;&gt;&lt;em&gt;Nota: Si es bobina, debe de marcarse tambi&eacute;n la casilla de: &lt;b&gt;Producto Seriable&lt;/b&gt;&lt;/em&gt;&lt;/span&gt;
            &lt;/div&gt;
            &lt;div class=&quot;flex items-center gap-2&quot;&gt;
                &lt;InputCheckbox class=&quot;rounded border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.CheckSeriable&quot; /&gt;
                &lt;label class=&quot;text-gray-700&quot;&gt;Producto Seriable&lt;/label&gt;
            &lt;/div&gt;
            &lt;div class=&quot;flex items-center gap-2&quot;&gt;
                &lt;InputCheckbox class=&quot;rounded border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.EsBobina&quot; /&gt;
                &lt;label class=&quot;text-gray-700&quot;&gt;&iquest;Es bobina?&lt;/label&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400 flex flex-wrap items-center gap-3&quot;&gt;
                Proveedores -
                &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;()=&gt; AddEdit.Proveedores.Add(new())&quot;&gt;
                    A&ntilde;adir proveedor
                &lt;/button&gt;
            &lt;/span&gt;

            &lt;table class=&quot;table-auto w-full h-fit border border-collapse border-slate-300/50&quot;&gt;
                &lt;thead&gt;
                    &lt;tr&gt;
                        &lt;th class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;Proveedor&lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;C&oacute;digo del proveedor&lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;Valor&lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;Acciones&lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    @foreach (var v in AddEdit.Proveedores)
                    {
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;
                                @if (v.Proveedor == null)
                                {
                                    &lt;Autocomplete T=&quot;E_Proveedor&quot;
                                    Database=&quot;@DatabaseIdentifiers.RedFija&quot;
                                    FilterMongo=&quot;@((s)=&gt; Builders&lt;E_Proveedor&gt;.Filter.Regex(x=&gt; x.NombreComercial, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                                    Placeholder=&quot;Proveedor...&quot;
                                    ToString=&quot;@((x)=&gt; x.NombreComercial)&quot; SelectOne=&quot;@((x)=&gt; {v.Proveedor = x; InvokeAsync(StateHasChanged);})&quot;&gt;
                                    &lt;/Autocomplete&gt;
                                }
                                else
                                {
                                    &lt;Autocomplete T=&quot;E_Proveedor&quot;
                                    Database=&quot;@DatabaseIdentifiers.RedFija&quot;
                                    FilterMongo=&quot;@((s)=&gt; Builders&lt;E_Proveedor&gt;.Filter.Regex(x=&gt; x.NombreComercial, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                                    Placeholder=&quot;Proveedor...&quot;
                                    ToString=&quot;@((x)=&gt; x.NombreComercial)&quot; SelectOne=&quot;@((x)=&gt; {v.Proveedor = x; InvokeAsync(StateHasChanged);})&quot;
                                    InitialTextValue=&quot;@(v.Proveedor.NombreComercial)&quot;
                                    InitialValue=&quot;v.Proveedor&quot;&gt;
                                    &lt;/Autocomplete&gt;
                                }

                                &lt;ValidationMessage For=&quot;()=&gt; v.Proveedor&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;
                                &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;v.CodigoProveedor&quot;&gt;&lt;/InputText&gt;
                                &lt;ValidationMessage For=&quot;()=&gt; v.CodigoProveedor&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;
                                &lt;InputNumber TValue=&quot;float&quot; class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;v.Valor&quot;&gt;&lt;/InputNumber&gt;
                                &lt;ValidationMessage For=&quot;()=&gt; v.Valor&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 border border-collapse border-slate-300/50&quot;&gt;
                                &lt;button class=&quot;w-fit h-fit p-2 bg-red-600 text-white&quot; @onclick=&quot;()=&gt; AddEdit.Proveedores.Remove(v)&quot;&gt;
                                    Borrar esta l&iacute;nea
                                &lt;/button&gt;
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    }
                &lt;/tbody&gt;
            &lt;/table&gt;
        &lt;/div&gt;


        &lt;div class=&quot;w-full h-fit flex flex-wrap items-center justify-end gap-3&quot;&gt;
            &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-red-600 text-white&quot; @onclick=&quot;()=&gt; Close(false)&quot;&gt;Salir sin guardar&lt;/button&gt;
            &lt;button type=&quot;submit&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot;&gt;Guardar&lt;/button&gt;
        &lt;/div&gt;
    &lt;/EditForm&gt;

    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }

        [Parameter] public E_Producto AddEdit { get; set; }

        [Parameter]
        public bool IsEdit { get; set; }

        bool Sending = false;

        protected override async Task OnInitializedAsync()
        {
            if (AddEdit == null)
            {
                AddEdit = new();
            }
        }

        async Task UploadImage(InputFileChangeEventArgs e)
        {
            if (e.File != null)
            {
                if (e.File.Size &gt; 2000000)
                {
                    _snackbar.InsertSnackbar(new(&quot;La imagen no puede pesar m&aacute;s de 2 MB&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                    return;
                }

                var ms = new MemoryStream();

                await e.File.OpenReadStream(e.File.Size).CopyToAsync(ms);

                AddEdit.NameFile = e.File.Name;
                AddEdit.Image = ms.ToArray();
            }
        }

        public async Task SendAsync()
        {
            _main.IsLoading = true;

            if (Sending) return;

            Sending = true;

            if (string.IsNullOrEmpty(AddEdit.NameFile))
            {
                _snackbar.InsertSnackbar(new(&quot;Selecciona una imagen para el producto&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                return;
            }

            try
            {
                
                if (IsEdit)
                {
                    

                    await _mongoContext.EditProducto(AddEdit);
                }
                else
                {
                    AddEdit.Id = ObjectId.GenerateNewId().ToString(); // Genera un nuevo ID &uacute;nico
                    AddEdit.NameFile = AddEdit.Id + AddEdit.NameFile;
                    await _mongoContext.AddProducto(AddEdit);
                }
            }
            catch (Exception ex )
            {
                
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, &quot;M_AddEditProducto&quot;, &quot;SendAsync&quot;, DateTime.UtcNow);

                throw;
            }


            Close(true);
            Sending = false;

            _main.IsLoading = false;
        }
    }
    `
  },
  {
    "ID": 19,
    "ServicesName": "P_Producto",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Productos/P_Producto",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/logistica/productos&quot;
    &lt;div class=&quot;w-full h-fit flex flex-wrap p-4 gap-3&quot;&gt;
        &lt;h1 class=&quot;w-full flex flex-wrap items-center text-2xl text-blue-400 font-bold&quot;&gt;
            Productos - @(Proveedores.CountAllDocuments) registros
        &lt;/h1&gt;

        &lt;!-- Controles superiores --&gt;
        &lt;div class=&quot;w-full h-fit flex flex-wrap justify-between items-center&quot;&gt;
            &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaProductosAddProductos)&quot;&gt;
        
            &lt;button type=&quot;button&quot; class=&quot;p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;()=&gt;OpenModalAddEdit()&quot;&gt;
                A&ntilde;adir producto
            &lt;/button&gt;
            &lt;/AuthorizedContent&gt;
            &lt;InputText class=&quot;p-2 border border-slate-300/50&quot;
                    ValueExpression=&quot;() =&gt; filters.Search&quot;
                    ValueChanged=&quot;(c)=&gt; {filters.Search = c; LoadAPI();}&quot;
                    placeholder=&quot;Buscar...&quot;&gt;
            &lt;/InputText&gt;
        &lt;/div&gt;

        &lt;!-- Contenedor en grid --&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6&quot;&gt;
            @if (Proveedores.Documents != null)
            {
                @foreach (var v in Proveedores.Documents)
                {
                    &lt;div class=&quot;bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col h-80&quot;&gt;

                        &lt;!-- Imagen --&gt;
                        &lt;div class=&quot;h-[60%] w-full&quot;&gt;
                            &lt;img src=&quot;@($&quot;https://lpsgrupolatam.s3.sa-east-1.amazonaws.com/ImagenesProducto/{v.NameFile}&quot;)&quot;
                                alt=&quot;@v.Nombre&quot;
                                class=&quot;w-full h-full object-cover rounded-t-xl&quot;&gt;
                    
                        &lt;/div&gt;

                        &lt;!-- Informaci&oacute;n --&gt;
                        &lt;div class=&quot;h-[40%] flex flex-col justify-between p-3&quot;&gt;
                            &lt;h3 class=&quot;text-sm font-semibold text-gray-800 truncate&quot;&gt;@v.Nombre&lt;/h3&gt;
                            &lt;p class=&quot;text-xs text-gray-500 truncate&quot;&gt;C&oacute;digo: @v.CodigoProducto&lt;/p&gt;
                            &lt;p class=&quot;text-xs text-gray-600&quot;&gt;Familia: @v.FamiliaProducto&lt;/p&gt;
                            &lt;p class=&quot;text-xs text-gray-600&quot;&gt;Unidades: @v.Unidades&lt;/p&gt;

                            &lt;button class=&quot;mt-2 bg-blue-500 text-white text-sm py-1 px-2 rounded&quot;
                                    @onclick=&quot;()=&gt; OpenModalAddEdit(v)&quot;&gt;
                                Ver Detalles
                            &lt;/button&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                }
            }
        &lt;/div&gt;

        &lt;!-- Paginador --&gt;
        &lt;Paginator countAllDocuments=&quot;(int)Proveedores.CountAllDocuments&quot; countPages=&quot;Proveedores.PageCount&quot;
                filters=&quot;filters&quot; ReloadData=&quot;()=&gt;LoadAPI()&quot;&gt;
        &lt;/Paginator&gt;
    &lt;/div&gt;


    @code {
        public PaginatedResult&lt;E_Producto&gt; Proveedores { get; set; } = new();
        public FiltersBase filters = new()
            {
                PageNumber = 1,
                PageSize = 10,
                Search = &quot;&quot;
            };

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;&quot;;
            await LoadAPI();
        }

        async Task LoadAPI()
        {
            try
            {
                _main.IsLoading = true;

                    var pageSize = _main.QueryParameters(_nav)[&quot;pageSize&quot;];
                    var pageNumber = _main.QueryParameters(_nav)[&quot;pageNumber&quot;];

                    if (!string.IsNullOrEmpty(pageSize) &amp;&amp; !string.IsNullOrEmpty(pageNumber))
                    {
                        filters.PageNumber = int.Parse(pageNumber);
                        filters.PageSize = int.Parse(pageSize);
                    }

                    Proveedores = await _mongoContext.GetPaginatedProductos(filters);
            }
            catch (Exception e)
            {


                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;P_Producto&quot;, &quot;LoadAPI&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
            await  InvokeAsync(StateHasChanged);

                _main.IsLoading = false;
            }
    

        
        }

        void OpenModalAddEdit(E_Producto edit = null)
        {
            if (edit != null)
            {
                var modal = _modal.ShowModal(typeof(M_AddEditProducto), new Dictionary&lt;string, object&gt;
                {
                    {nameof(M_AddEditProducto.AddEdit), edit},
                    {nameof(M_AddEditProducto.IsEdit), true},
                }, FixedWidth: 80, MaxHeight: 80);

                modal.OnCloseModal += (b) =&gt;
                {
                    LoadAPI();
                };
            }
            else
            {
                var modal = _modal.ShowModal(typeof(M_AddEditProducto), new Dictionary&lt;string, object&gt;
                {
                    {nameof(M_AddEditProducto.AddEdit), edit},
                    {nameof(M_AddEditProducto.IsEdit), false},
                }, FixedWidth: 80, MaxHeight: 80);

                modal.OnCloseModal += (b) =&gt;
                {
                    LoadAPI();
                };
            }
        
        }
    }
    `
  },
  {
    "ID": 20,
    "ServicesName": "P_StockProductos",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Productos/P_StockProductos",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/logistica/stockproductos&quot;
    @using LPSGrupo.Components.Areas.MovilF.SeguimientoMovil.Helpers
    @using LogisticaData.Entities
    @using SeguimientoMovilLogic.Extra.DataSeguimiento


    &lt;div class=&quot;w-full p-4 bg-gray-100 rounded-lg shadow mb-4 mx-4 shadow-lg&quot;&gt;
        &lt;!-- Campos de b&uacute;squeda --&gt;
        &lt;div class=&quot;grid grid-cols-8 gap-4 mx-4&quot;&gt;

            &lt;input type=&quot;text&quot; class=&quot;p-2 border border-gray-300 rounded&quot; placeholder=&quot;Nombre producto&quot;
                @oninput=&quot;@((e) =&gt; { Nsearch = e.Value?.ToString(); UpdateSearch(&quot;N&quot;); })&quot; /&gt;
            &lt;input type=&quot;text&quot; class=&quot;p-2 border border-gray-300 rounded&quot; placeholder=&quot;Nombre Almacen&quot;
                @oninput=&quot;@((e) =&gt; { Asearch = e.Value?.ToString(); UpdateSearch(&quot;A&quot;); })&quot; /&gt; 
            &lt;input type=&quot;text&quot; class=&quot;p-2 border border-gray-300 rounded&quot; placeholder=&quot;Proyecto&quot;
                @oninput=&quot;@((e) =&gt; { Psearch = e.Value?.ToString(); UpdateSearch(&quot;P&quot;); })&quot; /&gt;

            &lt;button type=&quot;button&quot; class=&quot;p-2 rounded bg-green-400 text-white&quot; @onclick=&quot;@(()=&gt;UpdateSearch(&quot;B&quot;))&quot;&gt;Restablecer filtros&lt;/button&gt;

        &lt;/div&gt;
    &lt;/div&gt;

    &lt;div class=&quot;overflow-x-auto mx-4&quot;&gt;
        &lt;table class=&quot;w-full h-fit table-auto rounded  border-collapse rounded-lg shadow-lg&quot;&gt;
            &lt;thead&gt;
                &lt;tr&gt;
                    &lt;th class=&quot;p-2 bg-blue-400&quot; style=&quot;color:aliceblue&quot;&gt;Proyecto&lt;/th&gt;
                    &lt;th class=&quot;p-2 bg-blue-400&quot; style=&quot;color:aliceblue&quot;&gt;Almac&eacute;n&lt;/th&gt;
                    &lt;th class=&quot;p-2 bg-blue-400&quot; style=&quot;color:aliceblue&quot;&gt;Nombre producto&lt;/th&gt;
                    &lt;th class=&quot;p-2 bg-blue-400&quot; style=&quot;color:aliceblue&quot;&gt;Cantidad total&lt;/th&gt;
                    &lt;th class=&quot;p-2 bg-blue-400&quot; style=&quot;color:aliceblue&quot;&gt;Cantidad Reservada&lt;/th&gt;
                &lt;/tr&gt;
            &lt;/thead&gt;
            &lt;tbody&gt;
                @if (ProductosStockAlmacenes.Documents != null)
                {
                    @foreach (var v in ProductosStockAlmacenes.Documents)
                    {
                        &lt;tr&gt;
                            &lt;td class=&quot;p-2 border border-slate-300/50&quot;&gt;@v.NombreProyecto&lt;/td&gt;
                            &lt;td class=&quot;p-2 border border-slate-300/50&quot;&gt;@v.NombreAlmacen&lt;/td&gt;
                            &lt;td class=&quot;p-2 border border-slate-300/50&quot;&gt;@v.NombreProducto&lt;/td&gt;
                            @if (v.CheckSeriable)
                            {
                                &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@v.ProductosStock.Sum(f =&gt; f.ProductoEnStock.ListaNumSeries.Count)&lt;/td&gt;

                            }
                            else
                            {
                                &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@v.TotalCantidad&lt;/td&gt;
                            }
                            &lt;td class=&quot;p-2 border border-slate-300/50&quot;&gt;@v.TotalReservado&lt;/td&gt;
                            @if (v.CheckSeriable)
                            {
                                &lt;td class=&quot;p-2 border border-slate-300/50 text-center&quot;&gt;
                                    &lt;button class=&quot;bg-slate-300 text-white px-3 py-1 rounded transition duration-200  hover:bg-transparent&quot;
                                            @onclick=&quot;() =&gt; ToggleSerie(v.IdProducto + v.IdAlmacen + v.IdProyecto)&quot;&gt;
                                        📦 
                                    &lt;/button&gt;
                                &lt;/td&gt;
                            }
                        &lt;/tr&gt;

                        @if (MostrarSeries.Any() &amp;&amp; v.CheckSeriable &amp;&amp; MostrarSeries[v.IdProducto + v.IdAlmacen + v.IdProyecto])
                        {
                            @foreach (var producto in v.ProductosStock)
                            {
                                &lt;tr class=&quot;bg-gray-100&quot;&gt;
                                    &lt;td colspan=&quot;5&quot; class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                        &lt;b&gt;@producto.ProductoEnStock.Nombre&lt;/b&gt; - N&uacute;meros de Serie:
                                        &lt;ul class=&quot;list-disc pl-5 text-sm&quot;&gt;
                                            @foreach (var serie in producto.ProductoEnStock.ListaNumSeries)
                                            {


                                                &lt;li class=&quot;flex flex-row items-center transition duration-200 hover:bg-blue-300&quot;&gt;
                                                    &lt;div class=&quot;basis-1/3&quot;&gt;@serie&lt;/div&gt;
                                                
                                                    &lt;!-- Parte derecha (Input y Checkbox) --&gt;
                                                
                                                        @if (producto.ProductoEnStock.EsBobina)
                                                        {
                                                            var medida = producto.ProductoEnStock.ListaMedidas.FirstOrDefault(x =&gt; x.NumSerie == serie);
                                                            
                                                            if (medida != null)
                                                            {
                                                            &lt;div class=&quot;basis-2/3&quot;&gt;|   Metros Disponibles: @medida.ValorMedida  @medida.TipoUnidad&lt;/div&gt;

                                                            }

                                                        }
                                            
                                                &lt;/li&gt;
                                                &lt;hr/&gt;
                                            }
                                        &lt;/ul&gt;
                                    &lt;/td&gt;
                                &lt;/tr&gt;
                            }
                        }
                    }
                }
            &lt;/tbody&gt;

        &lt;/table&gt;
        &lt;Paginator ChangeURL=false countAllDocuments=&quot;(int)ProductosStockAlmacenes.CountAllDocuments&quot; countPages=&quot;ProductosStockAlmacenes.PageCount&quot; filters=&quot;filters&quot;
                ReloadData=&quot;()=&gt;LoadApi()&quot;&gt;&lt;/Paginator&gt;

    &lt;/div&gt;



    @code {

        private string? Nsearch { get; set; }
        private string? Asearch { get; set; }
        private string? Psearch { get; set; }

        private PaginatedResult&lt;E_ProductoAlmacenGrouped&gt; ProductosStockAlmacenes = new();
        private PaginatedResult&lt;E_Almacen&gt; Almacenes = new();
        private PaginatedResult&lt;E_ProyectosRedFija&gt; Proyectos = new();
        private Dictionary&lt;string, bool&gt; MostrarSeries = new();



        private FiltersBase filters = new()
            {
                PageNumber = 1,
                PageSize = 10,
                Search = &quot;&quot;

            };

        protected override async Task OnInitializedAsync()
        {
            await LoadApi();
            await InicializarMostrarSeries();
        }

        private async Task InicializarMostrarSeries()
        {
            MostrarSeries.Clear(); // Limpia el diccionario antes de rellenarlo

            if (ProductosStockAlmacenes?.Documents != null)
            {
                foreach (var producto in ProductosStockAlmacenes.Documents)
                {
                    if (producto.CheckSeriable)
                    {


                        // Verificar si la clave ya existe antes de agregarla
                        if (!MostrarSeries.ContainsKey(producto.IdProducto + producto.IdAlmacen + producto.IdProyecto))
                        {
                            MostrarSeries.Add(producto.IdProducto + producto.IdAlmacen + producto.IdProyecto, false); // Inicialmente oculto
                        }
                    }
                }
            }
        }

        private void ToggleSerie(string IdProducto)
        {
            if (MostrarSeries.ContainsKey(IdProducto))
            {
                MostrarSeries[IdProducto] = !MostrarSeries[IdProducto];
            }
            else
            {
                MostrarSeries[IdProducto] = true;
            }
        }



        private async Task LoadApi()
        {
            try
            {
                ProductosStockAlmacenes = await _mongoContext.GetPaginatedGroupedProductosAlmacen(filters, &quot;NA&quot;, false); 
                Proyectos = await _mongoContext.GetPaginatedProyectosRedFija(filters);
                Almacenes = await _mongoContext.GetPaginatedAlmacen(filters);

                await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;P_StockProductos&quot;, &quot;LoadAPI&quot;, DateTime.UtcNow);

                throw;
            }
            

        }

        private async Task UpdateSearch(string type)
        {
            switch (type)
            {
                case &quot;N&quot;:         
                    if (Nsearch.Length &gt;= 3)
                    {
                        filters.Search = &quot;N&quot;+Nsearch;
                    }else
                    {
                        return;
                    }
                            
                
                    break;
                case &quot;A&quot;:
                    if (Asearch.Length &gt;= 3)
                    {
                        filters.Search = &quot;A&quot; + Asearch;
                    }
                    else
                    {
                        return;
                    }
                break;
                case &quot;P&quot;:
                    if (Psearch.Length &gt;= 3)
                    {
                        filters.Search = &quot;P&quot; + Psearch;
                    }
                    else
                    {
                        return;
                    }

                break;
                case &quot;B&quot;:
                
                        filters.Search = &quot;&quot;;
                
                    break;
        
            }

            if (string.IsNullOrEmpty(Nsearch) &amp;&amp; string.IsNullOrEmpty(Asearch) &amp;&amp; string.IsNullOrEmpty(Psearch))
            {
                filters.Search = &quot;&quot;; // Muestra todo
            }
    

            // Recargar productos
            await  LoadApi();
        }
    }
    `
  },
  {
    "ID": 21,
    "ServicesName": "M_AddProveedor",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Proveedores/M_AddProveedor",
    "ServicesDescription": "",
    "Code": `
    &lt;EditForm class=&quot;w-full h-fit flex flex-wrap gap-3 justify-between p-2&quot; Model=&quot;AddEdit&quot; OnValidSubmit=&quot;SendAsync&quot;&gt;
        &lt;DataAnnotationsValidator&gt;&lt;/DataAnnotationsValidator&gt;
        &lt;span class=&quot;w-full text-blue-400 text-xl&quot;&gt;@(IsEdit ? $&quot;Editar proveedor {AddEdit.NombreComercial}&quot; : &quot;A&ntilde;adir proveedor&quot;)&lt;/span&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Nombre comercial&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.NombreComercial&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.NombreComercial&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Tipo de proveedor&lt;/span&gt;

            &lt;InputSelect class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.TipoDeProveedor&quot;&gt;
                &lt;option value=&quot;&quot;&gt;Selecciona un tipo&lt;/option&gt;
                &lt;option value=&quot;Servicios&quot;&gt;Servicios&lt;/option&gt;
                &lt;option value=&quot;Materiales&quot;&gt;Materiales&lt;/option&gt;
                &lt;option value=&quot;Servicios y material&quot;&gt;Servicios y material&lt;/option&gt;
            &lt;/InputSelect&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.TipoDeProveedor&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Tipo de servicio&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.TipoDeServicio&quot;&gt;&lt;/InputText&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Denominaci&oacute;n fiscal&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.DenominacionFiscal&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.DenominacionFiscal&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;NIF/CIF&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.NifCif&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.NifCif&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Direcci&oacute;n&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Direccion&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Direccion&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Pa&iacute;s&lt;/span&gt;

            &lt;div class=&quot;w-full h-fit&quot;&gt;
                &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; list=&quot;paises&quot;
                        @bind-Value=&quot;AddEdit.Pais&quot; /&gt;

                &lt;datalist id=&quot;paises&quot;&gt;
                    @foreach (var v in BaseData.Paises)
                    {
                        &lt;option value=&quot;@v&quot;&gt;&lt;/option&gt;
                    }
                &lt;/datalist&gt;
            &lt;/div&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Pais&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Provincia&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; list=&quot;provincia&quot; @bind-Value=&quot;AddEdit.Provincia&quot;&gt;&lt;/InputText&gt;

            &lt;datalist id=&quot;provincia&quot;&gt;
                @foreach (var v in BaseData.Provincia)
                {
                    &lt;option value=&quot;@v&quot;&gt;&lt;/option&gt;
                }
            &lt;/datalist&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Provincia&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Poblaci&oacute;n&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; list=&quot;poblacion&quot; @bind-Value=&quot;AddEdit.Poblacion&quot;&gt;&lt;/InputText&gt;

            &lt;datalist id=&quot;poblacion&quot;&gt;
                @foreach (var v in BaseData.Poblacion)
                {
                    &lt;option value=&quot;@v&quot;&gt;&lt;/option&gt;
                }
            &lt;/datalist&gt;

            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Poblacion&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;C&oacute;digo postal&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.CodigoPostal&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.CodigoPostal&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Email&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Email&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Email&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Tel&eacute;fono&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Telefono&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Telefono&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Web&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Web&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Web&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Moneda&lt;/span&gt;

            &lt;InputText class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Moneda&quot;&gt;&lt;/InputText&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Moneda&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Impuesto de compra&lt;/span&gt;

            &lt;InputNumber class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.Impuesto&quot;&gt;&lt;/InputNumber&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.Impuesto&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-col gap-3&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;Forma y condiciones de pago&lt;/span&gt;

            &lt;InputTextArea class=&quot;w-full rounded p-2 border border-slate-300/50&quot; @bind-Value=&quot;AddEdit.FormayCondicionesDePago&quot;&gt;&lt;/InputTextArea&gt;
            &lt;ValidationMessage For=&quot;()=&gt; AddEdit.FormayCondicionesDePago&quot; class=&quot;text-red-600&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;


        &lt;div class=&quot;w-full h-fit flex flex-wrap items-center justify-end gap-3&quot;&gt;
            &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-red-600 text-white&quot; @onclick=&quot;()=&gt; Close(false)&quot;&gt;Salir sin guardar&lt;/button&gt;
            &lt;button type=&quot;submit&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot;&gt;Guardar&lt;/button&gt;
        &lt;/div&gt;
    &lt;/EditForm&gt;

    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }

        [Parameter] public E_Proveedor AddEdit { get; set; }
        [Parameter] public BaseDataProveedores BaseData { get; set; }

        bool IsEdit =&gt; !string.IsNullOrEmpty(AddEdit.Id);

        bool Sending = false;

        protected override async Task OnInitializedAsync()
        {
            if (AddEdit == null)
            {
                AddEdit = new();
            }
        }


        public async Task SendAsync()
        {
            _main.IsLoading = true;

            if (Sending)
            {
                return;
            }

            Sending = true;

            if (IsEdit)
            {
                await _mongoContext.EditProveedor(AddEdit);
            }
            else
            {
                await _mongoContext.AddProveedor(AddEdit);
            }
            Close(true);
            Sending = false;

            _main.IsLoading = false;
        }
    }
    `
  },
  {
    "ID": 22,
    "ServicesName": "P_Proveedor",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/Proveedores/P_Proveedor",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/logistica/proveedores&quot;
    @*&lt;AuthorizePage Roles=&quot;@(new(){&quot;Logistica.ModProductos&quot;})&quot;&gt;&lt;/AuthorizePage&gt;*@
    &lt;div class=&quot;w-full h-fit flex flex-wrap p-4 gap-3&quot;&gt;
        &lt;h1 class=&quot;w-full flex flex-wrap items-center text-2xl text-blue-400 font-bold&quot;&gt;Proveedores - @(Proveedores.CountAllDocuments) registros&lt;/h1&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap justify-between items-center&quot;&gt;
            &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaProveedoresAddProveedor)&quot;&gt;
        
            &lt;div class=&quot;w-fit flex flex-wrap items-center&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;()=&gt;OpenModalAddEdit()&quot;&gt;A&ntilde;adir proveedor&lt;/button&gt;
            &lt;/div&gt;
            &lt;/AuthorizedContent&gt;
            &lt;div class=&quot;w-fit flex flex-wrap items-center&quot;&gt;
                &lt;InputText class=&quot;w-full p-2 border border-slate-300/50&quot;
                        ValueExpression=&quot;() =&gt; filters.Search&quot; ValueChanged=&quot;(c)=&gt; {filters.Search = c; LoadAPI();}&quot; placeholder=&quot;Buscar...&quot;&gt;&lt;/InputText&gt;
            &lt;/div&gt;

        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-col gap-3&quot;&gt;

            &lt;table class=&quot;min-w-full h-fit table-auto border-collapse border border-slate-300/50&quot;&gt;
                &lt;thead&gt;
                    &lt;tr&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Nombre comercial
                        &lt;/th&gt;

                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Tipo de proveedor
                        &lt;/th&gt;

                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Provincia
                        &lt;/th&gt;

                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Poblaci&oacute;n
                        &lt;/th&gt;

                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Direcci&oacute;n
                        &lt;/th&gt;

                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Email
                        &lt;/th&gt;

                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Tel&eacute;fono
                        &lt;/th&gt;

                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                            Web
                        &lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    @if (Proveedores.Documents != null)
                    {
                        @foreach (var v in Proveedores.Documents)
                        {
                            &lt;tr&gt;
                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaProveedoresVerEditarProveedor)&quot;&gt;
        

                                            &lt;span class=&quot;w-fit text-blue-400 font-bold text-xl cursor-pointer&quot; @onclick=&quot;()=&gt; OpenModalAddEdit(v)&quot;&gt;@(v.NombreComercial)&lt;/span&gt;
                                    &lt;/AuthorizedContent&gt;
                                &lt;/th&gt;

                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;span&gt;@v.TipoDeProveedor&lt;/span&gt;
                                &lt;/th&gt;

                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;span&gt;@v.Provincia&lt;/span&gt;
                                &lt;/th&gt;

                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;span&gt;@v.Poblacion&lt;/span&gt;
                                &lt;/th&gt;

                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;span&gt;@v.Direccion&lt;/span&gt;
                                &lt;/th&gt;

                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;a href=&quot;mailto:@(v.Email)&quot; class=&quot;text-blue-600 underline&quot;&gt;@v.Email&lt;/a&gt;
                                &lt;/th&gt;

                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;a href=&quot;tel:@(v.Telefono)&quot; class=&quot;text-blue-600 underline&quot;&gt;@v.Telefono&lt;/a&gt;
                                &lt;/th&gt;

                                &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                    &lt;a href=&quot;@(v.Web)&quot; class=&quot;text-blue-600 underline&quot; target=&quot;_blank&quot;&gt;@v.Web&lt;/a&gt;
                                &lt;/th&gt;
                            &lt;/tr&gt;
                        }
                    }
                &lt;/tbody&gt;
            &lt;/table&gt;
        &lt;/div&gt;

        &lt;Paginator countAllDocuments=&quot;(int)Proveedores.CountAllDocuments&quot; countPages=&quot;Proveedores.PageCount&quot; filters=&quot;filters&quot; ReloadData=&quot;()=&gt;LoadAPI()&quot;&gt;&lt;/Paginator&gt;
    &lt;/div&gt;

    @code {
        public PaginatedResult&lt;E_Proveedor&gt; Proveedores { get; set; } = new();
        public FiltersBase filters = new()
            {
                PageNumber = 1,
                PageSize = 10,
                Search = &quot;&quot;
            };

        public BaseDataProveedores baseData = new();

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;&quot;;
            await LoadAPI();
        }

        async Task LoadAPI()
        {
            _main.IsLoading = true;

            var pageSize = _main.QueryParameters(_nav)[&quot;pageSize&quot;];
            var pageNumber = _main.QueryParameters(_nav)[&quot;pageNumber&quot;];

            if (!string.IsNullOrEmpty(pageSize) &amp;&amp; !string.IsNullOrEmpty(pageNumber))
            {
                filters.PageNumber = int.Parse(pageNumber);
                filters.PageSize = int.Parse(pageSize);
            }

            Proveedores = await _mongoContext.GetPaginatedProveedores(filters);

            baseData = await _mongoContext.BaseDataProveedor();

            InvokeAsync(StateHasChanged);

            _main.IsLoading = false;
        }

        void OpenModalAddEdit(E_Proveedor edit = null)
        {
            var modal = _modal.ShowModal(typeof(M_AddProveedor), new Dictionary&lt;string, object&gt;
            {
                {nameof(M_AddProveedor.AddEdit), edit},
                {nameof(M_AddProveedor.BaseData), baseData},
            }, FixedWidth: 80, MaxHeight: 80);

            modal.OnCloseModal += (b) =&gt;
            {
                LoadAPI();
            };
        }
    }
    `
  },
  {
    "ID": 23,
    "ServicesName": "P_SolicitudMaterial",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/SolicitudMaterial/P_SolicitudMaterial",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/logistica/solicitudes&quot;
    @page &quot;/logistica/solicitudes/{IdProyectoCompraSolicitada}/{IdObraE2ECompraSolicitada}&quot;
    @using LPSGrupo.Components.Areas.RedFijaF.Logistica.Compras.Modals
    @inject NavigationManager Navigation
    @*&lt;AuthorizePage Roles=&quot;@(new(){&quot;Logistica.CrearSolicitud&quot;})&quot;&gt;&lt;/AuthorizePage&gt;*@

    &lt;div class=&quot;h-screen flex flex-col&quot;&gt;

        &lt;!-- Primera fila (20%) --&gt;
        &lt;div class=&quot;h-1/5 bg-white p-4 rounded-lg shadow mb-4 flex items-center gap-4&quot;&gt;
            &lt;select class=&quot;border p-2 rounded w-1/5&quot; placeholder=&quot;Seleccionar Proyecto&quot; @bind=&quot;IdProyecto&quot;  required disabled=&quot;@EsProyectoBloqueado&quot;&gt;
                @if (listadoProyectos.Documents != null)
                {
                    &lt;option &gt;Seleccionar Proyecto&lt;/option&gt;
                    foreach (var item in listadoProyectos.Documents)
                    {
                        &lt;option value=&quot;@item.Id&quot;&gt;@item.NombreProyecto&lt;/option&gt;
                    }

                }


            &lt;/select&gt;
            &lt;select class=&quot;border p-2 rounded w-1/5&quot; placeholder=&quot;Seleccionar Obra&quot; @bind=&quot;IdObra&quot; required disabled=&quot;@EsObraBloqueada&quot;&gt;
                @if (listadoProyectos.Documents != null)
                {
                    &lt;option&gt;Seleccionar Obra&lt;/option&gt;
                    foreach (var item in listadoObras.Documents)
                    {
                        &lt;option value=&quot;@item.Id&quot;&gt;@item.Titulo&lt;/option&gt;
                    }

                }
            &lt;/select&gt;
            &lt;select class=&quot;border p-2 rounded w-1/5&quot; placeholder=&quot;Seleccionar Almac&eacute;n&quot; @bind=&quot;IdAlmacen&quot; required disabled=&quot;@EsAlmacenBloqueado&quot;&gt;
                @if (listadoProyectos.Documents != null)
                {
                    &lt;option&gt;Seleccionar Almac&eacute;n&lt;/option&gt;
                    foreach (var item in listadoAlmacenes.Documents)
                    {
                        &lt;option value=&quot;@item.Id&quot;&gt;@item.Nombre&lt;/option&gt;
                    }

                }
            &lt;/select&gt;
            &lt;!-- Botones para guardar la selecci&oacute;n --&gt;
            &lt;div class=&quot;flex justify-center gap-4 mt-4&quot;&gt;
                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaSolicitudesCrearSolicitud)&quot;&gt;
                &lt;button class=&quot;bg-blue-500 text-white px-4 py-2 rounded&quot; @onclick=&quot;@(() =&gt; GenerarSolicitud(&quot;NecesidadObra&quot;))&quot;&gt;Necesidad Obra&lt;/button&gt;
                &lt;button class=&quot;bg-green-500 text-white px-4 py-2 rounded&quot; @onclick=&quot;@(() =&gt; GenerarSolicitud(&quot;NecesidadInventario&quot;))&quot;&gt;Necesidad Inventario&lt;/button&gt;
                &lt;/AuthorizedContent&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;!-- Segunda fila (80%) --&gt;
        &lt;div class=&quot;h-4/5 bg-white p-6 shadow-lg rounded-lg overflow-y-auto grid grid-cols-10 gap-4&quot;&gt;
            &lt;!-- Primera columna: Productos (70%) --&gt;
            &lt;div class=&quot;col-span-8&quot;&gt;
                &lt;div class=&quot;grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6&quot;&gt;
                    @if (listadoProductosDisponibles.Documents != null &amp;&amp; listadoProductosDisponibles.Documents.Any())
                    {
                        @foreach (var v in listadoProductosDisponibles.Documents)
                        {
                            &lt;!-- Tarjeta de Producto --&gt;
                            &lt;div class=&quot;bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col h-80&quot;&gt;
                                &lt;div class=&quot;h-[70%] w-full&quot;&gt;
                                    &lt;img src=&quot;@($&quot;https://lpsgrupolatam.s3.sa-east-1.amazonaws.com/ImagenesProducto/{v.NameFile}&quot;)&quot;
                                    alt=&quot;@v.Nombre&quot;
                                    class=&quot;w-full h-full object-cover rounded-t-xl&quot; /&gt;
                                &lt;/div&gt;

                                &lt;div class=&quot;h-[30%] flex flex-col justify-center items-center p-3&quot;&gt;
                                    &lt;div class=&quot;flex justify-between w-full mb-2&quot;&gt;
                                        &lt;input type=&quot;number&quot;
                                        min=&quot;1&quot;
                                        class=&quot;w-20 h-8 text-sm text-gray-700 border border-gray-300 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-blue-500&quot;
                                        placeholder=&quot;Cant&quot;
                                        @bind=&quot;productoSeleccionado[v.Id]&quot; /&gt;
                                        &lt;button @onclick=&quot;() =&gt; AniadirProductoSeleccionado(v)&quot; class=&quot;gap-4 text-base text-gray-700 hover:text-blue-500&quot;&gt;
                                            &lt;span class=&quot;material-symbols-outlined&quot;&gt;add&lt;/span&gt;
                                        &lt;/button&gt;
                                    &lt;/div&gt;

                                    &lt;div class=&quot;text-center w-full&quot;&gt;
                                        &lt;h3 class=&quot;text-sm font-semibold text-gray-800 mb-1 truncate&quot;&gt;@v.Nombre&lt;/h3&gt;
                                        &lt;p class=&quot;text-xs text-gray-500 truncate&quot;&gt;C&oacute;digo: @v.CodigoProducto&lt;/p&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;
                            &lt;/div&gt;
                        }
                    }
                    else
                    {
                        &lt;div class=&quot;col-span-full bg-gray-100 p-6 rounded-xl text-center&quot;&gt;
                            &lt;span class=&quot;text-gray-600 font-medium&quot;&gt;Cargando Productos...&lt;/span&gt;
                        &lt;/div&gt;
                    }
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;!-- Segunda columna: Carrito de compras (30%) --&gt;
            &lt;div class=&quot;col-span-2 bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col&quot;&gt;
                &lt;h2 class=&quot;text-lg font-semibold text-gray-800 mb-4&quot;&gt;Productos Solicitud&lt;/h2&gt;

                @if (listaSeleccionados.Any())
                {
                    &lt;div class=&quot;flex flex-col gap-2 h-full overflow-y-auto&quot;&gt;
                        @foreach (var item in listaSeleccionados)
                        {
                            &lt;div class=&quot;bg-white p-3 rounded-md shadow-md flex justify-between items-center&quot;&gt;
                                &lt;img src=&quot;@($&quot;https://lpsgrupolatam.s3.sa-east-1.amazonaws.com/ImagenesProducto/{item.Producto.NameFile}&quot;)&quot;
                                alt=&quot;@item.Producto.Nombre&quot;
                                class=&quot;w-full h-full object-cover rounded-t-xl&quot; /&gt;
                                &lt;div&gt;
                                    &lt;p class=&quot;text-sm font-medium text-gray-800&quot;&gt;@item.Producto.Nombre&lt;/p&gt;
                                    &lt;p class=&quot;text-xs text-gray-500&quot;&gt;Cantidad: @item.Cantidad&lt;/p&gt;
                                &lt;/div&gt;
                                &lt;button class=&quot;text-red-500 hover:text-red-700&quot; @onclick=&quot;() =&gt; EliminarProductoCarrito(item)&quot;&gt;
                                    ❌
                                &lt;/button&gt;
                            &lt;/div&gt;
                        }
                    &lt;/div&gt;


                }
                else
                {
                    &lt;p class=&quot;text-gray-500 text-center&quot;&gt;Solicitud est&aacute; vac&iacute;a.&lt;/p&gt;
                }
            &lt;/div&gt;
        &lt;/div&gt;

    &lt;/div&gt;

    &lt;Paginator countAllDocuments=&quot;(int)listadoProductosDisponibles.CountAllDocuments&quot; countPages=&quot;listadoProductosDisponibles.PageCount&quot; filters=&quot;filters&quot; ReloadData=&quot;()=&gt;LoadAPI()&quot;&gt;&lt;/Paginator&gt;

    @code {

        private string IdProyecto { get; set; } 
        private string IdAlmacen { get; set; } 
        private string IdObra { get; set; } 


        private bool EsObraBloqueada { get; set; } = false;
        private bool EsProyectoBloqueado { get; set; } = false;
        private bool EsAlmacenBloqueado { get; set; } = false;


        [Parameter]
        public string IdAlmacenCompraSolicitada { get; set; }
        [Parameter]
        public string IdObraE2ECompraSolicitada { get; set; }
        [Parameter]
        public string IdProyectoCompraSolicitada { get; set; }



        // Diccionario para rastrear los productos seleccionados y sus cantidades
        private Dictionary&lt;string, int&gt; productoSeleccionado = new();

        private List&lt;LogisticaData.Entities.SeleccionCompra&gt; listaSeleccionados = new();

        private PaginatedResult&lt;E_ProyectosRedFija&gt; listadoProyectos { get; set; } = new PaginatedResult&lt;E_ProyectosRedFija&gt;();

        private PaginatedResult&lt;E_Almacen&gt; listadoAlmacenes { get; set; } = new PaginatedResult&lt;E_Almacen&gt;();

        private PaginatedResult&lt;E_SeguimientoE2E&gt; listadoObras { get; set; } = new PaginatedResult&lt;E_SeguimientoE2E&gt;();

        private PaginatedResult&lt;E_Producto&gt; listadoProductosDisponibles { get; set; } = new PaginatedResult&lt;E_Producto&gt;();

        public FiltersBase filters = new()
            {
                PageNumber = 1,
                PageSize = 10,
                Search = &quot;&quot;
            };

        public FiltersBase filters2 = new()
            {
                PageNumber = 1,
                PageSize = 1000,
                Search = &quot;&quot;
            };

        public GetPaginatedSeguimientoE2EDTORequest filters3 = new()
            {
                PageNumber = 1,
                PageSize = 1000,
                Search = &quot;&quot;
            };

        protected override async Task OnInitializedAsync()
        {

            await LoadAPI();
        }

        private async Task LoadAPI()
        {
            _main.IsLoading = true;

            listadoProductosDisponibles = await _mongoContext.GetPaginatedProductos(filters);
            listadoProyectos = await _mongoContext.GetPaginatedProyectosRedFija(filters2);
            listadoAlmacenes = await _mongoContext.GetPaginatedAlmacen(filters2);
            listadoObras = await _mongoContext.GetPaginatedSeguimientoFibra(filters3);

            listadoObras.Documents = listadoObras.Documents.OrderBy(x =&gt; x.Titulo).ToList();

            await RecargaDiccionario();


            if (IdObraE2ECompraSolicitada != null)
            {
                IdObra = IdObraE2ECompraSolicitada;
                EsObraBloqueada = true;
            }

            if (IdProyectoCompraSolicitada != null)
            {
                IdProyecto = IdProyectoCompraSolicitada;
                EsProyectoBloqueado = true;
            }

            if (IdAlmacenCompraSolicitada != null)
            {
                IdAlmacen = IdAlmacenCompraSolicitada;
                EsProyectoBloqueado = true;
            }


            await InvokeAsync(StateHasChanged);

            _main.IsLoading = false;

        }

        private async Task RecargaDiccionario()
        {

            if (listadoProductosDisponibles?.Documents != null)
            {
                foreach (var producto in listadoProductosDisponibles.Documents)
                {
                    if (!productoSeleccionado.ContainsKey(producto.Id))
                    {
                        productoSeleccionado.Add(producto.Id, 0);
                    }
                }
            }

        }
        // M&eacute;todo para seleccionar/deseleccionar productos
        private void SeleccionarProducto(string idProducto, bool isChecked)
        {
            if (isChecked)
            {
                if (!productoSeleccionado.ContainsKey(idProducto))
                {
                    productoSeleccionado[idProducto] = 0; // Inicia con 0 si se selecciona
                }
            }
            else
            {
                productoSeleccionado.Remove(idProducto); // Si se deselecciona, se elimina
            }
        }




        private void AniadirProductoSeleccionado(E_Producto producto)
        {
            if (productoSeleccionado.ContainsKey(producto.Id))
            {
                if (listaSeleccionados.Any(x =&gt; x.Producto.Id == producto.Id))
                {
                    var item = listaSeleccionados.FirstOrDefault(x =&gt; x.Producto.Id == producto.Id);
                    if (item != null)
                    {
                        item.Cantidad += productoSeleccionado[producto.Id]; // Sumar la nueva cantidad
                    }
                }
                else
                {

                    listaSeleccionados.Add(new LogisticaData.Entities.SeleccionCompra { Cantidad = productoSeleccionado[producto.Id], Producto = producto });

                }

            }
        }

        private void EliminarProductoCarrito(LogisticaData.Entities.SeleccionCompra seleccionCompra)
        {

            listaSeleccionados.Remove(seleccionCompra);

        }




        private async Task GenerarSolicitud(string necesidad)
        {
            if (string.IsNullOrEmpty(IdProyecto))
            {
                _snackbar.InsertSnackbar(new($&quot;Se requiere seleccionar un Proyecto&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                return;

            }

            if (string.IsNullOrEmpty(IdObra))
            {
                _snackbar.InsertSnackbar(new($&quot;Se requiere seleccionar una Obra&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                return;

            }

            if (string.IsNullOrEmpty(IdAlmacen))
            {
                _snackbar.InsertSnackbar(new($&quot;Se requiere seleccionar un Almac&eacute;n&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                return;

            }

            if (listaSeleccionados.Any( x =&gt; x.Cantidad == 0))
            {
                _snackbar.InsertSnackbar(new($&quot;No se puede pedir un producto con 0 unidades.&quot;, &quot;cancel&quot;, 7000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                return;


            }

            var nuevaSolicitud = new LogisticaData.Entities.E_SolicitudCompra
            {
                NecesidadObra = necesidad,

                IdUsuarioSolicitud = _user.id, // ID del usuario (ejemplo)
                UsuarioSolicitud = _user.name, // Nombre del usuario (ejemplo)               
                IdProyecto = IdProyecto,
                NombreProyecto = listadoProyectos.Documents.Where(x =&gt; x.Id == IdProyecto).Select(x =&gt; x.NombreProyecto).FirstOrDefault(),
                IdObra = IdObra,
                NombreObra = listadoObras.Documents.Where(x =&gt; x.Id == IdObra).Select(x =&gt; x.Titulo).FirstOrDefault(),
                IdAlmacen = IdAlmacen,
                NombreAlmacen = listadoAlmacenes.Documents.Where(x =&gt; x.Id == IdAlmacen).Select(x =&gt; x.Nombre).FirstOrDefault(),

                SeleccionCompra = new List&lt;LogisticaData.Entities.SeleccionCompra&gt;(listaSeleccionados)
            };

            var result = await _mongoContext.AddSolicitudCompra(nuevaSolicitud);

            if (result.IsSuccess)
            {
                _snackbar.InsertSnackbar(new($&quot;Solicitud realizada&quot;, &quot;check&quot;, 4000, &quot;bg-green-400&quot;, &quot;text-white&quot;));
                listaSeleccionados.Clear();
                return;
            }

            // Console.WriteLine($&quot;Almac&eacute;n {nuevaSolicitud.NombreAlmacen}, {nuevaSolicitud.IdAlmacen}&quot;);
            // Console.WriteLine($&quot;Proyecto {nuevaSolicitud.NombreProyecto}, {nuevaSolicitud.IdProyecto}&quot;);
            // Console.WriteLine($&quot;Obra {nuevaSolicitud.NombreObra}, {nuevaSolicitud.IdObra}&quot;);
            // Console.WriteLine($&quot;-------------------------------------------------------------------&quot;);
            // foreach (var item in nuevaSolicitud.SeleccionCompra)
            // {
            //     Console.WriteLine($&quot;Producto {item.Producto.Id}, {item.Producto.Nombre}, {item.Cantidad}&quot;);
            // }

            await InvokeAsync(StateHasChanged);
        }

    }
    `
  },
  {
    "ID": 24,
    "ServicesName": "P_VerSolicitudes",
    "ServicesRoute": "Components/Areas/RedFijaF/Logistica/SolicitudMaterial/P_VerSolicitudes",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/logistica/solicitudes-ver&quot;
    @inject NavigationManager Navigation
    @*&lt;AuthorizePage Roles=&quot;@(new(){&quot;RedFijaLogisticaSolicitudesGestionarSolicitudes&quot;})&quot;&gt;&lt;/AuthorizePage&gt;*@
    &lt;div class=&quot;h-screen flex flex-col&quot;&gt;

        &lt;!-- Primera fila (20%) --&gt;
        &lt;div class=&quot;h-1/5 bg-white p-4 rounded-lg shadow mb-4 flex flex-col justify-center items-center gap-4&quot;&gt;
            &lt;div class=&quot;w-full flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow&quot;&gt;
                &lt;div&gt;
                    &lt;h2 class=&quot;text-xl font-bold text-gray-800&quot;&gt;Solicitudes Pendientes&lt;/h2&gt;
                    &lt;p class=&quot;text-gray-600&quot;&gt;Aqu&iacute; puedes ver todas las solicitudes pendientes por tipo.&lt;/p&gt;
                &lt;/div&gt;
                &lt;div class=&quot;flex gap-6&quot;&gt;
                    &lt;div class=&quot;text-center bg-blue-100 p-4 rounded-lg shadow&quot;&gt;
                        &lt;p class=&quot;text-lg font-semibold text-blue-700&quot;&gt;🏗️ Necesidad Obra&lt;/p&gt;
                        &lt;p class=&quot;text-xl font-bold text-blue-800&quot;&gt;@cantidadObraPendiente&lt;/p&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;text-center bg-green-100 p-4 rounded-lg shadow&quot;&gt;
                        &lt;p class=&quot;text-lg font-semibold text-green-700&quot;&gt;📦 Necesidad Inventario&lt;/p&gt;
                        &lt;p class=&quot;text-xl font-bold text-green-800&quot;&gt;@cantidadInventarioPendiente&lt;/p&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;!-- Botones de filtro --&gt;
            &lt;div class=&quot;flex gap-6 mt-4&quot;&gt;
                &lt;button class=&quot;bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition&quot;
                @onclick=&quot;@(() =&gt; CargarSolicitudes(&quot;NecesidadObra&quot;))&quot;&gt;
                    Ver Necesidad Obra
                &lt;/button&gt;
                &lt;button class=&quot;bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition&quot;
                @onclick=&quot;@(() =&gt; CargarSolicitudes(&quot;NecesidadInventario&quot;))&quot;&gt;
                    Ver Necesidad Inventario
                &lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;!-- Segunda fila (80%) --&gt;
        &lt;div class=&quot;h-4/5 bg-white p-6 shadow-lg rounded-lg overflow-y-auto&quot;&gt;
            &lt;div class=&quot;grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6&quot;&gt;
                @if (listadoSolicitudes.Any())
                {
                    @foreach (var solicitud in listadoSolicitudes)
                    {
                        &lt;div class=&quot;bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col p-4&quot;&gt;
                            &lt;h3 class=&quot;text-lg font-bold text-gray-800&quot;&gt;Solicitud #@solicitud.Id&lt;/h3&gt;
                            &lt;p class=&quot;text-sm text-gray-600&quot;&gt;Tipo: &lt;span class=&quot;font-semibold&quot;&gt;@solicitud.Tipo&lt;/span&gt;&lt;/p&gt;
                            &lt;p class=&quot;text-sm text-gray-600&quot;&gt;Estado: &lt;span class=&quot;font-semibold&quot;&gt;@solicitud.Estado&lt;/span&gt;&lt;/p&gt;
                            &lt;p class=&quot;text-sm text-gray-600&quot;&gt;Fecha: @solicitud.FechaCreacion.ToShortDateString()&lt;/p&gt;

                            &lt;div class=&quot;mt-4 flex justify-end&quot;&gt;
                                &lt;button class=&quot;bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition&quot;
                                @onclick=&quot;() =&gt; VerDetallesSolicitud(solicitud.Id)&quot;&gt;
                                    Ver Detalles
                                &lt;/button&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    }
                }
                else
                {
                    &lt;div class=&quot;col-span-full bg-gray-100 p-6 rounded-xl text-center&quot;&gt;
                        &lt;span class=&quot;text-gray-600 font-medium&quot;&gt;No hay solicitudes disponibles.&lt;/span&gt;
                    &lt;/div&gt;
                }
            &lt;/div&gt;
        &lt;/div&gt;

    &lt;/div&gt;
    &lt;Paginator countAllDocuments=&quot;(int)listadoSolicitudesCompra.CountAllDocuments&quot; countPages=&quot;listadoSolicitudesCompra.PageCount&quot; filters=&quot;filters&quot; ReloadData=&quot;()=&gt;LoadAPI()&quot;&gt;&lt;/Paginator&gt;


    @code {
        private List&lt;Solicitud&gt; listadoSolicitudes = new();
        private PaginatedResult&lt;LogisticaData.Entities.E_SolicitudCompra&gt; listadoSolicitudesCompra { get; set; } = new();
        private int cantidadObraPendiente = 0;
        private int cantidadInventarioPendiente = 0;
        
        public FiltersBase filters = new()
            {
                PageNumber = 1,
                PageSize = 10,
                Search = &quot;&quot;
            };

        protected override async Task OnInitializedAsync()
        {
            await CargarResumenSolicitudes();
            await CargarSolicitudes(&quot;NecesidadObra&quot;);
        }

        private async Task CargarResumenSolicitudes()
        {
            // var todasLasSolicitudes = await _mongoContext.GetSolicitudesPendientes();
            // cantidadObraPendiente = todasLasSolicitudes.Count(s =&gt; s.Tipo == &quot;NecesidadObra&quot;);
            // cantidadInventarioPendiente = todasLasSolicitudes.Count(s =&gt; s.Tipo == &quot;NecesidadInventario&quot;);
        }

        private async Task CargarSolicitudes(string tipo)
        {
            //listadoSolicitudes = await _mongoContext.GetSolicitudesPorTipo(tipo);
            await InvokeAsync(StateHasChanged);
        }

        private void VerDetallesSolicitud(string id)
        {
            Navigation.NavigateTo($&quot;/logistica/solicitud-detalle/{id}&quot;);
        }



        private async Task LoadAPI()
        {
            _main.IsLoading = true;

            listadoSolicitudesCompra = await _mongoContext.GetPaginatedSolicitudCompras(filters);
        //  listadoProductosDisponibles = await _mongoContext.GetPaginatedProductos(filters);
        //  listadoProyectos = await _mongoContext.GetPaginatedProyectosRedFija(filters2);
        //  listadoAlmacenes = await _mongoContext.GetPaginatedAlmacen(filters2);
        //  listadoObras = await _mongoContext.GetPaginatedSeguimientoFibra(filters3);
        //
        //  listadoObras.Documents = listadoObras.Documents.OrderBy(x =&gt; x.Titulo).ToList();
        //
        //  await RecargaDiccionario();

            await InvokeAsync(StateHasChanged);

            _main.IsLoading = false;

        }

        private class Solicitud
        {
            public string Id { get; set; }
            public string Tipo { get; set; }
            public string Estado { get; set; }
            public DateTime FechaCreacion { get; set; }
        }


    }
    `
  },
  {
    "ID": 25,
    "ServicesName": "ExportarExcel",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/ExportarExcel",
    "ServicesDescription": "",
    "Code": `
    public static class Export
    {
        public static byte[] GenerateExcelWorkbook(/*this IMongoContext mongoContext, string id*/)
        {
    
            var stream = new MemoryStream();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (var package = new ExcelPackage(stream))
            {
                var workSheet = package.Workbook.Worksheets.Add("Sheet1");


                return package.GetAsByteArray();
            }
        }
    }

    public class UserInfo
    {
        public string UserName { get; set; }
        public int Age { get; set; }
    }
    `
  },
    {
    "ID": 26,
    "ServicesName": "TarjetaBloqueos",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaBloqueos",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md&quot;&gt;

        &lt;!-- T&iacute;tulo Informaci&oacute;n --&gt;
        &lt;div class=&quot;w-full text-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;Bloqueos&lt;/span&gt;
            &lt;Checkbox Message=&quot;Aplica&quot; Checked=EditObra.DataBloqueoss[0].Aplica ChangeCheck=&quot;()=&gt; {EditObra.DataBloqueoss[0].Aplica = !EditObra.DataBloqueoss[0].Aplica; InvokeAsync(StateHasChanged);}&quot;&gt;

            &lt;/Checkbox&gt;
        &lt;/div&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4&quot;&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Tipo de bloqueo&lt;/span&gt;

                &lt;input type=&quot;text&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataBloqueoss[SelectedVersion].TipoBloqueo&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de bloqueo&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataBloqueoss[SelectedVersion].FechaBloqueo&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Acciones&lt;/span&gt;

                &lt;input type=&quot;text&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataBloqueoss[SelectedVersion].Acciones&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Responsable&lt;/span&gt;

                &lt;input type=&quot;text&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataBloqueoss[SelectedVersion].Responsable&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de plan de desbloqueo&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataBloqueoss[SelectedVersion].FechaPlanDesbloqueo&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de desbloqueo&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataBloqueoss[SelectedVersion].FechaRealDesbloqueo&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;

                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Comentario&lt;/span&gt;

                &lt;textarea class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind=&quot;EditObra.DataBloqueoss[SelectedVersion].Comentario&quot; /&gt;
            &lt;/div&gt;


            &lt;!-- Bot&oacute;n Guardar --&gt;
            &lt;div class=&quot;flex items-center justify-center col-span-full&quot;&gt;
                &lt;button class=&quot;rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SaveAsync())&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;

        &lt;/div&gt;

    &lt;/div&gt;


    @code {
        [Parameter] public E_SeguimientoE2E EditObra { get; set; }

        int SelectedVersion = 0;

        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };
        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo(&quot;/seguimientofibra&quot;);
        }
    }
    `
  },
    {
    "ID": 27,
    "ServicesName": "TarjetaBQA",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaBQA",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md&quot;&gt;
        &lt;!-- T&iacute;tulo Informaci&oacute;n --&gt;
        &lt;div class=&quot;w-full text-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;BQA&lt;/span&gt;
            &lt;Checkbox Message=&quot;Aplica&quot; Checked=EditObra.DataBQAs[0].Aplica ChangeCheck=&quot;()=&gt; {EditObra.DataBQAs[0].Aplica = !EditObra.DataBQAs[0].Aplica; InvokeAsync(StateHasChanged);}&quot;&gt;

            &lt;/Checkbox&gt;
        &lt;/div&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4&quot;&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de enrega de docs. LPS&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataBQAs[SelectedVersion].FechaEntregaDocLPS&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de revisi&oacute;n Lyntia&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataBQAs[SelectedVersion].FechaRevLyntia&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de entrega de revisi&oacute;n LPS&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataBQAs[SelectedVersion].FechaEntregaRevLPS&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Comentario&lt;/span&gt;

                &lt;textarea class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind=&quot;EditObra.DataBQAs[SelectedVersion].Comentario&quot; /&gt;
            &lt;/div&gt;
            &lt;!-- Bot&oacute;n Guardar --&gt;
            &lt;div class=&quot;flex items-center justify-center col-span-full&quot;&gt;
                &lt;button class=&quot;rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SaveAsync())&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;

        &lt;/div&gt;

    &lt;/div&gt;


    @code {
        [Parameter] public E_SeguimientoE2E EditObra { get; set; }
        int SelectedVersion = 0;

        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };

        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo(&quot;/seguimientofibra&quot;);
        }
    }
    `
  },
    {
    "ID": 28,
    "ServicesName": "TarjetaCertificacionLyntia",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaCertificacionLyntia",
    "ServicesDescription": "",
    "Code": `
    <div class="min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md">
        <!-- Título Información -->
        <div class="w-full text-center">
            <span class="text-blue-400 text-2xl font-bold">Certificación Lyntia</span>
            <Checkbox Message="Aplica" Checked=EditObra.DataCertificacionLyntias[0].Aplica ChangeCheck="()=> {EditObra.DataCertificacionLyntias[0].Aplica = !EditObra.DataCertificacionLyntias[0].Aplica; InvokeAsync(StateHasChanged);}">

            </Checkbox>
        </div>
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div class="flex flex-col gap-2">
                <span class="w-full text-blue-400">Imputación UTPRI</span>

                <input type="text" class="w-full rounded border boder-slate-300/50 p-2" @bind-value="EditObra.DataCertificacionLyntias[SelectedVersion].ImputacionUTPRI" />

            </div>
            <div class="flex flex-col gap-2">
                <span class="w-full text-blue-400">Capex objetivo</span>

                <InputNumber TValue="float" class="w-full rounded border boder-slate-300/50 p-2" @bind-Value="EditObra.DataCertificacionLyntias[SelectedVersion].CapexObjetivo" />

            </div>

            <div class="flex flex-col gap-2">
                <span class="w-full text-blue-400">Capex aprobado</span>

                <InputNumber TValue="float" class="w-full rounded border boder-slate-300/50 p-2" @bind-Value="EditObra.DataCertificacionLyntias[SelectedVersion].CapexAprobado" />
            </div>

            <div class="flex flex-col gap-2">
                <span class="w-full text-blue-400">Capex con UTOE</span>

                <InputNumber TValue="float" class="w-full rounded border boder-slate-300/50 p-2" @bind-Value="EditObra.DataCertificacionLyntias[SelectedVersion].CapexConUTOE" />

            </div>
            <div class="flex flex-col gap-2">
                <span class="w-full text-blue-400">Capex con UTALB</span>

                <InputNumber TValue="float" class="w-full rounded border boder-slate-300/50 p-2" @bind-Value="EditObra.DataCertificacionLyntias[SelectedVersion].CapexConUTALB" />

            </div>
            <div class="flex flex-col gap-2">
                <span class="w-full text-blue-400">Fecha certificación UTALB</span>

                <input type="date" class="w-full rounded border boder-slate-300/50 p-2" @bind-value="EditObra.DataCertificacionLyntias[SelectedVersion].FechaCertificacionUTALB" />

            </div>
            <div class="flex flex-col gap-2">
                <span class="w-full text-blue-400">Comentario</span>

                <textarea class="w-full rounded border boder-slate-300/50 p-2" @bind="EditObra.DataCertificacionLyntias[SelectedVersion].Comentario" />

            </div>

        
            <!-- Botón Guardar -->
            <div class="flex items-center justify-center col-span-full">
                <button class="rounded p-2 bg-blue-400 text-white" @onclick="@(()=> SaveAsync())">Guardar</button>
            </div>

        </div>

    </div>

    <div class="min-w-[400px] h-fit flex flex-col p-2 gap-3 rounded bg-slate-50 shadow-md">
        <div class="w-full ml-2 text-blue-400 text-xl font-bold flex flex-wrap items-center gap-3">
            Certificación Lyntia 
        </div>
        <div class="w-full p-2 flex flex-wrap items-center gap-2">
            <button type="button" class="w-fit h-fit rounded p-2 bg-blue-400 text-white"
                    @onclick="@(()=> {EditObra.DataCertificacionLyntias.Add(new());  InvokeAsync(StateHasChanged);})">
                Añadir versión
            </button>

            <InputSelect @bind-Value="SelectedVersion" class="w-fit h-fit rounded p-2 border border-slate-300/50">
                @{
                    int count = 0;
                }
                @foreach (var v in EditObra.DataCertificacionLyntias)
                {
                    <option value="@(count.ToString())">Versión @((count + 1).ToString())</option>
                    count++;
                }
            </InputSelect>
        </div>
        <Checkbox Message="Aplica" Checked=EditObra.DataCertificacionLyntias[0].Aplica ChangeCheck="()=> {EditObra.DataCertificacionLyntias[0].Aplica = !EditObra.DataCertificacionLyntias[0].Aplica; InvokeAsync(StateHasChanged);}">

        </Checkbox>

        <div class="w-full p-2 flex flex-wrap gap-2">
            <span class="w-full text-blue-400">Imputación UTPRI</span>

            <input type="text" class="w-full rounded border boder-slate-300/50 p-2" @bind-value="EditObra.DataCertificacionLyntias[SelectedVersion].ImputacionUTPRI" />
        </div>

        <div class="w-full p-2 flex flex-wrap gap-2">
            <span class="w-full text-blue-400">Capex objetivo</span>

            <InputNumber TValue="float" class="w-full rounded border boder-slate-300/50 p-2" @bind-Value="EditObra.DataCertificacionLyntias[SelectedVersion].CapexObjetivo" />
        </div>

        <div class="w-full p-2 flex flex-wrap gap-2">
            <span class="w-full text-blue-400">Capex aprobado</span>

            <InputNumber TValue="float" class="w-full rounded border boder-slate-300/50 p-2" @bind-Value="EditObra.DataCertificacionLyntias[SelectedVersion].CapexAprobado" />
        </div>

        <div class="w-full p-2 flex flex-wrap gap-2">
            <span class="w-full text-blue-400">Capex con UTOE</span>

            <InputNumber TValue="float" class="w-full rounded border boder-slate-300/50 p-2" @bind-Value="EditObra.DataCertificacionLyntias[SelectedVersion].CapexConUTOE" />
        </div>

        <div class="w-full p-2 flex flex-wrap gap-2">
            <span class="w-full text-blue-400">Capex con UTALB</span>

            <InputNumber TValue="float" class="w-full rounded border boder-slate-300/50 p-2" @bind-Value="EditObra.DataCertificacionLyntias[SelectedVersion].CapexConUTALB" />
        </div>

        <div class="w-full p-2 flex flex-wrap gap-2">
            <span class="w-full text-blue-400">Fecha certificación UTALB</span>

            <input type="date" class="w-full rounded border boder-slate-300/50 p-2" @bind-value="EditObra.DataCertificacionLyntias[SelectedVersion].FechaCertificacionUTALB" />
        </div>
        <div class="w-full p-2 flex flex-wrap gap-2">
            <span class="w-full text-blue-400">Comentario</span>

            <textarea class="w-full rounded border boder-slate-300/50 p-2" @bind="EditObra.DataCertificacionLyntias[SelectedVersion].Comentario" />
        </div>


    </div>

    @code {
        [Parameter] public E_SeguimientoE2E EditObra { get; set; }

        int SelectedVersion = 0;

        public string ColorEstado(string estado) => estado switch
        {
            "Sin iniciar" => "bg-slate-600",
            "Parado" => "bg-amber-400",
            "En curso" => "bg-blue-400",
            "Cancelado" => "bg-black",
            "Finalizado" => "bg-teal-400",
            _ => "bg-blue-400"
        };
        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo("/seguimientofibra");
        }
    }
    `
  },
    {
    "ID": 29,
    "ServicesName": "TarjetaDOAs",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaDOAs",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md&quot;&gt;
        &lt;!-- T&iacute;tulo Informaci&oacute;n --&gt;
        &lt;div class=&quot;w-full text-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;DOAs&lt;/span&gt;
            &lt;Checkbox Message=&quot;Aplica&quot; Checked=EditObra.DataDOASs[0].Aplica ChangeCheck=&quot;()=&gt; {EditObra.DataDOASs[0].Aplica = !EditObra.DataDOASs[0].Aplica; InvokeAsync(StateHasChanged);}&quot;&gt;

            &lt;/Checkbox&gt;
        &lt;/div&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4&quot;&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de comunicaci&oacute;n&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataDOASs[SelectedVersion].FechaComunicacion&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de resoluci&oacute;n&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataDOASs[SelectedVersion].FechaResolucion&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Comentario&lt;/span&gt;

                &lt;textarea class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind=&quot;EditObra.DataDOASs[SelectedVersion].Comentario&quot; /&gt;
            &lt;/div&gt;

            &lt;!-- Bot&oacute;n Guardar --&gt;
            &lt;div class=&quot;flex items-center justify-center col-span-full&quot;&gt;
                &lt;button class=&quot;rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SaveAsync())&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;

        &lt;/div&gt;

    &lt;/div&gt;


    @code {
        [Parameter] public E_SeguimientoE2E EditObra { get; set; }
        public int SelectedVersion = 0;
        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };

        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo(&quot;/seguimientofibra&quot;);
        }
    }
    `
  },
    {
    "ID": 30,
    "ServicesName": "TarjetaInformacion",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaInformacion",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md&quot;&gt;
        &lt;!-- T&iacute;tulo Informaci&oacute;n --&gt;
        &lt;div class=&quot;w-full text-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;Informaci&oacute;n&lt;/span&gt;
        &lt;/div&gt;

        &lt;!-- Contenedor de elementos --&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4&quot;&gt;
            &lt;!-- C&oacute;digo GSER --&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;label class=&quot;text-blue-400 font-semibold&quot;&gt;C&oacute;digo GSER&lt;/label&gt;
                &lt;input type=&quot;text&quot; class=&quot;rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.CodigoGSER&quot; disabled /&gt;
            &lt;/div&gt;

            &lt;!-- T&iacute;tulo --&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;label class=&quot;text-blue-400 font-semibold&quot;&gt;T&iacute;tulo&lt;/label&gt;
                &lt;input type=&quot;text&quot; class=&quot;rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.Titulo&quot; /&gt;
            &lt;/div&gt;

            &lt;!-- Estado --&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;label class=&quot;text-blue-400 font-semibold&quot;&gt;Estado&lt;/label&gt;
                &lt;input type=&quot;text&quot; class=&quot;rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.EstadoProyecto&quot; /&gt;
            &lt;/div&gt;

            &lt;!-- PgM LN --&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;label class=&quot;text-blue-400 font-semibold&quot;&gt;PgM LN&lt;/label&gt;
                &lt;input type=&quot;text&quot; class=&quot;rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.PgMLN&quot; /&gt;
            &lt;/div&gt;

            &lt;!-- PM LPS --&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;label class=&quot;text-blue-400 font-semibold&quot;&gt;PM LPS&lt;/label&gt;
                @if (EditObra.PMLPS != null)
                {
                    &lt;Autocomplete T=&quot;E_User&quot;
                                Database=&quot;@DatabaseIdentifiers.Main&quot;
                                FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                                SelectOne=&quot;(e)=&gt; EditObra.PMLPS = e&quot;
                                ToString=&quot;@(e =&gt; $&quot;{e.Name} {e.LastName}&quot;)&quot;
                                InitialTextValue=&quot;@($&quot;{EditObra.PMLPS.Name} {EditObra.PMLPS.LastName}&quot;)&quot;
                                InitialValue=&quot;EditObra.PMLPS&quot;&gt;
                    &lt;/Autocomplete&gt;
                }
                else
                {
                    &lt;Autocomplete T=&quot;E_User&quot;
                                Database=&quot;@DatabaseIdentifiers.Main&quot;
                                FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                                SelectOne=&quot;(e)=&gt; EditObra.PMLPS = e&quot;
                                ToString=&quot;@(e =&gt; $&quot;{e.Name} {e.LastName}&quot;)&quot;&gt;
                    &lt;/Autocomplete&gt;
                }
            &lt;/div&gt;

            &lt;!-- Localidad --&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;label class=&quot;text-blue-400 font-semibold&quot;&gt;Localidad&lt;/label&gt;
                @if (EditObra.Localidad != null)
                {
                    &lt;Autocomplete T=&quot;RedFija.Logic.E_Localidades&quot; SelectOne=&quot;(e)=&gt; EditObra.Localidad = e&quot; ToString=&quot;(e)=&gt; e.Localidad&quot;
                                Database=&quot;@DatabaseIdentifiers.Movil&quot;
                                FilterMongo=&quot;@((s)=&gt; Builders&lt;RedFija.Logic.E_Localidades&gt;.Filter.Regex(x=&gt; x.Localidad, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                                InitialTextValue=&quot;@EditObra.Localidad.Localidad&quot; InitialValue=&quot;EditObra.Localidad&quot;&gt;
                    &lt;/Autocomplete&gt;
                }
                else
                {
                    &lt;Autocomplete T=&quot;RedFija.Logic.E_Localidades&quot; SelectOne=&quot;(e)=&gt; EditObra.Localidad = e&quot; ToString=&quot;(e)=&gt; e.Localidad&quot;
                                Database=&quot;@DatabaseIdentifiers.Movil&quot;
                                FilterMongo=&quot;@((s)=&gt; Builders&lt;RedFija.Logic.E_Localidades&gt;.Filter.Regex(x=&gt; x.Localidad, new BsonRegularExpression(s, &quot;i&quot;)))&quot;&gt;
                    &lt;/Autocomplete&gt;
                }
            &lt;/div&gt;

            &lt;!-- Fecha Asignaci&oacute;n --&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;label class=&quot;text-blue-400 font-semibold&quot;&gt;Fecha Asignaci&oacute;n&lt;/label&gt;
                &lt;input type=&quot;date&quot; class=&quot;rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.FechaAsignacion&quot; /&gt;
            &lt;/div&gt;

            &lt;!-- Fecha SLA --&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;label class=&quot;text-blue-400 font-semibold&quot;&gt;Fecha SLA&lt;/label&gt;
                &lt;input type=&quot;date&quot; class=&quot;rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;FechaSLA&quot; readonly /&gt;
            &lt;/div&gt;

            &lt;!-- Bot&oacute;n Guardar --&gt;
            &lt;div class=&quot;flex items-center justify-center col-span-full&quot;&gt;
                &lt;button class=&quot;rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SaveAsync())&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;



    @code {

        [Parameter] public E_SeguimientoE2E EditObra { get; set; } 


    

        public DateTime FechaSLA
        {
            get { return EditObra.FechaObjetivoSLA; }
            set
            {
                if (string.IsNullOrEmpty(EditObra.TipoProyectoSLA))
                {
                    _snackbar.InsertSnackbar(new(&quot;Selecciona el tipo de SLA&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;));
                    return;
                }

                EditObra.FechaObjetivoSLA = SumDays(EditObra.TipoProyectoSLA);
                _snackbar.InsertSnackbar(new(&quot;Fecha reajustada en base al tipo de SLA&quot;, &quot;check&quot;, 5000, &quot;bg-teal-400&quot;, &quot;text-white&quot;));
                InvokeAsync(StateHasChanged);
            }
        }

        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo(&quot;/seguimientofibra&quot;);
        }

        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };
        public DateTime SumDays(string type) =&gt; type switch
        {
            &quot;On15&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(7),
            &quot;ON30&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(27),
            &quot;ON145&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(40),
            &quot;ON245&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(40),
            &quot;OF90&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(81),
            &quot;OF120&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(108),
            &quot;N45&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(40),
            &quot;N70&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(63),
            &quot;N80&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(72),
            &quot;N110&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(103),
            &quot;N185&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(176),
            &quot;N220&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(209),
            &quot;NI110&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(105),
            &quot;NE110&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(105),
            &quot;NI130&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(124),
            &quot;NE150&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(143),
            &quot;NI270&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(257),
            &quot;NE270&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(257),
            &quot;NU110&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(105),
            &quot;NU220&quot; =&gt; EditObra.FechaObjetivoSLA.AddDays(209),
            _ =&gt; EditObra.FechaObjetivoSLA.AddDays(7),
        };
    }
    `
  },
    {
    "ID": 31,
    "ServicesName": "TarjetaIngenieria",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaIngenieria",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md&quot;&gt;
        &lt;!-- T&iacute;tulo Ingenier&iacute;a --&gt;
        &lt;div class=&quot;w-full text-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;Ingenier&iacute;a&lt;/span&gt;
            &lt;Checkbox Message=&quot;Aplica&quot; Checked=EditObra.DataIngenierias[0].Aplica ChangeCheck=&quot;()=&gt; {EditObra.DataIngenierias[0].Aplica = !EditObra.DataIngenierias[0].Aplica; InvokeAsync(StateHasChanged);}&quot;&gt;

            &lt;/Checkbox&gt;
        &lt;/div&gt;

        &lt;!-- Contenedor de elementos --&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4&quot;&gt;

    
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de an&aacute;lisis PM LPS&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataIngenierias[SelectedVersion].FechaAnalisisPMLPS&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de FechaPredise&ntilde;o&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataIngenierias[SelectedVersion].FechaPredise&ntilde;o&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de replanteo&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataIngenierias[SelectedVersion].FechaReplanteo&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de acta de replanteo&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataIngenierias[SelectedVersion].FechaActaReplanteo&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de fin de dise&ntilde;o&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataIngenierias[SelectedVersion].FechaEntregaDise&ntilde;o&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Comentario&lt;/span&gt;

                &lt;textarea class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind=&quot;EditObra.DataIngenierias[SelectedVersion].Comentario&quot; /&gt;

            &lt;/div&gt;
            &lt;!-- Bot&oacute;n Guardar --&gt;
            &lt;div class=&quot;flex items-center justify-center col-span-full&quot;&gt;
                &lt;button class=&quot;rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SaveAsync())&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;

    &lt;/div&gt;



    @code {
        [Parameter] public E_SeguimientoE2E EditObra { get; set; }
        int SelectedVersion = 0;
        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };
        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo(&quot;/seguimientofibra&quot;);
        }
    }
    `
  },
    {
    "ID": 32,
    "ServicesName": "TarjetaInstalacionHuawei",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaInstalacionHuawei",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md&quot;&gt;

        &lt;!-- T&iacute;tulo Informaci&oacute;n --&gt;
        &lt;div class=&quot;w-full text-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;Instalaci&oacute;n Huawei&lt;/span&gt;
            &lt;Checkbox Message=&quot;Aplica&quot; Checked=EditObra.DataInstalacions[0].AplicaHuawei ChangeCheck=&quot;()=&gt; {EditObra.DataInstalacions[0].AplicaHuawei = !EditObra.DataInstalacion.AplicaHuawei; InvokeAsync(StateHasChanged);}&quot;&gt;

            &lt;/Checkbox&gt;
        &lt;/div&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4&quot;&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de plan de equipos&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataInstalacions[SelectedVersion].FechaPlanEquiposHuawei&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de ejecuci&oacute;n de equipos&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataInstalacions[SelectedVersion].FechaEjecucionEquiposHuawei&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de fin de ejecuci&oacute;n de equipos&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataInstalacions[SelectedVersion].FechaFinEjecucionEquiposHuawei&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Comentario&lt;/span&gt;

                &lt;textarea class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind=&quot;EditObra.DataInstalacions[SelectedVersion].ComentarioHuawei&quot; /&gt;

            &lt;/div&gt;
            &lt;!-- Bot&oacute;n Guardar --&gt;
            &lt;div class=&quot;flex items-center justify-center col-span-full&quot;&gt;
                &lt;button class=&quot;rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SaveAsync())&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;

        &lt;/div&gt;

    &lt;/div&gt;



    @code {
        [Parameter] public E_SeguimientoE2E EditObra { get; set; }
        int SelectedVersion = 0;
        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };

        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo(&quot;/seguimientofibra&quot;);
        }
    }
    `
  },
    {
    "ID": 33,
    "ServicesName": "TarjetaInstalacionLPS",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaInstalacionLPS",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md&quot;&gt;
        &lt;!-- T&iacute;tulo Informaci&oacute;n --&gt;
        &lt;div class=&quot;w-full text-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;Instalaci&oacute;n LPS&lt;/span&gt;
            &lt;Checkbox Message=&quot;Aplica&quot; Checked=EditObra.DataInstalacions[0].Aplica ChangeCheck=&quot;()=&gt; {EditObra.DataInstalacions[0].Aplica = !EditObra.DataInstalacions[0].Aplica; InvokeAsync(StateHasChanged);}&quot;&gt;

            &lt;/Checkbox&gt;
        &lt;/div&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4&quot;&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de plan&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataInstalacions[SelectedVersion].FechaPlan&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de inicio&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataInstalacions[SelectedVersion].FechaInicio&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de fin&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataInstalacions[SelectedVersion].FechaFin&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de integraci&oacute;n&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataInstalacions[SelectedVersion].FechaIntegracion&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de entrega&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataInstalacions[SelectedVersion].FechaEntrega&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Comentario&lt;/span&gt;

                &lt;textarea class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind=&quot;EditObra.DataInstalacions[SelectedVersion].Comentario&quot; /&gt;

            &lt;/div&gt;
            &lt;!-- Bot&oacute;n Guardar --&gt;
            &lt;div class=&quot;flex items-center justify-center col-span-full&quot;&gt;
                &lt;button class=&quot;rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SaveAsync())&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;

        &lt;/div&gt;

    &lt;/div&gt;


    @code {

        [Parameter] public E_SeguimientoE2E EditObra { get; set; }
        int SelectedVersion = 0;
        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };
        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo(&quot;/seguimientofibra&quot;);
        }
    }
    `
  },
    {
    "ID": 34,
    "ServicesName": "TarjetaInstalacionNokia",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaInstalacionNokia",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md&quot;&gt;
        &lt;!-- T&iacute;tulo Informaci&oacute;n --&gt;
        &lt;div class=&quot;w-full text-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;Instalaci&oacute;n Nokia&lt;/span&gt;
            &lt;Checkbox Message=&quot;Aplica&quot; Checked=EditObra.DataInstalacions[0].AplicaNokia ChangeCheck=&quot;()=&gt; {EditObra.DataInstalacions[0].AplicaNokia = !EditObra.DataInstalacions[0].AplicaNokia; InvokeAsync(StateHasChanged);}&quot;&gt;

            &lt;/Checkbox&gt;
        &lt;/div&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4&quot;&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de plan de equipos&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataInstalacions[SelectedVersion].FechaPlanEquiposNokia&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de plan&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataUtilitiess[SelectedVersion].FechaPlanGNF&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de aprobaci&oacute;n&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataUtilitiess[SelectedVersion].FechaAprobacionGNF&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Comentario&lt;/span&gt;

                &lt;textarea class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind=&quot;EditObra.DataUtilitiess[SelectedVersion].ComentarioGNF&quot; /&gt;

            &lt;/div&gt;
            &lt;!-- Bot&oacute;n Guardar --&gt;
            &lt;div class=&quot;flex items-center justify-center col-span-full&quot;&gt;
                &lt;button class=&quot;rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SaveAsync())&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;

        &lt;/div&gt;

    &lt;/div&gt;



    @code {
        [Parameter] public E_SeguimientoE2E EditObra { get; set; }

        int SelectedVersion = 0;

        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };
        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo(&quot;/seguimientofibra&quot;);
        }
    }
    `
  },
    {
    "ID": 35,
    "ServicesName": "TarjetaLicencias",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaLicencias",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md&quot;&gt;
        &lt;!-- T&iacute;tulo Informaci&oacute;n --&gt;
        &lt;div class=&quot;w-full text-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;Licencias&lt;/span&gt;
            &lt;Checkbox Message=&quot;Aplica&quot; Checked=EditObra.DataLicenciass[0].Aplica ChangeCheck=&quot;()=&gt; {EditObra.DataLicenciass[0].Aplica = !EditObra.DataLicenciass[0].Aplica; InvokeAsync(StateHasChanged);}&quot;&gt;

            &lt;/Checkbox&gt;
        &lt;/div&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4&quot;&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de solicitud&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataLicenciass[SelectedVersion].FechaSolicitud&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de plan&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataLicenciass[SelectedVersion].FechaPlan&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
            &lt;span class=&quot;w-full text-blue-400&quot;&gt;N&ordm; de requerimientos&lt;/span&gt;

            &lt;InputNumber TValue=&quot;int&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-Value=&quot;EditObra.DataLicenciass[SelectedVersion].NumeroRequerimientos&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de aprobaci&oacute;n&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataLicenciass[SelectedVersion].FechaAprobacion&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Comentario&lt;/span&gt;

                &lt;textarea class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind=&quot;EditObra.DataLicenciass[SelectedVersion].Comentario&quot; /&gt;

            &lt;/div&gt;

        

            &lt;!-- Bot&oacute;n Guardar --&gt;
            &lt;div class=&quot;flex items-center justify-center col-span-full&quot;&gt;
                &lt;button class=&quot;rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SaveAsync())&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;

        &lt;/div&gt;

    &lt;/div&gt;


    @code {
        [Parameter] public E_SeguimientoE2E EditObra { get; set; }
        int SelectedVersion = 0;
        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };
        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo(&quot;/seguimientofibra&quot;);
        }
    }
    `
  },
    {
    "ID": 36,
    "ServicesName": "TarjetaObraCivil",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaObraCivil",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md&quot;&gt;
        &lt;!-- T&iacute;tulo Informaci&oacute;n --&gt;
        &lt;div class=&quot;w-full text-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;Obra civil&lt;/span&gt;
            &lt;Checkbox Message=&quot;Aplica&quot; Checked=EditObra.DataObraCivils[0].Aplica ChangeCheck=&quot;()=&gt; {EditObra.DataObraCivils[0].Aplica = !EditObra.DataObraCivils[0].Aplica; InvokeAsync(StateHasChanged);}&quot;&gt;

            &lt;/Checkbox&gt;
        &lt;/div&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4&quot;&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de plan&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataObraCivils[SelectedVersion].FechaPlan&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de replanteo&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataObraCivils[SelectedVersion].FechaReplanteo&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de inicio&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataObraCivils[SelectedVersion].FechaInicio&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de fin&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataObraCivils[SelectedVersion].FechaFin&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Comentario&lt;/span&gt;

                &lt;textarea class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind=&quot;EditObra.DataObraCivils[SelectedVersion].Comentario&quot; /&gt;

            &lt;/div&gt;
        
            &lt;!-- Bot&oacute;n Guardar --&gt;
            &lt;div class=&quot;flex items-center justify-center col-span-full&quot;&gt;
                &lt;button class=&quot;rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SaveAsync())&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;

        &lt;/div&gt;

    &lt;/div&gt;


    @code {
        [Parameter] public E_SeguimientoE2E EditObra { get; set; }
        int SelectedVersion = 0;
        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };

        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo(&quot;/seguimientofibra&quot;);
        }
    }
    `
  },
    {
    "ID": 37,
    "ServicesName": "TarjetaStockObra",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaStockObra",
    "ServicesDescription": "",
    "Code": `
    @using LPSGrupo.Components.Areas.RedFijaF.Logistica.Compras.Modals
    @using LPSGrupo.Components.Areas.RedFijaF.SeguimientoFibra.Modals
    @*&lt;AuthorizePage Roles=&quot;@(new(){&quot;SeguimientoE2E.Supervisor&quot;})&quot;&gt;&lt;/AuthorizePage&gt;*@

    &lt;div class=&quot;min-h-screen p-4 bg-gray-100&quot;&gt;
        &lt;!-- Encabezado --&gt;
        &lt;div class=&quot;flex flex-col gap-2 mb-4 bg-white p-4 rounded shadow&quot;&gt;
            &lt;h2 class=&quot;text-2xl font-bold text-blue-500&quot;&gt;Stock de la Obra&lt;/h2&gt;
            &lt;div class=&quot;flex justify-between items-center&quot;&gt;
                &lt;span class=&quot;text-gray-700&quot;&gt;Obra: &lt;strong&gt;@EditObra.Titulo&lt;/strong&gt;&lt;/span&gt;
                &lt;div class=&quot;flex gap-2&quot;&gt;
                    &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaSeguimientoObraVerProyectoVerObraStockObraAddSoliciCompra)&quot;&gt;
                        &lt;button class=&quot; px-4 py-2 rounded shadow &quot; @onclick=&quot;()=&gt;
                            AddCompra()&quot;&gt;
                                @*Solicitud Compra*@
                            &lt;img src=&quot;/Images/RedFija/pedido-en-l&iacute;nea-64.png&quot; alt=&quot;PDF&quot;
                                class=&quot;w-10 h-10 transition-transform duration-300 hover:scale-150&quot;&gt;

                        &lt;/button&gt;
                    &lt;/AuthorizedContent&gt;
                    &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaSeguimientoObraVerProyectoVerObraStockObraVerAlbaranes)&quot;&gt;
                    
                        &lt;button class=&quot; px-4 py-2 rounded shadow &quot; @onclick=&quot;()=&gt;
                            OpenModalAlbaranes(EditObra)&quot;&gt;
                        
                                &lt;img src=&quot;/Images/RedFija/archivo-pdf.png&quot; alt=&quot;PDF&quot;
                                    class=&quot;w-10 h-10 transition-transform duration-300 hover:scale-150&quot;&gt;
                        
                        &lt;/button&gt;
                    &lt;/AuthorizedContent&gt;
                    &lt;button class=&quot;px-4 py-2 rounded shadow &quot; &gt;
                        &lt;img src=&quot;/Images/RedFija/archivo-excel.png&quot; alt=&quot;Excel-Export&quot;
                            class=&quot;w-10 h-10 transition-transform duration-300 hover:scale-150&quot;&gt;
                    &lt;/button&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;


        &lt;!-- Control Productos --&gt;
    
        &lt;div class=&quot;bg-white p-4 rounded shadow mb-4&quot;&gt;
        
            &lt;h3 class=&quot;text-xl font-semibold text-gray-800 mb-4&quot;&gt;Control inventario obra&lt;/h3&gt;

            &lt;div class=&quot;flex justify-between&quot;&gt;
                &lt;div class=&quot;flex&quot;&gt;
                    &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaSeguimientoObraVerProyectoVerObraStockObraAddProductosInventario)&quot;&gt;
                
                        &lt;button class=&quot;px-3 py-1 rounded shadow&quot; @onclick=&quot;@(() =&gt; ControlProducto(&quot;Entrada&quot;))&quot;&gt;
                            &lt;img src=&quot;/Images/RedFija/agregar-producto.png&quot; alt=&quot;Agregar&quot;
                                class=&quot;w-11 h-11 transition-transform duration-300 hover:scale-150&quot;&gt;
                        &lt;/button&gt;
                    &lt;/AuthorizedContent&gt;
                &lt;/div&gt;

                &lt;div class=&quot;flex flex-col items-center&quot;&gt;
                    &lt;h2 class=&quot;text-xl font-semibold text-gray-800&quot;&gt;Coste Total Stock&lt;/h2&gt;
                    @if (EditObra.DatosStockProductos.ProductoStockSubproyecto.Any())
                    {
                        var suma = EditObra.DatosStockProductos.ProductoStockSubproyecto
                        .Sum(x =&gt; (x.CheckSeriable ? x.ListaNumSerie.Count : x.CantidadEnSubproyecto) * x.PrecioUnitario);
                        &lt;p class=&quot;text-lg font-bold&quot;&gt;@suma&lt;/p&gt;
                    }
                    else
                    {
                        &lt;p class=&quot;text-lg font-bold&quot;&gt;0&lt;/p&gt;
                    }
                &lt;/div&gt;

                &lt;div class=&quot;flex&quot;&gt;
                    &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaSeguimientoObraVerProyectoVerObraStockObraDevolverProductInventario)&quot;&gt;
                
                        &lt;button class=&quot;px-3 py-1 rounded shadow&quot; @onclick=&quot;@(() =&gt; ControlProducto(&quot;Devol&quot;))&quot;&gt;
                            &lt;img src=&quot;/Images/RedFija/devolver-producto.png&quot; alt=&quot;Devolver&quot;
                                class=&quot;w-11 h-11 transition-transform duration-300 hover:scale-150&quot;&gt;
                        &lt;/button&gt;
                    &lt;/AuthorizedContent&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;



        &lt;!-- Inventario Obra --&gt;
        &lt;div class=&quot;bg-white p-4 rounded shadow mb-4&quot;&gt;
            &lt;h3 class=&quot;text-xl font-semibold text-gray-800 mb-2&quot;&gt;Inventario Obra&lt;/h3&gt;
            &lt;table class=&quot;table-auto w-full text-left border-collapse border border-gray-200&quot;&gt;
                &lt;thead class=&quot;bg-gray-800 text-white&quot;&gt;
                    &lt;tr&gt;
                        &lt;th class=&quot;border border-gray-300 px-4 py-2&quot;&gt;C&oacute;digo&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 px-4 py-2&quot;&gt;Producto&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 px-4 py-2&quot;&gt;Cantidad&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 px-4 py-2&quot;&gt;Precio unitario&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 px-4 py-2&quot;&gt;Coste&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 px-4 py-2&quot;&gt;Prod. Series&lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    &lt;!-- Iterar sobre los productos --&gt;
                    @if (EditObra.DatosStockProductos.ProductoStockSubproyecto.Any())
                    {
                        foreach (var producto in EditObra.DatosStockProductos.ProductoStockSubproyecto)
                        {
                            &lt;tr&gt;
                                &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@producto.CodigoProducto&lt;/td&gt;
                                &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@producto.NombreProducto&lt;/td&gt;
                                @if (producto.CheckSeriable)
                                {
                                    &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@producto.ListaNumSerie.Count&lt;/td&gt;

                                } 
                                else
                                {
                                    &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@producto.CantidadEnSubproyecto&lt;/td&gt;
                                }
                                
                                &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@producto.PrecioUnitario&lt;/td&gt;


                                @if (producto.CheckSeriable)
                                {
                                    &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;
                                        @(producto.ListaNumSerie.Count * producto.PrecioUnitario)
                                    &lt;/td&gt;
                                }
                                else
                                {
                                    &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;
                                        @(producto.CantidadEnSubproyecto * producto.PrecioUnitario)
                                    &lt;/td&gt;
                                }

                            
                                @if (producto.CheckSeriable)
                                {
                                    &lt;td class=&quot;p-2 border border-slate-300/50 text-center&quot;&gt;
                                        &lt;button class=&quot;bg-slate-300 text-white px-3 py-1 rounded transition duration-200  hover:bg-transparent&quot;
                                                @onclick=&quot;() =&gt; ToggleSerie(producto.IdProducto + producto.IdAlmacen + producto.IdProyecto + producto.PrecioUnitario.ToString())&quot;&gt;
                                            📦
                                        &lt;/button&gt;
                                    &lt;/td&gt;
                                }
                            &lt;/tr&gt;


                            @if (MostrarSeries.Any() &amp;&amp; producto.CheckSeriable)
                            {
                                var key = producto.IdProducto + producto.IdAlmacen + producto.IdProyecto + producto.PrecioUnitario.ToString();

                                if (MostrarSeries.TryGetValue(key, out var mostrar) &amp;&amp; mostrar)
                                {
                                    &lt;tr class=&quot;bg-gray-100&quot;&gt;
                                        &lt;td colspan=&quot;5&quot; class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                            &lt;b&gt;@producto.NombreProducto&lt;/b&gt; - N&uacute;meros de Serie:
                                            &lt;ul class=&quot;list-disc pl-5 text-sm&quot;&gt;
                                                @foreach (var serie in producto.ListaNumSerie)
                                                {
                                                    &lt;li class=&quot;flex flex-row items-center transition duration-200 hover:bg-blue-300&quot;&gt;
                                                        &lt;div class=&quot;basis-1/3&quot;&gt;@serie&lt;/div&gt;

                                                        @if (producto.EsBobina)
                                                        {
                                                            var medida = producto.ListaMedidas.FirstOrDefault(x =&gt; x.NumSerie == serie);

                                                            if (medida != null)
                                                            {
                                                                &lt;div class=&quot;basis-2/3&quot;&gt;| Metros Disponibles: @medida.ValorMedida @medida.TipoUnidad&lt;/div&gt;
                                                            }
                                                        }
                                                    &lt;/li&gt;
                                                    &lt;hr /&gt;
                                                }
                                            &lt;/ul&gt;
                                        &lt;/td&gt;
                                    &lt;/tr&gt;
                                }
                            }

                        }

                    }
                
                &lt;/tbody&gt;
            &lt;/table&gt;
        &lt;/div&gt;


        &lt;!-- Secci&oacute;n de Inventario Consumido --&gt;
        &lt;div class=&quot;bg-white p-4 rounded shadow mb-4&quot;&gt;
            &lt;div class=&quot;flex justify-between items-center mb-4&quot;&gt;
                &lt;h3 class=&quot;text-xl font-semibold text-gray-800&quot;&gt;Inventario Consumido&lt;/h3&gt;

                &lt;!-- Bot&oacute;n para abrir el modal --&gt;
                &lt;button class=&quot;px-3 py-1 rounded shadow&quot;
                        @onclick=&quot;@(() =&gt; ControlProducto(&quot;Consumir&quot;))&quot;&gt;
                    &lt;img src=&quot;/Images/RedFija/lista-de-verificacion.png&quot; alt=&quot;Excel-Export&quot;
                        class=&quot;w-10 h-10 transition-transform duration-300 hover:scale-150&quot;&gt;
                &lt;/button&gt;
            &lt;/div&gt;

            &lt;!-- Tabla de Productos Consumidos --&gt;
            &lt;table class=&quot;table-auto w-full text-left border-collapse border border-gray-200&quot;&gt;
                &lt;thead class=&quot;bg-gray-800 text-white&quot;&gt;
                    &lt;tr&gt;
                        &lt;th class=&quot;border border-gray-300 px-4 py-2&quot;&gt;C&oacute;digo&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 px-4 py-2&quot;&gt;Producto&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 px-4 py-2&quot;&gt;Cantidad&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 px-4 py-2&quot;&gt;Precio unitario&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 px-4 py-2&quot;&gt;Coste&lt;/th&gt;
                        &lt;th class=&quot;border border-gray-300 px-4 py-2&quot;&gt;Acciones&lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    @if (EditObra.DatosStockProductos.ProductoObraConsumido.Any())
                    {
                        @foreach (var producto in EditObra.DatosStockProductos.ProductoObraConsumido)
                        {
                            &lt;tr&gt;
                                &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@producto.CodigoProducto&lt;/td&gt;
                                &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@producto.NombreProducto&lt;/td&gt;
                                @if (producto.CheckSeriable)
                                {
                                    &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@producto.ListaNumSerie.Count&lt;/td&gt;

                                }
                                else
                                {
                                    &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@producto.CantidadConsumida&lt;/td&gt;
                                }
                                &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@producto.PrecioUnitario&lt;/td&gt;
                                &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;
                                    @(producto.CantidadConsumida * producto.PrecioUnitario)
                                &lt;/td&gt;
                                &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;
                                
                            
                                    &lt;button class=&quot;text-red-500 hover:text-red-700&quot;
                                            @onclick=&quot;() =&gt; EliminarProducto(producto.IdProductosStock)&quot;&gt;
                                        ❌
                                    &lt;/button&gt;

                                    @if (producto.CheckSeriable)
                                    {
                                        var key2 = &quot;IC&quot;+producto.IdProducto + producto.IdAlmacen + producto.IdProyecto + producto.PrecioUnitario.ToString();
                                        &lt;button class=&quot;bg-slate-300 text-white px-3 py-1 rounded transition duration-200  hover:bg-transparent&quot;
                                                @onclick=&quot;() =&gt; ToggleSerie( key2)&quot;&gt;
                                            📦
                                        &lt;/button&gt;
                                    }
                                &lt;/td&gt;
                            &lt;/tr&gt;
                            @if (MostrarSeries.Any() &amp;&amp; producto.CheckSeriable)
                            {
                                var key = &quot;IC&quot;+ producto.IdProducto + producto.IdAlmacen + producto.IdProyecto + producto.PrecioUnitario.ToString();

                                if (MostrarSeries.TryGetValue(key, out var mostrar) &amp;&amp; mostrar)
                                {
                                    &lt;tr class=&quot;bg-gray-100&quot;&gt;
                                        &lt;td colspan=&quot;5&quot; class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                            &lt;b&gt;@producto.NombreProducto&lt;/b&gt; - N&uacute;meros de Serie:
                                            &lt;ul class=&quot;list-disc pl-5 text-sm&quot;&gt;
                                                @foreach (var serie in producto.ListaNumSerie)
                                                {
                                                    &lt;li class=&quot;flex flex-row items-center transition duration-200 hover:bg-blue-300&quot;&gt;
                                                        &lt;div class=&quot;basis-1/3&quot;&gt;@serie&lt;/div&gt;

                                                        @if (producto.EsBobina)
                                                        {
                                                            var medida = producto.ListaMedidas.FirstOrDefault(x =&gt; x.NumSerie == serie);

                                                            if (medida != null)
                                                            {
                                                                &lt;div class=&quot;basis-2/3&quot;&gt;| Metros Disponibles: @medida.ValorMedida @medida.TipoUnidad&lt;/div&gt;
                                                            }
                                                        }
                                                    &lt;/li&gt;
                                                    &lt;hr /&gt;
                                                }
                                            &lt;/ul&gt;
                                        &lt;/td&gt;
                                    &lt;/tr&gt;
                                }
                            }
                        }
                    }
                    else
                    {
                        &lt;tr&gt;
                            &lt;td colspan=&quot;6&quot; class=&quot;text-center p-4&quot;&gt;No hay productos agregados.&lt;/td&gt;
                        &lt;/tr&gt;
                    }
                &lt;/tbody&gt;
            &lt;/table&gt;
        &lt;/div&gt;


        

        &lt;!-- Historial de Movimientos --&gt;
        &lt;div class=&quot;bg-white p-4 rounded shadow&quot;&gt;
            &lt;h3 class=&quot;text-xl font-semibold text-gray-800 mb-4&quot;&gt;Historial de Movimientos&lt;/h3&gt;

            &lt;!-- Tabla --&gt;
            &lt;div class=&quot;max-h-60 overflow-y-auto border border-gray-300 rounded&quot;&gt;
                &lt;table class=&quot;table-auto w-full border-collapse&quot;&gt;
                    &lt;thead class=&quot;bg-gray-800 text-white&quot;&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot;px-4 py-2 border&quot;&gt;Nombre&lt;/th&gt;
                            &lt;th class=&quot;px-4 py-2 border&quot;&gt;Cod. Producto&lt;/th&gt;
                            &lt;th class=&quot;px-4 py-2 border&quot;&gt;Movimiento&lt;/th&gt;
                            &lt;th class=&quot;px-4 py-2 border&quot;&gt;Cant. Movida&lt;/th&gt;
                            &lt;th class=&quot;px-4 py-2 border&quot;&gt;Fecha&lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var movimiento in EditObra.DatosStockProductos.MovimientosStockSubPoyecto.Select((m, index) =&gt; new { Movimiento = m, Index = index }))
                        {
                            &lt;tr class=&quot;hover:bg-gray-50&quot;&gt;
                                &lt;td class=&quot;px-4 py-2 border&quot;&gt;@movimiento.Movimiento.NombreProducto&lt;/td&gt;

                                &lt;!-- Cod. Producto con tooltip si hay ListaNumSerie --&gt;
                                &lt;td class=&quot;px-4 py-2 border relative&quot;&gt;
                                    @if (movimiento.Movimiento.ListaNumSerie?.Any() == true)
                                    {
                                        &lt;span class=&quot;text-blue-500 cursor-pointer hover:underline&quot;
                                            @onclick=&quot;() =&gt; ToggleTooltip(movimiento.Index)&quot;&gt;
                                            @movimiento.Movimiento.CodigoProducto
                                        &lt;/span&gt;

                                        &lt;!-- Tooltip: Lista de n&uacute;meros de serie --&gt;
                                        @if (VisibleTooltips.Contains(movimiento.Index))
                                        {
                                            &lt;div class=&quot;absolute left-0 mt-2 w-64 p-2 bg-white border rounded-lg shadow-lg z-50&quot;&gt;
                                                &lt;strong&gt;N&uacute;meros de serie:&lt;/strong&gt;
                                                &lt;ul class=&quot;list-disc pl-4 text-sm text-gray-700 max-h-32 overflow-y-auto&quot;&gt;
                                                    @foreach (var serie in movimiento.Movimiento.ListaNumSerie)
                                                    {
                                                        &lt;li class=&quot;flex flex-row items-center transition duration-200 hover:bg-blue-300&quot;&gt;
                                                            &lt;div class=&quot;basis-1/3&quot;&gt;@serie&lt;/div&gt;

                                                            &lt;!-- Parte derecha (Input y Checkbox) --&gt;
                                                            @if (movimiento.Movimiento.EsBobina)
                                                            {
                                                                var medida = movimiento.Movimiento.ListaMedidas.FirstOrDefault(x =&gt; x.NumSerie == serie);

                                                                if (medida != null)
                                                                {
                                                                    &lt;div class=&quot;basis-2/3&quot;&gt;|   Metros Disponibles: @medida.ValorMedida  @medida.TipoUnidad&lt;/div&gt;

                                                                }

                                                            }

                                                        &lt;/li&gt;
                                                    }
                                                &lt;/ul&gt;
                                            &lt;/div&gt;
                                        }
                                    }
                                    else
                                    {
                                        @movimiento.Movimiento.CodigoProducto
                                    }
                                &lt;/td&gt;

                                &lt;!-- Movimiento con colores --&gt;
                                &lt;td class=&quot;px-4 py-2 border font-semibold text-white text-center
                        @(movimiento.Movimiento.Tipo == &quot;Entrada&quot; ? &quot;text-green-500&quot;  :  movimiento.Movimiento.Tipo == &quot;Consumido&quot; ? &quot;text-purple-500&quot; : &quot;text-orange-500&quot;)&quot;&gt;
                                    @movimiento.Movimiento.Tipo
                                &lt;/td&gt;
                                @if (movimiento.Movimiento.EsBobina)
                                {
                                    &lt;td class=&quot;px-4 py-2 border&quot;&gt;@movimiento.Movimiento.ListaMedidas.Sum(x =&gt; x.ValorMedida)&lt;/td&gt;

                                }
                                else
                                {
                                    &lt;td class=&quot;px-4 py-2 border&quot;&gt;@movimiento.Movimiento.CantidadTrasladada&lt;/td&gt;
                                
                                }
                            
                                &lt;td class=&quot;px-4 py-2 border&quot;&gt;@movimiento.Movimiento.FechaMovimiento&lt;/td&gt;
                            &lt;/tr&gt;
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;


            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;


    @code {

        [Parameter] 
        public E_SeguimientoE2E EditObra { get; set; }

        private int SelectedVersion = 0;
        private Dictionary&lt;string, bool&gt; MostrarSeries = new();
        private HashSet&lt;int&gt; VisibleTooltips = new();
        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };

        private void ToggleSerie(string IdProducto)
        {
            if (MostrarSeries.ContainsKey(IdProducto))
            {
                MostrarSeries[IdProducto] = !MostrarSeries[IdProducto];
            }
            else
            {
                MostrarSeries[IdProducto] = true;
            }
        }

        protected override async Task OnInitializedAsync()
        {
            await InicializarMostrarSeries();

    

        }

        void ToggleTooltip(int index)
        {
            if (VisibleTooltips.Contains(index))
            {
                VisibleTooltips.Remove(index); // Ocultar el tooltip si ya est&aacute; visible
            }
            else
            {
                VisibleTooltips.Add(index); // Mostrar el tooltip si no est&aacute; visible
            }
        }

        private async Task InicializarMostrarSeries()
        {
            MostrarSeries.Clear(); // Limpiar el diccionario antes de rellenarlo
            if (EditObra?.DatosStockProductos.ProductoStockSubproyecto != null &amp;&amp; EditObra?.DatosStockProductos.ProductoStockSubproyecto.Count &gt; 0)
            {
                foreach (var producto in EditObra?.DatosStockProductos.ProductoStockSubproyecto)
                {
                    if (producto.CheckSeriable)
                    {


                        // Verificar si la clave ya existe antes de agregarla
                        if (!MostrarSeries.ContainsKey(producto.IdProducto + producto.IdAlmacen + producto.IdProyecto + producto.PrecioUnitario.ToString()))
                        {
                            MostrarSeries.Add(producto.IdProducto + producto.IdAlmacen + producto.IdProyecto + producto.PrecioUnitario.ToString(), false); // Inicialmente oculto
                        }
                    }
                }
            }


        }

        private async Task ShowModal(Type modalType, Dictionary&lt;string, object&gt; parameters, int fixedWidth = 90, int maxHeight = 80)
        {
            var modal = _modal.ShowModal(modalType, parameters, FixedWidth: fixedWidth, MaxHeight: maxHeight);
            modal.OnCloseModal += async (result) =&gt; await LoadApi(EditObra.Id);
        }

        public async Task ControlProducto(string motivo)
        {

            var modal = _modal.ShowModal(typeof(M_AddDelProducStockObra), new Dictionary&lt;string, object&gt;
            {
                {nameof(M_AddDelProducStockObra.SeguimientoSubproyecto), EditObra},
                {nameof(M_AddDelProducStockObra.Motivo), motivo},
                {nameof(M_AddDelProducStockObra.OnConfirm),  EventCallback.Factory.Create&lt;bool&gt;(this,
                        confirmacion =&gt; HandleConfirmacion(confirmacion)) }
            }, FixedWidth: 80, MaxHeight: 80);

            modal.OnCloseModal += (b) =&gt;
            {

            };

        }

        // M&eacute;todo para eliminar un producto por su c&oacute;digo
        private void EliminarProducto(string codigo)
        {
        
        }

        public async Task LoadApi(string id)
        {


            var result = await _mongoContext.GetOneSeguimientoFibra(id);
            EditObra = result.Value;
            await InicializarMostrarSeries();
            await InvokeAsync(StateHasChanged);


        }

        private async Task HandleConfirmacion(bool confirmacion)
        {
            if (confirmacion)
            {
                await LoadApi(EditObra.Id);

            }
        }

        public async Task SaveAsync()
        {

            await _mongoContext.EditSeguimientoFibra(EditObra);

        }


        public async Task AddCompra()
        {
            try
            {

                _main.IsLoading = true;


                _nav.NavigateTo($&quot;/logistica/solicitudes/{EditObra.IdProyecto}/{EditObra.Id}&quot;);



                //
                // // Configurar los par&aacute;metros para el modal
                // var parameters = new Dictionary&lt;string, object&gt;
                // {
                //     { nameof(M_NuevaCompra.OnComplete), EventCallback.Factory.Create&lt;bool&gt;(this, OnCompraAdded) },
                //     { nameof(M_NuevaCompra.IdObraE2ECompraSolicitada), EditObra.Id },
                //     { nameof(M_NuevaCompra.IdProyectoCompraSolicitada), EditObra.IdProyecto }
                // };
                //
                // // Llamar al m&eacute;todo centralizado para mostrar el modal
                // await ShowModal(typeof(M_NuevaCompra), parameters, fixedWidth: 60);
            }
            catch (Exception ex)
            {
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, &quot;TarjetaStockObra&quot;, &quot;AddCompra&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
            }
        }

        private async Task OnCompraAdded(bool confirmacion)
        {
            if (confirmacion)
            {
                Console.WriteLine(&quot;Compra a&ntilde;adida correctamente. Recargando datos...&quot;);
                await LoadApi(EditObra.Id);
            }
        }

        public async Task OpenModalAlbaranes(E_SeguimientoE2E obra)
        {
            try
            {
                // Configurar los par&aacute;metros para el modal
                var parameters = new Dictionary&lt;string, object&gt;
                {
                    { nameof(M_VistaAlbaranesObra.ListadoAlbaranes), obra.DatosStockProductos.AlbaranesObra},
                    { nameof(M_VistaAlbaranesObra.CodigoGeser), obra.CodigoGSER }
                };
        
                // Llamar al m&eacute;todo centralizado para mostrar el modal
                await ShowModal(typeof(M_VistaAlbaranesObra), parameters, fixedWidth: 60, maxHeight: 80);
            }
            catch (Exception ex)
            {
                Console.WriteLine($&quot;Error en OpenModalAlbaranes: {ex.Message}&quot;);
            }
        }
    }
    `
  },
    {
    "ID": 38,
    "ServicesName": "TarjetaUtilitiesEndesa",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaUtilitiesEndesa",
    "ServicesDescription": "",
    "Code": `
    <div class="min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md">
        <!-- Título Información -->
        <div class="w-full text-center">
            <span class="text-blue-400 text-2xl font-bold">Utilities Endesa</span>
            <Checkbox Message="Aplica" Checked=EditObra.DataUtilitiess[0].AplicaEndesa ChangeCheck="()=> {EditObra.DataUtilitiess[0].AplicaEndesa = !EditObra.DataUtilitiess[0].AplicaEndesa; InvokeAsync(StateHasChanged);}">

            </Checkbox>
        </div>
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div class="flex flex-col gap-2">
                <span class="w-full text-blue-400">Fecha de solicitud</span>

                <input type="date" class="w-full rounded border boder-slate-300/50 p-2" @bind-value="EditObra.DataUtilitiess[SelectedVersion].FechaSolicitudEndesa" />

            </div>
            <div class="flex flex-col gap-2">
                <span class="w-full text-blue-400">Fecha de plan</span>

                <input type="date" class="w-full rounded border boder-slate-300/50 p-2" @bind-value="EditObra.DataUtilitiess[SelectedVersion].FechaPlanEndesa" />

            </div>

            <div class="flex flex-col gap-2">
                <span class="w-full text-blue-400">Fecha de aprobación</span>

                <input type="date" class="w-full rounded border boder-slate-300/50 p-2" @bind-value="EditObra.DataUtilitiess[SelectedVersion].FechaAprobacionEndesa" />
            </div>

            <div class="flex flex-col gap-2">
                <span class="w-full text-blue-400">Comentario</span>

                <textarea class="w-full rounded border boder-slate-300/50 p-2" @bind="EditObra.DataUtilitiess[SelectedVersion].ComentarioEndesa" />

            </div>
            <!-- Botón Guardar -->
            <div class="flex items-center justify-center col-span-full">
                <button class="rounded p-2 bg-blue-400 text-white" @onclick="@(()=> SaveAsync())">Guardar</button>
            </div>

        </div>

    </div>


    @code {
        [Parameter] public E_SeguimientoE2E EditObra { get; set; }
        int SelectedVersion = 0;
        public string ColorEstado(string estado) => estado switch
        {
            "Sin iniciar" => "bg-slate-600",
            "Parado" => "bg-amber-400",
            "En curso" => "bg-blue-400",
            "Cancelado" => "bg-black",
            "Finalizado" => "bg-teal-400",
            _ => "bg-blue-400"
        };
        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo("/seguimientofibra");
        }
    }
    `
  },
    {
    "ID": 39,
    "ServicesName": "TarjetaUtilitiesGNF",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaUtilitiesGNF",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md&quot;&gt;
        &lt;!-- T&iacute;tulo Informaci&oacute;n --&gt;
        &lt;div class=&quot;w-full text-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;Utilities GNF&lt;/span&gt;
            &lt;Checkbox Message=&quot;Aplica&quot; Checked=EditObra.DataUtilitiess[0].AplicaGNF ChangeCheck=&quot;()=&gt; {EditObra.DataUtilitiess[0].AplicaGNF = !EditObra.DataUtilitiess[0].AplicaGNF; InvokeAsync(StateHasChanged);}&quot;&gt;

            &lt;/Checkbox&gt;
        &lt;/div&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4&quot;&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de solicitud&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataUtilitiess[SelectedVersion].FechaSolicitudGNF&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de plan&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataUtilitiess[SelectedVersion].FechaPlanGNF&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de aprobaci&oacute;n&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataUtilitiess[SelectedVersion].FechaAprobacionGNF&quot; /&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Comentario&lt;/span&gt;

                &lt;textarea class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind=&quot;EditObra.DataUtilitiess[SelectedVersion].ComentarioGNF&quot; /&gt;

            &lt;/div&gt;
            &lt;!-- Bot&oacute;n Guardar --&gt;
            &lt;div class=&quot;flex items-center justify-center col-span-full&quot;&gt;
                &lt;button class=&quot;rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SaveAsync())&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;

        &lt;/div&gt;

    &lt;/div&gt;

    @code {
        [Parameter] public E_SeguimientoE2E EditObra { get; set; }
        int SelectedVersion = 0;
        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };
        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo(&quot;/seguimientofibra&quot;);
        }
    }
    `
  },
    {
    "ID": 40,
    "ServicesName": "TarjetaUtilitiesIberdrola",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaUtilitiesIberdrola",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md&quot;&gt;

        &lt;!-- T&iacute;tulo Informaci&oacute;n --&gt;
        &lt;div class=&quot;w-full text-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;Utilities Iberdrola&lt;/span&gt;
            &lt;Checkbox Message=&quot;Aplica&quot; Checked=EditObra.DataUtilitiess[0].AplicaIberdrola ChangeCheck=&quot;()=&gt; {EditObra.DataUtilitiess[0].AplicaIberdrola = !EditObra.DataUtilitiess[0].AplicaIberdrola; InvokeAsync(StateHasChanged);}&quot;&gt;

            &lt;/Checkbox&gt;
        &lt;/div&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4&quot;&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de solicitud&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataUtilitiess[SelectedVersion].FechaSolicitudIberdrola&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de plan&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataUtilitiess[SelectedVersion].FechaPlanIberdrola&quot; /&gt;

            &lt;/div&gt;
    
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de aprobaci&oacute;n&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataUtilitiess[SelectedVersion].FechaAprobacionIberdrola&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Comentario&lt;/span&gt;

                &lt;textarea class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind=&quot;EditObra.DataUtilitiess[SelectedVersion].ComentarioIberdrola&quot; /&gt;

            &lt;/div&gt;
            &lt;!-- Bot&oacute;n Guardar --&gt;
            &lt;div class=&quot;flex items-center justify-center col-span-full&quot;&gt;
                &lt;button class=&quot;rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SaveAsync())&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;

        &lt;/div&gt;

    &lt;/div&gt;


    @code {
        [Parameter] public E_SeguimientoE2E EditObra { get; set; }
        int SelectedVersion = 0;
        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };

        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo(&quot;/seguimientofibra&quot;);
        }
    }
    `
  },
    {
    "ID": 41,
    "ServicesName": "TarjetaUtilitiesSUC",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Helpers/TarjetaUtilitiesSUC",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;min-h-[200px] w-full flex flex-col gap-4 p-4 bg-slate-50 rounded shadow-md&quot;&gt;
        &lt;!-- T&iacute;tulo Informaci&oacute;n --&gt;
        &lt;div class=&quot;w-full text-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;Utilities SUC&lt;/span&gt;
            &lt;Checkbox Message=&quot;Aplica&quot; Checked=EditObra.DataUtilitiess[0].AplicaSUC ChangeCheck=&quot;()=&gt; {EditObra.DataUtilitiess[0].AplicaSUC = !EditObra.DataUtilitiess[0].AplicaSUC; InvokeAsync(StateHasChanged);}&quot;&gt;

            &lt;/Checkbox&gt;
        &lt;/div&gt;
        &lt;div class=&quot;w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4&quot;&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de solicitud&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataUtilitiess[SelectedVersion].FechaSolicitudSUC&quot; /&gt;

            &lt;/div&gt;
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de plan&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataUtilitiess[SelectedVersion].FechaPlanSUC&quot; /&gt;

            &lt;/div&gt;
    
            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Fecha de aprobaci&oacute;n&lt;/span&gt;

                &lt;input type=&quot;date&quot; class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind-value=&quot;EditObra.DataUtilitiess[SelectedVersion].FechaAprobacionSUC&quot; /&gt;

            &lt;/div&gt;

            &lt;div class=&quot;flex flex-col gap-2&quot;&gt;
                &lt;span class=&quot;w-full text-blue-400&quot;&gt;Comentario&lt;/span&gt;

                &lt;textarea class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind=&quot;EditObra.DataUtilitiess[SelectedVersion].ComentarioSUC&quot; /&gt;

            &lt;/div&gt;
            &lt;!-- Bot&oacute;n Guardar --&gt;
            &lt;div class=&quot;flex items-center justify-center col-span-full&quot;&gt;
                &lt;button class=&quot;rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SaveAsync())&quot;&gt;Guardar&lt;/button&gt;
            &lt;/div&gt;

        &lt;/div&gt;

    &lt;/div&gt;



    @code {
        [Parameter] public E_SeguimientoE2E EditObra { get; set; }
        int SelectedVersion = 0;
        public string ColorEstado(string estado) =&gt; estado switch
        {
            &quot;Sin iniciar&quot; =&gt; &quot;bg-slate-600&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-400&quot;,
            &quot;En curso&quot; =&gt; &quot;bg-blue-400&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-black&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-teal-400&quot;,
            _ =&gt; &quot;bg-blue-400&quot;
        };

        public async Task SaveAsync()
        {
            _main.IsLoading = true;

            await _mongoContext.EditSeguimientoFibra(EditObra);

            _main.IsLoading = false;

            //_nav.NavigateTo(&quot;/seguimientofibra&quot;);
        }
    }
    `
  },
    {
    "ID": 42,
    "ServicesName": "AddSeguimientoE2EModal",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Modals/AddSeguimientoE2EModal",
    "ServicesDescription": "",
    "Code": `
    &lt;form class=&quot;w-full grid grid-cols-12 h-fit p-2 gap-3&quot; @onsubmit=&quot;SaveAsync&quot;&gt;
        &lt;div class=&quot;col-span-12 text-blue-400 font-bold p-2&quot;&gt;
            @(IsEdit ? $&quot;&quot; : &quot;A&ntilde;adir seguimiento para el proyecto E2E&quot;)
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;C&oacute;digo GSER&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot; @bind-value=&quot;AddEditSeg.CodigoGSER&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Titulo&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot; @bind-value=&quot;AddEditSeg.Titulo&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;PgM LN&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot; @bind-value=&quot;AddEditSeg.PgMLN&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;PM LPS&lt;/span&gt;
            &lt;Autocomplete T=&quot;E_User&quot;
            Database=&quot;@DatabaseIdentifiers.Main&quot;
            FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
            SelectOne=&quot;(e)=&gt; AddEditSeg.PMLPS = e&quot;
            ToString=&quot;@(e =&gt; $&quot;{e.Name} {e.LastName}&quot;)&quot;&gt;
            &lt;/Autocomplete&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Tipo de proyecto PgM&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot; @bind-value=&quot;AddEditSeg.TipoProyectoPGM&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Subproyecto&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot; @bind-value=&quot;AddEditSeg.Subproyecto&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Tipo de proyecto SLA&lt;/span&gt;
            &lt;select class=&quot;w-full rounded border boder-slate-300/50 p-2&quot; @bind=&quot;AddEditSeg.TipoProyectoSLA&quot; required&gt;
                &lt;option value=&quot;&quot;&gt;---&lt;/option&gt;
                &lt;option value=&quot;On15&quot;&gt;On15&lt;/option&gt;
                &lt;option value=&quot;ON30&quot;&gt;ON30&lt;/option&gt;
                &lt;option value=&quot;ON145&quot;&gt;ON145&lt;/option&gt;
                &lt;option value=&quot;ON245&quot;&gt;ON245&lt;/option&gt;
                &lt;option value=&quot;OF90&quot;&gt;OF90&lt;/option&gt;
                &lt;option value=&quot;OF120&quot;&gt;OF120&lt;/option&gt;
                &lt;option value=&quot;N45&quot;&gt;N45&lt;/option&gt;
                &lt;option value=&quot;N70&quot;&gt;N70&lt;/option&gt;
                &lt;option value=&quot;N80&quot;&gt;N80&lt;/option&gt;
                &lt;option value=&quot;N110&quot;&gt;N110&lt;/option&gt;
                &lt;option value=&quot;N185&quot;&gt;N185&lt;/option&gt;
                &lt;option value=&quot;N220&quot;&gt;N220&lt;/option&gt;
                &lt;option value=&quot;NI110&quot;&gt;NI110&lt;/option&gt;
                &lt;option value=&quot;NE110&quot;&gt;NE110&lt;/option&gt;
                &lt;option value=&quot;NI130&quot;&gt;NI130&lt;/option&gt;
                &lt;option value=&quot;NE150&quot;&gt;NE150&lt;/option&gt;
                &lt;option value=&quot;NI270&quot;&gt;NI270&lt;/option&gt;
                &lt;option value=&quot;NE270&quot;&gt;NE270&lt;/option&gt;
                &lt;option value=&quot;NU110&quot;&gt;NU110&lt;/option&gt;
                &lt;option value=&quot;NU220&quot;&gt;NU220&lt;/option&gt;
            &lt;/select&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;MPLS/DWDM&lt;/span&gt;
            &lt;input type=&quot;text&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot; @bind-value=&quot;AddEditSeg.MPLSDWDM&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Fecha de asignaci&oacute;n&lt;/span&gt;
            &lt;input type=&quot;date&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot; @bind-value=&quot;AddEditSeg.FechaAsignacion&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Localidad&lt;/span&gt;

            &lt;Autocomplete T=&quot;RedFija.Logic.E_Localidades&quot; SelectOne=&quot;(e)=&gt; AddEditSeg.Localidad = e&quot; ToString=&quot;(e)=&gt; e.Localidad&quot;
            Database=&quot;@DatabaseIdentifiers.Movil&quot;
            FilterMongo=&quot;@((s)=&gt; Builders&lt;RedFija.Logic.E_Localidades&gt;.Filter.Regex(x=&gt; x.Localidad, new BsonRegularExpression(s, &quot;i&quot;)))&quot;&gt;
            &lt;/Autocomplete&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Fecha de objetivo SLA&lt;/span&gt;
            &lt;input type=&quot;date&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot; @bind-value=&quot;FechaSLA&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Fecha de objetivo de Lyntia&lt;/span&gt;
            &lt;input type=&quot;date&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot; @bind-value=&quot;AddEditSeg.FechaObjetivoLyntia&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;span class=&quot;text-blue-400 w-full&quot;&gt;Fecha estimada de entrega de LPS&lt;/span&gt;
            &lt;input type=&quot;date&quot; class=&quot;w-full p-2 rounded border border-slate-300/50 shadow-md&quot; @bind-value=&quot;AddEditSeg.FechaEstimadaEntregaLPS&quot; required /&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 flex flex-wrap justify-end items-end p-2 gap-3&quot;&gt;
            &lt;button type=&quot;button&quot; class=&quot;col-span-1 w-fit h-fit p-2 bg-red-600 text-white rounded flex flex-wrap gap-3&quot;
            @onclick=&quot;@(()=&gt; Close(false))&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                    cancel
                &lt;/span&gt;
                Cancelar
            &lt;/button&gt;
            &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsSeguimientoE2E.EditSeguimientoE2E)&quot;&gt;
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
        [Parameter] public bool IsOpen { get; set; } = false;
        [Parameter] public bool IsEdit { get; set; } = false;
        [Parameter] public bool IsAdd { get; set; } = false;
        [Parameter] public string IdProyecto { get; set; }

        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }

        [Parameter] public E_SeguimientoE2E AddEditSeg { get; set; } = new();

        // bool IsEdit =&gt; !string.IsNullOrEmpty(AddEditSeg.Id);

        protected override async Task OnInitializedAsync()
        {


            if (IsEdit)
            {
            
            }

            if (IsAdd)
            {
                AddEditSeg = new E_SeguimientoE2E()
                    {
                        FechaAsignacion = DateTime.Now,
                        FechaObjetivoLyntia = DateTime.Now,
                        IdProyecto = this.IdProyecto
                    };
                
            }


                
            
            await InvokeAsync(StateHasChanged);
        }


        //protected override async Task OnParametersSetAsync()
        //{
        //    if (IsOpen)
        //    {
        //        if (IsEdit)
        //        {
        //            AddEditSeg = new E_SeguimientoE2E()
        //                {
        //                    FechaAsignacion = DateTime.Now,
        //                    FechaObjetivoLyntia = DateTime.Now,
        //                    IdProyecto = this.IdProyecto
        //                };
        //        }
        //    }
        //    else
        //    {
        //    }
        //
        //   await InvokeAsync(StateHasChanged);
        //}

        async Task SaveAsync()
        {
            _main.IsLoading = true;

            AddEditSeg.FechaObjetivoSLA = SumDays(AddEditSeg.TipoProyectoSLA);

            await _mongoContext.AddSeguimientoFibra(AddEditSeg);

            _main.IsLoading = false;

            Close(true);
        }
        public DateTime FechaSLA
        {
            get
            {
                return AddEditSeg.FechaObjetivoSLA;
            }
            set
            {
                if (string.IsNullOrEmpty(AddEditSeg.TipoProyectoSLA)) { _snackbar.InsertSnackbar(new(&quot;Selecciona el tipo de SLA&quot;, &quot;cancel&quot;, 5000, &quot;bg-red-600&quot;, &quot;text-white&quot;)); return; }
                else
                {
                    AddEditSeg.FechaObjetivoSLA = value;

                    AddEditSeg.FechaObjetivoSLA = SumDays(AddEditSeg.TipoProyectoSLA);
                    _snackbar.InsertSnackbar(new(&quot;Fecha reajustada en base al tipo de SLA&quot;, &quot;check&quot;, 5000, &quot;bg-teal-400&quot;, &quot;text-white&quot;));
                    InvokeAsync(StateHasChanged);
                }
            }
        }

        public DateTime SumDays(string type) =&gt; type switch
        {
            &quot;On15&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(7),
            &quot;ON30&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(27),
            &quot;ON145&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(40),
            &quot;ON245&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(40),
            &quot;OF90&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(81),
            &quot;OF120&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(108),
            &quot;N45&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(40),
            &quot;N70&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(63),
            &quot;N80&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(72),
            &quot;N110&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(103),
            &quot;N185&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(176),
            &quot;N220&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(209),
            &quot;NI110&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(105),
            &quot;NE110&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(105),
            &quot;NI130&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(124),
            &quot;NE150&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(143),
            &quot;NI270&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(257),
            &quot;NE270&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(257),
            &quot;NU110&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(105),
            &quot;NU220&quot; =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(209),
            _ =&gt; AddEditSeg.FechaObjetivoSLA.AddDays(7),
        };
    }
    `
  },
    {
    "ID": 43,
    "ServicesName": "GraficosModal",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Modals/GraficosModal",
    "ServicesDescription": "",
    "Code": `
    @using System.Web;
    &lt;div class=&quot;fixed top-0 left-0 flex justify-center items-center bg-slate-300/80 @(IsOpen ? &quot;ShowModal&quot; : &quot;opacity-0 pointer-events-none&quot;)&quot;
    style=&quot;z-index: @(ZIndex); width: 100%; height: 100%;&quot;&gt;
        &lt;div class=&quot;absolute w-full h-full bg-transparent top-0 left-0&quot; style=&quot;z-index: @(ZIndex+1)&quot;&gt;
        &lt;/div&gt;

        &lt;div class=&quot;relative w-[80%] max-w-[1200px] rounded bg-white shadow-md border border-slate-300/50 overflow-auto&quot;
        style=&quot;z-index: @(ZIndex+2); max-height: 90vh; min-height: 500px;&quot;&gt;
            @if (CanClose)
            {
                &lt;div class=&quot;absolute top-[15px] right-[15px] p-2 flex flex-wrap items-center justify-center text-blue-400 cursor-pointer&quot;
                style=&quot;z-index: @(ZIndex+3)&quot; @onclick=&quot;()=&gt;{if(CanClose) {Close(false);}}&quot;&gt;
                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                        close_fullscreen
                    &lt;/span&gt;
                &lt;/div&gt;
            }

            &lt;div class=&quot;flex w-full justify-between gap-3 p-6&quot;&gt;
                &lt;div class=&quot;w-1/2&quot;&gt;
                    @if (!string.IsNullOrEmpty(DistribucionContent.ToString()))
                    {
                        &lt;div class=&quot;grafico-content&quot; style=&quot;border: 1px solid red; overflow-y: auto; max-height: 500px;&quot;&gt;
                            @((MarkupString)DistribucionContent)
                        &lt;/div&gt;
                    }
                &lt;/div&gt;
                &lt;div class=&quot;w-1/2&quot;&gt;
                    @if (!string.IsNullOrEmpty(AumentoContent.ToString()))
                    {
                        &lt;div class=&quot;grafico-content&quot; style=&quot;border: 1px solid blue; overflow-y: auto; max-height: 500px;&quot;&gt;
                            @((MarkupString)AumentoContent)
                        &lt;/div&gt;
                    }
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;style&gt;
        .grafico-content {
        max-height: 80vh;
        overflow: auto;
        border: 1px solid #ccc;
        }
    &lt;/style&gt;


    @code {
        [Parameter] public bool IsOpen { get; set; }
        [Parameter] public bool CanClose { get; set; }
        [Parameter] public RenderFragment ChildContent { get; set; }
        [Parameter] public int Width { get; set; }
        [Parameter] public int FixedWidth { get; set; } = -100;
        [Parameter] public int MaxHeight { get; set; }
        [Parameter] public long ZIndex { get; set; } = 10;
        [Parameter] public Action&lt;bool&gt; Close { get; set; }

        // Par&aacute;metros para los contenidos HTML de los gr&aacute;ficos
        [Parameter] public MarkupString DistribucionContent { get; set; }
        [Parameter] public MarkupString AumentoContent { get; set; }




        // protected override async Task OnInitializedAsync()
        // {
        // 	if (!string.IsNullOrEmpty(DistribucionContent))
        // 	{
        // 		DistribucionContent = DistribucionContent;
        // 	}

        // 	if (!string.IsNullOrEmpty(AumentoContent))
        // 	{
        // 		AumentoContent = AumentoContent;
        // 	}
        // }
    }
    `
  },
    {
    "ID": 44,
    "ServicesName": "M_AddDelProducStockObra",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Modals/M_AddDelProducStockObra",
    "ServicesDescription": "",
    "Code": `
    @using LogisticaData.Entities
    @using SeguimientoFibraLogic.Extra.DataSeguimiento.DataStockSubProyecto
    &lt;!-- Modal de confirmaci&oacute;n --&gt;
    @if (Motivo == &quot;Devol&quot; || Motivo == &quot;Consumir&quot;)
    {

        &lt;div class=&quot;bg-white p-6   w-100&quot;&gt;
            &lt;h3 class=&quot;text-xl font-semibold&quot;&gt;Confirmar acci&oacute;n&lt;/h3&gt;
            &lt;hr /&gt;
            @if (ListadoResultados.Any())
            {
                &lt;div&gt;
                    &lt;h3&gt;Lista de Resultados&lt;/h3&gt;
                    &lt;ul&gt;
                        @foreach (var item in ListadoResultados)
                        {
                            &lt;li class=&quot;@(item.StartsWith(&quot;1&quot;) ? &quot;text-red-500&quot; : &quot;text-black&quot;) w-h&quot;&gt;@item.Split(&quot;_&quot;)[1]&lt;/li&gt;
                        }
                    &lt;/ul&gt;
                &lt;/div&gt;
            }
            @if (SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto.Any())
            {

                &lt;table class=&quot;w-full table-auto rounded border border-gray-300 overflow-hidden&quot;&gt;
                    &lt;thead class=&quot;bg-gray-800 text-white&quot;&gt;
                        &lt;tr&gt;
                            @*&lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Imagen Producto&lt;/th&gt;*@
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Nombre producto&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;C&oacute;digo producto&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Precio&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Almacen&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Cantidad Disponible&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Cantidad A Devolver&lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;                

                        @foreach (var v in SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto)
                        {


                            &lt;tr&gt;
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;@v.NombreProducto&lt;/td&gt;
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;@v.CodigoProducto&lt;/td&gt;
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;@v.PrecioUnitario&lt;/td&gt;
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;@v.NombreAlmacen&lt;/td&gt;
                                @if (v.CheckSeriable)
                                {
                                    &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@v.ListaNumSerie.Count&lt;/td&gt;

                                }
                                else
                                {
                                    &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@v.CantidadEnSubproyecto&lt;/td&gt;
                                }
                                &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;
                                    &lt;InputNumber tep=&quot;1&quot; class=&quot;w-full p-2 rounded border border-gray-300&quot;
                                    @bind-Value=&quot;@v.CantidadDevolver&quot;&gt;
                                    &lt;/InputNumber&gt;
                                &lt;/td&gt;
                                @if (v.CheckSeriable)
                                {
                                    &lt;td class=&quot;p-2 border border-slate-300/50 text-center&quot;&gt;
                                        &lt;button class=&quot;bg-slate-300 text-white px-3 py-1 rounded transition duration-200  hover:bg-transparent&quot;
                                        @onclick=&quot;() =&gt; ToggleSerie(v.IdProducto + v.IdAlmacen + v.IdProyecto)&quot;&gt;
                                            📦
                                        &lt;/button&gt;
                                    &lt;/td&gt;
                                }
                            &lt;/tr&gt;

                            @if (MostrarSeries.Any() &amp;&amp; v.CheckSeriable &amp;&amp; MostrarSeries[v.IdProducto + v.IdAlmacen + v.IdProyecto])
                            {
                                &lt;tr class=&quot;bg-gray-100&quot;&gt;
                                    &lt;td colspan=&quot;5&quot; class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                        &lt;b&gt;@v.NombreProducto&lt;/b&gt; - N&uacute;meros de Serie:
                                        &lt;ul class=&quot;list-disc pl-5 text-sm&quot;&gt;
                                            @foreach (var serie in v.ListaNumSerie)
                                            {
                                                var key = v.IdProducto + v.IdAlmacen + v.IdProyecto + v.PrecioUnitario;
                                                var cantidadSeleccionada2 = SeriesSeleccionadas.TryGetValue(key, out var lista2) ? lista2.Count : 0;

                                                // Validamos si la serie est&aacute; seleccionada y si la clave est&aacute; en MostrarSeries con valor true.
                                                &lt;li class=&quot;flex justify-between items-center transition duration-200 hover:bg-blue-300&quot;&gt;
                                                    &lt;span&gt;@serie&lt;/span&gt;
                                                    &lt;!-- Parte derecha (Input y Checkbox) --&gt;
                                                    &lt;div class=&quot;flex items-center space-x-2&quot;&gt;
                                                        @if (v.EsBobina)
                                                        {
                                                            var medida = v.ListaMedidas.FirstOrDefault(x =&gt; x.NumSerie == serie);
                                                            if (medida != null)
                                                            {
                                                                &lt;div class=&quot;flex items-center space-x-1&quot;&gt;
                                                                    &lt;input type=&quot;number&quot; step=&quot;0.01&quot; class=&quot;border p-1 w-24&quot;
                                                                    @bind-value=&quot;medida.ValorMedida&quot;
                                                                    placeholder=&quot;Valor&quot;
                                                                    disabled=&quot;@(!(SeriesSeleccionadas.ContainsKey(key) &amp;&amp; SeriesSeleccionadas[key].Contains(serie)))&quot; /&gt;
                                                                    &lt;span&gt;@medida.TipoUnidad&lt;/span&gt;
                                                                &lt;/div&gt;

                                                            }

                                                        }

                                                        &lt;input type=&quot;checkbox&quot; value=&quot;@serie&quot; class=&quot;ml-2 w-4 h-4 accent-blue-500&quot;
                                                        @onchange=&quot;@((e) =&gt; ActualizarSeleccionSerie(key, serie, (bool)e.Value))&quot;
                                                        disabled=&quot;@(cantidadSeleccionada2 &gt;= v.CantidadDevolver &amp;&amp; !(SeriesSeleccionadas.ContainsKey(key) &amp;&amp; SeriesSeleccionadas[key].Contains(serie)))&quot;&gt;
                                                    &lt;/div&gt;
                                                &lt;/li&gt;

                                                &lt;hr /&gt;
                                            }
                                        &lt;/ul&gt;
                                    &lt;/td&gt;
                                &lt;/tr&gt;

                                &lt;tr class=&quot;bg-gray-100&quot;&gt;
                                    &lt;td colspan=&quot;5&quot; class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                        &lt;span&gt;Se requiere seleccionar &lt;b&gt;@v.CantidadDevolver&lt;/b&gt; N&uacute;meros de Serie&lt;/span&gt;
                                        &lt;br /&gt;

                                        @{
                                            var key2 = v.IdProducto + v.IdAlmacen + v.IdProyecto + v.PrecioUnitario;
                                            var cantidadSeleccionada = SeriesSeleccionadas.TryGetValue(key2, out var lista) ? lista.Count : 0;
                                        }

                                        &lt;span&gt;Numeros de serie seleccionados &lt;b&gt;@cantidadSeleccionada&lt;/b&gt; / &lt;b&gt;@v.CantidadDevolver&lt;/b&gt; Cantidad Solicitada&lt;/span&gt;

                                    &lt;/td&gt;
                                &lt;/tr&gt;



                            }
                        }



                    &lt;/tbody&gt;
                &lt;/table&gt;
            }
            else
            {
                &lt;span&gt;Sin stock&lt;/span&gt;
            }

            @if (Motivo == &quot;Consumir&quot;)
            {
                &lt;div class=&quot;mt-6 flex justify-center&quot;&gt;
                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;ConsumirProductos&quot;&gt;
                        Consumir Producto   
                    &lt;/button&gt;

                &lt;/div&gt;
            }
            else
            {
                &lt;div class=&quot;mt-6 flex justify-center&quot;&gt;
                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;DevolverPedido&quot;&gt;
                        Devolver a stock general
                    &lt;/button&gt;

                &lt;/div&gt;    
            }

        &lt;/div&gt;



    }

    @if (Motivo == &quot;Entrada&quot;)
    {
        &lt;div class=&quot;bg-white p-6   w-100&quot;&gt;
            &lt;h3 class=&quot;text-xl font-semibold&quot;&gt;Confirmar acci&oacute;n&lt;/h3&gt;
            &lt;hr /&gt;
            @if (ListadoResultados.Any())
            {
                &lt;div&gt;
                    &lt;h3&gt;Lista de Resultados&lt;/h3&gt;
                    &lt;ul&gt;
                        @foreach (var item in ListadoResultados)
                        {
                            &lt;li class=&quot;@(item.StartsWith(&quot;1&quot;) ? &quot;text-red-500&quot; : &quot;text-black&quot;) w-h&quot;&gt;@item.Split(&quot;_&quot;)[1]&lt;/li&gt;
                        }


                    &lt;/ul&gt;
                &lt;/div&gt;
            }


            &lt;!-- Tabla --&gt;
            @if (Productos == null)
            {
                &lt;p class=&quot;text-center p-4&quot;&gt;Cargando productos...&lt;/p&gt;
            }
            else if (Productos.Documents == null || !Productos.Documents.Any())
            {
                &lt;p class=&quot;text-center p-4&quot;&gt;No hay productos disponibles.&lt;/p&gt;
            }
            else
            {
                &lt;table class=&quot;w-full table-auto rounded border border-gray-300 overflow-hidden&quot;&gt;
                    &lt;thead class=&quot;bg-gray-800 text-white&quot;&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Nombre producto&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;C&oacute;digo producto&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Precio&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Almacen&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Cantidad Disponible&lt;/th&gt;
                            &lt;th class=&quot;p-4 border border-gray-300 &quot;&gt;Cantidad Solicitada&lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var v in Productos.Documents)
                        {
                            @foreach (var stock in v.ProductosStock)
                            {
                                @if (v.ProductosStock.Any())
                                {
                                    &lt;tr&gt;
                                        &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;@v.NombreProducto&lt;/td&gt;
                                        &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;@v.CodigoProducto&lt;/td&gt;
                                        &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;@stock.PrecioFinal&lt;/td&gt;
                                        &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;@v.NombreAlmacen&lt;/td&gt;
                                        @if (v.CheckSeriable)
                                        {
                                            &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@stock.ProductoEnStock.ListaNumSeries.Count&lt;/td&gt;

                                        }
                                        else
                                        {
                                            &lt;td class=&quot;border border-gray-300 px-4 py-2&quot;&gt;@v.TotalCantidad&lt;/td&gt;
                                        }
                                        &lt;td class=&quot;p-4 border border-gray-300&quot;&gt;
                                            &lt;InputNumber step=&quot;1&quot; class=&quot;w-full p-2 rounded border border-gray-300&quot; @bind-Value=&quot;@stock.TotalPedido&quot;&gt;
                                            &lt;/InputNumber&gt;
                                        &lt;/td&gt;
                                        @if (v.CheckSeriable)
                                        {
                                            &lt;td class=&quot;p-2 border border-slate-300/50 text-center&quot;&gt;
                                                &lt;button class=&quot;bg-slate-300 text-white px-3 py-1 rounded transition duration-200 hover:bg-transparent&quot; @onclick=&quot;() =&gt; ToggleSerie(v.IdProducto + v.IdAlmacen + v.IdProyecto)&quot;&gt;
                                                    📦
                                                &lt;/button&gt;
                                            &lt;/td&gt;
                                        }
                                    &lt;/tr&gt;
                                }
                                else
                                {
                                    &lt;span&gt;Sin stock&lt;/span&gt;
                                }
                            }

                            @if (MostrarSeries.Any() &amp;&amp; v.CheckSeriable &amp;&amp; MostrarSeries[v.IdProducto + v.IdAlmacen + v.IdProyecto])
                            {
                                @foreach (var producto in v.ProductosStock)
                                {
                                    &lt;tr class=&quot;bg-gray-100&quot;&gt;
                                        &lt;td colspan=&quot;5&quot; class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                            &lt;b&gt;@producto.ProductoEnStock.Nombre&lt;/b&gt; - N&uacute;meros de Serie:
                                            &lt;ul class=&quot;list-disc pl-5 text-sm&quot;&gt;
                                                @foreach (var serie in producto.ProductoEnStock.ListaNumSeries)
                                                {
                                                    var key = producto.ProductoEnStock.Id + v.IdAlmacen + v.IdProyecto + producto.PrecioFinal;
                                                    var cantidadSeleccionada2 = SeriesSeleccionadas.TryGetValue(key, out var lista2) ? lista2.Count : 0;

                                                    // Validamos si la serie est&aacute; seleccionada y si la clave est&aacute; en MostrarSeries con valor true.                                      
                                                    &lt;li class=&quot;flex justify-between items-center transition duration-200 hover:bg-blue-300&quot;&gt;
                                                        &lt;span&gt;@serie&lt;/span&gt;
                                                        &lt;!-- Parte derecha (Input y Checkbox) --&gt;
                                                        &lt;div class=&quot;flex items-center space-x-2&quot;&gt;
                                                            @if (producto.ProductoEnStock.EsBobina)
                                                            {
                                                                var medida = producto.ProductoEnStock.ListaMedidas.FirstOrDefault(x =&gt; x.NumSerie == serie);
                                                                if (medida != null)
                                                                {
                                                                    &lt;div class=&quot;flex items-center space-x-1&quot;&gt;
                                                                        &lt;input type=&quot;number&quot; step=&quot;0.01&quot; class=&quot;border p-1 w-24&quot;
                                                                        @bind-value=&quot;medida.ValorMedida&quot;
                                                                        placeholder=&quot;Valor&quot;
                                                                        disabled=&quot;@(!(SeriesSeleccionadas.ContainsKey(key) &amp;&amp; SeriesSeleccionadas[key].Contains(serie)))&quot; /&gt;
                                                                        &lt;span&gt;@medida.TipoUnidad&lt;/span&gt;
                                                                    &lt;/div&gt;

                                                                }

                                                            }

                                                            &lt;input type=&quot;checkbox&quot; value=&quot;@serie&quot; class=&quot;ml-2 w-4 h-4 accent-blue-500&quot;
                                                            @onchange=&quot;@((e) =&gt; ActualizarSeleccionSerie(key, serie, (bool)e.Value))&quot;
                                                            disabled=&quot;@(cantidadSeleccionada2 &gt;= producto.TotalPedido &amp;&amp; !(SeriesSeleccionadas.ContainsKey(key) &amp;&amp; SeriesSeleccionadas[key].Contains(serie)))&quot;&gt;
                                                        &lt;/div&gt;
                                                    &lt;/li&gt;

                                                    &lt;hr /&gt;
                                                }
                                            &lt;/ul&gt;
                                        &lt;/td&gt;
                                    &lt;/tr&gt;

                                    &lt;tr class=&quot;bg-gray-100&quot;&gt;
                                        &lt;td colspan=&quot;5&quot; class=&quot;p-2 border border-slate-300/50&quot;&gt;
                                            &lt;span&gt;Se requiere seleccionar &lt;b&gt;@producto.TotalPedido&lt;/b&gt; N&uacute;meros de Serie&lt;/span&gt;
                                            &lt;br /&gt;
                                            @{
                                                var key2 = producto.ProductoEnStock.Id + v.IdAlmacen + v.IdProyecto + producto.PrecioFinal;
                                                var cantidadSeleccionada = SeriesSeleccionadas.TryGetValue(key2, out var lista) ? lista.Count : 0;
                                            }
                                            &lt;span&gt;Numeros de serie seleccionados &lt;b&gt;@cantidadSeleccionada&lt;/b&gt; / &lt;b&gt;@producto.TotalPedido&lt;/b&gt; Cantidad Solicitada&lt;/span&gt;


                                        &lt;/td&gt;
                                    &lt;/tr&gt;
                                }
                            }
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;

            }

            &lt;div class=&quot;mt-6 flex justify-center&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit rounded p-2 bg-blue-400 text-white&quot; @onclick=&quot;FinalizarPedido&quot;&gt;
                    Transferir a este subproyecto
                &lt;/button&gt;

            &lt;/div&gt;



        &lt;/div&gt;




    }





    @code {

        [Parameter] 
        public EventCallback&lt;bool&gt; OnConfirm { get; set; }

        [CascadingParameter] 
        private Action&lt;bool&gt; Close { get; set; }

        [Parameter]
        public E_SeguimientoE2E SeguimientoSubproyecto { get; set; } 

        [Parameter]
        public string Motivo { get; set; }

        private E_Proveedor Proveedor { get; set; }
        public DataStockSubproyecto DatosStock { get; set; }
        private PaginatedResult&lt;E_ProductoAlmacenGrouped&gt; Productos { get; set; }
        // private List&lt;E_ProductoAlmacenGrouped&gt; ListadoProductos { get; set; } = new();
        private List&lt;E_ProductoAlbaranStockObra&gt; ListadoAlbaranStockObra { get; set; } = new();
        private List&lt;string&gt; ListadoResultados { get; set; } = new();
        private List&lt;E_ProductoStockObra&gt; ListadoStockObra { get; set; } = new();
        private Dictionary&lt;string, bool&gt; MostrarSeries = new();
        private Dictionary&lt;string, List&lt;string&gt;&gt; SeriesSeleccionadas = new();
        private FiltersBase filters = new()
        {
            PageNumber = 1,
            PageSize = 1000, 
            Search = &quot;&quot;

        };


        protected override async Task OnInitializedAsync()
        {

            await LoadApi();
            if (Motivo == &quot;Devol&quot; || Motivo == &quot;Consumir&quot;)
            {
                SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto.ToList().ForEach(a =&gt; a.CantidadDevolver = 0);
            }

            await InicializarMostrarSeries();

        }



        #region --Secci&oacute;n Consumir--


        public async Task&lt;bool&gt; ValidarProductos( )
        {


            if (SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto.All(a =&gt; a.CantidadDevolver == 0))
            {
                ListadoResultados.Add(&quot;1_No hay cantidades seleccionadas para devolver&quot;);
                return false;

            }

            var listaComparandoNumSeries = SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto.Where(x =&gt; x.CheckSeriable &amp;&amp; x.CantidadDevolver &gt; 0).ToList();

            if (listaComparandoNumSeries.Count &gt; 0)
            {
                foreach (var item in listaComparandoNumSeries)
                {
                    var key = item.IdProducto + item.IdAlmacen + item.IdProyecto + item.PrecioUnitario;


                    if (!SeriesSeleccionadas.ContainsKey(key) || SeriesSeleccionadas[key].Count != item.CantidadDevolver)
                    {
                        ListadoResultados.Add($&quot;1_Faltan por seleccionar Num series para | {item.NombreProducto} |&quot;);
                        return false;
                    }


                }

            }


            ListadoResultados.Add(&quot;0_ControlOk&quot;);
            return true;

        }

        public async Task&lt;bool&gt; AgregarProductoConsumido(E_SeguimientoE2E seguimientoOriginal)
        {

            var listaComparandoNumSeries = SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto.Where(x =&gt;  x.CantidadDevolver &gt; 0).ToList();


            foreach (var item in listaComparandoNumSeries)
            {

                // Crear una copia del objeto para evitar modificar el original
                var itemCopia = new E_ProductoStockObra
                    {
                        CheckSeriable = item.CheckSeriable,
                        EsBobina = item.EsBobina,
                        IdProductosStock = item.IdProductosStock,                  
                        IdAlmacen = item.IdAlmacen,
                        NombreAlmacen = item.NombreAlmacen,
                        IdProducto = item.IdProducto,
                        NombreProducto = item.NombreProducto,
                        IdProyecto = item.IdProyecto,
                        NombreProyecto = item.NombreProyecto,
                        CodigoProducto = item.CodigoProducto,
                        PrecioUnitario = item.PrecioUnitario,
                        CantidadConsumida = item.CantidadConsumida,
                        CantidadDevolver = item.CantidadDevolver,
                        CantidadDevuelta = item.CantidadDevuelta,
                        CantidadEnSubproyecto = item.CantidadEnSubproyecto,
                        ListaMedidas = item.ListaMedidas != null ? new List&lt;Medida&gt;(item.ListaMedidas) : null,
                        ListaNumSerie = item.ListaNumSerie != null ? new List&lt;string&gt;(item.ListaNumSerie) : null
                    // Agrega otras propiedades si es necesario
                    };

                //Codigos Error: 0 -&gt; Todo ok y en value devuelve itemADescontar, 1 -&gt; Error o no aplica devolver nada, 2 -&gt; Todo ok pero en value devuelve null
                Result &lt; E_ProductoStockObra &gt; result = await DescontarProductoInventarioObra(itemCopia, seguimientoOriginal);

                if (result.IsSuccess)
                {
                    if (result.Codigo == &quot;0&quot;)
                    {
                        if (SeguimientoSubproyecto.DatosStockProductos.ProductoObraConsumido == null)
                        {
                            SeguimientoSubproyecto.DatosStockProductos.ProductoObraConsumido = new List&lt;E_ProductoStockObra&gt;();
                        }

                        SeguimientoSubproyecto.DatosStockProductos.ProductoObraConsumido.Add(result.Value);

                    }

                    if (result.Codigo == &quot;1&quot;)
                    {
                        return false;
                    }

                }
                else
                {
                    return false;   
                }

            }
            return true;

        }

        public async Task RecalcularMedidasStockInventario(E_ProductoStockObra itemADescontar)
        {
            var medidaInventario = SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto.Where(l =&gt; l.IdProductosStock == itemADescontar.IdProductosStock).Select(h =&gt; h.ListaMedidas).FirstOrDefault();


            foreach (var item in itemADescontar.ListaMedidas)
            {


                var aux = medidaInventario.Where(j =&gt; j.NumSerie == item.NumSerie).Select(k =&gt; k.ValorMedida).FirstOrDefault();

                aux -= item.ValorMedida;


            }



        }
        private E_ProductoStockObra ClonarProducto(E_ProductoStockObra original)
        {
            return new E_ProductoStockObra
                {
                    CheckSeriable = original.CheckSeriable,
                    EsBobina = original.EsBobina,
                    IdProductosStock = original.IdProductosStock,
                    IdAlmacen = original.IdAlmacen,
                    NombreAlmacen = original.NombreAlmacen,
                    IdProducto = original.IdProducto,
                    NombreProducto = original.NombreProducto,
                    IdProyecto = original.IdProyecto,
                    NombreProyecto = original.NombreProyecto,
                    CodigoProducto = original.CodigoProducto,
                    PrecioUnitario = original.PrecioUnitario,
                    CantidadConsumida = original.CantidadConsumida,
                    CantidadDevolver = original.CantidadDevolver,
                    CantidadDevuelta = original.CantidadDevuelta,
                    CantidadEnSubproyecto = original.CantidadEnSubproyecto,

                // Clonaci&oacute;n profunda de ListaMedidas
                    ListaMedidas = original.ListaMedidas != null
                        ? original.ListaMedidas.Select(m =&gt; new Medida
                        {
                            NumSerie = m.NumSerie,
                            ValorMedida = m.ValorMedida,
                            TipoUnidad = m.TipoUnidad
                        }).ToList()
                        : new List&lt;Medida&gt;(),

                // Clonaci&oacute;n profunda de ListaNumSerie
                    ListaNumSerie = original.ListaNumSerie != null
                        ? new List&lt;string&gt;(original.ListaNumSerie)
                        : new List&lt;string&gt;()
                };
        }

        public async Task&lt;Result&lt;E_ProductoStockObra&gt;&gt; DescontarProductoInventarioObra(E_ProductoStockObra itemADescontar, E_SeguimientoE2E seguimientoOriginal)
        {
            Result&lt;E_ProductoStockObra&gt; resultado = new();

            var key = itemADescontar.IdProducto + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioUnitario;

            var auxProductoStockOriginal = seguimientoOriginal.DatosStockProductos.ProductoStockSubproyecto.Where(x =&gt; x.IdProductosStock == itemADescontar.IdProductosStock).FirstOrDefault();
            var auxProductoConsumidoStockOriginal = seguimientoOriginal.DatosStockProductos.ProductoObraConsumido.Where(x =&gt; x.IdProductosStock == itemADescontar.IdProductosStock).FirstOrDefault();
            var auxConsumidos = seguimientoOriginal.DatosStockProductos.ProductoObraConsumido.Where(y =&gt; y.IdProductosStock == itemADescontar.IdProductosStock).Select(h =&gt; h.ListaMedidas).FirstOrDefault();
            var auxSeguimientoCargadoEnVentana = SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto.Where(x =&gt; x.IdProductosStock == itemADescontar.IdProductosStock).FirstOrDefault();
            var auxProductoConsumidoCargadoEnVentana = SeguimientoSubproyecto.DatosStockProductos.ProductoObraConsumido.Where(x =&gt; x.IdProductosStock == itemADescontar.IdProductosStock).FirstOrDefault();


            //Comprobar los que NO son seriables
            if (!itemADescontar.CheckSeriable)
            {

                int auxCantidad = auxProductoStockOriginal.CantidadEnSubproyecto - itemADescontar.CantidadDevolver;
                if (auxCantidad &gt;= 0)
                {
                    if (auxProductoConsumidoCargadoEnVentana != null)
                    {

                        auxSeguimientoCargadoEnVentana.CantidadEnSubproyecto = auxCantidad;
                        auxProductoConsumidoCargadoEnVentana.CantidadConsumida += itemADescontar.CantidadDevolver;



                        // //A&ntilde;adir  registro de movimiento.
                        // SeguimientoSubproyecto.DatosStockProductos.MovimientosStockSubPoyecto.Add(new E_MovimientosProductos
                        //     {
                        //         NombreAlmacen = itemADescontar.NombreAlmacen,
                        //         NombreProducto = itemADescontar.NombreProducto,
                        //         Destino = SeguimientoSubproyecto.Subproyecto,
                        //         CodigoProducto = itemADescontar.CodigoProducto,
                        //         EsBobina = itemADescontar.EsBobina,
                        //         CheckSeriable = itemADescontar.CheckSeriable,
                        //         Tipo = &quot;Consumido&quot;,
                        //         FechaMovimiento = DateTime.UtcNow.ToString(&quot;dd-MM-yyyy | HH:mm&quot;),
                        //         CantidadTrasladada = itemADescontar.CantidadDevolver,
                        //         ListaNumSerie = SeriesSeleccionadas.ContainsKey(itemADescontar.IdProducto + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioUnitario)
                        //                         ? new List&lt;string&gt;(SeriesSeleccionadas[itemADescontar.IdProducto + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioUnitario])
                        //         : new List&lt;string&gt;(),
                        //         ListaMedidas = itemADescontar.EsBobina ? await ProcesarListaMedidasAlabaranMovimiento(itemADescontar, seguimientoOriginal) : new List&lt;Medida&gt;()
                        //     });

                        await A&ntilde;adirMovimientoProductoDeStockObra(itemADescontar, seguimientoOriginal, &quot;Consumido&quot;);

                        resultado.Value = new E_ProductoStockObra();
                        resultado.Codigo = &quot;2&quot;;
                        resultado.IsSuccess = true;
                        return resultado;

                    }
                    else
                    {
                        auxSeguimientoCargadoEnVentana.CantidadEnSubproyecto = auxCantidad;
                        itemADescontar.CantidadConsumida = itemADescontar.CantidadDevolver;


                        ////A&ntilde;adir  registro de movimiento.
                        //SeguimientoSubproyecto.DatosStockProductos.MovimientosStockSubPoyecto.Add(new E_MovimientosProductos
                        //    {
                        //        NombreAlmacen = itemADescontar.NombreAlmacen,
                        //        NombreProducto = itemADescontar.NombreProducto,
                        //        Destino = SeguimientoSubproyecto.Subproyecto,
                        //        CodigoProducto = itemADescontar.CodigoProducto,
                        //        EsBobina = itemADescontar.EsBobina,
                        //        CheckSeriable = itemADescontar.CheckSeriable,
                        //        Tipo = &quot;Consumido&quot;,
                        //        FechaMovimiento = DateTime.UtcNow.ToString(&quot;dd-MM-yyyy | HH:mm&quot;),
                        //        CantidadTrasladada = itemADescontar.CantidadDevolver,
                        //        ListaNumSerie = SeriesSeleccionadas.ContainsKey(itemADescontar.IdProducto + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioUnitario)
                        //                            ? new List&lt;string&gt;(SeriesSeleccionadas[itemADescontar.IdProducto + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioUnitario])
                        //            : new List&lt;string&gt;(),
                        //        ListaMedidas = itemADescontar.EsBobina ? await ProcesarListaMedidasAlabaranMovimiento(itemADescontar, seguimientoOriginal) : new List&lt;Medida&gt;()
                        //    });


                        await A&ntilde;adirMovimientoProductoDeStockObra(itemADescontar, seguimientoOriginal, &quot;Consumido&quot;);


                        resultado.Value = itemADescontar;
                        resultado.Codigo = &quot;0&quot;;
                        resultado.IsSuccess = true;
                        return resultado;
                    }


                }
                else
                {
                    ListadoResultados.Add($&quot;1_Estas consumiendo m&aacute;s cantidad de la disponible en {itemADescontar.NombreProducto}&quot;);
                    resultado.Value = new E_ProductoStockObra();
                    resultado.Codigo = &quot;1&quot;;
                    resultado.IsSuccess = false;
                    return resultado;
                }

            }




            //Comprobar los que SI son seriables
            if (itemADescontar.CheckSeriable)
            {
                if (itemADescontar.EsBobina)
                {


                    if (auxProductoConsumidoStockOriginal != null )
                    {
                        E_ProductoStockObra itemCopiaConsumidoStockOriginal = ClonarProducto(auxProductoConsumidoStockOriginal);
                        E_ProductoStockObra itemCopiaCargadoEnVentana = ClonarProducto(auxSeguimientoCargadoEnVentana);

                        foreach (var item in SeriesSeleccionadas[key])
                        {
                            var medidaCoincidenteProductosVentanaStock = auxSeguimientoCargadoEnVentana.ListaMedidas.Where(x =&gt; x.NumSerie == item).FirstOrDefault();

                            var medidaCoincidenteProductosConsumidosOriginal = auxProductoConsumidoCargadoEnVentana.ListaMedidas.Where(x =&gt; x.NumSerie == item).FirstOrDefault();

                            var medidaItemCopiaEnVentana = itemCopiaCargadoEnVentana.ListaMedidas.Where(x =&gt; x.NumSerie == item).FirstOrDefault();

                            // var medidaItemCopia = itemCopiaConsumidoStockOriginal.ListaMedidas.Where(x =&gt; x.NumSerie == item).FirstOrDefault();

                            var medidaCoincidenteProductosStockOriginal = auxProductoStockOriginal.ListaMedidas.Where(x =&gt; x.NumSerie == item).FirstOrDefault();


                            if (medidaCoincidenteProductosStockOriginal != null &amp;&amp; medidaCoincidenteProductosConsumidosOriginal != null)
                            {

                                //float metrosConsuOri = medidaCoincidenteProductosStockOriginal.ValorMedida;
                                // float metrosStockOri = medidaItemCopia.ValorMedida;
                                float metrosVenStockOri = medidaItemCopiaEnVentana.ValorMedida;

                                // medidaCoincidenteProductosVentanaStock.ValorMedida = 

                                medidaCoincidenteProductosConsumidosOriginal.ValorMedida += metrosVenStockOri; // se suma el valor a la medida existente del producto consumido 

                                medidaCoincidenteProductosVentanaStock.ValorMedida = medidaCoincidenteProductosStockOriginal.ValorMedida - metrosVenStockOri; // se resta el valor de la medida al producto del stock existente del inventario


                            }
                            else
                            {

                                float metrosVenStockOri = medidaItemCopiaEnVentana.ValorMedida;

                                auxProductoConsumidoCargadoEnVentana.ListaMedidas.Add(medidaItemCopiaEnVentana);
                                if (!auxProductoConsumidoCargadoEnVentana.ListaNumSerie.Contains(item))
                                {
                                    auxProductoConsumidoCargadoEnVentana.ListaNumSerie.Add(item);
                                }

                                // auxSeguimientoCargadoEnVentana.ListaMedidas.Add(medidaItemCopiaEnVentana); // se a&ntilde;ade nueva Medida a la lista de medidas existentes
                                // auxSeguimientoCargadoEnVentana.ListaNumSerie.Add(item); // se a&ntilde;ade nuevo num serie
                                medidaCoincidenteProductosVentanaStock.ValorMedida = medidaCoincidenteProductosStockOriginal.ValorMedida - metrosVenStockOri; // se resta el valor de la medida al producto del stock existente del inventario

                            }

                        }


                        // //A&ntilde;adir  registro de movimiento.
                        // SeguimientoSubproyecto.DatosStockProductos.MovimientosStockSubPoyecto.Add(new E_MovimientosProductos
                        //     {
                        //         NombreAlmacen = itemADescontar.NombreAlmacen,
                        //         NombreProducto = itemADescontar.NombreProducto,
                        //         Destino = SeguimientoSubproyecto.Subproyecto,
                        //         CodigoProducto = itemADescontar.CodigoProducto,
                        //         EsBobina = itemADescontar.EsBobina,
                        //         CheckSeriable = itemADescontar.CheckSeriable,
                        //         Tipo = &quot;Consumido&quot;,
                        //         FechaMovimiento = DateTime.UtcNow.ToString(&quot;dd-MM-yyyy | HH:mm&quot;),
                        //         CantidadTrasladada = itemADescontar.CantidadDevolver,
                        //         ListaNumSerie = SeriesSeleccionadas.ContainsKey(itemADescontar.IdProducto + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioUnitario)
                        //                                 ? new List&lt;string&gt;(SeriesSeleccionadas[itemADescontar.IdProducto + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioUnitario])
                        //                 : new List&lt;string&gt;(),
                        //         ListaMedidas = itemADescontar.EsBobina ? await ProcesarListaMedidasAlabaranMovimiento(itemADescontar, seguimientoOriginal) : new List&lt;Medida&gt;()
                        //     });


                        await A&ntilde;adirMovimientoProductoDeStockObra(itemADescontar, seguimientoOriginal, &quot;Consumido&quot;);

                        resultado.Value = new E_ProductoStockObra();
                        resultado.Codigo = &quot;2&quot;;
                        resultado.IsSuccess = true;
                        return resultado;

                    }
                    else
                    {

                        E_ProductoStockObra itemCopia = ClonarProducto(itemADescontar);

                        foreach ( var item in SeriesSeleccionadas[key])
                        {

                            var medidaCoincidenteProductosVentanaStock = auxSeguimientoCargadoEnVentana.ListaMedidas.Where(x =&gt; x.NumSerie == item).FirstOrDefault();


                            var medidaCoincidenteProductosStockOriginal = auxProductoStockOriginal.ListaMedidas.Where(x =&gt; x.NumSerie == item).FirstOrDefault();

                            var medidaIntemCopia = itemCopia.ListaMedidas.Where(x =&gt; x.NumSerie == item).FirstOrDefault();

                            float metrosStockOri =   medidaCoincidenteProductosStockOriginal.ValorMedida;

                            float metrosVenStock = medidaCoincidenteProductosVentanaStock.ValorMedida;

                            float descontado = metrosStockOri - metrosVenStock;

                            //itemADescontar.ListaMedidas.Add(medidaCoincidenteProductosVentanaStock);

                            //itemADescontar.ListaNumSerie.Add(medidaCoincidenteProductosVentanaStock.NumSerie);

                            // medidaCoincidenteProductosVentanaStock.ValorMedida = descontado;

                            medidaCoincidenteProductosVentanaStock.ValorMedida = descontado;

                            medidaIntemCopia.ValorMedida = metrosVenStock;

                        }

                        itemCopia.ListaMedidas.RemoveAll(item =&gt; !SeriesSeleccionadas[key].Contains(item.NumSerie));

                        itemCopia.ListaNumSerie.RemoveAll(m =&gt; !SeriesSeleccionadas[key].Contains(m));

                        //  await RecalcularMedidasStockInventario(itemCopia);

                        //A&ntilde;adir  registro de movimiento.
                        // SeguimientoSubproyecto.DatosStockProductos.MovimientosStockSubPoyecto.Add(new E_MovimientosProductos
                        //     {
                        //         NombreAlmacen = itemCopia.NombreAlmacen,
                        //         NombreProducto = itemCopia.NombreProducto,
                        //         Destino = SeguimientoSubproyecto.Subproyecto,
                        //         CodigoProducto = itemCopia.CodigoProducto,
                        //         EsBobina = itemCopia.EsBobina,
                        //         CheckSeriable = itemCopia.CheckSeriable,
                        //         Tipo = &quot;Consumido&quot;,
                        //         FechaMovimiento = DateTime.UtcNow.ToString(&quot;dd-MM-yyyy | HH:mm&quot;),
                        //         CantidadTrasladada = itemCopia.CantidadDevolver,
                        //         ListaNumSerie = SeriesSeleccionadas.ContainsKey(itemCopia.IdProducto + itemCopia.IdAlmacen + itemCopia.IdProyecto + itemCopia.PrecioUnitario)
                        //                                             ? new List&lt;string&gt;(SeriesSeleccionadas[itemCopia.IdProducto + itemCopia.IdAlmacen + itemCopia.IdProyecto + itemCopia.PrecioUnitario])
                        //             : new List&lt;string&gt;(),
                        //         ListaMedidas = itemADescontar.EsBobina ? await ProcesarListaMedidasAlabaranMovimiento(itemCopia, seguimientoOriginal) : new List&lt;Medida&gt;()
                        //     });

                        await A&ntilde;adirMovimientoProductoDeStockObra(itemADescontar, seguimientoOriginal, &quot;Consumido&quot;);

                        resultado.Value = itemCopia;
                        resultado.Codigo = &quot;0&quot;;
                        resultado.IsSuccess = true;
                        return resultado;

                    }

                }
                else
                {
                    // auxProductoStock.ListaNumSerie.RemoveAll(item =&gt; SeriesSeleccionadas[key].Contains(item));

                    if (auxProductoConsumidoStockOriginal != null)
                    {
                        // Si el producto ya existe en productos consumidos, agrego el num serie a su lista existente
                        foreach (var itemNumSerieCliqueada in SeriesSeleccionadas[key])
                        {

                            if (!auxProductoConsumidoStockOriginal.ListaNumSerie.Contains(itemNumSerieCliqueada))
                            {
                                auxProductoConsumidoCargadoEnVentana.ListaNumSerie.Add(itemNumSerieCliqueada);
                                auxSeguimientoCargadoEnVentana.ListaNumSerie.Remove(itemNumSerieCliqueada);
                            }
                        }

                        // //A&ntilde;adir  registro de movimiento.
                        // SeguimientoSubproyecto.DatosStockProductos.MovimientosStockSubPoyecto.Add(new E_MovimientosProductos
                        //     {
                        //         NombreAlmacen = itemADescontar.NombreAlmacen,
                        //         NombreProducto = itemADescontar.NombreProducto,
                        //         Destino = SeguimientoSubproyecto.Subproyecto,
                        //         CodigoProducto = itemADescontar.CodigoProducto,
                        //         EsBobina = itemADescontar.EsBobina,
                        //         CheckSeriable = itemADescontar.CheckSeriable,
                        //         Tipo = &quot;Consumido&quot;,
                        //         FechaMovimiento = DateTime.UtcNow.ToString(&quot;dd-MM-yyyy | HH:mm&quot;),
                        //         CantidadTrasladada = itemADescontar.CantidadDevolver,
                        //         ListaNumSerie = SeriesSeleccionadas.ContainsKey(itemADescontar.IdProducto + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioUnitario)
                        //                                 ? new List&lt;string&gt;(SeriesSeleccionadas[itemADescontar.IdProducto + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioUnitario])
                        //                 : new List&lt;string&gt;(),
                        //         ListaMedidas = itemADescontar.EsBobina ? await ProcesarListaMedidasAlabaranMovimiento(itemADescontar, seguimientoOriginal) : new List&lt;Medida&gt;()
                        //     });

                        await A&ntilde;adirMovimientoProductoDeStockObra(itemADescontar, seguimientoOriginal, &quot;Consumido&quot;);

                        resultado.Value = new E_ProductoStockObra();
                        resultado.Codigo = &quot;2&quot;;
                        resultado.IsSuccess = true;
                        return resultado;
                    }
                    else
                    {

                        // Si el producto no existe, quiere decir que itemADescontar se usar&aacute; como nuevo producto, por ende eliminar&eacute; los elementos que no coincidan con los existentes en SeriesSeleccionadas[key] para dejar solamente los chequeados
                        itemADescontar.ListaNumSerie.RemoveAll(m =&gt; !SeriesSeleccionadas[key].Contains(m));
                        foreach (var item in itemADescontar.ListaNumSerie)
                        {
                            if (auxSeguimientoCargadoEnVentana.ListaNumSerie.Contains(item))
                            {

                                auxSeguimientoCargadoEnVentana.ListaNumSerie.Remove(item);

                            }

                        }

                        // //A&ntilde;adir  registro de movimiento.
                        // SeguimientoSubproyecto.DatosStockProductos.MovimientosStockSubPoyecto.Add(new E_MovimientosProductos
                        //     {
                        //         NombreAlmacen = itemADescontar.NombreAlmacen,
                        //         NombreProducto = itemADescontar.NombreProducto,
                        //         Destino = SeguimientoSubproyecto.Subproyecto,
                        //         CodigoProducto = itemADescontar.CodigoProducto,
                        //         EsBobina = itemADescontar.EsBobina,
                        //         CheckSeriable = itemADescontar.CheckSeriable,
                        //         Tipo = &quot;Consumido&quot;,
                        //         FechaMovimiento = DateTime.UtcNow.ToString(&quot;dd-MM-yyyy | HH:mm&quot;),
                        //         CantidadTrasladada = itemADescontar.CantidadDevolver,
                        //         ListaNumSerie = SeriesSeleccionadas.ContainsKey(itemADescontar.IdProducto + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioUnitario)
                        //                                 ? new List&lt;string&gt;(SeriesSeleccionadas[itemADescontar.IdProducto + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioUnitario])
                        //                 : new List&lt;string&gt;(),
                        //         ListaMedidas = itemADescontar.EsBobina ? await ProcesarListaMedidasAlabaranMovimiento(itemADescontar, seguimientoOriginal) : new List&lt;Medida&gt;()
                        //     });
                        await A&ntilde;adirMovimientoProductoDeStockObra(itemADescontar, seguimientoOriginal, &quot;Consumido&quot;);

                        resultado.Value = itemADescontar;
                        resultado.Codigo = &quot;0&quot;;
                        resultado.IsSuccess = true;
                        return resultado;

                    }

                }

            }
            resultado.Value = new E_ProductoStockObra();
            resultado.Codigo = &quot;1&quot;;
            resultado.IsSuccess = false;
            return resultado;

        }

        public async Task ConsumirProductos()
        {
            _main.IsLoading = true;

            ListadoResultados.Clear();

            var seguimientoOriginal = await _mongoContext.GetOneSeguimientoFibra(SeguimientoSubproyecto.Id);

            bool result = await ValidarProductos();

            if (result)
            {

                bool result2 = await AgregarProductoConsumido(seguimientoOriginal.Value);

                if (result2)
                {
                    try
                    {
                        var resultSeguimiento = await _mongoContext.EditSeguimientoFibra(SeguimientoSubproyecto);
                        if (resultSeguimiento.IsSuccess)
                        {
                            // ListadoResultados.Add(&quot;0-Productos consumidos correctamente&quot;);
                            _main.IsLoading = false;
                            await Task.Delay(4000);
                            await OnConfirm.InvokeAsync(true);
                            Close(true);

                        }
                        else
                        {
                            await _mongoContext.EditSeguimientoFibra(seguimientoOriginal.Value);
                        }
                    }
                    catch (Exception e)
                    {
                        
                        await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_AddDelProducStockObra&quot;, &quot;ConsumirProductos&quot;, DateTime.UtcNow);
                        throw;
                    }
                    
                }
                else
                {
                    await InvokeAsync(StateHasChanged);
                    _main.IsLoading = false;
                    _snackbar.InsertSnackbar(new($&quot;Error al consumir, comprobar resultado en la parte superior&quot;, &quot;cancel&quot;, 6000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                    return;
                }
            }
            else
            {
                await InvokeAsync(StateHasChanged);
                _main.IsLoading = false;
                _snackbar.InsertSnackbar(new($&quot;Error al consumir, comprobar resultado en la parte superior&quot;, &quot;cancel&quot;, 6000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                return;

            }


        }



        #endregion


        #region --Secci&oacute;n Devolver--

        public void AniadirListaNumSerieDevolver(E_ProductoStockObra prod)
        {


            var key = prod.IdProducto + prod.IdAlmacen + prod.IdProyecto + prod.PrecioUnitario;


            if (SeriesSeleccionadas.ContainsKey(key))
            {
                // Obtener los elementos que est&aacute;n en SeriesSeleccionadas[key] pero no en prod.ListaNumSerie
                var elementosNuevos = SeriesSeleccionadas[key].Where(numSerie =&gt; !prod.ListaNumSerie.Contains(numSerie)).ToList();

                // A&ntilde;adir estos elementos nuevos a prod.ListaNumSerie
                prod.ListaNumSerie.AddRange(elementosNuevos);
            }
        }

        public void RemoverListaNumSerieDevolver(E_ProductoStockObra prod)
        {
            var key = prod.IdProducto + prod.IdAlmacen + prod.IdProyecto + prod.PrecioUnitario;


            foreach (var item in SeriesSeleccionadas[key])
            {
                if (prod.ListaNumSerie.Contains(item) &amp;&amp; !prod.ListaMedidas.Any(x =&gt; x.NumSerie == item))
                {
                    prod.ListaNumSerie.Remove(item);
                }

            }


        }

        public async Task LimpiarMedidasNoActualizables(E_ProductoStockObra item, List&lt;Medida&gt; listadoMedidaStockGeneralOriginal)
        {
            var key = item.IdProducto + item.IdAlmacen + item.IdProyecto + item.PrecioUnitario;
            if (item.EsBobina)
            {

                listadoMedidaStockGeneralOriginal.RemoveAll(m =&gt; !SeriesSeleccionadas[key].Contains(m.NumSerie));

            }

        }

        public async Task&lt;bool&gt; ModificarStockProductoGeneralPostDevolucion(List&lt;E_ProductoStockObra&gt; listadoStockObra, E_SeguimientoE2E seguimientoOriginal)
        {

            foreach (var item in listadoStockObra)
            {
                // Guardar el estado original antes de modificarlo
                var productoOriginal = await _mongoContext.GetOneAlmacenStock(item.IdProductosStock);

                if (item.CheckSeriable)
                {
                    AniadirListaNumSerieDevolver(item);
                    await Task.Delay(300);
                }

                if (item.EsBobina)
                {
                    await ComprobarMedidasEnStockGeneralDevolucion(item, productoOriginal.Value.ProductoEnStock.ListaMedidas, seguimientoOriginal.DatosStockProductos.ProductoStockSubproyecto.Where(jj =&gt; jj.IdProductosStock == item.IdProductosStock).FirstOrDefault());
                    await Task.Delay(300);
                }

                try
                {

                    await LimpiarMedidasNoActualizables(item,productoOriginal.Value.ProductoEnStock.ListaMedidas);
                    await Task.Delay(300);
                    var result = await _mongoContext.UppProductosStock(item.IdProductosStock, item.CantidadDevolver, item.ListaNumSerie, productoOriginal.Value.ProductoEnStock.ListaMedidas);
                    await Task.Delay(300);
                    if (result.IsSuccess)
                    {

                        ListadoResultados.Add(&quot;0_&quot; + string.Join(&quot;,&quot;, $&quot;Stock General Actualizado&quot;));

                    }
                    else
                    {
                        await RevertirCambiosStockGeneral(productoOriginal.Value);
                        ListadoResultados.Add(&quot;1_&quot; + string.Join(&quot;,&quot;, $&quot;Fallo al actualizar stock obra&quot;));

                        return false;
                    }

                }
                catch (Exception e)
                {

                    await RevertirCambiosStockGeneral(productoOriginal.Value);
                    ListadoResultados.Add(&quot;1_&quot; + string.Join(&quot;,&quot;, $&quot;Fallo al actualizar stock obra: {e.Message}&quot;));
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_AddDelProducStockObra&quot;, &quot;ModificarStockProductoGeneralPostDevolucion&quot;, DateTime.UtcNow);
                    

                    return false;
                }



            }    

            return true;


        }

        public async Task ComprobarMedidasEnStockGeneralDevolucion(E_ProductoStockObra stockObra, List&lt;Medida&gt; listadoMedidaStockGeneralOriginal, E_ProductoStockObra stockObraOriginal)
        {                                                           //Modificado                          listado del stock general                producto orginal stock obra

            var key = stockObra.IdProducto + stockObra.IdAlmacen + stockObra.IdProyecto + stockObra.PrecioUnitario;

            foreach (var medida in stockObra.ListaMedidas)
            {
                // Buscar la medida del producto modificado 
                var medidaCoincidenteProdMod = stockObra.ListaMedidas
                    .FirstOrDefault(m =&gt; m.NumSerie == medida.NumSerie &amp;&amp; SeriesSeleccionadas[key].Contains(m.NumSerie));
                // Buscar la medida coincidente en el listado original del producto en el stock General
                var medidaCoincidenteProdStockGeneral = listadoMedidaStockGeneralOriginal
                    .FirstOrDefault(m =&gt; m.NumSerie == medida.NumSerie &amp;&amp; SeriesSeleccionadas[key].Contains(m.NumSerie));
                // Buscar la medida coincidente en el listado original del seguimiento premodificaci&oacute;n
                var medidaCoincidenteStockObraOriginal = stockObraOriginal.ListaMedidas
                    .FirstOrDefault(m =&gt; m.NumSerie == medida.NumSerie &amp;&amp; SeriesSeleccionadas[key].Contains(m.NumSerie));

                // Si se encuentra y el ValorMedida es distinto, sumar el valor
                if (medidaCoincidenteProdStockGeneral != null &amp;&amp; medidaCoincidenteStockObraOriginal != null &amp;&amp; medidaCoincidenteProdMod != null)
                {

                    medidaCoincidenteProdStockGeneral.ValorMedida += (medidaCoincidenteStockObraOriginal.ValorMedida - medidaCoincidenteProdMod.ValorMedida);
                    if (!stockObra.ListaNumSerie.Contains(medida.NumSerie))
                    {
                        stockObra.ListaNumSerie.Add(medida.NumSerie);
                    }


                }
            }      
        }


        public async Task&lt;bool&gt; ComprobarMedidasEnDevolucion(E_ProductoStockObra stockObra, List&lt;E_ProductoStockObra&gt; listadoStockObraOriginal)
        {
            // Validar que las listas no sean nulas ni vac&iacute;as
            if (stockObra == null || listadoStockObraOriginal == null || !listadoStockObraOriginal.Any())
            {
                return false;
            }

            // Iterar por cada medida en el stockObra
            foreach (var medida in stockObra.ListaMedidas)
            {
                // Buscar el producto original que contenga una medida con el mismo NumSerie y distinto ValorMedida, esta parte sirve para ver que se ha modificado.
                var stockOriginal = listadoStockObraOriginal
                    .FirstOrDefault(x =&gt; x.ListaMedidas
                        .Any(m =&gt; m.NumSerie == medida.NumSerie &amp;&amp; m.ValorMedida != medida.ValorMedida));

                if (stockOriginal != null)
                {
                    // Encontrar la medida correspondiente en el producto original
                    var medidaOriginal = stockOriginal.ListaMedidas
                        .FirstOrDefault(m =&gt; m.NumSerie == medida.NumSerie);

                    if (medidaOriginal != null)
                    {
                        // Restar el valor de la medida original a la medida actual
                        medida.ValorMedida = medidaOriginal.ValorMedida - medida.ValorMedida;
                        if (!stockObra.ListaNumSerie.Contains(medida.NumSerie))
                        {
                            stockObra.ListaNumSerie.Add(medida.NumSerie);
                        }
                    }
                }
            }
            return true;

        }


        public async Task&lt;E_SeguimientoE2E&gt; ModificarSeguimientoPostDevolucion(List&lt;E_ProductoStockObra&gt; listadoStockObra, E_SeguimientoE2E seguimientoOriginal)
        {
            var albaran = new E_AlbaranStockObra
                {
                    Id = ObjectId.GenerateNewId().ToString(), // Genera un nuevo ObjectId
                    Tipo = &quot;Devoluci&oacute;n&quot;,
                    CodigoAlbaranEntregaSalida = await GenerarCodigoAlbaran(),
                    FechaAlbaranAnadido = DateTime.Now.ToString(&quot;dd-MM-yyyy HH:mm&quot;),
                    IdObraE2E = SeguimientoSubproyecto.Id,
                    ProveedorNombrecomercial = Proveedor.NombreComercial,
                    NifCif = Proveedor.NifCif,
                    Direccion = Proveedor.Direccion,
                    Provincia = Proveedor.Provincia,
                    Pais = Proveedor.Pais,
                    Telefono = Proveedor.Telefono,
                    Email = Proveedor.Email,
                    IdProyecto = SeguimientoSubproyecto.IdProyecto,
                    ListadoProductosAlbaran = new List&lt;E_ProductoAlbaranStockObra&gt;(),

                };




            foreach (var item in listadoStockObra)
            {

                if (item.EsBobina)
                {
                    bool res = await ComprobarMedidasEnDevolucion(item, seguimientoOriginal.DatosStockProductos.ProductoStockSubproyecto);
                    if (!res)
                    {
                        return new E_SeguimientoE2E();    
                    }
                }

                SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto
                .Where(x =&gt; x.IdProductosStock == item.IdProductosStock)
                .ToList() // Convierte a lista para poder modificar
                .ForEach(a =&gt;
                {
                    if (!item.EsBobina) // Solo aplicar cuando item.EsBobina sea false
                    {
                        a.CantidadEnSubproyecto -= item.CantidadDevolver;
                    }
                });

                //Modificar material en Stock
                ListadoAlbaranStockObra.Add(new E_ProductoAlbaranStockObra
                {
                    IdProducto = item.IdProducto,
                    CodigoProducto = item.CodigoProducto,
                    Descripcion = Productos.Documents
                    .Where(d =&gt; d.IdProducto == item.IdProducto)
                    .SelectMany(d =&gt; d.ProductosStock.Select(j =&gt; j.ProductoEnStock.Descripcion))
                    .FirstOrDefault(),
                    Concepto = string.Empty,
                    EsBobina = item.EsBobina,
                    CheckSeriable = item.CheckSeriable,
                    Unidades = item.CantidadDevolver, // Sumar todas las cantidades de este grupo
                    Precio =  item.PrecioUnitario, // Usar PrecioFinal como el precio de este grupo
                    ListaNumSerie = SeriesSeleccionadas.ContainsKey(item.IdProducto + item.IdAlmacen + item.IdProyecto + item.PrecioUnitario)
                    ? new List&lt;string&gt;(SeriesSeleccionadas[item.IdProducto + item.IdAlmacen + item.IdProyecto + item.PrecioUnitario])
                    : new List&lt;string&gt;(),
                        ListaMedidas = item.EsBobina ? await ProcesarListaMedidasAlabaranMovimiento(item, seguimientoOriginal) : new List&lt;Medida&gt;()



                });


                await A&ntilde;adirMovimientoProductoDeStockObra(item, seguimientoOriginal, &quot;Devoluci&oacute;n&quot;);
                // //A&ntilde;adir  registro de movimiento.
                // SeguimientoSubproyecto.DatosStockProductos.MovimientosStockSubPoyecto.Add(new E_MovimientosProductos
                // {
                //     NombreAlmacen = item.NombreAlmacen,
                //     NombreProducto = item.NombreProducto,
                //     Destino = SeguimientoSubproyecto.Subproyecto,
                //     CodigoProducto = item.CodigoProducto,
                //     EsBobina = item.EsBobina,
                //     CheckSeriable = item.CheckSeriable,
                //     Tipo = &quot;Devoluci&oacute;n&quot;,
                //     FechaMovimiento = DateTime.UtcNow.ToString(&quot;dd-MM-yyyy | HH:mm&quot;),
                //     CantidadTrasladada = item.CantidadDevolver,
                //     ListaNumSerie = SeriesSeleccionadas.ContainsKey(item.IdProducto + item.IdAlmacen + item.IdProyecto + item.PrecioUnitario)
                //     ? new List&lt;string&gt;(SeriesSeleccionadas[item.IdProducto + item.IdAlmacen + item.IdProyecto + item.PrecioUnitario])
                //     : new List&lt;string&gt;(),
                //      ListaMedidas = item.EsBobina ? await ProcesarListaMedidasAlabaranMovimiento(item, seguimientoOriginal) : new List&lt;Medida&gt;()
                // });


                if (item.CheckSeriable)
                {
                    RemoverListaNumSerieDevolver(item);
                }

                ListadoResultados.Add(&quot;0_&quot; + string.Join(&quot;,&quot;, $&quot;{item.CodigoProducto}  con precio {item.PrecioUnitario}, devuelto a Stock General&quot;));

            }

            albaran.ListadoProductosAlbaran = ListadoAlbaranStockObra;
            SeguimientoSubproyecto.DatosStockProductos.AlbaranesObra.Add(albaran);

            try
            {

                var resultSeguimiento = await _mongoContext.EditSeguimientoFibra(SeguimientoSubproyecto);

                if (resultSeguimiento.IsSuccess)
                {

                    ListadoResultados.Add(&quot;0_&quot; + string.Join(&quot;,&quot;, $&quot;Stock Obra Actualizado&quot;));

                }
                else
                {

                    ListadoResultados.Add(&quot;1_&quot; + string.Join(&quot;,&quot;, $&quot;Fallo al actualizar stock obra&quot;));

                    return new E_SeguimientoE2E();
                }
            }
            catch (Exception ex)
            {

                ListadoResultados.Add(&quot;1_Error: &quot; + ex.Message);
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, &quot;M_AddDelProducStockObra&quot;, &quot;ModificarSeguimientoPostDevolucion&quot;, DateTime.UtcNow);

                return new E_SeguimientoE2E();
            }

            return seguimientoOriginal;
        }

        private async Task&lt;List&lt;Medida&gt;&gt; ProcesarListaMedidasAlabaranMovimiento(E_ProductoStockObra item, E_SeguimientoE2E seguimientoOriginal)
        {
            // Obtener los productos del subproyecto que coinciden con el IdProductosStock
            var productosSubproyecto = seguimientoOriginal.DatosStockProductos.ProductoStockSubproyecto
                .Where(x =&gt; x.IdProductosStock == item.IdProductosStock)
                .ToList();

            // Obtener todas las medidas de los productos del subproyecto
            var todasLasMedidas = productosSubproyecto
                .SelectMany(x =&gt; x.ListaMedidas)
                .ToList();

            var key = item.IdProducto + item.IdAlmacen + item.IdProyecto + item.PrecioUnitario;

            // Procesar las medidas
            List&lt;Medida&gt; medidasActualizadas = new List&lt;Medida&gt;();

            foreach (var medida in todasLasMedidas)
            {
                // Verificar si este n&uacute;mero de serie est&aacute; en las series seleccionadas
                if (SeriesSeleccionadas[key].Contains(medida.NumSerie))
                {
                    // Encontrar la medida correspondiente en item.ListaMedidas
                    var medidaItem = item.ListaMedidas
                        .FirstOrDefault(m =&gt; m.NumSerie == medida.NumSerie);

                    if (medidaItem != null)
                    {
                        // Comparar con cada producto del subproyecto
                        foreach (var prod in productosSubproyecto)
                        {
                            var medidaEnProd = prod.ListaMedidas
                                .FirstOrDefault(m =&gt; m.NumSerie == medida.NumSerie);

                            // Si encontramos la medida y los valores no coinciden
                            if (medidaEnProd != null &amp;&amp; medidaItem.ValorMedida != medidaEnProd.ValorMedida)
                            {
                                // Agregar la medidaItem con el valor actualizado
                                medidasActualizadas.Add(new Medida
                                    {
                                        NumSerie = medidaItem.NumSerie,
                                        ValorMedida = medidaEnProd.ValorMedida - medidaItem.ValorMedida,
                                        TipoUnidad = medidaItem.TipoUnidad
                                    // Agregar otras propiedades si es necesario
                                    });

                                // No es necesario seguir buscando en m&aacute;s productos para este NumSerie
                                break;
                            }
                        }
                    }
                }
            }

            return medidasActualizadas;
        }



        public async Task DevolverPedido()
        {
            _main.IsLoading = true;

            ListadoResultados.Clear();

            ListadoAlbaranStockObra.Clear();

            ListadoStockObra = SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto.Where(h =&gt; h.CantidadDevolver &gt; 0).ToList();

            var seguimientoOriginal = await _mongoContext.GetOneSeguimientoFibra(SeguimientoSubproyecto.Id);

            try
            {
                var resultStockSeguimiento = await ModificarSeguimientoPostDevolucion(ListadoStockObra, seguimientoOriginal.Value);

                if (resultStockSeguimiento != null)
                {


                    bool resultStockGeneral = await ModificarStockProductoGeneralPostDevolucion(ListadoStockObra, resultStockSeguimiento);

                    Console.WriteLine(&quot;Proceso Devoluci&oacute;n completado&quot;);
                }
            }
            catch (Exception e)
            {
                await RevertirCambiosSeguimiento(seguimientoOriginal.Value);
                ListadoResultados.Add(&quot;1_&quot; + string.Join(&quot;,&quot;, $&quot;Fallo al generar la devoluci&oacute;n: {e.Message}\n\r Se procede a restablecer el Stock de obra original.&quot;));
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_AddDelProducStockObra&quot;, &quot;DevolverPedido&quot;, DateTime.UtcNow);

                throw;
            
            }





            await InvokeAsync(StateHasChanged);
            _main.IsLoading = false;
            // Emitir el resultado de confirmaci&oacute;n

            await Task.Delay(4000);
            await OnConfirm.InvokeAsync(true);
            Close(true);
            // await LoadApi();

        }

        private async Task RevertirCambiosStockGeneral(E_ProductosStock prodOriginal)
        {

            try
            {
                await _mongoContext.EditProductoStock(prodOriginal);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_AddDelProducStockObra&quot;, &quot;RevertirCambiosStockGeneral&quot;, DateTime.UtcNow);

                throw;
            }
            

        }

        private async Task RevertirCambiosSeguimiento(E_SeguimientoE2E estadoOriginal)
        {
            try
            {
                await _mongoContext.EditSeguimientoFibra(estadoOriginal);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_AddDelProducStockObra&quot;, &quot;RevertirCambiosSeguimiento&quot;, DateTime.UtcNow);

                throw;
            }
        

        }

        #endregion

        #region --Secci&oacute;n Agregar--

        private List&lt;string&gt; ObtenerNumSeriesSinDuplicados(E_ProductosStock producto)
        {
            var key = producto.ProductoEnStock.Id + producto.IdAlmacen + producto.IdProyecto + producto.PrecioFinal;

            List&lt;string&gt; ListaAuxiliar = new List&lt;string&gt;();

            // Si existe la clave en SeriesSeleccionadas, a&ntilde;adir los que no est&eacute;n duplicados
            if (producto.ProductoEnStock.CheckSeriable &amp;&amp; SeriesSeleccionadas[key].Any())
            {
                foreach (var item in SeriesSeleccionadas[key])
                {
                    if (!ListaAuxiliar.Contains(item))
                    {
                        ListaAuxiliar.Add(item);
                    }

                }
            }

            return ListaAuxiliar;
        }

        private async Task&lt;List&lt;Medida&gt;&gt; ObtenerMedidasBobinas(E_ProductosStock producto, E_ProductosStock productoOriginal)
        {

            if (producto.ProductoEnStock.EsBobina)
            {

                foreach (var item in producto.ProductoEnStock.ListaMedidas)
                {
                    // Buscar la coincidencia en la lista original
                    var medidaOriginal = productoOriginal.ProductoEnStock.ListaMedidas
                        .FirstOrDefault(z =&gt; z.NumSerie == item.NumSerie);

                    // Si existe la coincidencia, restar los valores
                    if (medidaOriginal != null)
                    {
                        item.ValorMedida = medidaOriginal.ValorMedida -= item.ValorMedida;
                    }
                }
                var key = producto.ProductoEnStock.Id + producto.IdAlmacen + producto.IdProyecto + producto.PrecioFinal;
                foreach (var itemSerie in SeriesSeleccionadas[key])
                    producto.ProductoEnStock.ListaMedidas.RemoveAll(item =&gt; !SeriesSeleccionadas[key].Contains(item.NumSerie));

                return  producto.ProductoEnStock.ListaMedidas;

            }
            else
            {
                return new List&lt;Medida&gt;();
            }

        }

        public async Task&lt;bool&gt; RevisarMedidasProductosExistentes(E_ProductoStockObra productoStockObra, List&lt;Medida&gt; listaAuxiliar, E_ProductosStock productoOriginal)
        {
            // Validaci&oacute;n de nulos para evitar excepciones
            if (productoStockObra?.ListaMedidas == null ||
                listaAuxiliar == null ||
                productoOriginal?.ProductoEnStock?.ListaMedidas == null)
            {
                return false;
            }


            try
            {
                // Obtener las medidas que tienen un valor diferente entre listaAuxiliar y productoOriginal
                var listaFiltrada = listaAuxiliar
                    .Where(aux =&gt; productoOriginal.ProductoEnStock.ListaMedidas
                        .Any(orig =&gt; orig.NumSerie == aux.NumSerie &amp;&amp; orig.ValorMedida != aux.ValorMedida))
                    .ToList();

                // Aplicar la diferencia a productoStockObra
                foreach (var medidaFiltrada in listaFiltrada)
                {
                    // Buscar la medida correspondiente en productoOriginal
                    var medidaOriginal = productoOriginal.ProductoEnStock.ListaMedidas
                        .FirstOrDefault(orig =&gt; orig.NumSerie == medidaFiltrada.NumSerie);

                    if (medidaOriginal != null)
                    {
                        // Buscar la medida correspondiente en productoStockObra
                        var medidaEnStock = productoStockObra.ListaMedidas
                            .FirstOrDefault(stock =&gt; stock.NumSerie == medidaFiltrada.NumSerie);

                        if (medidaEnStock != null)
                        {
                            // Calcular la diferencia y aplicarla
                            var diferencia = medidaOriginal.ValorMedida - medidaFiltrada.ValorMedida;
                            medidaEnStock.ValorMedida += diferencia;
                        }
                    }
                }
            }
            catch (Exception e)
            {

                return false;
            }


            await Task.CompletedTask;
            return true; // Retorna true si todo ha ido bien
        }


        private async Task&lt;bool&gt; EditarSeguimiento(E_ProductosStock producto, List&lt;Medida&gt; listaAuxiliar, E_ProductosStock productoOriginal)
        {


            // Buscar si el producto ya existe en la lista
            var productoExistente = SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto
            .FirstOrDefault(p =&gt; p.IdProducto == producto.ProductoEnStock.Id 
                &amp;&amp; p.IdAlmacen == producto.IdAlmacen 
                &amp;&amp; p.PrecioUnitario == producto.PrecioFinal
                &amp;&amp; (!producto.ProductoEnStock.EsBobina || p.ListaMedidas.SequenceEqual(producto.ProductoEnStock.ListaMedidas)));
            var key = producto.ProductoEnStock.Id + producto.IdAlmacen + producto.IdProyecto + producto.PrecioFinal;


            if (productoExistente != null)
            {
                // Si el producto ya existe, sumamos la cantidad
                if (!productoExistente.EsBobina)
                {
                    productoExistente.CantidadEnSubproyecto += producto.TotalPedido;

                }


                if (productoExistente.CheckSeriable)
                {


                    productoExistente.ListaNumSerie.AddRange(SeriesSeleccionadas[key].Except(productoExistente.ListaNumSerie));

                    productoExistente.ListaNumSerie = productoExistente.ListaNumSerie.Distinct().ToList();
                }

                if (productoExistente.EsBobina)
                {

                    bool result = await RevisarMedidasProductosExistentes(productoExistente, listaAuxiliar, productoOriginal);
                    if (!result)
                    {

                        return false;
                    }


                }

            }
            else
            {
                if (SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto.Any(x =&gt; x.IdProductosStock == producto.Id))
                {
                    List&lt;Medida&gt; listAux = await ObtenerMedidasBobinas(producto, productoOriginal);

                    if (listAux != null &amp;&amp; listAux.Any())
                    {
                        var productoExistente2 = SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto
                            .FirstOrDefault(x =&gt; x.IdProductosStock == producto.Id);

                        if (productoExistente2 != null)                      
                        {

                            foreach (var item in listAux)
                            {

                                // Buscar la medida existente con el mismo NumSerie
                                var medidaExistente = productoExistente2.ListaMedidas
                                    .FirstOrDefault(y =&gt; y.NumSerie == item.NumSerie);
                                if (medidaExistente != null)
                                {
                                    // Sumar el ValorMedida si ya existe
                                    medidaExistente.ValorMedida += item.ValorMedida;
                                }
                                else
                                {
                                    productoExistente2.ListaNumSerie.Add(item.NumSerie);
                                    productoExistente2.ListaMedidas.Add(item);
                                }

                            }

                        }
                    }

                    else
                    {
                        return false;
                    }

                }
                else
                {

                    // Si no existe, lo a&ntilde;adimos
                    SeguimientoSubproyecto.DatosStockProductos.ProductoStockSubproyecto.Add(new E_ProductoStockObra
                        {
                            IdAlmacen = producto.IdAlmacen,
                            NombreAlmacen = Productos.Documents.Where(prop =&gt; prop.IdAlmacen == producto.IdAlmacen).Select(ll =&gt; ll.NombreAlmacen).FirstOrDefault(),
                            IdProducto = producto.ProductoEnStock.Id,
                            NombreProducto = Productos.Documents.Where(prop =&gt; prop.IdProducto == producto.ProductoEnStock.Id).Select(ll =&gt; ll.NombreProducto).FirstOrDefault(),
                            CodigoProducto = Productos.Documents.Where(prop =&gt; prop.IdProducto == producto.ProductoEnStock.Id).Select(ll =&gt; ll.CodigoProducto).FirstOrDefault(),
                            IdProyecto = producto.IdProyecto,
                            NombreProyecto = Productos.Documents.Where(prop =&gt; prop.IdProyecto == producto.IdProyecto).Select(ll =&gt; ll.NombreProyecto).FirstOrDefault(),
                            CantidadEnSubproyecto = producto.TotalPedido,
                            PrecioUnitario = producto.PrecioFinal,
                            IdProductosStock = producto.Id,
                            CheckSeriable = producto.ProductoEnStock.CheckSeriable,
                            EsBobina = producto.ProductoEnStock.EsBobina,
                            ListaNumSerie = ObtenerNumSeriesSinDuplicados(producto),
                            ListaMedidas = await ObtenerMedidasBobinas(producto, productoOriginal)

                        });


                }



            }

            //SeguimientoSubproyecto.DatosStockProductos.MovimientosStockSubPoyecto.Add(new E_MovimientosProductos
            //    {
            //        NombreAlmacen = Productos.Documents.Where(prop =&gt; prop.IdAlmacen == producto.IdAlmacen).Select(ll =&gt; ll.NombreAlmacen).FirstOrDefault(),
            //        NombreProducto = Productos.Documents.Where(prop =&gt; prop.IdProducto == producto.ProductoEnStock.Id).Select(ll =&gt; ll.NombreProducto).FirstOrDefault(),
            //        Destino = SeguimientoSubproyecto.Subproyecto,
            //        CodigoProducto = Productos.Documents.Where(prop =&gt; prop.IdProducto == producto.ProductoEnStock.Id).Select(ll =&gt; ll.CodigoProducto).FirstOrDefault(),
            //        Tipo = &quot;Entrada&quot;,
            //        FechaMovimiento = DateTime.UtcNow.ToString(&quot;dd-MM-yyyy | HH:mm&quot;),
            //        CantidadTrasladada = producto.TotalPedido,
            //        CheckSeriable = producto.ProductoEnStock.CheckSeriable,
            //        EsBobina = producto.ProductoEnStock.EsBobina,
            //        ListaMedidas = productoExistente != null &amp;&amp; producto.ProductoEnStock.EsBobina ? productoExistente.ListaMedidas : producto.ProductoEnStock.EsBobina ? producto.ProductoEnStock.ListaMedidas : new List&lt;Medida&gt;(),
            //        ListaNumSerie = SeriesSeleccionadas.ContainsKey(producto.ProductoEnStock.Id + producto.IdAlmacen + producto.IdProyecto + producto.PrecioFinal)
            //                                                                                ? new List&lt;string&gt;(SeriesSeleccionadas[producto.ProductoEnStock.Id + producto.IdAlmacen + producto.IdProyecto + producto.PrecioFinal])
            //                                                                                : new List&lt;string&gt;()
            //
            //
            //    });
            await A&ntilde;adirMovimientoProductoDeStock(productoExistente, producto, &quot;Entrada&quot;);

            return true;
        }


        private async Task&lt;bool&gt; ValidarProductosSeriables()
        {
            foreach (var item1 in Productos.Documents.Where(xx =&gt; xx.CheckSeriable &amp;&amp; xx.ProductosStock.Any(c =&gt; c.TotalPedido &gt; 0)).ToList())
            {
                foreach (var item2 in item1.ProductosStock)
                {
                    if (item2.TotalPedido &gt; 0)
                    {
                        var key = item2.ProductoEnStock.Id + item2.IdAlmacen + item2.IdProyecto + item2.PrecioFinal;

                        if (!SeriesSeleccionadas.ContainsKey(key))
                        {
                            return false;
                        }

                    }
                    else
                    {
                        return false;
                    }

                }

            }

            return true;
        }

        public void AniadirListaNumSerie(E_ProductosStock prod)
        {
            var key = prod.ProductoEnStock.Id + prod.IdAlmacen + prod.IdProyecto + prod.PrecioFinal;

            foreach (var item in SeriesSeleccionadas[key])
            {
                if (!prod.ProductoEnStock.ListaNumSeries.Contains(item))
                {
                    prod.ProductoEnStock.ListaNumSeries.Add(item);
                }
            }
        }

        public async Task RemoverListaNumSerie( E_ProductosStock prod)
        {
            var key = prod.ProductoEnStock.Id + prod.IdAlmacen + prod.IdProyecto + prod.PrecioFinal;


            foreach (var item in SeriesSeleccionadas[key])
            {
                if (prod.ProductoEnStock.ListaNumSeries.Contains(item))
                {
                    prod.ProductoEnStock.ListaNumSeries.Remove(item);
                }

            }
        }

        private async Task ComprobarDisponibilidad(List&lt;E_ProductoAlmacenGrouped&gt; item)
        {
            var albaran = new E_AlbaranStockObra
                    {
                        Id = ObjectId.GenerateNewId().ToString(), // Genera un nuevo ObjectId
                        Tipo = &quot;Entrada&quot;,
                        CodigoAlbaranEntregaSalida = await GenerarCodigoAlbaran(),
                        FechaAlbaranAnadido = DateTime.Now.ToString(&quot;dd-MM-yyyy HH:mm&quot;),
                        IdObraE2E = SeguimientoSubproyecto.Id,
                        ProveedorNombrecomercial = Proveedor.NombreComercial,
                        NifCif = Proveedor.NifCif,
                        Direccion = Proveedor.Direccion,
                        Provincia = Proveedor.Provincia,
                        Pais = Proveedor.Pais,
                        Telefono = Proveedor.Telefono,
                        Email = Proveedor.Email,
                        IdProyecto = item.Select(x =&gt; x.IdProyecto).FirstOrDefault(),
                        ListadoProductosAlbaran = new List&lt;E_ProductoAlbaranStockObra&gt;()
                    };

            // Almacena el estado original para rollback
            var estadoOriginal = new List&lt;E_ProductosStock&gt;();

            try
            {
                foreach (var prod in item)
                {
                    //await EquipararNumSeries(prod);

                    foreach (var itemProd in prod.ProductosStock)
                    {
                        // Guardar el estado original antes de modificarlo
                        var productoOriginal = await _mongoContext.GetOneAlmacenStock(itemProd.Id);
                        estadoOriginal.Add(productoOriginal.Value);

                        List&lt;Medida&gt; ListaMedidasAuxiliar = new List&lt;Medida&gt;();

                        if (itemProd.ProductoEnStock.CheckSeriable)
                        {
                            await RemoverListaNumSerie(itemProd);
                        }

                        if (itemProd.ProductoEnStock.CheckSeriable &amp;&amp; itemProd.ProductoEnStock.EsBobina)
                        {
                            ListaMedidasAuxiliar = itemProd.ProductoEnStock.ListaMedidas;
                            await RevisarMedidas(itemProd, productoOriginal.Value, &quot;-&quot;);

                        }

                        //probar si es Check Variable, a pasarle la lista de SeriesSeleccionada
                        var resultado = await _mongoContext.EditOneRetirarProductoDelStock(itemProd);

                        if (!resultado.IsSuccess)
                        {
                            ListadoResultados.Add(&quot;1_&quot; + string.Join(&quot;,&quot;, itemProd.ProductoEnStock.Nombre + &quot; &quot; + resultado.Errors));
                            await RevertirCambios(estadoOriginal);
                            return; // Detiene el proceso si hay un fallo

                        }

                        if (itemProd.ProductoEnStock.CheckSeriable)
                        {
                            AniadirListaNumSerie(itemProd);
                        }


                        bool result = await EditarSeguimiento(itemProd, ListaMedidasAuxiliar, productoOriginal.Value);

                        if (result)
                        {

                            var productosAgrupados = prod.ProductosStock
                            .Select(x =&gt; new
                            {
                                Producto = x,
                                PrecioFinal = x.PrecioFinal // Usar PrecioFinal directamente
                            })
                            .Where(x =&gt; x.PrecioFinal != null) // Filtrar productos con PrecioFinal no nulo
                            .GroupBy(x =&gt; new { x.Producto.ProductoEnStock.Id, x.PrecioFinal }) // Agrupar por IdProducto y PrecioFinal
                            .ToList();

                            foreach (var grupo in productosAgrupados)
                            {
                                // Agrupar productos con el mismo precio final en una l&iacute;nea
                                var primerProducto = grupo.First().Producto; // Tomamos el primer producto como referencia

                                // Si los productos tienen el mismo precio, los agrupamos en la misma l&iacute;nea
                                ListadoAlbaranStockObra.Add(new E_ProductoAlbaranStockObra
                                    {
                                        IdProducto = primerProducto.ProductoEnStock.Id,
                                        CodigoProducto = primerProducto.ProductoEnStock.CodigoProducto,
                                        Descripcion = primerProducto.ProductoEnStock.Descripcion,
                                        EsBobina = primerProducto.ProductoEnStock.EsBobina,
                                        CheckSeriable = primerProducto.ProductoEnStock.CheckSeriable,
                                        Concepto = string.Empty,
                                        Unidades =  grupo.Sum(p =&gt; p.Producto.TotalPedido), // Sumar todas las cantidades de este grupo
                                        Precio = grupo.Key.PrecioFinal, // Usar PrecioFinal como el precio de este grupo
                                        ListaMedidas = primerProducto.ProductoEnStock.EsBobina ? primerProducto.ProductoEnStock.ListaMedidas : new List&lt;Medida&gt;(),
                                        ListaNumSerie = SeriesSeleccionadas.ContainsKey(primerProducto.ProductoEnStock.Id + primerProducto.IdAlmacen + primerProducto.IdProyecto + primerProducto.PrecioFinal)
                                                                ? new List&lt;string&gt;(SeriesSeleccionadas[primerProducto.ProductoEnStock.Id + primerProducto.IdAlmacen + primerProducto.IdProyecto + primerProducto.PrecioFinal])
                                                            : new List&lt;string&gt;()
                                    });
                            }
                            ListadoResultados.Add(&quot;0_&quot; + string.Join(&quot;,&quot;, prod.CodigoProducto + &quot; -&gt; Producto reservado con &eacute;xito&quot;));


                        }
                        else
                        {
                            ListadoResultados.Add(&quot;1_&quot; + string.Join(&quot;,&quot;, itemProd.ProductoEnStock.Nombre + &quot;Error al equiparar medidas &quot; ));
                            return;
                        }

                    }
                    ListadoResultados.Add(&quot;0_&quot; + string.Join(&quot;,&quot;, &quot;Se a&ntilde;ade albaran de entrada a la obra&quot;));
                }
                albaran.ListadoProductosAlbaran = ListadoAlbaranStockObra;
                SeguimientoSubproyecto.DatosStockProductos.AlbaranesObra.Add(albaran); //a&ntilde;ado albaran de entrada a la obra
            }
            catch (Exception e)
            {
                await RevertirCambios(estadoOriginal);
                ListadoResultados.Add(&quot;1_Error: &quot; + e.Message);
            }
        }

        public async Task RevisarMedidas(E_ProductosStock itemProd, E_ProductosStock productoOriginal, string acto)
        {

            var key = itemProd.ProductoEnStock.Id + itemProd.IdAlmacen + itemProd.IdProyecto + itemProd.PrecioFinal;
            foreach (var itemSerie in SeriesSeleccionadas[key])
            {

                if (itemProd.ProductoEnStock.ListaMedidas.Any(x =&gt; x.NumSerie == itemSerie))
                {
                    var valorOriginal = productoOriginal.ProductoEnStock.ListaMedidas
                                .FirstOrDefault(d =&gt; d.NumSerie == itemSerie)?.ValorMedida ?? 0;

                    foreach (var itemMedida in itemProd.ProductoEnStock.ListaMedidas.Where(x =&gt; x.NumSerie == itemSerie))
                    {
                        if (acto == &quot;+&quot;)
                        {
                            itemMedida.ValorMedida = valorOriginal + itemMedida.ValorMedida;
                        }
                        if (acto == &quot;-&quot;)
                        {
                            itemMedida.ValorMedida = valorOriginal - itemMedida.ValorMedida;
                        }
                    }
                }
            }
            if (acto == &quot;+&quot;)
            {
                itemProd.ProductoEnStock.ListaMedidas.RemoveAll(item =&gt; !SeriesSeleccionadas[key].Contains(item.NumSerie));
            }
        }

        public async Task FinalizarPedido()
        {
            _main.IsLoading = true;
            ListadoResultados.Clear();
            bool comprobSeleccion = await ValidarProductosSeriables();
            if (comprobSeleccion)
            {
                try
                {
                    await ComprobarDisponibilidad(Productos.Documents.Where(p =&gt; p.ProductosStock.Any(x =&gt; x.TotalPedido &gt; 0)).ToList());
        
                    var result = await _mongoContext.EditSeguimientoFibra(SeguimientoSubproyecto);

                    if (result.IsSuccess)
                    {
                        ListadoResultados.Add(&quot;0_&quot; + string.Join(&quot;,&quot;, &quot;Productos salvados en la obra con exito&quot;));

                    }
                    else
                    {
                        ListadoResultados.Add(&quot;1_&quot; + string.Join(&quot;,&quot;, &quot;Error al salvar los datos en la obra&quot;));
                    }
                }
                catch (Exception e)
                {
                    
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_AddDelProducStockObra&quot;, &quot;FinalizarPedido&quot;, DateTime.UtcNow);

                    throw;
                }

                _main.IsLoading = false;
                // Emitir el resultado de confirmaci&oacute;n
                await Task.Delay(4000);
                await OnConfirm.InvokeAsync(true);
                Close(true);
                // await LoadApi();
            }
            else
            {
                // ListadoProductos.Clear();
                _snackbar.InsertSnackbar(new($&quot;Quedan numeros de serie por aplicar check en productos seriables solicitados&quot;, &quot;cancel&quot;, 8000, &quot;bg-orange-400&quot;, &quot;text-white&quot;));
                return;
            }


        }
        #endregion

        #region --Secci&oacute;n M&eacute;todos compartidos--
        private bool EstaHabilitado(string key, string serie)
        {
            return SeriesSeleccionadas.ContainsKey(key) &amp;&amp; SeriesSeleccionadas[key].Contains(serie);
        }

        private async Task RevertirCambios(List&lt;E_ProductosStock&gt; estadoOriginal)
        {
            foreach (var producto in estadoOriginal)
            {
                try
                {
                    await _mongoContext.EditProductoStock(producto);
                }
                catch (Exception e)
                {
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_AddDelProducStockObra&quot;, &quot;RevertirCambios&quot;, DateTime.UtcNow);
                    throw;
                }
            }
        }


        private async Task A&ntilde;adirMovimientoProductoDeStock(E_ProductoStockObra itemADescontarObra, E_ProductosStock itemADescontar,  string tipo)
        {
            //A&ntilde;adir  registro de movimiento.
            SeguimientoSubproyecto.DatosStockProductos.MovimientosStockSubPoyecto.Add(new E_MovimientosProductos
                {
                    NombreAlmacen = Productos.Documents.Where(prop =&gt; prop.IdAlmacen == itemADescontar.IdAlmacen).Select(ll =&gt; ll.NombreAlmacen).FirstOrDefault(),
                    NombreProducto = Productos.Documents.Where(prop =&gt; prop.IdProducto == itemADescontar.ProductoEnStock.Id).Select(ll =&gt; ll.NombreProducto).FirstOrDefault(),
                    Destino = SeguimientoSubproyecto.Subproyecto,
                    CodigoProducto = Productos.Documents.Where(prop =&gt; prop.IdProducto == itemADescontar.ProductoEnStock.Id).Select(ll =&gt; ll.CodigoProducto).FirstOrDefault(),
                    Tipo = &quot;Entrada&quot;,
                    FechaMovimiento = DateTime.UtcNow.ToString(&quot;dd-MM-yyyy | HH:mm&quot;),
                    CantidadTrasladada = itemADescontar.TotalPedido,
                    CheckSeriable = itemADescontar.ProductoEnStock.CheckSeriable,
                    EsBobina = itemADescontar.ProductoEnStock.EsBobina,
                    ListaMedidas = itemADescontarObra != null &amp;&amp; itemADescontar.ProductoEnStock.EsBobina ? itemADescontarObra.ListaMedidas : itemADescontar.ProductoEnStock.EsBobina ? itemADescontar.ProductoEnStock.ListaMedidas : new List&lt;Medida&gt;(),
                    ListaNumSerie = SeriesSeleccionadas.ContainsKey(itemADescontar.ProductoEnStock.Id + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioFinal)
                });
        }

        private async Task A&ntilde;adirMovimientoProductoDeStockObra(E_ProductoStockObra itemADescontar, E_SeguimientoE2E seguimientoOriginal, string tipo)
        {
            //A&ntilde;adir  registro de movimiento.
            SeguimientoSubproyecto.DatosStockProductos.MovimientosStockSubPoyecto.Add(new E_MovimientosProductos
                {
                    NombreAlmacen = itemADescontar.NombreAlmacen,
                    NombreProducto = itemADescontar.NombreProducto,
                    Destino = SeguimientoSubproyecto.Subproyecto,
                    CodigoProducto = itemADescontar.CodigoProducto,
                    EsBobina = itemADescontar.EsBobina,
                    CheckSeriable = itemADescontar.CheckSeriable,
                    Tipo = tipo,
                    FechaMovimiento = DateTime.UtcNow.ToString(&quot;dd-MM-yyyy | HH:mm&quot;),
                    CantidadTrasladada = itemADescontar.CantidadDevolver,
                    ListaNumSerie = SeriesSeleccionadas.ContainsKey(itemADescontar.IdProducto + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioUnitario)
                                                ? new List&lt;string&gt;(SeriesSeleccionadas[itemADescontar.IdProducto + itemADescontar.IdAlmacen + itemADescontar.IdProyecto + itemADescontar.PrecioUnitario])
                                : new List&lt;string&gt;(),
                    ListaMedidas = itemADescontar.EsBobina ? await ProcesarListaMedidasAlabaranMovimiento(itemADescontar, seguimientoOriginal) : new List&lt;Medida&gt;()
                });
        }


        private void ActualizarSeleccionSerie(string key, string serie, bool isChecked)
        {
            if (!SeriesSeleccionadas.ContainsKey(key))
            {
                SeriesSeleccionadas[key] = new List&lt;string&gt;(); //Contemplar la posibilidad de cambiar el manejo a HashSet&lt;string&gt;()
            }

            if (isChecked)
            {
                if (!SeriesSeleccionadas[key].Contains(serie))
                {
                    SeriesSeleccionadas[key].Add(serie);
                }
            }
            else
            {
                SeriesSeleccionadas[key].Remove(serie);
            }
        }
        
        private async Task InicializarMostrarSeries()
        {
            MostrarSeries.Clear(); // Limpia el diccionario antes de rellenarlo

            if (Productos?.Documents != null)
            {
                foreach (var producto in Productos.Documents)
                {
                    if (producto.CheckSeriable)
                    {


                        // Verificar si la clave ya existe antes de agregarla
                        if (!MostrarSeries.ContainsKey(producto.IdProducto + producto.IdAlmacen + producto.IdProyecto))
                        {
                            MostrarSeries.Add(producto.IdProducto + producto.IdAlmacen + producto.IdProyecto, false); // Inicialmente oculto
                        }
                    }
                }
            }
        }

        private void ToggleSerie(string IdProducto)
        {
            if (MostrarSeries.ContainsKey(IdProducto))
            {
                MostrarSeries[IdProducto] = !MostrarSeries[IdProducto];
            }
            else
            {
                MostrarSeries[IdProducto] = true;
            }
        }
        
        public async Task LoadApi()
        {
            try
            {
                Productos = await _mongoContext.GetPaginatedGroupedProductosAlmacen(filters, SeguimientoSubproyecto.IdProyecto, true);
                var resultPro = await _mongoContext.GetOneProveedor(Productos.Documents.Select(xx =&gt; xx.ProductosStock.Select(yy =&gt; yy.IdProveedor).FirstOrDefault()).FirstOrDefault());
                Proveedor = resultPro.Value;
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_AddDelProducStockObra&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);
                throw;
            }
            await InvokeAsync(StateHasChanged);
        }

        public async Task&lt;string&gt; GenerarCodigoAlbaran()
        {
            string nuevoCodigo = string.Empty;
            // Obtener el n&uacute;mero m&aacute;s alto encontrado en la colecci&oacute;n
            try
            {
                var resultado = await _mongoContext.GetMaxNumeroEnCodigoAlbaranObra(Motivo);

                int nuevoNumero = resultado.IsSuccess ? resultado.Value + 1 : 1; // Si no hay registros, empezamos en 1

                // Obtener el a&ntilde;o y mes actual
                string anio = DateTime.UtcNow.ToString(&quot;yy&quot;);  // A&ntilde;o en formato &quot;aa&quot;
                string mes = DateTime.UtcNow.ToString(&quot;MM&quot;);   // Mes en formato &quot;mm&quot;

                if (Motivo == &quot;Entrada&quot;)
                {
                    nuevoCodigo = $&quot;ALBAM-{anio}-{mes}-{nuevoNumero:D4}&quot;; //:D4 asegura que el n&uacute;mero siempre tenga 4 digitos
                }
                if (Motivo == &quot;Devol&quot;)
                {
                    nuevoCodigo = $&quot;ALBDV-{anio}-{mes}-{nuevoNumero:D4}&quot;; //:D4 asegura que el n&uacute;mero siempre tenga 4 digitos
                }
                // Construir el c&oacute;digo con el formato &quot;ALB-aa-mm-xxx&quot;
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_AddDelProducStockObra&quot;, &quot;GenerarCodigoAlbaran&quot;, DateTime.UtcNow);
                throw;
            }
            return nuevoCodigo;
        }

        public async Task Confirmar(bool confirmacion)
        {
            // Emitir el resultado de confirmaci&oacute;n
            await OnConfirm.InvokeAsync(confirmacion);
            Close(true);
        }

        public async Task Cancelar(bool confir)
        {
            await OnConfirm.InvokeAsync(confir);
            Close(true);
        }
        #endregion
    }
    `
  },
  {
    "ID": 45,
    "ServicesName": "M_VistaAlbaranesObra",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Modals/M_VistaAlbaranesObra",
    "ServicesDescription": "",
    "Code": `
    &lt;div class=&quot;bg-white p-4 w-full&quot;&gt;
        &lt;p&gt;Listado Albaranes Obra : &lt;b&gt;@CodigoGeser&lt;/b&gt;&lt;/p&gt;
        &lt;hr /&gt;
        &lt;br /&gt;
        @foreach (var item in ListadoAlbaranes)
        {
            &lt;div class=&quot;border border-gray-400 rounded-md shadow-custom mb-4&quot;&gt;
                &lt;div class=&quot;flex justify-center items-center bg-gray-100 hover:bg-gray-200 p-2 rounded-t-md &quot;&gt;
                    &lt;!-- T&iacute;tulo del acorde&oacute;n --&gt;
                    &lt;button class=&quot;text-left text-lg focus:outline-none w-full&quot;
                            onclick=&quot;toggleAccordion('accordion-@item.Id')&quot;&gt;
                        &lt;table class=&quot;w-full border-collapse&quot;&gt;
                            &lt;thead&gt;
                                &lt;tr class=&quot;border-b&quot;&gt;
                                    &lt;th class=&quot;text-left w-1/2 p-2&quot;&gt;Proveedor&lt;/th&gt;
                                    &lt;th class=&quot;text-left w-1/2 p-2&quot;&gt;Entrega&lt;/th&gt;
                                    &lt;th class=&quot;text-left w-1/2 p-2&quot;&gt;Movimiento&lt;/th&gt;
                                &lt;/tr&gt;
                            &lt;/thead&gt;
                            &lt;tbody&gt;
                                &lt;tr&gt;
                                    &lt;td class=&quot;text-left p-2&quot;&gt;@item.ProveedorNombrecomercial&lt;/td&gt;
                                    &lt;td class=&quot;text-left p-2&quot;&gt;@item.CodigoAlbaranEntregaSalida&lt;/td&gt;
                                    &lt;td class=&quot;text-left p-2  @(item.Tipo == &quot;Entrada&quot; ? &quot;text-green-600&quot; : &quot;text-orange-600&quot;)&quot;&gt;@item.Tipo&lt;/td&gt;
                                &lt;/tr&gt;
                            &lt;/tbody&gt;
                        &lt;/table&gt;
                    &lt;/button&gt;
                    &lt;!-- Bot&oacute;n Exportar a PDF --&gt;
                    &lt;button class=&quot;bg-blue-500 hover:bg-blue-600 text-white rounded p-2 flex items-center&quot;
                            @onclick=&quot;@(()=&gt; ExportPDF(&quot;accordion-&quot;+item.Id))&quot;&gt;
                        &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; fill=&quot;none&quot; viewBox=&quot;0 0 24 24&quot; stroke=&quot;currentColor&quot; class=&quot;w-5 h-5 mr-2&quot;&gt;
                            &lt;path stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; stroke-width=&quot;2&quot; d=&quot;M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8m-6-6l6 6m-6-6v6h6&quot;&gt;&lt;/path&gt;
                        &lt;/svg&gt;
                        Exportar PDF
                    &lt;/button&gt;
                &lt;/div&gt;

                &lt;div id=&quot;accordion-@item.Id&quot; class=&quot;hidden px-4 py-2&quot;&gt;
                    &lt;!-- Contenido del acorde&oacute;n --&gt;
                    &lt;div class=&quot;w-full h-fit flex flex-wrap items-center&quot;&gt;
                        &lt;img src=&quot;../Images/Base/logoMulticolorAjustado.png&quot; class=&quot;w-[150px] h-auto&quot; /&gt;
                    &lt;/div&gt;

                    &lt;div class=&quot;w-full h-fit mt-6 grid grid-cols-3 gap-4&quot;&gt;
                        &lt;!-- Informaci&oacute;n del proveedor --&gt;
                        &lt;div class=&quot;h-fit flex flex-col gap-2&quot;&gt;
                            &lt;div class=&quot;text-blue-400 font-bold&quot;&gt;
                                @item.ProveedorNombrecomercial                       
                            &lt;/div&gt;
                            &lt;div &gt;
                                @item.NifCif
                            &lt;/div&gt;
                            &lt;div &gt;
                                @item.Direccion
                            &lt;/div&gt;
                            &lt;div &gt;
                                @item.Provincia
                            &lt;/div&gt;
                            &lt;div &gt;
                                @item.Pais
                            &lt;/div&gt;
                            &lt;div &gt;
                                @item.Telefono
                            &lt;/div&gt;
                            &lt;div &gt;
                                @item.Email
                            &lt;/div&gt;
                        &lt;/div&gt;

                        &lt;!-- Informaci&oacute;n central (solo si item.Tipo == &quot;Compra&quot;) --&gt;
                        @if (item.Tipo == &quot;Entrada&quot;)
                        {
                            &lt;div class=&quot;h-fit flex flex-col items-center gap-2&quot;&gt;
                                &lt;div class=&quot;text-blue-400 font-bold&quot;&gt;Albar&aacute;n Entrada Material Obra&lt;/div&gt;
                                &lt;div&gt;@(item.CodigoAlbaranEntregaSalida ?? &quot;&quot;)&lt;/div&gt;
                            &lt;/div&gt;
                        }
                        else
                        {
                            &lt;!-- Entrada de material --&gt;
                            &lt;div class=&quot;h-fit flex flex-col items-center gap-2&quot;&gt;
                                &lt;div class=&quot;text-blue-400 font-bold&quot;&gt;Albar&aacute;n Salida Material Obra&lt;/div&gt;
                                &lt;div&gt;@(item.CodigoAlbaranEntregaSalida ?? &quot;&quot;)&lt;/div&gt;
                            &lt;/div&gt;
                        }

                        &lt;!-- Informaci&oacute;n de la empresa --&gt;
                        &lt;div class=&quot;h-fit flex flex-col gap-2 text-end&quot;&gt;
                            &lt;div class=&quot;text-blue-400 font-bold&quot;&gt;LPS Facilities S.L.&lt;/div&gt;
                            &lt;div &gt;B72680077&lt;/div&gt;
                            &lt;div &gt;CL del Haya 4&lt;/div&gt;
                            &lt;div &gt;3&ordm; 1&lt;/div&gt;
                            &lt;div &gt;28054 MADRID&lt;/div&gt;
                            &lt;div &gt;645400662&lt;/div&gt;
                            &lt;div &gt;juanantonio.garcia@lpsgrupo.com&lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;

                    &lt;table class=&quot;w-full h-fit mt-12 table-auto&quot;&gt;
                        &lt;thead&gt;
                            &lt;tr class=&quot;bg-purple-500 text-white&quot;&gt;
                                &lt;th class=&quot;p-2&quot;&gt;C&oacute;digo&lt;/th&gt;
                                &lt;th class=&quot;p-2&quot;&gt;Concepto&lt;/th&gt;
                                &lt;th class=&quot;p-2&quot;&gt;Precio&lt;/th&gt;
                                &lt;th class=&quot;p-2&quot;&gt;Cantidad&lt;/th&gt;
                                &lt;th class=&quot;p-2&quot;&gt;Total&lt;/th&gt;
                            &lt;/tr&gt;
                        &lt;/thead&gt;
                        &lt;tbody&gt;
                            @foreach (var v in item.ListadoProductosAlbaran)
                            {
                                if (v.Unidades &gt; 0)
                                { 
                                    
                                    @if (v.ListaNumSerie.Any())
                                    {
                                    
                                        @foreach (var item3 in v.ListaNumSerie)
                                        {
                                            &lt;tr&gt;
                                            @if (!string.IsNullOrEmpty(item3))
                                            {
                                        
                                            &lt;td class=&quot;p-2&quot;&gt;
                                            &lt;tr class=&quot;text-xs&quot;&gt;
                                                &lt;b&gt;Cod Produc:&lt;/b&gt; @v.CodigoProducto
                                            &lt;/tr&gt;
                                            &lt;tr class=&quot;text-xs&quot;&gt;
                                                &lt;b&gt;Num Serie:&lt;/b&gt; @item3
                                            &lt;/tr&gt;
                                            &lt;/td&gt;
                                            }
                                            else
                                            {
                                            &lt;td class=&quot;p-2&quot;&gt;@v.CodigoProducto&lt;/td&gt;

                                            }

                                            &lt;td class=&quot;p-2&quot;&gt;@v.Concepto&lt;/td&gt;
                                            &lt;td class=&quot;p-2&quot;&gt;@v.Precio &euro;&lt;/td&gt;
                                                @if (v.EsBobina)
                                                {

                                                &lt;td class=&quot;p-2&quot;&gt;@v.ListaMedidas.Where(x =&gt; x.NumSerie == item3).Select( a =&gt; a.ValorMedida).FirstOrDefault() Metros&lt;/td&gt;
                                            &lt;td class=&quot;p-2&quot;&gt;@v.Precio P. U. &euro;&lt;/td&gt;
                                                }
                                                else
                                                {

                                                &lt;td class=&quot;p-2&quot;&gt;1&lt;/td&gt;
                                                &lt;td class=&quot;p-2&quot;&gt;@(@v.Precio * v.Unidades) &euro;&lt;/td&gt;
                                                
                                                }
                                                
                                            
                                        
                                            &lt;/tr&gt;
                                        }


                                    }
                                    else
                                    {


                                        &lt;tr&gt;
                            
                                            &lt;td class=&quot;p-2&quot;&gt;@v.CodigoProducto&lt;/td&gt;
                                            &lt;td class=&quot;p-2&quot;&gt;@v.Concepto&lt;/td&gt;
                                            &lt;td class=&quot;p-2&quot;&gt;@v.Precio &euro;&lt;/td&gt;
                                            &lt;td class=&quot;p-2&quot;&gt;@v.Unidades&lt;/td&gt;
                                            &lt;td class=&quot;p-2&quot;&gt;@(@v.Precio * v.Unidades) &euro;&lt;/td&gt;
                                        &lt;/tr&gt;

                                    }
                                
                                }
                                                    
                            }
                        &lt;/tbody&gt;
                    &lt;/table&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        }
    &lt;/div&gt;


    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }

        [Parameter] public string CodigoGeser { get; set; }
        [Parameter] public List&lt;E_AlbaranStockObra&gt; ListadoAlbaranes { get; set; }



        [JSInvokable]
        private async Task ExportPDF(string idAcord)
        {
            await _js.InvokeVoidAsync(&quot;exportToPDF&quot;, idAcord);
        }
    }
    `
  },
  {
    "ID": 46,
    "ServicesName": "EditObraE2E",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/EditObraE2E",
    "ServicesDescription": "",
    "Code": `
    @*@page &quot;/seguimientofibra/e2e/{id}&quot;*@
    @using LPSGrupo.Components.Areas.RedFijaF.SeguimientoFibra.Helpers
    @*&lt;AuthorizePage Roles=&quot;@(new(){&quot;SeguimientoE2E.Supervisor&quot;})&quot;&gt;&lt;/AuthorizePage&gt;*@

    &lt;div class=&quot;grid grid-cols-[13%_87%] h-screen&quot;&gt;
        &lt;div class=&quot;bg-white p-6&quot;&gt;
            &lt;div class=&quot;mt-4&quot;&gt;
                &lt;div class=&quot;flex flex-col gap-3&quot;&gt;

                    @foreach (var option in MenuOptions)
                    {
                        &lt;button class=&quot;px-4 py-2 text-l font-medium text-white rounded flex items-center justify-start text-left w-full bg-blue-400&quot;
                                @onclick=&quot;@(() =&gt; LoadComponent(option.Key))&quot;&gt;
                            @option.Value
                        &lt;/button&gt;
                    }
                    &lt;/div&gt;
            &lt;/div&gt;


            &lt;!-- Columna derecha --&gt;
            &lt;div class=&quot;grid grid-rows-[15%_85%] bg-white h-screen&quot;&gt;
                &lt;!-- Fila intermedio --&gt;
                &lt;div class=&quot;p-4 bg white&quot;&gt;



                    &lt;DynamicComponent Type=&quot;ActiveComponent&quot; Parameters=&quot;ComponentParameters&quot; /&gt;

                    @* @if ( selectedComponent == &quot;ti&quot;)
                    {
                    &lt;TarjetaInformacion EditObra=&quot;@dataObra&quot; /&gt;
                    }
                    else if (selectedComponent == &quot;tin&quot;)
                    {
                    &lt;TarjetaIngenieria EditObra=&quot;@dataObra.Id&quot; /&gt;

                    }
                    else if (selectedComponent == &quot;tui&quot;)
                    {
                    &lt;TarjetaUtilitiesIberdrola EditObra=&quot;@dataObra.Id&quot; /&gt;
                    }
                    else if (selectedComponent == &quot;tue&quot;)
                    {
                    &lt;TarjetaUtilitiesEndesa EditObra=&quot;@dataObra.Id&quot; /&gt;

                    }
                    else if (selectedComponent == &quot;tus&quot;)
                    {

                    &lt;TarjetaUtilitiesSUC EditObra=&quot;@dataObra.Id&quot; /&gt;

                    }
                    else if (selectedComponent == &quot;tug&quot;)
                    {
                    &lt;TarjetaUtilitiesGNF EditObra=&quot;@dataObra.Id&quot; /&gt;

                    }
                    else if (selectedComponent == &quot;tl&quot;)
                    {
                    &lt;TarjetaLicencias EditObra=&quot;@dataObra.Id&quot; /&gt;

                    }
                    else if (selectedComponent == &quot;toc&quot;)
                    {
                    &lt;TarjetaObraCivil EditObra=&quot;@dataObra.Id&quot; /&gt;

                    }
                    else if (selectedComponent == &quot;tino&quot;)
                    {
                    &lt;TarjetaInstalacionNokia EditObra=&quot;@dataObra.Id&quot; /&gt;

                    }
                    else if (selectedComponent == &quot;tih&quot;)
                    {
                    &lt;TarjetaInstalacionHuawei EditObra=&quot;@dataObra.Id&quot; /&gt;

                    }
                    else if (selectedComponent == &quot;til&quot;)
                    {
                    &lt;TarjetaInstalacionLPS EditObra=&quot;@dataObra.Id&quot; /&gt;

                    }
                    else if (selectedComponent == &quot;tb&quot;)
                    {
                    &lt;TarjetaBloqueos EditObra=&quot;@dataObra.Id&quot; /&gt;

                    }
                    else if (selectedComponent == &quot;tbqa&quot;)
                    {
                    &lt;TarjetaBQA EditObra=&quot;@dataObra.Id&quot; /&gt;

                    }
                    else if (selectedComponent == &quot;tdoa&quot;)
                    {
                    &lt;TarjetaDOAs EditObra=&quot;@dataObra.Id&quot; /&gt;

                    }
                    else if (selectedComponent == &quot;tdoa&quot;)
                    {
                    &lt;TarjetaCertificacionLyntia EditObra=&quot;@dataObra.Id&quot; /&gt;

                    }*@

                &lt;/div&gt;
            &lt;/div&gt;
            


        &lt;/div&gt;
    &lt;/div&gt;

    @*&lt;form class=&quot;w-full h-fit overflow-x-auto ScrollbarTop&quot; @onsubmit=&quot;SaveAsync&quot;&gt;
        &lt;div class=&quot;w-fit h-fit flex flex-row p-6 gap-3 ScrollbarTop&quot;&gt;
            @if (data.Value != null)
            {
                &lt;TarjetaInformacion EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaInformacion&gt;
                &lt;TarjetaIngenieria EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaIngenieria&gt;
                &lt;TarjetaUtilitiesIberdrola EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaUtilitiesIberdrola&gt;
                &lt;TarjetaUtilitiesEndesa EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaUtilitiesEndesa&gt;
                &lt;TarjetaUtilitiesSUC EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaUtilitiesSUC&gt;
                &lt;TarjetaUtilitiesGNF EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaUtilitiesGNF&gt;
                &lt;TarjetaLicencias EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaLicencias&gt;
                &lt;TarjetaObraCivil EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaObraCivil&gt;
                &lt;TarjetaInstalacionNokia EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaInstalacionNokia&gt;
                &lt;TarjetaInstalacionHuawei EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaInstalacionHuawei&gt;
                &lt;TarjetaInstalacionLPS EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaInstalacionLPS&gt;
                &lt;TarjetaBloqueos EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaBloqueos&gt;
                &lt;TarjetaBQA EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaBQA&gt;
                &lt;TarjetaDOAs EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaDOAs&gt;
                &lt;TarjetaCertificacionLyntia EditObra=&quot;data.Value&quot;&gt;&lt;/TarjetaCertificacionLyntia&gt;
            }
        &lt;/div&gt;
    &lt;/form&gt;*@

    @code {
        [Parameter] 
        public string id { get; set; }
        private string selectedComponent = &quot;ti&quot;;
        private E_SeguimientoE2E dataObra = new();
        private Type? ActiveComponent { get; set; }
        private Dictionary&lt;string, object&gt;? ComponentParameters { get; set; }
        private Dictionary&lt;string, string&gt; MenuOptions = new()
    {
        { &quot;ti&quot;, &quot;Informaci&oacute;n&quot; },
        { &quot;tin&quot;, &quot;Ingenier&iacute;a&quot; },
        { &quot;tui&quot;, &quot;Utilities Iberdrola&quot; },
        { &quot;tue&quot;, &quot;Utilities Endesa&quot; },
        { &quot;tus&quot;, &quot;Utilities SUC&quot; },
        { &quot;tug&quot;, &quot;Utilities GNF&quot; },
        { &quot;tl&quot;, &quot;Licencias&quot; },
        { &quot;toc&quot;, &quot;Obra civil&quot; },
        { &quot;tino&quot;, &quot;Instalaci&oacute;n Nokia&quot; },
        { &quot;tih&quot;, &quot;Instalaci&oacute;n Huawei&quot; },
        { &quot;til&quot;, &quot;Instalaci&oacute;n LPS&quot; },
        { &quot;tb&quot;, &quot;Bloqueos&quot; },
        { &quot;tbqa&quot;, &quot;BQA&quot; },
        { &quot;tdoa&quot;, &quot;DOAs&quot; },
        { &quot;cl&quot;, &quot;Certificaci&oacute;n Lyntia&quot; },
        { &quot;tso&quot;, &quot;Stock Obra&quot; }
    };

        private void LoadComponent(string componentName)
        {
            (ActiveComponent, ComponentParameters) = componentName switch
            {
                &quot;ti&quot; =&gt; (typeof(TarjetaInformacion), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tin&quot; =&gt; (typeof(TarjetaIngenieria), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tui&quot; =&gt; (typeof(TarjetaUtilitiesIberdrola), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tue&quot; =&gt; (typeof(TarjetaUtilitiesEndesa), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tus&quot; =&gt; (typeof(TarjetaUtilitiesSUC), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tug&quot; =&gt; (typeof(TarjetaUtilitiesGNF), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tl&quot; =&gt; (typeof(TarjetaLicencias), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;toc&quot; =&gt; (typeof(TarjetaObraCivil), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tino&quot; =&gt; (typeof(TarjetaInstalacionNokia), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tih&quot; =&gt; (typeof(TarjetaInstalacionHuawei), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;til&quot; =&gt; (typeof(TarjetaInstalacionLPS), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tb&quot; =&gt; (typeof(TarjetaBloqueos), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tso&quot; =&gt; (typeof(TarjetaStockObra), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                _ =&gt; (null, null) // Default case if the componentName is invalid
            };
        }


    // private void ShowComponent(string componentName)
    // {
    //     selectedComponent = componentName;
    //     InvokeAsync(StateHasChanged);
    // }


        //protected override async Task OnAfterRenderAsync(bool firstRender)
        //{
        //    _disconnection.SaveStatus += (async () =&gt;
        //{
        //    try
        //    {
        //        if (data.Value != null)
        //            await _localStorage.SetItemAsync(&quot;seguimientoe2eadd&quot;, data.Value);
        //        else
        //        {
        //            await _localStorage.RemoveItemAsync(&quot;seguimientoe2eadd&quot;);
        //
        //        }
        //    }
        //    catch (Exception)
        //    { }
        //});
        //
        //    if (await _localStorage.ContainKeyAsync(&quot;seguimientoe2eadd&quot;))
        //    {
        //        data.Value = await _localStorage.GetItemAsync&lt;E_SeguimientoE2E&gt;(&quot;seguimientoe2eadd&quot;);
        //        await _localStorage.RemoveItemAsync(&quot;seguimientoe2eadd&quot;);
        //        await InvokeAsync(StateHasChanged);
        //        return;
        //    };
        //}

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;&quot;;

            await LoadApi();
        }

        async Task LoadApi()
        {
            try
            {
                _main.IsLoading = true;

                var aux = await _mongoContext.GetOneSeguimientoFibra(id);
                dataObra = aux.Value;
                await InvokeAsync(StateHasChanged);

                _main.IsLoading = false;
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;EditObraE2E&quot;, &quot;LoadApi&quot;, DateTime.UtcNow);

                throw;
            }
        
        }

        public async Task SaveAsync()
        {
            try
            {
                _main.IsLoading = true;

                await _mongoContext.EditSeguimientoFibra(dataObra);
            }
            catch (Exception e)
            {
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;M_ModifyCompra&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
                _nav.NavigateTo(&quot;/seguimientofibra&quot;);
            }
                
        }
    }
    `
  },
  {
    "ID": 47,
    "ServicesName": "Home",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/Home",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/seguimientofibra/{id}/{nm}&quot;
    @using LPSGrupo.Components.Areas.RedFijaF.SeguimientoFibra.Modals
    @using Microsoft.AspNetCore.Mvc
    @using OfficeOpenXml
    @* @using SeguimientoFibraLogic.Entities *@
    @* @using SeguimientoFibraLogic.Logic.Graficos*@


    @inject IJSRuntime js
    @* &lt;AuthorizePage Roles=&quot;@(new(){&quot;SeguimientoE2E.Supervisor&quot;})&quot;&gt;&lt;/AuthorizePage&gt; *@

    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        @if (!string.IsNullOrEmpty(nm))
        {
            &lt;h1 class=&quot; w-full text-3xl text-blue-400&quot; tabindex=&quot;none&quot;&gt;@nm&lt;/h1&gt;

        }
        &lt;h2 class=&quot;w-full text-xl text-slate-950&quot;&gt;Aqu&iacute; se pueden ver todas las obras del proyecto E2E&lt;/h2&gt;

        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaSeguimientoObraVerProyectoAddObra)&quot;&gt;
                    &lt;button type=&quot;button&quot; class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3&quot; @onclick=&quot;()=&gt; OpenModalAddEdit()&quot;&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            add
                        &lt;/span&gt;
                        Crear obra
                    &lt;/button&gt;
                &lt;/AuthorizedContent&gt;
                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaSeguimientoObraVerProyectoImportObras)&quot;&gt;
            
                    &lt;label for=&quot;import&quot; class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3 cursor-pointer&quot;&gt;
                        Importar obras
                    &lt;/label&gt; 
                    &lt;InputFile id=&quot;import&quot; hidden OnChange=&quot;ImportExcel&quot;&gt;&lt;/InputFile&gt;
                &lt;/AuthorizedContent&gt;

                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaSeguimientoObraVerProyectoExportExcel)&quot;&gt;
            
                    @* &lt;AuthorizedContent Roles=&quot;@([&quot;SeguimientoE2E.Supervisor&quot;])&quot;&gt;*@
                        &lt;button id=&quot;export&quot; class=&quot;p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;ExportExcel&quot;&gt;
                            Exportar a excel
                        &lt;/button&gt;
                &lt;/AuthorizedContent&gt;
        
                @*  &lt;button type=&quot;button&quot; class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3&quot; @onclick=&quot;()=&gt; OpenModalGraficos()&quot;&gt;
                        Gr&aacute;ficos
                    &lt;/button&gt; *@
            
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-3 text-sm rounded border border-slate-300&quot; @bind-value=&quot;searchSet&quot;&gt;&lt;/input&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;
            @if (DataSeg.Documents != null)
            {
                &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50&quot;&gt;
                    &lt;thead&gt;
                        &lt;tr&gt;
                            &lt;th colspan=&quot;14&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Informaci&oacute;n obra
                            &lt;/th&gt;
                            &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Ingenier&iacute;a
                            &lt;/th&gt;
                            &lt;th colspan=&quot;12&quot; rowspan=&quot;1&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Utilities
                            &lt;/th&gt;
                            &lt;th colspan=&quot;4&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Licencias
                            &lt;/th&gt;
                            &lt;th colspan=&quot;4&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Obra civil
                            &lt;/th&gt;
                            &lt;th colspan=&quot;11&quot; rowspan=&quot;1&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Instalaci&oacute;n
                            &lt;/th&gt;
                            &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Bloqueos
                            &lt;/th&gt;
                            &lt;th colspan=&quot;3&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                BQA
                            &lt;/th&gt;
                            &lt;th colspan=&quot;2&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                DOAs
                            &lt;/th&gt;
                            &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Certificaci&oacute;n Lyntia
                            &lt;/th&gt;
                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;th colspan=&quot;3&quot; rowspan=&quot;1&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Iberdrola
                            &lt;/th&gt;
                            &lt;th colspan=&quot;3&quot; rowspan=&quot;1&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Endesa
                            &lt;/th&gt;
                            &lt;th colspan=&quot;3&quot; rowspan=&quot;1&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                SUC
                            &lt;/th&gt;
                            &lt;th colspan=&quot;3&quot; rowspan=&quot;1&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                GNF
                            &lt;/th&gt;
                            &lt;th colspan=&quot;3&quot; rowspan=&quot;1&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Nokia
                            &lt;/th&gt;
                            &lt;th colspan=&quot;3&quot; rowspan=&quot;1&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Huawei
                            &lt;/th&gt;
                            &lt;th colspan=&quot;5&quot; rowspan=&quot;1&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                LPS
                            &lt;/th&gt;
                        &lt;/tr&gt;
                        &lt;tr&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                C&oacute;digo GSER
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[450px]&quot;&gt;
                                T&iacute;tulo
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                PgM LN
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                PM LPS
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Tipo de proyecto PgM
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Tipo de proyecto SLA
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                MPLS/DWDM
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha de asignaci&oacute;n
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Localidad
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Provincia
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Estado del proyecto
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha objetivo SLA
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha objetivo Lyntia
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha estimada de entrega LPS
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha an&aacute;lisis PM LPS
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha predise&ntilde;o
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha replanteo
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha acta replanteo
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha plan
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha entrega dise&ntilde;o
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha solicitud
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha plan
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha aprobaci&oacute;n
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha solicitud
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha plan
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha aprobaci&oacute;n
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha solicitud
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha plan
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha aprobaci&oacute;n
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha solicitud
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha plan
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha aprobaci&oacute;n
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha solicitud
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha plan
                            &lt;/th&gt;




                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                N&ordm; de requerimientos
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha aprobaci&oacute;n
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha plan
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha replanteo
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha de inicio
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha fin
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha plan equipos
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha ejecuci&oacute;n equipos
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha fin ejecuci&oacute;n equipos
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha plan equipos
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha ejecuci&oacute;n equipos
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha fin ejecuci&oacute;n equipos
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha plan
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha inicio
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha fin
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha integraci&oacute;n
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha entrega
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Tipo de bloqueo
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha bloqueo
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Acciones
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Responsable
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha plan desbloqueo
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha real desbloqueo
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha entrega doc. LPS
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha revisi&oacute;n Lyntia
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha revisi&oacute;n LPS
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha comunicaci&oacute;n
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha resoluci&oacute;n
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Imputaci&oacute;n UTPRI
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Capex objetivo
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Capex aprobado
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Capex con UTOE
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Capex con UTALB
                            &lt;/th&gt;
                            &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                Fecha certificaci&oacute;n UTALB
                            &lt;/th&gt;
                        &lt;/tr&gt;
                    &lt;/thead&gt;
                    &lt;tbody&gt;
                        @foreach (var v in DataSeg.Documents)
                        {
                            &lt;tr&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaSeguimientoObraVerProyectoVerObra)&quot;&gt;


                                
                                    &lt;a href=&quot;@($&quot;/seguimientofibra/e2e/{v.Id}&quot;)&quot;
                                        class=&quot;text-blue-600 hover:underline cursor-pointer&quot;&gt;
                                        @v.CodigoGSER
                                    &lt;/a&gt;
                                    &lt;/AuthorizedContent&gt;
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.Titulo)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @(v.PgMLN)
                                &lt;/td&gt;
                                &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.PMLPS != null)
                                    {
                                        @($&quot;{v.PMLPS.Name} {v.PMLPS.LastName}&quot;)
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;@(v.TipoProyectoPGM)&lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;@(v.TipoProyectoSLA)&lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;@(v.MPLSDWDM)&lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;@(v.FechaAsignacion.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;))&lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.Localidad != null)
                                    {
                                        @(v.Localidad.Localidad)
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.Localidad != null)
                                    {
                                        @(v.Localidad.Provincia)
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;@(v.EstadoProyecto)&lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;@(v.FechaObjetivoSLA.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;))&lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;@(v.FechaObjetivoLyntia.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;))&lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;@(v.FechaEstimadaEntregaLPS.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;))&lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataIngenierias[0].Aplica)
                                    {
                                        @(v.DataIngenierias.Last().FechaAnalisisPMLPS != null ? v.DataIngenierias.Last().FechaAnalisisPMLPS.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataIngenierias[0].Aplica)
                                    {
                                        @(v.DataIngenierias.Last().FechaPredise&ntilde;o != null ? v.DataIngenierias.Last().FechaPredise&ntilde;o.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataIngenierias[0].Aplica)
                                    {
                                        @(v.DataIngenierias.Last().FechaReplanteo != null ? v.DataIngenierias.Last().FechaReplanteo.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataIngenierias[0].Aplica)
                                    {
                                        @(v.DataIngenierias.Last().FechaActaReplanteo != null ? v.DataIngenierias.Last().FechaActaReplanteo.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataIngenierias[0].Aplica)
                                    {
                                        @(v.DataIngenierias.Last().FechaPlano != null ? v.DataIngenierias.Last().FechaPlano.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataIngenierias[0].Aplica)
                                    {
                                        @(v.DataIngenierias.Last().FechaEntregaDise&ntilde;o != null ? v.DataIngenierias.Last().FechaEntregaDise&ntilde;o.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataUtilitiess[0].AplicaIberdrola)
                                    {
                                        @(v.DataUtilitiess.Last().FechaSolicitudIberdrola != null ? v.DataUtilitiess.Last().FechaSolicitudIberdrola.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataUtilitiess[0].AplicaIberdrola)
                                    {
                                        @(v.DataUtilitiess.Last().FechaPlanIberdrola != null ? v.DataUtilitiess.Last().FechaPlanIberdrola.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataUtilitiess[0].AplicaIberdrola)
                                    {
                                        @(v.DataUtilitiess.Last().FechaAprobacionIberdrola != null ? v.DataUtilitiess.Last().FechaAprobacionIberdrola.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataUtilitiess[0].AplicaEndesa)
                                    {
                                        @(v.DataUtilitiess.Last().FechaSolicitudEndesa != null ? v.DataUtilitiess.Last().FechaSolicitudEndesa.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataUtilitiess[0].AplicaEndesa)
                                    {
                                        @(v.DataUtilitiess.Last().FechaPlanEndesa != null ? v.DataUtilitiess.Last().FechaPlanEndesa.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataUtilitiess[0].AplicaEndesa)
                                    {
                                        @(v.DataUtilitiess.Last().FechaAprobacionEndesa != null ? v.DataUtilitiess.Last().FechaAprobacionEndesa.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;

                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataUtilitiess[0].AplicaSUC)
                                    {
                                        @(v.DataUtilitiess.Last().FechaSolicitudSUC != null ? v.DataUtilitiess.Last().FechaSolicitudSUC.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataUtilitiess[0].AplicaSUC)
                                    {
                                        @(v.DataUtilitiess.Last().FechaPlanSUC != null ? v.DataUtilitiess.Last().FechaPlanSUC.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataUtilitiess[0].AplicaSUC)
                                    {
                                        @(v.DataUtilitiess.Last().FechaAprobacionSUC != null ? v.DataUtilitiess.Last().FechaAprobacionSUC.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;

                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataUtilitiess[0].AplicaGNF)
                                    {
                                        @(v.DataUtilitiess.Last().FechaSolicitudGNF != null ? v.DataUtilitiess.Last().FechaSolicitudGNF.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataUtilitiess[0].AplicaGNF)
                                    {
                                        @(v.DataUtilitiess.Last().FechaPlanGNF != null ? v.DataUtilitiess.Last().FechaPlanGNF.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataUtilitiess[0].AplicaGNF)
                                    {
                                        @(v.DataUtilitiess.Last().FechaAprobacionGNF != null ? v.DataUtilitiess.Last().FechaAprobacionGNF.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataLicenciass[0].Aplica)
                                    {
                                        @(v.DataLicenciass.Last().FechaSolicitud != null ? v.DataLicenciass.Last().FechaSolicitud.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataLicenciass[0].Aplica)
                                    {
                                        @(v.DataLicenciass.Last().FechaPlan != null ? v.DataLicenciass.Last().FechaPlan.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataLicenciass[0].Aplica)
                                    {
                                        @(v.DataLicenciass.Last().NumeroRequerimientos)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataLicenciass[0].Aplica)
                                    {
                                        @(v.DataLicenciass.Last().FechaAprobacion != null ? v.DataLicenciass.Last().FechaAprobacion.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataObraCivils[0].Aplica)
                                    {
                                        @(v.DataObraCivils.Last().FechaPlan != null ? v.DataObraCivils.Last().FechaPlan.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;

                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataObraCivils[0].Aplica)
                                    {
                                        @(v.DataObraCivils.Last().FechaReplanteo != null ? v.DataObraCivils.Last().FechaReplanteo.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;

                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataObraCivils[0].Aplica)
                                    {
                                        @(v.DataObraCivils.Last().FechaInicio != null ? v.DataObraCivils.Last().FechaInicio.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;

                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataObraCivils[0].Aplica)
                                    {
                                        @(v.DataObraCivils.Last().FechaFin != null ? v.DataObraCivils.Last().FechaFin.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataInstalacions[0].AplicaNokia)
                                    {
                                        @(v.DataInstalacions.Last().FechaPlanEquiposNokia != null ? v.DataInstalacions.Last().FechaPlanEquiposNokia.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataInstalacions[0].AplicaNokia)
                                    {
                                        @(v.DataInstalacions.Last().FechaEjecucionEquiposNokia != null ? v.DataInstalacions.Last().FechaEjecucionEquiposNokia.Value.ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataInstalacions[0].AplicaNokia)
                                    {
                                        @(v.DataInstalacions.Last().FechaFinEjecucionEquiposNokia != null ? v.DataInstalacions.Last().FechaFinEjecucionEquiposNokia.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataInstalacions[0].AplicaHuawei)
                                    {
                                        @(v.DataInstalacions.Last().FechaPlanEquiposHuawei != null ? v.DataInstalacions.Last().FechaPlanEquiposHuawei.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataInstalacions[0].AplicaHuawei)
                                    {
                                        @(v.DataInstalacions.Last().FechaEjecucionEquiposHuawei != null ? v.DataInstalacions.Last().FechaEjecucionEquiposHuawei.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataInstalacions[0].AplicaHuawei)
                                    {
                                        @(v.DataInstalacions.Last().FechaFinEjecucionEquiposHuawei != null ? v.DataInstalacions.Last().FechaFinEjecucionEquiposHuawei.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataInstalacions[0].Aplica)
                                    {
                                        @(v.DataInstalacions.Last().FechaPlan != null ? v.DataInstalacions.Last().FechaPlan.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataInstalacions[0].Aplica)
                                    {
                                        @(v.DataInstalacions.Last().FechaInicio != null ? v.DataInstalacions.Last().FechaInicio.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataInstalacions[0].Aplica)
                                    {
                                        @(v.DataInstalacions.Last().FechaFin != null ? v.DataInstalacions.Last().FechaFin.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataInstalacions[0].Aplica)
                                    {
                                        @(v.DataInstalacions.Last().FechaIntegracion != null ? v.DataInstalacions.Last().FechaIntegracion.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataInstalacions[0].Aplica)
                                    {
                                        @(v.DataInstalacions.Last().FechaEntrega != null ? v.DataInstalacions.Last().FechaEntrega.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataBloqueoss[0].Aplica)
                                    {
                                        @(v.DataBloqueoss.Last().TipoBloqueo)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataBloqueoss[0].Aplica)
                                    {
                                        @(v.DataBloqueoss.Last().FechaBloqueo != null ? v.DataBloqueoss.Last().FechaBloqueo.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataBloqueoss[0].Aplica)
                                    {
                                        @(v.DataBloqueoss.Last().Acciones)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataBloqueoss[0].Aplica)
                                    {
                                        @(v.DataBloqueoss.Last().Responsable)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataBloqueoss[0].Aplica)
                                    {
                                        @(v.DataBloqueoss.Last().FechaPlanDesbloqueo != null ? v.DataBloqueoss.Last().FechaPlanDesbloqueo.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataBloqueoss[0].Aplica)
                                    {
                                        @(v.DataBloqueoss.Last().FechaRealDesbloqueo != null ? v.DataBloqueoss.Last().FechaRealDesbloqueo.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataBQAs[0].Aplica)
                                    {
                                        @(v.DataBQAs.Last().FechaEntregaDocLPS != null ? v.DataBQAs.Last().FechaEntregaDocLPS.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataBQAs[0].Aplica)
                                    {
                                        @(v.DataBQAs.Last().FechaRevLyntia != null ? v.DataBQAs.Last().FechaRevLyntia.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataBQAs[0].Aplica)
                                    {
                                        @(v.DataBQAs.Last().FechaEntregaRevLPS != null ? v.DataBQAs.Last().FechaEntregaRevLPS.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataDOASs[0].Aplica)
                                    {
                                        @(v.DataDOASs.Last().FechaComunicacion != null ? v.DataDOASs.Last().FechaComunicacion.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataDOASs[0].Aplica)
                                    {
                                        @(v.DataDOASs.Last().FechaResolucion != null ? v.DataDOASs.Last().FechaResolucion.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataCertificacionLyntias[0].Aplica)
                                    {
                                        @(v.DataCertificacionLyntias.Last().ImputacionUTPRI)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataCertificacionLyntias[0].Aplica)
                                    {
                                        @(v.DataCertificacionLyntias.Last().CapexObjetivo)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataCertificacionLyntias[0].Aplica)
                                    {
                                        @(v.DataCertificacionLyntias.Last().CapexAprobado)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataCertificacionLyntias[0].Aplica)
                                    {
                                        @(v.DataCertificacionLyntias.Last().CapexConUTOE)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataCertificacionLyntias[0].Aplica)
                                    {
                                        @(v.DataCertificacionLyntias.Last().CapexConUTALB)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                                &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                    @if (v.DataCertificacionLyntias[0].Aplica)
                                    {
                                        @(v.DataCertificacionLyntias.Last().FechaCertificacionUTALB != null ? v.DataCertificacionLyntias.Last().FechaCertificacionUTALB.Value.ToRealLocalTime(_main.OffsetHoursTime).ToString(&quot;dd/MM/yyyy&quot;) : &quot;&quot;)
                                    }
                                    else
                                    {
                                        &lt;span class=&quot;font-bold&quot;&gt;NA&lt;/span&gt;
                                    }
                                &lt;/td&gt;
                            &lt;/tr&gt;
                        }
                    &lt;/tbody&gt;
                &lt;/table&gt;
                &lt;Paginator countAllDocuments=&quot;(int)DataSeg.CountAllDocuments&quot; countPages=&quot;DataSeg.PageCount&quot; filters=&quot;GetDataSeg&quot;
                ReloadData=&quot;()=&gt;LoadApi()&quot;&gt;

                &lt;/Paginator&gt;
            }
        &lt;/div&gt;
    &lt;/div&gt;


    @code {
        [Parameter] 
        public string id { get; set; }
        [Parameter]
        public string nm { get; set; }

        PaginatedResult&lt;E_SeguimientoE2E&gt; DataSeg { get; set; } = new();
        GetPaginatedSeguimientoE2EDTORequest GetDataSeg { get; set; } = new()
            {
                Search = &quot;&quot;,
                PageNumber = 1,
                PageSize = 10
            };

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
                return GetDataSeg.Search;
            }
            set
            {
                GetDataSeg.Search = value;

                LoadApi();
            }
        }


        async Task LoadApi()
        {
            _main.IsLoading = true;
            var pageSize = _main.QueryParameters(_nav)[&quot;pageSize&quot;];
            var pageNumber = _main.QueryParameters(_nav)[&quot;pageNumber&quot;];

            if (!string.IsNullOrEmpty(pageSize) &amp;&amp; !string.IsNullOrEmpty(pageNumber))
            {
                GetDataSeg.PageNumber = int.Parse(pageNumber);
                GetDataSeg.PageSize = int.Parse(pageSize);
                
            }
            GetDataSeg.IdProyecto = this.id;
            DataSeg = await _mongoContext.GetPaginatedSeguimientoFibra(GetDataSeg);
            await InvokeAsync(StateHasChanged);
            _main.IsLoading = false;
        }

        async Task ImportExcel(InputFileChangeEventArgs e)
        {
            try
            {
                _main.IsLoading = true;

                var ms = new MemoryStream();

                await e.File.OpenReadStream(e.File.Size).CopyToAsync(ms);

                await _mongoContext.ImportSeguimientoFibra(ms.ToArray(), this.id);

                await LoadApi();
            }
            catch (Exception ex)
            {
                
                await _mongoContext.RegistroError(ex.Message, _user.name, _user.id, &quot;Carpeta SeguimientoFibra &gt; Home&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
            }
        
        }

        async Task ExportExcel()
        {
            _nav.NavigateTo(&quot;api/SeguimientoE2E/Export?Password=LPSSeguimientoE2E2024&quot;, true, true);
        }

        // Modal AddEdit

        E_SeguimientoE2E addeditseg = new()
        {

        };

        void OpenModalAddEdit()
        {
            var modal = _modal.ShowModal(typeof(AddSeguimientoE2EModal), new Dictionary&lt;string, object&gt;
            {
                {nameof(AddSeguimientoE2EModal.IdProyecto),  this.id},
                {nameof(AddSeguimientoE2EModal.IsAdd),  true}


            }, FixedWidth: 80);
            modal.OnCloseModal += ResponseModalAddEdit;
        }

        void ResponseModalAddEdit(bool success)
        {
            if (success)
            {
                LoadApi();
            }

            addeditseg = new E_SeguimientoE2E();
        }

        //Modal gr&aacute;ficos

        // opcion pasando el html como string cambiado solo y mandarlo a traves del modal a la UI

        // E_GraficosProyectoLyntia graficos = new() { };

        // async Task OpenModalGraficos()
        // {
        //     var filePrefixes = new List&lt;string&gt; { &quot;distribucion_status_Enero_2025&quot;, &quot;aumento_diario_Enero_2025&quot; };

        //     // Obtener ambos documentos
        //     var result = await _mongoContext.GetGraficosByFileNames(filePrefixes);

        //     if (result.IsSuccess)
        //     {
        //         var graficosList = result.Value;

        //         // Separar los contenidos seg&uacute;n sus nombres de archivo
        //         string DistribucionContent = graficosList.FirstOrDefault(g =&gt; g.file_name.StartsWith(&quot;distribucion_status_Enero_2025&quot;))?.content ?? string.Empty;
        //         string AumentoContent = graficosList.FirstOrDefault(g =&gt; g.file_name.StartsWith(&quot;aumento_diario_Enero_2025&quot;))?.content ?? string.Empty;

        //         // Crear el contenido HTML en formato MarkupString para pasarlo al modal
        //         MarkupString distribucionMarkup = new MarkupString(DistribucionContent);
        //         MarkupString aumentoMarkup = new MarkupString(AumentoContent);

        //         // Crear un RenderFragment que contiene ambos contenidos HTML
        //         RenderFragment modalContent = builder =&gt;
        //         {
        //             builder.AddMarkupContent(0, DistribucionContent);
        //             builder.AddMarkupContent(1, AumentoContent);
        //         };

        //         Console.WriteLine(&quot;Aumento Content Procesado:&quot;);
        //         Console.WriteLine(AumentoContent);  // Muestra el contenido limpio

        //         // Mostrar el modal con el contenido limpio que ya viene desde el backend
        //         var modal = _modal.ShowModal(typeof(GraficosModal), new Dictionary&lt;string, object&gt;
        //     {
        //          { &quot;IsOpen&quot;, true },
        //         { &quot;CanClose&quot;, true },
        //         { &quot;ChildContent&quot;, modalContent },
        //         { &quot;DistribucionContent&quot;, distribucionMarkup },
        //         { &quot;AumentoContent&quot;, aumentoMarkup },
        //         { &quot;Width&quot;, 80 }
        //     });

        //         modal.OnCloseModal += ResponseModalGrafico;

        //         StateHasChanged();
        //     }
        // }


        // void ResponseModalGrafico(bool sucess)
        // {
        //     if (sucess)
        //     {
        //         LoadApi();
        //     }
        // }

        // // opcion mediante javacript con el localstorage

        // async Task OpenModalGraficos()
        // {
        //     var filePrefixes = new List&lt;string&gt; { &quot;distribucion_status_Enero_2025&quot;, &quot;aumento_diario_Enero_2025&quot; };

        //     // Obtener ambos documentos
        //     var result = await _mongoContext.GetGraficosByFileNames(filePrefixes);

        //     if (result.IsSuccess)
        //     {
        //         var graficosList = result.Value;

        //         // Separar los contenidos seg&uacute;n sus nombres de archivo
        //         string DistribucionContent = graficosList.FirstOrDefault(g =&gt; g.file_name.StartsWith(&quot;distribucion_status_Enero_2025&quot;))?.content ?? string.Empty;
        //         string AumentoContent = graficosList.FirstOrDefault(g =&gt; g.file_name.StartsWith(&quot;aumento_diario_Enero_2025&quot;))?.content ?? string.Empty;

        //         // Usar JSInterop para gestionar localStorage
        //         await JSRuntime.InvokeVoidAsync(&quot;checkAndPrepareGraficosLPS&quot;); // Preparar GraficosLPS
        //         await JSRuntime.InvokeVoidAsync(&quot;saveHtmlToGraficosLPS&quot;, &quot;Distribucion.html&quot;, DistribucionContent);
        //         await JSRuntime.InvokeVoidAsync(&quot;saveHtmlToGraficosLPS&quot;, &quot;Aumento.html&quot;, AumentoContent);

        //         // Recuperar los contenidos desde localStorage
        //         var distribucionHtml = await JSRuntime.InvokeAsync&lt;string&gt;(&quot;getHtmlFromGraficosLPS&quot;, &quot;Distribucion.html&quot;);
        //         var aumentoHtml = await JSRuntime.InvokeAsync&lt;string&gt;(&quot;getHtmlFromGraficosLPS&quot;, &quot;Aumento.html&quot;);

        //         // Crear el contenido HTML en formato MarkupString
        //         MarkupString distribucionMarkup = new MarkupString(distribucionHtml);
        //         MarkupString aumentoMarkup = new MarkupString(aumentoHtml);

        //         // Mostrar el modal con los contenidos desde localStorage
        //         var modal = _modal.ShowModal(typeof(GraficosModal), new Dictionary&lt;string, object&gt;
        //  {
        //      { &quot;IsOpen&quot;, true },
        //      { &quot;CanClose&quot;, true },
        //      { &quot;DistribucionContent&quot;, distribucionMarkup },
        //      { &quot;AumentoContent&quot;, aumentoMarkup },
        //      { &quot;Width&quot;, 80 }
        //  });

        //         modal.OnCloseModal += ResponseModalGrafico;

        //         StateHasChanged();
        //     }
        // }
    }
    `
  },
  {
    "ID": 48,
    "ServicesName": "NewEditObraE2E",
    "ServicesRoute": "Components/Areas/RedFijaF/SeguimientoFibra/NewEditObraE2E",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/seguimientofibra/e2e/{id}&quot;
    @using LPSGrupo.Components.Areas.RedFijaF.SeguimientoFibra.Helpers
    @*&lt;AuthorizePage Roles=&quot;@(new(){&quot;SeguimientoE2E.Supervisor&quot;})&quot;&gt;&lt;/AuthorizePage&gt;*@
    &lt;div class=&quot;grid grid-cols-[13%_87%] h-screen&quot;&gt;
        &lt;!-- Columna izquierda --&gt;
        &lt;div class=&quot;bg-white p-6&quot;&gt;

            &lt;div class=&quot;mt-4&quot;&gt;
                &lt;div class=&quot;flex flex-col gap-3 items-start&quot;&gt;
                        &lt;div&gt;
                            &lt;span&gt;@dataObra.CodigoGSER&lt;/span&gt;
                        &lt;/div&gt;
                    @foreach (var option in MenuOptions)
                    {
                        &lt;button class=&quot;w-full flex items-center gap-2 text-base text-gray-700 hover:text-blue-500 hover:bg-gray-200 active:bg-gray-300 transition-opacity duration-300 rounded-lg px-4 text-left&quot;
                                @onclick=&quot;@(() =&gt; LoadComponent(option.Key))&quot;&gt;
                            &lt;span class=&quot;text-left w-full&quot;&gt;@option.Value&lt;/span&gt;
                        &lt;/button&gt;

                    }
                &lt;/div&gt;

        

            &lt;/div&gt;
        &lt;/div&gt;
        &lt;!-- Columna derecha --&gt;
        &lt;div class=&quot;grid grid-rows-[15%_85%] bg-white h-screen&quot;&gt;
            &lt;div class=&quot;p-4 bg white&quot;&gt;
                @if (ActiveComponent != null)
                {
                    &lt;DynamicComponent Type=&quot;ActiveComponent&quot; Parameters=&quot;ComponentParameters&quot; /&gt;
                }
                else
                {
                    &lt;p class=&quot;text-gray-500&quot;&gt;Selecciona una opci&oacute;n del men&uacute; para cargar un componente.&lt;/p&gt;
                }
            &lt;/div&gt;
        &lt;/div&gt;


    &lt;/div&gt;





    @code {
        [Parameter]
        public string id { get; set; }

        [Parameter]
        public PaginatedResult&lt;E_Almacen&gt; Almacenes  { get; set; } = new ();

        private string selectedComponent = &quot;ti&quot;;
        private E_SeguimientoE2E dataObra { get; set; } = new();

        private Type? ActiveComponent { get; set; }
        private Dictionary&lt;string, object&gt;? ComponentParameters { get; set; } = new();

        private Dictionary&lt;string, string&gt; MenuOptions = new()
        {
            { &quot;tso&quot;, &quot;Stock Obra&quot; }
        // { &quot;ti&quot;, &quot;Informaci&oacute;n&quot; },
        // { &quot;tin&quot;, &quot;Ingenier&iacute;a&quot; },
        // { &quot;tui&quot;, &quot;Utilities Iberdrola&quot; },
        // { &quot;tue&quot;, &quot;Utilities Endesa&quot; },
        // { &quot;tus&quot;, &quot;Utilities SUC&quot; },
        // { &quot;tug&quot;, &quot;Utilities GNF&quot; },
        // { &quot;tl&quot;, &quot;Licencias&quot; },
        // { &quot;toc&quot;, &quot;Obra civil&quot; },
        // { &quot;tino&quot;, &quot;Instalaci&oacute;n Nokia&quot; },
        // { &quot;tih&quot;, &quot;Instalaci&oacute;n Huawei&quot; },
        // { &quot;til&quot;, &quot;Instalaci&oacute;n LPS&quot; },
        // { &quot;tb&quot;, &quot;Bloqueos&quot; },
        // { &quot;tbqa&quot;, &quot;BQA&quot; },
        // { &quot;tdoa&quot;, &quot;DOAs&quot; },
        // { &quot;cl&quot;, &quot;Certificaci&oacute;n Lyntia&quot; }

        };

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;&quot;;

            await LoadApi();
        }

        async Task LoadApi()
        {
            try
            {
                _main.IsLoading = true;

                var aux = await _mongoContext.GetOneSeguimientoFibra(id);
                dataObra = aux.Value;    

                await InvokeAsync(StateHasChanged);
                LoadComponent(&quot;tso&quot;);
                _main.IsLoading = false;
            }
            catch (Exception e)
            {

                throw;
            }

        }

        private void LoadComponent(string componentName)
        {
            (ActiveComponent, ComponentParameters) = componentName switch
            {
                &quot;ti&quot; =&gt; (typeof(TarjetaInformacion), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tin&quot; =&gt; (typeof(TarjetaIngenieria), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tui&quot; =&gt; (typeof(TarjetaUtilitiesIberdrola), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tue&quot; =&gt; (typeof(TarjetaUtilitiesEndesa), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tus&quot; =&gt; (typeof(TarjetaUtilitiesSUC), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tug&quot; =&gt; (typeof(TarjetaUtilitiesGNF), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tl&quot; =&gt; (typeof(TarjetaLicencias), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;toc&quot; =&gt; (typeof(TarjetaObraCivil), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tino&quot; =&gt; (typeof(TarjetaInstalacionNokia), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tih&quot; =&gt; (typeof(TarjetaInstalacionHuawei), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;til&quot; =&gt; (typeof(TarjetaInstalacionLPS), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tb&quot; =&gt; (typeof(TarjetaBloqueos), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                &quot;tso&quot; =&gt; (typeof(TarjetaStockObra), new Dictionary&lt;string, object&gt;
            {
                { &quot;EditObra&quot;, dataObra }
            }),
                _ =&gt; (null, null) // Default case if the componentName is invalid
            };
        }
    }
    `
  },
  {
    "ID": 49,
    "ServicesName": "AddEditSolicitudDiseñoF",
    "ServicesRoute": "Components/Areas/RedFijaF/SolicitudDiseñoF/Modals/AddEditSolicitudDiseñoF",
    "ServicesDescription": "",
    "Code": `
    &lt;EditForm class=&quot;w-full h-fit flex flex-wrap justify-between p-2 gap-3&quot; Model=&quot;AddEdit&quot; OnValidSubmit=&quot;SaveAsync&quot; @ref=&quot;form&quot;&gt;
        &lt;DataAnnotationsValidator&gt;&lt;/DataAnnotationsValidator&gt;
        
        &lt;div class=&quot;w-full h-fit p-2 flex flex-wrap items-center text-blue-400 text-xl&quot;&gt;
            Manejar solicitud de dise&ntilde;o
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                GSER
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.Gser&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Gser&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                T&iacute;tulo
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.Titulo&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Titulo&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Proyecto
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.Proyecto&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Proyecto&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Localidad
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.Localidad&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Localidad&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Provincia
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.Provincia&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Provincia&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                PM LPS
            &lt;/div&gt;

            @if (AddEdit.PMLPS == null)
            {
                &lt;Autocomplete T=&quot;E_User&quot; Identifier=&quot;delinenates&quot;
                            SelectOne=&quot;@((e)=&gt; AddEdit.PMLPS= e)&quot;
                            Database=&quot;@DatabaseIdentifiers.Main&quot;
                            FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                            ToString=&quot;@(x=&gt; $&quot;{x.Name} {x.LastName}&quot;)&quot;&gt;
                &lt;/Autocomplete&gt;
            }
            else
            {
                &lt;Autocomplete T=&quot;E_User&quot; Identifier=&quot;delinenates&quot;
                            SelectOne=&quot;@((e)=&gt; AddEdit.PMLPS= e)&quot;
                            Database=&quot;@DatabaseIdentifiers.Main&quot;
                            FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                            ToString=&quot;@(x=&gt; $&quot;{x.Name} {x.LastName}&quot;)&quot;
                            InitialTextValue=&quot;@(string.IsNullOrEmpty(AddEdit.PMLPS.Id) ? &quot;&quot; :
                    $&quot;{AddEdit.PMLPS.Name} {AddEdit.PMLPS.LastName}&quot;)&quot;
                            InitialValue=&quot;string.IsNullOrEmpty(AddEdit.PMLPS.Id) ? null :
                                AddEdit.PMLPS &quot;&gt;
                &lt;/Autocomplete&gt;
            }

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.PMLPS&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Tipo de trabajo
            &lt;/div&gt;
            &lt;InputSelect class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.TipoTrabajo&quot;&gt;
                &lt;option value=&quot;Dise&ntilde;o&quot;&gt;Dise&ntilde;o&lt;/option&gt;
                &lt;option value=&quot;Modificaci&oacute;n&quot;&gt;Modificaci&oacute;n&lt;/option&gt;
                &lt;option value=&quot;Nueva soluci&oacute;n&quot;&gt;Nueva soluci&oacute;n&lt;/option&gt;
            &lt;/InputSelect&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.TipoTrabajo&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Dise&ntilde;ador
            &lt;/div&gt;
            @if (AddEdit.Dise&ntilde;ador == null)
            {
                &lt;Autocomplete T=&quot;E_User&quot; Identifier=&quot;delinenates&quot;
                            SelectOne=&quot;@((e)=&gt; AddEdit.Dise&ntilde;ador= e)&quot;
                            Database=&quot;@DatabaseIdentifiers.Main&quot;
                            FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                            ToString=&quot;@(x=&gt; $&quot;{x.Name} {x.LastName}&quot;)&quot;&gt;
                &lt;/Autocomplete&gt;
            }
            else
            {
                &lt;Autocomplete T=&quot;E_User&quot; Identifier=&quot;delinenates&quot;
                            SelectOne=&quot;@((e)=&gt; AddEdit.Dise&ntilde;ador= e)&quot;
                            Database=&quot;@DatabaseIdentifiers.Main&quot;
                            FilterMongo=&quot;@((s)=&gt; Builders&lt;E_User&gt;.Filter.Regex(x=&gt; x.Name, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                            ToString=&quot;@(x=&gt; $&quot;{x.Name} {x.LastName}&quot;)&quot;
                            InitialTextValue=&quot;@(string.IsNullOrEmpty(AddEdit.Dise&ntilde;ador.Id) ? &quot;&quot; :
                    $&quot;{AddEdit.Dise&ntilde;ador.Name} {AddEdit.Dise&ntilde;ador.LastName}&quot;)&quot;
                            InitialValue=&quot;string.IsNullOrEmpty(AddEdit.Dise&ntilde;ador.Id) ? null :
                                AddEdit.Dise&ntilde;ador &quot;&gt;
                &lt;/Autocomplete&gt;
            }
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Fecha objetivo
            &lt;/div&gt;
            &lt;InputDate class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.FechaObjetivo&quot;&gt;&lt;/InputDate&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.FechaObjetivo&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Ruta de archivos
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.RutaArchivos&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.RutaArchivos&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Fecha de entrega
            &lt;/div&gt;
            &lt;InputDate class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.FechaEntrega&quot;&gt;&lt;/InputDate&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[100%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Descripci&oacute;n
            &lt;/div&gt;
            &lt;InputTextArea class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.Descripcion&quot;&gt;&lt;/InputTextArea&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Descripcion&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;div class=&quot;w-full flex flex-wrap items-center&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot; p-2 rounded bg-blue-400 text-white&quot;
                        @onclick=&quot;@(() =&gt; AddEdit.Comentarios.Add(new() { Comentario = &quot;&quot;, Fecha=DateTime.Now, Id = _user.id, Name = $&quot;{_user.name} {_user.surname}&quot;, ProfilePic=_user.profilePic }))&quot;&gt;
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

                                    @(vv.Name) - @(vv.Fecha.ToLocalTime())
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

                                @(vv.Name) - @(vv.Fecha.ToLocalTime())
                            &lt;/div&gt;
                        }
                        &lt;InputTextArea class=&quot;w-full h-[100px] border border-slate-300/50 rounded p-2&quot; @bind-Value=&quot;vv.Comentario&quot; readonly=&quot;@(vv.Id != _user.id)&quot;&gt;&lt;/InputTextArea&gt;
                    }
                    else
                    {
                        &lt;div class=&quot;w-fit text-sm flex flex-wrap items-center gap-3&quot;&gt;
                            @($&quot;&quot;) - @(vv.Fecha.ToLocalTime())
                        &lt;/div&gt;
                        &lt;InputTextArea class=&quot;w-full h-[100px] border border-slate-300/50 rounded p-2&quot; @bind-Value=&quot;vv.Comentario&quot; readonly&gt;&lt;/InputTextArea&gt;
                    }

                &lt;/div&gt;
            }
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap justify-end gap-3&quot;&gt;
            @if(CanEditModal())
            {
                @if(AddEdit.Estados.Last().Estado == &quot;Pendiente de inicio&quot;)
                {
                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;@(()=&gt; SetStatus(&quot;Iniciado&quot;))&quot;&gt;Iniciar&lt;/button&gt;
                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-black text-white&quot; @onclick=&quot;@(()=&gt; SetStatus(&quot;Cancelado&quot;))&quot;&gt;Cancelar&lt;/button&gt;
                }
                else if (AddEdit.Estados.Last().Estado == &quot;Iniciado&quot;)
                {
                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-amber-400 text-white&quot; @onclick=&quot;@(()=&gt; SetStatus(&quot;Parado&quot;))&quot;&gt;Parar&lt;/button&gt;
                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-teal-400 text-white&quot; @onclick=&quot;@(()=&gt; SetStatus(&quot;Finalizado&quot;))&quot;&gt;Finalizar&lt;/button&gt;
                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-black text-white&quot; @onclick=&quot;@(()=&gt; SetStatus(&quot;Cancelado&quot;))&quot;&gt;Cancelar&lt;/button&gt;
                }
                else if (AddEdit.Estados.Last().Estado == &quot;Parado&quot;)
                {
                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-amber-400 text-white&quot; @onclick=&quot;@(()=&gt; SetStatus(&quot;Iniciado&quot;))&quot;&gt;Reanudar&lt;/button&gt;
                    &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-black text-white&quot; @onclick=&quot;@(()=&gt; SetStatus(&quot;Cancelado&quot;))&quot;&gt;Cancelar&lt;/button&gt;
                }
            }

            &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-red-600 text-white&quot; @onclick=&quot;@(()=&gt; Close(false))&quot;&gt;Salir sin guardar&lt;/button&gt;
            &lt;button type=&quot;submit&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot;&gt;Guardar&lt;/button&gt;
        &lt;/div&gt;
    &lt;/EditForm&gt;


    @code {
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        [Parameter] public E_SolicitudDise&ntilde;oF AddEdit { get; set; }

        bool IsEdit =&gt; !string.IsNullOrEmpty(AddEdit.Id);

        EditForm form { get; set; }

        protected override async Task OnInitializedAsync()
        {
            if (AddEdit == null)
            {
                AddEdit = new()
                    {
                        PMLPS = new()
                        {
                        Id = _user.id, 
                            Email = _user.email,
                            Name = _user.name,
                            LastName = _user.surname,
                            ProfilePic = _user.profilePic,
                            Tel = _user.tel,
                        }
                    };
            }
        }

        public void SetStatus(string estado)
        {
            AddEdit.Estados.Add(new()
                {
                    Estado = estado,
                    Fecha = DateTime.Now,
                    UsuarioEstado = null
                });

            form.OnValidSubmit.InvokeAsync();
        }

        bool CanEditModal()
        {
            if(AddEdit == null)
            {
                return false;
            }

            if (_user.Roles.Contains(&quot;Admin&quot;) || _user.Roles.Contains(&quot;SolicitudDise&ntilde;oF.Supervisor&quot;))
            {
                return true;
            }

            if (AddEdit.PMLPS.Id == _user.id)
            {
                return true;
            }

            if (AddEdit.Dise&ntilde;ador != null)
            {
                if (AddEdit.Dise&ntilde;ador.Id == _user.id)
                {
                    return true;
                }
            }

            return false;
        }

        public async Task SaveAsync()
        {
            try
            {
                _main.IsLoading = true;

                if (IsEdit)
                {
                    await _mongoContext.EditSolicitudDise&ntilde;oF(_mongoUsers, AddEdit);
                }
                else
                {
                    await _mongoContext.AddSolicitudDise&ntilde;oF(_mongoUsers, AddEdit);
                }

                Close(true);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;AddEditSolicitudDise&ntilde;oF&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

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
    "ID": 50,
    "ServicesName": "Home",
    "ServicesRoute": "Components/Areas/RedFijaF/SolicitudDiseñoF/Home",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/dise&ntilde;ofija&quot;
    @using LPSGrupo.Components.Areas.RedFijaF.SolicitudDise&ntilde;oF.Modals

    &lt;AuthorizePage Permissions=&quot;@(PermissionsConstantsSolicitudDise&ntilde;oF.GetPaginatedSolicitud)&quot;&gt;&lt;/AuthorizePage&gt;

    &lt;div class=&quot;w-full h-fit flex flex-wrap p-4 gap-3&quot;&gt;
        &lt;div class=&quot;w-full text-blue-400 font-bold text-2xl&quot;&gt;
            Solicitudes de dise&ntilde;o
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap justify-between items-start&quot;&gt;
            &lt;div class=&quot;w-fit h-fit flex flex-wrap items-center gap-3&quot;&gt;
                &lt;AuthorizedContent Permissions=&quot;@(PermissionsConstantsSolicitudDise&ntilde;oF.AddSolicitud)&quot;&gt;
                    &lt;button class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot; @onclick=&quot;()=&gt; OpenModalAddEdit()&quot;&gt;
                        A&ntilde;adir solicitud
                    &lt;/button&gt;
                &lt;/AuthorizedContent&gt;
            &lt;/div&gt;

            &lt;div class=&quot;w-fit h-fit flex flex-wrap items-center gap-3&quot;&gt;
                &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-3 text-sm rounded border border-slate-300&quot; @bind-value=&quot;searchSet&quot;&gt;&lt;/input&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50&quot;&gt;
            &lt;thead&gt;
                &lt;tr&gt;
                    &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                        GSER
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                        Estado
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                        T&iacute;tulo
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                        Proyecto
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                        Tipo de trabajo
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                        Localidad
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                        Provincia
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                        PM LPS
                    &lt;/th&gt;
                    &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                        Dise&ntilde;ador
                    &lt;/th&gt;
                &lt;/tr&gt;
            &lt;/thead&gt;
            &lt;tbody&gt;
                @if (Data.Documents != null)
                {
                    @foreach (var v in Data.Documents)
                    {
                        &lt;tr&gt;
                            &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                &lt;span class=&quot;text-blue-600 underline cursor-pointer&quot; @onclick=&quot;()=&gt; OpenModalAddEdit(v)&quot;&gt;@(v.Gser)&lt;/span&gt;
                            &lt;/td&gt;
                            &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                &lt;span class=&quot;w-fit h-fit p-2 @(ColorEstados(v.Estados.Last().Estado)) rounded text-white&quot;&gt;
                                    @(v.Estados.Last().Estado)
                                &lt;/span&gt;
                            &lt;/td&gt;
                            &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                @(v.Titulo)
                            &lt;/td&gt;
                            &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                @(v.Proyecto)
                            &lt;/td&gt;
                            &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                @(v.TipoTrabajo)
                            &lt;/td&gt;
                            &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                @(v.Localidad)
                            &lt;/td&gt;
                            &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                @(v.Provincia)
                            &lt;/td&gt;
                            &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                @($&quot;{v.PMLPS.Name} {v.PMLPS.LastName}&quot;)
                            &lt;/td&gt;
                            &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                @(v.Dise&ntilde;ador != null ? $&quot;{v.Dise&ntilde;ador.Name} {v.Dise&ntilde;ador.LastName}&quot; : &quot;Sin dise&ntilde;ador&quot;)
                            &lt;/td&gt;
                        &lt;/tr&gt;
                    }
                }
            &lt;/tbody&gt;
        &lt;/table&gt;
        &lt;Paginator countAllDocuments=&quot;(int)Data.CountAllDocuments&quot; countPages=&quot;Data.PageCount&quot; filters=&quot;GetData&quot; ReloadData=&quot;()=&gt;LoadApi()&quot;&gt;&lt;/Paginator&gt;
    &lt;/div&gt;

    @code {
        public PaginatedResult&lt;E_SolicitudDise&ntilde;oF&gt; Data { get; set; } = new();

        public GetPaginatedSolicitudDise&ntilde;oF GetData { get; set; } = new()
            {
                PageNumber = 1,
                PageSize = 10,
                Search = &quot;&quot;
            };

        string searchSet
        {
            get
            {
                return GetData.Search;
            }
            set
            {
                GetData.Search = value;

                LoadApi();
            }
        }

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;&quot;;
            await LoadApi();
        }

        public async Task LoadApi()
        {
            try
            {
                _main.IsLoading = true;

                var pageSize = _main.QueryParameters(_nav)[&quot;pageSize&quot;];
                var pageNumber = _main.QueryParameters(_nav)[&quot;pageNumber&quot;];

                if (!string.IsNullOrEmpty(pageSize) &amp;&amp; !string.IsNullOrEmpty(pageNumber))
                {
                    GetData.PageNumber = int.Parse(pageNumber);
                    GetData.PageSize = int.Parse(pageSize);
                }

                Data = await _mongoContext.GetPaginatedSOlicitudDise&ntilde;oF(GetData);

                await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;Carpeta SolicitudDise&ntilde;oF &gt; Home&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
            }

        }

        bool CanEditModal(E_SolicitudDise&ntilde;oF v)
        {
            if (_user.Roles.Contains(&quot;Admin&quot;) || _user.Roles.Contains(&quot;SolicitudDise&ntilde;oF.Supervisor&quot;))
            {
                return true;
            }

            if (v.PMLPS.Id == _user.id)
            {
                return true;
            }

            if (v.Dise&ntilde;ador != null)
            {
                if (v.Dise&ntilde;ador.Id == _user.id)
                {
                    return true;
                }
            }

            return false;
        }

        public string ColorEstados(string estado) =&gt; estado switch
        {
            &quot;Sin asignaci&oacute;n&quot; =&gt; &quot;bg-slate-300&quot;,
            &quot;Pendiente de inicio&quot; =&gt; &quot;bg-cyan-400&quot;,
            &quot;Iniciado&quot; =&gt; &quot;bg-blue-500&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-600&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-slate-950&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-emerald-500&quot;,
            _ =&gt; &quot;&quot;
        };

        public void OpenModalAddEdit(E_SolicitudDise&ntilde;oF addedit = null)
        {
            if (addedit != null)
            {
                if (!CanEditModal(addedit))
                {
                    return;
                }
            }

            var modal = _modal.ShowModal(typeof(AddEditSolicitudDise&ntilde;oF), new Dictionary&lt;string, object&gt;
            {
                { nameof(AddEditSolicitudDise&ntilde;oF.AddEdit), addedit == null ? null : addedit}
            }, FixedWidth: 80);

            modal.OnCloseModal += (b) =&gt;
            {
                LoadApi();
            };
        }
    }
    `
  },
  {
    "ID": 51,
    "ServicesName": "AddEditAccesoFibra",
    "ServicesRoute": "Components/Areas/RedFijaF/VisitasFibra/AccesosFibra/Modals/AddEditAccesoFibra",
    "ServicesDescription": "",
    "Code": `
    @using VisitasFibraLogicEmplazamientos
    &lt;EditForm class=&quot;w-full h-fit flex flex-wrap justify-between p-2 gap-3&quot; Model=&quot;AddEdit&quot; OnValidSubmit=&quot;SaveAsync&quot; @ref=&quot;form&quot;&gt;
        &lt;DataAnnotationsValidator&gt;&lt;/DataAnnotationsValidator&gt;

        &lt;div class=&quot;w-full h-fit p-2 flex flex-wrap items-center text-blue-400 text-xl&quot;&gt;
            Manejar acceso
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                GSER
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.GSER&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.GSER&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Mnemoico
            &lt;/div&gt;

            @if (AddEdit.Mnemonico != null)
            {
                &lt;Autocomplete T=&quot;E_EmplazamientosFibra&quot; Identifier=&quot;mnemoico&quot;
                            SelectOne=&quot;@((e)=&gt; {AddEdit.Mnemonico = e; InvokeAsync(StateHasChanged);})&quot;
                            Database=&quot;@DatabaseIdentifiers.RedFija&quot;
                            FilterMongo=&quot;@((s)=&gt; Builders&lt;E_EmplazamientosFibra&gt;.Filter.Regex(x=&gt; x.Mnemonico, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                            ToString=&quot;@(x=&gt; $&quot;{x.Mnemonico}&quot;)&quot;&gt;
                &lt;/Autocomplete&gt;
            }
            else
            {
                &lt;Autocomplete T=&quot;E_EmplazamientosFibra&quot; Identifier=&quot;mnemoico&quot;
                            SelectOne=&quot;@((e)=&gt; {AddEdit.Mnemonico = e; InvokeAsync(StateHasChanged);})&quot;
                            Database=&quot;@DatabaseIdentifiers.RedFija&quot;
                            ToString=&quot;@(x=&gt; $&quot;{x.Mnemonico}&quot;)&quot;
                            FilterMongo=&quot;@((s)=&gt; Builders&lt;E_EmplazamientosFibra&gt;.Filter.Regex(x=&gt; x.Mnemonico, new BsonRegularExpression(s, &quot;i&quot;)))&quot;
                            InitialTextValue=&quot;AddEdit.Mnemonico.Mnemonico&quot;
                            InitialValue=&quot;AddEdit.Mnemonico&quot;&gt;
                            
                
                            
                &lt;/Autocomplete&gt;
            }

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Mnemonico&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Centro
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.Centro&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Centro&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Nombre
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.Nombre&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Nombre&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;


        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Direcci&oacute;n
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.Direccion&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Direccion&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Provincia
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.Provincia&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Provincia&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Fecha planificaci&oacute;n Gprog
            &lt;/div&gt;
            &lt;InputDate class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.FechaPlanifGprog&quot;&gt;&lt;/InputDate&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Hora
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.Hora&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Hora&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Semana
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.Semana&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Semana&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Gprog
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.GProg&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.GProg&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Gprl
            &lt;/div&gt;
            &lt;InputText class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.Gprl&quot;&gt;&lt;/InputText&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.Gprl&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Fecha OK Gprl
            &lt;/div&gt;
            &lt;InputDate class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.FechaOkGprl&quot;&gt;&lt;/InputDate&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.FechaOkGprl&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Fecha solicitud de accesos
            &lt;/div&gt;
            &lt;InputDate class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.FechaSolicitudAccesos&quot;&gt;&lt;/InputDate&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.FechaSolicitudAccesos&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;w-[47%] h-fit flex flex-wrap items-start justify-center p-2 gap-3 rounded bg-slate-100 shadow-md&quot;&gt;
            &lt;div class=&quot;w-full text-blue-400&quot;&gt;
                Accesos OK
            &lt;/div&gt;
            &lt;InputDate class=&quot;w-full h-fit p-2 rounded bg-white&quot; placeholder=&quot;&quot; @bind-Value=&quot;AddEdit.AccesosOK&quot;&gt;&lt;/InputDate&gt;

            &lt;ValidationMessage class=&quot;w-full h-fit text-red-600&quot; For=&quot;()=&gt;AddEdit.AccesosOK&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;


        &lt;div class=&quot;w-full p-2 flex flex-wrap gap-3&quot;&gt;
            &lt;div class=&quot;w-full flex flex-wrap items-center&quot;&gt;
                &lt;button type=&quot;button&quot; class=&quot; p-2 rounded bg-blue-400 text-white&quot;
                        @onclick=&quot;@(() =&gt; AddEdit.Comentarios.Add(new() { Comentario = &quot;&quot;, Fecha=DateTime.Now, Id = _user.id, Name = $&quot;{_user.name} {_user.surname}&quot;, ProfilePic=_user.profilePic }))&quot;&gt;
                    A&ntilde;adir comentario
                &lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;w-full flex flex-wrap gap-3 py-3&quot;&gt;
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

                                    @(vv.Name) - @(vv.Fecha.ToLocalTime())
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

                                @(vv.Name) - @(vv.Fecha.ToLocalTime())
                            &lt;/div&gt;
                        }
                        &lt;InputTextArea class=&quot;w-full h-[100px] border border-slate-300/50 rounded p-2&quot; @bind-Value=&quot;vv.Comentario&quot; readonly=&quot;@(vv.Id != _user.id)&quot;&gt;&lt;/InputTextArea&gt;
                    }
                    else
                    {
                        &lt;div class=&quot;w-fit text-sm flex flex-wrap items-center gap-3&quot;&gt;
                            @($&quot;&quot;) - @(vv.Fecha.ToLocalTime())
                        &lt;/div&gt;
                        &lt;InputTextArea class=&quot;w-full h-[100px] border border-slate-300/50 rounded p-2&quot; @bind-Value=&quot;vv.Comentario&quot; readonly&gt;&lt;/InputTextArea&gt;
                    }

                &lt;/div&gt;
            }
        &lt;/div&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap justify-end gap-3&quot;&gt;
            &lt;button type=&quot;button&quot; class=&quot;w-fit h-fit p-2 rounded bg-red-600 text-white&quot; @onclick=&quot;@(()=&gt; Close(false))&quot;&gt;Salir sin guardar&lt;/button&gt;
            &lt;button type=&quot;submit&quot; class=&quot;w-fit h-fit p-2 rounded bg-blue-400 text-white&quot;&gt;Guardar&lt;/button&gt;
        &lt;/div&gt;
    &lt;/EditForm&gt;


    @code {
        [Parameter] public bool Saved { get; set; }
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        [Parameter] public E_AccesosFibra AddEdit { get; set; }

        bool IsEdit =&gt; !string.IsNullOrEmpty(AddEdit.Id);

        EditForm form { get; set; }

        protected override async Task OnInitializedAsync()
        {
            if (AddEdit == null)
            {
                AddEdit = new()
                    {
                        Id = _user.id,
                    };
            }
        }
        public void SetStatus(string estado)
        {
            AddEdit.Estados.Add(new()
                {
                    Estado = estado,
                    Fecha = DateTime.Now,
                    UsuarioEstado = null
                });

            form.OnValidSubmit.InvokeAsync();
        }

        bool CanEditModal()
        {
            if (AddEdit == null)
            {
                return false;
            }

            if (_user.Roles.Contains(&quot;Admin&quot;))
            {
                return true;
            }

            if (AddEdit.Mnemonico.Id == _user.id)
            {
                return true;
            }


            return false;
        }


        public async Task SaveAsync()
        {
            try
            {
                _main.IsLoading = true;

                if (IsEdit)
                {
                    await _mongoContext.EditAccesoFibra(_mongoUsers, AddEdit);
                }
                else
                {
                    await _mongoContext.AddAccesoFibra(_mongoUsers, AddEdit);
                }

            
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;AddEditAccesoFibra&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

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
    "ID": 52,
    "ServicesName": "PageAccesosFibra",
    "ServicesRoute": "Components/Areas/RedFijaF/VisitasFibra/AccesosFibra/PageAccesosFibra",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/visitasfibra/accesos&quot;
    @using LPSGrupo.Components.Areas.RedFijaF.VisitasFibra.AccesosFibra.Modals

    &lt;AuthorizePage Permissions=&quot;@(PermissionConstantsVisitasFibra.GetPaginatedAccesos)&quot;&gt;&lt;/AuthorizePage&gt;

    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        &lt;h1 class=&quot; w-full text-3xl text-blue-400&quot; tabindex=&quot;none&quot;&gt;Solicitud de accesos&lt;/h1&gt;

        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
            &lt;div class=&quot;flex flex-wrap items-center gap-3 mb-8&quot;&gt;
                &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsVisitasFibra.AddAccesos)&quot;&gt;
                    &lt;button class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3&quot;
                            @onclick='()=&gt;{IsSaved=false; OpenModalAccesos();}'&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            login
                        &lt;/span&gt;
                        A&ntilde;adir acceso
                    &lt;/button&gt;
                &lt;/AuthorizedContent&gt;
            &lt;/div&gt;

            &lt;div class=&quot;w-fit h-fit flex flex-wrap items-center gap-3&quot;&gt;
                &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-3 text-sm rounded border border-slate-300&quot; @bind-value=&quot;searchSet&quot;&gt;&lt;/input&gt;
            &lt;/div&gt;


            &lt;div class=&quot;flex flex-wrap items-center gap-3&quot;&gt;
                @if (AccesosFibra.Documents != null)
                {
                    &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50&quot;&gt;
                        &lt;thead&gt;
                            &lt;tr&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    GSER
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Mnemonico
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Estado
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Centro
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Nombre
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[200px]&quot;&gt;
                                    Direcci&oacute;n
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Provincia
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[200px] &quot;&gt;
                                    Fecha planificaci&oacute;n GPROG
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[200px] &quot;&gt;
                                    Hora
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Semana
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    GPROG
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    GPRL
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Fecha GPRL
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Fecha solicitud accesos
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Accesos OK
                                &lt;/th&gt;
                            &lt;/tr&gt;
                        &lt;/thead&gt;
                        &lt;tbody&gt;
                            @foreach (var v in AccesosFibra.Documents)
                            {
                                &lt;tr class=&quot;text-center&quot;&gt;

                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                        &lt;span class=&quot;text-blue-600 hover:underline cursor-pointer&quot; @onclick=&quot;()=&gt; OpenModalAccesos(v)&quot;&gt;@v.GSER&lt;/span&gt;
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.Mnemonico.Mnemonico)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-4 text-sm border border-slate-300/50&quot;&gt;
                                        &lt;span class=&quot;w-fit h-fit p-2 @(ColorEstados(v.Estados.Last().Estado)) rounded text-white&quot;&gt;
                                            @(v.Estados.Last().Estado)
                                        &lt;/span&gt;
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.Centro)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.Nombre)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.Direccion)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.Provincia)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.FechaPlanifGprog.ToLocalTime().ToString(&quot;dd/MM/yyyy&quot;))
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.Hora)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.Semana)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.GProg)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.Gprl)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.FechaOkGprl != null ? $&quot;{v.FechaOkGprl.Value.ToLocalTime().ToString(&quot;dd/MM/yyyy&quot;)}&quot; : $&quot;NA&quot;)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.FechaSolicitudAccesos != null ? $&quot;{v.FechaSolicitudAccesos.Value.ToLocalTime().ToString(&quot;dd/MM/yyyy&quot;)}&quot; : $&quot;NA&quot;)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.AccesosOK != null ? $&quot;{v.AccesosOK.Value.ToLocalTime().ToString(&quot;dd/MM/yyyy&quot;)}&quot; : $&quot;NA&quot;)
                                    &lt;/td&gt;


                                &lt;/tr&gt;
                            }
                        &lt;/tbody&gt;
                    &lt;/table&gt;
                    &lt;Paginator countAllDocuments=&quot;(int)AccesosFibra.CountAllDocuments&quot; countPages=&quot;AccesosFibra.PageCount&quot; filters=&quot;filtersAcceso&quot; ReloadData=&quot;()=&gt;LoadDataApi()&quot;&gt;

                    &lt;/Paginator&gt;
                }
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {

        PaginatedResult&lt;E_AccesosFibra&gt; AccesosFibra = new();


        GetPaginatedAccesoFibra filtersAcceso = new()
            {
                Search = &quot;&quot;,
                PageNumber = 1,
                PageSize = 10,
            };

        string searchSet
        {
            get
            {
                return filtersAcceso.Search;
            }
            set
            {
                filtersAcceso.Search = value;

                LoadDataApi();
            }
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (!firstRender) return;

            _main.BackgroundImage = &quot;&quot;;

            await LoadDataApi();

            if (await _localStorage.ContainKeyAsync(&quot;accesoadd&quot;))
            {   
                try
                {
                    addeditModal = await _localStorage.GetItemAsync&lt;E_AccesosFibra&gt;(&quot;accesoadd&quot;);
                    await _localStorage.RemoveItemAsync(&quot;accesoadd&quot;);
                    IsSaved = true;
                    OpenModalAccesos(addeditModal);
                    await InvokeAsync(StateHasChanged);
                    return;
                }
                catch (Exception e)
                {
                    
                    await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;PageAccesosFibra&quot;, &quot;OnAfterRenderAsync&quot;, DateTime.UtcNow);

                    throw;
                }
            
            };

            await InvokeAsync(StateHasChanged);
        }

        async Task LoadDataApi()
        {
            try
            {
            _main.IsLoading = true;

                    filtersAcceso.MyId = _user.id;


                    AccesosFibra = await _mongoContext.GetPaginatedAccesoFibra(_mongoUsers, filtersAcceso);

                    await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;PageAccesosFibra&quot;, &quot;LoadDataAPi&quot;, DateTime.UtcNow);

                throw;
            }
            finally
            {
                _main.IsLoading = false;
            }
        

        }

        public string ColorEstados(string estado) =&gt; estado switch
        {
            &quot;Sin asignaci&oacute;n&quot; =&gt; &quot;bg-slate-300&quot;,
            &quot;Pendiente de inicio&quot; =&gt; &quot;bg-cyan-400&quot;,
            &quot;Iniciado&quot; =&gt; &quot;bg-blue-500&quot;,
            &quot;Parado&quot; =&gt; &quot;bg-amber-600&quot;,
            &quot;Cancelado&quot; =&gt; &quot;bg-slate-950&quot;,
            &quot;Finalizado&quot; =&gt; &quot;bg-emerald-500&quot;,
            &quot;Pendiente de solicitud&quot; =&gt; &quot;bg-pink-500&quot;,
            &quot;Autorizado&quot; =&gt; &quot;bg-green-400&quot;,
            _ =&gt; &quot;&quot;
        };

        public E_AccesosFibra addeditModal = new E_AccesosFibra();
        public bool IsSaved = false;

        void OpenModalAccesos(E_AccesosFibra edit = null)
        {
            if (edit != null)
            {
                addeditModal = edit;
            }

            var modal = _modal.ShowModal(typeof(AddEditAccesoFibra), new Dictionary&lt;string, object&gt;
            {
                {nameof(AddEditAccesoFibra.AddEdit), addeditModal},
                {nameof(AddEditAccesoFibra.Saved), IsSaved}
            }, FixedWidth: 80);

            modal.OnCloseModal += OpenModalAccesos;
        }

        async void OpenModalAccesos(bool reload)
        {
            addeditModal = new E_AccesosFibra();

            if (reload)
            {
                await LoadDataApi();
            }

            await Task.Delay(100);

            await _localStorage.RemoveItemAsync(&quot;accesoadd&quot;);

        await InvokeAsync(StateHasChanged);
        }


    }
    `
  },
  {
    "ID": 53,
    "ServicesName": "AddEditEmplazamientoFibra",
    "ServicesRoute": "Components/Areas/RedFijaF/VisitasFibra/EmplazamientosFibra/Modals/AddEditEmplazamientoFibra",
    "ServicesDescription": "",
    "Code": `
    @using MongoDB.Bson
    @using MongoDB.Driver
    @using System.Text.Json
    @using EmplazamientosFibra
    @using VisitasFibraLogicEmplazamientos

    &lt;EditForm class=&quot;mt-2 w-full grid grid-cols-12 gap-3&quot; Model=&quot;AddEdit&quot; OnValidSubmit=&quot;() =&gt; SaveAsync()&quot;&gt;
        &lt;DataAnnotationsValidator&gt;&lt;/DataAnnotationsValidator&gt;
        &lt;span class=&quot;col-span-12 mb-6 text-blue-400 text-xl font-bold&quot;&gt;Manejar emplazamiento&lt;/span&gt;

        &lt;div class=&quot;col-span-6 h-fit rounded shadow-md border border-slate-300/50 flex flex-wrap p-2 gap-3&quot;&gt;
            &lt;h2 class=&quot;w-full text-blue-400 text-base&quot;&gt;Mnemonico&lt;/h2&gt;
            &lt;InputText class=&quot;w-full rounded border border-slate-300/50 p-2&quot; @bind-Value=&quot;AddEdit.Mnemonico&quot; /&gt;
            &lt;ValidationMessage class=&quot;text-red-600 font-bold&quot; For=&quot;()=&gt; AddEdit.Mnemonico&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 h-fit rounded shadow-md border border-slate-300/50 flex flex-wrap p-2 gap-3&quot;&gt;
            &lt;h2 class=&quot;w-full text-blue-400 text-base&quot;&gt;Calle&lt;/h2&gt;
            &lt;InputText class=&quot;w-full rounded border border-slate-300/50 p-2&quot; @bind-Value=&quot;AddEdit.Calle&quot; /&gt;
            &lt;ValidationMessage class=&quot;text-red-600 font-bold&quot; For=&quot;()=&gt; AddEdit.Calle&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 h-fit rounded shadow-md border border-slate-300/50 flex flex-wrap p-2 gap-3&quot;&gt;
            &lt;h2 class=&quot;w-full text-blue-400 text-base&quot;&gt;C&oacute;digo postal&lt;/h2&gt;
            &lt;InputText class=&quot;w-full rounded border border-slate-300/50 p-2&quot; @bind-Value=&quot;AddEdit.CodigoPostal&quot; /&gt;
            &lt;ValidationMessage class=&quot;text-red-600 font-bold&quot; For=&quot;()=&gt; AddEdit.CodigoPostal&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 h-fit rounded shadow-md border border-slate-300/50 flex flex-wrap p-2 gap-3&quot;&gt;
            &lt;h2 class=&quot;w-full text-blue-400 text-base&quot;&gt;Municipio&lt;/h2&gt;
            &lt;InputText class=&quot;w-full rounded border border-slate-300/50 p-2&quot; @bind-Value=&quot;AddEdit.Municipio&quot; /&gt;
            &lt;ValidationMessage class=&quot;text-red-600 font-bold&quot; For=&quot;()=&gt; AddEdit.Municipio&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;


        &lt;div class=&quot;col-span-6 h-fit rounded shadow-md border border-slate-300/50 flex flex-wrap p-2 gap-3&quot;&gt;
            &lt;h2 class=&quot;w-full text-blue-400 text-base&quot;&gt;Provincia&lt;/h2&gt;
            &lt;InputText class=&quot;w-full rounded border border-slate-300/50 p-2&quot; @bind-Value=&quot;AddEdit.Provincia&quot; /&gt;
            &lt;ValidationMessage class=&quot;text-red-600 font-bold&quot; For=&quot;()=&gt; AddEdit.Provincia&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 h-fit rounded shadow-md border border-slate-300/50 flex flex-wrap p-2 gap-3&quot;&gt;
            &lt;h2 class=&quot;w-full text-blue-400 text-base&quot;&gt;Pa&iacute;s&lt;/h2&gt;
            &lt;InputText class=&quot;w-full rounded border border-slate-300/50 p-2&quot; @bind-Value=&quot;AddEdit.Pais&quot; /&gt;
            &lt;ValidationMessage class=&quot;text-red-600 font-bold&quot; For=&quot;()=&gt; AddEdit.Pais&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 h-fit rounded shadow-md border border-slate-300/50 flex flex-wrap p-2 gap-3&quot;&gt;
            &lt;h2 class=&quot;w-full text-blue-400 text-base&quot;&gt;Propietario&lt;/h2&gt;
            &lt;InputText class=&quot;w-full rounded border border-slate-300/50 p-2&quot; @bind-Value=&quot;AddEdit.Propietario&quot; /&gt;
            &lt;ValidationMessage class=&quot;text-red-600 font-bold&quot; For=&quot;()=&gt; AddEdit.Propietario&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 h-fit rounded shadow-md border border-slate-300/50 flex flex-wrap p-2 gap-3&quot;&gt;
            &lt;h2 class=&quot;w-full text-blue-400 text-base&quot;&gt;Latitud&lt;/h2&gt;
            &lt;InputNumber class=&quot;w-full rounded border border-slate-300/50 p-2&quot; @bind-Value=&quot;AddEdit.Latitud&quot; /&gt;
            &lt;ValidationMessage class=&quot;text-red-600 font-bold&quot; For=&quot;()=&gt; AddEdit.Latitud&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-6 h-fit rounded shadow-md border border-slate-300/50 flex flex-wrap p-2 gap-3&quot;&gt;
            &lt;h2 class=&quot;w-full text-blue-400 text-base&quot;&gt;Longitud&lt;/h2&gt;
            &lt;InputNumber class=&quot;w-full rounded border border-slate-300/50 p-2&quot; @bind-Value=&quot;AddEdit.Longitud&quot; /&gt;
            &lt;ValidationMessage class=&quot;text-red-600 font-bold&quot; For=&quot;()=&gt; AddEdit.Longitud&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 h-fit rounded shadow-md border border-slate-300/50 flex flex-wrap p-2 gap-3&quot;&gt;
            &lt;h2 class=&quot;w-full text-blue-400 text-base&quot;&gt;Descripci&oacute;n&lt;/h2&gt;
            &lt;InputTextArea class=&quot;w-full rounded border border-slate-300/50 p-2&quot; @bind-Value=&quot;AddEdit.Descripcion&quot; /&gt;
            &lt;ValidationMessage class=&quot;text-red-600 font-bold&quot; For=&quot;()=&gt; AddEdit.Descripcion&quot;&gt;&lt;/ValidationMessage&gt;
        &lt;/div&gt;

        &lt;div class=&quot;col-span-12 flex flex-wrap justify-end items-end p-2 gap-3&quot;&gt;
            &lt;button type=&quot;button&quot; class=&quot;col-span-1 w-fit h-fit p-2 bg-red-600 text-white rounded flex flex-wrap gap-3&quot;
                    @onclick=&quot;@(() =&gt; {Close(false);})&quot;&gt;
                &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                    cancel
                &lt;/span&gt;
                Cancelar
            &lt;/button&gt;

            &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsVisitasFibra.EditEmplazamientos)&quot;&gt;
                &lt;button id=&quot;&quot; type=&quot;submit&quot; class=&quot;bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded&quot;&gt;
                    &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                        save
                    &lt;/span&gt;
                    Guardar
                &lt;/button&gt;
            &lt;/AuthorizedContent&gt;
        &lt;/div&gt;
    &lt;/EditForm&gt;


    @code {

        private bool OpenedState { get; set; }
        [CascadingParameter] public Action&lt;bool&gt; Close { get; set; }
        [Parameter] public E_EmplazamientosFibra AddEdit { get; set; }

        bool IsEdit =&gt; !string.IsNullOrEmpty(AddEdit.Id);

        protected override async Task OnAfterRenderAsync(bool firstFrame)
        {
            if (!firstFrame) return;

            _disconnection.SaveStatus += (async () =&gt;
            {
                try
                {
                    if (AddEdit != null)
                    {
                        await _localStorage.SetItemAsync(&quot;emplazamientofibraadd&quot;, AddEdit);
                    }
                    else
                    {
                        await _localStorage.RemoveItemAsync(&quot;emplazamientofibraadd&quot;);
                    }
                }
                catch (Exception)
                { }
            });
        }

    

        async Task SaveAsync()
        {
            try
            {
                _main.IsLoading = true;
                if (IsEdit)
                {
                    await _mongoContext.EditEmplazamientoFibra(AddEdit);
                }
                else
                {
                    await _mongoContext.AddEmplazamientoFibra(AddEdit);
                }
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;AddEditEmplazamientoFibra&quot;, &quot;SaveAsync&quot;, DateTime.UtcNow);

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
    "ID": 54,
    "ServicesName": "PageEmplazamientoFibra",
    "ServicesRoute": "Components/Areas/RedFijaF/VisitasFibra/EmplazamientosFibra/PageEmplazamientoFibra",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/visitasfibra/emplazamientos&quot;
    @using VisitasFibraLogicEmplazamientos
    @using LPSGrupo.Components.Areas.RedFijaF.VisitasFibra.EmplazamientosFibra.Modals

    &lt;AuthorizePage Permissions=&quot;@(PermissionConstantsVisitasFibra.GetPaginatedEmplazamientos)&quot;&gt;&lt;/AuthorizePage&gt;

    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        &lt;h1 class=&quot; w-full text-3xl text-blue-400&quot; tabindex=&quot;none&quot;&gt;Emplazamientos&lt;/h1

        &lt;div class=&quot;w-full flex flex-wrap justify-between items-center&quot;&gt;
            &lt;div class=&quot;flex flex-wrap items-center gap-3 mb-8&quot;&gt;
                &lt;AuthorizedContent&gt;
                    &lt;button class=&quot;p-2 rounded bg-blue-400 text-white flex flex-wrap items-center gap-3&quot;
                            @onclick='()=&gt;{OpenModalEmplazamientos();}'&gt;
                        &lt;span class=&quot;material-symbols-outlined&quot;&gt;
                            location_on
                        &lt;/span&gt;
                        A&ntilde;adir emplazamiento
                    &lt;/button&gt;
                &lt;/AuthorizedContent&gt;
            &lt;/div&gt;

            &lt;div class=&quot;flex flex-wrap items-center gap-3 mb-8&quot;&gt;
                &lt;input type=&quot;search&quot; placeholder=&quot;Buscar...&quot; class=&quot;p-3 text-sm rounded border border-slate-300&quot; @bind-value=&quot;searchSet&quot;&gt;&lt;/input&gt;
            &lt;/div&gt;
        

            &lt;div class=&quot;w-full flex flex-wrap items-center gap-3&quot;&gt;
                @if (EmplazamientosFibra.Documents != null)
                {
                    &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50&quot;&gt;
                        &lt;thead&gt;
                            &lt;tr&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Mnemonico
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Calle
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    C&oacute;digo postal
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Municipio
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[200px]&quot;&gt;
                                    Provincia
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                                    Pa&iacute;s
                                &lt;/th&gt;
                                &lt;th class=&quot;p-2 text-sm border border-slate-300/50 min-w-[200px] &quot;&gt;
                                    Propietario
                                &lt;/th&gt;
                            &lt;/tr&gt;
                        &lt;/thead&gt;
                        &lt;tbody&gt;
                            @foreach (var v in EmplazamientosFibra.Documents)
                            {
                                &lt;tr&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50&quot;&gt;
                                        &lt;span class=&quot;text-blue-600 hover:underline cursor-pointer&quot; @onclick=&quot;()=&gt; OpenModalEmplazamientos(v)&quot;&gt;@v.Mnemonico&lt;/span&gt;
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.Calle)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.CodigoPostal)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.Municipio)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.Provincia)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.Pais)
                                    &lt;/td&gt;
                                    &lt;td class=&quot;p-2 text-sm border border-slate-300/50 &quot;&gt;
                                        @(v.Propietario)
                                    &lt;/td&gt;


                                &lt;/tr&gt;
                            }
                        &lt;/tbody&gt;
                    &lt;/table&gt;
                    &lt;Paginator countAllDocuments=&quot;(int)EmplazamientosFibra.CountAllDocuments&quot; countPages=&quot;EmplazamientosFibra.PageCount&quot; filters=&quot;filtersEmplazamiento&quot; ReloadData=&quot;()=&gt;LoadDataApi()&quot;&gt;

                    &lt;/Paginator&gt;
                }
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {

        PaginatedResult&lt;E_EmplazamientosFibra&gt; EmplazamientosFibra = new();
    
        GetPaginatedEmplazamientoFibra filtersEmplazamiento = new()
            {
                Search = &quot;&quot;,
                PageNumber = 1,
                PageSize = 10,
            };

    string searchSet
        {
            get
            {
                return filtersEmplazamiento.Search;
            }
            set
            {
                filtersEmplazamiento.Search = value;

                LoadDataApi();
            }
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (!firstRender) return;

            _main.BackgroundImage = &quot;&quot;;

            await LoadDataApi();
            await InvokeAsync(StateHasChanged);
        }

        async Task LoadDataApi()
        {
            try
            {
                _main.IsLoading = true;
                    EmplazamientosFibra = await _mongoContext.GetPaginatedEmplazamientosFibra(_mongoUsers, filtersEmplazamiento);

                    await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;PageEmplazamientoFibra&quot;, &quot;LoadDataAPi&quot;, DateTime.UtcNow);

                throw;
            }
            finally    
            {
                _main.IsLoading = false;
            }
        

        
        }

        public E_EmplazamientosFibra addeditModal = new E_EmplazamientosFibra();

        void OpenModalEmplazamientos(E_EmplazamientosFibra edit = null)
        {
            if (edit != null)
            {
                addeditModal = edit;
            }

            var modal = _modal.ShowModal(typeof(AddEditEmplazamientoFibra), new Dictionary&lt;string, object&gt;
            {
                {nameof(AddEditEmplazamientoFibra.AddEdit), addeditModal},
            }, FixedWidth: 80);

            modal.OnCloseModal += OpenModalEmplazamientos;
        }

        async void OpenModalEmplazamientos(bool reload)
        {
            addeditModal = new E_EmplazamientosFibra();

            if (reload)
            {
                await LoadDataApi();
            }
            await Task.Delay(100);
            await _localStorage.RemoveItemAsync(&quot;emplazamientoadd&quot;);
            await InvokeAsync(StateHasChanged);
        }
    }
    `
  },
  {
    "ID": 55,
    "ServicesName": "Index",
    "ServicesRoute": "Components/Areas/RedFijaF/VisitasFibra/Index",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/visitasfibra&quot;
    &lt;div class=&quot;w-full h-[calc(100dvh_-_55px)] flex flex-wrap items-center justify-center gap-20&quot; style=&quot;z-index: 0;&quot;&gt;
        &lt;AuthorizedContent&gt;
            &lt;div class=&quot;w-[200px] h-[275px] p-2 flex flex-wrap gap-[10px] rounded shadow-md bg-white cursor-pointer &quot; @onclick=&quot;@(() =&gt; _nav.NavigateTo(&quot;/visitasfibra/Visitas&quot;))&quot;&gt;
                &lt;div style=&quot;background-image: url(./Images/Index/visitas.jpg); background-size: cover;&quot; class=&quot;w-full h-[175px] rounded-md&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-full text-lg text-center text-blue-400&quot;&gt;Visitas&lt;/span&gt;
            &lt;/div&gt;
        &lt;/AuthorizedContent&gt;
        &lt;AuthorizedContent&gt;
            &lt;div class=&quot;w-[200px] h-[275px] p-2 flex flex-wrap gap-[10px] rounded shadow-md bg-white cursor-pointer &quot; @onclick=&quot;@(() =&gt; _nav.NavigateTo(&quot;/visitasfibra/Emplazamientos&quot;))&quot;&gt;
                &lt;div style=&quot;background-image: url(./Images/Index/emplazamientos.jpg); background-size: cover;&quot; class=&quot;w-full h-[175px] rounded-md&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-full text-lg text-center text-blue-400&quot;&gt;Emplazamientos&lt;/span&gt;
            &lt;/div&gt;
        &lt;/AuthorizedContent&gt;
        &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsFestivos.GetOneFestivos)&quot;&gt;
            &lt;div class=&quot;w-[200px] h-[275px] p-2 flex flex-wrap gap-[10px] rounded shadow-md bg-white cursor-pointer &quot; @onclick=&quot;@(() =&gt; _nav.NavigateTo(&quot;/visitasfibra/accesos&quot;))&quot;&gt;
                &lt;div style=&quot;background-image: url(./Images/Index/calendario.jpg); background-size: cover;&quot; class=&quot;w-full h-[175px] rounded-md&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-full text-lg text-center text-blue-400&quot;&gt;Accesos&lt;/span&gt;
            &lt;/div&gt;
        &lt;/AuthorizedContent&gt;

        &lt;AuthorizedContent Permissions=&quot;@(PermissionConstantsFestivos.GetOneFestivos)&quot;&gt;
            &lt;div class=&quot;w-[200px] h-[275px] p-2 flex flex-wrap gap-[10px] rounded shadow-md bg-white cursor-pointer &quot; @onclick=&quot;@(() =&gt; _nav.NavigateTo(&quot;/visitasfibra/accesos&quot;))&quot;&gt;
                &lt;div style=&quot;background-image: url(./Images/Index/calendario.jpg); background-size: cover;&quot; class=&quot;w-full h-[175px] rounded-md&quot;&gt;&lt;/div&gt;
                &lt;span class=&quot;w-full text-lg text-center text-blue-400&quot;&gt;Calendario&lt;/span&gt;
            &lt;/div&gt;
        &lt;/AuthorizedContent&gt;
    &lt;/div&gt;

    @code {
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (!firstRender) return;

            _main.LoginReloadAction += () =&gt; InvokeAsync(StateHasChanged);

            _main.BackgroundImage = &quot;&quot;;
        }
    }
    `
  },
  {
    "ID": 56,
    "ServicesName": "Index",
    "ServicesRoute": "Components/Areas/RedFijaF/Index",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/seguimientoredfija&quot;
    @using LPSGrupo.Components.Areas.MovilF.SeguimientoMovil.Modals
    @*&lt;AuthorizePage Roles=&quot;@(new(){&quot;RedFija.Supervisor&quot;})&quot; /&gt;*@
    &lt;div class=&quot;w-full h-fit p-6 gap-6&quot;&gt;
        &lt;!-- Encabezado con t&iacute;tulo y barra de b&uacute;squeda --&gt;
        &lt;div class=&quot;w-full p-2 flex justify-between items-center&quot;&gt;
            &lt;span class=&quot;text-blue-400 text-2xl font-bold&quot;&gt;Proyectos Red Fija&lt;/span&gt;
            &lt;input type=&quot;search&quot; class=&quot;p-2 rounded border border-slate-300/50&quot; @bind-value=&quot;SetSearch&quot; placeholder=&quot;Buscar proyecto...&quot; /&gt;
        &lt;/div&gt;

        &lt;!-- Tabla de proyectos --&gt;
        &lt;div class=&quot;w-full h-fit mt-4 overflow-x-auto&quot;&gt;
            &lt;table class=&quot;w-full border border-slate-300/50 rounded-lg text-sm&quot;&gt;
                &lt;thead class=&quot;bg-slate-100&quot;&gt;
                    &lt;tr&gt;
                        @* &lt;AuthorizedContent Roles=&quot;@([&quot;RedFija.Supervisor&quot;])&quot;&gt;*@
                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;Acciones&lt;/th&gt;
                        @*  &lt;/AuthorizedContent&gt;*@
                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;Nombre Proyecto&lt;/th&gt;
                        &lt;th class=&quot;p-2 border border-slate-300/50&quot;&gt;Cliente&lt;/th&gt;

                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                    @foreach (var v in proyectos.Where(x =&gt; !string.IsNullOrEmpty(x.NombreProyecto))
                    @*.Where(ExcludeProjects)*@
                    .OrderBy(x =&gt; x.NombreProyecto).Where(x =&gt; string.IsNullOrEmpty(Search) ? true : x.NombreProyecto.ToLower().Contains(Search.ToLower())))
                    {
                        &lt;tr class=&quot;hover:bg-slate-50&quot;&gt;
                            &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaSeguimientoObraAcciones)&quot;&gt;

                                @* &lt;AuthorizedContent Roles=&quot;@([&quot;RedFija.Supervisor&quot;])&quot;&gt;*@

                                &lt;td class=&quot;p-2 text-center border border-slate-300/50&quot;&gt;
                                    &lt;div class=&quot;flex space-x-3&quot;&gt;
                                        &lt;span class=&quot;material-symbols-outlined text-blue-400 cursor-pointer&quot; @onclick=&quot;()=&gt; OpenModalHitos(v)&quot;&gt;
                                            edit
                                        &lt;/span&gt;
                                        @*  &lt;AuthorizedContent Roles=&quot;@([&quot;Admin&quot;])&quot;&gt;*@
                                        &lt;span class=&quot;material-symbols-outlined text-blue-400 cursor-pointer&quot; @onclick=&quot;()=&gt; OpenModalProyecto(v)&quot;&gt;
                                            upload
                                        &lt;/span&gt;
                                        @* &lt;/AuthorizedContent&gt;*@
                                    &lt;/div&gt;
                                &lt;/td&gt;
                            &lt;/AuthorizedContent&gt;
                            @*&lt;/AuthorizedContent&gt;*@
                            &lt;td class=&quot;p-3 border border-slate-300/50&quot;&gt;
                                &lt;AuthorizedContent Permissions=&quot;@(Security.Permisos.PermissionConstantsLogistica.RedFijaLogisticaSeguimientoObraVerProyecto)&quot;&gt;
                                    &lt;a href=&quot;@GetProyectoLink(v)&quot; class=&quot;text-blue-400 font-bold hover:underline&quot;&gt;@v.NombreProyecto&lt;/a&gt;
                                &lt;/AuthorizedContent&gt;
                            &lt;/td&gt;


                            &lt;td class=&quot;p-3 border border-slate-300/50&quot;&gt;
                                &lt;span class=&quot;text-slate-700&quot;&gt;@v.NombreCliente&lt;/span&gt;
                            &lt;/td&gt;

                        &lt;/tr&gt;
                    }
                &lt;/tbody&gt;
            &lt;/table&gt;
        &lt;/div&gt;
    &lt;/div&gt;


    @code {
        List&lt;E_ProyectosRedFija&gt; proyectos { get; set; } = new();

        protected override async Task OnInitializedAsync()
        {
            _main.BackgroundImage = &quot;&quot;;
            await LoadProyectos();
        }

        string GetProyectoLink(E_ProyectosRedFija proyecto)
        {
            var nombre = proyecto.NombreProyecto?.ToLower();
            return nombre switch
            {
                &quot;mantenimiento&quot; =&gt; &quot;/RedFijaMantenimiento&quot;,
                &quot;palencia 5g_plan_ejec_certif&quot; =&gt; &quot;/Palencia&quot;,
                _ =&gt; $&quot;/seguimientofibra/{proyecto.Id}/{proyecto.NombreProyecto}&quot;
            };
        }



        string Search { get; set; }

        public string SetSearch
        {
            get
            {
                return Search;
                InvokeAsync(StateHasChanged);
            }
            set
            {
                Search = value;
                InvokeAsync(StateHasChanged);
            }
        }

        public E_ProyectosRedFija proyectoModal = null;

    // Func&lt;E_ProyectosRedFija, bool&gt; ExcludeProjects =&gt; (x =&gt; x.nombre != &quot;LPSESP1_1_AICT_LEG&quot; &amp;&amp; x.nombre != &quot;LPSESP1_1_AURE_LEG&quot; &amp;&amp;
    // x.nombre != &quot;LPSESP1_1_BIGM_LEG&quot; &amp;&amp; x.nombre != &quot;LPSESP1_1_CENT_LICEN&quot; &amp;&amp; x.nombre != &quot;LPSESP1_1_FIDE_AUDITORIA&quot; &amp;&amp;
    // x.nombre != &quot;LPSESP1_1_GTT_ING&quot;);

        void OpenModalHitos(E_ProyectosRedFija proyecto)
        {
            proyectoModal = proyecto;
            var modal = _modal.ShowModal(typeof(ModifyViewProyecto), new Dictionary&lt;string, object&gt;
            {
                {nameof(ModifyViewProyecto.proyecto), proyectoModal}
            }, FixedWidth: 70);

            modal.OnCloseModal += CloseModalHitos;
        }

        void CloseModalHitos(bool success)
        {
            proyectoModal = null;
            InvokeAsync(StateHasChanged);
        }

        //

        void OpenModalProyecto(E_ProyectosRedFija proyecto)
        {
            proyectoModal = proyecto;
            var modal = _modal.ShowModal(typeof(AddEditProyecto), new Dictionary&lt;string, object&gt;
            {
                {nameof(AddEditProyecto.Proyecto), proyectoModal}
            }, FixedWidth: 70);

            modal.OnCloseModal += CloseModalProyecto;
        }

        async void CloseModalProyecto(bool success)
        {
            proyectoModal = null;

            await LoadProyectos();
        }

        async Task LoadProyectos()
        {
            try
            {
            _main.IsLoading = true;

                    proyectos = await _mongoContext.Data&lt;E_ProyectosRedFija&gt;(DatabaseIdentifiers.RedFija).Find(x =&gt; true).ToListAsync(); //Optimizar -&gt; Cambiar a back

                    await InvokeAsync(StateHasChanged);
            }
            catch (Exception e)
            {
                
                await _mongoContext.RegistroError(e.Message, _user.name, _user.id, &quot;PageAccesosFibra&quot;, &quot;LoadDataAPi&quot;, DateTime.UtcNow);

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
    "ID": 57,
    "ServicesName": "MantenimientoCorrectivo",
    "ServicesRoute": "Components/Areas/RedFijaF/MantenimientoCorrectivo",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/MantenimientoCorrectivo&quot;
    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;

        &lt;h2 class=&quot;w-full text-xl text-slate-950&quot;&gt;Aqu&iacute; se pueden ver todas las obras del proyecto Mantenimiento Correctivo&lt;/h2&gt;

        &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;

            &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50&quot;&gt;
                &lt;thead&gt;
                    &lt;tr&gt;
                        &lt;th colspan=&quot;14&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            AFTTH
                        &lt;/th&gt;
                        &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Fecha inicio
                        &lt;/th&gt;
                        &lt;th colspan=&quot;12&quot; rowspan=&quot;1&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Fecha planificaci&oacute;n inicial
                        &lt;/th&gt;
                        &lt;th colspan=&quot;4&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Provincia
                        &lt;/th&gt;
                        &lt;th colspan=&quot;4&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Cabecera
                        &lt;/th&gt;
                        &lt;th colspan=&quot;11&quot; rowspan=&quot;1&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            EC quitar para Elanta
                        &lt;/th&gt;
                        &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            CTO
                        &lt;/th&gt;
                        &lt;th colspan=&quot;3&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            SlA
                        &lt;/th&gt;
                        &lt;th colspan=&quot;2&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Tipolog&iacute;a proactiva/Inc. Instalaci&oacute;n/Aver&iacute;a
                        &lt;/th&gt;
                        &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Notas
                        &lt;/th&gt;
                        &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Otros
                        &lt;/th&gt;
                        &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Comentarios ELanta_1908
                        &lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
            &lt;/table&gt;

        &lt;/div&gt;
    &lt;/div&gt;
        @code {

            public E_MantCorrectivo MantCorrectivo { get; set; }

        }
    `
  },
  {
    "ID": 58,
    "ServicesName": "MantenimientoPreventivo",
    "ServicesRoute": "Components/Areas/RedFijaF/MantenimientoPreventivo",
    "ServicesDescription": "",
    "Code": `
    @page "/MantenimientoPreventivo"
    <div class="w-full flex flex-wrap p-6 gap-3">

        <h2 class="w-full text-xl text-slate-950">Aquí se pueden ver todas las obras del proyecto Mantenimiento Preventivo</h2>

        <div class="w-full h-fit flex flex-wrap gap-3">

            <table class="table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50">
                <thead>
                    <tr>
                        <th colspan="14" rowspan="2" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            CCAA
                        </th>
                        <th colspan="6" rowspan="2" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            Provincia
                        </th>
                        <th colspan="12" rowspan="1" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            Población
                        </th>
                        <th colspan="4" rowspan="2" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            Estado
                        </th>
                        <th colspan="4" rowspan="2" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            suma de HHPP
                        </th>
                        <th colspan="11" rowspan="1" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            Nº CTO
                        </th>
                        <th colspan="6" rowspan="2" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            EC
                        </th>
                        <th colspan="3" rowspan="2" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            Precargado
                        </th>
                        <th colspan="2" rowspan="2" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            Visitada_MP
                        </th>
                        <th colspan="6" rowspan="2" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            Sin acceso_MP
                        </th>
                        <th colspan="6" rowspan="2" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            Sin instalar
                        </th>
                        <th colspan="6" rowspan="2" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            % Avance
                        </th>
                        <th colspan="6" rowspan="2" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            Acceso solicitado
                        </th>
                        <th colspan="6" rowspan="2" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            Estado cabecera
                        </th>
                        <th colspan="6" rowspan="2" class="p-2 text-sm border border-slate-300/50 min-w-[150px]">
                            Finalización
                        </th>
                    </tr>
                </thead>
            </table>

        </div>
    </div>
    @code {

        public E_MantPreventivo MantPreventivo { get; set; }

        }
    `
  },
  {
    "ID": 59,
    "ServicesName": "Palencia",
    "ServicesRoute": "Components/Areas/RedFijaF/Palencia",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/Palencia&quot;
    &lt;div class=&quot;w-full flex flex-wrap p-6 gap-3&quot;&gt;
        &lt;h2 class=&quot;w-full text-xl text-slate-950&quot;&gt;Aqu&iacute; se pueden ver todas las obras del proyecto PALENCIA 5G_PLAN_EJEC_CERTIF&lt;/h2&gt;
        &lt;div class=&quot;w-full h-fit flex flex-wrap gap-3&quot;&gt;
            &lt;table class=&quot;table-auto overflow-x-auto w-full h-fit text-sm rounded border border-slate-300/50&quot;&gt;
                &lt;thead&gt;
                    &lt;tr&gt;
                        &lt;th colspan=&quot;14&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            CCAA
                        &lt;/th&gt;
                        &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Provincia
                        &lt;/th&gt;
                        &lt;th colspan=&quot;12&quot; rowspan=&quot;1&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Poblaci&oacute;n
                        &lt;/th&gt;
                        &lt;th colspan=&quot;4&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Estado
                        &lt;/th&gt;
                        &lt;th colspan=&quot;4&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            suma de HHPP
                        &lt;/th&gt;
                        &lt;th colspan=&quot;11&quot; rowspan=&quot;1&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            N&ordm; CTO
                        &lt;/th&gt;
                        &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            EC
                        &lt;/th&gt;
                        &lt;th colspan=&quot;3&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Precargado
                        &lt;/th&gt;
                        &lt;th colspan=&quot;2&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Visitada_MP
                        &lt;/th&gt;
                        &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Sin acceso_MP
                        &lt;/th&gt;
                        &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Sin instalar
                        &lt;/th&gt;
                        &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            % Avance
                        &lt;/th&gt;
                        &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Acceso solicitado
                        &lt;/th&gt;
                        &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Estado cabecera
                        &lt;/th&gt;
                        &lt;th colspan=&quot;6&quot; rowspan=&quot;2&quot; class=&quot;p-2 text-sm border border-slate-300/50 min-w-[150px]&quot;&gt;
                            Finalizaci&oacute;n
                        &lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
            &lt;/table&gt;

        &lt;/div&gt;
    &lt;/div&gt;
    @code {

        public E_MantPreventivo MantPreventivo { get; set; }
    }
    `
  },
  {
    "ID": 60,
    "ServicesName": "RedFijaMantenimiento",
    "ServicesRoute": "Components/Areas/RedFijaF/RedFijaMantenimiento",
    "ServicesDescription": "",
    "Code": `
    @page &quot;/RedFijaMantenimiento&quot;
    @inject NavigationManager _nav

    &lt;div class=&quot;w-full h-full flex flex-col items-center justify-center gap-6 p-10&quot;&gt;
        &lt;h1 class=&quot;text-3xl font-bold text-blue-500&quot;&gt;Selecciona el tipo de mantenimiento&lt;/h1&gt;
        &lt;div class=&quot;flex gap-8 mt-4&quot;&gt;
            &lt;button class=&quot;bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-lg shadow&quot;
                    @onclick='@(() =&gt; _nav.NavigateTo(&quot;/MantenimientoCorrectivo&quot;))'&gt;
                Mantenimiento Correctivo
            &lt;/button&gt;
            &lt;button class=&quot;bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-lg shadow&quot;
                    @onclick='@(() =&gt; _nav.NavigateTo(&quot;/MantenimientoPreventivo&quot;))'&gt;
                Mantenimiento Preventivo
            &lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    @code {
        [Inject] NavigationManager NavigationManager { get; set; }
    }
    `
  }
]

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