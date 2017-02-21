function toggleCaja(){
	console.log("hola");
	if (document.getElementById("estadoCaja").innerHTML == "La caja esta cerrada"){

		document.getElementById("estadoCaja").innerHTML = "La caja esta abierta";
		document.getElementById("botonCaja").innerHTML = "Cerrar Caja"
	}else {
		document.getElementById("estadoCaja").innerHTML = "La caja esta cerrada"
		document.getElementById("botonCaja").innerHTML = "Abrir Caja"
	}
	
}