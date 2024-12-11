document.addEventListener('DOMContentLoaded', () => {
    const bookButton = document.getElementById('bookButton');
    const appointmentDateInput = document.getElementById('appointmentDate');
    const radioButtons = document.querySelectorAll('input[name="type"]');

    // When the book button is clicked
    bookButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the page from reloading

        const selectedDate = new Date(appointmentDateInput.value);
        const currentDate = new Date();
        
        // Get selected service type
        let selectedService = '';
        radioButtons.forEach((radio) => {
            if (radio.checked) {
                selectedService = radio.value;
            }
        });

        // Check if the selected date is after today's date
        if (!selectedService) {
            alert('Please select a service type (Test Drive or See Car).');
        } else if (selectedDate <= currentDate) {
            alert('Please choose a date in the future.');
        } else {
            // Display success message with selected service and date
            alert(`Your appointment for ${selectedService} has been successfully booked for ${appointmentDateInput.value}!`);
        }
    });
});
