document.addEventListener('DOMContentLoaded', () => {
    /* Mobile Menu Logic */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const warn = document.querySelector(".warn");
    const body = document.body;

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.contains('open');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    function openMenu() {
        mobileMenu.classList.add('open');
        hamburger.classList.add('active');
        warn.classList.add("active");
        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        warn.classList.remove("active");
        body.style.overflow = '';
    }

    /* Hero Slider Logic */
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.hero-slider .dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');

    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        function showSlide(index) {
            // Handle wrapping
            if (index >= totalSlides) index = 0;
            if (index < 0) index = totalSlides - 1;

            currentSlide = index;

            // Update DOM
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // Event Listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-slide'));
                showSlide(index);
            });
        });

        // Optional: Auto-slide
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    /* Tab Filtering Logic */
    const tabs = document.querySelectorAll('.tab-btn');

    // Function to apply filter
    function applyFilter(tab) {
        const filterValue = tab.getAttribute('data-filter');
        const section = tab.closest('.section'); // Find parent section

        if (filterValue && section) {
            const products = section.querySelectorAll('.product-card');

            products.forEach(card => {
                const brand = card.getAttribute('data-brand');

                // If filter is 'all' or matches brand, show it. Otherwise hide.
                if (filterValue === 'all' || brand === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Active State Toggle
            const parent = tab.closest('.tabs');
            if (parent) {
                parent.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            }

            // Apply Filter if present
            applyFilter(tab);
        });
    });

    // Initialize Filter on Load (for active tabs)
    document.querySelectorAll('.tab-btn.active').forEach(activeTab => {
        applyFilter(activeTab);
    });

    /* Product Slider Navigation Logic */
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const grid = section.querySelector('.products-grid');
        const prevBtn = section.querySelector('.arrow-btn.prev');
        const nextBtn = section.querySelector('.arrow-btn.next');

        if (grid && prevBtn && nextBtn) {
            nextBtn.addEventListener('click', () => {
                // Find first visible card to get correct width
                const cards = grid.querySelectorAll('.product-card');
                const visibleCard = Array.from(cards).find(c => c.offsetWidth > 0);

                if (visibleCard) {
                    const scrollAmount = visibleCard.offsetWidth + 20; // width + gap
                    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            });

            prevBtn.addEventListener('click', () => {
                const cards = grid.querySelectorAll('.product-card');
                const visibleCard = Array.from(cards).find(c => c.offsetWidth > 0);

                if (visibleCard) {
                    const scrollAmount = visibleCard.offsetWidth + 20;
                    grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            });
        }
    });

    /* Reviews Slider Logic */
    const reviewsSection = document.querySelector('.reviews-section');
    if (reviewsSection) {
        const grid = reviewsSection.querySelector('.reviews-list-grid');
        const prevBtn = reviewsSection.querySelector('.arrow-btn.prev-review');
        const nextBtn = reviewsSection.querySelector('.arrow-btn.next-review');

        if (grid && prevBtn && nextBtn) {
            nextBtn.addEventListener('click', () => {
                const card = grid.querySelector('.review-card');
                if (card) {
                    const scrollAmount = card.offsetWidth + 20; // width + gap
                    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            });

            prevBtn.addEventListener('click', () => {
                const card = grid.querySelector('.review-card');
                if (card) {
                    const scrollAmount = card.offsetWidth + 20;
                    grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            });
        }
    }

});



const city = document.getElementById("city");
const cont = document.querySelectorAll(".foot-cont-three a");
city.addEventListener("click", toggleCont);
function toggleCont() {
    city.classList.toggle("active");
    Array.from(cont).forEach((el) => {
        el.style.display = el.style.display === "block" ? "none" : "block";
    });
}

const yearSpan = document.querySelector('#year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}



// Age verification modal
const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

window.addEventListener("load", () => {
    if (localStorage.getItem("ageConfirmed") != "true") {
        ageModal.style.display = "flex";
    } else {
        ageModal.style.display = "none";
    }
});

yesBtn.addEventListener("click", () => {
    localStorage.setItem("ageConfirmed", "true");
    ageModal.style.display = "none";
});

noBtn.addEventListener("click", () => {
    alert("Dostęp zabroniony. Strona tylko dla osób 18+");
    window.close();
    window.location.href = "https://www.google.pl";
});

// Hide the top warning when the page is scrolled
const warn = document.querySelector(".warn");
if (warn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            warn.style.display = "none";
        } else {
            warn.style.display = "";
        }
    });
}