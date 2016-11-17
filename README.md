# GridMaker
GridMaker is a JavaScript layout library. It displays images in dinamic vertical colummns. It's responsive and automatically size to fit the window when it's resized. And what it's better, **it's easy** to use, and configurable.

## Start!
- Include GridSystem.js and GridSystem.css. **NOTE:** for now, also you require add [jQuery library] (https://jquery.com/).
- In your JS code define a new GridSystem. You have to pass like string params the ID of the wrapper div, the CLASS of the blocks to order, and the number of rows you want to make. 
```
var youGridName = new GridSystem (WrapperID_string, BlockCLASS_string, numberOfRows_number);
yourGridName.start();
```
- You can make as many grids system you want in your page. For example:
```
var youGridName1 = new GridSystem (WrapperID_string, BlockCLASS_string, numberOfRows_number);
yourGridName1.start();
.
.
.
var youGridNameN = new GridSystem (WrapperIDN_string, BlockCLASSN_string, numberOfRowsN_number);
yourGridNameN.start();
```
4- Wala!

## Configure 
You can make modifications in the GridSystem.css. Maybe you prefer another padding o margin, or maybe do you prefer more columns. Now this system it's configure to accept 5 rows. But it's easy, just see how the code work and configure it!

For responsive, viewPorts you have to configure it in the function ** checkResize() ** of the GridSystem.js, it's the unique configuration that you have to change modifying the js file.
