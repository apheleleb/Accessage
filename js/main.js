// Fallback embedded data so pages work seamlessly even when opened directly via file:// without a local server
const FALLBACK_OPPORTUNITIES = [
  {
    "title": "Allan Gray Orbis Foundation Fellowship",
    "organization": "Allan Gray Orbis Foundation",
    "country": "South Africa",
    "category": "Fellowships",
    "deadline": "30 April",
    "summary": "Full university funding and entrepreneurial leadership development for Grade 12 learners.",
    "link": "https://www.allangrayorbis.org"
  },
  {
    "title": "Sasol Bursary Programme (STEM & Commerce)",
    "organization": "Sasol South Africa",
    "country": "South Africa",
    "category": "Bursaries",
    "deadline": "15 May",
    "summary": "Comprehensive undergraduate bursary covering tuition, accommodation, books, and stipends.",
    "link": "https://www.sasolbursaries.com"
  },
  {
    "title": "SAICA Thuthuka Bursary Fund",
    "organization": "South African Institute of Chartered Accountants",
    "country": "South Africa",
    "category": "Bursaries",
    "deadline": "31 August",
    "summary": "Financial and academic wrap-around support for aspiring Chartered Accountants.",
    "link": "https://www.thuthukabursaryfund.co.za"
  },
  {
    "title": "South African Youth Climate & Policy Hackathon",
    "organization": "Youth Policy Initiative",
    "country": "South Africa",
    "category": "Competitions",
    "deadline": "12 June",
    "summary": "National high school research and policy challenge addressing urban sustainability.",
    "link": "#submit-opportunity"
  },
  {
    "title": "National Science Olympiad",
    "organization": "SAASTA",
    "country": "South Africa",
    "category": "Competitions",
    "deadline": "20 July",
    "summary": "Annual Physical and Life Sciences competition for Grade 10–12 learners across all nine provinces.",
    "link": "https://www.saasta.ac.za"
  },
  {
    "title": "Young Leaders Civic Fellowship",
    "organization": "Activate! Change Drivers",
    "country": "South Africa",
    "category": "Leadership Programmes",
    "deadline": "18 September",
    "summary": "Community leadership and civic advocacy network for young changemakers.",
    "link": "https://www.activateleadership.co.za"
  }
];

  const FALLBACK_TEAM = [
  {
    "name": "Mathapelo Mosala",
    "initials": "MM",
    "image": "images/mathapelo.jpg",
    "role": "Program Assistant",
    "study": "Honours in Criminology",
    "bio": "Joined ACCESSAGE to be part of an organization that not only focuses on youth empowerment, but also actively builds practical bridges to education."
  },
  {
    "name": "Iyanaimvulayezibusiso Khumalo",
    "initials": "IK",
    "image": "images/iyana.jpg",
    "role": "Research Assistant & Youth Advocate",
    "study": "Public Administration & International Relations, University of Pretoria",
    "bio": "Theirworld Global Youth Ambassador and youth advocate dedicated to translating learner experiences into actionable education policy research."
  },
  {
    "name": "Mbali Mtshali",
    "initials": "MM",
    "image": "images/mbali.jpg",
    "role": "Design Assistant",
    "study": "BSc AgriEconomics and Agribusiness",
    "bio": "Passionate about helping learners from under-resourced communities grow across diverse avenues—beyond a single traditional academic path."
  }
];

const FALLBACK_INSIGHTS = [
  {
    "category": "Myth vs Reality",
    "title": "Myth: University Is the Only Valid Path After Matric",
    "date": "October 2026",
    "readTime": "4 min read",
    "excerpt": "Why TVET colleges, accredited learnerships, and artisanal apprenticeships offer high-demand careers with lower debt barriers."
  },
  {
    "category": "Research Findings",
    "title": "What 400+ South African Learners Told Us About Career Guidance",
    "date": "September 2026",
    "readTime": "6 min read",
    "excerpt": "Key takeaways from our school engagement workshops: 68% of Grade 11 learners had never calculated their APS before third term."
  },
  {
    "category": "Opportunity Guides",
    "title": "How to Prepare a Strong Bursary Motivation Letter in Grade 11",
    "date": "August 2026",
    "readTime": "5 min read",
    "excerpt": "Practical structure, common pitfalls to avoid, and how to highlight community involvement even without formal leadership titles."
  },
  {
    "category": "Founder Reflections",
    "title": "Why We Listen Before We Lead",
    "date": "July 2026",
    "readTime": "3 min read",
    "excerpt": "Building ACCESSAGE around real learner voices rather than assumptions made from outside the classroom."
  }
];

async function loadJSON(path, fallback) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (e) {
    return fallback;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Newsletter Subscribe Forms
  document.querySelectorAll('.subscribe-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const msg = form.parentElement.querySelector('.notice-toast');
      if (input && input.value.trim()) {
        if (msg) msg.textContent = `Subscribed ${input.value.trim()} to ACCESSAGE opportunity alerts.`;
        input.value = '';
      }
    });
  });

  // Render Team Cards (on About page)
  // const teamGrid = document.getElementById('teamGrid');
  // if (teamGrid) {
  //   loadJSON('data/team.json', FALLBACK_TEAM).then(members => {
  //     teamGrid.innerHTML = members.map(m => `
  //       <article class="card">
  //         <div>
  //           <div class="team-avatar">${m.initials}</div>
  //           <h3>${m.name}</h3>
  //           <div class="team-role">${m.role}</div>
  //           <div class="team-study">${m.study}</div>
  //           <p>${m.bio}</p>
  //         </div>
  //       </article>
  //     `).join('');
  //   });
  // }
  // Update FALLBACK_TEAM at the top of js/main.js
