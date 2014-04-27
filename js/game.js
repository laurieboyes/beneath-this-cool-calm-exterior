
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen", 480, 640, true, 'auto')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {

        me.entityPool.add("theMan", game.ManEntity);
        me.entityPool.add("badguy1", game.Badguy1Entity);
        me.entityPool.add("face", game.FaceEntity);
        
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.GAMEOVER, new game.GameOverScreen());
		me.state.set(me.state.GAME_END, new game.GameEndScreen());

        // enable the keyboard
        me.input.bindKey(me.input.KEY.SPACE, "start");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.W, "up");
        me.input.bindKey(me.input.KEY.S, "down");
        me.input.bindKey(me.input.KEY.LEFT, "shootLeft");
        me.input.bindKey(me.input.KEY.RIGHT, "shootRight");
        me.input.bindKey(me.input.KEY.UP, "shootUp");
        me.input.bindKey(me.input.KEY.DOWN, "shootDown");
        
        me.sys.gravity = 0;

        // Start the game
		me.state.change(me.state.MENU);
	},
    
    worries : [
        "You don't really understand this stuff",
        "No one likes you",
        "Your fly might be open",
        "That man is staring at you",
        "You might have a bogey",
        "Don't look bored",
        "Should have pulled a sickie"
        
    ]
    
};
