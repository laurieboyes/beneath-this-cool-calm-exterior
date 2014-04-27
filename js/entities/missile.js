game.MissileEntity = me.ObjectEntity.extend({

    init: function (x, y, settings, direction) {
        settings.image = "missile";
        this.parent(x, y, settings);

        if (direction === 'upLeft' || direction === 'upRight' || direction === 'downLeft' || direction === 'downRight') {
            this.setVelocity(4, 4);
        } else {
            this.setVelocity(8, 8);
        }
        this.direction = direction;
        this.type = "MISSILE";

        me.event.subscribe("/levelEnd", function () {
            me.game.remove(this);
        }.bind(this));
    },

    update: function () {

        var movementRes, collideRes;

        switch (this.direction) {
            case 'left' :
                this.vel.x -= this.accel.x * me.timer.tick;
                this.vel.y = 0;
                break;
            case 'right' :
                this.vel.x += this.accel.x * me.timer.tick;
                this.vel.y = 0;
                break;
            case 'up' :
                this.vel.x = 0;
                this.vel.y -= this.accel.y * me.timer.tick;
                break;
            case 'down' :
                this.vel.x = 0;
                this.vel.y += this.accel.y * me.timer.tick;
                break;
            case 'upLeft' :
                this.vel.x -= this.accel.x * me.timer.tick;
                this.vel.y -= this.accel.y * me.timer.tick;
                break;
            case 'upRight' :
                this.vel.x += this.accel.x * me.timer.tick;
                this.vel.y -= this.accel.y * me.timer.tick;
                break;
            case 'downLeft' :
                this.vel.x -= this.accel.x * me.timer.tick;
                this.vel.y += this.accel.y * me.timer.tick;
                break;
            case 'downRight' :
                this.vel.x += this.accel.x * me.timer.tick;
                this.vel.y += this.accel.y * me.timer.tick;
                break;
        }

        movementRes = this.updateMovement();

        if (movementRes.x != 0 || movementRes.y != 0) {
            this.collidable = false;
            me.game.remove(this);
        }

        //note: apparently this is function is super slow
        collideRes = me.game.world.collide(this);
        if (collideRes && (collideRes.obj.type == me.game.ENEMY_OBJECT)) {
            this.collidable = false;
            me.game.remove(this);
        }

        return true;
    }

});