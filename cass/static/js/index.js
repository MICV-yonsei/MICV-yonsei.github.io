window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    document.addEventListener('DOMContentLoaded', function() {
      const slider = document.getElementById('background-slider');
      const items = Array.from(slider.getElementsByClassName('slider-item'));
      let currentPosition = 0;
      
      // Clone first item and append to the end for smooth infinite scroll
      const firstItem = items[0].cloneNode(true);
      slider.appendChild(firstItem);
      
      // Initial setup
      slider.style.width = `${(items.length + 1) * 100}%`; // Add width for cloned item
      slider.style.display = 'flex';
      slider.style.transform = 'translateX(0)';
      
      function moveSlider() {
        currentPosition -= 100; // Move full width
        slider.style.transition = 'transform 1s ease';
        slider.style.transform = `translateX(${currentPosition}%)`;
        
        // Reset when reaching the end
        if (currentPosition <= -(items.length * 100)) {
          setTimeout(() => {
            slider.style.transition = 'none';
            currentPosition = 0;
            slider.style.transform = 'translateX(0)';
            setTimeout(() => {
              slider.style.transition = 'transform 1s ease';
            }, 50);
          }, 1000);
        }
      }
      
      // Start the automatic sliding
      const slideInterval = setInterval(moveSlider, 5000); // Change image every 5 seconds
      
      // Optional: Pause on hover
      slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
      slider.addEventListener('mouseleave', () => setInterval(moveSlider, 5000));
    });

    // 이미지 슬라이더 관련 코드 추가
    function setupImageSlider() {
        const slider = document.getElementById('image-slider');
        const items = Array.from(slider.getElementsByClassName('slider-item'));
        
        // Clone items for infinite scroll
        items.forEach(item => {
            const clone = item.cloneNode(true);
            slider.appendChild(clone);
        });
        
        let position = 0;
        const slideWidth = 33.333; // 변경: 16.666에서 33.333으로 증가
        
        function slide() {
            position -= slideWidth;
            slider.style.transform = `translateX(${position}%)`;
            
            // 수정: 마지막 이미지를 완전히 보여주기 위해 계산 방식 변경
            const totalSlides = slider.children.length;
            const endPosition = -(totalSlides - 3) * slideWidth; // 한 번에 3개의 슬라이드가 보이므로
            
            if (position <= endPosition) {
                setTimeout(() => {
                    slider.style.transition = 'none';
                    position = 0;
                    slider.style.transform = `translateX(${position}%)`;
                    setTimeout(() => {
                        slider.style.transition = 'transform 1s ease';
                    }, 50);
                }, 1000);
            }
        }
        
        // Slide every 3 seconds
        const slideInterval = setInterval(slide, 4000);
        
        // Pause on hover
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', () => setInterval(slide, 3000));
    }
    
    setupImageSlider();
})
