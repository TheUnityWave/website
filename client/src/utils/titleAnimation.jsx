import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateTextWordByWord = (element, options = {}) => {
  const words = element.textContent.split(' ');
  element.innerHTML = words.map(word => `<span class="word">${word} </span>`).join('');

  return gsap.fromTo(
    element.querySelectorAll('.word'),
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      stagger: options.stagger || 0.1,
      duration: options.duration || 0.6,
      scrollTrigger: {
        trigger: element,
        start: options.start || "top 80%",
        end: options.end || "bottom 20%",
        toggleActions: options.toggleActions || "play none none reverse"
      }
    }
  );
};
