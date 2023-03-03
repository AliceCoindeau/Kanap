// cette page affiche le produit selectioné par le client
// on va recupère l'url du produit qu'on veut afficher
const urlcour = document.location.href;
// en partant de l'url du produit, on cree une nouvelle URL
// pour chaque affichage
const url = new URL(urlcour);
// on recupère l'ID du produit selectionné par la méthode get
const id = url.searchParams.get("_id");
// on affiche le résultat dans la console
console.log(id);
// on a crée la nouvelle page, 
//on Récupère la liste des produits depuis l'api par leur id
fetch("http://localhost:3000/api/products/" + id)
  //si l'url fonctionne on répuère son contenu
  .then(function (res) {
    console.log(res, "response");
    // si la réponse est bonne on crée son JSON
    if (res.status === 200) {
      return res.json();
    }
  })
  // une fois le contenu récupéré on veut afficher le produit selectionné
  // on crée donc la fonction product
  .then(function (product) {
    console.log(product);
    diplayProduct(product);
  });
  //afficher le produit de la classe item séléction
function diplayProduct(selected) {
  //on crèe l'image du produit
  let img = document.createElement("img");
  // la source de l'image selectionée
  img.src = selected.imageUrl;
  //on crée l'image "img" enfant de item__img
  document.querySelector(".item__img").appendChild(img);
  //on crée le nom du produit
  document.querySelector("#title").innerHTML = selected.name;
  // on crée la description du produit
  document.querySelector("#description").innerHTML = selected.description;
  //on crée le prix du produit
  document.querySelector("#price").innerHTML = selected.price;
  //on crée la couleur
  let htmlColor = document.querySelector("#colors");
  //chaque produit a plusieurs couleur 
  //on crée le choix de la couleur
  const colors = selected.colors;
  //on crée les options de couleurs
  for (let i = 0; i < selected.colors.length; i++) {
    console.log(selected.colors[i], "choice");
    htmlColor.innerHTML += `<option value="${selected.colors[i]}">${selected.colors[i]}</option>`;
  }
}
//on ajoute les produits dans le panier
//on crée le bouton ajout vers le panier
const toCartBtn = document.getElementById("addToCart");

// validation du panier par click
toCartBtn.addEventListener("click",() => {
  // on s'assure que le client a choisi 1 quantité et une couleur
  let selected = {
    //il y bien un produit selectionné
    productId: id,
    // le  produit a un nom
    name: document.createElement("title").innerHTML,
    //il faut selectionner une quantité
    quantity: parseInt(document.getElementById("quantity").value, 10),
    // il faut selectionner une couleur
    color: document.getElementById("colors").value,
  };
  console.log(selected);
  // on vérifie le localsotage
  let localStorageProducts = JSON.parse(localStorage.getItem("products"));
  //si le panier est vide
  let findProduct = false;
  let selectedName = document.querySelector("#title").innerHTML;
  // on definit le panier vide par la position "0"
  let position = 0;
  //si le panier contient une quantité = 0 ou aucune couleur
  //alors message d'alerte
  if (selected.quantity === 0 || selected.color === "") {
    alert("veuillez selectionner la couleur et/ou la quantité");
    return;
  }
  // si non
  else {
    alert(
      `Le canapé ${selectedName} ${selected.color} a été ajouté en ${selected.quantity} exemplaires dans votre panier`
    );
  }
  //on verifie les produits qui sont dans le panier
  //si les produits sont en stock
  if (localStorageProducts) {
    // et que la quantité selectionée est disponible
    for (let i = 0; i < localStorageProducts.length; i++) {
      //si la quantité dans le panier est en stocks et
      if (
        selected.productId === localStorageProducts[i].productId &&
        // que la couleur choisie y est aussi
        selected.color === localStorageProducts[i].color
      ) {
        //alors on peut valider le panier
        findProduct = true;
        // et changer la position dans le tableau
        position = i;
        break;
      }
    }
    //si le produit dans le panier est bien en stock, on valide le panier
    if (findProduct == true) {
      //si l'exemplaire choisi est déja dans le panier, on additione
      localStorageProducts[position].quantity =
        localStorageProducts[position].quantity + selected.quantity;
      // sinon on crée une nouvelle instance de ce produit
    } else {
      localStorageProducts.push(selected);
    }
  } else {
    // ou alors on crée une nouvelle position
    localStorageProducts = [];
    localStorageProducts.push(selected);
  }
  // on sauvegarde les choix du client dans la base
localStorage.setItem("products", JSON.stringify(localStorageProducts));
});