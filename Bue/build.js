var path = require("path");
var fs = require("fs");
let sourceFolderPath = "./dbx" + "lovejs1";
var pathName = path.resolve(__dirname, sourceFolderPath);
fs.readdir(pathName, function (err, files) {
  let newStr = files
    .map(
      file =>
        ";(function(){" +
        fs
          .readFileSync(path.resolve(__dirname, sourceFolderPath) + "/" + file)
          .toString() +
        "})();"
    )
    .join("");
  newStr = ";(function(){\nlet _BUE_PRODUCTION_MODE=true;" + newStr + "})()\n";
  fs.writeFileSync(path.resolve(__dirname, "./Bue.min.js"), newStr);
  Bue.doNothing("buile success!");
});
