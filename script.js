"strict mode";
let products = [];
const productUrl = "https://fakestoreapi.com/products";
const fetchButton = document.getElementById("fetchButton");
const productAddButton = document.getElementById("product-add-button");
const favoritesButton = document.getElementById("favoritesBtn");
const favoritesBody = document.getElementById("favorites-table-body");
const searchbar = document.getElementById("searchbar");
let productCounter = localStorage.length;

//ADDING FAVORITE
function addFavorite(e) {
  let imgID;
  if (e.target.tagName == "IMG") {
    if (e.target.src.split("assets/")[1] == "star.png") {
      e.target.src = "assets/filled-star.png";
    } else {
      e.target.src = "assets/star.png";
    }
    imgID = e.target.id.split("g")[1];
    console.log(imgID);
  }
  products.map((product) => {
    if (product.id == imgID) {
      product.isFavorite = !product.isFavorite;
    }
  });
}

//Fetching Products
async function getProducts(url) {
  let tempArr = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      tempArr.push(JSON.parse(window.localStorage.getItem(`product${i}`)));
    }
    const response = await fetch(url);
    const data = await response.json();
    products = [...data, ...tempArr];

    products.map(function (element) {
      element.isFavorite = false;
    });

    console.log(products);
    load(products);
    let tr = document.getElementsByTagName("tr");
    let trNew = [...tr];
    trNew.forEach((e) => e.addEventListener("click", (e) => addFavorite(e)));
  } catch (e) {
    console.log(e);
  }
}
//Loading the page
function load(products) {
  let html = "";
  for (let product of products) {
    html +=
      `
                <tr>
                    <td scope="row" data-label="Title">${product.title}</td>
                    <td data-label="Category">${product.category}</td>
                    <td data-label="Price">${product.price}$</td>
                    <td data-label="Description">${product.description}</td>
                    <td data-label="Image"><img class='product-image' src='${
                      product.image
                    }'></td>
                    <td data-label="Image"><img id='img${
                      product.id
                    }' src='./assets/${
        product.isFavorite ? "filled-star.png" : "star.png"
      }'></td>
                </tr>
                ` ||
      `
                <tr>
                    <td scope="row" data-label="Title">unspecified</td>
                    <td data-label="Category">unspecified</td>
                    <td data-label="Price">unspecified</td>
                    <td data-label="Description">unspecified</td>
                    <td data-label="Image"><img class='product-image'>unspecified</td>
                </tr>
                `;
  }
  document.getElementById("products").innerHTML = html;
}

//Fetch Favorites
function getFavorites(favProducts) {
  let html = "";
  for (let product of favProducts) {
    html +=
      `
                <tr>
                    <td scope="row" data-label="Title">${product.title}</td>
                    <td data-label="Category">${product.category}</td>
                    <td data-label="Price">${product.price}$</td>
                    <td data-label="Description">${product.description}</td>
                    <td data-label="Image"><img class='product-image' src='${product.image}'></td>
                </tr>
                ` ||
      `
                <tr>
                    <td scope="row" data-label="Title">unspecified</td>
                    <td data-label="Category">unspecified</td>
                    <td data-label="Price">unspecified</td>
                    <td data-label="Description">unspecified</td>
                    <td data-label="Image"><img class='product-image'>unspecified</td>
                </tr>
                `;
  }
  favoritesBody.innerHTML = html;
}

// PRODUCT ADDING
function addProduct() {
  const titleField = document.getElementById("title").value;
  const categoryField = document.getElementById("category").value;
  const priceField = document.getElementById("price").value;
  const descField = document.getElementById("description").value;
  const imgURL = document.getElementById("url").value;
  const product = {
    id: productCounter + 21,
    title: titleField,
    category: categoryField,
    price: priceField,
    description: descField,
    image: imgURL,
    isFavorite: false,
  };

  window.localStorage.setItem(
    `product${productCounter}`,
    JSON.stringify(product)
  );
  productCounter++;
  products.push(product);
  load(products);
  modal.style.display = "none";
}
//Event Listeners
fetchButton.addEventListener("click", () => getProducts(productUrl));
productAddButton.addEventListener("click", addProduct);
favoritesButton.addEventListener("click", () => {
  let tempArr = products.filter((product) => product.isFavorite);
  getFavorites(tempArr);
});
searchbar.addEventListener("input", () => {
  const searchbarValue = searchbar.value;
  if (searchbarValue == "") {
    load(products);
    return;
  }
  const tempArr = products.filter((product) => {
    return product.title.toLowerCase().includes(searchbarValue.toLowerCase());
  });
  load(tempArr);
});
