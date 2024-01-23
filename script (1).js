
const res = document.getElementById('res')
const brlRes = document.getElementById('brl-res')

function fetchBitcoinPrice() {
    fetch('https://api.binance.us/api/v3/ticker/price?symbol=BTCUSDT')
    .then(response => response.json())
    .then(data => {
        console.log('Dados retornados pela API:', data)
        if (data.symbol === 'BTCUSDT' && typeof data.price === 'string') {
            const precoBitcoin = parseFloat(data.price).toFixed(2)
            res.innerHTML = `$${precoBitcoin}`

            fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl')
            .then(response => response.json())
            .then(coingeckoData => {
                processarConversaoPrecoBitcoin(coingeckoData, precoBitcoin)
            })
            .catch(error => {
                console.error('Erro ao obter o preço em reais do CoinGecko:', error)
                brlRes.innerHTML = 'Erro ao obter o preço em reais'
            })

        } else {
            res.innerHTML = 'Dados de preços indisponiveis'
        }
    })
    .catch(error => {
        console.error('Erro ao buscar o preço do Bitcoin:', error)
        res.innerHTML = 'Erro ao obter o preço'
    })
}


function processarConversaoPrecoBitcoin(coingeckoData, precoBitcoin) {
    const bitcoinData = coingeckoData.bitcoin
    if (bitcoinData && bitcoinData.hasOwnProperty('brl')) {
        const precoReal = parseFloat(bitcoinData.brl).toFixed(2);
        brlRes.innerHTML = `R$${precoReal}`
        } else {
            console.error('Erro ao obter o preço em reais. Resposta da API:', coingeckoData)
            brlRes.innerHTML = 'Erro ao obter o preço.'
        }
    }

function updateBitcoinPrice() {
    fetchBitcoinPrice()
    setInterval(fetchBitcoinPrice, 30000)
}
window.onload = updateBitcoinPrice
