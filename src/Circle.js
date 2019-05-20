import React, { Component } from 'react';

let myStyle;
class Circle extends Component {
    constructor(props) {
        super(props);
        const { color, colorObj } = this.props;
        this.style1 = {
            border: `solid 4px ${color}`,
            backgroundColor: 'Transparent',
        }
        this.state = {
            style: this.style1
        }
        this.style2 = {
            border: `solid 4px ${color}`,
            backgroundColor: color,
        }
        this.classCircle = `${color}Container`;
        this.colorNote = colorObj[color]
    }

    selectedStyle = () => {
        this.setState({
            style: this.style2
        });
        setTimeout(() => {
            this.setState({
                style: this.style1
            });
        }, 800);
    }

    render() {
        const { color, play, note } = this.props;
        const { style } = this.state;
        myStyle = style;
        if (this.colorNote === note) {
            myStyle = this.style2;
        }
        if (this.colorNote === 'none') {
            myStyle = this.style1;
        }
        return (
            <div className={this.classCircle}>
                <button onClick={() => { play(color); this.selectedStyle() }} style={myStyle} />
            </div>
        );
    }
}

export default Circle;
