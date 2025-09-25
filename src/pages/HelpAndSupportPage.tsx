// import React, { useState } from 'react';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/Accordion';
// import { ArrowLeft, Search, HelpCircle, Users, Mail, X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// // FAQ Data
// const faqSections = [
//   {
//     id: 'about',
//     title: 'About this app',
//     questions: [
//       { id: 'q1', question: "What's the purpose of this app?", answer: 'This app is designed to streamline your workflow and boost productivity by integrating various tools into one cohesive platform. It helps you manage projects, communicate with your team, and track your progress efficiently.' },
//       { id: 'q2', question: 'How to use it?', answer: 'Start by creating an account and connecting your services. You can then create projects, assign tasks to team members, set deadlines, and track progress using dashboards and analytics. Notifications keep you informed in real-time.' },
//       { id: 'q3', question: 'How does it help?', answer: 'It helps by centralizing your work in one platform, reducing the need for multiple apps, saving time, and improving collaboration. Advanced analytics allow you to monitor team performance and identify bottlenecks quickly.' },
//     ],
//   },
//   {
//     id: 'features',
//     title: 'Features',
//     questions: [
//       { id: 'q4', question: 'What are the key features?', answer: 'Key features include real-time collaboration, customizable dashboards, third-party integrations, task management, project tracking, automated notifications, and advanced analytics. These features are designed to improve productivity and streamline team workflows.' },
//       { id: 'q5', question: 'Can I customize notifications?', answer: 'Yes! You can control which notifications you receive and set preferences for email, push, or in-app alerts. This ensures you only get relevant updates.' },
//     ],
//   },
//   {
//     id: 'technical',
//     title: 'Technical Issues',
//     questions: [
//       { id: 'q6', question: 'The app is running slow, what should I do?', answer: 'Try clearing your browser cache and cookies. Ensure your internet connection is stable. If the issue persists, restart the app or contact our support team. Regular updates optimize performance, so keep your app updated.' },
//       { id: 'q7', question: 'I encountered an error message, what should I do?', answer: 'Take note of the error code and message, then report it via the "Contact Us" FAB button. Include steps to reproduce the issue to help our support team resolve it quickly.' },
//     ],
//   },
//   {
//     id: 'account',
//     title: 'Account & Privacy',
//     questions: [
//       { id: 'q8', question: 'How do I delete my account?', answer: 'You can delete your account from the settings page under the "Account" tab. Please note this action is irreversible. Ensure you backup any important data before deletion.' },
//       { id: 'q9', question: 'How is my data secured?', answer: 'We use industry-standard encryption, secure servers, and strict privacy policies to protect your data. Personal information is never shared with third parties without consent.' },
//     ],
//   },
//   {
//     id: 'other',
//     title: 'Other Issues',
//     questions: [
//       { id: 'q10', question: 'How do I report a bug?', answer: 'To report a bug, click on the "Contact Us" FAB button, provide a detailed description, and attach screenshots if possible. Our technical team will investigate and respond promptly.' },
//       { id: 'q11', question: 'Can I suggest new features?', answer: 'Absolutely! We encourage users to suggest new features. Use the "Join Community Forum" FAB button to post your ideas or submit them via the "Contact Us" form.' },
//       { id: 'q12', question: 'App notifications are not working, what should I do?', answer: 'Check your device and browser notification settings to ensure they are enabled. Clear cache and refresh the app. If the issue persists, contact support via the FAB button for assistance.' },
//       { id: 'q13', question: 'I have accessibility concerns, what support is available?', answer: 'We are committed to accessibility. You can adjust font sizes, enable dark mode, and use screen readers. For further help, contact support via the FAB button.' },
//     ],
//   },
// ];

// export function HelpAndSupportPage() {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [fabOpen, setFabOpen] = useState(false);

//   const filteredSections = faqSections.filter(section =>
//     section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     section.questions.some(q => q.question.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#111111] px-3">
//       <div className="w-full max-w-xs text-left backdrop-blur-2xl bg-[#1b140e]/95 border border-[#F57C00]/30 shadow-2xl p-4 rounded-xl">

