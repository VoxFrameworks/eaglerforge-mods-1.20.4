ModAPI.require("player");

// --- CONFIGURATION ---
var boostPower = 0.8; // How strong the boost is (Mace level)
var passiveMace = true; // Keep the passive bounce on landing?
// ---------------------

var isBoosting = false; // Tracks if you are currently moving up from a boost
var lastOnGround = true;
var fallStartY = 0;

// 1. PASSIVE MACE BOUNCE (Optional - keeps the previous feature)
if (passiveMace) {
    ModAPI.addEventListener("update", () => {
        var player = ModAPI.player;
        
        if (!player.onGround && lastOnGround) {
            fallStartY = player.y;
        }
        
        if (player.onGround && !lastOnGround) {
            var fallDistance = fallStartY - player.y;
            if (fallDistance > 3) {
                var bounceVelocity = Math.min(fallDistance * 0.8, 3.0);
                player.motionY = bounceVelocity;
            }
        }
        lastOnGround = player.onGround;
    });
}

// 2. ACTIVE BOOST LOGIC (Shift + Jump)
ModAPI.addEventListener("update", () => {
    // COOLDOWN CHECK:
    // If we start falling (velocity becomes negative), the boost is finished and we are ready again
    if (ModAPI.player.motionY < 0) {
        isBoosting = false;
    }
});

ModAPI.addEventListener("key", (e) => {
    var player = ModAPI.player;
    
    // 57 is Spacebar
    if (e.key === 57) {
        
        // CONDITIONS:
        // 1. Must be in the air (!onGround)
        // 2. Must be holding Shift (isSneaking)
        // 3. Must NOT be currently boosting (!isBoosting) - this enforces the cooldown
        if (!player.onGround && player.isSneaking && !isBoosting) {
            
            // Apply the boost
            player.motionY = boostPower;
            
            // Lock the boost so you can't spam it until you fall
            isBoosting = true;
        }
    }
});
