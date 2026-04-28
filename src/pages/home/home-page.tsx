import { HeroSection } from '@/features/home/ui/hero-section'
import { FeaturesSection } from '@/features/home/ui/features-section'
import { SecuritySection } from '@/features/home/ui/security-section'
import { PrivacySection } from '@/features/home/ui/privacy-section'
import { DownloadSection } from '@/features/home/ui/download-section'
import { CTASection } from '@/features/home/ui/cta-section'

export function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <SecuritySection />
      <PrivacySection />
      <DownloadSection />
      <CTASection />
    </div>
  )
}
