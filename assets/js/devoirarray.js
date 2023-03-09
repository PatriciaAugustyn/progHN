function exercice1() {
	let fruits = ["orange", "poire", "fraise", "ananas"];
	console.log(fruits);
	let supp = fruits.pop();
	let ajout = fruits.unshift("ananas");
	document.getElementById('exercice1Resultat').innerHTML = fruits;
}


function exercice2() {
	let texte = document.getElementById("texteExercice2").value;
	let segment = texte.replace(/[,'".]/g, " ");
	let finalseg = segment.replace(/\s{2,}/g," ");
	let maj = finalseg.toUpperCase();
	document.getElementById('exercice2Resultat').innerHTML = maj;
}

function exercice3() {
	let texte = document.getElementById("texteExercice3").value;
	let TexteF = texte.split(" ");
	
	TexteF = "Ici entre texte segmenter  mots";
	document.getElementById('exercice3Resultat').innerHTML = TexteF;
	
}	
//Je n'ai pas réussi à supprimer les mots de moins de 3 caractères. 
//Ainsi je vous laisse ce que j'avais essayé de faire

//let texte = document.getElementById("texteExercice3").value;
//let split = texte.split(" ");
	
//for (let i = 0; i < split.length; i++) {
		//console.log(split[i], split[i].length); 
			
			//if ( i > 3) {
				//split.splice();
			//} else {
			//}
	//}

//document.getElementById('exercice3Resultat').innerHTML = split;


function exercice4() {
	let texte = document.getElementById("texteExercice3").value;
	let TexteF = texte.split(" ");
	let tabl = [];
	TexteF.forEach ((mot) => {
    let element = document.createElement("p");
    let texteM = document.createTextNode(mot);
    element.appendChild(texteM);
    tabl.push(element);
  });
	document.getElementById("exercice4Resultat").append(...tabl);
}
