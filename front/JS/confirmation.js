// on vide le panier
localStorage.clear();
// récupération id(nr) de la commande
let str = window.location.href;
let url = new URL(str);
let idOrder = url.searchParams.get("order_id");
let orderId = document.getElementById("orderId");
orderId.textContent = idOrder;