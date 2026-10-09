"use client"

import { useEffect, useRef, useState } from "react"
import { PROFILE } from "@/config/profile.js"

const MUSIC = {
  title: "Slap the City",
  artist: "Drake",
  album: "Habibti",
  cover: "/public/music/habibti.jpg",
  audio: "/public/music/habibti.mp3",
}

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "0:00"

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

const Elsewhere = () => {
  const audioRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const socials = Object.values(PROFILE.socials ?? {})

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current

    if (!audio) return

    try {
      if (audio.paused) {
        await audio.play()
        setIsPlaying(true)
      } else {
        audio.pause()
        setIsPlaying(false)
      }
    } catch (error) {
      console.error("Unable to play audio:", error)
      setIsPlaying(false)
    }
  }

  const handleSeek = (event) => {
    const audio = audioRef.current

    if (!audio || !duration) return

    const nextTime = Number(event.target.value)

    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const progress =
    duration > 0
      ? Math.min(100, Math.max(0, (currentTime / duration) * 100))
      : 0

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-14">

        {/* HEADER */}
        <header className="mb-12 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              06
            </span>

            <span className="h-px w-8 bg-white/10" />

            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              Elsewhere
            </span>
          </div>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-5xl font-medium tracking-[-0.05em] md:text-7xl lg:text-[88px]">
              Outside of work.
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/40 md:text-base">
              A little corner of the things I listen to, watch,
              play, and enjoy when I&apos;m not building things.
            </p>
          </div>
        </header>

        {/* BENTO GRID */}
        <section className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">

          {/* =====================================================
              MUSIC PLAYER
          ===================================================== */}
          <article className="group relative min-h-[420px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113] md:col-span-2 lg:col-span-2 lg:row-span-2">

            {/* LOCAL AUDIO */}
            <audio
              ref={audioRef}
              src={MUSIC.audio}
              preload="metadata"
            />

            {/* BLURRED BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={MUSIC.cover}
                alt=""
                className="absolute inset-[-10%] h-[120%] w-[120%] object-cover scale-110 opacity-30 blur-3xl transition duration-700 group-hover:opacity-40"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/80" />
            </div>

            {/* PLAYER */}
            <div className="relative flex min-h-[420px] flex-col items-center justify-between p-6 md:p-8">

              {/* TOP */}
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                    Music
                  </p>

                  <p className="mt-2 text-xs text-white/30">
                    {isPlaying ? "Now playing" : "Music"}
                  </p>
                </div>

                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/45 backdrop-blur-md">
                  Local
                </span>
              </div>

              {/* ALBUM ART */}
              <div className="flex w-full flex-1 items-center justify-center py-8">
                <div className="relative aspect-square w-[210px] overflow-hidden rounded-[24px] shadow-2xl shadow-black/50 md:w-[250px]">

                  <img
                    src={MUSIC.cover}
                    alt={`${MUSIC.album} album cover`}
                    className={`h-full w-full object-cover transition-transform duration-700 ${
                      isPlaying ? "scale-[1.02]" : "scale-100"
                    }`}
                  />

                  {/* SUBTLE OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* BOTTOM INFO + CONTROLS */}
              <div className="w-full">

                {/* SONG INFO */}
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-xl font-medium tracking-[-0.03em] md:text-2xl">
                      {MUSIC.title}
                    </p>

                    <p className="mt-1 text-xs text-white/40">
                      {MUSIC.artist}
                    </p>
                  </div>

                  <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-white/25">
                    {MUSIC.album}
                  </span>
                </div>

                {/* PROGRESS */}
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Music progress"
                  className="music-range h-[3px] w-full cursor-pointer appearance-none rounded-full"
                  style={{
                    background: `linear-gradient(
                      to right,
                      rgba(255,255,255,0.9) ${progress}%,
                      rgba(255,255,255,0.16) ${progress}%
                    )`,
                  }}
                />

                {/* TIME */}
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-white/30">
                    {formatTime(currentTime)}
                  </span>

                  <span className="font-mono text-[9px] text-white/30">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* PLAY BUTTON */}
                <div className="mt-5 flex justify-center">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-105 hover:bg-white/90 active:scale-95"
                  >
                    {isPlaying ? (
                      <span className="flex gap-[4px]">
                        <span className="h-4 w-[2px] rounded-full bg-black" />
                        <span className="h-4 w-[2px] rounded-full bg-black" />
                      </span>
                    ) : (
                      <span className="ml-1 h-0 w-0 border-y-[7px] border-l-[10px] border-y-transparent border-l-black" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* =====================================================
              LAST PLAYED GAME
          ===================================================== */}
          <article className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113]">
            <div className="absolute inset-0">
              <img
                src="/public/elsewhere/game.jpg"
                alt=""
                className="h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-55"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            </div>

            <div className="relative flex h-full min-h-[260px] flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                  Last Played
                </span>

                <span className="font-mono text-[9px] text-white/30">
                  PS5
                </span>
              </div>

              <div>
                <p className="text-2xl font-medium tracking-[-0.035em]">
                  The Last of Us
                </p>

                <p className="mt-2 text-xs text-white/40">
                  Part II Remastered
                </p>
              </div>
            </div>
          </article>

          {/* =====================================================
              SERIES
          ===================================================== */}
          <article className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113]">
            <div className="absolute inset-0">
              <img
                src="/public/elsewhere/series.jpg"
                alt=""
                className="h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-55"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            </div>

            <div className="relative flex h-full min-h-[260px] flex-col justify-between p-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                Currently Watching
              </span>

              <div>
                <p className="text-2xl font-medium tracking-[-0.035em]">
                  Succession
                </p>

                <p className="mt-2 text-xs text-white/40">
                  HBO · Season 4
                </p>
              </div>
            </div>
          </article>

          {/* =====================================================
              MOVIE
          ===================================================== */}
          <article className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113] lg:col-span-2">
            <div className="absolute inset-0">
              <img
                src="/public/elsewhere/movie.jpg"
                alt=""
                className="h-full w-full object-cover opacity-35 transition duration-700 group-hover:scale-105 group-hover:opacity-50"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            </div>

            <div className="relative flex h-full min-h-[260px] flex-col justify-between p-6 md:p-7">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                Favorite Movie
              </span>

              <div>
                <p className="text-2xl font-medium tracking-[-0.035em] md:text-3xl">
                  Marty Supreme
                </p>

                <p className="mt-2 text-xs text-white/40">
                  Josh Safdie
                </p>
              </div>
            </div>
          </article>

          {/* =====================================================
              SOCIALS
          ===================================================== */}
          <article className="min-h-[250px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113] p-6 md:col-span-2 md:p-7">
            <div className="flex h-full flex-col justify-between">

              <div className="flex items-start justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                  Find me elsewhere
                </span>

                <span className="font-mono text-[9px] text-white/25">
                  ↗
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link flex items-center justify-between border-b border-white/[0.06] pb-3 transition-colors duration-200 hover:border-white/20"
                  >
                    <span className="text-sm text-white/55 transition-colors group-hover/link:text-white">
                      {social.label}
                    </span>

                    <span className="text-xs text-white/20 transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </article>

          {/* =====================================================
              LOCATION
          ===================================================== */}
          <article className="min-h-[250px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113] p-6 md:col-span-2 md:p-7">
            <div className="flex h-full flex-col justify-between">

              <div className="flex items-start justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                  Somewhere in
                </span>

                <span className="font-mono text-[9px] text-white/20">
                  PH
                </span>
              </div>

              <div>
                <p className="text-3xl font-medium tracking-[-0.04em] md:text-4xl">
                  Philippines
                </p>

                <p className="mt-3 text-xs leading-6 text-white/35">
                  Building a life outside the screen.
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* FOOTER */}
        <footer className="mt-16 flex flex-col gap-3 border-t border-white/[0.06] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/25">
            A few things beyond the work
          </p>

          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/20">
            Zein Khalid Bulaclac
          </p>
        </footer>
      </div>

      {/* RANGE STYLING */}
      <style jsx>{`
        .music-range::-webkit-slider-thumb {
          appearance: none;
          width: 9px;
          height: 9px;
          border-radius: 9999px;
          background: white;
          cursor: pointer;
        }

        .music-range::-moz-range-thumb {
          width: 9px;
          height: 9px;
          border: 0;
          border-radius: 9999px;
          background: white;
          cursor: pointer;
        }

        .music-range::-webkit-slider-runnable-track {
          height: 3px;
        }

        .music-range::-moz-range-track {
          height: 3px;
        }
      `}</style>
    </main>
  )
}

export default Elsewhere