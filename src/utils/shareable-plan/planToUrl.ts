import type { IData } from '../../store/planner/types';

export function convertPlannerToUrl(planData: IData) {  // TO DO: validate here too
  let string = '';

  Object.keys(planData).forEach(key => {
    let substring = `d${key}_`;

    planData[key]?.map(recipe => {
      substring += `${recipe.id}-`;
    });

    substring = substring.slice(0, -1);  // removes the last '-'
    substring += '!';

    string += substring;
  });
  
  return string.slice(0, -1);  // removes the last '!'
}
