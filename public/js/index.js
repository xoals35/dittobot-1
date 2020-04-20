document.getElementById('api_link').addEventListener('click', (e) => {
    let apiOpen = window.open('/api/v1/bot', '_blank');
    apiOpen.focus();
});

document.getElementById('invite_link').addEventListener('click', (e) => {
    let inviteOpen = window.open('/invite', '_blank');
    inviteOpen.focus();
});