/*------------------- 
 the man entity
 -------------------------------- */
game.ManEntity = me.ObjectEntity.extend({

    /* -----

     constructor

     ------ */

    init: function (x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(0.4, 0.4);
        this.setMaxVelocity(3, 3);
    },

    update: function () {

        var getSlowedVelocity = function (axis) {
            if (Math.abs(this.vel[axis]) < 0.01) {
                return 0;
            } else if (this.vel[axis] < 0) {
                return this.vel[axis] += this.accel[axis] * me.timer.tick;
            } else if (this.vel[axis] > 0) {
                return this.vel[axis] -= this.accel[axis] * me.timer.tick;
            }
        }.bind(this);
        
        if (me.input.isKeyPressed('left')) {
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = getSlowedVelocity('x');
        }

        if (me.input.isKeyPressed('up')) {
            this.vel.y -= this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            this.vel.y += this.accel.y * me.timer.tick;
        } else {
            this.vel.y = getSlowedVelocity('y');
        }

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
    }

});