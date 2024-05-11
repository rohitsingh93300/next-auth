'use client'
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'



function Register() {
    const [error, setError] = useState("")
    const router = useRouter();
    const isValidEmail = (email:string)=> {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }
    const handleSubmit = async(e:any)=>{
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
     
        if(!isValidEmail(email)){
            setError("Email is invalid")
            return;
        }
        if(!password || password.length < 8){
            setError("Password is invalid")
            return;
        }
        try {
            const res = await fetch("/api/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
                if(res.status === 400) {
                    setError("This email is already registred")
                }if(res.status === 200){
                    setError("")
                    router.push('/login')
                }
        } catch (err) {
            setError("Error, try again")
            console.log(error);
            
        }
    }
    return (
        <div className='flex flex-col items-center justify-between p-24 '>
         
            <Card className='w-[300px]'>
                <CardHeader>
                    <CardTitle className='text-start'>Register Page</CardTitle>
                    <p className='text-red-600 text-[13px] text-start'>{error && error}</p>
                </CardHeader>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-6'>
                    {/* <Input placeholder='Username'/> */}
                    <Input placeholder='Email'/>
                   
                    <Input placeholder='Password'/>
                   
                    <Button type='submit'>Register</Button>
                </form>
                <CardFooter className='flex flex-col gap-2 mt-2'>
                 <p className='text-gray-500 text-[12px]'>Already have an account? <Link href={'/login'} className='underline'>Login here &raquo;</Link></p>
                   <p className='text-gray-500 text-[14px]'>or login with Provider</p>
                    <Button onClick={()=>{signIn("github")}} variant="outline" className='flex items-center gap-4'>
                        <Image alt='github' src={'/github-logo.png'} width={20} height={20} />
                        Login with Github
                        </Button>
                </CardFooter>
            </Card>



        </div>
    )
}

export default Register
