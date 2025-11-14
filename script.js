const loader = document.querySelector('.loader');
const player = document.querySelector('.player');
const playerOverlay = document.querySelector('.player__overlay');
const playerEmbed = document.querySelector('[data-player-embed]');
const playerClientLabel = document.querySelector('[data-player-client]');
const playerTitleLabel = document.querySelector('[data-player-title]');
const closeButton = document.querySelector('.player__close');
const playerControls = document.querySelector('[data-player-controls]');
const playToggle = document.querySelector('[data-player-toggle]');
const muteToggle = document.querySelector('[data-player-mute]');
const seekInput = document.querySelector('[data-player-seek]');
const currentTimeLabel = document.querySelector('[data-player-time-current]');
const totalTimeLabel = document.querySelector('[data-player-time-total]');
const year = document.getElementById('year');
const logoImages = Array.from(document.querySelectorAll('[data-logo-image]'));

const DEFAULT_LOGO_SVG_DARK = `
  <svg id="\u0421\u043b\u043e\u0439_1" data-name="\u0421\u043b\u043e\u0439 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <g fill="#f5f5f5">
      <path d="M48.66,34.44h9.23L41.21,88.33h-12Z" />
      <path d="M116.06,54.41c-5.11-3.76-11.47-3.17-15.17-2a19,19,0,0,0-6,3.51c-2.87,2.41-5.75,6.4-5.53,11,.36,7.8,9.18,5.68,12.93,10.36a8.61,8.61,0,0,1,1,9.5,6,6,0,0,1-7.14,3.39A7.94,7.94,0,0,1,93.45,89c-3.59-2.46-6.27-6.81-8.55-10.79C82,73.13,78.19,67,78.25,62.93c0-2.91,5.18-6.82,10.77-11.5,3.46-2.89,5.32-4.7,11.08-9.88,2.59-2.33,7.78-7.11,7.78-7.11h-13s-4.65,5.36-7.78,9.17c0,0-1.71,2.07-5,5.82-5.2,6-9.88,9.63-12.15,9.18a.88.88,0,0,1-.23-.07c-2.12-.94-.29-6.45,1.76-11.59,1.15-2.87,6.27-12.51,6.27-12.51H66.16L49.48,88.33H61.1A78.33,78.33,0,0,1,63.22,76.4c.76-2.92,2.83-11.65,5.44-11.65,2,0,4.22,2.61,6,11.86C76,83.08,79,90.77,82.76,94c8.66,7.33,19.3,4.14,23.89,2.12,4.76-2.1,7.87-6.19,8.43-9.58,1.38-8.36-5-12.89-9-14.95s-5.55-3.92-5.68-6.75c-.18-3.79,2.42-8.42,6.81-9.13,2.17-.36,5.19.18,5.75,2.28.61,2.29-4.59,7.34-4.59,7.34h10.1S122.85,59.41,116.06,54.41Z" />
      <path d="M15.64,40c1.52,10.23,4.69,18.58,7.21,18.58s4.19-2.16,7.68-16C32.63,34.3,35,21.48,35,21.48H45.56L26.62,72.25H16.5L.14,21.48H14.08A156.14,156.14,0,0,0,15.64,40Z" />
    </g>
  </svg>
`;

const DEFAULT_LOGO_SVG_LIGHT = `
  <svg id="\u0421\u043b\u043e\u0439_1" data-name="\u0421\u043b\u043e\u0439 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <g fill="#101010">
      <path d="M48.66,34.44h9.23L41.21,88.33h-12Z" />
      <path d="M116.06,54.41c-5.11-3.76-11.47-3.17-15.17-2a19,19,0,0,0-6,3.51c-2.87,2.41-5.75,6.4-5.53,11,.36,7.8,9.18,5.68,12.93,10.36a8.61,8.61,0,0,1,1,9.5,6,6,0,0,1-7.14,3.39A7.94,7.94,0,0,1,93.45,89c-3.59-2.46-6.27-6.81-8.55-10.79C82,73.13,78.19,67,78.25,62.93c0-2.91,5.18-6.82,10.77-11.5,3.46-2.89,5.32-4.7,11.08-9.88,2.59-2.33,7.78-7.11,7.78-7.11h-13s-4.65,5.36-7.78,9.17c0,0-1.71,2.07-5,5.82-5.2,6-9.88,9.63-12.15,9.18a.88.88,0,0,1-.23-.07c-2.12-.94-.29-6.45,1.76-11.59,1.15-2.87,6.27-12.51,6.27-12.51H66.16L49.48,88.33H61.1A78.33,78.33,0,0,1,63.22,76.4c.76-2.92,2.83-11.65,5.44-11.65,2,0,4.22,2.61,6,11.86C76,83.08,79,90.77,82.76,94c8.66,7.33,19.3,4.14,23.89,2.12,4.76-2.1,7.87-6.19,8.43-9.58,1.38-8.36-5-12.89-9-14.95s-5.55-3.92-5.68-6.75c-.18-3.79,2.42-8.42,6.81-9.13,2.17-.36,5.19.18,5.75,2.28.61,2.29-4.59,7.34-4.59,7.34h10.1S122.85,59.41,116.06,54.41Z" />
      <path d="M15.64,40c1.52,10.23,4.69,18.58,7.21,18.58s4.19-2.16,7.68-16C32.63,34.3,35,21.48,35,21.48H45.56L26.62,72.25H16.5L.14,21.48H14.08A156.14,156.14,0,0,0,15.64,40Z" />
    </g>
  </svg>
`;

const toDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const defaultLogoVariants = {
  dark: toDataUri(DEFAULT_LOGO_SVG_DARK),
  light: toDataUri(DEFAULT_LOGO_SVG_LIGHT),
};

const resolveLogoVariants = () => {
  if (typeof window === 'undefined') {
    return defaultLogoVariants;
  }

  const explicitVariants =
    typeof window.VIKS_LOGO_VARIANTS === 'object' && window.VIKS_LOGO_VARIANTS !== null
      ? window.VIKS_LOGO_VARIANTS
      : null;

  if (explicitVariants) {
    const variants = { ...defaultLogoVariants };
    const darkVariant =
      typeof explicitVariants.dark === 'string' && explicitVariants.dark.trim().length > 0
        ? explicitVariants.dark.trim()
        : '';
    const lightVariant =
      typeof explicitVariants.light === 'string' && explicitVariants.light.trim().length > 0
        ? explicitVariants.light.trim()
        : '';

    if (darkVariant) {
      variants.dark = darkVariant;
    }
    if (lightVariant) {
      variants.light = lightVariant;
    }

    if (!darkVariant && lightVariant) {
      variants.dark = lightVariant;
    }
    if (!lightVariant && darkVariant) {
      variants.light = darkVariant;
    }

    return variants;
  }

  const inlineSvg =
    typeof window.VIKS_LOGO_INLINE_SVG === 'string' ? window.VIKS_LOGO_INLINE_SVG.trim() : '';
  const inlineSvgDataUri = inlineSvg ? toDataUri(inlineSvg) : '';

  const customLogo =
    typeof window.VIKS_LOGO_DATA_URI === 'string' ? window.VIKS_LOGO_DATA_URI.trim() : '';

  const singleLogo = inlineSvgDataUri || customLogo;
  if (singleLogo) {
    return { dark: singleLogo, light: singleLogo };
  }

  return defaultLogoVariants;
};

const logoVariants = resolveLogoVariants();

const themeToggleButtons = Array.from(document.querySelectorAll('[data-theme-toggle]'));
const THEME_STORAGE_KEY = 'viks-theme';

const getStoredTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : '';
  } catch (error) {
    return '';
  }
};

const setStoredTheme = (theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    /* no-op */
  }
};

const getSystemTheme = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const updateLogoSources = (theme) => {
  const nextLogo = logoVariants[theme] || logoVariants.dark || defaultLogoVariants.dark;

  logoImages.forEach((img) => {
    if (!img) return;
    if (img.getAttribute('src') !== nextLogo) {
      img.setAttribute('src', nextLogo);
    }
  });
};

const updateThemeToggles = (theme) => {
  themeToggleButtons.forEach((button) => {
    button.setAttribute('data-theme-toggle-state', theme);
    button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');

    const label = button.querySelector('[data-theme-toggle-label]');
    const nextLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    button.setAttribute('aria-label', nextLabel);
    button.setAttribute('title', nextLabel);
    if (label) {
      label.textContent = nextLabel;
    }
  });
};

let hasExplicitThemePreference = false;

const applyTheme = (theme, { persist } = { persist: false }) => {
  const normalizedTheme = theme === 'light' ? 'light' : 'dark';

  document.documentElement.dataset.theme = normalizedTheme;
  if (document.body) {
    document.body.dataset.theme = normalizedTheme;
  }

  updateLogoSources(normalizedTheme);
  updateThemeToggles(normalizedTheme);

  if (persist) {
    setStoredTheme(normalizedTheme);
    hasExplicitThemePreference = true;
  }
};

