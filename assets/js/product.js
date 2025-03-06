
const getProductsDetails=async()=>{
    const urlParams= new URLSearchParams(window.location.search);
    const idNum =urlParams.get('id');
    const {data} = await axios.get(`https://fakestoreapi.com/products/${idNum}`);
    return data;
   

}


const displayProductsDetails= async()=>{
    const ProductDetails = await getProductsDetails();

    const result2  =
    `
    <div class="productdetails">
    <h2>${ProductDetails.title}</h2>
    <img src="${ProductDetails.image}"/>
    <p>${ProductDetails.description}</p>
    </div>
    `
   

    document.querySelector(".productsdetails .row").innerHTML=result2;

}

displayProductsDetails();
