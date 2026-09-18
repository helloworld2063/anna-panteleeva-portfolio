document.querySelectorAll('[data-before][data-after]').forEach((comparison) => {
  const before = comparison.dataset.before;
  const after = comparison.dataset.after;
  const subject = comparison.dataset.subject || 'изображения';
  const beforeImage = document.createElement('img');
  beforeImage.className = 'compare-image compare-image--before';
  beforeImage.src = before;
  beforeImage.alt = `${subject}: до редизайна`;
  beforeImage.loading = 'lazy';
  const afterImage = document.createElement('img');
  afterImage.className = 'compare-image';
  afterImage.src = after;
  afterImage.alt = '';
  afterImage.loading = 'lazy';
  const afterLayer = document.createElement('div');
  afterLayer.className = 'compare-after';
  afterLayer.setAttribute('aria-hidden', 'true');
  afterLayer.append(afterImage);
  const visual = document.createElement('div');
  visual.className = 'compare-visual';
  visual.append(beforeImage, afterLayer);
  const beforeLabel = document.createElement('span');
  beforeLabel.className = 'compare-label compare-label--before';
  beforeLabel.textContent = 'До';
  const afterLabel = document.createElement('span');
  afterLabel.className = 'compare-label compare-label--after';
  afterLabel.textContent = 'После';
  const line = document.createElement('div');
  line.className = 'compare-line';
  line.setAttribute('aria-hidden', 'true');
  line.innerHTML = '<span class="compare-handle"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 7-5 5 5 5M15 7l5 5-5 5" /></svg></span>';
  const range = document.createElement('input');
  range.className = 'compare-range';
  range.type = 'range';
  range.min = '0';
  range.max = '100';
  range.value = '50';
  range.setAttribute('aria-label', `Сравнить ${subject}: до и после редизайна`);
  const canvas = document.createElement('div');
  canvas.className = 'compare-canvas';
  canvas.append(visual, beforeLabel, afterLabel, line, range);
  comparison.append(canvas);
});

document.querySelectorAll('[data-compare]').forEach((comparison) => {
  const range = comparison.querySelector('.compare-range');
  if (!range) return;
  const update = () => comparison.style.setProperty('--position', `${range.value}%`);
  range.addEventListener('input', update);
  update();
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const videos = [...document.querySelectorAll('video')];

if (reducedMotion) {
  videos.forEach((video) => {
    video.autoplay = false;
    video.controls = true;
  });
} else if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.play().catch(() => {});
        else entry.target.pause();
      });
    },
    { threshold: 0.2 },
  );
  videos.forEach((video) => observer.observe(video));
}
