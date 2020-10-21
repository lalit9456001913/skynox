import React from 'react';
import './Home.css'
import html2pdf from 'html2pdf.js'
class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            curr_color: ''
        }
    }


    download = (name) => {
        console.log(name)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            },
            body: JSON.stringify({ "name": name })
        }
        fetch('/Download_pdf', requestOptions).then(response => response.pdf()).then(data => {

            console.log(data)
            console.log('pdf has downloaded')

        })
    }
    fillColor = (color) => {

        var canvas = document.getElementById("myCanvas")

        var ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.setState({
            curr_color: color
        })
    }

    download = () => {
        var canvas = document.getElementById("myCanvas")
        html2pdf(canvas);

    }
    render() {

        return (
            <div>
                <div className="color">
                    <div className="dot" id="red" onClick={() => this.fillColor("red")}></div>
                    <div className="dot" id="green" onClick={() => this.fillColor("green")}></div>
                    <div className="dot" id="yellow" onClick={() => this.fillColor("yellow")}></div>
                    <div className="dot" id="blue" onClick={() => this.fillColor("blue")}></div>
                </div>
                <div id="mainDiv"><canvas id="myCanvas"> </canvas></div>
                <button id="btn" onClick={() => this.download()}>Download the PDF</button>

            </div>)
    }
}

export default Home;