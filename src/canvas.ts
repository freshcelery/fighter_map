import * as d3 from 'd3';
import RainDrop from "./raindrop";

export default class Canvas{
    public context;
    public canvas;
    public customBase;
    public custom;
    public duration = 2000;
    private rainData = [];
    constructor(){
        this.canvas = d3.select('#main-canvas').node() as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.customBase = document.createElement('custom');
        this.custom = d3.select(this.customBase);
        this.drawRainScene();
        this.drawScene();
        this.rainData = this.getRainData(2500);

        d3.select('button#enter').on('mousedown', () => {
            this.animate(this.rainData);
        });
        d3.select('button#update').on('mousedown', () => {
            this.animate(this.rainData);
        });
        d3.select('button#exit').on('mousedown', () => {
            this.animate([]);
        });

    }

    drawScene() {

        this.context.save();
        
        // The house
        this.context.fillStyle = 'royalblue';
        this.context.fillRect(50, 150, 200, 100);
    
        // The door
        this.context.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.context.fillRect(60, 190, 40, 60);
    
        // The window
        this.context.save();
    
        this.context.translate(140, 190);
        this.context.fillRect(0, 0, 60, 30);
    
        this.context.restore();
    
        // The roof
        this.context.beginPath();
        this.context.moveTo(50, 150);
        this.context.lineTo(250, 150);
        this.context.lineTo(50+200/2, 100);
        this.context.closePath();
        this.context.fillStyle = '#A52A2A';
        this.context.fill();
    
        // The tree
        this.context.beginPath();
        this.context.lineWidth = 10;
        this.context.strokeStyle = 'brown'
        this.context.moveTo(300, 250);
        this.context.lineTo(300, 125);
        this.context.stroke();
    
        this.context.beginPath();
        this.context.fillStyle = 'green';
        this.context.arc(300, 150, 25, 0, Math.PI * 2);
        this.context.fill();
    
        this.context.restore();
    
    } // drawScene()
    
    
    drawRainScene() {
    
        // cloud
        // point cloud roughly from 60,10 to 540, 70
        this.context.beginPath();
        this.context.moveTo(65, 65);
        this.context.lineTo(535, 65);
        this.context.bezierCurveTo(560, 5, 441, 5, 441, 40);
        this.context.bezierCurveTo(441, 0, 347, 0, 347, 40);
        this.context.bezierCurveTo(347, 5, 253, 5, 253, 40);
        this.context.bezierCurveTo(253, 10, 159, 10, 159, 40);
        this.context.bezierCurveTo(159, 15, 40, 15, 65, 65);
        this.context.closePath();
        this.context.fillStyle = '#f7f7f7';
        this.context.fill();
        
        // Rain path
        // cloud shape from 65, 65 to 535, 65
        // puddle shape from 30, 250 to 560, 270
        this.context.beginPath();
        this.context.moveTo(65, 70);
        this.context.lineTo(535, 70);
        this.context.lineTo(530, 255);
        this.context.lineTo(45, 253);
        this.context. closePath();
        this.context.fillStyle = '#ffffff';
        this.context.fill();
    
        // Puddle
        this.context.beginPath();
        this.context.moveTo(529.52,256.19);
        this.context.bezierCurveTo(532.01,260.53,513.31,265.85,516.94,272.4);
        this.context.bezierCurveTo(521.06,279.82,547.94,278.27,553.81,286.4);
        this.context.bezierCurveTo(557.57,291.58,552.04,299.53,542.08,303.045);
        this.context.bezierCurveTo(520.38,310.726,493.13,291.9,444.8,292.045);
        this.context.bezierCurveTo(410.16,292.184,409.0,301.976,364.45,307.383);
        this.context.bezierCurveTo(302.314,314.91,237.732,304.003,237.0,296.383);
        this.context.bezierCurveTo(236.582,290.383,276.83,287.115,275.633,282.75);
        this.context.bezierCurveTo(273.71,275.856,167.702,276.425,166.71,281.485);
        this.context.bezierCurveTo(166.073,284.753,209.81,287.045,209.44,291.124);
        this.context.bezierCurveTo(208.85,297.744,92.88,304.52,83.76,291.124);
        this.context.bezierCurveTo(78.85,283.90,106.86,273.726,100.52,268.77);
        this.context.bezierCurveTo(94.66,264.20,68.52,271.16,39.35,264.83);
        this.context.bezierCurveTo(32.35,263.314,26.7303,261.36,25.118,258.26);
        this.context.bezierCurveTo(23.78,255.71,34.735,251.362,43.54,250.814);
        this.context.bezierCurveTo(56.446,250.982,453.02,250.753,458.2,250.883);
        this.context.bezierCurveTo(506.06,249.68,525,248.36,529.52,256.19);
        this.context.closePath();
        this.context.fillStyle = "#ffffff";
        this.context.fill();
    
    } // drawRainScene()

    animate(rainData) {
        this.databind(rainData);

        let t = d3.timer((elapsed) => {
            this.draw(this.context);
            if (elapsed > this.duration * 2){
                t.stop();
            }
        })
    }

    getDrop(index){
        let x = Math.random() * (this.canvas.width * 0.9) + ( this.canvas.width * 0.05);
        let y = Math.random() * 100 + 10;
        let yPuddle = Math.random() * 60 + 253;
        let obj = new RainDrop(index, x, y, x, yPuddle, 1, 2, 8);

        return obj;
    }

    getRainData(length){
        let data = [];
        d3.range(length).forEach((el) => {
            let drop = this.getDrop(el);
            data.push(drop);
        })

        return data;
    }

    databind(data){
        let join = this.custom.selectAll('custom.drop')
                    .data(data, function(d) { return d.index; });
        
        let enter = join.enter().append('custom')
                        .attr('class', 'drop')
                        .attr('cx', (d: RainDrop) => { return d.xCloud })
                        .attr('cy', (d: RainDrop) => { return d.yCloud })
                        .attr('r', (d: RainDrop) => { return d.radiusCloud })
                        .attr('fillStyle', 'rgba(0, 0, 255, 0')
                        .transition().delay( (d, i) => { return i * 2})
                        .attr('fillStyle', 'rgba(0, 0, 255, 0.2');
        let update = join.transition()
                            .duration(() => { return Math.random() * 1000 + 900;})
                            .delay((d, i) => { return (i / data.length) * this.duration;})
                            .ease(d3.easeLinear)
                            .attr('cx', (d: RainDrop) => { return d.xPuddle; })
                            .attr('cy', (d: RainDrop) => { return d.yPuddle; })
                            .attr('r', (d: RainDrop) => { return d.radiusPuddle; })
                            .attr('fillStyle', '#0000ff');
        
        let exit = join.exit().transition()
                    .duration(this.duration)
                    .delay( (d, i) => { return i; })
                    .attr('r', (d: RainDrop) => { return d.radiusGrass; })
                    .attr('fillStyle', '#01A611');
    }

    draw(ctx){
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawRainScene();
        this.drawScene();
        let elements = this.custom.selectAll('custom.drop');
        elements.each(function (d, i) {
            
            let node = d3.select(this);
            console.log(node);
            ctx.save();
            ctx.beginPath();
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = node.attr('fillStyle');
            ctx.arc(node.attr('cx'), node.attr('cy'), node.attr('r'), 0, 0.2 * Math.PI);
            ctx.fill();
            ctx.restore();
        })
    }
}