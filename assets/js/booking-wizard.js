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
    'pediatric-surgery': {
      name: 'Pediatric Surgery',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'general-surgery': {
      name: 'General Surgery',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'anaesthetic': {
      name: 'Anaesthetic',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'gynae-oncology': {
      name: 'Gynae-oncology',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'haematology': {
      name: 'Haematology',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'opthalmology': {
      name: 'Opthalmology',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'dietician': {
      name: 'Dietician',
      virtual: 'https://calendar.app.google/GZWKQ9498GU69czN6',
      inPerson: 'https://calendar.app.google/GZWKQ9498GU69czN6'
    },
    'other-services': {
      name: 'Any other services',
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
  initializeSpecialtyFilters();
  initializeNavButtons();
  initializeProgressBarNodes();
  
  // Dynamic search listener for doctor selection
  const searchInput = document.getElementById('doctor-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterDoctorsBySearch(e.target.value);
    });
  }

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
}

function selectChoice(key, value, cardGroup, selectedCard) {
  state.selections[key] = value;
  
  // Update visual selection class
  cardGroup.forEach(c => c.classList.remove('selected'));
  if (selectedCard) selectedCard.classList.add('selected');
  
  // Auto-fill related fields if applicable
  if (key === 'specialist' && value !== 'any' && value !== '') {
    const doctorObj = CALENDAR_MAP.doctors[value] || window.DOCTORS_DATA.find(d => d.id === value);
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
    } else if (doctorObj && doctorObj.dept) { // from DOCTORS_DATA
      state.selections.department = doctorObj.dept;
      const deptCards = document.querySelectorAll('.dept-selection-card');
      deptCards.forEach(c => {
        if (c.getAttribute('data-value') === doctorObj.dept) {
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

  // Trigger dynamic doctor grid generation on Step 3
  if (stepNumber === 3) {
    renderDoctorSelectionGrid();
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
  const formContainer = document.getElementById('booking-details-form-container');
  const calendarWrapper = document.getElementById('calendar-scheduling-interactive-wrapper');
  const editBtn = document.getElementById('edit-client-details-btn');
  
  // Set minimum date to today
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Toggle form vs calendar based on client details state
  if (state.clientDetails) {
    const nameEl = document.getElementById('client-name');
    const phoneEl = document.getElementById('client-phone');
    if (nameEl) nameEl.value = state.clientDetails.name || '';
    if (phoneEl) phoneEl.value = state.clientDetails.phone || '';
    
    if (formContainer) formContainer.style.display = 'none';
    if (calendarWrapper) calendarWrapper.style.display = 'block';
    if (editBtn) editBtn.style.display = 'inline-block';
  } else {
    if (formContainer) formContainer.style.display = 'block';
    if (calendarWrapper) calendarWrapper.style.display = 'none';
    if (editBtn) editBtn.style.display = 'none';
  }

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
    } else {
      // Fallback: search in global DOCTORS_DATA to find the doctor's department
      const docRecord = window.DOCTORS_DATA.find(d => d.id === state.selections.specialist);
      if (docRecord && docRecord.dept) {
        const deptObj = CALENDAR_MAP.departments[docRecord.dept];
        if (deptObj && deptObj[typeKey]) {
          bookingUrl = deptObj[typeKey];
        }
      }
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
    if (state.selections.specialist === 'any') {
      docText = 'Any Available Specialist';
    } else {
      const docObj = CALENDAR_MAP.doctors[state.selections.specialist];
      if (docObj) {
        docText = docObj.name;
      } else {
        const docRecord = window.DOCTORS_DATA.find(d => d.id === state.selections.specialist);
        if (docRecord) docText = docRecord.name;
      }
    }
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
    const docInCal = CALENDAR_MAP.doctors[doctorKey];
    const docInGlobal = window.DOCTORS_DATA.find(d => d.id === doctorKey);
    
    if (docInCal || docInGlobal) {
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
      const deptKey = docInCal ? docInCal.department : (docInGlobal ? docInGlobal.dept : null);
      if (deptKey) {
        state.selections.department = deptKey;
        
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
  const dateEl = document.getElementById('booking-date');
  const timeEl = document.getElementById('booking-time');
  
  const bookingDate = dateEl ? dateEl.value : '';
  const bookingTime = timeEl ? timeEl.value : '';

  if (!bookingDate || !bookingTime) {
    alert('Please select the Date and Time slot you scheduled on the calendar to receive your confirmation SMS.');
    return;
  }

  // Find button to show loading
  const confirmBtn = document.querySelector('.booking-completed-action-banner button');
  const originalBtnText = confirmBtn ? confirmBtn.innerHTML : 'Yes, I Have Booked My Slot! → View Confirmation';
  
  if (confirmBtn) {
    confirmBtn.setAttribute('disabled', 'true');
    confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right: 8px;"></i>Processing Confirmation...';
  }

  let deptText = 'General Medicine';
  if (state.selections.department) {
    const deptObj = CALENDAR_MAP.departments[state.selections.department];
    if (deptObj) deptText = deptObj.name;
  }

  let docText = 'Any Available Specialist';
  if (state.selections.specialist) {
    if (state.selections.specialist === 'any') {
      docText = 'Any Available Specialist';
    } else {
      const docObj = CALENDAR_MAP.doctors[state.selections.specialist];
      if (docObj) {
        docText = docObj.name;
      } else {
        const docRecord = window.DOCTORS_DATA.find(d => d.id === state.selections.specialist);
        if (docRecord) docText = docRecord.name;
      }
    }
  }

  // Format date and time beautifully
  const formattedDate = formatDateString(bookingDate);
  const formattedTime = formatTimeString(bookingTime);

  // Save selection inside client details state
  if (state.clientDetails) {
    state.clientDetails.date = formattedDate;
    state.clientDetails.time = formattedTime;
  } else {
    state.clientDetails = { phone: '', date: formattedDate, time: formattedTime };
  }

  // Gracefully handle local file:// testing and Node.js static Live Server (port 5500)
  if (window.location.protocol === 'file:' || window.location.port === '5500') {
    console.warn('Local file protocol or static Live Server detected (' + (window.location.port === '5500' ? 'VS Code Live Server on port 5500' : 'file://') + '). SMS API dispatch bypassed for local simulation.');
    console.info('NOTE: Static file servers like VS Code Live Server do not execute PHP and will reject POST requests with a 405 Method Not Allowed error. To test live PHP SMS integrations, please run this project via Apache (XAMPP) at http://localhost/oakspecialisthospital/.');
    setTimeout(() => {
      if (confirmBtn) {
        confirmBtn.removeAttribute('disabled');
        confirmBtn.innerHTML = originalBtnText;
      }
      state.currentStep = 5;
      renderStep(5);
    }, 800);
    return;
  }

  const payload = {
    name: state.clientDetails ? state.clientDetails.name : 'Client',
    email: '',
    phone: state.clientDetails ? state.clientDetails.phone : '',
    type: state.selections.type,
    doctor: docText,
    department: deptText,
    date: formattedDate,
    time: formattedTime
  };

  fetch('send_sms.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP status ' + response.status + ' (' + response.statusText + ')');
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server did not return a JSON response. Check if your web server supports PHP execution.');
    }
    return response.json();
  })
  .then(data => {
    console.log('SMS response:', data);
    if (data.status === 'simulation') {
      console.info('SMS Simulation successful:', data.message);
    } else if (data.status === 'success') {
      console.info('SMS Sent successfully:', data.message);
    } else {
      console.warn('SMS failed to send:', data.message);
    }
  })
  .catch(err => {
    console.error('Error dispatching SMS request:', err.message || err);
    console.warn('NOTE: Ensure you are running this project via an active Apache (XAMPP) server to enable PHP backend execution.');
  })
  .finally(() => {
    // Restore button state
    if (confirmBtn) {
      confirmBtn.removeAttribute('disabled');
      confirmBtn.innerHTML = originalBtnText;
    }
    
    // Always transition to Step 5 to ensure user gets their receipt
    state.currentStep = 5;
    renderStep(5);
  });
};

window.submitBookingFormDetails = function() {
  const nameEl = document.getElementById('client-name');
  const phoneEl = document.getElementById('client-phone');

  if (!phoneEl || !nameEl) return;

  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();

  if (!name) {
    alert('Please enter your name for a personalized message.');
    return;
  }

  if (!phone) {
    alert('Please enter your telephone number to receive booking confirmation.');
    return;
  }

  // Simple validation checks
  if (phone.length < 9) {
    alert('Please enter a valid telephone number.');
    return;
  }

  // Save details in state
  state.clientDetails = { name, phone };

  // Generate / reload calendar schedule
  generateCalendarSchedule();

  // Hide Details form and show calendar interactive wrapper
  const formContainer = document.getElementById('booking-details-form-container');
  const calendarWrapper = document.getElementById('calendar-scheduling-interactive-wrapper');

  if (formContainer) formContainer.style.display = 'none';
  if (calendarWrapper) calendarWrapper.style.display = 'block';
};

window.showDetailsForm = function() {
  const formContainer = document.getElementById('booking-details-form-container');
  const calendarWrapper = document.getElementById('calendar-scheduling-interactive-wrapper');
  if (formContainer) formContainer.style.display = 'block';
  if (calendarWrapper) calendarWrapper.style.display = 'none';
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
    if (state.selections.specialist === 'any') {
      docText = 'Any Available Specialist';
    } else {
      const docObj = CALENDAR_MAP.doctors[state.selections.specialist];
      if (docObj) {
        docText = docObj.name;
      } else {
        const docRecord = window.DOCTORS_DATA.find(d => d.id === state.selections.specialist);
        if (docRecord) docText = docRecord.name;
      }
    }
  }

  // Determine Location and Instructions
  let locationText = '';
  let instructionsText = '';

  if (state.selections.type === 'virtual') {
    locationText = 'Google Meet (Secure Link Sent via Email)';
    instructionsText = 'A secure Google Meet video conference link has been generated and sent to your email. Please check your inbox (and spam/promotions folder) for the calendar invite from Oak Specialist Hospital. Simply click the invite link to join the video session with ' + docText + '.';
  } else {
    locationText = 'Bek-Egg Hotel Rd, Fankyenebra-Santasi, Kumasi, Ghana';
    instructionsText = 'Please arrive at our clinic 15 minutes prior to your selected time slot for client registration. Remember to bring any previous medical records, scan reports, or lab results relevant to your consultation. We look forward to receiving you!';
  }

  // Inject into Step 5 receipt DOM
  const rType = document.getElementById('receipt-val-type');
  const rDept = document.getElementById('receipt-val-dept');
  const rDoc = document.getElementById('receipt-val-doc');
  const rLocation = document.getElementById('receipt-val-location');
  const rInstructions = document.getElementById('receipt-val-instructions');
  const rDateTime = document.getElementById('receipt-val-datetime');

  if (rType) rType.textContent = typeText;
  if (rDept) rDept.textContent = deptText;
  if (rDoc) rDoc.textContent = docText;
  if (rLocation) rLocation.textContent = locationText;
  if (rInstructions) rInstructions.textContent = instructionsText;
  
  if (rDateTime && state.clientDetails && state.clientDetails.date) {
    rDateTime.textContent = state.clientDetails.date + ' at ' + state.clientDetails.time;
  }
}

// Helper: Format Date String beautifully (e.g. 2026-05-25 -> Mon, May 25, 2026)
function formatDateString(dateStr) {
  try {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', options);
  } catch (e) {
    return dateStr;
  }
}

// Helper: Format Time String beautifully (e.g. 14:30 -> 2:30 PM)
function formatTimeString(timeStr) {
  try {
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  } catch (e) {
    return timeStr;
  }
}

// ==============================================================
// Oak Specialist Hospital — Interactive HCI Specialty Dynamic Filters
// ==============================================================
function initializeSpecialtyFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const specialtyCards = document.querySelectorAll('.dept-selection-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      specialtyCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('hidden-by-filter');
        } else {
          card.classList.add('hidden-by-filter');
        }
      });
    });
  });
}

