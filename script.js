import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 600;
const SPEED = 250;
const GRAVITY = 1600;


kaboom();

loadSprite("background", "./assets/game_background/bg.png");
loadSprite("wizard", "assets/wizard.png", {
	// The image contains 9 frames layed out horizontally, slice it into individual frames
	sliceX: 8,
    sliceY: 4,
	anims: {
        "attack": {
            // Starts from frame 0, ends at frame 3
			from: 0,
			to: 4,
			// Frame per second
			speed: 10,
			loop: true,
        },
		"idle": {
			// Starts from frame 0, ends at frame 3
			from: 16,
			to: 21,
			// Frame per second
			speed: 7,
			loop: true,
		},
		"run": {
			from: 24,
			to: 31,
			speed: 7,
			loop: true,
		},
        "hurt": {
			from: 6,
			to: 7,
			speed: 10,
			loop: true,
		},
        "death": {
			from: 8,
			to: 11,
			speed: 5,
			loop: true,
		},
	},
})
loadSprite("skeleton", "assets/skeleton.png",{
    sliceX: 8,
    sliceY: 4,
    anims: {
        "idle": {
            from: 16,
			to: 22,
			speed: 5,
			loop: true,
        },
        "walk": {
            from: 8,
			to: 11,
			speed: 5,
			loop: true,
        },
        "attack": {
            from: 0,
			to: 6,
			speed: 7,
			loop: true,
        },
        "hurt": {
            from: 11,
			to: 13,
			speed: 5,
			loop: true,
        },
        "death": {
            from: 8,
			to: 10,
			speed: 5,
			loop: true,
        },
    }
});
scene("start", () => {
    setGravity(GRAVITY);
    const bg = add([
        sprite("background", { width: width(), height: height()}),
        pos(0, 0),
    ]);
    const player = add([
        sprite("wizard"),
        pos(80,height()-170),
        area({scale: 0.5}),
        body(),
        anchor("bot")
    ]);
    add([
        rect(100, 20),
        pos(200, height()-150),
        area(),
        body({isStatic: true})
    ])
    add([
        rect(100, 20),
        pos(300, height()-250),
        area(),
        body({isStatic: true})
    ])
    add([
        rect(100, 20),
        pos(400, height()-350),
        area(),
        body({isStatic: true})
    ])
    add([
        rect(100, 20),
        pos(500, height()-450),
        area(),
        body({isStatic: true})
    ])
    const ground = add([
        rect(width(), 73),
        color(67, 138, 93),
        opacity(0),
        pos(0, height()-73),
        area(),
        body({isStatic: true})
    ]);
    onKeyDown("left", () =>{
        player.flipX = true
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
        player.move(-SPEED, 0);
    });
    onKeyDown("right", () =>{
        player.flipX = false
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
        player.move(SPEED, 0);
    });
    onKeyDown("space", ()=>{
        if (player.curAnim() !== "attack" && player.curAnim()!== "run") {
            player.play("attack");
        }
    });
    onKeyPress("up", ()=>{
        if(player.isGrounded()){
            player.jump(JUMP_FORCE);
        }
    });
    player.onGround(() => {
        if (!isKeyDown("left") && !isKeyDown("right")) {
            player.play("idle")
        } else {
            player.play("run")
        }
    });
    onUpdate(() =>{
        
    });
    ["left", "right", "space"].forEach((key) => {
        onKeyRelease(key, () => {
            if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")&& !isKeyDown("space")) {
                player.play("idle")
            }
        })
    });   
});

go("start");