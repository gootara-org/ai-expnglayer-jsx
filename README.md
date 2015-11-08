ai-expnglayer-jsx
=================
Adobe Illustrator JavaScript ExtendScript for exporting top-level layers to multiple PNG files.

![Settings](https://raw.githubusercontent.com/gootara-org/ai-expnglayer-jsx/master/images/settings.png "Settings")


PREREQUISITES:
----------------
Adobe Illustrator CC 2015  
(I checked with 2015, but maybe 2014 and some CSx are also available.)


INSTALL:
----------------
To add menu item in `File` > `Scripts`, install this script to the appropriate folder.

1. Copy `Export Top-Level Layers to PNG.jsx` script to `Presets` Folder.

    + Windows  
      `C:\Program Files\Adobe\Adobe Illustrator CC 2015\Presets\en_US\Scripts\`
    + Mac  
      `/Applications/Adobe Illustrator CC 2015/Presets.localized/en_US/Scripts/`


2. Restart Illustrator.

A script could also be executed by `Other Script...` menu directly.


USAGE:
----------------
1. Choose `File` > `Scripts` > `Export Top-Level Layers to PNG` menu item.

2. Set options, and press `Generate` button.  

    ![Settings](https://raw.githubusercontent.com/gootara-org/ai-expnglayer-jsx/master/images/settings.png "Settings")


DETAILS:
----------------
  + When the script file name include the Menu key, such as `(&L)`,
    you can also execute a script by pressing keys in the order of `ALT > F > R > L`
    under the Microsft Windows platform.  
    (It's not effective on Mac.)

  + By default, the output folder is where the target document is.

  + It's better to avoid duplicated layer name, because the output file will be named by the layer name.

  + It's easy to switch output or not by lock or unlock layers.

    For example, in the case such as the following, `text` and `base` layer will not be output
    because it is locked, on the other hand `pageN` layers will be output in order.

    ![Layers](https://raw.githubusercontent.com/gootara-org/ai-expnglayer-jsx/master/images/layers.png "Layers")

    (However, all of the top-level layers will be output when `Include Locked Layers` is checked.)

  + The layer visibilities will be restored to it's original state after executed.

  + Only active Artboard will be output when `Clip to Artboard` is checked.


APPENDEX:
----------------
  + `Export Current Document to PNG.jsx` is simple script for exporting current active Artboard to a PNG file.


CHANGE LOG:
----------------
2015/11/09
  + Add matte option.
  + The locked layer's visibility will not be changed when `Include Locked Layers` turned off.
    As a result, the locked layers could be output as background.
    If you don't need to output locked layers, hide layers before generating.
