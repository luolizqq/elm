import fetch from "./fetch";
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