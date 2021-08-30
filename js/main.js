/* 헤더 돋보기 통합검색 */
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', "통합검색");
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', "");
});

/* 배지 */
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
//window는 우리가 보고 있는 화면을 의미
//_.throttle(함수, 시간)
window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    //배지 숨기기
    //gsap.to(요소, 지속시간, 옵션)
    /*opacity와 같이 숫자로 입력하는 속성들은 요소의 전/후 상태를 자연스럽게 만들어줄 수 있지만
      display와 같이 숫자 값이 아닌 속성은 전/후 상태의 중간값이 존재하지 않기 때문에 자연스러운 전환효과를 적용할 수 없다.
    */
    gsap.to(badgeEl, .3, {
      opacity: 0,
      display: 'none'
    });

    //to_top버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else {
    //배지 보여주기
    gsap.to(badgeEl, .3, {
      opacity: 1,
      display: 'block'
    });

    //to_top버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300));

toTopEl.addEventListener('click', function(){
  gsap.to(window, .7, {
    scrollTo : 0 //화면의 위치를 0의 위치로 옮겨준다(grsp에 scrollToPlugin cdn을 가져와야한다.)
  });
});

/* 요소 순차적으로 표시하기(애니메이션 효과) */
const fadeEls = document.querySelectorAll('.visual .fade-in');

fadeEls.forEach(function (fadeEl, index) {
  //gsap.to(요소, 지속시간, 옵션)
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //0.7, 1.4, 2.1, 2.8
    opacity: 1
  })
});

/* swiper */
// new Swiper('선택자', {옵션});
new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});

new Swiper('.promotion .swiper', {
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  // direction : 'horizontal',//기본값
  loop: true,
  // autoplay : {
  //   delay : 5000
  // }
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //사용자 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper', {
  // direction: 'horizontal' 기본값
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

/*프로모션 숨기기/보이기*/
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion;

  if (isHidePromotion) {
    //숨김 처리!
    promotionEl.classList.add('hide');
  } else {
    //보여줌 처리!
    promotionEl.classList.remove('hide');
  }
});

/* 유튜브 화면위 이미지 애니메이션 효과 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  //gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector,
    random(1.5, 2.5), 
  {
    y: size,
    repeat: -1, //무한반복
    yoyo: true, //위에서 아래로 내려오면 다시 위로 가게 함
    ease: Power1.easeInOut, //https://greensock.com/docs/v2/Easing 에서 가져옴
    delay : random(0, delay)
  });
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

/* scrollMagic */
//뷰포트 기준으로 0.8지점에서 scroll-spy가 있는 section에 show라는 클래스를 지정
const spyEls = document.querySelectorAll('section.scroll-spy');

spyEls.forEach(function(spyEl){
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook: .8        //뷰포트기준으로 제일위가 0, 제일 밑이 1이라고 햇을 때 0.8인부분에 위치했을 경우
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

/*오늘날짜 구하기 */
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();