import { Crop } from 'react-image-crop';

import { IEquipment, IIngredient, IPlan, IWorkRecipe } from '../../store/data/types';
import { Avatar, AvatarEdit, Equipment, FavoriteRecipes, Ingredients, Plans, PrivateRecipes, PublicRecipes, SavedRecipes, Tabs } from './views';

export function DashboardView({
  activateModal,
  authname,
  avatar,
  cancelAvatar,
  creatingPlan,
  crop,
  deactivateModal,
  deleteName,
  deletePlan,
  deletePrivateEquipment,
  deletePrivateIngredient,
  deletePrivateRecipe,
  disownPublicRecipe,
  editingId,
  feedback,
  fullCrop,
  getApplicationNode,
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
  subTabClick,
  tab,
  tabClick,
  theme,
  tinyCrop,
  unfavoriteRecipe,
  unsaveRecipe,
}: Props): JSX.Element {
  return (
    <div className={`dashboard two-col-a ${theme}`}>
      <h1>{authname}</h1>

      <p className="feedback">{feedback}</p>

      {!avatar && <Tabs tab={tab} tabClick={tabClick} />}

      {(tab === "avatar") && (
        <>
          {!avatar && (<Avatar authname={authname} onSelectFile={onSelectFile} />)}
          {avatar && (
            <AvatarEdit
              avatar={avatar}
              cancelAvatar={cancelAvatar}
              crop={crop}
              fullCrop={fullCrop}
              loading={loading}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onImageLoaded={onImageLoaded}
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
          deletePlan={deletePlan}
          editingId={editingId}
          getApplicationNode={getApplicationNode}
          modalActive={modalActive}
          myPlans={myPlans}
        />
      )}

      {(!avatar && tab == "recipes" && subTab == "private") && (
        <PrivateRecipes
          activateModal={activateModal}
          deactivateModal={deactivateModal}
          deleteName={deleteName}
          deletePrivateRecipe={deletePrivateRecipe}
          getApplicationNode={getApplicationNode}
          modalActive={modalActive}
          myPrivateRecipes={myPrivateRecipes}
          subTab={subTab}
          subTabClick={subTabClick}
        />
      )}

      {(!avatar && tab == "recipes" && subTab == "public") && (
        <PublicRecipes
          activateModal={activateModal}
          deactivateModal={deactivateModal}
          deleteName={deleteName}
          disownPublicRecipe={disownPublicRecipe}
          getApplicationNode={getApplicationNode}
          modalActive={modalActive}
          myPublicRecipes={myPublicRecipes}
          subTab={subTab}
          subTabClick={subTabClick}
        />
      )}

      {(!avatar && tab == "recipes" && subTab == "favorite") && (
        <FavoriteRecipes myFavoriteRecipes={myFavoriteRecipes} subTab={subTab} subTabClick={subTabClick} unfavoriteRecipe={unfavoriteRecipe} />
      )}

      {(!avatar && tab == "recipes" && subTab == "saved") && (
        <SavedRecipes mySavedRecipes={mySavedRecipes} subTab={subTab} subTabClick={subTabClick} unsaveRecipe={unsaveRecipe} />
      )}

      {!avatar && tab == "ingredients" && (
        <Ingredients deletePrivateIngredient={deletePrivateIngredient} myPrivateIngredients={myPrivateIngredients} />
      )}

      {!avatar && tab == "equipment" && (
        <Equipment deletePrivateEquipment={deletePrivateEquipment} myPrivateEquipment={myPrivateEquipment} />
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
  deletePlan(): void;
  deletePrivateEquipment(id: number): void;
  deletePrivateIngredient(id: number): void;
  deletePrivateRecipe(): void;
  disownPublicRecipe(): void;
  editingId: number | null;
  feedback: string;
  fullCrop: string;
  getApplicationNode(): Element | Node;
  loading: boolean;
  modalActive: boolean;
  myFavoriteRecipes: IWorkRecipe[];
  myPlans: IPlan[];
  myPrivateEquipment: IEquipment[];
  myPrivateIngredients: IIngredient[];
  myPrivateRecipes: IWorkRecipe[];
  myPublicRecipes: IWorkRecipe[];
  mySavedRecipes: IWorkRecipe[];
  onCropChange(crop: Crop): void;
  onCropComplete(crop: Crop): void;
  onImageLoaded(image: HTMLImageElement): void;
  onSelectFile(e: React.ChangeEvent<HTMLInputElement>): void;
  submitAvatar(): void;
  subTab: string;
  subTabClick(e: React.SyntheticEvent<EventTarget>): void;
  tab: string;
  tabClick(e: React.SyntheticEvent<EventTarget>): void;
  theme: string;
  tinyCrop: string;
  unfavoriteRecipe(id: number): void;
  unsaveRecipe(id: number): void;
};