(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수 = 현재 스크롤 위치
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된(눈 앞에 보고 있는) 씬(scroll-section)

  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scorllHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity: [0, 1],
      },
    },
    {
      // 1
      type: "normal",
      heightNum: 5,
      scorllHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      // 2
      type: "sticky",
      heightNum: 5,
      scorllHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      // 3
      type: "sticky",
      heightNum: 5,
      scorllHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scorllHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scorllHeight}px`;
    }
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scorllHeight;

      //총 스크롤 높이가 현재 스크롤 위치의 높이보다 크거나 같을 때 반복문 종료, 현재 섹션을 currentScene으로 한다. (그래야 새로고침해도 현재 섹션에서 다시 동작함)
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }

  function calcValues(values, currentYoffset) {
    let rv;

    // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    let scrollRatio = currentYoffset / sceneInfo[currentScene].scorllHeight;
    rv = scrollRatio * (values[1] - values[0]) + values[0]; // 1에서 0을 뺀 전체 범위에서 초기 값을 더해 시작 부분을 설정. -> 그 범위에 scrollRatio를 곱하면 스크롤된 범위 비율이 나옴!
    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYoffset = yOffset - prevScrollHeight;
    switch (currentScene) {
      case 0:
        let messageA_opacity_in = calcValues(
          values.messageA_opacity,
          currentYoffset
        );
        objs.messageA.style.opacity = messageA_opacity_in;
        break;

      case 1:
        break;

      case 2:
        break;

      case 3:
        break;
    }
  }
  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      // prevScrollHeight = prevScrollHeight + sceneInfo[i].scorllHeight;
      prevScrollHeight += sceneInfo[i].scorllHeight;
    }
    // 현재 스크롤 위치인 yOffset이 prevScrollHeight(기존 섹션의 높이) 와 현재 섹션의 높이 보다 커지면 다음 섹션으로 넘어간다. (섹션 번호 1씩 증가)
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scorllHeight) {
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    // 현재 스크롤 위치인 yOffset이 prevScrollHeight(기존 섹션의 높이) 보다 작아지면 이전 섹션으로 넘어간다. (섹션 번호 1씩 감소)
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는  것을 방지(모바일)
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }
    playAnimation();
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener("load", setLayout); // load 대신 DOMContenloaded도 가능. 이미지 등의 컨텐츠가 나오기 전 DOM tree 구조만 나와도 로드됨. 더 빠름
  window.addEventListener("resize", setLayout);
})();
