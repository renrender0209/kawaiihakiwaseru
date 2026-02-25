//============================================================================
// _org_ChangeMenu.js
//============================================================================

/*:
 * @plugindesc 
 * @author Palsonic
 *
 * @help 
 */

/*:ja
 * @plugindesc 「いちにちいちぜんいちでこぴん」用メニュー変更
 * @author Palsonic
 * @help rpg_windows.jsをオーバーライトしてるだけ
 */

(function() {
	// オプションから常時ダッシュとコマンド記憶削除
	Window_Options.prototype.makeCommandList = function() {
		//this.addGeneralOptions();
		this.addVolumeOptions();
	};

	// オプションにコモンイベント追加
	// 順番も入れ替える
	Window_MenuCommand.prototype.makeCommandList = function() {
		this.addOriginalCommands();
		this.addMainCommands();
		this.addFormationCommand();
		//this.addOriginalCommands();
		//this.addOptionsCommand();
		this.addSaveCommand();
		this.addGameEndCommand();
	};

	// オリジナルメニューに追加
	Window_MenuCommand.prototype.addOriginalCommands = function() {
		this.addCommand("『過去』に戻る", 'deko_backday', this.isSaveEnabled()); // セーブ依存
		// オプション
		if( $gameSwitches.value(62) ) {
			this.addCommand("クリア特典", 'deko_option1', this.isSaveEnabled()); // セーブ依存
		}
	};


	// 実行時の動作
	var Deko_OrgMenuCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		Deko_OrgMenuCommandWindow.call(this);

		// コモンイベント49
		this._commandWindow.setHandler('deko_backday', function(){
			SceneManager.pop();
			$gameTemp.reserveCommonEvent(49);
		});
		// コモンイベント89
		this._commandWindow.setHandler('deko_option1', function(){
			SceneManager.pop();
			$gameTemp.reserveCommonEvent(89);
		});

	}

	// 「rpg_windows.js」の行数も変更
	Window_Message.prototype.numVisibleRows = function() {
		// エンド表示中なら11行表示
		if( $gameSwitches.value(64) ) {
		    return 11;
		}
		else {
		    return 4;
		}
	};


})();

