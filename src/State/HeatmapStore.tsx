import {observable, action, reaction, autorun} from 'mobx';

export default class HeatmapStore {
    @observable weightclasses = {
        Flyweight: true,
        Bantamweight: false,
        Featherweight: false,
        Lightweight: false,
        Welterweight: false,
        Middleweight: false,
        Light_Heavyweight: false,
        Heavyweight: true,
        Women_Strawweight: false,
        Women_Flyweight: false,
        Women_Bantamweight: true,
        Women_Featherweight: false
    };

    @observable visible = true;
    @observable disabled = false;

    @action toggleWeightclass(weightclass){
        this.weightclasses[weightclass] = !this.weightclasses[weightclass];
    }

    @action toggleVisibility(){
        this.visible = !this.visible;
    }

    @action disableHeatmap(){
        this.disabled = !this.disabled;
    }

}
