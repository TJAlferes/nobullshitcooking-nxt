import { IMessageWithClientTimestamp } from '../../store/chat/types';

function formattedMessage(authname: string, { kind, from, to, text }: IMessageWithClientTimestamp) {
  if (kind === "public") {
    if (from === "messengerstatus") return <span className="message--admin">{text}</span>;                  // status
    if (authname === from)          return <><span className="message--self">{from}:{' '}</span>{text}</>;  // sent
    return <><span className="message--other">{from}:{' '}</span>{text}</>;                                 // received
  }

  if (authname === from)
    return <><span className="message--self">You whisper to{' '}{to}:{' '}</span><span className="message--private">{text}</span></>;    // sent

  return <><span className="message--other">{from}{' '}whispers to you:{' '}</span><span className="message--private">{text}</span></>;  // received
};

export function MessagesView({ authname, changeMessageInput, messages, messagesRef, messageToSend, send, status }: Props): JSX.Element {
  return (
    <div className="chat-messages">
      <ul className="chat-message-list" ref={messagesRef}>
        {messages && messages.map(message =>
          <li className="chat-message" key={message.id}><span className="message-ts">{message.ts}{' '}</span>{formattedMessage(authname, message)}</li>
        )}
      </ul>

      <input className="chat__input" disabled={status !== "connected"} name="chat-input" onChange={changeMessageInput} onKeyUp={(e) => send(e)} type="text" value={messageToSend} />
    </div>
  );
}

type Props = {
  authname:                                                 string;
  changeMessageInput(e: React.SyntheticEvent<EventTarget>): void;
  messages:                                                 IMessageWithClientTimestamp[];
  messagesRef:                                              React.RefObject<HTMLUListElement>;
  messageToSend:                                            string;
  send(e: React.KeyboardEvent):                             void;
  status:                                                   string;
};