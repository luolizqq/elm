export function getStore(name){
    if(!name) return 
   return localStorage.getItem(name)
}
export function setStore(key,value){
    if(!key) return;
    if(typeof value !=="string"){
        value = JSON.stringify(value)
    }
    localStorage.setItem(key,value)
}
export function removeStore(name){
    localStorage.removeItem(name)
}