require("fs").copyFileSync(
  require("path").resolve(
    __dirname,
    "../workspace/oms-monitor-fe/public/Bue/Bue.min.js"
  ),
  "./Bue.min.js"
);
