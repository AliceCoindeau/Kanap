let localStorageProducts = JSON.parse(localStorage.getItem("products"))
console.log(localStorageProducts,"Local");
for (let product of localStorageProducts){
  //Requeter l'API pour recuperer le reste des info necessaire a la construction de notre panier
  const productUrl = "http://localhost:3000/api/products/" + product.productId;

  fetch(productUrl)
    // récupérer le résultat de la requête au format json
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    // ce qui est été traiter en json sera appelé item
    .then(function (item) {
      afficherProductPanier(item);
    })

    // En cas d'erreur h1 au contenu de erreur 404 et renvoit en console l'erreur.
    .catch((err) => {
      document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
      console.log("erreur 404, sur ressource api:" + err);
    });
//fonction d'affichage du panier
  function afficherProductPanier(item) {
    // creer le dom en JS
    let articlePanier = document.createElement("article");
    // ajouter la classe CSS cart__item à ArticlePanier.
    articlePanier.classList.add("cart__item");
    // ajouter la data-id
    articlePanier.dataset.id = product.productId;
    // ajouter la data-color
    articlePanier.dataset.color = product.color;
    cart__items.append(articlePanier);

    //image du produit
    let articleImage = document.createElement("img");
    articleImage.classList.add("cart__item__img");
    articleImage.src = item.imageUrl;
    articleImage.textContent = item.altTxt;
    articlePanier.appendChild(articleImage);

    //class item content enfant de articlePanier
    let articleContent = document.createElement("div");
    articleContent.classList.add("cart__item__content");
    articlePanier.appendChild(articleContent);

    // class description enfaant de Content
    let articleDescription = document.createElement("div");
    articleDescription.classList.add("cart__item__content__description");
    articleDescription.innerHTML = item.description;
    articleContent.appendChild(articleDescription);

    // Titre du produit enfant de Description
    let articleName = document.createElement("h2");
    articleName.classList.add("cart__item__content__description");
    articleName.innerHTML = item.name;
    articleDescription.appendChild(articleName);

    // couleur du produit enfant de description
    let articleColor = document.createElement("p");
    articleColor.textContent = item.color;
    articleDescription.append(articleColor);

    // prix du produit enfant de description
    let articlePrice = document.createElement("p");
    articlePrice.textContent = item.price + " €";
    articleDescription.append(articlePrice);

    // création de la sous-div content settings enfant de content
    let articleSettings = document.createElement("div");
    articleSettings.classList.add("cart__item__content__settings");
    articleContent.append(articleSettings);

    // création de la div quantity enfant de settings
    let articleSettingsQuantity = document.createElement("div");
    articleSettingsQuantity.classList.add(
      "cart__item__content__settings__quantity"
    );
    articleSettings.append(articleSettingsQuantity);

    // ajout de la quantité
    let articleQuantity = document.createElement("p");
    articleQuantity.textContent = "Qté :";
    articleSettingsQuantity.append(articleQuantity);

    // ajout des input de la quantité enfant de settings quantity
    let quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.classList.add("itemQuantity");
    quantityInput.name = "itemQuantity";
    quantityInput.min = 1;
    quantityInput.max = 100;
    quantityInput.value = item.quantity;
    articleSettingsQuantity.append(quantityInput);

    // création de la div suppression enfant de settings
    let contentSettingsDelete = document.createElement("div");
    contentSettingsDelete.classList.add("cart__item__content__settings__delete");
    articleSettings.append(contentSettingsDelete);

    // ajout de l'appel à la suppression enfant de delete
    let deleteBtn = document.createElement("p");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.classList.add("deleteItem");
    contentSettingsDelete.append(deleteBtn);

    // requête vers l'API pour récupérer les prix
    function panierPrice(url) {
      fetch(url)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (data) {
          // console.log(data.price);
          return data.price;
        })
        .catch(function (err) {
          console.log(err);
        });  
  }

  }
}
