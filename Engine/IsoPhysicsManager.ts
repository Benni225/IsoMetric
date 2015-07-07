"use strict";

class IsoPhysicsManager {
    rigidBodies: Array<IsoObject> = new Array();
    massBodies: Array<IsoObject> = new Array();

    gravity: number = 0.2;

    addMassBody(object: IsoObject) {
        this.massBodies.push(object);
    }
    addRigidBody(object: IsoObject) {
        this.rigidBodies.push(object);
    }

    removeRigidBody(object: IsoObject) {
        var __i;
        for (var i = 0; i < this.rigidBodies.length; i++) {
            if (this.rigidBodies[i] === object) {
                __i = i;
            }
            if (__i !== undefined) {
                if (this.rigidBodies[i + 1] !== undefined) {
                    this.rigidBodies[i] = this.rigidBodies[i + 1];
                }
            }
        }
    }
    removeMassBody(object: IsoObject) {
        var __i;
        for (var i = 0; i < this.massBodies.length; i++) {
            if (this.massBodies[i] === object) {
                __i = i;
            }
            if (__i !== undefined) {
                if (this.massBodies[i + 1] !== undefined) {
                    this.massBodies[i] = this.massBodies[i + 1];
                }
            }
        }
    }

    setGravity(g: number) {
        this.gravity = g;
    }

    update() {
        for (var i = 0; i < this.massBodies.length; i++) {
            if (this.massBodies[i] !== undefined) {
                this.massBodies[i].velocity.y += this.gravity * 2;
                var collides = false;
                for (var j = 0; j < this.rigidBodies.length; j++) {
                    if (this.rigidBodies[j] !== undefined && this.massBodies[i].collide(this.rigidBodies[j])) {
                        this.massBodies[i].velocity.y = 0;
                        if ((this.massBodies[i].rigidBody.y + this.massBodies[i].rigidBody.height) > this.rigidBodies[j].rigidBody.y) {
                            if ((this.massBodies[i].rigidBody.y + this.massBodies[i].rigidBody.height) - this.rigidBodies[j].rigidBody.y < 5) {
                                
                                this.massBodies[i].position.y -= (this.massBodies[i].rigidBody.y + this.massBodies[i].rigidBody.height) - this.rigidBodies[j].rigidBody.y
                            } else if ((this.massBodies[i].rigidBody.y + this.massBodies[i].rigidBody.height) - this.rigidBodies[j].rigidBody.y >= 5){
                                if (
                                    (this.massBodies[i].rigidBody.x < this.rigidBodies[j].rigidBody.x + this.rigidBodies[j].rigidBody.width) &&
                                    (this.massBodies[i].rigidBody.x + this.massBodies[i].rigidBody.width > this.rigidBodies[j].rigidBody.x + this.rigidBodies[j].rigidBody.width)
                                   ) {
                                    this.massBodies[i].position.x += (this.rigidBodies[j].rigidBody.x + this.rigidBodies[j].rigidBody.width) - this.massBodies[i].rigidBody.x
                                } else if (
                                    (this.massBodies[i].rigidBody.x + this.massBodies[i].rigidBody.width > this.rigidBodies[j].rigidBody.x) &&
                                    (this.massBodies[i].rigidBody.x + this.massBodies[i].rigidBody.width < this.rigidBodies[j].rigidBody.x + this.rigidBodies[j].rigidBody.width)
                                   ) {
                                    this.massBodies[i].position.x += this.rigidBodies[j].rigidBody.x - (this.massBodies[i].rigidBody.x + this.massBodies[i].rigidBody.width);
                                }
                            }
                        }
                        
                    }
                }
            }
        }
    }

}