'use strict';

/*
 * ============================================================
 * MOHD SAQIB — COURSE DETAILS PAGE
 * ============================================================
 *
 * URL format:
 *
 * course.html?id=generative-ai-agentic-ai-rag
 *
 * Data source:
 *
 * courses-data.json
 *
 * Later this same architecture can be connected to:
 *
 * - Authentication
 * - Database
 * - Payments
 * - Enrollment
 * - Protected videos
 * - Student progress
 * ============================================================
 */


/* ============================================================
   STATE
============================================================ */

const state = {
    course: null,
    courseId: null
};


/* ============================================================
   DOM
============================================================ */

const DOM = {
    loading:
        document.getElementById(
            'course-loading'
        ),

    error:
        document.getElementById(
            'course-error'
        ),

    content:
        document.getElementById(
            'course-content'
        ),

    breadcrumb:
        document.getElementById(
            'course-breadcrumb'
        ),

    category:
        document.getElementById(
            'course-category'
        ),

    title:
        document.getElementById(
            'course-title'
        ),

    description:
        document.getElementById(
            'course-description'
        ),

    tags:
        document.getElementById(
            'course-tags'
        ),

    meta:
        document.getElementById(
            'course-meta'
        ),

    thumbnail:
        document.getElementById(
            'course-thumbnail'
        ),

    status:
        document.getElementById(
            'course-status'
        ),

    price:
        document.getElementById(
            'course-price'
        ),

    buyButton:
        document.getElementById(
            'buy-course-button'
        ),

    previewButton:
        document.getElementById(
            'preview-course-button'
        ),

    learningOutcomes:
        document.getElementById(
            'learning-outcomes'
        ),

    requirements:
        document.getElementById(
            'course-requirements'
        ),

    fullDescription:
        document.getElementById(
            'course-full-description'
        ),

    curriculum:
        document.getElementById(
            'curriculum'
        ),

    curriculumSummary:
        document.getElementById(
            'curriculum-summary'
        ),

    courseInformation:
        document.getElementById(
            'course-information'
        ),

    currentYear:
        document.getElementById(
            'current-year'
        ),

    previewModal:
        document.getElementById(
            'preview-modal'
        ),

    closePreview:
        document.getElementById(
            'close-preview'
        )
};


/* ============================================================
   HELPERS
============================================================ */


/**
 * Escape text before inserting it into HTML.
 *
 * This is especially important because course data
 * will eventually come from a database.
 */
function escapeHtml(value) {

    return String(value ?? '')
        .replace(
            /&/g,
            '&amp;'
        )
        .replace(
            /</g,
            '&lt;'
        )
        .replace(
            />/g,
            '&gt;'
        )
        .replace(
            /"/g,
            '&quot;'
        )
        .replace(
            /'/g,
            '&#039;'
        );
}


/**
 * Convert a normal string into a safe URL slug.
 */
function slugify(value) {

    return String(value ?? '')
        .toLowerCase()
        .trim()
        .replace(
            /[^a-z0-9]+/g,
            '-'
        )
        .replace(
            /^-+|-+$/g,
            '');
}


/**
 * Format a price using Indian currency.
 */
function formatCurrency(
    amount,
    currency = 'INR'
) {

    const numericAmount =
        Number(amount);


    if (
        !Number.isFinite(
            numericAmount
        )
    ) {
        return '—';
    }


    if (
        numericAmount === 0
    ) {
        return 'Free';
    }


    try {

        return new Intl.NumberFormat(
            'en-IN',
            {
                style: 'currency',
                currency,
                maximumFractionDigits: 0
            }
        ).format(
            numericAmount
        );

    } catch {

        return `₹${numericAmount}`;
    }
}


/**
 * Convert status to CSS-friendly class.
 */
function statusClass(
    status
) {

    return String(
        status ?? ''
    )
        .toLowerCase()
        .replace(
            /\s+/g,
            '-'
        );
}


