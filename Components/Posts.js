import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'

function Posts() {
  const [posts, setPosts] = useState(null)

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          //provide new value if anything change in db
          setPosts(snapshot.docs)
        }
      ),
    [db]
  )

  return (
    <div>
      {posts?.map((post) => (
        <Post
          id={post.id}
          key={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        ></Post>
      ))}
    </div>
  )
}

export default Posts
