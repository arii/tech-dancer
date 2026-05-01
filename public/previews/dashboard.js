/**
 * PREVIEW DASHBOARD LOGIC
 * Standalone utility for Tech Dancer infrastructure.
 */

const REPO_OWNER = 'arii';
const REPO_NAME = 'tech-dancer';
const BASE_URL = `https://${REPO_OWNER}.github.io/${REPO_NAME}`;
const GITHUB_REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
const TRACKING_URL = `${BASE_URL}/REVIEW_TRACKING.md`;
const EXCLUDED = ['assets', 'previews', 'css', 'js', 'img', 'images', 'public'];

const ICONS = {
    pr: `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" x2="6" y1="9" y2="21"/></svg>`,
    branch: `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
    external: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`,
    success: `<svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    failure: `<svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    pending: `<svg class="w-4 h-4 text-amber-500 animate-spin" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`,
    warning: `<svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    clock: `<svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
};

const escapeHtml = (u) => u.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#039;"}[m]));

function timeAgo(seconds) {
    const diff = Math.floor(Date.now() / 1000) - seconds;
    if (diff < 60) return 'just now';
    if (diff < 3600) {
        const m = Math.floor(diff / 60);
        return `${m} minute${m > 1 ? 's' : ''} ago`;
    }
    if (diff < 86400) {
        const h = Math.floor(diff / 3600);
        return `${h} hour${h > 1 ? 's' : ''} ago`;
    }
    const d = Math.floor(diff / 86400);
    return `${d} day${d > 1 ? 's' : ''} ago`;
}

async function apiFetch(endpoint) {
    const url = endpoint.startsWith('http') ? endpoint : `https://api.github.com/${endpoint.replace(/^\//, '')}`;
    const res = await fetch(url);
    if (res.status === 403) {
        const rate = await fetch('https://api.github.com/rate_limit').then(r => r.json()).catch(() => null);
        if (rate && rate.resources.core.remaining === 0) {
            throw new Error('RATE_LIMITED');
        }
    }
    if (!res.ok) throw new Error(`API_ERROR_${res.status}`);
    return res.json();
}

async function checkRateLimit() {
    try {
        const data = await apiFetch('rate_limit');
        return data.resources.core;
    } catch (e) {
        return null;
    }
}

async function fetchCIStatusHtml(sha, useCache = true) {
    const cacheKey = `ci_status_${sha}`;
    if (useCache) {
        try {
            const cached = JSON.parse(sessionStorage.getItem(cacheKey));
            if (cached && Date.now() - cached.timestamp < 60000) {
                return cached.html;
            }
        } catch (e) {}
    }

    try {
        const data = await apiFetch(`repos/${REPO_OWNER}/${REPO_NAME}/commits/${sha}/check-runs`);
        if (!data.check_runs || data.check_runs.length === 0) return '';

        const isPending = data.check_runs.some(cr => cr.status !== 'completed');
        const isFailure = data.check_runs.some(cr => cr.conclusion === 'failure' || cr.conclusion === 'timed_out' || cr.conclusion === 'cancelled');

        let html = '';
        if (isFailure) {
            html = `<span class="flex items-center gap-1 text-red-700 dark:text-red-400 text-xs font-semibold bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-md border border-red-200 dark:border-red-800">${ICONS.failure} Checks Failed</span>`;
        } else if (isPending) {
            html = `<span class="flex items-center gap-1 text-amber-700 dark:text-amber-400 text-xs font-semibold bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-md border border-amber-200 dark:border-amber-800">${ICONS.pending} Checks Pending</span>`;
        } else {
            html = `<span class="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">${ICONS.success} Checks Passed</span>`;
        }

        sessionStorage.setItem(cacheKey, JSON.stringify({ html, timestamp: Date.now() }));
        return html;
    } catch (e) {
        const errHtml = `<span class="flex items-center gap-1 text-slate-600 dark:text-slate-400 text-xs font-semibold bg-slate-50 dark:bg-slate-900/30 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800">${ICONS.warning} Status Error</span>`;
        return errHtml;
    }
}

function resetFilters() {
    document.getElementById('search').value = '';
    document.getElementById('status-filter').value = 'all';
    document.getElementById('show-automated').checked = false;
    filterCards();
}

