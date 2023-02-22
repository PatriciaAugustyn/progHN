
		
		/* Clicker sur le bouton et il affiche le texte avec un effet d'écriture */
		var lettre = 0;
		var txt = 'Bonjour à tous !'; /* Le texte que l'on veut afficher */
		var speed = 80; /* La durée de l'effet en .ms */

		function typeWriter() {
			if (lettre < txt.length) {
				document.getElementById("demo").innerHTML += txt.charAt(lettre);
				lettre++;
				setTimeout(typeWriter, speed);
				}
			}

		
		/* Afficher ou enlever*/
		const divContainer	= document.querySelector("#elementto");
		let isClick = true;

		let showOrHide = function(){
			if(isClick) {
				divContainer.style.display = "block";
				isClick = false;
			} 
			else {
				divContainer.style.display = "none";
				isClick = true;
			}
		}
		
		
			
