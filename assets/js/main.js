
		
/*----- Clicker sur le bouton et il affiche le texte avec un effet d'écriture -----*/
		var lettre = 0;
		var txt = 'Bonjour à tous et bienvenue sur mon site :)'; /* Le texte que l'on veut afficher */
		var speed = 100; /* La durée de l'effet en .ms */

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

					/*Remplacer le mot "Afficher" par "Masquer" lorsque l'aide est ouverte et inversement*/
					var txt = hide.replace("Afficher","Masquer");
					document.getElementById("texthide").innerHTML = txt;
		}

				else {
					div.style.display = "none";
					var txt = hide.replace("Masquer","Afficher");
					document.getElementById("texthide").innerHTML = txt;
		  }
		}
		
	
/*-------- Prendre un texte et l'afficher : "download"-------*/	
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
				segmentation();
				document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès, ' + text_tokens.length + ' tokens dans le texte.</span>';
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}

/*------- Action  : Segmentation automatique ----------*/
function segmentation() {
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
  var vide='<h3><span style="text-align:center; border: none ; padding: 0px; color: #5b3c11"><h2>Résultat de segmentation :</h2></span><table style="width:100%"><tr><th>Nombre de tokens: </th><th>Nombre de tokens différents: </th></tr><tr><td>'+NBMOTTOTALSource+'</td><td>'+NBMOTSource+'</td></tr></table></h3>';
  document.getElementById('page-analysis').innerHTML = vide;
  document.getElementById('logger').innerHTML = "";
}


/*------- Action  : Afficher un texte ----------*/
function baudelaire() { 
          var amant = 'La mort des amants<br><br/>';
		  amant+="Nous aurons des lits pleins d'odeurs légères,<br/>";//Le "+" permet de concaténer les différentes phrases du texte
          amant+="Des divans profonds comme des tombeaux,<br/>";
		  amant+="Et d'étranges fleurs sur des étagères,<br/>";
		  amant+="Ecloses pour nous sous des cieux plus beaux.<br><br/>";
		  amant+="Usant à l'envie leurs chaleurs dernières,<br/>";
		  amant+="Nos deux coeurs seront deux vastes flambeaux,<br/>";
		  amant+="Qui réfléchiront leurs doubles lumières<br/>";
          amant+="Dans nos deux esprits, ces miroirs jumeaux.<br><br/>";
          amant+="Un soir fait de rose et de bleu mystique,<br/>";
          amant+="Nous échangerons un éclair unique,<br/>";
          amant+="Comme un long sanglot, tout chargé d'adieux;<br><br/>";
          amant+="Et plus tard un Ange, entr'ouvrant les portes,<br/>";
          amant+="Viendra ranimer, fidèle et joyeux,<br/>";
          amant+="Les miroirs ternis et les flammes mortes.<br><br/>";
		  amant+="Charles Baudelaire<br/>";

         /*On affiche le texte dans la zone "fileDisplayArea"*/
		  document.getElementById('fileDisplayArea').innerHTML=amant;
		  segmentation();
		 
}


