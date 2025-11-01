function handleSearch() {
    // loading animation starts
    loadingAnimationToggle(true);
    const searchInputElement = document.getElementById("search-input-field");

    const searchInputValue = searchInputElement.value;


    loadPhone(searchInputValue)
    
}

function loadingAnimationToggle(isLoading) {
    const loaderAnimation = document.getElementById('loader-animation');

    if (isLoading) {
        loaderAnimation.classList.remove("hidden")
    }
    else {
        loaderAnimation.classList.add("hidden")
    }
}

const loadPhone = async(searchText) => {

    const res =  await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const serverData = await res.json();


    displayPhone(serverData.data)
    
}


const displayPhone = (data) => {

    const cardContainer = document.getElementById('card_section');

    cardContainer.innerHTML = "";

    data.forEach(phone => {
        const productCard = document.createElement('div');
        productCard.classList.add('card')


        productCard.innerHTML = `
          <div class="card_image">
            <img src=${phone.image} alt="phone-image" />
          </div>
          <h3 class="card_title">${phone.phone_name}</h3>
          <p class="card_description">
            There are many variations of passages of available, but the majority
            have suffered
          </p>
          <div class="card_price">
            <span>$</span> <span id="card_item_price">999</span>
          </div>
            <div class="card_btn">
          <button class="btn btn_h">Show Details</button>
        </div>
        
        `;

        cardContainer.appendChild(productCard)
    });

    // loading animation ends here
    loadingAnimationToggle(false)
}