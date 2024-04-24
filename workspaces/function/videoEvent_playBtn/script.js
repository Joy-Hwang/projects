/* video 재생 */
const videoPlayer = function videoPlayer() {
  const isPlay = "is-play";
  const videos = document.querySelectorAll("[data-ap2022-video]");
  videos.forEach(function (container) {
    const playButton = container.querySelector(".video-btn");
    let video = container.querySelectorAll("video");
    playButton.addEventListener("click", function () {
      playButton.classList.add(isPlay);
      colletVideo(video);
    });
  });

  function colletVideo(video) {
    video.forEach(function (media) {
      const videoStyle = window.getComputedStyle(media);
      if (videoStyle.display === "block") {
        media.play();
      } else {
        media.pause();
      }
    });
  }

  function resizeFn() {
    videos.forEach(function (container) {
      let video = container.querySelectorAll("video");
      colletVideo(video);
    });
  }
  window.addEventListener("resize", resizeFn);
};
videoPlayer();
