"use strict";

/*! Bricks by Taufik Nurrohman <https://github.com/taufik-nurrohman> based on <https://gist.github.com/2208329> */
(function (w, d) {
  // find minimum value from array
  Array.prototype.min = function () {
    return Math.min.apply({}, this);
  }; // find maximum value from array


  Array.prototype.max = function () {
    return Math.max.apply({}, this);
  }; // wall, brick(s) margin, wall padding


  w.bricks = function (wall, gap, pad) {
    gap = gap || 0;
    pad = pad || 0;

    if (typeof wall === "string") {
      wall = d.getElementById(wall);
    }

    function class_a(el, c) {
      return el.classList.add(c);
    }

    function class_r(el, c) {
      return el.classList.remove(c);
    }

    function class_h(el, c) {
      return el.classList.contains(c);
    }

    var bricks = wall.children,
        c = bricks.length,
        wait = false,
        brick,
        c_h,
        c_c,
        c_t,
        i,
        j;
    if (!c) return;
    var width = bricks[0].offsetWidth + gap,
        o = wall.getAttribute('style') || "",
        x = d.createElement('div');
    class_a(wall, 'bricks');
    class_a(x, wall.className);
    wall.style.padding = 0;
    wall.style.position = 'relative';
    wall.setAttribute('data-style', o);
    x.style.margin = 0;
    x.style.padding = 0;
    x.style.border = 0;
    x.style.outline = 0;
    x.style.width = 'auto';
    x.style.height = 0;
    x.style.display = 'block';
    x.style.clear = 'both';
    x.style.visibility = 'hidden';

    function apply(first) {
      if (!first && !class_h(wall, 'bricks-ready')) return;
      wall.parentNode.insertBefore(x, wall.nextElementSibling || wall.nextSibling || null);
      c_h = [];
      c_c = Math.floor(x.offsetWidth / width);
      if (x.parentNode) x.parentNode.removeChild(x);

      for (i = 0; i < c_c; ++i) {
        c_h[i] = 0;
      }

      for (i = 0; i < c; ++i) {
        brick = bricks[i];

        if (first) {
          o = brick.getAttribute('style') || "";
          brick.setAttribute('data-style', o);
          brick.style.display = 'block';
          brick.style.position = 'absolute';
          brick.style.margin = 0;
        }

        for (j = c_c - 1; j > -1; --j) {
          if (c_h[j] === c_h.min()) {
            c_t = j;
          }
        }

        brick.style.top = c_h[c_t] + pad + 'px';
        brick.style.left = width * c_t + pad + 'px';
        c_h[c_t] += brick.offsetHeight + gap;
        class_a(brick, 'brick-ready');
      }

      wall.style.width = width * c_h.length - gap + pad * 2 + 'px';
      wall.style.height = c_h.max() - gap + pad * 2 + 'px';
      class_a(wall, 'bricks-ready');
    }

    apply(1);
    w.addEventListener("resize", function () {
      if (wait) w.clearTimeout(wait);
      wait = w.setTimeout(apply, 50);
    }, false);
  };
})(window, document); // apply ...


bricks('bricks', 32, 32); // parallax

function Parallax(options) {
  options = options || {};
  this.nameSpaces = {
    wrapper: options.wrapper || '.parallax',
    layers: options.layers || '.parallax-layer',
    deep: options.deep || 'data-parallax-deep'
  };

  this.init = function () {
    var self = this,
        parallaxWrappers = document.querySelectorAll(this.nameSpaces.wrapper);

    for (var i = 0; i < parallaxWrappers.length; i++) {
      (function (i) {
        parallaxWrappers[i].addEventListener('mousemove', function (e) {
          var x = e.clientX,
              y = e.clientY,
              layers = parallaxWrappers[i].querySelectorAll(self.nameSpaces.layers);

          for (var j = 0; j < layers.length; j++) {
            (function (j) {
              var deep = layers[j].getAttribute(self.nameSpaces.deep),
                  disallow = layers[j].getAttribute('data-parallax-disallow'),
                  itemX = disallow && disallow === 'x' ? 0 : x / deep,
                  itemY = disallow && disallow === 'y' ? 0 : y / deep;
              if (disallow && disallow === 'both') return;
              layers[j].style.transform = 'translateX(' + itemX + '%) translateY(' + itemY + '%)';
            })(j);
          }
        });
      })(i);
    }
  };

  this.init();
  return this;
}

