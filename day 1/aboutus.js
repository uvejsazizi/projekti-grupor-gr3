document.addEventListener("DOMContentLoaded", () => {
  const about = document.querySelector(".about-container");
  const header = document.querySelector("header");
  const title = document.querySelector("h1.h");

  about.style.opacity = "0";
  about.style.transform = "translateY(30px)";
  setTimeout(() => {
    about.style.transition = "all 1s ease";
    about.style.opacity = "1";
    about.style.transform = "translateY(0)";
  }, 300);

 title.onmouseover = () => (title.style.color = "orange");
  title.onmouseout = () => (title.style.color = "yellow");

  window.onscroll = () => {
    header.style.background = window.scrollY > 50 ? "rgba(0,0,0,0.7)" : "transparent";
    header.style.boxShadow = window.scrollY > 50 ? "0 4px 10px rgba(0,0,0,0.5)" : "none";
  };
});


  



