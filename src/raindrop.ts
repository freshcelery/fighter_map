export default class RainDrop{
    public currentIndex: number;
    public radiusCloud: number;
    public radiusGrass: number;
    public radiusPuddle: number;
    public xCloud: number;
    public xPuddle: number;
    public yCloud: number;
    public yPuddle: number;
    constructor(index, xCloud, yCloud, xPuddle, yPuddle, radiusCloud, radiusPuddle, radiusGrass){
        this.currentIndex = index;
        this.xCloud = xCloud;
        this.yCloud = yCloud;
        this.xPuddle = xPuddle;
        this.yPuddle = yPuddle;
        this.radiusCloud = radiusCloud;
        this.radiusPuddle = radiusPuddle;
        this.radiusGrass = radiusGrass;
    }
}