import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allLessons, courses } from '../../data/courses';
import { challenges } from '../../data/challenges';
import { quizzes } from '../../data/quizzes';
import { useAppData } from '../../hooks/useAppData';
import Icon from './Icon';

const typeLabels = {
  course: 'Course',
  lesson: 'Lesson',
  challenge: 'Challenge',
  quiz: 'Quiz',
  project: 'Project',
};

export default function SearchBar() {
  const { state } = useAppData();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef(null);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    const matches = (value) => String(value || '').toLowerCase().includes(term);
    const items = [];

    courses.forEach((course) => {
      if (matches(course.title) || matches(course.description)) {
        items.push({
          id: `course-${course.id}`,
          type: 'course',
          title: course.title,
          subtitle: course.description,
          path: `/learn/${course.id}`,
        });
      }
    });

    allLessons.forEach((lesson) => {
      if (matches(lesson.title) || matches(lesson.courseTitle)) {
        items.push({
          id: `lesson-${lesson.id}`,
          type: 'lesson',
          title: lesson.title,
          subtitle: lesson.courseTitle,
          path: `/learn/${lesson.courseId}/${lesson.id}`,
        });
      }
    });

    challenges.forEach((challenge) => {
      if (matches(challenge.title) || matches(challenge.category)) {
        items.push({
          id: `challenge-${challenge.id}`,
          type: 'challenge',
          title: challenge.title,
          subtitle: `${challenge.category} · ${challenge.difficulty}`,
          path: `/challenges/${challenge.id}`,
        });
      }
    });

    quizzes.forEach((quiz) => {
      if (matches(quiz.title) || matches(quiz.category)) {
        items.push({
          id: `quiz-${quiz.id}`,
          type: 'quiz',
          title: quiz.title,
          subtitle: `${quiz.category} · ${quiz.questions.length} questions`,
          path: `/quizzes/${quiz.id}`,
        });
      }
    });

    state.projects.forEach((project) => {
      if (matches(project.name) || matches(project.description)) {
        items.push({
          id: `project-${project.id}`,
          type: 'project',
          title: project.name,
          subtitle: project.description || 'Saved project',
          path: `/projects/${project.id}`,
        });
      }
    });

    return items.slice(0, 9);
  }, [query, state.projects]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const onClick = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const go = (item) => {
    if (!item) return;
    navigate(item.path);
    setQuery('');
    setOpen(false);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!open || results.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      go(results[activeIndex]);
    }
  };

  const showPanel = open && query.trim().length > 0;

  return (
    <div className="search" ref={wrapRef}>
      <span className="search__icon" aria-hidden="true">
        <Icon name="search" size={18} />
      </span>
      <input
        type="search"
        className="search__input"
        placeholder="Search courses, lessons, challenges, projects..."
        aria-label="Search DEVVERSE"
        role="combobox"
        aria-expanded={showPanel}
        aria-controls="search-results"
        aria-autocomplete="list"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {showPanel ? (
        <div className="search__panel">
          <ul id="search-results" role="listbox" aria-label="Search results" className="search__list">
            {results.length === 0 ? (
              <li className="search__empty">
                <Icon name="search" size={16} />
                No results for “{query.trim()}”. Try a course, challenge, or project name.
              </li>
            ) : (
              results.map((item, index) => (
                <li key={item.id} role="option" aria-selected={index === activeIndex}>
                  <button
                    type="button"
                    className={`search__result ${index === activeIndex ? 'is-active' : ''}`.trim()}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => go(item)}
                  >
                    <span className="search__result-main">
                      <span className="search__result-title">{item.title}</span>
                      <span className="search__result-subtitle">{item.subtitle}</span>
                    </span>
                    <span className={`badge badge--${item.type}`}>{typeLabels[item.type]}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
