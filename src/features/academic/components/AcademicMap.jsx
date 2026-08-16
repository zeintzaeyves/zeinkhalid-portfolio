import {
  useEffect,
} from "react"

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  useMap,
} from "@/components/ui/map"


const WORLD_GEOJSON_URL =
  "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/main/countries.geojson"


const SOURCE_ID =
  "academic-world-countries"

const FILL_LAYER_ID =
  "academic-world-dots"

const PATTERN_ID =
  "academic-dot-pattern"


/* =====================================
   CREATE DOT TEXTURE
===================================== */

const createDotPattern = () => {
  const size = 8

  const canvas =
    document.createElement("canvas")

  canvas.width = size
  canvas.height = size


  const context =
    canvas.getContext("2d")


  if (!context) {
    return null
  }


  context.clearRect(
    0,
    0,
    size,
    size,
  )


  context.beginPath()

  context.arc(
    2,
    2,
    1.25,
    0,
    Math.PI * 2,
  )


  context.fillStyle =
    "rgba(180, 180, 185, 0.82)"

  context.fill()


  return context.getImageData(
    0,
    0,
    size,
    size,
  )
}


/* =====================================
   DOTTED COUNTRY LAYER
===================================== */

const DottedCountries = () => {
  const {
    map,
    isLoaded,
  } = useMap()


  useEffect(() => {
    if (
      !map ||
      !isLoaded
    ) {
      return
    }


    const controller =
      new AbortController()


    const setupCountries =
      async () => {
        try {
          /* =============================
             DOT PATTERN
          ============================= */

          if (
            !map.hasImage(
              PATTERN_ID,
            )
          ) {
            const pattern =
              createDotPattern()


            if (pattern) {
              map.addImage(
                PATTERN_ID,
                pattern,
              )
            }
          }


          /* =============================
             WORLD GEOJSON
          ============================= */

          const response =
            await fetch(
              WORLD_GEOJSON_URL,
              {
                signal:
                  controller.signal,
              },
            )


          if (!response.ok) {
            throw new Error(
              "Unable to load world map data.",
            )
          }


          const worldData =
            await response.json()


          if (
            controller.signal.aborted
          ) {
            return
          }


          /* =============================
             SOURCE
          ============================= */

          if (
            !map.getSource(
              SOURCE_ID,
            )
          ) {
            map.addSource(
              SOURCE_ID,
              {
                type: "geojson",
                data: worldData,
              },
            )
          }


          /* =============================
             DOTTED FILL
          ============================= */

          if (
            !map.getLayer(
              FILL_LAYER_ID,
            )
          ) {
            map.addLayer({
              id:
                FILL_LAYER_ID,

              type:
                "fill",

              source:
                SOURCE_ID,

              paint: {
                "fill-pattern":
                  PATTERN_ID,

                "fill-opacity":
                  0.78,
              },
            })
          }
        } catch (error) {
          if (
            error?.name ===
            "AbortError"
          ) {
            return
          }


          console.error(
            "Academic map setup failed:",
            error,
          )
        }
      }


    setupCountries()


    return () => {
      controller.abort()


      if (
        !map ||
        !map.getStyle()
      ) {
        return
      }


      if (
        map.getLayer(
          FILL_LAYER_ID,
        )
      ) {
        map.removeLayer(
          FILL_LAYER_ID,
        )
      }


      if (
        map.getSource(
          SOURCE_ID,
        )
      ) {
        map.removeSource(
          SOURCE_ID,
        )
      }


      if (
        map.hasImage(
          PATTERN_ID,
        )
      ) {
        map.removeImage(
          PATTERN_ID,
        )
      }
    }
  }, [
    map,
    isLoaded,
  ])


  return null
}


/* =====================================
   PHILIPPINES MARKER
===================================== */

const PhilippinesMarker = () => {
  return (
    <MapMarker
      longitude={121.774}
      latitude={12.8797}
    >
      <MarkerContent>
        <div
          className="
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
          "
        >
          {/* LARGE GLOW */}

          <span
            className="
              absolute

              h-12
              w-12

              rounded-full

              bg-blue-500/10

              animate-ping
            "
          />


          {/* SECONDARY GLOW */}

          <span
            className="
              absolute

              h-7
              w-7

              rounded-full

              border
              border-blue-400/20

              bg-blue-500/10
            "
          />


          {/* CORE */}

          <span
            className="
              relative

              h-2.5
              w-2.5

              rounded-full

              border
              border-blue-100

              bg-blue-400

              shadow-[0_0_22px_rgba(96,165,250,0.9)]
            "
          />
        </div>
      </MarkerContent>


      <MarkerTooltip
        className="
          border
          border-white/[0.08]

          bg-[#111113]

          px-3
          py-2

          text-xs
          text-neutral-300
        "
      >
        Philippines
      </MarkerTooltip>
    </MapMarker>
  )
}


/* =====================================
   ACADEMIC MAP
===================================== */

const AcademicMap = () => {
  return (
    <div
      className="
        relative

        h-[360px]
        w-full

        overflow-hidden

        sm:h-[430px]
        md:h-[500px]
        lg:h-[540px]
      "
    >
      <Map
        blank

        theme="dark"

        center={[
          18,
          18,
        ]}

        zoom={0.85}

        minZoom={0.45}
        maxZoom={3.5}

        renderWorldCopies={
          false
        }

        scrollZoom={
          false
        }

        dragRotate={
          false
        }

        pitchWithRotate={
          false
        }

        attributionControl={
          false
        }

        className="
          h-full
          w-full

          bg-[#0b0b0c]
        "
      >
        <DottedCountries />

        <PhilippinesMarker />
      </Map>


      {/* =====================================
          TOP FADE
      ===================================== */}

      <div
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-0

          z-10

          h-20

          bg-gradient-to-b
          from-[#0b0b0c]
          to-transparent
        "
      />


      {/* =====================================
          BOTTOM FADE
      ===================================== */}

      <div
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0

          z-10

          h-24

          bg-gradient-to-t
          from-[#0b0b0c]
          to-transparent
        "
      />


      {/* =====================================
          LEFT FADE
      ===================================== */}

      <div
        className="
          pointer-events-none

          absolute
          inset-y-0
          left-0

          z-10

          w-16

          bg-gradient-to-r
          from-[#0b0b0c]
          to-transparent
        "
      />


      {/* =====================================
          RIGHT FADE
      ===================================== */}

      <div
        className="
          pointer-events-none

          absolute
          inset-y-0
          right-0

          z-10

          w-16

          bg-gradient-to-l
          from-[#0b0b0c]
          to-transparent
        "
      />


      {/* =====================================
          MAP LABEL
      ===================================== */}

      <div
        className="
          pointer-events-none

          absolute
          bottom-5
          left-5

          z-20

          flex
          items-center
          gap-2

          font-mono
          text-[8px]
          uppercase
          tracking-[0.16em]

          text-neutral-700

          md:left-0
        "
      >
        <span
          className="
            h-1.5
            w-1.5

            rounded-full

            bg-blue-400

            shadow-[0_0_8px_rgba(96,165,250,0.8)]
          "
        />

        Philippines / Remote
      </div>
    </div>
  )
}


export default AcademicMap