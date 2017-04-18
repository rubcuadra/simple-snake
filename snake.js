//Variables globales
var table = document.getElementById("snakeT");
var tSize = 20;

var comida = [];

function crearTabla(size)
{
	for (var i = 0; i < size; i++) 
	{
		var row = table.insertRow(i);
		
		for (var j = 0; j < size; j++) 
		{
			cell = row.insertCell(0);
		}
	}
}

snake = {
	pos : [
			[1,0],
			[0,0]
		  ],
 	direction : 0,
	mover : function() 
	{
		//Usamos this por que es un metodo de la vibora, ya con eso es como usar snake.

		//Recibe como parametro un numero, donde 
		// 			0 = Derecha
		//			1 = Izquierda
		//			2 = Arriba
		//			3 = Abajo
		var new_x = this.pos[0][0];
		var new_y = this.pos[0][1];

		switch(this.direction) 
		{
			case 0: //Derecha entonces debemos mover la cabeza x+1
				new_x+=1; //La x sera x+1
				break;
			case 1: //Izquierda
				new_x-=1; //La x sera x-1
				break;
			case 2: //Arriba
				new_y-=1; //La y sera y-1
				break;
			case 3: //Abajo
				new_y+=1; //La y sera y+1
				break;
		}

		if ( coordenadaExiste(new_x,new_y) && 
			 !this.esSuCuerpo(new_x,new_y) )
		{
			if ( hayComida(new_x,new_y) ) 
			{
				this.pos.unshift( [new_x,new_y] ); //Agregamos la cabeza y no borramos la ultima posicion
				comida = [];
			}
			else
			{
				this.pos.unshift( [new_x,new_y] ); //Agregamos la nueva posicion como si fuera cabeza(Al inicio)
				this.pos.pop(); 					//Removemos el ultimo elemento para simular el movimiento
			}
		}	
		else
		{
			this.morir(); //Choco con pared o consigo misma
		}
	},
	morir : function()
	{
		alert("moriste");
		location.reload(); //Con esto re iniciamos el juego
	},
	pintar : function()
	{
		for (var i = 0; i < this.pos.length ; i++) //Iteramos sobre sus coordenadas
		{
			var currentPos = this.pos[i]; 
			//Es un arreglo de dos posiciones, donde el elemento 0 es X y el elmento 1 es Y
			//table.rows[ currentPos[1] ].cells[ currentPos[0] ].innerHTML = "-"; 
			//Probablemente lo mejor sea en lugar de usar un innerHTML mejor ponemos la clase Cuerpo y que un css se encargue de pintarlo
			table.rows[ currentPos[1] ].cells[ currentPos[0] ].className = "snake" 
		}
	},
	esSuCuerpo: function (x,y)
	{
		var result = false; //Siempre asumiremos que NO es su cuerpo
		for (var i = 1; i < this.pos.length; i++) //No checaremos la cabeza, solo desde el 1
		{	
			result |= (this.pos[i][0] == x && this.pos[i][1] == y) 
			//result = result | (x_actual = x & y_actual = y ) , si esto es verdad significa que es su cuerpo
			if (result) //Si nos da verdadero ya ni checar lo demas
				return true;
		}
		return false; //Si llego hasta aca es por que en ningun punto fueron iguales los puntos
	}
};

function PresionarTecla(tecla)
{
	switch(event.keyCode)
	{
		case 37:
			snake.direction = 1;
			break;
		case 38:
			snake.direction = 2;
			break;
		case 39:
			snake.direction = 0;
			break;
		case 40: 
			snake.direction = 3;
			break;
	}
}

function init()
{
	crearTabla(tSize); //20x20
	document.addEventListener("keydown",PresionarTecla);
	draw();
}

function draw()
{
	resetBoard();		//Pone el tablero en Xs
	snake.mover(); 		//Calcula sus coordenadas
	snake.pintar();		//Pone la vibora en las coordenadas que le corresponden

	//if (comida.length == 0) 	//SI no hay comida
	//	crearComida();  //Hara que deje de ser un arreglo vacio
	
	//pintarComida();
	//setTimeout(draw, 1000); //Esto hara que se pinte cada 1.000 segundos
}

function resetBoard() //Pondra todas las celdas en x
{
	for (var i = 0; i < tSize; i++) 
	{
		for (var j = 0; j < tSize; j++) 
		{
			//table.rows[ i ].cells[ j ].innerHTML = "";
			table.rows[ i ].cells[ j ].className = "empty";
			//TODO Podriamos cambiar para que sean por colores en lugar de x... 
		}		
	}
}

function pintarComida()
{
	table.rows[ comida[1] ].cells[ comida[0] ].className = "comida";
}

//NO JALA
function crearComida() //Agarra un empty y guarda su coordenada
{
	var empty_spaces = document.getElementsByClassName( "empty" );
	
	var index = Math.floor(Math.random()*empty_spaces.length); //Obtener indice aleatoriamente
	var celd_comida = empty_spaces[ index ];	 //Obtener una celda aleatoria para poner comida
	
	console.log(celd_comida.parentNode);

	comida[0] = celd_comida.cellIndex; //Comida es una variable global 
	comida[1] = celda_y; //Que incluye coordenadas
}
//Prueba
function hayComida(x,y)
{
	//TODO IMPLEMENTAR COMIDA
	return false;
}

function coordenadaExiste(x,y)
{
	return x < tSize && //No se sale por la derecha
		   x > -1	 && //No se sale por la izquierda
		   y < tSize && //No se sale por abajo
		   y > -1;		//No se sale por arriba 
}

//MAIN
//init(); //Lo mandara a llamar onLoad
