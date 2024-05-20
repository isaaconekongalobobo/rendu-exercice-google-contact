const tbLibelle = [];
// Je récupere les differentes sections que j`aurai a utiliser
const sectionContact = document.getElementById ("bloc-contact");
const sectionFormulaire = document.getElementById ("bloc-formulaire");
// Je crée un tableau pour stocker tout les contact 
let tbContact = [];

const blocLibelle = document.getElementById('liste-libelle');
// Je crée une fonction pour créer des nouveaux elements
function createElement(type, properties = {}) {
    const element = document.createElement(type);
    Object.assign(element, properties);
    return element;
}

// Je crée une fonction pour faire la suppression des contacts
function supCo () {
    confirm ("Suprimer ce contact")
}
// ------------------------------------------------------------------------------------
// Je me mets a l`écoute de l`evenement submit du formulaire
document.addEventListener ("submit", function (event) {
    // Je genere un id unique pour chaque contact
    const idCo = crypto.randomUUID();
    const coId = `co${idCo}`;
    // Je récupere les entrée 
    const prenom = document.getElementById ("prenom");
    const nom = document.getElementById ("nom");
    const entreprise = document.getElementById ("entreprise");
    const fonction = document.getElementById ("fonction");
    const email = document.getElementById ("email");
    const numero = document.getElementById ("numero");
    const typeCo = document.getElementById ("type");
    // J`ajoute le contact dans ce tableau qfin de faire des calculs en fonction des libellé
    // tbContact.push ({
    //     coId,
    //     nom,
    //     prenom,
    //     email,
    //     fonction,
    //     typeCo,
    //     numero,
    // })
    // Je récupere la div qui comportera tout les contacts
    const contacts = document.getElementById ("contacts");
    // Je crée une div pour le contact
    const contact = createElement ("div", {
        id : idCo,
        className : "each-contact",
    });
    // Je crée une image pour chaque contact
    const img = createElement ("img", {
        src : "asset/photo_silhouette.png",
        className : "img-contact",
    })
    // Je crée un paragraphe pour le nom
    const titre = createElement ("p", {
        textContent : prenom.value +" "+ nom.value,
    })
    // Je crée un autre paragraphe pour l`email
    const pEmail = createElement ("p", {
        textContent : email.value,
        className : "infos-secondaire",
    })
    // Je crée un paragraphe pour le numero
    const pNumero = createElement ("p", {
        textContent : numero.value,
        className : "infos-secondaire",
    })             
    // Je crée un paragraphe pour la fonction
    const pFonction = createElement ("p", {
        textContent : fonction.value,
        className : "infos-secondaire",
    })     
    // Je crée un paragraphe pour le libelle
    const pLibelle = createElement ("p", {
        textContent : typeCo.value,
        className : "infos-secondaire",
    })              
    // Je crée un bouton pour suprimer
    const btnSup = createElement ("button", {
        id: "",
        textContent : "Suprimer",
        className : "btn-supprimer",
        title : idCo,
    })
    // Je crée un bouton pour modifier le contact
    const btnMod = createElement ("button", {
        id: "",
        textContent : "Modifier",
        className : "btn-modifier",
        title : idCo,
    })
    // J`ajoute tout les éléments créé dans la div du contact
    contact.append (img,titre,pEmail,pNumero,pFonction,pLibelle, btnMod, btnSup)
    // J`ajoute la div ainsi créé dans la div des contacts
    contacts.appendChild (contact);
    // Je recupere le formulaire
    let formContact = document.getElementById ("form-contact");
    // Je le reinitialise
    formContact.reset();
    // Je masque la section du formulaire
    sectionFormulaire.style.display = "none";
    // Ensuite, je mets en évidence l`affichage de tout les contacts
    sectionContact.style.display = "block";
    // Je bloque le comportement par défaut de l`évenement submit
    event.preventDefault();
})

// ----------------------------------------------------------------------------------------------------
// Je me a l`ecoute des evenements click
document.addEventListener ("click", function (event) {
    // Je recupere la cible de l`evenement grace a l`objet event
    let cibleClick = event.target;
    let idCible = event.target.id;
    // J`execute un code pour chaque valeur de idCible
    switch (idCible) {
        // Si la valeur de l`id correspond a celui du bouton creer contact
        case "btnnew-contact":
            // Je masque d`abord l`affichage des contact
            sectionContact.style.display = "none";
            // Ensuite je mets en évidence le formulaire pour ajouter un contact
            sectionFormulaire.style.display = "block";
            break;
        //---------------------------------------------------------------------------------------------
        // Si la valeur de l`id correspond a celui du bouton pour afficher les contacts
        case "btn-contact":
            // Je masque la section du formulaire
            sectionFormulaire.style.display = "none";            
            // Ensuite, je mets en évidence l`affichage de tout les contacts
            sectionContact.style.display = "block";
            break;

        // Si la valeur de l`id correspond a celui du bouton pour masquer le sidebar
        case "btn-sidebar":
            // Je masque l`en tete du header
            document.getElementById ("tete-sidebar").style.display = "none";
            // Je mets en visuel le deuxieme bouton
            document.getElementById ("btn-sidebar2").style.display = "block";
            // Ensuite, je masque le sidebar lui meme
            document.getElementById ("sidebar").style.display = "none";
            break;
    
        // Si la valeur de l`id correspond a celui du bouton pour masquer le sidebar
        case "":
            // Je recupere l`id de la div parente grace au title du bouton
            let idDivParent = event.target.title;
            // Je recupere la div parente
            let divParent = document.getElementById(idDivParent);
            // Je demande a l`utilisateur la confirmation
            confirm ("Voulez-vous vraiment supprimer ce contact");
            divParent.remove ();
            alert ("Contact supprimé");
            break;

        // Si la valeur de l`id correspond a celui du bouton pour afficher le sidebar
        case "btn-sidebar2":
            // Je masque l`en tete du header
            document.getElementById ("tete-sidebar").style.display = "flex";
            // Je mets en visuel le deuxieme bouton
            document.getElementById ("btn-sidebar2").style.display = "none";
            // Ensuite, je mets en visuel le sidebar lui meme
            document.getElementById ("sidebar").style.display = "block";
            break;

        // Si la valeur de l`id correspond a celui du bouton creer libellé
        case "lien-lib":
            // Je recupere le nom du libelle par la methode prompt
            let libelle = prompt ("Créer un libelle"); 
            // Je verifie que l`utilisateur a bel et bien remplie le champ 
            if (libelle == undefined || libelle == "") {
                alert ("Le libelle ne peut pas etre vide")
            } else {
                // Je crée un tableau pour stocker le nombre des elements trouvée avec ce libelle
                let tbNombre = []; 
                // Je récupere le nombre des utilisateurs ayant comme libelle le libelle créé
                for (let i = 0; i< tbContact.length; i++) {
                  if (tbContact[i].libelle == libelle) {
                    tbNombre.push(tbContact[i]);
                  }                   
                }

                // Je crée l`élément li qui aurra comme texte et id la valeur envoyé par l`utilisateur avec le nombre des contact
                // ayant ce libelle
                const lib = createElement ("li", {
                    id : libelle,
                    textContent : libelle +" "+ tbContact.length,
                })
                // Et enfin j`ajoute l`element créé ci haut au bloc des libelle 
                blocLibelle.appendChild (lib)

            }
            break;
            // -----------------------------------------------------------------------------------------
    
        default:
            break;
    } 
})
