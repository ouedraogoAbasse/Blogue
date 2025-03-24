
document.addEventListener("DOMContentLoaded", function () {
    // --- Gestion du formulaire de contact ---
  
    // On suppose que votre formulaire a l'ID "contact-form"
    // et qu'un élément pour afficher les messages (succès ou erreur) porte l'ID "contact-message"
    const contactForm = document.getElementById("contact-form");
    const contactMessage = document.getElementById("contact-message");
  
    if (contactForm) {
      contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche le rechargement de la page
  
        // Récupération des données du formulaire
        const formData = new FormData(contactForm);
  
        // Remplacez {votre-id-formspree} par votre identifiant Formspree obtenu lors de la configuration
        const formspreeURL = "https://formspree.io/f/mjkgnjva";
  
        // Envoi des données via Fetch API
        fetch(formspreeURL, {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
          body: formData
        })
        .then(response => {
          if (response.ok) {
            // Affiche un message de succès et réinitialise le formulaire
            if (contactMessage) {
              contactMessage.textContent = "Merci ! Votre message a été envoyé.";
            }
            contactForm.reset();
          } else {
            // Gestion des erreurs renvoyées par le serveur
            response.json().then(data => {
              if (data.errors) {
                if (contactMessage) {
                  contactMessage.textContent = data.errors.map(error => error.message).join(", ");
                }
              } else {
                if (contactMessage) {
                  contactMessage.textContent = "Une erreur est survenue lors de l'envoi du message.";
                }
              }
            });
          }
        })
        .catch(error => {
          // Gestion des erreurs de réseau ou autres
          if (contactMessage) {
            contactMessage.textContent = "Une erreur est survenue : " + error;
          }
        });
      });
    }
  
    // --- Gestion de la navigation responsive ---
  
    // Supposons que vous ayez un bouton/menu avec l'ID "nav-toggle"
    // et un conteneur de menu avec l'ID "nav-menu"
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
  
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", function () {
        // Ajoute ou retire la classe "active" pour afficher ou masquer le menu
        navMenu.classList.toggle("active");
      });
    }
  });
  