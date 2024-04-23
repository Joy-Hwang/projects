(function () {
  const imageHost = `https://web-resource.gentlemonster.com/assets/stories/whitesun/img/pc/portrait/`;
  const glitchContainers = document.querySelectorAll(".glitch");

  // random images
  function getRandomNumber() {
    let randomIndexArray = [];
    for (let i = 0; i < 26; i++) {
      let randomNum = Math.floor(Math.random() * 26 + 1);
      if (randomIndexArray.indexOf(randomNum) === -1) {
        randomIndexArray.push(randomNum);
      } else {
        i--;
      }
    }
    return randomIndexArray;
  }
  const num = getRandomNumber();

  glitchContainers.forEach((container, containerIndex) => {
    const glitchImages = container.querySelectorAll(".glitch__img");
    const firstImageIndex = num[containerIndex] - 1;

    glitchImages.forEach((glitchImg, imgIndex) => {
      const imageUrl = imageHost + firstImageIndex + ".jpg";
      glitchImg.style.setProperty("--image", `url(${imageUrl})`);
    });
  });
})();
