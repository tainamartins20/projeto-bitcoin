const res = document.getElementById('res')
const brlRes = document.getElementById('brl-res')

function fetchBitcoinPrice() {
    fetch('https://api.binance.us/api/v3/trades?symbol=BTCUSDT')
    .then(response => response.json())
    .then(data => {
        console.log('Dados retornados pela API:', data)
        if (Array.isArray(data) && data.length > 0  && data[0].price !== undefined) {
            const precoBitcoin = parseFloat(data[0].price).toFixed(2)
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
        if (coingeckoData.bitcoin && coingeckoData.bitcoin.brl) {
         const precoReal = coingeckoData.bitcoin.brl.toFixed(2)
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


