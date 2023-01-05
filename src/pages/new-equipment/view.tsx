import Link from 'next/link';
import ReactCrop, { Crop } from "react-image-crop";

import { CropPreview, LoaderButton } from '../../components';
import { IEquipmentType } from '../../store/data/types';

export function NewEquipmentView({
  cancelImage,
  crop,
  equipmentTypes,
  description,
  editing,
  feedback,
  fullCrop,
  changeDescription,
  changeName,
  changeType,
  image,
  loading,
  name,
  onCropChange,
  onCropComplete,
  onImageLoaded,
  onSelectFile,
  prevImage,
  staffIsAuthenticated,
  submit,
  theme,
  tinyCrop,
  typeId
}: Props): JSX.Element {
  // move up into parent container NewEquipment component?
  const dir = staffIsAuthenticated
    ? 'https://s3.amazonaws.com/nobsc-images-01/equipment'
    : 'https://s3.amazonaws.com/nobsc-user-equipment';

  return (
    <div className={`new-equipment one-col-a ${theme}`}>
      <h1>New Equipment</h1>

      <p className="feedback">{feedback}</p>

      <h2 className="new-equipment__h2">Type of Equipment</h2>
      <select name="equipmentType" onChange={changeType} required value={typeId}>
        <option value=""></option>
        {equipmentTypes.map(({ id, name }) => (<option key={id} value={id}>{name}</option>))}
      </select>

      <h2 className="new-equipment__h2">Name</h2>
      <input className="new-equipment-name" onChange={changeName} type="text" value={name} />

      <h2 className="new-equipment__h2">Description</h2>
      <textarea className="new-equipment-description" onChange={changeDescription} value={description} />

      <div className="new-equipment-image">
        <h2 className="new-equipment__h2">Image of Equipment</h2>

        {!image && (
          <div>
            {!editing ? <img src={`${dir}/nobsc-equipment-default`} /> : prevImage && <img src={`${dir}/${prevImage}`} />}
            <h4 className="new-equipment__h4">Change</h4>
            <input accept="image/*" className="new-equipment-image__input" onChange={onSelectFile} type="file" />
          </div>
        )}

        {image && (
          <div>
            <ReactCrop
              className="crop-tool"
              crop={crop}
              imageStyle={{minHeight: "300px"}}
              onChange={onCropChange}
              onComplete={onCropComplete}
              onImageLoaded={onImageLoaded}
              src={image as string}
              style={{minHeight: "300px"}}
            />
            <CropPreview cancelImage={cancelImage} fullCrop={fullCrop} loading={loading} tinyCrop={tinyCrop} />
          </div>
        )}
      </div>

      <div className="new-equipment-finish">
        <Link href="/dashboard"><a className="cancel-button">Cancel</a></Link>

        <LoaderButton
          className="submit-button"
          id="create_new_private_user_equipment_button"
          isLoading={loading}
          loadingText="Creating..."
          name="submit"
          onClick={submit}
          text="Create"
        />
      </div>
    </div>
  );
}

type Props = {
  cancelImage():                                           void;
  crop:                                                    Crop;
  equipmentTypes:                                          IEquipmentType[];
  description:                                             string;
  editing:                                                 boolean;
  feedback:                                                string;
  fullCrop:                                                string;
  changeDescription(e: React.SyntheticEvent<EventTarget>): void;
  changeName(e: React.SyntheticEvent<EventTarget>):        void;
  changeType(e: React.SyntheticEvent<EventTarget>):        void;
  image:                                                   string | ArrayBuffer | null;
  loading:                                                 boolean;
  name:                                                    string;
  onCropChange(crop: Crop):                                void;
  onCropComplete(crop: Crop):                              void;
  onImageLoaded(image: HTMLImageElement):                  void;
  onSelectFile(e: React.ChangeEvent<HTMLInputElement>):    void;
  prevImage:                                               string;
  staffIsAuthenticated?:                                   boolean;
  submit():                                                void;
  theme:                                                   string;
  tinyCrop:                                                string;
  typeId:                                                  number;
};