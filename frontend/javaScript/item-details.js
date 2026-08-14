const urlParams = new URLSearchParams(window.location.search);

const itemId = Number(urlParams.get("id"));

const product = products.find(item => item.id === itemId);

if (!product) {
    document.querySelector(".item-details").innerHTML =
        "<h2>Dish not found</h2>";
}

if (product) {

    document.getElementById("itemImage").src = product.image;

    document.getElementById("itemImage").alt = product.name;

    document.getElementById("itemName").textContent = product.name;

    document.getElementById("itemDescription").textContent =
        product.description;

    document.getElementById("itemPrice").textContent =
        `Rs. ${product.price}`;
}