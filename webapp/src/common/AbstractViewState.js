
export default class AbstractViewState {

    constructor(context){
        this.context = context;
    }
    
    render(){
        throw new Error('"render" is not implemented yet!');
    }

    onLoadBasicData(){
        throw new Error('"onLoadBasicData" is not implemented yet!');        
    }
}