import {observable, action, reaction, autorun} from 'mobx';

export default class HeatmapStore {
    @observable weightclasses = {
        Flyweight: false,
        Bantamweight: false,
        Featherweight: false,
        Lightweight: false,
        Welterweight: false,
        Middleweight: false,
        Light_Heavyweight: false,
        Heavyweight: false,
        Women_Strawweight: false,
        Women_Flyweight: false,
        Women_Bantamweight: false,
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

    @action toggleDisabled(){
        this.disabled = !this.disabled;
    }

}
