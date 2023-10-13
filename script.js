document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formenvoi").addEventListener("click", async function(event) {
        event.preventDefault(); // Empêcher le formulaire de se soumettre normalement
        
        var prenom = document.getElementById("prenom").value; // Récupérer la valeur de l'input "prenom"  
            // Default options are marked with *
            //http://127.0.0.1:8080/isBorisHere
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
