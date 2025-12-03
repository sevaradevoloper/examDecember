document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== HAMBURGER MENU ====================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.nav__menu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('open'); 
            mobileMenu.classList.toggle('open');
        });
        
        document.querySelectorAll('.menu__link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }
    
    // ==================== Menu aktiv link ====================
    
    const menuLinks = document.querySelectorAll('.menu__list .menu__link');

    if (menuLinks.length > 0) {
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {

                menuLinks.forEach(l => {
                    l.classList.remove('menu__link--active');
                });
                
                this.classList.add('menu__link--active');
            });
        });
    }

    // ====================(HERO SECTION) ====================
    
    const slideData = [
        { highlightWord: "PLANET", mainImg: "./image/01.svg", smallImg: "./image/01.svg", bgClass: "hero--bg-1" },
        { highlightWord: "HEALTH", mainImg: "./image/002.png", smallImg: "./image/002.png", bgClass: "hero--bg-2" },
        { highlightWord: "SALES", mainImg: "./image/003.png", smallImg: "./image/003.png", bgClass: "hero--bg-3" },
    ];
    
    let currentIndex = 0; 
    let isAnimating = false;
    
    const heroElement = document.querySelector('.hero');
    const heroImageSide = document.querySelector('.hero__image-side');
    const heroMainImg = document.querySelector('.hero__img--main');
    const heroSmallImg = document.querySelector('.hero__img--secondary');
    const sliderDotsContainer = document.querySelector('.hero__slider-nav');
    const heroHighlightSpan = document.querySelector('.hero__title-highlight'); 
    
    if (heroElement && sliderDotsContainer && heroHighlightSpan) {
        
        function updateDots() {
            sliderDotsContainer.innerHTML = '';
            slideData.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('hero__slider-dot');
                if (index === currentIndex) {
                    dot.classList.add('hero__slider-dot--active');
                }
                dot.addEventListener('click', () => {
                    if (index !== currentIndex && !isAnimating) {
                        goToSlide(index);
                    }
                });
                sliderDotsContainer.appendChild(dot);
            });
        }

        function updateContent(index, isInitialLoad = false) {
            if (isAnimating && !isInitialLoad) return;
            isAnimating = true;

            const nextSlide = slideData[index];
      
            if (!isInitialLoad) {
                heroImageSide.classList.add('animate-out');
                heroHighlightSpan.classList.add('animate-out'); 
            }
        
            heroElement.classList.remove('hero--bg-1', 'hero--bg-2', 'hero--bg-3');
            heroElement.classList.add(nextSlide.bgClass); 
            
            const delay = isInitialLoad ? 10 : 700; 

            setTimeout(() => {
                
                heroHighlightSpan.textContent = nextSlide.highlightWord;
             
                heroMainImg.src = nextSlide.mainImg;
                heroSmallImg.src = nextSlide.smallImg;

                heroImageSide.classList.remove('animate-out');
                heroHighlightSpan.classList.remove('animate-out');
                
                heroImageSide.classList.add('slide-in-left');
                heroHighlightSpan.classList.add('slide-in-right');
                
                updateDots();

                setTimeout(() => {
                    heroImageSide.classList.remove('slide-in-left');
                    heroHighlightSpan.classList.remove('slide-in-right');
                    isAnimating = false; 
                }, 2000); 
                
            }, delay);
        }
        
        function goToSlide(index) {
            if (isAnimating) return; 

            currentIndex = index;
            updateContent(currentIndex);
        }
        
        let slideInterval;
        
        function startSlider() {
            if (slideInterval) clearInterval(slideInterval);
            
            updateContent(currentIndex, true); 

            slideInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % slideData.length;
                goToSlide(nextIndex);
            }, 500); 
        }

        startSlider();
    } 


    // ==================== MOCK DATA (PRODUCT LISTING) ====================
    const products = [
        { id: 1, name: "Barberton Daisy", price: 119.00, sale: true, salePercent: 13, image: "./image/02.svg", category: "House Plants" },
        { id: 2, name: "Angel Wing Begonia", price: 169.00, sale: false, image: "./image/03.svg", category: "Potting Plants" },
        { id: 3, name: "African Violet", price: 229.00, sale: true, salePercent: 20, image: "./image/04.svg", category: "House Plants" },
        { id: 4, name: "Beach Daisy", price: 129.00, sale: false, image: "./image/01.svg", category: "Small Plants" },
        { id: 5, name: "Royal Wedding Vine", price: 300.00, sale: false, image: "./image/05.svg", category: "Big Plants" },
        { id: 6, name: "Chinese Evergreen", price: 159.00, sale: true, salePercent: 10, image: "./image/06.svg", category: "House Plants" },
        { id: 7, name: "Blushing Bromeliad", price: 219.00, sale: false, image: "./image/08.svg", category: "Potting Plants" },
        { id: 8, name: "Aluminium Plant", price: 99.00, sale: true, salePercent: 25, image: "./image/15.svg", category: "Small Plants" },
        { id: 9, name: "Bird's Nest Fern", price: 199.00, sale: false, image: "./image/09.svg", category: "Big Plants" },
    ];

    const productGrid = document.querySelector('.main-content__grid');
    const productsCountElement = document.querySelector('.main-content__header .main-content__sort');

    function createProductCard(product) {
        const badge = product.sale ? 
            `<div class="product-card__badges">
                <span class="product-card__badge product-card__badge--sale">-${product.salePercent}% OFF</span>
            </div>` : '';

        return `
            <div class="product-card">
                <div class="product-card__image-box">
                    <img src="${product.image}" alt="${product.name}" class="product-card__img">
                    ${badge}
                    <div class="product-card__overlay">
                        <button class="product-card__action product-card__action--cart">
                            <i class="fas fa-shopping-cart"></i> Add to cart
                        </button>
                        <button class="product-card__action product-card__action--link">
                            <i class="fas fa-search"></i>
                        </button>
                        <button class="product-card__action product-card__action--like">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
                <h4 class="product-card__title">${product.name}</h4>
                <p class="product-card__price">$${product.price.toFixed(2)}</p>
            </div>
        `;
    }

    function renderProducts(currentProducts) {
        if (!productGrid) return;
        
        let gridHTML = '';
        currentProducts.forEach(product => {
            gridHTML += createProductCard(product);
        });
        
        productGrid.innerHTML = gridHTML;
        
        if (productsCountElement) {
  
            if (document.querySelector('.main-content__count')) {
                document.querySelector('.main-content__count').remove();
            }
            
            const newCount = document.createElement('p');
            newCount.classList.add('main-content__count');
            newCount.textContent = `${currentProducts.length} items`;
            
            productsCountElement.insertAdjacentElement('afterend', newCount);
        }
    }

    // ==================== PRICE RANGE FILTER  ====================
    
    const rangeInput = document.querySelector('.sidebar__range-input');
    const priceMinElement = document.querySelector('.sidebar__price-min');
    const priceMaxElement = document.querySelector('.sidebar__price-max');
    const maxPrice = 1500; 
    const minPriceLimit = 39; 

    if (rangeInput && priceMinElement && priceMaxElement) {
        
        rangeInput.min = minPriceLimit;
        rangeInput.max = maxPrice;
        
        const initialMax = parseInt(rangeInput.value); 
        priceMinElement.textContent = `$${minPriceLimit}`;
        priceMaxElement.textContent = `$${initialMax}`;

        rangeInput.addEventListener('input', function() {

            const currentMax = parseInt(this.value);
            priceMaxElement.textContent = `$${currentMax}`;h
            const percentage = (currentMax - minPriceLimit) / (maxPrice - minPriceLimit) * 100;
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
            
            this.style.background = `linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} ${percentage}%, #EAEAEA ${percentage}%, #EAEAEA 100%)`;
        });
        rangeInput.dispatchEvent(new Event('input')); 
    }
    
    
    // ==================== TAB NAVIGATION  ====================

    const tabButtons = document.querySelectorAll('.main-content__tab');
    
    tabButtons.forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelector('.main-content__tab--active').classList.remove('main-content__tab--active');
            this.classList.add('main-content__tab--active');
            
            const tabName = this.textContent.trim();
            
            let filteredProducts = products;

            if (tabName === "Sale") {
                filteredProducts = products.filter(p => p.sale);
            } else if (tabName === "New Arrivals") {
                filteredProducts = products.slice(0, 3); 
            }
            
            renderProducts(filteredProducts);
        });
    });
    renderProducts(products); 

});



