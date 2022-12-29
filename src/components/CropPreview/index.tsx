export function CropPreview({ cancelImage, fullCrop, loading, tinyCrop }: Props): JSX.Element {
  return (
    <>
      <p className="crop-tip">Move the crop to your desired position. These two images will be saved for you:</p>

      <div className="crop-previews">
        <div className="crop-preview-full"><span className="crop__span"></span><img className="crop__img" src={fullCrop} /></div>
        <div className="crop-preview-tiny"><span className="crop__span"></span><img className="crop__img" src={tinyCrop} /></div>
      </div>

      <button className="crop__button" disabled={loading} onClick={cancelImage}>Cancel</button>
    </>
  );
}

type Props = {
  cancelImage(): void;
  fullCrop: string;
  loading: boolean;
  tinyCrop: string;
};