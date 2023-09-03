import React, { Component } from "react";
import UserService from "../services/user.service"

export default class BoardAdmin extends Component{

    constructor(props){
        super(props)
        this.state={
            content:""
        }
    }
    componentDidMount(){
        UserService.getAdminBoard().then(
            (response)=>{
                this.setState({
                    content:response.data
                })
            },
            error=>{
                this.setState({
                    content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
                })
            }
        )
    }
    render(){
        return(
            <div class="container">
                <header class="jumbotron">
               <h3>Upload a new video!</h3>
                <div className="flex h-50 w-80">
                <video className="h-50" muted controls playsInline loop src="./display-video"></video>
                </div>
                <div className="flex">
                    
                </div>
               </header> 
            </div>
            
        )
    }
}