/* ============================================================
   URL
============================================================ */

function getCourseIdFromUrl() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        params.get('id');


    if (!id) {
        return null;
    }


    return id.trim();
}


/* ============================================================
   LOAD COURSE DATA
============================================================ */

async function loadCourse() {

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
                `Course data request failed: ${response.status}`
            );
        }


        const courses =
            await response.json();


        if (
            !Array.isArray(courses)
        ) {

            throw new Error(
                'courses-data.json must contain an array.'
            );
        }


        const requestedId =
            state.courseId;


        const course =
            courses.find(
                item => {

                    if (!item) {
                        return false;
                    }


                    return (
                        String(
                            item.id ?? ''
                        ) === requestedId
                        ||
                        String(
                            item.slug ?? ''
                        ) === requestedId
                    );
                }
            );


        if (!course) {

            showError();

            return;
        }


        state.course =
            course;


        renderCourse();


    } catch (error) {

        console.error(
            'Course loading error:',
            error
        );


        showError();
    }
}


/* ============================================================
   RENDER COURSE
============================================================ */

function renderCourse() {

    const course =
        state.course;


    if (!course) {
        showError();
        return;
    }


    document.title =
        `${course.title} | Mohd Saqib`;


    renderBasicInformation(
        course
    );


    renderTags(
        course
    );


    renderMeta(
        course
    );


    renderPurchaseCard(
        course
    );


    renderLearningOutcomes(
        course
    );


    renderRequirements(
        course
    );


    renderDescription(
        course
    );


    renderCurriculum(
        course
    );


    renderCourseInformation(
        course
    );


    DOM.loading.hidden = true;

    DOM.error.hidden = true;

    DOM.content.hidden = false;
}


/* ============================================================
   BASIC INFORMATION
============================================================ */

function renderBasicInformation(
    course
) {

    DOM.category.textContent =
        course.category ||
        'Course';


    DOM.title.textContent =
        course.title ||
        'Untitled Course';


    DOM.description.textContent =
        course.description ||
        '';


    DOM.breadcrumb.textContent =
        course.shortTitle ||
        course.title ||
        'Course';


    if (
        course.thumbnail
    ) {

        DOM.thumbnail.src =
            course.thumbnail;

        DOM.thumbnail.alt =
            course.title ||
            'Course thumbnail';


        DOM.thumbnail.onerror =
            () => {

                DOM.thumbnail.style.display =
                    'none';
            };
    }
}


/* ============================================================
   TAGS
============================================================ */

function renderTags(
    course
) {

    const tags =
        Array.isArray(
            course.tags
        )
            ? course.tags
            : [];


    if (!tags.length) {

        DOM.tags.innerHTML = '';

        return;
    }


    DOM.tags.innerHTML =
        tags
            .slice(0, 10)
            .map(
                tag => `
                    <span class="course-tag">
                        ${escapeHtml(tag)}
                    </span>
                `
            )
            .join('');
}


/* ============================================================
   COURSE META
============================================================ */

function renderMeta(
    course
) {

    const items = [];


    if (
        course.lectures !== undefined
    ) {

        items.push({
            icon:
                'fa-solid fa-video',

            text:
                `${course.lectures} lectures`
        });
    }


    if (
        course.duration
    ) {

        items.push({
            icon:
                'fa-regular fa-clock',

            text:
                course.duration
        });
    }


    if (
        course.level
    ) {

        items.push({
            icon:
                'fa-solid fa-signal',

            text:
                course.level
        });
    }


    if (
        course.language
    ) {

        items.push({
            icon:
                'fa-solid fa-language',

            text:
                course.language
        });
    }


    DOM.meta.innerHTML =
        items
            .map(
                item => `
                    <span class="course-meta-item">
                        <i class="${escapeHtml(item.icon)}"></i>
                        ${escapeHtml(item.text)}
                    </span>
                `
            )
            .join('');
}


