import React, { createContext, useContext, useState } from "react";

type QuizItem = { name: string; image: string; audio: string };

type QuizContextType = {
  quizList: QuizItem[];
  setQuizList: (data: QuizItem[]) => void;
  resetQuiz: () => void;
};

const QuizContext = createContext<QuizContextType>({
  quizList: [],
  setQuizList: () => {},
  resetQuiz: () => {},
});

export const QuizProvider = ({ children }: any) => {
  const [quizList, setQuizList] = useState<QuizItem[]>([]);

  const resetQuiz = () => setQuizList([]);

  return (
    <QuizContext.Provider value={{ quizList, setQuizList, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizData = () => useContext(QuizContext);
