import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Toast from './components/common/Toast';
import { AppDataProvider } from './hooks/useAppData';
import { ToastProvider } from './hooks/useToast';
import Achievements from './pages/Achievements';
import ChallengeDetail from './pages/ChallengeDetail';
import Challenges from './pages/Challenges';
import CodeLab from './pages/CodeLab';
import CourseDetail from './pages/CourseDetail';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Learn from './pages/Learn';
import Lesson from './pages/Lesson';
import NotFound from './pages/NotFound';
import ProjectEditor from './pages/ProjectEditor';
import Projects from './pages/Projects';
import QuizPlay from './pages/QuizPlay';
import Quizzes from './pages/Quizzes';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';
import './styles/index.css';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppDataProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:courseId" element={<CourseDetail />} />
              <Route path="/learn/:courseId/:lessonId" element={<Lesson />} />
              <Route path="/code-lab" element={<CodeLab />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/challenges/:challengeId" element={<ChallengeDetail />} />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/quizzes/:quizId" element={<QuizPlay />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectId" element={<ProjectEditor />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
          <Toast />
        </AppDataProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
