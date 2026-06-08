"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ko: {
    "회사 소개": "회사 소개",
    "회사 개요": "회사 개요",
    "CI": "CI",
    "Family Companies": "Family Companies",
    "물류 서비스": "물류 서비스",
    "국제 물류 서비스": "국제 물류 서비스",
    "물류 인프라": "물류 인프라",
    "물류 장비 개발 및 제작": "물류 장비 개발 및 제작",
    "물류 전문 포장": "물류 전문 포장",
    "글로벌 무역": "글로벌 무역",
    "사업소개": "사업소개",
    "수출입 업무 대행": "수출입 업무 대행",
    "브랜드 소개": "브랜드 소개",
    "문의하기": "문의하기",
    "물류 문의": "물류 문의",
    "무역 문의": "무역 문의",
    "한국어": "한국어",
    "English": "English",
  },
  en: {
    "회사 소개": "About Us",
    "회사 개요": "Overview",
    "CI": "CI",
    "Family Companies": "Family Companies",
    "물류 서비스": "Logistics",
    "국제 물류 서비스": "International Logistics",
    "물류 인프라": "Infrastructure",
    "물류 장비 개발 및 제작": "Equipment Development",
    "물류 전문 포장": "Specialized Packaging",
    "글로벌 무역": "Trade",
    "사업소개": "Business Introduction",
    "수출입 업무 대행": "Import/Export Agency",
    "브랜드 소개": "Brand Introduction",
    "문의하기": "Contact",
    "물류 문의": "Logistics Inquiry",
    "무역 문의": "Trade Inquiry",
    "한국어": "한국어",
    "English": "English",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ko");

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("bora_lang", lang);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check if language preference is saved in localStorage
    const savedLang = localStorage.getItem("bora_lang") as Language | null;
    if (savedLang === "ko" || savedLang === "en") {
      setLanguageState(savedLang);
      return;
    }

    // 2. If not saved, detect location by IP with a 2-second timeout
    let resolved = false;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 2000);

    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timeoutId);
        if (!resolved && data && data.country_code) {
          resolved = true;
          const detectedLang: Language = data.country_code === "KR" ? "ko" : "en";
          setLanguageState(detectedLang);
          localStorage.setItem("bora_lang", detectedLang);
          console.log(`Detected country: ${data.country_code}, set language to: ${detectedLang}`);
        }
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        // Fallback to browser language if fetch is aborted or fails
        if (!resolved) {
          resolved = true;
          const browserLang = navigator.language || (navigator as any).userLanguage || "en";
          const fallbackLang: Language = browserLang.toLowerCase().startsWith("ko") ? "ko" : "en";
          setLanguageState(fallbackLang);
          localStorage.setItem("bora_lang", fallbackLang);
          console.log(`IP detection failed (${err.name}), fallback to browser language: ${browserLang} -> ${fallbackLang}`);
        }
      });
  }, []);

  const t = (key: string) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
