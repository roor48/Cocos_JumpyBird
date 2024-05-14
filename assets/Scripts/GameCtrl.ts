import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { BirdAudio } from './BirdAudio';

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type:Component,
        tooltip: 'this is ground'
    })
    public ground: Ground;

    @property({
        type: Results,
        tooltip: 'results go here'
    })
    public result: Results;

    @property({
        type: Bird,
        tooltip: 'bird'
    })
    public bird: Bird;

    @property({
        type:PipePool
    })
    public pipeQueue:PipePool;

    @property({
        type: BirdAudio
    })
    public clip: BirdAudio;


    @property({
        type: CCInteger
    })
    public speed: number = 300;

    @property({
        type: CCInteger
    })
    public pipeSpeed:number = 200;

    public isOver: boolean;

    onLoad(){
        this.initListner();
        this.result.resetScore();
        this.isOver = true;

        this.start();
    }

    start(){
        director.pause();
    }

    initListner(){
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {

            if (this.isOver) {
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            } else {
                this.bird.fly();
                this.clip.onAudioQueue(0);
            }
        })
    }

    //test method
    // onKeyDown(event: EventKeyboard)
    // {
    //     switch(event.keyCode)
    //     {
    //         case KeyCode.KEY_A:
    //             this.gameOver();
    //         break;
    //         case KeyCode.KEY_P:
    //             this.result.addScore();
    //         break;
    //         case KeyCode.KEY_Q:
    //             this.resetGame();
    //             this.bird.resetBird();
    //         break;
    //     }
    // }

    startGame(){
        this.result.hideResults();
        director.resume();
    }

    resetGame()
    {
        this.result.resetScore();
        this.pipeQueue.reset();
        this.isOver = false;

        this.startGame();
    }
    
    gameOver()
    {
        this.result.showResults();
        this.isOver = true;
        this.clip.onAudioQueue(3);

        director.pause();
    }

    passPipe()
    {
        this.result.addScore();
        this.clip.onAudioQueue(1);
    }

    createPipe()
    {
        this.pipeQueue.addPool();
    }

    contactGroundPipe()
    {
        let collider = this.bird.getComponent(Collider2D);

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContanct, this);
        }
    }

    onBeginContanct(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null)
    {
        this.bird.hitSomething = true;
        this.clip.onAudioQueue(2);
    }

    birdStruck() {
        this.contactGroundPipe();

        if (this.bird.hitSomething) {
            this.gameOver();
        }
    }

    update()
    {
        if (!this.isOver) {
            this.birdStruck();
        }
    }
}


