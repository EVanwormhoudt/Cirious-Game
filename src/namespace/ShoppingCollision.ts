export namespace ShoppingCollision {
    export function collide(obj, obj2) {
        let probability: number;
    
        do {
            probability = Phaser.Math.Between(1,4);
        } while (probability == obj.direction || probability == obj.previousDirection);
    
        obj.previousDirection = obj.direction;
        obj.previousX = obj.x;
        obj.previousY = obj.y;
        obj.direction = probability;
    
        switch (probability) {
            case 1:
                obj.setVelocity(125, 0);
                obj.setAngle(90);
                obj.body.setSize(32,20);
                break;
            case 2:
                obj.setVelocity(-125, 0);
                obj.setAngle(270);
                obj.body.setSize(32,20);
                break;
            case 3:
                obj.setVelocity(0, -125);
                obj.setAngle(0);
                obj.body.setSize(20,32);
                break;
            case 4:
                obj.setVelocity(0, 125);
                obj.setAngle(180);
                obj.body.setSize(20,32);
                break;
        }
    }

    export function CheckCollision(obj) {
        let x;
        let y;

        switch (obj.direction) {
            case 1:
                break;
            case 2:
                x = (obj.x-(obj.x%32)+16)
                y = obj.y;
                break;
            case 3:
                break;
            case 4:
                x = obj.x;
                y = (obj.y-(obj.y%32)+16)
                break;
        }

        let collision: number[] = [];

        for (let i of obj.sceneAccess.fruit.culledTiles) {
            if (Math.trunc(Math.round(x)/32)-1 == i.x && Math.trunc(Math.round(x)/32) != i.x && (Math.trunc(Math.round(y)/32) == i.y || Math.trunc(Math.round(y)/32) == i.y-1|| Math.trunc(Math.round(y)/32) == i.y +1)) {

                if (((x - 48 >= i.pixelX && (y - 48 >= i.pixelY)||(y-48<i.pixelY && y >i.pixelY))||(x - 48 >= i.pixelX && y + 16 <= i.pixelY))&& y+16!= i.pixelY && y-48 != i.pixelY ) {
                    collision.push(1);

                }
            }
            if (Math.trunc(Math.round(x)/32)+1 == i.x && Math.trunc(Math.round(x)/32) != i.x && (Math.trunc(Math.round(y)/32) == i.y || Math.trunc(Math.round(y)/32) == i.y-1 || Math.trunc(Math.round(y)/32) == i.y +1)) {

                if (((x + 16 >= i.pixelX &&((y - 48 >= i.pixelY)||(y-48<i.pixelY && y >i.pixelY)))||(x + 16 >= i.pixelX && y + 16 <= i.pixelY))&& y+16!= i.pixelY && y-48 != i.pixelY ) {
                    collision.push(2)

                }
            }
            if (Math.trunc(Math.round(y)/32)-1 == i.y && Math.trunc(Math.round(y)/32) != i.y && (Math.trunc(Math.round(x)/32) == i.x || Math.trunc(Math.round(x)/32) == i.x-1 || Math.trunc(Math.round(x/32)) == i.x +1)) {

                if (((y - 48 >= i.pixelY&& ((x- 48 >= i.pixelX)||(x-48<i.pixelY && x >i.pixelY))) || (x + 16 >= i.pixelX && y - 48 >= i.pixelY))&& x+16!= i.pixelX && y-48 != x.pixelX) {
                    collision.push(3);

                }
            }
            if (Math.trunc(Math.round(y)/32)+1 == i.y && Math.trunc(Math.round(y)/32) != i.y && (Math.trunc(Math.round(x)/32) == i.x || Math.trunc(Math.round(x)/32) == i.x-1|| Math.trunc(Math.round(x)/32) == i.x +1)) {

                if (((y - 48 >= i.pixelY && ((x - 48 >= i.pixelX)||(x-48<i.pixelY && x >i.pixelY))) || (x + 16 >= i.pixelX && y + 16 >= i.pixelY))&& x+16!= i.pixelX && y-48 != x.pixelX) {
                    collision.push(4)
                }
            }
        }
        for (let i of obj.sceneAccess.mur.culledTiles) {
            if (Math.trunc(Math.round(x)/32)-1 == i.x && Math.trunc(Math.round(x)/32) != i.x && (Math.trunc(Math.round(y)/32) == i.y || Math.trunc(Math.round(y)/32) == i.y-1|| Math.trunc(Math.round(y)/32) == i.y +1)) {
                if (((x - 48 >= i.pixelX && (y - 48 >= i.pixelY)||(y-48<i.pixelY && y >i.pixelY))||(x - 48 >= i.pixelX && y + 16 <= i.pixelY))&& y+16!= i.pixelY && y-48 != i.pixelY ) {
                    collision.push(1);
                }
            }
            if (Math.trunc(Math.round(x)/32)+1 == i.x && Math.trunc(Math.round(x)/32) != i.x && (Math.trunc(Math.round(y)/32) == i.y || Math.trunc(Math.round(y)/32) == i.y-1 || Math.trunc(Math.round(y)/32) == i.y +1)) {

                if (((x + 16 >= i.pixelX &&((y - 48 >= i.pixelY)||(y-48<i.pixelY && y >i.pixelY)))||(x + 16 >= i.pixelX && y + 16 <= i.pixelY))&& y+16!= i.pixelY && y-48 != i.pixelY ) {
                    collision.push(2)
                }
            }
            if (Math.trunc(Math.round(y)/32)-1 == i.y && Math.trunc(Math.round(y)/32) != i.y && (Math.trunc(Math.round(x)/32) == i.x || Math.trunc(Math.round(x)/32) == i.x-1 || Math.trunc(Math.round(x/32)) == i.x +1)) {

                if (((y - 48 >= i.pixelY&& ((x- 48 >= i.pixelX)||(x-48<i.pixelY && x >i.pixelY))) || (x + 16 >= i.pixelX && y - 48 >= i.pixelY))&& x+16!= i.pixelX && y-48 != x.pixelX) {
                    collision.push(3);

                }
            }
            if (Math.trunc(Math.round(y)/32)+1 == i.y && Math.trunc(Math.round(y)/32) != i.y && (Math.trunc(Math.round(x)/32) == i.x || Math.trunc(Math.round(x)/32) == i.x-1|| Math.trunc(Math.round(x)/32) == i.x +1)) {

                if (((y - 48 > i.pixelY && ((x - 48 > i.pixelX)||(x-48<i.pixelY && x >i.pixelY))) || (x + 16 > i.pixelX && y + 16 > i.pixelY))&& x+16!= i.pixelX && y-48 != x.pixelX) {
                    collision.push(4)
                }
            }
        }

        if (Math.trunc(obj.x) == 80 && Math.trunc(obj.y) == 80) {
            collision.pop();
        }

        return collision;
    }
}