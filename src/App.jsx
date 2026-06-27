import { useState, useEffect, useCallback, useMemo, useRef } from "react";

const DAYS_DATA = [
  {
    day: 1, week: 1, title: "Speak Without Fear", goal: "Build confidence, reduce hesitation",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Think in English, Not Translate", duration: "15 min", content: "Many learners translate from their mother tongue before speaking. This causes hesitation. Instead, think in simple English directly.", keyPoints: ["Use Subject + Verb + Object structure", "Don't worry about perfect grammar", "Focus on speaking, not translating", "Silence sounds more confident than fillers"], softwareExample: '"I built a Todo application using React." — Simple, direct, confident.' },
    practice: { title: "Mirror Introduction", duration: "30 min", exercises: ["Speak 2 min about your name", "Speak 2 min about your hometown", "Speak 2 min about your education", "Speak 2 min: Why Full Stack Developer?", "Speak 2 min: What you studied today", "Repeat each topic twice without stopping"] },
    challenge: { title: "3-Minute No-Switch Challenge", duration: "15 min", task: "Speak continuously for 3 minutes without switching to your native language.", reflectionQuestions: ["Rate your confidence (1–10)", "Rate your fluency (1–10)", "Did you hesitate? When?", "What new words did you learn?"] },
    youtubeSearchQuery: "how to think in English fluently tips", tags: ["Foundation", "Confidence"]
  },
  {
    day: 2, week: 1, title: "Building Better Sentences", goal: "Use present, past, and future tense correctly",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Present, Past, Future Tenses", duration: "15 min", content: "Interviewers expect clear timelines. Using the right tense shows clarity and professionalism.", keyPoints: ["Present: describe current activities", "Past: describe completed work", "Future: describe your goals", "Mix tenses naturally in conversation"], softwareExample: 'Present: "I am learning Java." Past: "I completed a React project." Future: "I want to become a backend developer."' },
    practice: { title: "Java Learning Journey", duration: "30 min", exercises: ["Speak about where you started learning", "Speak about what you're learning now", "Speak about your next goal", "Write 10 simple sentences", "Speak all 10 sentences aloud", "Identify which tense each sentence uses"] },
    challenge: { title: "All-Tense Challenge", duration: "15 min", task: "Speak for 3 minutes using all three tenses naturally.", reflectionQuestions: ["Which tense was hardest?", "Did you mix tenses naturally?", "Write 3 example sentences for each tense"] },
    youtubeSearchQuery: "English tenses practice for beginners", tags: ["Grammar", "Foundation"]
  },
  {
    day: 3, week: 1, title: "Remove Filler Words", goal: "Eliminate umm, like, actually from your speech",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Power of the Pause", duration: "15 min", content: "Filler words make you sound unsure. A 2-second pause sounds more confident than 'umm'. Train yourself to pause instead.", keyPoints: ["Common fillers: umm, like, actually, you know", "Pause 2 seconds instead of filling silence", "Silence signals you are thinking", "Record yourself to count fillers"], softwareExample: 'Instead of "Umm... I built... like... React..." say "I built a React application." — Clean and confident.' },
    practice: { title: "Topic Sprint", duration: "30 min", exercises: ["Speak 1 min on React — restart if you say umm", "Speak 1 min on Java — restart if you say like", "Speak 1 min on HTML — no filler words", "Speak 1 min on your project", "Speak 1 min on your goals", "Count total filler words across all topics"] },
    challenge: { title: "5-Minute Clean Speech", duration: "15 min", task: "Speak for 5 minutes. Target: less than 5 filler words total.", reflectionQuestions: ["Which filler word do you use most?", "Did pausing feel uncomfortable?", "Count your fillers: how many?"] },
    youtubeSearchQuery: "how to stop saying umm filler words", tags: ["Fluency", "Foundation"]
  },
  {
    day: 4, week: 1, title: "Pronunciation Basics", goal: "Pronounce technical developer words clearly",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Technical Word Pronunciation", duration: "15 min", content: "Clear pronunciation builds credibility. Focus on technical words you use daily. Practice slowly first, then build speed.", keyPoints: ["Developer, Application, Database, Framework", "Repository, Authentication, Algorithm", "Practice slowly then increase speed", "Understand before speaking — don't memorize"], softwareExample: '"Repository" not "repozitory". "Authentication" not "otentication". Slow practice builds correct muscle memory.' },
    practice: { title: "Read Aloud Technical Article", duration: "30 min", exercises: ["Read a Java article aloud for 15 minutes", "Explain the article in your own words", "Look up pronunciation of 5 new technical words", "Speak each word 10 times slowly", "Use each word in a sentence", "Record yourself pronouncing the hard ones"] },
    challenge: { title: "Read Without Stopping", duration: "15 min", task: "Read one full technical paragraph without stopping or going back.", reflectionQuestions: ["Which words were difficult?", "Did you slow down on technical terms?", "Which word needs more practice?"] },
    youtubeSearchQuery: "English pronunciation for software developers", tags: ["Pronunciation", "Technical"]
  },
  {
    day: 5, week: 1, title: "Mirror Exercise", goal: "Build eye contact and self-confidence",
    isReviewDay: false, isMirrorDay: true, isRecordDay: false,
    concept: { title: "Eye Contact Builds Confidence", duration: "15 min", content: "Looking into your own eyes in a mirror simulates interview eye contact. This reduces anxiety and builds natural confidence.", keyPoints: ["Mirror = your practice audience", "Smile naturally — it changes your voice tone", "Watch your facial expressions", "Notice nervous habits like looking away"], softwareExample: 'Pretend you\'re introducing yourself to a hiring manager. Make eye contact with yourself in the mirror throughout.' },
    practice: { title: "5-Minute Introduction", duration: "30 min", exercises: ["Stand before mirror, smile for 10 seconds", "Introduce yourself for 5 minutes", "Explain your Todo Application — features", "Explain your Todo Application — technologies used", "Explain your Todo Application — challenges", "Repeat the full introduction once more"] },
    challenge: { title: "No Looking Away", duration: "15 min", task: "Deliver your introduction without looking away from the mirror.", reflectionQuestions: ["Did you smile throughout?", "Did you maintain eye contact?", "When did you feel most nervous?"] },
    youtubeSearchQuery: "mirror technique English speaking practice", tags: ["Confidence", "Mirror Day"]
  },
  {
    day: 6, week: 1, title: "Record Yourself", goal: "Identify mistakes by watching yourself speak",
    isReviewDay: false, isMirrorDay: false, isRecordDay: true,
    concept: { title: "Observe, Don't Judge", duration: "15 min", content: "Recording reveals mistakes you cannot hear while speaking. Watch as an observer, not a critic. Improvement comes from awareness.", keyPoints: ["Record video — audio alone misses a lot", "Watch twice: once for content, once for delivery", "Note specific mistakes, not vague feelings", "Good points matter as much as mistakes"], softwareExample: '"Why do you want to become a Software Developer?" — Record your answer and watch for filler words, grammar, and confidence.' },
    practice: { title: "Why Software Developer Recording", duration: "30 min", exercises: ["Record a 5-minute video answering: Why Software Developer?", "Watch the full recording once", "Write down grammar mistakes you notice", "Write down pronunciation mistakes", "Write down filler words you used", "List 2 things you did well"] },
    challenge: { title: "Second Take Improvement", duration: "15 min", task: "Record again and improve at least 3 mistakes from the first recording.", reflectionQuestions: ["Was the second recording better?", "What improved most?", "What still needs work?"] },
    youtubeSearchQuery: "record yourself speaking English improvement", tags: ["Recording", "Self-Assessment"]
  },
  {
    day: 7, week: 1, title: "Weekly Review #1", goal: "Assess Week 1 progress and plan Week 2",
    isReviewDay: true, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Progress Over Perfection", duration: "15 min", content: "Improvement comes from consistency. You don't need to be perfect — you need to be better than last week. Celebrate small wins.", keyPoints: ["Consistency beats intensity", "Track your improvement, not your perfection", "Set specific goals for next week", "Identify your biggest weakness to target"], softwareExample: 'Review Days 1–6. Which day\'s skill improved most? Which still needs daily practice?' },
    practice: { title: "10-Minute Continuous Talk", duration: "30 min", exercises: ["Speak 2 min about your family", "Speak 2 min about your education", "Speak 2 min about Java", "Speak 2 min about React", "Speak 2 min about your career goals", "Don't stop for any reason"] },
    challenge: { title: "Weekly Self-Assessment", duration: "15 min", task: "Rate yourself honestly across all 8 skills. Write your biggest improvement and your goal for Week 2.", reflectionQuestions: ["Rate Confidence (1–10)", "Rate Fluency (1–10)", "Rate Pronunciation (1–10)", "Rate Grammar (1–10)", "Rate Eye Contact (1–10)", "Biggest improvement this week?", "Goal for Week 2?"] },
    youtubeSearchQuery: "English speaking self assessment", tags: ["Review", "Assessment"]
  },
  {
    day: 8, week: 2, title: "Tell Me About Yourself", goal: "Deliver a confident 90-second self-introduction",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "The Perfect Introduction Formula", duration: "15 min", content: "Your introduction is your first impression. It must be structured, natural, and end with where you want to go.", keyPoints: ["Include: Name, Education, Skills, Projects, Goal", "Keep it 90–120 seconds", "Sound natural, not memorized", "End with your career goal clearly"], softwareExample: '"My name is Sameer. I completed my degree and I\'m preparing to become a Java Full Stack Developer. I have learned Java, HTML, CSS, JavaScript, React. I built projects like a Todo application, and I\'m looking for an opportunity to learn and contribute."' },
    practice: { title: "Introduction Practice Rounds", duration: "30 min", exercises: ["Write your introduction (90–120 seconds)", "Practice it 5 times normally", "Practice 3 times in front of mirror", "Practice 2 times without looking at notes", "Time each attempt", "Focus on sounding natural, not perfect"] },
    challenge: { title: "90-Second No-Notes Delivery", duration: "15 min", task: "Deliver your introduction in exactly 90 seconds with no filler words and a smile.", reflectionQuestions: ["Did you sound natural?", "Which part did you forget?", "Did you end with your goal clearly?"] },
    youtubeSearchQuery: "tell me about yourself interview answer developer", tags: ["Interview", "Introduction"]
  },
  {
    day: 9, week: 2, title: "Why Software Developer?", goal: "Structure a compelling motivation answer",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Three-Part Motivation Answer", duration: "15 min", content: "A strong motivation answer shows passion and direction. It connects your past interest to your current learning to your future goal.", keyPoints: ["Part 1: Your genuine interest", "Part 2: Your learning journey", "Part 3: Your future goal", "Give a specific example, not just opinions"], softwareExample: '"I enjoy solving problems and building useful applications. While learning Java and React, I realized I like creating software that helps people. My goal is to become a skilled Full Stack Developer and keep learning new technologies."' },
    practice: { title: "Four Motivation Questions", duration: "30 min", exercises: ["Answer: Why software development? (2 min)", "Answer: Why Java specifically? (2 min)", "Answer: Why Full Stack Development? (2 min)", "Answer: What motivates your daily learning? (2 min)", "Repeat each answer once and improve it", "Focus on giving examples, not just opinions"] },
    challenge: { title: "All Four Without Notes", duration: "15 min", task: "Answer all four questions without notes.", reflectionQuestions: ["Which answer sounded most convincing?", "Did you give examples or only opinions?", "Which answer needs more work?"] },
    youtubeSearchQuery: "why do you want to be a software developer answer", tags: ["Interview", "Motivation"]
  },
  {
    day: 10, week: 2, title: "Explain Your Project", goal: "Use the 6-step project explanation structure",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "6-Step Project Explanation", duration: "15 min", content: "Interviewers want to understand what you built, why, how, and what you learned. Use a clear structure every time.", keyPoints: ["Step 1: Project name", "Step 2: Purpose (what problem it solves)", "Step 3: Technologies used", "Step 4: Your role", "Step 5: Challenges you faced", "Step 6: What you learned"], softwareExample: '"I built a Todo application using React. It helps users manage daily tasks. I used React Hooks and local storage. My role was full development. One challenge was managing state, and I learned useState and useEffect effectively."' },
    practice: { title: "Project Explanation Practice", duration: "30 min", exercises: ["Explain your project using all 6 steps (3–5 min)", "Time your explanation", "Explain the same project to a non-technical person", "Simplify jargon for a non-tech audience", "Record a 3-minute explanation", "Watch and note what to improve"] },
    challenge: { title: "Recruiter Clarity Test", duration: "15 min", task: "Record a 3-minute explanation. Ask yourself: Would a recruiter understand this?", reflectionQuestions: ["Did you explain the problem before the solution?", "Did you avoid unnecessary jargon?", "Would a recruiter understand your explanation?"] },
    youtubeSearchQuery: "how to explain your project in interview", tags: ["Interview", "Technical"]
  },
  {
    day: 11, week: 2, title: "Strengths with Examples", goal: "Use the Strength→Example→Result formula",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Prove Your Strengths", duration: "15 min", content: "Anyone can list strengths. Interviewers want proof. The formula: state the strength, give a real example, share the result.", keyPoints: ["Never just list strengths", "Formula: Strength → Example → Result", "Use real examples from your studies", "Keep each strength answer under 90 seconds"], softwareExample: '"One of my strengths is consistency. I study Java and Full Stack Development every day. This habit helped me complete my React Todo project."' },
    practice: { title: "Five Strengths Explained", duration: "30 min", exercises: ["Explain: Quick learner (with real example)", "Explain: Team player (with real example)", "Explain: Problem-solving (with real example)", "Explain: Consistency (with real example)", "Explain: Adaptability (with real example)", "Each answer: 1 minute, real example required"] },
    challenge: { title: "Top 3 Strengths in 2 Minutes", duration: "15 min", task: "Answer 'What are your top three strengths?' in exactly 2 minutes.", reflectionQuestions: ["Did you give examples?", "Did you sound confident?", "Which strength was hardest to explain?"] },
    youtubeSearchQuery: "strengths and weaknesses interview tips", tags: ["Interview", "HR"]
  },
  {
    day: 12, week: 2, title: "Weaknesses & Improvement", goal: "Give an honest, growth-focused weakness answer",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Weakness + Growth Formula", duration: "15 min", content: "Never say 'I have no weaknesses' or 'I'm a perfectionist.' Choose a real weakness and show what you're doing to improve.", keyPoints: ["Choose a genuine, safe-to-share weakness", "Show what you're actively doing to improve", "Share progress you've already made", "Avoid: no weaknesses, perfectionism cliché"], softwareExample: '"Earlier, I hesitated to speak in English. To improve, I practice speaking every day and record myself. I can already see progress in my fluency."' },
    practice: { title: "Three Weakness Answers", duration: "30 min", exercises: ["Choose 3 real weaknesses to discuss", "For weakness 1: describe it, improvement, progress", "For weakness 2: describe it, improvement, progress", "For weakness 3: describe it, improvement, progress", "Practice each answer twice", "Focus on the improvement, not the weakness"] },
    challenge: { title: "Why Hire You Despite This?", duration: "15 min", task: "Answer: 'Why should we hire someone with this weakness?' in 90 seconds.", reflectionQuestions: ["Did you focus on improvement over the weakness?", "Did you sound defensive or confident?", "Which weakness answer was strongest?"] },
    youtubeSearchQuery: "weakness interview answer with example", tags: ["Interview", "HR"]
  },
  {
    day: 13, week: 2, title: "STAR Method", goal: "Answer behavioral interview questions with structure",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Situation, Task, Action, Result", duration: "15 min", content: "The STAR method structures behavioral answers. It keeps your response logical, complete, and easy to follow.", keyPoints: ["S: Set the scene (Situation)", "T: What you needed to do (Task)", "A: What you actually did (Action)", "R: The outcome (Result)"], softwareExample: 'S: Building a Todo app. T: Save tasks after refresh. A: Learned and implemented localStorage in React. R: Application retained user data successfully.' },
    practice: { title: "Three STAR Stories", duration: "30 min", exercises: ["Answer using STAR: Tell me about a challenge", "Answer using STAR: Tell me about a mistake", "Answer using STAR: Tell me about a success", "Speak each answer twice", "Improve the second attempt", "Make sure each answer has all 4 STAR parts"] },
    challenge: { title: "Challenge STAR Recording", duration: "15 min", task: "Record yourself answering: 'Tell me about a challenge you overcame.'", reflectionQuestions: ["Did you follow the STAR structure?", "Was your answer clear and logical?", "Was the Result part strong?"] },
    youtubeSearchQuery: "STAR method interview technique examples", tags: ["Interview", "STAR Method"]
  },
  {
    day: 14, week: 2, title: "Weekly Review #2", goal: "Complete a full mock HR interview",
    isReviewDay: true, isMirrorDay: false, isRecordDay: true,
    concept: { title: "Interview is a Conversation", duration: "15 min", content: "Great interview answers are clear, honest, structured, and supported by examples. Treat it as a conversation, not a performance.", keyPoints: ["Clear: no jargon overload", "Honest: don't exaggerate", "Structured: use STAR or formulas", "Examples: always support opinions"], softwareExample: 'Review: Introduction, Why SW Dev, Project Explanation, Strengths, Weaknesses, STAR — all connected into one cohesive story about you.' },
    practice: { title: "15-Minute Mock Interview", duration: "30 min", exercises: ["Answer: Tell me about yourself (90 sec)", "Answer: Why software development?", "Answer: Explain your project", "Answer: What are your strengths?", "Answer: What is your weakness?", "Answer: Tell me about a challenge (STAR)", "Record the full session"] },
    challenge: { title: "Review and Re-record", duration: "15 min", task: "Watch your mock interview recording. Identify the strongest and weakest answers.", reflectionQuestions: ["Which answer was strongest?", "Which answer needs improvement?", "What will you work on in Week 3?"] },
    youtubeSearchQuery: "mock interview software developer practice", tags: ["Review", "Mock Interview", "Recording"]
  },
  {
    day: 15, week: 3, title: "Starting a Group Discussion", goal: "Open a GD confidently with a clear opinion",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "GD Opening Formula", duration: "15 min", content: "A strong GD opening sets the tone. It must greet, introduce the topic, and share one clear opinion immediately.", keyPoints: ["Step 1: Greet the group", "Step 2: Introduce the topic clearly", "Step 3: Share one clear opinion", "Keep opening under 45 seconds"], softwareExample: '"Good morning everyone. I believe AI is improving software development by helping developers write code faster and automate repetitive tasks."' },
    practice: { title: "Five GD Openings", duration: "30 min", exercises: ["Open GD topic: AI in software development", "Open GD topic: Remote work benefits", "Open GD topic: Online education vs classroom", "Open GD topic: Social media impact", "Open GD topic: Open-source software", "Each opening: 2 minutes"] },
    challenge: { title: "30-Second No-Notes Opening", duration: "15 min", task: "Open each topic in 30 seconds without notes.", reflectionQuestions: ["Did you begin confidently?", "Did you clearly state your opinion?", "Did you greet before speaking?"] },
    youtubeSearchQuery: "how to start group discussion tips", tags: ["Group Discussion", "Communication"]
  },
  {
    day: 16, week: 3, title: "Agreeing & Disagreeing", goal: "Use professional phrases to agree and disagree",
    isReviewDay: false, isMirrorDay: true, isRecordDay: false,
    concept: { title: "Polite Professional Phrases", duration: "15 min", content: "In GDs and meetings, how you express agreement or disagreement matters as much as what you say. Stay respectful always.", keyPoints: ["Agree: 'I agree because...', 'That's a good point.'", "Disagree: 'I respectfully disagree because...'", "Bridge: 'I see your perspective, however...'", "Never: 'You're wrong' or 'That's not correct'"], softwareExample: '"I agree that AI increases productivity, but developers still need strong problem-solving skills that AI cannot replace."' },
    practice: { title: "10 Statements Practice", duration: "30 min", exercises: ["Choose 10 opinion statements about tech", "For each: agree politely with a reason", "For each: disagree politely with a reason", "Practice in mirror — watch your expressions", "Example: 'AI will replace programmers'", "Example: 'Remote work reduces productivity'"] },
    challenge: { title: "Both Sides: Work From Home", duration: "15 min", task: "Give both sides of: 'Should companies allow permanent work from home?'", reflectionQuestions: ["Were you respectful on both sides?", "Did you support opinions with reasons?", "Did you use professional phrases?"] },
    youtubeSearchQuery: "agreeing disagreeing politely English phrases", tags: ["Group Discussion", "Professional Language"]
  },
  {
    day: 17, week: 3, title: "Supporting Your Opinion", goal: "Use Opinion→Reason→Example structure",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Opinion with Evidence", duration: "15 min", content: "Opinions without reasons are weak. Use the three-part structure to make your point persuasive and professional.", keyPoints: ["State your opinion clearly first", "Give at least two reasons", "Support with a real example", "Keep each point under 2 minutes"], softwareExample: '"I believe open-source projects help developers learn faster because they provide real-world code examples, and I personally improved by contributing to GitHub projects."' },
    practice: { title: "Five Topics with Evidence", duration: "30 min", exercises: ["Topic 1: State opinion, 2 reasons, 1 example", "Topic 2: State opinion, 2 reasons, 1 example", "Topic 3: State opinion, 2 reasons, 1 example", "Topic 4: State opinion, 2 reasons, 1 example", "Topic 5: State opinion, 2 reasons, 1 example", "Choose your own 5 tech-related topics"] },
    challenge: { title: "3-Minute Full Stack Opinion", duration: "15 min", task: "Speak for 3 minutes on: 'Should every CS student learn Full Stack Development?'", reflectionQuestions: ["Did you give examples?", "Did you stay on topic?", "Was your opinion clear from the start?"] },
    youtubeSearchQuery: "how to give opinion in English professionally", tags: ["Group Discussion", "Argumentation"]
  },
  {
    day: 18, week: 3, title: "Leadership in a GD", goal: "Guide, redirect, and summarize a discussion",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "GD Leadership Skills", duration: "15 min", content: "A GD leader doesn't dominate — they guide. Encourage others, track the discussion, redirect if it drifts, and summarize at the end.", keyPoints: ["Invite others: 'What do others think?'", "Redirect: 'Let's also consider...'", "Summarize: 'So far, we've covered...'", "Stay calm and neutral while leading"], softwareExample: '"We\'ve discussed the advantages of AI. Let\'s also consider some challenges like data privacy and job displacement."' },
    practice: { title: "Imaginary GD Leadership", duration: "30 min", exercises: ["Start a GD as leader — open the topic", "Invite 'others' (speak for them briefly)", "Bring discussion back if it goes off-topic", "Redirect to a new sub-topic", "Summarize all points covered", "Close the discussion professionally"] },
    challenge: { title: "5-Minute Imaginary GD", duration: "15 min", task: "Lead an imaginary 5-minute GD on any tech topic by yourself.", reflectionQuestions: ["Did you sound calm and in control?", "Did you organize the discussion well?", "Was your summary balanced?"] },
    youtubeSearchQuery: "leadership skills group discussion", tags: ["Group Discussion", "Leadership"]
  },
  {
    day: 19, week: 3, title: "Record Yourself — GD", goal: "Improve GD delivery by watching your recording",
    isReviewDay: false, isMirrorDay: false, isRecordDay: true,
    concept: { title: "GD Video Self-Review", duration: "15 min", content: "Recording your GD practice reveals your facial expressions, speaking pace, hand gestures, and confidence — things you can't notice while speaking.", keyPoints: ["Watch for filler words in GD context", "Note eye contact and facial expressions", "Check speaking speed — too fast?", "Rate your confidence overall"], softwareExample: 'Topic: "Is Artificial Intelligence a threat or an opportunity for software developers?" — A rich topic with multiple viewpoints.' },
    practice: { title: "AI GD Recording", duration: "30 min", exercises: ["Record a 5-minute GD on: AI — threat or opportunity?", "Watch the full recording", "Note filler words used", "Note eye contact quality", "Note speaking speed", "Note confidence level"] },
    challenge: { title: "Improved Second Recording", duration: "15 min", task: "Record the same topic again after making improvements.", reflectionQuestions: ["What improved the most?", "What still needs work?", "Was the second recording noticeably better?"] },
    youtubeSearchQuery: "group discussion AI technology topic", tags: ["Group Discussion", "Recording"]
  },
  {
    day: 20, week: 3, title: "Summarizing a Discussion", goal: "End a GD with a clear, balanced summary",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "The Art of Summarizing", duration: "15 min", content: "A good summary covers key points without adding new opinions. Stay neutral, be brief, and end with confidence.", keyPoints: ["Cover all key points mentioned", "Stay neutral — don't pick sides", "Keep summary under 60 seconds", "End with a clear, confident closing line"], softwareExample: '"To summarize, AI improves developer productivity, but developers must continue learning and adapting to new technologies to stay relevant."' },
    practice: { title: "Five Summaries", duration: "30 min", exercises: ["Topic 1: Speak 2 min, then 30-sec summary", "Topic 2: Speak 2 min, then 30-sec summary", "Topic 3: Speak 2 min, then 30-sec summary", "Topic 4: Speak 2 min, then 30-sec summary", "Topic 5: Speak 2 min, then 30-sec summary", "Keep each summary short and balanced"] },
    challenge: { title: "Future of Full Stack Summary", duration: "15 min", task: "Speak 4 minutes on 'The Future of Full Stack Development', then close with a 30-second summary.", reflectionQuestions: ["Did you summarize instead of repeating?", "Was your ending strong and confident?", "Was the summary balanced?"] },
    youtubeSearchQuery: "how to summarize group discussion", tags: ["Group Discussion", "Communication"]
  },
  {
    day: 21, week: 3, title: "Weekly Review #3 + Presentation Basics", goal: "Assess Week 3 and learn presentation structure",
    isReviewDay: true, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Structure Every Presentation", duration: "15 min", content: "A good presentation has three parts: Introduction (introduce yourself and topic), Body (main points in logical order), Conclusion (summarize and close confidently).", keyPoints: ["Introduction: Who you are and topic overview", "Body: Problem → Features → Technologies → Challenges", "Conclusion: What you learned and your goal", "Time each section before presenting"], softwareExample: 'Topic: My Todo Application. Intro: "Today I\'ll explain my Todo application." Body: Problem → Features → Tech → Challenges. Conclusion: "This improved my React skills."' },
    practice: { title: "5-Minute Project Presentation", duration: "30 min", exercises: ["Prepare a 5-minute project presentation", "1 minute: Introduction section", "3 minutes: Body — main explanation", "1 minute: Conclusion", "Practice twice", "Rate each section separately"] },
    challenge: { title: "Week 3 Self-Assessment", duration: "15 min", task: "Rate yourself across all skills and set a specific goal for the final week.", reflectionQuestions: ["Rate Confidence (1–10)", "Rate GD participation (1–10)", "Rate Summarizing ability (1–10)", "What is your goal for Week 4?"] },
    youtubeSearchQuery: "presentation structure tips", tags: ["Review", "Presentation"]
  },
  {
    day: 22, week: 4, title: "Voice Modulation", goal: "Use tone, pace, and pauses effectively",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "The Power of Your Voice", duration: "15 min", content: "Speaking in one monotone tone loses your audience. Vary your pitch, slow down for complex ideas, and pause after key points.", keyPoints: ["Louder voice for important points", "Slower pace for complex ideas", "Natural pause after key sentences", "Don't rush through technical explanations"], softwareExample: '"The biggest challenge... (pause) ...was managing application state." — The pause creates emphasis and lets the listener absorb the point.' },
    practice: { title: "Read and Modulate", duration: "30 min", exercises: ["Read a Java/React article aloud", "Identify 3 key sentences to emphasize", "Reread with louder voice on key points", "Slow down on technical explanations", "Add natural pauses after each section", "Explain the article with full modulation"] },
    challenge: { title: "3-Minute No-Monotone", duration: "15 min", task: "Present for 3 minutes without sounding monotonous.", reflectionQuestions: ["Did you vary your tone?", "Did you speak too fast?", "Which pause felt most natural?"] },
    youtubeSearchQuery: "voice modulation speaking tips", tags: ["Presentation", "Voice"]
  },
  {
    day: 23, week: 4, title: "Body Language", goal: "Use confident body language during presentations",
    isReviewDay: false, isMirrorDay: true, isRecordDay: false,
    concept: { title: "Your Body Speaks Too", duration: "15 min", content: "55% of communication is body language. Standing tall, maintaining eye contact, and using natural gestures makes you look confident even when nervous.", keyPoints: ["Stand straight — don't slouch", "Smile naturally — it relaxes both you and audience", "Keep hands relaxed, not behind back", "Maintain eye contact — don't stare at your notes"], softwareExample: 'Imagine presenting your project to a hiring manager. Stand, smile, look at them, use your hands naturally to describe the architecture.' },
    practice: { title: "Mirror Presentation", duration: "30 min", exercises: ["Stand before mirror — check your posture", "Present: Why I Want to Become a Full Stack Dev", "Focus on eye contact with your reflection", "Use hand gestures naturally", "Check facial expressions throughout", "Repeat the presentation after self-observation"] },
    challenge: { title: "2-Second Max Look-Away", duration: "15 min", task: "Deliver the presentation without looking away for more than 2–3 seconds.", reflectionQuestions: ["Did you look confident?", "Were your gestures natural or forced?", "What body habit do you want to fix?"] },
    youtubeSearchQuery: "body language tips presentation", tags: ["Presentation", "Body Language", "Mirror Day"]
  },
  {
    day: 24, week: 4, title: "Handle Technical Questions", goal: "Answer technical questions calmly and honestly",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Honest is Smart", duration: "15 min", content: "Interviewers value honesty and logical thinking over guessing. When you don't fully know an answer, say so clearly and share what you do know.", keyPoints: ["Stay calm — breathe before answering", "Be honest if you don't know", "Explain your current understanding", "Don't guess wildly — it damages trust"], softwareExample: '"I\'m not completely sure about that concept, but based on my understanding of OOP, I believe it relates to encapsulation and data hiding."' },
    practice: { title: "Technical Q&A Preparation", duration: "30 min", exercises: ["Answer: What is React? (2 min)", "Answer: Why Java? (2 min)", "Answer: Explain OOP concepts (2 min)", "Answer: What is REST API? (2 min)", "Answer: What is Git? (2 min)", "For incomplete answers: explain your current understanding"] },
    challenge: { title: "Unexpected Question in 2 Minutes", duration: "15 min", task: "Pick one unexpected technical question from a Java interview list and answer it in 2 minutes.", reflectionQuestions: ["Did you stay calm?", "Did you avoid guessing wildly?", "How honestly did you handle gaps in knowledge?"] },
    youtubeSearchQuery: "handling technical interview questions", tags: ["Interview", "Technical"]
  },
  {
    day: 25, week: 4, title: "Handle Q&A Professionally", goal: "Listen fully, pause, then answer questions clearly",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Q&A is an Opportunity", duration: "15 min", content: "Q&A sessions show how you think on your feet. Listen to the full question before answering. A brief pause signals that you're thinking, not guessing.", keyPoints: ["Listen to the full question first", "Pause briefly before answering", "Answer clearly and concisely", "Thank the interviewer if appropriate"], softwareExample: '"That\'s a good question. I chose React because it allows reusable components and efficient UI updates, which made my Todo project faster to build."' },
    practice: { title: "10 Project Q&A Answers", duration: "30 min", exercises: ["Prepare 10 questions about your project", "Answer each in 30–60 seconds", "Answer: Why did you build this project?", "Answer: What was the biggest challenge?", "Answer: What would you do differently?", "Answer: What would you add next?"] },
    challenge: { title: "5 Questions Without Notes", duration: "15 min", task: "Answer 5 project questions continuously without notes.", reflectionQuestions: ["Were your answers concise?", "Did you stay on topic?", "Did you pause before answering?"] },
    youtubeSearchQuery: "QnA session tips professional", tags: ["Interview", "Q&A"]
  },
  {
    day: 26, week: 4, title: "Storytelling in Interviews", goal: "Make your answers memorable with stories",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Stories Are Memorable", duration: "15 min", content: "Facts tell, stories sell. A story about a real experience is more convincing and memorable than any list of skills.", keyPoints: ["Structure: Situation → Action → Result → Learning", "Use real, specific examples", "Include what you felt or thought", "End with the lesson learned"], softwareExample: 'Story: "I was debugging a state issue in React for 3 hours. I finally found that I was mutating state directly. It taught me to always create a new object when updating state."' },
    practice: { title: "Three Interview Stories", duration: "30 min", exercises: ["Tell a story: A challenge you solved (2–3 min)", "Tell a story: A mistake you learned from (2–3 min)", "Tell a story: A project you're proud of (2–3 min)", "Each story must have: Situation, Action, Result, Learning", "Practice each story twice", "Improve the second attempt"] },
    challenge: { title: "Unscripted Story", duration: "15 min", task: "Tell one story without any preparation.", reflectionQuestions: ["Was the story easy to follow?", "Did you end with a lesson learned?", "Was the story specific or vague?"] },
    youtubeSearchQuery: "storytelling interview technique", tags: ["Interview", "Storytelling"]
  },
  {
    day: 27, week: 4, title: "Record Yourself — Final", goal: "Record your career journey presentation",
    isReviewDay: false, isMirrorDay: false, isRecordDay: true,
    concept: { title: "Your Career Journey Story", duration: "15 min", content: "This is your most important recording. Focus on confidence, clear voice, natural pace, and professional language. Compare with your Day 6 recording.", keyPoints: ["Confidence — believe in your story", "Clear voice — no mumbling", "Natural pace — not rushed", "Professional language — no fillers"], softwareExample: 'Topic: "My Journey to Becoming a Java Full Stack Developer" — Cover: education, skills, projects, challenges, career goals.' },
    practice: { title: "8-Minute Career Presentation", duration: "30 min", exercises: ["Record an 8-minute presentation on your journey", "Cover: Education background", "Cover: Technical skills learned", "Cover: Projects built", "Cover: Challenges overcome", "Cover: Career goals for 2026", "Watch and write 3 strengths + 3 improvements"] },
    challenge: { title: "Improved Second Take", duration: "15 min", task: "Record the presentation again after making improvements.", reflectionQuestions: ["Did you improve compared to Day 6?", "What changed the most?", "Are you proud of this recording?"] },
    youtubeSearchQuery: "career journey presentation example", tags: ["Presentation", "Recording"]
  },
  {
    day: 28, week: 4, title: "Mock HR + Technical Interview", goal: "Simulate a complete job interview",
    isReviewDay: false, isMirrorDay: false, isRecordDay: true,
    concept: { title: "Interview is a Conversation", duration: "15 min", content: "A good interview feels like a thoughtful conversation. Stay calm, smile, think before answering. You know more than you think.", keyPoints: ["Smile when you enter and throughout", "Think before answering — silence is okay", "Connect answers to your real experience", "End with a question for the interviewer"], softwareExample: 'Remember: Every answer connects back to your journey — your learning, your projects, your goals. That is your story.' },
    practice: { title: "20-Minute Full Mock Interview", duration: "30 min", exercises: ["Answer: Tell me about yourself (90 sec)", "Answer: Why should we hire you?", "Answer: Explain your main project", "Answer: Describe your strengths", "Answer: Describe your weakness", "Answer: OOP concepts (Java)", "Answer: React basics", "Answer: Career goals in 2 years", "Ask: one question to the interviewer"] },
    challenge: { title: "Post-Interview Analysis", duration: "15 min", task: "Review your answers. Identify your strongest and weakest answer.", reflectionQuestions: ["Which answer was strongest?", "Which answer needs improvement?", "How calm did you feel throughout?"] },
    youtubeSearchQuery: "mock HR technical interview full", tags: ["Interview", "Mock Interview", "Recording"]
  },
  {
    day: 29, week: 4, title: "Final Presentation Practice", goal: "Deliver a complete 10-minute technical presentation",
    isReviewDay: false, isMirrorDay: false, isRecordDay: false,
    concept: { title: "Memorable Endings", duration: "15 min", content: "Your closing is the last thing people remember. Summarize key points, show enthusiasm, and thank the audience with confidence.", keyPoints: ["Summarize — don't introduce new ideas", "Show genuine enthusiasm for your topic", "Thank the audience and invite questions", "Keep closing under 45 seconds"], softwareExample: '"Thank you for listening. I\'m excited to continue learning and contribute as a Java Full Stack Developer."' },
    practice: { title: "10-Minute Project Presentation", duration: "30 min", exercises: ["Prepare full 10-min project presentation", "Section: Introduction (1 min)", "Section: Problem and purpose (1.5 min)", "Section: Solution and technologies (2 min)", "Section: Challenges faced (1.5 min)", "Section: What you learned (1.5 min)", "Section: Future improvements (1 min)", "Section: Confident conclusion (1.5 min)", "Practice the presentation twice"] },
    challenge: { title: "45-Second Power Close", duration: "15 min", task: "Finish your presentation with a confident, enthusiastic closing in under 45 seconds.", reflectionQuestions: ["Did you end strongly?", "Did you sound enthusiastic?", "Did you invite questions?"] },
    youtubeSearchQuery: "technical presentation practice tips", tags: ["Presentation", "Advanced"]
  },
  {
    day: 30, week: 4, title: "Grand Finale 🎉", goal: "Complete self-assessment and celebrate 30 days",
    isReviewDay: true, isMirrorDay: false, isRecordDay: true,
    concept: { title: "Communication is Built Daily", duration: "15 min", content: "You made it to Day 30. Communication is a skill built through consistent daily practice. Keep speaking, reading, listening, and presenting beyond these 30 days.", keyPoints: ["Keep practicing even after Day 30", "Read one English article aloud daily", "Record yourself once per week", "Revisit this program every 2–3 months"], softwareExample: 'Your 30-day outcome: confident interview answers, clear project explanations, GD leadership, and professional presentation delivery.' },
    practice: { title: "Complete Final Assessment", duration: "30 min", exercises: ["2-minute self-introduction (no notes)", "5-minute project explanation", "Answer 5 HR interview questions", "Answer 3 technical interview questions", "3-minute mini presentation", "2-minute Q&A simulation", "Record the entire session"] },
    challenge: { title: "Final Self-Assessment", duration: "15 min", task: "Rate yourself across all 10 communication skills and write your 90-day communication goal.", reflectionQuestions: ["Rate Confidence (1–10)", "Rate Fluency (1–10)", "Rate Pronunciation (1–10)", "Rate Grammar (1–10)", "Rate Interview Readiness (1–10)", "Rate Presentation Skills (1–10)", "Biggest improvement in 30 days?", "Communication goal for next 90 days?", "Three daily habits you will continue?"] },
    youtubeSearchQuery: "English communication improvement 30 days", tags: ["Grand Finale", "Assessment", "Recording"]
  }
];

