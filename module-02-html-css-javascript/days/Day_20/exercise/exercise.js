//  1
async function getUsdEtbRate() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log(`1 USD = ${data.rates.ETB} ETB`);
    return data.rates.ETB;
  } catch (err) {
    console.error('Ex 1 Error:', err.message);
  }
}

// 2
async function getData() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log('Render:', data.title);
  } catch (err) {
    console.error('Ex 2 Error:', err.message);
  }
}

// 3
async function testErrors() {
  try {
    await fetch('https://invalid-url-098765.com');
  } catch (err) {
    console.log('Catch runs on network failure:', err.message);
  }

  
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/invalid-404');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.log('Catch runs via res.ok check:', err.message);
  }
}

// 4
async function fetchFirstTwo() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    const [u1, u2] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${users[0].id}`).then(r => r.json()),
      fetch(`https://jsonplaceholder.typicode.com/users/${users[1].id}`).then(r => r.json())
    ]);
     u1.name = "Beza fikru"
     u2.name = "kenet fikru"

    console.log('Parallel Results:', u1.name, '|', u2.name);
  } catch (err) {
    console.error('Ex 4 Error:', err.message);
  }
}

// 5


async function loadDataUI() {
  console.log('State: Loading...');

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    data.name = "Getu Tesfaye"; 

    console.log(`State: Success -> ${data.name}`);
  } catch (err) {
    console.log(`State: Error -> ${err.message}`);
  }
}


async function runAll() {
  await getUsdEtbRate();
  await getData();
  await testErrors();
  await fetchFirstTwo();
  await loadDataUI();
}

runAll();