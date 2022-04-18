import React, { useEffect, useState } from 'react'
import {
  BookmarkIcon,
  ChatIcon,
  HeartIcon,
  PaperAirplaneIcon,
  EmojiHappyIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { TrashIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebase'

//Time formating
import Moment from 'react-moment'

//Lazy load Image
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

//Dropdown menu
import { Menu } from '@headlessui/react'

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession()

  //Comments
  const [comments, setComments] = useState(null)

  const [comment, setComment] = useState('')

  //Likes
  const [likes, setLikes] = useState()
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    setHasLiked(
      likes?.findIndex((like) => like.id === session?.user.uid) !== -1
    )
  }, [likes])

  //Load Comments
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => {
          setComments(snapshot.docs)
        }
      ),
    [db, id]
  )

  //Likes
  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapShot) => {
        setLikes(snapShot.docs)
      }),
    [db, id]
  )

  const likePost = async () => {
    if (hasLiked) {
      //Delete Doc
      await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session?.user.uid), {
        username: session.user.username,
      })
    }
  }

  const sendComment = async (event) => {
    event.preventDefault()

    const copyComment = comment
    setComment('')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: copyComment,
      username: session?.user.username,
      userImage: session?.user.image,
      timestamp: serverTimestamp(),
    })
  }

  return (
    <div className="my-5 rounded-sm border bg-white">
      {/* Headers */}
      <div className="flex items-center px-3 py-2">
        <img
          className="mr-3 h-10 w-10 cursor-pointer rounded-full border object-contain p-1"
          src={userImg}
          alt=""
        ></img>
        <p className="flex-1 cursor-pointer text-sm font-semibold">
          {username}
        </p>
        <div className="relative">
          <Menu>
            <Menu.Button>
              <DotsHorizontalIcon className="h-4 cursor-pointer"></DotsHorizontalIcon>
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 rounded-md border bg-slate-200 p-1 shadow">
              <Menu.Item>
                <div
                  className={`flex cursor-pointer items-center rounded-sm hover:bg-slate-400`}
                >
                  <TrashIcon className="h-6 text-gray-500"></TrashIcon>
                  <span className="text-sm font-semibold">Delete</span>
                </div>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <LazyLoadImage
        className="w-full object-contain"
        src={img}
        effect="blur"
      ></LazyLoadImage>

      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-2 pt-3">
          <div className="flex space-x-3">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              ></HeartIconFilled>
            ) : (
              <HeartIcon onClick={likePost} className="btn"></HeartIcon>
            )}
            <ChatIcon className="btn"></ChatIcon>
            <PaperAirplaneIcon className="btn rotate-45"></PaperAirplaneIcon>
          </div>

          {/* Bookmark */}
          <BookmarkIcon className="btn"></BookmarkIcon>
        </div>
      )}

      {/* Caption */}
      <p className="truncate p-2 text-sm">
        {/* Likes */}
        {likes?.length > 0 && (
          <p className="mb-1 text-sm font-semibold">
            {likes.length} {likes.length > 1 ? 'likes' : 'like'}
          </p>
        )}
        <span className="mr-1 font-semibold">{username}</span> {caption}
      </p>

      {/* Comments */}
      {comments && comments.length > 0 && (
        <div className="ml-2 mt-1 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-3 flex items-center space-x-2">
              <img
                className="h-7 rounded-full"
                alt=""
                src={comment.data().userImage}
              ></img>
              <p className="flex-1 text-sm">
                <span className="text-xs font-semibold">
                  {comment.data().username}
                </span>{' '}
                {comment.data().comment}
              </p>

              {/* TimeStamp */}
              <Moment className="pr-4 text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Inputs */}

      {session && (
        <form className="flex items-center p-2">
          <EmojiHappyIcon className="h-7 cursor-pointer"></EmojiHappyIcon>
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Add a comment..."
            type="text"
            className="flex-1 border-none outline-none focus:ring-0"
          ></input>

          <button
            type="submit"
            disabled={comment.trim().length == 0}
            className="text-sm font-semibold text-blue-400"
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
