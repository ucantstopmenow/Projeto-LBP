// Dados iniciais (Exemplo)
let winPercentage = 75; // Porcentagem de vitórias
let totalPlayers = 100; // Total de jogadores
let attemptsData = [5, 10, 15, 20, 25, 30, 35]; // Número de tentativas ao longo dos dias da semana

// Configuração do gráfico
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        datasets: [{
            label: 'Número de Tentativas',
            data: attemptsData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Atualização das KPI's
function updateKPIs() {
    document.getElementById('winPercentage').innerText = `% de vitórias: ${winPercentage}%`;
    document.getElementById('totalPlayers').innerText = `Total de jogadores: ${totalPlayers}`;
}

// Função para simular atualização de dados (Exemplo)
function fetchData() {
    // Aqui você deve adicionar o código para buscar os dados reais do servidor
    // Simulação de atualização de dados:
    winPercentage = Math.floor(Math.random() * 100);
    totalPlayers += Math.floor(Math.random() * 10);
    attemptsData = attemptsData.map(attempt => attempt + Math.floor(Math.random() * 5));
    
    // Atualizar gráfico
    myChart.data.datasets[0].data = attemptsData;
    myChart.update();

    // Atualizar KPI's
    updateKPIs();
}

// Atualizar dados a cada 5 segundos (5000 milissegundos)
setInterval(fetchData, 5000);

// Atualização inicial das KPI's
updateKPIs();
