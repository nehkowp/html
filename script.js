document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formenvoi").addEventListener("click", async function(event) {
        event.preventDefault(); // Empêcher le formulaire de se soumettre normalement
        
        var prenom = document.getElementById("prenom").value; // Récupérer la valeur de l'input "prenom"  
            // Default options are marked with *
            //http://127.0.0.1:5000/isBorisHere
            //https://isborishere-rhwfxvev7q-ew.a.run.app/isBorisHere
            const response = await fetch("https://isborishere-rhwfxvev7q-ew.a.run.app/isBorisHere", {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, *cors, same-origin
              cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: "same-origin", // include, *same-origin, omit
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: "follow", // manual, *follow, error
              referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify({
                "usage": "is_here",
                "name": prenom
                }), // body data type must match "Content-Type" header
            });
            //console.log(await response.json()); // JSON data parsed by `data.json()` call

            var result = await response.json()
            switch (result.bool_presence) {
                case 0:
                    document.querySelector("#card-2").setAttribute("hidden","");
                    document.querySelector("#card-1").removeAttribute("hidden");

                    document.querySelector("#class-1").innerHTML = result.class_info.summary + "\n" + result.class_info.location;
                    document.querySelector("#presence-1").innerHTML = "Absent(e) | Prochain Cours : ";
                    document.querySelector("#hour-1").innerHTML = calcDay(result.class_info.date_start) + " à " + calcHour(result.class_info.date_start) + " - " + calcHour(result.class_info.date_end);

                    break;
                case 1:
                    document.querySelector("#card-2").setAttribute("hidden","");
                    document.querySelector("#card-1").removeAttribute("hidden");

                    document.querySelector("#presence-1").innerHTML = "Présent(e) | En Cours : ";
                    document.querySelector("#class-1").innerHTML = result.class_info.summary + "\n" + result.class_info.location;
                    document.querySelector("#hour-1").innerHTML = calcDay(result.class_info.date_start) + " à " + calcHour(result.class_info.date_start) + " - " + calcHour(result.class_info.date_end);

                    break;
                case 2:
                    document.querySelector("#card-1").removeAttribute("hidden");
                    document.querySelector("#card-2").removeAttribute("hidden");

                    document.querySelector("#presence-1").innerHTML = "En Pause | Cours Précédent : ";
                    document.querySelector("#class-1").innerHTML = result.class_info.previous_class.summary + "\n" + result.class_info.previous_class.location;
                    document.querySelector("#hour-1").innerHTML = calcDay(result.class_info.previous_class.date_start) + " à " +  calcHour(result.class_info.previous_class.date_start) + " - " + calcHour(result.class_info.previous_class.date_end);
                    
                    document.querySelector("#presence-2").innerHTML = "En Pause | Cours Suivant : ";
                    document.querySelector("#class-2").innerHTML = result.class_info.next_class.summary + "\n" + result.class_info.next_class.location;
                    document.querySelector("#hour-2").innerHTML = calcDay(result.class_info.next_class.date_start) + " à " + calcHour(result.class_info.next_class.date_start) + " - " + calcHour(result.class_info.next_class.date_end);

                    break;

                default:
                  console.log('Sorry, we are out of');
              }
    });
});

function calcHour(timestamp){
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let formatTime = hours + ':' + minutes.substr(-2);
    return formatTime;
}

function calcDay(timestamp) {
    var dateObj = new Date(timestamp * 1000);
    var joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    var moisAbreges = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
    
    var nomJourSemaine = joursSemaine[dateObj.getDay()];
    var nomMoisAbrege = moisAbreges[dateObj.getMonth()];
    var jourMois = dateObj.getDate();
    var dateFormatee = nomJourSemaine + " " + jourMois + " " + nomMoisAbrege;
    return dateFormatee;
}


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

var names = ['AKTAR YALCIN', 'ALAYA INES', 'ALILI SMAIL', 'ARTIGARRET SYLVIE', 'BARRAU NELLY', 'BERTAILS ALAIN', 'BOUTOUIZERA ASME', 'COYNAULT MAGDALEN', 'DECOURCHELLE INES', 'DESPLAT LUCIE', 'DETANT XAVIER', 'DUJOL ROMAIN', 'EHSAN MUHAMMAD', 'ELO CHRISTOPHER', 'FORTIN CAMDAVANT NISRINE', 'FUENTES MARC', 'GALAN SEBASTIEN', 'GARCIA THIERRY', 'GARRIGUE LOUIS', 'GOMES DE OLIVEIRA RAPHAEL', 'GRAVEJAT PHILIPPE', 'HORLAIT BENEDICTE', 'JARIN JEAN-BAPTISTE', 'JOURDAN ASTRID', 'KORTCHEMSKI IRINA', 'KOTTI MAROUA', 'LABRADOR BORIS', 'LACASSY PAULINE', 'LAHOTE CHRISTOPHE', 'LE NIR YANNICK', 'LESCOS DAMIEN', 'LORENZO DEL CASTILLO JUAN ANGEL', 'LOUBIERE PEIO', 'MAC EWEN LESEGO RONALD', 'MARCOU RICHARD', 'MASNADA ELIAN', 'MAUBLANC FRANCOIS', 'MERCADAL JULIEN', 'MEUNIER CAROLINE', 'MODOLO MARIE-EVE', 'MOKRANE NEAL', 'MORONENKO NATALIA', 'OUELHA KARIM', 'PALAFOX JORDY', 'PAUZIES LUCAS', 'PICOD AURELIA', 'POUJADE PHILIPPE', 'PUYOU-LASCASSIES PHILIPPE', 'RANISAVLJEVIC ELISABETH', 'WOLFF AURELIE']

document.addEventListener("DOMContentLoaded", function() {
    var inp = document.getElementById("prenom");
    autocomplete(inp, names);
});
  
