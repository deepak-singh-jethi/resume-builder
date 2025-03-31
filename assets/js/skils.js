document.addEventListener("DOMContentLoaded", function () {
  const skillsInput = document.getElementById("skills-input");
  const skillsList = document.getElementById("skills-list");
  const skillsSuggestions = document.getElementById("skills-suggestions");

  skillList = JSON.parse(localStorage.getItem("skillsData")) || [];
  const skillSuggestionsData = [
    // **Technology and Programming**
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "PHP",
    "Ruby",
    "SQL",
    "TypeScript",
    "HTML",
    "CSS",
    "React.js",
    "Node.js",
    "Angular",
    "Vue.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "NoSQL",
    "Firebase",
    "Swift",
    "Kotlin",
    "C#",
    "R",
    "MATLAB",
    "Ruby on Rails",
    "Go",
    ".NET",
    "Django",
    "Flask",
    "Docker",
    "Linux",
    "Git",
    "GitHub",
    "GitLab",
    "Jenkins",
    "AWS",
    "Azure",
    "Google Cloud",
    "Kubernetes",
    "DevOps",
    "Machine Learning",
    "Deep Learning",
    "AI",
    "Blockchain",
    "TensorFlow",
    "OpenCV",
    "Tableau",
    "Power BI",
    "Google Analytics",
    "Web Scraping",
    "API Integration",
    "UI/UX Design",
    "Figma",
    "Sketch",
    "Adobe XD",
    "Photoshop",
    "Illustrator",

    // **Finance and Accounting**
    "Accounting",
    "Financial Analysis",
    "Budgeting",
    "Forecasting",
    "Risk Management",
    "Investment Analysis",
    "Taxation",
    "Bookkeeping",
    "Accounts Payable",
    "Accounts Receivable",
    "Cash Flow Management",
    "Auditing",
    "Financial Reporting",
    "Financial Modeling",
    "Valuation",
    "Mergers and Acquisitions",
    "Corporate Finance",
    "Cost Accounting",
    "Internal Controls",
    "QuickBooks",
    "SAP",
    "Xero",
    "Microsoft Excel",
    "Excel VBA",
    "MS Word",
    "PowerPoint",
    "Power BI",
    "Data Analysis",
    "Portfolio Management",
    "Equity Research",
    "Private Equity",
    "Hedge Funds",
    "Derivatives",
    "Cryptocurrency",
    "Futures & Options",
    "Forex Trading",
    "Risk Management",
    "Actuarial Science",
    "CFA (Chartered Financial Analyst)",
    "Financial Planning",
    "Tax Preparation",
    "Wealth Management",

    // **Microsoft Office and Productivity Tools**
    "Microsoft Word",
    "Microsoft Excel",
    "Microsoft PowerPoint",
    "Microsoft Outlook",
    "Microsoft Access",
    "Microsoft Teams",
    "Microsoft OneNote",
    "Microsoft Project",
    "Excel Formulas",
    "Excel Pivot Tables",
    "Excel Macros",
    "Excel Data Analysis",
    "Excel Power Query",
    "Excel Power Pivot",
    "Excel Dashboards",
    "Data Visualization",
    "Google Docs",
    "Google Sheets",
    "Google Slides",
    "Google Forms",
    "Google Drive",
    "Google Meet",
    "Trello",
    "Slack",
    "Zoom",
    "Asana",
    "Jira",
    "Basecamp",
    "Monday.com",

    // **Construction and Architecture**
    "Construction Management",
    "Project Management",
    "Building Codes",
    "Blueprint Reading",
    "Contractor Management",
    "Estimating",
    "Site Surveying",
    "Construction Safety",
    "OSHA Compliance",
    "Construction Scheduling",
    "Cost Estimation",
    "Budget Management",
    "Building Design",
    "Revit",
    "AutoCAD",
    "3D Modeling",
    "Civil Engineering",
    "Structural Engineering",
    "Construction Materials",
    "Project Planning",
    "BIM (Building Information Modeling)",
    "Site Supervision",
    "Concrete Work",
    "Land Surveying",
    "Sustainable Construction",
    "Green Building",
    "Carpentry",
    "Masonry",
    "Welding",
    "HVAC Systems",
    "Plumbing",
    "Electrical Systems",
    "Landscaping",
    "Roofing",
    "Demolition",
    "Environmental Engineering",
    "Construction Safety Management",
    "Public Works",

    // **Healthcare and Medicine**
    "Patient Care",
    "Clinical Research",
    "Medical Coding",
    "Medical Billing",
    "Nursing",
    "Phlebotomy",
    "Surgery Assistance",
    "Anatomy",
    "Physiology",
    "Medical Transcription",
    "Pharmacology",
    "Medical Records Management",
    "EMR/EHR Systems",
    "CPR Certification",
    "Medical Equipment Management",
    "Diagnostic Testing",
    "Medical Research",
    "Healthcare Administration",
    "Physician Assistant",
    "Dentistry",
    "Occupational Therapy",
    "Mental Health",
    "Psychiatry",
    "Pediatrics",
    "Geriatrics",
    "Surgical Technology",
    "Veterinary Care",
    "Public Health",

    // **Sales and Marketing**
    "Sales Strategy",
    "Customer Relationship Management (CRM)",
    "Lead Generation",
    "B2B Sales",
    "B2C Sales",
    "Cold Calling",
    "Negotiation",
    "Sales Presentations",
    "Product Knowledge",
    "Market Research",
    "Branding",
    "Digital Marketing",
    "SEO",
    "PPC Advertising",
    "Google Ads",
    "Facebook Ads",
    "Content Marketing",
    "Social Media Marketing",
    "Email Marketing",
    "Affiliate Marketing",
    "Product Launch",
    "Market Analysis",
    "Consumer Behavior",
    "E-commerce",
    "Copywriting",
    "Video Marketing",
    "Influencer Marketing",
    "Public Relations",
    "Event Planning",
    "Lead Conversion",
    "Salesforce",
    "HubSpot",
    "Customer Service",
    "Negotiation Skills",

    // **Human Resources (HR)**
    "Recruitment",
    "Employee Relations",
    "HR Policies",
    "Employee Training",
    "HR Compliance",
    "Payroll",
    "Talent Acquisition",
    "Performance Management",
    "Employee Engagement",
    "Succession Planning",
    "Labor Law",
    "Organizational Development",
    "Conflict Resolution",
    "Workplace Diversity",
    "Compensation & Benefits",
    "Onboarding",
    "HR Analytics",
    "HR Software (Workday, ADP)",
    "HRIS Systems",
    "Team Building",
    "Coaching & Mentoring",
    "Employee Wellness Programs",
    "Workforce Planning",
    "Labor Relations",
    "Staffing",

    // **Education and Training**
    "Curriculum Development",
    "Teaching",
    "Instructional Design",
    "E-learning",
    "Classroom Management",
    "Student Assessment",
    "Teacher Training",
    "Academic Advising",
    "Higher Education",
    "Online Teaching",
    "Tutoring",
    "Language Proficiency",
    "Special Education",
    "ESL (English as a Second Language)",
    "Public Speaking",
    "Educational Technology",
    "Educational Leadership",
    "Training Programs",

    // **Design and Creativity**
    "Graphic Design",
    "Web Design",
    "Logo Design",
    "Illustration",
    "UI Design",
    "UX Design",
    "3D Animation",
    "Motion Graphics",
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Adobe InDesign",
    "Adobe After Effects",
    "Sketch",
    "Figma",
    "Design Thinking",
    "Wireframing",
    "Prototyping",
    "Brand Design",
    "Packaging Design",
    "Typography",
    "Color Theory",
    "Creativity",

    // **Customer Service and Support**
    "Customer Service",
    "Customer Support",
    "Technical Support",
    "Call Center Management",
    "Problem Solving",
    "Communication Skills",
    "Conflict Resolution",
    "Active Listening",
    "Customer Satisfaction",
    "Order Management",
    "Complaint Handling",
    "CRM Software",
    "Helpdesk Support",

    // **Legal and Compliance**
    "Legal Research",
    "Contract Law",
    "Corporate Law",
    "Intellectual Property",
    "Real Estate Law",
    "Labor Law",
    "Legal Writing",
    "Compliance",
    "Regulatory Affairs",
    "Licensing",
    "Litigation",
    "Mergers & Acquisitions",
    "Risk Management",
    "Due Diligence",
    "Legal Drafting",
    "Privacy Law",
    "Data Protection",

    // **Project Management**
    "Project Management",
    "Agile Methodology",
    "Scrum",
    "Waterfall",
    "Project Planning",
    "Risk Management",
    "Stakeholder Management",
    "Project Scheduling",
    "Team Management",
    "Budget Management",
    "Resource Allocation",
    "Project Delivery",
    "Lean Six Sigma",
    "Kanban",
    "Project Charter",
    "Microsoft Project",
    "Project Scope Management",
    "Time Management",
    "Quality Management",
    "Project Documentation",
  ];

  // Debounce function to optimize search input
  let debounceTimer;
  skillsInput.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      filterSkills(skillsInput.value);
    }, 300);
  });

  // Function to filter skill suggestions
  function filterSkills(query) {
    skillsSuggestions.innerHTML = "";
    if (!query) {
      skillsSuggestions.style.display = "none";
      return;
    }

    const filteredSuggestions = skillSuggestionsData.filter(
      (skill) =>
        skill.toLowerCase().includes(query.toLowerCase()) &&
        !skillList.includes(skill)
    );

    filteredSuggestions.forEach((skill) => {
      const div = document.createElement("div");
      div.textContent = skill;
      div.addEventListener("click", () => addSkill(skill));
      skillsSuggestions.appendChild(div);
    });

    skillsSuggestions.style.display = filteredSuggestions.length
      ? "block"
      : "none";
  }

  // Function to add skill
  function addSkill(skill) {
    if (!skillList.includes(skill)) {
      skillList.push(skill);
      localStorage.setItem("skillsData", JSON.stringify(skillList));
      renderSkills();
    }
    skillsInput.value = "";
    skillsSuggestions.style.display = "none";
  }

  // Function to render skills list
  function renderSkills() {
    skillsList.innerHTML = "";
    skillList.forEach((skill) => {
      const skillTag = document.createElement("div");
      skillTag.classList.add("skill-tag");
      skillTag.textContent = skill;

      // Create delete button with Material Icon
      const deleteBtn = document.createElement("span");
      deleteBtn.classList.add("material-icons", "delete-btn");
      deleteBtn.textContent = "delete"; // Material icon for delete
      deleteBtn.addEventListener("click", () => removeSkill(skill));

      skillTag.appendChild(deleteBtn);
      skillsList.appendChild(skillTag);
    });
  }

  // Function to remove skill
  function removeSkill(skill) {
    skillList = skillList.filter((item) => item !== skill); // Remove selected skill from the list
    localStorage.setItem("skillsData", JSON.stringify(skillList)); // Update localStorage
    renderSkills(); // Re-render the skills list
  }

  // Initial rendering of skills from localStorage
  renderSkills();
});
