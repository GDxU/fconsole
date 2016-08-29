# FConsole
FConsole is a bunch* of useful debug tools for speeding up development process.

*Inspired by [Flash-Console](https://github.com/junkbyte/flash-console)*

### **[Demo](https://flashist.github.io/fexamples/) | [Demo Source](https://github.com/flashist/fexamples)**

# Features

## Display List Inspector

### Hierarchy
![Display List Inspector - Hierarchy](https://github.com/flashist/flashist.github.io/blob/master/fexamples/images/demo/display-list-inspecotr_hierarchy-1.gif?raw=true)

####How to:
1. Open the console by inputting a password (default is **`**). In the [demo](https://flashist.github.io/fexamples/) the console is shown from the beginning.
2. Click on the **DL** button.
3. Move cursor above some visual elements.

### Properties Editing
![Display List Inspector - Editing](https://github.com/flashist/flashist.github.io/blob/master/fexamples/images/demo/%20display-list-inspector_editing-1.gif?raw=true)

####How to:
1. Assing a capture key to the Display List popup (click to the **Capture key** button and press a key).
2. Move cursor above some visual elements.
3. Press the assinged key (see #1).
4. Open Developer Tools Console in browser (for Google Chrome on Mac: CMD + Alt + I, on Win: F12 or Ctrl + Shift + I).
5. Check the display list hierarchy in the console.
6. Expand an object and change it's properties
7. (Optional, Google Chrome) Store an object as a Global Variable from context menu (right click on the object)

# Notes
* Actually, there are only 2 implemented features yet (up to the August 29, 2016): Display List Inspector and Properties Editing. In my opinion, these two are the most useful and important features from [Flash-Console](https://github.com/junkbyte/flash-console) and I wanted to implement them the first. Other features are planned to be implemented.
