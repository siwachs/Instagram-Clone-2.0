import React from 'react'
import Image from 'next/image'
import {
  SearchIcon,
  PlusCircleIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../ATOMS/modalAtom'

//Lazy load Image
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

//Dropdown menu
import { Menu } from '@headlessui/react'

function Header() {
  //Get User Data
  const { data: session } = useSession()

  //Built-in Router
  const Router = useRouter()

  //Modal
  const [open, setOpen] = useRecoilState(modalState)

  return (
    <div className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="flex w-full justify-between p-3 md:mx-auto md:max-w-3xl md:py-3 lg:max-w-4xl">
        {/*____________ Logo _________________ */}
        <div
          onClick={() => Router.push('/')}
          className="relative w-24 cursor-pointer sm:inline-grid"
        >
          <Image
            layout="fill"
            src="/Instagram_logo.svg"
            objectFit="contain"
          ></Image>

          {/* <Image
            layout="fill"
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Instagram_logo.svg"
            objectFit="contain"
          ></Image> */}
        </div>

        {/*_________________ Search___________ */}
        <div className="relative mt-1 hidden rounded-md sm:inline-block">
          <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400"></SearchIcon>
          </div>

          <input
            placeholder="Search"
            className="block h-7 w-60 rounded-md bg-gray-200 pl-10  focus:border-black focus:ring-0 sm:text-sm"
            type="text"
          ></input>
        </div>

        {/*________________ ICONS ___________ */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon
            onClick={() => Router.push('/')}
            className="navBtn"
          ></HomeIcon>

          {/* Conditional Rendering */}
          {session ? (
            <>
              {/* Blinking Icon */}
              <div className="navBtn relative">
                <PaperAirplaneIcon className="navBtn rotate-45"></PaperAirplaneIcon>
                <div className="absolute -top-1 -right-2 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  30
                </div>
              </div>

              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              ></PlusCircleIcon>
              <HeartIcon className="navBtn"></HeartIcon>

              <LazyLoadImage
                onClick={signOut}
                className="h-8 cursor-pointer rounded-full object-contain"
                src={session?.user.image || '/default_profile.png'}
                effect="blur"
              ></LazyLoadImage>
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}

          {/* ___________ Mobile Menu ________ */}
          <div className="relative sm:hidden">
            <Menu>
              <Menu.Button>
                <MenuIcon className="h-6 cursor-pointer"></MenuIcon>
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-10 rounded-md border bg-slate-200 p-1 shadow">
                <Menu.Item>
                  <div
                    onClick={() => Router.push('/')}
                    className={`mb-1 flex cursor-pointer items-center rounded-sm hover:bg-slate-400`}
                  >
                    <HomeIcon className="h-6 text-gray-500"></HomeIcon>
                    <span className="ml-1 text-sm font-semibold">Home</span>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div
                    onClick={() => setOpen(true)}
                    className={`flex cursor-pointer items-center rounded-sm hover:bg-slate-400`}
                  >
                    <PlusCircleIcon className="h-6 text-gray-500"></PlusCircleIcon>
                    <span className="ml-1 text-sm font-semibold">Post</span>
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
