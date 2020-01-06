import {getUserInfo} from "service/getData"
import  {GET_USERINFO,SAVE_USERINFO} from "./types";
export async function  queryUserInfo({commit,state}){
    const res = await getUserInfo();
    commit(SAVE_USERINFO,res)
}