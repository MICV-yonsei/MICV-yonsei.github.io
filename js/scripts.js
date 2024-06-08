// 페이지가 로드되면 show 클래스를 fade 요소에 추가
window.addEventListener('load', function() {
    document.querySelectorAll('.fade').forEach(function(element) {
        element.classList.add('show');
    });
});
