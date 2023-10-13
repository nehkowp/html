document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formenvoi").addEventListener("submit", function(event) {
        event.preventDefault(); // Empêcher le formulaire de se soumettre normalement
        
        var prenom = document.getElementById("prenom").value; // Récupérer la valeur de l'input "prenom"
        
        var xhr = new XMLHttpRequest();
        var url = "https://isborishere-rhwfxvev7q-ew.a.run.app/isBorisHere";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Access-Control-Allow-Origin","*")
        xhr.setRequestHeader("Accept", "*/*"); // Ajouter l'en-tête Accept pour indiquer le type de contenu accepté	
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                console.log(json);
            }else{
                console.error("Erreur de la requête : " + xhr.status);
            }
        };
        var data = JSON.stringify({
            "usage": "is_here",
            "name": prenom // Utiliser la valeur de l'input "prenom" dans la requête
        });
        xhr.send(data);
    });
});