// listScript.js
document.addEventListener('DOMContentLoaded', () => {
    const movieList = JSON.parse(localStorage.getItem('movieList')) || [];
    const savedMovieListElement = document.getElementById('saved-movie-list');

    movieList.forEach(movie => {
        if (!movie.title || !movie.img || !movie.page) {
            console.error("Movie data is incomplete!");
            return;
        }

        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';

        const movieImg = document.createElement('img');
        movieImg.className = 'movie-item-img';
        movieImg.src = movie.img;
        movieImg.alt = movie.title;

        const movieInfo = document.createElement('div');
        movieInfo.className = 'movie-item-info';

        const movieTitle = document.createElement('span');
        movieTitle.className = 'movie-item-title';
        movieTitle.textContent = movie.title;

        // Tıklama olayını ekle
        movieItem.addEventListener('click', () => {
            window.location.href = movie.page;
        });

        movieInfo.appendChild(movieTitle);
        movieItem.appendChild(movieImg);
        movieItem.appendChild(movieInfo);
        savedMovieListElement.appendChild(movieItem);
    });
});
