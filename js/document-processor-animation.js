function createDocumentProcessorAnimation() {
  const steps = ['Scanning', 'Processing', 'Extracting', 'Storing', 'Complete'];
  let currentStep = 0;
  let scanProgress = 0;
  let animationInterval;

  const animationContainer = document.createElement('div');
  animationContainer.className = 'document-processor-animation';
  animationContainer.innerHTML = `
    <h2>Intelligent Document Processor</h2>
    <div class="progress-bar">
      <div class="progress"></div>
    </div>
    <div class="step-indicator"></div>
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
