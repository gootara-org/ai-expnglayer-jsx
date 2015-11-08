ai-expnglayer-jsx
=================
最上位レイヤーを個別に PNG に出力する、Adobe Illustrator 用の JavaScript 製 ExtendScript です。

![Settings](https://raw.githubusercontent.com/gootara-org/ai-expnglayer-jsx/master/images/settings_ja.png "Settings")


動作環境：
----------------
Adobe Illustrator CC 2015  
(動作確認は 2015 で行っていますが、2014 や後期の CSx でも動作すると思います)


インストール：
----------------
「ファイル」メニューの「スクリプト」に追加する場合は、プリセットフォルダにインストールするのがお手軽です。

1. プリセットの「スクリプト」フォルダに「レイヤー毎に PNG として保存(&L).jsx」をコピーします。

    + Windows の場合  
      `C:\Program Files\Adobe\Adobe Illustrator CC 2015\Presets\ja_JP\スクリプト\`
    + Mac の場合  
      `/Applications/Adobe Illustrator CC 2015/Presets.localized/ja_JP/スクリプト/`


2. Illustrator を再起動します。

「その他のスクリプト」から直接実行しても構いません。


使い方：
----------------
1. 「ファイル」メニューから「スクリプト」＞「レイヤー毎に PNG として保存」を選択します。

2. オプションを設定して、「生成」ボタンを押下します。  

    ![Settings](https://raw.githubusercontent.com/gootara-org/ai-expnglayer-jsx/master/images/settings_ja.png "Settings")


補足：
----------------
  + スクリプトのファイル名に `(&L)` のようにメニューキーを含めておくと、Windows 環境であれば
   「ALT→F→R→L」の順番にキーを押すことでも、スクリプトを実行できます。  
  （ショートカットキーを割り当てられないが故の苦肉の策です。Mac では ScriptKeyAi 等をどうぞ）

  + 保存先のデフォルトは、処理対象ドキュメントが保存されているフォルダです。

  + ファイル名にはレイヤー名がそのまま使われますので、同名のレイヤー名は避けてください。

  + レイヤーのロック／アンロックで、出力する／しないを簡単に指定できます。  

    例えば、以下のような場合は、`text` と `base` はロックされているので出力されず、
    `pageN` は順番に出力されます。

    ![Layers](https://raw.githubusercontent.com/gootara-org/ai-expnglayer-jsx/master/images/layers.png "Layers")

    （但し、`ロックされたレイヤーを含める` をオンにすると、常に全ての最上位レイヤーを出力します）

  + 出力後は、レイヤーの表示／非表示は元の状態に戻ります。

  + `アートボードサイズでクリップ` がオンの場合は、アクティブなアートボードのみが出力されます。
    アートボードが複数ある場合は、ご注意ください。


おまけ：  
----------------
  + `現在の表示を PNG として保存(&P).jsx` は、現在表示されているアクティブなアートボードを
    そのまま出力するだけの、おまけスクリプトです。

更新履歴：
----------------
2015/11/09
  + オプションにマットを追加。
  + 「ロックされたレイヤーを含める」がオフの場合は、ロックされたレイヤーの表示／非表示を切り替えないように変更しました。  
    これにより、表示されているロックされたレイヤーを、背景（または前景）として出力することが可能です。  
    ロックされたレイヤーを出力に含めたくない場合は、予め非表示にしておいてください。
