import './ChatCard.css'

const ChatCard = ({ chatItem, index}) => {
  console.log(chatItem);
  return (
    <article className="chat-message-container">
      <p>{chatItem.message}</p>
      <p className='chat-message-container_timestamp'>{chatItem.timestamp}</p>
    </article>
  )
}

export default ChatCard