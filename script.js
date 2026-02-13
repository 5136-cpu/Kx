const navLinks = document.querySelectorAll('.main-nav a');
const modelItems = document.querySelectorAll('.model-item');
const activeModelLabel = document.getElementById('activeModel');
const modelNotice = document.getElementById('modelNotice');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatLog = document.getElementById('chatLog');

let activeModel = 'KaliGPT v6 Fast';

for (const link of navLinks) {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href?.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

for (const item of modelItems) {
  item.addEventListener('click', () => {
    const locked = item.dataset.locked === 'true';
    const model = item.dataset.model;

    if (locked) {
      modelNotice.textContent = `${model} ยังไม่เปิดใช้งานในแพ็กเกจนี้`;
      modelNotice.style.color = '#ff8b8b';
      return;
    }

    modelItems.forEach((element) => element.classList.remove('active'));
    item.classList.add('active');
    activeModel = model ?? activeModel;
    activeModelLabel.textContent = activeModel;
    modelNotice.textContent = 'พร้อมใช้งาน';
    modelNotice.style.color = '#8cf0b8';
  });
}

chatForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = chatInput?.value.trim();
  if (!value) return;

  addBubble(value, 'user');
  chatInput.value = '';

  setTimeout(() => {
    const reply = `(${activeModel}) รับคำสั่งแล้ว: "${value}" — นี่คือตัวอย่างการตอบกลับเพื่อเดโมระบบใช้งานจริง`;
    addBubble(reply, 'ai');
  }, 350);
});

function addBubble(message, role) {
  const element = document.createElement('div');
  element.className = `bubble bubble--${role}`;
  element.textContent = message;
  chatLog?.appendChild(element);
  chatLog?.scrollTo({ top: chatLog.scrollHeight, behavior: 'smooth' });
}
