### 기능 ###
입력값이나 지정한 최소/최대 크기에 맞춰 자동으로 textarea의 크기를 조절해주는 jQuery widget.

---

**요구사항**

* 최소/최대 크기 지정 가능
	* ex) { minLine : 1, maxLine : 10 }
	* 한 라인의 height는 line-height 값을 따름.
* 영문, 한글입력시 모두 동작 
* 지원 브라우저
	* \>= IE7
	* Chrome
	* Firefox
	* Safari

---

**사용법**

```javascript

$("textarea").fxTextAreaAutoResizer({
  onshiftenter : function( event, sText ) {},
  onenter : function( event, sText ) {},
  onfocus : function( event, sText ) {},
  onblur : function( event, sText ) {},
  minLine : 1,
  maxLine : 10
});

$("textarea").fxTextAreaAutoResizer( "getValue" );
$("textarea").fxTextAreaAutoResizer( "setValue", sText );
$("textarea").fxTextAreaAutoResizer( "setFocus" );
$("textarea").fxTextAreaAutoResizer( "reset" );

```

---

* 입력값에 따른 height의 떨림을 없애기 위해 최소의 preventShake 값을 추가함.
* 이로 인해 최소 한 줄의 여유공간이 생기기 때문에 keydown에서 height를 체크 할 이유가 없어짐.
* scrollHeight 보다 scrollTop를 사용함.
	* padding 값을 고려하지 않아도 된다는 점에서 scrollTop의 사용이 훨씬 편함.
* Firefox 에서는 한글 입력시 overflow-y의 설정이 "hidden" 에서 "scroll/auto"로 변경될 때 커서가 제일 앞으로 이동하는 버그가 있음.
* Firefox 에서는 한글의 keydown, keyup 이벤트가 제대로 발생하지 않음.
