// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    if (typeof dashboardData === 'undefined') {
        console.error("Dashboard data not found! Ensure python benchmark script ran successfully.");
        document.querySelector('.table-container').innerHTML = "<p style='color: #ef4444'>Error: Run the python bridge script to generate data.js first.</p>";
        return;
    }

    const { metrics, cpuCores } = dashboardData;

    // --- POPULATE TABLE ---
    const tbody = document.querySelector('#metricsTable tbody');
    let maxSpeedup = 0;

    metrics.forEach(row => {
        const tr = document.createElement('tr');
        
        // Auto-Diagnose Bottlenecks
        let badgeHtml = '';
        if (row.filter.includes('AVX2') || row.parallelTime < 0.005) {
            badgeHtml = '<span class="badge badge-instant">⚡ AVX2 Instantaneous</span>';
        } else if (row.efficiency >= 0.85 && row.threads > 1) {
            badgeHtml = '<span class="badge badge-compute">🚀 Compute-Bound (Perfect Scaling)</span>';
        } else if (row.efficiency < 0.85 && row.threads > 2) {
            badgeHtml = '<span class="badge badge-memory">🔀 Memory Bandwidth Limit</span>';
        } else {
            badgeHtml = '<span style="color: #64748b; font-size: 0.8rem;">Baseline</span>';
        }

        tr.innerHTML = `
            <td>${row.filter}</td>
            <td>${row.threads}</td>
            <td>${row.serialTime.toFixed(4)}</td>
            <td>${row.parallelTime.toFixed(4)}</td>
            <td>${row.speedup.toFixed(2)}x</td>
            <td style="color: ${getEfficiencyColor(row.efficiency)}">${(row.efficiency * 100).toFixed(1)}%</td>
            <td>${badgeHtml}</td>
        `;
        tbody.appendChild(tr);

        if (row.speedup > maxSpeedup && row.speedup !== Infinity) {
            maxSpeedup = row.speedup;
        }
    });

    document.getElementById('peak-speedup').textContent = `${maxSpeedup.toFixed(2)}x`;

    // --- INTERACTIVE SPLIT SLIDER ---
    const filterButtons = document.querySelectorAll('.filter-selector button');
    const processedImg = document.getElementById('img-processed');
    
    // Slider Core Elements
    const sliderContainer = document.getElementById('slider-container');
    const sliderOverlay = document.getElementById('slider-overlay');
    const sliderHandle = document.getElementById('slider-handle');
    let isSliding = false;

    // Slide function to update widths
    const slide = (e) => {
        if (!isSliding) return;
        
        let clientX = e.clientX || (e.touches && e.touches[0].clientX);
        let rect = sliderContainer.getBoundingClientRect();
        let x = clientX - rect.left;
        let percentage = (x / rect.width) * 100;
        
        // Clamp bounds
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        
        sliderOverlay.style.width = `${percentage}%`;
        sliderHandle.style.left = `${percentage}%`;
    };

    // Event Listeners for Slider
    sliderHandle.addEventListener('mousedown', () => isSliding = true);
    sliderHandle.addEventListener('touchstart', () => isSliding = true);
    
    window.addEventListener('mouseup', () => isSliding = false);
    window.addEventListener('touchend', () => isSliding = false);
    
    window.addEventListener('mousemove', slide);
    window.addEventListener('touchmove', slide);

    // Filter Buttons logic update
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const filterName = e.target.getAttribute('data-filter');
            const isTiled = e.target.getAttribute('data-tiled') === 'true';
            
            // For tiled, there's no output_tiled.jpg, we just use gaussian 
            const imgSrc = isTiled ? '../output_gaussian.jpg' : `../output_${filterName}.jpg`;
            processedImg.src = imgSrc;
            
            // Auto reset slider to center on change
            sliderOverlay.style.width = '50%';
            sliderHandle.style.left = '50%';
        });
    });

    // --- CHARTS CONFIGURATION ---
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Inter', sans-serif";

    // Extract data for charts (Scalar as representative example)
    const chartData = metrics.filter(m => m.filter === 'Gaussian Blur (Scalar)');
    const threads = chartData.map(m => m.threads);
    const speedups = chartData.map(m => m.speedup);
    const execTimes = chartData.map(m => m.parallelTime);
    const idealSpeedups = threads.map(t => t); // Linear scaling

    // 1. Time Chart
    const ctxTime = document.getElementById('timeChart').getContext('2d');
    new Chart(ctxTime, {
        type: 'line',
        data: {
            labels: threads,
            datasets: [{
                label: 'Parallel Execution Time (s)',
                data: execTimes,
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#0f172a',
                pointBorderColor: '#38bdf8',
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    title: { display: true, text: 'Seconds' }
                },
                x: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    title: { display: true, text: 'Number of Threads' }
                }
            }
        }
    });

    // 2. Speedup Chart
    const ctxSpeedup = document.getElementById('speedupChart').getContext('2d');
    new Chart(ctxSpeedup, {
        type: 'line',
        data: {
            labels: threads,
            datasets: [
                {
                    label: 'Actual Speedup',
                    data: speedups,
                    borderColor: '#818cf8',
                    borderWidth: 3,
                    tension: 0.4,
                    pointBackgroundColor: '#0f172a',
                    pointBorderColor: '#818cf8',
                    pointRadius: 6
                },
                {
                    label: 'Ideal Speedup (Linear)',
                    data: idealSpeedups,
                    borderColor: 'rgba(255,255,255,0.3)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    title: { display: true, text: 'Speedup Factor' }
                },
                x: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    title: { display: true, text: 'Number of Threads' }
                }
            }
        }
    });
});

