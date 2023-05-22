import './globals.css'
import { Roboto_Flex as Roboto, Bai_Jamjuree as BaiJamjuree } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({ subsets: ['latin'], weight: '700', variable: '--font-bai-jamjuree'})

export const metadata = {
  title: 'NLW SpaceTime',
  description: 'Uma cápsula do tempo construida com React, Next.js, TailwindCSS e TypeScript',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const isAuthenticated = cookies().has("token")

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}>

        <main className="grid grid-cols-2 min-h-screen">
          <div className="flex flex-col items-start justify-between px-28 py-14 relative overflow-hidden border-r border-white/10 bg-[url(../assets/stars.svg)] bg-cover">

            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 bg-purple-700 opacity-50 rounded-full blur-full"/>

            <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes"></div>

            {isAuthenticated ? <Profile/> : <SignIn/>}

            <Hero/>

            <Footer/>

          </div>

          <div className="flex flex-col bg-[url(../assets/stars.svg)] bg-cover overflow-y-scroll max-h-screen">

            {children}

          </div>
      </main>
      </body>
    </html>
  )
}
