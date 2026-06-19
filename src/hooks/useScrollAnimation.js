import { useEffect } from 'react';

export default function useScrollAnimation(dependencies = []) {
    useEffect(() => {
        const scrollElements = document.querySelectorAll('.scroll-animate');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        scrollElements.forEach((el) => observer.observe(el));

        return () => {
            scrollElements.forEach((el) => observer.unobserve(el));
        };
    }, dependencies);
}
