import { Crop } from 'react-image-crop';

import {
  IEquipment,
  IIngredient,
  IPlan,
  IWorkRecipe
} from '../../store/data/types';
import {
  Avatar,
  AvatarEdit,
  Equipment,
  FavoriteRecipes,
  Ingredients,
  Plans,
  PrivateRecipes,
  PublicRecipes,
  SavedRecipes,
  Tabs
} from './views';

export function DashboardView({
  activateModal,
  authname,
  avatar,
  cancelAvatar,
  creatingPlan,
  crop,
  deactivateModal,
  deleteName,
  editingId,
  feedback,
  fullCrop,
  getApplicationNode,
  deletePlan,
  deletePrivateEquipment,
  deletePrivateIngredient,
  deletePrivateRecipe,
  disownPublicRecipe,
  subTabClick,
  tabClick,
  unfavoriteRecipe,
  unsaveRecipe,
  loading,
  modalActive,
  myFavoriteRecipes,
  myPlans,
  myPrivateEquipment,
  myPrivateIngredients,
  myPrivateRecipes,
  myPublicRecipes,
  mySavedRecipes,
  onCropChange,
  onCropComplete,
  onImageLoaded,
  onSelectFile,
  submitAvatar,
  subTab,
  tab,
  tinyCrop,
  twoColumnATheme
}: Props): JSX.Element {
  return (
    <div className={`dashboard two-column-a ${twoColumnATheme}`}>
      <h1>{authname}</h1>

      <p className="dashboard__feedback">{feedback}</p>

      {!avatar && <Tabs tab={tab} tabClick={tabClick} />}

      {(tab === "avatar") && (
        <>
          {!avatar && (
            <Avatar
              authname={authname}
              onSelectFile={onSelectFile}
            />
          )}

          {avatar && (
            <AvatarEdit
              avatar={avatar}
              cancelAvatar={cancelAvatar}
              crop={crop}
              fullCrop={fullCrop}
              loading={loading}
              onImageLoaded={onImageLoaded}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              submitAvatar={submitAvatar}
              tinyCrop={tinyCrop}
            />
          )}
        </>
      )}

      {(!avatar && tab == "plans") && (
        <Plans
          activateModal={activateModal}
          creatingPlan={creatingPlan}
          deactivateModal={deactivateModal}
          deleteName={deleteName}
          editingId={editingId}
          getApplicationNode={getApplicationNode}
          deletePlan={deletePlan}
          modalActive={modalActive}
          myPlans={myPlans}
        />
      )}

      {(!avatar && tab == "recipes" && subTab == "private") && (
        <PrivateRecipes
          activateModal={activateModal}
          deactivateModal={deactivateModal}
          deleteName={deleteName}
          getApplicationNode={getApplicationNode}
          deletePrivateRecipe={deletePrivateRecipe}
          subTabClick={subTabClick}
          modalActive={modalActive}
          myPrivateRecipes={myPrivateRecipes}
          subTab={subTab}
        />
      )}

      {(!avatar && tab == "recipes" && subTab == "public") && (
        <PublicRecipes
          activateModal={activateModal}
          deactivateModal={deactivateModal}
          deleteName={deleteName}
          getApplicationNode={getApplicationNode}
          disownPublicRecipe={disownPublicRecipe}
          subTabClick={subTabClick}
          modalActive={modalActive}
          myPublicRecipes={myPublicRecipes}
          subTab={subTab}
        />
      )}

      {(!avatar && tab == "recipes" && subTab == "favorite") && (
        <FavoriteRecipes
          subTabClick={subTabClick}
          unfavoriteRecipe={unfavoriteRecipe}
          myFavoriteRecipes={myFavoriteRecipes}
          subTab={subTab}
          
        />
      )}

      {(!avatar && tab == "recipes" && subTab == "saved") && (
        <SavedRecipes
          subTabClick={subTabClick}
          unsaveRecipe={unsaveRecipe}
          mySavedRecipes={mySavedRecipes}
          subTab={subTab}
        />
      )}

      {!avatar && tab == "ingredients" && (
        <Ingredients
          deletePrivateIngredient={deletePrivateIngredient}
          myPrivateIngredients={myPrivateIngredients}
        />
      )}

      {!avatar && tab == "equipment" && (
        <Equipment
          deletePrivateEquipment={deletePrivateEquipment}
          myPrivateEquipment={myPrivateEquipment}
        />
      )}
    </div>
  );
}

type Props = {
  activateModal(id: number, name: string): void;
  authname: string;
  avatar: string | ArrayBuffer | null;
  cancelAvatar(): void;
  creatingPlan: boolean;
  crop: Crop;
  deactivateModal(): void;
  deleteName: string;
  editingId: number | null;
  feedback: string;
  fullCrop: string;
  getApplicationNode(): Element | Node;
  deletePlan(): void;
  deletePrivateEquipment(id: number): void;
  deletePrivateIngredient(id: number): void;
  deletePrivateRecipe(): void;
  disownPublicRecipe(): void;
  subTabClick(e: React.SyntheticEvent<EventTarget>): void;
  tabClick(e: React.SyntheticEvent<EventTarget>): void;
  unfavoriteRecipe(id: number): void;
  unsaveRecipe(id: number): void;
  loading: boolean;
  modalActive: boolean;
  myFavoriteRecipes: IWorkRecipe[];
  myPlans: IPlan[];
  myPrivateEquipment: IEquipment[];
  myPrivateIngredients: IIngredient[];
  myPrivateRecipes: IWorkRecipe[];
  myPublicRecipes: IWorkRecipe[];
  mySavedRecipes: IWorkRecipe[];
  onImageLoaded(image: HTMLImageElement): void;
  onCropChange(crop: Crop): void;
  onCropComplete(crop: Crop): void;
  onSelectFile(e: React.ChangeEvent<HTMLInputElement>): void;
  submitAvatar(): void;
  subTab: string;
  tab: string;
  tinyCrop: string;
  twoColumnATheme: string;
};