import Link from 'next/link';
import ReactCrop, { Crop } from "react-image-crop";

import { LoaderButton } from '../../components';
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
  handleSubmit,
  changeType,
  image,
  loading,
  name,
  onCropChange,
  onCropComplete,
  oneColumnATheme,
  onImageLoaded,
  onSelectFile,
  prevImage,
  staffIsAuthenticated,
  tinyCrop,
  typeId
}: Props): JSX.Element {
  // move up into parent container NewIngredient component?
  const dir = staffIsAuthenticated
    ? 'https://s3.amazonaws.com/nobsc-images-01/ingredients'
    : 'https://s3.amazonaws.com/nobsc-user-ingredients';

  return (
    <div className={`new-ingredient one-column-a ${oneColumnATheme}`}>
      <h1>New Ingredient</h1>

      <p className="feedback">{feedback}</p>

      <h2 className="new-ingredient__h2" data-test="ingredient-type-heading">
        Type of Ingredient
      </h2>

      <select
        name="ingredientType"
        onChange={changeType}
        required
        value={typeId}
      >
        <option value=""></option>
        {ingredientTypes.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      <h2 className="new-ingredient__h2" data-test="name-heading">Name</h2>

      <input
        className="new-ingredient__name"
        onChange={changeName}
        type="text"
        value={name}
      />

      <h2 className="new-ingredient__h2" data-test="description-heading">
        Description
      </h2>

      <textarea
        className="new-ingredient__description"
        onChange={changeDescription}
        value={description}
      />

      <div className="new-ingredient__image">
        <h2 className="new-ingredient__h2" data-test="image-heading">
          Image of Ingredient
        </h2>

        {!image && (
          <div>
            {!editing
              ? <img src={`${dir}/nobsc-ingredient-default`} />
              : prevImage && <img src={`${dir}/${prevImage}`} />
            }

            <h4 className="new-ingredient__h4">Change</h4>

            <input
              className="new-ingredient__image-input"
              type="file"
              accept="image/*"
              onChange={onSelectFile}
            />
          </div>
        )}

        {image && (
          <div>
            <ReactCrop
              className="new-ingredient__crop-tool"
              crop={crop}
              imageStyle={{minHeight: "300px"}}
              onChange={onCropChange}
              onComplete={onCropComplete}
              onImageLoaded={onImageLoaded}
              src={image as string}
              style={{minHeight: "300px"}}
            />

            <span className="crop-tool-tip">
              Move the crop to your desired position. These two images will be saved for you:
            </span>

            <div className="crops">
              <div className="crop-full-outer">
                <span>Full Size: </span>

                <img className="crop-full" src={fullCrop} />
              </div>

              <div className="crop-tiny-outer">
                <span>Tiny Size: </span>

                <img className="crop-tiny" src={tinyCrop} />
              </div>
            </div>

            <button
              className="image-cancel-button"
              disabled={loading}
              onClick={cancelImage}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="new-ingredient__finish-area">
        <Link href="/dashboard">
          <a className="cancel-button">Cancel</a>
        </Link>

        <LoaderButton
          className="submit-button"
          id="create_new_private_user_ingredient_button"
          isLoading={loading}
          loadingText="Creating..."
          name="submit"
          onClick={handleSubmit}
          text="Create"
        />
      </div>
    </div>
  );
}

type Props = {
  cancelImage(): void;
  crop: Crop;
  ingredientTypes: IIngredientType[];
  description: string;
  editing: boolean;
  feedback: string;
  fullCrop: string;
  changeDescription(e: React.SyntheticEvent<EventTarget>): void;
  changeName(e: React.SyntheticEvent<EventTarget>): void;
  handleSubmit(): void;
  changeType(e: React.SyntheticEvent<EventTarget>): void;
  image: string | ArrayBuffer | null;
  loading: boolean;
  name: string;
  onCropChange(crop: Crop): void;
  onCropComplete(crop: Crop): void;
  oneColumnATheme: string;
  onImageLoaded(image: HTMLImageElement): void;
  onSelectFile(e: React.ChangeEvent<HTMLInputElement>): void;
  prevImage: string;
  staffIsAuthenticated?: boolean;
  tinyCrop: string;
  typeId: number;
};