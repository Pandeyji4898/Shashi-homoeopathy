// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

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

// Show toggle button on mobile
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

// ===== SERVICE CARDS ANIMATION =====
// ===== SERVICE CARDS ANIMATION =====
const cards = document.querySelectorAll('.service-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.6s ease';
  observer.observe(card);
});

// Fallback — show cards after 1 second if observer fails
setTimeout(() => {
  cards.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });
}, 1000);

});
