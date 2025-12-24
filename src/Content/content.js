import { get } from 'http';
import styles from './content.styles.css?inline'
import { createProfessorCardTemplate, createNotFoundCardTemplate, createCompactCardTemplate, createCompactNotFoundCardTemplate } from "./templates.js";

// const INSTRUCTOR_SELECTOR = 'td[data-property="instructor"]'
const INSTRUCTOR_SELECTOR = 'p.syn_note'
const INSTRUCTOR_MATCH = "^Instructors:\s*(.*?)(?=\s*\(CV\)\s*$|$)"

function findProfessors() {
    const instructorPs = document.querySelectorAll(INSTRUCTOR_SELECTOR)
    const names = [];

    instructorPs.forEach((p) => {
        let name  = getName(p)

        // Remove hyphens and extra spaces from the name
        const normalizedName = normalizeName(name.trim());

        if (normalizedName&&
            normalizedName !== '' &&
            !p.querySelector('.rmp-card') && 
            !names.includes(normalizedName)) {
            names.push(normalizedName);
        }
    });

    // console.debug('Names length:', names.length);
    if (names.length > 0) {
        processProfessorSequentially(names);
    } 
}

// Send message to background script

function sendMessage(message) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(message, (response) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(response);
            }
        });
    });
}

// Process professors sequentially
async function processProfessorSequentially(names)  {
    if (!chrome.runtime?.id) {
        console.error('Extension context invalidated - please refresh the page');
        return;
    }

    for (const name of names) {
        try {
            const response = await sendMessage({professorName: name});
            console.debug('Data for: ' + name, response); 

            if (response?.success) {
                injectProfessorCard(name, response.data);
            } else {
                injectNotFoundCard(name);
            }
        } catch (error) {
            if (error.message?.includes('Extension context invalidated')) {
                console.error('Extension context invalidated - please refresh the page');
                return;
            } else {
                injectNotFoundCard(name);
            }
            console.error('Error fetching data for: ' + name, error);
        }
    }
}

function injectProfessorCard(name, data) {
    // Find all professor links with this name
    const instructorPs = document.querySelectorAll(INSTRUCTOR_SELECTOR)
    
    instructorPs.forEach((p) => {
        // Remove hyphens and extra spaces from the name
        const normalizedLinkName = normalizeName(getName(p).trim());
        
        if (normalizedLinkName !== name) return;
        if (p.querySelector('.rmp-card')) return;
        
        chrome.storage.sync.get({ compact_cards: false }, (result) => {
            // Re-check in callback to avoid race conditions with repeated observers/responses
            if (p.querySelector('.rmp-card')) return;

            const useCompact = Boolean(result.compact_cards);
            let card;

            if (useCompact) {
                card = createCompactCard(name, data);
            } else {
                card = createProfessorCard(name, data);
            }

            if (card) {
                p.insertAdjacentElement('beforeend', card);
            }
        });
    });
}

function injectNotFoundCard(name) {
    const instructorPs = document.querySelectorAll(INSTRUCTOR_SELECTOR)
    
    instructorPs.forEach((p) => {
        let name = getName(p)

        // Remove hyphens and extra spaces from the name
        const normalizedLinkName = normalizeName(name.trim());

        if (normalizedLinkName !== name) return;
        if (p.querySelector('.rmp-card')) return;

        chrome.storage.sync.get({ compact_cards: false }, (result) => {
            if (p.querySelector('.rmp-card')) return;

            const useCompact = Boolean(result.compact_cards);
            let card;

            if (useCompact) {
                card = createCompactNotFoundCard(name);
            } else {
                card = createNotFoundCard(name);
            }

            if (card) {
                p.insertAdjacentElement('beforeend', card);
            }
        });
    });
}

function createProfessorCard(name, data) {
    const card = document.createElement('div');
    card.className = 'rmp-card';
    card.innerHTML = createProfessorCardTemplate(name, data);
    return card;
}

function createNotFoundCard(name) {
    const card = document.createElement('div');
    card.className = 'rmp-card rmp-not-found';
    card.innerHTML = createNotFoundCardTemplate(name);
    return card;
}

function createCompactCard(name, data) {
    const card = document.createElement('div');
    card.className = 'rmp-card rmp-compact-card';
    card.innerHTML = createCompactCardTemplate(name, data);
    return card;
}

function createCompactNotFoundCard(name) {
    const card = document.createElement('div');
    card.className = 'rmp-card rmp-compact-card';
    card.innerHTML = createCompactNotFoundCardTemplate(name);
    return card;
}


(function injectCardStyles() {
    if (document.getElementById('rmp-card-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'rmp-card-styles';
    style.textContent = styles;

    document.head.appendChild(style);
})();


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function normalizeName(name) {
    if (!name || name === '' || name === 'STAFF') {
        return ''
    }
    const reorderedName = reorderName(name)
    const normalizedLinkName = reorderedName.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
    return normalizedLinkName
}

function reorderName(name) {
    const parts = name.split(',')
    if (parts.length == 2) {
        const firstPart = parts[0]
        const secondPart = parts[1]
        return `${secondPart.trim()} ${firstPart.trim()}`
    }
    return ''
}

function getName(p) {
    let name  = null
    if (p && p.innerText) {
        text = p.innerText
    }
    if (text) {
        if (parseName(text)) {
            name = parseName(text)
        }
    }
    const link = p.querySelector('a');
    if (link && link.innerText) {
        text = link.innerText
        if (parseName(text)) {
            name = parseName(text)
        }
    }

    return name
}

function parseName(raw) {
    if (raw.startsWith("Instructors:")) {
        raw = raw.slice("Instructors:".length)
    }
    if (raw.endsWith("(CV)")) {
        raw = raw.slice(0, -"(CV)".length)
    }

    return raw.trim()
}

// Run after page load
window.addEventListener('load', findProfessors);

// Also run immediately in case the page is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', findProfessors);
} else {
    findProfessors();
}
    
// Observe dynamically added elements with debouncing
const MUTATION_DEBOUNCE_MS = 250; 
const observer = new MutationObserver(debounce(findProfessors, MUTATION_DEBOUNCE_MS));
observer.observe(document.body, { childList: true, subtree: true });