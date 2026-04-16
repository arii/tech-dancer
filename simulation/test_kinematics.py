import numpy as np

def test_vectorized_paths():
    """Verify that agent paths follow the expected sinusoidal kinematic model."""
    num_couples = 10
    duration = 10
    total_frames = 100
    time_steps = np.linspace(0, duration, total_frames)

    # Mock agents
    agents = np.zeros((num_couples, 5))
    agents[:, 0] = 50 # initial x
    agents[:, 1] = 30 # slot y
    agents[:, 2] = 0  # phase
    agents[:, 3] = 20 # amplitude
    agents[:, 4] = 30 # slot y

    paths = np.zeros((total_frames, num_couples, 2))
    paths[:, :, 0] = agents[None, :, 0] + agents[None, :, 3] * np.sin(time_steps[:, None] + agents[None, :, 2])
    paths[:, :, 1] = agents[None, :, 4]

    # At t=0, sin(0)=0, so x should be initial x (50)
    assert np.allclose(paths[0, :, 0], 50)
    # y should be constant 30
    assert np.all(paths[:, :, 1] == 30)
    # Check max displacement
    assert np.max(paths[:, :, 0]) <= 70.0001
    assert np.min(paths[:, :, 0]) >= 29.9999

def test_visibility_logic():
    """Test simple occlusion logic with two agents and one sensor."""
    # Sensor at (0,0), Target at (10,0), Obstacle at (5,0)
    sensor = np.array([0, 0])
    target = np.array([10, 0])
    obstacle = np.array([5, 0])
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
    obstacle_far = np.array([5, 10])
    t_far = np.sum((obstacle_far - sensor) * v) / v_len_sq
    projection_far = sensor + t_far * v
    dist_sq_far = np.sum((obstacle_far - projection_far)**2)
    assert dist_sq_far == 100
