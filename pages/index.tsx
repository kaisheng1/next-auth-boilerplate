import {signIn, signOut, useSession} from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession()

  if (session){
    return (
      <div><div>{JSON.stringify(session, null, 2)}</div><div><button onClick={() => signOut()}>Logout</button></div></div>
    )
  }
  return (
    <div>
      Home
      <button onClick={() => signIn('github')}>Login</button>
    </div>
  )
}
