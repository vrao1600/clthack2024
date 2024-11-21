// script.js

// Mock Data
const recyclingTips = [
    'Recycle paper products like newspapers and magazines.',
    'Flatten cardboard boxes before recycling.',
    'Rinse out plastic containers before recycling.',
    'Do not recycle plastic bags; take them to designated drop-off locations.',
    'Recycle glass bottles and jars; remove lids and rinse them.',
    'Avoid recycling broken glass; it can be hazardous.',
    'Recycle aluminum cans after rinsing them.',
    'Batteries should be recycled at designated collection points.',
    'Electronic waste requires special recycling procedures.',
    'Compost food scraps instead of throwing them away.',
    'Recycle used cooking oil at designated facilities.',
    'Donate old clothes instead of discarding them.',
    'Avoid single-use plastics whenever possible.',
    'Use reusable shopping bags to reduce waste.',
    'Recycle old cell phones and chargers.',
    'Purchase products made from recycled materials.',
    'Recycle ink cartridges at office supply stores.',
    'Recycle scrap metal at local recycling centers.',
    'Use rechargeable batteries to reduce waste.',
    'Participate in community recycling programs.',
    'Recycle old appliances responsibly.',
    'Educate others about the importance of recycling.',
    'Avoid contaminated recyclables; keep materials clean.',
    'Recycle wine corks at designated collection points.',
    'Recycle old eyeglasses through donation programs.',
    'Use both sides of paper before recycling.',
    'Recycle aerosol cans when they are empty.',
    'Recycle plastic bottle caps separately if required.',
    'Avoid wish-cycling; know what can be recycled.',
    'Recycle unwanted CDs and DVDs appropriately.',
    'Recycle old tires at designated facilities.',
    'Use compostable or recyclable packaging materials.',
    'Recycle holiday lights at special collection sites.',
    'Avoid using Styrofoam products; they are hard to recycle.',
    'Recycle water filters through manufacturer programs.',
    'Participate in hazardous waste collection events.',
    'Recycle used motor oil properly.',
    'Support businesses that prioritize recycling.',
    'Reuse containers and jars for storage.',
    'Encourage your workplace to adopt recycling practices.',
];

// Rewards Data
const rewards = [
    { points: 50, reward: 'Recycling Novice Badge' },
    { points: 100, reward: 'Eco Enthusiast Badge' },
    { points: 200, reward: 'Green Guardian Badge' },
    { points: 400, reward: 'Sustainability Advocate Badge' },
    { points: 600, reward: 'Environmental Steward Badge' },
    { points: 800, reward: 'Waste Warrior Badge' },
    { points: 1000, reward: 'Planet Protector Badge' },
    { points: 1200, reward: 'Eco Hero Badge' },
    { points: 1500, reward: 'Green Champion Badge' },
    { points: 1800, reward: 'Earth Defender Badge' },
    { points: 2100, reward: 'Recycling Master Badge' },
    { points: 2400, reward: 'Sustainability Legend Badge' },
    { points: 2700, reward: 'Environmental Visionary Badge' },
    { points: 3000, reward: 'Planetary Hero Badge' },
    { points: 3300, reward: 'Global Guardian Badge' },
];

// Application State
let currentUser = null;

// DOM Elements
const authContainer = document.getElementById('auth-container');
const loginScreen = document.getElementById('login-screen');
const signupScreen = document.getElementById('signup-screen');
const mainContainer = document.getElementById('main-container');
const homeScreen = document.getElementById('home-screen');
const guideScreen = document.getElementById('guide-screen');
const impactScreen = document.getElementById('impact-screen');
const rewardsScreen = document.getElementById('rewards-screen');
const historyScreen = document.getElementById('history-screen');
const settingsScreen = document.getElementById('settings-screen');
const adminScreen = document.getElementById('admin-screen');
const adminLink = document.getElementById('admin-link');
const mainError = document.getElementById('main-error');

// Authentication Elements
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const loginButton = document.getElementById('login-button');
const signupButton = document.getElementById('signup-button');
const loginError = document.getElementById('login-error');
const signupError = document.getElementById('signup-error');

// Navigation
const navLinks = document.querySelectorAll('nav ul li a[data-screen]');
const logoutButton = document.getElementById('logout-button');
const settingsLink = document.getElementById('settings-link');
const profileDropdown = document.querySelector('.profile-dropdown');
const profileDropdownContent = document.getElementById('profile-dropdown-content');
const navProfilePic = document.getElementById('nav-profile-pic');

