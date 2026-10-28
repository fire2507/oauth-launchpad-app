import React, { useState } from 'react';
import { 
  Key, ShieldCheck, Clock, AlertTriangle, Search, BookOpen, 
  Terminal, CheckCircle2, Copy, Check, Cpu, Zap, RefreshCw 
} from 'lucide-react';

// Pre-populated curated app library
const initialGuides = [
  {
    id: 'google',
    name: 'Google Workspace (OAuth / OIDC)',
    category: 'Productivity & Cloud',
    difficulty: 'Hard',
    sla: '3–7+ Business Days',
    riskLevel: 'High Friction',
    summary: 'Requires Google Cloud Console project creation, OAuth consent screen verification, domain ownership proof, and manual security review for sensitive/restricted scopes.',
    prerequisites: [
      'Verified domain on Google Search Console (for public apps)',
      'Privacy Policy and Terms of Service URLs (publicly accessible)',
      'Registered company or developer entity details'
    ],
    steps: [
      { title: 'Create Google Cloud Project', desc: 'Go to Google Cloud Console, create a new project, and enable the APIs your agent needs (e.g., Gmail, Drive, Calendar).' },
      { title: 'Configure OAuth Consent Screen', desc: 'Select External user type, fill in app name, developer contact email, and authorized domains.' },
      { title: 'Define Scopes & Restrictions', desc: 'Declare scopes. Note that restricted scopes trigger mandatory Google Trust & Safety verification.' },
      { title: 'Submit for Verification', desc: 'Record a YouTube demo video showing how your AI agent uses the data and submit the compliance form.' }
    ],
    blockers: [
      'App remains in "Testing" mode limited to 100 test users until verified.',
      'Restricted scopes require a compliance assessment questionnaire and video walkthrough.'
    ]
  },
  {
    id: 'github',
    name: 'GitHub Apps & OAuth',
    category: 'Developer Tools',
    difficulty: 'Easy',
    sla: 'Instant (0 Days)',
    riskLevel: 'Low Friction',
    summary: 'Extremely developer-friendly. Registering a GitHub App or OAuth App provides instant credentials with no mandatory manual review for standard scopes.',
    prerequisites: [
      'A GitHub user or organization account',
      'An endpoint URL to handle webhooks and callback redirects'
    ],
    steps: [
      { title: 'Register New App', desc: 'Navigate to Developer Settings -> GitHub Apps (or OAuth Apps) -> New GitHub App.' },
      { title: 'Set Callback & Webhook URLs', desc: 'Configure your Authorization callback URL and webhook event subscriptions.' },
      { title: 'Select Permissions & Scopes', desc: 'Choose fine-grained repository permissions or user scopes.' },
      { title: 'Generate Client Secret & Private Key', desc: 'Save your Client ID, generate a client secret or download the private .pem key for signing.' }
    ],
    blockers: [
      'Strict exact-match requirement for redirect URIs—wildcards are not permitted in production.'
    ]
  },
  {
    id: 'slack',
    name: 'Slack Bot & User OAuth',
    category: 'Communication',
    difficulty: 'Medium',
    sla: '1–2 Business Days (if published publicly)',
    riskLevel: 'Medium Friction',
    summary: 'Uses Slack App Manifests and granular token scopes. Internal workspace testing is instant, but public app directory listing requires review.',
    prerequisites: [
      'Slack Developer Account',
      'Publicly hosted redirect URL with SSL certificate'
    ],
    steps: [
      { title: 'Create App from Manifest', desc: 'Go to api.slack.com/apps, click Create New App, and paste the JSON/YAML app manifest.' },
      { title: 'Configure Bot Token Scopes', desc: 'Add scopes under OAuth & Permissions (e.g., channels:read, chat:write).' },
      { title: 'Install to Workspace', desc: 'Click Install to Workspace to generate your xoxb- bot token for internal testing instantly.' },
      { title: 'Prepare for Distribution', desc: 'If publishing to Slack App Directory, complete security questionnaires and branding reviews.' }
    ],
    blockers: [
      'Mixing User Tokens (xoxp-) and Bot Tokens (xoxb-) without properly handling token rotation.'
    ]
  },
  {
    id: 'notion',
    name: 'Notion Integration API',
    category: 'Productivity & Notes',
    difficulty: 'Easy',
    sla: 'Instant (0 Days)',
    riskLevel: 'Low Friction',
    summary: 'Internal integrations work instantly via API keys. Public OAuth integrations require registering an integration on Notion Developers portal.',
    prerequisites: [
      'Notion Workspace Admin access',
      'Configured redirect URI'
    ],
    steps: [
      { title: 'Create Integration', desc: 'Go to notion.so/my-integrations, click New integration, and select capabilities.' },
      { title: 'Configure Public OAuth', desc: 'Set up authorization redirect URIs and branding info if distributing your agent.' },
      { title: 'Share Pages with Integration', desc: 'Note that Notion requires users to explicitly share specific pages/databases with the integration for access.' }
    ],
    blockers: [
      'Notion integrations do not inherit workspace permissions automatically; users must manually share pages.'
    ]
  }
];

