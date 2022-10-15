//rapatrie la liste des produits de l'API
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    console.log(res, "response");
    if (res.status === 200) {
      return res.json();
    }
  })
  .then(function (products) {
    diplayProducts(products);
  });

//création des articles depuis la liste des produits

function diplayProducts(datas) {
  let ContainerItems = document.querySelector("#items");

  for (let product of datas) {
    console.log(product._id, "product");
    ContainerItems.innerHTML += `
           <a href="./product.html?_id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="ProductName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>
   `;
  }
           
}

