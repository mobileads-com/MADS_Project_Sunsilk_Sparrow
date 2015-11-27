/*
*
* mads - version 2.00.01  
* Copyright (c) 2015, Ninjoe
* Dual licensed under the MIT or GPL Version 2 licenses.
* https://en.wikipedia.org/wiki/MIT_License
* https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
*
*/
var mads = function () {
	/* Get Tracker */
	if (typeof custTracker == 'undefined' && typeof rma != 'undefined') {
		this.custTracker = rma.customize.custTracker;
	} else if (typeof custTracker != 'undefined') {
		this.custTracker = custTracker;
	} else {
		this.custTracker = [];
	}

	/* Unique ID on each initialise */
	this.id = this.uniqId();

	/* Tracked tracker */
	this.tracked = [];

	/* Body Tag */
	this.bodyTag = document.getElementsByTagName('body')[0];

	/* Head Tag */
	this.headTag = document.getElementsByTagName('head')[0];

	/* RMA Widget - Content Area */
	this.contentTag = document.getElementById('rma-widget');

	/* URL Path */
	this.path = typeof rma != 'undefined' ? rma.customize.src : '';
};

/* Generate unique ID */
mads.prototype.uniqId = function () {

	return new Date().getTime();
}

/* Link Opner */
mads.prototype.linkOpener = function (url) {

	if(typeof url != "undefined" && url !=""){
		if (typeof mraid !== 'undefined') {
			mraid.open(url);
		}else{
			window.open(url);
		}
	}
}

/* tracker */
mads.prototype.tracker = function (tt, type, name, value) {

    /* 
    * name is used to make sure that particular tracker is tracked for only once 
    * there might have the same type in different location, so it will need the name to differentiate them
    */
    name = name || type; 
    
    if ( typeof this.custTracker != 'undefined' && this.custTracker != '' && this.tracked.indexOf(name) == -1 ) {
    	for (var i = 0; i < this.custTracker.length; i++) {
    		var img = document.createElement('img');

    		if (typeof value == 'undefined') {
    			value = '';
    		}

    		/* Insert Macro */
    		var src = this.custTracker[i].replace('{{type}}', type);
    		src = src.replace('{{tt}}', tt);
    		src = src.replace('{{value}}', value);
    		/* */
    		img.src = src + '&' + this.id;

    		img.style.display = 'none';
    		this.bodyTag.appendChild(img);

    		this.tracked.push(name);
    	}
    }
};

/* Load JS File */
mads.prototype.loadJs = function (js, callback) {
	var script = document.createElement('script');
	script.src = js;

	if (typeof callback != 'undefined') {
		script.onload = callback;
	}

	this.headTag.appendChild(script);
}

/* Load CSS File */
mads.prototype.loadCss = function (href) {
	var link = document.createElement('link');
	link.href = href;
	link.setAttribute('type', 'text/css');
	link.setAttribute('rel', 'stylesheet');

	this.headTag.appendChild(link);
}


var sparrow = function(){
	var _this = this;
	this.sdk = new mads();
	this.professions = ['singer', 'chef', 'writer', 'model', 'dancer', 'designer', 'photographer'];
	this.sdk.loadCss(this.sdk.path + 'css/sparrow.css');
	this.sdk.loadCss(this.sdk.path + 'css/jquery-ui.css');
	this.sdk.loadCss(this.sdk.path + 'css/loader.css');
	this.preload();
	this.transform;
	this.image;
	this.userAgent = navigator.userAgent || navigator.vendor || window.opera;
	this.el;

	this.merged = '';
	this.shareHtml = '';

	this.site , this.selfie , this.choose , this.fb_image , this.tw_image, this.guided = false;

	this.sdk.loadJs(this.sdk.path + 'js/jquery.js', function(){
		_this.sdk.loadJs(_this.sdk.path + 'js/jquery-ui.js', function(){
			_this.sdk.loadJs(_this.sdk.path + 'js/jquery.ui.touch-punch.min.js');
			_this.sdk.loadJs(_this.sdk.path + 'js/transit.js');
			_this.sdk.loadJs(_this.sdk.path + 'js/exif.js');
			_this.sdk.loadJs(_this.sdk.path + 'js/hammer.js');
			_this.parent = $('#rma-widget');
			_this.firstScreen();
		});
	});
	this.carousel;
}

