import './ChatOtherCard.css'

const ChatOtherCard = ({ chatOtherItem, index}) => {
  return (
    <article className="chat-other-message-container">
      <p>{chatOtherItem.message}</p>
      <p className='chat-other-message-container_timestamp'>{chatOtherItem.timestamp}</p>
    </article>
  )
}

export default ChatOtherCard