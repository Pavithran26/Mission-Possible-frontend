import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Play,
  Pause,
  Clock,
  User as UserIcon,
  Volume2,
  Maximize2,
  Sparkles,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoData {
  id: string;
  title: string;
  badgeTag: string;
  heading: string;
  description: string;
  duration: string;
  presenter: string;
  thumbnailUrl: string;
  sampleVideoUrl: string;
}

const videos: VideoData[] = [
  {
    id: 'leadership',
    title: 'Leadership Insights',
    badgeTag: 'Leadership Insights',
    heading: 'About this video',
    description: 'Discover the lessons, experiences, and leadership perspectives that shaped our graduate trainee journey.',
    duration: '05:23 min',
    presenter: 'Leadership Team',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&auto=format&fit=crop&q=80',
    sampleVideoUrl: '/videos/leadership.mp4'
  },
  {
    id: 'overview',
    title: 'Training Overview',
    badgeTag: 'Training Overview',
    heading: 'About this video',
    description: 'Expert-led learning journey covering professional skills, insurance fundamentals, software development, and modern data platforms.',
    duration: '19:38 min',
    presenter: 'L&D Team',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    sampleVideoUrl: '/videos/overall-final-vid-new.mp4'
  }
];

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

interface EnterpriseHeroSectionProps {
  modulesCount?: number;
}