sparrow.prototype.preload = function(){
  	var _this = this;
  	var script = document.createElement('SCRIPT');
  	var str = '';
  	str = str + 'var share = new Image();'+
  	'var logo = new Image();' +
  	'var girls = new Image();' +
  	'var shampoo = new Image();' +
  	'var circle = new Image();' +
  	'var girls = new Image();' +
  	'var arrow_left = new Image();' +
  	'var arrow_right = new Image();' +
  	'var chef_01 = new Image();' +
  	'var dancer_01 = new Image();' +
  	'var designer_01 = new Image();' +
  	'var model_01 = new Image();' +
  	'var singer_01 = new Image();' +
  	'var writer_01 = new Image();' +
  	'var photographer_01 = new Image();' +
  	'var ring = new Image();' +
  	'var chef_02 = new Image();' +
  	'var dancer_02 = new Image();' +
  	'var designer_02 = new Image();' +
  	'var model_02 = new Image();' +
  	'var singer_02 = new Image();' +
  	'var writer_02 = new Image();' +
  	'var photographer_02 = new Image();' +
  	'var words_bottom = new Image();' +
  	'var words_top = new Image();' +
  	'var words_fourth = new Image();' +
  	'logo.src='+ _this.sdk.path+' "img/logo.png";'+
  	'girls.src='+ _this.sdk.path+' "img/1-frame/girls.png";'+
  	'shampoo.src='+ _this.sdk.path+' "img/shampoo.png";'+
  	'circle.src='+ _this.sdk.path+' "img/1-frame/circle.png";'+
  	'girls.src='+ _this.sdk.path+' "img/1-frame/girls.png";'+
  	'arrow_left.src='+ _this.sdk.path+' "img/2-frame/arrow-left.png";'+
  	'arrow_right.src='+ _this.sdk.path+' "img/2-frame/arrow-right.png";'
  	'chef_01.src='+ _this.sdk.path+' "img/2-frame/chef_01.png";'+
  	'dancer_01.src='+ _this.sdk.path+' "img/2-frame/dancer_01.png";'
  	'designer_01.src='+ _this.sdk.path+' "img/2-frame/designer_01.png";'+
  	'model_01.src='+ _this.sdk.path+' "img/2-frame/model_01.png";'
  	'singer_01.src='+ _this.sdk.path+' "img/2-frame/singer_01.png";'+
  	'writer_01.src='+ _this.sdk.path+' "img/2-frame/writer_01.png";' +
  	'photographer_01.src='+ _this.sdk.path+' "img/2-frame/photographer_01.png";'+
  	'ring.src='+ _this.sdk.path+' "img/2-frame/ring.png";'+
  	'chef_02.src='+ _this.sdk.path+' "img/3-frame/chef_02.png";'+
  	'dancer_02.src='+ _this.sdk.path+' "img/3-frame/dancer_02.png";'
  	'designer_02.src='+ _this.sdk.path+' "img/3-frame/designer_02.png";'+
  	'model_02.src='+ _this.sdk.path+' "img/3-frame/model_02.png";'
  	'singer_02.src='+ _this.sdk.path+' "img/3-frame/singer_02.png";'+
  	'writer_02.src='+ _this.sdk.path+' "img/3-frame/writer_02.png";' +
  	'photographer_02.src='+ _this.sdk.path+' "img/3-frame/photographer_02.png";'+
  	'words_bottom.src='+ _this.sdk.path+' "img/3-frame/words_bottom.png";' +
  	'words_top.src='+ _this.sdk.path+' "img/3-frame/words_top.png";'+
  	'words_fourth.src='+ _this.sdk.path+' "img/4-frame/words.png";';
	script.innerHTML = str;
	_this.sdk.bodyTag.appendChild(script);
}

