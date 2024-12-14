import { useRef, useState } from "react";
import { useEffect } from "react";
import { createChatsAPI, getChatsAPI } from "../../Hooks/APIs";


function CallDailog(props) {
    const refDiv = useRef(null);
    const refDiv2 = useRef(null);
    const refName = useRef(null); 

    useEffect(() =>{
        document.getElementById("root").append(refDiv2.current);
        document.getElementById("root").append(refDiv.current);
    
    },[props.active ])

    
    useEffect(() =>{
        if(props.active){
            refDiv.current.classList.remove("hidden");
            refDiv2.current.classList.remove("hidden");
        }else{
            refDiv.current?.classList.add("hidden");
            refDiv2.current?.classList.add("hidden");
        }
        
        
    },[props.active ])
   

    const [isCalling, setIsCalling] = useState(false);
    const localStream = useRef(null);
    const remoteStream = useRef(null);
    const peerConnection = useRef(null);
    const signalingSocket = useRef(null);
    const pendingCandidates = [];

  
    useEffect(() => {
      console.log("Initializing WebSocket connection...");
      signalingSocket.current = new WebSocket('ws://127.0.0.1:8000/ws/call/');
      
      signalingSocket.current.onopen = () => {
        console.log("Signaling WebSocket connected.");
      };
  
      signalingSocket.current.onmessage = async (message) => {
        const data = JSON.parse(message.data);
        console.log("Received signaling message:" ,JSON.parse(data).type );
  
        try {
          if (JSON.parse(data).type === 'offer') {
            console.log("Processing offer...");
            
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(JSON.parse(data).offer));
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);
            signalingSocket.current.send(JSON.stringify({ type: 'answer', answer }));
            console.log("Sent answer.");
          } else if (JSON.parse(data).type === 'answer') {
            console.log("Processing answer...");
            console.log(JSON.parse(data).answer);

            if (peerConnection.current?.signalingState === 'have-local-offer') {
              await peerConnection.current.setRemoteDescription(new RTCSessionDescription(JSON.parse(data).answer));
              console.log("Remote description set with answer.");
              while (pendingCandidates.length > 0) {
                await peerConnection.current.addIceCandidate(new RTCIceCandidate(pendingCandidates.shift()));
              }
            }else {
              console.warn("Unexpected state for setting answer:", peerConnection.current.signalingState);
            }

          } else if (JSON.parse(data).type === 'candidate') {
              if (peerConnection.current.remoteDescription) {
                console.log("Adding ICE candidate...");
                await peerConnection.current.addIceCandidate(new RTCIceCandidate(JSON.parse(data).candidate));
              }
              else {
                pendingCandidates.push(data.candidate);
              }
          } else {
            console.warn("Unknown message type:", data.type);
          }
        } catch (error) {
          console.error("Error processing signaling message:", error);
        }
      };
  
      signalingSocket.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
  
      signalingSocket.current.onclose = () => {
        console.log("Signaling WebSocket closed.");
      };
  
      return () => {
        console.log("Cleaning up WebSocket connection...");
        signalingSocket.current.close();
      };
    }, []);
  
    const startCall = async () => {
      console.log("Starting call...");
      setIsCalling(true);
  
      try {
        // Get local audio stream
        console.log("Requesting local audio stream...");
        localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Local audio stream obtained.");
  
        // Initialize RTCPeerConnection
        console.log("Initializing RTCPeerConnection...");
        peerConnection.current = new RTCPeerConnection();
  
        // Add local stream tracks to peer connection
        localStream.current.getTracks().forEach((track) => {
          console.log("Adding track to peer connection:", track);
          peerConnection.current.addTrack(track, localStream.current);
        });
  
        // Listen for remote stream
        peerConnection.current.ontrack = (event) => {
          console.log("Received remote track:", event.streams[0]);
          remoteStream.current.srcObject = event.streams[0];
        };
  
        // Send ICE candidates to signaling server
        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("Sending ICE candidate:", event.candidate);
            signalingSocket.current.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
          }
        };
  
        // Create and send offer
        console.log("Creating and sending offer...");
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        signalingSocket.current.send(JSON.stringify({ type: 'offer', offer }));
        console.log("Offer sent.");
      } catch (error) {
        console.error("Error starting call:", error);
      }
    };
  
   
    return ( 
        
        <>
            <div ref={refDiv2} onClick={() => props.setIsActive(false)}  className="fixed w-full h-full top-0  bg-opacity-20 bg-black ">

            </div>

            <div ref={refDiv} className="fixed w-1/2 h-1/2 top-[25%] left-[25%]  bg-[var(--bgS)] overflow-y-auto  border-2 border-blue-100 rounded-xl  p-1"
            style={{scrollbarWidth:"none"}} >

                <div className="relative w-100 h-20 p-2 text-center bg-[var(--bg)] rounded-xl ">
                <div>
                  <button onClick={startCall} disabled={isCalling}>Start Call</button>
                  <audio ref={remoteStream} autoPlay  />
                </div>
                </div>
            
            </div>

          

         
        </> 

        );
}

export default CallDailog;