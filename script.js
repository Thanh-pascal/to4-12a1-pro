// script.js

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    if(!id) return;
    const el = document.querySelector(id);
    if(!el) return;
    el.scrollIntoView({behavior:'smooth', block:'start'});
    history.replaceState(null, '', id);
  });
});

// Reveal on scroll
const obs = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      en.target.classList.add('show');
      obs.unobserve(en.target);
    }
  });
},{threshold:0.16});
document.querySelectorAll('.fade, .member, .media, .videos, .card').forEach(el=>obs.observe(el));

// Active menu highlight while scrolling
const sections = Array.from(document.querySelectorAll('main section[id]'));
const menuLinks = Array.from(document.querySelectorAll('.top-menu a'));

const sectionObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.id;
      menuLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  });
},{threshold: 0.35});

sections.forEach(s => sectionObserver.observe(s));

// Subtle hero parallax (desktop)
(function(){
  const hero = document.querySelector('.hero');
  if(!hero) return;
  window.addEventListener('scroll', ()=>{
    if(window.innerWidth < 700) return;
    const y = window.scrollY;
    hero.style.backgroundPosition = `center ${25 + y * 0.035}%`;
  });
})();

// Member modal (click member to open)
const modal = document.getElementById('memberModal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalRole = document.getElementById('modalRole');
const modalBio = document.getElementById('modalBio');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.member').forEach(member=>{
  member.addEventListener('click', ()=>{
    const img = member.querySelector('img').getAttribute('src');
    const name = member.querySelector('h4').innerText;
    const role = member.querySelector('p').innerText;
    const bio = member.dataset.bio || '';
    modalImg.src = img;
    modalName.textContent = name;
    modalRole.textContent = role;
    modalBio.textContent = bio;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  });
});

if(modalClose){
  modalClose.addEventListener('click', closeModal);
}
if(modal){
  modal.addEventListener('click', e=>{
    if(e.target === modal) closeModal();
  });
}
function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
}
