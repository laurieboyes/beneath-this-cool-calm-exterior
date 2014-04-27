game.PlayScreen = me.ScreenObject.extend({
	
    name: 'play',
    
	onResetEvent: function() {
		// reset the score
		game.data.maxHealth = 5;
		game.data.health = 5;
        game.data.waveNumber = 1;

        // load a level
        me.levelDirector.loadLevel("area1");
        
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
        
        this.FaceLayer = new game.FaceLayer.Container();
		me.game.world.addChild(this.FaceLayer);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
