$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('.modal').modal();

    $('#formSubmit').click((event) => {
        event.preventDefault();
        submitForm();
    });

    getProjects();
});

const clickMe = () => {
    alert("Hope you have a fruit!");
};

const submitForm = () => {
    let formData = {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        password: $('#password').val(),
        email: $('#email').val()
    };

    $.post('/api/submitForm', formData, (response) => {
        if (response.statusCode === 200) {
            alert('Form submitted successfully!');
        } else {
            alert('Form submission failed!');
        }
    });

    console.log("Form Data Submitted: ", formData);
};

const addCards = (items) => {
    $("#card-section").empty();

    items.forEach(item => {
        let itemToAppend = `
            <div class="col s4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${item.title}
                        <i class="material-icons right">more_vert</i></span>
                        <p><a href="${item.link}" target="_blank">Learn More</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${item.title}
                        <i class="material-icons right">close</i></span>
                        <p class="card-text" style="color: black;">${item.description}</p>
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
