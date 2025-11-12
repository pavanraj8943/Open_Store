const data = ""
async function fetchData() {
    try {
        const res = await fetch('https://dummyjson.com/products')
        const data = await res.json()
        let str = ""
        data.products.forEach(ele => {
            str += `
             <div class="card">
            <img src="${ele.thumbnail}">
            <a href="./product.html?id=${ele.id}">
            <h1>${ele.title}</h1>
            <p>Price: <span id="down">₹</span>${ele.price}</p>
            <p>${ele.rating}<span> ⭐</span></p>
            </a>
               </div>
         
            `
        });
        document.getElementById("cards").innerHTML = str
    }
    catch (error) {
        console.log(error);

    }
}

fetchData()
