import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRouter=(Component)=>{
    function ComponentWithRouterProps(props){
        let location=useLocation();
        let navigationn=useNavigate();
        let params=useParams();
        return <Component {...props} router={{location,navigationn,params}} />
    }
    return ComponentWithRouterProps;
}