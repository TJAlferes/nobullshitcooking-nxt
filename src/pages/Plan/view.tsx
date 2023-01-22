import type { IData } from '../../store/plannerView/types';
import { Day, ExpandedDay } from './components';

export function PlanView({ expandedDay, planName, planData, theme }: Props): JSX.Element {
  return (
    <div className={`plan two-column-a ${theme}`}>
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
              {Object.keys(planData).map((recipeList, index) => (
                <div className="monthly-plan__body-day" key={index}>
                  <div className="body-day__content">
                    {expandedDay && (index + 1) === expandedDay && <Day day={index + 1} recipes={planData[Number(recipeList)]} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="expanded-day-container">
            {expandedDay && <ExpandedDay day={expandedDay} recipes={planData[expandedDay]} />}
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  expandedDay: number | null;
  planName:    string;
  planData:    IData;
  theme:       string;
};