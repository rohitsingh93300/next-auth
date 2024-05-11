'use client'
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'

function Navbar() {
  const {data:session}:any = useSession()
  console.log(session)
  return (
    <div>
      <ul className='flex justify-between m-10 items-center '>
        <div>
            <Link href="/">
                <li>Home</li>
            </Link>
        </div>
        <div className='flex md:gap-8 gap-2'>
            <Link href="/dashboard" className='hidden md:flex'>
                <li>Dashboard</li>
            </Link>
            {!session ? (
              <>
               <Link href="/login">
                <li>Login</li>
            </Link>
            <Link href="/register">
                <li>Register</li>
            </Link>
              </>
            ):(
              <>
              {session.user?.email}
              <li>
                 <Button onClick={()=>signOut()}>
                  Logout
                 </Button>
              </li>
              </>
            )}
           
        </div>
      </ul>
    </div>
  )
}

export default Navbar
