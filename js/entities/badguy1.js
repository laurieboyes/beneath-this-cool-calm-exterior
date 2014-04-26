/*------------------- 
 the man entity
 -------------------------------- */
game.Badguy1Entity = me.ObjectEntity.extend({

    /* -----

     constructor

     ------ */

    init: function (x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);

        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
    },

    update: function () {

        // check & update player movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x != 0 || this.vel.y != 0) {
            // update object animation
            this.parent();
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },

    onCollision: function(res, obj) {

        this.collidable = false;
        me.game.remove(this);
        
    }

});