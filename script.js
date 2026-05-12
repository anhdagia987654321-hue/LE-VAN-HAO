// JavaScript cho chuyển Dark/Light mode và hiệu ứng gõ chữ
const themeToggle = document.getElementById('themeToggle');
const bodyElement = document.body;
const typingTextEl = document.getElementById('typingText');
const phrases = ['Tôi là một UI/UX Designer', 'Tôi thích thiết kế tối giản', 'Tôi xây dựng trải nghiệm hiện đại'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const setTheme = (darkMode) => {
  if (darkMode) {
    bodyElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    bodyElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

const toggleTheme = () => {
  setTheme(!bodyElement.classList.contains('dark'));
};

themeToggle.addEventListener('click', toggleTheme);

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  setTheme(true);
}

const typeWriter = () => {
  const currentText = phrases[phraseIndex];
  if (isDeleting) {
    typingTextEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex -= 1;
  } else {
    typingTextEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex += 1;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeWriter, 1400);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeWriter, 300);
  } else {
    setTimeout(typeWriter, isDeleting ? 80 : 120);
  }
};

typeWriter();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.15,
  }
);

const fadeElements = document.querySelectorAll('.fade-up');
fadeElements.forEach((element) => observer.observe(element));
