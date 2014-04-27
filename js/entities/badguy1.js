/*------------------- 
 the man entity
 -------------------------------- */
game.Badguy1Entity = me.ObjectEntity.extend({


    currentVel: new me.Vector2d(0, 0),
    currentVelSetTime: me.timer.getTime(),
    currentVelDuration: 0,
    worry: '',

    health: 2,

    init: function (x, y, settings) {
        var worryNumber;

        // call the constructor
        this.parent(x, y, settings);

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);

        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

        if (game.worries.length && Math.random() < 0.30) {
            worryNumber = Math.floor(Math.random() * game.worries.length);
            this.worry = game.worries[worryNumber];
            game.worries.splice(worryNumber, 1);
        }
    },

    update: function () {

        if (me.timer.getTime() > this.currentVelSetTime + this.currentVelDuration) {

            this.currentVel = new me.Vector2d((Math.random() * 6) - 3, (Math.random() * 6) - 3);
            this.currentVelSetTime = me.timer.getTime();
            this.currentVelDuration = Math.random() * 1000;
        }

        this.vel = this.currentVel;
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

    //this only happens when it's been shot
    onCollision: function (res, obj) {

        if (obj.type === 'MISSILE') {

            if (this.health-- <= 1) {
                var enemiesRemaining = 0;

                me.game.world.children.forEach(function (child) {
                    if (child.type == me.game.ENEMY_OBJECT) {
                        enemiesRemaining++;
                    }
                });

                if (enemiesRemaining <= 1) { //including this one
                    me.event.publish("/allEnemiesDead", []);
                }

                this.collidable = false;
                me.game.remove(this);
            }
        }
    },

    draw: function (context) {
        this.parent(context);
        new me.Font("Verdana", 14, "white").draw(context, this.worry, this.pos.x - 70, this.pos.y - 20);
    }

});