const main = document.getElementById("main")
const website = document.getElementById("website")
const postBtn = document.getElementById("post-btn")
const pageBtn = document.getElementById("page-btn")
let baseUrl = "https://public-api.wordpress.com/wp/v2/sites/bt4wall.wordpress.com"

// ⬇️ EVENT LISTENERS ⬇️

website.addEventListener("click", handleChooseWebsite)
postBtn.addEventListener("click", handleGetPosts)

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

// ⬇️ UTILITIES ⬇️

async function getPosts(page=1, perPage=12) {
    const response = await fetch(`${baseUrl}/posts?per_page=${perPage}&page=${page}`)
    
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json()
    return data
}