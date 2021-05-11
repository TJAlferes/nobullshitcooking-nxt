import { IMessageWithClientTimestamp } from '../../store/chat/types';

export function MessagesView({
  authname,
  changeMessageInput,
  messages,
  messagesRef,
  messageToSend,
  sendMessage,
  status
}: Props): JSX.Element {
  const publicMessage =
    ({ from: { username }, text }: IMessageWithClientTimestamp) => {
    // status message
    if (username === "messengerstatus") {
      return <span className="message--admin">{text}</span>;
    }

    // sent public message
    if (authname === username) {
      return <><span className="message--self">{username}:{' '}</span>{text}</>;
    }

    // received public message
    return <><span className="message--other">{username}:{' '}</span>{text}</>;
  };

  const privateMessage =
    ({ to, from: { username }, text }: IMessageWithClientTimestamp) => {
    // sent private message
    if (authname === username) {
      return (
        <>
          <span className="message--self">You whisper to{' '}{to}:{' '}</span>
          <span className="message--private">{text}</span>
        </>
      );
    }

    // received private message
    return (
      <>
        <span className="message--other">
          {username}{' '}whispers to you:{' '}
        </span>
        <span className="message--private">{text}</span>
      </>
    );
  };

  return (
    <div className="chat-messages">
      <ul className="chat-message-list" ref={messagesRef}>
        <li className="chat-message">
          <span className="message--admin">COOK EAT WIN REPEAT</span>
        </li>

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