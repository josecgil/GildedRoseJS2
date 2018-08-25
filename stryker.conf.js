module.exports = function(config) {
  config.set({
    testRunner: "jasmine",
    mutator: "javascript",
    transpilers: [],
    reporters: ["html", "clear-text", "progress"],
    packageManager: "npm",
    testFramework: "jasmine",
    coverageAnalysis: "perTest",
    jasmineConfigFile: "spec/support/jasmine.json",
    mutate: ["src/**/*.js"],
    files:['src/**/*.js', 'spec/**/*.*']
  });
};
