const URL = "https://test-1-rtka.onrender.com/usuarios";

const lista = document.getElementById("lista");
const input = document.getElementById("nombre");
const btnCrear = document.getElementById("btnCrear");

// ======================
// CARGAR USUARIOS
// ======================
async function cargarUsuarios() {
  try {
    lista.innerHTML = "Cargando...";

    const res = await fetch(URL);
    const data = await res.json();

    lista.innerHTML = "";

    data.forEach(usuario => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = usuario.nombre;

      const acciones = document.createElement("div");
      acciones.className = "acciones";

      // Botón editar
      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.className = "btn-edit";
      btnEditar.addEventListener("click", () => {
        editarUsuario(usuario.id, usuario.nombre);
      });

      // Botón eliminar
      const btnDelete = document.createElement("button");
      btnDelete.textContent = "Eliminar";
      btnDelete.className = "btn-delete";
      btnDelete.addEventListener("click", () => {
        eliminarUsuario(usuario.id);
      });

      acciones.appendChild(btnEditar);
      acciones.appendChild(btnDelete);

      li.appendChild(span);
      li.appendChild(acciones);

      lista.appendChild(li);
    });

  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    lista.innerHTML = "Error al cargar usuarios";
  }
}

// ======================
// CREAR USUARIO
// ======================
async function crearUsuario() {
  const nombre = input.value.trim();

  if (!nombre) {
    alert("Ingrese un nombre");
    return;
  }

  try {
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre })
    });

    input.value = "";
    cargarUsuarios();

  } catch (error) {
    console.error("Error al crear usuario:", error);
  }
}

// ======================
// ELIMINAR USUARIO
// ======================
async function eliminarUsuario(id) {
  const confirmar = confirm("¿Seguro que querés eliminar?");
  if (!confirmar) return;

  try {
    await fetch(`${URL}/${id}`, {
      method: "DELETE"
    });

    cargarUsuarios();

  } catch (error) {
    console.error("Error al eliminar usuario:", error);
  }
}

// ======================
// EDITAR USUARIO
// ======================
async function editarUsuario(id, nombreActual) {
  const nuevoNombre = prompt("Nuevo nombre:", nombreActual);

  if (!nuevoNombre || !nuevoNombre.trim()) return;

  try {
    await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre: nuevoNombre.trim() })
    });

    cargarUsuarios();

  } catch (error) {
    console.error("Error al editar usuario:", error);
  }
}

// ======================
// EVENTOS
// ======================
btnCrear.addEventListener("click", crearUsuario);

// ======================
// INICIALIZACIÓN
// ======================
cargarUsuarios();