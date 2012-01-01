
var testID = "#" + "sample1";
var $target;

module( "First", {
	setup : function() {
		$target = $(testID);
	},
	teardown : function() {
		$target.fxTextAreaAutoResizer("destroy");
	}
});

test( "fxTextAreaAutoResizer 초기화 직후에는 shadow textarea가 생성되지 않는다.", 1, function() {
	$target.fxTextAreaAutoResizer({});
	
	equals( typeof $target._shadow === "undefined", true, "초기화 직후 shadow textarea가 생성되지는 않는다.");
});
test( "textarea가 포커스를 가지면 shadow textarea가 생성된다.", 1, function() {
	$target.fxTextAreaAutoResizer({});
	$target.trigger("focus");
		
	equals( $("textarea").length , 2, "포커스를 가지면 shadow Textarea가 생성된다.");
});
