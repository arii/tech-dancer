import streamlit as st
import numpy as np
import plotly.express as px
import time

# Simulation Metadata
st.set_page_config(page_title="WCS Kinematic Simulation | Data Lab", layout="wide")

# Custom CSS
st.markdown("""
    <style>
    .main {
        background-color: #f8fafc;
    }
    .stMetric {
        background-color: #ffffff;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    </style>
    """, unsafe_allow_html=True)

st.title("Project 3: Kinematic Simulation Environment (Vertical Slots)")
st.markdown("""
    This high-performance simulation engine models the geometric realities of floor occlusion in competitive West Coast Swing.
    By treating the dance floor as a dynamic occupancy grid with **parallel vertical slots**, we quantify the 'Visibility Budget' of individual agents.
""")

# --- Sidebar Parameters ---
st.sidebar.header("Control Panel")
num_couples = st.sidebar.slider("Number of Couples (Heat Size)", 10, 60, 30)
song_duration = st.sidebar.slider("Song Duration (seconds)", 30, 120, 90)
fps = 10  # Simulation internal resolution
judge_topology = st.sidebar.selectbox("Judge Topology", ["Central Cluster", "Side Distributed", "Opposite Pole"])
run_sim = st.sidebar.button("Execute Monte Carlo Analysis")

# --- Core Physics Engine (Vectorized) ---
@st.cache_data
def run_simulation(couples, duration, internal_fps, topology):
    total_frames = duration * internal_fps
    time_steps = np.linspace(0, duration, total_frames)

    # 1. Initialize Agents (NumPy Tensors) using Vertical Slot Coordinates
    # agents are distributed horizontally, and move vertically.
    x_positions = np.linspace(10, 90, couples)
    base_y = 30 # Center of the vertical range
    phases = np.random.uniform(0, 2 * np.pi, couples)
    amplitudes = np.random.uniform(10, 20, couples) # Vertical range of motion

    # 2. Vectorized Path Calculation (Vertical Oscillation)
    # Resulting shape: (frames, couples, 2 [x,y])
    paths = np.zeros((total_frames, couples, 2))

    # X is fixed for each couple (their slot)
    paths[:, :, 0] = x_positions[None, :]

    # Y oscillates: y = base_y + amp * sin(t + phase)
    paths[:, :, 1] = base_y + amplitudes[None, :] * np.sin(time_steps[:, None] + phases[None, :])

    # 3. Define Sensor Array (Judges)
    if topology == "Central Cluster":
        # Tight cluster in the middle
        sensors = np.array([
            [50, 30], [51, 30], [49, 30], [50, 31], [50, 29]
        ])
    elif topology == "Side Distributed":
        # Spaced out along the top edge (y=5)
        s_x = np.linspace(10, 90, 5)
        sensors = np.zeros((5, 2))
        sensors[:, 0] = s_x
        sensors[:, 1] = 5
    else: # Opposite Pole
        sensors = np.array([[50, 5], [50, 55], [10, 30], [90, 30], [50, 30]])

    # 4. Ray-Casting & Occlusion Logic (Simplified Vectorized Check)
    radius = 3.0
    visibility_matrix = np.zeros((total_frames, couples, len(sensors)))

    for f in range(total_frames):
        pos = paths[f] # (couples, 2)
        for s_idx, s_pos in enumerate(sensors):
            for target_idx in range(couples):
                target_pos = pos[target_idx]

                # Vector from sensor to target
                v = target_pos - s_pos
                v_len_sq = np.sum(v**2)

                if v_len_sq < 1e-6: # Sensor on top of target (edge case)
                    visibility_matrix[f, target_idx, s_idx] = 1
                    continue

                # Check all other agents
                others_idx = np.delete(np.arange(couples), target_idx)
                others_pos = pos[others_idx]

                # Distance from point (others_pos) to segment (s_pos -> target_pos)
                t = np.sum((others_pos - s_pos) * v, axis=1) / v_len_sq
                t = np.clip(t, 0, 1)

                projection = s_pos + t[:, None] * v
                dist_sq = np.sum((others_pos - projection)**2, axis=1)

                if np.any(dist_sq < (radius * 1.2)**2):
                    visibility_matrix[f, target_idx, s_idx] = 0
                else:
                    visibility_matrix[f, target_idx, s_idx] = 1

    # Calculate Visibility Budget (Total % of time seen by majority 3/5)
    majority_seen = np.sum(visibility_matrix, axis=2) >= 3
    visibility_budget = np.mean(majority_seen, axis=0)

    return paths, visibility_budget, sensors

# --- Main Dashboard Logic ---
if run_sim:
    with st.spinner("Processing Vertical Kinematics via NumPy..."):
        paths, budget, sensors = run_simulation(num_couples, song_duration, fps, judge_topology)

    st.success(f"Simulation Complete: {num_couples} agents in vertical slot distribution.")

    # 1. Metrics
    col1, col2, col3 = st.columns(3)
    col1.metric("Avg Visibility Budget", f"{np.mean(budget)*100:.1f}%")
    col2.metric("Systemic Dead Zones", f"{np.sum(budget < 0.2)} Slots")
    col3.metric("Max Luck Variance", f"{(np.max(budget) - np.min(budget))*100:.1f}%")

    # 2. Visualizations
    tab1, tab2 = st.tabs(["Probabilistic Heatmap", "Monte Carlo Luck Factor"])

    with tab1:
        st.subheader("Spatial Visibility Profile (Vertical Slots)")
        # Plot initial positions colored by their overall visibility budget
        fig = px.scatter(
            x=paths[0, :, 0],
            y=paths[0, :, 1],
            color=budget,
            size=[10]*num_couples,
            range_x=[0, 100], range_y=[0, 60],
            color_continuous_scale="Viridis",
            labels={'x': 'Floor X (Slot ID)', 'y': 'Floor Y (Position)', 'color': 'Visibility %'},
            title="Localized Probability of Consensus Detection"
        )
        # Add sensors
        fig.add_scatter(x=sensors[:,0], y=sensors[:,1], mode='markers', marker=dict(symbol='x', size=12, color='red'), name='Judges')

        st.plotly_chart(fig, use_container_width=True)

    with tab2:
        st.subheader("The Luck Factor Distribution")
        fig2 = px.histogram(budget * 100, nbins=15, labels={'value': 'Visibility Budget (%)'}, title="Frequency of Results (Assuming Identical Skill)")
        st.plotly_chart(fig2, use_container_width=True)

else:
    st.info("Adjust parameters in the sidebar and click 'Execute' to start the vertical simulation.")
    st.image("https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6", caption="Zero-Gain Sensing Theory: Centralized judges share identical occlusion profiles.")

st.divider()
st.markdown("""
    **Elite Competency Note:** This simulation utilizes NumPy vectorization to calculate vertical kinematics and perform ray-casting checks,
    demonstrating the ability to solve complex socio-spatial problems with high-performance computational geometry.
""")