//         {/* Header */}
//         <header className="flex items-center mb-4">
//           <button onClick={() => navigate(-1)} className="p-1.5 mr-3 rounded-full hover:bg-[#F57C00]/30 transition-colors">
//             <ArrowLeft className="w-5 h-5 text-[#FFC107]" />
//           </button>
//           <h1 className="text-lg font-bold text-[#FCFCFA] drop-shadow-md text-left">Help & Support</h1>
//         </header>

//         {/* Search Bar */}
//         <div className="relative mb-4">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FFEBB4] w-4 h-4" />
//           <input
//             type="text"
//             placeholder="Search Your Query"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#FFF3E0]/10 backdrop-blur-xl border border-[#FFC107]/40 text-xs text-[#FCFCFA] placeholder-[#FFEBB4] focus:outline-none focus:ring-1 focus:ring-[#F57C00] transition-all duration-300 ease-in-out text-left"
//           />
//         </div>

//         {/* Divider */}
//         <div className="h-[1px] w-full bg-gradient-to-r from-[#F57C00] via-[#FFC107] to-[#FFEBB4] rounded-full mb-4"></div>

//         {/* FAQ Accordion */}
//         <div className="space-y-3 text-left">
//           {filteredSections.map(section => (
//             <div
//               key={section.id}
//               className="bg-[#FFF3E0]/10 backdrop-blur-xl rounded-xl p-3 transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg text-left"
//             >
//               <Accordion type="multiple">
//                 <AccordionItem value={section.id} className="border-none">
//                   <AccordionTrigger className="hover:no-underline px-1 text-left">
//                     <div className="flex items-center gap-2 text-left">
//                       <HelpCircle className="w-5 h-5 text-[#FFC107]" />
//                       <span className="text-sm font-medium text-[#FCFCFA] text-left">{section.title}</span>
//                     </div>
//                   </AccordionTrigger>
//                   <AccordionContent className="pl-2 transition-all duration-300 ease-in-out text-left">
//                     <Accordion type="multiple" className="ml-4 border-l border-[#F57C00]/40 pl-3 text-left">
//                       {section.questions.map(q => (
//                         <AccordionItem key={q.id} value={q.id} className="border-b-0 text-left">
//                           <AccordionTrigger className="text-xs text-[#FFEBB4] py-1.5 hover:no-underline hover:text-[#FFC107] transition-colors duration-200 text-left">
//                             {q.question}
//                           </AccordionTrigger>
//                           <AccordionContent className="pb-1.5 text-xs text-[#FFF3E0] transition-colors duration-200 text-left">
//                             {q.answer}
//                           </AccordionContent>
//                         </AccordionItem>
//                       ))}
//                     </Accordion>
//                   </AccordionContent>
//                 </AccordionItem>
//               </Accordion>
//             </div>
//           ))}
//         </div>

//         {/* Floating Action Button */}
//         <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 text-left">
//           {/* Secondary buttons */}
//           {fabOpen && (
//             <>
//               <button
//                 onClick={() => alert('Join Community Forum clicked')}
//                 className="flex items-center gap-2 bg-gradient-to-r from-[#F57C00] via-[#FFC107] to-[#FFEBB4] text-[#111111] font-medium rounded-xl p-2 shadow-lg hover:opacity-90 transition-all duration-300 text-left text-xs"
//               >
//                 <Users className="w-4 h-4" /> Join Community
//               </button>
//               <button
//                 onClick={() => alert('Contact Us clicked')}
//                 className="flex items-center gap-2 bg-gradient-to-r from-[#F57C00] via-[#FFC107] to-[#FFEBB4] text-[#111111] font-medium rounded-xl p-2 shadow-lg hover:opacity-90 transition-all duration-300 text-left text-xs"
//               >
//                 <Mail className="w-4 h-4" /> Contact Us
//               </button>
//             </>
//           )}

