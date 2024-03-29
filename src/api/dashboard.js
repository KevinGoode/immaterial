import { requestWatcher } from './utils';

let dashboardWatcher;

export function watchDashboard() {
  dashboardWatcher = requestWatcher.watch('/api/summary?status=Running');
  return dashboardWatcher;
}

export function unwatchDashboard() {
  if (dashboardWatcher) {
    dashboardWatcher.stop();
  }
}
