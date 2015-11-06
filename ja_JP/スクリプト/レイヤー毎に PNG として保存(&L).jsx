#target illustrator

(function(){

	function showSettings(defaultFolder) {
		var dialog = new Window("dialog", "レイヤー毎に PNG として保存", [0, 0, 400, 210]);
		
		dialog.includeLocked = dialog.add("checkbox", [20, 20, 380, 50], "ロックされたレイヤーを含める");
		dialog.artBoardClipping = dialog.add("checkbox", [20, 50, 380, 80], "アートボードサイズでクリップ");
		dialog.artBoardClipping.value = true;
		dialog.transparency = dialog.add("checkbox", [20, 80, 190, 110], "透明部分");
		dialog.transparency.value = true;
		dialog.dpiLabel = dialog.add("statictext", [210, 75, 240, 105], "DPI")
		dialog.dpiLabel.justify = "right";
		dialog.dpi = dialog.add("edittext", [250, 75, 312, 105], "72");
		
		dialog.folderLabel = dialog.add("statictext", [20, 110, 64, 140], "保存先")
		dialog.folderLabel.justify = "right";
		dialog.folder = dialog.add("edittext", [72, 110, 312, 140], defaultFolder.fullName);
		dialog.folderBtn = dialog.add("button", [320, 110, 380, 140], "選択...");
		dialog.folderBtn.onClick = function() {
			if (!dialog.active) { return; }
			var folder = new Folder(dialog.folder.text);
			folder = folder.selectDlg();
			if(folder) {
				dialog.folder.text = folder.fullName;
			}
		}
		
		dialog.okBtn = dialog.add("button", [80,160,180,190], "生成", { name: "ok" });
		dialog.okBtn.onClick = function() {
			if (!dialog.active) { return; }
			var folder = new Folder(dialog.folder.text);
			if (!folder.exists) {
				alert("存在するフォルダを選択してください。[" + folder.fullName + "}", "Error", true);
				return;
			}
			dialog.close(1);
		}
		dialog.cancelBtn = dialog.add("button", [220,160,320,190], "キャンセル", { name: "cancel" });
		dialog.cancelBtn.onClick = function() {
			dialog.close(0);
		}
		
		dialog.center();
		if (dialog.show() != 1) {
			return null;
		}
		
		return {
			folder : new Folder(dialog.folder.text)
		,	includeLocked : dialog.includeLocked.value
		,	artBoardClipping : dialog.artBoardClipping.value
		,	transparency : dialog.transparency.value
		,	dpi : parseInt(dialog.dpi.text)
		};
	}

	function main(document){
		if (!document) { return; }

		var settings = showSettings(document.path && document.path.exists ? new Folder(document.path.fullName) : Folder.myDocuments);
		if (!settings) { return; }
		
		var scale = (settings.dpi / 72) * 100;
		var options = new ExportOptionsPNG24();
		options.antiAliasing 	= true;
		options.transparency 	= settings.transparency;
		options.artBoardClipping = settings.artBoardClipping;
		options.verticalScale	= scale;
		options.horizontalScale  = scale;

		var visibilities = [];
		var file, i;
		for (i = 0; i < document.layers.length; i++) {
			visibilities[i] = document.layers[i].visible;
			document.layers[i].visible = false;
		}
		
		for (i = 0; i < document.layers.length; i++) {
			if (!settings.includeLocked && document.layers[i].locked) {
				continue;
			}
			document.layers[i].visible = true;
			file = new File(settings.folder.fullName + "/" + document.layers[i].name + ".png");
			document.exportFile(file, ExportType.PNG24, options);
			$.gc();
			$.sleep(10);
			document.layers[i].visible = false;
		}

		for (i = 0; i < document.layers.length; i++) {
			document.layers[i].visible = visibilities[i];
		}

		alert("エクスポートが完了しました。", "情報");
	}

	try {
		if (app.documents.length > 0 ) {
			main(app.activeDocument);
		} else {
			throw new Error("ファイルが開かれていません。");
		}
	} catch(e) {
		alert(e.message, "Script Error", true);
	}
})();
