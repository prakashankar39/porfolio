
const fadeElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
},{
  threshold:0.15
});

fadeElements.forEach(el=>{
  observer.observe(el);
});