sparrow.prototype.firstScreen = function(){
	var _this = this;
	this.parent.append(
		'<div class="frame first">' +
		'<div class="social">' +
		'<img src="'+ _this.sdk.path +'img/share.png" class="share-button top" alt="share-buttons">' +
		'<img src="'+ _this.sdk.path +'img/button-fb.png" class="fb-button top" alt="fb-buttons">' +
		'<img src="'+ _this.sdk.path +'img/button-tw.png" class="tw-button top" alt="tw-buttons">' +
		'</div>' +
		'<img src="'+ _this.sdk.path +'img/logo.png" class="logo" alt="logo">' +
		'<div class="'+ _this.sdk.path +'main-circle main-first" id="main-circle"></div>' +
		'<img src="'+ _this.sdk.path +'img/shampoo.png" class="shampoo shampoo-right" alt="shampoo">' +
		'<div class="wordings word-first"></div>' +
		'<div class="button-div div-left">' +
		'</div>' +
		'</div><div class="loader-wrapper hidden"><div class="loader">Loading...</div></div>'
		);
	$('.fb-button.top').on('click', function(){
		if(!_this.fb_image){
			_this.sdk.tracker('E', 'ss_facebook');
		}
		_this.fb_image = true;
		_this.sdk.linkOpener('https://www.facebook.com/SunsilkIndonesia');
	});

	$('.tw-button.top').on('click', function(){
		if(!_this.tw_image){
			_this.sdk.tracker('E', 'ss_twitter');
		}
		_this.tw_image = true;
		_this.sdk.linkOpener('https://twitter.com/sunsilkid');
	});
	this.fillForm();
}

sparrow.prototype.fillForm = function(){
	var _this = this;
	$('.button-div').empty().append(
		'<form action="" method="post" id="form-selfie" enctype="multipart/form-data">' +
		'<input type="file"  id="take-picture" accept="image/*"  style="" value="upload">' +
		'<label id="label-selfie" for="take-picture">' +
		'<img src="'+ _this.sdk.path +'img/1-frame/btn-selfie.png" class="btn-selfie buttons" alt="selfie">' +
		'</label>' +
		'</form>'
		);

	$('.btn-selfie').on('click', function(){
		if(!_this.selfie){
			_this.sdk.tracker('E', 'ss_selfie_click');
		}
		_this.selfie = true;
	});

	$('#take-picture').on('change', function(e){
		var file = this.files[0];
		var imageType = /image.*/;
		var img = new Image();
		if(file.type.match(imageType)){
			var reader = new FileReader();
			reader.onload = function(e){
				img.src = reader.result;
				_this.image = img;
			}
			reader.readAsDataURL(file); 
			_this.secondScreen(img, true);
		}else{
			_this.secondScreen(img, false);
		}		
	});
}

