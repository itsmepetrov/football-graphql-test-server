import DataLoader from 'dataloader';
import { generateApiUrl } from '../../utils/api';
import fetch from 'node-fetch';

export default new DataLoader((teamIds) => {
  return Promise.all(teamIds.map(teamId => {
    const url = generateApiUrl(
      'football/team/teamSummary',
      teamId
    );

    console.log(url);

    return fetch(url)
      .then(res => res.json())
      .then(json => { console.log(json); return json })
      .then(json => ({
        '@teamID': teamId,
        ...json.team.summary
      }));
  }));
});
