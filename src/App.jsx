import { useState, useEffect } from 'react';
import './App.css';

const workflowSteps = [
  {
    title: 'Core Workflow Check & Priorities',
    time: '30–60 min',
    icon: '📊',
    instructions: [
      'Review new activity on the platform (requests, offers, messages)',
      'Check sales pipeline and deal statuses',
      'Prioritize top 3 objectives for the day',
      'Scan any urgent tasks or bugs',
      'Update your task board (Kanban, Trello, Notion, etc.)',
    ],
    why: 'Start with clarity — what moves the business today?',
  },
  {
    title: 'Move Deals Forward',
    time: '60–90 min',
    icon: '🤝',
    instructions: [
      'Respond to open buyer and supplier messages',
      'Follow up on active negotiations',
      'Send new offers or counteroffers',
      'Schedule or attend calls if needed',
      'Identify stalled leads and clear next steps',
    ],
    why: 'No deal moves unless you do.',
  },
  {
    title: 'Oversee the Platform & Development',
    time: '30–45 min',
    icon: '🛠️',
    instructions: [
      'Test the platform as a buyer or supplier (look for bugs/confusion points)',
      'Report any bugs or needed changes to the development team',
      'Approve or review UI/UX updates or new features',
      'Align with developer on priorities for the week',
    ],
    why: 'You are the bridge between the user and the product.',
  },
  {
    title: 'Marketing & Visibility',
    time: '30–45 min',
    icon: '📣',
    instructions: [
      'Write or post 1 content piece (LinkedIn, ad creative, blog snippet)',
      'Check on ad performance (CTR, cost per result, conversions)',
      'Brainstorm or plan new creatives and offers',
      'Review website copy, onboarding flows, or landing pages',
    ],
    why: "If people don't see you, they can't trade with you.",
  },
  {
    title: 'Organize Notes & System Updates',
    time: '20–30 min',
    icon: '📚',
    instructions: [
      'Record all new leads, conversations, or deals in your CRM or spreadsheet',
      'Write down key user feedback or product ideas',
      'Update deal tracker and internal documents',
      'Reflect: What went well today? What needs to be solved tomorrow?',
    ],
    why: 'Structure prevents chaos. Systems scale the business.',
  },
];

function printPage() {
  window.print();
}

function App() {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('checkedItems');
    return saved ? JSON.parse(saved) : {};
  });
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : {};
  });
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const startTime = new Date();
      startTime.setHours(7, 0, 0, 0);
      
      if (now < startTime) {
        setCurrentTime('Not started yet');
        return;
      }

      const diff = now - startTime;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setCurrentTime(`${hours}h ${minutes}m`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleCheckboxChange = (stepIndex, instructionIndex) => {
    const dayKey = selectedDay.toISOString().split('T')[0];
    const key = `${dayKey}-${stepIndex}-${instructionIndex}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNotesChange = (e) => {
    const dayKey = selectedDay.toISOString().split('T')[0];
    setNotes(prev => ({
      ...prev,
      [dayKey]: e.target.value
    }));
  };

  const getWeekDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - today.getDay() + i + 1);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getDayNotes = () => {
    const dayKey = selectedDay.toISOString().split('T')[0];
    return notes[dayKey] || '';
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Timber Business Workflow Tracker</h1>
        <p className="subtitle">Stay focused and move your timber trading platform forward, every day.</p>
        <div className="header-controls">
          <div className="timer">Time since 7 AM: {currentTime}</div>
          <button className="print-btn" onClick={printPage}>🖨️ Print Daily Template</button>
        </div>
      </header>

      <div className="week-calendar">
        {getWeekDays().map((date) => (
          <button
            key={date.toISOString()}
            className={`day-button ${isToday(date) ? 'today' : ''} ${selectedDay.toDateString() === date.toDateString() ? 'selected' : ''}`}
            onClick={() => setSelectedDay(date)}
          >
            {formatDate(date)}
          </button>
        ))}
      </div>

      <main className="workflow-grid">
        {workflowSteps.map((step, stepIndex) => (
          <section className="workflow-card" key={stepIndex}>
            <div className="card-header">
              <span className="icon" aria-label="icon">{step.icon}</span>
              <h2>{step.title}</h2>
              <span className="time">{step.time}</span>
            </div>
            <ul>
              {step.instructions.map((item, instructionIndex) => {
                const dayKey = selectedDay.toISOString().split('T')[0];
                const key = `${dayKey}-${stepIndex}-${instructionIndex}`;
                return (
                  <li key={instructionIndex}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={checkedItems[key] || false}
                        onChange={() => handleCheckboxChange(stepIndex, instructionIndex)}
                      />
                      <span className={checkedItems[key] ? 'checked' : ''}>
                        {item}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className="why">{step.why}</div>
          </section>
        ))}
      </main>

      <section className="notes-section">
        <h2>Notes for {formatDate(selectedDay)}</h2>
        <textarea
          value={getDayNotes()}
          onChange={handleNotesChange}
          placeholder="Write your thoughts, ideas, and notes for today..."
          rows="6"
        />
      </section>

      <footer className="footer">
        <p>© 2024 Timber Business Workflow Tracker. MIT License.</p>
      </footer>
    </div>
  );
}

export default App;
