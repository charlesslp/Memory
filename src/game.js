/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};
var loop;

/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {

	this.arrayCartas = new Array();
	this.encontradas = 0;
	this.texto = "Memory Game";
	this.comprobando = false;

	this.loop = function(){
		
		var self = this;
		setInterval(function(){
			self.draw();
		}, 16);

	};

	this.initGame = function(){

		gs.drawMessage(this.texto);

		var aleatorio = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
		aleatorio = aleatorio.sort(function() {return Math.random() - 0.5});
		

		this.arrayCartas[aleatorio[0]] = new MemoryGameCard("8-ball");
		this.arrayCartas[aleatorio[1]] = new MemoryGameCard("8-ball");

		this.arrayCartas[aleatorio[2]] = new MemoryGameCard("potato");
		this.arrayCartas[aleatorio[3]] = new MemoryGameCard("potato");

		this.arrayCartas[aleatorio[4]] = new MemoryGameCard("dinosaur");
		this.arrayCartas[aleatorio[5]] = new MemoryGameCard("dinosaur");

		this.arrayCartas[aleatorio[6]] = new MemoryGameCard("kronos");
		this.arrayCartas[aleatorio[7]] = new MemoryGameCard("kronos");

		this.arrayCartas[aleatorio[8]] = new MemoryGameCard("rocket");
		this.arrayCartas[aleatorio[9]] = new MemoryGameCard("rocket");

		this.arrayCartas[aleatorio[10]] = new MemoryGameCard("unicorn");
		this.arrayCartas[aleatorio[11]] = new MemoryGameCard("unicorn");

		this.arrayCartas[aleatorio[12]] = new MemoryGameCard("guy");
		this.arrayCartas[aleatorio[13]] = new MemoryGameCard("guy");

		this.arrayCartas[aleatorio[14]] = new MemoryGameCard("zeppelin");
		this.arrayCartas[aleatorio[15]] = new MemoryGameCard("zeppelin");

		this.loop();


	};

	this.draw = function(){

		gs.drawMessage(this.texto);

		for (var i = 0; i < 16; i++) {
			if(this.arrayCartas[i].estado === "abajo")
				gs.draw("back", i);
			else
				gs.draw(this.arrayCartas[i].sprite, i);
		};

	};




	//------------------------------------------------------------------------------------
	//LOGICA DEL JUEGO
	
	this.levantada = null;

	this.onClick = function(card){

		if(!this.comprobando && this.arrayCartas[card].estado !== "arriba"){
			this.arrayCartas[card].estado = "arriba";

			if(this.levantada === null)
				this.levantada = card;
			else {

				if(this.arrayCartas[card].sprite === this.arrayCartas[this.levantada].sprite){
					this.texto = "Encontradas!!!";
					this.levantada = null;
					this.encontradas++;
					if(this.encontradas === 8)
						this.texto = "Enhorabuena, has ganado";
				}
				else {
					this.comprobando = true;

					var self = this;
					var intervalId = setInterval(function(){
						self.comprobando = false;
						self.arrayCartas[card].estado = "abajo";
						self.arrayCartas[self.levantada].estado = "abajo";
						self.levantada = null;
						clearInterval(intervalId);
					}, 1500);

					this.texto = "Prueba otra vez!!!";
				}

			}
		}


	};


	//LOGICA DEL JUEGO
	//------------------------------------------------------------------------------------

};


/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
	this.sprite = id;
	this.estado = "abajo";
};



