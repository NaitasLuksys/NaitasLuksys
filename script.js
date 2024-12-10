document.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('div[id], section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';
    const windowHeight = window.innerHeight;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = rect.height;
        if (rect.top <= windowHeight / 5 && rect.top + sectionHeight >= windowHeight / 5) {
            currentSection = section.id;
        }
    });
    navLinks.forEach(link => {
        const linkSection = link.getAttribute('href').substring(1);
        
        if (linkSection === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
document.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    menuToggle.addEventListener('click', function () {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.querySelectorAll('.dropdown-menu li a, .theme-toggle-btn').forEach(item => {
        item.addEventListener('click', () => {
            dropdownMenu.style.display = 'none';
        });
    });
});
function toggleTheme() {
    const body = document.body;
    const button = document.querySelector('.theme-toggle-btn');

    body.classList.toggle('dark-mode');
    button.classList.toggle('dark');
}
document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    const menuIcon = document.querySelector('.menu-icon');
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleMenuToggleVisibility() {
        if (mediaQuery.matches) {
            themeToggleBtn.style.display = 'none';
        } else {
            themeToggleBtn.style.display = 'flex';
        }
    }

    handleMenuToggleVisibility();
    mediaQuery.addEventListener('change', handleMenuToggleVisibility);
});
// JavaScript for filtering images in the portfolio
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filter-btn');
    const images = document.querySelectorAll('#Portfolio .col-lg-4');
    const zoomIcons = document.querySelectorAll('.zoom-icon');

    // Filtravimo logika
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            images.forEach(image => {
                image.classList.remove('active');
                image.classList.add('hidden');
                if (filter === 'all' || image.classList.contains(filter)) {
                    image.classList.remove('hidden');
                    setTimeout(() => image.classList.add('active'), 50);
                }
            });
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    // Priartinimo logika
    zoomIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const image = icon.closest('.col-lg-4').querySelector('img');
            image.classList.add('zoomed-in');
            image.classList.add('zoom-in-effect');
            document.body.style.overflow = 'hidden';
            const zoomOverlay = document.createElement('div');
            zoomOverlay.classList.add('zoom-overlay');
            zoomOverlay.addEventListener('click', () => {
                image.classList.remove('zoomed-in');
                image.classList.remove('zoom-in-effect');
                document.body.style.overflow = 'auto';
                zoomOverlay.remove();
            });
            zoomOverlay.appendChild(image.cloneNode(true));
            document.body.appendChild(zoomOverlay);
        });
    });
    // Nuotraukų animacija, kai jos atsiranda ekrane (IntersectionObserver)
    const portfolioSection = document.querySelector('#Portfolio');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                setTimeout(() => entry.target.classList.add('active'), 50);
            }
        });
    }, { threshold: 0.1 });
    images.forEach(image => {
        observer.observe(image);
    });
});
// Get the button:
let mybutton = document.getElementById("up");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
        // Funkcija laikrodžio atnaujinimui
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML = h + ":" + m + ":" + s;
}

// Funkcija, kuri prideda nulį prie valandų, minučių ar sekundžių, jei jos yra mažesnės nei 10
function checkTime(i) {
    if (i < 10) { i = "0" + i; } // pridėti nulį prieš skaičius < 10
    return i;
}

// Naudojame setInterval, kad atnaujintume laiką kas sekundę
setInterval(startTime, 1000);

// Range slider
function updateSlider(slider) {
    const value = slider.value;
    const max = slider.max;
    const min = slider.min;
    const percent = ((value - min) / (max - min)) * 100;

    slider.style.background = `linear-gradient(to right, orange ${percent}%, #d3d3d3 ${percent}%)`;

    const rangeValueId = slider.getAttribute("id").replace("question", "range-value-");
    const rangeValue = document.getElementById(rangeValueId);

    if (rangeValue) {
        rangeValue.textContent = value;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".range-slider");
    sliders.forEach(slider => {
        updateSlider(slider);
        slider.addEventListener("input", () => updateSlider(slider));
    });
});