//           {/* Main FAB */}
//           <button
//             onClick={() => setFabOpen(!fabOpen)}
//             className="w-12 h-12 rounded-full bg-[#F57C00] flex items-center justify-center text-[#FCFCFA] shadow-xl hover:scale-105 transition-transform duration-300"
//           >
//             {fabOpen ? <X className="w-6 h-6" /> : (
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="#FCFCFA" xmlns="http://www.w3.org/2000/svg">
//                 <rect x="4" y="4" width="6" height="6" rx="1" />
//                 <rect x="14" y="4" width="6" height="6" rx="1" />
//                 <rect x="4" y="14" width="6" height="6" rx="1" />
//                 <rect x="14" y="14" width="6" height="6" rx="1" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


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
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#0D0D0D] px-4 py-8">
      {/* Content Card */}
      <div className="w-full max-w-4xl text-left bg-gradient-to-br from-[#1b140e] via-[#1c1c1c] to-[#111111] border border-[#F57C00]/40 shadow-2xl p-6 rounded-2xl relative">
        
        {/* Header */}
        <header className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="p-2 mr-3 rounded-full bg-[#F57C00]/10 hover:bg-[#F57C00]/30 transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#FFC107]" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-[#FCFCFA]">Help & Support</h1>
        </header>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FFEBB4] w-4 h-4" />
          <input
            type="text"
            placeholder="Search your query..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#FFF3E0]/10 border border-[#FFC107]/30 text-sm text-[#FCFCFA] placeholder-[#FFEBB4]/70 focus:outline-none focus:ring-2 focus:ring-[#F57C00] transition-all"
          />
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-[#F57C00] via-[#FFC107] to-[#FFEBB4] rounded-full mb-6"></div>

        {/* FAQ Accordion (Responsive Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSections.map(section => (
            <div
              key={section.id}
              className="bg-[#FFF3E0]/5 rounded-xl p-4 hover:shadow-md hover:scale-[1.01] transition-all"
            >
              <Accordion type="multiple">
                <AccordionItem value={section.id} className="border-none">
                  <AccordionTrigger className="px-1">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-[#FFC107]" />
                      <span className="text-sm font-semibold text-[#FCFCFA]">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-2">
                    <Accordion type="multiple" className="ml-4 border-l border-[#F57C00]/40 pl-3">
                      {section.questions.map(q => (
                        <AccordionItem key={q.id} value={q.id} className="border-none">
                          <AccordionTrigger className="text-sm text-[#FFEBB4] py-1 hover:text-[#FFC107] transition-colors">
                            {q.question}
                          </AccordionTrigger>
                          <AccordionContent className="pb-2 text-xs text-[#FFF3E0]/90 leading-relaxed">
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
      </div>

      {/* Floating Action Button (kept OUTSIDE container to avoid overflow issues) */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
        {fabOpen && (
          <>
            <button
              onClick={() => alert('Join Community Forum clicked')}
              className="flex items-center gap-2 bg-gradient-to-r from-[#F57C00] via-[#FFC107] to-[#FFEBB4] text-[#111111] font-medium rounded-lg px-3 py-2 shadow-lg hover:opacity-90 transition-all text-sm"
            >
              <Users className="w-4 h-4" /> Join Community
            </button>
            <button
              onClick={() => alert('Contact Us clicked')}
              className="flex items-center gap-2 bg-gradient-to-r from-[#F57C00] via-[#FFC107] to-[#FFEBB4] text-[#111111] font-medium rounded-lg px-3 py-2 shadow-lg hover:opacity-90 transition-all text-sm"
            >
              <Mail className="w-4 h-4" /> Contact Us
            </button>
          </>
        )}

        <button
          onClick={() => setFabOpen(!fabOpen)}
          className="w-14 h-14 rounded-full bg-[#F57C00] flex items-center justify-center text-[#FCFCFA] shadow-xl hover:scale-110 transition-transform"
        >
          {fabOpen ? <X className="w-6 h-6" /> : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FCFCFA" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="6" height="6" rx="1" />
              <rect x="14" y="4" width="6" height="6" rx="1" />
              <rect x="4" y="14" width="6" height="6" rx="1" />
              <rect x="14" y="14" width="6" height="6" rx="1" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
