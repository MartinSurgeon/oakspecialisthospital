//AOS Anomation
AOS.init();

// Curser Pointer

let cursor = document.querySelector(".cursor");
let cursor2 = document.querySelector(".cursor2");
let cursorScale = document.querySelectorAll(".cursor-scale");
let mouseX = 0;
let mouseY = 0;

gsap.to({}, 0.016, {
  repeat: -1,
  onRepeat: function () {
    gsap.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY,
      },
    });
    gsap.set(cursor2, {
      css: {
        left: mouseX,
        top: mouseY,
      },
    });
  },
});

// Mouse Pointer

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

cursorScale.forEach((link) => {
  link.addEventListener("mousemove", () => {
    cursor.classList.add("grow");
    if (link.classList.contains("small")) {
      cursor.classList.remove("grow");
      cursor.classList.add("grow-small");
    }
  });

  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("grow");
    cursor.classList.remove("grow-small");
  });
});

// ==============================================================
// Oak Specialist Hospital — Premium Global Alert Overrides
// ==============================================================
(function() {
  // Overriding standard window.alert with our premium custom Toast UI
  window.alert = function(message) {
    // 1. Check if toast container exists, if not, create it
    let container = document.querySelector('.custom-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'custom-toast-container';
      document.body.appendChild(container);
    }

    // 2. Create the toast card element
    const toastCard = document.createElement('div');
    toastCard.className = 'custom-toast-card warning'; // default to warning style for standard alerts
    
    // Choose icon and title based on message contents
    let iconClass = 'fa-solid fa-triangle-exclamation';
    let titleText = 'Attention Required';
    
    if (message.toLowerCase().includes('success') || message.toLowerCase().includes('confirm') || message.toLowerCase().includes('schedule') || message.toLowerCase().includes('sent')) {
      toastCard.className = 'custom-toast-card success';
      iconClass = 'fa-solid fa-circle-check';
      titleText = 'Action Confirmed';
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('invalid') || message.toLowerCase().includes('valid') || message.toLowerCase().includes('wrong')) {
      toastCard.className = 'custom-toast-card error';
      iconClass = 'fa-solid fa-circle-xmark';
      titleText = 'Oops! Something is Wrong';
    }

    toastCard.innerHTML = `
      <div class="custom-toast-icon">
        <i class="${iconClass}"></i>
      </div>
      <div class="custom-toast-body">
        <h5 class="custom-toast-title">${titleText}</h5>
        <p class="custom-toast-message">${message}</p>
      </div>
      <button class="custom-toast-close" title="Dismiss">&times;</button>
    `;

    // 3. Append toast to container
    container.appendChild(toastCard);

    // 4. Trigger CSS slide-in
    setTimeout(() => {
      toastCard.classList.add('show');
    }, 10);

    // 5. Setup auto-dismiss (5 seconds)
    const dismissTimer = setTimeout(() => {
      dismissToast(toastCard);
    }, 6000);

    // 6. Close button click listener
    toastCard.querySelector('.custom-toast-close').addEventListener('click', () => {
      clearTimeout(dismissTimer);
      dismissToast(toastCard);
    });
  };

  function dismissToast(toastCard) {
    toastCard.classList.remove('show');
    toastCard.classList.add('hide');
    setTimeout(() => {
      toastCard.remove();
      // clean up container if empty
      const container = document.querySelector('.custom-toast-container');
      if (container && container.children.length === 0) {
        container.remove();
      }
    }, 400);
  }
})();

