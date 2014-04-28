/*------------------- 
 the man entity
 -------------------------------- */
game.ManEntity = me.ObjectEntity.extend({

    previousMissileTime: me.timer.getTime(),

    init: function (x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(0.4, 0.4);
        this.setMaxVelocity(3, 3);

        me.event.subscribe("/allEnemiesDead", function () {
            this.levelComplete();
        }.bind(this));
    },

    update: function () {

        var shootKeyPressed, missileDirection;

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

        // store the player position so other entities know
        game.data.playerPos = this.pos;

        // check for collision
        var res = me.game.collide(this);
        if (res) {
            if (res.obj.type == me.game.ENEMY_OBJECT) {
                this.levelFailed();
            }
        }

        //fire a missile if applicable
        shootKeyPressed = me.input.isKeyPressed('shootUp')
            || me.input.isKeyPressed('shootDown')
            || me.input.isKeyPressed('shootLeft')
            || me.input.isKeyPressed('shootRight');
        if (shootKeyPressed && me.timer.getTime() - this.previousMissileTime > 250) {

            this.previousMissileTime = me.timer.getTime();


            if (me.input.isKeyPressed('shootUp') && me.input.isKeyPressed('shootLeft')) {
                missileDirection = 'upLeft';
            } else if (me.input.isKeyPressed('shootUp') && me.input.isKeyPressed('shootRight')) {
                missileDirection = 'upRight';
            } else if (me.input.isKeyPressed('shootDown') && me.input.isKeyPressed('shootLeft')) {
                missileDirection = 'downLeft';
            } else if (me.input.isKeyPressed('shootDown') && me.input.isKeyPressed('shootRight')) {
                missileDirection = 'downRight';
            } else if (me.input.isKeyPressed('shootUp')) {
                missileDirection = 'up';
            } else if (me.input.isKeyPressed('shootDown')) {
                missileDirection = 'down';
            } else if (me.input.isKeyPressed('shootLeft')) {
                missileDirection = 'left';
            } else if (me.input.isKeyPressed('shootRight')) {
                missileDirection = 'right';
            }
            me.game.add(new game.MissileEntity(this.pos.x + this.width / 2, this.pos.y + this.height / 2, {}, missileDirection), this.z);
            me.audio.play("shoot");
            me.game.sort();
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

    levelFailed : function () {
        me.event.publish("/levelEnd", []);
        if(--game.data.health === 0) {
            me.audio.play("killplayer");            
            me.state.change(me.state.GAMEOVER);
        } else {
            me.audio.play("hitplayer");
            me.game.viewport.shake(8, 500, me.game.viewport.AXIS.BOTH);
            me.levelDirector.loadLevel("face");
        }
    },

    levelComplete : function () {
        //event may be send a couple of times before this happens. We only want it to register once
        if(me.levelDirector.getCurrentLevelId() !== "face"){
            me.event.publish("/levelEnd", []);
            if(++game.data.waveNumber > 8) {
                me.state.change(me.state.GAME_END);
            } else { 
                me.levelDirector.loadLevel("face");    
            }            
        }        
    }
    
    

});