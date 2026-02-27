// ===== STICKY HEADER SHADOW =====
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  }
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.createElement('button');
navToggle.innerHTML = '☰';
navToggle.style.cssText = `
  display: none;
  background: transparent;
  border: 2px solid white;
  color: white;
  font-size: 1.5rem;
  padding: 5px 12px;
  border-radius: 8px;
  cursor: pointer;
`;

const nav = document.querySelector('nav');
const headerInner = document.querySelector('.header-inner');
headerInner.insertBefore(navToggle, nav);

if (window.innerWidth <= 768) {
  navToggle.style.display = 'block';
  nav.style.display = 'none';
}

navToggle.addEventListener('click', () => {
  if (nav.style.display === 'none') {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.width = '100%';
    nav.style.textAlign = 'center';
  } else {
    nav.style.display = 'none';
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'row';
    navToggle.style.display = 'none';
  } else {
    navToggle.style.display = 'block';
    nav.style.display = 'none';
  }
});

// ===== 1. FADE IN SECTIONS ON SCROLL =====
const fadeElements = document.querySelectorAll('section');
fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== 2. TYPING EFFECT ON HOMEPAGE HEADING =====
const heroHeading = document.querySelector('.hero-text h2');
if (heroHeading) {
  const text = heroHeading.textContent;
  heroHeading.textContent = '';
  heroHeading.style.borderRight = '3px solid #c0392b';
  let i = 0;
  const typeInterval = setInterval(() => {
    heroHeading.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(typeInterval);
      setTimeout(() => {
        heroHeading.style.borderRight = 'none';
      }, 500);
    }
  }, 60);
}

// ===== 3. COUNTER ANIMATION =====
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

// Add counters section to homepage if why-us section exists
const whyUs = document.querySelector('.why-us');
if (whyUs) {
  const countersHTML = `
    <div class="counters-section">
      <div class="counter-item">
        <h3 class="counter" data-target="7">0</h3>
        <p>Years Experience</p>
      </div>
      <div class="counter-item">
        <h3 class="counter" data-target="1000">0</h3>
        <p>Happy Patients</p>
      </div>
      <div class="counter-item">
        <h3 class="counter" data-target="12">0</h3>
        <p>Conditions Treated</p>
      </div>
      <div class="counter-item">
        <h3 class="counter" data-target="200">0</h3>
        <p>Consultation Fee ₹</p>
      </div>
    </div>
  `;
  whyUs.insertAdjacentHTML('afterend', countersHTML);

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          animateCounter(counter, target);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const countersSection = document.querySelector('.counters-section');
  if (countersSection) counterObserver.observe(countersSection);
}

// ===== 4. SMOOTH PAGE TRANSITIONS =====
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

document.querySelectorAll('a').forEach(link => {
  if (link.href && link.href.includes('.html') &&
      !link.href.includes('wa.me') &&
      !link.href.includes('tel:') &&
      !link.href.includes('mailto:')) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.href;
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  }
});

// ===== FLOATING WHATSAPP BUTTON =====
const waButton = document.createElement('a');
waButton.href = 'https://wa.me/918887222470';
waButton.target = '_blank';
waButton.innerHTML = '💬';
waButton.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #25D366;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 5px 20px rgba(37,211,102,0.4);
  z-index: 9999;
  transition: transform 0.3s ease;
  text-decoration: none;
`;

waButton.addEventListener('mouseover', () => {
  waButton.style.transform = 'scale(1.1)';
});

waButton.addEventListener('mouseout', () => {
  waButton.style.transform = 'scale(1)';
});

document.body.appendChild(waButton);