// ==============================================================
// Oak Specialist Hospital — Centralized Doctor and Specialty Data
// ==============================================================
window.DOCTORS_DATA = [
  // IVF Specialists
  { id: 'dr-osei-agyemang', name: 'Dr. Osei K. Agyemang', title: 'Medical Director & IVF Specialist', dept: 'ivf', badge: 'IVF Pioneer' },
  { id: 'dr-rex-djokoto', name: 'Dr. Rex Djokoto', title: 'Consultant OB/GYN & Fertility Specialist', dept: 'ivf', badge: 'Fertility Expert' },
  { id: 'dr-elizabeth-crentsil', name: 'Dr. Elizabeth Crentsil', title: 'OB/GYN & IVF Consultant', dept: 'ivf', badge: 'Maternal Care' },
  { id: 'dr-kwafo-opei', name: 'Dr. Kwafo Opei', title: 'Consultant OB/GYN & IVF Specialist', dept: 'ivf', badge: 'IVF & Gynae' },
  { id: 'dr-edward-agana', name: 'Dr. Edward Agana', title: 'OB/GYN & Fertility Specialist', dept: 'ivf', badge: 'Fertility Care' },
  { id: 'dr-lesley-osei', name: 'Dr. Lesley Osei', title: 'Consultant Gynaecologist & IVF Specialist', dept: 'ivf', badge: 'Reproductive Health' },
  { id: 'dr-abigail-boateng', name: 'Dr. Abigail Boateng', title: 'Consultant Embryologist', dept: 'ivf', badge: 'Embryology Expert' },

  // Obstetrics & Gynaecology
  { id: 'dr-ama-nkrumah', name: 'Dr. Ama Nkrumah', title: 'Senior OB/GYN Consultant', dept: 'obstetrics-gynaecology', badge: 'Maternal Health' },
  { id: 'dr-kingsley-afreh', name: 'Dr. Kingsley Afreh', title: 'Consultant Obstetrician & Gynaecologist', dept: 'obstetrics-gynaecology', badge: 'OB/GYN Specialist' },
  { id: 'dr-johnny-arthur', name: 'Dr. Johnny Arthur', title: 'Consultant Obstetrician & Gynaecologist', dept: 'obstetrics-gynaecology', badge: 'Women\'s Health' },
  { id: 'dr-harriet-adutwumwaa', name: 'Dr. Harriet Adutwumwaa', title: 'Obstetrician & Gynaecologist', dept: 'obstetrics-gynaecology', badge: 'Maternity Expert' },
  { id: 'dr-naana-wireko-brobbey', name: 'Dr. Naana Wireko Brobbey', title: 'OB/GYN Specialist', dept: 'obstetrics-gynaecology', badge: 'Maternal Care' },

  // Gynae-oncology
  { id: 'dr-adu-appiah-kubi', name: 'Dr. Adu Appiah Kubi', title: 'Consultant Gynaecologic Oncologist', dept: 'gynae-oncology', badge: 'Oncology Specialist' },

  // Paediatrics
  { id: 'dr-emmanuel-ofori', name: 'Dr. Emmanuel Ofori', title: 'Consultant Paediatrician', dept: 'paediatrics', badge: 'Child Specialist' },
  { id: 'dr-sheila-bawa', name: 'Dr. Sheila Bawa', title: 'Consultant Paediatrician', dept: 'paediatrics', badge: 'Neonatal Care' },
  { id: 'dr-cynthia-amponsah', name: 'Dr. Cynthia Amponsah', title: 'Paediatrics Specialist', dept: 'paediatrics', badge: 'Child Health' },
  { id: 'dr-ekua-afful', name: 'Dr. Ekua Afful', title: 'Consultant Paediatrician', dept: 'paediatrics', badge: 'Pediatric Care' },
  { id: 'dr-lynette-abagdem', name: 'Dr. Lynette Abagdem', title: 'Consultant Paediatrician', dept: 'paediatrics', badge: 'Child Specialist' },
  { id: 'dr-harriet', name: 'Dr. Harriet', title: 'Paediatrics Resident', dept: 'paediatrics', badge: 'Child Health' },
  { id: 'dr-efua-owusu-ansah', name: 'Dr. Efua Owusu Ansah', title: 'Consultant Paediatrician & Neonatologist', dept: 'paediatrics', badge: 'Neonatology Expert' },

  // Pediatric Surgery
  { id: 'dr-mawutor-dzogbefia', name: 'Dr. Mawutor Dzogbefia', title: 'Consultant Paediatric Surgeon', dept: 'pediatric-surgery', badge: 'Pediatric Surgery' },

  // General & Family Medicine
  { id: 'dr-samuel-boakye', name: 'Dr. Samuel Boakye', title: 'Family Medicine Consultant', dept: 'general-medicine', badge: 'Primary Care' },
  { id: 'dr-augustine-afful', name: 'Dr. Augustine Afful', title: 'General Duty Physician', dept: 'general-medicine', badge: 'Family Health' },
  { id: 'dr-esenam-amedo', name: 'Dr. Esenam Amedo', title: 'Family Medicine Resident', dept: 'general-medicine', badge: 'Primary Health' },
  { id: 'dr-derrick-gyimah', name: 'Dr. Derrick Gyimah', title: 'Family Practitioner', dept: 'general-medicine', badge: 'Family Care' },
  { id: 'dr-vida-obesse', name: 'Dr. Vida Obesse', title: 'General Medical Officer', dept: 'general-medicine', badge: 'Primary Care' },
  { id: 'dr-yasmine-hardy', name: 'Dr. Yasmine Hardy', title: 'Family Practice Physician', dept: 'general-medicine', badge: 'Family Health' },
  { id: 'dr-eunice', name: 'Dr. Eunice', title: 'General Medical Officer', dept: 'general-medicine', badge: 'Primary Health' },

  // Internal Medicine (Cardiology, Neurology, Nephrology)
  { id: 'dr-kwabena-awisi-amoako', name: 'Dr. Kwabena Awisi-Amoako', title: 'Consultant Cardiologist', dept: 'internal-medicine', badge: 'Cardiology Specialist' },
  { id: 'dr-nana-addo-boateng', name: 'Dr. Nana Addo Boateng', title: 'Consultant Cardiologist', dept: 'internal-medicine', badge: 'Heart Specialist' },
  { id: 'dr-lawrence-kusi-appiah', name: 'Dr. Lawrence Kusi Appiah', title: 'Consultant Nephrologist', dept: 'internal-medicine', badge: 'Kidney Specialist' },
  { id: 'dr-yaw-adu-boakye', name: 'Dr. Yaw Adu Boakye', title: 'Senior Consultant Cardiologist', dept: 'internal-medicine', badge: 'Cardiovascular Expert' },
  { id: 'dr-akpaloo', name: 'Dr. Akpaloo', title: 'Consultant Neurologist', dept: 'internal-medicine', badge: 'Neurology Expert' },

  // Haematology
  { id: 'dr-ruth-charlotte-sackey', name: 'Dr. Ruth Charlotte Sackey', title: 'Consultant Haematologist', dept: 'haematology', badge: 'Blood Health' },

  // General Surgery / Orthopaedics / Urology
  { id: 'dr-obed-adusei', name: 'Dr. Obed Adusei', title: 'Consultant Orthopaedic Surgeon', dept: 'general-surgery', badge: 'Orthopaedics' },
  { id: 'dr-oscar-yinyeh', name: 'Dr. Oscar Yinyeh', title: 'Consultant Urologist', dept: 'general-surgery', badge: 'Urology Surgery' },
  { id: 'dr-robert-sagoe', name: 'Dr. Robert Sagoe', title: 'Consultant General Surgeon', dept: 'general-surgery', badge: 'Surgical Specialist' },
  { id: 'dr-frank-n-boakye', name: 'Dr. Frank N. Boakye', title: 'Consultant Orthopaedic Surgeon', dept: 'general-surgery', badge: 'Bone & Joint Expert' },
  { id: 'dr-sam-awortwi-w-k-jnr', name: 'Dr. Sam Awortwi W. K. Jnr', title: 'Consultant Surgeon', dept: 'general-surgery', badge: 'General Surgery' },
  { id: 'dr-arhin-appiah', name: 'Dr. Arhin Appiah', title: 'Consultant General Surgeon', dept: 'general-surgery', badge: 'General Surgery' },
  { id: 'dr-aaron-anyetei', name: 'Dr. Aaron Anyetei', title: 'Consultant General Surgeon', dept: 'general-surgery', badge: 'General Surgery' },

  // Anaesthetics
  { id: 'dr-kofi-kumah', name: 'Dr. Kofi Kumah', title: 'Consultant Anaesthetist', dept: 'anaesthetic', badge: 'Critical Care' },
  { id: 'dr-kumah', name: 'Dr. Kumah', title: 'Consultant Anaesthetist', dept: 'anaesthetic', badge: 'Anesthesia' },

  // Opthalmology
  { id: 'dr-agbedinu-kwabena', name: 'Dr. Agbedinu Kwabena', title: 'Consultant Opthalmologist', dept: 'opthalmology', badge: 'Eye Specialist' },
  { id: 'dr-agbeko-essenam-anita', name: 'Dr. Agbeko Essenam Anita', title: 'Consultant Opthalmologist', dept: 'opthalmology', badge: 'Eye Specialist' },

  // Dietician
  { id: 'dr-eugenia-sly-moore', name: 'Dr. Eugenia Sly-Moore', title: 'Consultant Dietician', dept: 'dietician', badge: 'Nutrition Specialist' },
  { id: 'rd-benjamin', name: 'Rd. Benjamin', title: 'Registered Dietician', dept: 'dietician', badge: 'Dietetics Expert' }
];

