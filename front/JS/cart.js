//on defit le point de depart du panier
let totalPanier = 0;
// on verifie que le panier existe bien
const localStorageProducts = JSON.parse(localStorage.getItem("products"));

// on va chercher les produits presents dans le pannier
for (let product of localStorageProducts) {
  //on recuperer le reste des info necessaire a la construction de notre panier
  const productUrl = "http://localhost:3000/api/products/" + product.productId;
  fetch(productUrl)
    // récupérer le résultat de la requête au format json
    .then(function (res) {
      // si la réponse est positive
      if (res.ok) {
        // on créer le panier
        return res.json();
      }
      
    })
    // les élements du panier seront appelés item
    .then(function (item) {
      afficherProductPanier(item);
    })
    // En cas d'erreur on crée le titre h1 pour l' erreur 404
    // et on renvoit en console l'erreur.
    .catch((err) => {
      document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
      console.log("erreur 404, sur ressource api:" + err);
    
    });
  // on crée la fonction d'affichage du panier
  function afficherProductPanier(item) {
    // creer le dom en JS
    console.log(item);
    // s'il y a des produits dans le panier on crée l'article
    let articlePanier = document.createElement("article");
    // on ajoute la classe CSS cart__item à articlePanier.
    articlePanier.classList.add("cart__item");
    // on ajoute l'ID du produit à l'article du panier
    articlePanier.dataset.id = product.productId;
    // on ajoute la couleur du produit à l'article du panier
    articlePanier.dataset.color = product.color;
    // on rattache la class cart__item à la section cart__items
    cart__items.appendChild(articlePanier);
    //on crèe l'image du produit dans l'article du panier
    let articleImage = document.createElement("img");
    // on crée la class "cart__item__img"
    articleImage.classList.add("cart__item__img");
    // on récupère la source de l'image
    articleImage.src = item.imageUrl;
    //on récuprère la descriptipn de l'image
    articleImage.textContent = item.altTxt;
    // on rattache cart__item__img à cart__item
    articlePanier.appendChild(articleImage);
    //on crèe class item__content enfant de cart__items
    let articleContent = document.createElement("div");
    // on crée la class cart__item__content
    articleContent.classList.add("cart__item__content");
    // on rattache cart__item__content à cart__item
    articlePanier.appendChild(articleContent);
    // on crée la class description enfant de Content
    let articleDescription = document.createElement("div");
    // on crée la class cart__item__content__description
    articleDescription.classList.add("cart__item__content__description");
    // on rapatrie le contenu html de la description
    /*articleDescription.innerHTML = item.description;*/
    // on rattache la description à content
    articleContent.appendChild(articleDescription);
    // on crée le Titre du produit enfant de Description
    let articleName = document.createElement("h2");
    // on crée la class cart__item__content__description
    articleName.classList.add("cart__item__content__description");
    //on crécupère le nom (HTML) de l'article
    articleName.innerHTML = item.name;
    // on rattache le nom de l'article à sa descrition
    articleDescription.appendChild(articleName);
    // on crée la couleur du produit enfant de description
    let articleColor = document.createElement("p");
    // on récupère la couleur choisie
    articleColor.textContent = product.color;
    // on rattache la couleur à la descritipn
    articleDescription.appendChild(articleColor);
    // on crée le prix du produit enfant de description
    let articlePrice = document.createElement("p");
    // on récupère le prix du produit
    articlePrice.textContent = item.price + " €";
    //on rattache le prix à la description
    articleDescription.appendChild(articlePrice);
    // création de content settings enfant de content soeur de description
    let articleSettings = document.createElement("div");
    articleSettings.classList.add("cart__item__content__settings");
    articleContent.appendChild(articleSettings);
    // création de la div quantity enfant de settings
    let articleSettingsQuantity = document.createElement("div");
    // on crée la class cart__item__content__settings__quantity
    articleSettingsQuantity.classList.add(
      "cart__item__content__settings__quantity"
    );
    //on rattache articleSettingsQuantity à articleSettings
    articleSettings.appendChild(articleSettingsQuantity);
    // on ajoute de la quantité choisie
    let articleQuantity = document.createElement("p");
    // on recupère la quantité choisie
    articleQuantity.textContent = "Qté :";
    // on rattache la quantité à articleSettingsQuantity
    articleSettingsQuantity.appendChild(articleQuantity);
    // ajout des input de la quantité enfant de settings quantity
    // pour que le client puisse crée sont panier
    let quantityInput = document.createElement("input");
    // il crée la quantité
    quantityInput.type = "number";
    quantityInput.classList.add("itemQuantity");
    quantityInput.name = "itemQuantity";
    // quantité minium de produit à selectionner pour crée le panier
    quantityInput.min = "1";
    // quantité maximum de produits que peut contenir le panier
    quantityInput.max = "100";
    quantityInput.setAttribute("value", product.quantity);
    // on rattache l'input à articleSettingsQuantity
    articleSettingsQuantity.append(quantityInput);
    console.log(item);
    // modification du nombre d'articles du panier
    // ajout de l'appel à la suppression enfant de delete
    // a chaque fois que le client supprime un produit du panier
    articleQuantity.addEventListener("change", () => {
      // on recherche la ligne contenant l'id du produit supprimé
      for (let k = 0; k < localStorageProducts.length; k++) {
        if (localStorageProducts[k].productId == product.quantity) {
          console.log(
            "je modifie la quantité de l'article n° " +
              product.quantity +
              " égal à " +
              localStorageProducts[k].productId
          );
        }
        // on stocke les modifications dans le localStorage
        localStorage.setItem("products", JSON.stringify(localStorageProducts));
      }
    });
    //fonction de mise à jour panier
    // Je crée l'événement de modification de type change
    quantityInput.addEventListener("change", updateValue);
    // Je crée la fonction de mise à jour
    function updateValue() {
      // pour chaque produit du tableau localStorageProducts
      for (let i = 0; i < localStorageProducts.length; i++) {
        // si l'id et la couleur du produit sont identiques à
        // ceux d'un produit deja dans le localstorage

        if (
          product.productId === localStorageProducts[i].productId &&
          product.color === localStorageProducts[i].color
        ) {
          // je supprime le prix de ce produit de la somme totale
          totalPanier =
            totalPanier -
            localStorageProducts[i].quantity * parseInt(item.price);
          // la quantité du produit devient la valeur (nombre) de notre champ itemQuantity
          localStorageProducts[i].quantity = parseInt(quantityInput.value, 10);
          //je crée le prix du panier avec la nouvelle quantité
          totalPanier =
            totalPanier +
            localStorageProducts[i].quantity * parseInt(item.price);
          // afficher la somme totale des prix grace a la fonction prixTotal
          prixTotal(totalPanier);
          break;
        }
      }
      // j'enregistre les nouvelles donées dans le localStorage
      localStorage.setItem("products", JSON.stringify(localStorageProducts));
    }
    // on crée la div suppression enfant de settings
    let contentSettingsDelete = document.createElement("div");
    // on crée la class cart__item__content__settings__delete
    contentSettingsDelete.classList.add(
      "cart__item__content__settings__delete"
    );
    // on rattache contentSettingsDelete à articleSettings
    articleSettings.append(contentSettingsDelete);
    // on ajoute le boutton supprimer enfant de delete
    let deleteBtn = document.createElement("p");
    //on crée la classe deleteItem
    deleteBtn.classList.add("deleteItem");
    // on recupère le texte du bouton
    deleteBtn.textContent = "Supprimer";
    // on rattache le boutton à contentSettingsDelete
    contentSettingsDelete.append(deleteBtn);
    // on va rendre le boutton interactif
    // lorsque le cleint click sur supprimer,
    deleteBtn.addEventListener("click", () => {
      // pour  chaque produit J du tableau localStorageProducts
      for (let j = 0; j < localStorageProducts.length; j++) {
        // si l'id et la couleur du produit sont identiques à
        // ceux d'un produit dans le localstorge
        if (
          product.productId === localStorageProducts[j].productId &&
          product.color === localStorageProducts[j].color
        ) {
          // on retire l'élément ayant la position j du tableau localStorageProducts
          // 1>0 donc on va supprimer
          localStorageProducts.splice(j, 1);
          // puis on actualise la page
          window.location.reload();
        }
      }
      // et on stocke les produits dans le localStorage
      localStorage.setItem("products", JSON.stringify(localStorageProducts));
    });
    // le montant total du panier est initialisé à 0 et,
    //à chaque evenement on fait le calcule:
    //le montant total du panier + le produit ajouté * par la quantité ajoutée
    totalPanier = totalPanier + parseInt(item.price) * product.quantity;
    prixTotal(totalPanier);
  }
  // on récupère l'id "total price" dans le Html
  function prixTotal(totalPanier) {
    document.getElementById("totalPrice").innerHTML = totalPanier;
  }
  //////////on crèe les conditions de validation de la commande///////////
  // le panier
  // je récupère le formulaire
  let finPanier = document.querySelector(".cartAndFormContainer");
  //je déclare contact le formulaire que je vais le remplir au fur et à mesure de la validation
  let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
  };
  // je récupère le formulaire
  let formulaire = document.querySelector(
    '.cart__order__form input[type= "submit"]'
  );
  //je récupère les inputs
  // je crée la class cart__order__form__question
  let inputs = document.querySelector(".cart__order__form__question");
  // je déclare les champs obligatoires du formulaire
  let firstName = document.querySelector("#firstName");
  let lastName = document.querySelector("#lastName");
  let address = document.querySelector("#address");
  let email = document.querySelector("#email");
  let city = document.querySelector("#city");
  // je déclare les messages d'erreur du formulaire
  let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
  let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
  let addressErrorMsg = document.querySelector("#addressErrorMsg");
  let emailErrorMsg = document.querySelector("#emailErrorMsg");
  let cityErrorMsg = document.querySelector("#cityErrorMsg");
  //je formate les champs du formulaire avec regex
  let firstNameRegex = /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/;
  let lastNameRegex = /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/;
  let addressRegex = /^[A-Za-z0-9]+(\s+([A-Za-z]+\s+)+)[A-Za-z0-9]+$/;
  let cityRegex = /^[A-Za-z0-9]+ [A-Za-z0-9]+$/;
  let emailRegex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  // pour valider la commande
  let submit = document.querySelector("#order");
  //conditions avec regex et return des valeur boléennes
  // selon si les conditions sont remplies ou pas pour chaque input
  /////////firstName/////////
  // si la condition est remplie
  firstName.addEventListener("input", function (e) {
    //arrête d'écouter après le résultat valide
    validFirstName(e.target.value);
    //récupération des valeurs pour construire l'objet contact
    contact.firstName = e.target.value;
    console.log(contact, "test confirst");
  });

  // si la condition n'est pas remplie
  function validFirstName(firstName) {
    //on déclare la validation sur faux
    let valid = false;
    //on test la regex
    let testName = firstNameRegex.test(firstName);
    if (testName) {
      //si il n'y a pas de message d'erreur valid est true
      firstNameErrorMsg.textContent = "";
      valid = true;
    } else {
      //si il y a un message d'erreur valide reste false
      firstNameErrorMsg.textContent =
        "le prénom doit avoir 3 lettres minimum et sans caractères spéciaux ni chiffres SVP !!!";
      //on retourne le résultat de valid pour chaque champ
      valid = false;
    }
    return valid;
  }

  /////////lastName/////////
  lastName.addEventListener("input", function (e) {
    validLastName(e.target.value);
    contact.lastName = e.target.value;
  });
  function validLastName(lastName) {
    let valid = false;
    let testLastName = lastNameRegex.test(lastName);
    if (testLastName) {
      lastNameErrorMsg.innerText = "";
      valid = true;
    } else {
      lastNameErrorMsg.textContent =
        "le nom doit avoir 3 lettres minimum sans caractères spéciaux ni chiffres SVP !!!";
      valid = false;
    }
    return valid;
  }

  /////////adress/////////
  address.addEventListener("input", function (e) {
    validAddress(e.target.value);
    contact.address = e.target.value;
  });

  function validAddress(address) {
    let valid = false;
    let testAddress = addressRegex.test(address);
    if (testAddress) {
      addressErrorMsg.textContent = "";
      valid = true;
    } else {
      addressErrorMsg.textContent =
        "veuillez donner une adresse valide, max 50 caractères";
      valid = false;
    }
    return valid;
  }

  /////////city/////////
  city.addEventListener("input", function (e) {
    validCity(e.target.value);
    contact.city = e.target.value;
  });

  function validCity(city) {
    let valid = false;
    let testCity = cityRegex.test(city);
    if (testCity) {
      cityErrorMsg.textContent = "";
      valid = true;
    } else {
      cityErrorMsg.textContent =
        "veuillez donner le nom de votre ville et son code postal !!! ";
      valid = false;
    }
    return valid;
  }

  /////////email/////////
  email.addEventListener("input", function (e) {
    validEmail(e.target.value);
    contact.email = e.target.value;
  });

  function validEmail(email) {
    let valid = false;
    let testEmail = emailRegex.test(email);
    if (testEmail) {
      emailErrorMsg.textContent = "";
      valid = true;
    } else {
      emailErrorMsg.textContent =
        "Email non valide, il doit contenir un @ et 1 point suivi de maxixum 4 lettres, exemple moi@monmail.com";
      valid = false;
    }
    return valid;
  }
  // les conditions pour valider la commande
  // on crée le numéro de la commande
  let idproducts = [];
  //on ecoute le bouton de validation de commande orderButton
  let orderButton = document.querySelector("#order");
    orderButton.addEventListener("click", (e) => {
      e.preventDefault();
    
      // si l'un des champs du formulaire n'est pas correctement rempli
      if (
        firstNameRegex.test(firstName.value) == false ||
        lastNameRegex.test(lastName.value) == false ||
        addressRegex.test(address.value) == false ||
        cityRegex.test(city.value) == false ||
        emailRegex.test(email.value) == false
      ) {
        // alors message d'alerte
        window.alert(
          "Vos informations de contact ne correspondent pas aux standards demandés !"
        );
      }
      //si l'un des champs du formulaire est  vide
      else if (
        firstName.value === "" ||
        lastName.value === "" ||
        address.value === "" ||
        city.value === "" ||
        email.value === ""
      ) {
        // alors message d'alerte
        window.alert(
          "Vous devez renseigner vos coordonnées pour valider votre commande !"
        );
      }
       // si tous les champs du formulaire sont correctement remplis
      else {
        //on crée le contact client dans LS
        localStorage.setItem("contact", JSON.stringify(contact));

        // puis on crée la commande composée de contact et products
        for (let product of localStorageProducts) {
          idproducts.push(product.productId);
        }

        let order = {
          contact: contact,
          products: idproducts,
        };
        console.log(contact, "testtest");

        // fetch avec POST transforme JSON grace aux headers informations et crée la nouvelle commande
        //méthode http body = données que l'on souhaite envoyer
        // on récupère la commande dans l'API
        fetch("http://localhost:3000/api/products/order", {
          // on indique qu'il faut en créer un nouvelle
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            // on crée l'id de la commande
            let orderId = data.orderId;
            location.href = "./confirmation.html?order_id=" + data.orderId;

            console.log(orderId, "orderOTest");
          });
      }
    });
}


