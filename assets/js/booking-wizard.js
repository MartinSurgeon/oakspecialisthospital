/**
 * Oak Specialist Hospital — Interactive Booking Wizard Controller
 * 
 * To update the Google Calendar links, replace the placeholder URLs in the
 * CALENDAR_MAP dictionary with your live Google Calendar Appointment Schedule URLs.
 */

// 1. Google Calendar Appointment Schedules Mapping
// Update each URL below as you create schedules for specific doctors/departments.
const CALENDAR_MAP = {
  // Doctor-specific schedules (Virtual and In-Person)
  doctors: {
    'dr-osei-agyemang': {
      name: 'Dr. Osei K. Agyemang',
      specialty: 'IVF Specialist',
      department: 'ivf',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'dr-ama-nkrumah': {
      name: 'Dr. Ama Nkrumah',
      specialty: 'Obstetrics & Gynaecology',
      department: 'obstetrics-gynaecology',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'dr-emmanuel-ofori': {
      name: 'Dr. Emmanuel Ofori',
      specialty: 'Paediatrics Specialist',
      department: 'paediatrics',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'dr-abigail-boateng': {
      name: 'Dr. Abigail Boateng',
      specialty: 'Embryology Specialist',
      department: 'ivf',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'any': {
      name: 'Any Specialist Available',
      specialty: 'General Duty Doctor',
      department: 'general-medicine',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    }
  },
  // Department-specific schedules (for general bookings without selecting a specific doctor)
  departments: {
    'general-medicine': {
      name: 'General/Family Medicine',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'obstetrics-gynaecology': {
      name: 'Obstetrics/Gynaecology',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'ivf': {
      name: 'In Vitro Fertilization',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'paediatrics': {
      name: 'Paediatrics',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'internal-medicine': {
      name: 'Internal Medicine',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'surgery': {
      name: 'Surgery',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'lab': {
      name: 'General Laboratory',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'pharmacy': {
      name: 'Pharmacy',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'ultrasound': {
      name: 'Ultrasound Scan Services',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    }
  },
  // Default hospital wide fallback links
  default: {
    virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
    inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
  }
};

// 2. Wizard State
const state = {
  currentStep: 1,
  selections: {
    type: null,        // 'virtual' or 'inPerson'
    department: null,  // department key (e.g. 'ivf')
    specialist: null   // specialist key (e.g. 'dr-osei-agyemang')
  }
};

// 3. Initialize Wizard
document.addEventListener('DOMContentLoaded', () => {
  // Setup selectors
  initializeChoiceCards();
  initializeNavButtons();
  initializeProgressBarNodes();
  
  // Parse query parameters for auto-selection
  parseQueryParams();
  
  // Render initial step
  renderStep(state.currentStep);
});

// 4. Choice Card Selection Logic
function initializeChoiceCards() {
  // Appointment Type cards (Step 1)
  const typeCards = document.querySelectorAll('.type-selection-card');
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      selectChoice('type', card.getAttribute('data-value'), typeCards, card);
    });
  });

  // Department cards (Step 2)
  const deptCards = document.querySelectorAll('.dept-selection-card');
  deptCards.forEach(card => {
    card.addEventListener('click', () => {
      selectChoice('department', card.getAttribute('data-value'), deptCards, card);
    });
  });

  // Doctor cards (Step 3)
  const docCards = document.querySelectorAll('.doc-selection-card');
  docCards.forEach(card => {
    card.addEventListener('click', () => {
      selectChoice('specialist', card.getAttribute('data-value'), docCards, card);
    });
  });
}

function selectChoice(key, value, cardGroup, selectedCard) {
  state.selections[key] = value;
  
  // Update visual selection class
  cardGroup.forEach(c => c.classList.remove('selected'));
  selectedCard.classList.add('selected');
  
  // Auto-fill related fields if applicable
  if (key === 'specialist' && value !== 'any' && value !== '') {
    const doctorObj = CALENDAR_MAP.doctors[value];
    if (doctorObj && doctorObj.department) {
      // Pre-select doctor's department in state silently
      state.selections.department = doctorObj.department;
      
      // Update department active state in DOM in case they go back
      const deptCards = document.querySelectorAll('.dept-selection-card');
      deptCards.forEach(c => {
        if (c.getAttribute('data-value') === doctorObj.department) {
          c.classList.add('selected');
        } else {
          c.classList.remove('selected');
        }
      });
    }
  }
  
  // Enable Next button for current step
  const nextBtn = document.querySelector('.wizard-btn-next');
  if (nextBtn) nextBtn.removeAttribute('disabled');
  
  // Smooth auto-advance on grid selections for better UX (Step 1 -> 2, Step 2 -> 3)
  setTimeout(() => {
    if (state.currentStep < 3) {
      navigateStep(1);
    }
  }, 350);
}

// 5. Progress Bar & Step Navigation
function initializeProgressBarNodes() {
  const steps = document.querySelectorAll('.progress-step');
  steps.forEach((stepNode, idx) => {
    stepNode.addEventListener('click', () => {
      const targetStep = idx + 1;
      
      // Allow moving backward anytime, or forward ONLY if choices have been made
      if (targetStep < state.currentStep) {
        state.currentStep = targetStep;
        renderStep(state.currentStep);
      } else if (targetStep > state.currentStep) {
        let canNavigate = true;
        for (let i = 1; i < targetStep; i++) {
          if (!isStepValid(i)) {
            canNavigate = false;
            break;
          }
        }
        if (canNavigate) {
          state.currentStep = targetStep;
          renderStep(state.currentStep);
        }
      }
    });
  });
}

function isStepValid(step) {
  if (step === 1) return state.selections.type !== null;
  if (step === 2) return state.selections.department !== null;
  if (step === 3) return state.selections.specialist !== null;
  return true;
}

function initializeNavButtons() {
  const prevBtn = document.querySelector('.wizard-btn-prev');
  const nextBtn = document.querySelector('.wizard-btn-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateStep(-1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateStep(1));
  }
}

function navigateStep(direction) {
  const targetStep = state.currentStep + direction;
  
  if (targetStep >= 1 && targetStep <= 5) {
    // If going forward, check validation
    if (direction > 0 && !isStepValid(state.currentStep)) {
      return;
    }
    
    state.currentStep = targetStep;
    renderStep(state.currentStep);
  }
}

function renderStep(stepNumber) {
  // Update step panes visibility
  const panes = document.querySelectorAll('.wizard-step-pane');
  panes.forEach(pane => {
    pane.classList.remove('active');
  });
  
  const activePane = document.getElementById(`step-pane-${stepNumber}`);
  if (activePane) {
    activePane.classList.add('active');
  }

  // Update progress steps active states
  const progressSteps = document.querySelectorAll('.progress-step');
  progressSteps.forEach((stepNode, idx) => {
    const nodeStepNum = idx + 1;
    stepNode.classList.remove('active', 'completed');
    
    if (nodeStepNum === stepNumber) {
      stepNode.classList.add('active');
    } else if (nodeStepNum < stepNumber) {
      stepNode.classList.add('completed');
    }
  });

  // Update Progress Line Fill (divid by 4 for 5 steps)
  const fillPercent = ((stepNumber - 1) / 4) * 100;
  const fillLine = document.querySelector('.progress-line-fill');
  if (fillLine) {
    fillLine.style.width = `${fillPercent}%`;
  }

  // Toggle standard navigation actions bar on final confirmation page
  const actionsBar = document.querySelector('.wizard-navigation-actions');
  if (actionsBar) {
    if (stepNumber === 5) {
      actionsBar.style.display = 'none';
    } else {
      actionsBar.style.display = 'flex';
    }
  }

  // Update Navigation buttons
  const prevBtn = document.querySelector('.wizard-btn-prev');
  const nextBtn = document.querySelector('.wizard-btn-next');

  if (prevBtn) {
    if (stepNumber === 1) {
      prevBtn.style.visibility = 'hidden';
    } else {
      prevBtn.style.visibility = 'visible';
    }
  }

  if (nextBtn) {
    if (stepNumber >= 4) {
      nextBtn.style.display = 'none'; // Hide next on scheduling and confirmation steps
    } else {
      nextBtn.style.display = 'flex';
      
      // Disable next button if step not completed
      if (isStepValid(stepNumber)) {
        nextBtn.removeAttribute('disabled');
      } else {
        nextBtn.setAttribute('disabled', 'true');
      }
    }
  }

  // Trigger Google Calendar Generation on Step 4
  if (stepNumber === 4) {
    generateCalendarSchedule();
  }

  // Populate receipt details on Step 5 Success Screen
  if (stepNumber === 5) {
    populateConfirmationReceipt();
  }
}

// 6. Dynamic Google Calendar Integration
function generateCalendarSchedule() {
  const iframeWrapper = document.getElementById('calendar-iframe-wrapper');
  const iframeEl = document.getElementById('calendar-booking-iframe');
  const directLinkBtn = document.getElementById('calendar-direct-link');
  const fallbackSection = document.getElementById('calendar-fallback-card');
  
  // Determine correct booking URL
  let bookingUrl = '';
  const typeKey = state.selections.type === 'virtual' ? 'virtual' : 'inPerson';
  
  if (state.selections.specialist && state.selections.specialist !== 'any') {
    const doctorObj = CALENDAR_MAP.doctors[state.selections.specialist];
    if (doctorObj && doctorObj[typeKey]) {
      bookingUrl = doctorObj[typeKey];
    }
  } else if (state.selections.department) {
    const deptObj = CALENDAR_MAP.departments[state.selections.department];
    if (deptObj && deptObj[typeKey]) {
      bookingUrl = deptObj[typeKey];
    }
  }
  
  // Ultimate Fallback
  if (!bookingUrl) {
    bookingUrl = CALENDAR_MAP.default[typeKey];
  }

  // Update selection banner display
  renderSummaryBanner();

  // Try loading iframe (if browser constraints permit) & provide standard open in new tab backup
  if (iframeEl && bookingUrl) {
    iframeEl.src = bookingUrl;
    iframeWrapper.style.display = 'block';
    
    // Hide standard logo fallback if iframe is set to render
    if (fallbackSection) {
      fallbackSection.style.display = 'none';
    }
  }
  
  if (directLinkBtn && bookingUrl) {
    directLinkBtn.href = bookingUrl;
  }
}

function renderSummaryBanner() {
  // Fetch text values
  const typeText = state.selections.type === 'virtual' ? 'Virtual Consultation (Google Meet)' : 'In-Person Consultation';
  
  let deptText = 'General Medicine';
  if (state.selections.department) {
    const deptObj = CALENDAR_MAP.departments[state.selections.department];
    if (deptObj) deptText = deptObj.name;
  }

  let docText = 'Any Available Specialist';
  if (state.selections.specialist) {
    const docObj = CALENDAR_MAP.doctors[state.selections.specialist];
    if (docObj) docText = docObj.name;
  }

  // Inject into summary banner
  const typeSpan = document.getElementById('summary-val-type');
  const deptSpan = document.getElementById('summary-val-dept');
  const docSpan = document.getElementById('summary-val-doc');

  if (typeSpan) typeSpan.textContent = typeText;
  if (deptSpan) deptSpan.textContent = deptText;
  if (docSpan) docSpan.textContent = docText;
}

// Support changing preferences from final step
window.resetToStep = function(stepNum) {
  state.currentStep = stepNum;
  renderStep(state.currentStep);
};

// 7. Query Parameter Auto-Selection Deep-Linking
function parseQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  
  const typeParam = urlParams.get('type');       // 'virtual' or 'inperson'
  const deptParam = urlParams.get('dept');       // e.g. 'ivf', 'paediatrics'
  const doctorParam = urlParams.get('doctor');   // e.g. 'dr-osei-agyemang'

  let validSelections = 0;

  // Set Type
  if (typeParam) {
    const normalizedType = typeParam.toLowerCase() === 'virtual' ? 'virtual' : 'inPerson';
    state.selections.type = normalizedType;
    
    const typeCards = document.querySelectorAll('.type-selection-card');
    typeCards.forEach(c => {
      if (c.getAttribute('data-value') === normalizedType) {
        c.classList.add('selected');
        validSelections++;
      } else {
        c.classList.remove('selected');
      }
    });
  }

  // Set Specialist (checked first because it auto-fills department)
  if (doctorParam) {
    const doctorKey = doctorParam.toLowerCase();
    if (CALENDAR_MAP.doctors[doctorKey]) {
      state.selections.specialist = doctorKey;
      validSelections++;
      
      const docCards = document.querySelectorAll('.doc-selection-card');
      docCards.forEach(c => {
        if (c.getAttribute('data-value') === doctorKey) {
          c.classList.add('selected');
        } else {
          c.classList.remove('selected');
        }
      });
      
      // Auto fill doctor's department in selections
      const doctorObj = CALENDAR_MAP.doctors[doctorKey];
      state.selections.department = doctorObj.department;
      
      const deptCards = document.querySelectorAll('.dept-selection-card');
      deptCards.forEach(c => {
        if (c.getAttribute('data-value') === doctorObj.department) {
          c.classList.add('selected');
        } else {
          c.classList.remove('selected');
        }
      });
    }
  }

  // Set Department (only if specialist wasn't set or was set to general 'any')
  if (deptParam && (!doctorParam || state.selections.specialist === 'any')) {
    const deptKey = deptParam.toLowerCase();
    if (CALENDAR_MAP.departments[deptKey]) {
      state.selections.department = deptKey;
      validSelections++;
      
      const deptCards = document.querySelectorAll('.dept-selection-card');
      deptCards.forEach(c => {
        if (c.getAttribute('data-value') === deptKey) {
          c.classList.add('selected');
        } else {
          c.classList.remove('selected');
        }
      });
    }
  }

  // Determine what step to put the user on automatically based on provided query params
  if (validSelections > 0) {
    if (state.selections.type && state.selections.department && state.selections.specialist) {
      // All selections set, jump to Step 4 (Calendar Scheduling) immediately!
      state.currentStep = 4;
    } else if (state.selections.type && state.selections.department) {
      // Type and Dept set, put on Step 3 (Doctors)
      state.currentStep = 3;
    } else if (state.selections.type) {
      // Only type set, put on Step 2 (Departments)
      state.currentStep = 2;
    } else if (state.selections.department || state.selections.specialist) {
      // Department or Doctor set but type missing, put on Step 1 to choose Virtual vs In-Person
      state.currentStep = 1;
    }
  }
}

// 8. Completed Booking Step 5 Transitions
window.navigateToStep5 = function() {
  state.currentStep = 5;
  renderStep(5);
};

function populateConfirmationReceipt() {
  // Fetch text values
  const typeText = state.selections.type === 'virtual' ? 'Virtual Consultation (Google Meet)' : 'In-Person Consultation';
  
  let deptText = 'General Medicine';
  if (state.selections.department) {
    const deptObj = CALENDAR_MAP.departments[state.selections.department];
    if (deptObj) deptText = deptObj.name;
  }

  let docText = 'Any Available Specialist';
  if (state.selections.specialist) {
    const docObj = CALENDAR_MAP.doctors[state.selections.specialist];
    if (docObj) docText = docObj.name;
  }

  // Determine Location and Instructions
  let locationText = '';
  let instructionsText = '';

  if (state.selections.type === 'virtual') {
    locationText = 'Google Meet (Secure Link Sent via Email)';
    instructionsText = 'A secure Google Meet video conference link has been generated and sent to your email. Please check your inbox (and spam/promotions folder) for the calendar invite from Oak Specialist Hospital. Simply click the invite link to join the video session with ' + docText + '.';
  } else {
    locationText = 'Bek-Egg Hotel Rd, Fankyenebra-Santasi, Kumasi, Ghana';
    instructionsText = 'Please arrive at our clinic 15 minutes prior to your selected time slot for patient registration. Remember to bring any previous medical records, scan reports, or lab results relevant to your consultation. We look forward to receiving you!';
  }

  // Inject into Step 5 receipt DOM
  const rType = document.getElementById('receipt-val-type');
  const rDept = document.getElementById('receipt-val-dept');
  const rDoc = document.getElementById('receipt-val-doc');
  const rLocation = document.getElementById('receipt-val-location');
  const rInstructions = document.getElementById('receipt-val-instructions');

  if (rType) rType.textContent = typeText;
  if (rDept) rDept.textContent = deptText;
  if (rDoc) rDoc.textContent = docText;
  if (rLocation) rLocation.textContent = locationText;
  if (rInstructions) rInstructions.textContent = instructionsText;
}
