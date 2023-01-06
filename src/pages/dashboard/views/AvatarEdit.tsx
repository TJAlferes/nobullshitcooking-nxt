import ReactCrop, { Crop } from 'react-image-crop';

export function AvatarEdit({ avatar, cancelAvatar, crop, fullCrop, loading, onCropChange, onCropComplete, onImageLoaded, submitAvatar, tinyCrop }: Props): JSX.Element {
  return (
    <div className="dashboard-avatar-edit">
      <ReactCrop
        className="avatar-edit-tool"
        crop={crop}
        imageStyle={{minHeight: "300px"}}
        onChange={onCropChange}
        onComplete={onCropComplete}
        onImageLoaded={onImageLoaded}
        src={avatar as string}
        style={{minHeight: "300px"}}
      />

      <p>Move the crop to your desired position, then click "Complete". These two images will be saved for you:</p>

      <div className="avatar-crops">
        <div className="--full"><span>Full Size: </span><img src={fullCrop} /></div>
        <div className="--tiny"><span>Tiny Size: </span><img src={tinyCrop} /></div>
      </div>

      <button className="--cancel" disabled={loading} name="cancel-avatar" onClick={cancelAvatar}>Cancel</button>
      <button className="--submit" disabled={loading} name="submit-avatar" onClick={submitAvatar}>Complete</button>
    </div>
  );
}

type Props = {
  avatar:                                 string | ArrayBuffer | null;
  cancelAvatar():                         void;
  crop:                                   Crop;
  fullCrop:                               string;
  loading:                                boolean;
  onCropChange(crop: Crop):               void;
  onCropComplete(crop: Crop):             void;
  onImageLoaded(image: HTMLImageElement): void;
  submitAvatar():                         void;
  tinyCrop:                               string;
};