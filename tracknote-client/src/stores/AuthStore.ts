import { makeAutoObservable } from "mobx";

class AuthStore {
    isAuth = false;
    username = 'LASTINHVLE';

    constructor() {
        makeAutoObservable(this);
    }

    toggleAuth() {
        this.isAuth = !this.isAuth;
    }
}

const authStore = new AuthStore();
export default authStore;