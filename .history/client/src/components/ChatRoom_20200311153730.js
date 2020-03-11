import React from 'react';
import { Smile, Frown, Meh } from 'react-feather';
import Paper from '@material-ui/core/Paper';
const ChatRoom=(props)=>{

var personalMessages=[];
var generalMessages=[];

if(props.messages){// eslint-disable-next-line
    personalMessages = props.messages.filter(el => {
        if ((el.username2 === props.username2 && el.username===localStorage.getItem('username')) || (el.username===props.username2 && el.username2=== localStorage.getItem('username'))) {
            return el;
        }
    })
    console.log("personalMessages", personalMessages);
// eslint-disable-next-line
    generalMessages = props.messages.filter(el => {
        if (el.username2 === undefined) {
            return el
        }
    })
    console.log('generalMessages', generalMessages);
}

if(props.personalChatRoom && personalMessages[0]!==undefined){
    return (
        <div >
            {personalMessages.map(el=>{
                return <Paper style={{padding: '3px',marginLeft:el.username===localStorage.getItem('username')?'auto':'',borderRadius: '20px', width: 'fit-content'}}>
                    <div  style={{padding : '3px',margin : 3, textAlign:el.username===localStorage.getItem('username')?'right':'left'}}>
                    <span style={{fontFamily: 'Josefin Sans', color: 'crimson',fontWeight: 'bold'}}>{el.username}</span>
                    <br/>
                    <span style={{fontSize: '18px',wordBreak: 'break-all'}}>{el.message}</span> <span style={{color: 'crimson'}}>{el.status==="positive"?<Smile/>:el.status==="negative"?<Frown/>:<Meh/>}</span></div>                    
                </Paper>
            })}
        </div>
    )
}
else if (!props.personalChatRoom && generalMessages[0] !== undefined){
    return (
        <div >
            {generalMessages.map(el => {
                return <Paper style={{padding: '3px', marginLeft:el.username===localStorage.getItem('username')?'auto':'',borderRadius: '20px', width: 'fit-content'}}>
                    <div  style={{padding : '3px',margin : 3,textAlign:el.username===localStorage.getItem('username')?'right':'left'}}>
                    <span style={{fontFamily: 'Josefin Sans', color: 'dodgerblue',fontWeight: 'bold'}}>{el.username}</span>
                    <br/>
                    <span style={{fontSize: '18px',wordBreak: 'break-all'}}>{el.message}</span> <span style={{color: 'dodgerblue'}}>{el.status==="positive"?<Smile/>:el.status==="negative"?<Frown/>:<Meh/>}</span></div>                        
                </Paper>
            })}
        </div>
    )

}
else{
    return (
            <div >
                Let's Chitchat !!
            </div>
    )}
}

export default ChatRoom;