sparrow.prototype.secondScreen = function(img, match){
	var _this = this;
	$('.button-div').empty();
	$('.frame').removeClass('first').addClass('second');
	$('.wordings').removeClass('word-first').addClass('word-second');
	this.sdk.loadJs(_this.sdk.path + 'js/jquery.jcarousel.js', function(){
		$('.main-circle').removeClass('main-first').addClass('main-second').append(
			'<div class="options-menu">'+
				'<img src="'+ _this.sdk.path +'img/2-frame/zoom-minus.png" class="zoom-minus" />' +
				'<img src="'+ _this.sdk.path +'img/2-frame/zoom-plus.png" class="zoom-plus" />' +
				'<img src="'+ _this.sdk.path +'img/2-frame/rotate.png" class="rotate" />' +
			'</div>' +
			'<div id="carousel" class="jcarousel"><ul></ul>'+
				'<div class="canvas-work"><div class="canvas-move"></div></div>' +
			'</div>' +
			'<div class="guide-wrapper"><img src="'+ _this.sdk.path +'img/guide.gif" class="guide" /></div>' +
			'<a href="#" class="jcarousel-control-prev" data-jcarouselcontrol="true"><img src="'+_this.sdk.path+'img/2-frame/arrow-left.png" class="carousel-arrow"/></a>' +
			'<a href="#" class="jcarousel-control-next" data-jcarouselcontrol="true"><img src="'+_this.sdk.path+'img/2-frame/arrow-right.png" class="carousel-arrow"/></a>' +
			'<p class="jcarousel-pagination" data-jcarouselpagination="true">' +
			'<a href="#1"><img src="'+ _this.sdk.path +'img/2-frame/selection.png" /></a>' +
			'</p>'
			);
		if(match){
			$('.canvas-move').append(img);
			$('.canvas-move img').attr('id', 'iqwe');
		}else{
			$('.canvas-move').append('File not supported.');
		}

		$('.main-second').append('<img src="'+ _this.sdk.path +'img/2-frame/ring.png" class="ring" />')
		$('#carousel ul').empty();
		$('#carousel ul').append('<li><img data-next="'+ _this.sdk.path +'img/3-frame/singer_02.png" src="'+_this.sdk.path+'img/2-frame/singer_01.png" id="singer" class="profession" width="340" height="290" style="margin-left: -65px;margin-top: -12px;" /></li>');
		$('#carousel ul').append('<li><img data-next="'+ _this.sdk.path +'img/3-frame/chef_02.png" src="'+_this.sdk.path+'img/2-frame/chef_01.png" id="chef" class="profession" width="340" height="290" style="margin-left: -48px;margin-top: -5px;" /></li>');
		$('#carousel ul').append('<li><img data-next="'+ _this.sdk.path +'img/3-frame/writer_02.png" src="'+_this.sdk.path+'img/2-frame/writer_01.png" id="writer" class="profession" width="340" height="290" style="margin-left: -77px;margin-top: 2px;" /></li>');
		$('#carousel ul').append('<li><img data-next="'+ _this.sdk.path +'img/3-frame/model_02.png" src="'+_this.sdk.path+'img/2-frame/model_01.png" id="model" class="profession" width="320" height="280" style="margin-left: -58px;margin-top: 1px;" /></li>');
		$('#carousel ul').append('<li><img data-next="'+ _this.sdk.path +'img/3-frame/dancer_02.png" src="'+_this.sdk.path+'img/2-frame/dancer_01.png" id="dancer" class="profession" width="320" height="290" style="margin-left: -46px;margin-top: -14px;" /></li>');
		$('#carousel ul').append('<li><img data-next="'+ _this.sdk.path +'img/3-frame/designer_02.png" src="'+_this.sdk.path+'img/2-frame/designer_01.png" id="designer" class="profession" width="320" height="280" style="margin-left: -51px;margin-top: -4px;" /></li>');
		$('#carousel ul').append('<li><img data-next="'+ _this.sdk.path +'img/3-frame/photographer_02.png" src="'+_this.sdk.path+'img/2-frame/photographer_01.png" id="photographer" class="profession" width="300" height="290" style="margin-left: -44px;margin-top: 6px;" /></li>');

		
		$('.jcarousel').jcarousel();
		$('.jcarousel-control-prev').on('jcarouselcontrol:active', function() {
			$(this).removeClass('inactive');
		}).on('jcarouselcontrol:inactive', function() {
			$(this).addClass('inactive');
		}).jcarouselControl({
			target: '-=1'
		});

		$('.jcarousel-control-next').on('jcarouselcontrol:active', function() {
			$(this).removeClass('inactive');
		}).on('jcarouselcontrol:inactive', function() {
			$(this).addClass('inactive');
		}).jcarouselControl({
			target: '+=1'
		});

		$('.jcarousel-pagination')	.on('jcarouselpagination:active', 'a', function() {
			$(this).addClass('active');
			$(this).css('background', '#5e265b')
		}).on('jcarouselpagination:inactive', 'a', function() {
			$(this).removeClass('active');
			$(this).css('background', '#FFFFFF')
		}).jcarouselPagination();
		_this.events();
		if(!_this.guided){
			setTimeout(function(){
				$('.guide-wrapper').addClass('hidden');

			}, 7000);
		}else{
			$('.guide-wrapper').addClass('hidden');
		}
		_this.guided = true;
	});
	this.fillButtons();
}

