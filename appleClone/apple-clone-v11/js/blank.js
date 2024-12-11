(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수 = 현재 스크롤 위치
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된(눈 앞에 보고 있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true

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
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }], // start-end: 애니메이션이 시작되는 구간 (1을 전체 비율로 두고 소수점 지정)
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
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
      type: "normal",
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
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scorllHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === 'normal') { 
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scorllHeight}px`;
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
    const scorllHeight = sceneInfo[currentScene].scorllHeight;
    const scrollRatio = currentYoffset / scorllHeight;

    //부분 스크롤 영역
    if (values.length === 3) {
      // stat ~ end 사이에 애니메이션 실행. 스크롤 끝나는 지점에서 시작하는 지점을 빼주면 스크롤 된 높이 알 수 있음
      const partScrollStart = values[2].start * scorllHeight;
      const partScrollEnd = values[2].end * scorllHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      //애니메이션이 실행되어야 할 스크롤 구간
      if (
        currentYoffset >= partScrollStart &&
        currentYoffset <= partScrollEnd
      ) {
        rv = ((currentYoffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) + values[0];
      } else if (currentYoffset < partScrollStart) {
        rv = values[0]; //초기값
      } else if (currentYoffset > partScrollEnd) {
        rv = values[1]; //최종값
      }
    }
    // 전체 스크롤 영역
    else {
      rv = scrollRatio * (values[1] - values[0]) + values[0]; // 1에서 0을 뺀 전체 범위에서 초기 값을 더해 시작 부분을 설정. -> 그 범위에 scrollRatio를 곱하면 스크롤된 범위 비율이 나옴!
    }
    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYoffset = yOffset - prevScrollHeight;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYoffset / scrollHeight;

    switch (currentScene) {
      case 0:
        const messageA_opacity_in = calcValues(values.messageA_opacity_in,currentYoffset);
        const messageA_opacity_out = calcValues(values.messageA_opacity_out,currentYoffset);
        const messageA_translateY_in = calcValues(values.messageA_translateY_in,currentYoffset);
        const messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYoffset);
        console.log(messageA_opacity_in)

        if (scrollRatio <= 0.22) {
          //in
          objs.messageA.style.opacity = messageA_opacity_in;
          objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
        } else {
          //out
          objs.messageA.style.opacity = messageA_opacity_out;
          objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
        }
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
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      // prevScrollHeight = prevScrollHeight + sceneInfo[i].scorllHeight;
      prevScrollHeight += sceneInfo[i].scorllHeight;
    }
    // 현재 스크롤 위치인 yOffset이 prevScrollHeight(기존 섹션의 높이) 와 현재 섹션의 높이 보다 커지면 다음 섹션으로 넘어간다. (섹션 번호 1씩 증가)
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scorllHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    // 현재 스크롤 위치인 yOffset이 prevScrollHeight(기존 섹션의 높이) 보다 작아지면 이전 섹션으로 넘어간다. (섹션 번호 1씩 감소)
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는  것을 방지(모바일)
      enterNewScene = true;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }
    if (enterNewScene) return; // scene이 바뀔 때는 playAnimation 함수를 중지한다.
    playAnimation();
  }

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener("load", setLayout); // load 대신 DOMContenloaded도 가능. 이미지 등의 컨텐츠가 나오기 전 DOM tree 구조만 나와도 로드됨. 더 빠름
  window.addEventListener("resize", setLayout);
})();
