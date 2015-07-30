define(function (require) {
  var relativePos = require('../Helpers/relativePos');
  var color = require('../Controls/color');

  return function (event, context) {
    var position = relativePos(event, context.canvas);

    try {
      var data = colorAtPoint(context, position.x, position.y);
    }
    catch (error) {
      if (error instanceof SecurityError) {
        alert('Unable to access your picture\'s pixel data');
        return;
      } else {
        throw error
      }
    }

    //If picture is transparent set color to white
    if (data[3] === 0) {
      data[0] = 255;
      data[1] = 255;
      data[2] = 255;
    }

    var colorStyle = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
    var colorTool = document.getElementById('color');

    context.fillStyle = colorStyle;
    colorTool.value = rgb2Hex(data[0], data[1], data[2]);
  };
});

function colorAtPoint(context, x, y) {
  return context.getImageData(x, y, 1, 1).data;
}

function toHex(string) {
  var hexValue = string.toString(16);
  return (hexValue.length == 1) ? '0' + hexValue : hexValue;
}

function rgb2Hex(r, g, b) {
  var red = toHex(r);
  var green = toHex(g);
  var blue = toHex(b);

  return '#' + red + green + blue;
}