// Home Screen Elements
const welcomeMessage = document.getElementById('welcome-message');
const totalPoints = document.getElementById('total-points');
const currentBadge = document.getElementById('current-badge');
const activityForm = document.getElementById('activity-form');
const activityError = document.getElementById('activity-error');

// Recycling Guide Elements
const recyclingTipsList = document.getElementById('recycling-tips-list');

// Impact Screen Elements
const impactChart = document.getElementById('impact-chart');

// Rewards Screen Elements
const rewardsList = document.getElementById('rewards-list');

// History Screen Elements
const historyTableBody = document.querySelector('#history-table tbody');
const historySummary = document.getElementById('history-summary');

// Settings Screen Elements
const settingsForm = document.getElementById('settings-form');
const settingsError = document.getElementById('settings-error');
const settingsProfilePicInput = document.getElementById('settings-profile-pic');
const currentProfilePic = document.getElementById('current-profile-pic');
const settingsUsername = document.getElementById('settings-username');
const settingsStudentEmail = document.getElementById('settings-student-email');
const settingsEmail = document.getElementById('settings-email');
const settingsPassword = document.getElementById('settings-password');

// Admin Screen Elements
const usersTableBody = document.querySelector('#users-table tbody');
const binsTableBody = document.querySelector('#bins-table tbody');

// Modal Elements
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');

// Event Listeners
showSignup.addEventListener('click', showSignupScreen);
showLogin.addEventListener('click', showLoginScreen);
loginButton.addEventListener('click', handleLogin);
signupButton.addEventListener('click', handleSignup);
logoutButton.addEventListener('click', handleLogout);
settingsLink.addEventListener('click', navigateToSettings);
navLinks.forEach(link => link.addEventListener('click', navigate));
activityForm.addEventListener('submit', logActivity);
modalClose.addEventListener('click', closeModal);
settingsForm.addEventListener('submit', saveSettings);

// Initialization
init();

// Functions

function init() {
    const user = getCurrentUser();
    if (user) {
        currentUser = user;
        showMainApp();
    } else {
        showAuthScreen();
    }
}

function showAuthScreen() {
    authContainer.classList.remove('hidden');
    mainContainer.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    signupScreen.classList.add('hidden');
}

function showSignupScreen(event) {
    event.preventDefault();
    loginScreen.classList.add('hidden');
    signupScreen.classList.remove('hidden');
    loginError.textContent = '';
    signupError.textContent = '';
}

function showLoginScreen(event) {
    event.preventDefault();
    loginScreen.classList.remove('hidden');
    signupScreen.classList.add('hidden');
    loginError.textContent = '';
    signupError.textContent = '';
}

function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const users = getUsers();

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        setCurrentUser(user);
        currentUser = user;
        showMainApp();
    } else {
        loginError.textContent = 'Invalid email or password.';
    }
}

function handleSignup() {
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const users = getUsers();

    if (users.find(u => u.email === email)) {
        signupError.textContent = 'Email already exists.';
        return;
    }

    const newUser = {
        email: email,
        password: password,
        username: '',
        studentEmail: '',
        profilePicture: 'default-profile.png',
        activities: [],
        isAdmin: email === 'admin@greenloop.com',
    };

    users.push(newUser);
    setUsers(users);
    setCurrentUser(newUser);
    currentUser = newUser;
    showMainApp();
}

function showMainApp() {
    authContainer.classList.add('hidden');
    mainContainer.classList.remove('hidden');
    showScreen('home');
    updateProfileInfo();
    if (currentUser.isAdmin) {
        adminLink.classList.remove('hidden');
    } else {
        adminLink.classList.add('hidden');
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        showAuthScreen();
    }
}

function navigate(event) {
    event.preventDefault();
    const screen = event.target.getAttribute('data-screen');
    showScreen(screen);
    mainError.textContent = '';
}

function navigateToSettings(event) {
    event.preventDefault();
    showScreen('settings');
    mainError.textContent = '';
}

function showScreen(screen) {
    const screens = [homeScreen, guideScreen, impactScreen, rewardsScreen, historyScreen, settingsScreen, adminScreen];
    screens.forEach(s => s.classList.add('hidden'));
    switch (screen) {
        case 'home':
            homeScreen.classList.remove('hidden');
            updateProfileInfo();
            break;
        case 'guide':
            guideScreen.classList.remove('hidden');
            loadRecyclingTips();
            break;
        case 'impact':
            impactScreen.classList.remove('hidden');
            renderImpactChart();
            break;
        case 'rewards':
            rewardsScreen.classList.remove('hidden');
            loadRewards();
            break;
        case 'history':
            historyScreen.classList.remove('hidden');
            loadHistory();
            break;
        case 'settings':
            settingsScreen.classList.remove('hidden');
            loadSettings();
            break;
        case 'admin':
            if (currentUser.isAdmin) {
                adminScreen.classList.remove('hidden');
                loadAdminData();
            } else {
                mainError.textContent = 'Access Denied: Admins only.';
            }
            break;
    }
}

