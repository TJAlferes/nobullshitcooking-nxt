import Link from 'next/link';
import ReactCrop, { Crop } from "react-image-crop";

import { CropPreview, LoaderButton } from '../../components';
import type { IEquipmentType } from '../../store/data/types';

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

      <h2>Type of Equipment</h2>
      <select name="equipmentType" onChange={changeType} required value={typeId}>
        <option value=""></option>
        {equipmentTypes.map(({ id, name }) => (<option key={id} value={id}>{name}</option>))}
      </select>

      <h2>Name</h2>
      <input className="name" onChange={changeName} type="text" value={name} />

      <h2>Description</h2>
      <textarea className="description" onChange={changeDescription} value={description} />

      <div>
        <h2>Image of Equipment</h2>

        {!image && (
          <div>
            {!editing ? <img src={`${dir}/nobsc-equipment-default`} /> : prevImage && <img src={`${dir}/${prevImage}`} />}
            <h4>Change</h4>
            <input accept="image/*" onChange={onSelectFile} type="file" />
          </div>
        )}

        {image && (
          <div>
            <ReactCrop
              aspect={1}
              className="crop-tool"
              crop={crop}
              onChange={onCropChange}
              onComplete={onCropComplete}
              style={{minHeight: "300px"}}
            >
              <img onLoad={onImageLoaded} src={image as string} />
            </ReactCrop>
            <CropPreview cancelImage={cancelImage} fullCrop={fullCrop} loading={loading} tinyCrop={tinyCrop} />
          </div>
        )}
      </div>

      <div className="finish">
        <Link href="/dashboard" className="cancel-button">Cancel</Link>

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
  cancelImage():                                            void;
  crop:                                                     Crop;
  equipmentTypes:                                           IEquipmentType[];
  description:                                              string;
  editing:                                                  boolean;
  feedback:                                                 string;
  fullCrop:                                                 string;
  changeDescription(e: React.SyntheticEvent<EventTarget>):  void;
  changeName(e: React.SyntheticEvent<EventTarget>):         void;
  changeType(e: React.SyntheticEvent<EventTarget>):         void;
  image:                                                    string | ArrayBuffer | null;
  loading:                                                  boolean;
  name:                                                     string;
  onCropChange(crop: Crop):                                 void;
  onCropComplete(crop: Crop):                               void;
  onImageLoaded(e: React.SyntheticEvent<HTMLImageElement>): void;
  onSelectFile(e: React.ChangeEvent<HTMLInputElement>):     void;
  prevImage:                                                string;
  staffIsAuthenticated?:                                    boolean;
  submit():                                                 void;
  theme:                                                    string;
  tinyCrop:                                                 string;
  typeId:                                                   number;
};