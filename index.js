let seguirComprando = true;
let totalCompra = 0;
let decision;
let totalArticulo = "";
const productosArray = [];
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const botonIngresar = document.getElementById("ingresar");
const divCarro = document.getElementById("divCarro");
const divInicial = document.getElementById("divInicial");
const tarjetas1 = document.getElementById("tarjetas1");
const carrito = [];

localStorage.clear();

//constructor para productos
class producto {
  constructor(id, nombre, precio, stock,imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
  }
}
const producto1 = new producto(1, "Juego de comedor ", 185500, 9,"imagenes/bordigoni.png");
productosArray.push(producto1);
const producto2 = new producto(2, "Sofa Chester ", 125800, 10,"imagenes/chester.jpg");
productosArray.push(producto2);
const producto3 = new producto(3, "Rack tv ", 39800, 15,"imagenes/rack colgado1.png");
productosArray.push(producto3);
const producto4 = new producto(4, "Escritorio notebook ", 15800, 15,"imagenes/escritorio.jpeg");
productosArray.push(producto4);

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
    Swal.fire(
      "Parece que te faltaron datos!!!",
      "Volver a intentarlo",
      "Volver"
    );
  }
};
//creo una card para cada elemento
const divTarjetas = document.getElementById("divTarjetas");
productosArray.forEach(
  (producto) =>
    (divTarjetas.innerHTML += `
  <div id="${producto.id}" class="card col-xl-3 col-md-6 col-sm-12 m-auto tarjetas" style="width: 17rem">
   <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}"/>
   <div class="card-body">
   <h5 class="card-title">${producto.nombre}</h5>
   <p class="card-text">$${producto.precio}</p>
   <a id="${producto.id}" href="#"  class="btn btn-primary apretado">Comprar</a>
   </div>
  </div>`)
);

//realizar la compra
const botonesAgregar = document.querySelectorAll(".btn-primary");
botonesAgregar.forEach((boton) => {
  boton.onclick = () => {
    const producto = productosArray.find(
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
  divCarro.append(mensajeCarro1);
  const mensajeCarro2 = document.createElement("h2");
  const precioFinalEfectivo = descuentoEfectivo(totalCompra);
  mensajeCarro2.innerText =
    "podes abonar contado efec con descuento un total de $" +
    precioFinalEfectivo;
  divCarro.append(mensajeCarro2);
  const mensajeCarro3 = document.createElement("h2");
  const precioCuotas = pagoTarjeta(totalCompra);
  mensajeCarro3.innerText =
    "o con tarjeta en 6 cuotas sin interes de $" + precioCuotas.toFixed(2);
  divCarro.append(mensajeCarro3);
};

//funciones
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