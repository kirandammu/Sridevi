import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useAppContext } from '../context/Context';
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineLoading } from 'react-icons/ai';
import { images } from '../assets/assets';


const Login = () => {

    const {navigate, setSeller, setUser, axios} = useAppContext()

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const submit = async (e) => {
    try {
        e.preventDefault();
        setLoading(true)

        const { data } = await axios.post(`/user/${state}`, { 
            name, 
            email, 
            password 
        })
        if (data?.success) {
            toast.success(data.message || "Operation successful");
            setUser(data.user);
            setLoading(false)
            navigate('/')
            if (data?.user?.role === 'admin') {
            setSeller(true)
    }
        } else {
            throw new Error(data?.message || "Unknown server response");
        }

    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
        
    }
};


    return (<div className='fixed top-0 bottom-0 left-0 right-0 z-60 flex items-center bg-white'>
        <form onSubmit={submit} className="flex flex-col gap-4 m-auto items-start p-8 py-10 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <div className='flex items-center mx-auto justify-center gap-2'>
              <p className='w-10 h-0.5 bg-gray-700'></p>
              <div className='font-semibold text-xl uppercase text-[red]'>User <span className='text-black'>{state === 'login' ?  'Login': 'Register'}</span></div>
              <p className='w-10 h-0.5 bg-[red]'></p>
            </div>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-gray-400" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-gray-400" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-gray-400" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-[blue] cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-[blue] cursor-pointer">click here</span>
                </p>
            )}
            <button disabled={loading} className="bg-[red] flex items-center justify-center hover:bg-red-500 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {loading ? (<AiOutlineLoading className='text-xl text-white font-bold flex items-center justify-center animate-spin'/>)  : ((state === "register") ? "Create Account" : "Login")}
            </button>
        <div onClick={()=>navigate('/')} className='flex items-center text-[red] justify-center w-8 text-2xl mx-auto  cursor-pointer'><RxCrossCircled /></div>
        </form>
        </div>
    );
};

export default Login