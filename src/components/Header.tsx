'use client'

import { useRouter } from 'next/navigation'

interface HeaderProps {
  onLogoClick?: () => void
}

const Header = ({ onLogoClick }: HeaderProps) => {
  const router = useRouter()

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick()
    }
    router.push('/')
  }

  return (
    <div className="mb-4">
      <div className="w-full">
        {/* Header with Ads Left and Right */}
        <div className="w-full rounded-2xl shadow-lg bg-purple-100 px-6 py-1">
          {/* Logo Row with Ads */}
          <div className="flex items-center justify-between">
            {/* Left: Text Logo */}
            <div className="flex-shrink-0">
              <div 
                onClick={handleLogoClick}
                className="cursor-pointer pr-2 sm:pr-4">
                <h1 
                  className="font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl cursor-pointer transition-all duration-300"
                  style={{
                    background: 'linear-gradient(90deg, #059669 0%, #9333ea 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  TestYourself
                </h1>
                <div className="w-8 sm:w-10 md:w-12 lg:w-16 h-1 bg-gradient-to-r from-green-400 to-purple-400 rounded-full mt-1"></div>
              </div>
            </div>

            {/* Right: Ad Banner */}
            <div className="flex-shrink-0 max-w-full">
              {/* Desktop: 728x90 Leaderboard */}
              <div className="hidden md:block h-90px max-w-full">
                <ins 
                  className="adsbygoogle"
                  style={{display: 'block', width: '100%', maxWidth: '728px', height: '90px'}}
                  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                  data-ad-slot="XXXXXXXXXX"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
              
              {/* Mobile: 320x90 Banner */}
              <div className="block md:hidden h-90px max-w-full">
                <ins 
                  className="adsbygoogle"
                  style={{display: 'block', width: '100%', maxWidth: '320px', height: '90px'}}
                  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                  data-ad-slot="XXXXXXXXXX"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
