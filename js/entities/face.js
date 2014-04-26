/*------------------- 
 the man entity
 -------------------------------- */
game.FaceEntity = me.ObjectEntity.extend({

    init: function (x, y, settings) {

        settings.image = "temp-face";
        
        // call the constructor
        this.parent(x, y, settings);

        this.setVelocity(0, 0);
    },

    update : function () {
        
        if(me.input.isKeyPressed("shoot")){
            me.levelDirector.loadLevel("area_temp");  
        }
    }
    
    
    
});