const navLinkEls = document.querySelectorAll(".nav__link");
const sectionEls = document.querySelectorAll(".section");

let currentSection = "home";
window.addEventListener("scroll", () => {
  sectionEls.forEach((sectionEl) => {
    if (window.scrollY >= sectionEl.offsetTop - sectionEl.clientHeight / 3) {
      //섹션의 높이를 가져와서 전체의 3만큼의 높이에 도달했을 때
      currentSection = sectionEl.id;
    }
    // if (window.scrollY >= sectionEl.offsetTop - 200) {
    //   currentSection = sectionEl.id;
    // }
  });

  navLinkEls.forEach((navLinkEl) => {
    if (navLinkEl.href.includes(currentSection)) {
      document.querySelector(".active").classList.remove("active");
      navLinkEl.classList.add("active");
    }
  });
});
