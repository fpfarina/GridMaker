# GridMaker - by Fepi
GridMaker is very simple JavaScript layout library. It displays images in dinamic vertical colummns. It's responsive and automatically size to fit the window when the user resize it. And what it's better, **it's easy** to use!!

## Start!
- Include GridSystem.js and GridSystem.css in your html. **NOTE:** for now, it's required [jQuery library] (https://jquery.com/).
- In your JS code define a new GridSystem. 

```
var youGridName = new GridSystem (WrapperID_string, BlockCLASS_string, numberOfRows_number);
yourGridName.start();
```
>**WrapperID** -> It's the div where the GridSystem will work. (Pass the name as STRING)
>**BlockCLASS** -> All the block you wanna to automatically order in the grid system, must have the same class name. (Pass the name as STRING)
>**Number of Rows** -> It's the number of rows. (NUMBER)

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
You can make modifications in the GridSystem.css. Maybe you prefer another padding o margin, or maybe do you prefer more columns. Now this system it's configured to accept a maximum of 5 rows. But it's easy, just see how the code works and reconfigure it!

To configure the resize width you have to modify the values of the function ** checkResize() ** of the GridSystem.js, it's the unique configuration that you have to modify in the js file.
