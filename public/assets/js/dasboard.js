// Dados iniciais (Exemplo)
// let winPercentage = 75; // Porcentagem de vitórias
// let totalPlayers = 100; // Total de jogadores
// let attemptsData = [5, 10, 15, 20, 25, 30, 35]; // Número de tentativas ao longo dos dias da semana

// Configuração do gráfico
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        datasets: [{
            label: 'Número de Tentativas',
            data: [],
            backgroundColor: 'rgba(555, 192, 392, 0.9)',
            borderColor: 'rgba(575, 92, 192)',
            borderRadius: 10,
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
function updateKPIs(correctPercentage, totalPlayers) {
    document.getElementById('winPercentage').innerText = `${correctPercentage}%`;
    document.getElementById('totalPlayers').innerText = `${totalPlayers}`;
}

// Função para buscar dados do servidor
async function fetchQuizData() {
    try {
        const response = await fetch('http://localhost:3333/quizData');
        const data = await response.json();

        const correctPercentage = data.correctPercentage;
        const totalPlayers = data.totalPlayers;
        const attemptsData = JSON.parse(data.attemptsData);

        // Atualizar gráfico
        myChart.data.datasets[0].data = attemptsData;
        myChart.update();

        // Atualizar KPI's
        updateKPIs(correctPercentage, totalPlayers);
    } catch (error) {
        console.error('Erro ao buscar dados do quiz:', error);
    }
}
