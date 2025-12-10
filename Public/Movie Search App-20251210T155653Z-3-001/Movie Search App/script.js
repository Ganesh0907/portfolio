async function searchMovie() {
    const movieName = document.getElementById("movieInput").value.trim();
    const resultDiv = document.getElementById("movieResult");

    if (movieName === "") {
        resultDiv.innerHTML = "<p>Please enter a movie name.</p>";
        return;
    }

    const API_KEY = "f79c5e3b"; // Replace with your OMDB API key
    const URL = `https://www.omdbapi.com/?t=${movieName}&apikey=${API_KEY}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (data.Response === "False") {
            resultDiv.innerHTML = `<p>Movie not found.</p>`;
            return;
        }

        resultDiv.innerHTML = `
            <img src="${data.Poster}" alt="Poster">
            <h2>${data.Title}</h2>
            <p><strong>Year:</strong> ${data.Year}</p>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>IMDB Rating:</strong> ⭐ ${data.imdbRating}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
        `;

    } catch (error) {
        resultDiv.innerHTML = "<p>Error fetching data.</p>";
        console.error(error);
    }
}
