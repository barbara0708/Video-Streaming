export default function AuthHeader(){
const user=localStorage.getItem("user");
if(user&user.accessToken){
    return {'x-access-token':user.accessToken}
}else{
    return {};
}
}