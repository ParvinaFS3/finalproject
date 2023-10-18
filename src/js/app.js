const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const navCart = document.querySelector('.navCart');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const categoryNavbar = document.querySelector('.category-navbar');
const scrollElement = document.querySelector('.scroll');
const productCategory = document.querySelector('.product-category')
const detailsProduct = document.querySelectorAll('.btn-detail');
const btnCard = document.querySelectorAll('.btn-card');
const productCard = document.querySelector('.product-card')
const pageX = 30;
let width = window.innerWidth;
let widthSize = 920;
const url = './src/data/db.json';
const responsiveDesign = () => {
  if (width < widthSize) {
    hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
    navCart.classList.remove('activeCart');
  } else {
    hamburger.classList.toggle('activeCart');
    navCart.classList.toggle('activeCart');
    navbar.classList.remove('activeCart');
  }
};


hamburger.addEventListener('click', responsiveDesign);
const scrollAnimation = () => {
  const pageOffset = window.pageYOffset;

  if (pageOffset > pageX) {
    scrollElement.classList.add('active');
  } else {
    scrollElement.classList.remove('active');
  }
};

const scrollbar = () => {
  window.addEventListener('scroll', scrollAnimation);

  scrollElement.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });
};

const fetchData = async () => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  if (data && data.carousel) {
    data.carousel.forEach((element) => {
      const template = `
        
        <div class="swiper-slide"  >

            <div class="swiper-text">
            
            <h2>${element.title}</h2>
            <p>${element.decoration}</p>
            </div>
            <div class="swipper-image">
            <img src='${element.carouselImage}' alt=""/>
            </div>
           
        </div>
         
      `;
      swiperWrapper.innerHTML += template;

      const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },

        pagination: {
          el: '.swiper-pagination',
        },

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });
  } else {
    console.log('No colorProducts found in the data.');
  }
};

const fetchCategoryData = async () => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  if (data && data.category) {
    data.category.forEach((element) => {
      categoryNavbar.innerHTML += `
           
          <li><a   class="category-link active" data-id="${element.id}">${element.categoryName}</a></li>
          `;
      const categoryLink = document.querySelectorAll('.category-link');

      const dataFilterProductCategory = async (categoryId) => {
        const response = await fetch(url);
        const data = await response.json();
        return data.products.filter((a) => +categoryId === a.categoryId);
      };

      categoryLink.forEach((link) => {
        link.addEventListener('click', async (event) => {
          const categoryId = link.getAttribute('data-id');
          var dataProduct = await dataFilterProductCategory(categoryId);

          dataProduct.forEach(element => {

            productCategory.innerHTML += `
           
              <div class="card"  data-categoryId="${element.categoryId}">
              
              <span class="new" data-new="${element.isNewProduct}">New</span>
              <img src="${element.productImage}" alt="" />
   
              <div class="card-body">
               <h2 class="card-title">${element.productName}</h2>
              
              </div>
   
              <div class="card-price">
              <a href="" class="btn-card">AddToCart</a>
               <p class="price-title">$ ${element.price} </p>
              </div>
                 <button class="btn-details"  >Quick Look <span><i class="fa-regular fa-heart"></i></span></button>
            </div>
              `;

          })

        });
      });
    });
  } else {
    console.log('No categories found in the data.');
  }
};
const findProductData = async (productId) => {

  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
  return data.products.find((product) => product.id === productId);
};

detailsProduct.forEach((link) => {
  const productId = link.getAttribute('data-product');
  link.addEventListener("click", (event) => {

    console.log(productId)
    findProductData(productId).then(res => console.log(res));


  })
});
const fetchProductData = async () => {

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data && data.products) {
      const productCardContainer = document.querySelector('product-card');

      data.products.forEach(element => {



        productCard.innerHTML += `
    
          <div class="card"  data-categoryId="${element.categoryId}">
           
            <span class="new" data-new="${element.isNewProduct}">New</span>
            <img src="${element.productImage}" alt="" />

            <div class="card-body">
             <h2 class="card-title">${element.productName}</h2>
            
            </div>

            <div class="card-price">
            <a  class="btn-card">AddToCart</a>
             <p class="price-title">$ ${element.price} </p>
            </div>
               <button type="submit" class="btn-detail"  data-product="${element.id}">Quick Look <span><i class="fa-regular fa-heart"></i></span></button>
          </div>
        `;






        const newProductElement = document.querySelector(".new");

        // Check if the element exists before manipulating its classList
        if (newProductElement) {
          if (element.isNewProduct.value == true) {
            newProductElement.classList.add("active");
          } else {
            newProductElement.classList.remove("active");
          }
        }
      });
    } else {
      console.log('No products found in the data.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const cardBaskets = () => {
  btnCard.forEach((data) => {
    data.addEventListener("click", () => {

      console.log("asas")
    })
  })
}
document.addEventListener('DOMContentLoaded', () => {
  scrollbar();
  fetchCategoryData();
  fetchProductData();
  fetchData();
  cardBaskets();
});
