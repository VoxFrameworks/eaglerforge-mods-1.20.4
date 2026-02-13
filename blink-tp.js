ModAPI.require("player");

ModAPI.addEventListener("key", (e) => {
  if (e.key === 35) { // H
    var p = ModAPI.player;
    var distance = 20;

    // Convert rotation degrees to radians
    var yawRad = p.rotationYaw * (Math.PI / 180);
    var pitchRad = p.rotationPitch * (Math.PI / 180);

    // Calculate the direction vector
    var dx = -Math.sin(yawRad) * Math.cos(pitchRad);
    var dy = -Math.sin(pitchRad);
    var dz = Math.cos(yawRad) * Math.cos(pitchRad);

    // Apply distance
    dx *= distance;
    dy *= distance;
    dz *= distance;

    // Teleport
    p.x += dx;
    p.y += dy;
    p.z += dz;

    // Prevent fall damage from the teleport
    p.fallDistance = 0;
  }
});