const plantData = [
    {
        id: 1,
        imageSideSrc: "./image/05.svg",
        title: "Summer cactus & succulents",
        text: "We are an online plant shop offering a wide range of cheap and trendy plants",
        buttonText: "Find More",
        linkUrl: "#" 
    },
    {
        id: 2,
        imageSideSrc: "./image/04.svg",
        title: "Styling Trends & much more",
        text: "We are an online plant shop offering a wide range of cheap and trendy plants",
        buttonText: "Find More",
        linkUrl: "#"
    }
];

const ellipseImages = [
    "./image/Ellipse 7.png",
    "./image/Ellipse 8.png"
];

function renderPlantsSection(data, ellipseSources) {

    const plantsSection = document.querySelector('.plants');
    if (!plantsSection) {
        console.error("'.plants' section topilmadi.");
        return;
    }

    plantsSection.innerHTML = '';

    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';

    const plantsContainerDiv = document.createElement('div');
    plantsContainerDiv.className = 'plants__congtainer'; 
    const plantsList = document.createElement('ul');
    plantsList.className = 'plants__list';

    data.forEach(item => {
        const plantsItem = document.createElement('li');
        plantsItem.className = 'plants__items';

        const imageSideDiv = document.createElement('div');
        imageSideDiv.className = 'plants__image-side';

        const mainImg = document.createElement('img');
        mainImg.src = item.imageSideSrc;

        const innerImageDiv = document.createElement('div');
        innerImageDiv.className = 'plants__inner-image';

        ellipseSources.forEach((src, index) => {
            const ellipseImg = document.createElement('img');
            ellipseImg.src = src;
            ellipseImg.alt = `Ellipse ${index + 1}`; 
            ellipseImg.className = index === 0 ? 'ellipse-one' : 'ellipse-two';
            innerImageDiv.appendChild(ellipseImg);
        });

        imageSideDiv.appendChild(mainImg);
        imageSideDiv.appendChild(innerImageDiv);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'plants__content';

        const titleH3 = document.createElement('h3');
        titleH3.className = 'plants__title';
        titleH3.textContent = item.title;

        const textP = document.createElement('p');
        textP.className = 'plants__text';
        textP.textContent = item.text;

        const button = document.createElement('button');
        button.className = 'button';
        button.textContent = item.buttonText + ' '; 

        const iconI = document.createElement('i');
        iconI.className = 'arrow-right'; 
        button.appendChild(iconI);

        contentDiv.appendChild(titleH3);
        contentDiv.appendChild(textP);
        contentDiv.appendChild(button);

        plantsItem.appendChild(imageSideDiv);
        plantsItem.appendChild(contentDiv);

        plantsList.appendChild(plantsItem);
    });

    plantsContainerDiv.appendChild(plantsList);
    containerDiv.appendChild(plantsContainerDiv);
    plantsSection.appendChild(containerDiv);
}

