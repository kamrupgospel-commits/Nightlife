// ========== EVENT DATA (copied from main script) ==========
const eventsData = [
    {
        id: 1,
        name: "Electric Nights",
        date: "March 28, 2026",
        time: "22:00",
        location: "Sky Club Downtown",
        address: "123 Main Street, Downtown",
        category: "club",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
        description: "Experience the ultimate electronic music journey with world-class DJs spinning the latest tracks.",
        capacity: "500 people",
        price: "$35"
    },
    {
        id: 2,
        name: "Rooftop Jazz Sessions",
        date: "March 29, 2026",
        time: "19:30",
        location: "The Penthouse",
        address: "456 High Rise Ave, Midtown",
        category: "live-music",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
        description: "Smooth jazz under the stars with live performances by renowned local artists.",
        capacity: "150 people",
        price: "$45"
    },
    {
        id: 3,
        name: "Sunset Vibes",
        date: "March 30, 2026",
        time: "18:00",
        location: "Azure Rooftop",
        address: "789 Ocean View Blvd, Beachfront",
        category: "rooftop",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop",
        description: "Watch the sunset while enjoying tropical cocktails and chill house music.",
        capacity: "200 people",
        price: "$25"
    },
    {
        id: 4,
        name: "Bass Drop Friday",
        date: "April 1, 2026",
        time: "23:00",
        location: "Underground Club",
        address: "321 Bass Street, Arts District",
        category: "dj-night",
        image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=400&fit=crop",
        description: "The hottest DJ night of the week! Featuring international electronic producers.",
        capacity: "600 people",
        price: "$40"
    },
    {
        id: 5,
        name: "Club Noir Experience",
        date: "April 2, 2026",
        time: "21:00",
        location: "Noir Club",
        address: "555 Platinum Blvd, Entertainment District",
        category: "club",
        image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=600&h=400&fit=crop",
        description: "An exclusive club experience with premium cocktails, VIP areas, and top international DJs.",
        capacity: "400 people",
        price: "$60"
    },
    {
        id: 6,
        name: "Live Acoustic Nights",
        date: "April 3, 2026",
        time: "20:00",
        location: "The Harmony Lounge",
        address: "888 Music Lane, Cultural Quarter",
        category: "live-music",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
        description: "Intimate acoustic performances by talented local and international musicians.",
        capacity: "100 people",
        price: "$30"
    }
];

// ========== USER PROFILE DATA ==========
const userProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    joinedDate: "March 2026",
    goingEvents: [1, 4],        // Event IDs
    interestedEvents: [2, 3],   // Event IDs
    attendedEvents: [5, 6],     // Event IDs (past events)
    bookmarkedEvents: [1, 3, 5] // Event IDs
};

// ========== DOM ELEMENTS ==========
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

// ========== TAB SWITCHING ==========
tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const tabName = button.getAttribute("data-tab");

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));

        // Add active class to clicked button and corresponding content
        button.classList.add("active");
        document.getElementById(tabName).classList.add("active");

        // Load events for the tab
        loadTabEvents(tabName);
    });
});

// ========== LOAD TAB EVENTS ==========
function loadTabEvents(tabName) {
    let eventIds = [];
    let containerId = "";

    if (tabName === "going") {
        eventIds = userProfile.goingEvents;
        containerId = "goingContainer";
    } else if (tabName === "interested") {
        eventIds = userProfile.interestedEvents;
        containerId = "interestedContainer";
    } else if (tabName === "attended") {
        eventIds = userProfile.attendedEvents;
        containerId = "attendedContainer";
    } else if (tabName === "bookmarked") {
        eventIds = userProfile.bookmarkedEvents;
        containerId = "bookmarkedContainer";
    }

    const container = document.getElementById(containerId);
    if (!container) return;

    if (eventIds.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-emoji">📭</div>
                <p class="empty-message">No events yet</p>
            </div>
        `;
        return;
    }

    const events = eventsData.filter(event => eventIds.includes(event.id));
    container.innerHTML = events.map(event => `
        <div class="profile-event-card">
            <img src="${event.image}" alt="${event.name}" class="profile-event-image">
            <div class="profile-event-info">
                <h3 class="profile-event-name">${event.name}</h3>
                <p class="profile-event-details">📅 ${event.date} • 🕐 ${event.time}</p>
                <p class="profile-event-location">📍 ${event.location}</p>
                <p class="profile-event-price">${event.price}</p>
            </div>
        </div>
    `).join("");
}

// ========== UPDATE STATS ==========
function updateStats() {
    document.querySelector(".going-count").textContent = userProfile.goingEvents.length;
    document.querySelector(".interested-count").textContent = userProfile.interestedEvents.length;
    document.querySelector(".attended-count").textContent = userProfile.attendedEvents.length;
}

// ========== NAVIGATION ==========
function goHome() {
    window.location.href = "index.html";
}

// ========== BUTTON ACTIONS ==========
document.querySelector(".btn-edit").addEventListener("click", () => {
    alert("Edit profile feature coming soon! 🛠️");
});

document.querySelector(".btn-logout").addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
        alert("Logged out successfully! 👋");
        goHome();
    }
});

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener("DOMContentLoaded", () => {
    updateStats();
    loadTabEvents("going");
});
