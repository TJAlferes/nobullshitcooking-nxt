import type { Crop } from 'react-image-crop';

import type { IEquipment, IIngredient, IPlan, IWorkRecipe } from '../../store/data/types';
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
  deleteEquipment,
  deleteIngredient,
  deleteRecipe,
  disownRecipe,
  editingId,
  feedback,
  fullCrop,
  getApplicationNode,
  loading,
  modalActive,
  myFavoriteRecipes,
  myPlans,
  myEquipment,
  myIngredients,
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
  tinyCrop,
  unfavorite,
  unsave,
}: Props): JSX.Element {
  return (
    <div className="dashboard one-col-a">
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

      {(tab === "plans") && (
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

      {(tab === "recipes" && subTab === "private") && (
        <PrivateRecipes
          activateModal={activateModal}
          deactivateModal={deactivateModal}
          deleteName={deleteName}
          deleteRecipe={deleteRecipe}
          getApplicationNode={getApplicationNode}
          modalActive={modalActive}
          myPrivateRecipes={myPrivateRecipes}
          subTab={subTab}
          subTabClick={subTabClick}
        />
      )}

      {(tab === "recipes" && subTab === "public") && (
        <PublicRecipes
          activateModal={activateModal}
          deactivateModal={deactivateModal}
          deleteName={deleteName}
          disownRecipe={disownRecipe}
          getApplicationNode={getApplicationNode}
          modalActive={modalActive}
          myPublicRecipes={myPublicRecipes}
          subTab={subTab}
          subTabClick={subTabClick}
        />
      )}

      {(tab === "recipes" && subTab === "favorite") && (
        <FavoriteRecipes myFavoriteRecipes={myFavoriteRecipes} subTab={subTab} subTabClick={subTabClick} unfavorite={unfavorite} />
      )}

      {(tab === "recipes" && subTab === "saved") && (
        <SavedRecipes mySavedRecipes={mySavedRecipes} subTab={subTab} subTabClick={subTabClick} unsave={unsave} />
      )}

      {tab === "ingredients" && (
        <Ingredients deleteIngredient={deleteIngredient} myIngredients={myIngredients} />
      )}

      {tab === "equipment" && (
        <Equipment deleteEquipment={deleteEquipment} myEquipment={myEquipment} />
      )}
    </div>
  );
}

type Props = {
  activateModal(id: number, name: string):                  void;
  authname:                                                 string;
  avatar:                                                   string | ArrayBuffer | null;
  cancelAvatar():                                           void;
  creatingPlan:                                             boolean;
  crop:                                                     Crop;
  deactivateModal():                                        void;
  deleteName:                                               string;
  deletePlan():                                             void;
  deleteEquipment(id: number):                              void;
  deleteIngredient(id: number):                             void;
  deleteRecipe():                                           void;
  disownRecipe():                                           void;
  editingId:                                                number | null;
  feedback:                                                 string;
  fullCrop:                                                 string;
  getApplicationNode():                                     Element | Node;
  loading:                                                  boolean;
  modalActive:                                              boolean;
  myFavoriteRecipes:                                        IWorkRecipe[];
  myPlans:                                                  IPlan[];
  myEquipment:                                              IEquipment[];
  myIngredients:                                            IIngredient[];
  myPrivateRecipes:                                         IWorkRecipe[];
  myPublicRecipes:                                          IWorkRecipe[];
  mySavedRecipes:                                           IWorkRecipe[];
  onCropChange(crop: Crop):                                 void;
  onCropComplete(crop: Crop):                               void;
  onImageLoaded(e: React.SyntheticEvent<HTMLImageElement>): void;
  onSelectFile(e: React.ChangeEvent<HTMLInputElement>):     void;
  submitAvatar():                                           void;
  subTab:                                                   string;
  subTabClick(e: React.SyntheticEvent<EventTarget>):        void;
  tab:                                                      string;
  tabClick(e: React.SyntheticEvent<EventTarget>):           void;
  tinyCrop:                                                 string;
  unfavorite(id: number):                                   void;
  unsave(id: number):                                       void;
};