document.addEventListener('DOMContentLoaded', () => {
    renderPlantsSection(plantData, ellipseImages);
});








const blogData = [
    {
        id: 1,
        imageSrc: "./image/10.svg",
        dateInfo: "September 12  I Read in 6 minutes",
        title: "Cactus & Succulent Care Tips",
        text: "Cacti are succulents are easy care plants for any home or patio. ",
        linkUrl: "#blog-post-1"
    },
    {
        id: 2,
        imageSrc: "./image/12.svg",
        dateInfo: "September 13  I Read in 2 minutes",
        title: "Top 10 Hated Plant Species",
        text: "Best in hanging baskets. Prefers medium to high light.",
        linkUrl: "#blog-post-2"
    },
    {
        id: 3,
        imageSrc: "./image/13.svg",
        dateInfo: "September 15  I Read in 3 minutes",
        title: "Cacti & Succulent Care Tips",
        text: "Cacti and succulents thrive in containers and because most are..",
        linkUrl: "#blog-post-3"
    },
    {
        id: 4,
        imageSrc: "./image/11.svg",
        dateInfo: "September 15  I Read in 2 minutes",
        title: "Best Houseplants Room by Room",
        text: "The benefits of houseplants are endless. In addition to..",
        linkUrl: "#blog-post-4"
    }
];

