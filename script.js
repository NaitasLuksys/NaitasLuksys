document.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('div[id], section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';
    const windowHeight = window.innerHeight;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = rect.height;
        if (rect.top <= windowHeight / 6 && rect.top + sectionHeight >= windowHeight / 6) {
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

function checkTime(i) {
    if (i < 10) { i = "0" + i; }
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
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();

    const nameField = document.getElementById("name");
    const surnameField = document.getElementById("surname");

    // Surenkame duomenis iš formos laukų
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    clearErrors();
    // Tikriname, ar visi laukai užpildyti
    let allFieldsFilled = true;
    if (!name) {
        showError(nameField, "Šis laukas privalomas.");
        allFieldsFilled = false;
    }
    if (!surname) {
        showError(surnameField, "Šis laukas privalomas.");
        allFieldsFilled = false;
    }
    if (!allFieldsFilled) return;
    const questions = [];
    for (let i = 1; i <= 6; i++) {
        const value = parseInt(document.getElementById(`question${i}`).value, 10);
        questions.push(value);
    }
    // Validacija
    if (!validateEmail(email)) {
        alert("Netinkamas el. pašto adresas.");
        return;
    }
    if (!validatePhone(phone)) {
        alert("Netinkamas telefono numeris.");
        return;
    }
    if (address.length < 5) {
        alert("Adresas turi būti ne trumpesnis nei 5 simbolių.");
        return;
    }
    // Sukuriame objektą
    const formData = {
        name,
        surname,
        email,
        phone,
        address,
        questions,
    };
    // Išvedame objektą į konsolę
    console.log("Sukurtas objektas:", formData);

    // Apskaičiuojame klausimų vidurkį
    const averageScore = questions.reduce((sum, val) => sum + val, 0) / questions.length;

    // Parodome rezultatų div
    const resultContainer = document.getElementById("result");
    resultContainer.style.display = "block";

    resultContainer.innerHTML = `
        <p><strong>Vardas:</strong> ${formData.name}</p>
        <p><strong>Pavardė:</strong> ${formData.surname}</p>
        <p><strong>El. paštas:</strong> ${formData.email}</p>
        <p><strong>Telefonas:</strong> ${formData.phone}</p>
        <p><strong>Adresas:</strong> ${formData.address}</p>
        <p><strong>Klausimai:</strong> ${formData.questions.join(", ")}</p>
        <p style="color: ${getColor(averageScore)};"><strong>${formData.name} ${formData.surname} (${formData.email}):</strong> ${averageScore.toFixed(2)}</p>
    `;
});
// Pagalbinės funkcijos
function showError(input, message) {
    const error = document.createElement("span");
    error.className = "error-message";
    error.style.color = "orange";
    error.style.fontSize = "0.9em";
    error.style.fontFamily = "Georgia"
    error.textContent = message;
    input.parentElement.appendChild(error);
}
function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach(error => error.remove());
}
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validatePhone(phone) {
    const phoneRegex = /^\+?\d{7,15}$/;
    return phoneRegex.test(phone);
}
function getColor(score) {
    if (score < 4) return "red";
    if (score < 7) return "orange";
    return "green";
}

