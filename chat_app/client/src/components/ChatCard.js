import "./ChatCard.css";
import { useParams } from "react-router-dom";

const ChatCard = ({ chatItem, index }) => {
  const room = useParams().id;
  return (
    <>
    {chatItem.room === room ? (
      <article key={index} className={`chat-message-container${chatItem.id}`}>
        <p className="chat-message-container_user">{chatItem.user}</p>
        <p>{chatItem.message}</p>
        <p className="chat-message-container_timestamp">{chatItem.timestamp}</p>
      </article>
    ) : (
      ""
    )}
    </>
    )
  
};

export default ChatCard;
