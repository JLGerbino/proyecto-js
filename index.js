let seguirComprando = true;
let totalCompra = 0;
let decision;
let totalArticulo = "";
const productosArray = [];
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const botonIngresar = document.getElementById("ingresar");
const listaCategorias = document.getElementById("listaCategorias");
const divFinal = document.getElementById("divFinal");
const divCarro1 = document.getElementById("divCarro1");
const divCarro2 = document.getElementById("divCarro2");
const divCarro3 = document.getElementById("divCarro3");
const divInicial = document.getElementById("divInicial");
const tarjetas1 = document.getElementById("tarjetas1");
const divSaludoFinal = document.getElementById("divSaludoFinal");
const efectivo = document.getElementById("efectivo");
const credito = document.getElementById("credito");
const carrito = [];
localStorage.clear();

//ingreso datos usuario
botonIngresar.onclick = () => {
  if (inputNombre.value && inputApellido.value) {
    const usuario = {
      nombre: inputNombre.value,
      apellido: inputApellido.value,
    };
    localStorage.setItem("usuarioInfo", JSON.stringify(usuario));
    divInicial.remove();
    tarjetas1.style.display = "block";
  } else {
    Swal.fire({
      icon: "error",
      title: "Parece que te faltaron datos!",
      text: "Volver a intentarlo",
      color: "rgb(150, 33, 63)",
    });
  }
};

//creo una card para cada elemento
const divTarjetas = document.getElementById("divTarjetas");
const traerProductos = async () => {
  const traerProductosFetch = await fetch("productos.json");
  const traerProductosJson = await traerProductosFetch.json();
  traerProductosJson.forEach((producto) => {
    const { id, nombre, precio, stock, imagen, categoria } = producto;
    divTarjetas.innerHTML += `
  <div id="${id}" class="card col-xl-3 col-md-6 col-sm-12 m-auto tarjetas" style="width: 17rem">
   <img src="${imagen}" class="card-img-top" alt="${nombre}"/>
   <div class="card-body">
   <h5 class="card-title">${nombre}</h5>
   <p class="card-text">$${precio}</p>
   <a id="${id}" href="#"  class="btn btn-primary apretado">Comprar</a>
   </div>
  </div>`;
  });

  //realizar la compra
  const botonesAgregar = document.querySelectorAll(".btn-primary");
  botonesAgregar.forEach((boton) => {
    boton.onclick = () => {
      const producto = traerProductosJson.find(
        (prod) => prod.id === parseInt(boton.id)
      );
      const productoCarrito = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
      };
      Toastify({
        text: inputNombre.value + " tu producto se agrego con éxito",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        duration: 1500,
      }).showToast();
      const indexCarrito = carrito.findIndex((prod) => prod.id === producto.id);
      if (indexCarrito === -1) {
        carrito.push(productoCarrito);
      } else {
        carrito[indexCarrito].cantidad += 1;
      }
    };
  });

  //finalizar compra
  const finalizarCompra = document.getElementById("finalizarCompra");
  finalizarCompra.onclick = () => {
    divTarjetas.style.display = "none";
    divFinal.style.display = "block";
    carrito.forEach((elemento) => {
      totalArticulo += elemento.cantidad + " " + elemento.nombre;
    });
    const totalCompra = carrito
      .map((prod) => prod.precio * prod.cantidad)
      .reduce((elem1, elem2) => elem1 + elem2);
    const nombreUsuario = JSON.parse(localStorage.getItem("usuarioInfo"));
    const mensajeCarro1 = document.createElement("h2");
    mensajeCarro1.innerText =
      nombreUsuario.nombre +
      " tenes en tu carrito " +
      totalArticulo +
      "por un total de $" +
      totalCompra;
    divCarro1.append(mensajeCarro1);
    const mensajeCarro2 = document.createElement("h4");
    const precioFinalEfectivo = descuentoEfectivo(totalCompra);
    mensajeCarro2.innerText =
      "podes abonar contado efec con descuento un total de $" +
      precioFinalEfectivo;
    divCarro2.append(mensajeCarro2);
    const mensajeCarro3 = document.createElement("h4");
    const precioCuotas = pagoTarjeta(totalCompra);
    mensajeCarro3.innerText =
      "o con tarjeta en 6 cuotas sin interes de $" + precioCuotas.toFixed(2);
    divCarro3.append(mensajeCarro3);

    //forma de pago
    efectivo.onclick = () => {
      divFinal.style.display = "none";
      divSaludoFinal.style.display = "block";
      const saludoFinal = document.createElement("h2");
      saludoFinal.innerText =
        "Muchas gracias por tu compra " + nombreUsuario.nombre;
      divSaludoFinal.append(saludoFinal);
      Toastify({
        text: " tu compra se realizó con éxito",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        duration: 1500,
      }).showToast();
    };
    credito.onclick = () => {
      divFinal.style.display = "none";
      divSaludoFinal.style.display = "block";
      const saludoFinal = document.createElement("h2");
      saludoFinal.innerText =
        "Muchas gracias por tu compra " + nombreUsuario.nombre;
      divSaludoFinal.append(saludoFinal);
      Toastify({
        text: " tu compra se realizó con éxito",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        duration: 2500,
      }).showToast();
    };
  };
};

traerProductos();
function pagoTarjeta(valor) {
  return valor / 6;
}
function descuentoEfectivo(valor) {
  let descuentoEfectivo = 0;
  if (valor <= 150000) {
    porcentajeDescuento = 10;
  } else {
    porcentajeDescuento = 20;
  }
  let valorDescuento = valor * (porcentajeDescuento / 100);
  let valorFinal = valor - valorDescuento;
  return valorFinal;
}
