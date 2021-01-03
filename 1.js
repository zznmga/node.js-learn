const bcryptjs = require('bcryptjs');

(async function () {
  const password = 'qwerty12345';
  const salt1 = await bcryptjs.genSalt(10);
  const hash1 = await bcryptjs.hash(password, salt1);

  const salt2 = await bcryptjs.genSalt(10);
  const hash2 = await bcryptjs.hash(password, salt2);

  console.log(await bcryptjs.compare('qwerty12345', hash2));
})();