const initializeTheme = () => {
  const storedTheme = getStoredTheme();
  const hasStoredTheme = storedTheme.length > 0;
  hasExplicitThemePreference = hasStoredTheme;

  const documentTheme = document.documentElement.dataset.theme;
  const normalizedDocumentTheme = documentTheme === 'light' || documentTheme === 'dark' ? documentTheme : '';
  const startingTheme = normalizedDocumentTheme || storedTheme || getSystemTheme();

  applyTheme(startingTheme);

  if (!hasStoredTheme && typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handlePreferenceChange = (event) => {
      if (hasExplicitThemePreference) {
        return;
      }

      applyTheme(event.matches ? 'light' : 'dark');
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handlePreferenceChange);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handlePreferenceChange);
    }
  }
};

initializeTheme();

themeToggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme, { persist: true });
  });
});

const ensurePageStripe = () => {
  if (document.querySelector('.page-stripe')) {
    return;
  }
  
  const stripe = document.createElement('div');
  stripe.className = 'page-stripe';
  stripe.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(stripe, document.body.firstChild);
};

document.addEventListener('DOMContentLoaded', ensurePageStripe);

const hideLoader = () => {
  if (!loader) return;
  loader.setAttribute('hidden', '');
};

resetControls();

window.addEventListener('load', () => {
  setTimeout(hideLoader, 800);
});

if (year) {
  year.textContent = new Date().getFullYear();
}

let activeMediaElement = null;
let activeController = null;
let detachControlsUpdate = null;
let youTubeApiPromise = null;
let isScrubbing = false;

const resetControls = () => {
  if (!playerControls) return;

  playerControls.setAttribute('hidden', '');
  playerControls.dataset.playing = 'false';
  playerControls.dataset.muted = 'false';

  if (seekInput) {
    seekInput.value = '0';
    seekInput.max = '0';
    seekInput.disabled = true;
    seekInput.style.setProperty('--player-progress-percent', '0%');
  }

  if (playToggle) {
    playToggle.setAttribute('aria-pressed', 'false');
    playToggle.setAttribute('aria-label', 'Play video');
    playToggle.setAttribute('title', 'Play video');
  }

  if (muteToggle) {
    muteToggle.setAttribute('aria-pressed', 'false');
    muteToggle.setAttribute('aria-label', 'Mute video');
    muteToggle.setAttribute('title', 'Mute video');
  }

  if (currentTimeLabel) {
    currentTimeLabel.textContent = '0:00';
  }

  if (totalTimeLabel) {
    totalTimeLabel.textContent = '0:00';
  }
};

const teardownMediaElement = () => {
  if (detachControlsUpdate) {
    detachControlsUpdate();
    detachControlsUpdate = null;
  }

  if (activeController && typeof activeController.destroy === 'function') {
    activeController.destroy();
  }

  activeController = null;

  if (!playerEmbed || !activeMediaElement) {
    return;
  }

  if (activeMediaElement.tagName === 'VIDEO') {
    activeMediaElement.pause();
    activeMediaElement.removeAttribute('src');
    activeMediaElement.load();
  }

  activeMediaElement.remove();
  activeMediaElement = null;
};

