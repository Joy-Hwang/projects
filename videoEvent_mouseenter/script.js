(function () {
  AOS.init();

  //PC: 영역 mouseenter 시 동영상 재생, mouseleave 시 이미지로 돌아오기
  //MO: 영역 click 시 동영상 재생, 다음 영상 click 시 전 영상 이미지로 돌아오기
  const contentBoxes = document.querySelectorAll(".contents-box");
  const moViewport = 751;
  let playedVideo = false; //영상 재생되는 지 상태 확인
  let prevFocusElement = null;

  function showVideo(box, video) {
    video.setAttribute("tabindex", 0);
    video.focus();
    playedVideo = true;
    box.classList.add("is-active");
    video.play();

    // console.log("show");
  }

  function hideVideo(box, video) {
    if (playedVideo) {
      playedVideo = false;
      box.classList.remove("is-active");
      video.pause();
      video.setAttribute("tabindex", -1);
      prevFocusElement?.focus();
      // console.log("hide");
    }
  }

  function isMobile() {
    //모바일 환경인 지 상태 확인
    if (window.innerWidth < moViewport) {
      return true;
    } else {
      return false;
    }
  }

  contentBoxes.forEach(function (contentBox, index) {
    const giftVideo = contentBox.querySelector(".gift-video");
    const giftText = contentBox.querySelector(".gift-text");
    const playButton = contentBox.querySelector(".play-btn");
    const lastIndex = contentBoxes.length - 1;

    contentBox.addEventListener("click", function () {
      prevFocusElement = playButton;
      if (isMobile()) {
        if (index < lastIndex) {
          const nextBox = contentBoxes[index + 1];
          const nextVideo =
            contentBoxes[index + 1].querySelector(".gift-video");
          hideVideo(nextBox, nextVideo);
        } else {
          const nextBox = contentBoxes[0];
          const nextVideo = contentBoxes[0].querySelector(".gift-video");
          hideVideo(nextBox, nextVideo);
        }
        showVideo(contentBox, giftVideo);
      }
    });

    contentBox.addEventListener("mouseenter", function () {
      if (!isMobile()) {
        prevFocusElement = playButton;
        showVideo(contentBox, giftVideo);
      }
    });
    contentBox.addEventListener("mouseleave", function () {
      if (!isMobile()) {
        hideVideo(contentBox, giftVideo);
      }
    });

    //영상 끝나면 썸네일로 돌아오기
    giftVideo.onended = function () {
      hideVideo(contentBox, giftVideo);
    };

    // 키보드로 버튼 클릭 후 영상 재생
    playButton.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        prevFocusElement = playButton;
        showVideo(contentBox, giftVideo);
      } else {
        hideVideo(contentBox, giftVideo);
      }
    });
  });
})();
