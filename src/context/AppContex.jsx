// import { createContext , useEffect, useState  } from "react";
// import { toast } from "react-toastify";
// import axios from "axios"
// import { data, useNavigate } from "react-router-dom";
// export const AppContext = createContext()

// const AppContextProvider = (props) => {
//     const [user, setUser] = useState(null);
//     const [showLogin, setShowLogin] = useState(false);
//     const [token, setToken] = useState(localStorage.getItem('token'));

//     const [credit, setCredit] = useState(false);

//     const backendUrl = import.meta.env.VITE_BACKEND_URL ;

//     const navigate = useNavigate()

//     const loadCreditData = async ()=>{
//         try {
//             const {data} = await axios.get(backendUrl + '/api/user/credits', {
//                 headers: { token }
//             })

//             if(data.success){
//                 setCredit(data.credits)
//                 setUser(data.user)
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message)
            
//         }
//     }

//     const gernateImage = async (prompt)=>{
//         try {
//             await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {headers: {token}})

//             if(data.success){
//                 loadCreditData()
//                 return data.resultImage
//             }else{
//                 toast.error(data.message)
//                 loadCreditData()
//                 if(data.creditBalance === 0){
//                     navigate('/buy')
//                 }
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     const logout = ()=>{
//         localStorage.removeItem('token')
//         setToken('')
//         setUser(null)
//     }


//     useEffect(()=>{
//         if(token){
//             loadCreditData()
//         }
//     }, [token])

//     const value ={
//         user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditData, logout, gernateImage

//     }
//     return(
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }
// export default AppContextProvider;


// AppContext.jsx
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(0);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const loadCreditData = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/user/credits`, {
                headers: { token }
            });

            if (res.data.success) {
                setCredit(res.data.credits);
                setUser(res.data.user);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const generateImage = async (prompt) => {
        try {
            const res = await axios.post(`${backendUrl}/api/image/generate-image`, 
                { prompt }, 
                { headers: { token } }
            );

            const data = res.data;

            if (data.success) {
                loadCreditData();
                return data.resultImage;
            } else {
                toast.error(data.message);
                loadCreditData();
                if (data.creditBalance === 0) {
                    navigate('/buy');
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    };

    useEffect(() => {
        if (token) {
            loadCreditData();
        }
    }, [token]);

    return (
        <AppContext.Provider value={{
            user, setUser,
            showLogin, setShowLogin,
            backendUrl,
            token, setToken,
            credit, setCredit,
            loadCreditData,
            logout,
            generateImage
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
