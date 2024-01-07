
const priceElement = document.getElementById('price')
const res = document.getElementById('res')
const brlRes = document.getElementById('brl-res')

function fetchBitcoinPrice() {
    fetch('https://api.binance.us/api/v3/trades?symbol=BTCUSDT')
    .then(response => response.json())
    .then(data => {
        console.log('Dados retornados pela API:', data)
        if (Array.isArray(data) && data.length > 0 && data[0].price !== undefined) {
            const bitcoinPrice = parseFloat(data[0].price).toFixed(2)
            res.innerHTML = `$${bitcoinPrice}`

            convertToRealAndDisplay(bitcoinPrice)
        } else {
            res.innerHTML = 'Dados de preços indisponiveis'
        }
    })
    .catch(error => {
        console.error('Error fetching Bitcoin price:', error)
        res.innerHTML = 'Erro ao obter o preço'
    })
}

function updateBitcoinPrice() {
    fetchBitcoinPrice()
    setInterval(fetchBitcoinPrice, 30000)
}
window.onload = updateBitcoinPrice

function convertToRealAndDisplay(bitcoinPriceUSD) {
    const key = '2241ac2cad6063ec125c6682'

    fetch('https://v6.exchangerate-api.com/v6/2241ac2cad6063ec125c6682/latest/USD')
    .then(response => response.json())
    .then(data => {
        console.log('Dados retornados pela API de câmbio', data)
        if (data.result === 'success' && data.conversion_rates && data.conversion_rates.BRL) {
         const taxaDeCambio = data.conversion_rates.BRL
        const bitcoinPriceBRL = (bitcoinPriceUSD * taxaDeCambio).toFixed(2)
        brlRes.innerHTML = `R$${bitcoinPriceBRL}`

        } else {
            console.error('Erro ao obter a taxa de cambio. Resposta da API:', data)
            brlRes.innerHTML = 'Erro ao obter a taxa de câmbio'
        }
       
    })
    .catch(error => {
        console.error('Erro ao obter a taxa de cambio:', error)
        brlRes.innerHTML = 'Erro ao obter a taxa de cambio'
    })
}

function updateBitcoinPrice() {
    fetchBitcoinPrice()
    setInterval(fetchBitcoinPrice, 30000)
}
window.onload = updateBitcoinPrice
