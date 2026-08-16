'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
    icon: React.ReactNode;
  }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Saat membeli ikan di pasar, manakah ciri mata ikan yang PALING SEGAR?',
    options: [
      {
        text: 'Mata jernih, cembung menonjol, kornea transparan',
        isCorrect: true,
        explanation: 'Benar! Mata yang cembung menonjol dan jernih bening adalah indikator utama ikan baru saja ditangkap.',
        icon: (
          <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        ),
      },
      {
        text: 'Mata cekung ke dalam dan berwarna abu-abu buram',
        isCorrect: false,
        explanation: 'Mata cekung dan buram menandakan ikan sudah lama disimpan dan cairan mata sudah menyusut.',
        icon: (
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        ),
      },
      {
        text: 'Mata tertutup lendir tebal berwarna kuning',
        isCorrect: false,
        explanation: 'Lendir tebal kuning menandakan bakteri perusak sudah aktif berkembang pada mata ikan.',
        icon: (
          <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 2,
    question: 'Bagaimana cara cepat menguji elastisitas tekstur daging ikan?',
    options: [
      {
        text: 'Mengendus aroma perut ikan',
        isCorrect: false,
        explanation: 'Mengendus menguji aroma/bau amonia, bukan elastisitas daging.',
        icon: (
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591" />
          </svg>
        ),
      },
      {
        text: 'Tekan daging dengan jari 2 detik, lalu lepas',
        isCorrect: true,
        explanation: 'Tepat! Daging segar akan segera membal kembali ke bentuk semula secara elastis.',
        icon: (
          <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5" />
          </svg>
        ),
      },
      {
        text: 'Mencabut sisik punggung ikan',
        isCorrect: false,
        explanation: 'Mencabut sisik digunakan untuk memeriksa kekuatan penempelan sisik, bukan tekstur daging.',
        icon: (
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 3,
    question: 'Insang ikan segar yang aman dikonsumsi seharusnya berwarna apa?',
    options: [
      {
        text: 'Pucat keabu-abuan',
        isCorrect: false,
        explanation: 'Insang pucat keabu-abuan menandakan mioglobin darah sudah teroksidasi dan ikan sudah tidak segar.',
        icon: (
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        ),
      },
      {
        text: 'Merah cerah atau merah darah alami',
        isCorrect: true,
        explanation: 'Sangat Tepat! Insang merah cerah bebas lendir pekat menunjukkan suplai darah segar dan higienis.',
        icon: (
          <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        ),
      },
      {
        text: 'Cokelat tua kehitaman',
        isCorrect: false,
        explanation: 'Warna cokelat tua kehitaman adalah tanda dekomposisi tingkat lanjut.',
        icon: (
          <svg className="w-5 h-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        ),
      },
    ],
  },
];

export default function FishFreshnessQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const question = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (question.options[index].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 md:p-8 text-slate-900 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#162e52] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Latihan Visual Interaktif
          </span>
          <h3 className="text-xl font-extrabold text-[#162e52] mt-1.5">Uji Pemahaman Kesegaran Ikan</h3>
        </div>
        {!quizCompleted && (
          <div className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200">
            Soal {currentStep + 1} / {QUIZ_QUESTIONS.length}
          </div>
        )}
      </div>

      {/* Main Quiz Body */}
      <AnimatePresence mode="wait">
        {!quizCompleted ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mt-6 space-y-6"
          >
            <h4 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
              {question.question}
            </h4>

            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const showResults = selectedOption !== null;

                let cardStyle =
                  'bg-slate-50 border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50/50';
                if (showResults) {
                  if (opt.isCorrect) {
                    cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md';
                  } else if (isSelected && !opt.isCorrect) {
                    cardStyle = 'bg-rose-50 border-rose-500 text-rose-950';
                  } else {
                    cardStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-40';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={!showResults ? { scale: 1.01 } : {}}
                    whileTap={!showResults ? { scale: 0.99 } : {}}
                    onClick={() => handleSelectOption(idx)}
                    disabled={showResults}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 ${cardStyle}`}
                  >
                    <span className="p-2 rounded-xl bg-white shadow-sm flex-shrink-0 mt-0.5">{opt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm font-semibold leading-relaxed">{opt.text}</p>
                      {showResults && (isSelected || opt.isCorrect) && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className={`text-xs mt-2 font-normal leading-relaxed ${
                            opt.isCorrect ? 'text-emerald-800' : 'text-rose-800'
                          }`}
                        >
                          {opt.explanation}
                        </motion.p>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-[#162e52] hover:bg-[#1f4275] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <span>{currentStep < QUIZ_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Quiz'}</span>
                  <span>➔</span>
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 text-center py-8 space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h4 className="text-2xl font-black text-[#162e52]">Simulasi Quiz Selesai!</h4>
            <p className="text-slate-600 text-sm">
              Skor Anda: <strong className="text-emerald-700 font-extrabold text-lg">{score} dari {QUIZ_QUESTIONS.length}</strong> jawaban tepat.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-xs text-slate-700 leading-relaxed">
              {score === QUIZ_QUESTIONS.length
                ? 'Luar biasa! Anda sudah menguasai seluruh ciri fisik ikan segar dan siap berbelanja cerdas di pasar!'
                : 'Bagus! Coba ulangi kuis untuk mempertajam pemahaman inspeksi visual kesegaran ikan Anda.'}
            </div>

            <button
              onClick={handleResetQuiz}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-2 mt-4"
            >
              <span>Ulangi Quiz Pemahaman</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