/* ============================================================
   PURCHASE CARD
============================================================ */

function renderPurchaseCard(
    course
) {

    const price =
        Number(course.price);


    const originalPrice =
        Number(course.originalPrice);


    const currency =
        course.currency ||
        'INR';


    const currentPrice =
        formatCurrency(
            price,
            currency
        );


    const oldPrice =
        originalPrice > price
            ? formatCurrency(
                originalPrice,
                currency
            )
            : '';


    DOM.price.innerHTML = `
        <span class="current-price">
            ${escapeHtml(currentPrice)}
        </span>

        ${
            oldPrice
                ? `
                    <span class="original-price">
                        ${escapeHtml(oldPrice)}
                    </span>
                `
                : ''
        }
    `;


    const status =
        String(
            course.status ||
            'Published'
        );


    DOM.status.textContent =
        status;


    DOM.status.className =
        `course-status ${statusClass(status)}`;


    const isComingSoon =
        status.toLowerCase() ===
        'coming soon';


    if (isComingSoon) {

        DOM.buyButton.disabled =
            true;

        DOM.buyButton.innerHTML = `
            <i class="fa-solid fa-clock"></i>
            Coming Soon
        `;

    } else {

        DOM.buyButton.disabled =
            false;

        DOM.buyButton.innerHTML = `
            <i class="fa-solid fa-lock"></i>
            Buy Now
        `;
    }
}


/* ============================================================
   LEARNING OUTCOMES
============================================================ */

function renderLearningOutcomes(
    course
) {

    /*
     * These can later come directly from
     * your database/course data.
     *
     * For now we derive useful outcomes
     * from the course information.
     */

    let outcomes =
        Array.isArray(
            course.learningOutcomes
        )
            ? course.learningOutcomes
            : [];


    if (!outcomes.length) {

        outcomes =
            generateDefaultOutcomes(
                course
            );
    }


    DOM.learningOutcomes.innerHTML =
        outcomes
            .map(
                outcome => `
                    <div class="learning-item">

                        <i class="fa-solid fa-circle-check"></i>

                        <span>
                            ${escapeHtml(
                                outcome
                            )}
                        </span>

                    </div>
                `
            )
            .join('');
}


/* ============================================================
   DEFAULT LEARNING OUTCOMES
============================================================ */

function generateDefaultOutcomes(
    course
) {

    const category =
        String(
            course.category ||
            ''
        );


    if (
        category ===
        'Generative AI'
    ) {

        return [
            'Understand the foundations of Generative AI and modern LLM applications.',
            'Work with Large Language Models and practical AI workflows.',
            'Understand Retrieval-Augmented Generation (RAG).',
            'Build practical AI agents and automation workflows.',
            'Apply concepts through hands-on projects and examples.'
        ];
    }


    if (
        category ===
        'Python'
    ) {

        return [
            'Build a strong foundation in Python programming.',
            'Understand variables, data types, conditions and loops.',
            'Write reusable functions and organize Python programs.',
            'Work with common Python data structures.',
            'Build practical beginner-friendly programs.'
        ];
    }


    if (
        category ===
        'Machine Learning'
    ) {

        return [
            'Understand the fundamentals of Machine Learning.',
            'Prepare and explore datasets for ML projects.',
            'Understand major supervised and unsupervised learning concepts.',
            'Evaluate machine learning models.',
            'Build practical machine learning workflows using Python.'
        ];
    }


    if (
        category ===
        'Data Science'
    ) {

        return [
            'Build Python foundations for Data Science.',
            'Work with data using practical Python tools.',
            'Understand data cleaning and preparation.',
            'Perform exploratory data analysis.',
            'Build a foundation for further Data Science learning.'
        ];
    }


    return [
        `Learn the core concepts covered in ${course.title}.`,
        'Follow structured lessons from fundamentals to practical applications.',
        'Apply concepts through examples and hands-on practice.',
        'Build a strong foundation for further learning.',
        'Learn at your own pace with lifetime access.'
    ];
}


