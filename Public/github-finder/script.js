async function getProfile() {
    const username = document.getElementById("username").value.trim();
    const profileDiv = document.getElementById("profile");

    if (username === "") {
        profileDiv.innerHTML = "<p>Please enter a username.</p>";
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error("User Not Found");
        }

        const data = await response.json();

        profileDiv.innerHTML = `
            <div class="profile-card">
                <img src="${data.avatar_url}" alt="Profile Image">

                <div class="info">
                    <h2>${data.name || data.login}</h2>
                    <p>${data.bio || "No bio available"}</p>

                    <div class="stats">
                        <span>Followers: ${data.followers}</span>
                        <span>Following: ${data.following}</span>
                        <span>Repos: ${data.public_repos}</span>
                    </div>

                    <br>
                    <a href="${data.html_url}" target="_blank">Visit GitHub Profile</a>
                </div>
            </div>
        `;
    } 
    catch (error) {
        profileDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}
