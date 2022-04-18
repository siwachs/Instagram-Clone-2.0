import React, { useEffect, useState } from 'react'
import faker from '@faker-js/faker'
import Story from './Story'
import { useSession } from 'next-auth/react'

function Stories() {
  const [stories, setStories] = useState()

  useEffect(() => {
    const stories = [...Array(20)].map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
    }))
    setStories(stories)
  }, [])

  const { data: session } = useSession()

  return (
    <div className="mt-0 flex space-x-2 overflow-x-scroll rounded-sm border border-gray-200 bg-white p-5 scrollbar-thin scrollbar-thumb-black sm:mt-5">
      {/* My Story */}
      {session && (
        <Story
          avatar={session.user.image || '/default_profile.png'}
          username={session.user.username}
        ></Story>
      )}

      {stories?.map((profile) => (
        <Story
          key={profile.id}
          avatar={profile.avatar}
          username={profile.username}
        ></Story>
      ))}
    </div>
  )
}

export default Stories
