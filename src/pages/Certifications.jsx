import PageContainer from "@/components/layout/PageContainer.jsx"
import PageHeader from "@/components/layout/PageHeader.jsx"
import PageIntro from "@/components/layout/PageIntro.jsx"

import CertificationRow from "@/features/certifications/components/CertificationRow.jsx"

import {
  CERTIFICATIONS,
} from "@/data/certifications.js"


const Certifications = () => {
  return (
    <div className="min-h-full bg-[#0b0b0c]">

      <PageHeader
        eyebrow="Profile / Certifications"
        meta={`${CERTIFICATIONS.length} Certifications`}
      />


      <PageContainer>

        <PageIntro
          label="Learning"
          description="
            Structured learning alongside practical development
            across frontend engineering, interface design, and
            modern web technologies.
          "
        >
          Certifications

          <span className="text-neutral-600">
            {" "}and continued learning.
          </span>
        </PageIntro>


        <section
          className="
            mt-14
            border-t
            border-white/[0.07]
          "
          aria-label="Certifications"
        >
          {CERTIFICATIONS.map(
            (certification, index) => (
              <CertificationRow
                key={certification.id}
                certification={certification}
                index={index}
                isLast={
                  index ===
                  CERTIFICATIONS.length - 1
                }
              />
            )
          )}
        </section>

      </PageContainer>

    </div>
  )
}


export default Certifications