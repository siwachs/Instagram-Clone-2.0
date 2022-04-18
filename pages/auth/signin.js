import React from 'react'
import { getProviders, signIn as signInToProvider } from 'next-auth/react'
import Header from '../../Components/Header'

//Browsers...
function signin({ providers }) {
  return (
    <>
      <Header></Header>

      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <img className="w-80" src="/Instagram_logo.svg" alt="instagram"></img>

        <p className="font-xs italic">
          Clone made with using Next JS + TailWind CSS and Firebase
        </p>

        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="rounded-lg bg-blue-500 p-3 text-white"
                onClick={() =>
                  signInToProvider(provider.id, { callbackUrl: '/' })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

//Middleware
export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default signin
