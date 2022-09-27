let events = [];
let arr = []; // cargar información

const eventName = document.querySelector("#eventName");
const eventDate = document.querySelector("#eventDate");
const buttonAdd = document.querySelector("#bAdd");
const eventsContainer = document.querySelector("#eventsContainer");

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addEvent();
});

function addEvent() {
  if (eventName.value === "" || eventDate.value === "") {
    return;
  }

  if (dateDiff(eventDate.value) < 0) {
    return;
  }

  const newEvent = {
    id: (Math.random() * 100).toString(36).slice(3),
    name: eventName.value,
    date: eventDate.value,
  };

  events.unshift(newEvent);

  eventName.value = "";

  renderEvents();
}

function dateDiff(d) {
  const targetDate = new Date(d);
  const today = new Date();
  const difference = targetDate.getTime() - today.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
}

function renderEvents() {
  const eventsHTML = events.map((event) => {
    return `
        <div class="event">
            <div class="days"><span class="days-number">${dateDiff(
              event.date
            )}</span><span class="days-text">días</span></div>
            <div class="event-name">${event.name}</div>
            <div class="event-date">${event.date}</div>
            <div class="actions"><button data-id="${
              event.id
            }" class="bDelete">Eliminar</button></div>
        </div>`;
  });

  eventsContainer.innerHTML = eventsHTML.join("");

  document.querySelectorAll(".bDelete").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = button.getAttribute("data-id");
      events = events.filter((event) => event.id !== id);
      renderEvents();
    });
  });
}
