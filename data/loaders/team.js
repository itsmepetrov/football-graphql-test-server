import DataLoader from 'dataloader';
import { generateApiUrl, cachedFetch } from '../../utils/api';
import fetch from 'node-fetch';

// DataLoader is a generic utility to be used as part of your application's data fetching layer
// to provide a simplified and consistent API over various remote data sources such as databases
// or web services via batching and caching.
// More info about DataLoader you can find here: https://github.com/facebook/dataloader

// Create DataLoader for fetch Teams by ID
export default new DataLoader((teamIds) => {
  // For each Team ID create new request
  return Promise.all(teamIds.map(teamId => {
    // Generate request url
    const url = generateApiUrl(
      'football/team/teamSummary',
      teamId
    );

    console.log(url);

    // Request Team by ID
    return cachedFetch(url)
      .then(json => { console.log(json); return json })
      .then(json => ({
        '@teamID': teamId,
        ...json.team.summary
      }));
  }));
});
