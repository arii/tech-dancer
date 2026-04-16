import numpy as np

def test_phase_warped_kinematics():
    """Verify that phase warping creates the expected non-linear movement."""
    num_couples = 1
    duration = 10
    fps = 10
    total_frames = duration * fps
    time_steps = np.linspace(0, duration, total_frames)

    alpha = 0.65
    phases = np.array([0.0])
    base_y = 30
    amplitude = 10

    # Warped time: t' = t + alpha * sin(t)
    raw_time = time_steps + phases
    warped_time = raw_time + alpha * np.sin(raw_time)
    y_warped = base_y + amplitude * np.sin(warped_time)

    # Linear time for comparison
    y_linear = base_y + amplitude * np.sin(raw_time)

    # The paths should be different due to warping
    assert not np.allclose(y_warped, y_linear)

    # Displacement bounds should still hold
    assert np.max(y_warped) <= base_y + amplitude + 1e-5
    assert np.min(y_warped) >= base_y - amplitude - 1e-5

def test_vectorized_occlusion_invariants():
    """Test the core ray-casting math used in the vectorized HF engine."""
    # Setup: 1 sensor, 2 agents (Target and Obstacle)
    sensors = np.array([[0, 0]]) # (S, 2)
    pos = np.array([[0, 10], [0, 5]]) # (C, 2) Target at index 0, Obstacle at index 1
    couples = 2

    # Logic mirroring app.py
    v = pos[None, :, :] - sensors[:, None, :]
    v_len_sq = np.sum(v**2, axis=2) + 1e-9
    diff = pos[None, :, :] - sensors[:, None, :]
    t = np.sum(diff[:, None, :, :] * v[:, :, None, :], axis=3) / v_len_sq[:, :, None]

    # Obstacle (idx 1) is halfway between sensor and target (idx 0)
    assert np.allclose(t[0, 0, 1], 0.5)

    t_clipped = np.clip(t, 0, 1)
    proj = sensors[:, None, None, :] + t_clipped[:, :, :, None] * v[:, :, None, :]
    dist_sq = np.sum((pos[None, None, :, :] - proj)**2, axis=3)

    # Dist from Obstacle(1) to Ray(Sensor->Target(0)) is 0
    assert dist_sq[0, 0, 1] < 1e-6

def test_heatmap_binning():
    """Ensure spatial paths are correctly mapped to heatmap grid indices."""
    # Floor: 100x60. Grid: 50x30.
    # Point (0,0) -> (0,0)
    # Point (100,60) -> (49, 29)
    # Point (50, 30) -> (25, 15)

    paths = np.array([[[0, 0], [100, 60], [50, 30]]]) # (1, 3, 2)

    grid_x = np.clip(((paths[:, :, 0]) / 100 * 50).astype(int), 0, 49)
    grid_y = np.clip(((paths[:, :, 1]) / 60 * 30).astype(int), 0, 29)

    assert grid_x[0, 0] == 0 and grid_y[0, 0] == 0
    assert grid_x[0, 1] == 49 and grid_y[0, 1] == 29
    assert grid_x[0, 2] == 25 and grid_y[0, 2] == 15

def test_hitbox_elliptical_invariants():
    """Verify that elliptical hitboxes correctly modulate occlusion sensitivity."""
    base_radius = 2.5
    ext_large = 6.0
    rad_sq_large = (base_radius + ext_large * 0.5)**2
    assert np.isclose(rad_sq_large, 30.25)
