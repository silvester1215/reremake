const container = document.querySelector('.guide-container');
if (container) {
  container.innerHTML += container.innerHTML;

  let scrollLeft = container.scrollLeft;
  let isUserScrolling = false;
  let isDraggingScrollbar = true;
  let userScrollTimeout;


  // scroll 也暫停
  container.addEventListener('scroll', () => {
    if (!isDraggingScrollbar) {
      pauseAutoScrollWithDelay();
    }
  });

  // 拖曳橫向拉桿
  container.addEventListener('mousedown', (e) => {
    if (e.offsetY > container.clientHeight) {
      isDraggingScrollbar = true;
      isUserScrolling = true;
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDraggingScrollbar) {
      isDraggingScrollbar = true;
      scrollLeft = container.scrollLeft; // ✅ 重新取得目前位置
      isUserScrolling = false; // 立即恢復
    }
  });

  function pauseAutoScrollWithDelay() {
    isUserScrolling = true;
    clearTimeout(userScrollTimeout);
    userScrollTimeout = setTimeout(() => {
      isUserScrolling = false;
    }, 1000);
  }

  function autoScroll() {
    if (isUserScrolling) return;
    scrollLeft += 1;
    container.scrollLeft = scrollLeft;
    if (scrollLeft >= container.scrollWidth / 2) {
      scrollLeft = container.scrollLeft-(container.scrollWidth / 2) ;
    }
  }

  setInterval(autoScroll, 30);
}