function filterCards() {
    const query = document.getElementById('search').value.toLowerCase();
    const status = document.getElementById('status-filter').value;
    const showAutomated = document.getElementById('show-automated').checked;
    const grid = document.getElementById('grid');
    const emptyState = document.getElementById('empty-state');

    let overallVisibleCount = 0;
    Array.from(grid.children).forEach(container => {
        if (container.tagName !== 'DIV' || !container.classList.contains('flex-col')) return;

        let visibleCount = 0;
        Array.from(container.querySelectorAll('.preview-card')).forEach(card => {
            const name = card.dataset.name.toLowerCase();
            const title = card.dataset.title.toLowerCase();
            const author = card.dataset.author.toLowerCase();
            const type = card.dataset.type;
            const isAuto = card.dataset.isAuto === 'true';
            const isDraft = card.dataset.isDraft === 'true';

            const matchesSearch = name.includes(query) || title.includes(query) || author.includes(query);

            let matchesStatus = status === 'all' || status === type;
            if (status === 'draft') matchesStatus = isDraft;
            if (status === 'stale') matchesStatus = card.dataset.isStale === 'true';

            const matchesAuto = showAutomated || !isAuto;

            if (matchesSearch && matchesStatus && matchesAuto) {
                card.classList.remove('hidden');
                card.classList.add('flex');
                visibleCount++;
                overallVisibleCount++;
            } else {
                card.classList.add('hidden');
                card.classList.remove('flex');
            }
        });

        // Hide the whole group if no cards are visible
        if (visibleCount === 0) {
            container.classList.add('hidden');
            container.previousElementSibling.classList.add('hidden'); // Hide the heading
        } else {
            container.classList.remove('hidden');
            container.previousElementSibling.classList.remove('hidden');
        }
    });

    emptyState.classList.toggle('hidden', overallVisibleCount > 0);
}

