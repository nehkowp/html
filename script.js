document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formenvoi").addEventListener("submit", async function(event) {
        event.preventDefault(); // Empêcher le formulaire de se soumettre normalement
        
        var prenom = document.getElementById("prenom").value; // Récupérer la valeur de l'input "prenom"  
            // Default options are marked with *
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
            console.log(response.json()); // JSON data parsed by `data.json()` call
          
    });
});