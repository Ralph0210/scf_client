import axios from 'axios';
import baseUrl from '../baseUrl';

const baseURL = baseUrl
// const baseURL = 'http://localhost:3001';

const api = axios.create({
  baseURL: baseURL,
});

export async function retrieve(selectedYear, selectedData, selectedDistribution, selectedDisplay, selectedUnit, selectedDataName, selectedDistributionName, selectedDisplayName) {
  try {
    const queryParams = {
      selectedYear: selectedYear,
      selectedData: selectedData,
      selectedDistribution: selectedDistribution,
      selectedDisplay: selectedDisplay,
      selectedUnit: selectedUnit,
      selectedDataName: selectedDataName,
      selectedDistributionName: selectedDistributionName,
      selectedDisplayName: selectedDisplayName
    };

    // Use the `params` option to include the query parameters and await the response
    const response = await api.get('/api/survey', {
      params: queryParams
    });

    // Return the data from the response
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error in retrieve function:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function distinctValues(selectedDistribution) {
  try {
    const queryParams = {
      selectedDistribution: selectedDistribution,
    }

    const response = await api.get('/distinct-values', {
      params: queryParams
    })

    return response.data
  } catch(error) {
    console.log('Error inn retrieve function:', error)
    throw error
  }
}

