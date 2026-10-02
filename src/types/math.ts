export type TopicId = 'decimals' | 'percentages' | 'geometry' | 'motion';

export type DifficultyLevel = 'seed' | 'rocket' | 'diamond';

export interface Quest {
  id: string;
  topicId: TopicId;
  topicName: string;
  title: string;
  level: DifficultyLevel; // seed (Cơ bản), rocket (Vận dụng thực tế), diamond (Thử thách tư duy)
  scenario: string; // Tình huống thực tế (mua sắm, trường học, du lịch, kiến trúc)
  question: string;
  questionType: 'multiple_choice' | 'numeric_input';
  options?: { id: string; text: string; isCorrect: boolean }[];
  correctNumericValue?: number;
  unit?: string;
  tolerance?: number; // Cho phép sai số nhỏ nếu có làm tròn
  hint: string; // Gợi ý tư duy khi học sinh băn khoăn
  explanation: {
    coreConcept: string; // Bản chất kiến thức
    stepByStep: string[]; // Các bước suy luận rõ ràng
    formulaUsed?: string; // Công thức sử dụng
    realWorldConnection: string; // Ý nghĩa trong cuộc sống
  };
  rewardStars: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  topicId?: TopicId;
}

export interface UserProgress {
  stars: number;
  completedQuestIds: string[];
  solvedReflectionIds: string[];
  unlockedBadgeIds: string[];
  currentIsland: TopicId;
}

export interface ReflectionTopic {
  id: string;
  topicId: TopicId;
  question: string;
  misconception: string; // Quan niệm sai lầm phổ biến
  truth: string; // Sự thật toán học
  interactiveExperiment: {
    type: 'comparison' | 'slider_test' | 'toggle_proof';
    title: string;
    description: string;
  };
  whyItMatters: string; // Ý nghĩa bản chất
}

export interface FormulaItem {
  id: string;
  topicId: TopicId;
  name: string;
  formula: string;
  meaning: string;
  interactiveType: 'triangle' | 'trapezoid' | 'circle' | 'percentage' | 'speed' | 'volume';
  example: string;
}
