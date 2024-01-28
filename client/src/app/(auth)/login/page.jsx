'use client'
import React, { useContext } from 'react';
import { useRef } from 'react';
import { logIn } from "@/lib/api"
import { AuthContext } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    const email = useRef();
    const password = useRef();
    const router = useRouter()
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const handleClick = async(e) => {
        e.preventDefault();
        await logIn({
            email: email.current.value,
            password: password.current.value
        }, dispatch)

    }
    console.log(user);
    if(user) {
        router.push('/');
    }   
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
                    ShareKaro
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" ref={email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" ref={password} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <button onClick={handleClick} type="submit" className=" items-center w-full text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                {isFetching?<Loader2 className=" mx-auto animate-spin"/>: "Log In"}  
                                </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Dont have an account? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignInPage;