
		
/*-----Clicker sur le bouton et il affiche le texte avec un effet d'écriture-----*/
		var lettre = 0;
		var txt = 'Bonjour à tous et bienvenue sur mon site :)'; /* Le texte que l'on veut afficher */
		var speed = 80; /* La durée de l'effet en .ms */

		function typeWriter() {
			if (lettre < txt.length) {
				document.getElementById("demo").innerHTML += txt.charAt(lettre);
				lettre++;
				setTimeout(typeWriter, speed);
				}
			}

		
/*----- Afficher ou enlever--------*/
		function showOrHide() {
			var div = document.getElementById("show");
			var hide = document.getElementById("texthide").innerHTML;
				if (div.style.display == "none") {
					div.style.display = "block";

					/*Remplacer le mot "Afficher" par "Masquer" lorsque l'aide est ouverte*/
					var txt = hide.replace("Afficher","Masquer");
					document.getElementById("texthide").innerHTML = txt;
		}

				else {
					div.style.display = "none";
					var txt = hide.replace("Masquer","Afficher");
					document.getElementById("texthide").innerHTML = txt;
		  }
		}
		
	
/*--------Prendre un texte et l'afficher : "download"-------*/	
		window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = alert("Fichier chargé avec succès");
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = alert("Type de fichier non supporté");
        }
    });
}


/*------- Action 1 : Segmentater le texte----------*/


/* Ce que j'avais mis au début mais cela ne prenait pas le texte en compte
function segment() {
	let texte = document.getElementById("fileDisplayArea").value;
	let TexteF = texte.split(" ");
	let tabl = [];
	TexteF.forEach ((mot) => {
    let element = document.createElement("p");
    let texteM = document.createTextNode(mot);
    element.appendChild(texteM);
    tabl.push(element);
  });
	document.getElementById("page-analysis").append(...tabl);
} */

/* Pour la première partie je ne comprenais pas qu'est-ce qu'il fallait faire exactement donc je me suis inspirée des sites et des exemples proposés*/

function segment() {
 queryDelim=document.getElementById('delimID').value; /* va chercher les délimiteurs définis par l'utilisateur */
  if (queryDelim == ''){ /* vérification au cas où l'utilisateur aurait supprimé les délimiteurs */
	document.getElementById('logger').innerHTML = '';
	document.getElementById('logger').innerHTML += vide;
	return;
  }
 
  queryDelim += "\n\s\t\""; 
  queryDelim2 = queryDelim.replace(/(.)/gi, "\\$1");
  /*-----------------------------*/
  DictionnaireSource = new Object(); /* variable vide créée pour stocker le dictionnaire */
  /* les deux variables à afficher à la fin du processus de segmentation : */
  NBMOTTOTALSource=0;
  NBMOTSource=0; 
  
  document.getElementById('logger').innerHTML = vide;
  
  /* on recupere toutes le lignes du texte */
  var allLines = document.getElementById('fileDisplayArea'); 
  var arrayOfLines = allLines.innerText.split("\n"); 
  for (var nblines=0;nblines<arrayOfLines.length;nblines++) { 
    var contentxt=arrayOfLines[nblines];
	
	/* Nettoyage et split : */
		/* On supprime les balises*/
	contentxt = contentxt.replace(/<\/?[^>]+>/gi, "");
	contentxt=contentxt.replaceAll("<"," ");
	contentxt=contentxt.replaceAll(">"," ");
	
		/* Supprimer les délimiteurs en debut de chaine */
	var reg0=new RegExp("^["+queryDelim2+"]", "g");
	contentxt.replace(reg0,"");
	
		/* Supprimer les délimiteurs en fin de chaine */
	var reg1=new RegExp("["+queryDelim2+"]$", "g");
	contentxt.replace(reg1,"");
	
	
	var reg=new RegExp("["+queryDelim2+"]", "g"); 
	var LISTEDEMOTS=contentxt.split(reg);
	for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {
		if ((LISTEDEMOTS[nbmot] != " ") && (LISTEDEMOTS[nbmot] != "")) {
			NBMOTTOTALSource=NBMOTTOTALSource+1;
			if (DictionnaireSource[LISTEDEMOTS[nbmot]] === undefined) { 
				DictionnaireSource[LISTEDEMOTS[nbmot]] = 1;
				NBMOTSource+=1;
			}
			else { 
				DictionnaireSource[LISTEDEMOTS[nbmot]] = DictionnaireSource[LISTEDEMOTS[nbmot]]  + 1;
			}
		}
	}
  }
  var vide='<h3><span style="text-align:center; border: none ; padding: 0px; color: #5b3c11"><h2>Résultat de segmentation :</h2></span><table style="width:100%"><tr><th>Mots occurrences: </th><th>Mots différents: </th></tr><tr><td>'+NBMOTTOTALSource+'</td><td>'+NBMOTSource+'</td></tr></table></h3>';
  document.getElementById('page-analysis').innerHTML = vide;
  document.getElementById('logger').innerHTML = "";
}


/*------- Action 2 : Trier les mots les plus fréquents--------*/
function seg2(){
    var resultFinal="";
 	var table='';
	table += '<table align="center" class="aboutme">';
    table += '<tr><th colspan="4"><b>Dictionnaire</b></th></tr><tr>';
    table +='    <th width="50%">Mot</th>';
    table +='    <th width="50%">Fq</th>';
    table += '</tr>';
	var LISTEMOTS=Object.keys(DictionnaireSource).sort(function(a,b){
		var x = DictionnaireSource[a];
		var y = DictionnaireSource[b];
		return x < y ? 1 : x > y ? -1 : 0;
		});;
		
    for (var i=0; i<LISTEMOTS.length;i++) {
        table +='<tr><td>'+LISTEMOTS[i]+'</td><td>'+DictionnaireSource[LISTEMOTS[i]]+'</td></tr>';      
    }
    table +='</table>';
    resultFinal+=table;

  document.getElementById('logger').innerHTML = '';
  vide='Segmentation terminée (SOURCE : '+NBMOTTOTALSource+' occurrences / '+NBMOTSource+ ' formes)';
  document.getElementById('page-analysis').innerHTML = resultFinal;
}


/*------- Action 3 : Mettre tout le texte en majuscule--------*/
function maj() {
	if(document.getElementById('fileDisplayArea').innerHTML==""){
		alertfichier();
}
	else{
		/*Récupérer la page d'analyse*/
		document.getElementById('page-analysis').innerHTML ="";
            /*On récupère le texte*/
            var text = document.getElementById('fileDisplayArea').innerText;

            /*Mettre en majuscule*/
            var textMAJ = text.toUpperCase();
            document.getElementById('page-analysis').innerText = textMAJ;
	}
}

		
			
