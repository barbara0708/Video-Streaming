import React, { Component } from "react";
import UserService from "../services/user.service"

export default class BoardModerator extends Component{

    constructor(props){
        super(props)
        this.state={
            content:""
        }
    }
    componentDidMount(){
        UserService.getModeratorBoard().then(
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
               <h3>{JSON.stringify(this.state.content)}</h3>
               </header> 
            </div>
            
        )
    }
}