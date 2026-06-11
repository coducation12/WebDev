"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Printer, 
  User, 
  Building2, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  FileText,
  Building
} from "lucide-react";

const APPLE_EASE = [0.32, 0.72, 0, 1];
import { useLanguage } from "@/context/LanguageContext";
const ASSET = "/assets/images/active";

interface ContactPoint {
  title: { ko: string; en: string };
  subtitle?: { ko: string; en: string };
  tel: string;
  fax: string;
}

const contactPoints: Record<"logistics" | "trade", ContactPoint[]> = {
  logistics: [
    {
      title: { ko: "운영본부", en: "Operations Headquarters" },
      subtitle: { ko: "영업 및 견적", en: "Sales & Estimation" },
      tel: "061-795-8102",
      fax: "061-795-9954",
    },
    {
      title: { ko: "고객관리팀", en: "Customer Care Team" },
      subtitle: { ko: "CS 운영", en: "CS Operations" },
      tel: "061-795-9951",
      fax: "061-795-9954",
    },
    {
      title: { ko: "경영관리실", en: "Management Admin Office" },
      subtitle: { ko: "총무·회계", en: "General Affairs & Accounting" },
      tel: "061-795-9957",
      fax: "061-795-9954",
    },
    {
      title: { ko: "운송팀", en: "Transportation Team" },
      tel: "061-795-0255",
      fax: "061-791-0255",
    },
  ],
  trade: [
    {
      title: { ko: "마케팅 본부", en: "Marketing Headquarters" },
      subtitle: { ko: "신규 마케팅 기획 · 국제무역", en: "New Marketing Planning & Global Trade" },
      tel: "061-724-9954",
      fax: "061-725-9954",
    },
  ],
};

