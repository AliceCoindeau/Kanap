//demander à l'API d'afficher tous les produits
fetch("http://localhost:3000/api/products")
  // ecouter la réponse avec la fonction "res"
  .then(function (res) {
    //si la réponse est positive, 
    if (res.status === 200) {
      return res.json();
    }
  })
  //alors on affiche les produits
  .then(function (products) {
    displayProducts(products);
  })
  // si la réponse est négative,
  .catch(function (err) {
    // on affiche le message d'erreur
    alert("aucun produits à afficher");
  })
  //récupérer la réponse positive et on crée les produits 
  // on crée la fonction datas
function displayProducts(datas){
  //on récupère les info dans le container de class items de l'index.html
  // on crée la class items
  let classItems = document.querySelector("#items");
  //on veut chaque produit contenu dans la fonction (datas)
  // pour chaque produit de (datas) on veut son ID
  for (let product of datas) {
    //on veut chaque produit par son ID
    console.log(product._id, "product");
// on a les produit dans la console on veut les afficher sur le site
//on recupère les objets dans la balise HTML en les identifiant avec ${}
    classItems.innerHTML += `          
<a href="./product.html?_id=${product._id}"> 
            <article>
              <img src = "${product.imageUrl}" alt="${product.imageAlt}">
              <h3 class="productName">"${product.name}"</h3>
              <p class="productDescription">"${product.description}</p>
            </article>
          </a>
`;
  }
}