const formatTime = (timeInSeconds) => {
  if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) {
    return '0:00';
  }

  const totalSeconds = Math.floor(timeInSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const updateSeekTrack = (current, duration) => {
  if (!seekInput) return;

  if (!Number.isFinite(duration) || duration <= 0) {
    seekInput.max = '0';
    if (!isScrubbing) {
      seekInput.value = '0';
    }
    seekInput.disabled = true;
    seekInput.style.setProperty('--player-progress-percent', '0%');
    return;
  }

  const clamped = Math.min(Math.max(current, 0), duration);
  seekInput.max = duration.toString();
  seekInput.disabled = false;

  if (!isScrubbing) {
    seekInput.value = clamped.toString();
  }

  const percent = duration > 0 ? (clamped / duration) * 100 : 0;
  seekInput.style.setProperty('--player-progress-percent', `${percent}%`);
};

const ensureControlsVisible = () => {
  if (!playerControls) return;
  playerControls.removeAttribute('hidden');
};

const readSeekValue = () => {
  if (!seekInput) return NaN;
  const numericValue = seekInput.valueAsNumber;
  if (!Number.isNaN(numericValue)) {
    return numericValue;
  }

  const parsed = Number(seekInput.value);
  return Number.isNaN(parsed) ? NaN : parsed;
};

const bindControllerUpdates = (controller) => {
  if (!controller || !playerControls) return;

  ensureControlsVisible();

  detachControlsUpdate = controller.onUpdate((current, duration, isPlaying, isMuted) => {
    playerControls.dataset.playing = isPlaying ? 'true' : 'false';
    playerControls.dataset.muted = isMuted ? 'true' : 'false';

    if (playToggle) {
      const label = isPlaying ? 'Pause video' : 'Play video';
      playToggle.setAttribute('aria-label', label);
      playToggle.setAttribute('title', label);
      playToggle.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
    }

    if (muteToggle) {
      const label = isMuted ? 'Unmute video' : 'Mute video';
      muteToggle.setAttribute('aria-label', label);
      muteToggle.setAttribute('title', label);
      muteToggle.setAttribute('aria-pressed', isMuted ? 'true' : 'false');
    }

    if (!isScrubbing && currentTimeLabel) {
      currentTimeLabel.textContent = formatTime(current);
    }

    if (totalTimeLabel) {
      totalTimeLabel.textContent = formatTime(duration);
    }

    updateSeekTrack(current, duration);
  });
};

const extractYouTubeId = (url) => {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace('/', '');
    }

    if (parsed.searchParams.has('v')) {
      return parsed.searchParams.get('v');
    }

    const pathParts = parsed.pathname.split('/');
    const embedIndex = pathParts.indexOf('embed');

    if (embedIndex !== -1 && pathParts.length > embedIndex + 1) {
      return pathParts[embedIndex + 1];
    }
  } catch (error) {
    return '';
  }

  return '';
};

const buildVideoElement = (src, poster = '') => {
  const video = document.createElement('video');
  video.className = 'player__video';
  video.controls = false;
  video.playsInline = true;
  video.preload = 'metadata';
  video.src = src;
  if (poster) {
    video.poster = poster;
  }

  video.addEventListener(
    'canplay',
    () => {
      video.play().catch(() => video.pause());
    },
    { once: true }
  );

  return video;
};

const createVideoController = (video) => {
  if (!video) return null;

  const listeners = new Set();

  const emit = () => {
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    const current = Number.isFinite(video.currentTime) ? video.currentTime : 0;
    const isPlaying = !video.paused && !video.ended;
    const isMuted = video.muted || video.volume === 0;

    listeners.forEach((listener) => listener(current, duration, isPlaying, isMuted));
  };

  const handleTimeUpdate = () => emit();
  const handleDurationChange = () => emit();
  const handlePlay = () => emit();
  const handlePause = () => emit();
  const handleVolumeChange = () => emit();

  video.addEventListener('timeupdate', handleTimeUpdate);
  video.addEventListener('durationchange', handleDurationChange);
  video.addEventListener('loadedmetadata', handleDurationChange);
  video.addEventListener('play', handlePlay);
  video.addEventListener('playing', handlePlay);
  video.addEventListener('pause', handlePause);
  video.addEventListener('volumechange', handleVolumeChange);

  return {
    type: 'video',
    play: () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          /* no-op */
        });
      }
    },
    pause: () => {
      video.pause();
    },
    togglePlay: () => {
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            /* no-op */
          });
        }
      } else {
        video.pause();
      }
    },
    isPaused: () => video.paused,
    mute: (value = true) => {
      video.muted = Boolean(value);
    },
    unmute: () => {
      video.muted = false;
    },
    isMuted: () => video.muted || video.volume === 0,
    seek: (time) => {
      if (!Number.isFinite(time)) return;

      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const clamped = duration > 0 ? Math.min(Math.max(time, 0), duration) : Math.max(time, 0);
      video.currentTime = clamped;
    },
    getCurrentTime: () => (Number.isFinite(video.currentTime) ? video.currentTime : 0),
    getDuration: () => (Number.isFinite(video.duration) ? video.duration : 0),
    onUpdate: (callback) => {
      if (typeof callback !== 'function') {
        return () => {};
      }

      listeners.add(callback);
      callback(
        Number.isFinite(video.currentTime) ? video.currentTime : 0,
        Number.isFinite(video.duration) ? video.duration : 0,
        !video.paused && !video.ended,
        video.muted || video.volume === 0
      );

      return () => {
        listeners.delete(callback);
      };
    },
    destroy: () => {
      video.pause();
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('loadedmetadata', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('playing', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
      listeners.clear();
    },
  };
};

const loadYouTubeApi = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('YouTube API unavailable'));
  }

  if (window.YT && typeof window.YT.Player === 'function') {
    return Promise.resolve(window.YT);
  }

  if (youTubeApiPromise) {
    return youTubeApiPromise;
  }

  youTubeApiPromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousCallback === 'function') {
        previousCallback();
      }
      resolve(window.YT);
    };

    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existingScript) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.head.appendChild(tag);
    }
  });

  return youTubeApiPromise;
};

const createYouTubeController = (playerInstance) => {
  if (!playerInstance) return null;

  const listeners = new Set();
  let updateInterval = null;

  const getPlayerState = () => {
    if (window.YT && window.YT.PlayerState) {
      return playerInstance.getPlayerState();
    }

    return -1;
  };

  const isCurrentlyPlaying = () => {
    if (window.YT && window.YT.PlayerState) {
      return getPlayerState() === window.YT.PlayerState.PLAYING;
    }

    return false;
  };

  const isCurrentlyMuted = () => (playerInstance.isMuted ? playerInstance.isMuted() : false);

  const emit = () => {
    const duration = playerInstance.getDuration ? playerInstance.getDuration() : 0;
    const current = playerInstance.getCurrentTime ? playerInstance.getCurrentTime() : 0;
    listeners.forEach((listener) => listener(current, duration, isCurrentlyPlaying(), isCurrentlyMuted()));
  };

  const startUpdates = () => {
    if (updateInterval) return;
    updateInterval = window.setInterval(emit, 250);
  };

  const stopUpdates = () => {
    if (!updateInterval) return;
    window.clearInterval(updateInterval);
    updateInterval = null;
  };

  const handleStateChange = () => {
    emit();

    const state = getPlayerState();
    if (window.YT && window.YT.PlayerState && state === window.YT.PlayerState.PLAYING) {
      startUpdates();
    } else if (window.YT && window.YT.PlayerState && state === window.YT.PlayerState.ENDED) {
      stopUpdates();
    }
  };

  playerInstance.addEventListener('onStateChange', handleStateChange);
  playerInstance.addEventListener('onPlaybackQualityChange', emit);
  playerInstance.addEventListener('onPlaybackRateChange', emit);

  const controller = {
    type: 'youtube',
    play: () => {
      playerInstance.playVideo();
    },
    pause: () => {
      playerInstance.pauseVideo();
    },
    togglePlay: () => {
      const state = getPlayerState();
      if (window.YT && window.YT.PlayerState && state === window.YT.PlayerState.PLAYING) {
        playerInstance.pauseVideo();
      } else {
        playerInstance.playVideo();
      }
    },
    isPaused: () => !isCurrentlyPlaying(),
    mute: () => {
      playerInstance.mute();
    },
    unmute: () => {
      playerInstance.unMute();
    },
    isMuted: () => isCurrentlyMuted(),
    seek: (time) => {
      if (!Number.isFinite(time)) return;
      playerInstance.seekTo(Math.max(time, 0), true);
      emit();
    },
    getCurrentTime: () => (playerInstance.getCurrentTime ? playerInstance.getCurrentTime() : 0),
    getDuration: () => (playerInstance.getDuration ? playerInstance.getDuration() : 0),
    onUpdate: (callback) => {
      if (typeof callback !== 'function') {
        return () => {};
      }

      listeners.add(callback);
      callback(
        playerInstance.getCurrentTime ? playerInstance.getCurrentTime() : 0,
        playerInstance.getDuration ? playerInstance.getDuration() : 0,
        isCurrentlyPlaying(),
        isCurrentlyMuted()
      );
      startUpdates();

      return () => {
        listeners.delete(callback);
        if (!listeners.size) {
          stopUpdates();
        }
      };
    },
    destroy: () => {
      stopUpdates();
      try {
        playerInstance.stopVideo();
      } catch (error) {
        /* no-op */
      }
      playerInstance.removeEventListener('onStateChange', handleStateChange);
      playerInstance.removeEventListener('onPlaybackQualityChange', emit);
      playerInstance.removeEventListener('onPlaybackRateChange', emit);
      playerInstance.destroy();
      listeners.clear();
    },
  };

  emit();
  startUpdates();

  return controller;
};

const buildYouTubePlayer = async (videoId, title = '') => {
  if (!videoId || !playerEmbed) return null;

  const wrapper = document.createElement('div');
  wrapper.className = 'player__youtube';
  const placeholder = document.createElement('div');
  const frameId = `youtube-${videoId}-${Date.now()}`;
  placeholder.id = frameId;
  placeholder.setAttribute('title', title ? `${title} — YouTube` : 'YouTube video player');
  wrapper.appendChild(placeholder);
  playerEmbed.appendChild(wrapper);

  try {
    const YT = await loadYouTubeApi();

    return await new Promise((resolve) => {
      let settled = false;
      const finalize = (payload) => {
        if (settled) return;
        settled = true;
        resolve(payload);
      };

      let playerInstance = null;

      const config = {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event) => {
            const controller = createYouTubeController(event.target);
            const iframe = event.target.getIframe ? event.target.getIframe() : null;
            if (iframe) {
              iframe.setAttribute('title', title ? `${title} — YouTube` : 'Video player');
              iframe.setAttribute('tabindex', '-1');
            }
            event.target.playVideo();
            finalize({ element: wrapper, controller });
          },
          onError: () => {
            if (playerInstance && typeof playerInstance.destroy === 'function') {
              playerInstance.destroy();
            }
            wrapper.remove();
            finalize(null);
          },
        },
      };

      playerInstance = new YT.Player(frameId, config);
    });
  } catch (error) {
    wrapper.remove();
    return null;
  }
};

const createMediaElement = async (src, poster, title) => {
  if (!src) return null;

  if (/youtu\.be|youtube\.com/i.test(src)) {
    const videoId = extractYouTubeId(src);
    if (!videoId) return null;
    return buildYouTubePlayer(videoId, title);
  }

  const video = buildVideoElement(src, poster);
  const controller = createVideoController(video);
  return { element: video, controller };
};

const openPlayer = async (item) => {
  if (!player || !playerEmbed || !playerOverlay) return;

  const src = item.getAttribute('data-video-src');
  const poster = item.getAttribute('data-video-poster');
  const client = item.getAttribute('data-client');
  const title = item.getAttribute('data-title');

  teardownMediaElement();
  resetControls();

  const descriptor = await createMediaElement(src, poster, title);
  if (!descriptor || !descriptor.element || !descriptor.controller) {
    return;
  }

  activeMediaElement = descriptor.element;
  activeController = descriptor.controller;

  if (activeMediaElement && !activeMediaElement.parentElement) {
    playerEmbed.appendChild(activeMediaElement);
  }

  bindControllerUpdates(activeController);

  if (typeof activeController.play === 'function') {
    activeController.play();
  }

  if (playerClientLabel) {
    playerClientLabel.textContent = client || '';
  }
  if (playerTitleLabel) {
    playerTitleLabel.textContent = title || '';
  }

  player.setAttribute('aria-hidden', 'false');
  playerOverlay.hidden = false;
  document.body.classList.add('no-scroll');
};

const closePlayer = () => {
  if (!player || !playerOverlay) return;

  player.setAttribute('aria-hidden', 'true');
  playerOverlay.hidden = true;
  teardownMediaElement();
  resetControls();
  isScrubbing = false;
  document.body.classList.remove('no-scroll');
};

playerOverlay?.addEventListener('click', closePlayer);
closeButton?.addEventListener('click', closePlayer);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && player?.getAttribute('aria-hidden') === 'false') {
    closePlayer();
  }
});

const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));

portfolioItems.forEach((item) => {
  item.addEventListener('click', () => openPlayer(item));
  item.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPlayer(item);
    }
  });
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
});

const togglePlayback = () => {
  if (!activeController) return;

  const isPaused = typeof activeController.isPaused === 'function' ? activeController.isPaused() : true;
  if (isPaused) {
    if (typeof activeController.play === 'function') {
      activeController.play();
    }
  } else if (typeof activeController.pause === 'function') {
    activeController.pause();
  }
};

const toggleMute = () => {
  if (!activeController) return;

  const isMuted = typeof activeController.isMuted === 'function' ? activeController.isMuted() : false;
  if (isMuted) {
    if (typeof activeController.unmute === 'function') {
      activeController.unmute();
    } else if (typeof activeController.mute === 'function') {
      activeController.mute(false);
    }
  } else if (typeof activeController.mute === 'function') {
    activeController.mute();
  }
};

const commitSeek = () => {
  if (!seekInput || !activeController || typeof activeController.seek !== 'function') {
    return;
  }

  const value = readSeekValue();
  if (Number.isFinite(value)) {
    activeController.seek(value);
  }
};

playToggle?.addEventListener('click', (event) => {
  event.preventDefault();
  togglePlayback();
});

muteToggle?.addEventListener('click', (event) => {
  event.preventDefault();
  toggleMute();
});

if (seekInput) {
  const handleScrubStart = () => {
    isScrubbing = true;
  };

  const handleScrubEnd = () => {
    const value = readSeekValue();
    isScrubbing = false;
    if (Number.isFinite(value)) {
      commitSeek();
    }
  };

  seekInput.addEventListener('input', () => {
    if (isScrubbing && currentTimeLabel) {
      const value = readSeekValue();
      if (Number.isFinite(value)) {
        currentTimeLabel.textContent = formatTime(value);
      }
    }

    if (!isScrubbing) {
      commitSeek();
    }

    const duration = Number(seekInput.max);
    const value = readSeekValue();
    if (Number.isFinite(duration) && duration > 0 && Number.isFinite(value)) {
      const percent = Math.min(Math.max((value / duration) * 100, 0), 100);
      seekInput.style.setProperty('--player-progress-percent', `${percent}%`);
    }
  });

  seekInput.addEventListener('change', () => {
    if (!isScrubbing) {
      commitSeek();
    }
  });

  const supportsPointerEvents = typeof window !== 'undefined' && 'PointerEvent' in window;

  if (supportsPointerEvents) {
    seekInput.addEventListener('pointerdown', handleScrubStart);
    seekInput.addEventListener('pointerup', handleScrubEnd);
    seekInput.addEventListener('pointercancel', () => {
      isScrubbing = false;
    });
  } else {
    seekInput.addEventListener('mousedown', handleScrubStart);
    seekInput.addEventListener('mouseup', handleScrubEnd);
    seekInput.addEventListener('mouseleave', () => {
      if (isScrubbing) {
        handleScrubEnd();
      }
    });
    seekInput.addEventListener(
      'touchstart',
      () => {
        isScrubbing = true;
      },
      { passive: true }
    );
    seekInput.addEventListener(
      'touchend',
      () => {
        handleScrubEnd();
      },
      { passive: true }
    );
    seekInput.addEventListener(
      'touchcancel',
      () => {
        isScrubbing = false;
      },
      { passive: true }
    );
  }

  seekInput.addEventListener('blur', () => {
    if (isScrubbing) {
      handleScrubEnd();
    }
  });
}

const navList = document.querySelector('.site-nav__links');
const navLinks = Array.from(document.querySelectorAll('.site-nav__link'));

const applyCurrentPageActive = () => {
  const currentPage = document.body?.dataset.page;
  if (!currentPage) return;

  let matched = false;

  navLinks.forEach((link) => {
    const navPage = link.dataset.navPage;
    if (navPage === currentPage) {
      link.classList.add('site-nav__link--active');
      link.setAttribute('aria-current', 'page');
      matched = true;
    } else {
      link.classList.remove('site-nav__link--active');
      link.removeAttribute('aria-current');
    }
  });

  if (!matched) {
    const hasActive = navLinks.some((link) => link.classList.contains('site-nav__link--active'));
    if (!hasActive && navLinks[0]) {
      navLinks[0].classList.add('site-nav__link--active');
      navLinks[0].setAttribute('aria-current', 'page');
    }
  }
};

applyCurrentPageActive();

if (navList && navLinks.length) {
  const indicator = document.createElement('span');
  indicator.className = 'site-nav__indicator';
  navList.appendChild(indicator);
  navList.classList.add('site-nav__links--liquid');

  const getActiveLink = () =>
    navLinks.find((link) => link.classList.contains('site-nav__link--active')) || navLinks[0];

  const INDICATOR_VERTICAL_PADDING = 12;

  const setIndicatorPosition = (target) => {
    if (!target) return;

    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = target;

    indicator.style.width = `${offsetWidth}px`;
    indicator.style.height = `${offsetHeight + INDICATOR_VERTICAL_PADDING}px`;
    indicator.style.setProperty('--indicator-x', `${offsetLeft}px`);
    indicator.style.setProperty(
      '--indicator-y',
      `${offsetTop - INDICATOR_VERTICAL_PADDING / 2}px`
    );

    if (!indicator.classList.contains('is-visible')) {
      requestAnimationFrame(() => indicator.classList.add('is-visible'));
    }
  };

  const resetToActive = () => {
    applyCurrentPageActive();
    const active = getActiveLink();
    if (active) {
      setIndicatorPosition(active);
    }
  };

  requestAnimationFrame(resetToActive);

  const markHover = (link) => {
    navLinks.forEach((item) => item.classList.remove('site-nav__link--hover'));
    link.classList.add('site-nav__link--hover');
  };

  const clearHover = () => {
    navLinks.forEach((item) => item.classList.remove('site-nav__link--hover'));
  };

  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      setIndicatorPosition(link);
      markHover(link);
    });
    link.addEventListener('focus', () => {
      setIndicatorPosition(link);
      markHover(link);
    });
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href') || '';
      const isStatic = link.hasAttribute('data-nav-static') || href === '#';

      if (isStatic) {
        event.preventDefault();
        navLinks.forEach((item) => {
          item.classList.remove('site-nav__link--active');
          item.removeAttribute('aria-current');
        });
        link.classList.add('site-nav__link--active');
        link.setAttribute('aria-current', 'page');
        setIndicatorPosition(link);
        markHover(link);
        return;
      }

      const isHashLink = href.startsWith('#');
      if (
        !isHashLink &&
        !event.defaultPrevented &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey
      ) {
        window.location.assign(link.href);
      }
    });
  });

  navList.addEventListener('mouseleave', () => {
    clearHover();
    resetToActive();
  });
  navList.addEventListener('focusout', (event) => {
    if (!navList.contains(event.relatedTarget)) {
      clearHover();
      resetToActive();
    }
  });

  window.addEventListener('resize', () => {
    requestAnimationFrame(resetToActive);
  });

  window.addEventListener('load', () => {
    requestAnimationFrame(resetToActive);
  });
}

const contactForm = document.querySelector('[data-contact-form]');

if (contactForm) {
  const statusEl = contactForm.querySelector('[data-form-status]');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const submitIdleLabel = submitButton?.textContent?.trim() || '';
  const TELEGRAM_BOT_TOKEN_FALLBACK = '8128978509:AAEi6gjKMUgMAngsZga_GxLucXfORrFB2pg';

  const getTelegramConfig = () => {
    const botToken =
      (typeof window !== 'undefined' && typeof window.VIKS_TELEGRAM_BOT_TOKEN === 'string'
        ? window.VIKS_TELEGRAM_BOT_TOKEN.trim()
        : '') || TELEGRAM_BOT_TOKEN_FALLBACK;

    const chatId =
      typeof window !== 'undefined' && typeof window.VIKS_TELEGRAM_CHAT_ID === 'string'
        ? window.VIKS_TELEGRAM_CHAT_ID.trim()
        : '';

    return {
      botToken,
      chatId,
      endpoint: botToken ? `https://api.telegram.org/bot${botToken}/sendMessage` : '',
    };
  };

  const setStatus = (message = '', state = '') => {
    if (!statusEl) return;
    statusEl.textContent = message;
    if (state) {
      statusEl.dataset.state = state;
    } else {
      statusEl.removeAttribute('data-state');
    }
  };

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
    }

    setStatus();

    const { chatId, endpoint } = getTelegramConfig();

    if (!chatId || !endpoint) {
      setStatus(
        'Telegram chat ID is not configured. Update contact-config.js with your bot recipient.',
        'error'
      );
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitIdleLabel || 'Submit';
      }
      return;
    }

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());
    payload.sms_consent = formData.has('sms_consent');

    const normalize = (value) => {
      if (typeof value !== 'string') return '';
      return value.trim();
    };

    const messageLines = [
      'New Website Submission',
      '',
      `First Name: ${normalize(payload.firstName) || '—'}`,
      `Last Name: ${normalize(payload.lastName) || '—'}`,
      `Email: ${normalize(payload.companyEmail) || '—'}`,
      `Phone: ${normalize(payload.phoneNumber) || '—'}`,
      '',
      `Message: ${normalize(payload.message) || '—'}`,
    ];

    const requestBody = {
      chat_id: chatId,
      text: messageLines.join('\n'),
      disable_web_page_preview: true,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      let result;

      try {
        result = await response.json();
      } catch (error) {
        throw new Error('Telegram response error. Please try again later.');
      }

      if (response.ok && result?.ok) {
        setStatus('Message sent successfully!', 'success');
        contactForm.reset();
      } else {
        const description = result?.description || `Telegram error (${response.status}).`;
        throw new Error(description);
      }
    } catch (error) {
      let message = 'An unknown error occurred while sending. Please try again.';

      if (error instanceof Error) {
        message = error.message;
        const lowered = message.toLowerCase();
        if (lowered.includes('failed to fetch') || lowered.includes('networkerror')) {
          message = 'Network error. Could not contact server.';
        } else if (lowered.includes("bots can't send messages to bots")) {
          message =
            'Telegram rejected the request because the chat ID points to a bot account. Replace it with the ID of a user, group, or channel that has started a conversation with your bot.';
        }
      }

      setStatus(message, 'error');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitIdleLabel || 'Submit';
      }
    }
  });
}
