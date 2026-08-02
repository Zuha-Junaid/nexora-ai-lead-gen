const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory state
let agentConfig = {
  niche: 'AI-first Startups, SaaS, Fintech, E-commerce, Healthcare Tech',
  regions: 'North America, Western Europe, Middle East, Southeast Asia',
  platforms: ['LinkedIn', 'GitHub', 'Upwork', 'YCombinator', 'ProductHunt', 'Twitter'],
  minLeadScore: 75,
  autoOutreach: false,
  customPrompt: `You are the Lead Generator AI Agent for Nexora (https://www.instagram.com/nexora.rhm), a premier software engineering firm.
We specialize in building cutting-edge web & mobile applications, AI and Machine Learning systems, Cloud migration, and enterprise digital transformation.
Your job is to identify companies globally that have tech gaps, outdated platforms, or funding, and pitch them custom, high-value software engineering solutions.`,
  instagramTargetId: 'nexora.rhm'
};

let leads = [
  {
    id: 'l-1',
    company: 'Quantum Finance Inc.',
    contactPerson: 'David Chen',
    role: 'Chief Technology Officer',
    country: 'United States',
    source: 'LinkedIn',
    niche: 'Fintech',
    score: 94,
    status: 'Interested',
    email: 'david.chen@quantumfin.io',
    website: 'https://quantumfin.io',
    description: 'Raised $4.2M Series A. Looking to migrate legacy web dashboard to a modern high-performance React application with real-time analytics.',
    aiPitch: `Hi David,\n\nI noticed Quantum Finance is expanding its real-time analytics capabilities. At Nexora, we specialize in high-performance fintech dashboards. We've helped firms scale data visualization speeds by 4x. Let's build a secure, modern platform together. Let's chat!\n\nBest,\nNexora AI Outreach Agent`,
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
  },
  {
    id: 'l-2',
    company: 'MediVitals Co.',
    contactPerson: 'Sophia Müller',
    role: 'VP of Product',
    country: 'Germany',
    source: 'YCombinator',
    niche: 'Healthcare Tech',
    score: 88,
    status: 'AI Drafted',
    email: 's.mueller@medivitals.de',
    website: 'https://medivitals.de',
    description: 'Early-stage startup building HIPAA-compliant telemedicine platform. Needs robust mobile application (iOS & Android) and backend systems.',
    aiPitch: `Sehr geehrte Frau Müller,\n\nI saw MediVitals is crafting next-generation telemedicine solutions. Nexora specializes in robust, secure iOS/Android healthcare applications. We can accelerate your development cycle by 40% while ensuring full security compliance. Let's schedule a brief call.\n\nBest regards,\nNexora AI Team`,
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
  },
  {
    id: 'l-3',
    company: 'AeroDrone Logistics',
    contactPerson: 'Khalid Al-Mansoori',
    role: 'Operations Director',
    country: 'United Arab Emirates',
    source: 'ProductHunt',
    niche: 'SaaS / Logistics',
    score: 91,
    status: 'New',
    email: 'khalid@aerodrone.ae',
    website: 'https://aerodrone.ae',
    description: 'Fast-growing autonomous drone delivery service in Dubai. Requiring custom fleet-management software dashboard and real-time mapping integrations.',
    aiPitch: `Dear Khalid,\n\nCongratulations on the AeroDrone launch! Building scalable fleet-management dashboards with complex GIS/mapping integration is exactly what we do at Nexora. Let's discuss building your specialized operational center software.\n\nWarm regards,\nNexora AI Specialist`,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'l-4',
    company: 'SwiftCart E-Commerce',
    contactPerson: 'Emily Thompson',
    role: 'Founder',
    country: 'United Kingdom',
    source: 'Upwork',
    niche: 'E-commerce',
    score: 79,
    status: 'Contacted',
    email: 'emily@swiftcart.co.uk',
    website: 'https://swiftcart.co.uk',
    description: 'Requires full-scale Shopify Plus head-less storefront migration with a custom-built mobile app.',
    aiPitch: `Hi Emily,\n\nI love SwiftCart's product range. Migrating to a headless commerce architecture with a Next.js frontend will supercharge your load times and SEO. Nexora can build this seamlessly. Let's jump on a quick 15-minute sync!\n\nBest,\nNexora Outbound Agent`,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    id: 'l-5',
    company: 'Apex AI',
    contactPerson: 'Rohan Sharma',
    role: 'Co-Founder & CEO',
    country: 'India',
    source: 'GitHub',
    niche: 'AI-first Startups',
    score: 96,
    status: 'Interested',
    email: 'rohan@apex-ai.in',
    website: 'https://apex-ai.in',
    description: 'Developing open-source agent frameworks. Needs custom web dashboard integrations and enterprise-grade cloud deployment pipelines.',
    aiPitch: `Hi Rohan,\n\nApex AI is doing amazing work on GitHub. Building enterprise web wrappers and highly scalable CI/CD pipelines for heavy ML models is Nexora's core strength. We would love to collaborate on your cloud deployment layer.\n\nCheers,\nNexora Tech Outreach`,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

let logs = [
  { time: new Date(Date.now() - 600000).toISOString(), message: 'System initialized. Nexora AI Lead Gen Agent is now active and listening.', type: 'info' },
  { time: new Date(Date.now() - 500000).toISOString(), message: 'Connecting with global directory APIs: LinkedIn, GitHub, Upwork...', type: 'info' },
  { time: new Date(Date.now() - 400000).toISOString(), message: 'Scanning LinkedIn for keywords: "CTO", "SaaS", "Funding", "Need Developers"...', type: 'scan' },
  { time: new Date(Date.now() - 300000).toISOString(), message: 'Found possible lead: Quantum Finance Inc. (US). Score: 94/100.', type: 'success' },
  { time: new Date(Date.now() - 250000).toISOString(), message: 'Custom AI email pitch synthesized for David Chen (Quantum Finance).', type: 'ai' },
  { time: new Date(Date.now() - 200000).toISOString(), message: 'Found possible lead: MediVitals Co. (Germany). Score: 88/100.', type: 'success' },
  { time: new Date(Date.now() - 150000).toISOString(), message: 'Auto-scraped tech stack of medivitals.de. Detected obsolete libraries. Updating target profile.', type: 'info' },
  { time: new Date(Date.now() - 50000).toISOString(), message: 'Scanning ProductHunt global launches for tech startups...', type: 'scan' }
];

// Lead Generation simulator
const leadPool = [
  {
    company: 'NexaHealth Solutions',
    contactPerson: 'Juliet Vane',
    role: 'Director of Technology',
    country: 'Australia',
    source: 'LinkedIn',
    niche: 'Healthcare Tech',
    website: 'https://nexahealth.com.au',
    description: 'Looking to build an automated AI scheduling system for multi-clinic dental networks. Budget: $45k.'
  },
  {
    company: 'ScribeAI',
    contactPerson: 'Marc Verhoeven',
    role: 'Founder',
    country: 'Netherlands',
    source: 'YCombinator',
    niche: 'AI-first Startups',
    website: 'https://scribeai.io',
    description: 'Generative AI writing tool scaling from 10k to 500k monthly users. Needs expert Kubernetes optimization and backend scaling support.'
  },
  {
    company: 'Zenith Logistics',
    contactPerson: 'Yuki Sato',
    role: 'VP Engineering',
    country: 'Japan',
    source: 'LinkedIn',
    niche: 'SaaS / Logistics',
    website: 'https://zenithlogistics.jp',
    description: 'Expanding logistics SaaS into East Asian markets. Requires localized frontend development and robust security enhancements.'
  },
  {
    company: 'Brio Pay',
    contactPerson: 'Marcus Vance',
    role: 'Head of Engineering',
    country: 'Canada',
    source: 'Upwork',
    niche: 'Fintech',
    website: 'https://briopay.ca',
    description: 'Next-generation payroll software needs custom automated tax compliance reporting engine integrated.'
  },
  {
    company: 'HyperScale Web',
    contactPerson: 'Gabriel Lima',
    role: 'CTO',
    country: 'Brazil',
    source: 'GitHub',
    niche: 'SaaS',
    website: 'https://hyperscaleweb.io',
    description: 'Open-source web speed analyzer looking to build cloud hosting SaaS platform.'
  }
];

function generateNewLead() {
  const template = leadPool[Math.floor(Math.random() * leadPool.length)];
  
  // Prevent duplicate companies in active list if we run out
  const companyName = template.company + ' ' + (Math.floor(Math.random() * 900) + 100);
  const score = Math.floor(Math.random() * 25) + 75; // 75 - 100
  const id = 'l-' + (leads.length + 1);

  const newLead = {
    id,
    company: companyName,
    contactPerson: template.contactPerson,
    role: template.role,
    country: template.country,
    source: template.source,
    niche: template.niche,
    score,
    status: 'New',
    email: `contact@${template.website.replace('https://', '').replace('www.', '')}`,
    website: template.website,
    description: template.description,
    aiPitch: `Hi ${template.contactPerson},\n\nI noticed ${companyName} is innovating in the ${template.niche} sector. At Nexora, we specialize in building highly scalable products precisely like yours. Let's scale up together.\n\nBest,\nNexora Agent`,
    createdAt: new Date().toISOString()
  };

  leads.unshift(newLead);
  return newLead;
}

// Background simulation adding live logs and occasionally a new lead
setInterval(() => {
  const logTypes = ['info', 'scan', 'ai'];
  const logMessages = [
    'AI Outbound Engine actively scanning global tech job boards for hiring trends...',
    'Performing WHOIS and domain tech stack lookups for regional enterprise companies...',
    'Analyzing GitHub repositories with fast-growing star counts for software consulting opportunities...',
    'Scanning Instagram hashtags and bios relating to software development, #startup, #saas, and tech founders...',
    'AI outbound agent drafted 3 custom proposal pitches for high-score leads.',
    'Verifying active mail server delivery status and CRM syncing protocols...',
    'Social Agent checking Instagram Direct Messages for Nexora profile: https://www.instagram.com/nexora.rhm'
  ];

  const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
  const randomMsg = logMessages[Math.floor(Math.random() * logMessages.length)];
  
  logs.unshift({
    time: new Date().toISOString(),
    message: randomMsg,
    type: randomType
  });

  // Limit logs length to 50
  if (logs.length > 50) {
    logs.pop();
  }

  // 10% chance to discover a new lead dynamically on interval
  if (Math.random() < 0.15) {
    const freshLead = generateNewLead();
    logs.unshift({
      time: new Date().toISOString(),
      message: `[AI Lead Discovery] Found high-value target: ${freshLead.company} (${freshLead.country}). Lead Fit Score: ${freshLead.score}%!`,
      type: 'success'
    });
  }
}, 15000);

// API Endpoints
app.get('/api/leads', (req, res) => {
  res.json(leads);
});

app.post('/api/leads', (req, res) => {
  const { company, contactPerson, role, country, source, niche, email, website, description, score } = req.body;
  if (!company || !contactPerson) {
    return res.status(400).json({ error: 'Company and contact person are required' });
  }

  const newLead = {
    id: 'l-' + (leads.length + 1),
    company,
    contactPerson,
    role: role || 'Founder',
    country: country || 'Global',
    source: source || 'Manual',
    niche: niche || 'General Technology',
    score: score || 85,
    status: 'New',
    email: email || `info@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    website: website || 'https://google.com',
    description: description || 'Manually entered lead.',
    aiPitch: `Hi ${contactPerson},\n\nI reached out from Nexora to discover how we can build high-performance software for ${company}. Let's design the future of your company together.\n\nBest,\nNexora AI Team`,
    createdAt: new Date().toISOString()
  };

  leads.unshift(newLead);
  logs.unshift({
    time: new Date().toISOString(),
    message: `[Manual Lead Added] ${newLead.company} has been added and AI outreach has been prepared.`,
    type: 'success'
  });

  res.status(201).json(newLead);
});

app.get('/api/logs', (req, res) => {
  res.json(logs);
});

app.post('/api/logs', (req, res) => {
  const { message, type } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  const logItem = {
    time: new Date().toISOString(),
    message,
    type: type || 'info'
  };
  logs.unshift(logItem);
  res.status(201).json(logItem);
});

app.post('/api/scan', (req, res) => {
  // Trigger a manual AI agent discovery scan
  logs.unshift({
    time: new Date().toISOString(),
    message: `[Agent Scan Initiated] Scanning global databases for Niche: "${agentConfig.niche}" across regions: "${agentConfig.regions}"...`,
    type: 'scan'
  });

  // Generate 1-2 new leads instantly
  const count = Math.floor(Math.random() * 2) + 1;
  const discovered = [];
  for (let i = 0; i < count; i++) {
    const lead = generateNewLead();
    discovered.push(lead);
    logs.unshift({
      time: new Date().toISOString(),
      message: `[Scan Match] Discovered "${lead.company}" in ${lead.country} matching active parameters. Score: ${lead.score}%`,
      type: 'success'
    });
  }

  res.json({
    message: `Scan finished. Discovered ${count} new prospective lead(s).`,
    leads: discovered
  });
});

app.get('/api/config', (req, res) => {
  res.json(agentConfig);
});

app.post('/api/config', (req, res) => {
  agentConfig = { ...agentConfig, ...req.body };
  logs.unshift({
    time: new Date().toISOString(),
    message: `[Config Updated] AI Agent targeting parameters modified. Auto-Outreach is now: ${agentConfig.autoOutreach ? 'ENABLED' : 'DISABLED'}`,
    type: 'info'
  });
  res.json({ message: 'Configuration updated successfully', config: agentConfig });
});

app.post('/api/leads/:id/pitch', (req, res) => {
  const lead = leads.find(l => l.id === req.params.id);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  // Synthesize custom pitch based on prompt or custom system config
  const pitch = `Hi ${lead.contactPerson},\n\nHope you are doing well. I noticed ${lead.company} is leveraging technology in the ${lead.niche} space to solve key problems.\n\nHere at Nexora, we specialize in ${agentConfig.niche}. We would love to build custom applications or optimize your technology platform to accelerate your growth. We noticed your website at ${lead.website} and have prepared custom architectural recommendations for you.\n\nLet's connect via our official Instagram (https://www.instagram.com/${agentConfig.instagramTargetId}) or reply directly to schedule a demo.\n\nWarm regards,\nNexora AI Outreach Agent`;
  
  lead.aiPitch = pitch;
  lead.status = 'AI Drafted';

  logs.unshift({
    time: new Date().toISOString(),
    message: `[AI Pitch Generated] Custom proposal crafted for ${lead.company} (${lead.contactPerson}).`,
    type: 'ai'
  });

  res.json({ id: lead.id, pitch });
});

app.post('/api/leads/:id/status', (req, res) => {
  const { status } = req.body;
  const lead = leads.find(l => l.id === req.params.id);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  
  const oldStatus = lead.status;
  lead.status = status;

  logs.unshift({
    time: new Date().toISOString(),
    message: `[Lead Status Updated] ${lead.company} transitioned from "${oldStatus}" to "${status}".`,
    type: 'info'
  });

  res.json(lead);
});

// Fallback to React/HTML client
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