sparrow.prototype.events = function(){
	var _this = this;

	var reqAnimationFrame = (function () {
		return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	})();

	_this.el = $('#iqwe');
	$( "#iqwe" ).attr("ongesturechange","gesture(event)");
	$( "#iqwe" ).attr("ongestureend","gestureend(event)");
	var START_X = Math.round((screen.offsetWidth - _this.el.offsetWidth) / 2);
	var START_Y = Math.round((screen.offsetHeight - _this.el.offsetHeight) / 2);
	var ticking = false;
	var timer;

	var mc = new Hammer.Manager(document.querySelector('#iqwe'));
	mc.add(new Hammer.Pan({ threshold : 0, pointer : 0 }));
	mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
	mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);
	mc.on("rotatestart rotatemove", onRotate);
	mc.on("pinchstart pinchmove", onPinch);

	$('#iqwe').draggable();
	resetElement();
	$('.zoom-plus').on('click', function(){
		_this.transform.scale += 0.1;
		updateElementTransform();
	});

	$('.zoom-minus').on('click', function(){
		_this.transform.scale -= 0.1;
		updateElementTransform();
	});

	$('.rotate').on('click', function(){
		$('#iqwe').transition({ rotate : '-=90deg' });
	});

	function updateElementTransform() {
		var value = ['scale(' + _this.transform.scale + ', ' + _this.transform.scale + ')',	'rotate3d('+ _this.transform.rx +','+ _this.transform.ry +','+ _this.transform.rz +','+  _this.transform.angle + 'deg)'];
		value = value.join(" ");
		_this.el.css( 'webkitTransform', value );
		_this.el.css( 'mozTransform', value );
		_this.el.css( 'transform', value );
		ticking = false;
	}

	function requestElementUpdate() {
		if(!ticking) {
			reqAnimationFrame(updateElementTransform);
			ticking = true;
		}
	}

	function resetElement() {
		_this.el.addClass('animate');
		_this.transform = {
			translate: { x: START_X, y: START_Y },
			scale: 1,
			angle: 0,
			rx: 0,
			ry: 0,
			rz: 0
		};
		requestElementUpdate();
	}

	function onPan(ev) {
		_this.el.removeClass();
		_this.transform.translate = {
			x: START_X + ev.deltaX,
			y: START_Y + ev.deltaY
		};

		logEvent(ev);
		requestElementUpdate();
	}

	var initScale = 1;
	function onPinch(ev) {
		if(ev.type == 'pinchstart') {
			initScale = _this.transform.scale || 1;
		}

		_this.el.removeClass();
		_this.transform.scale = initScale * ev.scale;

		logEvent(ev);
		requestElementUpdate();
	}

	var initAngle = 0;
	function onRotate(ev) {
		if(ev.type == 'rotatestart') {
			initAngle = _this.transform.angle || 0;
		}

		_this.el.removeClass();
		_this.transform.rz = 1;
		_this.transform.angle = initAngle + ev.rotation;
		requestElementUpdate();
	}

	function onSwipe(ev) {
		var angle = 50;
		_this.transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
		_this.transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
		_this.transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

		clearTimeout(timer);
		timer = setTimeout(function () {
			resetElement();
		}, 300);

		logEvent(ev);
		requestElementUpdate();
	}

	function onTap(ev) {
		_this.transform.rx = 1;
		_this.transform.angle = 25;

		clearTimeout(timer);
		timer = setTimeout(function () {
			resetElement();
		}, 2000000);

		logEvent(ev);
		requestElementUpdate();
	}

	function onDoubleTap(ev) {
		_this.transform.rx = 1;
		_this.transform.angle = 80;

		clearTimeout(timer);
		timer = setTimeout(function () {
			resetElement();
		}, 500);

		logEvent(ev);
		requestElementUpdate();
	}


	var rotation = 0;
	var scale = 1;
	function gesture(event) {
		event.target.innerHTML = "Rotation: " + Math.round((event.rotation+rotation)*100)/100 + " Scale: " + Math.round((event.scale*scale)*100)/100;
		event.target.style.webkitTransform = "rotate(" + (event.rotation+rotation)%360 + "deg)" + " scale(" + event.scale*scale + ")";
	}

	function gestureend(event) {
		rotation = event.rotation+rotation;
		scale = event.scale*scale;
	}
}

