ModAPI.require("player");
ModAPI.addEventListener("key", (event) => {
  if (event.key === 35) { // Key code for 'h'
    ModAPI.player.motionY += 1;
    ModAPI.updateComponent("player");
  }
});
