import { IMessageWithClientTimestamp } from '../../store/chat/types';

export function MessagesView({authname, changeMessageInput, messages, messagesRef, messageToSend, sendMessage, status}: Props): JSX.Element {
  const publicMessage = ({ from, text }: IMessageWithClientTimestamp) => {
    if (from === "messengerstatus")
      return <span className="message--admin">{text}</span>;  // status

    if (authname === from)
      return <><span className="message--self">{from}:{' '}</span>{text}</>;  // sent

    return <><span className="message--other">{from}:{' '}</span>{text}</>;  // received
  };

  const privateMessage = ({ to, from, text }: IMessageWithClientTimestamp) => {
    if (authname === from)
      return <><span className="message--self">You whisper to{' '}{to}:{' '}</span><span className="message--private">{text}</span></>;  // sent
      
    return <><span className="message--other">{from}{' '}whispers to you:{' '}</span><span className="message--private">{text}</span></>;  // received
  };

  return (
    <div className="chat-messages">
      <ul className="chat-message-list" ref={messagesRef}>
        <li className="chat-message"><span className="message--admin">COOK EAT WIN REPEAT</span></li>

        {messages && messages.map(message => {
          const { id, kind, ts } = message;
          return (
            <li className="chat-message" key={id}>
              <span className="message-ts">{ts}{' '}</span>
              {(kind === "public") && publicMessage(message)}
              {(kind === "private") && privateMessage(message)}
            </li>
          );
        })}
      </ul>

      <input
        className="chat__input"
        disabled={status !== "Connected"}
        name="chat-input"
        onChange={changeMessageInput}
        onKeyUp={(e) => sendMessage(e)}
        type="text"
        value={messageToSend}
      />
    </div>
  );
}

type Props = {
  authname: string;
  changeMessageInput(e: React.SyntheticEvent<EventTarget>): void;
  messages: IMessageWithClientTimestamp[];
  messagesRef: React.RefObject<HTMLUListElement>;
  messageToSend: string;
  sendMessage(e: React.KeyboardEvent): void;
  status: string;
};