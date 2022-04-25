function init() {
    if(!IsPC()) {
        window_w = $(window).width();
        console.log(window.innerWidth);
        if (window_w >= 768) {
            $('#main').addClass('pc').removeClass('mb');
            resize(0, 1200, window_w);
        }else {
            $('#main').addClass('mb').removeClass('pc');
            resize(0, 640, window_w);
        }
        console.log('false: '+IsPC());
        console.log('false: '+ window_w);
        JPlaceHolder.init();
    }else {
        window_w = window.screen.width;
        console.log('true: '+ window_w);
        $('#main').addClass('mb').removeClass('pc');
        resize(0, 640, window_w);
    }
}

function showThirdNav() {
    var thirdOn = $('.third-nav-on');
    if(thirdOn.attr('data-click') === '0') {
        $('.third-nav ul').stop().slideDown('slow');
        thirdOn.attr('data-click', 1);
    }else {
        $('.third-nav ul').stop().slideUp('slow');
        thirdOn.attr('data-click', 0);
    }
}
// 产品详情
function proD() {
    var index = $('.proD-on').index();
    $('.proD-text').eq(index).show();
    var num = $('.proD-text').length;

    $(document).on('click', '.proD-list li', function() {
        index = $(this).index();
        for(var i=0; i<num; i++) {
            $('.proD-list li').eq(i).removeClass('proD-on');
            $('.proD-text').eq(i).hide();
        }
        $('.proD-text').eq(index).show();
        $(this).addClass('proD-on');
    });
}
// 首页 新闻
function news() {
    var w = $('.i-news-list li').eq(0).width();
    var num = $('.i-news-list li').length;
    $('.i-news-list').css({'width': (w * num + 10) + 'px'});
    var index = 0;
    $(document).on('click', '.i-news-prev', function() {
        left = parseInt($('.i-news-list').css('left'));
        if(left !== 0) {
            index = (--index < 0)?0:index;
            $('.i-news-list').stop().animate({'left': -(index * w) + 'px'}, 300);
        }
    });
    $(document).on('click', '.i-news-next', function() {
        if(num > 1) {
            index = (++index > (num-1))?(num - 1):index;
            $('.i-news-list').stop().animate({'left': -(index * w) + 'px'}, 300);
        }
    });
}
// 首页 产品中心
function iPro() {
    var index = 0;
    $('.i-pro-box').eq(0).stop().show();
    var num = $('.i-pro-list .i-pro-box').length;
    for(var i=0; i<num; i++) {
        $('.pro-dot').append('<span>'+(i+1)+'</span>');
    }
    $('.i-pro-list').css({'width': +'px'});
    $('.pro-dot span').eq(0).addClass('dot-on');

    $('.pro-dot').on('click', 'span', function() {
        clearInterval(int);
        index = $(this).index();
        for(var i=0; i<num; i++) {
            $('.i-pro-box').eq(i).stop().hide();
            $('.pro-dot span').eq(i).removeClass('dot-on');
        }
        $('.i-pro-box').eq(index).stop().show();
        $(this).addClass('dot-on');
        autoPlay();
    });
    var int;
    autoPlay();
    function autoPlay() {
        int = setInterval(function () {
            index = (++index > (num-1))?0:index;
            for(var i=0; i<num; i++) {
                $('.i-pro-box').eq(i).stop().hide();
                $('.pro-dot span').eq(i).removeClass('dot-on');
            }
            $('.i-pro-box').eq(index).stop().show();
            $('.pro-dot span').eq(index).addClass('dot-on');
        }, 3000);
    }
}
// 手机模式导航下拉
var menu_show = 0;
function mbNav() {
    if(menu_show === 0) {
        $('.menu-btn').addClass('menu-on');
        $('.menu-box').slideDown(0);
        menu_show = 1;
    }else {
        $('.menu-box').slideUp(0, function() {
            $('.menu-btn').removeClass('menu-on');
        });
        menu_show = 0;
    }
}
// 自适应屏幕大小
function resize(min_w, max_w, window_w) {
    // 获取当前设备的宽度
    /*
        根据宽度，跟rem的换算方式进行计算，得到font-size的百分比或者尺寸
        此处得到的是保留 小数点后两位数 的值
    */
    // var font_size = Math.round((window_w/max_w*6.25)*10000)/100;
    font_size = Math.round((window_w/max_w * 6.25)*10000)/100;

    // 判断当前屏幕是否在自己设定的最小、最大宽度之内
    // 是，则进行if里面的语句
    // 当页面的大小超过了最大宽度之后，直接设置html的值为100px
    if(window_w >= min_w && window_w <= max_w) {
        // 给HTML重新赋值
        $('html').css({'font-size': font_size + "%"});
    }else if(window_w > max_w) {
        $('html').css({'font-size': "625%"});
    }
}
// 检测当前浏览器设备是pc端还是移动端
function IsPC() {
    isPC = true;
    if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad|Touch|PlayBook|SymbianOS|Windows Phone|Nokia)/)))
    {    //跳到手机端
        isPC = true;

    }else{
        //跳到电脑端
        isPC = false;
    }
    // 判断flag返回的值是true还是false, true则表示，当前是手机设备，false则是pc设备
    return isPC;
}
/*
 * jQuery placeholder, fix for IE6,7,8,9
 */
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
            var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top, height:h, lienHeight:h, paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
        });
    }
};

