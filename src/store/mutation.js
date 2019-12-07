import {SAVE_USERINFO,SAVE_CITYINFO} from "./types";
export default {
    [SAVE_USERINFO](state,userInfo){
        state.userInfo = userInfo;
    },
    [SAVE_CITYINFO](state,{geohash,latitude,longitude}){
        state.geohash = geohash;
        state.latitude = latitude;
        state.longitude = longitude;
    },
} 