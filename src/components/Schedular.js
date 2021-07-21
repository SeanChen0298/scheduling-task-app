import React from 'react';
import Schedule from 'react-schedule-job';

const sayHello = () => {
  console.log('Hello' + Date().toString())
}

const RequestSomething = () => {
  console.log('Api request has been sent')
}

// these are the functions which will run according to the schedule

const jobs = [
  {
    fn: sayHello,
    id: '1',
    schedule: '* * * * *',
    // Execute every minutes
    name: 'Say Hello with datetime '
  },
  {
    fn: RequestSomething,
    id: '3',
    schedule: '* 15,19 * 11,12 *',
    // Execute In November, December At 3PM and 7PM every minute
    name: 'Request Something'
  }
]

const Schedular = () => {
  return (
    <Schedule
      jobs={jobs}
      timeZone='Asia/Seoul'
      dashboard={{
        hidden: false
      }}
    />
  )
}
export default Schedular
