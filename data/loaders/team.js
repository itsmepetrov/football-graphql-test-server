import DataLoader from 'dataloader';
import { generateApiUrl, cachedFetch } from '../../utils/api';
import fetch from 'node-fetch';

export default new DataLoader((teamIds) => {
  return Promise.all(teamIds.map(teamId => {
    const url = generateApiUrl(
      'football/team/teamSummary',
      teamId
    );

    console.log(url);

    return cachedFetch(url)
      .then(json => { console.log(json); return json })
      .then(json => ({
        '@teamID': teamId,
        ...json.team.summary
      }));
  }));
});