// ==============================================================
// Oak Specialist Hospital — Dynamic Specialist Doctor Card Generator
// ==============================================================
function renderDoctorSelectionGrid() {
  const gridContainer = document.querySelector('#step-pane-3 .choice-cards-grid');
  if (!gridContainer) return;

  // Clear existing content
  gridContainer.innerHTML = '';

  const selectedDept = state.selections.department;
  
  // Filter doctors belonging to selected department
  let filteredDoctors = [];
  if (selectedDept) {
    filteredDoctors = window.DOCTORS_DATA.filter(doc => doc.dept === selectedDept);
  } else {
    filteredDoctors = window.DOCTORS_DATA;
  }

  // If no doctors are found, show a clean message
  if (filteredDoctors.length === 0) {
    gridContainer.innerHTML = `
      <div class="no-results-message">
        <i class="fa-solid fa-user-doctor"></i>
        <p>No specific specialists registered under this department yet. Please choose "Any Available Doctor" below.</p>
      </div>
    `;
  }

  // Create cards for each doctor
  filteredDoctors.forEach((doc, index) => {
    const isSelected = state.selections.specialist === doc.id;
    
    // Choose a gradient color variation based on index
    const gradIndex = (index % 6) + 1;
    
    // Extract initials (e.g. "Dr. Rex Djokoto" -> "RD", "Rd. Benjamin" -> "RB")
    const cleanedName = doc.name.replace(/^(Dr\.|Rd\.)\s+/i, '');
    const nameParts = cleanedName.split(' ');
    const initials = nameParts.map(p => p[0]).slice(0, 2).join('').toUpperCase();

    const card = document.createElement('div');
    card.className = `option-selection-card doc-selection-card doctor-selection-card ${isSelected ? 'selected' : ''}`;
    card.setAttribute('data-value', doc.id);
    
    card.innerHTML = `
      <div class="card-checked-indicator"><i class="fa-solid fa-check"></i></div>
      <div class="doctor-avatar-circle grad-${gradIndex}">${initials}</div>
      <h4 class="option-card-title">${doc.name}</h4>
      <p class="option-card-subtitle">${doc.title}</p>
      <span class="doctor-specialty-badge">${doc.badge}</span>
    `;

    // Click listener to select doctor
    card.addEventListener('click', () => {
      const allCards = gridContainer.querySelectorAll('.doc-selection-card');
      selectChoice('specialist', doc.id, allCards, card);
    });

    gridContainer.appendChild(card);
  });

  // Always append the "Any Available Doctor" option
  const isAnySelected = state.selections.specialist === 'any';
  const anyCard = document.createElement('div');
  anyCard.className = `option-selection-card doc-selection-card doctor-selection-card ${isAnySelected ? 'selected' : ''}`;
  anyCard.setAttribute('data-value', 'any');
  
  anyCard.innerHTML = `
    <div class="card-checked-indicator"><i class="fa-solid fa-check"></i></div>
    <div class="doctor-avatar-circle"><i class="fa-solid fa-user-doctor"></i></div>
    <h4 class="option-card-title">Any Available Doctor</h4>
    <p class="option-card-subtitle">Schedule with the first available specialist doctor.</p>
    <span class="doctor-specialty-badge">Fast-Track</span>
  `;

  anyCard.addEventListener('click', () => {
    const allCards = gridContainer.querySelectorAll('.doc-selection-card');
    selectChoice('specialist', 'any', allCards, anyCard);
  });

  gridContainer.appendChild(anyCard);
  
  // Re-run search filtering if query is already present in search bar
  const searchInput = document.getElementById('doctor-search');
  if (searchInput && searchInput.value) {
    filterDoctorsBySearch(searchInput.value);
  }
}