function ContactContent() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"logistics" | "trade">("logistics");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "trade") {
      setActiveTab("trade");
    } else {
      setActiveTab("logistics");
    }
  }, [searchParams]);

  const handleTabChange = (tab: "logistics" | "trade") => {
    setActiveTab(tab);
    window.history.pushState(null, "", `/contact?type=${tab}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.phone || !formData.email || !formData.message || !formData.agree) {
      alert(language === "ko" ? "필수 항목을 모두 채워주시고 개인정보 수집에 동의해주세요." : "Please fill in all required fields and agree to the privacy policy.");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        message: "",
        agree: false,
      });
    }, 1500);
  };

  return (
    <div className={`bg-white text-black font-sans min-h-screen flex flex-col ${activeTab === "trade" ? "selection:bg-[#FF6A00]" : "selection:bg-[#6A0DAD]"} selection:text-white`}>
      <Header />

      {/* ─── Sticky Sub-Navigation Bar as Tab Switcher ─── */}
      <div className="sticky top-[64px] z-45 bg-white/95 backdrop-blur-xl border-b border-neutral-100 py-2.5 shadow-sm transition-all mt-[88px]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 flex justify-center overflow-x-auto scrollbar-none">
          <div className="flex gap-2 sm:gap-4 md:gap-6 whitespace-nowrap">
            {[
              { id: "logistics", label: language === "ko" ? "물류 서비스 문의" : "Logistics Inquiry" },
              { id: "trade", label: language === "ko" ? "글로벌 무역 문의" : "Trade Inquiry" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as "logistics" | "trade")}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all ${
                  activeTab === tab.id
                    ? tab.id === "trade"
                      ? "bg-[#FF6A00] text-white shadow-lg shadow-[#FF6A00]/15"
                      : "bg-[#6A0DAD] text-white shadow-lg shadow-[#6A0DAD]/15"
                    : "text-neutral-400 hover:text-neutral-800 hover:bg-neutral-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 py-20 px-6 md:px-10 max-w-[1400px] mx-auto w-full">
        {/* Title Block */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className={`font-black tracking-widest text-xs uppercase mb-3 block ${activeTab === "trade" ? "text-[#FF6A00]" : "text-[#6A0DAD]"}`}>Contact Point</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 mb-4">
            {activeTab === "logistics" 
              ? (language === "ko" ? "물류 서비스 문의" : "Logistics Inquiry")
              : (language === "ko" ? "글로벌 무역 문의" : "Trade Inquiry")}
          </h1>
          <p className="text-sm md:text-base text-neutral-500 font-semibold leading-relaxed">
            {language === "ko" ? (
              <>소중한 문의에 정성을 다해 답변드리겠습니다.<br />하단의 업무별 연락처를 확인하시거나 문의 양식을 작성해 전송해주시기 바랍니다.</>
            ) : (
              <>We will reply to your inquiries with care.<br />Please check the contact information by department below or fill out the inquiry form.</>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: BORA Contact Point Grid */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-neutral-950 mb-2 flex items-center gap-2.5">
                <span className={`w-2.5 h-6 rounded-full inline-block ${activeTab === "trade" ? "bg-[#FF6A00]" : "bg-[#6A0DAD]"}`} />
                {language === "ko" ? "업무별 연락처" : "Contact Info by Department"}
              </h2>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">Bora Contact Point</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactPoints[activeTab].map((dept, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5 hover:bg-white hover:border-neutral-200/60 hover:shadow-lg transition-all duration-300 group"
                >
                  <h4 className={`text-sm font-black text-neutral-900 transition-colors leading-tight ${activeTab === "trade" ? "group-hover:text-[#FF6A00]" : "group-hover:text-[#6A0DAD]"}`}>
                    {dept.title[language]}
                  </h4>
                  {dept.subtitle && (
                    <p className="text-[11px] font-bold text-neutral-400 mt-1.5 mb-0 leading-normal">
                      {dept.subtitle[language]}
                    </p>
                  )}
                  <div className={`space-y-1.5 text-xs text-neutral-500 font-semibold ${dept.subtitle ? "mt-4.5" : "mt-6"}`}>
                    <div className="flex items-center gap-2">
                      <Phone size={12} className={activeTab === "trade" ? "text-[#FFA05C]" : "text-[#BC90C1]"} />
                      <span>TEL. {dept.tel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Printer size={12} className={activeTab === "trade" ? "text-[#FFA05C]" : "text-[#BC90C1]"} />
                      <span>FAX. {dept.fax}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-6 bg-white border border-neutral-100 shadow-xl shadow-neutral-100/50 rounded-[40px] p-8 md:p-10 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 ${activeTab === "trade" ? "bg-[#FF6A00]" : "bg-[#6A0DAD]"}`} />
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: APPLE_EASE }}
                >
                  <div className="mb-8">
                    <h3 className="text-xl font-black text-neutral-900 mb-2">
                      {language === "ko" ? "문의하기" : "Inquiry"}
                    </h3>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${activeTab === "trade" ? "text-[#FF6A00]" : "text-[#6A0DAD]"}`}>
                      {language === "ko" ? "담당 부서: " : "Responsible Dept: "}
                      {activeTab === "logistics" 
                        ? (language === "ko" ? "물류사업부 / 종합물류팀" : "Logistics Division / Integrated Logistics Team")
                        : (language === "ko" ? "글로벌무역부 / 어센틱코리아" : "Global Trade Division / Authentic Korea")}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-700 block">
                        {language === "ko" ? "회사명" : "Company Name"} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder={language === "ko" ? "(주)대한상사" : "Daehan Trading Co., Ltd."}
                          className={`w-full bg-neutral-50 border border-neutral-100 rounded-xl py-3.5 pl-11 pr-4 text-sm font-semibold transition-all outline-none ${
                            activeTab === "trade" ? "focus:border-[#FF6A00]/30 focus:bg-white" : "focus:border-[#6A0DAD]/30 focus:bg-white"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-700 block">
                        {language === "ko" ? "성함 및 직책" : "Name & Position"} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={language === "ko" ? "홍길동 대리" : "John Doe (Manager)"}
                          className={`w-full bg-neutral-50 border border-neutral-100 rounded-xl py-3.5 pl-11 pr-4 text-sm font-semibold transition-all outline-none ${
                            activeTab === "trade" ? "focus:border-[#FF6A00]/30 focus:bg-white" : "focus:border-[#6A0DAD]/30 focus:bg-white"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-700 block">
                        {language === "ko" ? "연락처" : "Contact Number"} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="010-0000-0000"
                          className={`w-full bg-neutral-50 border border-neutral-100 rounded-xl py-3.5 pl-11 pr-4 text-sm font-semibold transition-all outline-none ${
                            activeTab === "trade" ? "focus:border-[#FF6A00]/30 focus:bg-white" : "focus:border-[#6A0DAD]/30 focus:bg-white"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-700 block">
                        {language === "ko" ? "이메일" : "Email"} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="example@boralogis.com"
                          className={`w-full bg-neutral-50 border border-neutral-100 rounded-xl py-3.5 pl-11 pr-4 text-sm font-semibold transition-all outline-none ${
                            activeTab === "trade" ? "focus:border-[#FF6A00]/30 focus:bg-white" : "focus:border-[#6A0DAD]/30 focus:bg-white"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-700 block">
                        {language === "ko" ? "문의내용" : "Message"} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-4 top-4 text-neutral-400" />
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={
                            activeTab === "logistics" 
                              ? (language === "ko" ? "보세보관, 포장, 셔틀운송 등 원하시는 물류 서비스를 기재해 주세요." : "Please describe the logistics services you want, such as bonded storage, packaging, shuttle transport, etc.") 
                              : (language === "ko" ? "수출입 자원 소싱, 대행업무 관련 상세 사항을 기재해 주세요." : "Please describe the details regarding import/export resource sourcing, agency operations, etc.")
                          }
                          className={`w-full bg-neutral-50 border border-neutral-100 rounded-xl py-3.5 pl-11 pr-4 text-sm font-semibold transition-all outline-none resize-none ${
                            activeTab === "trade" ? "focus:border-[#FF6A00]/30 focus:bg-white" : "focus:border-[#6A0DAD]/30 focus:bg-white"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Agreement Checkbox */}
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.agree}
                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                        className={`mt-1 w-4 h-4 rounded border-neutral-300 ${activeTab === "trade" ? "accent-[#FF6A00]" : "accent-[#6A0DAD]"}`}
                      />
                      <span className="text-xs text-neutral-500 font-semibold leading-relaxed">
                        {language === "ko" ? "개인정보 수집 및 이용에 동의합니다. (필수)" : "I agree to the collection and use of personal information. (Required)"}
                      </span>
                    </label>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 text-white rounded-2xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group ${
                        activeTab === "trade"
                          ? "bg-[#FF6A00] hover:bg-[#e05d00] shadow-[#FF6A00]/15"
                          : "bg-[#6A0DAD] hover:bg-[#520a8a] shadow-[#6A0DAD]/15"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{language === "ko" ? "접수 중..." : "Submitting..."}</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          <span>{language === "ko" ? "문의 보내기" : "Submit Inquiry"}</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: APPLE_EASE }}
                  className="py-16 text-center"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto shadow-sm ${activeTab === "trade" ? "bg-[#FFF5EF] text-[#FF6A00]" : "bg-[#F3E8FF] text-[#6A0DAD]"}`}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900 mb-3">
                    {language === "ko" ? "문의 접수 완료" : "Inquiry Submitted"}
                  </h3>
                  <p className="text-sm text-neutral-500 font-semibold leading-relaxed max-w-sm mx-auto mb-8">
                    {language === "ko" ? (
                      <>
                        소중한 문의가 성공적으로 접수되었습니다.<br />
                        기재해 주신 연락처/이메일을 통해 담당 부서에서 신속히 검토 후 영업일 기준 24시간 이내에 친절하게 답변드리겠습니다.
                      </>
                    ) : (
                      <>
                        Your inquiry has been successfully received.<br />
                        The responsible department will review it and reply within 24 business hours using the contact number/email provided.
                      </>
                    )}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className={`px-6 py-3 border rounded-xl text-xs font-bold transition-all ${
                      activeTab === "trade"
                        ? "border-[#FF6A00]/30 text-[#FF6A00] hover:bg-[#FFF5EF]"
                        : "border-[#6A0DAD]/30 text-[#6A0DAD] hover:bg-[#F3E8FF]"
                    }`}
                  >
                    {language === "ko" ? "새 문의 작성하기" : "Write New Inquiry"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white text-neutral-500 font-sans font-bold">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-neutral-200 border-t-[#6A0DAD] rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}

