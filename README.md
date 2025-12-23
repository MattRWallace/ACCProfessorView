# TXST ProfessorView
To create this extension, I started with the wonderful work done by Joshua Manigault [here](https://github.com/joshuamanigault/ASUProfessorView) to provide this functionality for ASU students.

**See Rate My Professor reviews directly in your Texas State class search!**  

This Chrome extension enhances the Texas State University class catalog by showing professor ratings and reviews from Rate My Professor right where you need them.

![Example screenshot](https://raw.githubusercontent.com/MattRWallace/TSXTProfessorView/refs/heads/screenshots/screenshots/Example.jpg)

---

## Features
- Quickly view professor ratings and reviews while browsing TXST course listings.  
- No need to visit Rate My Professor separately.  
- Works seamlessly on Texas State’s catalog search pages.

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
- Works on [TXST Catalog](https://reg-prod.ec.txstate.edu/StudentRegistrationSsb/ssb/courseSearch/courseSearch) pages only.  
- Make sure you refresh the catalog page after installing the extension.  
- Data comes from Rate My Professor.

---


Enjoy faster course planning with integrated professor reviews!
