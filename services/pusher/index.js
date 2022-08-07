import Pusher from 'pusher-js/react-native';

const pusher_app_key = 'ed208f4daf54b4f9b8fd';
const pusher_app_cluster = 'ap1';
const base_url = 'http://127.0.0.1:8000';

export const authPusher = new Pusher(pusher_app_key, {
  authEndpoint: `${base_url}/pusher/auth`,
  cluster: pusher_app_cluster,
  encrypted: true,
});

export default new Pusher(pusher_app_key, {cluster: pusher_app_cluster});
