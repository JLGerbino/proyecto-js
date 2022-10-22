let producto = parseInt(
  prompt(
    "Ingrese el codigo del producto que desea comprar"
  )
)
let seguirComprando = true
let totalCompra = 0
let decision
let totalArticulo

class ingresoProducto{
  constructor(id,nombre,precio,stock){
    this.id = id
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock
  }
}
const jComedor = new ingresoProducto(1,"Juego de comedor ",185500,9);
const sofa = new ingresoProducto(2,"Sofa Chester ",125800,10);
const rack = new ingresoProducto(3,"Rack tv ",39800,15);
const escritorio = new ingresoProducto(4,"Escritorio notebook ",15800,15);

while (seguirComprando === true) {
  if (producto === jComedor.id) {
    totalCompra = totalCompra + jComedor.precio
    jComedor.stock = jComedor.stock-1   
    totalArticulo = jComedor.nombre 
  } else if (producto === sofa.id) {
    totalCompra = totalCompra + sofa.precio
    sofa.stock = sofa.stock-1
    totalArticulo = totalArticulo + sofa.nombre
  } else if (producto === rack.id) {
    totalCompra = totalCompra + rack.precio
    rack.stock = rack.stock-1
    totalArticulo = totalArticulo + rack.nombre
  } else if (producto === escritorio.id) {
    totalCompra = totalCompra + escritorio.precio
    escritorio.stock = escritorio.stock-1
    totalArticulo = totalArticulo + escritorio.nombre
  } 

 decision = parseInt(prompt("Quieres seguir comprando? 1.Si - 2.No"))
  if (decision === 1) {
    producto = parseInt(
      prompt(
        "Ingrese el codigo del producto que desea comprar"
      )
    )
      } else {
    seguirComprando = false
  }
}
formaPago = parseInt(prompt("Elija su forma de pago. 1.Efectivo - 2.tarjeta credito 6 c. sin interes"))
if (formaPago === 1){
const precioFinalEfectivo = descuentoEfectivo(totalCompra)
alert("El total de su compra es " + precioFinalEfectivo +
" En su carrito tiene " + totalArticulo)
}else{
  const precioCuotas = pagoTarjeta(totalCompra)
  alert("Usted va a abonar 6 cuotas de $ " + precioCuotas +
" En su carrito tiene " + totalArticulo)
}

function pagoTarjeta(valor){
  return valor/6
}
function descuentoEfectivo(valor) {
  let descuentoEfectivo = 0
  if (valor <= 150000) {
    descuentoEfectivo = 10
  }  else {
    descuentoEfectivo = 20
  }
  let valorDescuento = valor * (descuentoEfectivo / 100)
  let valorFinal = valor - valorDescuento
  return valorFinal
}