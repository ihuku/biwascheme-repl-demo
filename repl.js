var readline = require('readline');
var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8902/');
var recieved_flag = false;


function startRepl() {
  const prompt = 'biwas> ';

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt
  });

  rl.prompt();

  let buf = '';

  rl.on('line', (input) => {
    buf += input;
    const trimmed = buf.trim();

    if (trimmed.length) {
      try {
        //console.dir(buf);
        ws.send(buf);
      } catch (e) {
        console.error(e);
      } finally {
        buf = '';
      }
    } else {
      buf = '';
    }

    if (recieved_flag) {
      recieved_flag = false;
      rl.setPrompt(prompt);
      rl.prompt();
    }
  })
    .on('close', () => {
      console.log('Bye!');
      process.exit(0); });
}


ws.on('message', function incoming(data) {
  console.log(data);
  recieved_flag = true;
});


startRepl();
