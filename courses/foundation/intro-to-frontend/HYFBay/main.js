console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

// This should create the ul and the li's with the individual products details
function renderProducts(products) {
  document.body.innerHTML = "";
  const list = document.createElement("ul");
  for (let i = 0; i < products.length; i++) {
    const item = document.createElement("li");
    item.innerHTML = "<b>" + products[i].name + "</b>" + "<br>" + products[i].price + " kr.<br>rating: " + products[i].rating;
    list.appendChild(item);
  }
  document.body.appendChild(list);
}

renderProducts(products); 