function renderBlogPosts(data) {
  
    const blogRow = document.querySelector('.blog__row-flex');
    if (!blogRow) {
        console.error("'.blog__row-flex' elementi topilmadi. HTML tuzilmasini tekshiring.");
        return;
    }

    blogRow.innerHTML = '';

    data.forEach(item => {

        const article = document.createElement('article');
        article.className = 'blog-card blog-card--equal';

        const imageBox = document.createElement('div');
        imageBox.className = 'blog-card__image-box';

        const img = document.createElement('img');
        img.src = item.imageSrc;
        img.alt = item.title;
        img.className = 'blog-card__img';
        
        imageBox.appendChild(img);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'blog-card__content';

        const dateP = document.createElement('p');
        dateP.className = 'blog-card__date';
        dateP.textContent = item.dateInfo;

        const titleH3 = document.createElement('h3');
        titleH3.className = 'blog-card__title';
        titleH3.textContent = item.title;

        const textP = document.createElement('p');
        textP.className = 'blog-card__description'; 
        textP.textContent = item.text;

        const linkA = document.createElement('a');
        linkA.href = item.linkUrl;
        linkA.className = 'blog-card__link';
        linkA.textContent = 'Read More ';

        const iconI = document.createElement('i');
        iconI.className = 'fas fa-arrow-right';
        linkA.appendChild(iconI);

        contentDiv.appendChild(dateP);
        contentDiv.appendChild(titleH3);
        contentDiv.appendChild(textP); 
        contentDiv.appendChild(linkA);

        article.appendChild(imageBox);
        article.appendChild(contentDiv);

        blogRow.appendChild(article);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts(blogData);
});











document.addEventListener('DOMContentLoaded', () => {

    const productData = {
        id: 1,
        title: "Barberton Daisy",
        price: 119.00,
        oldPrice: 159.00, 
        rating: 4.5,
        reviewCount: 19,
        shortDescription: "The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground, giving your home a touch of modern sophistication.",
        sku: "1995751877966",
        categories: "Potter Plants",
        tags: "Home, Garden, Plants, Indoor",
        fullDescription: "The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, nisl id aliquet consectetur, ante odio euismod sem, eget egestas ligula leo quis enim. Pellentesque in finibus est.",
        livingRoomDescription: "In your living room, these planters can serve as stylish accents, bringing a natural feel to your indoor space.",
        sizes: ["S", "M", "L", "XL"],
        images: [
            { src: "image/04.svg", alt: "Barberton Daisy - Asosiy" },
            { src: "image/02.svg", alt: "Barberton Daisy - Yon" },
            { src: "image/01.svg", alt: "Barberton Daisy - Past" },
            { src: "image/03.svg", alt: "Barberton Daisy - Tepa" }
        ]
    };

    const relatedProductsData = [
        { id: 10, name: "Beach Spider Lily", price: 129.00, image: "image/01.svg" },
        { id: 11, name: "Blossom Flower", price: 129.00, image: "image/05.svg" },
        { id: 12, name: "Cactus", price: 89.00, image: "image/06.svg" },
        { id: 13, name: "Bonsai Tree", price: 150.00, image: "image/08.svg" },
        { id: 14, name: "Succulent", price: 99.00, image: "image/09.svg" },
        { id: 15, name: "Small Plant", price: 75.00, image: "image/07.svg" },
    ];


    const mainImage = document.getElementById('mainImage');
    const productThumbnails = document.getElementById('productThumbnails');
    const productRatingStars = document.getElementById('productRatingStars');
    const sizeOptionsContainer = document.getElementById('sizeOptions');
    const quantityInput = document.getElementById('quantityInput');
    const minusButton = document.getElementById('quantityMinus');
    const plusButton = document.getElementById('quantityPlus');
    const relatedList = document.getElementById('relatedProductsList');
    const paginationContainer = document.getElementById('relatedProductsPagination');
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');
    const reviewsTabBtn = document.getElementById('reviewsTab');
    const wishlistBtn = document.getElementById('wishlistBtn');

    const createStarRatingHTML = (rating) => {
        let starsHTML = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fa-solid fa-star"></i>';
        }
        if (hasHalfStar) {
            starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
        }
        for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
            starsHTML += '<i class="fa-regular fa-star"></i>';
        }
        return starsHTML;
    };
    
    const updateMainImage = (src, alt) => {
        mainImage.src = src;
        mainImage.alt = alt;

        document.querySelectorAll('.product-gallery__thumbnail').forEach(t => {
            t.classList.remove('product-gallery__thumbnail--active');
            if (t.src.includes(src.substring(src.lastIndexOf('/') + 1))) {
                t.classList.add('product-gallery__thumbnail--active');
            }
        });
    };



    const loadProductDetails = (data) => {
        document.getElementById('productTitle').textContent = data.title;
    
        document.getElementById('productPrice').textContent = `$${data.price.toFixed(2)}`;
        
        document.getElementById('shortDescription').textContent = data.shortDescription;
        document.getElementById('fullDescription').textContent = data.fullDescription;
        document.getElementById('livingRoomDescription').textContent = data.livingRoomDescription;

        document.getElementById('productSku').textContent = data.sku;
        document.getElementById('productCategories').textContent = data.categories;
        document.getElementById('productTags').textContent = data.tags;

        productRatingStars.innerHTML = createStarRatingHTML(data.rating);
        document.getElementById('reviewCount').textContent = `(${data.reviewCount} Customer Review)`;

        sizeOptionsContainer.innerHTML = '';
        data.sizes.forEach((size, index) => {
            const span = document.createElement('span');
            span.classList.add('size-selection__option');
            if (index === 0) span.classList.add('size-selection__option--active');
            span.textContent = size;
            span.addEventListener('click', function() {
                document.querySelectorAll('.size-selection__option').forEach(opt => opt.classList.remove('size-selection__option--active'));
                this.classList.add('size-selection__option--active');
            });
            sizeOptionsContainer.appendChild(span);
        });

        productThumbnails.innerHTML = '';
        data.images.forEach((img, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.alt = img.alt;
            imgElement.classList.add('product-gallery__thumbnail');
            if (index === 0) imgElement.classList.add('product-gallery__thumbnail--active');
            
            imgElement.addEventListener('click', () => updateMainImage(img.src, img.alt));
            productThumbnails.appendChild(imgElement);
        });

        if (data.images.length > 0) {
            updateMainImage(data.images[0].src, data.images[0].alt);
        }
    };

    minusButton.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) quantityInput.value = currentValue - 1;
    });

    plusButton.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });


    const WISHLIST_KEY = `product_${productData.id}_wishlist`;

    const loadWishlistState = () => {
        const isWished = localStorage.getItem(WISHLIST_KEY) === 'true';
        if (isWished) {
            wishlistBtn.classList.add('active');
            wishlistBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'; // To'liq yurak
        } else {
            wishlistBtn.classList.remove('active');
            wishlistBtn.innerHTML = '<i class="fa-regular fa-heart"></i>'; // Bo'sh yurak
        }
    };

    wishlistBtn.addEventListener('click', () => {
        const isActive = wishlistBtn.classList.toggle('active');
        localStorage.setItem(WISHLIST_KEY, isActive);
        loadWishlistState(); 
    });

    const tabNavItems = document.querySelectorAll('.product-tabs__nav-item');
    const tabContents = document.querySelectorAll('.product-tabs__content');

    tabNavItems.forEach(item => {
        item.addEventListener('click', () => {
            tabNavItems.forEach(nav => nav.classList.remove('product-tabs__nav-item--active'));
            tabContents.forEach(content => content.classList.remove('product-tabs__content--active'));

            item.classList.add('product-tabs__nav-item--active');
            const targetTab = item.getAttribute('data-tab');
            const targetContent = document.querySelector(`.product-tabs__content[data-content="${targetTab}"]`);
            if (targetContent) targetContent.classList.add('product-tabs__content--active');
        });
    });

    const REVIEWS_STORAGE_KEY = `reviews_product_${productData.id}`;
    
    const loadReviews = () => {
        const reviews = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY)) || [];
        reviewsList.innerHTML = ''; 

        reviewsTabBtn.textContent = `Reviews (${reviews.length})`;

        if (reviews.length === 0) {
             reviewsList.innerHTML = '<p class="reviews__empty-message">Hali sharhlar mavjud emas. Birinchi bo\'lib sharh qoldiring!</p>';
             return;
        }

        reviews.reverse().forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review-item');
            
            reviewElement.innerHTML = `
                <div class="review-item__header">
                    <span class="review-item__name">${review.name}</span>
                    <span class="review-item__rating" aria-label="${review.rating} yulduz reyting">${createStarRatingHTML(review.rating)}</span>
                </div>
                <p class="review-item__text">${review.text}</p>
                <span class="review-item__date">${review.date}</span>
            `;
            reviewsList.appendChild(reviewElement);
        });
    };

    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('reviewName').value;
            const rating = parseInt(document.getElementById('reviewRating').value);
            const text = document.getElementById('reviewText').value;
            const date = new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });

            const newReview = { name, rating, text, date };
            const reviews = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY)) || [];
            reviews.push(newReview);
            localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));

            loadReviews();
            reviewForm.reset();
            
            alert('Sharhingiz muvaffaqiyatli qoldirildi!');
        });
    }

    const loadRelatedProducts = (data) => {
        relatedList.innerHTML = ''; 
        
        data.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('related-products__item', 'product-card');
            productCard.setAttribute('data-index', index);
            
            productCard.innerHTML = `
                <a href="#" class="product-card__link">
                    <div class="product-card__image-wrap">
                        <img src="${product.image}" alt="${product.name}" class="product-card__image">
                    </div>
                    <h3 class="product-card__name">${product.name}</h3>
                    <span class="product-card__price">$${product.price.toFixed(2)}</span>
                </a>
            `;
            
            const image = productCard.querySelector('.product-card__image');
            image.addEventListener('click', (e) => {
                e.preventDefault(); 
                updateMainImage(product.image, product.name);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            relatedList.appendChild(productCard);
        });
        
        setupRelatedProductsSlider(relatedProductsData.length);
    };

    const setupRelatedProductsSlider = (totalItems) => {

        paginationContainer.innerHTML = '';
    };
    loadProductDetails(productData);
    loadWishlistState();
    loadReviews();
    loadRelatedProducts(relatedProductsData);
});