window.bindDynamicDoctorFiltering = function(deptSelectId, doctorSelectId) {
  const deptSelect = document.getElementById(deptSelectId);
  const doctorSelect = document.getElementById(doctorSelectId);
  if (!deptSelect || !doctorSelect) return;

  deptSelect.addEventListener('change', () => {
    const deptId = deptSelect.value;
    // Clear current choices except placeholder
    doctorSelect.innerHTML = `<option value="" disabled selected style="color: #616161; background: #1e3348;">Select Specialist*</option>`;
    
    // Filter matching doctors
    const matching = window.DOCTORS_DATA.filter(doc => doc.dept === deptId);
    
    // Populate dropdown
    matching.forEach(doc => {
      const opt = document.createElement('option');
      opt.value = doc.id;
      opt.textContent = `${doc.name} (${doc.badge})`;
      opt.style.color = '#ffffff';
      opt.style.background = '#1e3348';
      doctorSelect.appendChild(opt);
    });

    // Always add 'any' option
    const anyOpt = document.createElement('option');
    anyOpt.value = 'any';
    anyOpt.textContent = 'Any Specialist Available';
    anyOpt.style.color = '#ffffff';
    anyOpt.style.background = '#1e3348';
    doctorSelect.appendChild(anyOpt);
  });
};

