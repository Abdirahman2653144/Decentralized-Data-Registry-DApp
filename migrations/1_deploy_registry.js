const Registry = artifacts.require("Directory");

module.exports = function (deployer) {
    deployer.deploy(Registry);
};