document.addEventListener('DOMContentLoaded', () => {

    const buyNowButton = document.querySelector('.actions__btn--buy');

  
    if (buyNowButton) {
        
        buyNowButton.addEventListener('click', (e) => {

            e.preventDefault(); 
            
            window.location.href = './karzinka.html'; 
            
            
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    function updateCartTotals() {
        const cartTableBody = document.querySelector('.table-cart__body');
        const subtotalElement = document.querySelector('.summary__value');
        const totalElement = document.querySelector('.summary__value--total');
        const shippingCost = 16.00; 
        let calculatedSubtotal = 0;
        cartTableBody.querySelectorAll('.item-row').forEach(row => {
            const priceText = row.querySelector('.item-row__price').textContent;
            const quantityInput = row.querySelector('.quantity__input');
            const totalElementRow = row.querySelector('.item-row__total');
            const price = parseFloat(priceText.replace('$', '').replace(',', ''));
            const quantity = parseInt(quantityInput.textContent);
            const rowTotal = price * quantity;
            calculatedSubtotal += rowTotal;
            totalElementRow.textContent = `$${rowTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`; 
        });
        const subtotalFormatted = calculatedSubtotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        subtotalElement.textContent = `$${subtotalFormatted}`;
        const finalTotal = calculatedSubtotal + shippingCost;
        const finalTotalFormatted = finalTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        totalElement.textContent = `$${finalTotalFormatted}`;
    }
    function setupQuantityControls() {
        document.querySelectorAll('.quantity__button').forEach(button => {
            button.addEventListener('click', (e) => {
                const button = e.currentTarget;
                const row = button.closest('.item-row');
                const quantityInput = row.querySelector('.quantity__input');
                let quantity = parseInt(quantityInput.textContent);

                if (button.classList.contains('quantity__button--plus')) {
                    quantity++;
                } else if (button.classList.contains('quantity__button--minus')) {
                    if (quantity > 1) { 
                        quantity--;
                    }
                }
                quantityInput.textContent = quantity;
                updateCartTotals();
            });
        });
    }
    function setupRemoveControls() {
        document.querySelectorAll('.item-row__remove').forEach(removeBtn => {
            removeBtn.addEventListener('click', (e) => {
                const row = e.currentTarget.closest('.item-row');
                row.style.opacity = '0';
                row.style.transform = 'translateX(-100%)';
                
                setTimeout(() => {
                    row.remove(); 
                    updateCartTotals(); 
                }, 300); 

            });
        });
    }
    setupQuantityControls();
    setupRemoveControls();
    updateCartTotals(); 
});


const CART_STORAGE_KEY = 'greenShopCart';

function loadCart() {
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function formatCurrency(amount) {
    if (isNaN(amount) || amount === null) return '$0.00';
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}


// SHOP PAGE (index.html)
// ==========================================================
function setupShopPage() {
    document.querySelectorAll('.actions__btn--buy').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('.product-card');
            
            const productId = card.dataset.id;
            const productName = card.dataset.name;
            const productPrice = parseFloat(card.dataset.price);
            const productImage = card.dataset.image;

            let cart = loadCart();
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }

            saveCart(cart);
            alert(`"${productName}" savatchaga qo'shildi. Savatcha sahifasiga o'ting!`);
        });
    });
}

