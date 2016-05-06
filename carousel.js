(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object'  && module.exports) {
       module.exports = factory();
    } else {
        factory();
    }
})(function() {
   var sum = document.querySelectorAll('.carousel-item').length;
    var MOVE = 700;
    var distance = sum * MOVE;

    var navs = document.querySelectorAll('.carousel-nav li');

    // 像素值转为整数
    function pixelToInt(str) {
        return parseInt(str.slice(0, -2));
    }

    // 更新 left 属性值
    function updateLeft(left) {
        left = (left - MOVE) % distance;
        return left;
    }

    // CSS 对象转换为字符串
    function objToString(obj) {
        var str = '';
        for(var key in obj) {
            str += key + ':' + obj[key] + ';'
        }
        return str;
    }

    // 更新 carousel 的 css
    function updateWrapCss(wrap, left) {
        var css = {
            position: 'absolute',
            top: 0,
            left: updateLeft(left) + 'px',
            transition: '1s',
            overflow: 'hidden'
        }
        wrap.style = objToString(css);
    }

    // 让 carousel-wrap 左滑
    function slideToLeft() {
        var wrap,
        left;
        
        wrap = document.querySelector('.carousel-wrap');
        
        left = window.getComputedStyle(wrap, null).getPropertyValue('left');
        left = pixelToInt(left);
        
        updateWrapCss(wrap, left)
    }

    // 激活nav
    function activeNav() {
        var len = navs.length;
        var next;
        for(var i=0; i<len; i++) {
            if (navs[i].className.indexOf('selected') !== -1) {
                next = (i + 1) % len;
                navs[i].className = navs[i].className.replace('selected', '');
            }
        }
        navs[next].className += navs[next].className + ' ' + 'selected';
    }

    // 计时循环左滑
    function cycle() {
        slideToLeft();
        activeNav();
        
        setTimeout(cycle, 5000);
    }

    // carousel 函数
    function carousel() { 
        navs[0].className += navs[0].className + ' ' + 'selected';

        setTimeout(cycle, 5000);
    }
    carousel(); 
});