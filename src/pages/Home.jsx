import PageContainer from "@/components/layout/PageContainer.jsx"
import PageHeader from "@/components/layout/PageHeader.jsx"

import CapabilitiesSection from "@/features/home/components/CapabilitiesSection.jsx"
import ExperiencePreview from "@/features/home/components/ExperiencePreview.jsx"
import FeaturedWorkSection from "@/features/home/components/FeaturedWorkSection.jsx"
import FinalCta from "@/features/home/components/FinalCta.jsx"
import HeroSection from "@/features/home/components/HeroSection.jsx"
import LearningPreview from "@/features/home/components/LearningPreview.jsx"
import StackPreview from "@/features/home/components/StackPreview.jsx"


const Home = ({
  onNavigate,
  onOpenTalk,
}) => {
  const navigate = (page) => {
    onNavigate?.(page)
  }


  return (
    <div className="min-h-full bg-[#0b0b0c]">

      <PageHeader
        eyebrow="Zein / Index"
        meta="Front-end & Web Design"
      />


      <PageContainer>

        <HeroSection
          onViewWork={() =>
            navigate("projects")
          }
          onOpenTalk={onOpenTalk}
        />


        <FeaturedWorkSection
          onNavigate={navigate}
        />


        <CapabilitiesSection />


        <ExperiencePreview
          onNavigate={navigate}
        />


        <StackPreview
          onNavigate={navigate}
        />


        <LearningPreview
          onNavigate={navigate}
        />


        <FinalCta
          onViewWork={() =>
            navigate("projects")
          }
          onOpenTalk={onOpenTalk}
        />

      </PageContainer>

    </div>
  )
}


export default Home