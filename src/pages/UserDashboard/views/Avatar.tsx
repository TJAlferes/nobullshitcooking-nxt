import Link from 'next/link';
import React from 'react';

export function Avatar({
  authname,
  currentAvatar,
  onSelectFile
}: Props): JSX.Element {
  return (
    <div className="dashboard__avatar">
      <Link href={`/user/profile/${authname}`}>
        <a className="dashboard__avatar-profile-link">View Profile</a>
      </Link>

      <h2>Profile Picture</h2>

      <div className="dashboard__avatar-crops">
        <div className="dashboard__avatar-crop-full">
          <span>Full Size: </span>
          <img src={`https://s3.amazonaws.com/nobsc-user-avatars/${currentAvatar}`} />
        </div>

        <div className="dashboard__avatar-crop-tiny">
          <span>Tiny Size: </span>
          <img src={`https://s3.amazonaws.com/nobsc-user-avatars/${currentAvatar}-tiny`} />
        </div>
      </div>

      <label className="dashboard__avatar-label">Change</label>

      <input
        accept="image/*"
        className="dashboard__avatar-input"
        name="set-avatar"
        onChange={onSelectFile}
        type="file"
      />
    </div>
  );
}

type Props = {
  authname: string;
  currentAvatar: string;
  onSelectFile(e: React.ChangeEvent<HTMLInputElement>): void;
};