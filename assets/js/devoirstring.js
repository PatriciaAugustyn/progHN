// exercice 1
function prenom() {
    // on récupère le prénom on le met dans l'élément avec id holder1
    // compléter le code ici
	var prenom = document.getElementById('prenom').value;
	document.getElementById('holder1').innerHTML = prenom;
}

function nomdefamille() {
    // on récupère le nom on le met dans l'élément avec id holder1
    // compléter le code ici
	var nomdefamille = document.getElementById('nomdefamille').value;
	document.getElementById('holder1').innerHTML = nomdefamille;
}

function nomcomplet() {
    // on concatène prénom et nom pour afficher le nom entier et on met le résultat dans l'élément avec id holder1
    // compléter le code ici
	var prenom = document.getElementById('prenom').value;
	var nomdefamille = document.getElementById('nomdefamille').value;
	var nomcomplet = prenom + (" ") + nomdefamille;
	document.getElementById('holder1').innerHTML = nomcomplet;
}


// exercice 2
function segmentText() {
    // on récupère le texte de l'élément d'id texte, 
	//on le découpe et on le place dans l'élément avec id holder2
    // compléter le code ici
	var segmentText = document.getElementById('texte').value;
	var reg = new RegExp("[ ]+", "gi");
	var splitText = segmentText.split(reg);
	document.getElementById('holder2').innerHTML = splitText ;
	alert(splitText)	
}


//Exercice 3 - Bouton de bienvenue - Afficher + Alerte

function salutation() {
  salutation = document.getElementById("salutation").innerHTML = "Bienvenue !";
  alert(salutation);
}

//Bouton pour dire au revoir - Afficher le texte avec un effet d'écriture 
var lettre = 0;
var texte = 'Au plaisir de vous revoir !'; /* Le texte que l'on veut afficher */
var rapidite = 80; /* La durée de l'effet en .ms */
function ecriture() {
	if (lettre < texte.length) {
		document.getElementById("ecriture").innerHTML += texte.charAt(lettre);
		lettre++;
		setTimeout(ecriture, rapidite);
	}
}



//alert(finalseg);
	//let maj = texte.toUpperCase();
	//let reg = new RegExp("[ ]+", "gi");
	//let splitText = maj.split(reg);
	//document.getElementById('exercice2Resultat').innerHTML = splitText;


