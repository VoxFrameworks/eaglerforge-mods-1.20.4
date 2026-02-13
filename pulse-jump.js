ModAPI.require("player");
ModAPI.require("network");

var safeTimer = 0; // This tracks how long safety is active

// 1. TRIGGER THE JUMP
ModAPI.addEventListener("key", (event) => {
  if (event.key === 35) { // H
    ModAPI.player.motionY += 1; 
    
    safeTimer = 70;
  }
});

// 2. NOFALL LOOP (Your exact logic)
ModAPI.addEventListener("update", () => {
  
  // Only do this while the timer is running
  if (safeTimer > 0) {
    safeTimer--; // Count down

    // YOUR EXACT LOGIC:
    if (ModAPI.player.fallDistance > 2.0) {
      ModAPI.network.sendPacketPlayer({
        isOnGround: true
      });
    }
  }
});
