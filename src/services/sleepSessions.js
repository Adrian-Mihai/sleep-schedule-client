const index = (startDate, endDate) => {
  const requestOptions = {
    method: 'GET'
  };
  
  return fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/3/sleep_sessions?date[start]=${startDate}&date[end]=${endDate}`, requestOptions).then(
    requestSuccess => {
      if(requestSuccess.ok){
        return requestSuccess.json().then(parsedData => {return parsedData});
      }
      return requestSuccess.json().then(parsedData => {return Promise.reject(parsedData)});
    },
    () => {
      return Promise.reject({error: 'Service unavailable'});
    });
}

const SleepSessionService = {
  index
};

export default SleepSessionService;