const WEEK_COLORS = { 1: "#6C63FF", 2: "#00D4FF", 3: "#00C896", 4: "#FFB347" };
const WEEK_LABELS = { 1: "Foundation", 2: "Interview Skills", 3: "Group Discussion", 4: "Presentations" };

function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

function getStorage(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function setStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function getProgress(email) {
  return getStorage(`comm_progress_${email}`) || {};
}
function setProgress(email, progress) {
  setStorage(`comm_progress_${email}`, progress);
}

function getStreak(email) {
  return getStorage(`comm_streak_${email}`) || { currentStreak: 0, lastActiveDate: null, longestStreak: 0 };
}

function computeStats(email) {
  const progress = getProgress(email);
  const completed = Object.values(progress).filter(d => d.completed).length;
  const ratings = Object.values(progress).filter(d => d.rating).map(d => d.rating);
  const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;
  const notes = Object.values(progress).filter(d => d.notes && d.notes.trim()).length;
  const streak = getStreak(email);
  return { completed, avgRating, notes, currentStreak: streak.currentStreak, longestStreak: streak.longestStreak };
}

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function App() {
  const [session, setSession] = useState(() => getStorage("comm_session"));
  const [page, setPage] = useState("dashboard");
  const [selectedDay, setSelectedDay] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [authError, setAuthError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsApiKey, setSettingsApiKey] = useState(() => getStorage("comm_api_key") || "");
  const [showApiKey, setShowApiKey] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [, forceUpdate] = useState(0);

  const refresh = () => forceUpdate(n => n + 1);

  const user = useMemo(() => {
    if (!session) return null;
    const users = getStorage("comm_users") || [];
    return users.find(u => u.email === session);
  }, [session]);

  const stats = useMemo(() => session ? computeStats(session) : null, [session, page, selectedDay]);

  function handleLogin(e) {
    e.preventDefault();
    const users = getStorage("comm_users") || [];
    const found = users.find(u => u.email === authForm.email && u.passwordHash === hashPassword(authForm.password));
    if (!found) { setAuthError("Invalid email or password."); return; }
    setStorage("comm_session", found.email);
    setSession(found.email);
    setAuthError("");
  }

  function handleSignup(e) {
    e.preventDefault();
    if (!authForm.name.trim()) { setAuthError("Please enter your name."); return; }
    if (!/\S+@\S+\.\S+/.test(authForm.email)) { setAuthError("Please enter a valid email."); return; }
    if (authForm.password.length < 8) { setAuthError("Password must be at least 8 characters."); return; }
    if (authForm.password !== authForm.confirm) { setAuthError("Passwords do not match."); return; }
    const users = getStorage("comm_users") || [];
    if (users.find(u => u.email === authForm.email)) { setAuthError("Email already registered."); return; }
    users.push({ name: authForm.name, email: authForm.email, passwordHash: hashPassword(authForm.password) });
    setStorage("comm_users", users);
    setStorage("comm_session", authForm.email);
    setSession(authForm.email);
    setAuthError("");
  }

  function handleLogout() {
    setStorage("comm_session", null);
    setSession(null);
    setPage("dashboard");
    setSidebarOpen(false);
  }

  function markDayComplete(dayNum, rating, notes) {
    const progress = getProgress(session);
    progress[dayNum] = { ...progress[dayNum], completed: true, rating, notes, completedAt: Date.now() };
    setProgress(session, progress);
    const streak = getStreak(session);
    const today = new Date().toDateString();
    if (streak.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = streak.lastActiveDate === yesterday ? streak.currentStreak + 1 : 1;
      setStorage(`comm_streak_${session}`, { currentStreak: newStreak, lastActiveDate: today, longestStreak: Math.max(newStreak, streak.longestStreak || 0) });
    }
    refresh();
  }

  if (!session) return <AuthPage authMode={authMode} setAuthMode={setAuthMode} authForm={authForm} setAuthForm={setAuthForm} authError={authError} handleLogin={handleLogin} handleSignup={handleSignup} />;

  const progress = getProgress(session);
  const currentDay = Math.min(30, (stats?.completed || 0) + 1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 15px; }
        body { background: #0A0A0F; color: #F0F0FF; font-family: 'Inter', sans-serif; min-height: 100vh; }
        h1,h2,h3,h4,h5 { font-family: 'Space Grotesk', sans-serif; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #12121A; } ::-webkit-scrollbar-thumb { background: #2a2a3e; border-radius: 3px; }
        .app-shell { display: flex; min-height: 100vh; }
        .sidebar { width: 220px; background: #0D0D15; border-right: 1px solid #1E1E2E; display: flex; flex-direction: column; padding: 16px 0; position: fixed; top: 0; left: 0; height: 100vh; z-index: 200; transition: transform 0.25s ease; }
        .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 199; }
        .logo { padding: 0 16px 20px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #1E1E2E; margin-bottom: 12px; }
        .logo-icon { width: 34px; height: 34px; background: linear-gradient(135deg,#6C63FF,#00D4FF); border-radius: 8px; display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0; }
        .logo-text { font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:700;color:#F0F0FF; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px; cursor: pointer; border-radius: 8px; margin: 2px 8px; color: #8B8BA7; font-size:13.5px;font-weight:500; transition: all 0.15s; }
        .nav-item:hover { background: rgba(108,99,255,0.1); color:#F0F0FF; }
        .nav-item.active { background: rgba(108,99,255,0.18); color:#6C63FF; }
        .nav-icon { width: 18px; text-align: center; flex-shrink: 0; }
        .sidebar-bottom { margin-top: auto; padding: 12px 8px 0; border-top: 1px solid #1E1E2E; }
        .main-content { flex: 1; margin-left: 220px; display: flex; flex-direction: column; min-height: 100vh; }
        .topbar { height: 56px; background: rgba(13,13,21,0.95); border-bottom: 1px solid #1E1E2E; display: flex; align-items: center; padding: 0 20px; gap: 12px; position: sticky; top: 0; z-index: 100; backdrop-filter: blur(10px); }
        .hamburger { display: none; background: none; border: none; color: #8B8BA7; cursor: pointer; padding: 4px; font-size: 20px; }
        .topbar-right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
        .streak-badge { display: flex; align-items: center; gap: 6px; background: rgba(255,179,71,0.12); border: 1px solid rgba(255,179,71,0.25); border-radius: 20px; padding: 4px 12px; font-size: 13px; color: #FFB347; font-weight: 600; }
        .avatar { width: 34px; height: 34px; background: linear-gradient(135deg,#6C63FF,#00D4FF); border-radius: 50%; display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;cursor:pointer;flex-shrink:0; }
        .page { padding: 24px 20px; max-width: 1100px; margin: 0 auto; width: 100%; animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity:0;transform:translateY(8px); } to { opacity:1;transform:translateY(0); } }
        .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; backdrop-filter: blur(10px); }
        .card-padded { padding: 20px; }
        .stat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
        .stat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 16px; }
        .stat-val { font-family:'Space Grotesk',sans-serif; font-size: 28px; font-weight: 700; }
        .stat-label { color: #8B8BA7; font-size: 12px; margin-top: 4px; }
        .progress-ring { position: relative; display: inline-flex; align-items: center; justify-content: center; }
        .week-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
        .week-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 16px; cursor: pointer; transition: transform 0.15s; border-top: 3px solid transparent; }
        .week-card:hover { transform: translateY(-2px); }
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-family:'Inter',sans-serif; font-size: 13.5px; font-weight: 600; transition: all 0.15s; }
        .btn-primary { background: linear-gradient(135deg,#6C63FF,#00D4FF); color: white; box-shadow: 0 0 20px rgba(108,99,255,0.35); }
        .btn-primary:hover { box-shadow: 0 0 28px rgba(108,99,255,0.5); transform: translateY(-1px); }
        .btn-ghost { background: rgba(255,255,255,0.06); color: #F0F0FF; border: 1px solid rgba(255,255,255,0.1); }
        .btn-ghost:hover { background: rgba(255,255,255,0.1); }
        .btn-danger { background: rgba(255,107,107,0.15); color: #FF6B6B; border: 1px solid rgba(255,107,107,0.3); }
        .day-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(72px,1fr)); gap: 8px; }
        .day-cell { aspect-ratio: 1; border-radius: 10px; display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;font-size:11px;font-weight:600;border:1px solid rgba(255,255,255,0.07);transition:all 0.15s;gap:3px; }
        .day-cell:hover { transform: scale(1.06); border-color: rgba(108,99,255,0.5); }
        .day-cell.not-started { background: rgba(255,255,255,0.03); color: #4A4A6A; }
        .day-cell.in-progress { background: rgba(255,179,71,0.12); border-color: rgba(255,179,71,0.3); color: #FFB347; }
        .day-cell.completed { background: rgba(0,200,150,0.12); border-color: rgba(0,200,150,0.3); color: #00C896; }
        .day-cell.review { background: rgba(108,99,255,0.12); border-color: rgba(108,99,255,0.3); color: #6C63FF; }
        .day-cell.today { box-shadow: 0 0 0 2px #6C63FF; }
        .section-title { font-family:'Space Grotesk',sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 14px; }
        .tag { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; background: rgba(108,99,255,0.15); color: #6C63FF; border: 1px solid rgba(108,99,255,0.25); }
        .tag-mirror { background: rgba(0,200,150,0.12); color: #00C896; border-color: rgba(0,200,150,0.25); }
        .tag-record { background: rgba(255,107,107,0.12); color: #FF6B6B; border-color: rgba(255,107,107,0.25); }
        .tag-review { background: rgba(108,99,255,0.12); color: #a89bff; border-color: rgba(108,99,255,0.25); }
        .day-hero { background: linear-gradient(135deg,rgba(108,99,255,0.12),rgba(0,212,255,0.06)); border: 1px solid rgba(108,99,255,0.2); border-radius: 14px; padding: 24px; margin-bottom: 20px; }
        .section-card { border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; overflow: hidden; margin-bottom: 16px; }
        .section-header { display: flex; align-items: center; gap: 12px; padding: 16px 20px; background: rgba(255,255,255,0.03); cursor: pointer; }
        .section-body { padding: 20px; }
        .key-point { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13.5px; color: #c8c8e8; }
        .software-example { background: rgba(108,99,255,0.08); border-left: 3px solid #6C63FF; border-radius: 0 8px 8px 0; padding: 14px 16px; margin-top: 14px; font-size: 13px; color: #c8c8e8; line-height: 1.7; }
        .exercise-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13.5px; }
        .exercise-num { width: 24px; height: 24px; border-radius: 50%; background: rgba(108,99,255,0.2); display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#6C63FF;flex-shrink:0;margin-top:1px; }
        .reflection-q { padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13.5px; color: #c8c8e8; }
        .rating-stars { display: flex; gap: 8px; }
        .star { font-size: 22px; cursor: pointer; transition: transform 0.1s; color: #2a2a3e; }
        .star.active { color: #FFB347; }
        .star:hover { transform: scale(1.2); }
        textarea { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #F0F0FF; padding: 12px; font-family: 'Inter',sans-serif; font-size: 13.5px; resize: vertical; width: 100%; outline: none; transition: border-color 0.15s; }
        textarea:focus { border-color: rgba(108,99,255,0.5); }
        input[type=text],input[type=email],input[type=password] { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #F0F0FF; padding: 10px 14px; font-family:'Inter',sans-serif; font-size: 14px; outline: none; transition: border-color 0.15s; width: 100%; }
        input:focus { border-color: rgba(108,99,255,0.5); }
        .video-card { background: rgba(0,0,0,0.4); border-radius: 10px; overflow: hidden; cursor: pointer; transition: transform 0.15s; border: 1px solid rgba(255,255,255,0.07); }
        .video-card:hover { transform: translateY(-2px); }
        .video-thumb { background: linear-gradient(135deg,#1a1a2e,#16213e); height: 100px; display:flex;align-items:center;justify-content:center;position:relative; }
        .play-btn { width: 42px; height: 42px; background: rgba(255,255,255,0.15); border-radius: 50%; display:flex;align-items:center;justify-content:center; font-size: 16px; backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.2); }
        .video-info { padding: 10px 12px; }
        .note-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 16px; margin-bottom: 10px; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 500; display:flex;align-items:center;justify-content:center;padding: 20px; }
        .modal { background: #12121A; border: 1px solid #1E1E2E; border-radius: 16px; padding: 28px; max-width: 480px; width: 100%; }
        .mini-bar { height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; margin-top: 8px; }
        .mini-bar-fill { height: 100%; border-radius: 2px; transition: width 0.4s ease; }
        .continue-card { background: linear-gradient(135deg,rgba(108,99,255,0.12),rgba(0,212,255,0.06)); border: 1px solid rgba(108,99,255,0.25); border-radius: 14px; padding: 20px; display:flex;align-items:center;gap:16px;cursor:pointer;transition:all 0.2s; }
        .continue-card:hover { box-shadow: 0 0 20px rgba(108,99,255,0.2); transform: translateY(-2px); }
        .auth-page { min-height: 100vh; display:flex;align-items:center;justify-content:center;background:#0A0A0F;padding:20px; }
        .auth-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 36px; width: 100%; max-width: 400px; }
        .auth-title { font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:700;margin-bottom:6px; }
        .auth-sub { color:#8B8BA7;font-size:13.5px;margin-bottom:28px; }
        .form-group { margin-bottom: 16px; }
        .form-label { display:block;font-size:12px;font-weight:600;color:#8B8BA7;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px; }
        .error-msg { color:#FF6B6B;font-size:12.5px;margin-top:6px; }
        .auth-switch { text-align:center;margin-top:20px;font-size:13.5px;color:#8B8BA7; }
        .auth-switch span { color:#6C63FF;cursor:pointer;font-weight:600; }
        .back-btn { display:inline-flex;align-items:center;gap:8px;color:#8B8BA7;cursor:pointer;font-size:13.5px;margin-bottom:20px;transition:color 0.15s; }
        .back-btn:hover { color:#F0F0FF; }
        .divider { display:flex;align-items:center;gap:12px;margin:24px 0; }
        .divider-line { flex:1;height:1px;background:rgba(255,255,255,0.07); }
        .divider-text { font-size:11.5px;color:#4A4A6A; }
        .radar-container { display:flex;justify-content:center;padding:20px 0; }
        .current-day-badge { display:inline-flex;align-items:center;gap:6px;background:rgba(108,99,255,0.15);border:1px solid rgba(108,99,255,0.3);border-radius:20px;padding:4px 12px;font-size:12px;color:#6C63FF;font-weight:600;margin-bottom:12px; }
        .activity-item { display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.04); }
        .activity-dot { width:8px;height:8px;border-radius:50%;background:#00C896;flex-shrink:0; }
        .search-input { background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#F0F0FF;padding:10px 14px 10px 38px;width:100%;font-family:'Inter',sans-serif;font-size:13.5px;outline:none;transition:border-color 0.15s; }
        .search-input:focus { border-color:rgba(108,99,255,0.5); }
        .search-wrap { position:relative; }
        .search-icon { position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#4A4A6A; }
        .progress-complete-banner { background:linear-gradient(135deg,rgba(0,200,150,0.15),rgba(0,212,255,0.08));border:1px solid rgba(0,200,150,0.3);border-radius:12px;padding:16px 20px;display:flex;align-items:center;gap:14px;margin-top:16px; }
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
          .sidebar-overlay { display: block; }
          .main-content { margin-left: 0; }
          .hamburger { display: flex; }
          .stat-grid { grid-template-columns: repeat(2,1fr); }
          .week-grid { grid-template-columns: repeat(2,1fr); }
          .day-grid { grid-template-columns: repeat(5,1fr); }
          .page { padding: 16px 14px; }
          .topbar { padding: 0 14px; }
        }
        @media (max-width: 420px) {
          .day-grid { grid-template-columns: repeat(4,1fr); }
          .stat-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; } }
      `}</style>

      <div className="app-shell">
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

        <nav className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="logo">
            <div className="logo-icon">🗣️</div>
            <div className="logo-text">SpeakUp 30</div>
          </div>
          {[
            { id: "dashboard", icon: "🏠", label: "Dashboard" },
            { id: "plan", icon: "📅", label: "My Plan" },
            { id: "progress", icon: "📊", label: "Progress" },
            { id: "notes", icon: "📝", label: "Notes" },
          ].map(item => (
            <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => { setPage(item.id); setSidebarOpen(false); }}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </div>
          ))}
          <div className="sidebar-bottom">
            <div className="nav-item" onClick={() => { setShowSettings(true); setSidebarOpen(false); }}>
              <span className="nav-icon">⚙️</span>Settings
            </div>
            <div className="nav-item" onClick={handleLogout}>
              <span className="nav-icon">🚪</span>Logout
            </div>
          </div>
        </nav>

        <div className="main-content">
          <header className="topbar">
            <button className="hamburger" onClick={() => setSidebarOpen(o => !o)}>☰</button>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: "#F0F0FF" }}>
              {page === "dashboard" ? "Dashboard" : page === "plan" ? "My 30-Day Plan" : page === "progress" ? "Progress Tracker" : page === "notes" ? "My Notes" : "Day Detail"}
            </div>
            <div className="topbar-right">
              <div className="streak-badge">🔥 {stats?.currentStreak || 0} day streak</div>
              <div className="avatar" title={user?.name}>{user?.name?.charAt(0)?.toUpperCase() || "U"}</div>
            </div>
          </header>

          <div className="page">
            {page === "dashboard" && <DashboardPage user={user} stats={stats} progress={progress} currentDay={currentDay} onSelectDay={d => { setSelectedDay(d); setPage("day"); }} onGoToPlan={() => setPage("plan")} />}
            {page === "plan" && <PlanPage progress={progress} currentDay={currentDay} onSelectDay={d => { setSelectedDay(d); setPage("day"); }} />}
            {page === "progress" && <ProgressPage progress={progress} currentDay={currentDay} onSelectDay={d => { setSelectedDay(d); setPage("day"); }} session={session} />}
            {page === "notes" && <NotesPage progress={progress} session={session} onRefresh={refresh} />}
            {page === "day" && selectedDay && <DayPage day={selectedDay} progress={progress} session={session} onBack={() => setPage(selectedDay._from || "plan")} onComplete={markDayComplete} onRefresh={refresh} />}
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowSettings(false)}>
          <div className="modal">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18 }}>⚙️ Settings</h3>
              <button className="btn btn-ghost" style={{ padding: "6px 12px" }} onClick={() => setShowSettings(false)}>✕</button>
            </div>
            <div className="form-group">
              <label className="form-label">Anthropic API Key (for AI Coach)</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input type={showApiKey ? "text" : "password"} value={settingsApiKey} onChange={e => setSettingsApiKey(e.target.value)} placeholder="sk-ant-..." />
                <button className="btn btn-ghost" style={{ padding: "8px 12px", flexShrink: 0 }} onClick={() => setShowApiKey(s => !s)}>{showApiKey ? "🙈" : "👁️"}</button>
              </div>
              <div style={{ fontSize: 12, color: "#4A4A6A", marginTop: 6 }}>Stored locally in your browser. Never sent to our servers.</div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button className="btn btn-primary" onClick={() => { setStorage("comm_api_key", settingsApiKey); setShowSettings(false); }}>Save Settings</button>
              {!resetConfirm ? (
                <button className="btn btn-danger" onClick={() => setResetConfirm(true)}>Reset Progress</button>
              ) : (
                <button className="btn btn-danger" onClick={() => { setStorage(`comm_progress_${session}`, {}); setStorage(`comm_streak_${session}`, {}); setResetConfirm(false); setShowSettings(false); refresh(); }}>Confirm Reset</button>
              )}
            </div>
            <div style={{ marginTop: 20, padding: 14, background: "rgba(255,255,255,0.03)", borderRadius: 8, fontSize: 12, color: "#4A4A6A", lineHeight: 1.6 }}>
              <b style={{ color: "#8B8BA7" }}>SpeakUp 30</b> — 30-Day English Communication Training for Software Developers. All data stored locally in your browser.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CircleProgress({ percent, size = 80, stroke = 6, color = "#6C63FF" }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 0.6s ease" }} />
    </svg>
  );
}

function DashboardPage({ user, stats, progress, currentDay, onSelectDay, onGoToPlan }) {
  const completed = stats?.completed || 0;
  const pct = Math.round((completed / 30) * 100);
  const recentCompleted = DAYS_DATA.filter(d => progress[d.day]?.completed).slice(-3).reverse();
  const weekStats = [1,2,3,4].map(w => {
    const wDays = DAYS_DATA.filter(d => d.week === w);
    const wCompleted = wDays.filter(d => progress[d.day]?.completed).length;
    return { week: w, total: wDays.length, completed: wCompleted, pct: Math.round((wCompleted / wDays.length) * 100) };
  });
  const todayDay = DAYS_DATA[currentDay - 1];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div className="current-day-badge">Day {currentDay} of 30</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>{getTimeGreeting()}, {user?.name?.split(" ")[0]}! 👋</h1>
        <p style={{ color: "#8B8BA7", fontSize: 14 }}>Ready to build your communication skills today?</p>
      </div>

      <div className="stat-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-val" style={{ color: "#6C63FF" }}>{completed}</div>
          <div className="stat-label">Days Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-val" style={{ color: "#FFB347" }}>🔥 {stats?.currentStreak || 0}</div>
          <div className="stat-label">Current Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-val" style={{ color: "#00C896" }}>{stats?.avgRating || "–"}</div>
          <div className="stat-label">Avg Self-Rating</div>
        </div>
        <div className="stat-card">
          <div className="stat-val" style={{ color: "#00D4FF" }}>{stats?.notes || 0}</div>
          <div className="stat-label">Notes Written</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, marginBottom: 20, alignItems: "start" }}>
        {todayDay && (
          <div className="continue-card" onClick={() => onSelectDay({ ...todayDay, _from: "dashboard" })}>
            <div style={{ width: 46, height: 46, borderRadius: 10, background: `linear-gradient(135deg,${WEEK_COLORS[todayDay.week]},rgba(255,255,255,0.1))`, display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>
              {todayDay.isMirrorDay ? "🪞" : todayDay.isRecordDay ? "🎙️" : todayDay.isReviewDay ? "📋" : "🗣️"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "#8B8BA7", marginBottom: 2 }}>CONTINUE TODAY</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16 }}>Day {todayDay.day}: {todayDay.title}</div>
              <div style={{ fontSize: 12, color: "#8B8BA7", marginTop: 2 }}>{todayDay.goal}</div>
            </div>
            <div className="btn btn-primary" style={{ flexShrink: 0 }}>Start →</div>
          </div>
        )}
        <div style={{ textAlign: "center" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <CircleProgress percent={pct} size={88} stroke={7} />
            <div style={{ position: "absolute", inset: 0, display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column" }}>
              <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:18 }}>{pct}%</span>
              <span style={{ fontSize:9, color:"#8B8BA7" }}>done</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-title">Week Overview</div>
      <div className="week-grid" style={{ marginBottom: 20 }}>
        {weekStats.map(w => (
          <div key={w.week} className="week-card" style={{ borderTopColor: WEEK_COLORS[w.week] }} onClick={onGoToPlan}>
            <div style={{ fontSize: 11, color: "#8B8BA7", marginBottom: 2 }}>WEEK {w.week}</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:13, marginBottom:6 }}>{WEEK_LABELS[w.week]}</div>
            <div className="mini-bar"><div className="mini-bar-fill" style={{ width: `${w.pct}%`, background: WEEK_COLORS[w.week] }} /></div>
            <div style={{ fontSize:11, color:"#8B8BA7", marginTop:4 }}>{w.completed}/{w.total} days</div>
          </div>
        ))}
      </div>

      {recentCompleted.length > 0 && (
        <>
          <div className="section-title">Recent Activity</div>
          <div className="card card-padded">
            {recentCompleted.map(d => (
              <div key={d.day} className="activity-item">
                <div className="activity-dot" />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600, fontSize: 13.5 }}>Day {d.day}: {d.title}</span>
                  <span style={{ color: "#8B8BA7", fontSize: 12, marginLeft: 10 }}>{progress[d.day]?.rating ? `★ ${progress[d.day].rating}/5` : ""}</span>
                </div>
                <div style={{ color: "#00C896", fontSize: 12 }}>✓ Complete</div>
              </div>
            ))}
          </div>
        </>
      )}

      {completed === 30 && (
        <div className="progress-complete-banner">
          <span style={{ fontSize: 28 }}>🎉</span>
          <div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:16,color:"#00C896" }}>Congratulations! You completed all 30 days!</div>
            <div style={{ fontSize:13,color:"#8B8BA7",marginTop:3 }}>Keep practicing daily to maintain your communication skills.</div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlanPage({ progress, currentDay, onSelectDay }) {
  return (
    <div>
      <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:22, fontWeight:700, marginBottom:6 }}>📅 Your 30-Day Plan</h2>
      <p style={{ color:"#8B8BA7", fontSize:14, marginBottom:20 }}>Click any day to open its learning content.</p>
      {[1,2,3,4].map(week => {
        const wDays = DAYS_DATA.filter(d => d.week === week);
        const wCompleted = wDays.filter(d => progress[d.day]?.completed).length;
        return (
          <div key={week} style={{ marginBottom: 24 }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>
              <div style={{ width:4,height:28,borderRadius:2,background:WEEK_COLORS[week] }} />
              <div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:16 }}>Week {week} — {WEEK_LABELS[week]}</div>
                <div style={{ fontSize:12,color:"#8B8BA7" }}>{wCompleted}/{wDays.length} completed</div>
              </div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10 }}>
              {wDays.map(day => {
                const done = progress[day.day]?.completed;
                const isToday = day.day === currentDay;
                return (
                  <div key={day.day} onClick={() => onSelectDay({ ...day, _from: "plan" })} style={{ background:"rgba(255,255,255,0.03)",border:`1px solid ${isToday ? WEEK_COLORS[week] : "rgba(255,255,255,0.07)"}`,borderRadius:10,padding:"12px 14px",cursor:"pointer",transition:"all 0.15s",borderLeft:`3px solid ${WEEK_COLORS[week]}` }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                    onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.03)"}>
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                      <span style={{ fontSize:11,color:"#8B8BA7",fontWeight:600 }}>DAY {day.day}</span>
                      {done && <span style={{ color:"#00C896",fontSize:11 }}>✓ Done</span>}
                      {isToday && !done && <span style={{ color:WEEK_COLORS[week],fontSize:11,fontWeight:700 }}>● Today</span>}
                      {day.isMirrorDay && <span className="tag tag-mirror" style={{ fontSize:10,padding:"1px 7px" }}>Mirror</span>}
                      {day.isRecordDay && <span className="tag tag-record" style={{ fontSize:10,padding:"1px 7px" }}>Record</span>}
                      {day.isReviewDay && <span className="tag tag-review" style={{ fontSize:10,padding:"1px 7px" }}>Review</span>}
                    </div>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:14 }}>{day.title}</div>
                    <div style={{ fontSize:12,color:"#8B8BA7",marginTop:2 }}>{day.goal}</div>
                    {done && progress[day.day]?.rating && (
                      <div style={{ marginTop:6,fontSize:11,color:"#FFB347" }}>{"★".repeat(progress[day.day].rating)}{"☆".repeat(5 - progress[day.day].rating)} {progress[day.day].rating}/5</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProgressPage({ progress, currentDay, onSelectDay, session }) {
  const stats = computeStats(session);
  const allRatings = Object.values(progress).filter(d => d.rating).map(d => d.rating);
  const radarSkills = [
    { name: "Confidence", val: allRatings.length ? Math.min(10, Math.round(allRatings.reduce((a,b)=>a+b,0)/allRatings.length * 2)) : 2 },
    { name: "Fluency", val: stats.completed > 0 ? Math.min(10, Math.round(stats.completed / 3)) : 1 },
    { name: "Pronunciation", val: Math.min(10, Math.round(stats.completed / 3.5)) },
    { name: "Grammar", val: Math.min(10, Math.round(stats.completed / 4)) },
    { name: "Eye Contact", val: Math.min(10, Math.round(DAYS_DATA.filter(d=>d.isMirrorDay&&progress[d.day]?.completed).length * 3)) },
    { name: "Presentation", val: Math.min(10, Math.round(DAYS_DATA.filter(d=>d.week===4&&progress[d.day]?.completed).length * 1.2)) },
  ];

  const QUOTES = [
    "The more you speak, the more fluent you become.",
    "Confidence is not 'they will like me'. It's 'I'll be fine if they don't'.",
    "Your accent is part of your identity. Your fluency is what you practice.",
    "Every great speaker was once a terrible speaker.",
    "Communication is the most important skill you can learn.",
  ];
  const todayQuote = QUOTES[new Date().getDate() % QUOTES.length];

  function exportProgress() {
    const lines = ["SpeakUp 30 — Progress Report", `Generated: ${new Date().toLocaleDateString()}`, "", `Days Completed: ${stats.completed}/30`, `Average Rating: ${stats.avgRating}/5`, `Current Streak: ${stats.currentStreak} days`, ""];
    DAYS_DATA.forEach(d => {
      const p = progress[d.day];
      if (p?.completed) {
        lines.push(`✓ Day ${d.day}: ${d.title} — Rating: ${p.rating || "–"}/5`);
        if (p.notes) lines.push(`  Notes: ${p.notes}`);
      }
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "speakup30-progress.txt";
    a.click();
  }

  return (
    <div>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:20 }}>
        <div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700,marginBottom:4 }}>📊 Progress Tracker</h2>
          <p style={{ color:"#8B8BA7",fontSize:14 }}>"{todayQuote}"</p>
        </div>
        <button className="btn btn-ghost" onClick={exportProgress}>⬇️ Export</button>
      </div>

      <div className="stat-grid" style={{ marginBottom:20 }}>
        <div className="stat-card"><div className="stat-val" style={{ color:"#6C63FF" }}>{stats.completed}/30</div><div className="stat-label">Days Done</div></div>
        <div className="stat-card"><div className="stat-val" style={{ color:"#FFB347" }}>🔥 {stats.currentStreak}</div><div className="stat-label">Current Streak</div></div>
        <div className="stat-card"><div className="stat-val" style={{ color:"#00C896" }}>{stats.avgRating || "–"}</div><div className="stat-label">Avg Rating</div></div>
        <div className="stat-card"><div className="stat-val" style={{ color:"#00D4FF" }}>{Math.round((stats.completed/30)*100)}%</div><div className="stat-label">Completion</div></div>
      </div>

      <div className="section-title">30-Day Grid</div>
      <div className="card card-padded" style={{ marginBottom:20 }}>
        <div className="day-grid">
          {DAYS_DATA.map(day => {
            const done = progress[day.day]?.completed;
            const isToday = day.day === currentDay;
            let cls = "day-cell not-started";
            if (done && day.isReviewDay) cls = "day-cell review";
            else if (done) cls = "day-cell completed";
            else if (isToday) cls = "day-cell in-progress";
            if (isToday) cls += " today";
            return (
              <div key={day.day} className={cls} onClick={() => onSelectDay({ ...day, _from: "progress" })} title={`Day ${day.day}: ${day.title}`}>
                <span style={{ fontSize:13,fontWeight:700 }}>{day.day}</span>
                {done && <span style={{ fontSize:8 }}>{progress[day.day]?.rating ? "★".repeat(progress[day.day].rating) : "✓"}</span>}
                {isToday && !done && <span style={{ fontSize:8 }}>today</span>}
              </div>
            );
          })}
        </div>
        <div style={{ display:"flex",gap:16,marginTop:14,flexWrap:"wrap" }}>
          {[["not-started","#4A4A6A","Not Started"],["in-progress","#FFB347","Today"],["completed","#00C896","Completed"],["review","#6C63FF","Review Day"]].map(([,color,label]) => (
            <div key={label} style={{ display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#8B8BA7" }}>
              <div style={{ width:10,height:10,borderRadius:3,background:color }} />{label}
            </div>
          ))}
        </div>
      </div>

      <div className="section-title">Weekly Breakdown</div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:20 }}>
        {[1,2,3,4].map(w => {
          const wDays = DAYS_DATA.filter(d => d.week === w);
          const wComp = wDays.filter(d => progress[d.day]?.completed).length;
          const wRatings = wDays.filter(d=>progress[d.day]?.rating).map(d=>progress[d.day].rating);
          const wAvg = wRatings.length ? (wRatings.reduce((a,b)=>a+b,0)/wRatings.length).toFixed(1) : "–";
          const pct = Math.round((wComp/wDays.length)*100);
          return (
            <div key={w} className="card card-padded" style={{ borderTop:`3px solid ${WEEK_COLORS[w]}` }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:15,marginBottom:4 }}>Week {w}</div>
              <div style={{ fontSize:12,color:"#8B8BA7",marginBottom:8 }}>{WEEK_LABELS[w]}</div>
              <div className="mini-bar" style={{ marginBottom:6 }}><div className="mini-bar-fill" style={{ width:`${pct}%`,background:WEEK_COLORS[w] }} /></div>
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,color:"#8B8BA7" }}>
                <span>{wComp}/{wDays.length} days</span>
                <span>★ {wAvg}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="section-title">Skill Progress</div>
      <div className="card card-padded">
        {radarSkills.map(skill => (
          <div key={skill.name} style={{ marginBottom:12 }}>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:5 }}>
              <span style={{ color:"#c8c8e8" }}>{skill.name}</span>
              <span style={{ color:"#6C63FF",fontWeight:600 }}>{skill.val}/10</span>
            </div>
            <div className="mini-bar" style={{ height:7 }}>
              <div className="mini-bar-fill" style={{ width:`${skill.val*10}%`,background:"linear-gradient(90deg,#6C63FF,#00D4FF)" }} />
            </div>
          </div>
        ))}
        <p style={{ fontSize:12,color:"#4A4A6A",marginTop:10 }}>Based on days completed and your self-ratings.</p>
      </div>
    </div>
  );
}

function NotesPage({ progress, session, onRefresh }) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState("");

  const notes = useMemo(() => {
    return DAYS_DATA.filter(d => {
      const n = progress[d.day]?.notes;
      return n && n.trim();
    }).map(d => ({
      day: d.day, title: d.title, note: progress[d.day].notes, completedAt: progress[d.day].completedAt
    })).filter(n => !search || n.note.toLowerCase().includes(search.toLowerCase()) || n.title.toLowerCase().includes(search.toLowerCase()));
  }, [progress, search]);

  function saveEdit(dayNum) {
    const p = getProgress(session);
    if (!p[dayNum]) return;
    p[dayNum].notes = editVal;
    setProgress(session, p);
    setEditing(null);
    onRefresh();
  }

  function deleteNote(dayNum) {
    const p = getProgress(session);
    if (p[dayNum]) { p[dayNum].notes = ""; setProgress(session, p); onRefresh(); }
  }

  function exportNotes() {
    const lines = ["SpeakUp 30 — My Notes", `Exported: ${new Date().toLocaleDateString()}`, ""];
    notes.forEach(n => { lines.push(`--- Day ${n.day}: ${n.title} ---`); lines.push(n.note); lines.push(""); });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "speakup30-notes.txt"; a.click();
  }

  return (
    <div>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:20 }}>
        <div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700,marginBottom:4 }}>📝 My Notes</h2>
          <p style={{ color:"#8B8BA7",fontSize:14 }}>{notes.length} note{notes.length !== 1 ? "s" : ""} across your journey</p>
        </div>
        <button className="btn btn-ghost" onClick={exportNotes}>⬇️ Export Notes</button>
      </div>
      <div className="search-wrap" style={{ marginBottom:16 }}>
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder="Search your notes..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      {notes.length === 0 && (
        <div className="card card-padded" style={{ textAlign:"center",padding:40,color:"#4A4A6A" }}>
          <div style={{ fontSize:32,marginBottom:10 }}>📝</div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:16,marginBottom:6,color:"#8B8BA7" }}>No notes yet</div>
          <div style={{ fontSize:13 }}>Complete a day and write notes in the Challenge section.</div>
        </div>
      )}
      {notes.map(n => (
        <div key={n.day} className="note-card">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
              <span style={{ background:"rgba(108,99,255,0.15)",color:"#6C63FF",borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:700 }}>Day {n.day}</span>
              <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:14 }}>{n.title}</span>
            </div>
            <div style={{ display:"flex",gap:8 }}>
              <button className="btn btn-ghost" style={{ padding:"4px 10px",fontSize:11 }} onClick={() => { setEditing(n.day); setEditVal(n.note); }}>Edit</button>
              <button className="btn btn-danger" style={{ padding:"4px 10px",fontSize:11 }} onClick={() => deleteNote(n.day)}>Delete</button>
            </div>
          </div>
          {editing === n.day ? (
            <div>
              <textarea rows={4} value={editVal} onChange={e => setEditVal(e.target.value)} />
              <div style={{ display:"flex",gap:8,marginTop:8 }}>
                <button className="btn btn-primary" style={{ padding:"6px 14px",fontSize:12 }} onClick={() => saveEdit(n.day)}>Save</button>
                <button className="btn btn-ghost" style={{ padding:"6px 14px",fontSize:12 }} onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <p style={{ fontSize:13.5,color:"#c8c8e8",lineHeight:1.7 }}>{n.note}</p>
          )}
          {n.completedAt && <div style={{ fontSize:11,color:"#4A4A6A",marginTop:8 }}>{new Date(n.completedAt).toLocaleDateString()}</div>}
        </div>
      ))}
    </div>
  );
}

function DayPage({ day, progress, session, onBack, onComplete, onRefresh }) {
  const saved = progress[day.day] || {};
  const [rating, setRating] = useState(saved.rating || 0);
  const [notes, setNotes] = useState(saved.notes || "");
  const [conceptRead, setConceptRead] = useState(saved.conceptRead || false);
  const [exDone, setExDone] = useState(saved.exercisesDone || []);
  const [challengeDone, setChallengeDone] = useState(saved.challengeDone || false);
  const [saved2, setSaved2] = useState(false);

  function toggleEx(i) {
    setExDone(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  }

  function handleSave() {
    const p = getProgress(session);
    p[day.day] = { ...p[day.day], conceptRead, exercisesDone: exDone, challengeDone, rating, notes, completed: rating > 0, completedAt: Date.now() };
    setProgress(session, p);
    if (rating > 0) onComplete(day.day, rating, notes);
    setSaved2(true);
    setTimeout(() => setSaved2(false), 2000);
    onRefresh();
  }

  const weekColor = WEEK_COLORS[day.week];
  const ytQuery = encodeURIComponent(day.youtubeSearchQuery);
  const videoTitles = [`${day.title} Tips`, `${day.concept.title}`, `Interview Communication: ${day.title}`];

  return (
    <div>
      <div className="back-btn" onClick={onBack}>← Back</div>

      <div className="day-hero" style={{ borderColor: `${weekColor}33` }}>
        <div style={{ display:"flex",gap:10,flexWrap:"wrap",marginBottom:12 }}>
          <span style={{ background:`${weekColor}22`,color:weekColor,borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:700 }}>Day {day.day}</span>
          <span style={{ background:"rgba(255,255,255,0.05)",color:"#8B8BA7",borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:600 }}>Week {day.week} — {WEEK_LABELS[day.week]}</span>
          {day.isMirrorDay && <span className="tag tag-mirror">🪞 Mirror Day</span>}
          {day.isRecordDay && <span className="tag tag-record">🎙️ Record Day</span>}
          {day.isReviewDay && <span className="tag tag-review">📋 Review Day</span>}
        </div>
        <h1 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:24,fontWeight:700,marginBottom:6 }}>{day.title}</h1>
        <p style={{ color:"#8B8BA7",fontSize:14 }}>🎯 {day.goal}</p>
        <div style={{ display:"flex",gap:8,marginTop:12,flexWrap:"wrap" }}>
          {day.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>

      {/* CONCEPT */}
      <div className="section-card">
        <div className="section-header">
          <span style={{ fontSize:20 }}>🧠</span>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:15 }}>{day.concept.title}</div>
            <div style={{ fontSize:12,color:"#8B8BA7" }}>⏱ {day.concept.duration} — Concept</div>
          </div>
          {conceptRead && <span style={{ color:"#00C896",fontSize:13,fontWeight:600 }}>✓ Read</span>}
        </div>
        <div className="section-body">
          <p style={{ fontSize:14,lineHeight:1.8,color:"#c8c8e8",marginBottom:14 }}>{day.concept.content}</p>
          <div style={{ marginBottom:14 }}>
            {day.concept.keyPoints.map((kp,i) => (
              <div key={i} className="key-point">
                <span style={{ color:weekColor,fontWeight:700,flexShrink:0 }}>•</span>
                <span>{kp}</span>
              </div>
            ))}
          </div>
          <div className="software-example">
            <div style={{ fontSize:11,color:"#6C63FF",fontWeight:700,marginBottom:6 }}>💡 SOFTWARE EXAMPLE</div>
            {day.concept.softwareExample}
          </div>
          <button className={`btn ${conceptRead ? "btn-ghost" : "btn-primary"}`} style={{ marginTop:16 }} onClick={() => setConceptRead(true)}>
            {conceptRead ? "✓ Marked as Read" : "Mark as Read"}
          </button>
        </div>
      </div>

      {/* PRACTICE */}
      <div className="section-card">
        <div className="section-header">
          <span style={{ fontSize:20 }}>💪</span>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:15 }}>Practice Exercises</div>
            <div style={{ fontSize:12,color:"#8B8BA7" }}>⏱ {day.practice.duration} — {day.practice.title}</div>
          </div>
          <div style={{ fontSize:12,color:"#8B8BA7" }}>{exDone.length}/{day.practice.exercises.length}</div>
        </div>
        <div className="section-body">
          <div className="mini-bar" style={{ marginBottom:14 }}>
            <div className="mini-bar-fill" style={{ width:`${(exDone.length/day.practice.exercises.length)*100}%`,background:"linear-gradient(90deg,#6C63FF,#00D4FF)" }} />
          </div>
          {day.practice.exercises.map((ex,i) => (
            <div key={i} className="exercise-item" onClick={() => toggleEx(i)} style={{ cursor:"pointer" }}>
              <div style={{ width:22,height:22,borderRadius:5,border:`2px solid ${exDone.includes(i)?"#00C896":"rgba(255,255,255,0.15)"}`,background:exDone.includes(i)?"rgba(0,200,150,0.15)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,transition:"all 0.15s" }}>
                {exDone.includes(i) && <span style={{ color:"#00C896",fontSize:13 }}>✓</span>}
              </div>
              <span style={{ flex:1,color:exDone.includes(i)?"#8B8BA7":"#c8c8e8",textDecoration:exDone.includes(i)?"line-through":"none" }}>{ex}</span>
            </div>
          ))}
          <div style={{ marginTop:16 }}>
            <div style={{ fontSize:12,color:"#8B8BA7",marginBottom:6,fontWeight:600 }}>📝 Speak it out, then type what you said:</div>
            <textarea rows={3} placeholder="Type what you said during practice..." value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
        </div>
      </div>

      {/* CHALLENGE */}
      <div className="section-card">
        <div className="section-header">
          <span style={{ fontSize:20 }}>🔥</span>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:15 }}>Challenge</div>
            <div style={{ fontSize:12,color:"#8B8BA7" }}>⏱ {day.challenge.duration}</div>
          </div>
        </div>
        <div className="section-body">
          <div style={{ background:"rgba(255,179,71,0.08)",border:"1px solid rgba(255,179,71,0.2)",borderRadius:10,padding:14,marginBottom:16 }}>
            <div style={{ fontSize:11,color:"#FFB347",fontWeight:700,marginBottom:6 }}>YOUR CHALLENGE</div>
            <p style={{ fontSize:14,color:"#F0F0FF",lineHeight:1.7 }}>{day.challenge.task}</p>
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:12,color:"#8B8BA7",fontWeight:600,marginBottom:8 }}>Reflection Questions:</div>
            {day.challenge.reflectionQuestions.map((q,i) => (
              <div key={i} className="reflection-q">
                <span style={{ color:"#6C63FF",marginRight:8 }}>→</span>{q}
              </div>
            ))}
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:12,color:"#8B8BA7",fontWeight:600,marginBottom:8 }}>Rate yourself for today:</div>
            <div className="rating-stars">
              {[1,2,3,4,5].map(s => (
                <span key={s} className={`star ${rating >= s ? "active" : ""}`} onClick={() => setRating(s)}>★</span>
              ))}
              {rating > 0 && <span style={{ color:"#8B8BA7",fontSize:13,marginLeft:6 }}>{rating}/5</span>}
            </div>
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:12,color:"#8B8BA7",fontWeight:600,marginBottom:6 }}>Notes for this day:</div>
            <textarea rows={3} placeholder="Write your reflections, what you improved, what needs work..." value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
          <button className="btn btn-primary" onClick={handleSave}>
            {saved2 ? "✓ Saved!" : "Save Progress"}
          </button>
          {saved.completed && <span style={{ marginLeft:12,color:"#00C896",fontSize:13 }}>✓ Day completed</span>}
        </div>
      </div>

      {/* VIDEO RESOURCES */}
      <div style={{ marginBottom:20 }}>
        <div className="section-title">📺 Video Resources</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12 }}>
          {videoTitles.map((title,i) => (
            <a key={i} href={`https://www.youtube.com/results?search_query=${ytQuery}`} target="_blank" rel="noopener noreferrer" className="video-card" style={{ textDecoration:"none" }}>
              <div className="video-thumb" style={{ background:`linear-gradient(135deg,${weekColor}22,#12121A)` }}>
                <div className="play-btn">▶</div>
              </div>
              <div className="video-info">
                <div style={{ fontSize:12.5,fontWeight:600,color:"#F0F0FF",lineHeight:1.4,marginBottom:4 }}>{title}</div>
                <div style={{ fontSize:11,color:"#8B8BA7" }}>Search on YouTube →</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuthPage({ authMode, setAuthMode, authForm, setAuthForm, authError, handleLogin, handleSignup }) {
  const update = field => e => setAuthForm(f => ({ ...f, [field]: e.target.value }));
  return (
    <div className="auth-page">
      <div className="auth-box">
        <div style={{ textAlign:"center",marginBottom:24 }}>
          <div style={{ width:52,height:52,background:"linear-gradient(135deg,#6C63FF,#00D4FF)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 12px" }}>🗣️</div>
          <div className="auth-title">{authMode === "login" ? "Welcome back" : "Start your journey"}</div>
          <div className="auth-sub">{authMode === "login" ? "Log in to continue your 30-day plan" : "30 days to confident English communication"}</div>
        </div>
        <form onSubmit={authMode === "login" ? handleLogin : handleSignup}>
          {authMode === "signup" && (
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input type="text" placeholder="e.g. Sameer" value={authForm.name} onChange={update("name")} />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" placeholder="you@email.com" value={authForm.email} onChange={update("email")} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" placeholder={authMode === "signup" ? "Min. 8 characters" : "Enter your password"} value={authForm.password} onChange={update("password")} />
          </div>
          {authMode === "signup" && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input type="password" placeholder="Repeat your password" value={authForm.confirm} onChange={update("confirm")} />
            </div>
          )}
          {authError && <div className="error-msg">{authError}</div>}
          <button type="submit" className="btn btn-primary" style={{ width:"100%",justifyContent:"center",marginTop:8,padding:"13px" }}>
            {authMode === "login" ? "Log In →" : "Create Account →"}
          </button>
        </form>
        <div className="auth-switch">
          {authMode === "login" ? <>Don't have an account? <span onClick={() => setAuthMode("signup")}>Sign up free</span></> : <>Already have an account? <span onClick={() => setAuthMode("login")}>Log in</span></>}
        </div>
      </div>
    </div>
  );
}
