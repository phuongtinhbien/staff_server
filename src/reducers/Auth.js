



const defaultUserInfo = {
  name: 'Demo User',
  image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png',
  id: null,
  branch: null,
  staffType: null,
  email: null,
  username: null,
  gender: null,
  address: null,
  phone: null,
  status: null

};



export default function reducer(state = {
  user: defaultUserInfo
}, action) {
  return state;
}