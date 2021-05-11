export function OptionsView({
  changeRoom,
  changeRoomInput,
  connect,
  disconnect,
  loading,
  room,
  roomToEnter,
  status
}: Props): JSX.Element {
  return (
    <div className="chat-options">
      <button
        className="connection__button"
        disabled={loading}
        onClick={status === "Connected" ? disconnect : connect}
      >
        {status === "Connected" ? 'Disconnect' : 'Connect'}
      </button>

      <div className="current-room">
        <span className="current-room__label">Current Room:</span>

        <span className="current-room__value">{room}</span>
      </div>

      <div className="change-room">
        <span className="change-room__label">Go To Room:</span>

        <input
          className="change-room__input"
          disabled={(status !== "Connected") || loading}
          name="change-room-input"
          onChange={changeRoomInput}
          type="text"
          value={roomToEnter}
        />

        <button
          className="change-room__button"
          disabled={(status !== "Connected") || loading}
          onClick={changeRoom}
        >
          Enter
        </button>
      </div>
    </div>
  );
}

type Props = {
  changeRoom(): void;
  changeRoomInput(e: React.SyntheticEvent<EventTarget>): void;
  connect(): void;
  disconnect(): void;
  loading: boolean;
  room: string;
  roomToEnter: string;
  status: string;
};