async function init() {
    const grid = document.getElementById('grid'), loading = document.getElementById('loading'), errorAlert = document.getElementById('error-alert');
    const trackingLink = document.getElementById('tracking-link');
    if (trackingLink) trackingLink.href = TRACKING_URL;

    // Attach event listeners
    const searchInput = document.getElementById('search');
    const statusFilter = document.getElementById('status-filter');
    const showAutomatedToggle = document.getElementById('show-automated');
    const resetFiltersBtn = document.getElementById('reset-filters');

    if (searchInput) searchInput.addEventListener('input', filterCards);
    if (statusFilter) statusFilter.addEventListener('change', filterCards);
    if (showAutomatedToggle) showAutomatedToggle.addEventListener('change', filterCards);
    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetFilters);

    try {
        const rateLimit = await checkRateLimit();
        if (rateLimit && rateLimit.remaining < 10) {
            const warning = document.createElement('div');
            warning.className = 'mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-400 px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium';
            warning.innerHTML = `${ICONS.warning} GitHub API rate limit is low (${rateLimit.remaining} left). CI statuses may not load correctly.`;
            grid.before(warning);
        }

        const [treeData, prs, releases] = await Promise.all([
            apiFetch(`repos/${REPO_OWNER}/${REPO_NAME}/git/trees/gh-pages?recursive=1`),
            apiFetch(`repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=open&per_page=100`).catch(() => []),
            apiFetch(`repos/${REPO_OWNER}/${REPO_NAME}/releases?per_page=1`).catch(() => [])
        ]);

        const prStatuses = {};
        if (!rateLimit || rateLimit.remaining > 5) {
            await Promise.all(prs.map(async (pr) => {
                prStatuses[pr.head.ref] = await fetchCIStatusHtml(pr.head.sha);
            }));
        }

        loading.style.display = 'none';

        const allFoldersRaw = treeData.tree
            .filter(i => i.path.endsWith('/index.html') && !EXCLUDED.some(e => i.path.startsWith(e)) && i.path !== 'index.html' && i.path !== '404.html')
            .map(i => i.path.replace('/index.html', ''));

        const prFolders = allFoldersRaw
            .filter(name => prs.some(p => p.head.ref === name))
            .sort((a, b) => {
                const prA = prs.find(p => p.head.ref === a);
                const prB = prs.find(p => p.head.ref === b);
                return new Date(prB.updated_at).getTime() - new Date(prA.updated_at).getTime();
            });

        const branchFolders = allFoldersRaw
            .filter(name => !prs.some(p => p.head.ref === name))
            .sort((a, b) => a.localeCompare(b));

        const stalePrs = prs.filter(p => (Date.now() - new Date(p.updated_at).getTime()) > 14 * 24 * 60 * 60 * 1000);

        document.getElementById('stat-prs').textContent = prs.length;
        document.getElementById('stat-active').textContent = branchFolders.length;
        document.getElementById('stat-stale').textContent = stalePrs.length;
        document.getElementById('stat-releases').textContent = releases.length > 0 ? releases[0].tag_name : '0';
        document.getElementById('stat-total').textContent = allFoldersRaw.length;
        document.getElementById('last-updated').textContent = new Date().toLocaleString();

        if (!allFoldersRaw.length) {
            grid.innerHTML = `<div class="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"><p class="text-slate-500 dark:text-slate-400 text-lg">No active preview branches found.</p></div>`;
            return;
        }

        const renderGroup = (title, foldersList, isPr) => {
            if (!foldersList.length) return;

            const groupContainer = document.createDocumentFragment();
            const heading = document.createElement('h2');
            heading.className = 'text-xl font-bold mt-8 mb-4 flex items-center gap-2 text-slate-800 dark:text-slate-200';
            heading.innerHTML = `${isPr ? ICONS.pr : ICONS.branch} ${title}`;
            groupContainer.appendChild(heading);

            const stack = document.createElement('div');
            stack.className = 'flex flex-col gap-4 mb-10';

            foldersList.forEach((name, idx) => {
                const pr = prs.find(p => p.head.ref === name), url = `${BASE_URL}/${name}/`;
                const ciStatusHtml = prStatuses[name] || '';

                const isAuto = pr && (pr.user.login.includes('bot') || pr.user.login === 'dependabot');
                const card = document.createElement('div');
                card.dataset.name = name;
                card.dataset.type = isPr ? 'pr' : 'active';
                card.dataset.isAuto = isAuto;
                card.dataset.author = pr ? pr.user.login : '';
                card.dataset.title = pr ? pr.title : '';
                card.dataset.isDraft = pr ? pr.draft : false;
                const isStale = pr && (Date.now() - new Date(pr.updated_at).getTime()) > 14 * 24 * 60 * 60 * 1000;
                card.dataset.isStale = isStale;
                const zebraClass = idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-900/50';
                card.className = `preview-card ${zebraClass} rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer group`;
                card.onclick = (e) => {
                    if (!e.target.closest('a')) window.open(pr ? pr.html_url : url, '_blank');
                };

                let labelsHtml = '';
                if (pr && pr.labels) {
                    labelsHtml = pr.labels.map(l => `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold border" style="background-color: #${l.color}22; color: #${l.color}; border-color: #${l.color}44">${l.name.toUpperCase()}</span>`).join('');
                }

                const badge = isPr
                    ? `<div class="flex items-center gap-2 flex-wrap">
                         <span class="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">${pr.draft ? 'Draft PR' : 'Open PR'}</span>
                         ${ciStatusHtml}
                         ${labelsHtml}
                       </div>`
                    : `<span class="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">Active Branch</span>`;

                const compareUrl = `${GITHUB_REPO_URL}/compare/main...${encodeURIComponent(name)}`;

                card.innerHTML = `
                    <div class="flex-1 min-w-0 w-full">
                        <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                            ${pr ? `<a href="${pr.html_url}" target="_blank" rel="noopener" class="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-lg sm:text-xl flex items-center gap-2 truncate">${ICONS.pr} PR #${pr.number}: ${escapeHtml(pr.title)}</a>` : `<div class="text-slate-800 dark:text-slate-200 font-semibold text-lg sm:text-xl flex items-center gap-2 text-balance">${ICONS.branch} ${escapeHtml(name)}</div>`}
                            <div class="hidden sm:block">${badge}</div>
                        </div>
                        <div class="flex items-center gap-3 flex-wrap">
                            <span class="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono px-2 py-1 rounded border border-slate-200 dark:border-slate-700 truncate max-w-[200px]">${escapeHtml(name)}</span>
                            <a href="${GITHUB_REPO_URL}/tree/${encodeURIComponent(name)}" target="_blank" rel="noopener" class="text-xs text-slate-500 hover:text-blue-500 flex items-center gap-1 transition-colors">${ICONS.external} Source</a>
                            <a href="${compareUrl}" target="_blank" rel="noopener" class="text-xs text-slate-500 hover:text-blue-500 flex items-center gap-1 transition-colors">${ICONS.external} Compare</a>
                            ${pr ? `<span class="text-xs text-slate-400 flex items-center gap-1">${ICONS.clock} ${timeAgo(Math.floor(new Date(pr.updated_at).getTime() / 1000))}</span>` : ''}
                            <div class="sm:hidden">${badge}</div>
                        </div>
                    </div>
                    <a href="${url}" target="_blank" rel="noopener" class="w-full sm:w-auto bg-slate-900 dark:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity shrink-0">View Deployment ${ICONS.external}</a>`;
                stack.appendChild(card);
            });
            groupContainer.appendChild(stack);
            grid.appendChild(groupContainer);
        };

        renderGroup('Pull Request Previews', prFolders, true);
        renderGroup('Other Deployed Branches', branchFolders, false);

        // Initial filter to hide automated PRs
        filterCards();

    } catch (err) {
        loading.style.display = 'none';
        document.getElementById('error-msg').textContent = err.message;
        errorAlert.classList.remove('hidden');
    }
}

// Initializing on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