function getEfficiencyColor(eff) {
    if (eff >= 0.8) return '#4ade80'; // Green
    if (eff >= 0.5) return '#facc15'; // Yellow
    return '#ef4444'; // Red
}

// --- LIVE HPC HARDWARE SIMULATION (DUAL-VIEW) ---
document.addEventListener('DOMContentLoaded', () => {
    const canvasSeq = document.getElementById('sim-canvas-seq');
    const canvasPar = document.getElementById('sim-canvas-par');
    if (!canvasSeq || !canvasPar) return; 
    
    const ctxSeq = canvasSeq.getContext('2d');
    const ctxPar = canvasPar.getContext('2d');
    
    // Config
    const GRID_COLS = 32;
    const GRID_ROWS = 18;
    const TOTAL_TILES = GRID_COLS * GRID_ROWS;
    
    const THREAD_COLORS = [
        '#ef4444', '#f97316', '#f59e0b', '#eab308', 
        '#84cc16', '#22c55e', '#10b981', '#14b8a6', 
        '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', 
        '#8b5cf6', '#a855f7', '#d946ef', '#f43f5e'
    ];

    let simActive = false;
    
    // Sequential State (1 Thread)
    let seqState = {
        tiles: [],
        thread: { x: -1, y: 0.5, targetTile: null, workTimeRemaining: 0, color: '#94a3b8' },
        nextUnprocessed: 0,
        tilesCompleted: 0
    };

    // Parallel State (16 Threads)
    let parState = {
        tiles: [],
        threads: [],
        nextUnprocessed: 0,
        tilesCompleted: 0
    };

    function resizeCanvases() {
        canvasSeq.width = canvasSeq.parentElement.clientWidth;
        canvasSeq.height = canvasSeq.parentElement.clientHeight;
        canvasPar.width = canvasPar.parentElement.clientWidth;
        canvasPar.height = canvasPar.parentElement.clientHeight;
        drawGrid(ctxSeq, canvasSeq, seqState.tiles, [seqState.thread]);
        drawGrid(ctxPar, canvasPar, parState.tiles, parState.threads);
    }
    window.addEventListener('resize', resizeCanvases);
    
    function initSim() {
        simActive = false;
        
        // Reset Sequential
        seqState.nextUnprocessed = 0;
        seqState.tilesCompleted = 0;
        seqState.tiles = [];
        for (let y = 0; y < GRID_ROWS; y++) {
            for (let x = 0; x < GRID_COLS; x++) {
                seqState.tiles.push({ x, y, state: 'idle', color: '#1e293b' });
            }
        }
        seqState.thread = { x: -1, y: 0.5, targetTile: null, workTimeRemaining: 0, color: '#94a3b8' };
        document.getElementById('sim-done-seq').textContent = '0';

        // Reset Parallel
        parState.nextUnprocessed = 0;
        parState.tilesCompleted = 0;
        parState.tiles = [];
        for (let y = 0; y < GRID_ROWS; y++) {
            for (let x = 0; x < GRID_COLS; x++) {
                parState.tiles.push({ x, y, state: 'idle', color: '#1e293b' });
            }
        }
        parState.threads = [];
        for (let i = 0; i < 16; i++) {
            parState.threads.push({
                id: i, color: THREAD_COLORS[i], x: -1, y: (GRID_ROWS / 16) * i + 0.5,
                targetTile: null, workTimeRemaining: 0
            });
        }
        document.getElementById('sim-done-par').textContent = '0';
        
        resizeCanvases();
    }
    
    function drawGrid(ctx, canvas, tiles, threads) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const tileW = canvas.width / GRID_COLS;
        const tileH = canvas.height / GRID_ROWS;
        
        for (let t of tiles) {
            ctx.fillStyle = t.color;
            ctx.fillRect(t.x * tileW + 1, t.y * tileH + 1, tileW - 2, tileH - 2);
            if (t.state === 'done') {
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.fillRect(t.x * tileW + 1, t.y * tileH + 1, tileW - 2, tileH - 2);
            }
        }
        
        if (simActive || tiles.length > 0) {
            for (let th of threads) {
                if (th.x >= 0) {
                    ctx.beginPath();
                    ctx.arc((th.x + 0.5) * tileW, (th.y + 0.5) * tileH, Math.min(tileW, tileH) * 0.4, 0, Math.PI * 2);
                    ctx.fillStyle = th.color;
                    ctx.fill();
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    function stepSimulation() {
        if (!simActive) return;

        let seqDone = stepEnvironment(seqState, [seqState.thread], 'seq');
        let parDone = stepEnvironment(parState, parState.threads, 'par');

        drawGrid(ctxSeq, canvasSeq, seqState.tiles, [seqState.thread]);
        drawGrid(ctxPar, canvasPar, parState.tiles, parState.threads);

        if (seqDone && parDone) {
            simActive = false; 
        } else {
            requestAnimationFrame(stepSimulation);
        }
    }

    function stepEnvironment(state, threads, type) {
        let allDone = true;

        for (let th of threads) {
            if (!th.targetTile && th.targetTile !== 0) {
                if (state.nextUnprocessed < TOTAL_TILES) {
                    th.targetTile = state.nextUnprocessed++;
                    state.tiles[th.targetTile].state = 'active';
                    state.tiles[th.targetTile].color = '#334155';
                    // Sequential logic applies a fixed latency. Parallel naturally scales!
                    th.workTimeRemaining = 5 + Math.random() * 20; 
                    th.x = state.tiles[th.targetTile].x;
                    th.y = state.tiles[th.targetTile].y;
                    allDone = false;
                }
            } else {
                allDone = false;
                th.workTimeRemaining--;
                if (th.workTimeRemaining <= 0) {
                    state.tiles[th.targetTile].state = 'done';
                    state.tiles[th.targetTile].color = th.color; 
                    th.targetTile = null;
                    state.tilesCompleted++;
                    document.getElementById(`sim-done-${type}`).textContent = Math.floor((state.tilesCompleted/TOTAL_TILES)*100);
                }
            }
        }
        
        return (allDone && state.tilesCompleted === TOTAL_TILES);
    }

    document.getElementById('start-sim-btn').addEventListener('click', () => {
        if (!simActive) {
            if (seqState.tilesCompleted === TOTAL_TILES) initSim();
            simActive = true;
            stepSimulation();
        }
    });

    document.getElementById('reset-sim-btn').addEventListener('click', () => initSim());

    setTimeout(initSim, 100);
});
