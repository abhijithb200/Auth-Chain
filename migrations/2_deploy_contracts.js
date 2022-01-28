const TwoFA = artifacts.require("TwoFA");

module.exports = function(deployer) {
  deployer.deploy(TwoFA);
};
