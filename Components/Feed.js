import React from 'react'
import Stories from './Stories'
import Posts from './Posts'
import MiniProfile from './MiniProfile'
import Suggestions from './Suggestions'
import { useSession } from 'next-auth/react'

function Feed() {
  const { data: session } = useSession()

  return (
    <main
      className={`mx-auto sm:max-w-lg lg:grid lg:max-w-3xl lg:grid-cols-3 xl:max-w-4xl ${
        !session && 'lg:grid-cols-1'
      }`}
    >
      {/* Sections */}

      <section className={`lg:col-span-2 ${!session && 'lg:col-span-1'}`}>
        {/* Stories */}
        <Stories></Stories>

        {/* Posts */}
        <Posts></Posts>
      </section>

      {/* ________________________ */}

      {session && (
        <section className="hidden lg:col-span-1 lg:inline-grid">
          <div className="fixed top-10">
            {/* Profile */}
            <MiniProfile></MiniProfile>

            {/* Suggestions */}
            <Suggestions></Suggestions>
          </div>
        </section>
      )}
    </main>
  )
}

export default Feed
