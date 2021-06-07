import { makeObservable, observable } from "mobx";
class UserStore {
    userinfo = null;
    constructor(value){
        makeObservable(this,{
            userinfo:observable,
        })

    }
}
const UserStores = new UserStore;
export default UserStores;