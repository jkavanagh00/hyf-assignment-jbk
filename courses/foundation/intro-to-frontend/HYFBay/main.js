console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

const renderProducts = products => {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const row = document.createElement("tr");

    const name = document.createElement("td");
    name.innerHTML = "<b>" + products[i].name + "</b>";
    row.appendChild(name);

    const price = document.createElement("td");
    price.innerHTML = formatPrice(products[i].price) + " kr.";
    row.appendChild(price);

    const rating = document.createElement("td");
    rating.innerHTML = formatRating(products[i].rating);
    row.appendChild(rating);

    tbody.appendChild(row);
  }
}

// star: U+2605; half-star: U+2BE8

const formatPrice = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const formatRating = number => {
  let formattedRating = ""
  if (number % 2 === 0) {
    for (let i = 0; i < number; i += 2) {
      formattedRating = formattedRating + "&#9733 ";
    }
  } else {
    for (let i = 0; i < number-2; i += 2) {
      formattedRating = formattedRating + "&#9733 ";
    }
    formattedRating = formattedRating + "&#11240 ";
  }
  return '<span class="stars">' + formattedRating + '</span>';
}

renderProducts(products);
