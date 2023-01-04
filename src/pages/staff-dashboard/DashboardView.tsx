import { IEquipment, IIngredient, IWorkRecipe } from '../../store/data/types';
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
  oneColumnATheme,
  recipes,
  tab
}: Props): JSX.Element {
  return (
    <div className={`staff-dashboard one-column-a ${oneColumnATheme}`}>
      <h1 className="staff-dashboard__h1">COOK EAT WIN REPEAT</h1>

      <p className="staff-dashboard__feedback">{feedback}</p>

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

type Props = {
  activateModal(id: number, name: string):              void;
  deactivateModal():                                    void;
  deleteName:                                           string;
  equipment:                                            IEquipment[];
  feedback:                                             string;
  getApplicationNode():                                 Element | Node;
  handleDeleteEquipment(id: number):                    void;
  handleDeleteIngredient(id: number):                   void;
  handleDeleteRecipe():                                 void;
  handleTabClick(e: React.SyntheticEvent<EventTarget>): void;
  ingredients:                                          IIngredient[];
  loading:                                              boolean;
  modalActive:                                          boolean;
  oneColumnATheme:                                      string;
  recipes:                                              IWorkRecipe[];
  tab:                                                  string;
};