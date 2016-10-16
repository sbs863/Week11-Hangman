var wordPicker = function() {

	var wordList = ["close", "click", "copy", "cut", "command", "database", "delete", "digital", "file", "find", "font", "format", "graphic", "icon", "hardware", "input", "interactive", "Internet", "keyboard", "help", "memory", "menu", "modem", "mouse", "multimedia", "network", "numeric", "open", "output", "paste", "peripheral", "printer", "processing", "replace", "save", "scanner", "search", "select", "software", "text", "string", "integer", "boolean"];

 var test = wordList[Math.floor(Math.random()*wordList.length)];

return test;
};

var value = wordPicker();

module.exports = value;

