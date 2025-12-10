function cat_render(categories) {
    const sectionCats = document.querySelector(".sections")

    categories
        .filter(cat => cat.parent_key === "none")
        .forEach(c => {
            const contBlock = document.createElement("div")
            contBlock.classList = "block"

            const childCats = categories.filter(cat_child => cat_child.parent_key === c.key)

            contBlock.innerHTML = `
                <a href="/category?link=${c.link}"><h3>${c.title}</h3></a>
            `
            const listLinks = document.createElement("div")
            listLinks.classList = "list-links"

            childCats.forEach(el => {
                const subCat = document.createElement("a")
                subCat.href = `/category?link=${el.link}`
                subCat.textContent = el.title
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