/* ============================================================
   REQUIREMENTS
============================================================ */

function renderRequirements(
    course
) {

    let requirements =
        Array.isArray(
            course.requirements
        )
            ? course.requirements
            : [];


    if (!requirements.length) {

        requirements =
            generateDefaultRequirements(
                course
            );
    }


    DOM.requirements.innerHTML =
        requirements
            .map(
                item => `
                    <li>
                        ${escapeHtml(item)}
                    </li>
                `
            )
            .join('');
}


/* ============================================================
   DEFAULT REQUIREMENTS
============================================================ */

function generateDefaultRequirements(
    course
) {

    const category =
        String(
            course.category ||
            ''
        );


    if (
        category ===
        'Python'
    ) {

        return [
            'No prior Python programming experience is required.',
            'A computer with internet access.',
            'Willingness to practice the examples yourself.'
        ];
    }


    if (
        category ===
        'Generative AI'
    ) {

        return [
            'Basic computer knowledge.',
            'Basic programming knowledge is helpful but not mandatory.',
            'A computer with internet access.',
            'Curiosity and willingness to experiment with AI.'
        ];
    }


    if (
        category ===
        'Machine Learning'
    ) {

        return [
            'Basic Python knowledge is recommended.',
            'Basic mathematics knowledge is helpful.',
            'A computer with internet access.',
            'Willingness to practice ML examples.'
        ];
    }


    if (
        category ===
        'Data Science'
    ) {

        return [
            'Basic computer knowledge.',
            'Basic Python knowledge is helpful.',
            'A computer with internet access.',
            'Willingness to work with datasets.'
        ];
    }


    return [
        'Basic computer knowledge.',
        'A computer with internet access.',
        'Willingness to learn and practice.'
    ];
}


/* ============================================================
   DESCRIPTION
============================================================ */

function renderDescription(
    course
) {

    const fullDescription =
        course.fullDescription ||
        course.description ||
        '';


    /*
     * If future course data contains HTML,
     * we'll eventually sanitize it server-side.
     *
     * For now we treat it as plain text.
     */

    const paragraphs =
        String(
            fullDescription
        )
            .split(/\n\s*\n/)
            .map(
                paragraph =>
                    paragraph.trim()
            )
            .filter(Boolean);


    DOM.fullDescription.innerHTML =
        paragraphs
            .map(
                paragraph => `
                    <p>
                        ${escapeHtml(
                            paragraph
                        )}
                    </p>
                `
            )
            .join('');
}


/* ============================================================
   CURRICULUM
============================================================ */

function renderCurriculum(
    course
) {

    /*
     * If curriculum exists in the JSON,
     * use it.
     *
     * Otherwise create a temporary
     * placeholder curriculum.
     */

    let curriculum =
        Array.isArray(
            course.curriculum
        )
            ? course.curriculum
            : [];


    if (!curriculum.length) {

        curriculum =
            generatePlaceholderCurriculum(
                course
            );
    }


    const totalSections =
        curriculum.length;


    const totalLectures =
        curriculum.reduce(
            (
                total,
                section
            ) => {

                const lectures =
                    Array.isArray(
                        section.lectures
                    )
                        ? section.lectures
                        : [];


                return (
                    total +
                    lectures.length
                );
            },
            0
        );


    DOM.curriculumSummary.textContent =
        `${totalSections} sections • ${totalLectures} lectures`;


    DOM.curriculum.innerHTML =
        curriculum
            .map(
                (
                    section,
                    index
                ) =>
                    renderCurriculumSection(
                        section,
                        index
                    )
            )
            .join('');


    attachCurriculumEvents();
}


/* ============================================================
   PLACEHOLDER CURRICULUM
============================================================ */

