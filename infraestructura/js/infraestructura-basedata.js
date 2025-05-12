const data = [
    {
        "ID": 1,
        "BaseDataName": "RoleDTO",
        "BaseDataRoute": "BaseData/DTO/RoleDTO",
        "BaseDataDescription": "Estas clases representan los objetos de transferencia de datos (DTOs) utilizados para manejar roles en un sistema. Incluyen una clase base RoleDTO con propiedades para el nombre del rol y sus permisos asociados. Además, hay clases específicas para crear, editar, obtener un rol por su ID y obtener roles de manera paginada. Estas clases facilitan la gestión de roles y permisos dentro de la aplicación.",
        "Code": `
        public abstract class RoleDTO : AuditableEntity<string>
        {

            public string Name { get; set; }
            public List<string> Claims { get; set; } = new();

        }

        public class AddRoleDTORequest : RoleDTO { }
        public class EditRoleDTORequest : RoleDTO { }
        public class GetOneRoleDTORequest { public string Id { get; set; } }
        public class GetPaginatedRoleDTORequest : FiltersBase { }
        `
    },
    {
        "ID": 2,
        "BaseDataName": "UserDTO.cs",
        "BaseDataRoute": "BaseData/DTO/UserDTO.cs",
        "BaseDataDescription": "Estas clases representan los DTOs utilizados para la gestión de usuarios en un sistema. Incluyen datos personales del usuario como nombre, correo electrónico y roles, así como operaciones para crear, editar y obtener usuarios. También gestionan la autenticación, recuperación y actualización de contraseñas, validación de correos electrónicos y refresco de tokens. Todo esto está diseñado para facilitar el manejo y la seguridad de usuarios dentro del sistema.",
        "Code": `
        [BsonIgnoreExtraElements]
        public abstract class UserDTO : AuditableEntity<string>
        {
            public string Username { get; set; }
            public string Name { get; set; }
            public string LastName { get; set; }
            public string Tel { get; set; }
            public string Email { get; set; }
            public string Pais { get; set; }
            public string Departamento { get; set; }
            public string ProfilePic { get; set; }
            public List<EditRoleDTORequest> Roles { get; set; } = new();
        }

        [BsonIgnoreExtraElements]
        public class AddUserDTORequest : UserDTO
        {
            public string Password { get; set; }
        }

        [BsonIgnoreExtraElements]
        public class EditUserDTORequest : UserDTO
        {
            public byte[]? profilePicData { get; set; }
            public string NamePic { get; set; }
            public bool Confirmed { get; set; }
        }

        public class GetOneUserDTORequest 
        { 
            public string Id { get; set; } 
        }

        public class GetPaginatedUserDTORequest : FiltersBase
        {
            public List<string> Roles { get; set; } = new();
        }

        public class LoginCommand
        {
            public string email { get; set; }
            public string password { get; set; }
        }

        public class ForgotPasswordCommand
        {
            public string email { get; set; }
        }

        public class NewPasswordCommand
        {
            public string newPassword { get; set; }
            public string codigoNuevaPassword { get; set; }
        }

        public class ValidateEmailCommand
        {
            public string code { get; set; }
        }

        public class GetTokenRefreshed
        {
            public string refreshToken { get; set; }
        }

        public class LoginResult
        {
            public string Token { get; set; }
            public string RefreshToken { get; set; }
        }
        `
    },
    {
        "ID": 3,
        "BaseDataName": "FixMongoDbDates",
        "BaseDataRoute": "BaseData/Helpers/FixMongoDbDates",
        "BaseDataDescription": "Las clases FixMongoDbDates y TextNormalizer ofrecen funcionalidades para mejorar la consistencia de los datos en un sistema. La clase FixMongoDbDates incluye el método estático FixDates<T>, que recorre las propiedades de un objeto y, si encuentra fechas en formato DateTime, las convierte a la hora local, ajustando así las fechas almacenadas en MongoDB que pueden estar en UTC. Por otro lado, TextNormalizer proporciona métodos estáticos como NormalizeAllText<T>, que recorre las propiedades de un objeto y, si son cadenas de texto, las normaliza mediante el método NormalizeData, transformando caracteres acentuados a sus versiones sin acento y convirtiendo el texto a mayúsculas. Estas clases ayudan a garantizar que los datos de fecha y texto en el sistema sean consistentes y estén estandarizados.",
        "Code": `
        public static class FixMongoDbDates
        {
            public static T FixDates<T>(this T obj)
            {
                var propertiesObject = obj.GetType().GetProperties();

                foreach (var v in propertiesObject)
                {
                    try
                    {
                        if (v.GetValue(obj) != null)
                        {
                            if (DateTime.TryParse(v.GetValue(obj).ToString(), out var result))
                            {
                                v.SetValue(obj, result.ToLocalTime());
                            }
                        }
                    }
                    catch (Exception)
                    {
                        continue;
                    }
                }

                var sss = string.Empty;

                return obj;
            }
        }

        public static class TextNormalizer
        {
            public static T NormalizeAllText<T>(this T obj)
            {
                var propertiesObject = obj.GetType().GetProperties().Where(x => x.Name != "Ceco");

                foreach (var v in propertiesObject)
                {
                    if (v.GetValue(obj) != null)
                    {
                        if (v.PropertyType == typeof(string))
                        {
                            v.SetValue(obj, v.GetValue(obj).ToString().NormalizeData());
                        }
                    }
                }

                return obj;
            }

            public static string NormalizeData(this string input)
            {
                string output = input.ToUpper().Replace('Á', 'A').Replace('É', 'E').Replace('Í', 'I').Replace('Ó', 'O').Replace('Ú', 'U');
                return output;
            }
        }
        `
    },
    {
        "ID": 4,
        "BaseDataName": "E_Comentarios",
        "BaseDataRoute": "BaseData/Request/E_Comentarios",
        "BaseDataDescription": "La clase E_Comentarios representa un comentario en un sistema, con propiedades para almacenar el ID del comentario, el nombre del usuario que lo hizo, la foto de perfil del usuario, el comentario en sí, y la fecha en que se hizo el comentario. Además, se utiliza el atributo [BsonIgnoreExtraElements] para que MongoDB ignore cualquier campo adicional no definido en la clase al serializar o deserializar los datos. Esta clase es útil para gestionar y almacenar comentarios de usuarios en una base de datos.",
        "Code": `
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
        "ID": 5,
        "BaseDataName": "FiltersBase",
        "BaseDataRoute": "BaseData/Request/FiltersBase",
        "BaseDataDescription": "La clase FiltersBase define una serie de filtros utilizados para realizar búsquedas y paginación de datos. Contiene propiedades como Search para términos de búsqueda, IdProyecto para filtrar por proyecto, y PageNumber y PageSize para controlar la paginación. Además, tiene DataPageNumber, que ajusta el número de página para la paginación (restando 1 a PageNumber), e Index que indica el índice del primer elemento en la página actual. La clase también incluye DateSearch para filtrar por una fecha específica y DateRangeSearch para definir un rango de fechas. En resumen, esta clase facilita la implementación de filtros y paginación en consultas de datos.",
        "Code": `
        public class FiltersBase
        {
            public string Search { get; set; }
            public string IdProyecto { get; set; }
            public int DataPageNumber => PageNumber - 1;
            public int Index { get; set; }
            public int PageNumber { get; set; }
            public int PageSize { get; set; }
            public DateTime? DateSearch { get; set; }
            public KeyValuePair<DateTime?, DateTime?> DateRangeSearch { get; set; }
        }
        `
    },
    {
        "ID": 6,
        "BaseDataName": "BaseResult",
        "BaseDataRoute": "BaseData/Response/BaseResult",
        "BaseDataDescription": "La clase BaseResult representa el resultado de una operación o acción, y contiene varias propiedades que permiten gestionar el estado de la misma. IsSuccess es un valor booleano que indica si la operación fue exitosa. ValidationErrors es un diccionario que almacena errores de validación, con claves como el nombre del campo y valores que describen el error. Errors es una lista de mensajes de error generales, mientras que Messages contiene mensajes informativos o de éxito. Finalmente, Codigo es un campo opcional que puede contener un código adicional asociado al resultado de la operación. Esta clase facilita la gestión y el seguimiento de los resultados de operaciones, incluyendo errores y mensajes.",
        "Code": `
        public class BaseResult
        {
            public bool IsSuccess { get; set; }
            public Dictionary<string, string> ValidationErrors { get; set; }
            public List<string> Errors { get; set; }
            public List<string> Messages { get; set; }
            public string? Codigo { get; set; }
        }

        `
    },
    {
        "ID": 7,
        "BaseDataName": "FileData",
        "BaseDataRoute": "BaseData/Response/FileData",
        "BaseDataDescription": "La clase FileData representa los datos de un archivo, incluyendo su contenido y metadatos. La propiedad Bytes es un arreglo de bytes que almacena el contenido del archivo. Name es una cadena que contiene el nombre del archivo, y MediaType especifica el tipo de medio o formato del archivo (por ejemplo, image/jpeg o application/pdf). Esta clase se utiliza para gestionar y transferir archivos de manera estructurada en el sistema.",
        "Code": `
        public class FileData
        {
            public byte[] Bytes { get; set; }
            public string Name { get; set; }
            public string MediaType { get; set; }
        }
        `
    },
    {
        "ID": 8,
        "BaseDataName": "PaginatedResult",
        "BaseDataRoute": "BaseData/Response/PaginatedResult",
        "BaseDataDescription": "La clase PaginatedResult<TListMinifiedDto> extiende de BaseResult y representa el resultado de una operación de paginación. Contiene propiedades como CountAllDocuments (número total de documentos), ActualPage (número de la página actual), PageCount (número total de páginas), y Documents (lista de documentos paginados). Además, incluye dos métodos estáticos: Success: Devuelve un resultado exitoso con los datos, número total de documentos, página actual y total de páginas. Fail: Devuelve un resultado fallido, con 0 documentos y el estado de la operación como no exitoso. Esta clase facilita la gestión de resultados paginados, proporcionando tanto los datos como información sobre el estado y la paginación de la operación.",

        "Code": `
        public class PaginatedResult<TListMinifiedDto> : BaseResult
        {
            public long CountAllDocuments { get; set; }
            public int ActualPage { get; set; }
            public int PageCount { get; set; }
            public List<TListMinifiedDto> Documents { get; set; }

            public static PaginatedResult<TListMinifiedDto> Success(List<TListMinifiedDto> data = default,
                List<string> errors = default,
                List<string> messages = default, long countDocs = default, int actualPage = default, int pageSize = default)
            {
                return new PaginatedResult<TListMinifiedDto>
                {
                    CountAllDocuments = countDocs,
                    Errors = errors,
                    Messages = messages,
                    Documents = data,
                    IsSuccess = true,
                    ActualPage = actualPage,
                    PageCount = (int)Math.Ceiling(countDocs / (double)pageSize)
                };
            }

            public static PaginatedResult<TListMinifiedDto> Fail(List<string> errors = default, List<string> messages = default)
            {
                return new PaginatedResult<TListMinifiedDto>
                {
                    CountAllDocuments = 0,
                    Errors = errors,
                    Messages = messages,
                    Documents = default,
                    IsSuccess = false
                };
            }
        }

        `
    },
    {
        "ID": 9,
        "BaseDataName": "Result",
        "BaseDataRoute": "BaseData/Response/Result",
        "BaseDataDescription": "La clase Result<T> extiende de BaseResult y está diseñada para encapsular el resultado de una operación que devuelve un valor de tipo genérico T. Además de las propiedades heredadas de BaseResult (como IsSuccess, Errors, Messages, etc.), tiene una propiedad adicional llamada Value, que almacena el valor resultante de la operación. La clase proporciona tres métodos estáticos: Success: Devuelve un resultado exitoso con un valor de tipo T, además de permitir la inclusión de errores de validación, errores generales y mensajes. Fail: Devuelve un resultado fallido, con el valor Value establecido a default y con la posibilidad de incluir errores de validación, errores generales y mensajes. Error: Un método estático que lanza una excepción NotImplementedException, pero está definido para manejar un caso de error específico con un valor de tipo string. En resumen, esta clase facilita el manejo de operaciones que retornan un valor, permitiendo un control detallado del éxito o fracaso de la operación, y la inclusión de mensajes y errores asociados.",
        "Code": `
        public class Result<T> : BaseResult
        {
            public T Value { get; set; }

            public static Result<T> Success(T value = default, Dictionary<string, string> validationErrors = default,
                List<string> errors = default,
                List<string> messages = default)
            {
                return new Result<T>
                {
                    IsSuccess = true,
                    ValidationErrors = validationErrors,
                    Errors = errors,
                    Messages = messages,
                    Value = value
                };
            }

            public static Result<T> Fail(Dictionary<string, string> validationErrors = default, List<string> errors = default,
                List<string> messages = default)
            {
                return new Result<T>
                {
                    IsSuccess = false,
                    ValidationErrors = validationErrors,
                    Errors = errors,
                    Messages = messages,
                    Value = default
                };
            }

            public static Result<string> Error(string v)
            {
                throw new NotImplementedException();
            }
        }
        `
    },
    {
        "ID": 10,
        "BaseDataName": "AuditableEntitiy",
        "BaseDataRoute": "BaseData/AuditableEntity",
        "BaseDataDescription": "La clase AuditableEntity<T> proporciona seguimiento de auditoría para las entidades, almacenando el ID de la entidad, junto con detalles de creación (CreatedBy, CreatedOn) y modificación (ModifiedBy, ModifiedOn). Registra quién realizó las acciones y las fechas de creación y última modificación, permitiendo un historial completo de cambios en la entidad. Esto es útil para garantizar la trazabilidad y control de los datos. Estas propiedades permiten hacer un seguimiento completo de quién y cuándo creó o modificó una entidad, lo cual es esencial para mantener un historial de auditoría y garantizar la trazabilidad de los datos en sistemas donde es importante registrar cada cambio.",
        "Code": `
        public class AuditableEntity<T>
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public T Id { get; set; }
            public string CreatedBy { get; set; } = "";
            public string CreatedByName { get; set; } = "";
            public DateTime CreatedOn { get; set; }
            public string ModifiedBy { get; set; } = "";
            public string ModifiedByName { get; set; } = "";
            public DateTime? ModifiedOn { get; set; }
        }
        `
    }
];

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
                        <h2 class="app-title"><i class="fa-solid fa-cube"></i> ${app.BaseDataName}</h2>
                        <p class="app-description">${app.BaseDataDescription}</p>
                      
                    </div>
                    <div class="code-container">
                        <div class="code-header">
                            <span class="code-title">${app.BaseDataName}.cs</span>
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
        app.BaseDataName.toLowerCase().includes(searchTerm) ||
        app.BaseDataDescription.toLowerCase().includes(searchTerm) ||
        app.BaseDataRoute.toLowerCase().includes(searchTerm)
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