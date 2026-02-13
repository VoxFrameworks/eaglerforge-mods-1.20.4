ModAPI.require("player");

// --- CONFIGURATION ---
var maceJumpMultiplier = 0.8; // Bounce height
var flapPower = 0.5;          // How high each mid-air jump is
// ---------------------

var lastOnGround = true;
var fallStartY = 0;

// 1. MACE JUMP LOGIC (Passive)
ModAPI.addEventListener("update", () => {
    var player = ModAPI.player;
    
    // Track when we leave the ground
    if (!player.onGround && lastOnGround) {
        fallStartY = player.y;
    }
    
    // Detect landing to bounce
    if (player.onGround && !lastOnGround) {
        var fallDistance = fallStartY - player.y;
        
        if (fallDistance > 3) {
            var bounceVelocity = Math.min(fallDistance * maceJumpMultiplier, 3.0);
            player.motionY = bounceVelocity;
        }
    }

    lastOnGround = player.onGround;
});

// 2. INFINITY JUMP LOGIC (Spammable)
ModAPI.addEventListener("key", (e) => {
    var player = ModAPI.player;
    
    // 57 is Spacebar
    if (e.key === 57) {
        
        // If you are in the air, launch up!
        if (!player.onGround) {
            player.motionY = flapPower;
        }
    }
});
