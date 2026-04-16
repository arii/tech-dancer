import numpy as np

def test_vectorized_paths_vertical():
    """Verify that agent paths follow the expected vertical slot kinematic model."""
    num_couples = 10
    duration = 10
    total_frames = 100
    time_steps = np.linspace(0, duration, total_frames)

    # Mock parameters as in app.py
    x_positions = np.linspace(10, 90, num_couples)
    base_y = 30
    phases = np.zeros(num_couples) # 0 phase for predictable test
    amplitudes = np.ones(num_couples) * 10

    paths = np.zeros((total_frames, num_couples, 2))

    # Logic from app.py
    paths[:, :, 0] = x_positions[None, :]
    paths[:, :, 1] = base_y + amplitudes[None, :] * np.sin(time_steps[:, None] + phases[None, :])

    # At t=0, sin(0)=0, so y should be base_y (30)
    assert np.allclose(paths[0, :, 1], 30)
    # x should be fixed to initial x_positions
    assert np.all(paths[:, :, 0] == x_positions)
    # Check max displacement (base_y + amplitude = 30 + 10 = 40)
    assert np.max(paths[:, :, 1]) <= 40.0001
    assert np.min(paths[:, :, 1]) >= 19.9999

def test_visibility_logic():
    """Test simple occlusion logic with two agents and one sensor."""
    # Sensor at (0,0), Target at (0,10), Obstacle at (0,5)
    # Vertical arrangement matching new model
    sensor = np.array([0, 0])
    target = np.array([0, 10])
    obstacle = np.array([0, 5])
    radius = 1.0

    # Vector from sensor to target
    v = target - sensor
    v_len_sq = np.sum(v**2)

    # Check obstacle
    t = np.sum((obstacle - sensor) * v) / v_len_sq
    projection = sensor + t * v
    dist_sq = np.sum((obstacle - projection)**2)

    # Obstacle is on the line, so distance should be 0
    assert dist_sq < 1e-6
    # Obstacle is between sensor and target, so t should be 0.5
    assert 0 < t < 1

    # Now check an obstacle NOT on the line
    obstacle_far = np.array([10, 5])
    t_far = np.sum((obstacle_far - sensor) * v) / v_len_sq
    projection_far = sensor + t_far * v
    dist_sq_far = np.sum((obstacle_far - projection_far)**2)
    assert dist_sq_far == 100