window.addEventListener('load', function () {
  new Parallax();
}); // Parallax effect
// Adapted from @ilonacodes article ->  https://link.medium.com/7fFiON6Q1X
// Update : added throttle to increase performance

(function () {
  window.addEventListener('scroll', throttle(parallax, 14));

  function throttle(fn, wait) {
    var time = Date.now();
    return function () {
      if (time + wait - Date.now() < 0) {
        fn();
        time = Date.now();
      }
    };
  }

  ;

  function parallax() {
    var scrolled = window.pageYOffset;
    var parallax = document.querySelector(".parallax-bouquet"); // You can adjust the 0.4 to change the speed

    var coords = scrolled * 0.6 + 'px';
    parallax.style.transform = 'translateY(-' + coords + ')';
  }

  ;
})();

var showAllBtn = Array.from(document.querySelectorAll('.show-all-btn')),
    bricks = document.getElementById('bricks'),
    bricksHeight = bricks.scrollHeight;
showAllBtn.forEach(function (item) {
  item.addEventListener('click', function () {
    item.classList.add('hide');
    item.closest('.show-all').classList.add('hide');
    bricks.style.maxHeight = bricksHeight + 'px';
    bricks.classList.add('show');
    setTimeout(function () {
      bricks.classList.add('overflow');
    }, 1000);
  });
});
var burger = document.querySelector('.burger'),
    nav = document.querySelector('.header__cell--nav');
burger.addEventListener('click', function () {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
}); // map

var center = [48.8866527839977, 2.34310679732974];

function init() {
  var map = new ymaps.Map('map', {
    center: center,
    zoom: 17
  });
  var placemark = new ymaps.Placemark(center, {
    balloonContentHeader: 'Хедер балуна',
    balloonContentBody: 'Боди балуна',
    balloonContentFooter: 'Подвал'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/pin.svg',
    iconImageSize: [119, 140],
    iconImageOffset: [0, 0]
  });
  var placemark1 = new ymaps.Placemark(center, {
    balloonContent: "\n\n\t\t\t<div class=\"balloon\">\n                <span class=\"balloon__bg\"></span>\n\t\t\t\t<div class=\"balloon__address medium\">\u0423\u043B\u0438\u0446\u0430 \u041B\u0435\u043D\u0438\u043D\u0430, 5/4</div>\n\t\t\t\t<div class=\"balloon__contacts\">\n                    <div class=\"balloon__text light\">\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u043A\u0440\u0443\u0433\u043B\u043E\u0441\u0443\u0442\u043E\u0447\u043D\u043E</div>\n\t\t\t\t\t<a href=\"tel:+88007750775\" class=\"balloon__tel noto-serif-display bold\">8 800 775-07-75</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t"
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/pin.svg',
    iconImageSize: [119, 140],
    iconImageOffset: [15, -100]
  });
  map.controls.remove('geolocationControl'); // удаляем геолокацию

  map.controls.remove('searchControl'); // удаляем поиск

  map.controls.remove('trafficControl'); // удаляем контроль трафика

  map.controls.remove('typeSelector'); // удаляем тип

  map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим

  map.controls.remove('zoomControl'); // удаляем контрол зуммирования

  map.controls.remove('rulerControl'); // удаляем контрол правил

  map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
  // map.geoObjects.add(placemark);

  map.geoObjects.add(placemark1);
}

ymaps.ready(init);
"use strict";

console.log('maxgraph');
/**
  * название функции
  *
  * @param {number} first - первое число
  * @returns {number}
  */
"use strict";
//# sourceMappingURL=main.js.map
