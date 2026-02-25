// 参考URL
// マウスの座標を変数に代入する方法
// (トリアコンタンさん、ありがとうございます)
// https://tm.lucky-duet.com/viewtopic.php?t=3213
(function() {
	'use strict';
	var _TouchInput__onMouseMove = TouchInput._onMouseMove;
	TouchInput._onMouseMove = function(event) {
		_TouchInput__onMouseMove.apply(this, arguments);
		this.mouseX = Graphics.pageToCanvasX(event.pageX);
		this.mouseY = Graphics.pageToCanvasY(event.pageY);
	};


})();

