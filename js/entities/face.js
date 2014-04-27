/*------------------- 
 the man entity
 -------------------------------- */
game.FaceEntity = me.ObjectEntity.extend({

    levelForWave:[],
    
    init: function (x, y, settings) {
        var i;

        settings.image = "temp-face";
        
        // call the constructor
        this.parent(x, y, settings);

        this.setVelocity(0, 0);
        
        for(i = 1; i < 10; i++) {
            this.levelForWave[i] = "area" + i;
        }
    },

    update : function () {
        
        if(me.input.isKeyPressed("start")){
            me.levelDirector.loadLevel(this.levelForWave[game.data.waveNumber]);  
        }
    }
    
    
    
});