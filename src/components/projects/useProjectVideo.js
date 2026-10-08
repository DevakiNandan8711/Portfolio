import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Manages video playback, THREE.VideoTexture creation, poster fallback,
 * playback speed adjustment (fast 3.5x - 4x), and visibility/intersection pauses.
 */
export function useProjectVideo(project, isSectionVisible, prefersReducedMotion) {
  const [texture, setTexture] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const videoRef = useRef(null);
  const videoTextureRef = useRef(null);
  const posterTextureRef = useRef(null);

  // Load fallback black canvas texture while video loads
  useEffect(() => {
    let active = true;

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 640, 360);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#1e1b4b');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 640, 360);
    const fallbackTex = new THREE.CanvasTexture(canvas);
    fallbackTex.colorSpace = THREE.SRGBColorSpace;
    posterTextureRef.current = fallbackTex;

    if (!videoTextureRef.current) {
      setTexture(fallbackTex);
    }

    return () => {
      active = false;
    };
  }, [project?.id]);

  // Video element setup and playback rate management
  useEffect(() => {
    if (!project?.video) return;

    let isCancelled = false;
    setIsReady(false);
    setHasError(false);

    const video = document.createElement('video');
    video.src = project.video;
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    videoRef.current = video;

    const targetSpeed = prefersReducedMotion ? 1 : (project.speed || 4);
    const enforceSpeed = () => {
      if (video.playbackRate !== targetSpeed) {
        video.defaultPlaybackRate = targetSpeed;
        video.playbackRate = targetSpeed;
      }
    };
    const handleReady = () => {
      if (isCancelled || video.readyState < 2) return;

      let videoTexture = videoTextureRef.current;
      if (!videoTexture) {
        videoTexture = new THREE.VideoTexture(video);
        videoTexture.colorSpace = THREE.SRGBColorSpace;
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTextureRef.current = videoTexture;
      }

      setTexture(videoTexture);
      setIsReady(true);
      enforceSpeed();
    };
    const handlePlay = () => enforceSpeed();
    const handleError = () => {
      if (isCancelled) return;
      setHasError(true);
      setIsReady(false);
      if (posterTextureRef.current) setTexture(posterTextureRef.current);
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isSectionVisible) {
        enforceSpeed();
        video.play().catch(() => {});
      }
    };

    video.addEventListener('loadeddata', handleReady);
    video.addEventListener('loadedmetadata', handleReady);
    video.addEventListener('canplay', handleReady);
    video.addEventListener('canplaythrough', handleReady);
    video.addEventListener('play', handlePlay);
    video.addEventListener('playing', handlePlay);
    video.addEventListener('ratechange', enforceSpeed);
    video.addEventListener('timeupdate', enforceSpeed);
    video.addEventListener('seeked', handlePlay);
    video.addEventListener('error', handleError);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    video.load();
    if (isSectionVisible && !document.hidden) {
      video.play().catch(() => {});
    }

    return () => {
      isCancelled = true;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('loadedmetadata', handleReady);
      video.removeEventListener('canplay', handleReady);
      video.removeEventListener('canplaythrough', handleReady);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('playing', handlePlay);
      video.removeEventListener('ratechange', enforceSpeed);
      video.removeEventListener('timeupdate', enforceSpeed);
      video.removeEventListener('seeked', handlePlay);
      video.removeEventListener('error', handleError);
      video.pause();
      video.removeAttribute('src');
      video.load();
      videoTextureRef.current?.dispose();
      videoTextureRef.current = null;
      videoRef.current = null;
    };
  }, [project?.id, project?.video, project?.speed, isSectionVisible, prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isSectionVisible && !document.hidden) {
      const targetSpeed = prefersReducedMotion ? 1 : (project?.speed || 4);
      video.defaultPlaybackRate = targetSpeed;
      video.playbackRate = targetSpeed;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isSectionVisible, isReady, prefersReducedMotion, project?.speed]);

  return { texture, isReady, hasError };
}
