export function OptionsView({changeRoom, changeRoomInput, connect, disconnect, loading, room, roomToEnter, status}: Props): JSX.Element {
  return (
    <div className="chat-options">
      <button disabled={loading} onClick={status === "connected" ? disconnect : connect}>
        {status === "connected" ? "Disconnect" : "Connect"}
      </button>

      <div className="current-room">
        <label>Current Room:</label><span>{room}</span>
      </div>

      <div className="change-room">
        <label>Go To Room:</label>

        <input disabled={(status !== "connected") || loading} name="change-room-input" onChange={changeRoomInput} type="text" value={roomToEnter} />

        <button disabled={(status !== "connected") || loading} onClick={changeRoom}>Enter</button>
      </div>
    </div>
  );
}

type Props = {
  changeRoom():                                          void;
  changeRoomInput(e: React.SyntheticEvent<EventTarget>): void;
  connect():                                             void;
  disconnect():                                          void;
  loading:                                               boolean;
  room:                                                  string;
  roomToEnter:                                           string;
  status:                                                string;
};