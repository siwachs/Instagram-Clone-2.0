import React from 'react'
import { signOut, useSession } from 'next-auth/react'

//Lazy load Image
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function MiniProfile() {
  const { data: session } = useSession()

  return (
    <div className="mt-16 ml-6 flex items-center justify-between">
      <LazyLoadImage
        className="h-14 w-14 rounded-full border p-[2px]"
        src={session?.user?.image || '/default_profile.png'}
        effect="blur"
      ></LazyLoadImage>

      <div className="mx-3 flex-1">
        <h2 className="cursor-pointer text-sm font-bold">
          {session?.user?.username}
        </h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>

      <button onClick={signOut} className="text-xs font-semibold text-blue-400">
        Sign Out
      </button>
    </div>
  )
}

export default MiniProfile
