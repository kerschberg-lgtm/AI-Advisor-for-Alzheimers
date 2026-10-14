/* AI Advisor for Alzheimer's — guided advisor and small page behaviours.
   Everything runs in the browser. Nothing is stored or transmitted. */

(function () {
  "use strict";

  // ----- Footer year -----
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ----- Mobile navigation -----
  var toggle = document.querySelector(".nav-toggle");
  var navList = document.getElementById("nav-list");
  if (toggle && navList) {
    toggle.addEventListener("click", function () {
      var open = navList.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navList.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navList.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ----- Advisor content -----
  // Each role has a set of interests. Each interest produces a result with
  // what AI can do, what it cannot, and sensible next steps.
  var CONTENT = {
    worried: {
      label: "For someone worried about their memory",
      interests: [
        { id: "screen", title: "Could an AI test tell me if something is wrong?", sub: "Apps, online quizzes, and blood tests" },
        { id: "nextsteps", title: "What should I do first?", sub: "Practical steps before and after seeing a doctor" },
        { id: "brainhealth", title: "Can AI help me protect my brain health?", sub: "Lifestyle tools, tracking, and realistic expectations" }
      ],
      results: {
        screen: {
          title: "AI can raise a flag, but only a clinician can tell you what it means",
          can: [
            "Some validated digital cognitive tests, often done on a tablet in a clinic, use AI scoring to detect subtle changes earlier than paper tests.",
            "Blood tests for proteins such as p-tau217 are now used by specialists, often combined with AI risk models that factor in age and genetics.",
            "Research tools analyse speech, typing rhythm, and eye movements, and show promise for very early detection."
          ],
          cannot: [
            "No app or online quiz can diagnose Alzheimer's. Memory changes have many causes, including stress, sleep problems, depression, thyroid issues, and medication side effects, several of which are treatable.",
            "Consumer apps that promise a diagnosis are rarely validated and may sell or share your data."
          ],
          steps: [
            "Write down what you have noticed, when it started, and whether others have noticed it too.",
            "Book an appointment with your primary care clinician and ask for a cognitive assessment.",
            "Ask whether a memory clinic or neurologist in your area offers biomarker testing, and how results would change your care.",
            "If you try a digital test at home, treat it as a conversation starter for your doctor, not a verdict."
          ],
          callout: "If memory changes are sudden, severe, or come with confusion, weakness, or trouble speaking, seek emergency care. Those can be signs of a stroke or other urgent problem."
        },
        nextsteps: {
          title: "Start with people, then use technology to support the conversation",
          can: [
            "AI chat tools can help you prepare a clear list of symptoms and questions for your appointment.",
            "Symptom and sleep trackers can give your clinician a fuller picture than memory alone.",
            "Patient portals increasingly use AI to summarise test results in plain language."
          ],
          cannot: [
            "No technology replaces a thorough examination, a review of your medications, and basic blood work to rule out reversible causes.",
            "A chatbot cannot know your history and may reassure or alarm you inappropriately."
          ],
          steps: [
            "See your primary care clinician and ask directly: \"I am worried about my memory. Can we assess it?\"",
            "Bring a family member or friend who can describe what they have observed.",
            "Ask for a medication review; some common drugs affect memory.",
            "Request a referral to a memory clinic if the first assessment is inconclusive.",
            "Contact the Alzheimer's Association helpline (800-272-3900 in the US) to talk through your worries with a trained person."
          ],
          callout: "Early evaluation is worthwhile even when the news is good. Many memory complaints turn out to have treatable causes, and if it is Alzheimer's, newer treatments work best early.",
          calloutOk: true
        },
        brainhealth: {
          title: "AI can nudge healthy habits; the habits themselves are what protect your brain",
          can: [
            "Coaching apps use AI to personalise exercise, sleep, diet, and social goals, and adherence tends to be better with reminders and feedback.",
            "Hearing-aid fitting and blood-pressure management, two of the strongest modifiable risk factors, increasingly use AI behind the scenes.",
            "Some programmes combine cognitive training with AI-adjusted difficulty, though evidence of real-world benefit is still mixed."
          ],
          cannot: [
            "No app has been shown to prevent Alzheimer's. Be wary of \"brain training\" products that claim otherwise.",
            "Supplements marketed with AI-generated testimonials are not a substitute for evidence."
          ],
          steps: [
            "Focus on the evidence-based basics: regular physical activity, controlled blood pressure, treating hearing loss, good sleep, not smoking, and staying socially and mentally engaged.",
            "If an app helps you keep those habits, use it. If it adds stress or cost without benefit, drop it.",
            "Discuss your personal risk factors, including family history, with your clinician."
          ]
        }
      }
    },

    family: {
      label: "For family members and caregivers",
      interests: [
        { id: "daily", title: "Tools for day-to-day care and safety", sub: "Reminders, monitoring, and communication aids" },
        { id: "behaviour", title: "Help with difficult moments", sub: "Repetition, agitation, sundowning, and resistance to care" },
        { id: "treatment", title: "Understanding treatment options", sub: "New drugs, trials, and how AI is involved" },
        { id: "myself", title: "Looking after myself as a caregiver", sub: "Burnout, support, and finding time" }
      ],
      results: {
        daily: {
          title: "Technology can take some of the load, if it fits the person and the home",
          can: [
            "Voice assistants can give gentle, repeated reminders for medication, meals, and appointments without the frustration a human might show.",
            "Motion and door sensors with AI pattern-recognition can alert you to night-time wandering or unusual inactivity.",
            "Digital photo frames and simplified video-calling devices help maintain connection with distant family.",
            "GPS-enabled watches or shoe insoles can locate a person who becomes lost."
          ],
          cannot: [
            "Devices cannot provide comfort, redirect distress, or notice the small cues a familiar person sees.",
            "Complicated gadgets often get unplugged or ignored. Simpler is usually better."
          ],
          steps: [
            "Start with one problem (missed medication, night-time wandering) and choose a single tool that addresses it.",
            "Introduce new devices while the person can still learn them, and keep the interface as simple as possible.",
            "Check the privacy policy of any monitoring device, especially one with a camera or microphone.",
            "Ask an occupational therapist for a home-safety assessment; many know which technologies actually work."
          ]
        },
        behaviour: {
          title: "AI can help you think through a hard moment, but the care comes from you",
          can: [
            "Chat assistants can suggest practical responses to common situations, such as repeated questions, refusing a shower, or accusing others of theft.",
            "Some caregiver apps offer guided, AI-tailored coaching based on well-tested approaches like validation and redirection.",
            "Monitoring tools can reveal patterns, for example that agitation peaks after a noisy afternoon or a skipped nap."
          ],
          cannot: [
            "No tool can assess whether a sudden behaviour change is caused by pain, infection, or a medication problem. Those need a clinician.",
            "Generic advice can miss what is unique about your person's history and personality."
          ],
          steps: [
            "For any sudden change in behaviour, call the clinician first; urinary infections and pain are common, treatable triggers.",
            "Use these core principles: do not argue with the reality the person is in, respond to the feeling rather than the facts, and redirect gently.",
            "Keep a simple log of what happened before and after difficult episodes; patterns usually emerge within a couple of weeks.",
            "Join a caregiver support group, in person or online. Other caregivers' experience is often the best \"training data\" there is."
          ],
          callout: "If someone is at immediate risk of hurting themselves or others, contact emergency services. Technology is not a safety plan on its own."
        },
        treatment: {
          title: "New treatments exist, and AI is quietly part of how they are delivered",
          can: [
            "Anti-amyloid antibodies (lecanemab and donanemab) can modestly slow decline in early-stage Alzheimer's for eligible patients.",
            "AI is used to measure amyloid on PET scans, monitor for side effects such as ARIA on MRI, and match patients to clinical trials.",
            "Trial-matching services use AI to find studies for which your loved one might qualify."
          ],
          cannot: [
            "These drugs do not cure or reverse Alzheimer's, and they carry real risks that require regular MRI monitoring.",
            "Eligibility is narrow (early stage, confirmed amyloid, specific genetic and medical criteria), so many people will not qualify."
          ],
          steps: [
            "Ask the treating neurologist directly whether your loved one is a candidate for anti-amyloid therapy and what the trade-offs would be.",
            "Search for clinical trials at clinicaltrials.gov or through the Alzheimer's Association TrialMatch service.",
            "Ask how non-drug approaches, including exercise, hearing care, and structured routines, fit into the overall plan.",
            "Be cautious of clinics or websites selling unproven \"AI-personalised\" treatments or stem-cell therapies."
          ]
        },
        myself: {
          title: "Your wellbeing is part of the care plan",
          can: [
            "Scheduling and task-sharing apps can coordinate help from family and friends so that you are not the only one who knows what needs doing.",
            "Some mental-health apps use AI to deliver cognitive-behavioural techniques shown to reduce caregiver stress.",
            "Chat tools can be a low-stakes place to vent and organise your thoughts at any hour."
          ],
          cannot: [
            "An app is not respite. You need real breaks, with another person caring for your loved one.",
            "AI cannot replace a counsellor, a support group, or a friend who checks in on you."
          ],
          steps: [
            "Accept specific offers of help and give people concrete tasks: a meal on Tuesdays, a Saturday morning sitting.",
            "Ask your local Alzheimer's association or Area Agency on Aging about respite care and caregiver programmes.",
            "Watch for signs of burnout: exhaustion, irritability, withdrawing from friends, and neglecting your own health.",
            "Tell your own doctor that you are a caregiver. It changes how they think about your health."
          ],
          callout: "Caregivers who get support provide better care for longer. Looking after yourself is not selfish; it is part of the job.",
          calloutOk: true
        }
      }
    },

    clinician: {
      label: "For clinicians",
      interests: [
        { id: "diagnostics", title: "AI-assisted diagnostics in practice", sub: "Imaging, biomarkers, digital cognitive tests" },
        { id: "workflow", title: "Workflow and documentation", sub: "Ambient scribes, care planning, and triage" },
        { id: "evaluation", title: "Evaluating a vendor's claims", sub: "What to ask before adopting a tool" }
      ],
      results: {
        diagnostics: {
          title: "Several AI-assisted diagnostics are usable now; know their validation populations",
          can: [
            "FDA-cleared software quantifies regional brain volumes on MRI and amyloid or tau burden on PET, improving consistency over visual reads.",
            "Plasma p-tau217 and related assays, interpreted with age- and APOE-adjusted models, are approaching CSF-level accuracy for amyloid status in specialist settings.",
            "Digital cognitive assessments with automated scoring can reduce administration time and detect subtle change, and some have FDA clearance as aids to assessment."
          ],
          cannot: [
            "Most models were trained on research cohorts that skew white, highly educated, and from high-income countries. Performance in other populations is often lower and sometimes unreported.",
            "Risk scores and progression predictors are not yet validated for individual-level decisions in routine primary care."
          ],
          steps: [
            "Use AI outputs as adjuncts within established diagnostic frameworks (for example the 2024 Alzheimer's Association revised criteria), not as stand-alone determinations.",
            "Check each tool's regulatory status, intended use statement, and the demographics of its validation cohorts.",
            "Pair biomarker results with structured disclosure counselling; AI can shorten the path to a result but not the conversation about it.",
            "Document the role the tool played in your reasoning."
          ]
        },
        workflow: {
          title: "Workflow AI is mature enough to save time, and immature enough to need supervision",
          can: [
            "Ambient documentation tools can draft visit notes from recorded conversations, freeing attention for the patient and family.",
            "Large language models can summarise long records, draft caregiver-facing education in plain language, and translate materials.",
            "Risk-stratification models in the EHR can flag patients who may benefit from cognitive screening or caregiver support referrals."
          ],
          cannot: [
            "Drafts can contain confident errors, especially around medications and timelines. Every output needs clinician review.",
            "Consent and privacy requirements for recording and for sharing data with vendors vary by jurisdiction and institution."
          ],
          steps: [
            "Pilot one tool with a clear metric (documentation time, screening rate) before broad rollout.",
            "Ensure patients and families are informed when AI is used in their care and documentation.",
            "Establish a review process for AI-generated content, and a channel for reporting errors.",
            "Involve nursing, social work, and caregivers in design; they catch workflow problems physicians miss."
          ]
        },
        evaluation: {
          title: "Treat an AI vendor's claims the way you would treat a new drug's claims",
          can: [
            "Well-designed AI tools publish prospective, external validation studies, report calibration and subgroup performance, and state their intended use clearly.",
            "Regulators now maintain lists of cleared AI/ML-enabled devices with their indications."
          ],
          cannot: [
            "Retrospective accuracy on a single curated dataset says little about real-world performance.",
            "A tool that cannot explain what data it was trained on, how it handles drift, or who is liable for errors is not ready for clinical use."
          ],
          steps: [
            "Ask for: the intended-use statement, regulatory status, validation studies (ideally external and prospective), subgroup performance, and a model-update policy.",
            "Ask how the tool integrates with your workflow and what happens when it is wrong.",
            "Ask about data governance: where patient data goes, how long it is kept, and whether it trains future models.",
            "Prefer tools evaluated in settings similar to yours, and plan a local audit after deployment."
          ]
        }
      }
    },

    researcher: {
      label: "For researchers and students",
      interests: [
        { id: "data", title: "Datasets and benchmarks", sub: "Where to find imaging, biomarker, and cognitive data" },
        { id: "methods", title: "Methods and open problems", sub: "What is working and what remains hard" },
        { id: "ethics", title: "Ethics, equity, and translation", sub: "Getting from a paper to something that helps people" }
      ],
      results: {
        data: {
          title: "Rich open datasets exist; the hard part is generalising beyond them",
          can: [
            "ADNI (Alzheimer's Disease Neuroimaging Initiative) offers longitudinal MRI, PET, CSF, plasma, genetics, and cognition for thousands of participants, and underlies most published AI work.",
            "OASIS, AIBL, the UK Biobank, NACC, and A4 add imaging, population-scale, and prevention-trial cohorts with different strengths.",
            "Speech and digital-biomarker datasets (for example DementiaBank and the ADReSS challenges) support work on language-based detection.",
            "The TADPOLE challenge and related benchmarks provide standardised progression-prediction tasks."
          ],
          cannot: [
            "Most cohorts under-represent people of colour, people with lower educational attainment, and the Global South. Models trained on them often fail to generalise.",
            "Access usually requires an application and data-use agreement; plan for weeks, not days."
          ],
          steps: [
            "Apply for ADNI access early and read the data dictionary carefully; preprocessing choices drive many reported results.",
            "Validate on at least one external cohort before claiming generalisable performance.",
            "Report subgroup performance and calibration, not only overall AUC.",
            "Share code and preprocessing pipelines so results can be reproduced."
          ]
        },
        methods: {
          title: "Detection is well-studied; prediction, mechanism, and multimodal fusion remain open",
          can: [
            "Convolutional and transformer models for MRI and PET classification routinely achieve high accuracy on held-out ADNI splits.",
            "Multimodal models combining imaging, plasma biomarkers, genetics, and cognition outperform single-modality models in progression prediction.",
            "Protein-structure prediction and generative chemistry are accelerating candidate discovery against tau, neuroinflammation, and synaptic targets.",
            "Natural-language models applied to speech and clinical notes can detect early cognitive change with modest, growing accuracy."
          ],
          cannot: [
            "Individual-level progression prediction remains poorly calibrated, and few models have been tested prospectively.",
            "Interpretability tools often highlight plausible regions without proving the model relies on disease biology rather than scanner or site artefacts.",
            "Linking AI-identified biomarkers to mechanisms, and mechanisms to treatments, is still slow and expensive."
          ],
          steps: [
            "Prioritise questions clinicians actually face: who will progress, who will respond to anti-amyloid therapy, who is at risk of ARIA.",
            "Build site- and scanner-harmonisation into your pipeline from the start.",
            "Pre-register analyses and use nested cross-validation to avoid optimistic estimates.",
            "Collaborate with clinicians and people living with dementia early, so the problem you solve is one that matters."
          ]
        },
        ethics: {
          title: "Translation is as much about trust and equity as about accuracy",
          can: [
            "Participatory design with patients and caregivers improves uptake and surfaces risks (stigma, insurance, autonomy) that technical teams miss.",
            "Fairness auditing and reporting standards (for example TRIPOD-AI and CONSORT-AI) give a structured path to credible claims.",
            "Federated learning and synthetic data can expand training diversity while respecting privacy."
          ],
          cannot: [
            "Predicting dementia risk in people without symptoms raises hard questions about disclosure, discrimination, and psychological harm that no accuracy metric resolves.",
            "A model is not a product. Regulation, reimbursement, workflow integration, and maintenance determine whether anything reaches a patient."
          ],
          steps: [
            "Involve ethicists and affected communities before data collection, not at the write-up stage.",
            "State clearly what decision your model is meant to support and who bears the cost of its errors.",
            "Plan for post-deployment monitoring, model drift, and sunset conditions.",
            "Publish negative results and failed external validations; the field needs them."
          ]
        }
      }
    }
  };

  // ----- Advisor behaviour -----
  var advisor = document.querySelector("[data-advisor]");
  if (!advisor) return;

  var steps = {
    1: advisor.querySelector('[data-step="1"]'),
    2: advisor.querySelector('[data-step="2"]'),
    3: advisor.querySelector('[data-step="3"]')
  };
  var interestGrid = steps[2].querySelector(".choice-grid");
  var resultEyebrow = advisor.querySelector("[data-result-eyebrow]");
  var resultTitle = advisor.querySelector("[data-result-title]");
  var resultBody = advisor.querySelector("[data-result-body]");
  var currentRole = null;

  function showStep(n) {
    Object.keys(steps).forEach(function (k) {
      steps[k].hidden = String(k) !== String(n);
    });
    var heading = steps[n].querySelector("h3");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
    advisor.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") node.textContent = attrs[k];
      else if (k === "class") node.className = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { node.appendChild(c); });
    return node;
  }

  function list(items) {
    return el("ul", null, items.map(function (t) { return el("li", { text: t }); }));
  }

  function renderInterests(role) {
    interestGrid.innerHTML = "";
    CONTENT[role].interests.forEach(function (it) {
      var btn = el("button", { class: "choice", "data-interest": it.id }, [
        el("span", { class: "choice-title", text: it.title }),
        el("span", { class: "choice-sub", text: it.sub })
      ]);
      btn.addEventListener("click", function () { renderResult(role, it.id); });
      interestGrid.appendChild(btn);
    });
  }

  function renderResult(role, interestId) {
    var data = CONTENT[role].results[interestId];
    resultEyebrow.textContent = CONTENT[role].label;
    resultTitle.textContent = data.title;
    resultBody.innerHTML = "";
    resultBody.className = "result-body";
    resultBody.appendChild(el("h4", { text: "What AI can do today" }));
    resultBody.appendChild(list(data.can));
    resultBody.appendChild(el("h4", { text: "What it cannot do" }));
    resultBody.appendChild(list(data.cannot));
    resultBody.appendChild(el("h4", { text: "Sensible next steps" }));
    var ol = el("ol", null, data.steps.map(function (t) { return el("li", { text: t }); }));
    resultBody.appendChild(ol);
    if (data.callout) {
      resultBody.appendChild(el("div", { class: "callout" + (data.calloutOk ? " ok" : ""), text: data.callout }));
    }
    showStep(3);
  }

  steps[1].querySelectorAll("[data-role]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentRole = btn.getAttribute("data-role");
      renderInterests(currentRole);
      showStep(2);
    });
  });

  advisor.querySelector("[data-back]").addEventListener("click", function () { showStep(1); });
  advisor.querySelector("[data-restart]").addEventListener("click", function () {
    currentRole = null;
    showStep(1);
  });
})();
