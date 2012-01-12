(function($) {
	var __ = {
		NAME		: "fxTextAreaAutoResizer",
		MAX_LINE	: "maxLine",
		MIN_LINE		: "minLine",
		KEY_ENTER 	: 13
	};
	function isUndefined( o ) {
		return typeof o === "undefined";
	};
	
	$.widget( "jquery." + __.NAME, {
		options : {
			onshfitenter 	: function() {},
			onenter 		: function() {},
			onfocus 		: function() {},
			onblur 			: function() {},
			oninput			: function() {},
			animation		: true,
			shadowId  		: "shadowTextArea",
			minLine 		: 1,
			maxLine 		: 5,
			lineHeight 	: 16
		},
		_setOption : function(name, value) {
			$.Widget.prototype._setOption.apply(this, arguments);
		},
		_create : function() {
			this._initEvent();
		},
		_init : function() {
			var nOneLine = parseInt( this.element.css("lineHeight"), 10 );
			this._nPreventShake = typeof this.option("preventShake") === "undefined" ? nOneLine : this.option("preventShake");
			this._nHeight = this._nMinHeight = ( nOneLine || this.option("lineHeight") ) * this.option(__.MIN_LINE) + this._nPreventShake;
			this._nMaxHeight = ( nOneLine || this.option("lineHeight") ) * this.option(__.MAX_LINE) + this._nPreventShake;
			this.element.css( "overflow", "hidden" ).val("").height( this._nHeight );
			this._initShadow();
		},
		_createShadow : function() {
			if ( isUndefined( this._shadow ) ) {
				this._shadow = $("<textarea>").attr("id", this.option("shadowId") + Math.random(10)).css({
					lineHeight 	: this.element.css("lineHeight"),
					height 		: 0,
					width 		: this.element.width(),
					"min-width" : self.element.width(),
					"max-width" : self.element.width(),
					fontSize	: this.element.css("fontSize"),
					fontFamily	: this.element.css("fontFamily"),
					position 	: "absolute",
					overflow 	: "hidden",
					left 		: "-10000px"
				}).appendTo($("body"));
			}
		},
		_initShadow : function() {
			if ( !isUndefined( this._shadow ) ) {
				this._shadow.css({
					lineHeight 	: this.element.css("lineHeight"),
					height 		: 0,
					width 		: this.element.width()
				}).val("");
			}
		},
		_initEvent : function() {
			this.element.bind( "keydown." + __.NAME, $.proxy(this._onkeydown, this))
				.bind("keyup." + __.NAME, $.proxy(this._onkeyup, this))
				.bind("focus." + __.NAME, $.proxy(this._onfocus, this))
				.bind("blur." + __.NAME, $.proxy(this._onblur, this));
		},
		_onkeydown : function(event) {
			this._adjustHeight( this.element.val() );
			this._checkEnter( event );
		},
		_onkeyup : function(event) {
			this._adjustHeight( this.element.val() );	
			this._trigger( "oninput", null, this.element.val() );		
		},
		_adjustHeight : function( sText, fnComplete ) {
			if ( typeof this._shadow === "undefined" ) { return; }
			var nScrollTop = this._shadow.val( sText ).height(0).scrollTop(20000).scrollTop();
			var nNewHeight = nScrollTop + this._nPreventShake;
			var nSetHeight = Math.min( this._nMaxHeight, Math.max( this._nMinHeight, nNewHeight ) );
			
			if ( nScrollTop > this._nMaxHeight ) {
				this.element.css( "overflow-y", "scroll" );
				this._shadow.css("overflow-y", "scroll");
			} else {
				this.element.css( "overflow-y", "hidden" );
				this._shadow.css("overflow-y", "hidden" );

			}
			if ( this._nHeight != nSetHeight ) {
				if ( this.option("animation") === true ) {
					this.element.animate(  {
						"height" : nSetHeight
					}, 100, fnComplete || function() {} );
				} else {
					this.element.height( nSetHeight );
				}
			}
			this._nHeight = nSetHeight;
		},
		_checkEnter : function( event ) {
			if ( event.keyCode === __.KEY_ENTER)  {
				if ( this._trigger( event.shiftKey ? "onshiftenter" : "onenter", this.element.val() ) === false ) {
					event.preventDefault();
					return false;
				}
			}
		},
		_onfocus : function(event) {
			this._createShadow();
			
			var self = this;
			if ($.browser.mozilla) {
				this._bRunChecker = true;
				var fn = function() {
					self._adjustHeight( self.element.val() );
					if ( self._bRunChecker ) {
						setTimeout(arguments.callee, 0);
					}
				};
				setTimeout(fn, 0);
			}
			this._trigger("onfocus", this.element.val() );
		},
		_onblur : function(event) {
			this._bRunChecker = false;
			this._trigger("onblur", this.element.val() );
		},
		getValue : function() {
			return this.element.val();
		},
		setValue : function(sValue) {
			this.element.val(sValue);
			this._adjustHeight(sValue);
		},
		setFocus : function() {
			this.element.focus();
			var sValue = this.element.val();
			this.element.val("").val(sValue);
		},
		reset : function() {
			this.element.val("");
			this._adjustHeight("");
			//this._trigger("onblur", "" );
		},
		destroy : function() {
			$.Widget.prototype.destroy.call(this);
			if ( !isUndefined( this._shadow ) ) {
				this._shadow.remove();
				this._shadow = null;
			}
		}        
	});
})(jQuery);
