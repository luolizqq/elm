import fetch from "./fetch";
import { getStore } from "../utils";
//home
export function getCity(type){
    return fetch("/v1/cities?type="+type)
}
export function getCityDetail(id){
    return fetch("/v1/cities/"+id)
}
export function searchCity(id,value){
    return fetch('/v1/pois',{
        type:"search",
        city_id:id,
        keyword:value
    })
}
export function groupTypes(geohash,group_type){
    return fetch('/v1/index_entry',{
        geohash,
        group_type,
    })
}

export function restaurants(geohash,group_type){
    return fetch('/v1/shopping/restaurants',{
        geohash,
        group_type,
    })
}
export function getUserInfo(){
    return fetch('/v1/user',{
       user_id:getStore("user_id")
    })
}
export function getCityAll(geohash){
    return fetch(`/v2/pois/${geohash}`)
}

export function getIndexEntry(geohash){
    return fetch(`/v2/index_entry`,{
        geohash,
        group_type:1
    })
}