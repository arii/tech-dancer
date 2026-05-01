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

let rateLimitRemaining = null;

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

/**
 * Robust GitHub API wrapper with rate limit handling and error normalization.
 */
async function fetchGitHub(endpoint) {
    if (rateLimitRemaining === 0) throw new Error('RATE_LIMITED');

    const url = endpoint.startsWith('http') ? endpoint : `https://api.github.com/${endpoint.replace(/^\//, '')}`;
    const res = await fetch(url);

    const remaining = res.headers.get('x-ratelimit-remaining');
    if (remaining !== null) rateLimitRemaining = parseInt(remaining, 10);

    if (res.status === 403 && remaining === '0') throw new Error('RATE_LIMITED');
    if (!res.ok) throw new Error(`API_ERROR_${res.status}`);

    return res.json();
}

async function fetchCIStatus(sha, useCache = true) {
    const cacheKey = `ci_status_${sha}`;
    if (useCache) {
        try {
            const cached = JSON.parse(sessionStorage.getItem(cacheKey));
            if (cached && Date.now() - cached.timestamp < 60000) return cached.data;
        } catch (e) {}
    }

    try {
        const data = await fetchGitHub(`repos/${REPO_OWNER}/${REPO_NAME}/commits/${sha}/check-runs`);
        if (!data.check_runs || data.check_runs.length === 0) return null;

        const result = {
            isPending: data.check_runs.some(cr => cr.status !== 'completed'),
            isFailure: data.check_runs.some(cr => cr.conclusion === 'failure' || cr.conclusion === 'timed_out' || cr.conclusion === 'cancelled')
        };

        sessionStorage.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }));
        return result;
    } catch (e) {
        return 'ERROR';
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
        if (!container.classList.contains('group-stack')) return;

        let visibleCount = 0;
        Array.from(container.querySelectorAll('.preview-card')).forEach(card => {
            const { name, title, author, type, isAuto, isDraft, isStale } = card.dataset;
            const matchesSearch = [name, title, author].some(v => v?.toLowerCase().includes(query));

            let matchesStatus = status === 'all' || status === type;
            if (status === 'draft') matchesStatus = isDraft === 'true';
            if (status === 'stale') matchesStatus = isStale === 'true';

            const matchesAuto = showAutomated || isAuto !== 'true';

            const isVisible = matchesSearch && matchesStatus && matchesAuto;
            card.classList.toggle('hidden', !isVisible);
            card.classList.toggle('flex', isVisible);
            if (isVisible) {
                visibleCount++;
                overallVisibleCount++;
            }
        });

        // Toggle visibility of group heading and stack
        container.classList.toggle('hidden', visibleCount === 0);
        container.previousElementSibling.classList.toggle('hidden', visibleCount === 0);
    });

    emptyState.classList.toggle('hidden', overallVisibleCount > 0);
}

// --- DOM Construction Helpers ---

function el(tag, props = {}, children = []) {
    const element = document.createElement(tag);
    Object.entries(props).forEach(([key, value]) => {
        if (key === 'className') element.className = value;
        else if (key === 'dataset') Object.assign(element.dataset, value);
        else if (key === 'innerHTML') element.innerHTML = value;
        else element[key] = value;
    });
    children.forEach(child => {
        if (typeof child === 'string') element.appendChild(document.createTextNode(child));
        else if (child) element.appendChild(child);
    });
    return element;
}

function createBadge(text, color) {
    const colorClasses = color === 'blue'
        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
        : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
    return el('span', { className: `${colorClasses} text-xs font-semibold px-2.5 py-1 rounded-full border` }, [text]);
}

