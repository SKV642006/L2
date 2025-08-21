document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // --- Active Page Link Highlighting ---
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // --- Dynamic Content Loading ---
    const abilitiesContainer = document.getElementById('abilities-grid');
    const alliesContainer = document.getElementById('allies-grid');

    if (abilitiesContainer || alliesContainer) {
        fetch('js/data.json')
            .then(response => response.json())
            .then(data => {
                if (abilitiesContainer && data.abilities) {
                    populateAbilities(data.abilities);
                }
                if (alliesContainer && data.allies) {
                    populateAllies(data.allies);
                }
            })
            .catch(error => console.error('Error loading data:', error));
    }

    function populateAbilities(abilities) {
        abilitiesContainer.innerHTML = abilities.map(ability => `
            <div class="card ${ability.is_ultimate ? 'atomic' : ''}">
                <h3>${ability.name}</h3>
                <p>${ability.description}</p>
            </div>
        `).join('');
    }

    function populateAllies(allies) {
        alliesContainer.innerHTML = allies.map(ally => `
            <div class="card ally-card">
                <h3>${ally.name}</h3>
                <p class="ally-title">${ally.title}</p>
                <p>${ally.description}</p>
            </div>
        `).join('');
    }

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const responseEl = document.getElementById('form-response');
            responseEl.textContent = "Encrypting missive... Transmission successful. Shadow Garden has received your message.";
            contactForm.reset();
            setTimeout(() => {
                responseEl.textContent = "";
            }, 5000);
        });
    }

});
