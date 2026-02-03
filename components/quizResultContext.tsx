import { createContext, useContext, useState } from "react";

export type ResultItem = {
  question: string;
  options: string[];
  correctAnswer: string;
  correctAudio: string;
  selectedAnswer: string;
  isCorrect: boolean;
};

type QuizResultContextType = {
  results: ResultItem[];
  addResult: (item: ResultItem) => void;
  resetResults: () => void;
};

const QuizResultContext = createContext<QuizResultContextType | null>(null);

export function QuizResultProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [results, setResults] = useState<ResultItem[]>([]);

  const addResult = (item: ResultItem) => {
    setResults(prev => [...prev, item]);
  };

  const resetResults = () => {
    setResults([]);
  };

  return (
    <QuizResultContext.Provider value={{ results, addResult, resetResults }}>
      {children}
    </QuizResultContext.Provider>
  );
}

export function useQuizResult() {
  const ctx = useContext(QuizResultContext);
  if (!ctx) {
    throw new Error("useQuizResult must be used inside QuizResultProvider");
  }
  return ctx;
}
