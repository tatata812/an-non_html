$(function () {

  /* =================================
  ヘッダー
   ================================= */
  $(function () {
    const $btn = $('.site-header__menu-btn');
    const $menu = $('.sp-menu');
    const $overlay = $('.sp-menu__overlay');
    const $body = $('body');

    function openMenu() {
      $btn.addClass('is-open').attr('aria-expanded', 'true');
      $menu.addClass('is-open').attr('aria-hidden', 'false');
      $overlay.addClass('is-open').attr('aria-hidden', 'false');
      $body.addClass('is-sp-menu-open');
    }

    function closeMenu() {
      $btn.removeClass('is-open').attr('aria-expanded', 'false');
      $menu.removeClass('is-open').attr('aria-hidden', 'true');
      $overlay.removeClass('is-open').attr('aria-hidden', 'true');
      $body.removeClass('is-sp-menu-open');
    }

    // ハンバーガーでトグル
    $btn.on('click', function () {
      if ($menu.hasClass('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // オーバーレイで閉じる
    $overlay.on('click', function () {
      closeMenu();
    });

    // メニュー内リンクを押したら閉じる
    $menu.on('click', 'a', function () {
      closeMenu();
    });

    // Escで閉じる
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape' && $menu.hasClass('is-open')) {
        closeMenu();
      }
    });
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