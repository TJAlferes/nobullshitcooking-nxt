import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { IEquipment, IIngredient, IWorkRecipe } from '../../store/data/types';
import { deleteEquipment as staffDeleteEquipment } from '../../store/staff/equipment/actions';
import { deleteIngredient as staffDeleteIngredient } from '../../store/staff/ingredient/actions';
import { deleteRecipe as staffDeleteRecipe } from '../../store/staff/recipe/actions';
import { DashboardView } from './DashboardView';
import './dashboard.css';

export function StaffDashboard({
  equipment,
  ingredients,
  message,
  oneColumnATheme,
  recipes,
  staffDeleteEquipment,
  staffDeleteIngredient,
  staffDeleteRecipe
}: Props): JSX.Element {
  const [ deleteId,    setDeleteId ] =    useState<number | undefined>();
  const [ deleteName,  setDeleteName ] =  useState("");
  const [ feedback,    setFeedback ] =    useState("");
  const [ loading,     setLoading ] =     useState(false);
  const [ modalActive, setModalActive ] = useState(false);
  const [ tab,         setTab ] =         useState("recipes");

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (message !== "") window.scrollTo(0, 0);
      deactivateModal();
      setFeedback(message);
      setLoading(false);
    }
    return () => {
      isSubscribed = false;
    };
  }, [message]);

  const activateModal = (id: number, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
    setModalActive(true);
  };

  const deactivateModal = () => {
    setDeleteId(undefined);
    setDeleteName("");
    setModalActive(false);
  };

  const getApplicationNode = (): Element | Node => document.getElementById('root') as Element | Node;

  const handleDeleteEquipment = (id: number) => {
    setLoading(true);
    staffDeleteEquipment(id);
  };

  const handleDeleteIngredient = (id: number) => {
    setLoading(true);
    staffDeleteIngredient(id);
  };

  const handleDeleteRecipe = () => {
    if (!deleteId) return;
    setLoading(true);
    staffDeleteRecipe(deleteId);
  };

  const handleTabClick = (e: React.SyntheticEvent<EventTarget>) => setTab((e.target as HTMLInputElement).name);

  return (
    <DashboardView
      activateModal={activateModal}
      deactivateModal={deactivateModal}
      deleteName={deleteName}
      equipment={equipment}
      feedback={feedback}
      getApplicationNode={getApplicationNode}
      handleDeleteEquipment={handleDeleteEquipment}
      handleDeleteIngredient={handleDeleteIngredient}
      handleDeleteRecipe={handleDeleteRecipe}
      handleTabClick={handleTabClick}
      ingredients={ingredients}
      loading={loading}
      modalActive={modalActive}
      oneColumnATheme={oneColumnATheme}
      recipes={recipes}
      tab={tab}
    />
  );
}

interface RootState {
  data: {
    officialEquipment:   IEquipment[];
    officialIngredients: IIngredient[];
    officialRecipes:     IWorkRecipe[];
  };
  staff: {
    message: string;
  };
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  oneColumnATheme: string;
};

const mapStateToProps = (state: RootState) => ({
  equipment:   state.data.officialEquipment,
  ingredients: state.data.officialIngredients,
  recipes:     state.data.officialRecipes,
  message:     state.staff.message
});

const mapDispatchToProps = {
  staffDeleteEquipment:  (id: number) => staffDeleteEquipment(id),
  staffDeleteIngredient: (id: number) => staffDeleteIngredient(id),
  staffDeleteRecipe:     (id: number) => staffDeleteRecipe(id)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(StaffDashboard);