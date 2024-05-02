let http = new XMLHttpRequest();
http.open('get', 'products.json', true);
http.send();
http.onload = function(){
   if(this.readyState == 4 && this.status == 200){
      let products = JSON.parse(this.responseText);
      let output = "";
      for(let item of products){
         output += `
            <div class="product">
               <img src="${item.image}" alt="${item.description}">
               <p class="title">${item.title}</p>
               <p class="description">${item.description}</p>
               <p class="price">
                  <span>${item.price}</span>
                  <span>€</span>
               </p>
               <p class="cart">Add to cart <i class="bx bx-cart-alt"></i></p>
            </div>
         `;
      }
      document.querySelector(".products").innerHTML = output;
   }
}


$(document).ready(function() {
    // Load JSON data from the specified URL
    $.getJSON('images.json', function(data) {
        // Data contains the parsed JSON object
        // You can use this data to populate your image carousel
        const $carouselImages = $('.carousel-images');
        const $prevButton = $('.prev-button');
        const $nextButton = $('.next-button');
        const $autoplayCheckbox = $('#autoplay-checkbox');

        let currentIndex = 0;
        let autoplayInterval;
        const autoplaySpeed = 3000; // Autoplay speed in milliseconds

        function showImage(index) {
            $carouselImages.children().hide();
            $carouselImages.children().eq(index).show();
        }

        function loadImages() {
            $carouselImages.empty();
            data.forEach((imageData) => {
                const $image = $('<img>').attr('src', imageData.imageUrl).attr('alt', imageData.description);
                $carouselImages.append($image);
            });
            showImage(currentIndex);
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % data.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + data.length) % data.length;
            showImage(currentIndex);
        }

        function startAutoplay() {
            autoplayInterval = setInterval(nextImage, autoplaySpeed);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        $nextButton.click(function() {
            stopAutoplay();
            nextImage();
        });

        $prevButton.click(function() {
            stopAutoplay();
            prevImage();
        });

        $autoplayCheckbox.change(function() {
            if ($(this).is(':checked')) {
                startAutoplay();
            } else {
                stopAutoplay();
            }
        });

        loadImages();
    });
});