// ==============================================================
// Oak Specialist Hospital — Real-Time Text Search Filtering
// ==============================================================
function filterDoctorsBySearch(query) {
  const cards = document.querySelectorAll('#step-pane-3 .doctor-selection-card');
  const normalizedQuery = query.toLowerCase().trim();
  let matchCount = 0;

  cards.forEach(card => {
    const value = card.getAttribute('data-value');
    if (value === 'any') {
      // Always show 'Any Available Doctor'
      card.classList.remove('hidden-by-filter');
      return;
    }

    const titleEl = card.querySelector('.option-card-title');
    const subtitleEl = card.querySelector('.option-card-subtitle');
    const badgeEl = card.querySelector('.doctor-specialty-badge');

    const titleText = titleEl ? titleEl.textContent.toLowerCase() : '';
    const subtitleText = subtitleEl ? subtitleEl.textContent.toLowerCase() : '';
    const badgeText = badgeEl ? badgeEl.textContent.toLowerCase() : '';

    if (titleText.includes(normalizedQuery) || subtitleText.includes(normalizedQuery) || badgeText.includes(normalizedQuery)) {
      card.classList.remove('hidden-by-filter');
      matchCount++;
    } else {
      card.classList.add('hidden-by-filter');
    }
  });

  // If no specific doctors match, show temporary feedback
  let noMatchMsg = document.getElementById('search-no-matches');
  if (normalizedQuery && matchCount === 0) {
    if (!noMatchMsg) {
      noMatchMsg = document.createElement('div');
      noMatchMsg.id = 'search-no-matches';
      noMatchMsg.className = 'no-results-message';
      noMatchMsg.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i><p>No specialists match your search query. Try another name or select "Any Available Doctor".</p>`;
      const grid = document.querySelector('#step-pane-3 .choice-cards-grid');
      if (grid) grid.appendChild(noMatchMsg);
    }
  } else {
    if (noMatchMsg) noMatchMsg.remove();
  }
}


// Helper: Format Date String beautifully (e.g. 2026-05-25 -> Mon, May 25, 2026)
function formatDateString(dateStr) {
  try {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', options);
  } catch (e) {
    return dateStr;
  }
}

// Helper: Format Time String beautifully (e.g. 14:30 -> 2:30 PM)
function formatTimeString(timeStr) {
  try {
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  } catch (e) {
    return timeStr;
  }
}
