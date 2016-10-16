function Letter(value) {
	//store the character value in the letter object
	this.value = value;
	//If the letter is a space, visible defaults to true 
	//otherwise visible defaults to false
	this.visible = (value === ' ');
}

//returns the stored character if it is visible, or _ if not
Letter.prototype.show = function() {
	// ternary operator below. Read as: "if this.visible is true, return this.value, otherwse return"
	return (this.visible) ? this.value : ' _ ';
};

module.exports = Letter;