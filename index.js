// index.js
// Dummy home and garden data
const homeGardenData = [
    {
        id: 1,
        name: 'Curtain',
        category: 'Curtain',
        price: 'Starting from 775/-',
        location: 'Ragama',
        images: ['Ad1/img1.jpg', 'Ad1/img2.jpg', 'Ad1/img3.jpg', 'Ad1/img4.jpg'],
        postedDate: '2024-12-04',
        description: 'ඔබගේ සියලුම දොර ජනෙල් රෙදි අවශ්‍යතා හා ඔබට අවශ්‍ය තිර රෙදි, බ්ලයින්ඩ්ස්, කර්ටන් පොල්ස් සහ accessories, ඩ්‍රයි ක්ලීනින් හා ෆිටින්ස් කටයුතු යනාදි සියලුම සේවාවන් පහසු මිලට ඔබට ලබාගත හැක.   විමසීම් 0766 849 449',
    },
    // Add more home and garden items here
];

let filteredHomeGarden = [...homeGardenData];

function handleSearch() {
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const location = document.getElementById('location').value;
    const category = document.getElementById('category').value;

    filteredHomeGarden = homeGardenData.filter(item => {
        return (!minPrice || item.price >= minPrice) &&
               (!maxPrice || item.price <= maxPrice) &&
               (!location || item.location.toLowerCase().includes(location.toLowerCase())) &&
               (!category || item.category.toLowerCase().includes(category.toLowerCase()));
    });

    displayHomeGarden();
}

function displayHomeGarden() {
    const homeGardenContainer = document.getElementById('homeGardenContainer');
    homeGardenContainer.innerHTML = '';

    filteredHomeGarden.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4 home-garden-card">
                <div id="carousel${item.id}" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        ${item.images.map((img, index) => `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img class="d-block w-100" src="${img}" alt="Item image">
                            </div>`).join('')}
                    </div>
                    <a class="carousel-control-prev" href="#carousel${item.id}" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carousel${item.id}" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Category: ${item.category}</p>
                    <p class="card-text">Price: ${item.price}</p>
                    <p class="card-text">Location: ${item.location}</p>
                    <p class="card-text">Posted: ${item.postedDate}</p>
                    <p class="card-text">${item.description.slice(0, 100)}... <a href="#" onclick="handleViewDetails(${item.id})">View More</a></p>
                    <button class="btn btn-primary" onclick="handleViewDetails(${item.id})">View Details</button>
                </div>
            </div>`;
        homeGardenContainer.appendChild(card);
    });
}

function handleViewDetails(id) {
    const item = filteredHomeGarden.find(e => e.id === id);
    const modal = new bootstrap.Modal(document.getElementById('homeGardenModal'));

    document.getElementById('homeGardenModalLabel').innerText = item.name;
    document.getElementById('carouselInner').innerHTML = item.images.map((img, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img class="d-block w-100" src="${img}" alt="Item image">
        </div>`).join('');
    document.getElementById('modalCategory').innerText = `Category: ${item.category}`;
    document.getElementById('modalPrice').innerText = `Price: ${item.price}`;
    document.getElementById('modalLocation').innerText = `Location: ${item.location}`;
    document.getElementById('modalPostedDate').innerText = `Posted: ${item.postedDate}`;
    document.getElementById('modalDescription').innerText = item.description;

    modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
    displayHomeGarden();
});
