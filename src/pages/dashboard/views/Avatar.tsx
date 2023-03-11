import Link from 'next/link';

const url = "https://s3.amazonaws.com/nobsc-user-avatars";

export function Avatar({ authname, onSelectFile }: Props) {
  return (
    <div className="dashboard-avatar">
      <Link href={`/profile/${authname}`}>View Profile</Link>

      <h2>Profile Picture</h2>

      <div className="avatar-crops">
        <div className="--full"><span>Full Size: </span><img src={`${url}/${authname}`} /></div>
        <div className="--tiny"><span>Tiny Size: </span><img src={`${url}/${authname}-tiny`} /></div>
      </div>

      <label>Change</label>
      <input accept="image/*" name="set-avatar" onChange={onSelectFile} type="file" />
    </div>
  );
}

type Props = {
  authname:                                             string;
  onSelectFile(e: React.ChangeEvent<HTMLInputElement>): void;
};
