const hre = require("hardhat");

async function main() {
  console.log("Deploying SafeSend contract...");

  const SafeSend = await hre.ethers.getContractFactory("SafeSend");
  const safeSend = await SafeSend.deploy();

  await safeSend.waitForDeployment();
  const address = await safeSend.getAddress();

  console.log("SafeSend deployed to:", address);
  
  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await safeSend.deploymentTransaction().wait(5);
  
  console.log("Deployment confirmed!");
  
  // Verify contract on the explorer (if supported)
  try {
    console.log("Verifying contract...");
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [],
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    console.log("Verification failed:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });