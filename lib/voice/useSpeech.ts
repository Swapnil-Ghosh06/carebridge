'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Locale } from '@/lib/i18n';

// Type definitions for Web Speech API
interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      isFinal: boolean;
    };
    length: number;
  };
}

interface SpeechRecognitionErrorEventLike {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: () => void;
  onend: () => void;
  onresult: (event: SpeechRecognitionEventLike) => void;
  onerror: (event: SpeechRecognitionErrorEventLike) => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

export interface UseSpeechOptions {
  locale?: Locale;
  onFinalTranscript?: (transcript: string) => void;
}

export function useSpeech({ locale = 'en', onFinalTranscript }: UseSpeechOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Map app locale to BCP 47 language code for Web Speech API
  const getLanguageTag = useCallback((loc: Locale): string => {
    switch (loc) {
      case 'hi':
        return 'hi-IN';
      case 'kn':
        return 'kn-IN';
      case 'en':
      default:
        return 'en-IN';
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Stop automatically after single command
      recognition.interimResults = true;
      recognition.lang = getLanguageTag(locale);

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        setInterimTranscript('');
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let currentInterim = '';
        let finalChunk = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalChunk += item[0].transcript;
          } else {
            currentInterim += item[0].transcript;
          }
        }

        if (currentInterim) {
          setInterimTranscript(currentInterim);
        }

        if (finalChunk) {
          setTranscript(finalChunk);
          setInterimTranscript('');
          if (onFinalTranscript) {
            onFinalTranscript(finalChunk);
          }
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        // 'no-speech' is a soft event when user doesn't speak
        if (event.error !== 'no-speech') {
          setError(event.error || 'Speech recognition error');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [locale, getLanguageTag, onFinalTranscript]);

  const startListening = useCallback(
    (customLocale?: Locale) => {
      if (!recognitionRef.current) return;
      setError(null);
      setTranscript('');
      setInterimTranscript('');

      try {
        if (customLocale) {
          recognitionRef.current.lang = getLanguageTag(customLocale);
        } else {
          recognitionRef.current.lang = getLanguageTag(locale);
        }
        recognitionRef.current.start();
      } catch (err) {
        // Recognition might already be running
        console.warn('Speech recognition start warning:', err);
      }
    },
    [getLanguageTag, locale]
  );

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch {
      // ignore
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
}
