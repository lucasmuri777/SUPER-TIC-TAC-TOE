// de 1 a 9 dos quadrados grandes
let posicaoJogada = null;

//X e O
let vez = 'X';
let escolher = false;
let activeListeners = [];


console.log(jogo)
let smallBox = document.querySelectorAll('.small-box');

smallBox.forEach((e)=>{
	e.addEventListener('click', (box)=>{
		let jogada = box.target;
		let small = box.target.parentNode;
		let big = small.parentNode;
		let indexSmall = jogada.id.split('-small')[0];
		let indexBig = big.id.split('-big')[0];

		//indexBig = index do quadrado grande em que jogou
		//indexSmall = index do quadrado pequeno que jogou para fazer a logica e mandar pro grande a nova jogada
		jogar(indexSmall, jogada, indexBig, big);
	})
})

function jogar(indexSmall, jogada, indexBig, big){
	let clicou = jogo[indexBig][indexSmall];
	if(clicou.trim() == '' && big.classList.contains('active') && jogo[indexBig].active && !escolher){
		if(jogo[indexSmall].finish == ''){
			jogada.innerHTML = vez;
			
			jogo[indexBig][indexSmall] = vez;
			verificaBoxSmall();
			verificaBoxBig();
			if(jogo[indexSmall].finish != ''){
				escolherJogada(indexSmall)
			}else{
				mudarQuadrados(indexSmall)

				if(vez == 'X'){

					vez = 'O'
					document.querySelector('.container h3').innerHTML = `Vez do ${vez}`
				}else{
					vez = 'X'
					document.querySelector('.container h3').innerHTML = `Vez do ${vez}`
				}
			}
			
		}else{
			jogada.innerHTML = vez;
		
			jogo[indexBig][indexSmall] = vez;

			//Dono do quadrado escolhe onde a jogada será feita
			escolherJogada(indexSmall)
		}
		

	}
	
	return false;
}


//usada para quando um quadrado maior ja preenchido for escolhido
function escolherJogada(indexSmall){
	console.log('opa')
	let donoDoQuadrado = jogo[indexSmall].finish;
	if(donoDoQuadrado == 'JOKER'){
		donoDoQuadrado = vez;
	}
	document.querySelector('.container h3').innerHTML = `O ${donoDoQuadrado} escolhe onde será a proxima jogada`
	let bigBox = document.querySelectorAll('.big-box');
	
	//filta com o foreach para só pegar os box que não estao finalizados
	let filter = [];

	bigBox.forEach((e,index)=>{
		e.classList.remove('active');
		e.classList.add('disabled');
		if(jogo[index].finish == ''){
			filter.push(e);
		}
	})
	escolher = true;
	// Defina um atraso em milissegundos
	let delay = 500; // 500 milissegundos = 0,5 segundos
	
	filter.forEach((e, index) => {
		setTimeout(() => {
			const listener = () => escolha(filter, e);
			e.addEventListener('click', listener);
			activeListeners.push({element: e, listener: listener});
		}, delay ); // Incrementa o atraso para cada iteração
		
	});
	
	
}
function escolha(filter, box){
	if(escolher){
		let indexE = box.id.split('-big')[0];
	
		mudarQuadrados(parseInt(indexE));
		if(vez == 'X'){
			vez = 'O'
			document.querySelector('.container h3').innerHTML = `Vez do ${vez}`
		}else{
			vez = 'X'
			document.querySelector('.container h3').innerHTML = `Vez do ${vez}`
		}
		removerEvents();
	}
}
function removerEvents(){
	activeListeners.forEach(({element, listener}) => {
        element.removeEventListener('click', listener);
    });
    activeListeners = [];
}

function mudarQuadrados(indexSmall){
	let bigBox = document.querySelectorAll('.big-box');
	escolher = false;
	bigBox.forEach((e)=>{
		e.classList.remove('active');
		e.classList.add('disabled');
	})
	jogo.map((i,index)=>{
		if(index == indexSmall){
			i.active = true;
		}else{
			i.active = false
		}


	})
	bigBox[indexSmall].classList.add('active');
	verificaBoxSmall();
}


function verificaBoxSmall (){
	jogo.map((e,index)=>{
		verificarBoxRegras(e,index, 'small')
	})
}
function verificaBoxBig(){
	let arr = [];
	jogo.map((e)=>{
		arr.push(e.finish)
	})
	verificarBoxRegras(arr,0, 'big')
}
function verificarBoxRegras(box,index, type){
	let bigBox = document.querySelectorAll('.big-box');
	if(type == 'small'){
		bigBox = bigBox[index];
	}
	if(box[0] == box[1] && box[0] == box[2] && box[0] != ''){
		if(type == 'small'){smallBoxChecked(bigBox, box,0)}
		if(type == 'big'){bigBoxChecked(bigBox, box, 0)}
	}
	if(box[0] == box[4] && box[0] == box[8] && box[0] != ''){
		if(type == 'small'){smallBoxChecked(bigBox, box,0)}
		
	}

	if(box[0] == box[3] && box[0] == box[6] && box[0] != ''){
		if(type == 'small'){smallBoxChecked(bigBox, box,0)}
		
	}

	if(box[1] == box[4] && box[1] == box[7] && box[1] != ''){
		if(type == 'small'){smallBoxChecked(bigBox, box,1)}
		
	}

	if(box[2] == box[5] && box[2] == box[8] && box[2] != ''){
		if(type == 'small'){smallBoxChecked(bigBox, box,2)}
	}

	if(box[2] == box[4] && box[2] == box[6] && box[3] != ''){
		if(type == 'small'){smallBoxChecked(bigBox, box,2)}
	}

	if(box[3] == box[4] && box[3] == box[5] && box[3] != ''){
		if(type == 'small'){smallBoxChecked(bigBox, box,3)}
		
	}

	if(box[6] == box[7] && box[6] == box[8] && box[6] != ''){
		if(type == 'small'){smallBoxChecked(bigBox, box,6)}
		
	}
	else if(box[0] != '' && box[1] != '' && box[2] != '' && box[3] != '' && box[4] != '' && box[5] != '' && box[6] != '' && box[7] != '' && box[8] != ''){
		if(type == 'small'){smallBoxChecked(bigBox, box, 'JOKER')}
		
	}

	
}

function smallBoxChecked(bigBox, box,index){
	if(index == 'JOKER'){
		box.active = false;
		bigBox.innerHTML = 'JOKER';
		bigBox.classList.add('finished');
		box.finish = 'JOKER';
	}else{
		bigBox.innerHTML = box[index];
		bigBox.classList.add('finished');
		box.finish = box[index];
		box.active = false;
	}
}
function bigBoxChecked(bigBox, box,index){
	if(index == 'JOKER'){
		document.querySelector('.container .jogo-big').classList.add('finished');
		document.querySelector('.container .jogo-big').innerHTML = 'EMPATE';
	}else{
		document.querySelector('.container .jogo-big').classList.add('finished');
		document.querySelector('.container .jogo-big').innerHTML = `${box[index]} VENCEU!`;
	}
}

verificaBoxSmall();
verificaBoxBig();

let reiniciarBtn = document.querySelector('#reiniciar');
reiniciarBtn.addEventListener('click',reiniciarJogo);
function reiniciarJogo(){
	window.location.reload();
}