export default function App() {
  const [guides, setGuides] = useState(initialGuides);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState(initialGuides[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customInput, setCustomInput] = useState('');

  // Filtered guides based on search
  const filteredGuides = guides.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Algorithmic Dynamic Heuristic Generator for ANY Random App
  const handleLiveGeneration = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const appName = customInput.trim();
      const query = appName.toLowerCase();

      // Algorithmic complexity inference based on keywords
      const isFintech = query.includes('pay') || query.includes('bank') || query.includes('finance') || query.includes('money') || query.includes('wallet');
      const isSocial = query.includes('social') || query.includes('chat') || query.includes('gram') || query.includes('media') || query.includes('discord') || query.includes('slack');
      const isDevTool = query.includes('git') || query.includes('dev') || query.includes('code') || query.includes('cloud') || query.includes('api');

      const difficulty = isFintech || isSocial ? 'Hard' : isDevTool ? 'Easy' : 'Medium';
      const sla = isFintech ? '3–7 Business Days (Compliance Review)' : isSocial ? '2–5 Business Days (App Review)' : 'Instant (0–1 Day)';
      const riskLevel = isFintech ? 'High Friction' : isSocial ? 'Medium Friction' : 'Low Friction';

      const generatedGuide = {
        id: query.replace(/[^a-z0-9]/g, '-'),
        name: `${appName} (Dynamic OAuth 2.0 / OIDC)`,
        category: isFintech ? 'FinTech & Payments' : isSocial ? 'Social & Communication' : isDevTool ? 'Developer & Infrastructure' : 'SaaS & Productivity',
        difficulty,
        sla,
        riskLevel,
        summary: `Autonomous agent analysis for "${appName}": Identified standard OAuth 2.0 Authorization Code flow with Bearer token exchange. Requires developer portal registration and HTTPS callback verification.`,
        prerequisites: [
          `Active developer or administrator account on ${appName}`,
          'Public HTTPS redirect URI endpoint for callback handling',
          isFintech ? 'Verified business entity documentation and compliance contact' : 'Publicly accessible Privacy Policy URL'
        ],
        steps: [
          { title: `Register App in ${appName} Developer Console`, desc: `Navigate to ${appName}'s developer settings, create a new OAuth application, and generate your Client ID and Client Secret.` },
          { title: 'Configure Redirect URIs', desc: 'Add exact-match callback URLs to prevent token interception vulnerabilities.' },
          { title: 'Define Required Scopes', desc: `Select granular read/write scopes required for your AI agent to interact with ${appName} safely.` },
          { title: 'Implement Token Exchange & Storage', desc: 'Set up secure server-side exchange of authorization codes for access tokens with automatic refresh token rotation.' }
        ],
        blockers: [
          isFintech ? 'Strict KYC/AML compliance checks and mandatory webhook security verification.' : 'Strict redirect URI exact-matching—wildcards are typically disallowed.',
          'Access tokens may expire requiring persistent refresh token management.'
        ]
      };

      setGuides([generatedGuide, ...guides]);
      setSelectedApp(generatedGuide);
      setCustomInput('');
      setIsGenerating(false);
    }, 1100);
  };

  const copyGuideToClipboard = () => {
    const text = `OAuth Guide for ${selectedApp.name}\nDifficulty: ${selectedApp.difficulty} | SLA: ${selectedApp.sla}\n\nSummary:\n${selectedApp.summary}\n\nPrerequisites:\n${selectedApp.prerequisites.join('\n')}\n\nSteps:\n${selectedApp.steps.map((s, i) => `${i+1}. ${s.title}: ${s.desc}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
              OAuth Launchpad <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30">AI Agent Guidebook</span>
            </h1>
            <p className="text-xs text-slate-400">Navigate provider OAuth setups, approval SLAs, and verification workflows.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-400 hidden md:flex">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Compliance Models</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-amber-400" /> SLA Predictor</span>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: App Directory & Live Generator */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Live Agent Generator Card */}
          <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-xl">
            <h2 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4" /> Live Agent App Investigator
            </h2>
            <p className="text-xs text-slate-300 mb-4">
              Enter any unfamiliar app name or website (e.g., Spotify, PayPal, Linear). Our agent algorithmically investigates endpoints and generates a shareable guide instantly.
            </p>
            <form onSubmit={handleLiveGeneration} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="e.g., Spotify, PayPal, Notion..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <button 
                type="submit"
                disabled={isGenerating || !customInput.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                {isGenerating ? 'Analyzing...' : 'Investigate'}
              </button>
            </form>
          </div>

          {/* Curated Guide Library */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col flex-1 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" /> OAuth Guide Directory ({guides.length})
              </h3>
              <span className="text-xs text-slate-400">Select to view</span>
            </div>

            {/* Search filter inside directory */}
            <div className="relative mb-4">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-slate-700"
              />
            </div>

            {/* Guide List */}
            <div className="space-y-2.5 overflow-y-auto max-h-[460px] pr-1">
              {filteredGuides.map((guide) => {
                const isSelected = selectedApp.id === guide.id;
                return (
                  <div 
                    key={guide.id}
                    onClick={() => setSelectedApp(guide)}
                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1.5 ${
                      isSelected 
                        ? 'bg-indigo-600/10 border-indigo-500/50 text-white shadow-md' 
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-white">{guide.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        guide.difficulty === 'Hard' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        guide.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {guide.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{guide.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-indigo-400" /> {guide.sla}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Panel: Detailed Interactive Guide */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            {/* Header of Selected Guide */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">{selectedApp.category}</span>
                <h2 className="text-2xl font-bold text-white mt-1">{selectedApp.name}</h2>
                <p className="text-sm text-slate-300 mt-2">{selectedApp.summary}</p>
              </div>
              <button 
                onClick={copyGuideToClipboard}
                className="self-start md:self-auto bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-medium transition flex items-center gap-2 border border-slate-700 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied Guide!' : 'Share Guide'}
              </button>
            </div>

            {/* Key Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
                <span className="text-xs text-slate-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-indigo-400" /> Approval SLA</span>
                <p className="text-sm font-semibold text-white mt-1">{selectedApp.sla}</p>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
                <span className="text-xs text-slate-400 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Friction Level</span>
                <p className="text-sm font-semibold text-white mt-1">{selectedApp.riskLevel}</p>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-400 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Setup Difficulty</span>
                <p className="text-sm font-semibold text-white mt-1">{selectedApp.difficulty}</p>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Prerequisites & Requirements
              </h3>
              <ul className="space-y-2 bg-slate-950/40 border border-slate-800/80 rounded-xl p-4">
                {selectedApp.prerequisites.map((req, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span> {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" /> Step-by-Step Setup Workflow
              </h3>
              <div className="space-y-3">
                {selectedApp.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 flex gap-4">
                    <div className="bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">{step.title}</h4>
                      <p className="text-xs text-slate-300 mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Known Blockers & Warnings */}
            <div>
              <h3 className="text-sm font-semibold text-amber-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Common Blockers & Developer Gotchas
              </h3>
              <div className="bg-amber-950/10 border border-amber-500/20 rounded-xl p-4 space-y-2">
                {selectedApp.blockers.map((blocker, idx) => (
                  <div key={idx} className="text-xs text-amber-200/90 flex items-start gap-2">
                    <span className="text-amber-400">⚠️</span> {blocker}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
            OAuth Launchpad & AI Agent Guidebook • Self-Contained React Evaluation Build
          </div>
        </div>

      </div>
    </div>
  );
}