export default function QuizQuestion({ question, selected, onSelect, number, total }) {
  return (
    <fieldset className="quiz-question">
      <legend>
        <span className="quiz-question__count">
          Question {number} of {total}
        </span>
        {question.question}
      </legend>
      <div className="quiz-options quiz-options--large">
        {question.options.map((option, index) => (
          <label
            key={option}
            className={`quiz-option ${selected === index ? 'is-chosen' : ''}`.trim()}
          >
            <input
              type="radio"
              name={`quiz-question-${number}`}
              value={index}
              checked={selected === index}
              onChange={() => onSelect(index)}
            />
            <span className="quiz-option__key">{String.fromCharCode(65 + index)}</span>
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
