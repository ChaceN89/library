import React from 'react'
import Image from "next/image";


function RegisterPage() {
  return (
    <div>

      <div>Register</div>
      <Image
        className=""
        src="https://library-app-data.s3.ca-west-1.amazonaws.com/frontendAssets/foxMascot2.png"
        alt="Library Fox Mascot"
        width={200}
        height={200}
      />
    </div>
  )
}

export default RegisterPage