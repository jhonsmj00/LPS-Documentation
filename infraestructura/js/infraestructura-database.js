const data = [
    {
        "ID": 1,
        "DatabaseName": "MailConfiguration",
        "DatabaseRoute": "Database/Configuration/MailConfiguration",
        "DatabaseDescription": "Este código define una clase MailConfiguration en C# que sirve para almacenar la configuración de un servidor de correo electrónico. Contiene propiedades como la dirección de correo de origen (From), el servidor de correo (Host), el puerto (Port), las credenciales de acceso (UserName, Password), el nombre que se mostrará como remitente (DisplayName), los archivos adjuntos permitidos (AttachmentsAllowed) y la información de origen (Origin). Estas propiedades permiten configurar la conexión y las restricciones relacionadas con el envío de correos electrónicos.",
        "Code": `
        namespace Database.Configuration
        {
            public class MailConfiguration
            {
                public string From { get; set; }
                public string Host { get; set; }
                public int Port { get; set; }
                public string UserName { get; set; }
                public string Password { get; set; }
                public string DisplayName { get; set; }
                public string AttachmentsAllowed { get; set; }
                public string Origin { get; set; }
            }
        }
        `
    },
    {
        "ID": 2,
        "DatabaseName": "MongoDBConnection",
        "DatabaseRoute": "Database/Configuration/MongoDBConnection",
        "DatabaseDescription": "Este código define una clase MongoDBConnection en C#, que está destinada a almacenar la configuración necesaria para conectarse a una base de datos MongoDB. La clase contiene dos propiedades: ConnectionString, que guarda la cadena de conexión a la base de datos, y Database, que especifica el nombre de la base de datos a la que se desea acceder. Estas propiedades facilitan la conexión y gestión de las operaciones con MongoDB en una aplicación.",
        "Code": `
        namespace Database.Configuration
        {
            public class MongoDBConnection
            {
                public string ConnectionString { get; set; }
                public string Database { get; set; }
            }
        }
        `
    },
    {
        "ID": 3,
        "DatabaseName": "MongoContext",
        "DatabaseRoute": "Database/Context/MongoContext",
        "DatabaseDescription": `
Este código define la clase MongoContext, que implementa la interfaz IMongoContext y actúa como un contexto de acceso a datos en MongoDB. Esta clase facilita la conexión y las operaciones CRUD en la base de datos MongoDB, incorporando además funcionalidades de auditoría.
<br><br><span class="font-bold"> 1. Conexión a MongoDB:</span> Se configura un cliente MongoClient utilizando una cadena de conexión proporcionada en el objeto MongoDBConnection que se inyecta mediante IOptions<MongoDBConnection>.
<br><span class="font-bold"> 2. Operaciones CRUD Auditable:</span> Los métodos como InsertOneAuditableAsync, ReplaceOneAuditableAsync y UpdateOneAuditableAsync permiten insertar, reemplazar y actualizar documentos en MongoDB, agregando información de auditoría (usuario y fecha de creación/modificación).
<br><span class="font-bold"> 3. Obtención de Colecciones:</span> La clase también permite acceder a colecciones de MongoDB de manera genérica mediante el método Data<T>, y colecciones específicas usando GenericData<T>.
<br><span class="font-bold"> 4. Auditoría de Datos:</span> Las operaciones de inserción y actualización almacenan información sobre quién realiza la acción (usuario actual) y cuándo se realiza (fecha y hora).
<br><br>En resumen, MongoContext es un componente que gestiona la conexión y operaciones con MongoDB, implementando prácticas de auditoría para seguir el rastro de cambios en los documentos.
        `,
        "Code": `
        public class MongoContext : IMongoContext
        {
            MongoClient mongoClient { get; set; }
            public UserService currentUser { get; set; }

            public MongoContext(IOptions<MongoDBConnection> opts, UserService currentUser)
            {
                var settings = MongoClientSettings.FromConnectionString(opts.Value.ConnectionString);
                settings.AllowInsecureTls =  true;
                mongoClient = new MongoClient(settings);
                this.currentUser = currentUser;
            }

            public IMongoCollection<T> Data<T>(string database) where T : AuditableEntity<string> => mongoClient.GetDatabase(database)
                .GetCollection<T>(typeof(T).Name.Replace("E_", ""));

            public async Task InsertOneAuditableAsync<T>(T entity, string Database) where T : AuditableEntity<string>
            {
                entity.CreatedBy = currentUser.id ?? "";
                entity.CreatedByName = $"{currentUser.name} {currentUser.surname}" ?? "";
                entity.CreatedOn = DateTime.Now;
                await Data<T>(Database).InsertOneAsync(entity);
            }

            public async Task ReplaceOneAuditableAsync<T>(T entity, string Database) where T : AuditableEntity<string>
            {
                entity.ModifiedBy = currentUser.id ?? "";
                entity.ModifiedByName = $"{currentUser.name} {currentUser.surname}" ?? "";
                entity.ModifiedOn = DateTime.Now;
                await Data<T>(Database).ReplaceOneAsync(x => x.Id == entity.Id, entity);
            }

            public async Task UpdateOneAuditableAsync<T>(string database, string id, UpdateDefinition<T> update) where T : AuditableEntity<string>
            {
                // Añadir información de auditoría
                var auditUpdate = Builders<T>.Update
                    .Set(x => x.ModifiedBy, currentUser.id ?? "")
                    .Set(x => x.ModifiedByName, $"{currentUser.name} {currentUser.surname}" ?? "")
                    .Set(x => x.ModifiedOn, DateTime.Now);

                // Combinar las actualizaciones de auditoría con las actualizaciones específicas del documento
                var combinedUpdate = Builders<T>.Update.Combine(update, auditUpdate);

                // Realizar la actualización en la base de datos
                var result = await Data<T>(database).UpdateOneAsync(x => x.Id == id, combinedUpdate);

                // Verificar si la operación fue exitosa
                if (result.ModifiedCount == 0)
                {
                    throw new Exception($"No se encontró el documento con Id {id} para actualizar.");
                }
            }

            public UserService CurrentUser() => currentUser;

            public IMongoCollection<T> GenericData<T>(string database, string collectionName)
            {
                return mongoClient.GetDatabase(database).GetCollection<T>(collectionName);
            }
        }
        `
    },
    {
        "ID": 4,
        "DatabaseName": "UseMongoContext",
        "DatabaseRoute": "Database/Context/UseMongoContext",
        "DatabaseDescription": `
        Este código define la clase UserMongoContext, que gestiona la conexión y el acceso a la colección de usuarios en una base de datos MongoDB. A continuación se describe el funcionamiento de la clase:
<br><br><span class="font-bold"> 1. Conexión a MongoDB: </span> En el constructor de la clase, se configura un cliente de MongoDB (MongoClient) utilizando una cadena de conexión específica, que apunta a una base de datos en la nube (MongoDB Atlas). La opción AllowInsecureTls = true permite conexiones TLS no seguras, lo cual no es recomendable para entornos de producción.
<br><span class="font-bold"> 2. Acceso a Colección de Usuarios: </span> Después de establecer la conexión con MongoDB, la clase obtiene la base de datos llamada "Main" y la colección "User" donde se almacenan los documentos de tipo E_User. La propiedad Users expone esta colección para que pueda ser utilizada en otras partes de la aplicación.
<br><br>En resumen, la clase UserMongoContext facilita la interacción con la colección "User" en MongoDB, específicamente para trabajar con documentos de tipo E_User, proporcionando acceso a esta colección a través de la propiedad Users.
        `,
        "Code": `
        public class UserMongoContext
        {
            public IMongoCollection<E_User> Users { get; set; }

            public UserMongoContext()
            {
                var settings = MongoClientSettings.FromConnectionString("mongodb+srv://LPSsa:LPSsa_dev2023@lpsgrupo.i5zrwjg.mongodb.net/");
                settings.AllowInsecureTls = true;

                var mongoClient = new MongoClient(settings);

                Users = mongoClient.GetDatabase("Main").GetCollection<E_User>("User");
            }
        }
        `
    },
    {
        "ID": 5,
        "DatabaseName": "DeleteRole",
        "DatabaseRoute": "Database/Entities/Helpers/DeleteRole",
        "DatabaseDescription": `
Este código define un método estático en una clase Delete, que se utiliza para eliminar un perfil (presumiblemente un rol o tipo de usuario) de una base de datos MongoDB. A continuación, se detalla su funcionamiento:

<br><br><span class="font-bold">Método DeletePerfil:</span>
<br>Este es un método de extensión para IMongoContext que permite eliminar un documento de la colección E_Role en la base de datos MongoDB, basándose en el identificador único del rol (id).

<br><br><span class="font-bold">Operación de eliminación:</span>
<br>Utiliza el método DeleteOneAsync de MongoDB para eliminar un solo documento de la colección E_Role. La eliminación se basa en un filtro que verifica si el campo Id del documento coincide con el id proporcionado.
<br>La expresión Builders<E_Role>.Filter.Where(x => x.Id == id) genera el filtro que se aplica a la búsqueda del documento a eliminar.
<br>Después de realizar la eliminación, el método retorna un resultado de tipo Result<string>, utilizando el método Success() para indicar que la operación fue exitosa.

<br><br><span class="font-bold">Resultado de la operación:</span>
El método DeletePerfil devuelve un objeto de tipo Result<string>. Este objeto parece ser una forma estandarizada de representar el resultado de la operación (posiblemente para manejar el éxito o el error de manera más estructurada).
Result<string>.Success() indica que la eliminación del perfil fue exitosa. Es probable que la clase Result<T> se utilice para envolver resultados, errores o estados de éxito en la aplicación.
        `,
        "Code": `
        public static class Delete
        {
            public static async Task<Result<string>> DeletePerfil(this IMongoContext mongoContext, string id)
            {
                await mongoContext.Data<E_Role>(DatabaseIdentifiers.Main).DeleteOneAsync(Builders<E_Role>.Filter.Where(x => x.Id == id));
                return Result<string>.Success();
            }
        }
        `
    },
    {
        "ID": 6,
        "DatabaseName": "DeleteUser",
        "DatabaseRoute": "Database/Entities/Helpers/DeleteUser",
        "DatabaseDescription": `
Este código define una clase estática DeleteUsuario que contiene métodos para eliminar usuarios y actualizar el estado de confirmación de un usuario en una base de datos MongoDB. A continuación, se explica el funcionamiento detallado de cada método:
<br><br><span class="font-bold">DeleteUser:</span> Elimina un usuario de la base de datos MongoDB según su id.
<br><span class="font-bold">ToggleUserConfirmed:</span> Actualiza el estado de confirmación (Confirmed) de un usuario, cambiando su valor a true o false.
<br><br>Ambos métodos usan el patrón Result<T> para devolver el resultado de la operación, lo que parece ser una forma de manejar resultados exitosos (o tal vez errores, aunque no se muestra explícitamente aquí). En ambos casos, el método devuelve Result<string>.Success(), indicando que la operación fue exitosa.
        `,
        "Code": `
        public static class DeleteUsuario
        {
            public static async Task<Result<string>> DeleteUser(this IMongoContext mongoContext, string id)
            {
                await mongoContext.Data<E_User>(DatabaseIdentifiers.Main).DeleteOneAsync(Builders<E_User>.Filter.Where(x => x.Id == id));
                return Result<string>.Success();
            }

            public static async Task<Result<string>> ToggleUserConfirmed(this IMongoContext mongoContext, string id, bool newConfirmedStatus)
            {
                var update = Builders<E_User>.Update.Set(x => x.Confirmed, newConfirmedStatus);
                var result = await mongoContext.Data<E_User>(DatabaseIdentifiers.Main)
                        .UpdateOneAsync(Builders<E_User>.Filter.Where(x => x.Id == id), update);

                if (result.ModifiedCount > 0)
                    return Result<string>.Success("Estado actualizado correctamente.");
            
                return Result<string>.Success();
            }
        }
        `
    },
    {
        "ID": 7,
        "DatabaseName": "GetOneRole",
        "DatabaseRoute": "Database/Entities/Helpers/GetOneRole",
        "DatabaseDescription": `
Este código define un conjunto de métodos estáticos en la clase GetOneRole que se utilizan para obtener roles (E_Role) de una base de datos MongoDB. A continuación se detalla el funcionamiento de cada uno de los métodos:

<br><br><span class="font-bold">GetOneRoles:</span> Busca y retorna un único rol de la base de datos MongoDB basándose en el id. Si el rol no existe, el resultado será null.
<br><span class="font-bold">GetAllRoles:</span> Obtiene todos los roles de la base de datos MongoDB y los retorna como una lista.
<br><br>Ambos métodos envuelven sus resultados en un tipo Result<T>, lo que parece ser una manera de estructurar el resultado de la operación, proporcionando un patrón consistente para manejar respuestas exitosas. El uso de Result<T>.Success(data) indica que la operación fue exitosa y devuelve el objeto correspondiente.
        `,
        "Code": `
        public static partial class GetOneRole
        {
            public static async Task<Result<E_Role>> GetOneRoles(this IMongoContext mongoContext, string id)
            {
                var data = await mongoContext.Data<E_Role>(DatabaseIdentifiers.Main).Find(x => x.Id == id).FirstOrDefaultAsync();
                return Result<E_Role>.Success(data);
            }

            public static async Task<Result<List<E_Role>>> GetAllRoles(this IMongoContext mongoContext)
            {
                var data = await mongoContext.Data<E_Role>(DatabaseIdentifiers.Main)
                    .Find(_ => true)
                    .ToListAsync();
                return Result<List<E_Role>>.Success(data);
            }
        }
        `
    },
    {
        "ID": 8,
        "DatabaseName": "GetOneUser",
        "DatabaseRoute": "Database/Entities/Helpers/GetOneUser",
        "DatabaseDescription": `
Este código define un método estático GetOneUsers en la clase GetOneUser, que se utiliza para obtener un usuario (E_User) desde una base de datos MongoDB utilizando el identificador (id). A continuación se explica el funcionamiento de este método:
<br><br><span class="font-bold">GetOneUsers:</span> Este método busca y retorna un único usuario de la base de datos MongoDB utilizando el identificador id. Si el usuario no es encontrado, el resultado será null.
<br><span class="font-bold">Resultado:</span> El método devuelve un Result<E_User>, que encapsula el usuario encontrado o null si no se encuentra el usuario.
<br><br>Este patrón permite manejar el resultado de manera uniforme y consistente, proporcionando un manejo adecuado de respuestas exitosas y probablemente errores, aunque en este fragmento no se manejen explícitamente.
        `,
        "Code": `
        public static partial class GetOneUser
        {
            public static async Task<Result<E_User>> GetOneUsers(this IMongoContext mongoContext, string id)
            {
                var data = await mongoContext.Data<E_User>(DatabaseIdentifiers.Main).Find(x => x.Id == id).FirstOrDefaultAsync();
                return Result<E_User>.Success(data);
            }
        }
        `
    },
    {
        "ID": 9,
        "DatabaseName": "E_ErrorServices",
        "DatabaseRoute": "Database/Entities/E_ErrorServices",
        "DatabaseDescription": `
Este código define una clase E_ErrorServices y un método de extensión RegistroError para registrar errores en una base de datos MongoDB. A continuación se explica cada parte del código:        
<br><br><span class="font-bold">E_ErrorServices</span> es una clase que representa un error registrado en el sistema, con propiedades que incluyen el mensaje de error, el usuario involucrado, el componente afectado, la acción ejecutada y la fecha/hora del error.
<br><br><span class="font-bold">RegistroError</span> es un método de extensión que crea y guarda un registro de error en la base de datos MongoDB, incluyendo información adicional como la hora exacta en que ocurrió el error y quién estaba conectado en ese momento.
        `,
        "Code": `
        [BsonIgnoreExtraElements]
        public class  E_ErrorServices : AuditableEntity<string>
        {
            public string MessageError { get; set; }
            public string UsuarioConectado { get; set; }
            public string IdUsuarioConectado { get; set; }
            public string ComnponenteAfectado { get; set; }
            public string AccionEjecutada { get; set; }
            public DateTime MomentoSuceso { get; set; }
        }

        public static partial class Add 
        {
            public static async Task RegistroError(this IMongoContext mongoContext, string messageError, string usuarioConectado, string idUsuarioConectado, string componenteAfectado, string accionEjecutada, DateTime momentoSuceso)
            {
                await mongoContext.InsertOneAuditableAsync<E_ErrorServices>(new E_ErrorServices()
                {
                    MessageError = messageError,
                    UsuarioConectado = usuarioConectado,
                    ComnponenteAfectado = componenteAfectado,
                    AccionEjecutada = accionEjecutada,
                    MomentoSuceso = DateTime.UtcNow,
                    IdUsuarioConectado = idUsuarioConectado
                }, DatabaseIdentifiers.RegistroErrores);
            }
        }
        `
    },
    {
        "ID": 10,
        "DatabaseName": "E_Role",
        "DatabaseRoute": "Database/Entities/E_Role",
        "DatabaseDescription": `
El código define una clase E_Role que representa un rol en el sistema, utilizado para gestionar permisos o accesos. Esta clase hereda de AuditableEntity<string>, lo que le proporciona automáticamente características de auditoría, como información sobre cuándo y quién creó o modificó el rol.
<br><br><span class="font-bold">E_Role</span> representa un rol dentro de un sistema, con propiedades para el nombre del rol, sus claims (permisos), y una bandera <span class="font-bold">Selected</span> para marcar si el rol está activo o seleccionado.
<br>Al heredar de <span class="font-bold">AuditableEntity<string></span>, también tiene capacidades de auditoría, lo que facilita el seguimiento de cuándo y quién creó o modificó el rol.
        `,
        "Code": `
        [BsonIgnoreExtraElements]
        public class E_Role : AuditableEntity<string>
        {
            public string Name { get; set; }
            public List<string> Claims { get; set; }
            public bool Selected { get; set; } = false;
        }
        `
    },
    {
        "ID": 11,
        "DatabaseName": "E_User",
        "DatabaseRoute": "Database/Entities/E_User",
        "DatabaseDescription": `
Este código define la clase E_User, que representa a un usuario en el sistema. Hereda de <span class="font-bold">AuditableEntity<string></span>, lo que le proporciona propiedades de auditoría como <span class="font-bold">CreatedBy, CreatedOn, ModifiedBy, y ModifiedOn</span>.
<br><br><span class="font-bold">E_User</span> modela un usuario del sistema con información personal, contacto, roles y estado de confirmación.
<br>Es compatible con MongoDB gracias a BsonIgnoreExtraElements.
La herencia de AuditableEntity<string> permite registrar quién creó o modificó el usuario y cuándo.
        `,
        "Code": `
        [BsonIgnoreExtraElements]
        public class E_User : AuditableEntity<string>
        {
            public string Username { get; set; }
            public string Name { get; set; }
            public string LastName { get; set; }
            public string Tel { get; set; }
            public string Email { get; set; }
            public string Pais { get; set; }
            public string Departamento { get; set; }
            public string ProfilePic { get; set; }
            public List<E_Role> Roles { get; set; }
            public bool Confirmed { get; set; } = true;
        }
        `
    },
    {
        "ID": 12,
        "DatabaseName": "ICurrentUserServices",
        "DatabaseRoute": "Databases/Interfaces/ICurrentUserServices",
        "DatabaseDescription": `
        La interfaz <span class="font-bold">ICurrentUserService</span>, ubicada en el espacio de nombres <span class="font-bold">Database.Interfaces</span>, define un contrato para acceder a la información del usuario actualmente autenticado en el sistema.
        <br><br>Incluye propiedades de solo lectura que permiten obtener el identificador único del usuario <span class="font-bold">(UserId)</span>, su nombre, apellido, correo electrónico, número de teléfono, imagen de perfil <span class="font-bold">(ProfilePic)</span> y una lista de roles o permisos representados como objetos <span class="font-bold">Claim</span>. 
        <br><br>Esta interfaz se utiliza comúnmente en aplicaciones web o APIs para facilitar la inyección de la identidad del usuario en los servicios, lo cual es esencial para el control de acceso, auditoría y personalización de contenido.
        `,
        "Code": `
        namespace Database.Interfaces
        {
            public interface ICurrentUserService
            {
                public string UserId { get; }
                public string Name { get; }
                public string SurName { get; }
                public string Email { get; }
                public string MobilePhone { get; }
                public string ProfilePic { get; }
                public List<Claim> Roles { get; }
            }
        }
        `
    },
    {
        "ID": 13,
        "DatabaseName": "IMongoContext",
        "DatabaseRoute": "Databases/Interfaces/IMongoContext",
        "DatabaseDescription": `
        La interfaz <span class="font-bold">IMongoContext</span>, ubicada en el namespace <span class="font-bold">Database.Interfaces</span>, define un contrato para interactuar con una base de datos MongoDB desde la aplicación. 
        Proporciona métodos genéricos para acceder a colecciones <span class="font-bold">(GenericData y Data)</span>, así como para insertar, reemplazar y actualizar documentos con control de auditoría. 
        Además, expone el servicio del usuario actual <span class="font-bold">(CurrentUser)</span> para registrar acciones realizadas por ese usuario.
        Esta interfaz es clave para centralizar y estandarizar las operaciones con MongoDB dentro de la arquitectura de la aplicación.
        `,
        "Code": `
        namespace Database.Interfaces
        {
            public interface IMongoContext
            {
                public IMongoCollection<T> GenericData<T>(string database, string collectionName);
                public IMongoCollection<T> Data<T>(string Database) where T : AuditableEntity<string>;
                public UserService CurrentUser();
                public Task InsertOneAuditableAsync<T>(T entity, string Database) where T : AuditableEntity<string>;
                public Task ReplaceOneAuditableAsync<T>(T entity, string Database) where T : AuditableEntity<string>;
                public Task UpdateOneAuditableAsync<T>(string database, string id, UpdateDefinition<T> update) where T : AuditableEntity<string>;
            }
        }
        `
    },
    {
        "ID": 14,
        "DatabaseName": "DatabaseIdentifiers",
        "DatabaseRoute": "Databases/Miscellaneous/DatabaseIdentifiers",
        "DatabaseDescription": `
La clase <span class="font-bold">DatabaseIdentifiers</span> contiene una serie de constantes de tipo <span class="font-bold">string</span> que representan los nombres de diferentes bases de datos o colecciones dentro del sistema. 
<br><br>Estas constantes son utilizadas para hacer referencia de manera centralizada y consistente a los diferentes contextos de base de datos, como "Main", "Soporte", "Contrataciones", etc.
<br><br><span class="font-bold">Propiedades:</span>
<br><span class="font-bold">Main:</span> Representa la base de datos principal del sistema.
<br><span class="font-bold">Soporte:</span> Representar una base de datos relacionada con el soporte o atención al cliente.
<br><span class="font-bold">Contrataciones:</span> Relacionada con procesos de contratación o recursos humanos.
<br><span class="font-bold">Movil:</span> Relacionada con operaciones o servicios móviles.
<br><span class="font-bold">RedFija:</span> Relacionada con servicios de red fija.
<br><span class="font-bold">Forms:</span> Relacionada con formularios o encuestas.
<br><span class="font-bold">Coche:</span> Relacionada con información de vehículos.
<br><span class="font-bold">Delegacion:</span> Referencia a bases de datos de delegaciones o sedes.
<br><span class="font-bold">Imagen:</span> Probablemente asociada con almacenamiento o gestión de imágenes.
<br><span class="font-bold">Registro Errores:</span> Se utiliza para almacenar registros de errores o incidencias en el sistema.
        `,
        "Code": `
        public class DatabaseIdentifiers
        {
            public const string Main = "Main";
            public const string Soporte = "Soporte";
            public const string Contrataciones = "Contrataciones";
            public const string Movil = "Movil";
            public const string RedFija = "RedFija";
            public const string Forms = "Forms";
            public const string Coche = "Coche";
            public const string Delegacion = "Delegacion";
            public const string Imagen = "Imagen";
            public const string RegistroErrores = "RegistroErrores";
        }
        `
    },
    {
        "ID": 15,
        "DatabaseName": "Encryptor",
        "DatabaseRoute": "Databases/Miscellaneous/Encryptor",
        "DatabaseDescription": `
La clase Encryptor proporciona métodos estáticos para cifrar y descifrar cadenas de texto utilizando el algoritmo AES (Advanced Encryption Standard) en modo de cifrado simétrico. Utiliza una clave (key) y un vector de inicialización (iv) constantes para realizar los procesos de cifrado y descifrado.

<br><br><span class="font-bold">Descripción:</span>
<br><span class="font-bold">Atributos:</span>
<br><span class="font-bold">key y iv:</span>
Son valores predefinidos (en formato hexadecimal) utilizados como clave de cifrado y vector de inicialización en el proceso AES. key tiene 32 bytes y iv tiene 16 bytes, lo que es estándar para AES-256.

<br><br><span class="font-bold">Métodos:</span>
<br><span class="font-bold">Encrypt:</span>

<br><br><span class="font-bold">Entrada:</span> Una cadena de texto (input) que se desea cifrar.
<br><span class="font-bold">Proceso:</span> Convierte la clave y el IV de formato hexadecimal a bytes, luego utiliza el algoritmo AES para cifrar el texto de entrada. Se utiliza un CryptoStream para escribir los datos cifrados a un MemoryStream, y luego se convierte el resultado a una cadena en base64.
<br><span class="font-bold">Salida:</span> Retorna el texto cifrado en formato Base64.

<br><br><span class="font-bold">Decrypt:</span>

<br><span class="font-bold">Entrada:</span> Una cadena de texto cifrada en formato Base64 (input).
<br><span class="font-bold">Proceso:</span> Convierte el texto cifrado de base64 a bytes y utiliza el mismo algoritmo AES con la misma clave y IV para descifrar el texto. El CryptoStream descifra los datos y el resultado se convierte a texto usando la codificación Unicode.
<br><span class="font-bold">Salida:</span> Retorna el texto descifrado.
        `,
        "Code": `
        public static class Encryptor
        {
            private static readonly string key = "78214125442A462D4A614E645267556B58703273357638792F423F4528482B4B";
            private static readonly string iv = "33743677397A24432646294A404E6351";

            public static async Task<string> Encrypt(string input)
            {
                var keyHash = Convert.FromHexString(key);
                var ivHash = Convert.FromHexString(iv);

                var crypto = Aes.Create();

                crypto.Key = keyHash;
                crypto.IV = ivHash;

                var bytesInput = Encoding.Unicode.GetBytes(input);

                var ms = new MemoryStream();
                var cs = new CryptoStream(ms, crypto.CreateEncryptor(), CryptoStreamMode.Write);
                await cs.WriteAsync(bytesInput, 0, bytesInput.Length);
                await cs.FlushFinalBlockAsync();

                cs.Close();
                ms.Close();

                return Convert.ToBase64String(ms.ToArray());
            }

            public static async Task<string> Decrypt(string input)
            {
                var keyHash = Convert.FromHexString(key);
                var ivHash = Convert.FromHexString(iv);
                var crypto = Aes.Create();

                crypto.Key = keyHash;
                crypto.IV = ivHash;

                var bytesInput = Convert.FromBase64String(input);

                var ms = new MemoryStream();
                var cs = new CryptoStream(ms, crypto.CreateDecryptor(), CryptoStreamMode.Write);
                await cs.WriteAsync(bytesInput, 0, bytesInput.Length);
                await cs.FlushFinalBlockAsync();

                cs.Close();
                ms.Close();

                return Encoding.Unicode.GetString(ms.ToArray());
            }
        }
        `
    },
    {
        "ID": 16,
        "DatabaseName": "Misc",
        "DatabaseRoute": "Databases/Miscellaneous/Misc",
        "DatabaseDescription": `
        La clase <span class="font-bold">Misc</span> contiene un método estático <span class="font-bold">CodeGenerator</span> que genera una cadena aleatoria de una longitud especificada, compuesta por caracteres alfanuméricos (letras mayúsculas, minúsculas y números).
        <br>El método <span class="font-bold">CodeGenerator</span> proporciona una forma fácil de generar códigos aleatorios de longitud personalizada que pueden ser utilizados en diversas situaciones como generar claves de acceso, tokens temporales, o identificadores únicos.
        `,
        "Code": `
        namespace Database.Miscellaneous
        {
            public static class Misc
            {
                public static string CodeGenerator(int length)
                {
                    var sb = new StringBuilder();
                    var charsAccepted = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

                    for (var i = 0; i <= length - 1; i++) sb.Append(charsAccepted[Random.Shared.Next(0, charsAccepted.Length)]);
                    return sb.ToString();
                }
            }
        }
        `
    },
    {
        "ID": 17,
        "DatabaseName": "UserServices",
        "DatabaseRoute": "Databases/Services/ImportsServices/UserServices",
        "DatabaseDescription": `
La clase <span class="font-bold">UserService</span> maneja la autenticación del usuario y el manejo de tokens JWT.
<br><br>Ofrece métodos para verificar la validez del token <span class="font-bold">(CheckTokenIsValid)</span> y para extraer las propiedades del usuario del token JWT <span class="font-bold">(ReadJWTProperties)</span>.
<br><br>Utiliza la biblioteca <span class="font-bold">System.IdentityModel.Tokens.Jwt</span> para trabajar con JWTs y realizar validaciones de firma.
        `,
        "Code": `
        public class UserService
        {
            public string id { get; set; }
            public string email { get; set; }
            public string name { get; set; }
            public string surname { get; set; }
            public string profilePic { get; set; }
            public string tel { get; set; }
            public List<string> Roles { get; set; }
            public List<string> Permissions { get; set; }

            public bool CheckTokenIsValid(string tokenGet)
            {
                if (string.IsNullOrEmpty(tokenGet))
                    return false;

                try
                {
                    var handler = new JwtSecurityTokenHandler();
                    var token = handler.ReadJwtToken(tokenGet);

                    return token.ValidTo > DateTime.Now;
                }
                catch
                {
                    // Si el token no es válido, capturar excepciones y retornar false
                    return false;
                }
            }

            public void ReadJWTProperties(string tokenGet)
            {
                var handler = new JwtSecurityTokenHandler();
                var token = handler.ReadJwtToken(tokenGet);

                var key = Encoding.ASCII.GetBytes("xWmFhO5woZO7GWoIuBcX6XuNuInGncYqFsC4QrgRs");

                handler.ValidateToken(tokenGet, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey =
                            new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    RoleClaimType = ClaimTypes.Role,
                    ClockSkew = TimeSpan.Zero
                }, out var tokenSigned);

                Permissions = token.Claims.Where(x => x.Type == ClaimTypes.AuthenticationMethod).Select(x => x.Value).ToList();
                Roles = token.Claims.Where(x => x.Type == ClaimTypes.Role).Select(x => x.Value).ToList();

                id = token.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value ?? "";
                email = token.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email).Value ?? "";
                name = token.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name).Value ?? "";
                surname = token.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Surname).Value ?? "";
                profilePic = token.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Uri).Value ?? "";
                tel = token.Claims.FirstOrDefault(x => x.Type == ClaimTypes.MobilePhone).Value ?? "";
            }
        }
        `
    },
    {
        "ID": 18,
        "DatabaseName": "AddDatabaseServices",
        "DatabaseRoute": "Databases/Services/AddDatabaseServices",
        "DatabaseDescription": `
La clase <span class="font-bold">AddDatabaseServices</span> es una extensión de <span class="font-bold">IServiceCollection</span> que se utiliza para registrar servicios relacionados con la base de datos en el contenedor de dependencias de ASP.NET Core. Esta clase facilita la inyección de dependencias para los servicios que interactúan con la base de datos.
<br><br>La clase <span class="font-bold">AddDatabaseServices</span> configura la inyección de dependencias para servicios relacionados con la base de datos, como <span class="font-bold">"UserService</span> y servicios MongoDB <span class="font-bold">(MongoContext, UserMongoContext)</span>, utilizando los ciclos de vida adecuados <span class="font-bold">(Scoped, Transient)</span>. Esto permite que estos servicios estén disponibles para su inyección y uso en el resto de la aplicación, facilitando la gestión de dependencias en ASP.NET Core.
        `,
        "Code": `
        public static class AddDatabaseServices
        {
            public static IServiceCollection AddDatabase(this IServiceCollection _services)
            {
                _services.AddScoped<UserService>();
                _services.AddTransient(typeof(IMongoContext), typeof(MongoContext));
                _services.AddTransient(typeof(UserMongoContext));
                return _services;
            }
        }
        `
    },
    {
        "ID": 19,
        "DatabaseName": "CurrentUserServices",
        "DatabaseRoute": "Databases/Services/CurrentUserServices",
        "DatabaseDescription": `
        La clase <span class="font-bold">CurrentUserService</span> facilita el acceso a los datos del usuario actual en una aplicación ASP.NET Core, extrayendo la información desde el token JWT (almacenada en los claims) en el contexto de la solicitud HTTP. 
        <br>Esto permite acceder fácilmente a datos como el nombre, correo electrónico, roles y otros detalles del usuario dentro de cualquier servicio o controlador que lo necesite.
        `,
        "Code": `
        namespace Database.Services
        {
            public class CurrentUserService : ICurrentUserService
            {
                IHttpContextAccessor httpContextAccessor;

                public CurrentUserService(IHttpContextAccessor httpContextAccessor)
                {
                    this.httpContextAccessor = httpContextAccessor;
                }

                public string UserId => httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier) != null ?
                    httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier).Value : "";

                public string Name => httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier) != null ?
                    httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Name).Value : "";

                public string SurName => httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier) != null ?
                    httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Surname).Value : "";

                public string Email => httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier) != null ?
                    httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Email).Value : "";

                public string MobilePhone => httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier) != null ?
                    httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.MobilePhone).Value : "";

                public string ProfilePic => httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier) != null ?
                    httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Uri).Value : "";

                public List<Claim> Roles => httpContextAccessor.HttpContext?.User?.Claims.Where(x => x.Type == ClaimTypes.Role).ToList() ?? new List<Claim>();
            }
        }
        `
    },
];

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
                        <h2 class="app-title"><i class="fa-solid fa-cube"></i> ${app.DatabaseName}</h2>
                        <p class="app-description">${app.DatabaseDescription}</p>
                      
                    </div>
                    <div class="code-container">
                        <div class="code-header">
                            <span class="code-title">${app.DatabaseName}.cs</span>
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
        app.DatabaseName.toLowerCase().includes(searchTerm) ||
        app.DatabaseDescription.toLowerCase().includes(searchTerm) ||
        app.DatabaseRoute.toLowerCase().includes(searchTerm)
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