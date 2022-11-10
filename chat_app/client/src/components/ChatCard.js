import './ChatCard.css'

const ChatCard = ({ chatItem, index}) => {
  return (
    <article key={index} className={`chat-message-container${chatItem.id}`}>
      <p>{chatItem.message}</p>
      <p className='chat-message-container_timestamp'>{chatItem.timestamp}</p>
    </article>
  )
}

export default ChatCard