import Link from 'next/link';

export function Avatar({
  authname,
  onSelectFile
}: Props): JSX.Element {
  return (
    <div className="dashboard-avatar">
      <Link href={`/profile/${authname}`}>
        <a className="dashboard-avatar__a">View Profile</a>
      </Link>

      <h2>Profile Picture</h2>

      <div className="avatar-crops">
        <div className="avatar-crop--full">
          <span>Full Size: </span>

          <img
            className="avatar-crop__img--full"
            src={`https://s3.amazonaws.com/nobsc-user-avatars/${authname}`}
          />
        </div>

        <div className="avatar-crop--tiny">
          <span>Tiny Size: </span>

          <img
            className="avatar-crop__img--tiny"
            src={`https://s3.amazonaws.com/nobsc-user-avatars/${authname}-tiny`}
          />
        </div>
      </div>

      <label className="dashboard-avatar__label">Change</label>

      <input
        accept="image/*"
        className="dashboard-avatar__input"
        name="set-avatar"
        onChange={onSelectFile}
        type="file"
      />
    </div>
  );
}

type Props = {
  authname: string;
  onSelectFile(e: React.ChangeEvent<HTMLInputElement>): void;
};