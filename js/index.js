const form = document.getElementById("github-form")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    //data we want to pass from the form 
    event.target[0].value 
    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
    .then (res => res.json())
    .then (res => {
        //login(username), avatar_url, profile(url)
        res.items.map(item => {
            const li = document.createElement("li")
            const h2 = document.createElement("h2")
            h2.textContent = item.login
            h2.addEventListener("click", e => showUserRepos(item.login, e))
            
            const img = document.createElement("img")
            img.src = item.avatar_url
            // const a = document.createElement("a")
            // a.href = item.url
            // a.innerText = "Profile"

            const userList = document.getElementById("user-list")
            li.append(h2, img)
            userList.append(li)
        })
    })
})

function showUserRepos(username, e) {
    const repoList = document.getElementById("repos-list")
    repoList.innerHTML = ""

    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(res => res.map(repo => {
        const li = document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textContent = repo.name
        li.append(h1)
        repoList.append(li)
    }))
}