// ==============================================================
// Oak Specialist Hospital — Homepage Wishes Flyer Modal Controller
// ==============================================================
(function() {
  function initFlyerModal() {
    const flyerModal = document.getElementById('flyer-modal');
    
    // Verify we are on the homepage (contains .hero-section) and the modal element is present
    if (flyerModal && document.querySelector('.hero-section')) {
      // Prevent double initialization
      if (flyerModal.dataset.initialized === 'true') return;
      flyerModal.dataset.initialized = 'true';
      
      // Wait 1000ms for the page preloader transition to complete smoothly
      setTimeout(() => {
        flyerModal.classList.add('show');
        
        // Auto-close after 5000ms
        const autoCloseTimer = setTimeout(() => {
          closeFlyerModal();
        }, 5000);
        
        // Manual close on close button
        const closeBtn = document.getElementById('flyer-modal-close');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            clearTimeout(autoCloseTimer);
            closeFlyerModal();
          });
        }
        
        // Manual close on clicking backdrop overlay
        flyerModal.addEventListener('click', (e) => {
          if (e.target === flyerModal) {
            clearTimeout(autoCloseTimer);
            closeFlyerModal();
          }
        });
      }, 1000);
    }
    
    function closeFlyerModal() {
      if (flyerModal) {
        flyerModal.classList.remove('show');
      }
    }
  }

  // Handle race conditions: trigger immediately if already loaded, otherwise listen for load event
  if (document.readyState === 'complete') {
    initFlyerModal();
  } else {
    $(window).on('load', initFlyerModal);
  }
})();



