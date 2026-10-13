import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { getAllowedEmailDomains, isUniversityEmail, universityEmailErrorMessage } from '../utils/universityEmail';

const Login = () => {

    const {setShowUserLogin, setUser, axios, navigate} = useAppContext()

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [universityEmail, setUniversityEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [campus, setCampus] = React.useState("");
    const [department, setDepartment] = React.useState("");

    const allowedDomains = getAllowedEmailDomains();

    const onSubmitHandler = async (event)=>{
        try {
            event.preventDefault();

            if (state === "register") {
                if (!campus.trim() || !department.trim()) {
                    toast.error("Campus / hostel name and academic department are required.");
                    return;
                }
                if (!isUniversityEmail(universityEmail)) {
                    toast.error(universityEmailErrorMessage());
                    return;
                }
            }

            const {data} = await axios.post(`/api/user/${state}`,{
                name, email, universityEmail, password, campus, department
            });
            if (data.success){
                navigate('/')
                setUser(data.user)
                setShowUserLogin(false)
                if (state === "register") {
                    toast.success("Account created with your university email.")
                }
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
        
       
        
    }

  return (
    <div onClick={()=> setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50 overflow-y-auto py-8'>

      <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[400px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <>
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                </div>
                <div className="w-full">
                    <p>University Email (for verification)</p>
                    <input onChange={(e) => setUniversityEmail(e.target.value)} value={universityEmail} placeholder="name@university.edu" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
                    <p className="text-xs text-gray-400 mt-1">Must be from your institution ({allowedDomains.join(', ')}).</p>
                </div>
                <div className="w-full">
                    <p>Campus / Hostel Name</p>
                    <input onChange={(e) => setCampus(e.target.value)} value={campus} placeholder="e.g. North Campus, Hostel B" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                    <p className="text-xs text-gray-400 mt-1">Shown on your profile so peers can meet on campus.</p>
                </div>
                <div className="w-full">
                    <p>Academic Department</p>
                    <input onChange={(e) => setDepartment(e.target.value)} value={department} placeholder="e.g. Mechanical Engineering" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                </div>
                </>
            )}
            <div className="w-full ">
                <p>University Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="name@university.edu" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
                {state === "register" && (
                    <p className="text-xs text-gray-400 mt-1">
                        Use an official campus email ({allowedDomains.join(', ')}). Personal inboxes like Gmail are not accepted.
                    </p>
                )}
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                </p>
            )}
            <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    </div>
  )
}

export default Login
