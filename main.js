function cat_render(categories) {
    const sectionCats = document.querySelector(".sections")
    if (!sectionCats) return

    const parentCategories = categories.filter(
        cat => cat.category_parent_id === "none"
    )

    parentCategories.forEach(c => {
        const contBlock = document.createElement("div")
        contBlock.className = "block"

        const childrenCats = categories.filter(
            catChild => catChild.category_parent_id === c.category_id
        )

        contBlock.innerHTML = `
            <a href="/category?link=${c.category_link}">
                <h3>${c.category_title}</h3>
            </a>
        `

        const listLinks = document.createElement("div")
        listLinks.className = "list-links"

        childrenCats.forEach(el => {
            const subCat = document.createElement("a")
            subCat.href = `/category?link=${el.category_link}`
            subCat.textContent = el.category_title
            listLinks.appendChild(subCat)
        })

        contBlock.appendChild(listLinks)
        sectionCats.appendChild(contBlock)
    })
}


function categories_processing() {
    const url = atob("aHR0cHM6Ly9oYW55by13cml0ZXMub215cmF1Y3kud29ya2Vycy5kZXYv")

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "action": "all_categories" })
    })
        .then(resp => resp.json())
        .then(categories => {
            const all = categories.allRecords.filter(cat => cat.category_title !== "Блог")
            cat_render(all)
        })
}

document.addEventListener("DOMContentLoaded", function () {
    categories_processing()
})