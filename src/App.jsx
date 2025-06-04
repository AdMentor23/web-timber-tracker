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
  return (
    <div className="app-container">
      <header className="header">
        <h1>Timber Business Workflow Tracker</h1>
        <p className="subtitle">Stay focused and move your timber trading platform forward, every day.</p>
        <button className="print-btn" onClick={printPage}>🖨️ Print Daily Template</button>
      </header>
      <main className="workflow-grid">
        {workflowSteps.map((step, idx) => (
          <section className="workflow-card" key={idx}>
            <div className="card-header">
              <span className="icon" aria-label="icon">{step.icon}</span>
              <h2>{step.title}</h2>
              <span className="time">{step.time}</span>
            </div>
            <ul>
              {step.instructions.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className="why">{step.why}</div>
          </section>
        ))}
      </main>
      <footer className="footer">
        <p>© 2024 Timber Business Workflow Tracker. MIT License.</p>
      </footer>
    </div>
  );
}

export default App;
