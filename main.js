function cat_render(categories) {
    const sectionCats = document.querySelector(".sections")

    categories
        .filter(cat => cat.parent_id === "none")
        .forEach(c => {
            const contBlock = document.createElement("div")
            contBlock.classList = "block"

            const childCats = categories.filter(cat_child => cat_child.parent_id === c.parent_id)

            contBlock.innerHTML = `
                <a href="/category?link=${c.category_link}"><h3>${c.category_title}</h3></a>
            `
            const listLinks = document.createElement("div")
            listLinks.classList = "list-links"

            childCats.forEach(el => {
                const subCat = document.createElement("a")
                subCat.href = `/category?link=${el.category_link}`
                subCat.textContent = el.category_title
                listLinks.appendChild(subCat)
            })

            contBlock.appendChild(listLinks)
            sectionCats.appendChild(contBlock)
        });
}

function categories_processing() {
    fetch("https://hanyo-writes.omyraucy.workers.dev/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "action": "all_categories" })
    })
        .then(resp => resp.json())
        .then(categories => cat_render(categories.allRecords))
}

document.addEventListener("DOMContentLoaded", function() {
    categories_processing()
})