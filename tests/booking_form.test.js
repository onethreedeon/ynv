const fs = require('fs');
const path = require('path');

test('booking form includes required fields', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../booking.html'), 'utf8');
  const hasForm = /<form[\s\S]*<\/form>/i.test(html);
  const requiredFields = html.match(/<(input|textarea)[^>]*required[^>]*>/gi) || [];
  expect(hasForm).toBe(true);
  expect(requiredFields.length).toBeGreaterThan(0);
});
