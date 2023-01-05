import Link from 'next/link';
import ReactCrop, { Crop } from "react-image-crop";

import { CropPreview, LoaderButton } from '../../components';
import { IIngredientType } from '../../store/data/types';

export function NewIngredientView({
  cancelImage,
  crop,
  ingredientTypes,
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
  // move up into parent container NewIngredient component?
  const dir = staffIsAuthenticated
    ? 'https://s3.amazonaws.com/nobsc-images-01/ingredients'
    : 'https://s3.amazonaws.com/nobsc-user-ingredients';

  return (
    <div className={`new-ingredient one-col-a ${theme}`}>
      <h1>New Ingredient</h1>

      <p className="feedback">{feedback}</p>

      <h2 className="new-ingredient__h2">Type of Ingredient</h2>
      <select name="ingredientType" onChange={changeType} required value={typeId}>
        <option value=""></option>
        {ingredientTypes.map(({ id, name }) => (<option key={id} value={id}>{name}</option>))}
      </select>

      <h2 className="new-ingredient__h2">Name</h2>
      <input className="new-ingredient-name" onChange={changeName} type="text" value={name} />

      <h2 className="new-ingredient__h2">Description</h2>
      <textarea className="new-ingredient-description" onChange={changeDescription} value={description} />

      <div className="new-ingredient-image">
        <h2 className="new-ingredient__h2">Image of Ingredient</h2>
        {!image && (
          <div>
            {!editing
              ? <img src={`${dir}/nobsc-ingredient-default`} />
              : prevImage && <img src={`${dir}/${prevImage}`} />
            }
            <h4 className="new-ingredient__h4">Change</h4>
            <input accept="image/*" className="new-ingredient-image__input" onChange={onSelectFile} type="file" />
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

      <div className="new-ingredient-finish">
        <Link href="/dashboard"><a className="cancel-button">Cancel</a></Link>
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
  cancelImage():                                           void;
  crop:                                                    Crop;
  ingredientTypes:                                         IIngredientType[];
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