"use client"
import React from 'react'
import Image from "next/image";
import Login from '@/components/auth/Login';


function LoginPage() {
  return (
    <div>

      <div>Login</div>
      <Login />

      <Image
        className=""
        src="https://library-app-data.s3.ca-west-1.amazonaws.com/frontendAssets/foxMascot.png"
        alt="Library Fox Mascot"
        width={200}
        height={200}
      />
    </div>
  )
}

export default LoginPage