function generatePlaceholderCurriculum(
    course
) {

    const lectureCount =
        Math.max(
            1,
            Number(
                course.lectures
            ) || 1
        );


    const sectionCount =
        Math.min(
            8,
            Math.max(
                3,
                Math.ceil(
                    lectureCount / 20
                )
            )
        );


    const sections = [];


    for (
        let i = 0;
        i < sectionCount;
        i++
    ) {

        const start =
            Math.floor(
                i *
                lectureCount /
                sectionCount
            ) + 1;


        const end =
            Math.floor(
                (i + 1) *
                lectureCount /
                sectionCount
            );


        const lectures = [];


        for (
            let n = start;
            n <= end;
            n++
        ) {

            lectures.push({
                title:
                    `Lecture ${n}`,

                duration:
                    '',

                preview:
                    n === 1
            });
        }


        sections.push({

            title:
                `Section ${i + 1}`,

            lectures
        });
    }


    return sections;
}


/* ============================================================
   CURRICULUM SECTION
============================================================ */

function renderCurriculumSection(
    section,
    index
) {

    const lectures =
        Array.isArray(
            section.lectures
        )
            ? section.lectures
            : [];


    const sectionTitle =
        section.title ||
        `Section ${index + 1}`;


    return `
        <div
            class="curriculum-section
                   ${index === 0 ? 'open' : ''}"
        >

            <button
                type="button"
                class="curriculum-header"
                aria-expanded="${
                    index === 0
                }"
            >

                <span
                    class="curriculum-header-left"
                >

                    <i
                        class="fa-solid
                               fa-folder-open"
                    ></i>

                    <span
                        class="curriculum-section-title"
                    >
                        ${escapeHtml(
                            sectionTitle
                        )}
                    </span>

                </span>


                <span
                    class="curriculum-section-meta"
                >
                    ${lectures.length}
                    ${
                        lectures.length === 1
                            ? 'lecture'
                            : 'lectures'
                    }
                </span>


                <i
                    class="fa-solid
                           fa-chevron-down
                           curriculum-chevron"
                ></i>

            </button>


            <div
                class="curriculum-lectures"
            >

                ${
                    lectures.length
                        ? lectures
                            .map(
                                (
                                    lecture,
                                    lectureIndex
                                ) =>
                                    renderLecture(
                                        lecture,
                                        lectureIndex
                                    )
                            )
                            .join('')
                        : `
                            <div class="lecture-row">
                                <span>
                                    No lectures available yet.
                                </span>
                            </div>
                        `
                }

            </div>

        </div>
    `;
}


/* ============================================================
   LECTURE
============================================================ */

function renderLecture(
    lecture,
    index
) {

    const title =
        typeof lecture === 'string'
            ? lecture
            : lecture?.title ||
              `Lecture ${index + 1}`;


    const duration =
        typeof lecture === 'object'
            ? lecture.duration || ''
            : '';


    const preview =
        typeof lecture === 'object'
            ? Boolean(
                lecture.preview
            )
            : index === 0;


    return `
        <div class="lecture-row">

            <span class="lecture-icon">
                <i
                    class="fa-solid fa-play"
                ></i>
            </span>


            <span class="lecture-title">
                ${escapeHtml(title)}
            </span>


            ${
                preview
                    ? `
                        <span class="lecture-preview">
                            Preview
                        </span>
                    `
                    : ''
            }


            ${
                duration
                    ? `
                        <span
                            class="lecture-duration"
                        >
                            ${escapeHtml(
                                duration
                            )}
                        </span>
                    `
                    : ''
            }

        </div>
    `;
}


/* ============================================================
   CURRICULUM EVENTS
============================================================ */

function attachCurriculumEvents() {

    const sections =
        document.querySelectorAll(
            '.curriculum-section'
        );


    sections.forEach(
        section => {

            const button =
                section.querySelector(
                    '.curriculum-header'
                );


            if (!button) {
                return;
            }


            button.addEventListener(
                'click',
                () => {

                    const isOpen =
                        section.classList.contains(
                            'open'
                        );


                    section.classList.toggle(
                        'open'
                    );


                    button.setAttribute(
                        'aria-expanded',
                        String(!isOpen)
                    );
                }
            );
        }
    );
}


