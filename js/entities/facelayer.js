game.FaceLayer = game.FaceLayer || {};

game.FaceLayer.Container = me.ObjectContainer.extend({

    faceImages:[],
    
    init: function() {
        // call the constructor
        this.parent();

        // persistent across level change
        this.isPersistent = true;

        // non collidable
        this.collidable = false;

        // make sure our object is always draw first
        this.z = 981239;

        // give a name
        this.name = "FaceLayer";

        this.faceImages[5] = me.loader.getImage("pain-face1");
        this.faceImages[4] = me.loader.getImage("pain-face2");
        this.faceImages[3] = me.loader.getImage("pain-face3");
        this.faceImages[2] = me.loader.getImage("pain-face4");
        this.faceImages[1] = me.loader.getImage("pain-face5");
    },
    
    
    draw: function(context) {
        if(me.levelDirector.getCurrentLevelId() === "face"){
            context.drawImage(this.faceImages[game.data.health], 0, 0);
        }
        
    }
    
});
