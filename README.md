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
  minLine : 1,
  maxLine : 10
});

```