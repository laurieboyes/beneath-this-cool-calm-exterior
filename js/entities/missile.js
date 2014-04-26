game.MissileEntity = me.ObjectEntity.extend({

    init: function (x, y, settings, vX, vY) {
        settings.image = "missile";
        this.parent(x, y, settings);
        this.setVelocity(vX, vY);
    },

    update: function () {

        var movementRes;
        
        this.vel.x += this.accel.x * me.timer.tick
        this.vel.y += this.accel.x * me.timer.tick
        movementRes = this.updateMovement();
        
        if(movementRes.x != 0 || movementRes.y != 0) {
            this.collidable = false;
            me.game.remove(this);
        }
        return true;
    }

});