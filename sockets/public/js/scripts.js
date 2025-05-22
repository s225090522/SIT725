let socket;

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('.modal').modal();
    $('select').formSelect(); // Initialize dropdown

    $('#formSubmit').click((event) => {
        event.preventDefault();
        submitForm();
    });

    connectSocket();
    getProjects();
});

const connectSocket = () => {
    socket = io(); // Connect to server

    socket.on('projectsUpdated', (projects) => {
        console.log('Received updated projects list from server');
        addCards(projects);
    });
};

const clickMe = () => {
    alert("Hope you have a pet!");
};

const submitForm = () => {
    let formData = {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        favourite_sport: $('#favourite_sport').val(),
        sport: $('#sport').val()
    };

    console.log("Form Data Submitted: ", formData);

    $.post('/api/submitForm', formData, (response) => {
        if (response.statusCode === 200) {
            alert('Form submitted successfully!');
        } else {
            alert('Form submission failed!');
        }
    });
};

const addCards = (items) => {
    $("#card-section").empty();

    items.forEach(item => {
        let itemToAppend = `
            <div class="col s12 m6 l3">
                <div class="card">
                    <div class="card-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="card-content">
                        <span class="card-title">${item.title}</span>
                        <p>${item.description}</p>
                        <p><a href="${item.link}" target="_blank">Learn More</a></p>
                    </div>
                </div>
            </div>`;
        $("#card-section").append(itemToAppend);
    });
};

const getProjects = () => {
    $.get('/api/projects', (response) => {
        if (response.statusCode === 200) {
            addCards(response.data);
        } else {
            console.error("Error loading projects: ", response.message);
            alert('Error loading projects!');
        }
    }).fail((err) => {
        console.error("Error fetching data: ", err);
        alert('Error fetching data from the server!');
    });
};