function updateProfileInfo() {
    welcomeMessage.textContent = `Hello, ${currentUser.username || currentUser.email}!`;
    navProfilePic.src = currentUser.profilePicture || 'default-profile.png';
    totalPoints.textContent = calculateTotalPoints();
    updateCurrentBadge();
}

function loadRecyclingTips() {
    recyclingTipsList.innerHTML = '';
    recyclingTips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        recyclingTipsList.appendChild(li);
    });
}

function renderImpactChart() {
    const ctx = impactChart.getContext('2d');
    const activities = currentUser.activities;
    const labels = activities.map((activity) => {
        const date = new Date(activity.timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    });
    const dataPoints = activities.map(activity => activity.amount);

    // Destroy previous chart instance if exists
    if (window.impactChartInstance) {
        window.impactChartInstance.destroy();
    }

    // Calculate appropriate chart height based on data points
    const chartHeight = 400;
    impactChart.parentElement.style.height = `${chartHeight}px`;

    window.impactChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gallons Recycled',
                data: dataPoints,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40,167,69,0.2)',
                fill: true,
                tension: 0.1,
                pointRadius: 5,
                pointHoverRadius: 7,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date and Time'
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Gallons'
                    },
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    });
}

function loadRewards() {
    rewardsList.innerHTML = '';
    rewards.forEach(reward => {
        const li = document.createElement('li');
        li.textContent = `${reward.reward} - Requires ${reward.points} points`;
        if (calculateTotalPoints() >= reward.points) {
            li.classList.add('current-badge');
        }
        rewardsList.appendChild(li);
    });
}

function updateCurrentBadge() {
    let earnedBadge = 'None';
    for (let i = rewards.length - 1; i >= 0; i--) {
        if (calculateTotalPoints() >= rewards[i].points) {
            earnedBadge = rewards[i].reward;
            break;
        }
    }
    currentBadge.textContent = earnedBadge;
}

function logActivity(event) {
    event.preventDefault();
    const date = document.getElementById('activity-date').value;
    const time = document.getElementById('activity-time').value;
    const amount = parseFloat(document.getElementById('activity-amount').value);
    const photoInput = document.getElementById('activity-photo');
    const photoFile = photoInput.files[0];

    if (!date || !time || isNaN(amount) || amount <= 0) {
        activityError.textContent = 'Please fill out all required fields with valid data.';
        return;
    }

    const timestamp = new Date(`${date}T${time}`);
    const pointsEarned = Math.floor(amount * 10); // Example: 10 points per gallon
    const activity = {
        id: generateUniqueId(),
        type: 'recycle',
        timestamp: timestamp.toISOString(),
        amount: amount,
        photo: photoFile ? URL.createObjectURL(photoFile) : null,
        pointsEarned: pointsEarned,
    };

    currentUser.activities.push(activity);
    updateUser(currentUser);
    updateProfileInfo();
    alert(`Activity logged! You earned ${pointsEarned} points.`);
    activityForm.reset();
    activityError.textContent = '';
}

function loadHistory() {
    historyTableBody.innerHTML = '';
    const activities = currentUser.activities.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    let totalGallons = 0;
    let totalPoints = 0;
    activities.forEach(activity => {
        const tr = document.createElement('tr');
        const dateTd = document.createElement('td');
        const amountTd = document.createElement('td');
        const pointsTd = document.createElement('td');
        const photoTd = document.createElement('td');
        const actionTd = document.createElement('td');

        const date = new Date(activity.timestamp);
        dateTd.textContent = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        amountTd.textContent = activity.amount;
        pointsTd.textContent = activity.pointsEarned;
        totalGallons += activity.amount;
        totalPoints += activity.pointsEarned;

        if (activity.photo) {
            const imgLink = document.createElement('a');
            imgLink.href = '#';
            imgLink.textContent = 'View Image';
            imgLink.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(activity.photo);
            });
            photoTd.appendChild(imgLink);
        } else {
            photoTd.textContent = 'No Image';
        }

        // Delete action
        const deleteLink = document.createElement('span');
        deleteLink.textContent = 'Delete';
        deleteLink.classList.add('delete-button');
        deleteLink.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this entry?')) {
                deleteActivity(activity.id);
            }
        });
        actionTd.appendChild(deleteLink);

        tr.appendChild(dateTd);
        tr.appendChild(amountTd);
        tr.appendChild(pointsTd);
        tr.appendChild(photoTd);
        tr.appendChild(actionTd);
        historyTableBody.appendChild(tr);
    });

    // Update history summary
    historySummary.textContent = `Total Gallons Recycled: ${totalGallons.toFixed(2)}, Total Points Earned: ${totalPoints}, Number of Entries: ${activities.length}`;

    // Update total points
    totalPoints = calculateTotalPoints();
    updateProfileInfo();
}

