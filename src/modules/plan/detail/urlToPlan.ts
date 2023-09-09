/*
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { NOBSCAPI as endpoint } from '../../config/NOBSCAPI';

// We could have done the following with one large regex, but have for now decided to use a few smaller regexes in combination with some string splitting.
// The urlString is split up into its parts, and those parts are tested against the respective regex.

export async function convertUrlToPlanner(string: string) {
  const [ valid, dayStrings, recipesStrings ] = sanitizeAndValidateAndFormatUrlString(string);
  
  let toMerge = {};

  let dayStringsCleaned = [];
  dayStrings.map(str => {
    dayStringsCleaned.push(Number(str.substring(1)));
  });
  dayStringsCleaned.map(str => {
    toMerge[[str]] = [];
  });


  // Would transform ['2-44-345', '33', '543-1-10']
  // into            [[2, 44, 345], [33], [543, 1, 10]]
  let recipesStringsSplitToNum = [];
  recipesStrings.map(str => {
    const toNum = [];

    if (str !== "none") {
      if ( str.includes('-') ) str.split('-').map(str => toNum.push(Number(str)));
      else                     toNum.push(Number(str));
    }

    recipesStringsSplitToNum.push(toNum);
  });


  recipesStringsSplitToNum.flat();
  const theValues = recipesStringsSplitToNum.values();
  //console.log("recipesStringsSplitToNum: ", recipesStringsSplitToNum);
  //console.log("theValues: ", theValues);
  const res = await axios.post(`${endpoint}/recipe/titles`, {recipeIds: [1, 2, 3]});  // TO DO: change

  Object.keys(toMerge).map((key, i) => {
    if (recipesStrings[i] === "none") {
      toMerge[key] = [];
    } else {
      toMerge[key] = recipesStringsSplitToNum[i].map(num => ({
        key: uuidv4(),
        id: num,
        text: res.data.filter(data => data.recipe_id === num)[0].title
      }));
    }
  });

  return toMerge;
}

function sanitizeAndValidateAndFormatUrlString(url: string) {
  const allowedCharsInUrl =     /[d][0-9_\-\!]/;
  const allowedCharsInDay =     /^[d]([1-9]|1[0-9]|2[0-8])$/;
  const allowedCharsInRecipes = /[0-9\-]/;
  const urlSplitOnDay =         url.split('!', 28);
  const dayStrings =            [];
  const recipesStrings =        [];

  if (typeof url !== 'string')               return false;
  if ( url.length < 4 || url.length > 1502 ) return false;
  if (!allowedCharsInUrl.test(url))          return false;
  if (!urlSplitOnDay)                        return false;

  urlSplitOnDay.map(substring => {
    const [ dayString, recipesString ] = substring.split('_');

    dayStrings.push(dayString);
    recipesStrings.push(typeof recipesString === "undefined" ? "none" : recipesString);
  });

  let valid = true;

  dayStrings.map(dayString => {
    if (!allowedCharsInDay.test(dayString)) valid = false;
  });

  recipesStrings.map(recipesString => {
    if (recipesString === "none") return;
    if (!allowedCharsInRecipes.test(recipesString)) valid = false;
  });
  
  return [valid, dayStrings, recipesStrings];
}
*/