/*------- Action  : Trier les mots les plus fréquents--------*/
function dictionnaire(){
	
	/*Alerter l'utilisateur si il n'a pas chargé un texte*/
	if (document.getElementById('fileDisplayArea').innerHTML==""){
	alert("Chargez un texte pour m'utiliser :)");}
	
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

/*------- Action  : Grep--------*/
function grep() {
	/*alerter l'utilisateur si il n'a pas chargé un texte*/
	if(document.getElementById('fileDisplayArea').innerHTML==""){
		alert("Chargez un texte pour m'utiliser :)");}
	
	/* Il faut lire tout le texte chargé*/
	document.getElementById("page-analysis").innerText="";
	var pole=document.getElementById("poleID").value;
	console.log("POLE saisi : "+pole)
	if (pole != "") {
		var resultat='<table class="aboutme">';
		// 1 Récupérer le texte :
		var texte=document.getElementById("fileDisplayArea").innerText;
		var Listedeslignes=texte.split("\n");
		var cptcontexte=0;
		for (var nblines=0;nblines<Listedeslignes.length;nblines++) {
			var ligne=Listedeslignes[nblines];
			var reg=new RegExp("\\b"+pole+"\\b", "g");
			if (ligne.search(reg) > -1 ) {
				cptcontexte=cptcontexte+1;
				/*Modifier dans ligne d'affichage du pole pour le mettre en marron */
				ligne = ligne.replace(reg, "<font color='brown'>"+pole+"</font>");
				resultat+="<tr><td>"+cptcontexte+"</td><td>"+ligne+"</td></tr>";
			}
			
		}
		/*Si le mot n'existe pas dans le texte, on alerte l'utilisateur*/
	            if( cptcontexte == ""){
					alert("Le texte ne contient aucune occurence avec ce pôle :(");
					return;
				}
				
		resultat+="</table>";
		document.getElementById("page-analysis").innerHTML+=resultat; /* Afficher dans page-analysis le résultat dans un tableau avec une ligne par ligne */
	}
	
	else {
		alert("Il faut rentrer une valeur dans le pôle ;)");
	}	
}



/*------- Action  : Concordance --------------*/

function concordance(){

	/*alerter l'utilisateur si il n'a pas chargé un texte*/
	if(document.getElementById('fileDisplayArea').innerHTML==""){
		alert("Chargez un texte pour m'utiliser :)");		
}
	
	else {	
	/*Nettoyer la zone*/
    document.getElementById('page-analysis').innerHTML ="";
	
	/*Chercher les 2 id du calcul*/
    var lepole=document.getElementById('poleID').value;
    var longueur=document.getElementById('lgID').value;
    
   
      if(lepole !=""){

	/*Prendre tout le texte dans la zone filedisplayArea*/
	var allLines = document.getElementById('fileDisplayArea').innerText; 
    
	/*Construire le Regex pour segmenter en mots*/
	var queryDelim=document.getElementById('delimID').value;
	queryDelim += "\n\s\t\"";
	var queryDelim2 = queryDelim.replace(/(.)/gi, "\\$1");
	var reg=new RegExp("(["+queryDelim2+"]+)", "g");
	
	var compt=0;
	
	/* Pour pouvoir alerter l'utilisateur du pôle dans le texte*/
	var listedepole=[];
	var listejoint="";

	
	allLines=allLines.replace(reg,"\377$1\377");
	var LISTEDEMOTS=allLines.split("\377");
	
    /* Mettre le résultat dans un tableau*/
    var table='';
    table += '<table align="center" class="aboutme">';
    table += '<tr><th colspan="4"><b>Concordancier</b></th></tr>';
    table +='    <th width="20%">Indice</th>';
    table +='    <th width="30%">Contexte gauche</th>';
    table +='    <th width="20%">Pôle</th>';
    table +='    <th width="30%">Contexte droit</th>';
    table += '</tr>';
	
	/*Mettre une regex pour pouvoir rechercher dans le pôle*/
	var pole=new RegExp("\\b"+lepole+"\\b","i");

	/* Parcourir la liste pour rechercher le mot dans le pôle*/
	for (var nbmot=0;nbmot<LISTEDEMOTS.length;nbmot++) {	
        var unmot=LISTEDEMOTS[nbmot];
                
        /*Si le pôle est trouvé dans le texte la fonction continue*/
        if (unmot.search(pole) >-1) {
            listedepole.push(unmot[nbmot]);
        	compt++
        	
        	/* Si l'utilisateur n'a pas rentré de valeur dans la longueur, sa valeur par défaut est 5*/ 
        	    if (longueur==""){
        	        longueur=5;}
        	        
			/*Construire contexte gauche et droit*/
			var longueur2=2*Number(longueur);
			var CD = LISTEDEMOTS.slice(nbmot+1, nbmot+1+longueur2);
			var tmp=nbmot-longueur2;
			var tmp2=tmp+longueur2;
			if (tmp < 0) {tmp=0;tmp2=nbmot};
			
			
			var CG = LISTEDEMOTS.slice(tmp, tmp2);
			var contextedroit=CD.join('');
			var contextegauche = CG.join('');
			var resutmp = unmot.replace(pole, "<font color='brown'>"+lepole+"</font>");
		
			table += "<tr><td>"+compt+"</td><td>"+contextegauche+"</td><td>"+resutmp+"</td><td>"+contextedroit+"</td></tr>";
		}
	}
		
		/*Si le mot n'existe pas dans le texte, on alerte l'utilisateur*/
	            if(listedepole == ""){
					alert("Le texte ne contient aucune occurence avec ce pôle :(");
					return;
				}
	
		
	/* Le résultat*/
    table += '</table>';
  
    document.getElementById('page-analysis').innerHTML+=table;
}

	/*Alerter l'utilisateur pour faire fonctionner la fonction*/
	  else{
			alert("Il faut rentrer une valeur dans le pôle ;)");
			}
		}
}


/*------- Action  : Compter les types de phrases ---------*/
function compteur() {
	/*Alerter l'utilisateur si il n'a pas chargé un texte*/
	if (document.getElementById('fileDisplayArea').innerHTML==""){
	alert("Chargez un texte pour m'utiliser :)");}
	
    document.getElementById('page-analysis').innerHTML ="";
    var phrasesType;
	
    /*Choisir le contexte gauche car c'est là que est situé notre texte*/
    phrasesType = document.getElementById("fileDisplayArea").innerText;
	
    /*Délimiter les phrases*/
    document.getElementById("decl").value = phrasesType.split(".").length-1;
	document.getElementById("int").value = phrasesType.split("?").length-1;
	document.getElementById("excl").value = phrasesType.split("!").length-1;
}


/*------- Action  : Mettre tout le texte en majuscule--------*/
function maj() {
	/*Alerter l'utilisateur si il n'a pas chargé un texte*/
	if (document.getElementById('fileDisplayArea').innerHTML==""){
	alert("Chargez un texte pour m'utiliser :)");}
	
	/*Récupérer la page d'analyse*/
	document.getElementById('page-analysis').innerHTML ="";
    /*On récupère le texte*/
    var text = document.getElementById('fileDisplayArea').innerText;

     /*Mettre en majuscule*/
    var textMaj = text.toUpperCase();
    document.getElementById('page-analysis').innerText = textMaj;
	
}

/*------- Action  : Mettre tout le texte en minuscule--------*/
function min() {
	/*Alerter l'utilisateur si il n'a pas chargé un texte*/
	if (document.getElementById('fileDisplayArea').innerHTML==""){
	alert("Chargez un texte pour m'utiliser :)");}
	
	/*Récupérer la page d'analyse*/
	document.getElementById('page-analysis').innerHTML ="";
    /*On récupère le texte*/
    var text = document.getElementById('fileDisplayArea').innerText;

     /*Mettre en majuscule*/
    var textMaj = text.toLowerCase();
    document.getElementById('page-analysis').innerText = textMaj;
	
}




/*------- Action  : Voir le.s mot.s le.s plus long.s ---------*/
function motlong() {
   /*Alerter l'utilisateur si il n'a pas chargé un texte*/
  if (document.getElementById('fileDisplayArea').innerHTML==""){
  alert("Chargez un texte pour m'utiliser :)");}
	
  var toutTexte = document.getElementById("fileDisplayArea").innerText; 
  var arrayOfLines = toutTexte.split("\n"); 
  var lgMax="";
  for (var nblines=0;nblines<arrayOfLines.length;nblines++) {

    var contentxt=arrayOfLines[nblines];
    var mots=contentxt.split(" "); 
    for (var i = 0; i < mots.length; i++) {
      if (mots[i].length > lgMax.length) {lgMax=mots[i]}
    }
  }

document.getElementById('page-analysis').innerHTML =lgMax;
document.getElementById('page-analysis').innerHTML = "<center>Voici le.s mot.s le.s plus long.s du texte :</center><center><font color= '#5b3c11'>" +lgMax;
}

/* ------- Action  : Voir le.s mot.s le.s plus court.s ---------*/
function motcourt() {
	/*Alerter l'utilisateur si il n'a pas chargé un texte*/
	if (document.getElementById('fileDisplayArea').innerHTML==""){
	alert("Chargez un texte pour m'utiliser :)");}
	
	var toutTexte = document.getElementById("fileDisplayArea").innerText; 
	var arrayOfLines = toutTexte.split("\n"); 
	var lgmin=[];
	var longueurMinimum=1000;
	
	/* Utiliser la segmentation en mots */
	var queryDelim=document.getElementById('delimID').value;
	queryDelim += "\n\s\t\"";
	var queryDelim2 = queryDelim.replace(/(.)/gi, "\\$1");
	var reg=new RegExp("["+queryDelim2+"]", "g");

	/* Chercher la longueur minimum */
	for (var nblines=0;nblines<arrayOfLines.length;nblines++) {
		var contentxt=arrayOfLines[nblines];
		var mots=contentxt.split(reg);
		console.log(mots);
		for (var i = 0; i < mots.length; i++) {
			if ((mots[i].length < longueurMinimum) && (mots[i].length > 1)) {
				longueurMinimum=mots[i].length;
			}
		}
	}
	/* Voir si le mot a la longueur minimum --> on le met dans la liste */
	for (var nblines=0;nblines<arrayOfLines.length;nblines++) {
		var contentxt=arrayOfLines[nblines];
		var mots=contentxt.split(reg);
		console.log(mots);
		for (var i = 0; i < mots.length; i++) {
	
			if (mots[i].length == longueurMinimum && (!(lgmin.includes(mots[i].toLowerCase())))) { // test d'inclusion sur le nouveau mot transcodé en minuscule
                    lgmin.push(mots[i].toLowerCase()); /* Mettre en minuscule dans lgmin */
           }
		}
	}

	document.getElementById('page-analysis').innerHTML = "<center>Voici le.s mot.s le.s plus court.s du texte :</center><p>";

	for (var i = 0; i < lgmin.length; i++) {
		document.getElementById('page-analysis').innerHTML +="<font color= '#5b3c11'>" +lgmin[i]+"<br/>";
	}
	document.getElementById('page-analysis').innerHTML += "</b></p>";
}


/*------- Action  : les hapax ---------*/
function hapax() {
	
	/*Alerter l'utilisateur si il n'a pas chargé un texte*/
	if (document.getElementById('fileDisplayArea').innerHTML==""){
	alert("Chargez un texte pour m'utiliser :)");}
	
	
    var doc = document.getElementById("fileDisplayArea").innerText; /*On recupere le texte*/
    doc = doc.toLowerCase(); /* Mettre en minuscule pour que les mots aient la même forme */
 
    var mots = doc.split(/[\n\s,.;:-_!«»*"'?§%$~|&#@=`()]+/);
    //on le segmente en mots
    var mots = mots.sort();
    
    for (i = mots.length; i > 0; i--) { /*Trier par ordre alphabetique */
        if (mots[i] == mots[i - 1]) {
            mots[i] = ""
        }
    }
    
    for (i = 0; i < mots.length; i++) { /* Effacer les mots identiques */
        if (mots[i + 1] == "") {
            mots[i] = ""
        }
    }
    var mots = mots.filter(Boolean);
    
    var nbHapax = mots.length; /*Effacer les items vides*/
    var resultat = "<table class='aboutme'><tr><th><b>Nombre d\'Hapax dans le texte : " + nbHapax + " </b></th></tr>";  
 
    for (i = 0; i < mots.length; i++) {   /* Créer la variable resultat qui sera dans un tableau */
        var resultat = "<tr><td>" + resultat + "</td><td>" + mots[i] + "</td></tr>";
    }
    
    var resultat = resultat + "</table>"; /*Ajouter les résultats/hapax dans le tableau*/

    document.getElementById('page-analysis').innerHTML = resultat;
}

function silence() {
	/*Alerter l'utilisateur si il n'a pas chargé un texte*/
	if (document.getElementById('fileDisplayArea').innerHTML==""){
	alert("Chargez un texte pour m'utiliser :)");}

	document.getElementById("page-analysis").innerText=""; /*On recupere le texte et le contenu*/
	var texte = document.getElementById("fileDisplayArea").innerText;
	
	var car = texte.split(""); /*Mettre en caractere*/
	
	var regex = /[laé]/gi; /*Remplacer ces caractère/regex par notre message chifré ci dessous */
	
	for (var i = 0; i < car.length; i++) {
		if (car[i].match(regex)) {
			texte = texte.replace(car[i], "Chuut Psssst"); /*Pour chaque "l" "a" ou "é" dans le texte, on remplacera par "Chuut Psssst" */
		}
	}
	
	var gif = "<img src='assets/img/film.gif' height=160px><br/>"+ texte + ""; 
	document.getElementById("page-analysis").innerHTML = gif; /* Afficher un gif et notre résultat du message chiffré */
}



/*------- Action  : Télécharger à chaque fois les résultats obtenus dans le page-analysis ---------*/

/*La fonction download() vient de https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server [consulté le 06/04/2023]*/
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

/*-----L'utilisateur peut nommer le fichier avant le téléchargemet---*/
function telechargement() {
	var filename = prompt("Entrez le nom du fichier à télécharger.", "analyse.txt"); /*Ce nom pourra être mondifié par l'utilisateur*/
	var text = document.getElementById("page-analysis").innerText;
	download(filename, text);
}


/*------- Action  : Nettoyer les 2 zones ---------*/
function nettoyage(){
	document.getElementById('page-analysis').innerHTML ="";
	document.getElementById('fileDisplayArea').innerHTML ="";
}


		
			
