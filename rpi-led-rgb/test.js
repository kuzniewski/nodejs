
var pinRed = 18;
var pinBlue = 24;
var pinGreen = 23;

var LedRGB = require(__dirname + '/ledRGB.js');
var led = new LedRGB(pinRed, pinGreen, pinBlue);

led.red(1000);
//led.green(1000);
//led.blue(1000);

//led.redPulse(0, 10, 1);
//led.greenPulse(0, 10, 1);
//led.bluePulse(0, 10, 1);
//led.purplePulse(0, 10, 1);
//led.yellowPulse(0, 10, 1);