function createStatusBadge(status) {
    if (!status) return null;
    if (status === 'ERROR') {
        return el('span', { className: 'flex items-center gap-1 text-slate-600 dark:text-slate-400 text-xs font-semibold bg-slate-50 dark:bg-slate-900/30 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800', innerHTML: `${ICONS.warning} Status Error` });
    }
    const { isFailure, isPending } = status;
    const config = isFailure
        ? { cls: 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800', icon: ICONS.failure, text: 'Checks Failed' }
        : isPending
        ? { cls: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800', icon: ICONS.pending, text: 'Checks Pending' }
        : { cls: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800', icon: ICONS.success, text: 'Checks Passed' };

    return el('span', { className: `flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md border ${config.cls}`, innerHTML: `${config.icon} ${config.text}` });
}

function renderCard(name, pr, prStatus, isIdxEven) {
    const deploymentUrl = `${BASE_URL}/${name}/`;
    const zebraClass = isIdxEven ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-900/50';

    const card = el('div', {
        className: `preview-card ${zebraClass} rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer group`,
        dataset: {
            name,
            type: pr ? 'pr' : 'active',
            isAuto: pr && (pr.user.login.includes('bot') || pr.user.login === 'dependabot'),
            author: pr?.user.login || '',
            title: pr?.title || '',
            isDraft: pr?.draft || false,
            isStale: pr && (Date.now() - new Date(pr.updated_at).getTime()) > 14 * 24 * 60 * 60 * 1000
        }
    });

    card.addEventListener('click', (e) => {
        if (!e.target.closest('a')) window.open(pr ? pr.html_url : deploymentUrl, '_blank');
    });

    const badgeContainer = el('div', { className: 'flex items-center gap-2 flex-wrap' });
    if (pr) {
        badgeContainer.appendChild(createBadge(pr.draft ? 'Draft PR' : 'Open PR', 'blue'));
        const statusBadge = createStatusBadge(prStatus);
        if (statusBadge) badgeContainer.appendChild(statusBadge);
        (pr.labels || []).forEach(l => {
            badgeContainer.appendChild(el('span', {
                className: 'px-2 py-0.5 rounded-full text-[10px] font-bold border',
                style: `background-color: #${l.color}22; color: #${l.color}; border-color: #${l.color}44`
            }, [l.name.toUpperCase()]));
        });
    } else {
        badgeContainer.appendChild(createBadge('Active Branch', 'emerald'));
    }

    const titleEl = pr
        ? el('a', { href: pr.html_url, target: '_blank', rel: 'noopener', className: 'text-blue-600 dark:text-blue-400 hover:underline font-semibold text-lg sm:text-xl flex items-center gap-2 truncate', innerHTML: ICONS.pr }, [`PR #${pr.number}: ${pr.title}`])
        : el('div', { className: 'text-slate-800 dark:text-slate-200 font-semibold text-lg sm:text-xl flex items-center gap-2 text-balance', innerHTML: ICONS.branch }, [name]);

    const infoRow = el('div', { className: 'flex items-center gap-3 flex-wrap' }, [
        el('span', { className: 'text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono px-2 py-1 rounded border border-slate-200 dark:border-slate-700 truncate max-w-[200px]' }, [name]),
        el('a', { href: `${GITHUB_REPO_URL}/tree/${encodeURIComponent(name)}`, target: '_blank', rel: 'noopener', className: 'text-xs text-slate-500 hover:text-blue-500 flex items-center gap-1 transition-colors', innerHTML: `${ICONS.external} Source` }),
        el('a', { href: `${GITHUB_REPO_URL}/compare/main...${encodeURIComponent(name)}`, target: '_blank', rel: 'noopener', className: 'text-xs text-slate-500 hover:text-blue-500 flex items-center gap-1 transition-colors', innerHTML: `${ICONS.external} Compare` }),
        pr && el('span', { className: 'text-xs text-slate-400 flex items-center gap-1', innerHTML: ICONS.clock }, [timeAgo(Math.floor(new Date(pr.updated_at).getTime() / 1000))]),
        el('div', { className: 'sm:hidden' }, [badgeContainer.cloneNode(true)])
    ]);

    card.append(
        el('div', { className: 'flex-1 min-w-0 w-full' }, [
            el('div', { className: 'flex flex-col sm:flex-row sm:items-center gap-3 mb-3' }, [
                titleEl,
                el('div', { className: 'hidden sm:block' }, [badgeContainer])
            ]),
            infoRow
        ]),
        el('a', { href: deploymentUrl, target: '_blank', rel: 'noopener', className: 'w-full sm:w-auto bg-slate-900 dark:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity shrink-0', innerHTML: `View Deployment ${ICONS.external}` })
    );

    return card;
}

async function init() {
    const grid = document.getElementById('grid'), loading = document.getElementById('loading'), errorAlert = document.getElementById('error-alert');
    const trackingLink = document.getElementById('tracking-link');
    if (trackingLink) trackingLink.href = TRACKING_URL;

    // Attach event listeners
    const handlers = { 'search': 'input', 'status-filter': 'change', 'show-automated': 'change', 'reset-filters': 'click' };
    Object.entries(handlers).forEach(([id, ev]) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener(ev, id === 'reset-filters' ? resetFilters : filterCards);
    });

    try {
        const [treeData, prs, releases] = await Promise.all([
            fetchGitHub(`repos/${REPO_OWNER}/${REPO_NAME}/git/trees/gh-pages?recursive=1`),
            fetchGitHub(`repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=open&per_page=100`).catch(() => []),
            fetchGitHub(`repos/${REPO_OWNER}/${REPO_NAME}/releases?per_page=1`).catch(() => [])
        ]);

        if (rateLimitRemaining < 10) {
            const warning = el('div', { className: 'mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-400 px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium', innerHTML: `${ICONS.warning} GitHub API rate limit is low (${rateLimitRemaining} left). CI statuses may not load correctly.` });
            grid.before(warning);
        }

        const prStatuses = {};
        if (rateLimitRemaining > 5) {
            await Promise.all(prs.map(async (pr) => {
                prStatuses[pr.head.ref] = await fetchCIStatus(pr.head.sha);
            }));
        }

        loading.style.display = 'none';

        const allFoldersRaw = treeData.tree
            .filter(i => i.path.endsWith('/index.html') && !EXCLUDED.some(e => i.path.startsWith(e)) && i.path !== 'index.html' && i.path !== '404.html')
            .map(i => i.path.replace('/index.html', ''));

        const prFolders = allFoldersRaw.filter(name => prs.some(p => p.head.ref === name))
            .sort((a, b) => new Date(prs.find(p => p.head.ref === b).updated_at) - new Date(prs.find(p => p.head.ref === a).updated_at));

        const branchFolders = allFoldersRaw.filter(name => !prs.some(p => p.head.ref === name)).sort((a, b) => a.localeCompare(b));

        const stalePrs = prs.filter(p => (Date.now() - new Date(p.updated_at).getTime()) > 14 * 24 * 60 * 60 * 1000);

        const statsMap = { 'stat-prs': prs.length, 'stat-active': branchFolders.length, 'stat-stale': stalePrs.length, 'stat-releases': releases[0]?.tag_name || '0', 'stat-total': allFoldersRaw.length, 'last-updated': new Date().toLocaleString() };
        Object.entries(statsMap).forEach(([id, val]) => { const el = document.getElementById(id); if (el) el.textContent = val; });

        const renderGroup = (title, foldersList, isPr) => {
            if (!foldersList.length) return;
            const fragment = document.createDocumentFragment();
            fragment.appendChild(el('h2', { className: 'text-xl font-bold mt-8 mb-4 flex items-center gap-2 text-slate-800 dark:text-slate-200', innerHTML: `${isPr ? ICONS.pr : ICONS.branch} ${title}` }));
            const stack = el('div', { className: 'group-stack flex flex-col gap-4 mb-10' });
            foldersList.forEach((name, idx) => stack.appendChild(renderCard(name, prs.find(p => p.head.ref === name), prStatuses[name], idx % 2 === 0)));
            fragment.appendChild(stack);
            grid.appendChild(fragment);
        };

        renderGroup('Pull Request Previews', prFolders, true);
        renderGroup('Other Deployed Branches', branchFolders, false);
        filterCards();

    } catch (err) {
        loading.style.display = 'none';
        document.getElementById('error-msg').textContent = err.message === 'RATE_LIMITED' ? 'GitHub API Rate Limited. Please try again later.' : err.message;
        errorAlert.classList.toggle('hidden', false);
    }
}

document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
