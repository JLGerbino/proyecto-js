let producto = parseInt(
  prompt("Ingrese el codigo del producto que desea comprar")
);
let seguirComprando = true;
let totalCompra = 0;
let decision;
let totalArticulo = "";
const productosArray = [];
const carrito = [];

class ingresoProducto {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }
}
const jComedor = new ingresoProducto(1, "Juego de comedor ", 185500, 9);
productosArray.push(jComedor);
const sofa = new ingresoProducto(2, "Sofa Chester ", 125800, 10);
productosArray.push(sofa);
const rack = new ingresoProducto(3, "Rack tv ", 39800, 15);
productosArray.push(rack);
const escritorio = new ingresoProducto(4, "Escritorio notebook ", 15800, 15);
productosArray.push(escritorio);

while (seguirComprando === true) {
  totalCompra = totalCompra + productosArray[producto - 1].precio;  
  totalArticulo = carrito.push(productosArray[producto - 1].nombre);
  decision = parseInt(prompt("Quieres seguir comprando? 1.Si - 2.No"));
  if (decision === 1) {
    producto = parseInt(
      prompt("Ingrese el codigo del producto que desea comprar")
    );
  } else {
    seguirComprando = false;
  }
}
formaPago = parseInt(
  prompt(
    "Elija su forma de pago. 1.Efectivo - 2.tarjeta credito 6 c. sin interes"
  )
);
if (formaPago === 1) {
  const precioFinalEfectivo = descuentoEfectivo(totalCompra);
  alert(
    "El total de su compra es $" +
      precioFinalEfectivo.toFixed(2) +
      " En su carrito tiene " +
      carrito
  );
} else {
  const precioCuotas = pagoTarjeta(totalCompra);
  alert(
    "Usted va a abonar 6 cuotas de $ " +
      precioCuotas.toFixed(2) +
      " En su carrito tiene " +
      carrito
  );
}
console.log(carrito); //
function pagoTarjeta(valor) {
  return valor / 6;
}
function descuentoEfectivo(valor) {
  let descuentoEfectivo = 0;
  if (valor <= 150000) {
    descuentoEfectivo = 10;
  } else {
    descuentoEfectivo = 20;
  }
  let valorDescuento = valor * (descuentoEfectivo / 100);
  let valorFinal = valor - valorDescuento;
  return valorFinal;
}
