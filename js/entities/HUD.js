game.HUD = game.HUD || {};

game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		this.parent();
		
		// persistent across level change
		this.isPersistent = true;
		
		// non collidable
		this.collidable = false;
		
		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";
		
		// add our child score object at the top left corner
		this.addChild(new game.HealthBar());
	}
});


game.HealthBar = me.Renderable.extend({
    init: function () {
        this.parent(new me.Vector2d(140, 590), 200, 20);
    },

    draw: function (context) {
        
        
        //health
        if(me.levelDirector.getCurrentLevelId() === "face"){
            var margin = 2;
            
            context.fillStyle = 'red';
            context.fillRect(this.pos.x, this.pos.y, this.width, this.height);

            context.fillStyle = 'green';
            context.fillRect(this.pos.x + margin, this.pos.y + margin, (this.width * (game.data.health / game.data.maxHealth)) - (margin * 2), this.height - (margin * 2));
        }       
        
        
        //waves
        new me.Font("Verdana", 30, "red").draw(context, "Wave " + game.data.waveNumber, 100, 50);
        
    }

});
