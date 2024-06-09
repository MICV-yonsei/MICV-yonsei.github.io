// 페이지가 로드되면 show 클래스를 body 요소에 추가
window.addEventListener("load", function () {
	document.body.classList.add("show");
});

// welcome image slider
document.addEventListener("DOMContentLoaded", function () {
	var imageFolder = "media/welcome/";
	var imageExtensions = ["jpg", "jpeg", "png", "gif"];
	var targetWidth = 1600; // 기본 목표 너비
	var targetHeight = 1200; // 기본 목표 높이

	// 이미지 파일 목록을 가져와서 캐러셀에 추가
	var images = [];
	var carouselInner = document.getElementById("carousel-images");
	var carouselIndicators = document.getElementById("carousel-indicators");

	function loadImages() {
		var imagePaths = [];

		imageExtensions.forEach(function (extension) {
			for (var i = 1; i <= 10; i++) {
				// 1~10번 이미지 파일을 시도
				var imagePath = imageFolder + "welcome" + i + "." + extension;
				imagePaths.push(imagePath);
			}
		});

		// 이미지 경로 정렬
		imagePaths.sort();

		imagePaths.forEach(function (imagePath, index) {
			var img = new Image();
			img.src = imagePath;
			img.onload = function () {
				var resizedImage = resizeImage(this, targetWidth, targetHeight);
				images.push(resizedImage);
				var activeClass = images.length === 1 ? "active" : "";
				var carouselItem = `
          <div class="carousel-item ${activeClass}">
            <img src="${resizedImage}" class="d-block w-100" alt="" style="object-fit: cover;">
          </div>
        `;
				var indicatorItem = `<li data-target="#heroCarousel" data-slide-to="${images.length - 1}" class="${activeClass}"></li>`;
				carouselInner.innerHTML += carouselItem;
				carouselIndicators.innerHTML += indicatorItem;
			};
			img.onerror = function () {
				// 이미지가 존재하지 않으면 무시
			};
		});

		// 이미지가 1개인 경우 캐러셀 비활성화
		setTimeout(function () {
			if (images.length <= 1) {
				document.querySelector(".carousel-control-prev").style.display = "none";
				document.querySelector(".carousel-control-next").style.display = "none";
				$("#heroCarousel").carousel("pause");
			} else {
				// 슬라이딩 속도 조절 (슬라이드 속도는 1초)
				$("#heroCarousel").on("slide.bs.carousel", function () {
					$(".carousel-item").css("transition", "transform 1.0s ease");
				});
			}
		}, 500); // 이미지 로드 후 0.5초 대기
	}

	function resizeImage(img, width, height) {
		var canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, width, height);
		return canvas.toDataURL("image/jpeg");
	}

	loadImages();
});
