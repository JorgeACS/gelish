function toggleCaja(){
	
	if (document.getElementById("estadoCaja").innerHTML == "La caja esta cerrada"){//cerrar la caja
		document.getElementById("estadoCaja").innerHTML = "La caja esta abierta";
		document.getElementById("botonCaja").innerHTML = "Cerrar Caja"
		var lista = document.getElementById("notaVenta").style;
		lista.display = "none";
	}else {//abrir caja
		document.getElementById("estadoCaja").innerHTML = "La caja esta cerrada"
		document.getElementById("botonCaja").innerHTML = "Abrir Caja"
		var lista = document.getElementById("notaVenta").style;
		lista.display = "block";

	}

}
