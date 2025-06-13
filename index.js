const main = document.getElementById("main")
const website = document.getElementById("website")
let baseUrl = "https://public-api.wordpress.com/wp/v2/sites/neophyte.home.blog"
// const baseUrl = "https://public-api.wordpress.com/wp/v2/sites/uglybass.wordpress.com"
// const baseUrl = "https://public-api.wordpress.com/wp/v2/sites/bt4wall.wordpress.com"
// const baseUrl = "https://public-api.wordpress.com/wp/v2/sites/mortalequality.wordpress.com"
const posts = getPosts()

// ⬇️ EVENT LISTENERS ⬇️

website.addEventListener("click", selectWebsite)

// ⬇️ EVENT HANDLERS ⬇️

function selectWebsite() {
    console.log(website.value)

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

// get posts
async function getPosts() {
    const response = await fetch(`${baseUrl}/posts`)
    
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json()
    return data
}

// log posts to console
// posts
// .then(data => {
//     console.log(data)
// })
// .catch(err => {
//     console.error(`Could not get posts: ${err}`)
// })