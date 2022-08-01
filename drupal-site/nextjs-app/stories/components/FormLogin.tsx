import React from "react";
import classNames from "classnames";
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

interface FormLoginProps extends React.HTMLProps<HTMLFormElement> {}
interface FormStatus {
    status: "success" | "error" | "fetching"
    message?: string
}

export default function FormLogin({ className, ...props }: FormLoginProps) { 
    const [formStatus, setFormStatus] = React.useState<FormStatus>(null as any);
    const router = useRouter();

    React.useEffect(() => {
        if (router.query.error === "CredentialsSignin") {
          return setFormStatus({
            status: "error",
            message: "unrecognized-username-or-password-please-try-again",
          })
        }
    
        return setFormStatus(null as any)
    }, [router])
    

    const onSubmit = async (event: any) => {
        event.preventDefault()
        const data = new FormData(event.target)
    
        setFormStatus({ status: "fetching" })
    
        await signIn("credentials", {
          username: data.get("username"),
          password: data.get("password"),
        })
    
        return setFormStatus({
          status: "success",
        })
    }
    
    return (
        /* LOGIN FORM */
        <div className="login flex justify-center h-screen bg-gray-100"> 
            <form  
                onSubmit={onSubmit}
                {...props}>

                {formStatus?.message && (
                    <p
                    className={classNames("py-3 px-4 border", {
                        "border-link bg-link/10 text-link":
                        formStatus?.status === "success",
                        "border-error bg-error/10 text-error":
                        formStatus?.status === "error",
                    })}
                    >
                    {formStatus.message}
                    </p>
                )}
                <div className="title">
                    <h1 className="ml-0 mt-5 mb-5 bold">Login</h1>
                </div>
                <label className="text-gray-700 font-bold text-sm"> Username
                    <input
                        type="text" 
                        name="Username"
                        maxLength={255}
                        required
                        className="w-full py-2 bg-gray-lighter text-gray-500 font-normal px-1 outline-none mb-4" 
                    />
                </label>
             
                <label className="text-gray-700 font-bold text-sm"> Password
                    <input 
                        type="text" 
                        name="Password"
                        required  
                        className="w-full py-2 bg-gray-lighter text-gray-500 font-normal px-1 outline-none mb-4"/>
                </label>

                <div className="login-options flex justify-between mb-4">
                    <div>
                        <input 
                            id="remember"
                            type="checkbox"
                            name="password"
                            required
                            className="mb-4 mr-2"
                        />
                        <label className="text-gray-700 font-bold text-sm">Remember Me</label>
                    </div>

                    <div className="user-links">
                        <a className="font-bold text-sm hover:underline" href="#">Forgot Password?</a>
                    </div>
                </div>
        
                <button className="font-semibold w-full text-white py-2 bg-purple rounded" type="submit">Login</button>
                <div className="new-account-link mt-5 ml-0 text-center text-sm">Don't have an account?<a href="#" className="text-purple hover:underline-offset-2 hover:underline"> Sign Up</a></div>
            </form>
        </div>
    );
} 