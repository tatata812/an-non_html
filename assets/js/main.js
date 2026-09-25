$(function () {

 /* =================================
  ヘッダー
================================= */

var $header = $('.header');
var $menu = $('.header__menu');
var $nav = $('.header__nav');


/* -------------------------------
  メニュー開閉
-------------------------------- */

$menu.on('click', function () {
  var isOpen = $(this).toggleClass('is-open').hasClass('is-open');

  if (isOpen) {

    /* -------------------------------
      ヘッダーの位置によって
      メニュー表示位置を変更
    -------------------------------- */

    if ($header.hasClass('is-fixed')) {
      $nav.addClass('is-header-top');
    } else {
      $nav.removeClass('is-header-top');
    }

    $nav.addClass('is-open');
    $('body').addClass('is-menu-open');

  } else {

    $nav.removeClass('is-open is-header-top');
    $('body').removeClass('is-menu-open');

  }

  $(this).attr({
    'aria-expanded': isOpen,
    'aria-label': isOpen ? 'メニューを閉じる' : 'メニューを開く'
  });
});


/* -------------------------------
  ナビクリック時にメニューを閉じる
-------------------------------- */

$nav.find('a').on('click', function () {

  $menu
    .removeClass('is-open')
    .attr({
      'aria-expanded': 'false',
      'aria-label': 'メニューを開く'
    });

  $nav.removeClass('is-open is-header-top');

  $('body').removeClass('is-menu-open');

});


/* -------------------------------
  SP ヘッダー追従
-------------------------------- */

function updateSpHeader() {

  if (!$header.length) {
    return;
  }


  /* -------------------------------
    SP以外
  -------------------------------- */

  if ($(window).width() > 767) {

    $header
      .removeClass('is-fixed')
      .css('top', '');

    $nav.removeClass('is-header-top');

    return;
  }


  /* -------------------------------
    各サイズ
  -------------------------------- */

  var headerHeight = 66;
  var ctaHeight = 66;

  var startTop =
    window.innerHeight -
    headerHeight -
    ctaHeight;

  var scrollTop = $(window).scrollTop();


  /* -------------------------------
    上端に到達するまで
  -------------------------------- */

  if (scrollTop < startTop) {

    var currentTop =
      startTop -
      scrollTop;

    $header
      .removeClass('is-fixed')
      .css('top', currentTop + 'px');


    /*
      メニューを開いたままの場合も
      下側ヘッダー用の配置に戻す
    */

    if ($nav.hasClass('is-open')) {
      $nav.removeClass('is-header-top');
    }

  }


  /* -------------------------------
    上端到達後
  -------------------------------- */

  else {

    $header
      .addClass('is-fixed')
      .css('top', '0');


    /*
      メニューを開いたまま
      ヘッダーが上まで来た場合
    */

    if ($nav.hasClass('is-open')) {
      $nav.addClass('is-header-top');
    }

  }
}


/* -------------------------------
  初期実行
-------------------------------- */

updateSpHeader();


/* -------------------------------
  スクロール・リサイズ
-------------------------------- */

$(window).on('scroll resize', function () {
  updateSpHeader();
});

  /* =================================
    ページ内リンク　ヘッダーの高さ考慮
  ================================= */

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
    }, typeof speed === 'number' ? speed : 400);
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

  $(window).on('scroll', function () {
    var windowHeight = $(window).height();
    var scroll = $(window).scrollTop();

    $('.fade-in-js').each(function () {
      var targetPosition = $(this).offset().top;

      if (scroll > targetPosition - windowHeight + 100) {
        $(this).addClass('action');
      }
    });
  });

});


/* =================================
  GSAP
================================= */

gsap.registerPlugin(ScrollTrigger);


/* =================================
  メインビジュアル
================================= */

const mvTl = gsap.timeline({
  defaults: {
    ease: 'power2.out'
  }
});

// パネル
mvTl.from('.top-mv__panel', {
  y: 30,
  opacity: 0,
  duration: .8
});

// エリア・葬祭式場テキスト
mvTl.from('.top-mv__area', {
  y: 15,
  opacity: 0,
  duration: .6
}, '-=.4');

// メイン見出し
mvTl.from('.top-mv__title', {
  y: 20,
  opacity: 0,
  duration: .7
}, '-=.4');

// プラン名
mvTl.from('.top-mv__plan-title', {
  y: 20,
  opacity: 0,
  duration: .6
}, '-=.35');

// 料金
mvTl.from('.top-mv__price', {
  y: 15,
  opacity: 0,
  duration: .6
}, '-=.4');

// 人物
mvTl.from('.top-mv__person', {
  x: 40,
  opacity: 0,
  duration: .9
}, '-=.7');


/* =================================
  下層セクション
================================= */

// この下にScrollTriggerを使った
// 各セクションのアニメーションを追加