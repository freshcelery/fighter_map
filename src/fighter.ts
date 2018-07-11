
/*
*
* Not currently in use at all
*
*/
export default class Fighter {

    public name: string;
    public birthplace: string;
    public age: number;
    public height: string;
    public weight: string;
    public reach: string;
    public record: string;
    public weightclass: string;
    public latitude: number;
    public longitude: number;
    public geoJSON: JSON;

    constructor(input_name: string, input_birthplace: string, input_age: number, input_height: string, input_weight: string, input_reach: string, input_record: string, input_weightclass: string, input_latitude: number, input_longitude: number){
        this.name = input_name;
        this.birthplace = input_birthplace;
        this.age = input_age;
        this.height = input_height;
        this.weight = input_weight;
        this.reach = input_reach;
        this.record = input_record;
        this.weightclass = input_weightclass
        this.latitude = input_latitude;
        this.longitude = input_longitude;
    }
}