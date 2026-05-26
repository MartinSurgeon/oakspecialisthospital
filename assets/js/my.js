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
