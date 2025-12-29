# ACC ProfessorView
To create this extension, I started with the wonderful work done by Joshua Manigault [here](https://github.com/joshuamanigault/ASUProfessorView) to provide this functionality for ASU students.

**See Rate My Professor reviews directly in your Austin Community College class search!**  

This extension enhances the Austin Community College class catalog by showing professor ratings and reviews from Rate My Professor right where you need them. There is a version of this extension for Chrome, Edge and Firefox.

![Example screenshot](https://raw.githubusercontent.com/MattRWallace/ACCProfessorView/refs/heads/screenshots/screenshots/Example.png)

---

## Features
- Quickly view professor ratings and reviews while browsing ACC course listings.  
- No need to visit Rate My Professor separately.  
- Works seamlessly on Austin Community Colege's catalog search pages.

---

## Installation

### For Users (Browser Web Store)
* [Chrome Web Store](https://chromewebstore.google.com/detail/acc-professorview/fceimaapanggcibfdacdnggaofoijfpk)
* [Edge - IN REVIEW]()
* [Firefox - IN REVIEW]()

### For Developers/Contributors
1. **Clone the repository** or **Download the extension files** from this repository.
2. Install dependencies
```
npm install
```  
3. Build the extension
```
turbo build check-types
```
4. Find the dist folder at `extensions/<browser>/dist/` and follow the guidance to load it as a local extension for your target browser:
    * [Chrome](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)
    * [Edge](https://learn.microsoft.com/en-us/microsoft-edge/extensions/getting-started/extension-sideloading)
    * [Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

---

## Notes
- Works on [ACC Catalog](https://www6.austincc.edu/schedule/) pages only.  
- Make sure you refresh the catalog page after installing the extension.  
- Data comes from Rate My Professor.

---


Enjoy faster course planning with integrated professor reviews!
