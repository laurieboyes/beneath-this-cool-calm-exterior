/*------------------- 
 the man entity
 -------------------------------- */
game.ManEntity = me.ObjectEntity.extend({

    /* -----

     constructor

     ------ */

    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
        
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);
    },

    update: function() {

        //todo update if keys pressed

        // check & update player movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }

});