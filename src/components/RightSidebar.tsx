'use client'

import { useState, useEffect } from 'react'

export default function RightSidebar() {
  const [isVisible, setIsVisible] = useState(false)
  const [adSizes, setAdSizes] = useState<{width: number, height: number}[]>([])
  const [sidebarWidth, setSidebarWidth] = useState(0)

  useEffect(() => {
    const updateSidebarVisibility = () => {
      // Step 1: Get current viewport width
      const viewportWidth = window.innerWidth
      
      // Step 2: Get content width (should always be the same)
      const contentWidth = 1152 // max-w-6xl
      
      // Step 3: Subtract content-width from current-viewport-width (both_sidebars = current_viewport_width - content_width)
      const bothSidebars = viewportWidth - contentWidth
      
      // Step 4: Divide both_sidebars by 2 (sidebar_width = both_sidebars / 2)
      const sidebarWidth = bothSidebars / 2
      
      // Step 5: Create sidebar with sidebar_width and give it padding too
      const sidebarPadding = 16 // 16px padding on each side of sidebar
      
               // Step 6: Get ad container padding (8px + 8px = 16px) and sidebar padding
               const adContainerPadding = 16 // 8px + 8px = 16px
      
      // Step 7: Max width of ad that can be placed = sidebar_width - sidebar_padding - ad_container_padding
      const maxAdWidth = sidebarWidth - (sidebarPadding * 2) - adContainerPadding
      
      // Minimum width needed for smallest ad (120px) + sidebar padding (32px) + container padding (16px)
      const minRequiredWidth = 120 + 32 + 16
      
      if (sidebarWidth >= minRequiredWidth) {
        setIsVisible(true)
        setSidebarWidth(sidebarWidth)
        // Determine ad sizes based on available space
        const availableWidth = maxAdWidth // Use calculated max ad width
        const newAdSizes: {width: number, height: number}[] = []
        
        
             // Standard Google AdSense sizes (all orientations)
             const adSizes = [
               { width: 280, height: 1050 }, // Portrait
               { width: 280, height: 600 },  // Large Skyscraper
               { width: 280, height: 250 },  // Medium Rectangle
               { width: 250, height: 250 },  // Square
               { width: 200, height: 200 },  // Small Square
               { width: 160, height: 600 },  // Wide Skyscraper
               { width: 120, height: 600 },  // Skyscraper
               { width: 120, height: 240 },  // Skyscraper
               { width: 320, height: 50 },   // Mobile Banner
             ]
        
        // Check which ads fit
        const fittingAds = adSizes.filter(ad => ad.width <= availableWidth)
        
        // Find the largest ad size that fits
        const bestFit = adSizes
          .filter(ad => ad.width <= availableWidth)
          .sort((a, b) => (b.width * b.height) - (a.width * a.height))[0]
        
        
        if (bestFit) {
               // Greedy algorithm for vertical ad placement
               // Step 1: Get current viewport height minus ALL spacing
               const marginTop = 8 // top-2 positioning
               const containerPadding = 16 // p-2 = 8px top + 8px bottom
               const adMarginBottom = 8 // space-y-2 = 8px gap between ads
          
          let currentViewportHeight = window.innerHeight - marginTop - containerPadding
          let verticalSpaceLeft = currentViewportHeight
          
          
               // Repeat until no more space or max 2 ads reached
               while (verticalSpaceLeft > 0 && newAdSizes.length < 2) {
                 // Step 2: Find the tallest possible ad that fits in remaining vertical space
                 const fittingAds = adSizes.filter(ad =>
                   ad.width <= availableWidth &&
                   ad.height <= verticalSpaceLeft
                 )

                 if (fittingAds.length === 0) {
                   break
                 }

                 // Get the tallest ad that fits (prioritize height over area)
                 const selectedAd = fittingAds
                   .sort((a, b) => b.height - a.height)[0]
                 
                 // If this is a very short ad and we already have one ad,
                 // prefer to use the space for a larger single ad instead
                 if (newAdSizes.length === 1 && selectedAd.height < 100) {
                   break
                 }
            
                 // Step 3: Add the ad and subtract its height from vertical space
                 // Only add margin-bottom if this is not the last ad
                 newAdSizes.push(selectedAd)
                 
                 // Check if this will be the last ad by seeing if any other ads fit after this one
                 const remainingSpaceAfterThisAd = verticalSpaceLeft - selectedAd.height
                 const adsThatFitAfter = adSizes.filter(ad =>
                   ad.width <= availableWidth &&
                   ad.height <= remainingSpaceAfterThisAd
                 )
                 
                 // If no more ads fit after this one, don't subtract margin
                 if (adsThatFitAfter.length === 0) {
                   verticalSpaceLeft -= selectedAd.height
                 } else {
                   verticalSpaceLeft -= (selectedAd.height + adMarginBottom)
                 }
            
          }
          
        }
        
        setAdSizes(newAdSizes)
      } else {
        setIsVisible(false)
        setAdSizes([])
        setSidebarWidth(0)
      }
    }

    // Initial check
    updateSidebarVisibility()

    // Listen for resize events
    window.addEventListener('resize', updateSidebarVisibility)
    
    return () => {
      window.removeEventListener('resize', updateSidebarVisibility)
    }
  }, [])

  if (!isVisible || adSizes.length === 0) {
    return null
  }

  return (
    <div 
      className="fixed right-0 top-2 h-full z-10 flex justify-center items-start"
      style={{ 
        width: `${sidebarWidth}px`,
        paddingLeft: `${16}px`,
        paddingRight: `${16}px`
      }}
    >
         <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col items-center">
             {adSizes.map((size, index) => (
               <div key={index} className="flex flex-col items-center">
                 <div
                   className="border-2 border-dashed border-gray-400 bg-gray-50 flex items-center justify-center text-gray-500 text-xs"
                   style={{
                     width: `${size.width}px`,
                     height: `${size.height}px`,
                     minHeight: `${size.height}px`
                   }}
                 >
                   <div className="text-center">
                     <div>{size.width} × {size.height}</div>
                     <div className="text-xs">Right Sidebar</div>
                   </div>
                 </div>
                 {index < adSizes.length - 1 && <div className="h-2"></div>}
               </div>
             ))}
      </div>
    </div>
  )
}
