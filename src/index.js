import React, { Component } from 'react';
import { render } from 'react-dom';

export default class TicTacToe extends Component {

    constructor(props) {
        super(props);

        this.combinations = [
            [0,1,2],
            [6,7,8],
            [0,3,6],
            [2,5,8],
            [3,4,5],
            [1,4,7],
            [0,4,8],
            [2,4,6]
        ];
        this.turn = 1;
        this.state = {
            field: [],
            currentPlayer: 'X',
            aiPlayer: false,
            aiPlayerDot: 'O',
            win: false,
            started: false,
            newGame: true
        };
        this.startGame = this.startGame.bind(this);
        this.changeField = this.changeField.bind(this);
        this.checkWin = this.checkWin.bind(this);
        this.aiPlayer = this.aiPlayer.bind(this);
        this.randomPlacer = this.randomPlacer.bind(this);
    }

    componentWillMount() {
        this.startGame(true);
    }

    componentDidUpdate() {
        if (this.state.win) {
            if (this.state.currentPlayer === 'X') alert('Player O Win');
            else alert('Player X Win');
            this.setState({
                win: false,
                started: false,
                currentPlayer: (this.state.currentPlayer === 'X') ? 'O' : 'X'
            });
            this.startGame(true);
        } else if (this.state.field.indexOf('_') === -1) {
            alert('Draw');
            this.setState({currentPlayer: (this.state.currentPlayer === 'X') ? 'O' : 'X'});
            this.startGame(true);
        } else if (this.state.aiPlayer && this.state.aiPlayerDot === this.state.currentPlayer) {
            this.changeField(this.aiPlayer())
        }
    }

    startGame(cont,players) {
        const arr = this.state.field;
        for(var i = 0; i < 9; i++) {
            arr[i] = '_'
        }
        const newState = {
            field: arr,
            started: true,
            newGame: false
        };


        if(!cont ) newState.currentPlayer = 'X';
        if(players === 2) newState.aiPlayer = false;
        if(players === 1) newState.aiPlayer = true;
        this.turn = 1;
        this.setState(newState);
    }

    changeField(num) {
        const arr = this.state.field;
        arr[num] = this.state.currentPlayer;
        this.setState({
            field: arr,
            win: this.checkWin(),
            currentPlayer: (this.state.currentPlayer === 'X') ? 'O' : 'X'
        });
        this.turn++;
        console.log('Now turn: '+this.turn);
    }

    checkWin() {
       return this.combinations.some(combo =>
           combo.every(el =>
           this.state.field[el] === this.state.currentPlayer
           )
       );
    }

    aiPlayer() {
        console.log('Now ai turn: ' + this.turn);
        let ai = 'O';
        let player = 'X';
        let aiDot;
        const arr = this.state.field;
        const combinations = this.combinations;

        if (this.turn === 1) return 4;


        for (let a = 0; a < 2; a++) {
        for (let i = 0; i < combinations.length; i++) {
            console.log(combinations[i]);
            if (arr[combinations[i][0]] === arr[combinations[i][1]] && arr[combinations[i][1]] === ai && arr[combinations[i][2]] !== player) return combinations[i][2];
            if (arr[combinations[i][0]] === arr[combinations[i][2]] && arr[combinations[i][2]] === ai && arr[combinations[i][1]] !== player) return combinations[i][1];
            if (arr[combinations[i][2]] === arr[combinations[i][1]] && arr[combinations[i][1]] === ai && arr[combinations[i][0]] !== player) return combinations[i][0];
        }
            [ai,player] = [player,ai];
    }
        [player,ai] = [ai,player];


        combinations.find(combo => {
            if (combo.every(el => arr[el] !== player)) {
                if (arr[combo[0]] !== ai) aiDot = combo[0];
                if (arr[combo[1]] !== ai) aiDot = combo[1];
                if (arr[combo[2]] !== ai) aiDot = combo[2];
                return true
            }
            return false
        });
        console.log('error');
        return aiDot;
    }

    randomPlacer() {
        let arr = [];
        for(let a = 0; a < this.state.field.length; a++) {
            if(this.state.field[a] === '_') arr.push(a);
        }
        return arr[Math.floor(Math.random()*arr.length)]
    }

    render() {
        const field = this.state.field;
        return (
            <div className="main">
                <button className="buttons" onClick={() => this.startGame(true)} disabled={this.state.newGame}>
                    Clear field
                </button>
                {new Array(9).fill(1).map((el,i) => {return <button className="test" onClick={() => this.changeField(i)} disabled={!this.state.started || this.state.field[i] !== '_'}>{this.state.field[i]}</button>})}
                <button className="buttons_game" onClick={() => this.startGame(false,1)} disabled={this.state.aiPlayer}>One Player</button>
                <button className="buttons_game" onClick={() => this.startGame(false,2)} disabled={!this.state.aiPlayer}>Two Players</button>
            </div>
        )
    }
}
render(<TicTacToe />, document.getElementById('container'));
