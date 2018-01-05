
export default class Global{
    constructor(config){
        const defaultConfig = {
            loggedIn: false,
            axios: null,
            token: null,
            onUpdate: () => {},
        }

        Object.assign(this, defaultConfig, config);
    }

    update(data){
        Object.assign(this, data);
        this.onUpdate();
    }

}