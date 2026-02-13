var modInfo = {
    name: "Simple Xray",
    version: "1.0.0",
    author: "voxframeworks"
};

// List of Block IDs to KEEP VISIBLE (The Ores)
// You can add more IDs here if needed.
var oreIDs = [
    14, // Gold Ore
    15, // Iron Ore
    16, // Coal Ore
    21, // Lapis Ore
    56, // Diamond Ore
    73, // Redstone Ore (Active)
    74, // Redstone Ore (Inactive)
    129,// Emerald Ore
    153 // Quartz Ore
];

var xrayEnabled = false;

// This function runs when the game loads
function onLoad() {
    // 1. Register a Keybind (Default: X Key)
    ModAPI.keybinds.registerKeybind("key.xray.toggle", "X", "key.categories.misc");

    // 2. Listen for the key press
    ModAPI.addEventListener("keypressed", function(e) {
        if (e.key === "key.xray.toggle") {
            xrayEnabled = !xrayEnabled;
            
            // Send a message to chat to confirm toggle
            var status = xrayEnabled ? "§aON" : "§cOFF";
            ModAPI.displayToChat("§6[Xray] Status: " + status);
        }
    });

    // 3. Get the Block Class
    // In EaglercraftX, the class is usually global or accessible via ModAPI
    var Block = (typeof Block !== "undefined") ? Block : ModAPI.blocks.Block;

    // 4. Save the original function so we don't break the game when toggled off
    var originalRender = Block.prototype.shouldSideBeRendered;

    // 5. Override the function
    Block.prototype.shouldSideBeRendered = function(world, pos, side) {
        // Check if Xray is enabled
        if (xrayEnabled) {
            // Get the ID of the block currently being checked
            var id = Block.getIdFromBlock(this);

            // If this block is an ORE, return true (RENDER IT)
            if (oreIDs.indexOf(id) !== -1) {
                return true;
            }

            // If this block is NOT an ore, return false (MAKE IT INVISIBLE)
            return false;
        }

        // If Xray is disabled, use the original game logic
        return originalRender.call(this, world, pos, side);
    };
}
