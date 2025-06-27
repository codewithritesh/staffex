document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (document.body.classList.contains('nav-open')) {
                toggleMobileMenu();
            }
        });
    });


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNavLink() {
    let current = sections[0].getAttribute('id'); // Default to first section

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);


    // // Highlight active nav link on scroll
    // const sections = document.querySelectorAll('section');
    // const navLinks = document.querySelectorAll('.nav-links a');

    // function highlightNavLink() {
    //     let current = '';
    //     sections.forEach(section => {
    //         const sectionTop = section.offsetTop - 150; // Adjust offset for fixed header
    //         if (scrollY >= sectionTop) {
    //             current = section.getAttribute('id');
    //         }
    //     });

    //     navLinks.forEach(link => {
    //         link.classList.remove('active');
    //         if (link.getAttribute('href').includes(current)) {
    //             link.classList.add('active');
    //         }
    //     });
    // }

    // window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Call on load to set initial active state

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');

    function toggleMobileMenu() {
        navbar.classList.toggle('active');
        document.body.classList.toggle('nav-open'); // Add class to body to prevent scroll
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    // Testimonial Carousel
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoSlideInterval;

    function showTestimonial(index) {
        testimonials.forEach((item, i) => {
            item.classList.remove('active');
            dots[i].classList.remove('active');
        });
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextTestimonial, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners for dots
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            stopAutoSlide(); // Stop auto-sliding on manual interaction
            showTestimonial(parseInt(e.target.dataset.slide));
            startAutoSlide(); // Restart auto-sliding after a brief pause
        });
    });

    showTestimonial(currentIndex); // Show the first testimonial initially
    startAutoSlide(); // Start auto-sliding

    // Pause auto-slide on hover for testimonials section
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', stopAutoSlide);
        testimonialsSection.addEventListener('mouseleave', startAutoSlide);
    }
});