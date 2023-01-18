// pobranie elementów potrzebnych do działania slajdera
const sliderContainer = document.querySelector('.slider-container');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const sliderNav = document.querySelector('.slider-nav');
const sliderNavBtn = document.querySelectorAll('.slider-nav-btn');
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');

// ustawienie początkowej pozycji slajdera
let currentSlide = 0;
let slideWidth = sliderContainer.clientWidth;
slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

// funkcja przewijająca slajdy
function goToSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
    slideWidth = sliderContainer.clientWidth;
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateNav();
}

// funkcja aktualizująca stan przycisków nawigacyjnych
function updateNav() {
    sliderNavBtn.forEach((btn, index) => {
        if (index === currentSlide) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// obsługa kliknięć w przyciski nawigacyjne
sliderNav.addEventListener('click', (event) => {
    if (event.target.classList.contains('slider-nav-btn')) {
        goToSlide(+event.target.dataset.slide - 1);
    }
});

// obsługa kliknięć w przycisk "wstecz"
sliderPrev.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
});

// obsługa kliknięć w przycisk "dalej"
sliderNext.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
});
