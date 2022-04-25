$(function(){
/*产品目录第一个默认展开*/
/*$(".menu_li>p>span").first().addClass('on');
$(".menu_li>ul").first().show();*/

});
$(document).ready(function(){

	/* ----- 侧边悬浮 ---- */
	$( ".suspension .a").bind("mouseenter", function(){
		var _this = $(this);
		var s = $(".suspension");
		var isService = _this.hasClass("a-service");
		var isServicePhone = _this.hasClass("a-service-phone");
		var isQrcode = _this.hasClass("a-qrcode");
		if(isService){ s.find(".d-service").show().siblings(".d").hide();}
		if(isServicePhone){ s.find(".d-service-phone").show().siblings(".d").hide();}
		if(isQrcode){ s.find(".d-qrcode").show().siblings(".d").hide();}
	});
	$(".suspension, .suspension .a-top").bind("mouseleave", function(){
		$(".suspension").find(".d").hide();
	});
	$(".suspension .a-top").bind("mouseenter", function(){
		$(".suspension").find(".d").hide(); 
	});
	$(".suspension .a-top").bind("click", ".suspension .a-top", function(){
		$("html,body").animate({scrollTop: 0});
	});
	$(window).scroll(function(){
		var st = $(document).scrollTop();
		var $top = $(".suspension .a-top");
		if(st > 400){
			$top.css({display: 'block'});
		}else{
			if ($top.is(":visible")) {
				$top.hide();
			}
		}
	});
	
});	

/*网站导航点击事件*/
var menu_flag=0;
$('.btn-menu').click(function(event){
	if(menu_flag==0){     	
		$(this).toggleClass('active');
		$('.navigation').slideToggle(300);
		menu_flag=1;
	}else{
		$(this).toggleClass('active');
		$('.navigation').slideToggle(300);
		menu_flag=0;
	 }
	event.stopPropagation();
});

<!--手机端产品目录展开-->
var menu_tit_flag=0;
$('.menu_tit').on('click',function(){
	if ( matchMedia( 'only screen and (max-width:1023px)' ).matches ) {
	if(menu_tit_flag==0){
		$('.menu_list').stop(true).slideToggle(300);
		$(this).children('em').html('点击收起 -');
		menu_tit_flag=1;
	}else{
		$('.menu_list').stop(true).slideToggle(300);
		$(this).children('em').html('点击展开+');
		menu_tit_flag=0;
		}
	}
});

/*产品目录收缩*/
$(".menu_li>p>span").on('click',function(){
  $(this).parents('p').next('ul').stop(true).slideToggle(300);
  $(this).stop(true).toggleClass('on');
});


<!--手机端相关文章展开-->
var menu_tit_flag=0;
$('.menu_tit2').on('click',function(){
	if ( matchMedia( 'only screen and (max-width:1023px)' ).matches ) {
	if(menu_tit_flag==0){
		$('.menu_list2').stop(true).slideToggle(300);
		$(this).children('em').html('点击收起 -');
		menu_tit_flag=1;
	}else{
		$('.menu_list2').stop(true).slideToggle(300);
		$(this).children('em').html('点击展开+');
		menu_tit_flag=0;
		}
	}
});

/*相关文章收缩*/
$(".menu_li2>p>span").on('click',function(){
  $(this).parents('p').next('ul').stop(true).slideToggle(300);
  $(this).stop(true).toggleClass('on');
});



/*联系方式tab切换*/
$(".contact .tags_title .one").hover(function(){
	$(this).removeClass('ron');
	$(".contact .tags_title .two").addClass('ron');
	$(".contact .content2").hide();
    $(".contact .content1").show();
},function(){
    
});
$(".contact .tags_title .two").hover(function(){
	$(this).removeClass('ron');
	$(".contact .tags_title .one").addClass('ron');
	$(".contact .content1").hide();
    $(".contact .content2").show();
},function(){
    
});

/*产品目录收缩*/
$(".pro_mulu>ul>li").hover(function() {
  $(".pro_mulu>ul>li>div").hide();
  $(".pro_mulu>ul>li").removeClass('on');
  $(this).addClass('on');
  $(this).children('div').show();
}, function() {
  
});


/*新闻 技术文章*/
iNews();
function iNews() {
var index = $('.i-news-on').index();
$('.i-news-box').eq(index).show();
var num = $('.i-btn-list li').length;

$('.i-btn-list').on('click', 'li', function() {
index = $(this).index();
for(var i=0; i<num; i++) {
$('.i-btn-list li').eq(i).removeClass('i-news-on');
$('.i-news-box').eq(i).hide();
}
$(this).addClass('i-news-on');
$('.i-news-box').eq(index).show();
});
}


/*首页图片滚动 调用方*/
jQuery.fn.imgscroll = function(o){
	var defaults = {
		speed: 80,
		amount: 0,
		width: 1,
		dir: "left"
	};
	o = jQuery.extend(defaults, o);
	
	return this.each(function(){
		var _li = jQuery("li", this);
		_li.parent().parent().css({overflow: "hidden", position: "relative"}); //div
		_li.parent().css({margin: "0", padding: "0", overflow: "hidden", position: "relative", "list-style": "none"}); //ul
		_li.css({position: "relative", overflow: "hidden"}); //li
		if(o.dir == "left") _li.css({float: "left"});
		
		//初始大小
		var _li_size = 0;
		for(var i=0; i<_li.size(); i++)
			_li_size += o.dir == "left" ? _li.eq(i).outerWidth(true) : _li.eq(i).outerHeight(true);
		
		//循环所需要的元素
		if(o.dir == "left") _li.parent().css({width: (_li_size*3)+"px"});
		_li.parent().empty().append(_li.clone()).append(_li.clone()).append(_li.clone());
		_li = jQuery("li", this);

		//滚动
		var _li_scroll = 0;
		function goto(){
			_li_scroll += o.width;
			if(_li_scroll > _li_size)
			{
				_li_scroll = 0;
				_li.parent().css(o.dir == "left" ? { left : -_li_scroll } : { top : -_li_scroll });
				_li_scroll += o.width;
			}
				_li.parent().animate(o.dir == "left" ? { left : -_li_scroll } : { top : -_li_scroll }, o.amount);
		}
		
		//开始
		var move = setInterval(function(){ goto(); }, o.speed);
		_li.parent().hover(function(){
			clearInterval(move);
		},function(){
			clearInterval(move);
			move = setInterval(function(){ goto(); }, o.speed);
		});
	});
};


/*首页图片滚动时间*/
jQuery(document).ready(function(){
	jQuery(".ly_scroll").imgscroll({
		speed: 40,    //图片滚动速度
		amount: 0,    //图片滚动过渡时间
		width: 1,     //图片滚动步数
		dir: "left"   // "left" 或 "up" 向左或向上滚动
	});
	
});   

			   
	
