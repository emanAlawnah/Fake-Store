const getcategotes= async()=>{
try{
  const {data}= await axios.get("https://fakestoreapi.com/products/categories");
  return data;
}
catch(error){
return [];
}


}


const despalyCategories= async()=>{
try{
  const catagores = await getcategotes();
   
  const results =catagores.map ((catagory)=>{
    return `
    <div class="catagory">
    <h2>${catagory}</h2>
    <a href="./details.html?catagory=${catagory}">show</a>
    </div>
    `
  }).join('');

  document.querySelector('.categories .row').innerHTML = results;
  document.querySelector(".loading").classList.add("d-none");

}

catch(error){
 document.querySelector('.categories .row').innerHTML='<p>pls tray later...</p>'
 document.querySelector(".loading").classList.add("d-none");
}
    
}

despalyCategories();