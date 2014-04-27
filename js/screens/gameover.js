game.GameOverScreen = me.ScreenObject.extend({

    
    
    init: function() {
        this.parent(true);
        this.title = null;
    },

	onResetEvent: function() {
        if (this.title == null) {
            this.title = me.loader.getImage("gameover-face");
        }        
        
        this.timeDied = me.timer.getTime();
        
        me.audio.stopTrack();
	},

    update: function() {
        if (me.input.isKeyPressed('start')) {
            if(me.timer.getTime() > this.timeDied + 2000)
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