// karzinka 
// ==========================================================

function renderCart() {
    const cart = loadCart();
    const cartTableBody = document.querySelector('.table-cart__body');
    if (!cartTableBody) return; 

    cartTableBody.innerHTML = ''; 

    if (cart.length === 0) {
        cartTableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 50px 0; color: #888;">Savatchada mahsulotlar mavjud emas.</td>
            </tr>
        `;
    } else {
        cart.forEach(item => {
            const rowTotal = item.price * item.quantity;
            
            const rowHtml = `
                <tr class="table-cart__item item-row" data-id="${item.id}">
                    <td class="item-row__product product-info">
                        <img src="${item.image}" alt="${item.name}" class="product-info__image">
                        <div class="product-info__details">
                            <h3 class="product-info__name">${item.name}</h3>
                            <p class="product-info__sku">SKU: ${item.id}</p>
                        </div>
                    </td>
                    <td class="item-row__price">${formatCurrency(item.price)}</td>
                    <td class="item-row__quantity quantity">
                        <button class="quantity__button quantity__button--minus" data-action="minus">-</button>
                        <span class="quantity__input">${item.quantity}</span>
                        <button class="quantity__button quantity__button--plus" data-action="plus">+</button>
                    </td>
                    <td class="item-row__total">${formatCurrency(rowTotal)}</td>
                    <td class="item-row__remove remove-btn">
                        <i class="fa-solid fa-trash-can" data-action="remove"></i>
                    </td>
                </tr>
            `;
            cartTableBody.insertAdjacentHTML('beforeend', rowHtml);
        });
    }
    setupQuantityControls();
    setupRemoveControls();
    updateCartTotals();
}
function updateCartTotals() {
    const cart = loadCart();
    const subtotalElement = document.querySelector('.summary__value');
    const totalElement = document.querySelector('.summary__value--total');
    const shippingCost = 16.00; 

    let calculatedSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (subtotalElement) {
        subtotalElement.textContent = formatCurrency(calculatedSubtotal);

        const finalTotal = calculatedSubtotal + shippingCost;
        totalElement.textContent = formatCurrency(finalTotal);
    }
    document.querySelectorAll('.item-row').forEach(row => {
        const productId = row.dataset.id;
        const item = cart.find(i => i.id === productId);
        if (item) {
             row.querySelector('.item-row__total').textContent = formatCurrency(item.price * item.quantity);
        }
    });
}

function setupQuantityControls() {
    document.querySelectorAll('.quantity__button').forEach(button => {
        button.onclick = null; 
        button.addEventListener('click', (e) => {
            const row = e.currentTarget.closest('.item-row');
            const productId = row.dataset.id;
            let cart = loadCart();
            const item = cart.find(i => i.id === productId);

            if (!item) return;

            if (e.currentTarget.dataset.action === 'plus') {
                item.quantity += 1;
            } else if (e.currentTarget.dataset.action === 'minus') {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    alert("Mahsulot miqdori 1 dan kam bo'lishi mumkin emas. Uni savatchadan o'chirishingiz mumkin.");
                    return;
                }
            }
            row.querySelector('.quantity__input').textContent = item.quantity;
            saveCart(cart);
            updateCartTotals(); 
        });
    });
}

function setupRemoveControls() {
    document.querySelectorAll('[data-action="remove"]').forEach(icon => {
        icon.onclick = null; 
        icon.addEventListener('click', (e) => {
            const row = e.currentTarget.closest('.item-row');
            const productId = row.dataset.id;
            row.style.opacity = '0';
            row.style.transform = 'translateX(-100%)';
            
            setTimeout(() => {
                row.remove(); 
                
                let cart = loadCart();
                cart = cart.filter(item => item.id !== productId);
                saveCart(cart);

                renderCart();
            }, 300); 

        });
    });
}

function setupCheckoutModal() {
    const checkoutBtn = document.querySelector('.cart-totals__checkout-btn');
    const modal = document.getElementById('orderConfirmationModal');
    const modalSummary = document.getElementById('modalOrderSummary');
    const trackBtn = document.getElementById('trackOrderBtn');
    const closeBtn = document.getElementById('closeModalBtn');

    if (!checkoutBtn) return; 
    checkoutBtn.addEventListener('click', () => {
        const cart = loadCart();
        if (cart.length === 0) {
            alert("Savatcha bo'sh. Iltimos, mahsulot qo'shing.");
            return;
        }
        const finalTotalText = document.querySelector('.summary__value--total').textContent;
        modalSummary.innerHTML = `
            <p><strong>Umumiy summa:</strong> <span style="font-size: 1.1rem; color: var(--primary-color);">${finalTotalText}</span></p>
            <p style="margin-top: 10px;">Mahsulotlar soni: <strong>${cart.length}</strong></p>
        `;
        
        modal.style.display = 'block'; 
    });
    trackBtn.addEventListener('click', () => {
        alert("🎉 Mahsulotingiz qabul qilindi! Buyurtma raqami: #GS" + Date.now().toString().slice(-6) + ". Tez orada yetkazib beriladi.");
        saveCart([]);
        modal.style.display = 'none'; 
        renderCart(); 
    });
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}




