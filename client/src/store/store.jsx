
import create from 'zustand'
import {devtools} from 'zustand/middleware'
import axios from '../plugins/axios';

const store = (set) => ({
    isLoading: true,
    setIsLoading : (isLoading) => set(state => ({...state, isLoading})),
    isDarkMode: true,
    setIsDarkMode: (isDarkMode) => set(state => ({...state, isDarkMode})),
    userInfo: {
        id : '',
        userid : '',
        role : '',
    },
    inDarkMode: {
        color: '#d1cfcf !important',
        colorCT: '#d1cfcf !important',
        backgroundColor: '#1B221F !important',
        backgroundColorNV: '#1B221F !important',
        greenLine: ' 2px solid #1DA756;',
        table: ' #1DA756',
        tr : '#1DA756;',
        articleBG: '#061107',
        navHoverCL: '#1DA756 !important;',
        articleHoverCL: '#1DA756 !important;',
        border:'1px solid #1DA756',
        navBorder:'1px solid #1DA756',
        cardFrame:' #1DA756'
    },
    inLightMode: {
        color: '#37352F !important',
        colorCT: '#000000 !important',
        backgroundColor: '#9aac9e !important',
        backgroundColorNV: '#219953 !important',
        greenLine: ' 2px solid black',
        table: '#5d7264',
        tr : '#ffffff;',
        articleBG: '#5d7264;',
        navHoverCL: 'white !important;',
        articleHoverCL: '#24db70 !important;',
        border:'1px solid #000000',
        navBorder:'none',
        cardFrame:' #000000'
    },
    isEnglishMode: true,
    setIsEnglishMode : (isEnglishMode) => set(state => ({...state, isEnglishMode})),
    inEnglishMOde: {fontFamily: "'Orbitron', sans-serif"},
    inKoreanMode: {fontFamily: "'Noto Sans KR', sans-serif"},
    setUserInfo: (id, userid, role) => set({
        userInfo:{
        id: id,
        userid: userid,
        role: role
    }
    }),
    loginStatus: false,
    setLoginStatus: (status) => set({ loginStatus: status }),

    accessToken: '',
    setAccessToken: (token) => set({ accessToken: token }),

    loginfetch: async (dataToSubmit) => {
        const result = await axios.post('api/users/login', dataToSubmit,{ withCredentials: true })
            .then(res => res.data);
        return result;
    },
    
    registerfetch: async (resigterInfo) => { 
    const result = await axios.post('api/users/register', resigterInfo)
        .then(res => res.data);
    return result;
    },

    auth: async (accessToken) => { 
        const result = await axios.get('/api/users/auth', {
        headers: {'authorization' :  accessToken}
        })
        .then(res => res.data);
        return result;
    }
    
    
})
    
const useStore = create(
   devtools(store)
);



export default useStore;