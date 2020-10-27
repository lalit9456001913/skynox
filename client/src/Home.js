import React from 'react';
import './Home.css'
import html2pdf from 'html2pdf.js'
var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false,
    w, h;

var x = "black",
    y = 2;
class Home extends React.Component {
    constructor() {
        super()

    }



    componentDidMount() {
        this.init()

    }

   
    
    download = () => {
        var canvas = document.getElementById("mainDiv")
        //console.log(canvas)
        console.log(typeof (canvas))
        var opt = {
            margin: 1,
           
            filename: 'myfile.pdf',
            enableLinks: true,
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(canvas).set(opt).save()
        

     }


    findxy = (res, e) => {
        console.log('inside findxy')
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                this.draw();
            }
        }

    }




    init = () => {

        canvas = document.getElementById('myCanvas');
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;

        canvas.addEventListener("mousemove", (e) => this.findxy('move', e), false);
        canvas.addEventListener("mousedown", (e) => this.findxy('down', e), false);
        canvas.addEventListener("mouseup", (e) => this.findxy('up', e), false);
        canvas.addEventListener("mouseout", (e) => this.findxy('out', e), false);
    }


    draw = () => {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }
    color = (obj) => {
        console.log('inside', obj)
        switch (obj) {
            case "green":
                x = "green";
                break;
            case "blue":
                x = "blue";
                break;
            case "red":
                x = "red";
                break;
            case "yellow":
                x = "yellow";
                break;

        }
        if (x == "white") y = 14;
        else y = 2;

    }
    erase =()=>{
        //let m = confirm("Want to clear");
        
            ctx.clearRect(0, 0, w, h);
            document.getElementById("myCanvas").value= "none";
        
    }
    findxy = (res, e) => {
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                this.draw();
            }
        }
    }



    render() {

        return (
            <div>
                <div className="choose-color">
                    <div id="red" onClick={() => this.color('red')}></div>
                    <div id="yellow" onClick={() => this.color('yellow')}></div>
                    <div id="blue" onClick={() => this.color('blue')}></div>
                    <div id="sky" onClick={() => this.color('sky')}></div>

                </div>

                <div id="mainDiv"> <canvas id="myCanvas" width="400" height="400" ></canvas> </div>
                <button id="btn" onClick={() => this.download()}>Download the PDF</button>
                <input type="button" value="clear" id="clr" size="23" onClick={()=>this.erase()}></input>

            </div>
        )
    }
}

export default Home;