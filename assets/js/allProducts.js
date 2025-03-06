const getallproducts = async () => {
  try {
    const { data } = await axios.get(`https://fakestoreapi.com/products`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const displayallproducts = async (page = 1) => {
  try {
    const data = await getallproducts();
    const productsPerPage = 6;
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = data.slice(startIndex, endIndex);
    const numOfPages = Math.ceil(data.length / productsPerPage);

    // Render products
    const results = paginatedProducts.map((product) => {
      return `
        <div class="product">
          <img src=${product.image} class="productimg"/>
          <h2>${product.title}</h2>
          <p>${product.price}$</p>
        </div>
      `;
    }).join(' ');

    document.querySelector(".products .row").innerHTML = results;

    
    const paginationControls = `
      <button onclick="displayallproducts(${page - 1})" ${page === 1 ? 'disabled' : ''}>&lt;</button>
      ${Array.from({ length: numOfPages }, (_, i) => {
        return `<button onclick="displayallproducts(${i + 1})" class="${i + 1 === page ? 'active' : ''}">${i + 1}</button>`;
      }).join(' ')}
      <button onclick="displayallproducts(${page + 1})" ${page === numOfPages ? 'disabled' : ''}>&gt;</button>
    `;

    document.querySelector(".pagenation").innerHTML = paginationControls;

    // Hide loading spinner
    document.querySelector(".loading2").classList.add("d-none");
  } catch (error) {
    console.error(error);
    document.querySelector(".products .row").innerHTML = '<p>Please try again later...</p>';
    document.querySelector(".loading2").classList.add("d-none");
  }

  
  customModal();
};


displayallproducts();

function customModal() {
  const modal = document.querySelector(".my-modal");
  const closeBtn = document.querySelector(".x-btn");
  const leftbtn = document.querySelector(".left-btn");
  const rightbtn = document.querySelector(".right-btn");
  const imgs = Array.from(document.querySelectorAll(".productimg"));
  let currentindx = 0;

  imgs.forEach((img) => {
    img.addEventListener("click", (e) => {
      modal.classList.remove("d-none");
      modal.querySelector("img").setAttribute("src", e.target.src);
      currentindx = imgs.indexOf(e.target);
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("d-none");
  });

  rightbtn.addEventListener("click", () => {
    currentindx++;
    if (currentindx >= imgs.length) {
      currentindx = 0;
    }
    modal.querySelector("img").setAttribute("src", imgs[currentindx].src);
  });

  leftbtn.addEventListener("click", () => {
    currentindx--;
    if (currentindx < 0) {
      currentindx = imgs.length - 1;
    }
    modal.querySelector("img").setAttribute("src", imgs[currentindx].src);
  });
}