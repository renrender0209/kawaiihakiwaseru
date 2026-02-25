//============================================================================
// _org_CoreFix_GraphicRender.js
//============================================================================

/*:
 * @plugindesc 
 * @author Palsonic
 *
 * @help 
 */

/*:ja
 * @plugindesc Graphic.renderの仮修正
 * @author Palsonic
 * @help this._skipCountが負になった時にmaxSkipに変更
 */

(function() {

/**
 * Renders the stage to the game screen.
 *
 * @static
 * @method render
 * @param {Stage} stage The stage object to be rendered
 */
Graphics.render = function(stage) {
    if (this._skipCount === 0) {
        var startTime = Date.now();
        if (stage) {
            this._renderer.render(stage);
            if (this._renderer.gl && this._renderer.gl.flush) {
                this._renderer.gl.flush();
            }
        }
        var endTime = Date.now();
        var elapsed = endTime - startTime;
        this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
        if(this._skipCount < 0) { this._skipCount = this._maxSkip; } // add
        this._rendered = true;
    } else {
        this._skipCount--;
        this._rendered = false;
    }
    this.frameCount++;
};


})();

