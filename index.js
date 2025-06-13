const content = document.getElementById("content")
const website = document.getElementById("website")
const postBtn = document.getElementById("post-btn")
const pageBtn = document.getElementById("page-btn")
let baseUrl = "https://public-api.wordpress.com/wp/v2/sites/bt4wall.wordpress.com"

// ⬇️ EVENT LISTENERS ⬇️

website.addEventListener("click", handleChooseWebsite)
postBtn.addEventListener("click", handleGetPosts)
pageBtn.addEventListener("click", handleGetPages)

// ⬇️ EVENT HANDLERS ⬇️

function handleChooseWebsite() {
    if (website.value === "code") {
        baseUrl = "https://public-api.wordpress.com/wp/v2/sites/neophyte.home.blog"
    }

    if (website.value === "bass") {
        baseUrl = "https://public-api.wordpress.com/wp/v2/sites/uglybass.wordpress.com"
    }

    if (website.value === "hobby") {
        baseUrl = "https://public-api.wordpress.com/wp/v2/sites/bt4wall.wordpress.com"
    }

    if (website.value === "music") {
        baseUrl = "https://public-api.wordpress.com/wp/v2/sites/mortalequality.wordpress.com"
    }
}

function handleGetPosts() {
    getPosts()
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.error(`Could not get posts: ${err}`)
    })
}

function handleGetPages() {
    getPages()
    .then(data => {
        console.log(data)
        renderPages(data)
    })
    .catch(err => {
        console.error(`Could not get pages: ${err}`)
    })
}

// ⬇️ UTILITIES ⬇️

async function getPosts(page=1, perPage=12) {
    const response = await fetch(`${baseUrl}/posts?per_page=${perPage}&page=${page}`)
    
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json()
    return data
}

async function getPages() {
    const response = await fetch(`${baseUrl}/pages`)
    
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json()
    return data
}

// ⬇️ RENDER FUNCTIONS ⬇️

function renderPages(data) {
    content.innerHTML = ""

    data.forEach(page => {
        const article = document.createElement("article")
        article.innerHTML = `
            <h2>${page.title.rendered}</h2>
            <section>${page.content.rendered}</section>
        `

        content.appendChild(article)
    })

}