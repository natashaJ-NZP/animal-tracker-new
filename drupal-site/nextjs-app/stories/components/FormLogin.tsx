import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from "react";
import classNames from "classnames";
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

export function FormLogin() { 

    return (
        /* LOGIN FORM */
        <div className="login flex justify-center h-screen bg-gray-100"> 
            <form>   
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
                        type="password" 
                        name="password"
                        required  
                        className="w-full py-2 bg-gray-lighter text-gray-500 font-normal px-1 outline-none mb-4"/>
                </label>

                <div className="login-options flex justify-between mb-4">

                    <div className="user-links">
                        <a className="font-bold text-sm hover:underline" href="#">Forgot Password?</a>
                    </div>
                </div>
        
                <button 
                className="font-semibold w-full text-white py-2 bg-purple rounded" 
                type="submit">
                    Login
                </button>
                <div className="new-account-link mt-5 ml-0 text-center text-sm">Don't have an account?<a href="#" className="text-purple hover:underline-offset-2 hover:underline"> Sign Up</a></div>
            </form>
        </div>
    );
} 