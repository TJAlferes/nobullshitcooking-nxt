import { IPlannerViewData } from '../../store/plannerView/types';
import Day from './components/Day';
import ExpandedDay from './components/ExpandedDay';

export function PlanView({ expanded, expandedDay, planName, recipeListsInsideDays, twoColumnATheme }: Props): JSX.Element {
  return (
    <div className={`plan two-column-a ${twoColumnATheme}`}>
      <div className="heading">
        <h1>Plan</h1>
        <div className="name">
          <label>Plan Name:</label><span>{planName}</span>
        </div>
      </div>

      <div className="calendar">
        <div className="plan__monthly-plan">
          <div className="monthly-plan">
            <div className="header">
              <span>Sunday</span>
              <span>Monday</span>
              <span>Tuesday</span>
              <span>Wednesday</span>
              <span>Thursday</span>
              <span>Friday</span>
              <span>Saturday</span>
            </div>

            <div className="body">
              {Object.keys(recipeListsInsideDays)
                .map((recipeList, i) => (
                  <div className="monthly-plan__body-day" key={i}>
                    <div className="body-day__content">
                      <Day day={i + 1} expanded={expanded} expandedDay={expandedDay} recipes={recipeListsInsideDays[Number(recipeList)]} />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          
          <div className="expanded-day-container">
            {expandedDay && <ExpandedDay day={expandedDay} expanded={expanded} recipes={(expanded) ? recipeListsInsideDays[expandedDay] : []} />}
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  expanded:              boolean;
  expandedDay:           number | null;
  planName:              string;
  recipeListsInsideDays: IPlannerViewData;
  twoColumnATheme:       string;
};