// document-processor-animation.js

function createDocumentProcessorAnimation() {
  const steps = ['Scanning', 'Processing', 'Extracting', 'Storing', 'Complete'];
  let currentStep = 0;
  let scanProgress = 0;
  let animationInterval;

  const animationContainer = document.createElement('div');
  animationContainer.className = 'document-processor-animation';
  animationContainer.innerHTML = `
    <h2>Intelligent Document Processor</h2>
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress"></div>
      </div>
      <div class="step-indicator"></div>
    </div>
    <div class="document-preview">
      <div class="fields">
        <h3>FIELDS</h3>
        <p><strong>Full Name:</strong> Vignesh Kalimuthu</p>
        <p><strong>Date Of Birth:</strong> 01-10-1990</p>
        <p><strong>Country Of Birth:</strong> Germany</p>
        <p><strong>Email:</strong> hello@vignesh.com</p>
      </div>
      <div class="table">
        <h3>TABLE</h3>
        <table>
          <tr><th>Item</th><th>Ordered</th><th>Shipped</th><th>Num.</th></tr>
          <tr><td>Hard drive</td><td>125</td><td>125</td><td>34146684</td></tr>
          <tr><td>Camera</td><td>3000</td><td>2500</td><td>73460004</td></tr>
          <tr><td>PDA</td><td>14,000</td><td>12,000</td><td>25697005</td></tr>
          <tr><td>PDA</td><td>150</td><td>150</td><td>34877066</td></tr>
        </table>
      </div>
    </div>
  `;

  function updateAnimation() {
    const progressBar = animationContainer.querySelector('.progress');
    const stepIndicator = animationContainer.querySelector('.step-indicator');

    if (currentStep === 0) {
      scanProgress += 5;
      if (scanProgress >= 100) {
        currentStep++;
        scanProgress = 0;
      }
      progressBar.style.width = `${scanProgress}%`;
      stepIndicator.textContent = `${steps[currentStep]}... ${scanProgress}%`;
    } else {
      progressBar.style.width = `${(currentStep + 1) * 25}%`;
      stepIndicator.textContent = steps[currentStep];
      if (currentStep < steps.length - 1) {
        currentStep++;
      } else {
        clearInterval(animationInterval);
      }
    }
  }

  function startAnimation() {
    animationInterval = setInterval(updateAnimation, 100);
  }

  return {
    element: animationContainer,
    start: startAnimation
  };
}
