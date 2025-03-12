document.addEventListener("DOMContentLoaded", function () {
  const tabNavItems = document.querySelectorAll(".tab-nav__item");
  const tabContentBoxes = document.querySelectorAll(".tab-content__box");

  if (tabNavItems.length === 0 || tabContentBoxes.length === 0) return; // 요소가 없으면 실행 중지

  tabNavItems.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      if (!tabId) return; // data-tab 속성이 없으면 중단

      // 모든 탭 버튼과 콘텐츠에서 active 제거
      tabNavItems.forEach((item) => item.classList.remove("active"));
      tabContentBoxes.forEach((box) => box.classList.remove("active"));

      // 클릭한 탭 버튼과 연결된 콘텐츠에서 active 추가
      this.classList.add("active");
      const activeContent = document.getElementById(tabId);
      if (activeContent) {
        activeContent.classList.add("active");
      }
    });
  });
});
