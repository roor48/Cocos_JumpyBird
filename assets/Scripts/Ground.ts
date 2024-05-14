import { _decorator, Canvas, Component, director, Game, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl';

@ccclass('Ground')
export class Ground extends Component {

    @property
    ({
        type:Node,
        tooltip:'Grounds is here'
    })
    protected grounds: Node[] = [];

    public groundWidths:number[]= [];
    
    public tempStartLocations: Vec3[] = [];
    
    public gameCtrlSpeed = new GameCtrl;
    public gameSpeed: number = 50;

    onLoad()
    {
        this.StartUp();
    }

    StartUp()
    {
        this.groundWidths.length = this.groundWidths.length;
        this.tempStartLocations.length = this.groundWidths.length;

        for(let i = 0; i < this.grounds.length; i++)
        {
            this.groundWidths[i] = this.grounds[i].getComponent(UITransform).width;
            
            this.tempStartLocations[i] = new Vec3;
            this.tempStartLocations[i].x = 0;
            for (let j = 0; j < i; j++)
            {
                this.tempStartLocations[i].x += this.groundWidths[j];
            }

            this.grounds[i].setPosition(this.tempStartLocations[i]);
        }
    }


    update(deltaTime: number): void {
        
        this.gameSpeed = this.gameCtrlSpeed.speed;

        for (let i = 0; i < this.grounds.length; i++)
        {
            this.tempStartLocations[i].x -= this.gameSpeed * deltaTime;
            this.grounds[i].setPosition(this.tempStartLocations[i]);
        }

        for (let i = 0; i < this.grounds.length; i++)
        {
            if (this.tempStartLocations[i].x <= (-this.groundWidths[i]))
            {
                if (i==0)
                {
                    this.tempStartLocations[i].x = this.tempStartLocations[this.tempStartLocations.length - 1].x + this.groundWidths[this.groundWidths.length - 1];
                }
                else
                {
                    this.tempStartLocations[i].x = this.tempStartLocations[i-1].x + this.groundWidths[i-1];
                }
            }
        }
    }
}