function deleteActivity(activityId) {
    const activityIndex = currentUser.activities.findIndex(activity => activity.id === activityId);
    if (activityIndex !== -1) {
        // Remove activity
        currentUser.activities.splice(activityIndex, 1);
        updateUser(currentUser);
        updateProfileInfo();
        loadHistory();
        renderImpactChart();
        alert('Activity deleted successfully.');
    }
}

function openModal(imageSrc) {
    modalImage.src = imageSrc;
    imageModal.classList.remove('hidden');
    imageModal.style.display = 'block';
}

function closeModal() {
    imageModal.classList.add('hidden');
    imageModal.style.display = 'none';
}

function loadSettings() {
    settingsError.textContent = '';
    currentProfilePic.src = currentUser.profilePicture || 'default-profile.png';
    settingsUsername.value = currentUser.username || '';
    settingsStudentEmail.value = currentUser.studentEmail || '';
    settingsEmail.textContent = currentUser.email;
    settingsPassword.value = '';
}

function saveSettings(event) {
    event.preventDefault();
    const newProfilePicFile = settingsProfilePicInput.files[0];
    const newUsername = settingsUsername.value.trim();
    const newStudentEmail = settingsStudentEmail.value.trim();
    const newPassword = settingsPassword.value;

    if (newProfilePicFile) {
        currentUser.profilePicture = URL.createObjectURL(newProfilePicFile);
    }

    if (newUsername) {
        currentUser.username = newUsername;
    } else {
        settingsError.textContent = 'Username cannot be empty.';
        return;
    }

    currentUser.studentEmail = newStudentEmail;

    if (newPassword) {
        if (confirm('Are you sure you want to change your password?')) {
            currentUser.password = newPassword;
            alert('Password changed successfully.');
        }
    }

    updateUser(currentUser);
    updateProfileInfo();
    alert('Profile settings updated successfully.');
    settingsForm.reset();
    loadSettings();
}

function loadAdminData() {
    // Load Users Data
    const users = getUsers();
    usersTableBody.innerHTML = '';
    users.forEach(user => {
        const tr = document.createElement('tr');
        const emailTd = document.createElement('td');
        const pointsTd = document.createElement('td');
        const activitiesTd = document.createElement('td');

        emailTd.textContent = user.email;
        pointsTd.textContent = calculateUserTotalPoints(user);
        activitiesTd.textContent = user.activities.length;

        tr.appendChild(emailTd);
        tr.appendChild(pointsTd);
        tr.appendChild(activitiesTd);
        usersTableBody.appendChild(tr);
    });

    // Load Bins Data (Simulated)
    binsTableBody.innerHTML = '';
    const bins = [
        { id: 1, fillLevel: Math.floor(Math.random() * 100), lastUpdated: new Date().toLocaleString() },
        { id: 2, fillLevel: Math.floor(Math.random() * 100), lastUpdated: new Date().toLocaleString() },
        // Add more bins as needed
    ];
    bins.forEach(bin => {
        const tr = document.createElement('tr');
        const idTd = document.createElement('td');
        const fillLevelTd = document.createElement('td');
        const lastUpdatedTd = document.createElement('td');

        idTd.textContent = bin.id;
        fillLevelTd.textContent = bin.fillLevel;
        lastUpdatedTd.textContent = bin.lastUpdated;

        tr.appendChild(idTd);
        tr.appendChild(fillLevelTd);
        tr.appendChild(lastUpdatedTd);
        binsTableBody.appendChild(tr);
    });
}

// Utility Functions

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function updateUser(updatedUser) {
    const users = getUsers();
    const index = users.findIndex(u => u.email === updatedUser.email);
    if (index !== -1) {
        users[index] = updatedUser;
        setUsers(users);
        setCurrentUser(updatedUser);
    }
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function calculateTotalPoints() {
    return currentUser.activities.reduce((total, activity) => total + activity.pointsEarned, 0);
}

function calculateUserTotalPoints(user) {
    return user.activities.reduce((total, activity) => total + activity.pointsEarned, 0);
}
