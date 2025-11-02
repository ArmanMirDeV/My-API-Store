function handleSearch() {
  loadingAnimationToggle(true);
  const searchInputElement = document.getElementById("search-input-field");
  const searchInputValue = searchInputElement.value;
  loadPhone(searchInputValue);
}

function loadingAnimationToggle(isLoading) {
  const loaderAnimation = document.getElementById("loader-animation");

  if (isLoading) loaderAnimation.classList.remove("hidden");
  else loaderAnimation.classList.add("hidden");
}

// Fetch phone list
const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const serverData = await res.json();
  displayPhone(serverData.data);
};

// Display all phones in cards
const displayPhone = (data) => {
  const cardContainer = document.getElementById("card_section");
  cardContainer.innerHTML = "";

  if (data.length === 0) {
    cardContainer.innerHTML = "<h2 style='text-align:center;'>No phones found!</h2>";
    loadingAnimationToggle(false);
    return;
  }

  data.forEach((phone) => {
    const productCard = document.createElement("div");
    productCard.classList.add("card");

    productCard.innerHTML = `
      <div class="card_image">
        <img src="${phone.image}" alt="${phone.phone_name}" />
      </div>
      <h3 class="card_title">${phone.phone_name}</h3>
      <p class="card_description">
        There are many variations of passages available, but the majority
        have suffered alteration.
      </p>
      <div class="card_price">
        <span>$</span> <span id="card_item_price">999</span>
      </div>
      <div class="card_btn">
        <button class="btn btn_h" onclick="showDetails('${phone.slug}')">Show Details</button>
      </div>
    `;

    cardContainer.appendChild(productCard);
  });

  loadingAnimationToggle(false);
};

// Fetch and show modal details
const showDetails = async (phoneId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${phoneId}`
  );
  const data = await res.json();

  displayModal(data.data);
};

// Update and open modal
const displayModal = (phone) => {
  const modal = document.getElementById("details-modal");

  modal.innerHTML = `
    <div class="modal-content">
      <span id="close-modal" class="close-btn">&times;</span>
      <h2>${phone.name}</h2>
      <img src="${phone.image}" alt="${phone.name}" />
      <p><strong>Brand:</strong> ${phone.brand}</p>
      <p><strong>Release Date:</strong> ${phone.releaseDate || "Not Available"}</p>
      <p><strong>Storage:</strong> ${phone.mainFeatures?.storage || "N/A"}</p>
      <p><strong>Display Size:</strong> ${phone.mainFeatures?.displaySize || "N/A"}</p>
      <p><strong>Chipset:</strong> ${phone.mainFeatures?.chipSet || "N/A"}</p>
      <p><strong>Memory:</strong> ${phone.mainFeatures?.memory || "N/A"}</p>
      <p><strong>Sensors:</strong> ${phone.mainFeatures?.sensors?.join(", ") || "N/A"}</p>
      <button class="premium-btn">Buy Now</button>
    </div>
  `;

  // Show modal
  modal.showModal();

  // Close button functionality
  const closeModalBtn = document.getElementById("close-modal");
  closeModalBtn.addEventListener("click", () => modal.close());

  // Close when clicking outside
  modal.addEventListener("click", (event) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      modal.close();
    }
  });
};
