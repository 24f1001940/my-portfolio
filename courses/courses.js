'use strict';

const state = {
    courses: [],
    filteredCourses: [],
    category: 'all',
    search: ''
};


const DOM = {
    grid: document.getElementById('courses-grid'),
    empty: document.getElementById('empty-state'),
    search: document.getElementById('course-search'),
    count: document.getElementById('course-count'),
    filters: document.querySelectorAll('.filter-button'),
    year: document.getElementById('current-year')
};


/* =========================
   HELPERS
========================= */

function escapeHtml(value) {

    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


function formatPrice(course) {

    if (
        course.price === 0
    ) {
        return 'Free';
    }

    const price =
        Number(course.price);

    const originalPrice =
        Number(course.originalPrice);


    const current =
        new Intl.NumberFormat(
            'en-IN',
            {
                style: 'currency',
                currency:
                    course.currency || 'INR',
                maximumFractionDigits: 0
            }
        ).format(price);


    const original =
        originalPrice > price
            ? new Intl.NumberFormat(
                'en-IN',
                {
                    style: 'currency',
                    currency:
                        course.currency || 'INR',
                    maximumFractionDigits: 0
                }
            ).format(originalPrice)
            : '';


    return `
        <span class="current-price">
            ${escapeHtml(current)}
        </span>

        ${
            original
                ? `
                    <span class="original-price">
                        ${escapeHtml(original)}
                    </span>
                `
                : ''
        }
    `;
}


/* =========================
   LOAD COURSES
========================= */

async function loadCourses() {

    try {

        const response =
            await fetch(
                'courses-data.json',
                {
                    cache: 'no-store'
                }
            );


        if (!response.ok) {
            throw new Error(
                `Failed to load courses (${response.status})`
            );
        }


        const courses =
            await response.json();


        if (
            !Array.isArray(courses)
        ) {
            throw new Error(
                'Invalid courses data'
            );
        }


        state.courses =
            courses;


        state.filteredCourses =
            [...courses];


        applyFilters();


    } catch (error) {

        console.error(
            'Course loading error:',
            error
        );


        DOM.grid.innerHTML = `
            <div class="loading-state">
                <p>
                    Unable to load courses.
                    Please refresh the page.
                </p>
            </div>
        `;
    }
}


/* =========================
   FILTERING
========================= */

function applyFilters() {

    const query =
        state.search
            .trim()
            .toLowerCase();


    state.filteredCourses =
        state.courses.filter(
            course => {

                const matchesCategory =
                    state.category === 'all' ||
                    course.category ===
                        state.category;


                const searchableText = [
                    course.title,
                    course.description,
                    course.category,
                    course.level,
                    ...(course.tags || [])
                ]
                    .join(' ')
                    .toLowerCase();


                const matchesSearch =
                    !query ||
                    searchableText.includes(
                        query
                    );


                return (
                    matchesCategory &&
                    matchesSearch
                );
            }
        );


    renderCourses();
}


/* =========================
   RENDER
========================= */

function renderCourses() {

    const courses =
        state.filteredCourses;


    DOM.count.textContent =
        `${courses.length} ${
            courses.length === 1
                ? 'course'
                : 'courses'
        }`;


    if (!courses.length) {

        DOM.grid.innerHTML = '';

        DOM.empty.hidden = false;

        return;
    }


    DOM.empty.hidden = true;


    DOM.grid.innerHTML =
        courses
            .map(
                course =>
                    createCourseCard(
                        course
                    )
            )
            .join('');
}


/* =========================
   COURSE CARD
========================= */

function createCourseCard(
    course
) {

    const isComingSoon =
        String(
            course.status
        ).toLowerCase() ===
        'coming soon';


    const buttonClass =
        isComingSoon
            ? 'view-course-button coming-soon-button'
            : 'view-course-button';


    const buttonText =
        isComingSoon
            ? 'Coming Soon'
            : 'View Course';


    return `
        <article class="course-card">

            <div class="course-thumbnail">

                <img
                    src="${escapeHtml(
                        course.thumbnail
                    )}"
                    alt="${escapeHtml(
                        course.title
                    )}"
                    loading="lazy"
                >

                ${
                    course.featured
                        ? `
                            <span class="course-badge featured">
                                FEATURED
                            </span>
                        `
                        : `
                            <span class="course-badge">
                                ${escapeHtml(
                                    course.category
                                )}
                            </span>
                        `
                }

            </div>


            <div class="course-content">

                <div class="course-category">
                    ${escapeHtml(
                        course.category
                    )}
                </div>


                <h3 class="course-title">
                    ${escapeHtml(
                        course.title
                    )}
                </h3>


                <p class="course-description">
                    ${escapeHtml(
                        course.description
                    )}
                </p>


                <div class="course-meta">

                    <span>
                        <i class="fa-solid fa-video"></i>
                        ${escapeHtml(
                            course.lectures
                        )} lectures
                    </span>

                    <span>
                        <i class="fa-regular fa-clock"></i>
                        ${escapeHtml(
                            course.duration
                        )}
                    </span>

                    <span>
                        <i class="fa-solid fa-signal"></i>
                        ${escapeHtml(
                            course.level
                        )}
                    </span>

                </div>


                <div class="course-price-row">

                    <div class="course-price">
                        ${formatPrice(course)}
                    </div>


                    ${
                        isComingSoon
                            ? `
                                <span class="${buttonClass}">
                                    ${buttonText}
                                </span>
                            `
                            : `
                                <a
                                    class="${buttonClass}"
                                    href="course.html?id=${encodeURIComponent(
                                        course.id
                                    )}"
                                >
                                    ${buttonText}
                                    <i class="fa-solid fa-arrow-right"></i>
                                </a>
                            `
                    }

                </div>

            </div>

        </article>
    `;
}


/* =========================
   EVENTS
========================= */

function initEvents() {

    DOM.search.addEventListener(
        'input',
        event => {

            state.search =
                event.target.value;

            applyFilters();
        }
    );


    DOM.filters.forEach(
        button => {

            button.addEventListener(
                'click',
                () => {

                    DOM.filters.forEach(
                        item => {
                            item.classList.remove(
                                'active'
                            );
                        }
                    );


                    button.classList.add(
                        'active'
                    );


                    state.category =
                        button.dataset.category ||
                        'all';


                    applyFilters();
                }
            );
        }
    );
}


/* =========================
   INITIALIZE
========================= */

if (DOM.year) {
    DOM.year.textContent =
        new Date().getFullYear();
}


initEvents();

loadCourses();