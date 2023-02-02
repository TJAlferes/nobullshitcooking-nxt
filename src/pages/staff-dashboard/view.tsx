import type { IEquipment, IIngredient, IWorkRecipe } from '../../store/data/types';
import { Equipment } from './tabs/Equipment';
import { Ingredients } from './tabs/Ingredients';
import { Recipes } from './tabs/Recipes';
import { Tabs } from './tabs/Tabs';

export function DashboardView({
  activateModal,
  deactivateModal,
  deleteName,
  equipment,
  feedback,
  getApplicationNode,
  handleDeleteEquipment,
  handleDeleteIngredient,
  handleDeleteRecipe,
  handleTabClick,
  ingredients,
  loading,
  modalActive,
  recipes,
  tab
}: Props): JSX.Element {
  return (
    <div className="dashboard one-col-a">
      <h1>COOK EAT WIN REPEAT</h1>

      <p className="feedback">{feedback}</p>

      <Tabs tab={tab} handleTabClick={handleTabClick} />

      {tab === "recipes" && (
        <Recipes
          activateModal={activateModal}
          deactivateModal={deactivateModal}
          deleteName={deleteName}
          getApplicationNode={getApplicationNode}
          handleDeleteRecipe={handleDeleteRecipe}
          modalActive={modalActive}
          recipes={recipes}
        />
      )}

      {tab === "ingredients" && <Ingredients handleDeleteIngredient={handleDeleteIngredient} ingredients={ingredients} />}

      {tab === "equipment" &&  <Equipment equipment={equipment} handleDeleteEquipment={handleDeleteEquipment} />}
    </div>
  );
}

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type Props = {
  activateModal(id: number, name: string): void;
  deactivateModal():                       void;
  deleteName:                              string;
  equipment:                               IEquipment[];
  feedback:                                string;
  getApplicationNode():                    Element | Node;
  handleDeleteEquipment(id: number):       void;
  handleDeleteIngredient(id: number):      void;
  handleDeleteRecipe():                    void;
  handleTabClick(e: SyntheticEvent):       void;
  ingredients:                             IIngredient[];
  loading:                                 boolean;
  modalActive:                             boolean;
  recipes:                                 IWorkRecipe[];
  tab:                                     string;
};