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
        <div className="w-full rounded-2xl shadow-lg border border-green-200 bg-purple-100 px-6 py-1">
          {/* Logo Row with Ads */}
          <div className="flex items-center justify-between">
            {/* Left: Text Logo */}
            <div className="flex-shrink-0">
              <div 
                onClick={handleLogoClick}
                className="cursor-pointer pr-4">
                <h1 
                  className="font-bold text-4xl cursor-pointer transition-all duration-300"
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
                <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-purple-400 rounded-full mt-1"></div>
              </div>
            </div>

            {/* Right: Ad Banner */}
            <div className="flex-shrink-0">
              {/* Desktop: 728x90 Leaderboard */}
              <div className="hidden md:block h-90px w-728">
                <ins 
                  className="adsbygoogle"
                  style={{display: 'block', width: '728px', height: '90px'}}
                  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                  data-ad-slot="XXXXXXXXXX"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
              
              {/* Mobile: 320x100 Large Mobile Banner */}
              <div className="block md:hidden h-100px w-80">
                <ins 
                  className="adsbygoogle"
                  style={{display: 'block', width: '320px', height: '100px'}}
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
