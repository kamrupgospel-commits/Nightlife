// ========== EVENT DATA ==========
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
        description: "Experience the ultimate electronic music journey with world-class DJs spinning the latest tracks. State-of-the-art sound system and mesmerizing light shows guaranteed. Join us for an unforgettable night of dancing and energy!",
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
        description: "Smooth jazz under the stars with live performances by renowned local artists. Enjoy craft cocktails while overlooking the city skyline. A sophisticated evening perfect for music lovers.",
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
        description: "Watch the sunset while enjoying tropical cocktails and chill house music. Perfect for unwinding after a long week with friends. Bring your crew and enjoy the golden hour!",
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
        description: "The hottest DJ night of the week! Featuring international electronic producers. Expect heavy bass, incredible beats, and an electric atmosphere. Not for the faint of heart!",
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
        description: "An exclusive club experience with premium cocktails, VIP areas, and top international DJs. Dress code required. Reserve your table for the ultimate night out!",
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
        description: "Intimate acoustic performances by talented local and international musicians. Cozy ambiance with excellent food and drink. Perfect for a relaxing evening filled with amazing music.",
        capacity: "100 people",
        price: "$30"
    }
];

// ========== STATE MANAGEMENT ==========
let currentFilter = "all";
let searchQuery = "";
let rsvpStatus = {};
let rsvpCounts = {};

// Initialize RSVP status and counts for all events
eventsData.forEach(event => {
    rsvpStatus[event.id] = localStorage.getItem(`rsvp_${event.id}`) || "none";
    rsvpCounts[event.id] = {
        going: parseInt(localStorage.getItem(`count_going_${event.id}`)) || 0,
        interested: parseInt(localStorage.getItem(`count_interested_${event.id}`)) || 0
    };
});

