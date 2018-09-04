import {observable, action} from 'mobx';

export default class FighterInfoStore {

    @observable showFighterInfo = false;
    @observable currentFighterData = null;

    @action toggleFighterInfo(){
        console.log('clicked');
        this.showFighterInfo = !this.showFighterInfo;
    }
}
