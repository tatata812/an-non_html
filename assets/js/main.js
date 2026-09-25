$(function () {

  /* =================================
  ヘッダー
   ================================= */
$('.header__menu').on('click', function () {
  const isOpen = $(this).toggleClass('is-open').hasClass('is-open');

  $('.header__nav').toggleClass('is-open', isOpen);
  $('body').toggleClass('is-menu-open', isOpen);

  $(this).attr({
    'aria-expanded': isOpen,
    'aria-label': isOpen ? 'メニューを閉じる' : 'メニューを開く'
  });
});

$('.header__nav a').on('click', function () {
  $('.header__menu').removeClass('is-open').attr({
    'aria-expanded': 'false',
    'aria-label': 'メニューを開く'
  });

  $('.header__nav').removeClass('is-open');
  $('body').removeClass('is-menu-open');
});

  /* =================================
  ページ内リンク　ヘッダーの高さ考慮
 ================================= */
  var $header = $('.header');

  function getHeaderH() {
    if (!$header.length) return 0;
    return $header.outerHeight() || 0;
  }

  function scrollToHash(hash, speed) {
    if (!hash || hash === '#') return;

    var $target = $(hash);
    if (!$target.length) return;

    var targetTop = $target.offset().top - getHeaderH();

    $('html, body').stop().animate({
        scrollTop: targetTop
      },
      typeof speed === 'number' ? speed : 400
    );
  }

  $(document).on('click', 'a[href^="#"]', function (e) {
    var href = $(this).attr('href');
    if (!href || href === '#') return;
    if (!$(href).length) return;

    e.preventDefault();

    if (history.pushState) {
      history.pushState(null, null, href);
    } else {
      location.hash = href;
    }

    scrollToHash(href, 400);
  });

  $(window).on('load', function () {
    if (location.hash) {
      scrollToHash(location.hash, 0);
    }
  });


  /* =================================
  アニメーション　フェードイン
 ================================= */
  $(window).scroll(function () {
    const windowHeight = $(window).height(); //ウィンドウの高さ
    const scroll = $(window).scrollTop(); //スクロール量

    $(".fade-in-js").each(function () {
      const targetPosition = $(this).offset().top; //要素の上からの距離
      if (scroll > targetPosition - windowHeight + 100) {
        $(this).addClass("action");
      }
    });
  });


})

/* =================================
  GSAP
================================= */

gsap.registerPlugin(ScrollTrigger);


/* =================================
  メインビジュアル
================================= */

const mvTl = gsap.timeline({
  defaults: {
    ease: "power2.out"
  }
});

// パネル
mvTl.from(".top-mv__panel", {
  y: 30,
  opacity: 0,
  duration: .8
});

// エリア・葬祭式場テキスト
mvTl.from(".top-mv__area", {
  y: 15,
  opacity: 0,
  duration: .6
}, "-=.4");

// メイン見出し
mvTl.from(".top-mv__title", {
  y: 20,
  opacity: 0,
  duration: .7
}, "-=.4");

// プラン名
mvTl.from(".top-mv__plan-title", {
  y: 20,
  opacity: 0,
  duration: .6
}, "-=.35");

// 料金
mvTl.from(".top-mv__price", {
  y: 15,
  opacity: 0,
  duration: .6
}, "-=.4");

// 人物
mvTl.from(".top-mv__person", {
  x: 40,
  opacity: 0,
  duration: .9
}, "-=.7");


/* =================================
  下層セクション
================================= */

// この下にScrollTriggerを使った
// 各セクションのアニメーションを追加
