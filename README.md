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

---

* 입력값에 따른 height의 떨림을 없애기 위해 최소의 preventShake 값을 추가함.
* 이로 인해 최소 한 줄의 여유공간이 생기기 때문에 keydown에서 height를 체크 할 이유가 없어짐.
* scrollHeight 보다 