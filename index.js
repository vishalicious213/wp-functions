const content = document.getElementById("content")
const website = document.getElementById("website")
const postBtn = document.getElementById("post-btn")
const pageBtn = document.getElementById("page-btn")

const siteMap = {
    code: "https://public-api.wordpress.com/wp/v2/sites/neophyte.home.blog",
    bass: "https://public-api.wordpress.com/wp/v2/sites/uglybass.wordpress.com",
    hobby: "https://public-api.wordpress.com/wp/v2/sites/bt4wall.wordpress.com",
    music: "https://public-api.wordpress.com/wp/v2/sites/mortalequality.wordpress.com"
}

let baseUrl = siteMap["hobby"]

// ⬇️ EVENT LISTENERS ⬇️

website.addEventListener("click", handleChooseWebsite)
postBtn.addEventListener("click", handleGetPosts)
pageBtn.addEventListener("click", handleGetPages)

// ⬇️ EVENT HANDLERS ⬇️

function handleChooseWebsite() {
    const selected = website.value
    if (siteMap[selected]) {
        baseUrl = siteMap[selected]
    } else {
        console.warn("Unknown site selected")
    }
}

function handleGetPosts() {
    getPosts()
    .then(data => {
        console.log(data)
        renderContent(data)
    })
    .catch(err => {
        console.error(`Could not get posts: ${err}`)
    })
}

function handleGetPages() {
    getPages()
    .then(data => {
        console.log(data)
        renderContent(data)
    })
    .catch(err => {
        console.error(`Could not get pages: ${err}`)
    })
}

// ⬇️ UTILITIES ⬇️

async function fetchContent(endpoint) {
    const response = await fetch(`${baseUrl}/${endpoint}`)

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }

    return await response.json()
}

async function getPosts(page=1, perPage=12) {
    return fetchContent(`posts?per_page=${perPage}&page=${page}`)
}

async function getPages() {
    return fetchContent(`pages`)
}

async function getDetails(postId, postType) {
    if (postType === "page") return

    const response = await fetch(`${baseUrl}/posts/${postId}`)
    const post = await response.json()

    const categoryIds = post.categories.join(',')
    const tagIds = post.tags.join(',')

    const [categoriesResponse, tagsResponse] = await Promise.all([
        fetch(`${baseUrl}/categories?include=${categoryIds}`),
        fetch(`${baseUrl}/tags?include=${tagIds}`)
    ])

    const categoryNames = await categoriesResponse.json()
    const tagNames = await tagsResponse.json()

    const categories = categoryNames.map(category => category.name)
    const tags = tagNames.map(tag => tag.name)

    return { categories, tags }
}

// ⬇️ RENDER FUNCTIONS ⬇️

async function renderContent(data) {
    content.innerHTML = ""

    for (const item of data) {
        const article = document.createElement("article")
        const details = await getDetails(item.id, item.type)
        const categories = item.type === "post" ? details.categories.join(", ") : []
        const tags = item.type === "post" ? details.tags.join(", ") : []

        article.innerHTML = `
            <h2>${item.title.rendered}</h2>
            ${item.type === "post" ? `<p><strong>Categories: </strong>${categories}</p>` : ""}
            ${item.type === "post" ? `<p><strong>Tags: </strong>${tags}</p>` : ""}
            <details>
                <summary>View Content</summary>
                <section>${item.content.rendered}</section>
            </details>
        `

        content.appendChild(article)
    }
}