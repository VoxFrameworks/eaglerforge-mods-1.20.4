ModAPI.require("player");
ModAPI.require("network"); // for fall damage prevention
ModAPI.addEventListener("key", (event) => {
  if (event.key === 35) { // Key code for 'h'
    ModAPI.player.motionY += 1;
      ModAPI.network.sendPacketPlayer({isOnGround: true}); // prevent fall damage
    ModAPI.updateComponent("player");
  }
});
