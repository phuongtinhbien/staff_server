const defaultUserInfo = {
  name: 'Demo User',
  image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png'
};

export default function reducer(state = {
  user: defaultUserInfo
}, action) {
  return state;
}