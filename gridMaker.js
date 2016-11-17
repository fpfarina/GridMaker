(function (jQuery, window, fn) {
    "use strict"
    fn(jQuery, window);
})(jQuery, window, function ($, window) {

    "use strict";

    var GridMaker = function (wrapper, blockName, rows) {
        this.wrapper = $('#' + wrapper); //the parent div of all imgs
        this.rows = rows; //how many rows have layout
        this.actualRows = rows; //actual visible rows
        this.images = this.wrapper.find('.' + blockName); //images-items
        this.imagesLength = this.images.length; //number of images
        this.row = []; //row control
        this.rendering = false;
        this.blockName = blockName;
    }

    /* LOGIC*/
    var _ = new function () {
        var _ = this;

        _.delay = restArgs(function(func, wait, args) {
            return setTimeout(function() {
                return func.apply(null, args);
            }, wait);
        });
        function restArgs(func, startIndex) {
            startIndex = startIndex == null ? func.length - 1 : +startIndex;
            return function() {
            var length = Math.max(arguments.length - startIndex, 0),
                rest = Array(length),
                index = 0;
            for (; index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
            switch (startIndex) {
                case 0: return func.call(this, rest);
                case 1: return func.call(this, arguments[0], rest);
                case 2: return func.call(this, arguments[0], arguments[1], rest);
            }
            var args = Array(startIndex + 1);
            for (index = 0; index < startIndex; index++) {
                args[index] = arguments[index];
            }
            args[startIndex] = rest;
            return func.apply(this, args);
            };
        }
        _.debounce = function(func, wait, immediate) {
            var timeout, result;

            var later = function(context, args) {
                timeout = null;
                if (args) result = func.apply(context, args);
            };

            var debounced = restArgs(function(args) {
                if (timeout) clearTimeout(timeout);
                if (immediate) {
                    var callNow = !timeout;
                    timeout = setTimeout(later, wait);
                    if (callNow) result = func.apply(this, args);
                } else {
                    timeout = _.delay(later, wait, this, args);
                }

                return result;
            });

            debounced.cancel = function() {
                clearTimeout(timeout);
                timeout = null;
            };

            return debounced;
        }
    }

    var fn = GridMaker.prototype;

    fn.start = function() {

        var self = this;
        var deck = 0;    
        var renderTime = 20;
        rowCalculator();
        makeDeck(true);
        $(window).resize(_.debounce(checkResize,200)); //external library
        var renderTimer = null;

        function checkResize() {
            if (!self.rendering) {
                rowCalculator();
                makeDeck();
            }
        }

        function render() {
            if (deck == self.imagesLength) {
                self.rendering = false;
                var finalCode = "";
                for (var i = 0; i < self.actualRows; i++) {
                    finalCode += self.row[i].img += "</div>";
                }
                self.wrapper.html(finalCode);
            } else {
                renderTimer = setTimeout(render, renderTime);
            }
        }

        function checkMinus() {
            var minus = 0;
            var tope = self.actualRows - 1;
            for (var i = 0; i < tope ; i++) {
                if (self.row[minus].height > self.row[i + 1].height) {
                    minus = i + 1;
                }
            }
            return minus;
        }

        function secondStep($block, width, height) {
            var minus = checkMinus();
            self.row[minus].img += $block[0].outerHTML;
            self.row[minus].height += height / width * 100;
            deck++;
        };

        /* falta hacerlo configurable y dinámico */
        function rowCalculator() {
            var windowWidth = $(window).width(),
                temp,
                tempImg;

            if (windowWidth > 960) {
                self.actualRows = 4;
            }
            else {
                if (windowWidth > 500) {
                    self.actualRows = 3;
                } else {
                    if (windowWidth > 350) {
                        self.actualRows = 2;
                    } else {
                        self.actualRows = 1;
                    }
                }
            }
            
            for (var i=1; i <= 4; i++) {
                self.wrapper.removeClass("row-" + i);
            }
            self.wrapper.addClass("row-" + self.actualRows);
        };

        /* get image Height and Width before be loaded */
        function getImageSize(img, block) {
            var $img = img[0];

            var wait = setInterval(function($img, block) {
                var w = $img.naturalWidth,
                    h = $img.naturalHeight;
                if (w && h) {
                    clearInterval(wait);
                    secondStep(block, w, h);
                }
            }($img, block), 0);
        }

        function makeDeck (firstTime) {

            if (firstTime) {
                self.wrapper.addClass("grid-system-container");
            } else {
                self.images = self.wrapper.find('.' + self.blockName);
            }

            var i,
                temp, 
                tempImg;

            self.rendering = true;
            renderTimer = setTimeout(render, renderTime);
            //self.wrapper.detach(); //take out of DOM!!
            self.row = [];
            deck = 0;
            for (i = 0; i < self.actualRows; i++) {
                self.row.push({
                    height: 0,
                    img: '<div class="grid-row" id="row' + i + '">'
                });
            }

            for (i = 0; i < self.imagesLength; i++) {
                temp = self.images.eq(i);
                tempImg = temp.find("img");

                if (firstTime) {
                    getImageSize(tempImg, temp);
                } else {
                var $img = tempImg[0];
                var w = $img.naturalWidth,
                    h = $img.naturalHeight;
                    secondStep(temp, w, h);
                }
            }
        }
    }

    window.GridMaker = GridMaker;
});