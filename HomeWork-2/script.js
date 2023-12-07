const images = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWjxBrPSXpdFFz6yYPfS5bWsWc3mrptDyGwAnmMRm46v7EFJor6BYkHKwv-4Hgyxe9r9I&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAuLUZjNlhpmEqFQiPrg207Kq2RgFi3ZiuuajvQYtNZ2fOmvp9LSXQlZoueadtV074W_Y&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiq__C3jhaTLqI7We7EofobGbT5pN8wEcnxSbnH6KIBEUDNx-dQAoUkoMaTZzqLm_x2m8&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk-wSLBFRqbqFVouuqqSZlxuo_u13GwpGY7nZYT2SQ2EMEo9Ydxk3Gz1VVaSzcUsWiVXw&usqp=CAU'];

let currentImageIndex = 0;

const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const indicators = document.querySelectorAll('.indicator');
const currentImage = document.getElementById('current-image');

function showImage(index) {
    currentImage.src = images[index];
    indicators.forEach((indicator, i) => {
        indicator.classList.remove('active');
        if (i === index) {
            indicator.classList.add('active');
        }
    });
}

previousButton.addEventListener('click', function () {
    currentImageIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
    showImage(currentImageIndex);
});

nextButton.addEventListener('click', function () {
    currentImageIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
    showImage(currentImageIndex);
});

indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', function () {
        currentImageIndex = parseInt(indicator.getAttribute('data-index'));
        showImage(currentImageIndex);
    });
});

showImage(currentImageIndex);