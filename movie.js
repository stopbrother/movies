const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTdiNWI1ZjBkNmRiNDI1MTkwYzhiY2NjZDdhNDVlMCIsIm5iZiI6MTcyMTkwNTIyOC4zMDE1NDMsInN1YiI6IjY2YTBlMGViMzA2ZjFkMmM3NGNkZjc1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Eye-mEE9VbEjuCTX6wasAydxo6V3BDVjtdVXo7PmcJ8'
    }
};

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            moviesInfo(response.results);
        })
        .catch(err => console.error(err));



function moviesInfo(movies) {
    let cardList = document.getElementById('cardList');
    cardList.innerHTML = '';

    movies.forEach(movie => {
        let posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        let temp_html = `            
            <div class="movie_card" data-id="${movie.id}">
                <div class="card_img">
                    <img src="${posterPath}" alt="${movie.title}">
                </div>
                <h3 id="title">${movie.title}</h3>
                <p>${movie.overview}</p>
                <span>${movie.vote_average}</span>    
            </div>
            `;
        cardList.insertAdjacentHTML("beforeend", temp_html);
    });

    cardList.addEventListener('click', function (e) {
        let card = e.target.closest('.movie_card');
        if (card) {
            let movieId = card.getAttribute('data-id');
            alert(`영화 id: ${movieId}`);
        }
    });
}

document.getElementById('search_btn').addEventListener('click', function () {
    let searchTxt = document.getElementById('search').value;
    let cards = document.querySelectorAll('.movie_card');

    cards.forEach(card => {
        let title = card.querySelector('h3').textContent;
        if (title.includes(searchTxt)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
});