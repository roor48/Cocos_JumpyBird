import { _decorator, Component, Node, Vec3, screen, UITransform, find } from 'cc';
const { ccclass, property } = _decorator;

const random = (min,max) => {
    return Math.random() * (max - min) + min;
}

@ccclass('Pipes')
export class Pipes extends Component {

    @property({
        type:Node,
        tooltip: 'Top Pipe'
    })
    public topPipe: Node;

    @property({
        type:Node,
        tooltip: 'Bottom Pipe'
    })
    public bottomPipe: Node;

    public tempStartLocationUp: Vec3 = new Vec3(0,0,0);
    public tempStartLocationBottom: Vec3 = new Vec3(0,0,0);
    public scene = screen.windowSize;

    public game; //  speed of the pipes from the GameCtrl
    public pipeSpeed: number; // final speed of the pipes
    public tempSpeed: number; // temporary speed

    isPass: boolean;

    onLoad()
    {
        this.game = find("GameCtrl").getComponent("GameCtrl");
        this.pipeSpeed = this.game.pipeSpeed;

        this.initPos();
        this.isPass = false;
    }

    initPos()
    {
        console.log(this.scene.width)
        this.tempStartLocationUp.x = (this.scene.width);
        this.tempStartLocationBottom.x = (this.scene.width);

        let gap = random(90, 100);
        let topHeight = random (0, 450);

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationBottom.y = (topHeight - (gap * 10));

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationBottom);
    }

    update(deltatime:number)
    {
        this.tempSpeed = this.pipeSpeed * deltatime;

        this.tempStartLocationUp = this.topPipe.position;
        this.tempStartLocationBottom = this.bottomPipe.position;

        this.tempStartLocationUp.x -= this.tempSpeed;
        this.tempStartLocationBottom.x -= this.tempSpeed;

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationBottom);

        if (!this.isPass && this.topPipe.position.x <= 0){
            this.isPass = true;
            this.game.passPipe();
        }
        
        if (this.topPipe.position.x < ( -this.scene.width)) {
            this.game.createPipe();
            this.node.destroy();
        }
    }
}
