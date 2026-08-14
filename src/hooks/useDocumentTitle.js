import {
  useEffect,
} from "react"

import {
  SITE,
} from "@/config/site.js"


const useDocumentTitle = (
  page,
) => {
  useEffect(() => {
    const pageTitle =
      SITE.pageTitles[page]

    if (!pageTitle) {
      document.title =
        SITE.title

      return
    }


    if (page === "home") {
      document.title =
        SITE.title

      return
    }


    document.title =
      `${pageTitle} — ${SITE.name}`
  }, [page])
}


export default useDocumentTitle