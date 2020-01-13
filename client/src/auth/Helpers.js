import cookie from 'js-cookie';
//set cookie
export const setCookie = (key,value)=>{
    if(window !== undefined){
        cookie.set(key,value,{
            expires: 1
        })
    }
}
//remove cookie
export const removeCookie = (key)=>{
    if(window !== undefined){
        cookie.remove(key,{
            expires: 1
        })
    }
} 

//get cookie
export const getCookie = (key,value)=>{
    if(window !== undefined){
        return cookie.get(key);
    }
} 

//set localstorage
export const setLocalStorage = (key,value)=>{
    if(window !== undefined){
        localStorage.setItem(key, JSON.stringify(value))
    }
}
//remove localstorage
export const removeLocalStorage = (key)=>{
    if(window !== undefined){
        localStorage.removeItem(key)
    }
} 
//authenticate
export const authenticate = (response, next)=>{
    console.log('Authentication on signin response', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();

}
export const isAuth = ()=>{
    if(window !== undefined){
        const cookieChecked =  getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'));
            }else{
                return false;
            }
        }
    }
}
export const Signout = (next)=>{
    removeCookie('token');
    removeLocalStorage('user');
    next();
}