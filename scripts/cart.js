let data = JSON.parse(localStorage.getItem("cart_section")) || [];
let container = document.querySelector(".cart-item");
displayItems(data);

function displayItems(data) {
  container.innerHTML = "";

  data.forEach(function (ele, index) {
    let itemDiv = document.createElement("div");
    itemDiv.setAttribute("class", "item-div");

    //  item Image Div start
    let itemImg = document.createElement("div");

    itemImg.setAttribute("class", "item-img");

    let imgt = document.createElement("img");
    imgt.setAttribute("class", "item-thumb");

    imgt.src = ele.img;
    itemImg.append(imgt);
    //  item Image Div end

    let itemDetail = document.createElement("div");
    itemDetail.setAttribute("class", "item-detail");

    let title = document.createElement("p");
    title.setAttribute("id", "title");
    title.innerHTML = ele.name;

    // price start
    let price = document.createElement("p");
    price.setAttribute("id", "price");
    price.innerHTML = `₹ ${ele.price}`;
    // price end

    // wish start
    let wish = document.createElement("div");
    wish.setAttribute("class", "wish");

    let wText = document.createElement("p");
    wText.innerHTML = "Add to Wishlist";
    let heartImg = document.createElement("img");
    heartImg.src =
      "https://img.icons8.com/material-outlined/24/000000/like--v1.png";

    wish.append(wText, heartImg);
    wish.addEventListener("click", function () {
      addToWish(data);
    });
    // wish end
    let qty = document.createElement("p");
    qty.innerHTML = "Quantity";

    let qty_Box = document.createElement("div");
    qty_Box.setAttribute("class", "qty-box");

    let neg = document.createElement("div");
    neg.setAttribute("class", "neg");
    neg.innerHTML = "-";
    neg.addEventListener("click", function () {
      qtyInc(data, index);
    });

    let qtyValue = document.createElement("div");
    qtyValue.setAttribute("class", "qtyValue");
    qtyValue.innerHTML = 1;

    let pos = document.createElement("div");
    pos.setAttribute("class", "pos");
    pos.innerHTML = "+";
    pos.addEventListener("click", function () {
      qtyDec(data, index);
    });

    let remove = document.createElement("div");
    remove.setAttribute("class", "removeCont");
    let removeText = document.createElement("p");
    removeText.innerHTML = "Remove ";

    remove.append(removeText);
    remove.addEventListener("click", function () {
      removeItem(index);
    });

    qty_Box.append(neg, qtyValue, pos);

    itemDetail.append(title, price, wish, qty, qty_Box, remove);

    itemDiv.append(itemImg, itemDetail);

    container.append(itemDiv);

    // total wala stuff
    let totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = ele.price;
  });
}

function addToWish(data) {
  data.push("data");
  console.log("Your item added to wish");
}

function qtyDec(data, index) {
  let ans = data[index];
  data.push(ans);
  alert(qtyValue++);
  console.log("sisze increase", ans);
}

function qtyInc() {
  console.log("size dec");
}

function removeItem(index) {
  data.splice(index, 1);
  localStorage.setItem("cart_section", JSON.stringify(data));
  reload();
  function reload() {
    reload = location.reload();
  }
  displayItems(data);
}

//addition of price
var pricearr = data.map(function (elem) {
  return elem.price;
});
var sumTotal = pricearr.map(Number).reduce(function (a, b) {
  return a + b;
});
let totalPrice = document.getElementById("totalPrice");
totalPrice.textContent = `₹ ${sumTotal.toFixed(2)}`;

document.getElementById("checkout").addEventListener("click", function () {
  window.location.href = "creditdebit.html";
});
