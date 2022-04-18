import React, { useEffect, useState } from 'react'
import faker from '@faker-js/faker'

//Lazy load Image
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function Suggestions() {
  const [suggestions, setSuggestions] = useState()

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
    }))
    setSuggestions(suggestions)
  }, [])

  return (
    <div className="mt-4 ml-6">
      <div className="mb-2 flex justify-between text-sm">
        <h3 className="text-sm font-semibold text-gray-500">
          Suggestions for you
        </h3>
        <button className="text-xs font-semibold">See All</button>
      </div>

      {/* Suggestions */}
      {suggestions?.map((profile) => (
        <div
          className="mt-2 flex items-center justify-between"
          key={profile.id}
        >
          <LazyLoadImage
            className="h-9 w-9 cursor-pointer rounded-full border p-[2px]"
            src={profile.avatar}
            effect="blur"
          ></LazyLoadImage>

          <div className="ml-4 flex-1">
            <h2 className="cursor-pointer text-xs font-semibold">
              {profile.username}
            </h2>
            <h3 className="text-xs text-gray-400">Suggested for you</h3>
          </div>

          <button className="text-xs font-semibold text-blue-400">
            Follow
          </button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