sparrow.prototype.fillButtons = function(){
	var _this = this;
	$('.button-div').empty().append(
		'<img src="'+ _this.sdk.path +'img/2-frame/back.png" class="buttons btn-back"></img><img src="'+ _this.sdk.path +'img/2-frame/choose.png" class="buttons btn-choose"></img>'
		);

	$('.btn-back').on('click', function(){
		$('#rma-widget').empty();
		_this.firstScreen();
	});

	$('.btn-choose').on('click', function(){
		if(!_this.choose){
			_this.sdk.tracker('E', 'ss_choose');
		}
		_this.choose = true;
		$('.loader-wrapper').removeClass('hidden');
		var profession = $('.jcarousel').jcarousel('visible').find('img').attr('src');
		var profession2 = $('.jcarousel').jcarousel('visible').find('img').attr('data-next');
		var me = $('.canvas-move').find('img').attr('src');
		var pos = $('.canvas-move').find('img').position();
		var t =  parseInt($('.canvas-move').find('img').css('top').replace('px', ''));
		var l =  parseInt($('.canvas-move').find('img').css('left').replace('px', ''));

		var h = $('.canvas-move').find('img').height();
		var w = $('.canvas-move').find('img').width();

		var r = _this.getRotationDegrees($('.canvas-move').find('img'));

		t = isNaN(t) ? 0 : t;
		l = isNaN(l) ? 0 : l;

		if( _this.userAgent.match( /iPad/i ) || _this.userAgent.match( /iPhone/i ) || _this.userAgent.match( /iPod/i ) ){
			console.log(_this.userAgent);
			EXIF.getData(_this.image, function(){
				var orientation = EXIF.getTag(this, 'Orientation');
				if(orientation == '6'){
					r += 90;
					var temp = w;
					w = h;
					h = temp;
					l -= 42;
					t += 42
				}
			});
		}else{
			l += 2;
			t -= 2;
		}
		_this.mergeImage(me, profession2, w, h, l , t, r);		
	});
}

sparrow.prototype.mergeImage = function(img1, img2, w, h, l, t, r){
	var _this = this;
	$.extend({
		mergeImage : function (options) {
			$(options.container).append('<canvas id="mergeImageCanvas" style="display:none;"></canvas>');

			var canvas = $("#mergeImageCanvas")[0];
			canvas.width = 303;
			canvas.height = 282;
			var ctx = $("#mergeImageCanvas")[0].getContext("2d");
			var imgObj = [new Image(), new Image()];

			imgObj[0].src = options.img[0];
			imgObj[1].src = options.img[1];

			if (typeof options.scale != 'undefined') {
                
                var adjustmentX = 27 + ( -65 - parseInt($('.jcarousel').jcarousel('visible').find('img').css('margin-left').replace('px','')) );
                var adjustmentY = 13 + ( -12 - parseInt($('.jcarousel').jcarousel('visible').find('img').css('margin-top').replace('px','')));

				var x = options.width / 100;
				var n = options.scale * 100;
				options.width = x * n;

				var y = options.height / 100;
				options.height = y * n;

				options.x -= (x * (n - 100)) / 2 - adjustmentX;

				options.y -= (y * (n - 100)) / 2 - adjustmentY;
			}

			imgObj[0].onload = function() {
				ctx.save();
				ctx.translate(options.x, options.y);
				ctx.translate(options.width/2, options.height/2);
				ctx.rotate(options.rotation*Math.PI/180);
				ctx.drawImage(imgObj[0], - options.width/2 , - options.height/2, options.width, options.height);
				ctx.restore();
				imgObj[1].onload = function() {
					ctx.drawImage(imgObj[1], 0, 0, 303, 282);
					var img = $("#mergeImageCanvas")[0].toDataURL("image/png");
					$.uploadImage({
						'img' : img,
						'target' : 'https://img.mobileads.com/sources/htmlCreation.php'
					});
				}
			}
		},
		uploadImage : function (options) {
			options.img = options.img.replace('data:image/png;base64,', '');
			var formData = new FormData();
			formData.append('image', options.img);
			$.ajax({
				type:'POST',
				url: options.target,
				data:formData,
				cache:false,
				contentType: false,
				processData: false,
				success:function(data){
					data = JSON.parse(data);
					_this.merged = data.url;
					_this.shareHtml = data.html;
					_this.thirdScreen();
				},
				error: function(data){
					console.log(data);
				}
			});
		}
	});

	return $.mergeImage({ 'container': '#rma-widget', 'img': [ img1, img2 ], 'width': w, 'height': h, 'x': l, 'y': t, 'rotation': r, 'scale': _this.transform.scale });
}

sparrow.prototype.getRotationDegrees = function(obj){
	var matrix = obj.css("-webkit-transform") || obj.css("-moz-transform") || obj.css("-ms-transform")  || obj.css("-o-transform")   || obj.css("transform");
	if(matrix !== 'none') {
		var values = matrix.split('(')[1].split(')')[0].split(',');
		var a = values[0];
		var b = values[1];
		var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
	} else { var angle = 0; }
	return (angle < 0) ? angle + 360 : angle;
}

