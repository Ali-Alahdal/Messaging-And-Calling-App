function Message(props) {
    return ( 
        // props.left ?
        <div ref={props.lastMessage} className={"flex p-3 bg-[var(--btn-l)] text-white rounded-2xl gap-3 h-max  my-2 w-max max-w-[500px] max-h-auto overflow-x-hidden " + props.style} >
            <span className="w-100  break-all	 ">{props.content}</span>
            <span className="text-xs text-[#aaaaaa]  align-bottom content-end	">Time</span>
        </div>
        // :
        // <div ref={props.lastMessage} className="flex p-3 bg-[var(--btn-l)] text-white rounded-2xl gap-3  my-2 place-self-end max-w-[500px] max-h-auto overflow-x-hidden">
        //     <span className="w-100 break-all">{props.content}</span>
        //     <span className="text-xs text-[#aaaaaa]  align-bottom content-end	">Time</span>
        // </div>
      );
}

export default Message;