// ========== DOM ELEMENTS ==========
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const eventsGrid = document.getElementById("eventsGrid");
const modal = document.getElementById("eventModal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

// ========== DISPLAY EVENTS ==========
function displayEvents(filteredEvents) {
    if (filteredEvents.length === 0) {
        eventsGrid.innerHTML = `
            <div class="no-events" style="grid-column: 1 / -1;">
                <div class="no-events-emoji">🎭</div>
                <h3 class="no-events-title">No Events Found</h3>
                <p class="no-events-text">Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }

    eventsGrid.innerHTML = filteredEvents.map(event => `
        <div class="event-card" onclick="openEventModal(${event.id})">
            <img src="${event.image}" alt="${event.name}" class="event-image">
            <div class="event-content">
                <span class="event-category">${event.category.replace('-', ' ')}</span>
                <h3 class="event-name">${event.name}</h3>
                <div class="event-date">📅 ${event.date}</div>
                <div class="event-location">📍 ${event.location}</div>
                <p class="event-description">${event.description.substring(0, 100)}...</p>
            </div>
        </div>
    `).join("");
}

// ========== FILTER LOGIC ==========
function filterEvents() {
    let filtered = eventsData;

    // Apply category filter
    if (currentFilter !== "all") {
        filtered = filtered.filter(event => event.category === currentFilter);
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
        filtered = filtered.filter(event =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    displayEvents(filtered);
}

// ========== SEARCH HANDLER ==========
searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    filterEvents();
});

// ========== FILTER BUTTONS HANDLER ==========
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));

        // Add active class to clicked button
        button.classList.add("active");

        // Update current filter
        currentFilter = button.getAttribute("data-category");

        // Filter and display events
        filterEvents();
    });
});

// ========== MODAL FUNCTIONS ==========
function openEventModal(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    const status = rsvpStatus[eventId];
    const goingCount = rsvpCounts[eventId].going;
    const interestedCount = rsvpCounts[eventId].interested;
    const goingActive = status === "going" ? "active" : "";
    const interestedActive = status === "interested" ? "active" : "";

    modalContent.innerHTML = `
        <button class="modal-close" onclick="closeEventModal()">✕</button>
        <img src="${event.image}" alt="${event.name}" class="modal-image">
        <div class="modal-body">
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">${event.name}</h2>
            
            <div class="modal-details-grid">
                <div class="detail-item">
                    <div class="detail-label">📅 Date & Time</div>
                    <div class="detail-value">${event.date} • ${event.time}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">📍 Location</div>
                    <div class="detail-value">${event.location}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">🎟️ Price</div>
                    <div class="detail-value">${event.price}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">👥 Capacity</div>
                    <div class="detail-value">${event.capacity}</div>
                </div>
            </div>

            <div class="modal-description">
                <div class="modal-description-label">📖 Description</div>
                <div class="modal-description-text">${event.description}</div>
            </div>

            <div class="modal-description">
                <div class="modal-description-label">🏢 Venue Address</div>
                <div class="modal-description-text">${event.address}</div>
            </div>

            <div class="rsvp-section">
                <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; color: var(--text-primary);">
                    Will you attend?
                </h3>
                
                <div class="rsvp-buttons">
                    <!-- Going Button -->
                    <button class="rsvp-btn ${goingActive}" onclick="updateRSVP(${eventId}, 'going')" id="goingBtn-${eventId}">
                        <span class="rsvp-icon">✓</span>
                        <span class="rsvp-text">${status === 'going' ? "You're Going" : 'Going'}</span>
                        <span class="rsvp-count">${goingCount}</span>
                    </button>

                    <!-- Interested Button -->
                    <button class="rsvp-btn ${interestedActive}" onclick="updateRSVP(${eventId}, 'interested')" id="interestedBtn-${eventId}">
                        <span class="rsvp-icon">★</span>
                        <span class="rsvp-text">Interested</span>
                        <span class="rsvp-count">${interestedCount}</span>
                    </button>
                </div>

                <!-- RSVP Message -->
                <div id="rsvpMessage-${eventId}" class="rsvp-message ${status === 'going' ? 'going' : status === 'interested' ? 'interested' : 'hidden'}">
                    ${status === 'going' ? '✨ You are attending this event 🎉' : status === 'interested' ? '⭐ You marked interest in this event ⭐' : ''}
                </div>
            </div>

            <button class="btn btn-close" style="width: 100%; margin-top: 1rem;" onclick="closeEventModal()">
                Close
            </button>
        </div>
    `;

    modal.classList.add("active");
}

function closeEventModal() {
    modal.classList.remove("active");
}

function updateRSVP(eventId, status) {
    const currentStatus = rsvpStatus[eventId];

    if (currentStatus === status) {
        // Toggle off - remove selection (reset)
        rsvpStatus[eventId] = "none";
        rsvpCounts[eventId][status]--;
        localStorage.removeItem(`rsvp_${eventId}`);
        localStorage.setItem(`count_${status}_${eventId}`, rsvpCounts[eventId][status]);
    } else {
        // If selecting different status, remove from previous
        if (currentStatus !== "none") {
            rsvpCounts[eventId][currentStatus]--;
            localStorage.setItem(`count_${currentStatus}_${eventId}`, rsvpCounts[eventId][currentStatus]);
        }

        // Add to new status
        rsvpStatus[eventId] = status;
        rsvpCounts[eventId][status]++;
        localStorage.setItem(`rsvp_${eventId}`, status);
        localStorage.setItem(`count_${status}_${eventId}`, rsvpCounts[eventId][status]);
    }

    // Reopen modal to show updated state with smooth animation
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
        openEventModal(eventId);
    }
}

// ========== CLOSE MODAL ON BACKGROUND CLICK ==========
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeEventModal();
    }
});

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener("DOMContentLoaded", () => {
    // Set first filter button as active
    if (filterButtons.length > 0) {
        filterButtons[0].classList.add("active");
    }

    // Display all events
    displayEvents(eventsData);
});
