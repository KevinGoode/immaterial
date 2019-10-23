const _sessions = {};
const _notifiers = {
  task: []
};

export const tasks = [
  {
    id: 'task-1',
    name: 'Initializing instance',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'task-2',
    name: 'Adding components',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'task-3',
    name: 'Testing infrastructure',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'task-4',
    name: 'Removing instance',
    percentComplete: 0,
    status: 'Waiting'
  }
];
const currentTime = 0;// Math.round((new Date()).getTime() / 1000);
const activity =  [{x: currentTime-10, y: 0},{x: currentTime-9, y: 1},{x: currentTime-8, y: 3},{x: currentTime-7, y: 7},
  {x: currentTime-6, y: 9},{x: currentTime-5, y: 10}, {x: currentTime-4, y: 7}, {x: currentTime-3, y: 3},{x: currentTime-2, y: 1},{x: currentTime-1, y: 0}]
const taskByCategory=[
  { x: "Continuous", y: 35 },
  { x: "Scheduled", y: 40 },
  { x: "One Off", y: 55 }
];
const activityContinuous =  [{x: currentTime-10, y: 0},{x: currentTime-9, y: 1},{x: currentTime-8, y: 1},{x: currentTime-7, y: 1},
  {x: currentTime-6, y: 1},{x: currentTime-5, y: 1}, {x: currentTime-4, y: 1}, {x: currentTime-3, y: 0},{x: currentTime-2, y: 1},{x: currentTime-1, y: 0}]
const activityScheduled =  [{x: currentTime-10, y: 0},{x: currentTime-9, y: 1},{x: currentTime-8, y: 1},{x: currentTime-7, y: 4},
    {x: currentTime-6, y: 4},{x: currentTime-5, y: 6}, {x: currentTime-4, y: 4}, {x: currentTime-3, y: 1},{x: currentTime-2, y: 0},{x: currentTime-1, y: 0}]
const activityOneOff =  [{x: currentTime-10, y: 0},{x: currentTime-9, y: 1},{x: currentTime-8, y: 3},{x: currentTime-7, y: 2},
      {x: currentTime-6, y: 4},{x: currentTime-5, y: 3}, {x: currentTime-4, y: 2}, {x: currentTime-3, y: 0},{x: currentTime-2, y: 0},{x: currentTime-1, y: 0}]
const increments = [5, 10, 20, 25];

setInterval(
  () => {
    const task = tasks[
      Math.floor(Math.random() * tasks.length)
    ];

    if (!task.percentComplete) {
      task.status = 'Running';
    }

    _notifiers.task.forEach(notifier => notifier(task));
  },
  2000
);

setInterval(
  () => {
    tasks.forEach((task) => {
      if (task.status === 'Running') {
        if (task.percentComplete < 100) {
          task.percentComplete = Math.min(100, task.percentComplete +
            increments[
              Math.floor(Math.random() * increments.length)
            ]
          );
        } else {
          task.percentComplete = 0;
          task.status = 'Waiting';
        }
        _notifiers.task.forEach(notifier => notifier(task));
      }
    });
  },
  1000
);

export function addSession(token, data) {
  _sessions[token] = data;
}

export function getSession(token) {
  return _sessions[token];
}

export function addNotifier(type, cb) {
  _notifiers[type].push(cb);
}

export function getTasks(filters) {
  if (filters) {
    return Promise.resolve({
      tasks: tasks.filter(task =>
        Object.keys(filters).some(filter => task[filter] === filters[filter])
      )
    });
  }
  return Promise.resolve({ tasks });
}
export function getSummary(filters) {
  if (filters) {
    return Promise.resolve({
      tasks: tasks.filter(task =>
        Object.keys(filters).some(filter => task[filter] === filters[filter])
      ),
      activity: activity,
      activityOneOff: activityOneOff,
      activityContinuous:activityContinuous,
      activityScheduled:activityScheduled,
      taskByCategory: taskByCategory
    });
  }
  return Promise.resolve({ tasks });
}
export function getTask(id) {
  let task;
  tasks.some((t) => {
    if (t.id === id) {
      task = t;
      return true;
    }
    return false;
  });
  return Promise.resolve({ task });
}
export function getSystem(){
    return Promise.resolve({ cpuCurrentPercent: 30, memCurrentGb: 2, memAvailableGb: 4 });
}
export default { addNotifier, addSession, getSession, getTask, getTasks };