// Render Team Cards (on About page)
 const teamGrid = document.getElementById('teamGrid');
  if (teamGrid) {
    loadJSON('data/team.json', FALLBACK_TEAM).then(members => {
      teamGrid.innerHTML = members.map(m => `
        <article class="card team-card">
          <div class="team-profile-container">
            ${m.image 
              ? `<img src="${m.image}" alt="${m.name}" class="team-photo-lg ${m.cssClass || ''}" onerror="this.outerHTML='<div class=\'team-avatar-lg\'>${m.initials}</div>'" />`
              : `<div class="team-avatar-lg">${m.initials}</div>`
            }
            <div class="team-info">
              <h3>${m.name}</h3>
              <div class="team-role">${m.role}</div>
              <div class="team-study">${m.study}</div>
              <p>${m.bio}</p>
            </div>
          </div>
        </article>
      `).join('');
    });
  }



  // Render Opportunities (Home featured & Full Opportunities Page)
  const homeOppGrid = document.getElementById('homeOpportunitiesGrid');
  const fullOppGrid = document.getElementById('fullOpportunitiesGrid');

  if (homeOppGrid || fullOppGrid) {
    loadJSON('data/opportunities.json', FALLBACK_OPPORTUNITIES).then(opps => {
      const renderOppCard = (item) => `
        <article class="card">
          <div>
            <span class="badge">${item.category}</span>
            <h3>${item.title}</h3>
            <p style="margin-top:0.4rem;">${item.summary}</p>
          </div>
          <div>
            <div class="meta-row">
              <span><strong>Org:</strong> ${item.organization}</span>
              <span><strong>Deadline:</strong> ${item.deadline}</span>
            </div>
            <a href="${item.link}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Apply / View Details</a>
          </div>
        </article>
      `;

      if (homeOppGrid) {
        homeOppGrid.innerHTML = opps.slice(0, 3).map(renderOppCard).join('');
      }

      if (fullOppGrid) {
        let activeCat = 'All';
        let searchQuery = '';

        const updateOppList = () => {
          const filtered = opps.filter(o => {
            const matchCat = activeCat === 'All' || o.category === activeCat;
            const matchSearch = o.title.toLowerCase().includes(searchQuery) ||
                                o.organization.toLowerCase().includes(searchQuery);
            return matchCat && matchSearch;
          });
          fullOppGrid.innerHTML = filtered.length
            ? filtered.map(renderOppCard).join('')
            : '<p style="color:var(--text-secondary);">No matching opportunities found for this filter.</p>';
        };

        document.querySelectorAll('.opp-filter').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.opp-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCat = btn.dataset.category;
            updateOppList();
          });
        });

        const searchInput = document.getElementById('oppSearch');
        if (searchInput) {
          searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            updateOppList();
          });
        }

        updateOppList();
      }
    });
  }

  // Render Insights (Home featured & Insights page)
  const homeInsightsGrid = document.getElementById('homeInsightsGrid');
  const fullInsightsGrid = document.getElementById('fullInsightsGrid');

  if (homeInsightsGrid || fullInsightsGrid) {
    loadJSON('data/insights.json', FALLBACK_INSIGHTS).then(posts => {
      const renderInsightCard = (p) => `
        <article class="card">
          <div>
            <span class="badge">${p.category}</span>
            <h3>${p.title}</h3>
            <p style="margin-top:0.5rem;">${p.excerpt}</p>
          </div>
          <div class="meta-row">
            <span>${p.date}</span>
            <span>${p.readTime}</span>
          </div>
        </article>
      `;

      if (homeInsightsGrid) {
        homeInsightsGrid.innerHTML = posts.slice(0, 3).map(renderInsightCard).join('');
      }
      if (fullInsightsGrid) {
        fullInsightsGrid.innerHTML = posts.map(renderInsightCard).join('');
      }
    });
  }

  // Interactive Matric APS Calculator (Career Pathways Page)
  const calcBtn = document.getElementById('calculateApsBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const selects = document.querySelectorAll('.aps-level-select');
      let total = 0;
      selects.forEach((sel, idx) => {
        const val = parseInt(sel.value, 10) || 0;
        // Life Orientation (index 3) is commonly excluded or halved in SA university APS calculations;
        // here we include 6 core subjects excluding LO as standard practice.
        if (sel.dataset.subject !== 'LO') {
          total += val;
        }
      });
      const scoreEl = document.getElementById('apsTotalScore');
      const noteEl = document.getElementById('apsGuidanceNote');
      if (scoreEl) scoreEl.textContent = `${total} / 42`;
      if (noteEl) {
        if (total >= 34) {
          noteEl.textContent = 'Competitive for most Bachelor’s degree programmes (check specific Mathematics/Physical Sciences thresholds).';
        } else if (total >= 26) {
          noteEl.textContent = 'Strong range for many Bachelor’s and Diploma programmes across South African universities and UoTs.';
        } else {
          noteEl.textContent = 'Consider Higher Certificates, TVET NCV/NATED programmes, or accredited learnerships as structured bridging pathways.';
        }
      }
    });
  }

  // Generic Interactive Forms (Learner Survey, Contact, Opportunity Submission)
  document.querySelectorAll('.interactive-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.notice-toast');
      if (status) {
        status.textContent = form.dataset.success || 'Thank you. Your submission has been recorded.';
      }
      form.reset();
    });
  });
});
