// const bindUi = function () {

//     const navItems = document.querySelectorAll(".nav-item");

//     document.querySelector("body").addEventListener("click", function (e) {
//         navItems.forEach(liItems => {
//             if(liItems.classList.contains("active")) {
//                 liItems.classList.remove("active");
//             }
//         })
//     })

//     navItems.forEach(liItem => {
//         liItem.addEventListener("click", function (e) {

//             e.stopPropagation();
//             navItems.forEach(liItems => {
//                 if(liItems.classList.contains("active")) {
//                     liItems.classList.remove("active")
//                 }
//             })
//             this.classList.add("active");
//         });
//     });

// };

// bindUi();



let products = [{
        title: 'JSON-Prettifier',
        description: 'A tool to pretiffy JSON input',
        href: '/json-prettifier',
        img: 'prettify.png'
    },
    {
        title: 'URL-Shortner',
        description: 'A tool to shorten URL',
        href: '/url-shortner',
        img: 'prettify.png'
    },
    {
        title: 'JSON-Prettifier',
        description: 'A tool to pretiffy JSON input',
        href: '/json-prettifier',
        img: 'prettify.png'
    },
    {
        title: 'JSON-Prettifier',
        description: 'A tool to pretiffy JSON input',
        href: '/json-prettifier',
        img: 'prettify.png'
    },
    {
        title: 'JSON-Prettifier',
        description: 'A tool to pretiffy JSON input',
        href: '/json-prettifier',
        img: 'prettify.png'
    },
    {
        title: 'JSON-Prettifier',
        description: 'A tool to pretiffy JSON input',
        href: '/json-prettifier',
        img: 'prettify.png'
    }
]
let productsDiv = document.getElementById('productsCard');

var html = "";
for (let i = 0; i < products.length; i++) {
    html += `
    ${i%3 === 0 ? '<div class="row" style="padding-left:17%;">': ''}
    <div class="product-cards col-3">
    <section>
        <a href="${products[i].href}">
            <img src="${products[i].img}" alt="">
        </a>
    </section>
    <h4 class="margin-tb-20">${products[i].title}</h4>
    <div class="description">
    ${products[i].description}
    </div>
    <div class="link margin-tb-20">
        <a target="_blank" href="${products[i].href}">
            <p>Use now &#8594;</p>
        </a>
    </div>
</div>
    ${(i+1)%3 ===0 ? "</div>": ""}`;
}
productsDiv.innerHTML = html;
console.log(productsDiv);