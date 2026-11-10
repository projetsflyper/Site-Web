    "use strict";

    const boutonTheme = document.getElementById("themeToggle");
    const iconeTheme = boutonTheme.querySelector("i");
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    let themeEnregistre;
    try{themeEnregistre=localStorage.getItem("flyper-theme")}catch{}
    if(themeEnregistre==="light")document.documentElement.dataset.theme="light";
    function actualiserBoutonTheme(){const themeClair=document.documentElement.dataset.theme==="light";const action=themeClair?"sombre":"clair";boutonTheme.setAttribute("aria-label","Activer le thème "+action);boutonTheme.title="Activer le thème "+action;iconeTheme.className="fa-solid "+(themeClair?"fa-moon":"fa-sun");metaTheme.content=themeClair?"#eef3fc":"#0b1020"}
    actualiserBoutonTheme();
    boutonTheme.addEventListener("click",()=>{const themeClair=document.documentElement.dataset.theme!=="light";document.documentElement.dataset.theme=themeClair?"light":"dark";try{localStorage.setItem("flyper-theme",themeClair?"light":"dark")}catch{}actualiserBoutonTheme()});

    const adresseMinecraft = "flyper.falix.me";
    const versionMinecraft = "NeoForge 26.1.2";

    const boutonMenu = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation-principale");
    function fermerMenu(){boutonMenu.setAttribute("aria-expanded","false");boutonMenu.setAttribute("aria-label","Ouvrir le menu");navigation.classList.remove("ouverte");document.body.classList.remove("menu-ouvert")}
    boutonMenu.addEventListener("click",()=>{const ouvert=boutonMenu.getAttribute("aria-expanded")==="true";boutonMenu.setAttribute("aria-expanded",String(!ouvert));boutonMenu.setAttribute("aria-label",ouvert?"Ouvrir le menu":"Fermer le menu");navigation.classList.toggle("ouverte",!ouvert);document.body.classList.toggle("menu-ouvert",!ouvert)});
    navigation.querySelectorAll("a").forEach(lien=>lien.addEventListener("click",fermerMenu));document.addEventListener("keydown",event=>{if(event.key==="Escape")fermerMenu()});window.addEventListener("resize",()=>{if(window.innerWidth>760)fermerMenu()});

    const entete=document.getElementById("entete");function mettreAJourEntete(){entete.classList.toggle("defile",window.scrollY>10)}window.addEventListener("scroll",mettreAJourEntete,{passive:true});mettreAJourEntete();
    const elementsReveal=document.querySelectorAll(".reveal");if("IntersectionObserver" in window){const observateur=new IntersectionObserver((entrees,observer)=>{entrees.forEach(entree=>{if(entree.isIntersecting){entree.target.classList.add("visible");observer.unobserve(entree.target)}})},{threshold:.12});elementsReveal.forEach(element=>observateur.observe(element))}else{elementsReveal.forEach(element=>element.classList.add("visible"))}

    const notification=document.getElementById("notification");let minuteurNotification;function afficherNotification(message){notification.textContent=message;notification.classList.add("visible");clearTimeout(minuteurNotification);minuteurNotification=setTimeout(()=>notification.classList.remove("visible"),2800)}

    const boutonCopier=document.getElementById("copierAdresse");
    if(boutonCopier){boutonCopier.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(adresseMinecraft);afficherNotification("Adresse Minecraft copiée !")}catch{afficherNotification("Adresse : "+adresseMinecraft)}})}

    document.querySelectorAll("[data-dialog]").forEach((bouton) => {
      bouton.addEventListener("click", () => {
        const dialogue = document.getElementById(bouton.dataset.dialog);
        if (dialogue && typeof dialogue.showModal === "function") dialogue.showModal();
      });
    });

    document.querySelectorAll(".dialogue-projet").forEach((dialogue) => {
      dialogue.querySelectorAll(".fermer-dialogue").forEach((bouton) => {
        bouton.addEventListener("click", () => dialogue.close());
      });
      dialogue.addEventListener("click", (event) => {
        if (event.target === dialogue) dialogue.close();
      });
    });
    document.getElementById("copierAdresseDialogue").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("flyper.falix.me");
        afficherNotification("Adresse Minecraft copiée !");
      } catch {
        afficherNotification("Adresse : flyper.falix.me");
      }
    });

    const terminalFormulaire=document.getElementById("terminalFormulaire");
    const terminalCommande=document.getElementById("terminalCommande");
    const terminalSortie=document.getElementById("terminalSortie");
    const commandes={help:"Commandes disponibles :\nhelp, projects, minecraft, about, community, contact, clear",projects:"Mes projets : mon site Flyper, mon serveur Minecraft et de futures créations.",minecraft:"Serveur Minecraft : "+adresseMinecraft+"\nTu peux retrouver l’adresse dans la section Serveur Minecraft.",about:"Flyper explore le web, le gaming et les nouvelles technologies.",community:"Retrouve les aventures Flyper sur Twitch. Le lien se trouve dans la section Communauté.",contact:"Contact : utilise le formulaire de la section Contact en bas de la page."};
    terminalFormulaire.addEventListener("submit",event=>{event.preventDefault();const commande=terminalCommande.value.trim().toLowerCase();if(!commande)return;if(commande==="clear"){terminalSortie.textContent="";terminalCommande.value="";return}terminalSortie.textContent=commandes[commande]||`Commande inconnue : "${commande}". Tape help pour voir les commandes.`;terminalCommande.value=""});
    document.getElementById("annee").textContent=new Date().getFullYear();

    /* ===== AJOUT : formulaire de contact ===== */
    const configurationContact = {
      // Colle ici l'adresse d'envoi fournie par ton service de formulaires (ex. https://formspree.io/f/xxxxxxxx).
      // Si elle reste vide, le formulaire ouvre le logiciel de messagerie du visiteur (solution de repli).
      endpoint: "",
      // Adresse de réception, coupée en deux pour ne pas apparaître en clair dans le code.
      destinataire: ["projets.flyper.23565", "gmail.com"]
    };
    const formulaireContact = document.getElementById("formulaireContact");
    if (formulaireContact) {
      const boutonContact = document.getElementById("contactEnvoyer");
      const statutContact = document.getElementById("contactStatut");
      const afficherStatutContact = (message, erreur) => {
        statutContact.textContent = message;
        statutContact.dataset.etat = erreur ? "erreur" : "ok";
      };
      formulaireContact.addEventListener("submit", async (event) => {
        event.preventDefault();
        const donnees = new FormData(formulaireContact);
        const nom = String(donnees.get("nom") || "").trim();
        const email = String(donnees.get("email") || "").trim();
        const message = String(donnees.get("message") || "").trim();
        if (!nom || !email || !message) {
          afficherStatutContact("Merci de remplir tous les champs.", true);
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          afficherStatutContact("Cette adresse e-mail ne semble pas valide.", true);
          return;
        }
        // Champ piège : invisible pour une personne, souvent rempli par les robots.
        if (donnees.get("site_web")) {
          afficherStatutContact("Message envoyé, merci !", false);
          formulaireContact.reset();
          return;
        }
        donnees.delete("site_web");
        if (!configurationContact.endpoint) {
          const adresse = configurationContact.destinataire.join("@");
          const sujet = encodeURIComponent("Message depuis le site Flyper — " + nom);
          const corps = encodeURIComponent(message + "\n\n— " + nom + " (" + email + ")");
          afficherStatutContact("Ton logiciel de messagerie va s’ouvrir pour envoyer le message.", false);
          window.location.href = "mailto:" + adresse + "?subject=" + sujet + "&body=" + corps;
          return;
        }
        boutonContact.disabled = true;
        afficherStatutContact("Envoi en cours…", false);
        try {
          const reponse = await fetch(configurationContact.endpoint, {
            method: "POST",
            body: donnees,
            headers: { Accept: "application/json" }
          });
          if (!reponse.ok) throw new Error("HTTP " + reponse.status);
          afficherStatutContact("Message envoyé, merci ! Je te répondrai dès que possible.", false);
          formulaireContact.reset();
        } catch {
          afficherStatutContact("L’envoi a échoué. Réessaie plus tard.", true);
        } finally {
          boutonContact.disabled = false;
        }
      });
    }
