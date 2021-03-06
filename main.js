

const result = document.getElementById('result');
const messageOut = document.getElementById('message');

function convertCurrency() {
  let amount = document.getElementById('amount').value;
  let fromCurrency = document.getElementById('from').value;
  let toCurrency = document.getElementById('to').value;
  if (amount.trim() === ''){
    alert('No data entered, please try again');
    return;
  }
  if(isNaN(amount)) {
    alert('Invalid data entered, please try again');
    return;
  } 


  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  let query = fromCurrency + '_' + toCurrency;

  let url = 'https://free.currencyconverterapi.com/api/v5/convert?q='+ query + '&compact=ultra';

	fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((jsonData) => {
		if(jsonData) {
			let total = jsonData[query] * Number(amount);
      total = Math.round(total * 100) / 100
			result.value = total;
		}
    
  }).catch(error => {
    alert('Error: Data was not fetched')
  });
}


// CONVERSION 
const convertBtn = document.getElementById('convert-btn');
convertBtn.onclick = (event) => {
	convertCurrency();
}

// SW
const registerServiceWorker = function() {

  if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/alc-currency-converter/sw.js', {
    scope: '/alc-currency-converter/'
  }).then( reg => {
    console.log('services worker is set')
		

    if (reg.waiting) {
      let result = confirm('New version available');

      if(result == true) {
        reg.waiting.postMessage({action: 'skipWaiting'});
      }
    }

    if (reg.installing) {
      reg.installing.addEventListener('statechange', function() {
        if (reg.installing.state == 'installed') {
          if (reg.waiting) {
            let result = confirm('New version available');

            if(result == true) {
              reg.waiting.postMessage({action: 'skipWaiting'});
            }
          }
        }
      });
    }

    reg.addEventListener('updatefound', function() {
      if (reg.installing.state == 'installed') {
        if (reg.waiting) {
          let result = confirm('New version available');

          if(result == true) {
            reg.waiting.postMessage({action: 'skipWaiting'});
          }
        }
      }
    });
		
  }).catch(e => {
    console.log('Not registered')
  })
}

};

registerServiceWorker()
