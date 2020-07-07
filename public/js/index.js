let products = [{
        name: 'JSON-Prettifier',
        description: 'A tool to pretiffy JSON input',
        href: '/json-prettifier'
    },
    {
        name: 'JSON-Prettifier',
        description: 'A tool to pretiffy JSON input',
        href: '/json-prettifier'
    },
    {
        name: 'JSON-Prettifier',
        description: 'A tool to pretiffy JSON input',
        href: '/json-prettifier'
    },
    {
        name: 'JSON-Prettifier',
        description: 'A tool to pretiffy JSON input',
        href: '/json-prettifier'
    },
    {
        name: 'JSON-Prettifier',
        description: 'A tool to pretiffy JSON input',
        href: '/json-prettifier'
    },
    {
        name: 'JSON-Prettifier',
        description: 'A tool to pretiffy JSON input',
        href: '/json-prettifier'
    }
]
let productsDiv = document.getElementById('productsCard');

var html = "";
for (let i = 0; i < products.length; i++) {
    html += `
    ${i%3 === 0 ? '<div class="row">': ''}
        <div class="col card-columns d-flex" style="padding: 10px;
        justify-content: center;">
            <div class="card bg-light border-info" style="width: 18rem;display:inline-block; border-radius:5px;">
                <div class="card-body">
                    <h5 class="card-title">${products[i].name}</h5>
                    <p class="card-text">${products[i].description}.</p>
                    <a href="${products[i].href}" class="card-link btn btn-outline-success" role="button">Open</a>
                </div>
            </div>
        </div>
    ${(i+1)%3 ===0 ? "</div>": ""}`;
}
productsDiv.innerHTML = html;
console.log(productsDiv);