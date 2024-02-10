import React, { useEffect ,useState } from 'react'
import {user} from"../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import sendLogo1 from "../Image/sendLogo.jpg";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import image1 from"../Image/remove.jpg";

let socket;
const ENDPOINT='https://we-chat-1.herokuapp.com/';


const Chat = () => {

  //  const [id,setid]= useState("")
    const [id, setid] = useState("");
    const [messages,setMessages]= useState([])

  
    const send= () =>{
        const message=document.getElementById('chatInput').value;
        socket.emit('message',{message,id});
        document.getElementById('chatInput').value="";

    }
    console.log(messages);

    useEffect(() => {

    socket=socketIo(ENDPOINT,{transports:['websocket']}); 

      socket.on('connect',()=>{
          
          setid(socket.id);
      })
      console.log(socket);

      socket.emit('joined',{ user })
      
      socket.on('welcome',(data) =>{
         setMessages([...messages,data]);
        console.log(data.user,data.message);
      })

      socket.on('userJoined',(data)=>{
       setMessages([...messages,data]);
          console.log(data.user,data.message);
      })
      socket.on('leave',(data)=>{
       setMessages([...messages,data]);
          console.log(data.user,data.message);
      })
      return () => {
       socket.emit('Disconnect')
        socket.off();
      }
    }, [])
    
  

    useEffect(() => {
      socket.on('sendMessage',(data)=>{
        setMessages([...messages,data]);
          console.log(data.user,data.message,data.id);
      })
    
      return () => {
        socket.off(); 
      }
      
    },[messages])
    

    return (
    <div className="chatPage">
        <div className="chatContainer">
            <div className="header">
                <h2>We Chat</h2>
                <a href='/'><img src={image1} alt="logo"></img> </a> 
                
            </div>
            <ReactScrollToBottom className="chatBox">

                { messages.map((item,i) =>  <Message  user={item.id===id ? '':item.user} message={item.message} classs={item.id === id ?'right':'left' }/>)}
            </ReactScrollToBottom>
            <div className="inputBox">
                <input type="text" id="chatInput" onKeyPress={(event)=>event.key==='Enter' ? send():null}></input>
                <button onClick={send} className="sendBtn"><img src={sendLogo1} alt="Send"></img></button>
            </div>
        </div>
    </div>
  )

}

export default Chat

     
/* { <messages>
    <Message message={'hey whats up'} classs='left'/>
    <Message message={'hey whats up'} classs='right'/>
    </messages> }*/
           