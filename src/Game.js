import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Game.css';
import Circle from './Circle';
import Error from './Error';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false,
            currentNote: 'none',
            error: false,
        }
        this.color = {
            green: "./notes/a-la.wav",
            blue: "./notes/g-sol.wav",
            red: "./notes/e-mi.wav",
            yellow: "./notes/f-fa.wav"
        }
        this.currentGame = [];
        this.notesSelected = [];
    }

    //Quand le joueur clique sur New game
    newGame = () => {
        this.currentGame = [];
        this.notesSelected = [];
        this.setState({ error: false });
        this.play()
    }
    //Lancement du jeu
    play = () => {
        this.setState({ error: false });
        const keys = Object.keys(this.color);
        if (this.currentGame.length <= 16) {
            const note = this.color[keys[parseInt(keys.length * Math.random(), 0)]];
            this.currentGame.push(note)
            this.notesToPlay()
        }
    }
    //Notes à jouer sans se tromper
    notesToPlay = () => {
        let i = 0;
        const moves = setInterval(() => {
            this.setState({ play: true });
            const audio = new Audio(this.currentGame[i]);
            this.setState({ currentNote: this.currentGame[i] });
            audio.play()
            i++;
            if (i >= this.currentGame.length) {
                this.setState({ play: false });
                clearInterval(moves);
                setTimeout(() => {
                    this.setState({ currentNote: 'none' });
                }, 1000);
            }
            setTimeout(() => {
                this.setState({ currentNote: 'none' });
            }, 300);
        }, 600);

    }

    //Notes jouées par le joueur
    playerMove = (noteSelected) => {
        const { play } = this.state;
        let note = this.color[noteSelected];
        if (play === false) {
            const audio = new Audio(note)
            this.notesSelected.push(note);
            let good = undefined;
            audio.play();
            if (this.notesSelected.length === this.currentGame.length) {
                for (let i = 0; i < this.currentGame.length; i += 1) {
                    if (this.notesSelected[i] === this.currentGame[i]) {
                        console.log('todo', this.currentGame[i])
                        console.log('done', this.notesSelected[i])
                        good = true;
                    } else {
                        good = false;
                        break;
                    }
                }
            }
            if (good) {
                console.log('You win !', this.currentGame)
                this.notesSelected = [];
                this.play()
            } 
            if (good === false) {
                console.log('You lose !', this.currentGame)
                this.setState({ error: true });
                const error = new Audio("./error.wav")
                error.play()
                this.notesSelected = [];
            }
        }
    }

    render() {
        const { currentNote, error } = this.state;
        return (
            <div className="gameContainer">
                <h1>My Simon game</h1>
                <div className="simonContainer">
                    <Container>
                        <Row>
                            <Col xs={{ size: 4, offset: 4 }}>
                                <Circle color="blue" play={this.playerMove} note={currentNote} colorObj={this.color} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ size: 5 }}>
                                <Circle color="green" play={this.playerMove} note={currentNote} colorObj={this.color} />
                            </Col>
                            <Col xs={{ size: 2 }} style={{display: 'flex', alignItems:'center'}}>
                               { error ? <Error tryAgain={this.notesToPlay}/> : undefined}
                            </Col>
                            <Col xs={{ size: 5 }}>
                                <Circle color="red" play={this.playerMove} note={currentNote} colorObj={this.color} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ size: 4, offset: 4 }}>
                                <Circle color="yellow" play={this.playerMove} note={currentNote} colorObj={this.color} />
                            </Col>
                        </Row>
                    </Container>
                </div>
                <button onClick={() => this.newGame()} style={{marginTop: '3%'}}>New game</button>
            </div>
        );
    }
}

export default Game;


