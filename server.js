'use strict';

const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

dotenv.config();

const youtubeStats = require('./api/youtube/stats');
const youtubeVideos = require('./api/youtube/videos');
const chat = require('./api/chat');
const judge0 = require('./api/judge0');
const contact = require('./api/contact');

const DRIVE_BASE_URL =
    'https://www.googleapis.com/drive/v3';

const app = express();

const port =
    Number.parseInt(
        process.env.PORT,
        10
    ) || 3000;

const isProduction =
    process.env.NODE_ENV === 'production';


// ============================================================
// SECURITY / CONFIGURATION
// ============================================================

// IMPORTANT:
// CSP remains disabled because the current portfolio uses
// inline scripts. We can migrate those scripts to external
// files later and enable a strict CSP properly.
//
// Other Helmet security headers remain enabled.
app.use(
    helmet({
        contentSecurityPolicy: false
    })
);


// ============================================================
// CORS
// ============================================================

// For local development, allow the local portfolio to call
// its own API.
//
// In production, you can optionally define:
// ALLOWED_ORIGIN=https://your-domain.com
const allowedOrigin =
    process.env.ALLOWED_ORIGIN || null;

app.use(
    cors({
        origin: allowedOrigin || true,
        methods: [
            'GET',
            'POST',
            'OPTIONS'
        ],
        allowedHeaders: [
            'Content-Type',
            'Authorization'
        ],
        credentials: false
    })
);


// ============================================================
// GENERAL MIDDLEWARE
// ============================================================

app.use(
    compression()
);

app.use(
    morgan(
        isProduction
            ? 'combined'
            : 'dev'
    )
);


// ============================================================
// REQUEST BODY LIMITS
// ============================================================

// JSON API requests
app.use(
    express.json({
        limit: '1mb'
    })
);

// Form submissions
app.use(
    express.urlencoded({
        extended: true,
        limit: '1mb'
    })
);


// ============================================================
// HEALTH CHECK
// ============================================================

app.get(
    '/api/health',
    (req, res) => {
        res.status(200).json({
            ok: true,
            status: 'ready',
            environment:
                isProduction
                    ? 'production'
                    : 'development'
        });
    }
);


// ============================================================
// API ROUTES
// ============================================================

app.get(
    '/api/youtube/stats',
    youtubeStats
);

app.get(
    '/api/youtube/videos',
    youtubeVideos
);

app.post(
    '/api/chat',
    chat
);

app.post(
    '/api/judge0',
    judge0
);

app.post(
    '/api/contact',
    contact
);


// ============================================================
// GOOGLE DRIVE PROXY
// ============================================================

