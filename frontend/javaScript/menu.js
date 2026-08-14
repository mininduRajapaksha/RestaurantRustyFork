const filterButtons = document.querySelectorAll(".filter-btn");

const foodCards = document.querySelectorAll(".card-sig");

const searchInput = document.getElementById("search");

const dishCount = document.getElementById("dishCount");

//count dishes
function updateDishCount() {
    let visibleCount = 0;

    foodCards.forEach(card => {
        if (card.style.display !== "none") {
            visibleCount++;
        }
    });

    dishCount.textContent = visibleCount;
}
updateDishCount();

// Category filter

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Get the category from the button text
        const selectedCategory = button.textContent.trim().toLowerCase();

        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        // Filter food cards
        foodCards.forEach(card => {

            const cardCategory = card.dataset.category;

            if (selectedCategory === "all") {

                card.style.display = "block";

            } else if (cardCategory === selectedCategory) {

                card.style.display = "block";

            } else {

                card.style.display = "none";
            }
        });

        searchInput.value = "";
        updateDishCount();
    });
});

// search

searchInput.addEventListener("input", () => {

    const searchValue = searchInput.value.toLowerCase().trim();

    // Remove active state from filter buttons
    filterButtons.forEach(button => {
        button.classList.remove("active");
    });

    foodCards.forEach(card => {

        // Get food name
        const foodName = card.querySelector("h3").textContent.toLowerCase();

        if (foodName.includes(searchValue)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }
    });
    updateDishCount();
});

infoButtons = document.querySelectorAll(".title-section")
//navigate to details page
infoButtons.forEach(info => {

    info.addEventListener("click", (event) => {

        // Find the card containing the clicked icon
        const card = event.target.closest(".card-sig");

        // Get the product ID
        const itemId = card.dataset.id;

        // Navigate to details page
        window.location.href = `item-details.html?id=${itemId}`;
    });

});