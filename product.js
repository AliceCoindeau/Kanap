//on va recuperer l'url de la page produits
const urlcour = document.location.href;
const url = new URL(urlcour);
const id = url.searchParams.get("_id");
console.log(id);
// Récupération des produits depuis l'api
fetch("http://localhost:3000/api/products/" + id)
  .then(function (res) {
    console.log(res, "response");
    if (res.status === 200) {
      return res.json();
    }
  })
  .then(function (product) {
    console.log(product);
    diplayProduct(product);
  });

// fonction d'affichage du produit de l'api
function diplayProduct(selection) {
  let img = document.createElement("img");
  img.src = selection.imageUrl;
  document.querySelector(".item__img").appendChild(img);
  document.querySelector("#title").innerHTML = selection.name;
  document.querySelector("#description").innerHTML = selection.description;
  document.querySelector("#price").innerHTML = selection.price;
  document.querySelector("#colors").innerHTML = selection.colors;
  const colors = selection.colors;
  //Création des options de couleurs
  let fragment = document.createDocumentFragment();
  for (let color of colors) {
    let option = document.createElement("option");
    option.setAttribute("value", `${color}`);
    option.textContent = `${color}`;
    fragment.appendChild(option);
  }
  document.querySelector("#colors").appendChild(fragment);
}
/////////Ajout d'un produit au panier///////

//On ajoute au panier

  // boutton HTML element vers le panier
  const toCartBtn = document.getElementById("addToCart");
  // validation du panier par click
  toCartBtn.addEventListener("click", () => {
    //On vérifie que des donnees sont bien entrées par le client
    let selection = {
      productId: id,
      quantity: parseInt(document.getElementById("quantity").value, 10),
      color: document.getElementById("colors").value,
    };
    console.log(selection);
    // on vérifie le localsotage
    let localStorageProducts = JSON.parse(localStorage.getItem("products"));
  // si le panier est vide
    let findProduct = false;
    let position = 0;
   // message d'alerte
    if (selection.quantity === 0 || selection.color === "") {
      alert("veuillez selectionner la couleur et/ou la quantité");
      return;
    }
    //s'il y a des produits dans le panier
    if (localStorageProducts) {
      for (let i = 0; i < localStorageProducts.length; i++) {
        if (
          selection.productId === localStorageProducts[i].productId &&
          selection.color === localStorageProducts[i].color
        ) {
//on continue
          findProduct = true;
          position = i;
          break;
        }
      }
//si la quantié dans le panier est bien en stock, on valide le panier
      if (findProduct === true) {
        localStorageProducts[position].quantity =
          localStorageProducts[position].quantity + selection.quantity;
      } else {
        localStorageProducts.push(selection);
      }
    } else {
      localStorageProducts = [];
      localStorageProducts.push(selection);
    }
    localStorage.setItem("products", JSON.stringify(localStorageProducts));
  });

