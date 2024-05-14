import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director, game } from 'cc';
const { ccclass, property } = _decorator;

import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';


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
        type: CCInteger
    })
    public speed: number = 300;

    @property({
        type: CCInteger
    })
    public pipeSpeed:number = 200;

    onLoad(){
        this.initListner();
        this.result.resetScore();
    }

    initListner(){
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            this.bird.fly();
            console.log('TOUCH_START')
        })
    }

    //test method
    onKeyDown(event: EventKeyboard)
    {
        switch(event.keyCode)
        {
            case KeyCode.KEY_A:
                this.gameOver();
            break;
            case KeyCode.KEY_P:
                this.result.addScore();
            break;
            case KeyCode.KEY_Q:
                this.resetGame();
                this.bird.resetBird();
            break;
        }
    }

    startGame(){
        this.result.hideResults();
        director.resume();
    }

    resetGame()
    {
        this.result.resetScore();
        this.startGame();
    }
    
    gameOver()
    {
        this.result.showResults();
        director.pause();
    }
}


