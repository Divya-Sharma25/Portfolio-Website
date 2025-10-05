// Canvas setup for starfield and moon
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

const moon = {
  x: 0,
  y: 0,
  radius: 50,
};

let stars = [];
const numStars = 100;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  moon.x = canvas.width * 0.8;
  moon.y = canvas.height * 0.15;

  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: randomRange(0, canvas.width),
      y: randomRange(0, canvas.height),
      size: randomRange(0.5, 1.5),
      speed: randomRange(0.05, 0.5),
    });
  }
}

function updateStars() {
  for (const star of stars) {
    star.y -= star.speed;
    if (star.y < 0) {
      star.x = randomRange(0, canvas.width);
      star.y = canvas.height;
      star.size = randomRange(0.5, 1.5);
      star.speed = randomRange(0.05, 0.5);
    }
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stars
  ctx.fillStyle = 'white';
  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawMoon() {
  const gradient = ctx.createRadialGradient(moon.x, moon.y, moon.radius * 0.3, moon.x, moon.y, moon.radius);
  gradient.addColorStop(0, '#f0eecd');
  gradient.addColorStop(1, '#a69f8e');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(moon.x, moon.y, moon.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(moon.x + moon.radius * 0.5, moon.y, moon.radius * 0.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

function animateStarfield() {
  updateStars();
  drawStars();
  drawMoon();
  requestAnimationFrame(animateStarfield);
}

window.addEventListener('resize', initStars);
initStars();
animateStarfield();


// Smooth scroll for header nav
document.querySelectorAll('.nav-left a, .contact-me-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// Chatbot logic
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotBox = document.getElementById('chatbot-box');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');

chatbotIcon.addEventListener('click', () => {
  chatbotBox.style.display = chatbotBox.style.display === 'flex' ? 'none' : 'flex';
  if (chatbotMessages.childElementCount === 0) {
    setTimeout(() => {
      addChatbotMessage('bot',
        "Hi! 👋 I'm Divya's Bot.\n" +
        "Ask me things like:\n" +
        "- Who is Divya Sharma?\n" +
        "- What are your skills?\n" +
        "- Show me your projects.\n" +
        "- How can I contact you?\n" +
        "- Or just say hello!"
      );
    }, 290);
  }
});

chatbotInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && chatbotInput.value.trim()) {
    const userMsg = chatbotInput.value.trim();
    addChatbotMessage('user', userMsg);
    respondToChat(userMsg.toLowerCase());
    chatbotInput.value = '';
  }
});

function addChatbotMessage(sender, text) {
  const mDiv = document.createElement('div');
  mDiv.className = 'msg-' + sender;
  mDiv.textContent = text;
  chatbotMessages.appendChild(mDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function respondToChat(msg) {
  let res = "I'm here to help! Ask about skills, projects, or internships!";
  if (/hello|hi|hey|namaste/.test(msg)) res = "Hello! 😊 How can I help you today?";
  else if (msg.includes("who is")) res = "Divya Sharma is a B.Tech (AI & DS) student at KUK (PIET), passionate about data!";
  else if (msg.includes("skills")) res = "Key skills:\nPython, SQL, Machine Learning, Pandas, NumPy, Excel, Tableau, Data Analysis, HTML, CSS, JavaScript, Cloud basics.";
  else if (msg.includes("project")) res = "Some projects:\n- EV Charging/Demand Prediction\n- Smart Tourist Safety System\n- Forecasting EV Adoption\n- This digital portfolio";
  else if (msg.includes("internship")) res = "Internships:\n- Infosys Springboard\n- Edunet-Shell AICTE\n- Pragati Cohort 5\nPlus many certifications!";
  else if (msg.includes("certificat")) res = "Certifications:\nIBM Data Analyst, Infosys Springboard Analytics/Cloud, Udemy SQL/Tableau.";
  else if (msg.includes("contact")) res = "Contact Divya via LinkedIn, GitHub, or Email (see buttons in the contact section below 👇)";
  else if (msg.includes("hobby") || msg.includes("hobbies")) res = "Hobbies: Hackathons, creative coding, web design, data storytelling, and building digital projects!";
  else if (msg.includes("university") || msg.includes("college")) res = "Kurukshetra University (Panipat Institute of Engineering and Technology)";
  else if (msg.includes("ml") || msg.includes("machine learning")) res = "Divya's focus is on machine learning, data science, and turning data into stories!";
  addChatbotMessage('bot', res);
}


// Auto-scroll for internships-slider
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.internships-slider');
  if (!slider) return;

  let scrollSpeed = 0.7; // pixels per frame, adjust speed as needed
  let isPaused = false;

  function step() {
    if (!isPaused) {
      slider.scrollLeft += scrollSpeed;

      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        // Loop back to start smoothly by resetting scrollLeft to 0
        slider.scrollLeft = 0;
      }
    }
    requestAnimationFrame(step);
  }

  // Pause scrolling on mouse enter
  slider.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  // Resume scrolling on mouse leave
  slider.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  // Start animation loop
  step();
});

// Intersection observer for project card animations
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.project-card-split');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('shown');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.19 });
  cards.forEach(card => observer.observe(card));
});

// Contact form submit handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();
    if(!name || !email || !message) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    alert(`Thank you, ${name}! Your message has been received.`);
    contactForm.reset();
  });
});
