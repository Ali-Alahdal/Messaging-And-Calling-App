import React, { useEffect, useRef, useState } from "react";
// import SimplePeer from "simple-peer/simplepeer.min.js";
import io from 'socket.io-client';

import SimplePeer from 'simple-peer/simplepeer.min.js';

function CallDialog({ active, setIsActive }) {
  const refDiv = useRef(null);
  const refDiv2 = useRef(null);

  // Append dialog to the root element
  useEffect(() => {
    document.getElementById("root").append(refDiv2.current);
    document.getElementById("root").append(refDiv.current);
  }, []);

  // Handle dialog visibility and WebSocket connection
  useEffect(() => {
    if (active) {
      refDiv.current.classList.remove("hidden");
      refDiv2.current.classList.remove("hidden");
    }else {
      refDiv.current?.classList.add("hidden");
      refDiv2.current?.classList.add("hidden");
    }
  }, [active]);

  const [socket, setSocket] = useState(null);
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);
  const localAudio = useRef();

  useEffect(() => {
      const ws = new WebSocket('ws://127.0.0.1:8000/ws/call/room1/');
      setSocket(ws);

      navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
              setStream(stream);
              localAudio.current.srcObject = stream;
          });

      ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'offer') {
              const peer = new SimplePeer({
                  initiator: false,
                  trickle: false,
                  stream
              });
              peer.signal(data.offer);

              peer.on('signal', answer => {
                  ws.send(JSON.stringify({ type: 'answer', answer }));
              });

              peer.on('stream', remoteStream => {
                  const remoteAudio = document.createElement('audio');
                  remoteAudio.srcObject = remoteStream;
                  remoteAudio.play();
              });

              setPeer(peer);
          }
      };

      return () => ws.close();
  }, []);

  const startCall = () => {
      const peer = new SimplePeer({
          initiator: true,
          trickle: false,
          stream
      });

      peer.on('signal', offer => {
          socket.send(JSON.stringify({ type: 'offer', offer }));
      });

      peer.on('stream', remoteStream => {
          const remoteAudio = document.createElement('audio');
          remoteAudio.srcObject = remoteStream;
          remoteAudio.play();
      });

      setPeer(peer);
  };

  const endCall = () => {
      if (peer) peer.destroy();
  };


  return (
    <>
      <div
        ref={refDiv2} onClick={() => setIsActive(false)} className="fixed w-full h-full top-0 bg-opacity-20 bg-black"></div>
      <div ref={refDiv} className="fixed w-1/2 h-1/2 top-[25%] left-[25%] bg-[var(--bgS)] overflow-y-auto border-2 border-blue-100 rounded-xl p-1" >
      <div>
            <audio ref={localAudio} autoPlay muted />
            <button onClick={startCall}>Start Call</button>
            <button onClick={endCall}>End Call</button>
        </div>
        
      </div>
    </>
  );
}

export default CallDialog;
