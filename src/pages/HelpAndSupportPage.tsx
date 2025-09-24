import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { ArrowLeft, Search, HelpCircle, Users, Mail, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// FAQ Data
const faqSections = [
  {
    id: 'about',
    title: 'About this app',
    questions: [
      { id: 'q1', question: "What's the purpose of this app?", answer: 'This app is designed to streamline your workflow and boost productivity by integrating various tools into one cohesive platform. It helps you manage projects, communicate with your team, and track your progress efficiently.' },
      { id: 'q2', question: 'How to use it?', answer: 'Start by creating an account and connecting your services. You can then create projects, assign tasks to team members, set deadlines, and track progress using dashboards and analytics. Notifications keep you informed in real-time.' },
      { id: 'q3', question: 'How does it help?', answer: 'It helps by centralizing your work in one platform, reducing the need for multiple apps, saving time, and improving collaboration. Advanced analytics allow you to monitor team performance and identify bottlenecks quickly.' },
    ],
  },
  {
    id: 'features',
    title: 'Features',
    questions: [
      { id: 'q4', question: 'What are the key features?', answer: 'Key features include real-time collaboration, customizable dashboards, third-party integrations, task management, project tracking, automated notifications, and advanced analytics. These features are designed to improve productivity and streamline team workflows.' },
      { id: 'q5', question: 'Can I customize notifications?', answer: 'Yes! You can control which notifications you receive and set preferences for email, push, or in-app alerts. This ensures you only get relevant updates.' },
    ],
  },
  {
    id: 'technical',
    title: 'Technical Issues',
    questions: [
      { id: 'q6', question: 'The app is running slow, what should I do?', answer: 'Try clearing your browser cache and cookies. Ensure your internet connection is stable. If the issue persists, restart the app or contact our support team. Regular updates optimize performance, so keep your app updated.' },
      { id: 'q7', question: 'I encountered an error message, what should I do?', answer: 'Take note of the error code and message, then report it via the "Contact Us" FAB button. Include steps to reproduce the issue to help our support team resolve it quickly.' },
    ],
  },
  {
    id: 'account',
    title: 'Account & Privacy',
    questions: [
      { id: 'q8', question: 'How do I delete my account?', answer: 'You can delete your account from the settings page under the "Account" tab. Please note this action is irreversible. Ensure you backup any important data before deletion.' },
      { id: 'q9', question: 'How is my data secured?', answer: 'We use industry-standard encryption, secure servers, and strict privacy policies to protect your data. Personal information is never shared with third parties without consent.' },
    ],
  },
  {
    id: 'other',
    title: 'Other Issues',
    questions: [
      { id: 'q10', question: 'How do I report a bug?', answer: 'To report a bug, click on the "Contact Us" FAB button, provide a detailed description, and attach screenshots if possible. Our technical team will investigate and respond promptly.' },
      { id: 'q11', question: 'Can I suggest new features?', answer: 'Absolutely! We encourage users to suggest new features. Use the "Join Community Forum" FAB button to post your ideas or submit them via the "Contact Us" form.' },
      { id: 'q12', question: 'App notifications are not working, what should I do?', answer: 'Check your device and browser notification settings to ensure they are enabled. Clear cache and refresh the app. If the issue persists, contact support via the FAB button for assistance.' },
      { id: 'q13', question: 'I have accessibility concerns, what support is available?', answer: 'We are committed to accessibility. You can adjust font sizes, enable dark mode, and use screen readers. For further help, contact support via the FAB button.' },
    ],
  },
];

export function HelpAndSupportPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [fabOpen, setFabOpen] = useState(false);

  const filteredSections = faqSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.questions.some(q => q.question.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] px-4">
      <div className="w-full max-w-sm text-left backdrop-blur-2xl bg-[#1b140e]/95 border border-[#F57C00]/30 shadow-2xl p-8 rounded-[2rem]">

        {/* Header */}
        <header className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="p-2 mr-4 rounded-full hover:bg-[#F57C00]/30 transition-colors">
            <ArrowLeft className="w-6 h-6 text-[#FFC107]" />
          </button>
          <h1 className="text-2xl font-bold text-[#FCFCFA] drop-shadow-md text-left">Help & Support</h1>
        </header>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFEBB4] w-5 h-5" />
          <input
            type="text"
            placeholder="Search Your Query"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-[2rem] bg-[#FFF3E0]/10 backdrop-blur-xl border border-[#FFC107]/40 text-sm text-[#FCFCFA] placeholder-[#FFEBB4] focus:outline-none focus:ring-1 focus:ring-[#F57C00] transition-all duration-300 ease-in-out text-left"
          />
        </div>

        {/* Divider */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#F57C00] via-[#FFC107] to-[#FFEBB4] rounded-full mb-6"></div>

        {/* FAQ Accordion */}
        <div className="space-y-4 text-left">
          {filteredSections.map(section => (
            <div
              key={section.id}
              className="bg-[#FFF3E0]/10 backdrop-blur-xl rounded-[2rem] p-4 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl text-left"
            >
              <Accordion type="multiple">
                <AccordionItem value={section.id} className="border-none">
                  <AccordionTrigger className="hover:no-underline px-2 text-left">
                    <div className="flex items-center gap-3 text-left">
                      <HelpCircle className="w-6 h-6 text-[#FFC107]" />
                      <span className="text-lg text-[#FCFCFA] text-left">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-4 transition-all duration-300 ease-in-out text-left">
                    <Accordion type="multiple" className="ml-6 border-l border-[#F57C00]/40 pl-4 text-left">
                      {section.questions.map(q => (
                        <AccordionItem key={q.id} value={q.id} className="border-b-0 text-left">
                          <AccordionTrigger className="text-base text-[#FFEBB4] py-2 hover:no-underline hover:text-[#FFC107] transition-colors duration-200 text-left">
                            {q.question}
                          </AccordionTrigger>
                          <AccordionContent className="pb-2 text-[#FFF3E0] transition-colors duration-200 text-left">
                            {q.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 text-left">
          {/* Secondary buttons */}
          {fabOpen && (
            <>
              <button
                onClick={() => alert('Join Community Forum clicked')}
                className="flex items-center gap-2 bg-gradient-to-r from-[#F57C00] via-[#FFC107] to-[#FFEBB4] text-[#111111] font-medium rounded-[2rem] p-3 shadow-lg hover:opacity-90 transition-all duration-300 text-left"
              >
                <Users className="w-5 h-5" /> Join Community
              </button>
              <button
                onClick={() => alert('Contact Us clicked')}
                className="flex items-center gap-2 bg-gradient-to-r from-[#F57C00] via-[#FFC107] to-[#FFEBB4] text-[#111111] font-medium rounded-[2rem] p-3 shadow-lg hover:opacity-90 transition-all duration-300 text-left"
              >
                <Mail className="w-5 h-5" /> Contact Us
              </button>
            </>
          )}

          {/* Main FAB */}
          <button
            onClick={() => setFabOpen(!fabOpen)}
            className="w-16 h-16 rounded-full bg-[#F57C00] flex items-center justify-center text-[#FCFCFA] text-3xl shadow-xl hover:scale-105 transition-transform duration-300"
          >
            {fabOpen ? <X className="w-8 h-8" /> : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#FCFCFA" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="6" height="6" rx="1" />
                <rect x="14" y="4" width="6" height="6" rx="1" />
                <rect x="4" y="14" width="6" height="6" rx="1" />
                <rect x="14" y="14" width="6" height="6" rx="1" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