sparrow.prototype.thirdScreen = function(){
	var _this = this;;
	$('.wordings').removeClass('word-second').addClass('word-third');
	$('.shampoo').removeClass('shampoo-right').addClass('shampoo-left');
	$('.main-circle').empty().append('<div class="merged"><img src="'+ _this.merged +'" class="merge-image" /></div><img src="'+_this.sdk.path+'img/3-frame/words_top.png" class="word-third-top" /> <img src="'+_this.sdk.path+'img/3-frame/try_again.png" class="btn-try-again" />').removeClass('main-second').addClass('main-third');
	$('.button-div').removeClass('div-left').addClass('div-right').empty().append('<img src="'+ _this.sdk.path +'img/3-frame/share_now.png" class="btn-share-now" />');
	$('.share-button, .fb-button, .tw-button').removeClass('top').addClass('middle');
	$('.btn-try-again').on('click', function(){
		$('.main-circle').empty().removeClass('main-third');
		$('.wordings').removeClass('word-third');
		$('.shampoo').removeClass('shampoo-left').addClass('shampoo-right');
		$('.share-button, .fb-button, .tw-button').removeClass('middle').addClass('top');
		_this.secondScreen(_this.image, true);
	});
	$('.loader-wrapper').addClass('hidden');

	$('.btn-share-now').on('click', function(){
		_this.finalScreen();
	});

	$('.fb-button.middle, .fb-button.topimg ').off('click').on('click', function(){
		if(!_this.fb_image){
			_this.sdk.tracker('E', 'ss_facebook');
		}
		_this.fb_image = true;
		$('.loader-wrapper').removeClass('hidden');
		var fbInterval = function () {
			setTimeout(function () {
				if (_this.merged != '') {
					$('.loader-wrapper').addClass('hidden');
					_this.sdk.linkOpener('https://www.facebook.com/dialog/feed?app_id=1644304792511433&display=popup&name=Temukan%20inspirasi%20berkerundung%20terbaru%20untuk%20kamu%20yang%20stylish.&link=http%3A%2F%2Fsunsilkhijab.com%2F&picture='+encodeURIComponent(_this.merged)+'&redirect_uri=http%3A%2F%2Fsunsilkhijab.com%2F');
				} else {
					fbInterval();
				}
			}, 500);
		}
		fbInterval();
	});

	$('.tw-button.middle, .tw-button.topimg').off('click').on('click', function(){
		if(!_this.tw_image){
			_this.sdk.tracker('E', 'ss_twitter');
		}
		_this.tw_image = true;
		$('.loader-wrapper').removeClass('hidden');

		var twInterval = function () {
			setTimeout(function () {
				if (_this.merged != '') {
					$('.loader-wrapper').addClass('hidden');
					_this.sdk.linkOpener('https://twitter.com/intent/tweet?text=Temukan%20inspirasi%20berkerundung%20terbaru%20untuk%20kamu%20yang%20stylish.&original_referer='+encodeURIComponent(_this.shareHtml)+'&tw_p=tweetbutton&url='+encodeURIComponent(_this.shareHtml));
				} else {
					twInterval();
				}
			}, 500);
		}
		twInterval();
	});
}

sparrow.prototype.finalScreen = function(){
	var _this = this;
	$('.fb-button, .tw-button').removeClass('middle').addClass('topimg');
	$('.share-button').removeClass('middle').addClass('top');
	$('.main-circle').empty().removeClass('main-third').addClass('main-fourth');
	$('.shampoo').removeClass('shampoo-left').addClass('shampoo-right');
	$('.wordings').removeClass('word-third').addClass('word-fourth');
	$('.button-div').removeClass('div-right').addClass('div-left').empty().append('<img src="'+ _this.sdk.path +'img/4-frame/more-info.png" class="btn-more-info" />');

	$('.btn-more-info').on('click', function(){
		if(!_this.site){
			_this.sdk.tracker('CTR', 'site');
		}
		_this.site = true;
		_this.sdk.linkOpener('http://kilau.sunsilk.co.id/');
	});
}

var s = new sparrow();