export const EnterpriseHeroSection: React.FC<EnterpriseHeroSectionProps> = ({
  modulesCount = 9
}) => {
  const [activeVideoId, setActiveVideoId] = useState<string>('leadership');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentVideo = videos.find(v => v.id === activeVideoId) || videos[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [activeVideoId]);

  const handleTogglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.error(err));
      }
    }
  };

  const handleOpenModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setIsVideoModalOpen(true);
  };

  return (
    <div
      className="enterprise-hero-card relative overflow-hidden w-full p-8 sm:p-10 lg:p-12 transition-all duration-300 hover:shadow-[0_16px_48px_rgba(37,99,235,0.12)]"
      style={{
        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 45%, #BFDBFE 100%)',
        borderRadius: '32px',
        border: '1px solid #BFDBFE',
        boxShadow: '0 12px 40px rgba(37, 99, 235, 0.08)',
        color: '#0F172A'
      }}
    >

      {/* Background Details */}
      {/* Soft blue radial gradient overlay */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/70 via-white to-slate-50/40 pointer-events-none"
      />

      {/* Blurred glowing shapes */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-400/15 blur-3xl pointer-events-none"
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none"
      />

      {/* Subtle light dotted texture */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"
      />

      {/* Hero Content Grid (2 Columns: Left 45%, Right 55%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

        {/* Left Section (45% -> lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">

          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF5FF] border border-blue-100/80 text-[#2563EB] text-xs font-semibold shadow-2xs select-none w-fit transition-transform hover:scale-[1.02]">
            <BookOpen className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Resource Center • {modulesCount} Modules</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-2">
            <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-extrabold text-[#0F172A] tracking-[-1px] leading-[1.1] font-sans">
              Knowledge Repository
            </h1>

            {/* Description */}
            <p className="text-[16px] sm:text-[18px] font-medium text-[#475569] leading-relaxed max-w-[520px]">
              Browse notes, guides, documents, and valuable resources organized to support your Graduate Trainee journey.
            </p>
          </div>

          {/* Featured Videos Card */}
          <div className="bg-white rounded-[22px] border border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-5 space-y-4 transition-all duration-300 hover:shadow-[0_14px_36px_rgba(15,23,42,0.1)] hover:scale-[1.01]">

            {/* Card Title */}
            <h3 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase font-mono">
              Featured Videos
            </h3>

            {/* Segmented Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {videos.map((vid) => {
                const isActive = vid.id === activeVideoId;

                return (
                  <button
                    key={vid.id}
                    onClick={() => {
                      setActiveVideoId(vid.id);
                    }}
                    className={`h-[52px] rounded-[16px] font-bold text-xs flex items-center justify-center gap-2 px-4 transition-all duration-250 select-none cursor-pointer ${isActive
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)] border-transparent -translate-y-0.5'
                        : 'bg-white border border-slate-200 text-[#0F172A] hover:bg-blue-50/60 hover:border-blue-200 hover:-translate-y-0.5'
                      }`}
                  >
                    <Play className={`w-4 h-4 ${isActive ? 'text-white fill-white' : 'text-[#2563EB]'}`} />
                    <span>{vid.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Video Description with Smooth Fade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVideo.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="space-y-2 pt-1 border-t border-slate-100"
              >
                <h4 className="text-xs font-bold text-[#0F172A]">
                  {currentVideo.heading}
                </h4>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {currentVideo.description}
                </p>

                {/* Bottom Metadata Row */}
                <div className="flex items-center gap-2 pt-1 text-[#64748B] text-[11px] font-medium font-mono">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>{currentVideo.duration}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>{currentVideo.presenter}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* Right Section (55% -> lg:col-span-7) */}
        <div className="lg:col-span-7 flex items-center justify-center">

          {/* Featured Video Player Container */}
          <div
            onClick={(e) => handleTogglePlay(e)}
            className="relative w-full aspect-video rounded-[24px] overflow-hidden border border-slate-200/80 shadow-2xl shadow-blue-900/15 group cursor-pointer transition-all duration-300 hover:scale-[1.01] bg-slate-950"
          >
            {/* HTML5 Video Element */}
            <video
              ref={videoRef}
              src={currentVideo.sampleVideoUrl}
              poster={currentVideo.thumbnailUrl}
              preload="metadata"
              playsInline
              onTimeUpdate={() => {
                if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
              }}
              onLoadedMetadata={() => {
                if (videoRef.current) setDuration(videoRef.current.duration);
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {/* Overlay when not playing */}
            {!isPlaying && (
              <>
                {/* Dark Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-blue-950/20 group-hover:opacity-90 transition-opacity" />

                {/* Top Left Floating Tag */}
                <div className="absolute top-4 left-4 z-20 bg-[#2563EB] text-white px-3.5 py-1.5 text-xs font-semibold rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>{currentVideo.badgeTag}</span>
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 m-auto z-20 w-[90px] h-[90px] rounded-full bg-white text-[#2563EB] flex items-center justify-center shadow-[0_12px_36px_rgba(15,23,42,0.3)] transition-all duration-300 group-hover:scale-[1.08] group-hover:shadow-[0_16px_48px_rgba(37,99,235,0.4)]">
                  <span className="absolute inset-0 rounded-full bg-white/40 animate-ping opacity-75 pointer-events-none" />
                  <Play className="w-8 h-8 fill-[#2563EB] text-[#2563EB] translate-x-0.5" />
                </div>
              </>
            )}

            {/* Bottom Controls (Modern Glass Effect Overlay) */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-0 inset-x-0 z-20 backdrop-blur-md bg-slate-900/70 border-t border-white/10 p-3.5 px-5 flex items-center justify-between gap-3 text-white transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                }`}
            >
              {/* Play / Pause Toggle */}
              <button
                onClick={(e) => handleTogglePlay(e)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white" />
                )}
              </button>

              {/* Progress Bar */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (videoRef.current && videoRef.current.duration) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    videoRef.current.currentTime = pos * videoRef.current.duration;
                  }
                }}
                className="h-1.5 flex-1 bg-white/20 hover:bg-white/30 rounded-full overflow-hidden cursor-pointer relative transition-all"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full relative transition-all"
                  style={{
                    width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%'
                  }}
                />
              </div>

              {/* Timestamp */}
              <span className="font-mono text-xs text-white/80 select-none">
                {formatTime(currentTime)} / {formatTime(duration || 0)}
              </span>

              {/* Control Actions */}
              <div className="flex items-center gap-3 text-white/80">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (videoRef.current) {
                      videoRef.current.muted = !videoRef.current.muted;
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button onClick={(e) => handleOpenModal(e)} className="hover:text-white transition-colors cursor-pointer">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Light Video Lightbox Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl space-y-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800">
                    {currentVideo.badgeTag}
                  </span>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Element */}
              <div className="aspect-video w-full bg-black relative">
                <video
                  src={currentVideo.sampleVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
