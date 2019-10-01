import { requestWatcher } from './utils';

let systemWatcher;

export function watchSystem() {
  systemWatcher = requestWatcher.watch('/api/system');
  return systemWatcher;
}

export function unwatchSystem() {
  if (systemWatcher) {
    systemWatcher.stop();
  }
}
