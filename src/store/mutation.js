import {SAVE_USERINFO,SAVE_CITYINFO,SAVE_ADDRESS} from "./types";
export default {
    [SAVE_USERINFO](state,userInfo){
        state.userInfo = userInfo;
    },
    [SAVE_CITYINFO](state,{geohash}){
        state.geohash = geohash;
    },
    [SAVE_ADDRESS](state,{latitude,longitude}){
        state.latitude = latitude;
        state.longitude = longitude;
    },
} 