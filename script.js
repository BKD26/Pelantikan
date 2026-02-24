const elements = document.querySelectorAll('.fade');

function showOnScroll(){
const triggerBottom = window.innerHeight * 0.85;

elements.forEach(el => {
const top = el.getBoundingClientRect().top;

if(top < triggerBottom){
el.classList.add('show');
}
});
}

window.addEventListener('scroll', showOnScroll);

showOnScroll();
