import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {

    @property({
        type:Label
    })
    public scoreLable: Label;

    
    @property({
        type:Label
    })
    public highScore: Label;


    @property(Label)
    public resultEnd: Label;

    maxScore : number = 0;
    currentScore: number;

    
    updateScore(num:number)
    {
        this.currentScore = num;

        this.scoreLable.string = this.currentScore.toString();
    }
    
    resetScore()
    {
        this.updateScore(0);

        this.hideResults();
    }

    addScore()
    {
        this.updateScore(this.currentScore + 1);
    }

    showResults()
    {
        this.maxScore = Math.max(this.currentScore, this.maxScore);

        this.highScore.string = 'High Score: ' + this.maxScore;

        this.highScore.node.active = true;
        this.resultEnd.node.active = true;
    }

    hideResults()
    {
        this.highScore.node.active = false;
        this.resultEnd.node.active = false;
    }
}
