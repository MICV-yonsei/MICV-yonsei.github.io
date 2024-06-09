// 페이지가 로드되면 show 클래스를 body 요소에 추가
window.addEventListener("load", function () {
	document.body.classList.add("show");
});

// welcome image slider
document.addEventListener("DOMContentLoaded", function () {
	const imageFolder = "media/welcome/"; // 이미지 폴더 경로
	const targetWidth = 1600; // 기본 목표 너비
	const targetHeight = 1200; // 기본 목표 높이

	const carouselInner = document.getElementById("carousel-images");
	const carouselIndicators = document.getElementById("carousel-indicators");

	function fetchAndSortImages() {
		return fetch("media/welcome/images.json")
			.then((response) => response.json())
			.then((files) => {
				return files.sort((a, b) => a.order - b.order); // order 키를 기준으로 오름차순 정렬
			})
			.catch((error) => {
				console.error("Error fetching and sorting images:", error);
				return [];
			});
	}

	function preloadImages(files, callback) {
		let loadedCount = 0;
		const images = [];

		files.forEach((file, index) => {
			const img = new Image();
			img.src = `${imageFolder}${file.filename}`;
			img.onload = () => {
				const resizedImage = resizeImage(img, targetWidth, targetHeight);
				images.push({ src: resizedImage, description: file.description, filename: file.filename });
				loadedCount++;
				if (loadedCount === files.length) {
					callback(images);
				}
			};
			img.onerror = () => {
				console.error(`Error loading image: ${file.filename}`);
				loadedCount++;
				if (loadedCount === files.length) {
					callback(images);
				}
			};
		});
	}

	function displayImages(images) {
		// 기존 캐러셀 콘텐츠 초기화
		carouselInner.innerHTML = "";
		carouselIndicators.innerHTML = "";

		images.forEach((image, idx) => {
			const activeClass = idx === 0 ? "active" : "";
			const carouselItem = `
                <div class="carousel-item ${activeClass}">
                    <img src="${image.src}" class="d-block w-100" alt="" style="object-fit: cover;">
                    <div class="overlay">${image.description}</div>
                </div>
            `;
			const indicatorItem = `<li data-target="#heroCarousel" data-slide-to="${idx}" class="${activeClass}"></li>`;
			carouselInner.innerHTML += carouselItem;
			carouselIndicators.innerHTML += indicatorItem;
		});

		// 이미지가 1개인 경우 캐러셀 비활성화
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
	}

	function resizeImage(img, width, height) {
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, width, height);
		return canvas.toDataURL("image/jpeg");
	}

	fetchAndSortImages().then((files) => {
		preloadImages(files, displayImages);
	});
});
