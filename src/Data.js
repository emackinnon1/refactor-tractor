class Data {
  constructor() {
    this.mainURL = 'https://fe-apps.herokuapp.com/api/v1/fitlit/1908';
  }

  retrieveUserData() {
    let url = `${this.mainURL}/users/userData`
    return fetch(url).then(response => response.json())
  }

  retrieveSleepData() {
    let url = `${this.mainURL}/sleep/sleepData`
    return fetch(url).then(response => response.json())
  }

  retrieveActivityData() {
    let url = `${this.mainURL}/activity/activityData`
    return fetch(url).then(response => response.json())
  }

  retrieveHydrationData() {
    let url = `${this.mainURL}/hydration/hydrationData`
    return fetch(url).then(response => response.json())
  }

}

export default Data;
