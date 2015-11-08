#target illustrator

(function(){
	var resources = {
		dialogTitle : "レイヤー毎に PNG として保存"
	,	includeLocked : "ロックされたレイヤーを含める"
	,	artBoardClipping : "アートボードサイズでクリップ"
	,	transparency : "透明部分"
	,	matte : "マット"
	,	choose : "選択..."
	,	dpi : "DPI"
	,	saveTo : "保存先"
	,	generate : "生成"
	,	cancel : "キャンセル"
	,	information : "情報"
	, infoFinishExport : "エクスポートが完了しました。"
	,	error : "エラー"
	,	errorNotExists : "存在するフォルダを選択してください"
	, errorNotOpened : "ファイルが開かれていません。"
	};

	function showSettings(defaultFolder) {
		var dialog = new Window("dialog", resources.dialogTitle, [0, 0, 400, 240]);
		var y = 20;

		dialog.includeLocked = dialog.add("checkbox", [20, y, 380, y+=30], resources.includeLocked);
		dialog.artBoardClipping = dialog.add("checkbox", [20, y, 380, y+=30], resources.artBoardClipping);
		dialog.artBoardClipping.value = true;

		dialog.transparency = dialog.add("checkbox", [20, y, 150, y+30], resources.transparency);
		dialog.transparency.value = true;
		dialog.transparency.onClick = function() {
			dialog.matte.enabled = !dialog.transparency.value;
			dialog.matte.onClick();
		}
		dialog.matte = dialog.add("checkbox", [160, y, 222, y+30], resources.matte);
		dialog.matte.value = true;
		dialog.matte.enabled = false;
		dialog.matte.onClick = function() {
			dialog.matteRGB.enabled = !dialog.transparency.value && dialog.matte.value;
			dialog.matteRGB.onChanging();
		}
		dialog.matteRGB = dialog.add("edittext", [230, y-8, 300, y+22], "ffffff");
		dialog.matteRGB.enabled = false;
		dialog.matteRGB.onChanging = function() {
			dialog.matteRGBColor.enabled = dialog.matteRGB.enabled;
			if (!dialog.matteRGBColor.enabled) { return; }
			var rgb = (dialog.matteRGB.text + "ffffff").substring(0,6);
			if (isNaN(parseInt(rgb))) {
				rgb = "ffffff";
			}
			var g = dialog.matteRGBColor.graphics;
			g.backgroundColor = g.newBrush(g.BrushType.SOLID_COLOR
			, [
					parseInt(rgb.substring(0, 2), 16) / 255
				, parseInt(rgb.substring(2, 4), 16) / 255
				, parseInt(rgb.substring(4, 6), 16) / 255
				, 1
				]
			);
		}
		dialog.matteRGBColor = dialog.add("panel", [308, y-8, 380, y+22], "", { borderStyle: "sunken" });

		y += 26;
		dialog.dpiLabel = dialog.add("statictext", [180, y, 222, y+30], resources.dpi)
		dialog.dpi = dialog.add("edittext", [230, y, 300, y+30], "72");

		y += 34;
		dialog.folderLabel = dialog.add("statictext", [20, y, 72, y+30], resources.saveTo)
		dialog.folderLabel.justify = "right";
		dialog.folder = dialog.add("edittext", [80, y, 300, y+30], defaultFolder.fullName);
		dialog.folderBtn = dialog.add("button", [308, y, 380, y+30], resources.choose);
		dialog.folderBtn.onClick = function() {
			if (!dialog.active) { return; }
			var folder = new Folder(dialog.folder.text);
			folder = folder.selectDlg();
			if(folder) {
				dialog.folder.text = folder.fullName;
			}
		}

		y = dialog.bounds.bottom - 50;
		dialog.okBtn = dialog.add("button", [80, y, 180, y+30], resources.generate, { name: "ok" });
		dialog.okBtn.onClick = function() {
			if (!dialog.active) { return; }
			var folder = new Folder(dialog.folder.text);
			if (!folder.exists) {
				alert(resources.errorNotExists + " [" + folder.fullName + "]", resources.error, true);
				return;
			}
			dialog.close(1);
		}
		dialog.cancelBtn = dialog.add("button", [220, y, 320, y+30], resources.cancel, { name: "cancel" });
		dialog.cancelBtn.onClick = function() {
			dialog.close(0);
		}

		dialog.center();
		if (dialog.show() != 1) {
			return null;
		}

		var rgb = (dialog.matteRGB.text + "ffffff").substring(0,6);
		if (isNaN(parseInt(rgb))) {
			rgb = "ffffff";
		}
		var matteColor = new RGBColor();
		matteColor.red = parseInt(rgb.substring(0, 2), 16);
		matteColor.green = parseInt(rgb.substring(2, 4), 16);
		matteColor.blue = parseInt(rgb.substring(4, 6), 16);
		return {
			folder : new Folder(dialog.folder.text)
		,	includeLocked : dialog.includeLocked.value
		,	artBoardClipping : dialog.artBoardClipping.value
		,	transparency : dialog.transparency.value
		,	dpi : parseInt(dialog.dpi.text)
		, matte : dialog.matte.value
		, matteColor : matteColor
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
		options.matte = settings.matte;
		options.matteColor = settings.matteColor;
		options.verticalScale	= scale;
		options.horizontalScale  = scale;

		var visibilities = [];
		var file, i;
		for (i = 0; i < document.layers.length; i++) {
			visibilities[i] = document.layers[i].visible;
			if (!settings.includeLocked && document.layers[i].locked) { continue; }
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
			if (!settings.includeLocked && document.layers[i].locked) { continue; }
			document.layers[i].visible = visibilities[i];
		}

		alert(resources.infoFinishExport, resources.information);
	}

	try {
		if (app.documents.length > 0 ) {
			main(app.activeDocument);
		} else {
			throw new Error(resources.errorNotOpened);
		}
	} catch(e) {
		alert(e.message, resources.error, true);
	}
})();
