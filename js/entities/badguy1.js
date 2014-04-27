/*------------------- 
 the man entity
 -------------------------------- */
game.Badguy1Entity = me.ObjectEntity.extend({


    currentVel: new me.Vector2d(0, 0),
    currentVelSetTime: me.timer.getTime(),
    currentVelDuration: 0,

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

        var movementRes;

        //move for a random distance in the closest of 4 directions towards the player
        var velDirectTowardsPlayer = function () {
            var result = this.currentVel;
            var playerAngle;

            if (game.data.playerPos == undefined) {
                return result;
            }

            if (me.timer.getTime() > this.currentVelSetTime + this.currentVelDuration) {
                console.log('moving towards player');

                playerAngle = this.pos.angle(game.data.playerPos) * (180 / Math.PI);

                if (playerAngle >= -135 && playerAngle < -45) {
                    result = new me.Vector2d(0, -3); //up
                } else if (playerAngle >= 45 && playerAngle < 135) {
                    result = new me.Vector2d(0, 3); //down
                } else if (playerAngle >= -45 && playerAngle < 45) {
                    result = new me.Vector2d(3, 0); //right
                } else if ((playerAngle >= -135 && playerAngle < -180) || (playerAngle >= 135 && playerAngle < 180)) {
                    result = new me.Vector2d(-3, 0); //left
                }


                this.currentVel = result;
                this.currentVelSetTime = me.timer.getTime();
                this.currentVelDuration = Math.random() * 1000;

            }

            return result;

        }.bind(this);

        var velRandomDirection = function () {
            var result = this.currentVel;

            var random = Math.random();

            if (random >= 0 && random < 0.25) {
                result = new me.Vector2d(0, -3); //up
            } else if (random >= 0.25 && random < 0.5) {
                result = new me.Vector2d(0, 3); //down
            } else if (random >= 0.5 && random < 0.75) {
                result = new me.Vector2d(3, 0); //right
            } else if (random >= 0.75 && random < 1) {
                result = new me.Vector2d(-3, 0); //left
            }

            this.currentVel = result;
            this.currentVelSetTime = me.timer.getTime();
            this.currentVelDuration = Math.random() * 3000;

            return result;

        }.bind(this);


        this.vel = velDirectTowardsPlayer();

        // check & update player movement
        movementRes = this.updateMovement();

        // if we hit a wall, try going in a random direction
        if (movementRes.x != 0) {
            console.log('reversing x');
            this.currentVel.x = -this.currentVel.x;
            this.currentVelSetTime = me.timer.getTime();
            this.currentVelDuration = Math.random() * 500;
        }
        if (movementRes.y != 0) {
            console.log('reversing y');
            this.currentVel.y = -this.currentVel.y;
            this.currentVelSetTime = me.timer.getTime();
            this.currentVelDuration = Math.random() * 500;
        }

        if (movementRes.y != 0 && movementRes.x != 0) {
            console.log('reversing x and y');
            this.currentVel.y = -this.currentVel.y;
            this.currentVel.x = -this.currentVel.x;
            this.currentVelSetTime = me.timer.getTime();
            this.currentVelDuration = Math.random() * 500;
        }

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

});