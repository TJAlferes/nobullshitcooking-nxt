import { IMessageWithClientTimestamp } from '../../store/chat/types';

function formattedMessage(authname: string, { kind, from, to, text }: IMessageWithClientTimestamp) {
  if (kind === "public") {
    if (from === "messengerstatus") return <span className="--admin">{text}</span>;                  // status
    if (authname === from)          return <><span className="--self">{from}:{' '}</span>{text}</>;  // sent
    return <><span className="--other">{from}:{' '}</span>{text}</>;                                 // received
  }

  if (authname === from)
    return <><span className="--self">You whisper to{' '}{to}:{' '}</span><span className="--private">{text}</span></>;    // sent

  return <><span className="--other">{from}{' '}whispers to you:{' '}</span><span className="--private">{text}</span></>;  // received
};

export function MessagesView({ authname, changeMessageInput, messages, messagesRef, messageToSend, send, status }: Props): JSX.Element {
  return (
    <div className="chat-messages">
      <ul ref={messagesRef}>
        {messages && messages.map(message =>
          <li key={message.id}><span className="message-ts">{message.ts}{' '}</span>{formattedMessage(authname, message)}</li>
        )}
      </ul>

      <input disabled={status !== "connected"} name="chat-input" onChange={changeMessageInput} onKeyUp={(e) => send(e)} type="text" value={messageToSend} />
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