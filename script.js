document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded and script running');
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('item');

    // Check if it's a genre page
    if (itemId && itemId.startsWith('genres')) {
        const genreType = itemId.split('-')[1]; // Get 'movies', 'series' or 'books'
        renderGenrePage(genreType);
        return;
    }

    // Check if it's a recent items page
    if (itemId && itemId.startsWith('recent')) {
        const recentType = itemId.split('-')[1]; // Get 'movies', 'series' or 'books'
        renderRecentPage(recentType);
        return;
    }

    // Check if it's a recommended page
    if (itemId && itemId.startsWith('recommended')) {
        const recommendedType = itemId.split('-')[1]; // Get 'movies', 'series' or 'books'
        renderRecommendedPage(recommendedType);
        return;
    }

    // Find the specific item in the database
    let itemData;
    for (const category in data) {
        itemData = data[category].find(item => item.id === itemId);
        if (itemData) break;
    }

    // Render item details if found
    if (itemData) {
        renderItemDetails(itemData);
    } else {
        document.getElementById('content').innerHTML = '<p>Item not found.</p>';
    }
});

function renderItemDetails(itemData) {
    const content = document.getElementById('content');
    content.className = 'details-page';
    content.innerHTML = `
        <div class="content-container">
            <img src="${itemData.image}" alt="${itemData.title}" class="icon">
            <div class="details">
                <h1>${itemData.title}</h1>
                <p><strong>Rating:</strong> ${itemData.rating}</p>
                <p><strong>Release Year:</strong> ${itemData.releaseYear}</p>
                <p><strong>Genres:</strong> ${itemData.genres.join(', ')}</p>
                ${itemData.authors ? `<p><strong>Authors:</strong> ${itemData.authors.join(', ')}</p>` : ''}
                ${itemData.directors ? `<p><strong>Directors:</strong> ${itemData.directors.join(', ')}</p>` : ''}
                ${itemData.actors ? `<p><strong>Actors:</strong> ${itemData.actors.join(', ')}</p>` : ''}
                <p>${itemData.description}</p>
                ${itemData.trailer ? `<a href="${itemData.trailer}" target="_blank" class="trailer-link">Watch Trailer</a>` : ''}
            </div>
        </div>
    `;
}

function renderGenrePage(type) {
    const genres = [
        'Action', 'Animation', 'Adventure', 'Comedy', 'Crime',
        'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance',
        'Science Fiction', 'Sci-Fi', 'Biography', 'History',
        'Thriller', 'True Story', 'Classics', 'Dystopian',
        'Historical Fiction', 'Non-Fiction', 'Self-Help',
        'Science', 'Musical', 'Western'
    ];

    const container = document.getElementById('content');
    container.className = 'genre-page';
    container.innerHTML = `
        <h1 class="page-title">${type.charAt(0).toUpperCase() + type.slice(1)} Genres</h1>
        <div id="genre-list" class="genre-buttons"></div>
        <div id="items-container" class="items-grid"></div>
    `;

    const genreList = document.getElementById('genre-list');
    genreList.style.display = 'grid';
    genreList.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
    genreList.style.gap = '10px';

    genres.forEach((genre, index) => {
        const color = index % 2 === 0 ? 'orange' : 'black';
        genreList.innerHTML += `
            <button onclick="filterByGenre('${genre}', '${type}')" style="background-color: ${color}; color: white; padding: 10px; border: none; cursor: pointer; border-radius: 5px;">
                ${genre}
            </button>
        `;
    });
}

function renderRecentPage(type) {
    const container = document.getElementById('content');
    container.className = 'recent-page';
    container.innerHTML = `
        <h1 class="page-title">Recent ${type.charAt(0).toUpperCase() + type.slice(1)}</h1>
        <div id="items-container" class="items-grid"></div>
    `;

    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';

    let filteredItems = [];
    const currentYear = new Date().getFullYear();

    if (type === 'movies') {
        filteredItems = data.movies.filter(item => item.releaseYear >= 2019);
    } else if (type === 'series') {
        filteredItems = data.series.filter(item => item.releaseYear >= 2019);
    } else if (type === 'books') {
        filteredItems = data.books.filter(item => item.releaseYear >= 2019);
    }

    if (filteredItems.length === 0) {
        itemsContainer.innerHTML = `<p>No recent ${type} found from 2019 to now.</p>`;
        return;
    }

    filteredItems.forEach(item => {
        itemsContainer.innerHTML += `
            <a href="template.html?item=${item.id}" class="item-card">
                <img src="${item.image}" alt="${item.title}">
                <div class="item-info">
                    <h3>${item.title}</h3>
                    <p><strong>Release Year:</strong> ${item.releaseYear}</p>
                    <p class="description">${item.description.substring(0, 100)}...</p>
                </div>
            </a>
        `;
    });
}

function renderRecommendedPage(type) {
    const container = document.getElementById('content');
    container.className = 'recommended-page';
    container.innerHTML = `
        <h1 class="page-title">Recommended ${type.charAt(0).toUpperCase() + type.slice(1)}</h1>
        <div id="items-container" class="items-grid"></div>
    `;

    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';

    let items = [];
    if (type === 'movies') {
        items = data.movies.filter(item => parseFloat(item.rating.split('/')[0]) > 7.9);
    } else if (type === 'series') {
        items = data.series.filter(item => parseFloat(item.rating.split('/')[0]) > 7.9);
    } else if (type === 'books') {
        items = data.books.filter(item => parseFloat(item.rating.split('/')[0]) > 4.1);
    }

    const randomItems = getRandomItems(items, 6);

    if (randomItems.length === 0) {
        itemsContainer.innerHTML = `<p>No recommended ${type} available.</p>`;
        return;
    }

    randomItems.forEach(item => {
        itemsContainer.innerHTML += `
            <a href="template.html?item=${item.id}" class="item-card">
                <img src="${item.image}" alt="${item.title}">
                <div class="item-info">
                    <h3>${item.title}</h3>
                    <p><strong>Rating:</strong> ${item.rating}</p>
                    <p class="description">${item.description.substring(0, 100)}...</p>
                </div>
            </a>
        `;
    });
}

function filterByGenre(genre, type) {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';

    let filteredItems = [];
    if (type === 'movies') {
        filteredItems = data.movies.filter(item => item.genres.includes(genre));
    } else if (type === 'series') {
        filteredItems = data.series.filter(item => item.genres.includes(genre));
    } else if (type === 'books') {
        filteredItems = data.books.filter(item => item.genres.includes(genre));
    }

    if (filteredItems.length === 0) {
        itemsContainer.innerHTML = `<p>No ${type} found for genre: ${genre}</p>`;
        return;
    }

    filteredItems.forEach(item => {
        itemsContainer.innerHTML += `
            <a href="template.html?item=${item.id}" class="item-card">
                <img src="${item.image}" alt="${item.title}">
                <div class="item-info">
                    <h3>${item.title}</h3>
                    <p><strong>Genres:</strong> ${item.genres.join(', ')}</p>
                    <p class="description">${item.description.substring(0, 100)}...</p>
                </div>
            </a>
        `;
    });
}

function getRandomItems(arr, n) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}