/* ============================================================
   COURSE INFORMATION
============================================================ */

function renderCourseInformation(
    course
) {

    const information = [

        {
            label:
                'Level',

            value:
                course.level ||
                'All Levels'
        },

        {
            label:
                'Language',

            value:
                course.language ||
                'English'
        },

        {
            label:
                'Lectures',

            value:
                course.lectures ??
                '—'
        },

        {
            label:
                'Duration',

            value:
                course.duration ||
                '—'
        },

        {
            label:
                'Category',

            value:
                course.category ||
                '—'
        },

        {
            label:
                'Access',

            value:
                'Lifetime'
        }

    ];


    DOM.courseInformation.innerHTML =
        information
            .map(
                item => `
                    <div class="info-row">

                        <span
                            class="info-label"
                        >
                            ${escapeHtml(
                                item.label
                            )}
                        </span>

                        <span
                            class="info-value"
                        >
                            ${escapeHtml(
                                item.value
                            )}
                        </span>

                    </div>
                `
            )
            .join('');
}


/* ============================================================
   BUY BUTTON
============================================================ */

function handleBuyCourse() {

    if (!state.course) {
        return;
    }


    /*
     * PAYMENT IS NOT CONNECTED YET.
     *
     * Later this function will call:
     *
     * POST /api/payments/create-order
     *
     * then open the payment gateway.
     */


    const course =
        state.course;


    alert(
        `Purchase system coming soon for:\n\n${course.title}`
    );
}


/* ============================================================
   PREVIEW MODAL
============================================================ */

function openPreview() {

    if (!DOM.previewModal) {
        return;
    }


    DOM.previewModal.hidden =
        false;


    DOM.previewModal.setAttribute(
        'aria-hidden',
        'false'
    );


    document.body.style.overflow =
        'hidden';
}


function closePreview() {

    if (!DOM.previewModal) {
        return;
    }


    DOM.previewModal.hidden =
        true;


    DOM.previewModal.setAttribute(
        'aria-hidden',
        'true'
    );


    document.body.style.overflow =
        '';
}


/* ============================================================
   GLOBAL EVENTS
============================================================ */

function initEvents() {

    if (
        DOM.buyButton
    ) {

        DOM.buyButton.addEventListener(
            'click',
            handleBuyCourse
        );
    }


    if (
        DOM.previewButton
    ) {

        DOM.previewButton.addEventListener(
            'click',
            openPreview
        );
    }


    if (
        DOM.closePreview
    ) {

        DOM.closePreview.addEventListener(
            'click',
            closePreview
        );
    }


    document.querySelectorAll(
        '[data-close-preview]'
    )
        .forEach(
            element => {

                element.addEventListener(
                    'click',
                    closePreview
                );
            }
        );


    document.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Escape'
            ) {

                closePreview();
            }
        }
    );
}


/* ============================================================
   INITIALIZE
============================================================ */

function initialize() {

    if (
        DOM.currentYear
    ) {

        DOM.currentYear.textContent =
            new Date()
                .getFullYear();
    }


    state.courseId =
        getCourseIdFromUrl();


    if (!state.courseId) {

        showError();

        return;
    }


    initEvents();

    loadCourse();
}


/* ============================================================
   ERROR
============================================================ */

function showError() {

    if (DOM.loading) {
        DOM.loading.hidden =
            true;
    }


    if (DOM.content) {
        DOM.content.hidden =
            true;
    }


    if (DOM.error) {
        DOM.error.hidden =
            false;
    }
}


/* ============================================================
   START
============================================================ */

if (
    document.readyState ===
    'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        initialize
    );

} else {

    initialize();
}