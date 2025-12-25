# ACC ProfessorView
To create this extension, I started with the wonderful work done by Joshua Manigault [here](https://github.com/joshuamanigault/ASUProfessorView) to provide this functionality for ASU students.

**See Rate My Professor reviews directly in your Austin Community College class search!**  

This Chrome extension enhances the Austin Community College class catalog by showing professor ratings and reviews from Rate My Professor right where you need them.

![Example screenshot](https://raw.githubusercontent.com/MattRWallace/ACCProfessorView/refs/heads/screenshots/screenshots/Example.png)

---

## Features
- Quickly view professor ratings and reviews while browsing ACC course listings.  
- No need to visit Rate My Professor separately.  
- Works seamlessly on Austin Community Colege's catalog search pages.

---

## Installation

### For Users (Chrome Web Store)
TODO: When published to chrome web store, add link here.

[//]: # (Link to Extension: [Chrome Web Store](https://chromewebstore.google.com/detail/asu-profview/kniajfafepienoohdheheofabfclpgnl))

### For Developers/Contributors
1. **Clone the repository** or **Download the extension files** from this repository.
2. Install dependencies
```
npm install
```  
3. Build the extension
```
npm run build
```
4. Open chrome and go to: `chrome://extensions/` and enable **Developer Mode**.
5. Click **Load unpacked** and select the `dist/` folder from this project.

---

## Notes
- Works on [ACC Catalog](https://www6.austincc.edu/schedule/) pages only.  
- Make sure you refresh the catalog page after installing the extension.  
- Data comes from Rate My Professor.

---


Enjoy faster course planning with integrated professor reviews!