app.use(
    '/api/drive',
    async (req, res) => {

        // ----------------------------------------------------
        // Only GET requests are required for the Drive proxy.
        // ----------------------------------------------------
        if (req.method !== 'GET') {
            return res
                .status(405)
                .json({
                    error:
                        'Method not allowed'
                });
        }


        // ----------------------------------------------------
        // API key
        // ----------------------------------------------------

        const apiKey =
            process.env.GOOGLE_DRIVE_API_KEY;

        if (!apiKey) {
            return res.status(503).json({
                files: [],
                _missing_key: true,
                message:
                    'GOOGLE_DRIVE_API_KEY is not configured'
            });
        }


        // ----------------------------------------------------
        // Requested Drive resource
        // ----------------------------------------------------

        const requestPath =
            String(
                req.path || ''
            )
                .replace(
                    /^\/+/,
                    ''
                )
                .trim();

        if (!requestPath) {
            return res
                .status(400)
                .json({
                    error:
                        'Drive resource path is required'
                });
        }


        // ----------------------------------------------------
        // Protect against malformed URL paths
        // ----------------------------------------------------

        if (
            requestPath.includes('..') ||
            requestPath.includes('\\')
        ) {
            return res
                .status(400)
                .json({
                    error:
                        'Invalid Drive resource path'
                });
        }


        try {

            const targetUrl =
                new URL(
                    `${DRIVE_BASE_URL}/${requestPath}`
                );


            // ------------------------------------------------
            // Forward query parameters
            // ------------------------------------------------

            for (
                const [
                    key,
                    value
                ] of Object.entries(
                    req.query
                )
            ) {

                if (
                    Array.isArray(value)
                ) {

                    value.forEach(
                        item => {
                            if (
                                item !==
                                undefined
                            ) {
                                targetUrl
                                    .searchParams
                                    .append(
                                        key,
                                        String(
                                            item
                                        )
                                    );
                            }
                        }
                    );

                } else if (
                    value !== undefined
                ) {

                    targetUrl
                        .searchParams
                        .set(
                            key,
                            String(value)
                        );
                }
            }


            // ------------------------------------------------
            // Google Drive parameters
            // ------------------------------------------------

            targetUrl.searchParams.set(
                'supportsAllDrives',
                'true'
            );

            targetUrl.searchParams.set(
                'includeItemsFromAllDrives',
                'true'
            );

            targetUrl.searchParams.set(
                'key',
                apiKey
            );


            // ------------------------------------------------
            // Request timeout
            // ------------------------------------------------

            const controller =
                new AbortController();

            const timeout =
                setTimeout(
                    () => {
                        controller.abort();
                    },
                    15000
                );


            let response;

            try {

                response =
                    await fetch(
                        targetUrl.toString(),
                        {
                            method: 'GET',
                            signal:
                                controller.signal
                        }
                    );

            } finally {

                clearTimeout(
                    timeout
                );
            }


            // ------------------------------------------------
            // Google API response
            // ------------------------------------------------

            const contentType =
                response
                    .headers
                    .get(
                        'content-type'
                    ) || '';


            if (
                contentType.includes(
                    'application/json'
                )
            ) {

                const data =
                    await response.json();

                return res
                    .status(
                        response.status
                    )
                    .json(data);
            }


            // ------------------------------------------------
            // Non-JSON response
            // ------------------------------------------------

            const buffer =
                await response.arrayBuffer();

            res.status(
                response.status
            );

            res.setHeader(
                'Content-Type',
                contentType ||
                    'application/octet-stream'
            );

            return res.send(
                Buffer.from(buffer)
            );

        } catch (error) {

            if (
                error?.name ===
                'AbortError'
            ) {

                console.error(
                    'Google Drive request timed out.'
                );

                return res
                    .status(504)
                    .json({
                        error:
                            'Google Drive request timed out'
                    });
            }


            console.error(
                'Drive proxy error:',
                error
            );

            return res
                .status(502)
                .json({
                    error:
                        'Failed to proxy Google Drive request'
                });
        }
    }
);


// ============================================================
// STATIC FILES
// ============================================================

app.use(
    express.static(
        __dirname,
        {
            extensions: [
                'html'
            ],

            // Browser caching can be handled by the
            // browser normally during local development.
            etag: true,

            // Do not expose directory listings.
            index: 'index.html'
        }
    )
);


// ============================================================
// API 404 HANDLER
// ============================================================

app.use(
    (req, res, next) => {

        if (
            req.path.startsWith(
                '/api/'
            )
        ) {

            return res
                .status(404)
                .json({
                    error:
                        'API endpoint not found',
                    path:
                        req.path
                });
        }

        next();
    }
);


// ============================================================
// FRONTEND FALLBACK
// ============================================================

// Any non-API route that wasn't handled by a static file
// receives index.html.
//
// This keeps client-side portfolio routes working.
app.use(
    (req, res) => {

        return res.sendFile(
            path.join(
                __dirname,
                'index.html'
            )
        );
    }
);


// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(
    (
        err,
        req,
        res,
        next
    ) => {

        console.error(
            'Unhandled server error:',
            err
        );


        if (
            res.headersSent
        ) {
            return next(err);
        }


        return res
            .status(500)
            .json({
                error:
                    'Internal server error'
            });
    }
);


// ============================================================
// START SERVER
// ============================================================

app.listen(
    port,
    () => {

        console.log(
            `Portfolio server running at http://localhost:${port}`
        );

        console.log(
            `Environment: ${
                isProduction
                    ? 'production'
                    : 'development'
            }`
        );
    }
);