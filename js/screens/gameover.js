game.GameOverScreen = me.ScreenObject.extend({

    init: function() {
        this.parent(true);
        this.title = null;
    },

	onResetEvent: function() {
        if (this.title == null) {
            this.title = me.loader.getImage("gameover-face");
        }        
	},

    update: function() {
        if (me.input.isKeyPressed('start')) {
            me.state.change(me.state.PLAY);
        }
        return true;
    },

    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);
    },

	onDestroyEvent: function() {      
        me.input.unbindKey(me.input.KEY.ENTER);
	}
});
