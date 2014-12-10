// CONTROL LED RGB v1.0
// ÉDSON KUZNIEWSKI - 2014-12-10

var piblaster 	= require('pi-blaster.js');

module.exports = function(r, g, b) {

	this.pinRed 	= r;
	this.pinGreen 	= g;
	this.pinBlue 	= b;

	this.pulseRed;
	this.pulseGreen;
	this.pulseBlue;
	this.pulseYellow;
	this.pulsePurple;

    this.clear = function() {
	    piblaster.setPwm(this.pinRed, 0 / 100);
		piblaster.setPwm(this.pinGreen, 0 / 100);
		piblaster.setPwm(this.pinBlue, 0 / 100);
	    clearTimeout(this.pulseBlue);
	    clearTimeout(this.pulseGreen);
	    clearTimeout(this.pulseRed);
	    clearTimeout(this.pulseYellow);
	    clearTimeout(this.pulsePurple);
	};

	this.red = function(timeout) {
		this.clear();
		piblaster.setPwm(this.pinRed, 1);
		var tmp = this;
		if(timeout > 0) {
			setTimeout(function(){
				piblaster.setPwm(tmp.pinRed, 0);
			}, timeout);
		}
	};

	this.green = function(timeout) {
		this.clear();
		piblaster.setPwm(this.pinGreen, 1);
		var tmp = this;
		if(timeout > 0) {
			setTimeout(function(){
				piblaster.setPwm(tmp.pinGreen, 0);
			}, timeout);
		}
	};

	this.blue = function(timeout) {
		this.clear();
		piblaster.setPwm(this.pinBlue, 1);
		var tmp = this;
		if(timeout > 0) {
			setTimeout(function(){
				piblaster.setPwm(tmp.pinBlue, 0);
			}, timeout);
		}
	};

	this.purple = function(timeout) {
		this.clear();
		piblaster.setPwm(this.pinRed, 1);
		piblaster.setPwm(this.pinBlue, 1);
		var tmp = this;
		if(timeout > 0) {
			setTimeout(function(){
				piblaster.setPwm(tmp.pinRed, 0);
				piblaster.setPwm(tmp.pinBlue, 0);
			}, timeout);
		}
	};

	this.yellow = function(timeout) {
		this.clear();
		piblaster.setPwm(this.pinRed, 1);
		piblaster.setPwm(this.pinGreen, 1);
		var tmp = this;
		if(timeout > 0) {
			setTimeout(function(){
				piblaster.setPwm(tmp.pinRed, 0);
				piblaster.setPwm(tmp.pinGreen, 0);
			}, timeout);
		}
	};

	this.redPulse = function(brightness, timeout, maismenos) {
		var tmp = this;
		this.pulseRed = setTimeout(function(){
			piblaster.setPwm(tmp.pinRed, brightness / 100);
			if(brightness==100) {maismenos=0;}
			if(brightness==0) {maismenos=1;}
			if(maismenos==1){
				tmp.redPulse( (brightness+1), timeout, 1);
			} else {
				tmp.redPulse( (brightness-1), timeout, 0);
			}
		}, timeout);
	};

	this.greenPulse = function(brightness, timeout, maismenos) {
		var tmp = this;
		this.pulseGreen = setTimeout(function(){
			piblaster.setPwm(tmp.pinGreen, brightness / 100);
			if(brightness==100) {maismenos=0;}
			if(brightness==0) {maismenos=1;}
			if(maismenos==1){
				tmp.greenPulse( (brightness+1), timeout, 1);
			} else {
				tmp.greenPulse( (brightness-1), timeout, 0);
			}
		}, timeout);
	};

	this.bluePulse = function(brightness, timeout, maismenos) {
		var tmp = this;
		this.pulseBlue = setTimeout(function(){
			piblaster.setPwm(tmp.pinBlue, brightness / 100);
			if(brightness==100) {maismenos=0;}
			if(brightness==0) {maismenos=1;}
			if(maismenos==1){
				tmp.bluePulse( (brightness+1), timeout, 1);
			} else {
				tmp.bluePulse( (brightness-1), timeout, 0);
			}
		}, timeout);
	};

	this.purplePulse = function(brightness, timeout, maismenos) {
		var tmp = this;
		this.pulsePurple = setTimeout(function(){
			piblaster.setPwm(tmp.pinRed, brightness / 100);
			piblaster.setPwm(tmp.pinBlue, brightness / 100);
			if(brightness==100) {maismenos=0;}
			if(brightness==0) {maismenos=1;}
			if(maismenos==1){
				tmp.purplePulse( (brightness+1), timeout, 1);
			} else {
				tmp.purplePulse( (brightness-1), timeout, 0);
			}
		}, timeout);
	};

	this.yellowPulse = function(brightness, timeout, maismenos) {
		var tmp = this;
		this.pulseYellow = setTimeout(function(){
			piblaster.setPwm(tmp.pinRed, brightness / 100);
			piblaster.setPwm(tmp.pinGreen, (brightness-15) / 100);
			if(brightness==100) {maismenos=0;}
			if(brightness==0) {maismenos=1;}
			if(maismenos==1){
				tmp.yellowPulse( (brightness+1), timeout, 1);
			} else {
				tmp.yellowPulse( (brightness-1), timeout, 0);
			}
		}, timeout);
	};

};