import { IMessageWithClientTimestamp } from '../../store/chat/types';

export function MessagesView({
  authname,
  changeMessageInput,
  sendMessage,
  messages,
  messagesRef,
  messageToSend,
  status
}: Props): JSX.Element {
  const publicMessage =
    ({ from: { username }, text }: IMessageWithClientTimestamp) => {
    // status message
    if (username === "messengerstatus") {
      return <span className="message__admin">{text}</span>;
    }

    // sent public message
    if (authname === username) {
      return <><span className="message__self">{username}:{' '}</span>{text}</>;
    }

    // received public message
    return <><span className="message__other">{username}:{' '}</span>{text}</>;
  };

  const privateMessage =
    ({ to, from: { username }, text }: IMessageWithClientTimestamp) => {
    // sent private message
    if (authname === username) {
      return (
        <>
          <span className="message__self">You whisper to{' '}{to}:{' '}</span>
          <span className="message__private">{text}</span>
        </>
      );
    }

    // received private message
    return (
      <>
        <span className="message__other">
          {username}{' '}whispers to you:{' '}
        </span>
        <span className="message__private">{text}</span>
      </>
    );
  };

  return (
    <div className="chat__messages">
      <ul className="chat__message-list" ref={messagesRef}>
        <li className="chat__message">
          <span className="message__admin">COOK EAT WIN REPEAT</span>
        </li>

        {messages && messages.map(message => {
          const { id, kind, ts } = message;
          return (
            <li className="chat__message" key={id}>
              <span className="message__ts">{ts}{' '}</span>
              {(kind === "public") && publicMessage(message)}
              {(kind === "private") && privateMessage(message)}
            </li>
          );
        })}
      </ul>

      <div className="chat__input">
        <input
          disabled={status !== "Connected"}
          name="chat-input"
          onChange={changeMessageInput}
          onKeyUp={(e) => sendMessage(e)}
          type="text"
          value={messageToSend}
        />
      </div>
    </div>
  );
}

type Props = {
  authname: string;
  changeMessageInput(e: React.SyntheticEvent<EventTarget>): void;
  sendMessage(e: React.KeyboardEvent): void;
  messages: IMessageWithClientTimestamp[];
  messagesRef: React.RefObject<HTMLUListElement>;
  messageToSend: string;
  status: string;
};