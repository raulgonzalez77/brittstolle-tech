class Header extends HTMLElement {
    constructor() {
      super();
    }
  


    connectedCallback() {


        fetch('components/header.html')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text(); // or response.json() if it's a JSON file
        })
        .then(data => {
          console.log('Document content:', data);
          // Further processing of the document content
        
          var globalData = data;
          this.innerHTML = globalData;

          // Add event listener for Book a Lesson button
          const bookBtn = this.querySelector('#book-a-lesson-btn');
          if (bookBtn) {
            bookBtn.addEventListener('click', (e) => {
              e.preventDefault();
              this.openSchedulePopup();
            });
          }

          // Add event listener for Club Fitting button
          const clubBtn = this.querySelector('#club-fitting-btn');
          if (clubBtn) {
            clubBtn.addEventListener('click', (e) => {
              e.preventDefault();
              this.openSchedulePopup();
            });
          }
        
        })
        .catch(error => {
          console.error('There was a problem fetching the document:', error);
        });


      
    }

    openSchedulePopup() {
      // Create modal
      const modal = document.createElement('div');
      modal.id = 'schedule-modal';
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      `;

      // Create modal content
      const modalContent = document.createElement('div');
      modalContent.style.cssText = `
        background-color: white;
        width: 90%;
        max-width: 900px;
        height: 80%;
        border-radius: 8px;
        overflow: auto;
        position: relative;
      `;

      // Create close button
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        z-index: 10000;
      `;
      closeBtn.addEventListener('click', () => {
        modal.remove();
      });

      // Create iframe to load schedule.html
      const iframe = document.createElement('iframe');
      iframe.src = 'schedule.html';
      iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
      `;

      modalContent.appendChild(closeBtn);
      modalContent.appendChild(iframe);
      modal.appendChild(modalContent);

      // Close modal when clicking outside
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });

      document.body.appendChild(modal);
    }
  }
  
  customElements.define('header-component', Header);
  