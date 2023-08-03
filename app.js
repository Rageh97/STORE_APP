// render products.................................................
let productsItems = document.querySelector(".products-item");
let cartItems = document.querySelector(".cart-Item");
let totalPrice = document.getElementById("subtotal");
let cartIcon = document.querySelector(".cart-icon");
let cartdiv = document.querySelector(".cart");
let totalItem = document.querySelector(".total-item");
let noItems = document.querySelector(".no-items");
let totalPriceDiv = document.querySelector(".total-price");
let uppDom = document.querySelector(".UP");
// ..................scroll....................................
function scroll(){
  window.scrollTo({
    top : 0 ,
    behavior : 'smooth'
  })
}
uppDom.addEventListener('click', scroll)


// ............................................................
const observer = new IntersectionObserver((interys) => {
  interys.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
const hiddenEl = document.querySelectorAll(".hidden");
hiddenEl.forEach((el) => observer.observe(el));
// ....................................................................
function renderProducts() {
  products.forEach((product) => {
    productsItems.innerHTML += `
    <div class="col-12 col-md-4 col-lg-3 text-center border  rounded shadow-lg position-relative my-3 mx-3">
    <h4 class="position-absolute top-0 right-0 end-0 bg-danger rounded-circle p-1 text-white">$${product.price}</h4>
    <img class="w-100" src=${product.imgSrc} alt="">
    <div class="product-name fw-bold">${product.name}</div>
    <div class="product-desc text-secondary">${product.description}</div>
    <div class="star-rating d-flex justify-content-center mt-3 text-warning">
    <i class="fa-solid fa-star mx-2"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star mx-2"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star-half-stroke mx-2"></i>
    </div>
    <div onclick="addToCart(${product.id})"class="add-btn btn btn-primary my-3 w-100">ADD TO CART </div>
    </div>
    `;
  });
}
renderProducts();
//add to cart.....................................................
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

function addToCart(id) {
  // check if the cart have already items
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    let item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  updateCart();
}

//update cart.....................................................
function updateCart() {
  
  displayCartProducts();
  displayTotalPrice();
  localStorage.setItem("CART", JSON.stringify(cart));
  // check if theres no add product ...
  if (JSON.parse(localStorage.getItem("CART")).length === 0) {
    noItems.style.display = "block";
    totalPriceDiv.style.display = "none";
  }else{
    totalPriceDiv.style.display = "block";
    noItems.style.display = "none";
  }
}
// render subtotal.................................................
function displayTotalPrice() {
  let totalprice = 0;
  let totalitem = 0;
  cart.forEach((item) => {
    totalprice += item.price * item.numberOfUnits;
    totalitem += item.numberOfUnits;
  });
  totalPrice.innerHTML = totalprice;
  totalItem.innerHTML = totalitem;
}
//render cart item inside cart....................................
function displayCartProducts() {
  cartItems.innerHTML = "";
  cart.forEach((item) => {
    cartItems.innerHTML += `
    
    <div class="img">
    <img class="w-100" src="${item.imgSrc}" alt="" />
  </div>
  <div
    class="content d-flex flex-column justify-content-center align-items-start h-100"
  >
    <h4>${item.name}</h4>
    <p>${item.description}</p>
    <span>price: $${item.price}</span>
    <button onclick = "removeItemFromCart(${item.id})" class="btn btn-primary my-3">REMOVE</button>
  </div>
  <div
    class="unit-numbers w-25 d-flex flex-column justify-content-center align-items-center  h-100"
  >
  <div class="btn minus bg-danger text-white" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
  <div class="number">${item.numberOfUnits}</div>
    <div class="btn plus bg-success text-white" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>   
  </div>
       
    `;
  });
}

// remove from cart.................................................
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}
// change numper of units..........................................
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
}

//.............................................................................
cartIcon.addEventListener("click", () => {
  if (cartdiv.innerHTML != "") {
    if (cartdiv.style.display == "block") {
      cartdiv.style.display = "none";
    } else {
      cartdiv.style.display = "block";
    }
  }
});

// .................................................................................
