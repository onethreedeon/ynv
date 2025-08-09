const fs = require('fs');
const path = require('path');

test('form prevents submission when required fields are empty', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../booking.html'), 'utf8');
  document.body.innerHTML = html;
  const form = document.querySelector('form');
  const event = new Event('submit', { cancelable: true });
  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
    }
  });
  form.dispatchEvent(event);
  expect(event.defaultPrevented).toBe(true);
});
