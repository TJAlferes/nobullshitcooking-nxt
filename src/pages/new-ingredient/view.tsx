import Link                from 'next/link';
import ReactCrop, { Crop } from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';

import { CropPreview, LoaderButton } from '../../components';
import type { IIngredientType }      from '../../store/data/types';

export function NewIngredientView({
  cancelImage,
  crop,
  ingredientTypes,
  description,
  editingId,
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
  submit,
  tinyCrop,
  typeId
}: Props) {
  // move up into parent container NewIngredient component?
  const dir = 'https://s3.amazonaws.com/nobsc-user-ingredients';

  return (
    <div className="new-ingredient one-col-a">
      <h1>New Ingredient</h1>

      <p className="feedback">{feedback}</p>

      <h2>Type of Ingredient</h2>
      <select name="ingredientType" onChange={changeType} required value={typeId}>
        <option value=""></option>
        {ingredientTypes.map(({ id, name }) => (<option key={id} value={id}>{name}</option>))}
      </select>

      <h2>Name</h2>
      <input className="name" onChange={changeName} type="text" value={name} />

      <h2>Description</h2>
      <textarea className="description" onChange={changeDescription} value={description} />

      <div>
        <h2>Image of Ingredient</h2>
        {!image && (
          <div>
            {!editingId ? <img src={`${dir}/nobsc-ingredient-default`} /> : prevImage && <img src={`${dir}/${prevImage}`} />}
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
          id="create_new_private_user_ingredient_button"
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
  ingredientTypes:                                          IIngredientType[];
  description:                                              string;
  editingId:                                                number | null;
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
  submit():                                                 void;
  tinyCrop:                                                 string;
  typeId:                                                   number;
};
