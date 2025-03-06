const getcatagoryproduct= async()=>{
    try{
        const urlParams= new URLSearchParams(window.location.search);
        const categoryName =urlParams.get('catagory');
        document.querySelector(".products h2").innerHTML=`${categoryName}`;
        const{data}=await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
    
        return data;
    }
    catch(error){
       return[];
    }
  
}

const displaycatagoryproduct=async()=>{
    try{
        const products=  await getcatagoryproduct();

        const result = products.map((product)=>{
          return `
          <div class='product'>
          
          <img src=${product.image} class="productimg"/>
          <h2>${product.title}</h2>
          <p>${product.price}$</p>
          <a href="./product.html?id=${product.id}">details</a>
     
          </div>
          
          `

        }).join(' ');
        document.querySelector(".products .row").innerHTML=result;
        document.querySelector(".loading").classList.add("d-none");
        
    } catch(error){
        document.querySelector('.products .row').innerHTML='<p>pls tray later...</p>'
        document.querySelector(".loading").classList.add("d-none");
        
    }
    customModal();
}
   
    

displaycatagoryproduct();

function customModal(){
    const modal = document.querySelector(".my-modal");
    const closeBtn = document.querySelector(".x-btn");
    const leftbtn =document.querySelector(".left-btn");
    const rightbtn =document.querySelector(".right-btn");
    const imgs = Array.from (document.querySelectorAll(".productimg"));
    let currentindx=0;
    
    imgs.forEach(function(img) {
          img.addEventListener("click", (e)=>{
           modal.classList.remove("d-none");
           modal.querySelector("img").setAttribute("src",e.target.src);
            currentimg =e.target;
           const currentindx=imgs.indexOf(currentimg);
           console.log(currentindx);
          });
          
    });

    
    closeBtn.addEventListener("click",(e)=>{
     modal.classList.add("d-none");
    });

    rightbtn.addEventListener("click",(e)=>{
        currentindx++;
        if(currentindx >= imgs.length) {
            currentindx=0;
        }
        
        const src=imgs[currentindx].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
        
    });

   leftbtn.addEventListener("click",(e)=>{
        currentindx--;
        if(currentindx <0) {
            currentindx=imgs.length-1;
        }
        
        const src=imgs[currentindx].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
        
    });
}